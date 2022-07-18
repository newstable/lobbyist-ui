import {
  FormControl,
  StyledEngineProvider,
  Box,
  Slider,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../formInputProps";
import { FormLabel } from "../formLabel";

interface Props extends FormInputProps {
  valueLabelFormat?: (value: number, index: number) => string;
  inputName: string;
}

const FormRangeSliderInput = ({
  label,
  name,
  inputName,
  control,
  rules,
  index,
  helpText,
  valueLabelFormat,
  setValue,
}: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <FormControl className="flex flex-row flex-auto items-center gap-4">
        <FormLabel label={label} helpText={helpText} />
        <Box className="basis-9/12 flex">
          <Box className="basis-8/12 flex items-center">
            <Controller
              name={name}
              control={control}
              render={({
                field: { onChange, value: fieldValue, ref },
                formState,
              }) => {
                return (
                  <Slider
                    getAriaLabel={() => "Default"}
                    ref={ref}
                    value={fieldValue}
                    onChange={(e, changeVal) => {
                      setValue(inputName, changeVal);
                      onChange(changeVal);
                    }}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valueLabelFormat}
                  />
                );
              }}
            />
          </Box>
          <Box className="basis-1/12"></Box>
          <Box className="basis-3/12 flex gap-2">
            <Controller
              name={inputName}
              control={control}
              render={({
                field: { onChange, value: fieldValue, ref },
                fieldState: { error },
                formState,
              }) => {
                let txtValue = fieldValue[0];
                return (
                  <TextField
                    ref={ref}
                    helperText={error ? error.message : null}
                    error={!!error}
                    type="number"
                    InputProps={{
                      inputProps: { min: 0, max: 100, maxLength: 3 },
                    }}
                    onChange={e => {
                      const currentVal = Number(e.target.value);
                      if (currentVal < fieldValue[1]) {
                        const newArr = [Number(e.target.value), fieldValue[1]];
                        setValue(name, newArr);
                        onChange(newArr);
                      }
                    }}
                    value={txtValue}
                    fullWidth
                  />
                );
              }}
            />
            <Controller
              name={inputName}
              control={control}
              render={({
                field: { onChange, value: fieldValue, ref },
                fieldState: { error },
                formState,
              }) => {
                let txtValue = fieldValue[1];
                return (
                  <TextField
                    ref={ref}
                    helperText={error ? error.message : null}
                    error={!!error}
                    type="number"
                    InputProps={{
                      inputProps: { min: 0, max: 100, maxLength: 3 },
                    }}
                    onChange={e => {
                      const currentVal = Number(e.target.value);
                      if (fieldValue[0] < currentVal) {
                        const newArr = [fieldValue[0], Number(e.target.value)];
                        setValue(name, newArr);
                        onChange(newArr);
                      }
                    }}
                    value={txtValue}
                    fullWidth
                  />
                );
              }}
            />
          </Box>
        </Box>
      </FormControl>
    </StyledEngineProvider>
  );
};

FormRangeSliderInput.defaultProps = {
  label: "",
  placeholder: "",
};

export { FormRangeSliderInput };
