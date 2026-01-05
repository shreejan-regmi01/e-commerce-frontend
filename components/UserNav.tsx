import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown, LogOut, ShoppingBag, User } from "lucide-react";
import { getOwnUserData } from "@/services/user.service";

export async function UserNav() {
  const user = await getOwnUserData();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          <User className="h-4 w-4" />
          <p>{user.firstName}</p>
          <ChevronDown className="mt-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">My Account</p>
            <p className="text-xs leading-none text-muted-foreground mt-1">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>

        <Link href="/orders">
          <DropdownMenuItem className="cursor-pointer">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>My Orders</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        {/* The Logout Button triggers the Server Action */}
        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
          <a href={"/logout"} className="flex items-center gap-4 w-full">
            <LogOut className="h-4 w-4" />
            <p>Log out</p>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
