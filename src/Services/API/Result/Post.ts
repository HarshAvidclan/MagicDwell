import { PaginationConfigResult } from './resultindex';
import { tbl_CommonImage } from '../Input/inputindex';

export interface PostListingResult extends PaginationConfigResult {
    PostId: number;
    PostName: string;
    PostRightDetail: string;
    Locality: string;
    Price: number;
    CreatedDate: Date;
    PublishStatus: string;
    PostImages: tbl_CommonImage[];
}
