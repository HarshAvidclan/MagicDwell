export interface LoginResult {
    UserId: string;
    Email: string;
    Role: string;
    AccessToken: string;
    IsNewUser?: boolean;
    IsAccountExist: boolean;
    PhoneNumber: string;
    Name: string;
}
