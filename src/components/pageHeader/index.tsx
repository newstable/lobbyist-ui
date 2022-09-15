import { Box, Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";
import styles from "./styles.module.scss";

type Props = {
  heading: string | Function;
  headingSub?: string;
  subHeading?: string;
  value?: string;
};

const PageHeader = ({ heading, headingSub, subHeading, value }: Props) => {
  return (
    <Box className={classNames("p-16 hidden", styles.header)}>
      {/* <Box className="flex items-end">
        {typeof heading === "string" && (
          <Typography variant="h1">{heading}</Typography>
        )}
        {typeof heading === "function" && heading()}
        {headingSub && (
          <Typography variant="h1">
            <Typography variant="h3" component="span">
              {headingSub}
            </Typography>
          </Typography>
        )}
      </Box> */}
      {subHeading && <Typography variant="h3">{subHeading}</Typography>}
      {value && <Typography variant="h2">{value}</Typography>}
    </Box>
  );
};

PageHeader.defaultProps = {
  heading: "Lobbyist",
};

export { PageHeader };
