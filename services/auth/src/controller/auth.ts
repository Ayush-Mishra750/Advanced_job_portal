import { TryCatch } from "../utils/TryCatch.js";


export const registerUser=TryCatch(async(req,res,next)=>{
    const {email,password,role,phone_number,name,bio}=req.body;
    if(!email || !password || !role || !phone_number || !name){
        return res.status(400).json({message:"All fields are required"});
    }
     if(role !=='jobseeker' && role !=='recruiter'){
        return res.status(400).json({message:"Invalid role"});
     }  
     if(password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters"});
     }
     if(!/^\S+@\S+\.\S+$/.test(email)){
        return res.status(400).json({message:"Invalid email format"});
        }
        if(!/^\d{10}$/.test(phone_number)){
            return res.status(400).json({message:"Invalid phone number format"});
        }
        if(name.length < 2){
            return res.status(400).json({message:"Name must be at least 2 characters"});
        }
        if(bio && bio.length > 200){
            return res.status(400).json({message:"Bio must be at most 200 characters"});
        }   
        const existingUser=await sql `
        SELECT * FROM users WHERE email=${email}
        SELECT * FROM users WHERE phone_number=${phone_number}
        SELECT * FROM users WHERE name=${name}
        SELECT * FROM users WHERE role=${role}
        SELECT * FROM users WHERE bio=${bio}
        SELECT * FROM users WHERE password=${password}
    `;
    if(existingUser.length > 0){
        return res.status(409).json({message:"User already exists"});
    }
        `;
    res.status(201).json({message:email});
});
