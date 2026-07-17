import {
    Metadata
} from "next";
import type SvgIcon from "@mui/material/SvgIcon";
export interface PageMetadata extends Metadata {
    title: string;
    PageIcon: typeof SvgIcon
}
const getPageMetadata = async (page: string) => (await import(`../pages/${page}/metadata`)).default as PageMetadata;
export default getPageMetadata;
