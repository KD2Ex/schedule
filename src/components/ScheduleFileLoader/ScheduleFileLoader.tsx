import React, {useEffect, useRef, useState} from 'react';
import {FilePond} from "react-filepond";
import ScheduleService from "../../api/services/ScheduleService";
import 'filepond/dist/filepond.min.css';
import {Box, useTheme} from "@mui/material";
import schedule from "../../store/schedule";
import axios from "axios";



const ScheduleFileLoader = ({date}) => {
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
                    try {
                        await ScheduleService.updateSchedule(formData)
                       /* axios({
                            method: 'post',
                            url: '/schedule/update',
                            data: formData,
                            cancelToken: source.token,
                            onUploadProgress: (e) => {
                                progress(e.lengthComputable, e.loaded, e.total);
                            }
                        }).then(response => {
                            // passing the file id to FilePond
                            load(response.data.data.id)
                            .catch((thrown) => {
                                        if (axios.isCancel(thrown)) {
                                            console.log('Request canceled', thrown.message);
                                        } else {
                                            // handle error
                                        }
                                    })
                        */
                        console.log('process')
                        setFiles(files)
                        await schedule.fetchSavedSchedule(date.toISOString().split('T')[0]);

                    } catch (e) {

                    }

                    return {
                        abort: () => {
                            //source.cancel('Operation canceled by the user.');
                        }
                    }
                }
            }
        }))
    }, [date])


    return (

        <Box
            sx={{
                "& div": {
                    '& .filepond--panel-root': {
                        bgcolor: `${theme.palette.primary.fileLoader}`,
						border: `1px ${theme.palette.primary.pale} dashed`
					},
                    //color: theme.palette.primary.contrastText,
					color: 'white',
                    fontFamily: 'SFUIText',

                },
            }}
        >
            <FilePond
                files={files}
                allowMultiple={false}
                onupdatefiles={setFiles}
                ref={filePond}
                //server={'/'}
                name={'files'}
                allowRemove
                labelIdle={'Выберите или перетащите файл с расписанием в эту область'}
            />
        </Box>

    );
};

export default ScheduleFileLoader;