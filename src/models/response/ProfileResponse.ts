import {ILinkedSchedule} from "../interfaces/ILinkedSchedule";
import {ISocial} from "../interfaces/ISocial";

export interface ProfileResponse {
	containPassword: boolean,
	linkedSchedule: ILinkedSchedule,
	linkedSocial: ISocial[],
	mail: string,
}