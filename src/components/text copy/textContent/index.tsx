import { Typography } from "@mui/material";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const TextContent: React.FC<Props> = ({ children }) => (
  <Typography variant="subtitle1" className="">
    {children}
  </Typography>
);

export { TextContent };
