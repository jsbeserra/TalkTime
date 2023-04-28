import { AppStorage, userStorage } from '@domain/appStorage'

export default class SessionStorageAdpter implements AppStorage {
	saveUser(user: userStorage): void {
		sessionStorage.setItem('token', user.token)
		sessionStorage.setItem('name', user.name)
		sessionStorage.setItem('username', user.username)
		sessionStorage.setItem('email', user.email)
	}

	clear(): void {
		sessionStorage.clear()
	}
}