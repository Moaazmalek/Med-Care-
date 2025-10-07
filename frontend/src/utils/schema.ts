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
export interface Doctor {
    _id:string;
    user:{
        _id:string;
        name:string;
        email:string;
        image:string;
        phone:string;
        dob:string
        role:'user'|'admin' | 'doctor';
        address:string
    };
    speciality:string;
    fees:number;
    experience:string;  
    degree:string;
    about:string;
    available:boolean;
    slots_booked:object;
    date?:number

}

export interface AdminState {
    dashboardData:{
        totalUsers:number,
        totalDoctors:number,
        totalAppointments:number
    }  | null,
    appointments:Appointment[],
    doctors:Doctor[],
    users:User[] ,
    loading:boolean,
    error:null|string
}
export interface DoctorState {
    doctors:Doctor[],
    loading:boolean,
    error:null|string
}

export interface UserState {
user:User | null;
loading:boolean;
error:string | null;
}
export interface Appointment {
    _id:string;
    user:User;
    doctor:Doctor;
    date:string;
    time:string;
    amount:number;
    reason?:string;
    status:"pending" | "confirmed" | "completed" | "cancelled";
    createdAt?:string;
    updatedAt?:string;
    bookedAt?:string;
    payment?:boolean
}

export interface AppointmentState {
    doctorAppointments:Appointment[];
    userAppointments:Appointment[];
    loading:boolean;
    error:null|string
}