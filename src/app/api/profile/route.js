import mongoose, { mongo } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions"
import { User } from "@/app/models/User";
import { UserInfo } from "@/app/models/UserInfo";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);

  // data includes info for user and userinfo schema
  const data = await req.json();

  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};

  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = { email };
  }

  const user = await User.findOne(filter)
  await User.updateOne(filter, { name, image });
  await UserInfo.updateOne({email: user.email}, otherUserInfo, { upsert: true });
  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filter = {};

  // If admin, return user by id
  if (_id) {
    filter = { _id };
  } else {
    // Return information from our own user
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    // if session doesnt exist
    if (!email) {
      return Response.json({});
    }
    filter = { email };
  }
  const user = await User.findOne(filter).lean();
  const userInfo = await UserInfo.findOne({ email: user.email }).lean();
  return Response.json({ ...user, ...userInfo });
}
