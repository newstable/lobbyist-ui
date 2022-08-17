import {
  FormControl,
  TextField,
  StyledEngineProvider,
  InputProps,
} from "@mui/material";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../formInputProps";
import styles from "../styles.module.scss";
import { FormLabel } from "../formLabel";

interface Props extends FormInputProps {
  inputProps?: InputProps;
  inputClass?: string;
  time?: string;
  readonly?: boolean;
  setrewardAmount?: any;
  textType?: string
}

const FormTextField = ({
  label,
  placeholder,
  name,
  control,
  rules,
  index,
  helpText,
  inputProps,
  inputClass,
  time,
  readonly,
  setrewardAmount,
  textType
}: Props) => {
  const onChangerewardValue = (e: any) => {
    if (setrewardAmount) {
      setrewardAmount(e);
    }
  }
  return (
    <StyledEngineProvider injectFirst>
      <FormControl className="flex flex-row items-center gap-4">
        {label && <FormLabel label={label} helpText={helpText} />}

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
              <>
                {readonly ? (
                  <TextField
                    disabled
                    className={classNames(label && "basis-9/12", styles.input, inputClass)}
                    placeholder={placeholder}
                    ref={ref}
                    helperText={error ? error.message : null}
                    error={!!error}
                    value={time}
                    fullWidth
                    InputProps={inputProps}
                  />
                ) : (
                  <TextField
                    className={classNames(label && "basis-9/12", styles.input, inputClass)}
                    placeholder={placeholder}
                    ref={ref}
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={(e) => { onChange(e.target.value); onChangerewardValue(e.target.value) }}
                    value={txtValue}
                    fullWidth
                    inputProps={{ type: textType }}
                    InputProps={inputProps}
                  />
                )}
              </>
            );
          }}
        />
      </FormControl>
    </StyledEngineProvider>
  );
};

FormTextField.defaultProps = {
  label: "",
  placeholder: "",
};

export { FormTextField };
