import React, { useState } from "react";
import { useAuth } from "reactfire";
import { Link } from "react-router-dom";
import { FaUnlock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const LoginPage = () => {
  const auth = useAuth();

  // toggle password
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // formik state
  const initialValues = {
    email: "",
    password: "",
  };

  // form validation
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
  });

  // formik's handle submit
  const onSubmit = async (values: typeof initialValues) => {
    console.log("Form data", values);

    try {
      const resp = await auth.signInWithEmailAndPassword(values.email, values.password);
      // TODO: change ui response for succesful login
      alert("Logged In: " + resp?.user?.email);
    } catch (e) {
      // alert("ERROR: " + e.message);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white w-4/5 sm:w-96">
        Login To Your Account
      </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formikProps) => {
          return (
            <Form className="mt-1">
              {/* EMAIL */}

              <div className="mb-2 flex flex-col items-stretch gap-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <IoMdMail height="15" width="15" />
                  </span>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Your email"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  render={(err) => <div className="text-red-600 bg-red-200 p-2">{err}</div>}
                />
              </div>
              {/* PASSWORD */}
              <div className="mb-2 flex flex-col items-stretch gap-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <FaUnlock height="15" width="15" />
                  </span>
                  <Field
                    name="password"
                    placeholder="Your password"
                    type={showPassword ? "text" : "password"}
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                  {/* TOGGLE PASSWORD */}
                  {formikProps.touched.password && (
                    <div className="absolute right-2 inset-y-1/2 rounded-l-md inline-flex items-center bg-white border-l text-gray-500 shadow-sm text-2xl cursor-pointer">
                      {showPassword ? (
                        <FaEyeSlash
                          height="15"
                          width="15"
                          className="bg-gray-200 rounded-full p-1"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FaEye
                          height="15"
                          width="15"
                          className="bg-gray-200 rounded-full p-1"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  render={(err) => <div className="text-red-600 bg-red-200 p-2">{err}</div>}
                />
              </div>
              <button
                type="submit"
                disabled={!formikProps.isValid}
                className={`py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ${
                  !formikProps.isValid && "cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>

      <div className="flex items-center justify-center mt-6">
        <p className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
          <span className="ml-2 flex gap-2">
            Don't have an account?
            <Link to="/signup">
              <span className="font-semibold">Sign Up</span>
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};
