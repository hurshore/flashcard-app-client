import { string } from 'yup/lib/locale';

export type Name = 'name' | 'email' | 'password';

export interface FieldNames {
  name: Name;
  email: string;
  password: string;
}
