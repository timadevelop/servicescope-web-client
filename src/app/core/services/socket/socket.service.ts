import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Observer, Subject } from 'rxjs';
import { AuthService } from '../../../modules/auth/auth.service';

const RECONNECTING_INTERVAL = 3000;

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {

  constructor(
    private authService: AuthService
  ) { }

  ngOnDestroy() {
    if (this.subject) this.subject.complete();
  }

  private subject: Subject<MessageEvent>;

  public connect(url): Subject<MessageEvent> {
    if (this.subject) {
      this.subject.complete();
    }

    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    // get token
    const token = this.authService.getTokenInfo();
    if (!token || !this.authService.isLoggedIn) {
      console.warn("Cannot create secured socket for anonymous user.");
      return;
    }

    // setup reconnect function
    const that = this;
    const reconnect = (e) => {
      console.warn('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(() => {
        that.connect(url);
      }, RECONNECTING_INTERVAL);
    }

    // try to open ws
    const protocol = token.access_token;
    let ws = new WebSocket(url, protocol);
    // reconnect on close
    ws.onclose = reconnect;
    // log on open
    ws.onopen = (e) => {
      if (ws.OPEN) {
        console.log("Successfully connected: " + url);
      }
    }

    // setup subject

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = (e) => {
        obs.complete.call(obs);
        reconnect(e);
      }
      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
      complete: () => {
        ws.close();
        this.subject = null;
      }
    };
    return Subject.create(observer, observable);
  }
}
