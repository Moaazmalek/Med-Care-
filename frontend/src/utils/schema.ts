export interface User {
    _id:string;
    name:string;
    email:string;
    role:'user'|'admin' | 'doctor';
    image:string;
    phone:string;
    address?:string;
    dob?:string;
    gender?:string;
    createdAt?:string;
    updatedAt?:string
}

export interface AuthState {
    user:User | null,
    token:null|string,
    loading:boolean,
    error:null|string
}