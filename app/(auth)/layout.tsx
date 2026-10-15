import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-orange-100 px-4 py-10">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <Image
          className="h-auto w-48 sm:w-56"
          src="/OXXO.svg"
          alt="Logo de Ocso"
          width={250}
          height={80}
          priority
        />
        {children}
      </div>
    </div>
  );
}
