import {ILinkedSchedule} from "../ILinkedSchedule";
import {ISocial} from "../ISocial";

export interface UserResponse {
	containPassword: boolean,
	linkedSchedule: ILinkedSchedule,
	linkedSocial: ISocial[],
	mail: string,
}