"use client";
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
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

import { useActionState } from "react";
import { login } from "./action";

export const LoginForm = () => {
  const [state, loginAction, isPending] = useActionState(login, undefined);
  const emailError = state?.errors?.email?.[0];
  const passwordError = state?.errors?.password?.[0];
  return (
    <>
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
                <Input id="password" type="password" name="password" required />
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
    </>
  );
};
