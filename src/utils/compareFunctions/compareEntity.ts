import {AutocompleteOption} from "../../models/interfaces/IAutocompleteOption";
import ITeacher from "../../models/interfaces/ITeacher";
import IRoom from "../../models/interfaces/IRoom";
import {IGroup} from "../../models/interfaces/IGroup";


export type CompareObject = ITeacher | IRoom | IGroup

export default function compareEntity(a: CompareObject, b: CompareObject) {


	const aName = a.fullName.split('-')[0].split('_')[0]
	const bName = b.fullName.split('-')[0].split('_')[0]

	// @ts-ignore
	if (isNaN(aName)) {

		if (aName > bName) {
			return 1;
		}

		if (aName < bName) {
			return -1;
		}

		return 0;

	} else {
		return Number(aName) - Number(bName);

	}

}