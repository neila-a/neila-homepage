"use client";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import {
    useAtom
} from 'jotai';
import {
    searchTextAtom
} from '../atoms';
export default function Search() {
    const [searchText, setSearchText] = useAtom(searchTextAtom);
    return <TextField value={searchText} onChange={event => setSearchText(event.target.value)} slotProps={{
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
    }} placeholder='搜索' variant="outlined" fullWidth />;
}