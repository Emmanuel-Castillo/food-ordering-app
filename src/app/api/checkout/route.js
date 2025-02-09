import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions"
import { Order } from "@/app/models/Order";
import { MenuItem } from "@/app/models/MenuItems";
const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  // Create order to saved in db
  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  // Create stripe session
  const stripeLineItems = [];

  for (const cartProduct of cartProducts) {
    const productName = cartProduct.name;
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productPrice = productInfo.basePrice;

    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );
      productPrice += size.price;
    }

    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const extraThingInfo = productInfo.extraIngredientPrices.find(
          (extra) => extra._id.toString() === cartProductExtraThing._id.toString()
        );
        productPrice += extraThingInfo.price
      }
    }

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'orders/'+orderDoc._id.toString()+'?clear-cart=1',
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          fixed_amount: { amount: 500, currency: 'USD' },
          type: 'fixed_amount'
        },
      },
    ],
  });

  return Response.json(stripeSession.url)
}
