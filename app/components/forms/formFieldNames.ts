import { string } from 'yup/lib/locale';

export type Name =
  | 'name'
  | 'email'
  | 'password'
  | 'subject'
  | 'question'
  | 'answer';

export interface FieldNames {
  answer: string;
  email: string;
  name: Name;
  password: string;
  question: string;
  subject: string;
}
