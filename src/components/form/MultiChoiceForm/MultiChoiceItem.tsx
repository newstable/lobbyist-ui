import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const MultiChoiceItem = (props: any) => {
    const { voteOption, actived, ClickEvent } = props;
    return (
        <Box className={`Multi-choice-item w-full flex flex-row border border-solid rounded-full cursor-pointer px-6 py-2 ${actived ? 'active-item' : ''}`}
            onClick={() => { ClickEvent(voteOption.value); }}>
            <Box className="h-full flex items-center justify-center cursor-pointer">
                {actived && <CheckOutlinedIcon />}
            </Box>

            <Box className="h-full w-full flex items-center justify-center cursor-pointer">
                {voteOption.display}
            </Box>

            <Box className="h-full flex items-center justify-center cursor-pointer">
                {actived && <CloseOutlinedIcon />}
            </Box>
        </Box>
    );
};

export { MultiChoiceItem };

