import { Button } from "../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { createUserAccount } from "@/lib/appwrite/api";
import { toast } from "sonner";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";

interface Field {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: any;
  name: string;
  ref: React.Ref<any>;
}

const SignupForm = () => {
  // const isLoading =  false;


  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();

  const { mutateAsync: signInAccount, isLoading: isSigningIn } = useSignInAccount();


  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {

    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast('Sign up failed. Please try again.')
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })
    if (!session) {
      return toast('Sign in failed. Please try again.')
    }

  }

  // Added type for field to fix implicit any error
  interface Field {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: any;
    name: string;
    ref: React.Ref<any>;
  }

  return (
    <Form {...form}>
      <div className="sm:w-400 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-4 sm:pt-6">Create a new account </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2"> To use Snapgram enter your details</p>



        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-4 w-full mt-4 p-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel><br />
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel><br />
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel>Email</FormLabel><br />
                <FormControl>
                  <Input type="email " className="shad-input" {...field} />
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
                <FormLabel>Password</FormLabel><br />
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary m-2" type="submit">

            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : "Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link rel="stylesheet" to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
