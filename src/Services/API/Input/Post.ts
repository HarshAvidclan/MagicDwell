import { PaginationConfigInput, tbl_CommonImage } from './inputindex';

export interface PostListingInput extends PaginationConfigInput {
    IsPublish?: boolean | null;

    // Property specific filters (CSV strings)
    Comm_PropertyTypeId?: string | null;
    Comm_ChildPropertyTypeId?: string | null;
    Comma_LookingToId?: string | null;
    Comma_BHKId?: string | null;
    Comma_FurnishTypeId?: string | null;
    Comma_ConstructionStatusId?: string | null;
    Comma_Floor_Static?: string | null;

    // Vehicle specific filters (CSV strings)
    Comma_VehicleTypeId?: string | null;
    Comma_BrandId?: string | null;
    Comma_FuelTypeId?: string | null;
    Comma_BrandModelId?: string | null;
    Comma_TransmissionId?: string | null;
    Comma_NoOfOwnersId?: string | null;

    // Common
    Comma_Price_Static?: string | null;
    Comma_PlaceId?: string | null;
}
