import { API } from "./Api";
import { FileUploadHeaders } from "./GlobalHeaders";
import { ImageUploadInput, tbl_CommonImage } from "./Input/inputIndex";
import { Image } from "./URL/URLS";

export async function FileUpload(input: ImageUploadInput) {
    try {
        const form = new FormData();
        const file = input.File as any;

        // React Native specific file appending
        // @ts-ignore
        form.append("File", {
            uri: file.uri,
            type: file.type,
            name: file.name,
        });

        form.append("Folder", input.Folder);
        form.append("TableName", input.TableName);
        if (input.ModuleName) form.append("ModuleName", input.ModuleName);

        const result = await API.UPLOAD<tbl_CommonImage>(Image.UPLOAD, form, { headers: FileUploadHeaders });
        console.log("FileUpload result:", result);
        return result;
    } catch (error) {
        console.error('File Upload Error:', error);
        return null;
    }
}

export const FolderNames = {
    Property: "Property",
    PropertyDocument: "PropertyDocument",
    Vehicle: "Vehicle"
}
export const TableNames = {
    Property: "tbl_Property",
    Vehicle: "tbl_Vehicle"
};
