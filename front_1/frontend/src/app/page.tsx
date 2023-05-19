import Link from "next/link";
import RootLayout from "./layout";

const IndexPage = () => {
  return (
    <main>
      <h1 className="text-large">Ruta públia</h1>
      <Link href="/admin" className="text-blue-500">
        IR A TODO APP
      </Link>
    </main>
  );
};

export default IndexPage;
