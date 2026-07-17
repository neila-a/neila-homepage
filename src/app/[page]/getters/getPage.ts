import type {
    ComponentType
} from "react";
const getPage = async (page: string) => (await import(`../pages/${page}`)).default as ComponentType;
export default getPage;
