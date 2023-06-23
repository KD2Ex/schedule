import React, {FC, useState} from 'react';
import {Checkbox, TableCell} from "@mui/material";
import schedule from "../../store/schedule";

interface CheckBoxCellProps {
    rowSpan: number,
}

const CheckBoxCell: FC<CheckBoxCellProps> = ({value, handleCheck, rowSpan}) => {


    return (
        <TableCell rowSpan={rowSpan}>
            <Checkbox
                checked={!value}
                onClick={handleCheck}
            />
        </TableCell>
    );
};

export default CheckBoxCell;