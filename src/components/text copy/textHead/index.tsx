import { Typography } from "@mui/material";
import React from "react";
import { colors } from "../../../common";

type Props = {
  children?: React.ReactNode;
};

const TextHead: React.FC<Props> = ({ children }) => (
  <Typography variant="caption" color={colors.textGray}>
    {children}
  </Typography>
);

export { TextHead };
