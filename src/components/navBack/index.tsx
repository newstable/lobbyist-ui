import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {};

const NavBack = (props: Props) => {
  const navigate = useNavigate();
  const onGoBack = () => {
    navigate(-1);
  };
  return (
    <Typography className="underline cursor-pointer" onClick={onGoBack}>
      Back
    </Typography>
  );
};

export { NavBack };
