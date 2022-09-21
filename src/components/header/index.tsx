import { FC, useState, useRef, useEffect } from "react";
import {
    Box,
    Button,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Dialog,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { setWalletAddress } from "../../redux/slices/wallet";
import { setProvider } from "../../redux/slices/provider";
import { dispatch } from "../../redux/store";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CallMadeSharpIcon from '@mui/icons-material/CallMadeSharp';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { History } from "../../@types/proposal";

import { colors } from "../../common";
import { HeaderLeft } from "./left";
import styles from "./styles.module.scss";
import { providerOptions } from "../../providerOptions";
import { toHex, truncateAddress } from "../../utils";
import useClipboard from "react-use-clipboard";

const itemsList = [
    {
        name: "Polygon",
        id: "0x89",
        img: "../../../../assets/chains/matic.svg"
    },
    {
        name: "Ethereum",
        id: "0x1",
        img: "../../../../assets/chains/eth.svg"
    },
];

console.log(window.ethereum);

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "rgba(7, 16, 24, 0.81)",
    color: colors.textGrayLight,
}));

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Header: FC = () => {
    const [library, setLibrary]: any = useState();
    const [account, setAccount] = useState("");
    const [error, setError] = useState("");
    const [chainId, setChainId]: any = useState();
    const [open, setOpen] = useState(false);
    const [walletInfo, setWalletInfo] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedCrypto, setselectedCrypto] = useState("Polygon");
    const [selectedImg, setselectedImg] = useState("../../../../assets/chains/matic.svg");
    const [isCopied, setCopied] = useClipboard(account);
    const [copyClipboard, setCopyClipboard] = useState(false);
    const [walletType, setWalletType] = useState("");
    const [history, setHistory] = useState<History[]>([]);

    const addressCopy = () => {
        setCopyClipboard(true);
    }

    useEffect(() => {
        if (localStorage.getItem("history")?.length)
            setHistory(JSON.parse(`${localStorage.getItem("history")}`));
        else {
            setHistory([]);
        }
    }, [walletInfo])

    useEffect(() => {
        if (copyClipboard) {
            setTimeout(() => {
                setCopyClipboard(false);
            }, 2000);
        }
    }, [copyClipboard])

    var styledAddress = account
        ? account.slice(0, 4) + "..." + account.slice(-4)
        : "";

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();

            provider.on("accountsChanged", async (accounts: string[]) => {
                if (accounts.length == 0) {
                    await web3Modal.clearCachedProvider();
                    dispatch(setWalletAddress(""));
                    refreshState();
                }
            })
            const library = new ethers.providers.Web3Provider(provider);
            dispatch(setProvider(library));
            if (library.connection.url == "metamask")
                setWalletType("Metamask")
            else
                setWalletType(library.connection.url);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            setLibrary(library);
            if (accounts) {
                setAccount(accounts[0]);
                dispatch(setWalletAddress(accounts[0]));
            }
            setChainId(network.chainId);
        } catch (error: any) {
            setError(error);
        }
    };

    useEffect(() => {
        if (chainId != "0x89" || chainId != "0x1") {
            if (selectedCrypto == "Polygon") {
                switchNetwork("0x89");
            } else {
                switchNetwork("0x1");
            }
        }
    }, [account])

    const switchNetwork = async (network: string) => {
        try {
            await library.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: toHex(network) }],
            });
        } catch (switchError: any) {
            if (switchError.code === 4902) {
                try {
                    await library.provider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: toHex("137"),
                                chainName: "Polygon",
                                rpcUrls: ["https://polygon-rpc.com/"],
                                blockExplorerUrls: ["https://polygonscan.com/"],
                            },
                        ],
                    });
                } catch (addError) {
                    throw addError;
                }
            }
        }
    };

    useEffect(() => {
        // if (web3Modal.cachedProvider) {
        connectWallet();
        // }
    }, []);

    const refreshState = () => {
        setAccount("");
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const selectMenuItem = (crypto: string, id: string, img: string) => {
        setOpen(false);
        setselectedCrypto(crypto);
        setselectedImg(img);
        switchNetwork(id);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleClickOpen = () => {
        setWalletInfo(true);
    };
    const onHandleModalClose = () => {
        setWalletInfo(false);
    };

    const changeAddress = async () => {
        await web3Modal.clearCachedProvider();
        onHandleModalClose();
        connectWallet();
    }

    const clearHistory = () => {
        localStorage.setItem("history", "");
        setHistory([]);
    }

    return (
        <>
            <header
                className={classNames(
                    "mlg:flex items-center justify-between content w-full mx-auto",
                    styles.main
                )}
            >
                <HeaderLeft />
                <Box className="flex gap-6 header-1">
                    <Button
                        style={{ margin: "auto 0 0 auto" }}
                        variant="contained"
                        color={selectedCrypto == "Polygon" ? "third" : "tealLight"}
                        disableRipple
                        className="!cursor-default"
                        component="button"
                        ref={anchorRef}
                        onClick={handleToggle}
                    >
                        <img style={{ marginRight: "7px" }} width="17px" src={selectedImg}></img>
                        {selectedCrypto}
                    </Button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                        style={{ zIndex: "100000" }}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom-start"
                                            ? "left top"
                                            : "left bottom",
                                }}
                            >
                                <StyledPaper className="min-w-15">
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            {itemsList.map((il, idx) => (
                                                <MenuItem
                                                    className="!justify-center"
                                                    onClick={() =>
                                                        selectMenuItem(
                                                            il.name,
                                                            il.id,
                                                            il.img
                                                        )
                                                    }
                                                    key={`mi_${idx}`}
                                                >
                                                    <img width="17px" style={{ marginRight: "7px" }} src={il.img}></img>
                                                    {il.name}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </StyledPaper>
                            </Grow>
                        )}
                    </Popper>
                    {!account ? (
                        <Button
                            variant="contained"
                            color="tealLight"
                            onClick={connectWallet}
                        >
                            Connect
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="tealLight"
                            onClick={handleClickOpen}
                        >
                            <img width="17px" style={{ marginRight: "7px" }} src="../../../../assets/chains/account.svg"></img>
                            {styledAddress}
                        </Button>
                    )}
                </Box>
            </header>
            <BootstrapDialog
                onClose={onHandleModalClose}
                aria-labelledby="customized-dialog-title"
                open={walletInfo}
            >
                <div className="wallet-modal-container">
                    <div className="wallet-modal-header">
                        <div>Account</div>
                        <div className="close" onClick={onHandleModalClose}>&times;</div>
                    </div>
                    <div className="wallet-modal-body">
                        <div className="justify-s w10">
                            <div className="">Connected with {walletType}</div>
                            <div className="cursorpoint" onClick={() => { changeAddress(); }}>Change</div>
                        </div>
                        <div className="flex justify-start w10 font-1">
                            <div className="address">{styledAddress}</div>
                            <div className=""></div>
                        </div>
                        <div className="justify-s w10 dialog-footer" >
                            <div className="cursorpoint" onClick={() => { setCopied(); addressCopy(); }}><ContentCopyIcon />{copyClipboard ? "Copied" : "Copy address"}</div>
                            <a href={"https://polygonscan.com/address/" + account} className="view"><OpenInNewIcon />View on Block Explorer</a>
                        </div>
                    </div>
                    {history.length > 0 ? (
                        <>
                            <div className="wallet-history">
                                <div>Recent Transactions</div>
                                <div className="clear" onClick={clearHistory}>Clear All</div>
                            </div>
                            {history.map((i, key) => i.address == account ?
                                < div className="wallet-history blue" key={`history_${key}`}>
                                    <a href={"https://polygonscan.com/address/" + i.address} target="_blank">{i.type + " " + i.rewardCurrency}<CallMadeSharpIcon /></a>
                                    <TaskAltIcon />
                                </div> : ""
                            )}
                        </>
                    ) : (
                        <div className="wallet-modal-footer">
                            Your transactions will appear here...
                        </div>
                    )
                    }
                </div>
            </BootstrapDialog>
        </>
    );
};

export { Header };
