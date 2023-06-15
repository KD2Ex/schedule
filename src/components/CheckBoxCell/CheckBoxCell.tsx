import React, {FC, useState} from 'react';
import {Checkbox, TableCell} from "@mui/material";

interface CheckBoxCellProps {
    rowSpan: number,
}

const CheckBoxCell: FC<CheckBoxCellProps> = ({rowSpan}) => {

    const [value, setValue] = useState(true);

    console.log(value)

    const handleCheck = () => {
        setValue(prev => !prev);
    }

    return (
        <TableCell rowSpan={rowSpan}>
            <Checkbox
                checked={value}
                onClick={handleCheck}
            />
        </TableCell>
    );
};

export default CheckBoxCell;