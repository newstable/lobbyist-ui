import { Box } from "@mui/material";
import { EnumProposalKpi } from "../../../../@types/proposal";
import { ProposalNewCard } from "../common";

type Props = {};

const ProposalKpi = (props: Props) => {
  return (
    <Box className="grid grid-cols-2 gap-5">
      {Object.keys(EnumProposalKpi).map((pt, idx) => (
        <ProposalNewCard
          key={`pl_${idx}`}
          title={EnumProposalKpi[pt as keyof typeof EnumProposalKpi]}
          slug={pt}
          isType
        />
      ))}
    </Box>
  );
};

export { ProposalKpi };
