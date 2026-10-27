"use client";

import { API_URL } from "@/constants";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      let authData: any = {};
      authData.userEmail = formData.get("userEmail");
      authData.userPassword = formData.get("userPassword");
      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        {
          ...authData,
        },
        {
          withCredentials: true,
        },
      );
      console.log(data);
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Ocurrió un error al iniciar sesión",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="bg-orange-500 px-10 py-2 rounded-md"
      onSubmit={handleSubmit}
    >
      <p className="text-2xl my-4 text-white">Iniciar sesión</p>
      <div className="flex flex-col gap-2 my-4 items-center">
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
          <p className="text-white bg-red-600 px-3 py-1 rounded text-sm text-center">
            {error}
          </p>
        )}
        <p className="text-white">
          ¿No tienes cuenta?{" "}
          <Link href="/signup" className="text-red-600 underline">
            Regístrate
          </Link>
        </p>
      </div>
    </form>
  );
}
