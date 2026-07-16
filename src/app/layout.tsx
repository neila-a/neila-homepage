import {
    AppRouterCacheProvider
} from "@mui/material-nextjs/v16-appRouter";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
    ThemeProvider
} from "@mui/material/styles";
import {
    Metadata
} from "next";
import {
    author,
    description,
    keywords
} from "../../package.json";
import theme from "./theme";
const
    title = {
        template: `%s | ${author.name}`,
        default: author.name
    },
    /**
     * 不能使用 `cmn`
     */
    locale = "zh_CN";
export const metadata = {
    title: {
        template: `%s | ${author.name}`,
        default: author.name
    },
    icons: "/icon.jpg",
    description,
    applicationName: description,
    authors: author,
    keywords,
    creator: author.name,
    openGraph: {
        title,
        description,
        locale,
        phoneNumbers: author.phone,
        siteName: description
        // countryName 似乎并不存在于规范
    },
    twitter: {
        site: author.name,
        siteId: author.twitter.id.toString(),
        creator: author.name,
        creatorId: author.twitter.id.toString(),
        description,
        title
    }
    // facebook、pinterest 属性并不是社交方面的内容
} satisfies Metadata;
export default function RootLayout(props: LayoutProps<"/">) {
    return <Box component="html" lang={locale} sx={{
        // 必须写这里
        scrollbarWidth: "none"
    }} suppressHydrationWarning>
        <Box component="body" sx={{
            margin: 0
        }}>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    {props.children}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </Box>
    </Box>;
}
