import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Observer, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../modules/auth/auth.service';
import { share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd';

const RECONNECTING_INTERVAL = 3000;

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {

  private loadingMsgId = null;
  private reconnect$ = new BehaviorSubject<Subject<MessageEvent>>(null);
  private subject: Subject<MessageEvent>;

  constructor(
    private authService: AuthService,
    private nzMessageService: NzMessageService
  ) {
    this.connect()
  }

  ngOnDestroy() {
    if (this.subject) this.subject.complete();
  }

  public onReconnect() {
    return this.reconnect$.asObservable().pipe(share());
  }

  private connect(force = false): Subject<MessageEvent> {
    if (this.subject && force) {
      this.subject.complete();
      this.subject = null;
      this.reconnect$.next(null);
    }

    if (!this.subject) {
      const url = this.getSocketUrl();
      this.subject = this.create(url);
    }

    // this.reconnect$.next(this.subject);
    return this.subject;
  }


  private getSocketUrl(): string {
    return `${environment.WEBSOCKET_PROTOCOL}://${environment.WEBSOCKET_URL}/global/`
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
      if (this.loadingMsgId === null) {
        this.loadingMsgId = this.nzMessageService.loading('Connection lost. Trying to reconnect..', { nzDuration: 0 }).messageId;
      }
      console.warn('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(() => {
        that.connect(true);
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
        if (this.loadingMsgId) {
          this.nzMessageService.remove(this.loadingMsgId);
          this.loadingMsgId = null;
        }
        console.log("Successfully connected: " + url);
        that.reconnect$.next(that.subject);
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
