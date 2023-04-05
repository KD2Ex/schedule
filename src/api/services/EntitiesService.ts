import axios from "axios";
import {ScheduleType} from "../../models/enums/ScheduleType";


export const fetchEntities = async (type: ScheduleType) => {
	try {
		const result = await axios.get(`http://91.223.199.62:8080/api/schedule/entities`, {
			params: {
				type: type
			}
		})
		console.log(result.data.response)

		return result.data.response.entities;
	} catch (e) {
		console.log(e.message)
		return [];
	}

}