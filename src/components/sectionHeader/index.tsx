import { Box, OutlinedInput, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import styles from "./styles.module.scss";

type Props = {
  heading: string;
  onSearchChange?: () => void;
};

const SectionHeader = ({ heading, onSearchChange }: Props) => {
  return (
    <Box
      className={classNames(
        "mb-10 flex w-full items-center justify-between",
        styles.header
      )}
    >
      <Typography variant="h3">{heading}</Typography>
      <OutlinedInput
        type="text"
        className="h-12"
        placeholder="Search proposals..."
        onChange={onSearchChange}
      />
    </Box>
  );
};

SectionHeader.defaultProps = {
  heading: "Covenant",
};

export { SectionHeader };
