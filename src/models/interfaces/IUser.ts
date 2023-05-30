import {ISocial} from "./ISocial";
import {ILinkedSchedule} from "./ILinkedSchedule";


export interface IUser {
	id: string,
	uuid: string,
	lastName: string,
	firstName: string,
	patronymic: string,
	email: string,
	isBlocked: string,
	isActivated: boolean,
	linkedSocials: ISocial[],
	linkedSchedule: ILinkedSchedule
}