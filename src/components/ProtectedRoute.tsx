import { ReactNode } from "react";

interface Props {
    children?: ReactNode
}

class User {
    name: string = "";
    lastName: string = "";
    email: string = "";
    phoneNumber: string = "";
    address: string = "";
    password: string = "";
    roleId: number = 1;
  };

export const ProtectedRoute = ( {children}: Props ) => {
    var personFromStorage: User = JSON.parse(localStorage.getItem('user') as string);
    return children
}