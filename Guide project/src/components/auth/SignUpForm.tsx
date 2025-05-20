import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader, LogIn } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                Schema                                      */
/* -------------------------------------------------------------------------- */
const schema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type Inputs = z.infer<typeof schema>;

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */
export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: Inputs) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return setError('root', { message: error.message });
    }
    // Supabase automatically sends verification email; optionally redirect
    navigate('/verify-email', { replace: true });
  };

  const onGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setError('root', { message: error.message });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card p-8 backdrop-blur-xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Create an Account</h2>
          <p className="text-text-secondary">Join us to unlock the full potential of AI</p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register('email')}
                className={`w-full bg-dark-card/30 border ${
                  errors.email ? 'border-status-error' : 'border-dark-border/20'
                } rounded-xl px-4 py-3 pl-12 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-purple-primary/50 transition-all duration-200`}
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-status-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <input
                key={showPassword ? 'text' : 'password'}
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('password')}
                className={`w-full bg-dark-card/30 border ${
                  errors.password ? 'border-status-error' : 'border-dark-border/20'
                } rounded-xl px-4 py-3 pl-12 pr-12 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-purple-primary/50 transition-all duration-200`}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-status-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                className={`w-full bg-dark-card/30 border ${
                  errors.confirmPassword ? 'border-status-error' : 'border-dark-border/20'
                } rounded-xl px-4 py-3 pl-12 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-purple-primary/50 transition-all duration-200`}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-status-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full glass-button justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>

          {/* Root error */}
          {errors.root && (
            <p className="text-sm text-status-error text-center flex items-center justify-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.root.message}
            </p>
          )}
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-border/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-dark-background text-text-tertiary">Or continue with</span>
          </div>
        </div>

        {/* Google Auth */}
        <button
          type="button"
          onClick={onGoogleAuth}
          className="w-full bg-white text-gray-800 font-medium px-4 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors duration-200"
        >
          <LogIn className="w-5 h-5" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
