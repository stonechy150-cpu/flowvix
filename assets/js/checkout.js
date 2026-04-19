const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // Replace with your actual key or use process.env in build

async function handleCheckout(priceId) {
    try {
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId: priceId,
            }),
        });

        const session = await response.json();

        if (session.error) {
            alert(session.error);
            return;
        }

        const result = await stripe.redirectToCheckout({
            sessionId: session.sessionId,
        });

        if (result.error) {
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}
