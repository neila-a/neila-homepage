import EmailIcon from "@mui/icons-material/Email";
import GithubIcon from "@mui/icons-material/GitHub";
import PhoneIcon from "@mui/icons-material/Phone";
import XIcon from "@mui/icons-material/X";
import type SvgIcon from "@mui/material/SvgIcon";
interface Platform {
    icon: typeof SvgIcon;
    name: string;
    url?: (account: string) => string;
}
const platforms = {
    github: {
        icon: GithubIcon,
        name: "Github",
        url: account => `https://github.com/${account}`
    },
    phone: {
        icon: PhoneIcon,
        name: "电话",
        url: account => `tel:${account}`
    },
    x: {
        icon: XIcon,
        name: "X",
        url: account => `https://x.com/@${account}`
    },
    email: {
        icon: EmailIcon,
        name: "电子邮件",
        url: account => `mailto:${account}`
    }
} satisfies Record<string, Platform>;
export default platforms;
