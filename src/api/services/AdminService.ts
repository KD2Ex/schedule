import $api from "../http";


export default class AdminService {


    static async getAllUsers(filterString: string, size: number, page: number) {
        const response = await $api.get('/user/find/all', {
           params: {
               filterString,
               size,
               page
           }
        });

        return response.data.response
    }
}