import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { UserInfo } from "@/app/models/UserInfo";
import { Order } from "@/app/models/Order";

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL)

    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email
    
    // Grab order id if url contains id parameter
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    if (_id) {
        return Response.json(await Order.findById(_id))
    }
    
    // Check if admin to grab all orders
    if (await isAdmin()) {
        return Response.json(await Order.find())
    }

    // Else if logged in user
    if (userEmail) {
        return Response.json(await Order.find({email: userEmail}))
    }
}