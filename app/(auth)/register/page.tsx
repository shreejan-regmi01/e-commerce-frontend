import { cn } from "@/lib/utils";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage({
  className,
}: React.ComponentProps<"div">) {
  return (
    <div className="w-screen min-h-screen grid place-items-center py-10">
      <div className={cn("flex flex-col gap-6 w-[500px]", className)}>
        <RegisterForm />
      </div>
    </div>
  );
}
