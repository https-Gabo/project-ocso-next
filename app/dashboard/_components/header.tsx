import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-[11vh] min-h-[84px] max-h-[104px] w-full items-center justify-between border-b border-orange-200 bg-white/80 px-6 shadow-[0_4px_20px_rgba(251,146,60,0.08)] backdrop-blur-md sm:px-12">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-orange-100 p-2 shadow-sm">
          <Image
            src="/OXXO.svg"
            width={128}
            height={68}
            priority
            alt="OXXO"
            draggable={false}
          />
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 sm:flex">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        Dashboard activo
      </div>
    </header>
  );
}
