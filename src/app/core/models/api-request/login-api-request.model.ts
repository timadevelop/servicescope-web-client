export class LoginApiRequest {
  client_id: string;
  client_secret: string;
  grant_type: string = 'password';

  constructor(public username:string, public password: string) {}
}
