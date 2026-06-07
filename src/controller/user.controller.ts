import {asyncHandler} from "../utils/asyncHandler";
import {APIError} from "../utils/ApiError"
import {Request, Response} from "express";
import {prisma} from "../lib/prisma";
import bcrypt from "bcrypt";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
const {username, password, role} = req.body;

if (!username || !password || !role) {
    throw new APIError(400, "Username, password and role are required");
}

const existingUser = await prisma.user.findUnique({
    where: {username},
});

if (existingUser) {
    throw new APIError(400, "Username already exists");
}
const hashedPassword = await bcrypt.hash(password, 10);
const user = await prisma.user.create({
    data: {
        username,
        password: hashedPassword,
        role,
    },
});
res.status(201).json({message: "User registered successfully", user: {id: user.id, username: user.username, role: user.role}});
});

const loginUser = asyncHandler(async (req: Request, res:Response)=>{
const {username, password} = req.body;

if (!username || !password) {
    throw new APIError(400, "Username and password are required");
}
const user = await prisma.user.findUnique({
    where: {username},
});

if (!user) {
    throw new APIError(400, "Invalid username or password");
}
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
    throw new APIError(400, "Invalid username or password");
}
res.status(200).json({message: "Login successful", user: {id: user.id, username: user.username, role: user.role}});
})

export {registerUser, loginUser}