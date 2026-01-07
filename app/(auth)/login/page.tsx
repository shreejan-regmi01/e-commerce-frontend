import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoginForm } from "./LoginForm";
import { AlertCircle } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const { returnUrl, msg } = params;

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col gap-6 w-[500px]">
        {msg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4 mt-0.5" />
            <AlertTitle>Login required!</AlertTitle>
            <AlertDescription>{decodeURIComponent(msg)}</AlertDescription>
          </Alert>
        )}
        <LoginForm returnUrl={returnUrl} />
      </div>
    </div>
  );
}
