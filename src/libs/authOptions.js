// Import authentication providers from NextAuth
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

// Import MongoDB Adapter to integrate authentication with MongoDB
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import mongoose from "mongoose";

import bcrypt from "bcrypt";

// Import MongoDB client connection
import client from "@/libs/mongoconnect";

// Import the User model to interact with the users collection in MongoDB
import { User } from "@/app/models/User";

// Define authentication options for NextAuth
export const authOptions = {
  // Secret key for encrypting authentication tokens
  secret: process.env.NEXTAUTH_SECRET,

  // Configure MongoDB as the database adapter for storing authentication data
  adapter: MongoDBAdapter(client),

  // Define authentication providers (Google OAuth and Credentials)
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials-based authentication (email and password)
    CredentialsProvider({
      name: "Credentials", 
      id: "credentials", 

      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },

      // Custom authorization function to validate user credentials
      async authorize(credentials, req) {
        const { email, password } = credentials; // Extract email and password from credentials input

        // Connect to MongoDB using Mongoose
        await mongoose.connect(process.env.MONGO_URL);

        // Find the user in the database by email
        const user = await User.findOne({ email });

        // If user exists and password matches the hashed password in the database
        if (user && bcrypt.compareSync(password, user.password)) {
          return user; // Return user object (successfully authenticated)
        }

        return null;
      },
    }),
  ],
};
