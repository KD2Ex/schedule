import {ISocial} from "./ISocial";
import {ILinkedSchedule} from "./ILinkedSchedule";


export interface IUser {
	uuid: string,
	lastName: string,
	firstName: string,
	patronymic: string,
	email: string,
	linkedSocial: ISocial[],
	linkedSchedule: ILinkedSchedule,
	containPassword: boolean,
}