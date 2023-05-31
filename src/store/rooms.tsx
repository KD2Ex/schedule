import {makeAutoObservable} from "mobx";
import IRoom from "../models/interfaces/IRoom";
import {fetchEntities} from "../api/services/EntitiesService";
import {ScheduleType} from "../models/enums/ScheduleType";


class Room {
	rooms: IRoom[] = [];


	constructor() {
		makeAutoObservable(this);
	}

	async fetchRooms() {
		const response = await fetchEntities(ScheduleType.ROOM);

		this.rooms = response.filter((item: IRoom) => item.fullName !== '-' && item.fullName !== '?' );
		console.log(response);

	}

	getRoomsNumbers() {
		return this.rooms.map(room => room.fullName.toString())
	}

}

export default new Room();