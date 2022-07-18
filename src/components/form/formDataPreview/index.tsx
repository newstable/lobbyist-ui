import {
  FormControl,
  FormLabel,
  StyledEngineProvider,
  Typography,
} from "@mui/material";

type Props = {
  label?: string;
  value?: string;
};

const FormDataPreview = ({ label, value }: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <FormControl className="flex flex-row items-center gap-4">
        <FormLabel className="basis-3/12">{label}</FormLabel>
        <Typography className="basis-9/12">{value}</Typography>
      </FormControl>
    </StyledEngineProvider>
  );
};

FormDataPreview.defaultProps = {
  label: "",
};

export { FormDataPreview };
