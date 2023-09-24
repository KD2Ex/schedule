


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
        url: '/proflie/update/linked_schedule',
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
        url: '/proflie/update/mail',
        permission: "profile.me"
    },
    {
        url: '/user/find/all',
        permission: "verified.find"
    },
    {
        url: '/verified/remove',
        permission: "verified.remove"
    }
]

export const isAdmin = (permissions: string[]) => {

    return permissions.filter(item => {
        return item === 'verified.find'
        || item === 'verified.remove'
        || item === 'verified.add'
        || item === 'schedule.updating.replacement'
    }).length !== 0

}