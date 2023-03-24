import React from 'react';
import {observer} from "mobx-react-lite";
import {Button} from "@mui/material";

const ScheduleEditPage = observer(() => {



	return (
		<>
			Выберите тип
			<Button variant={'outlined'}>
				Загрузить файл с расписанием
			</Button>



		</>
	);
});

export default ScheduleEditPage;