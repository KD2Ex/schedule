import {makeAutoObservable} from "mobx";


class Group {
	groups: any = [];

	constructor() {
		makeAutoObservable(this);
	}

	async fetchGroups() {
		this.groups = [
			{id: 1, label: '4-Д9-4ИСП'},
		]
	}

}

export default new Group();