const express = require('express');
const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.STRIPE_KEY);

dotenv.config();
const router = express.Router();

router.post('/payment', async (req, res) => {
    try {
        const { amount, paymentMethodId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true, // Allow only supported payment methods
                allow_redirects: "never", // Prevent redirects
            },
        });

        res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;