"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Importando o componente Link
import { Button } from "@/common/button";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to sign in");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <form
        className="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-lg"
        onSubmit={handleSignIn}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-700">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
        </div>

        {/* Título e Subtítulo */}
        <h1 className="text-2xl font-bold text-center text-white">Entre na sua conta</h1>
        <p className="mt-2 text-center text-sm text-gray-400">
          Não tem uma conta?{" "}
          <Link href="/signup" className="text-purple-500 hover:underline">
            Sign up
          </Link>{" "}
          para um teste gratuito.
        </p>

        {/* Erro */}
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

        {/* Email */}
        <div className="mt-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <div className="relative mt-2">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@gmail.com"
              className="w-full rounded-md border-0 bg-gray-800 p-4 pl-10 text-sm text-gray-200 shadow-sm placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* Password */}
        <div className="mt-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="w-full rounded-md border-0 bg-gray-800 p-4 pl-10 text-sm text-gray-200 shadow-sm placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* Botão */}
        <Button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Login <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
