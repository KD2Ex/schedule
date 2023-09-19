import { TooltipProps } from '@mui/material/Tooltip';
import React, {forwardRef, VFC} from 'react';
import {FormControlLabel, ToggleButton, ToggleButtonProps, Tooltip} from "@mui/material";
import {WeekTooltip} from "../styled/WeekTooltip";
import {WhiteSwitch} from "../styled/StyledSwitch";


type TooltipToggleButtonProps = ToggleButtonProps & {
    TooltipProps: Omit<TooltipProps, 'children'>;
    isPrevWeek: boolean,
    setIsPrevWeek: React.Dispatch<boolean>
};


const TooltipToggleButton: VFC<TooltipToggleButtonProps> = forwardRef(
    ({ TooltipProps, isPrevWeek, setIsPrevWeek, ...props}, ref) => {

        const handlePrevWeek = () => {
            setIsPrevWeek(prev => !prev)
        }

    return (
        <WeekTooltip
            {...TooltipProps}
            leaveDelay={200}
            title={
                <FormControlLabel

                    control={
                        <WhiteSwitch
                            checked={isPrevWeek}
                            onChange={handlePrevWeek}

                        />
                    }
                    label={'Прошлая неделя'}
                    labelPlacement={"start"}
                />
            }
        >
            <ToggleButton ref={ref} {...props} />
        </WeekTooltip>
    );
});

export default TooltipToggleButton;