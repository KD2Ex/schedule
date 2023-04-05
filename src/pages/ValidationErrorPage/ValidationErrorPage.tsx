import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";
import {AccountType} from "../../models/types/AccountType";

interface ValidationErrorProps {
	type: AccountType
}

const ValidationErrorPage: FC<ValidationErrorProps> = ({type}) => {

	const text = type === "student" ? 'старосте' : 'администратору';

	return (
		<Box>
			<Typography variant={'h1'}>
				Ваш аккаунт не подтвержден.
				За подтверждением обратитесь к {text}
			</Typography>
		</Box>
	);
};

export default ValidationErrorPage;