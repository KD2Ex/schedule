import {makeAutoObservable} from "mobx";
import {IGroup} from "../models/interfaces/IGroup";
import {fetchEntities} from "../api/services/EntitiesService";
import {ScheduleEntityType} from "../models/enums/ScheduleEntityType";


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

		if (this.groups.length === 0) {
			const result = await fetchEntities(ScheduleEntityType.GROUP);
			this.groups = result;
		}


	}

}

export default new Group();