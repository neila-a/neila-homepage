import {
    author
} from "../../package.json";
import platforms from "./platforms";
interface Contact {
    platform: keyof typeof platforms;
    account: string;
}
const contacts = [
    {
        platform: "github",
        account: author.github.name
    },
    {
        platform: "phone",
        account: author.phone
    },
    {
        platform: "x",
        account: author.x.name
    },
    {
        platform: "email",
        account: author.email
    }
] satisfies Contact[];
export default contacts;
