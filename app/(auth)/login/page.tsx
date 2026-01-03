"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "./action";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function LoginPage({ className }: React.ComponentProps<"div">) {
  const [state, loginAction, isPending] = useActionState(login, undefined);
  console.log(state);
  const emailError = state?.errors?.email?.[0];
  const passwordError = state?.errors?.password?.[0];
  console.log("toast");
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className={cn("flex flex-col gap-6 w-[500px]", className)}>
        {state?.message && (
          <Alert variant={"destructive"}>
            <AlertCircleIcon />
            <AlertTitle>{state?.message}</AlertTitle>
          </Alert>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={loginAction}>
              <FieldGroup>
                <Field data-invalid={!!emailError}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    name="email"
                    required
                  />
                  {emailError && <FieldError>{emailError}</FieldError>}
                </Field>
                <Field data-invalid={!!passwordError}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    {/* <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a> */}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                  />
                  {passwordError && <FieldError>{passwordError}</FieldError>}
                </Field>
                <Field>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/register">Sign up</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
