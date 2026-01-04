import NavBar from "@/components/NavBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="px-12">{children}</main>
    </>
  );
}
