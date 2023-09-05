import React, {FC, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import schedule from "../../store/schedule";

interface PromptDialogProps {
	open: boolean;
	onClose: (value: boolean) => void,
}

const PromptDialog: FC<PromptDialogProps> = ({open, onClose}) => {


	const handleSave = () => {
		onClose(true)
	}

	const handleClose = () => {
		onClose(false)
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>
				Редактирование расписания
			</DialogTitle>
			<IconButton
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8
				}}
			>
				<CloseIcon/>
			</IconButton>
			<DialogContent>
				Вы уверены, что хотите сохранить и отправить расписание?
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleSave}>
					Сохранить и отправить
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PromptDialog;