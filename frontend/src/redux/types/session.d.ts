
export interface SessionInitialState {
    user: null | IUser;
}

export interface IUser {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    birth_day: number;
    birth_month: number;
    birth_year: number;
}

export interface ISignUpUser{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birth_day: number;
    birth_month: number;
    birth_year: number;
}


export interface ICredentials {
    credential?: string;
    email?: string;
    password: string;

}
