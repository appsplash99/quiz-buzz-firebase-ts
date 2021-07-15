import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useAuth } from "reactfire";
import { FaUnlock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { TogglePassword } from "../components";
import { useToast } from "../context/toast-context";
import { loginValidationSchema } from "../utils/formValidations";

export const Login = () => {
  const auth = useAuth();
  const { toast, toggleToast } = useToast();
  const navigate = useNavigate();
  // toggle password
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // formik state
  const initialValues = { email: "", password: "" };

  // formik's handle submit
  const onSubmit = async (values: typeof initialValues) => {
    try {
      toggleToast({ toast, toastType: "info", messege: "Logging In..." });
      const resp = await auth.signInWithEmailAndPassword(values.email, values.password);
      toggleToast({ toast, toastType: "success", messege: "Login Successful" });
      navigate("/");
    } catch (e) {
      toggleToast({ toast, toastType: "error", messege: "Unable to Login" });
    }
  };

  return (
    <div className="flex flex-wrap w-full">
      <div className="w-1/2 shadow-2xl">
        <img className="hidden object-cover w-full h-screen md:block" src="src/assets/images/think.jpg" />
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
          <a href="#" className="p-4 text-xl font-bold text-white bg-blue-500 hover:bg-blue-600">
            Quiz Buzz
          </a>
        </div>
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl text-center">Login</p>
          <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
            {(formikProps) => {
              return (
                <Form className="flex flex-col pt-3 md:pt-8">
                  <div className="flex flex-col pt-4">
                    <div className="flex relative ">
                      <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <IoMdMail height="15" width="15" />
                      </span>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Your email"
                        className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      render={(err) => <div className="text-red-600 p-2">{err}</div>}
                    />
                  </div>
                  <div className="flex flex-col pt-4 ">
                    <div className="flex relative ">
                      <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <FaUnlock height="15" width="15" />
                      </span>
                      <Field
                        name="password"
                        placeholder="Your password"
                        type={showPassword ? "text" : "password"}
                        className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                      <TogglePassword showPassword={showPassword} setShowPassword={setShowPassword} />
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    render={(err) => <div className="text-red-600 m-2 max-h-2 max-w-2 ">{err}</div>}
                  />
                  <button
                    type="submit"
                    className="mt-12 w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-500 hover:bg-blue-600 shadow-md focus:outline-none focus:ring-2"
                  >
                    <span className="w-full ">Submit</span>
                  </button>
                </Form>
              );
            }}
          </Formik>
          <div className="pt-12 pb-12 flex gap-4 items-center justify-center">
            <p className="">Don't have an account?</p>
            <Link to="/signup" className="font-semibold underline">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
