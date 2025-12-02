export interface RegisterInput {
  Name: string;
  Email: string;
  Password: string;
  MobileNo: string;
  RoleId: string;
}

export interface LoginInput {
  MobileNo: string;
  Password?: string;
}