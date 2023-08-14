import Link from "next/link";
import { Button } from "@nextui-org/react";

export const EnterButton = () => {
  return (
    <Link href="/#" className="w-full">
      <Button color="primary" radius="sm" className="w-full uppercase">
        Ingresar (keycloak)
      </Button>
    </Link>
  );
};
