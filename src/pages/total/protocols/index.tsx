import classNames from "classnames";
import ReactLoading from 'react-loading';
import { useCallback, useContext, useEffect, useState } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "./index.scss";
import styles from "../../../components/form/styles.module.scss";

import Item from "./item";
import protocols from "./proposal.json";
import { Protocols } from "../../../@types";
import { NorthWest, WysiwygSharp } from "@mui/icons-material";
import { finished } from "stream";

import { AppContext } from "../../../App";

const firstItems = 9;
const MyProtocols = () => {
    const [sortProtocols, setProtocol] = useState("");
    const [allProtocols, setAllProtocols] = useState<Protocols[]>([]);
    const [myProtocols, setMyProtocols] = useState<Protocols[]>([]);

    useEffect(() => { setProposal(); }, [sortProtocols]);
    const setProposal = () => {
        let sortedProtocol: Protocols[] = protocols?.filter(
            (protocol: any) => protocol.protocol.search(new RegExp(sortProtocols, "i")) > -1
        )
        setAllProtocols(sortedProtocol);
    }
    const selectProtocol = (e: any) => { setProtocol(e); }

    const [loadMoreStatus, setLoadMoreStatus] = useState(false);
    const [loadMoreCount, setLoadMoreCount] = useState(0);
    const loadMoreClick = () => { setLoadMoreStatus(true); setLoadMoreCount(1) };

    useEffect(() => {
        let protocals: Protocols[] = [];
        if (!allProtocols.length) { setMyProtocols(protocals); return; }

        protocals = allProtocols.slice(0, firstItems * (loadMoreCount + 1));
        setMyProtocols(protocals);
    }, [allProtocols, loadMoreCount, loadMoreCount]);

    const [appData] = useContext<any>(AppContext);
    const [beforeScroll, setBeforeScroll] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!appData.scrollState || !loadMoreCount) return;
        const EL = appData.containRef;

        const Height = EL.offsetHeight;
        const scrollTop = EL.scrollTop;
        const totalHeight = EL.scrollHeight;

        if (totalHeight * 0.9 < (scrollTop + Height)) {
            if (scrollTop < beforeScroll + 200) return;
            setBeforeScroll(scrollTop);

            if (allProtocols.length > firstItems * (loadMoreCount + 1))
                setLoading(true);

            setTimeout(() => {
                setLoadMoreCount(loadMoreCount + 1);
                setLoading(false);
            }, 2000);
        }
    }, [appData.scrollState]);

    return (
        <div className="wall">
            <Box className="mb-16 rounded-50">
                <TextField
                    className={classNames(styles.input, "bg-black rounded-50")}
                    placeholder="Search for protocols..."
                    fullWidth
                    onChange={(e) => selectProtocol(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <div className="justify-center mt-12 wall-grid-col grid gap-8">
                {myProtocols?.map((protocol, key) => {
                    return (
                        <Item protocol={protocol} key={key} />
                    )
                })}
            </div>


            {
                allProtocols.length > firstItems &&
                <Box component='span' className="flex items-center justify-center load-more-btn">
                    {
                        !loadMoreStatus && <Typography component="h6"
                            className="flex items-center justify-center text-center"
                            onClick={loadMoreClick}
                        >
                            load more <ExpandMoreIcon />
                        </Typography>
                    }
                </Box>
            }

            {loading && <Box component={'span'} className='flex items-center justify-center'>
                <ReactLoading type='cylon' color={'white'} height={'30px'} width={'80px'} />
            </Box>}
        </div>
    )
}

export default MyProtocols;