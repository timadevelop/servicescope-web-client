import { UserRole } from "../UserRole.model";

export class RegisterApiRequest {
  email: string;
  password1: string;
  password2: string;
  uid: string;
  role: UserRole;
  phone?: string;
  first_name: string;
  last_name: string;
}
