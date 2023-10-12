import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {FilePond} from "react-filepond";
import axios from "axios/index";
import ScheduleService from "../../api/services/ScheduleService";
import schedule from "../../store/schedule";
import ContainedButton from '../../components/styled/ContainedButton';

const MigrationPage = () => {

	const [files, setFiles] = useState([]);

	const handleReset = () => {

	}

	return (
		<Box>

			<Typography
				variant={'h4'}
				sx={{
					fontWeight: 600,
					mb: 1
				}}
			>
				Очистка

			</Typography>

			<Typography>

				Перед переходом в новый семестр необоходимо сбросить текущее расписание и загрузить файлы с новым. <br/>
				Очистите систему с помощью кнопки "Сбросить расписание", а затем  загрузите файлы с расписанием для каждой сущности и нажмите продолжить.

			</Typography>


			<ContainedButton
				onClick={handleReset}
				sx={{
					mt: 1
				}}
			>
				Сбросить расписание
			</ContainedButton>

		</Box>
	);
};

export default MigrationPage;