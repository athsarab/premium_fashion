# Security notes

## What this app protects

- Every route sends a restrictive Content Security Policy and standard browser security headers.
- Next.js version disclosure is disabled.
- Production builds now fail on TypeScript errors instead of publishing an unchecked build.
- The cart is stored in browser `localStorage` only. It contains product names and quantities, not passwords, payment details, or customer records.

## Sessions and cookies

This storefront does not currently have accounts, a checkout API, or a server-side session. Do not store login tokens, payment data, or personal customer data in `localStorage` or a client-readable cookie.

When accounts or checkout are added, create the session on the server and set the cookie with:

```text
HttpOnly; Secure; SameSite=Lax; Path=/
```

Use a maintained provider such as Auth.js, Clerk, or the payment provider's hosted checkout rather than implementing password storage or payment handling in the browser. Validate prices, stock, quantities, and order ownership again on the server; never trust values submitted by the cart UI.

## Deployment checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin.
2. Serve the site behind HTTPS and keep the HSTS header enabled.
3. Configure the auth provider's production callback URLs and cookie domain.
4. Keep payment processing on a PCI-compliant hosted provider.
5. Add server-side rate limiting and bot protection to contact, newsletter, login, and checkout endpoints when those endpoints are introduced.