"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhook = exports.paymentProcessing = void 0;
const secrets_1 = require("../util/secrets");
const stripe_1 = __importDefault(require("stripe"));
const apiError_1 = require("../helpers/apiError");
const Order_1 = __importDefault(require("../models/Order"));
const order_1 = __importDefault(require("../services/order"));
const stripe = new stripe_1.default(secrets_1.STRIPE_SECRET_KEY);
exports.paymentProcessing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const customer = await stripe.customers.create({
        //   metadata: {
        //     userId: req.body.userId,
        //     orderId: req.body.orderId,
        //   },
        // })
        const params = {
            submit_type: 'pay',
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['DE', 'NO'],
            },
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1LqDYqG5HlxfACqmEIQNcx45' },
                { shipping_rate: 'shr_1LqDZoG5HlxfACqmrFJVx3B9' },
            ],
            phone_number_collection: {
                enabled: true,
            },
            line_items: req.body.items.map((item) => {
                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: item.name,
                            images: [item.image],
                        },
                        unit_amount_decimal: item.price * 100,
                    },
                    adjustable_quantity: { enabled: true, minimum: 1 },
                    quantity: item.qty,
                };
            }),
            client_reference_id: req.body.user._id,
            mode: 'payment',
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
        };
        const session = yield stripe.checkout.sessions.create(params);
        res.status(200).json(session);
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
let endpointSecret;
// endpointSecret = STRIPE_WEBHOOK_ENDPOINT_SECRET
exports.stripeWebhook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers['stripe-signature'];
    let data;
    let eventType;
    if (endpointSecret) {
        let event;
        try {
            event = stripe.webhooks.constructEvent(req, sig, endpointSecret);
            console.log('Webhook verified');
        }
        catch (error) {
            if (error instanceof Error && error.name == 'ValidationError') {
                next(new apiError_1.BadRequestError('Invalid Request', error));
            }
            else {
                console.log(`Webhook Error: ${error.message}`);
                res.status(400).send(`Webhook Error: ${error.message}`);
                return;
            }
        }
        data = event.data.object;
        eventType = event.type;
    }
    else {
        data = req.body.data.object;
        eventType = req.body.type;
    }
    // Handle the event
    if (eventType === 'checkout.session.completed') {
        yield stripe.checkout.sessions.listLineItems(data.id).then((lineItems) => {
            const orderItems = lineItems.data.map((item) => {
                return {
                    name: item.description,
                    price: item.amount_total,
                    qty: item.quantity,
                };
            });
            const order = new Order_1.default({
                userId: data.client_reference_id,
                paymentIntentId: data.payment_intent,
                orderItems: orderItems,
                shippingAddress: {
                    name: data.shipping_details.name,
                    addressLine1: data.shipping_details.address.line1,
                    addressLine2: data.shipping_details.address.line2,
                    city: data.shipping_details.address.city,
                    postalCode: data.shipping_details.address.postal_code,
                    country: data.shipping_details.address.country,
                },
                shippingPrice: data.shipping_cost.amount_total,
                shippingRate: data.shipping_cost.shipping_rate,
                totalAmount: data.amount_total,
                paymentStatus: data.paymentStatus,
            });
            order_1.default.createOrder(order);
        });
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
});
//# sourceMappingURL=payment.js.map