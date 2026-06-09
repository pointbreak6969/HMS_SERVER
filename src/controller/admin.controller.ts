import { asyncHandler } from "../utils/asyncHandler";
import { APIError } from "../utils/ApiError"
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { APIResponse } from "../utils/ApiResponse";
import crypto from "crypto"
import { supabaseClient } from "../constant"

const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.body;
    const email = username + "@physiofitness.com"
    const tempPassword = crypto.randomBytes(8).toString("hex");
    const { data, error } = await supabaseClient.auth.admin.createUser({
        email, password: tempPassword, email_confirm: true,
    })
    if (error) throw new APIError(400, error.message)


    return res.status(201).json(new APIResponse(201, { user: data }, "User created successfully"))


})
export { createUser }