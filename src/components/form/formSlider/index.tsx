import { FormControl, StyledEngineProvider, Box, Slider } from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../formInputProps";
import { FormLabel } from "../formLabel";

interface Props extends FormInputProps {
  valueLabelFormat?: (value: number, index: number) => string;
}

const FormSlider = ({
  label,
  name,
  control,
  rules,
  index,
  helpText,
  valueLabelFormat,
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
            render={({ field: { onChange, value, name, ref }, formState }) => {
              let sliderVal = value;
              if (typeof index !== "undefined" && Array.isArray(value)) {
                sliderVal = value[index].value;
              }
              return (
                <Slider
                  getAriaLabel={() => "Default"}
                  value={sliderVal}
                  ref={ref}
                  onChange={onChange}
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

FormSlider.defaultProps = {
  label: "",
  placeholder: "",
};

export { FormSlider };
