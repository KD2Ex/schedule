import {API_URL} from "./index";

export const REDIRECT_URL: string = 'http://localhost:3000/oauth2';
export const VK_AUTH_URL: string = API_URL + `/oauth2/authorize/vk?redirect_uri=${REDIRECT_URL}`;
export const GOOGLE_AUTH_URL: string = API_URL + `/oauth2/authorize/google?redirect_uri=${REDIRECT_URL}`;
export const GITHUB_AUTH_URL: string = API_URL + `/oauth2/authorize/github?redirect_uri=${REDIRECT_URL}`;
