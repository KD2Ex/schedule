


export const actions = [
    {
        url: '/proflie/update/mail',
        permission: 'profile.updating.mail'
    },
    {
        url: '/verified/add',
        permission: "verified.add"
    },
    {
        url: '/proflie/update/mailing',
        permission: "profile.updating.mailing"
    },
    {
        url: '/proflie/update/remove_linked_network',
        permission: "profile.updating.remove_linked_network"
    },
    {
        url: '/profile/update/linked_schedule',
        permission: "profile.updating.linked_schedule"
    },
    {
        url: '/schedule/update',
        permission: "schedule.updating.replacement"
    },
    {
        url: '/user/permissions/me',
        permission: "permissions.me"
    },
    {
        url: '/proflie/update/password',
        permission: "profile.updating.password"
    },
/*    {
        url: '/proflie/update/mail',
        permission: "schedule.updating.standard"
    },*/
    {
        url: '/proflie/me',
        permission: "profile.me"
    },
    {
        url: '/user/find/all',
        permission: "verified.find"
    },
    {
        url: '/verified/remove',
        permission: "verified.remove"
    },
    {
        url: '/profile/update/fullname',
        permission: "profile.updating.name"
    }
]

export const errorsList = [
    {
        url: '/verified/remove',
        status: [
            {
                code: 1,
                message: 'UUID пуст'
            },
            {
                code: 2,
                message: 'Пользователь не найден'
            },
            {
                code: 3,
                message: 'Пользователь не верифицирован'
            },

        ],
    },
    {
        url: '/verified/add',
        status: [
            {
                code: 1,
                message: 'UUID пуст'
            },
            {
                code: 2,
                message: 'Пользователь не найден'
            },
            {
                code: 3,
                message: 'ФИО не заполнено'
            },
            {
                code: 4,
                message: 'Пользователь уже верифицирован'
            },
        ],
    },
    {
        url: '/user/roles/remove',
        status: [
            {
                code: 1,
                message: 'UUID пуст'
            },
            {
                code: 2,
                message: 'Пользователь не найден'
            },
            {
                code: 3,
                message: 'Пользователь не верифицирован'
            },

        ],
    },
    {
        url: '/user/roles/add',
        status: [
            {
                code: 1,
                message: 'Роль не найдена'
            },
            {
                code: 2,
                message: 'Пользователь не найден'
            },
            {
                code: 3,
                message: 'У пользователя уже есть эта роль'
            },
        ],
    },
    {
        url: '/schedule/update',
        status: [
            {
                code: 1,
                message: 'Файл пустой'
            },
            {
                code: 2,
                message: 'Ошибка при чтении расписания'
            },
        ],
    },
    {
        url: '/schedule/save',
        status: [
           /* {
                code: 1,
                message: 'Файл пустой'
            },
            {
                code: 2,
                message: 'Ошибка при чтении расписания'
            },*/
        ],
    },
    {
        url: '/profile/update/remove_linked_network',
        status: [
            {
                code: 1,
                message: 'Тип пуст'
            },
            {
                code: 2,
                message: 'Социальная сеть не привязана'
            },
            {
                code: 3,
                message: 'Привяжите другую соц. сеть или добавьте почту и пароль'
            },
        ],
    },
    {
        url: '/profile/update/password',
        status: [
            {
                code: 3,
                message: 'Старый пароль не совпадает'
            },
            {
                code: 4,
                message: 'Пароль совпадает с предыдущим'
            },
        ],
    },
    {
        url: '/profile/update/mailing',
        status: [
            {
                code: 2,
                message: 'Социальная сеть не привязана'
            },
        ],
    },
    {
        url: '/profile/update/mail',
        status: [
            {
                code: 1,
                message: 'Почта пуста'
            },
            {
                code: 2,
                message: 'Введите валидную почту'
            },
            {
                code: 3,
                message: 'Почта занята'
            },

        ],
    },
    {
        url: '/profile/update/fullname',
        status: [
            {
                code: 1,
                message: 'Имя не заполнено'
            },
            {
                code: 2,
                message: 'Фамилия не заполнена'
            },
            {
                code: 3,
                message: 'Отчество не заполнено'
            },
        ],
    },
    {
        url: '/profile/update/linked_schedule',
        status: [
            {
                code: 3,
                message: 'Cущности с таким entityId не существует'
            },
        ],
    },
    {
        url: '/auth/signup',
        status: [
            {
                code: 1,
                message: 'Введите почту'
            },
            {
                code: 2,
                message: 'Введите пароль'
            },
            {
                code: 4,
                message: 'Почта занята'
            },
        ],
    },
    {
        url: '/auth/refresh',
        status: [
            {
                code: 1,
                message: 'Токен не найден'
            },
            {
                code: 2,
                message: 'Авторизуйтесь снова'
            },
        ],
    },
    {
        url: '/auth/login',
        status: [
            {
                code: 1,
                message: 'Токен не найден'
            },
            {
                code: 2,
                message: 'Авторизуйтесь снова'
            },
        ],
    },
    {
        url: '/user/find/all',
        status: [
            {
                code: 1,
                message: 'Недопустимое значение page и size'
            },
        ],
    },

]

export const isAdmin = (permissions: string[]) => {
    console.log(permissions.length)
    return permissions.filter(item => {
        return item === 'verified.find'
        || item === 'verified.remove'
        || item === 'verified.add'
        || item === 'schedule.updating.replacement'
    }).length >= 1

}