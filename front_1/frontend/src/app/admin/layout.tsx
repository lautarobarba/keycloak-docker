import { ProtectedRouteWrapper } from "@/wrappers/ProtectedRouteWrapper";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ProtectedRouteWrapper>{children}</ProtectedRouteWrapper>;
}
