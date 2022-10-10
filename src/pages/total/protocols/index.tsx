import Item from "./item";
import { useSelector } from "../../../redux/store";
import "./index.scss";
import { useEffect, useState } from "react";
import { Proposal } from "../../../@types/proposal";
import {
    Card,
    CardContent,
    Box,
    Button,
    useTheme,
    useMediaQuery,
    InputAdornment,
    TextField,
} from "@mui/material";
import classNames from "classnames";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../../components/form/styles.module.scss";
import protocols from "./proposal.json";
import { Protocols } from "../../../@types";

const MyProtocols = () => {
    const [sortProtocols, setProtocol] = useState("");
    const [myprotocols, setMyProtocols] = useState<Protocols[]>([]);

    useEffect(() => {
        setProposal();
    }, [sortProtocols]);

    const setProposal = () => {
        var sortedProtocol: Protocols[] = protocols?.filter(
            (protocol: any) => protocol.protocol.search(new RegExp(sortProtocols, "i")) > -1
        )
        setMyProtocols(sortedProtocol);
    }
    const selectProtocol = (e: any) => {
        setProtocol(e);
    }

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
                {myprotocols?.map((protocol, key) => {
                    return (
                        <Item protocol={protocol} key={key} />
                    )
                })}
            </div>
        </div>
    )
}

export default MyProtocols;