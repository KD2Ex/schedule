import { Autocomplete, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AutocompleteOption } from "../../models/interfaces/IAutocompleteOption";
import switchFetching from "../../utils/switchFetching";
import compareEntity, { CompareObject } from "../../utils/compareFunctions/compareEntity";
import { ScheduleEntityType } from "../../models/enums/ScheduleEntityType";
import { IScheduleEntity } from "../../models/interfaces/IScheduleEntity";

interface ScheduleFilterProps {
    filterValue: AutocompleteOption | null
    setFilterValue: React.Dispatch<AutocompleteOption>,
    filterType: IScheduleEntity
}

const ScheduleFilter: FC<ScheduleFilterProps> = observer(({
    filterValue,
    setFilterValue,
    filterType
}) => {

	const [open, setOpen] = useState(false);
	const [scheduleEntities, setScheduleEntities] = useState<AutocompleteOption[]>([]);
	const loading = open && scheduleEntities?.length === 0;
	useEffect(() => {

		if (!loading) {
			return undefined;
		}

		(async () => {
			let options: AutocompleteOption[] = [];
			let entities: CompareObject[] = await switchFetching(filterType.value)

			entities.sort(compareEntity);

			entities.map(item => {
				options.push({id: item.id, label: item.fullName})
			})

			setScheduleEntities(options);
		})();


	}, [loading])

	useEffect(() => {
		if (!open) {
			setScheduleEntities([]);
		}
	}, [open]);

    return (
        <Autocomplete
            value={filterValue}
            size='small'
            open={open}
            sx={{width: {xs: 240, md: 300}}}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            loading={loading}
            options={scheduleEntities}
            renderInput={(params) => (<TextField
                {...params}
                label={` ${filterType.title}`}
                InputProps={{
                    ...params.InputProps,
                }}
            />)}
            onChange={(event: any, newValue: AutocompleteOption | null) => {
                setFilterValue(newValue);
            }}
        />
    )

});

export default ScheduleFilter;