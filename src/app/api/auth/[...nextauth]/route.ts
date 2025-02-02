import { User } from "@/app/models/User"
import mongoose from "mongoose"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/libs/mongoconnect"

const bcrypt = require('bcrypt')

const handler = NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        id: 'credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const {email, password} = credentials

          mongoose.connect(process.env.MONGO_URL)
          const user = await User.findOne({email})
          const passwordOk = user && bcrypt.compareSync(password, user.password)
          if (passwordOk) {
            return user
          }
    
          // Return null if user data could not be retrieved
          return null
        }
      })
  ]
})

export { handler as GET, handler as POST }