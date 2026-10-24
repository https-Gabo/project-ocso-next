import Image from "next/image";

export default function Header() {
  return (
    <header className="flex h-[11vh] min-h-[84px] max-h-[104px] w-full items-center bg-orange-100 px-12">
      <Image
        src="/OXXO.svg"
        width={128}
        height={68}
        priority
        alt="OXXO"
        draggable={false}
      />
    </header>
  );
}
