"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get("password") !== formData.get("confirmPassword")) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setMessage(
      "El registro todavía no está conectado al servicio de autenticación.",
    );
  }

  return (
    <main className="w-full max-w-md rounded-lg bg-white p-6 text-left shadow-xl sm:p-8">
      <h1 className="text-2xl font-semibold text-slate-900">Crear cuenta</h1>
      <p className="mt-2 text-sm text-slate-600">Regístrate para continuar.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-700">
          Correo electrónico
          <input
            className="mt-1.5 block min-h-11 w-full rounded-md border border-slate-300 px-3 text-base text-slate-900 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Contraseña
          <input
            className="mt-1.5 block min-h-11 w-full rounded-md border border-slate-300 px-3 text-base text-slate-900 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Confirmar contraseña
          <input
            className="mt-1.5 block min-h-11 w-full rounded-md border border-slate-300 px-3 text-base text-slate-900 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
        <button
          className="min-h-11 w-full rounded-md bg-orange-600 px-4 font-semibold text-white transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
          type="submit"
        >
          Crear cuenta
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-slate-700" role="status">
          {message}
        </p>
      )}
      <p className="mt-6 text-center text-sm text-slate-600">
        ¿Ya tienes una cuenta?{" "}
        <Link
          className="font-semibold text-orange-700 hover:underline"
          href="/login"
        >
          Inicia sesión
        </Link>
      </p>
    </main>
  );
}
