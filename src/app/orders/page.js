"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import { dbTimeForHuman } from "@/libs/datetime.js";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { data: profile, loading } = useProfile();
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!profile.admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && <div>Loading orders...</div>}
        {orders?.length > 0 &&
          orders.map((order, index) => (
            <div key={index} className="bg-gray-100 mb-2 p-4 rounded-lg items-center md:flex">
              <div className="grow flex items-center gap-5">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-400") +
                      " p-2 rounded-md text-white whitespace-nowrap w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </div>
                </div>
                <div>
                  <div>{order.userEmail}</div>
                  <div className="text-gray-600 text-sm">
                    Order Date: {dbTimeForHuman(order.createdAt)}
                  </div>
                  <div className="text-gray-500 text-xs max-w-80">
                    {order.cartProducts.map((p) => p.name).join(",")}
                  </div>
                </div>
              </div>

              <div className="justify-end flex gap-2 items-center">
                <Link
                  href={"/orders/" + order._id}
                  className="button text-nowrap"
                >
                  Show order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
