import { Typography, Box, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  label?: string;
  helpText?: string;
}

const FormLabel = ({ label, helpText }: Props) => {
  return (
    <Box className="flex basis-3/12 gap-2 items-center">
      <Typography className="text-white" component="label" variant="subtitle2">
        {label}
      </Typography>
      {helpText && (
        <Tooltip title={helpText} placement="top">
          <InfoIcon />
        </Tooltip>
      )}
    </Box>
  );
};

FormLabel.defaultProps = {
  label: "",
  helpText: "",
};

export { FormLabel };
