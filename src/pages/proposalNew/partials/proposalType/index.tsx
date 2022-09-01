import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { EnumProposalType } from "../../../../@types/proposal";
import { ProposalNewCard } from "../common";

type Props = {};

const ProposalType = (props: Props) => {
  const { protocol } = useParams();
  return (
    <Box className="grid grid-cols-2 gap-5">
      {Object.keys(EnumProposalType)
        .filter(pt => {
          if (protocol === "aave" || protocol === "vesq" && pt === "gauge") {
            return false;
          }
          return true;
        })
        .map((pt, idx) => (
          <ProposalNewCard
            key={`pl_${idx}`}
            title={EnumProposalType[pt as keyof typeof EnumProposalType]}
            slug={pt === "gauge" ? pt : `${pt}/form`}
            isType
          />
        ))}
    </Box>
  );
};

export { ProposalType };
