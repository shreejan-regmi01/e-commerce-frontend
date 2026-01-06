import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOwnUserData } from "@/services/user.service";
import { Mail, Phone, LogOut } from "lucide-react";

export default async function MePage() {
  const user = await getOwnUserData();
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col items-center gap-4 pb-6">
          <Avatar className="h-24 w-24 border-2 border-white shadow-sm">
            {/* <AvatarImage src="" alt="Profile picture" /> */}
            <AvatarFallback className="text-2xl bg-blue-50 text-blue-600 font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl">
              {user.firstName} {user.lastName}
            </CardTitle>
            <CardDescription>
              Member since {new Date(user.createdAt).getFullYear()}
            </CardDescription>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            {/* email */}
            <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-blue-50 p-2.5 rounded-full">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Email
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>

            {/* mobile */}
            <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-blue-50 p-2.5 rounded-full">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Mobile
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {user.mobile}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            {/* <Button
              variant="outline"
              className="w-full justify-start h-11"
              asChild
            >
              <Link href="/me/edit">
                <UserPen className="mr-2 h-4 w-4" /> Edit Profile
              </Link>
            </Button> */}

            <Button
              variant="destructive"
              className="w-full justify-start h-11"
              asChild
            >
              <a href="/logout">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
