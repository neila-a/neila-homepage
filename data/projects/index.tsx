import Link from "@mui/material/Link";
import {
    StaticImageData
} from "next/image";
import {
    ReactNode
} from "react";
import {
    author
} from "../../package.json";
import AllernacimCover from "./covers/Allernacim.png";
import RudolphCover from "./covers/Rudolph.png";
import SecrentatumCover from "./covers/Secrentatum.png";
interface BaseProject {
    name: ReactNode;
    description: ReactNode;
    /**
     * 开始时间
     */
    startDate: string;
    cover?: StaticImageData;
    translatedName?: string;
}
interface CodeProject extends BaseProject {
    category: "code";
    /**
     * 为空即为假
     */
    github?: boolean;
    url?: string;
}
interface VideoProject extends BaseProject {
    /**
     * *1024
     * @example 2048 = size: 2
     */
    size: number;
    /**
     * 视频的 ID
     * 包含BV
     */
    videoID?: string;
}
interface TerrainProject extends VideoProject {
    category: "terrain";
}
interface BuildingProject extends VideoProject {
    category: "building";
}
type Project = CodeProject | TerrainProject | BuildingProject;
interface githubRepoResponse {
    name: string;
    description: string;
    fork: boolean;
    created_at: string;
    size?: number;
    url?: string;
    homepage: string | null;
}
const
    githubAPI = `https://api.github.com/user/${author.github.id}/repos`,
    repos = ((await (await fetch(githubAPI)).json()) as githubRepoResponse[]),
    WorldMachine = () => <Link href="https://world-machine.com/">
        WorldMachine
    </Link>,
    lazyDate = "有过记载，但我懒得去查了",
    projects = [
        ...repos.filter(repo => !repo.fork).map(repo => {
            delete repo.url;
            delete repo.size;
            if (repo.homepage) {
                repo.url = repo.homepage;
            }
            return {
                ...repo,
                category: "code",
                github: true,
                startDate: new Date(repo.created_at).toString()
            } satisfies CodeProject;
        }),
        {
            category: "terrain",
            name: "Rudolph",
            translatedName: "瑞克星",
            startDate: lazyDate,
            size: 1,
            description: "瑞克（ricklin）征召所作。",
            cover: RudolphCover,
            videoID: "BV1JnkMBFEPf"
        },
        {
            category: "terrain",
            name: "Sivlat",
            translatedName: "希伏拉特",
            startDate: lazyDate,
            size: 4,
            description: <>
                <Link href="https://www.sencraft.top/">
                    森服
                </Link>
                领域改为4K大后的第一个地形。
            </>
        },
        {
            category: "terrain",
            name: "Secrentatum",
            size: 4,
            startDate: lazyDate,
            cover: SecrentatumCover,
            description: <>
                第一次使用了由
                <WorldMachine />
                导出的遮罩设置的森林。
            </>,
            videoID: "BV1GNwmzGEPJ"
        },
        {
            category: "terrain",
            name: "Allernacim",
            cover: AllernacimCover,
            size: 4,
            startDate: lazyDate,
            description: "据说高空看起来像一只小猫……",
            videoID: "BV1yMEJ65ETC"
        },
        {
            category: "building",
            name: "Libear City",
            translatedName: "小熊市",
            size: 1,
            startDate: lazyDate,
            description: "我建筑生涯开始的地方。",
            videoID: "BV1Hh4y1p7nd"
        },
        {
            category: "building",
            name: "Wozland",
            translatedName: "沃兹地",
            size: 2,
            startDate: "2024年寒假",
            description: <>
                虽然是建立在由
                <WorldMachine />
                做的地形之上的，但是把地全都平掉了。
            </>,
            videoID: "BV1MK421174t"
        },
        {
            category: "building",
            name: "Hos City",
            translatedName: "霍斯市",
            size: 0.5,
            startDate: lazyDate,
            description: "在移动设备上创造。第一次有了从高空看很完美的立交，虽然从正面看很糟糕。"
        }
    ] satisfies Project[];
export default projects;
