import {SocialType} from "./types/SocialType";


export interface ISocial {
	contain: boolean,
	enabledMailing: boolean,
	needMailing: boolean,
	type: SocialType,
}