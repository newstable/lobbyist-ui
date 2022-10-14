import { FormControl, StyledEngineProvider, Select, MenuItem } from "@mui/material";
import styles from "../styles.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";

const FormSelect = (props: any) => {
    const { items, changeEvent } = props;
    return (
        <StyledEngineProvider injectFirst>
            <FormControl className="flex flex-col items-center">
                <Select
                    className={classNames("basis-9/12", styles.input) + ' w-full'}
                    placeholder={''}
                    onChange={(e) => { changeEvent(e.target.value, items.key); }}
                    name={'voteoption' + items.key}
                    value={items.key}
                >
                    {items.data?.map((item: any, index: number) => (
                        <MenuItem
                            key={index}
                            className={styles.menuItem}
                            value={item.value}
                            onClick={() => { changeEvent(item.value, items.key) }}
                        >
                            {item.display}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </StyledEngineProvider>
    )
}

export { FormSelect }; 