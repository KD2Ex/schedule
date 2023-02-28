import {makeAutoObservable} from "mobx";


class Room {
	roomCount: any = [];

	constructor() {
		makeAutoObservable(this);
	}

	async fetchRooms() {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts')

		this.roomCount = [
			{id: '1', label: '46'},
		]
	}
}

export default new Room();