import React, {useEffect, useRef, useState} from 'react';
import {FilePond, registerPlugin} from "react-filepond";
import ScheduleService from "../../api/services/ScheduleService";
import 'filepond/dist/filepond.min.css';
import {Box, useTheme} from "@mui/material";
import schedule from "../../store/schedule";
import axios from "axios";
import {API_URL} from "../../api/http/urls";

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Register the plugin
registerPlugin(FilePondPluginFileValidateType);
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
                            url: API_URL + '/schedule/update',
                            data: formData,
                            cancelToken: source.token,
                            onUploadProgress: (e) => {
                                progress(e.lengthComputable, e.loaded, e.total);
                            },
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        }).then(response => {
                            // passing the file id to FilePond
                            load(response.data.id)
                        }).catch((thrown) => {
                                    if (axios.isCancel(thrown)) {
                                        console.log('Request canceled', thrown.message);
                                    } else {
                                        // handle error
                                        console.log(thrown)
                                    }
                                });*/
                        console.log('process')
                        setFiles(files);
                        await schedule.fetchSavedSchedule(date.toISOString().split('T')[0]);

                    } catch (e) {

                    }

                    return {
                        abort: () => {
                            source.cancel('Operation canceled by the user.');
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
                allowFileTypeValidation={true}
                acceptedFileTypes={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
            />
        </Box>

    );
};

export default ScheduleFileLoader;