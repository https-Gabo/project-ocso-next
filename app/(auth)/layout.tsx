import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_#ffedd5_0%,_#fffaf5_48%,_#fef3c7_100%)] px-4 py-10">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="rounded-2xl border border-white/80 bg-white/70 px-5 py-3 shadow-[0_12px_30px_rgba(124,45,18,0.08)] backdrop-blur-sm">
          <Image
            className="h-auto w-48 sm:w-56"
            src="/OXXO.svg"
            alt="Logo de Ocso"
            width={250}
            height={80}
            priority
          />
        </div>
        {children}
      </div>
    </div>
  );
}
