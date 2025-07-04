import { CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <Helmet>
        <title>Verify Email | HusAI</title>
        <meta name="description" content="Check your inbox to verify your email and activate your HusAI account." />
      </Helmet>
      <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Check your inbox ✉️</h1>
      <p className="text-text-secondary max-w-sm">
        We’ve sent a verification link to your email. After you click it you
        can sign in.
      </p>
    </div>
  );
}
