import { Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { colors } from "../../../common";

type Props = {
  children?: React.ReactNode;
  className?: string;
  color?: string;
};

const TextHead: React.FC<Props> = ({ children, color, className }) => (
  <Typography
    variant="caption"
    color={color ? color : colors.textGray}
    className={classNames("uppercase", className)}
  >
    {children}
  </Typography>
);

export { TextHead };
