export class LogoutApiRequest {
  token: string;
  client_id: string;
  client_secret: string;

  constructor(token: string) {
    this.token = token;
  }
}
