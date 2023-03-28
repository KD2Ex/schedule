import {makeAutoObservable} from "mobx";
import {IGroup} from "../models/IGroup";


class Group {
	groups: IGroup[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	async editGroup (group: IGroup)  {
		const index = this.groups.findIndex(item => {
			return item.id === group.id
		})
		this.groups[index] = group;

		console.log(this.groups[index])
		console.log(group);
	}

	async fetchGroups() {
		this.groups = [
			{id: 1, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4},
			{id: 2, course: 4, spec: 'ИНС', commercial: false, groupNumber: 3},
			{id: 3, course: 4, spec: 'ИСП', commercial: true, groupNumber: 12},
			{id: 4, course: 4, spec: 'ИНС', commercial: true, groupNumber: 11},
			// {id: 2, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			// {id: 3, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			// {id: 4, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			// {id: 5, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			// {id: 6, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			// {id: 7, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
			// {id: 8, course: 4, spec: 'ИСП', commercial: false, groupNumber: 4, label: ``},
		]

		this.groups.map((group) => {
			//group.label = `${group.groupNumber}-${group.commercial ? 'КД9' : 'Д9'}-${group.course}${group.spec}`;
		})
	}

}

export default new Group();