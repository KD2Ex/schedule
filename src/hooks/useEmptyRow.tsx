import {TableCell} from "@mui/material";


export const useEmptyRow = (number?: number | string, isFirst?: boolean) => {

    return (
        <>
            {number && <TableCell rowSpan={2} >
                {number}
            </TableCell>}


            <TableCell sx={{
                borderRight: 'none !important'
            }}/>

            <TableCell sx={{
                fontStyle: 'italic'
            }}>
                Нет занятия
            </TableCell>

            <TableCell/>
        </>
    )

}