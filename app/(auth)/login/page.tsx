import { cn } from "@/lib/utils";
import { LoginForm } from "./LoginForm";

export default function LoginPage({ className }: React.ComponentProps<"div">) {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className={cn("flex flex-col gap-6 w-[500px]", className)}>
        <LoginForm />
      </div>
    </div>
  );
}
