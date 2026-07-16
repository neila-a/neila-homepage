import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import {
    author
} from "../../../package.json";
import getPageMetadata from "./getPage";
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from "../Link";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
interface Props {
    params: Promise<{
        page: string;
    }>;
}
export const generateMetadata = async (props: Props) => (await getPageMetadata((await props.params).page)).metadata;
export default async function Page(props: Props) {
    const {
        default: Page,
        metadata: {
            PageIcon,
            title
        }
    } = await getPageMetadata((await props.params).page);
    return <>
        <AppBar position="static">
            <Toolbar>
                <PageIcon sx={{
                    m: 1
                }} />
                <Typography variant="h6" sx={{
                    minWidth: "4rem"
                }}>
                    {title}
                </Typography>
                <TextField slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        component: "search",
                        sx: {
                            height: 48
                        }
                    },
                }} placeholder='搜索' variant="outlined" fullWidth />
                <Tooltip title="返回主页">
                    <Button size='large' variant='text' component={
                        /* 不需要使用`<nav />`。 */
                        Link
                    } href="/" color='warning' sx={{
                        ml: 3
                    }} startIcon={<Image src="/icon.jpg" width={24} height={24} alt="头像" />}>
                        {author.name}
                    </Button>
                </Tooltip>
            </Toolbar>
        </AppBar>
        <main>
            <Page />
        </main>
    </>
}
