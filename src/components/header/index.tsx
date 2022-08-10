import { FC, useState, useRef, useEffect } from "react";
import { Box, Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, } from "@mui/material";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import Web3Modal from 'web3modal'
import { ethers } from "ethers";

import { colors } from "../../common";
import { HeaderLeft } from "./left";
import styles from "./styles.module.scss";
import { providerOptions } from "../../providerOptions";
import { toHex, truncateAddress } from "../../utils";
import { networkParams } from "../../networks";

const itemsList = [
  {
    "name": "Polygon",
    "id": "0x89"
  },
  {
    "name": "Polygon Mumbai",
    "id": "0x13881"
  }
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(7, 16, 24, 0.81)",
  color: colors.textGrayLight,
}));

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

const Header: FC = () => {
  const [provider, setProvider] = useState();
  const [library, setLibrary]: any = useState();
  const [account, setAccount]: any = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId]: any = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [selectedCrypto, setselectedCrypto] = useState("Polygon");

  var styledAddress = account
    ? account.slice(0, 4) + "..." + account.slice(-4)
    : "";
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
      if (selectedCrypto != "Polygon") {
        switchNetwork("Polygon");
      }
    } catch (error: any) {
      setError(error);
    }
  };

  const switchNetwork = async (network: string) => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }]
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
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  // useEffect(() => {
  //   if (provider?.on) {
  //     const handleAccountsChanged = (accounts:any) => {
  //       console.log("accountsChanged", accounts);
  //       if (accounts) setAccount(accounts[0]);
  //     };

  //     const handleChainChanged = (_hexChainId:any) => {
  //       setChainId(_hexChainId);
  //     };

  //     const handleDisconnect = () => {
  //       console.log("disconnect", error);
  //       disconnect();
  //     };

  //     provider.on("accountsChanged", handleAccountsChanged);
  //     provider.on("chainChanged", handleChainChanged);
  //     provider.on("disconnect", handleDisconnect);

  //     return () => {
  //       if (provider.removeListener) {
  //         provider.removeListener("accountsChanged", handleAccountsChanged);
  //         provider.removeListener("chainChanged", handleChainChanged);
  //         provider.removeListener("disconnect", handleDisconnect);
  //       }
  //     };
  //   }
  // }, [provider]);

  const refreshState = () => {
    setAccount();
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
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

  const selectMenuItem = (crypto: string, id: string) => {
    setOpen(false);
    setselectedCrypto(crypto);
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

  return (
    <header
      className={classNames(
        "flex items-center justify-between content w-full mx-auto",
        styles.main
      )}
    >
      <HeaderLeft />
      <Box className="hidden mlg:flex gap-6">
        <Button
          variant="contained"
          color="third"
          disableRipple
          className="!cursor-default"
          component="button"
          ref={anchorRef}
          onClick={handleToggle}
        >
          {selectedCrypto}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
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
                        onClick={() => selectMenuItem(il.name, il.id)}
                        key={`mi_${idx}`}
                      >
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
          <Button variant="contained" color="tealLight" onClick={connectWallet}>
            Connect
          </Button>
        ) : (
          <Button variant="contained" color="tealLight" onClick={disconnect}>
            {styledAddress}
          </Button>
        )}
      </Box>
    </header>
  );
};

export { Header };
