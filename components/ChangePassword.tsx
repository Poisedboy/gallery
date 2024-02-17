import { Input } from "@nextui-org/react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import Loader from "./Loader";

const PasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 chracters"),
});

const ChangePassword = ({ id }: { id: string }) => {
  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof PasswordSchema>) => {
    setLoading(true);
    try {
      if (values.password.length === 0) return;
      const response = await fetch("api/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password: values.password,
        }),
      });
      if (response.ok) {
        toast.success("Passwrod is updated!");
      } else if (response) {
        const error = await response.json();
        toast.error(`${error.message}!`);
      }
    } catch (e) {
      toast.error("Error");
      console.log(e);
    } finally {
      setLoading(false);
      form.setValue("password", "");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-center my-5 gap-5 sm:10 w-full"
      >
        <div className="flex flex-col gap-[5px] w-full sm:w-[450px]">
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
          <Button
            variant="outline"
            className="w-full rounded-none"
            type="submit"
          >
            <div className="flex gap-2">
              <Loader isLoading={isLoading} />
              <p>Change Password</p>
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePassword;
