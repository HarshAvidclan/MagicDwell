import { tbl_CommonImage, tbl_mstLookingTo, tbl_Post, tbl_Post_Get, tbl_Vehicle, tbl_Vehicle_Get } from "../Input/inputindex";
import { PaginationConfigResult } from "./resultindex";

export interface tbl_mstVehicleType {
    VehicleTypeId: number;
    VehicleTypeName: string;
    SeqNo: number;
}

export interface tbl_mstVehicleType_Image extends tbl_mstVehicleType {
    Vehicle_Category_Images: tbl_CommonImage[];
}

export interface tbl_mstBrand {
    BrandId: number;
    BrandName: string;
    VehicleTypeId: number;
    SeqNo: number;
}

export interface tbl_mstBrandModel {
    BrandModelId: number;
    BrandId: number;
    ModelName: string;
    SeqNo: number;
}

export interface tbl_mstFuelType {
    FuelTypeId: number;
    VehicleTypeId: number;
    FuelTypeName: string;
    SeqNo: number;
}

export interface tbl_mstNoOfOwners {
    NoOfOwnersId: number;
    OwnersText: string;
    SeqNo: number;
}

export interface tbl_mstTransmission {
    TransmissionId: number;
    TransmissionName: string;
    SeqNo: number;
}

export interface GetBrandModelByIdResult {
    lstBrandModel: tbl_mstBrandModel[];
}

export interface VehicleMasterDataResult {
    lstVehicleType: tbl_mstVehicleType[];
    lstChildVehicleType: tbl_mstVehicleType_Image[];
    lstBrand: tbl_mstBrand[];
    lstBrandModel: tbl_mstBrandModel[];
    lstFuelType: tbl_mstFuelType[];
    lstNoOfOwners: tbl_mstNoOfOwners[];
    lstTransmission: tbl_mstTransmission[];
    lstLookingTo: tbl_mstLookingTo[];
}

export interface VehicleByPostIdResult {
    Vehicle: tbl_Vehicle_Get;
    Post: tbl_Post_Get;
    VehicleImages: tbl_CommonImage[];
}

export interface VehicleListingResult extends PaginationConfigResult {
    PostId: number;
    VehicleId: number;
    YearOfMfd: number;
    VehicleTypeName: string;
    Title: string;
    OwnersText: string;
    DrivenKm: number;
    ModelName: string;
    BrandName: string;
    TransmissionName: string;
    FuelTypeName: string;
    Location: string;
    Price: number;
    CreatedDate: string;
    PublishStatus: string;
    VehicleImages: tbl_CommonImage[];
}

export interface VehicleAddEditResult {
    IsSuccess: boolean
}