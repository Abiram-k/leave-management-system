import { cn } from "@/lib/utils";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, CardContent } from "@/components/ui/card";
import authFormImage from "../../../assets/auth_form_img.jpg";
import type { FormField } from "@/types/form.type";
import { Link } from "react-router-dom";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import { getAuthSchema } from "../schemas/auth.schema";
import { Formik } from "formik";

type AuthFormType = React.ComponentProps<"div"> & {
  formField: FormField;
  isLogin?: boolean;
  redirect?: string;
  isLoading: boolean;
  isAdmin: boolean;
  handleFormSubmit: (values: Record<string, string>) => void;
};

export function AuthForm({
  className,
  formField,
  isLogin,
  redirect,
  isLoading,
  isAdmin,
  handleFormSubmit,
  ...props
}: AuthFormType) {
  const [showPassword, setShowPassword] = useState(false);

  const initialValue = formField.reduce((acc, curr) => {
    acc[curr.name] = "";
    return acc;
  }, {} as Record<string, string>);

  const validationSchema = getAuthSchema(isLogin);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, touched, errors, handleChange, handleBlur }) => (
              <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <Typography variant="h5" fontWeight="bold">
                      Welcome {isAdmin ? "admin" : "back"}
                    </Typography>
                    <Typography color="text.secondary">
                      Enter your credentials below to proceed!
                    </Typography>
                  </div>
                  {formField.map((field, index) => {
                    const isPassword = ["password", "confirmpassword"].includes(
                      field.name.toLowerCase()
                    );

                    return (
                      <Box
                        key={`${field.name}_${index}`}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        <TextField
                          id={field.name}
                          name={field.name}
                          label={field.label}
                          type={
                            isPassword
                              ? showPassword
                                ? "text"
                                : "password"
                              : field.name
                          }
                          error={Boolean(
                            touched[field.name] && errors[field.name]
                          )}
                          helperText={touched[field.name] && errors[field.name]}
                          placeholder={
                            field.placeholder || `Enter ${field.name}`
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          variant="outlined"
                          InputProps={
                            isPassword
                              ? {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={() =>
                                          setShowPassword((prev) => !prev)
                                        }
                                        edge="end"
                                        aria-label="toggle password visibility"
                                      >
                                        {showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }
                              : undefined
                          }
                        />
                      </Box>
                    );
                  })}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#1e3a8a",
                      "&:hover": {
                        backgroundColor: "#1d4ed8",
                      },
                      textTransform: "none",
                      fontWeight: "bold",
                      py: 1.2,
                      opacity: isLoading ? 0.8 : 1,
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    {isLoading
                      ? isLogin
                        ? "Logging in..."
                        : "Registering..."
                      : isLogin
                      ? "Login"
                      : "Register"}
                  </Button>

                  {redirect && (
                    <div className="text-center text-sm ">
                      {isLogin ? <span> Don&apos;t</span> : "Already"} have an
                      account?{" "}
                      <Link
                        to={redirect}
                        className="underline underline-offset-4"
                      >
                        {isLogin ? "Sign up" : "Login Now"}
                      </Link>
                    </div>
                  )}
                </div>
              </form>
            )}
          </Formik>
          <div className="bg-muted relative hidden md:block">
            <img
              src={authFormImage}
              alt="form images"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
