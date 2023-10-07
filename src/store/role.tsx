import UserService from "../api/services/UserService";
import AdminService from "../api/services/AdminService";
import user from "./user";


export const roleAliases = [
	{
		value: 'admin',
		alias: 'Администратор'
	},
	{
		value: 'trusted',
		alias: 'Доверенный'
	},
	{
		value: 'schedule_manager',
		alias: 'Менеджер расписания'
	},
]

class Role {

	list: string[] = []

	async fetchRoles() {
		const response = await UserService.getRoles();

		this.list = response.roles.map(item => (
			roleAliases.find(role => item === role.value)?.alias
		));

	}

	getList() {
		return this.list
	}

	async addRole(roleName: string, userId: number) {

		const response = await AdminService.addRole(roleName, userId)

	}

	async removeRole(roleName: string, userId: number) {

		const response = await AdminService.removeRole(roleName, userId)

	}

}

export default new Role();