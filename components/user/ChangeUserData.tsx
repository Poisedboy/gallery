import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const FormProductSchema = z.object({
	username: z.string().min(1, "Username is required").max(100),
	email: z.string().min(1, "Email is required"),
});

export const ChangeUserData = () => {
	const { data: session, status } = useSession();
	const [userData, setUserData] = useState<any>();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");

	const form = useForm<z.infer<typeof FormProductSchema>>({
		resolver: zodResolver(FormProductSchema),
		defaultValues: {
			username: "",
			email: "",
		},
	});

	useEffect(() => {
		form.setValue("email", session?.user.email);
		form.setValue("username", session?.user.username);
	}, []);

	const [image, setImage] = useState<File | undefined | null>(null);

	const onSubmit = async (
		values: z.infer<typeof FormProductSchema>
	) => {
		const { data, error } = await supabase.storage
			.from("product")
			.upload("public/" + image?.name, image as File);
		if (error) {
			return toast.error(error.message);
		}

		const response = await fetch("api/upload-product", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: values.username,
				email: values.email,
			}),
		});
		if (response.ok) {
			form.reset({
				username: session?.user.username,
				email: session?.user.email,
			});
			toast.success("Data changed");
		} else if (error) {
			console.log(error);
			return toast.error("An error occured");
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