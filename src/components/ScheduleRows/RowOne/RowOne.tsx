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

	const theme = useTheme();
	const [hidden, setHidden] = useState<boolean>(
		!!schedule.newSchedule?.hideLessons?.find(item => item === id)
	)
	const [styles, setStyles] = useState(isReplaced ? {...rowOneStyle, ...replacedStyle} : {...rowOneStyle})

	useEffect(() => {

		if (hidden) {
			setStyles({...styles, opacity: 0.5})
		} else {
			setStyles({...styles, opacity: 'none'})
		}


	}, [hidden])

	useEffect(() => {

		setHidden(!!schedule.newSchedule.hideLessons?.find(item => item === id))

	}, [JSON.stringify(schedule.newSchedule?.hideLessons)])

	useEffect(() => {
		setStyles(isReplaced ? {...rowOneStyle, ...replacedStyle} : {...rowOneStyle})
	}, [isReplaced])

	const handleHide = () => {
		if (hidden) {
			setHidden(false);
			schedule.showLesson(id)
		} else {
			setHidden(true)
			schedule.hideLesson(id)
		}
	}

	if (id === 117) {
		console.log(hidden)
	}


	return (
		<TableRow
			sx={{
				...styles,
			}}
		>
			{editable &&
				<CheckBoxCell
					rowSpan={1}
					value={hidden}
					handleCheck={handleHide}
					id={id}
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