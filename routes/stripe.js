const router = require("express").Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
    try {
        stripe.charges.create({
                source: req.body.tokenId,
                amount: req.body.amount,
                currency: 'eur',
                // description: 'My First Test Charge (created for API docs)',
            },
            (stripeErr, stripeRes) => {
                if (stripeErr) {
                    res.status(500).json(stripeErr);
                } else {
                    res.status(200).json(stripeRes);
                }
            });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
