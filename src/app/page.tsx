import BookIcon from "@mui/icons-material/Book";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
    author
} from "../../package.json";
import getPageMetadata from "./[page]/getters/getPageMetadata";
import Link from "./components/Link";
import avatar from "./icon.jpg";
const
    avatarSize = "max(33vw, 33vh)",
    /**
     * 居中了的`<Grid />`。
     */
    CenterGrid = (props: object) => <Grid size={{
        md: 6,
        xs: 12
    }} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }} {...props} />,
    /**
     * 不能使用 styled，否则会出现水合错误
     */
    TextsBox = (props: object) => <Box sx={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
        flexDirection: "row"
    }} {...props} />;
export default async function Home() {
    return <Grid container sx={{
        height: "100vh",
        width: "100%"
    }} component="main">
        <CenterGrid>
            <Avatar alt="头像" src={
                // 不要使用展开语法 {...avatar}
                avatar.src
            } sx={{
                height: avatarSize,
                width: avatarSize
            }} />
        </CenterGrid>
        <CenterGrid>
            <Box sx={{
                display: "flex",
                width: "100%",
                height: avatarSize,
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <TextsBox>
                        <Typography variant="h2" sx={{
                            pr: 3,
                            color: "text.secondary"
                        }} component="span">
                            {author.name_zh_CN}
                        </Typography>
                        <Typography variant="h1" component="span">
                            {author.name}
                        </Typography>
                    </TextsBox>
                    <TextsBox>
                        {Object.entries({
                            start: "有时是",
                            ...author.alias
                        }).map(([position, text]) => <Typography key={text} sx={{
                            pr: "0.25rem",
                            color: "text.secondary"
                        }} variant={position === "middle" ? "h6" : "h5"} component="span">
                            {text}
                        </Typography>)}
                    </TextsBox>
                </Box>
                <Typography variant="subtitle1" component="span">
                    “{
                        /* 从 QQ 获取会更好，但做不到 */
                        author.signature
                    }”
                </Typography>
                <ButtonGroup variant="text" size="large">
                    {["projects", "contacts"].map(async page => {
                        const {
                            title,
                            PageIcon
                        } = await getPageMetadata(page);
                        return <Button component={Link} href={`/${page}`} startIcon={<PageIcon />} key={page}>
                            {title}
                        </Button>;
                    })}
                    <Button href="https://blog.neila.top" startIcon={<BookIcon />} target="_blank">
                        博客
                    </Button>
                </ButtonGroup>
            </Box>
        </CenterGrid>
    </Grid>;
}
