import Link from "next/link";

export const Brand = () => {
  return (
    <Link href="/" className="flex items-center">
      <span className="text-xl md:text-2xl font-semibold whitespace-nowrap text-white">
        Demo NextJS - KeyCloak
      </span>
    </Link>
  );
};
