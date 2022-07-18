import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormDataPreview } from "../../../../components/form";

type Props = {};

const BoxForm = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const ProposalPreview = (props: Props) => {
  const { protocol, prsalType, kpi, status } = useParams();
  const navigate = useNavigate();

  const onFundProposal = () => {
    navigate(`/proposal/new/${protocol}/${prsalType}/${kpi}/confirm`);
  };

  return (
    <Box className="flex flex-col gap-8">
      <BoxForm className="flex flex-col p-20 rounded-md gap-8">
        <FormDataPreview label="Proposal Name" />
        <FormDataPreview label="Proposal Description" />
        <FormDataPreview label="Snapshot Proposal" />
        <FormDataPreview label="Reward Currency" />
        <FormDataPreview label="Minimum Proposal" />
      </BoxForm>

      <BoxForm className="flex flex-col p-20 rounded-md gap-8">
        <FormDataPreview label="Vote %" />
        <FormDataPreview label="Range" />
        <FormDataPreview label="Payout" />
        <FormDataPreview label="Blaclist Addresses" />
        <FormDataPreview label="Whitelist Addresses" />
        <FormDataPreview label="Loyalty Vote" />
      </BoxForm>
      <Box className="mb-20 flex justify-end">
        <Button variant="contained" color="tealLight" onClick={onFundProposal}>
          Fund Proposal
        </Button>
      </Box>
    </Box>
  );
};

export { ProposalPreview };
