import {z} from 'zod';
export const emailValidator=z.email("Invalid email");


export const registerSchema=z.object({
    name:z.string().min(3,{message:"Name should be at least 3 characters"}).max(100),
    email:emailValidator,
    password:z.string().min(6,{message:"Password should be at least 6 characters"}).max(100),
});

export const loginSchema=z.object({
    email:emailValidator,
    password:z.string().min(6,{message:"Password should be at least 6 characters"}).max(100),
});