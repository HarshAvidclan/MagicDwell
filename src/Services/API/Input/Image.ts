export interface ImageUploadInput {
    File: File;
    Folder: string;
    TableName: string;
    ModuleName: string;
}

export interface tbl_CommonImage {
  ImageId?: number;       // int? -> optional number
  IsActive: boolean;      // default true in .NET, you can enforce in frontend
  TableId: string;        // string (required)
  ImageName: string;      // string (required)
  SeqNo: number;          // int (required)

  TableName: string;      // [Required] in .NET -> required in TS
  ModuleName: string;     // [Required] in .NET -> required in TS
  ImagePath: string;     // [Required] in .NET -> required in TS
}