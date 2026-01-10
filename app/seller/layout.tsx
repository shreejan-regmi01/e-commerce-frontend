import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
export default function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="py-4 px-12 bg-green-800 shadow-lg">
        <h1 className="text-3xl font-semibold text-white">Seller Portal</h1>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r hidden md:block shadow-sm h-[calc(100vh-70px)]">
          <div className="p-4 py-6 space-y-4 h-full">
            <div className="px-3 mb-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </h2>
            </div>

            <nav className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                asChild
              >
                <Link href="/admin/category/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Link>
              </Button>
            </nav>

            <div className="px-3 mt-6 mb-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                System
              </h2>
            </div>
            <nav className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                asChild
              >
                <Link href="/logout" className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </Button>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-8 overflow-auto ">
          <div className="max-w-6xl mx-auto ">{children}</div>
        </main>
      </div>
    </>
  );
}
