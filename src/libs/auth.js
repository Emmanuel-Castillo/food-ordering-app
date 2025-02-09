import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions"
import { UserInfo } from "@/app/models/UserInfo";

export async function isAdmin() {
    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email
    if (!userEmail) {
      return false
    }
  
    else {
      const userInfo = await UserInfo.findOne({email: userEmail})
      if (!userInfo) 
        return false
      return userInfo.admin
    }
}
