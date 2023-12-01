export interface User {
  firstname: string;
  lastname: string;
  cellphone: string;
  userId: string;
  email: string;
  address: string;
  status: boolean;
  attributes?: [];
  roles?: Roles[];
  careers?: [];
}

export interface UserAttributes {}

export interface Roles {
  name: string
}

export interface careers {}
