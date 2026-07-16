import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
    author
} from "../../package.json";
import Avatar from "@mui/material/Avatar";
import {
    ReactNode
} from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Link from "./Link";
import getPageMetadata from "./[page]/getPage";
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
            <Avatar alt="头像" src="/icon.jpg" sx={{
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
                            pr: 3
                        }} component="span">
                            {author.name_zh_CN}
                        </Typography>
                        <Typography variant="h1" component="span">
                            {author.name}
                        </Typography>
                    </TextsBox>
                    <TextsBox>
                        {[
                            "有时是",
                            ...author.alias.split(" ")
                        ].map((text, index) => <Typography key={text} sx={{
                            pr: "0.25rem"
                        }} variant={index === 2 ? "h6" : "h5"} component="span">
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
                        } = (await getPageMetadata(page)).metadata;
                        return <Button component={Link} href={`/${page}`} startIcon={<PageIcon />}>
                            {title}
                        </Button>;
                    })}
                </ButtonGroup>
            </Box>
        </CenterGrid>
    </Grid>;
}
