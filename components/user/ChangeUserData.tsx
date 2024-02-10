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
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const FormUserSchema = z.object({
	username: z.string().min(1, "Username is required"),
	email: z
		.string()
		.min(1, "Email is required")
		.email("Invalid email"),
});

export const ChangeUserData = () => {
	const { data: session, status, update } = useSession();

	const form = useForm<z.infer<typeof FormUserSchema>>({
		resolver: zodResolver(FormUserSchema),
		defaultValues: {
			username: "",
			email: "",
		},
	});

	useEffect(() => {
		const interval = setInterval(() => update(), 1000 * 60 * 60);
		return () => clearInterval(interval);
	}, [update]);

	useEffect(() => {
		form.setValue("email", session?.user.email);
		form.setValue("username", session?.user.username);
	}, []);

	const onSubmit = async (values: z.infer<typeof FormUserSchema>) => {
		try {
			const response = await fetch("api/update-user", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: values.username,
					email: values.email,
				}),
			});
			if (response.ok) {
				update({username: values.username });
				toast.success("Updated!");
				signOut()
			} else if (response) {
				const error = await response.json();
				toast.error(`${error.message}!`);
			}
		} catch (e) {
			toast.error("Error");
			console.log(e);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-wrap items-center justify-center my-5 gap-5 sm:10 w-full">
				<div className="flex flex-col gap-[5px] w-full sm:w-[450px]">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormControl>
										<Input
											label="Username"
											variant="underlined"
											// defaultValue={username}
											{...field}
										/>
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
									<Input
										label="Email"
										variant="underlined"
										// defaultValue={email}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						variant="outline"
						className="w-full rounded-none"
						type="submit">
						Change data
					</Button>
				</div>
			</form>
		</Form>
	);
};
