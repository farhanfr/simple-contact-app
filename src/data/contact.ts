export interface IResponseFetchContacts {
    message: string;
    data: IContact[];
}

export interface IRequestContact {
    firstName: string;
    lastName: string;
    age: number;
    photo?: string;
}

export interface IContact {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    photo: string;
}