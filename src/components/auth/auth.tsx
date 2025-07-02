import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import { z } from 'zod';

interface AuthFormProps {
  onSubmit: (data: { email: string; password: string; remember: boolean }) => Promise<void>;
}

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    submit: '',
  });

  const validateField = (field: 'email' | 'password', value: string) => {
    try {
      if (field === 'email') {
        emailSchema.parse(value);
      } else {
        passwordSchema.parse(value);
      }
      setErrors(prev => ({ ...prev, [field]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as 'email' | 'password', value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, submit: '' }));

    try {
      emailSchema.parse(formData.email);
      passwordSchema.parse(formData.password);

      setIsLoading(true);
      await onSubmit({ ...formData, remember });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          setErrors(prev => ({ ...prev, [err.path[0]]: err.message }));
        });
      } else {
        setErrors(prev => ({ ...prev, submit: 'An unexpected error occurred' }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card p-8 backdrop-blur-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-text-secondary">
            {isSignUp 
              ? 'Join us to unlock the full potential of AI'
              : 'Sign in to access your business assistant'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-dark-card/30 border ${
                  errors.email ? 'border-status-error' : 'border-dark-border/20'
                } rounded-xl px-4 py-3 pl-12 text-text-primary placeholder:text-text-tertiary
                focus:outline-none focus:border-purple-primary/50 transition-all duration-200`}
                placeholder="your@email.com"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-status-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-dark-card/30 border ${
                  errors.password ? 'border-status-error' : 'border-dark-border/20'
                } rounded-xl px-4 py-3 pl-12 pr-12 text-text-primary placeholder:text-text-tertiary
                focus:outline-none focus:border-purple-primary/50 transition-all duration-200`}
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-status-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-dark-border/20 bg-dark-card/30 text-purple-primary 
                focus:ring-purple-primary/50 focus:ring-offset-0"
              />
              <span className="text-sm text-text-secondary">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-purple-primary hover:text-purple-hover transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full glass-button justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>

          {errors.submit && (
            <p className="text-sm text-status-error text-center flex items-center justify-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.submit}
            </p>
          )}
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-border/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-dark-background text-text-tertiary">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <button
          type="button"
          className="w-full bg-white text-gray-800 font-medium px-4 py-3 rounded-xl flex items-center 
          justify-center gap-3 hover:bg-gray-100 transition-colors duration-200"
        >
          <img
            src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Toggle Sign In/Up */}
        <p className="mt-8 text-center text-text-secondary">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-primary hover:text-purple-hover transition-colors"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>

        {/* Terms */}
        <p className="mt-4 text-center text-sm text-text-tertiary">
          By continuing, you agree to our{' '}
          <a href="#" className="text-purple-primary hover:text-purple-hover transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-purple-primary hover:text-purple-hover transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;