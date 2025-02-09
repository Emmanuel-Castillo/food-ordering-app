const stripe = require('stripe')(process.env.STRIPE_SK)
import { Order } from '@/app/models/Order'
export async function POST(req) {
    // Grab stripe signature
    const sig = req.headers.get('stripe-signature')

    let event

    try {
        const reqBuffer = await req.text()
        const signSecret = process.env.STRIPE_SIGN_SECRET
        event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret)
    } catch(e) {
        console.log('stripe error')
        return Response.json(e, {status: 400})
    }

    if (event.type === 'checkout.session.completed') {

        // Grabbing orderIf of order that has been checked out successfully
        const orderId = event?.data?.object?.metadata?.orderId
        const isPaid = event?.data?.object?.payment_status === 'paid'

        // Update order model in db
        if (isPaid) {
            await Order.updateOne({_id: orderId}, {paid: true})
        }
    }
    return Response.json('ok', {status: 200})
}