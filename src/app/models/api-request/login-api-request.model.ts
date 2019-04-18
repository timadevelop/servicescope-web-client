import { environment } from 'src/environments/environment';

export class LoginApiRequest {
  email: string;
  username() {
    return this.email;
  }
  password: string;
  client_id: string = environment.apiClientId;
  client_secret: string = environment.apiClientSecret;
  grant_type: string = 'password';
}
