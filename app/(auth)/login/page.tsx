"use client";

import { API_URL, TOKEN_NAME } from "@/constants";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    setSubmitting(true);
    e.preventDefault();
    setLoading(true);
    setError(null);
    localStorage.removeItem(TOKEN_NAME);
    document.cookie = `${TOKEN_NAME}=; Max-Age=0; path=/`;
    try {
      const formData = new FormData(e.currentTarget);
      let authData: any = {};
      authData.userEmail = formData.get("userEmail");
      authData.userPassword = formData.get("userPassword");
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(authData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "No se pudo iniciar sesión");
      }
      const token = data?.token ?? data?.accessToken ?? data?.access_token;
      if (!token) {
        throw new Error("El backend no devolvió un token de acceso");
      }
      localStorage.setItem(TOKEN_NAME, token);
      document.cookie = `${TOKEN_NAME}=${token}; path=/; SameSite=Lax`;
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error al iniciar sesión");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  return (
    <form
      className="w-full rounded-xl border border-orange-100 bg-white p-6 shadow-[0_20px_45px_rgba(124,45,18,0.12)] sm:p-8"
      onSubmit={handleSubmit}
    >
      <p className="my-2 text-2xl font-bold text-slate-800">Iniciar sesión</p>
      <div className="my-5 flex flex-col items-center gap-3">
        <Input
          label="Email"
          name="userEmail"
          type="email"
          isRequired={true}
          size="sm"
        />
        <Input
          label="Contraseña"
          name="userPassword"
          type="password"
          isRequired={true}
          size="sm"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button
          color="primary"
          type="submit"
          isLoading={loading}
          disabled={submitting}
        >
          {submitting ? "Enviando..." : "Iniciar Sesión"}
        </Button>
        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-center text-sm text-red-700">
            {error}
          </p>
        )}
        <p className="text-sm text-slate-600">
          ¿No tienes cuenta?{" "}
          <Link
            href="/signup"
            className="font-semibold text-orange-700 hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </form>
  );
}
