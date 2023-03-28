import {makeAutoObservable} from "mobx";
import IRoom from "../models/IRoom";
import {fetchEntities} from "../api/EntitiesService";
import {ScheduleType} from "../models/enums/ScheduleType";


class Room {
	rooms: IRoom[] = [];


	constructor() {
		makeAutoObservable(this);
	}

	async fetchRooms() {
		const res = await fetchEntities(ScheduleType.ROOM);

		this.rooms = res.filter(item => item.fullName !== '-');
		console.log(res);

	}

	getRoomsNumbers() {
		return this.rooms.map(room => room.fullName.toString())
	}

}

export default new Room();