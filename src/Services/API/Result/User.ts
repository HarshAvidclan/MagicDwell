import { UserRoles } from "../../Utility/Enums";

export interface GetCurrentUserResult {
    AppUser: AppUser;
    Roles: UserRoles[];
}

export interface AppUser {
    Name: string;
    Id: string;
    UserName: string;
    NormalizedUserName: string;
    Email: string;
    NormalizedEmail: string;
    EmailConfirmed: boolean;
    PasswordHash: string;
    SecurityStamp: string;
    ConcurrencyStamp: string;
    PhoneNumber: string;
    PhoneNumberConfirmed: boolean;
    TwoFactorEnabled: boolean;
    LockoutEnd: string | null;
    LockoutEnabled: boolean;
    AccessFailedCount: number;
    Prefed_City: number;
    Prefed_City_Key: number;
}


