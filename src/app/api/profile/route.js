import mongoose, { mongo } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";


export async function PUT(req) {

    // data includes info for user and userinfo schema
  const data = await req.json();

  const {name, image, ...otherUserInfo} = data
  console.log(otherUserInfo)
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  // update user name and image
  await User.updateOne({ email }, {name, image});

  await UserInfo.updateOne({email}, otherUserInfo, {upsert: true})

  return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession(authOptions)
    const email = session?.user?.email

    // if session doesnt exist
    if (!email) {
        return Response.json({})
    }

    const user = await User.findOne({email}).lean()
    const userInfo = await UserInfo.findOne({email}).lean()

    return Response.json(
        {...user, ...userInfo}
    )
}
