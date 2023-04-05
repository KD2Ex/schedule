import {makeAutoObservable} from "mobx";
import {IGroup} from "../models/IGroup";
import {fetchEntities} from "../api/services/EntitiesService";
import {ScheduleType} from "../models/enums/ScheduleType";


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

		const result = await fetchEntities(ScheduleType.GROUP);



		this.groups = result;

	}

}

export default new Group();