import asyncHandler from "express-async-handler";
import Razorpay from "../config/razorpay.js";
import crypto from 'crypto'
import { OrderRequest } from "../models/orderModel.js";

// @desc    For order request
// @rout    POST /order
// @acce    Private - user(founder)
export const orderRequest = asyncHandler(async (req, res) => {
  const newOrderRequest = await OrderRequest.create(req.body);
  if (newOrderRequest) return res.status(201).json({ newOrderRequest });
  return res.status(500).json({ message: "Internal server error" });
});

// @desc    To accept order and payment(razorpay)
// @rout    PUT /order
// @acce    Private - user(client)
export const acceptOrder = asyncHandler(async (req, res) => {
  const order = await OrderRequest.findById(req.body.orderId);
  if (order) {
    order.isAccepted = true;
    await order.save();
    const amount = order.amount;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      receipt: order._id,
    };
    const response = await Razorpay.orders.create(options);
    console.log(response);
    return res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  }
  return res.status(404).json({ message: "Given id not found" });
});

// @desc    To verify razorpay payament
// @rout    POST /order/confirm
// @acce    Private
export const verifyPayment = asyncHandler(async(req, res) => {

	const shasum = crypto.createHmac('sha256', process.env.SECRET_KEY_ID)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
        const order = await OrderRequest.findById(JSON.stringify(req.body.order_id))
        order.isPaid = true;
        await order.save();
		// require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
        return res.status(201).json({message:"payment done succesfully"});
	} 
	res.json({ message: 'something went wrong' })
});
