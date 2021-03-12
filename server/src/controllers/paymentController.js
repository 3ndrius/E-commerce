const catchErrorAsync = require("../../middlewares/catchErrorAsync")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// process payment  api/a1/payment/process 
exports.processPayment = catchErrorAsync(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata:{integration_check: 'accept_a_payment'}
    });
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})