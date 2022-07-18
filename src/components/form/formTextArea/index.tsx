import { FormControl, StyledEngineProvider, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import classNames from "classnames";
import { FormInputProps } from "../formInputProps";
import { FormLabel } from "../formLabel";
import styles from "../styles.module.scss";

interface Props extends FormInputProps {}

const FormTextArea = ({
  label,
  helpText,
  name,
  control,
  rules,
  index,
  placeholder,
}: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <FormControl className="flex flex-row items-center gap-4">
        <FormLabel label={label} helpText={helpText} />
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({
            field: { onChange, value, ref },
            fieldState: { error },
            formState,
          }) => {
            let txtValue = value;
            if (typeof index !== "undefined" && Array.isArray(value)) {
              txtValue = value[index].value;
            }
            return (
              <TextField
                className={classNames("basis-9/12", styles.input)}
                placeholder={placeholder}
                ref={ref}
                helperText={error ? error.message : null}
                error={!!error}
                minRows={3}
                onChange={onChange}
                value={txtValue}
                multiline
              />
            );
          }}
        />
      </FormControl>
    </StyledEngineProvider>
  );
};

FormTextArea.defaultProps = {
  label: "",
  placeholder: "",
};

export { FormTextArea };
