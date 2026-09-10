import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import SignupForm from '../components/auth/SignupForm';

export default function Signup() {
  return (
    <AuthLayout mode="signup">
      <SignupForm />
    </AuthLayout>
  );
}

