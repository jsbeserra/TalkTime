export type AuthenticationParams = {
    email: string
    password: string
}

export type AuthenticationResult = {
    accessToken: string
    id: string
}

export interface Authentication {
    auth(authenticationParams: AuthenticationParams):Promise<AuthenticationResult>
}