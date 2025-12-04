import { PaginationConfigInput, tbl_CommonImage } from "./inputindex";

// Input for Get API
export interface PropertyMasterGetInput {
  PropertyTypeId: number;
}


// =========================
// Master Tables Interfaces
// =========================
export interface tbl_mstPropertyType {
  PropertyTypeId: number;
  PropertyTypeName: string;
  IconName?: string | null;
  ParentPropertyTypeId?: number | null;
  SeqNo: number;
}

export interface tbl_mstPropertyType_Image extends tbl_mstPropertyType {
  Property_Category_Images: tbl_CommonImage[];
}

export interface tbl_mstLookingTo {
  LookingToId: number;
  LookingToName: string;
  IconName?: string | null;
  SeqNo: number;
}

export interface tbl_mstBHK {
  BHKId: number;
  BHKName: string;
  IconName?: string | null;
  SeqNo: number;
}

export interface tbl_mstBuildArea {
  BuildAreaId: number;
  BuildAreaName: string;
  IconName?: string | null;
  SeqNo: number;
}

export interface tbl_mstFurnishType {
  FurnishTypeId: number;
  FurnishTypeName: string;
  IconName?: string | null;
  ParentPropertyTypeId?: number | null;
  SeqNo: number;
  IsActive: boolean;
}

export interface tbl_mstFurnishItems {
  FurnishItemId: number;
  FurnishItemName: string;
  IconName?: string | null;
  ParentPropertyTypeId?: number | null;
  SeqNo: number;
  IsActive: boolean;
}

export interface tbl_mstAmenities {
  AmenityId: number;
  AmenityName: string;
  IconName?: string | null;
  ParentPropertyTypeId?: number | null;
  SeqNo: number;
  IsActive: boolean;
}

export interface tbl_mstConstructionStatus {
  ConstructionStatusId: number;
  ConstructionStatusName: string;
  IconName?: string | null;
  SeqNo: number;
}

// =========================
// Add/Edit API Object
// =========================
export interface PropertyAddEditInput {
  Post: tbl_Post;
  Property: tbl_Property;
  PropertyAmenities: tbl_PropertyAmenities[];
  PropertyFurnishItems: tbl_PropertyFurnishItems[];
  PropertyImages?: tbl_CommonImage[];
}

export interface tbl_Property {
  PropertyId: number;
  SeqNo: number;
  PropertyTypeId: number;
  ChildPropertyTypeId: number;
  LookingToId: number;
  BHKId?: number | null;
  BuildingName: string;
  Locality: string;
  TotalFloor: number;
  FloorNo: number;
  BuildArea: number;
  BuildAreaId?: number | null;
  ConstructionStatusId: number;
  FurnishTypeId: number;
  AvailableFromDate: Date | null;
  AgeOfProperty: number;
  Price: number;
  PostId: number;
  PlaceId?: string | null;
  Lat?: number;
  Long?: number;
}
export interface tbl_Property_Get extends tbl_Property {
  BHKName?: string;
  BuildAreaName?: string;
  FurnishTypeName?: string;
  ConstructionStatusName?: string;
  ChildPropertyTypeName?: string;
}
export interface tbl_PropertyAmenities {
  PropertyId: number;
  AmenityId: number;
  SeqNo: number;
}
export interface tbl_PropertyAmenities_Get extends tbl_PropertyAmenities {
  AmenityName: string;
  IconName?: string | null;
}

export interface tbl_PropertyFurnishItems {
  PropertyId: number;
  FurnishItemId: number;
  SeqNo: number;
}
export interface tbl_PropertyFurnishItems_Get extends tbl_PropertyFurnishItems {
  FurnishItemName: string;
  IconName?: string | null;
}

export interface PropertyByPostIdInput {
  PostId: number;
}

export interface tbl_Post {
  PostId: number;
  PostEntityId: number;
  UserId: string;
  SeqNo?: number | null;
  IsPublish: boolean | null;
  IsApproved: boolean | null;
}
export interface tbl_Post_Get extends tbl_Post {
  CreatedByUser: string;
  ModifiedUser: string;
  CreatedDate: Date;
}

export interface PropertyListingInput extends PaginationConfigInput {
  IsPublish: boolean | null;
  Comm_PropertyTypeId?: string | null;
  Comm_ChildPropertyTypeId?: string | null;
  Comma_LookingToId?: string | null;
  Comma_BHKId?: string | null;
  Comma_FurnishTypeId?: string | null;
  Comma_ConstructionStatusId?: string | null;
  Comma_Floor_Static?: string | null;
  Comma_Price_Static?: string | null;
  Comma_PlaceId?: string | null;
}

export interface PropertyMasterDataInput {
  PropertyTypeId: number;
}