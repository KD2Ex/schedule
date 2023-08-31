import React from 'react';
import {DataGrid} from "@mui/x-data-grid";




const DataGridRu = ({...props}) => {

    return (
        <DataGrid
            localeText={{
                noRowsLabel: 'Нет записей',
                MuiTablePagination: {
                    labelDisplayedRows: ({from, to, count}) =>
                        `${from} из ${count}`,
                }
            }}
            {...props}
        />
    );
};

export default DataGridRu;