import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { MultiChoiceItem } from "./MultiChoiceItem";
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

const MultiChoiceForm = (props: any) => {
    const { voteOption, formRef, VoteType, SetKeysEvent } = props;
    const [SelectedKeys, SetSelectedKeys] = useState<number[]>([]);
    const [voteOptions, SetVoteOptions] = useState<voteoptionItem[]>([]);

    const ItemClickFunc = (itemKey: number) => {
        const status = SelectedKeys.find((key: number, index: number) => { return key === itemKey ? true : false });

        if (status !== itemKey) SetSelectedKeys([...SelectedKeys, itemKey]);
        else {
            let newKeys = SelectedKeys.reduce((keys: number[], key: number, index: number) => {
                return key === itemKey ? [...keys] : [...keys, key];
            }, [])
            SetSelectedKeys(newKeys);
        }
    }
    useEffect(() => {
        let TempOptions = Object.assign([], voteOption);
        if (VoteType === 'ranked-choice') {
            TempOptions.sort((a: voteoptionItem, b: voteoptionItem) => {
                let SelectA = SelectedKeys.findIndex((i) => i === a.value) + 1;
                let SelectB = SelectedKeys.findIndex((i) => i === b.value) + 1;
                return SelectA === 0 || SelectB === 0 ? SelectB - SelectA : SelectA - SelectB;
            });
        }
        SetVoteOptions(TempOptions);
    }, [SelectedKeys, VoteType]);

    useEffect(() => { SetSelectedKeys([]); }, [VoteType])

    useEffect(() => { SetKeysEvent([...SelectedKeys]); }, [SelectedKeys]);
    return (
        <form ref={formRef}>
            <Box className="w-full flex flex-row items-start gap-4 py-2">
                <Typography className="flex basis-3/12 gap-2 text-white" component={'h2'}>Outcome Choice</Typography>

                <Box className="w-full flex-1 flex flex-col items-start gap-4">
                    {
                        voteOptions.map((item: voteoptionItem, index: number) => {
                            return (
                                <MultiChoiceItem key={index}
                                    voteOption={item}
                                    Index={index}
                                    VoteType={VoteType}
                                    actived={SelectedKeys.find((key: number) => { return key === item.value; }) === item.value ? true : false}
                                    ClickEvent={ItemClickFunc} />)
                        })
                    }
                </Box>
            </Box>
        </form >
    );
};

export { MultiChoiceForm };

