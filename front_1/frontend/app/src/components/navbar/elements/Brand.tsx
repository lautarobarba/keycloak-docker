import Link from "next/link";

export const Brand = () => {
  return (
    <Link href="/" className="flex items-center">
      <span className="text-xl md:text-2xl font-semibold whitespace-nowrap text-white">
        Jardín Botánico de Ushuaia
      </span>
    </Link>
  );
};
