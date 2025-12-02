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


export interface RegistrationResult {
    UserId: string;
    RoleName: string;
    Email: string;
    IsAccountExist: boolean;
    IsAccountCreated: boolean;
    PhoneNumber: string;
    Name: string;
}