

export interface UserResponse {
	id: number,
	email: string,
	password: string,
	uuid: string,
	authorities: [],
	attributes: object,
	name: string,
	enabled: boolean,
	username: string,
	credentialsNonExpired: boolean,
	accountNonExpired: boolean,
	accountNonLocked: boolean
}