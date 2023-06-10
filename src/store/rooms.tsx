import {makeAutoObservable} from "mobx";
import IRoom from "../models/interfaces/IRoom";
import {fetchEntities} from "../api/services/EntitiesService";
import {ScheduleEntityType} from "../models/enums/ScheduleEntityType";


class Room {
	rooms: IRoom[] = [];


	constructor() {
		makeAutoObservable(this);
	}

	async fetchRooms() {
		const response = await fetchEntities(ScheduleEntityType.ROOM);

		this.rooms = response.filter((item: IRoom) => {
				//console.log(item.fullName.match(/[^сз_/тирВЦИ\d]+/gi))

				//|| item.fullName.includes('ИЦ')
			return !item.fullName.match(/[^сз_/тирВЦИЦ\d]+/gi)
				|| item.fullName.toUpperCase().includes('ИЦ')
				|| item.fullName.toUpperCase().includes('ВЦ')
		}

		)
		console.log(response);

	}

	getRoomsNumbers() {
		return this.rooms.map(room => room.fullName.toString())
	}

}

export default new Room();