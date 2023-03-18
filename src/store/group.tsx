import {makeAutoObservable} from "mobx";
import {IGroup} from "../models/IGroup";


class Group {
	groups: IGroup[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	async fetchGroups() {
		this.groups = [
			{id: 1, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			{id: 2, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			{id: 3, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			{id: 4, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			{id: 5, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			{id: 6, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			{id: 7, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			{id: 8, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
		]

		this.groups.map((group) => {
			group.label = `${group.groupNumber}-${group.commercial ? 'КД9' : 'Д9'}-${group.course}${group.spec}`;
		})
	}

}

export default new Group();