import { environment } from 'src/environments/environment';

export class LogoutApiRequest {
  token: string;
  client_id: string = environment.apiClientId;
  client_secret: string = environment.apiClientSecret;

  constructor(token: string) {
    this.token = token;
  }
}
