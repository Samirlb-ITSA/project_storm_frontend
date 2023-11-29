export interface User {
  firstName: string;
  lastName: string;
  cellphone: string;
  userId: string;
  email: string;
  address: string;
  status: boolean;
  attributes?: [];
  roles?: [];
  careers?: [];
}

export interface UserAttributes {}

export interface Roles {}

export interface careers {}
