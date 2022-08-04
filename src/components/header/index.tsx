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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import { colors } from "../../common";
import { HeaderLeft } from "./left";
import styles from "./styles.module.scss";

const itemsList = ["Polygon", "Ethereum", "Optimism"];

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(7, 16, 24, 0.81)",
  color: colors.textGrayLight,
}));

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [selectedCrypto, setselectedCrypto] = useState("Polygon");

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

  const selectMenuItem = (crypto: string) => {
    setOpen(false);
    setselectedCrypto(crypto);
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
                        onClick={() => selectMenuItem(il)}
                        key={`mi_${idx}`}
                      >
                        {il}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </StyledPaper>
            </Grow>
          )}
        </Popper>
        <Button variant="contained" color="tealLight">
          Connect
        </Button>
      </Box>
    </header>
  );
};

export { Header };
