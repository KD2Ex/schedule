import {makeAutoObservable} from "mobx";
import IRoom from "../models/IRoom";


class Room {
	rooms: IRoom[] = [];


	constructor() {
		makeAutoObservable(this);
	}

	async fetchRooms() {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts')

		this.rooms = [
			{id: 1, number: 46},
			{id: 2, number: 416},
			{id: 3, number: 146},
			{id: 4, number: 460},
		]
	}

	getRoomsNumbers() {
		return this.rooms.map(room => room.number.toString())
	}

}

export default new Room();