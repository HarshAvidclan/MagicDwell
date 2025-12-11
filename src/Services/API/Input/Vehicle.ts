import { PaginationConfigInput, tbl_CommonImage, tbl_Post } from "./inputindex";

export interface tbl_Vehicle {
    VehicleId: number;
    VehicleTypeId: number;
    LookingToId: number;
    BrandId: number;
    BrandModelId: number;
    FuelTypeId: number;
    YearOfMfd: number;
    DrivenKm: number;
    NoOfOwnersId: number;
    TransmissionId: number;
    Location: string;
    Title?: string;
    Price: number;
    IsNegotiate: boolean;
    SeqNo: number;
    PostId?: number;
    PlaceId?: string | null;
    Lat?: number;
    Long?: number;
    ChildVehicleTypeId?: number;
}

export interface tbl_Vehicle_Get extends tbl_Vehicle {
    VehicleTypeName: string;
    FuelTypeName: string;
    OwnersText: string;
    BrandName: string;
    ModelName: string;
    TransmissionName: string;
}
export interface GetBrandModelByIdInput {
    Comma_BrandId: string | null;
}

export interface VehicleMasterDataInput {
    VehicleTypeId: number;
}

export interface VehicleAddEditInput {
    Vehicle: tbl_Vehicle;
    Post: tbl_Post;
    VehicleImages: tbl_CommonImage[];
}
export interface VehicleByPostIdInput {
    PostId: number;
}

export interface VehicleListingInput extends PaginationConfigInput {
    IsPublish: boolean | null;
    Comma_VehicleTypeId?: string | null;
    Comma_BrandId?: string | null;
    Comma_BrandModelId?: string | null;
    Comma_FuelTypeId?: string | null;
    Comma_NoOfOwnersId?: string | null;
    Comma_TransmissionId?: string | null;
    Comma_PlaceId?: string | null;
}
