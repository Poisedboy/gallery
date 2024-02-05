"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const FormSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Invalid email"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must have than 8 chracters"),
});

const SignInPage = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		const signInData = await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: false,
		});
		if (signInData?.error) {
			toast.error(signInData?.error);
			console.log(signInData?.error);
		} else {
			router.push("/shop");
		}
	};

	return (
		<div className="mx-10 my-5 flex flex-col justify-center items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full sm:w-[450px]">
					<div className="space-y-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											label="Email"
											variant="underlined"
											{...field}
										/>
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
										<Input
											label="Password"
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
						type="submit">
						Sign in
					</Button>
				</form>
				<div className="mx-auto my-4 flex  w-full sm:w-[450px] items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
					or
				</div>
				{/* <GoogleSignInButton>Sign in with Google</GoogleSignInButton> */}
				<p className="text-center text-sm text-gray-600 mt-2">
					If you don&apos;t have an account, please&nbsp;
					<Link
						className="text-blue-500 hover:underline"
						href="/sign-up">
						Sign up
					</Link>
				</p>
			</Form>
		</div>
	);
};

export default SignInPage;
