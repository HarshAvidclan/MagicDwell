import { tbl_CommonImage, tbl_mstAmenities, tbl_mstBHK, tbl_mstBuildArea, tbl_mstConstructionStatus, tbl_mstFurnishItems, tbl_mstFurnishType, tbl_mstLookingTo, tbl_mstPropertyType, tbl_mstPropertyType_Image, tbl_Post, tbl_Post_Get, tbl_Property, tbl_Property_Get, tbl_PropertyAmenities, tbl_PropertyAmenities_Get, tbl_PropertyFurnishItems, tbl_PropertyFurnishItems_Get } from "../Input/inputindex";
import { PaginationConfigResult } from "./resultindex";

export interface PropertyMasterDataResult {
  PropertyTypes: tbl_mstPropertyType[];
  ChildPropertyTypes: tbl_mstPropertyType_Image[];
  LookingToList: tbl_mstLookingTo[];
  BHKList: tbl_mstBHK[];
  BuildAreaList: tbl_mstBuildArea[];
  FurnishTypeList: tbl_mstFurnishType[];
  FurnishItemsList: tbl_mstFurnishItems[];
  AmenitiesList: tbl_mstAmenities[];
  ConstructionStatusList: tbl_mstConstructionStatus[];
}

export interface PropertyListingResult extends PaginationConfigResult {
  PostId: number;
  PropertyId: number;
  BuildingName: string;
  BHKId: number;
  BuildAreaId: number;
  BHKName: string;
  BuildArea: number;
  BuildAreaName: string;
  ConstructionStatusName: string;
  FurnishTypeName: string;
  PublishStatus: string;
  Locality: string;
  Price: number;
  CreatedDate: Date;
  PropertyImages?: tbl_CommonImage[];
}
export interface PropertyByPostIdResult {
  Post: tbl_Post_Get;
  Property: tbl_Property_Get;
  Amenities: tbl_PropertyAmenities_Get[];
  FurnishItems: tbl_PropertyFurnishItems_Get[];
  PropertyImages?: tbl_CommonImage[];
}


export interface PropertyAddEditResult {
  IsSuccess: boolean
}