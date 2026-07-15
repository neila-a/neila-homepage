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
const
    avatarSize = "max(33vw, 33vh)",
    CenterGrid = (props: {
        children: ReactNode;
    }) => <Grid size={{
        md: 6,
        xs: 12
    }} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
            {props.children}
        </Grid>;
export default function Home() {
    return <Grid container sx={{
        height: "100vh",
        width: "100%"
    }}>
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
                justifyContent: "space-around",
                alignItems: "center"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <Typography variant="h2" sx={{
                            pr: 3
                        }}>
                            {author.name_zh_CN}
                        </Typography>
                        <Typography variant="h1">
                            {author.name}
                        </Typography>
                    </Box>
                    <Typography variant="h5">
                        有时是 {author.alias}
                    </Typography>
                </Box>
                <ButtonGroup variant="text" size="large">
                    <Button>
                        项目
                    </Button>
                    <Button>
                        联系
                    </Button>
                </ButtonGroup>
            </Box>
        </CenterGrid>
    </Grid>;
}
