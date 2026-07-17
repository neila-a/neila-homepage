"use client";
import {
    Icon
} from "@iconify/react";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CodeIcon from "@mui/icons-material/Code";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import GithubIcon from "@mui/icons-material/GitHub";
import TerrainIcon from "@mui/icons-material/Terrain";
import {
    SvgIcon
} from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import {
    SxProps,
    Theme
} from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from '@mui/material/Typography';
import {
    useAtomValue
} from "jotai";
import {
    ReactNode
} from "react";
import projectCategories from "../../../../../data/projects/categories.json";
import {
    author
} from "../../../../../package.json";
import {
    categorizedProjectsAtom
} from "../../../atoms";
const
    cardWidth = 300,
    smallIconStyle = {
        fontSize: "1rem",
        mr: 1
    } satisfies SxProps<Theme>;
const Projects = () => projectCategories.map(([category, categoryShowName]) => <section key={category}>
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
            let actions = [] as [
                name: ReactNode,
                href: string
            ][];
            if ("url" in project && project?.url) {
                actions.push([
                    "打开",
                    project.url
                ]);
            }
            if (isGithub) {
                actions.push([
                    <>
                        在
                        <GithubIcon sx={{
                            mx: 1
                        }} />
                        Github 上打开
                    </>,
                    `https://github.com/${author.github.name}/${project.name}`
                ]);
            }
            if ("videoID" in project && project?.videoID) {
                actions.push([
                    <>
                        在
                        <Icon style={{
                            fontSize: 24,
                            margin: "0px var(--mui-spacing)"
                        }} icon="ant-design:bilibili-outlined" />
                        哔哩哔哩上打开
                    </>,
                    `https://www.bilibili.com/video/${project.videoID}`
                ]);
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
                    {actions.length > 0 && <CardActions>
                        {actions.map(action => <Button href={action[1]} key={action[1]} target="_blank">
                            {action[0]}
                        </Button>)}
                    </CardActions>}
                </Card>
            </Grid>;
        })}
    </Grid>
</section>);
export default Projects;