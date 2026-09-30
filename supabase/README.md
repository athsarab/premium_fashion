# Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. In **Project settings > API**, copy the project URL and anon key into a local `.env.local` file using `.env.example`.
3. In **SQL Editor**, run [`schema.sql`](schema.sql). This creates the private `profiles` table and creates a profile automatically whenever a user signs up.
4. In **Authentication > Providers**, enable **Email**. For easier local testing, you can temporarily disable email confirmation; for a real launch, keep confirmation enabled and configure your SMTP provider.
5. Enable **Google** in the same area. Create a Google OAuth web client in Google Cloud, set its authorized redirect URI to the Supabase callback URL shown in the Supabase provider screen, and paste its client ID and secret into Supabase.
6. In **Authentication > URL Configuration**, add `http://localhost:3000/account` to redirect URLs. Add your production account URL there before deployment.
7. Start the app with `npm run dev` and open `/account`.

The anon key is safe to use in the browser when Row Level Security is enabled. Never expose a Supabase service-role key in this project or in `.env.local` variables prefixed with `NEXT_PUBLIC_`.