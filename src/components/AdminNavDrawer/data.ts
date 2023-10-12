import user from "../../store/user";

export const adminNavList = [
	{
		url: '/edit/schedule',
		title: 'Редактирование расписания',
		visible: !!user.permissions.find(item => item === "schedule.updating.replacement")
	},
	{
		url: '/edit/users',
		title: 'Пользователи',
		visible: !!user.permissions.find(item => item === "verified.add") || !!user.permissions.find(item => item === "role.manager.view")
	}
]