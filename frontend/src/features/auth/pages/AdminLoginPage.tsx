import type { FormField } from "@/types/form.type";
import { AuthForm } from "../components/auth-form";
import { useLogin } from "../hooks/useLogin";
import type { LoginForm } from "@/types/auth.type";

const formField: FormField = [
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
];

const AdminLoginPage = () => {
  const { login, isLoading } = useLogin("admin");

  const onSubmit = (data: Record<string, string>) => {
    console.log("Login data: ", data, isLoading);
    login(data as LoginForm);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="md:w-auto w-full space-y-6 p-8 bg-background rounded-xl shadow-md border">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">
            Login now to access your dashboard
          </p>
        </div>
        <AuthForm
          isAdmin={true}
          formField={formField}
          isLogin
          isLoading={isLoading}
          handleFormSubmit={onSubmit}
        />
      </div>
    </main>
  );
};

export default AdminLoginPage;
