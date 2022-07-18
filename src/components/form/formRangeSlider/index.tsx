import { FormControl, StyledEngineProvider, Box, Slider } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../formInputProps";
import { FormLabel } from "../formLabel";

interface Props extends FormInputProps {
  valueLabelFormat?: (value: number, index: number) => string;
}

const FormRangeSlider = ({
  label,
  name,
  control,
  rules,
  index,
  helpText,
  valueLabelFormat,
  setValue,
}: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <FormControl className="flex flex-row items-center gap-4">
        <FormLabel label={label} helpText={helpText} />
        <Box className="basis-9/12">
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value, ref }, formState }) => {
              let sliderVal = [];
              if (typeof index !== "undefined" && Array.isArray(value)) {
                sliderVal = value[index].value;
              }
              return (
                <Slider
                  getAriaLabel={() => "Default"}
                  defaultValue={sliderVal}
                  ref={ref}
                  onChange={(event: Event, newValue: number | number[]) => {
                    // setValue && setValue(newValue);
                    onChange(newValue);
                  }}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valueLabelFormat}
                />
              );
            }}
          />
        </Box>
      </FormControl>
    </StyledEngineProvider>
  );
};

FormRangeSlider.defaultProps = {
  label: "",
  placeholder: "",
};

export { FormRangeSlider };
