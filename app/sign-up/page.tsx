"use client";
import { Input } from "@nextui-org/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 chracters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password does not match",
  });

const SignUpPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const response = await fetch("api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email.toLocaleLowerCase(),
        password: values.password,
      }),
    });
    if (response.ok) {
      toast.success("Account successfully created!");
      setLoading(false);
      router.push("/sign-in");
    } else {
      toast.error("Registration failed!");
      setLoading(false);
      console.error("Registration failed!");
    }
  };

  return (
    <div className="mx-10 my-5 flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-[450px]"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input label="Username" variant="underlined" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input label="Email" variant="underlined" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        label="Password"
                        variant="underlined"
                        type={showPass ? "text" : "password"}
                        {...field}
                      />
                      {showPass ? (
                        <EyeOpenIcon
                          className="absolute right-1 top-6"
                          onClick={() => setShowPass(!showPass)}
                        />
                      ) : (
                        <EyeClosedIcon
                          className="absolute right-1 top-6"
                          onClick={() => setShowPass(!showPass)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      label="Re-Enter your password"
                      variant="underlined"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            variant="outline"
            className="w-full mt-6 rounded-none"
            type="submit"
          >
            <div className="flex gap-2">
              <Loader isLoading={isLoading} />
              <p>Sign up</p>
            </div>
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full sm:w-[450px] items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        {/* <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}
        <p className="text-center text-sm text-gray-600 mt-2">
          If you don&apos;t have an account, please&nbsp;
          <Link className="text-blue-500 hover:underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpPage;
