"use client";
import {
    useAtomValue
} from "jotai";
import {
    categorizedProjectsAtom
} from "../../../atoms";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import projectCategories from "../../../../../data/projects/categories.json";
import {
    SvgIcon
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import CodeIcon from "@mui/icons-material/Code";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import GithubIcon from "@mui/icons-material/GitHub";
import TerrainIcon from "@mui/icons-material/Terrain";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import {
    ReactNode
} from "react";
import {
    author
} from "../../../../../package.json";
import {
    SxProps,
    Theme
} from "@mui/material/styles";
import {
    Icon
} from "@iconify/react";
const
    cardWidth = 300,
    smallIconStyle = {
        fontSize: "1rem",
        mr: 1
    } satisfies SxProps<Theme>;
export default function Projects() {
    return projectCategories.map(([category, categoryShowName]) => <section key={category}>
        <Typography variant="h4">
            {categoryShowName}
        </Typography>
        <Grid container columns={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5
        }} sx={{
            p: 2
        }} rowSpacing={2}>
            {useAtomValue(categorizedProjectsAtom)[category].map(project => {
                const isGithub = "github" in project && project?.github;
                let ProjectIcon: typeof SvgIcon;
                switch (project.category) {
                    case "code":
                        if (isGithub) {
                            ProjectIcon = GithubIcon;
                            break;
                        }
                        ProjectIcon = CodeIcon;
                        break;
                    case "terrain":
                        ProjectIcon = TerrainIcon;
                        break;
                    case "building":
                        ProjectIcon = CorporateFareIcon;
                        break;
                }
                let action: ReactNode = undefined;
                if ("url" in project && project?.url) {
                    action = <Button href={(project.url as URL).toString()}>
                        打开
                    </Button>;
                }
                if (isGithub) {
                    action = <Button href={`https://github.com/${author.github.name}/${project.name}`}>
                        在
                        <GithubIcon sx={{
                            mx: 1
                        }} />
                        Github 上打开
                    </Button>;
                }
                if ("videoID" in project && project?.videoID) {
                    action = <Button>
                        在
                        <Icon style={{
                            fontSize: 24,
                            margin: "0px var(--mui-spacing)"
                        }} icon="ant-design:bilibili-outlined" />
                        哔哩哔哩上打开
                    </Button>;
                }
                return <Grid size={1} key={project.name} sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}>
                    <Card sx={{
                        maxWidth: cardWidth
                    }}>
                        {"cover" in project && <CardMedia
                            component="img"
                            alt={`${project.name}的封面`}
                            height={cardWidth / 16 * 9}
                            image={project.cover?.src} />}
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <ProjectIcon sx={{
                                    mr: 1
                                }} />
                                {project.name}
                            </Typography>
                            {"translatedName" in project && <Typography variant="body2" sx={{
                                color: 'text.secondary'
                            }}>
                                {project.translatedName}
                            </Typography>}
                            {"size" in project && <Tooltip title="大小">
                                <Typography variant="body2" sx={{
                                    color: 'text.secondary',
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <AspectRatioIcon sx={smallIconStyle} />
                                    {project.size}K
                                </Typography>
                            </Tooltip>}
                            <Tooltip title="开始时间">
                                <Typography gutterBottom variant="body2" sx={{
                                    color: 'text.secondary',
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <CalendarMonthIcon sx={smallIconStyle} />
                                    {project.startDate}
                                </Typography>
                            </Tooltip>
                            <Typography variant="body1">
                                {project.description}
                            </Typography>
                        </CardContent>
                        {action && <CardActions>
                            {action}
                        </CardActions>}
                    </Card>
                </Grid>;
            })}
        </Grid>
    </section>)
}
