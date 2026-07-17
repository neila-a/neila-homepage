"use client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Slide, {
    SlideProps
} from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import {
    useAtomValue
} from "jotai";
import {
    useState
} from "react";
import platforms from "../../../../../data/contacts/platforms";
import {
    searchedContactsAtom
} from "../../../atoms";
export default function Contacts() {
    const
        searchedContacts = useAtomValue(searchedContactsAtom),
        /**
         * 不能使用 copiedText<false | string>，
         * 因为在关闭时设置为 false 后仍会在关闭动画里出现。
         */
        [snackbarOpen, setSnackbarOpen] = useState(false),
        [copiedText, setCopiedText] = useState<string>(""),
        handleCloseSnackbar = () => setSnackbarOpen(false);
    return <>
        <List>
            {searchedContacts.map(({
                platform: platformName,
                account
            }) => {
                const
                    platform = platforms[platformName],
                    haveURL = "url" in platform;
                // Why not use ListItemButton directly?
                // Because https://mui.com/material-ui/react-list/#inset-list-item
                return <ListItem key={platformName + account} {...haveURL ? {
                    secondaryAction: <Tooltip title="复制">
                        {/* 不必添加 aria-label，因为 Tooltip 会自动加上 */}
                        <IconButton edge="end" onClick={async () => {
                            // 不能把浏览器调用放入 useReducer 里，因为 reducer 必须是纯函数。
                            await navigator.clipboard.writeText(account);
                            setCopiedText(account);
                            return setSnackbarOpen(true);
                        }}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Tooltip>
                } : {
                }} disablePadding>
                    <Tooltip title="点击打开">
                        <ListItemButton {...haveURL ? {
                            href: platform.url(account),
                            target: "_blank"
                        } : {
                        }}>
                            <ListItemIcon>
                                <platform.icon sx={{
                                    color: "text.primary"
                                }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={platform.name}
                                secondary={account} />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>;
            })}
        </List>
        <Snackbar open={
            snackbarOpen
        } onClose={
            handleCloseSnackbar
        } autoHideDuration={
            /**
             * @see https://mui.com/material-ui/react-snackbar/#transitions
             */
            1200
        } slots={{
            transition: (props: SlideProps) => <Slide direction="up" {...props} />
        }}>
            <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                variant="filled"
                sx={{
                    width: "100%"
                }}
            >
                已复制 {copiedText} 到剪贴板。
            </Alert>
        </Snackbar>
    </>;
}
