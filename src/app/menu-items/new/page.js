"use client"
import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation"
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false)

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
      });
      response.ok ? resolve() : reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item...",
      success: "Saved!",
      error: "Upload error...",
    });

    setRedirectToItems(true)
  }

  if (redirectToItems) {
    return redirect('/menu-items')
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={data.admin} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menu-items'} className="button">
        <Left/>  
        Show all menu items</Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit}/>
    </section>
  );
}
