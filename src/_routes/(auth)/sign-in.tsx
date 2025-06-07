import AppFooterWave from "@/_shared/design/components/app-footer-wave";
import AppHeaderImage from "@/_shared/design/components/app-header";
import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import { FormContainer } from "@/_shared/design/components/form";
import AppFormInput from "@/_shared/design/components/form/form-input";
import { Button, ButtonText } from "@/_shared/design/ui/button";
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
    <AppView className="h-full">
      <AppHeaderImage
        wave="primary"
        onBack={() => console.log("onBack")}
        source={require("@/assets/images/header/yellow-dog.png")}
      />

      <AppView className="p-4 w-full">
        <AppText className="my-6 text-center" type="subtitle">
          Login
        </AppText>

        <AppText className="my-4 text-center opacity-40" type="default">
          Acesse inserindo seu e-mail e senha
        </AppText>

        <FormContainer {...form}>
          <AppFormInput
            name="email"
            className="mb-4"
            placeholder="e-mail"
            control={form.control}
          />

          <AppFormInput
            secureTextEntry
            name="password"
            placeholder="Senha"
            control={form.control}
          />

          <Link href="/(auth)/forgot-password" asChild>
            <AppText className="self-end my-2" type="link">
              Esqueci a senha
            </AppText>
          </Link>

          <Button className="mt-4" onPress={form.handleSubmit(onSubmit)}>
            <ButtonText>Confirmar</ButtonText>
          </Button>
        </FormContainer>
      </AppView>

      <AppFooterWave type="primary" />
    </AppView>
  );
}
