
import {
    Metadata
} from "next";
import type {
    ComponentType
} from "react";
import type SvgIcon from "@mui/material/SvgIcon"
export interface PageMetadata extends Metadata {
    title: string;
    PageIcon: typeof SvgIcon
}
const getPage = async (page: string) => (await import(`./pages/${page}.tsx`)) as {
    default: ComponentType;
    metadata: PageMetadata;
};
export default getPage;
