import {API_URL} from "./index";

export const REDIRECT_URL: string = 'http://localhost:3000/oauth2';
export const VK_AUTH_URL: string = API_URL + `/oauth2/authorize/vk?redirect_uri=${REDIRECT_URL}`;
