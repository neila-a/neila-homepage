import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import {
    author
} from "../../../package.json";
import Box from "@mui/material/Box";
import getPageMetadata from "./getters/getPageMetadata";
import getPage from './getters/getPage';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from "../components/Link";
import Tooltip from '@mui/material/Tooltip';
import Search from './Search';
import avatar from "../icon.jpg";
interface Props {
    params: Promise<{
        page: string;
    }>;
}
export const generateMetadata = async (props: Props) => await getPageMetadata((await props.params).page);
export default async function Page(props: Props) {
    const
        {
            page
        } = await props.params,
        Page = await getPage(page),
        {
            PageIcon,
            title
        } = await getPageMetadata(page);
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
                <Search />
                <Tooltip title="返回主页">
                    <Button size='large' variant='text' component={
                        /* 不需要使用`<nav />`。 */
                        Link
                    } href="/" sx={{
                        ml: 3,
                        color: "white"
                    }} startIcon={<Image src={avatar} width={24} height={24} alt="头像" />}>
                        {author.name}
                    </Button>
                </Tooltip>
            </Toolbar>
        </AppBar>
        <Box component="main" sx={{
            p: 2
        }}>
            <Page />
        </Box>
    </>
}
