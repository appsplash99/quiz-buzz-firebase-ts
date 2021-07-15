import * as Yup from "yup";

export const signupValidationSchema = Yup.object({
  username: Yup.string()
    .min(5, "Must have minimum 5 characters")
    .max(15, "Must have max 15 characters")
    .required("Name is Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "min 8 chars including: an uppercase, a num , and a special char"
    ),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "min 8 chars including an uppercase, a num , and a special char"
    ),
});
