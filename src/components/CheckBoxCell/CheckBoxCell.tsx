import React, {FC, useState} from 'react';
import {Checkbox, TableCell} from "@mui/material";
import schedule from "../../store/schedule";

interface CheckBoxCellProps {
    rowSpan: number,
    double?: boolean,
    handleCheck: (isFirst: boolean) => void,
    value: boolean,
    value2: boolean
    disabled?: boolean
    disabled2?: boolean
}

const CheckBoxCell: FC<CheckBoxCellProps> = ({disabled, disabled2, value,value2, handleCheck, rowSpan, double}) => {



    return (
        <>
            <TableCell rowSpan={rowSpan}>
                <Checkbox
                    disabled={disabled}
                    checked={!value}
                    onClick={() => handleCheck(true) }
                />
                {double && (
                    <Checkbox
                        disabled={disabled2}
                        checked={!value2}
                        onClick={() => handleCheck(false)}
                    />
                )}
            </TableCell>

        </>

    );
};

export default CheckBoxCell;