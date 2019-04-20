export class RegisterApiRequest {
  constructor(public email: string,
    public password1: string,
    public password2: string,
    public first_name: string,
    public last_name: string,
    public phone: string = '') {}
}
