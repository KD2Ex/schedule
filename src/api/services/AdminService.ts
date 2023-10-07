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

    static async verifyUser(uuid: string) {

        return $api.post('/verified/add',  {
            uuid
        })

    }

    static async removeUserVerification(uuid: string) {

        return $api.post('/verified/remove',  {
            uuid
        })

    }

    static async addRole(roleName: string, userId: number) {
        return $api.post('/user/roles/add', {

            roleName,
            userId
        })
    }

    static async removeRole(roleName: string, userId: number) {
        return $api.post('/user/roles/remove', {
            roleName,
            userId
        })
    }

}