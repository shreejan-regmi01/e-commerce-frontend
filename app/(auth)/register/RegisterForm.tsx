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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useActionState } from "react";
import { register } from "./action";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export function RegisterForm() {
  const [state, registerAction, isPending] = useActionState(
    register,
    undefined
  );
  return (
    <>
      {state?.message && (
        <Alert variant={"destructive"}>
          <AlertCircleIcon />
          <AlertTitle>{state.message}</AlertTitle>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerAction}>
            <FieldGroup>
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="firstName">First name</FieldLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                  />
                </Field>
              </div>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              {/* Mobile - Enforcing 10 digits via pattern/maxLength */}
              <Field>
                <FieldLabel htmlFor="mobile">Mobile Number</FieldLabel>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="98XXXXXXXX"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />
                <FieldDescription>
                  Enter a valid 10-digit mobile number
                </FieldDescription>
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" required />
              </Field>

              {/* Role Selection */}
              <Field>
                <FieldLabel htmlFor="role">Account Type</FieldLabel>
                <Select name="role" defaultValue="customer">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* Submit & Footer */}
              <Field>
                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={isPending}
                >
                  {isPending ? "Registering..." : "Register"}
                </Button>
                <FieldDescription className="text-center mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
