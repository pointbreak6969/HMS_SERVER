import {asyncHandler} from "../utils/asyncHandler";
import {APIError} from "../utils/ApiError"
import {Request, Response} from "express";
import {prisma} from "../lib/prisma";

const getCustomer = asyncHandler(async (req: Request, res: Response) =>  {
const {id} = req.params;
if (typeof id !== "string") {
    throw new APIError(400, "Invalid customer ID");
}
const customer = await prisma.customer.findUnique({
    where: {customer_id: id},
    });
if (!customer) {
    throw new APIError(404, "Customer not found");
}   
res.status(200).json({
    message: "Customer fetched successfully",
    customer,
});
})

const createCustomer = asyncHandler(async (req: Request, res: Response) =>{
    const {fullname, sex, date_of_birth, address, phone, pan, email, marital_status, scheme, referred_by, vat} = req.body;
    if (!fullname || !sex || !date_of_birth) {
        throw new APIError(400, "fullname, sex and date_of_birth are required fields");
    }
    const newCustomer = await prisma.customer.create({
        data: {
            fullname,
            sex,
            dateOfBirth: date_of_birth,
            address,
            phone,
            pan,
            email,
            marital_status: marital_status,
            scheme,
            referredBy: referred_by,
            vat
        }
    });
    res.status(201).json({
        message: "Customer created successfully",
        customer: newCustomer
    });
})

export {getCustomer, createCustomer};