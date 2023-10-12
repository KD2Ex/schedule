import React, {useEffect, useRef, useState} from 'react';
import {FilePond} from "react-filepond";
import axios from "axios";
import ScheduleService from "../../api/services/ScheduleService";
import schedule from "../../store/schedule";
import {useTheme} from "@mui/material";



const MigrationFileLoader = () => {

	const filePond = useRef(null);

	const [files, setFiles] = useState([]);

	const theme = useTheme();

	useEffect(() => {

		if (theme.palette.mode === 'light') {
			import('./ScheduleFileLoader.css')
				.then((file) => console.log(file))
		}

	}, [theme.palette.mode])

	useEffect(() => {

		// @ts-ignore
		console.log(filePond.current._pond.setOptions({
			server: {
				// @ts-ignore
				process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
					const formData = new FormData();
					formData.append('file', file);
					formData.append('date', date.toISOString().split('T')[0]);

					const CancelToken = axios.CancelToken;
					const source = CancelToken.source();

					console.log(formData.entries())
					console.log(date.toISOString())
					console.log(formData);
					/*try {
						await ScheduleService.updateSchedule(formData)

						console.log('process')
						setFiles(files);
						await schedule.fetchSavedSchedule(date.toISOString().split('T')[0]);

					} catch (e) {

					}*/

					return {
						abort: () => {
							source.cancel('Operation canceled by the user.');
						}
					}
				}
			}
		}))
	}, [])

	return (
		<div>

			<FilePond
				files={files}
				allowMultiple={true}
				onupdatefiles={setFiles}
				ref={filePond}
				//server={'/'}
				name={'files'}
				allowRemove
				labelIdle={'Выберите или перетащите файл с расписанием в эту область'}
				allowFileTypeValidation={true}
				acceptedFileTypes={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
			/>
		</div>
	);
};

export default MigrationFileLoader;