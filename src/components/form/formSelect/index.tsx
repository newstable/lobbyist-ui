import {
  FormControl,
  StyledEngineProvider,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { ReactNode } from "react";
import { FormInputProps } from "../formInputProps";
import { FormLabel } from "../formLabel";
import styles from "../styles.module.scss";
import classNames from "classnames";

interface Props extends FormInputProps {
  items?: FormMenuItemType[];
}

export type FormMenuItemType = {
  value?: string | number | readonly string[] | undefined;
  display: ReactNode;
};

const FormSelect = ({
  label,
  placeholder,
  name,
  control,
  rules,
  index,
  helpText,
  items,
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
            let selectValue = value;
            if (typeof index !== "undefined" && Array.isArray(value)) {
              selectValue = value[index].value;
            }
            return (
              <Select
                className={classNames("basis-9/12", styles.input)}
                placeholder={placeholder}
                ref={ref}
                onChange={onChange}
                error={!!error}
                value={selectValue}
              >
                {items?.map((item, idx) => (
                  <MenuItem
                    key={`mi_${idx}`}
                    className={styles.menuItem}
                    value={item.value}
                  >
                    {item.display}
                  </MenuItem>
                ))}
              </Select>
            );
          }}
        />
      </FormControl>
    </StyledEngineProvider>
  );
};

FormSelect.defaultProps = {
  label: "",
  placeholder: "",
  items: [],
};

export { FormSelect };
