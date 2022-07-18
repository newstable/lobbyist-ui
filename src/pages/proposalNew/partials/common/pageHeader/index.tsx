import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { NavBack } from "../../../../../components";
import { BreadCrumb } from "./breadCrumb";

type Props = {};

const PageHeader = (props: Props) => {
  const { protocol } = useParams();

  return protocol ? (
    <Box className="flex justify-between gap-8">
      <NavBack />
      <BreadCrumb></BreadCrumb>
    </Box>
  ) : (
    <Box className="flex h-10"></Box>
  );
};

export { PageHeader };
