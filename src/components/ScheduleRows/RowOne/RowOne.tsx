import React, {FC, useEffect, useState} from 'react';
import {Checkbox, TableCell, TableRow, TableRowProps, useTheme} from "@mui/material";
import {replacedStyle, rowOneStyle} from "../TableRowsMuiStyles";
import TooltippedCell from "../../styled/TooltippedCell";
import styles from './RowOne.module.css'
import {useEmptyRow} from "../../../hooks/useEmptyRow";
import CheckBoxCell from "../../CheckBoxCell/CheckBoxCell";
import schedule from "../../../store/schedule";
import {observer} from "mobx-react-lite";

interface TableRowOneProps {
	row?: string[];
	isReplaced: boolean;
	isEmpty: boolean,
	editable: boolean,
	id: number
}


const RowOne: FC<TableRowOneProps> = observer(({row, isReplaced, isEmpty, editable, id}) => {


/*	let styles = {
		'& td': {
			px: 1,
		}
	}*/



	const [hidden, setHidden] = useState<boolean>(
		!!schedule.newSchedule?.hideLessons?.find(item => item === id)
	)

	const styles = isReplaced ? {...rowOneStyle, ...replacedStyle} : {...rowOneStyle}


	useEffect(() => {

		setHidden(!!schedule.newSchedule.hideLessons?.find(item => item === id))

	}, [JSON.stringify(schedule.newSchedule?.hideLessons)])


	const handleHide = () => {
		if (hidden) {
			setHidden(false);
			schedule.showLesson(id)
		} else {
			setHidden(true)
			schedule.hideLesson(id)
		}
	}


	return (
		<TableRow
			sx={{
				...styles,
				opacity: hidden ? 0.5 : 'none'
			}}
		>
			{editable &&
				<CheckBoxCell
					rowSpan={1}
					value={hidden}
					handleCheck={handleHide}
					id={id}
					disabled={!isReplaced || isEmpty}
				/>
			}
			{isEmpty
				? useEmptyRow(row[0])
				: row.map((item, index, array) => (
					<TooltippedCell key={index} sx={{textAlign: index === 0 && 'center'}}>
						{item}
					</TooltippedCell>
				))
			}
		</TableRow>

	);
});

export default RowOne;