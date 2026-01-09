import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoginForm } from "./LoginForm";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const { returnUrl, msg, msgType } = params;
  const isSuccessTypeAlert = msgType === "success";
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col gap-6 w-[500px]">
        {msg && (
          <Alert
            variant={isSuccessTypeAlert ? "default" : "destructive"}
            className={cn(isSuccessTypeAlert && "bg-green-300/30")}
          >
            <AlertCircle className="h-4 w-4 mt-0.5" />
            <AlertTitle>
              {isSuccessTypeAlert ? "Success!" : "Login required!"}
            </AlertTitle>
            <AlertDescription
              className={cn(isSuccessTypeAlert && "text-green-900")}
            >
              {decodeURIComponent(msg)}
            </AlertDescription>
          </Alert>
        )}
        <LoginForm returnUrl={returnUrl} />
      </div>
    </div>
  );
}
