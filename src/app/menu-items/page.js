"use client";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((data) => {
        setMenuItems(data);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={data.admin} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          Create new menu item <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {
            // menuItems.length > 0 &&
            menuItems.map((item, index) => (
              <Link
                key={index}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative w-[100px] h-[100px]">
                  {item.image.length > 0 && (
                    <Image
                      priority
                      className="rounded-md"
                      src={item.image}
                      alt="No picture available"
                      style={{ objectFit: "contain" }}
                      fill
                      sizes="(max-width: 100px) (max-height: 100px)"
                    />
                  )}
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))
          }
        </div>
      </div>
    </section>
  );
}
