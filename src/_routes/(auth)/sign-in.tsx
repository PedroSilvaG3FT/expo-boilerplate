import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { FormContainer } from "@/_shared/design/components/form";
import AppFormInput from "@/_shared/design/components/form/form-input";
import { Button } from "@/_shared/design/ui/button";
import { useAuth } from "@/contexts/auth.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, "Required field"),
  password: z.string().min(1, "Required field"),
});

interface IFormState extends z.infer<typeof formSchema> {}

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuth();

  const form = useForm<IFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: IFormState) {
    signIn(values.email, values.password).then(() => router.push("/"));
  }

  return (
    <AppView className="h-full p-8 flex items-center justify-center">
      <AppView className="!bg-secondary rounded-3xl p-4 w-full">
        <AppText className="mb-4">Login</AppText>

        <FormContainer {...form}>
          <AppFormInput
            label="Email"
            name="email"
            control={form.control}
            placeholder="Enter your email"
          />

          <AppFormInput
            name="password"
            label="Password"
            control={form.control}
            placeholder="**********"
          />

          <Button className="mt-4" onPress={form.handleSubmit(onSubmit)}>
            <AppText>Entrar</AppText>
          </Button>
        </FormContainer>

        <Link href="/(auth)/sign-up">
          <AppText>Cadastro</AppText>
        </Link>

        <Link href="/(auth)/forgot-password">
          <AppText>Esqueci a senha</AppText>
        </Link>

        <Link href="/">
          <AppText>Home</AppText>
        </Link>
      </AppView>
    </AppView>
  );
}
