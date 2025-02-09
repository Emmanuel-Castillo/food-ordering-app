import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import client from "@/libs/mongoconnect";
import { User } from "@/app/models/User";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      },
    }),
  ],
};
