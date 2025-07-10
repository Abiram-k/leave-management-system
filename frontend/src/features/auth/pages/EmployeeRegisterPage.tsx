import type { FormField } from "@/types/form.type";
import { AuthForm } from "../components/auth-form";
import { useRegister } from "../hooks/useRegister";
import type { RegisterForm } from "@/types/auth.type";

const formField: FormField = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter you full name",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "me@gmail.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
  },
];
const redirect: string = "/auth/login";

const EmployeeRegisterPage = () => {
  const { isLoading, register } = useRegister();
  const onSubmit = (data: Record<string, string>) => {
    console.log("Register data: ", data);
    register(data as RegisterForm);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="md:w-auto w-full space-y-6 p-8 bg-background rounded-xl shadow-md border">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Employee Register</h1>
          <p className="text-sm text-muted-foreground">
            Register to access your dashboard
          </p>
        </div>
        <AuthForm
          isAdmin={false}
          formField={formField}
          redirect={redirect}
          isLoading={isLoading}
          handleFormSubmit={onSubmit}
        />
      </div>
    </main>
  );
};

export default EmployeeRegisterPage;
