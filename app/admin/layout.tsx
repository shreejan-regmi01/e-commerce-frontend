export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="py-4 px-12 bg-blue-800 shadow-lg">
        <h1 className="text-3xl font-semibold text-white">Admin Portal</h1>
      </nav>
      <main className="px-12">{children}</main>
    </>
  );
}
