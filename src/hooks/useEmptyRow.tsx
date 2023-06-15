import {TableCell} from "@mui/material";


export const useEmptyRow = (number?: number | string, isFirst?: boolean) => {

    return (
        <>
            {number && <TableCell rowSpan={isFirst ? 2 : null} sx={{textAlign: 'center'}} >
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