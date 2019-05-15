import { environment } from 'src/environments/environment';

export class LoginApiRequest {
  client_id: string = environment.apiClientId;
  client_secret: string = environment.apiClientSecret;
  grant_type: string = 'password';

  constructor(public username:string, public password: string) {}
}
