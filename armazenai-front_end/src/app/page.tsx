"use client";
import AuthForm from "./components/auth-form";

export default function Home() {
  return (
    <main>
      <div className="col-6 auth-widget">
        <AuthForm />
      </div>
    </main>
  );
}
