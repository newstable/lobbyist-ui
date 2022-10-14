import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ChoiceSelectItem } from "./ChoiceSelectItem";
import './index.scss';

interface voteoptionItem {
    value?: number,
    display?: string
}

type voteOptionCount = {
    key: number,
    value: number,
    data: voteoptionItem[]
}

function FindOptionCnt(options: any, key: number) {
    let result = options.find((item: any) => { return item.key === key ? true : false; })
    return result;
}

function FilterOptions(options: any, keys: number[], itemKey: number) {
    let filteroptions = options.reduce((items: any, item: any, index: any) => {
        let state = keys.every((i: number) => { return itemKey === item.value ? true : i === item.value ? false : true; });
        return state ? [...items, item] : items;
    }, []);

    return filteroptions;
}

const OutcomeChoiceForm = (props: any) => {
    const { voteOption, formRef, SetKeysEvent } = props;

    const [disabled, SetDisabled] = useState(true);
    const [OptionCnt, SetOptionCnt] = useState<voteOptionCount[]>([]);
    const [keys, Setkeys] = useState<number[]>([]);
    const [totalAmount, SetTotalAmount] = useState(0);

    useEffect(() => { if (voteOption.length > 0) Setkeys([voteOption[0].value]); }, []);
    useEffect(() => { SetDisabled(voteOption.length > 0 ? voteOption.length === OptionCnt.length ? true : false : false); }, [OptionCnt]);

    useEffect(() => {
        let TAmount = 0;
        let tempKeys = keys;
        let result = tempKeys.reduce((items: any, key: number) => {
            let filterdata = FilterOptions(voteOption, keys, key);
            let beforeData = FindOptionCnt(OptionCnt, key);
            if (beforeData) {
                TAmount += beforeData.value;
                return filterdata.length > 0 ? [...items, { key: key, data: filterdata, value: beforeData.value }] : items;
            }
            else {
                return filterdata.length > 0 ? [...items, { key: key, data: filterdata, value: 0 }] : items;
            }
        }, []);
        SetTotalAmount(TAmount);
        SetOptionCnt(result);
        SetKeysEvent(keys);
    }, [keys]);

    const AddFunc = () => {
        if (keys.length > 0) {
            const empOption = voteOption?.find((item: any, index: number) => {
                return keys.every((key, i) => { return item.value === key ? false : true; });
            });

            if (!!empOption && !!empOption.value || empOption.value === 0) Setkeys([...keys, empOption.value]);
        } else if (voteOption.length > 0) Setkeys([voteOption[0].value]);
    }

    const RemoveFunc = (removekey: number) => {
        let tempKeys = keys;
        const currentKeys = tempKeys.reduce((items: number[], item: number) => {
            return removekey === item ? items : [...items, item];
        }, []);
        Setkeys([...currentKeys]);
    }

    const ChangeFunc = (changedKey: number, beforeKey: number) => {
        let result = keys.reduce((items: number[], key: number) => {
            return beforeKey === key ? [...items, changedKey] : [...items, key];
        }, []);
        Setkeys([...result]);
    }

    const SetAmount = (key: number, amount: number) => {
        if (amount < 0) return;
        let TAmount = 0;
        let result = OptionCnt.reduce((items: any, item: any) => {
            let tempData = item;
            if (key === item.key) tempData.value = amount;
            TAmount += tempData.value;
            return [...items, tempData];
        }, [])
        SetTotalAmount(TAmount);
        SetOptionCnt(result);
    }

    return (
        <form ref={formRef}>
            <Box className="flex flex-col w-full">
                {
                    OptionCnt.map((item, index) => {
                        return (
                            <Box className="flex flex-row items-center gap-4 py-2" key={index}>
                                <Typography className="flex basis-3/12 gap-2 items-center text-white" component={'h2'}>Outcome Choice</Typography>

                                <Box className="flex-1 flex flex-col">
                                    <ChoiceSelectItem voption={item} RemoveEvent={RemoveFunc} changeEvent={ChangeFunc} SetAmountEven={SetAmount} keys={keys} />
                                </Box>
                            </Box>
                        )
                    })
                }

                <Box className="flex flex-row pt-8 item-end justify-end">
                    {!disabled && <Button variant="contained" color="tealLight" type="button" onClick={AddFunc} disabled={disabled}>Add Outcome</Button>}
                </Box>
            </Box>

            <input value={totalAmount} name='totalAmount' className='hidden-input' onChange={() => { }} />
        </form>
    );
};

export { OutcomeChoiceForm };

