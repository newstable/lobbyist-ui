import { Box } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FormSelect } from "./FormSelect";

const ChoiceSelectItem = (props: any) => {
    const { voption, RemoveEvent, changeEvent, SetAmountEven, keys } = props;
    return (
        <Box className="grid grid-cols-7 gap-2">
            <Box className="col-span-4" sx={{ gridColumn: 'span 4 / span 4' }}>
                <FormSelect items={voption} changeEvent={changeEvent} />
            </Box>

            <Box className="col-span-3 px-3 grid grid-cols-4 gap-2" sx={{ gridColumn: 'span 3 / span 3' }}>
                <Box className="col-span-1 py-2">
                    <Box className="w-full h-full flex flex-col items-center justify-center cursor-pointer border border-white border-solid rounded-lg"
                        onClick={() => { SetAmountEven(voption.key, voption.value - 1) }}>
                        <RemoveIcon />
                    </Box>
                </Box>

                <Box className="col-span-1 py-2 flex flex-col text-center items-center justify-center">
                    {voption.value}
                    {/* <input className="outcome-input rounded-lg" type='number' value={voption.value} onChange={() => { }} /> */}
                    <input value={voption.value} name={`voteAmount${voption.key}`} className='hidden-input' onChange={() => { }} />
                </Box>

                <Box className="col-span-1 w-full py-2">
                    <Box className="w-full h-full flex flex-col items-center justify-center cursor-pointer border border-white border-solid rounded-lg"
                        onClick={() => { SetAmountEven(voption.key, voption.value + 1) }}>
                        <AddIcon />
                    </Box>
                </Box>

                <Box className="col-span-1 w-full py-2 flex flex-col items-end justify-top">
                    {
                        keys.length > 1 &&
                        <DeleteOutlineIcon className="cursor-pointer options-delete-btn" onClick={() => { RemoveEvent(voption.key) }} />
                    }
                </Box>
            </Box>
        </Box>
    )
}
export { ChoiceSelectItem };