import { Box, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import { colors } from "../../../../common";

type Props = {};

const BoxCheck = styled(Box)(({ theme }) => ({
  backgroundColor: colors.success,
}));

const ProposalConfirm = (props: Props) => {
  return (
    <Box className="flex flex-col  gap-8">
      <Box className="flex flex-col p-20 rounded-md gap-8">
        <Box className="flex justify-center">
          <BoxCheck className="w-24 h-24 rounded flex items-center justify-center">
            <CheckIcon className="!w-12 !h-12" />
          </BoxCheck>
        </Box>
        <Box className="flex flex-col justify-center gap-6 my-10">
          <Typography variant="h6" className="text-center">
            Your proposal has been created, you can view your proposal by
            opening this link{" "}
            <Link
              variant="h6"
              target="_blank"
              href="https://covenant.vote/yhs77hannnnabsh69"
            >
              https://covenant.vote/yhs77hannnnabsh69
            </Link>
          </Typography>

          <Typography variant="h6" className="text-center">
            IPFS: LINK
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { ProposalConfirm };
