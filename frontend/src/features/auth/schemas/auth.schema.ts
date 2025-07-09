import * as Yup from "yup";

export const getAuthSchema = (isLogin?: boolean) => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email*").required("Email is required*"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters*")
      .required("Password is required*"),
    ...(isLogin
      ? {}
      : {
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match*")
            .required("Confirm password is required*"),
          name: Yup.string()
            .min(3, "Name must be at least 3 characters*")
            .required("Name is required*"),
        }),
  });
};
