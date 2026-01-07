import express from 'express';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();


app.listen(process.env.PORT,()=>{
    console.log(`Auth service running on port http://localhost:${process.env.PORT}`);
});