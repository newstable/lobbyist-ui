import { Box } from "@mui/material";
import { ProtocolsList } from "../../../../@types/protocol";
import { ProposalNewCard } from "../common";

type Props = {};

const ProtocolList = (props: Props) => {
  return (
    <Box className="grid grid-cols-3 gap-20">
      {ProtocolsList.map((pl, idx) => (
        <ProposalNewCard key={`pl_${idx}`} title={pl.name} slug={pl.symbol} />
      ))}
    </Box>
  );
};

export { ProtocolList };
