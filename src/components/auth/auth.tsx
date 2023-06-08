import { SchemaTypes } from "../../Types/types";
import { ZodType, z } from "zod";
import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import musicpng from "../../assets/music.png";
const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const checkAuth = (event: ChangeEvent<HTMLInputElement>) => {
    setIsLogin(event.target.checked);
  };
  const schema: ZodType<SchemaTypes> = z
    .object({
      name: z.string().min(3).max(10),
      email: z.string().email(),
      password: z.string().min(4),
      confirmPassword: z.string().min(4),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaTypes>({
    resolver: zodResolver(schema),
  });

  const formSubmission = (data: SchemaTypes) => {
    console.log(data);
  };

  return (
    <>
      <div className="content h-[100vh] w-[100vw] bg-pink-800 flex justify-center items-center">
        <form
          action=""
          onSubmit={handleSubmit(formSubmission)}
          className=" rounded border border-gray-50 bg-white px-[5rem] py-[0rem]"
        >
          <div className="logo flex justify-center">
            <img src={musicpng} alt="musicpng" />
          </div>
          <div className="title text-center text-3xl text-black mb-5 p-0 underline ">
            {isLogin ? "Login" : "SignUp"}
          </div>
          {!isLogin ? (
            <div className="name flex flex-col">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                {...register("name")}
                className=" border-b border-pink-500 focus:border-black focus:outline-0"
              />
              {errors.name && (
                <span className=" text-red-400">{errors.name.message}</span>
              )}
            </div>
          ) : (
            ""
          )}
          <div className="email flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="border-b border-pink-500 focus:border-black focus:outline-0"
            />
            {errors.email && (
              <span className=" text-red-400">{errors.email.message}</span>
            )}
          </div>
          <div className="password flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="border-b border-pink-500 focus:border-black focus:outline-0"
            />
            {errors.password && (
              <span className=" text-red-400">{errors.password.message}</span>
            )}
          </div>
          {!isLogin ? (
            <div className="ConfirmPassword flex flex-col">
              <label htmlFor="ConfirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="ConfirmPassword"
                {...register("confirmPassword")}
                className="border-b border-pink-500 focus:border-black focus:outline-0"
              />
              {errors.confirmPassword && (
                <span className=" text-red-400">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          ) : (
            ""
          )}
          <button
            type="submit"
            className=" my-[2rem] w-[100%] h-[2rem] bg-slate-100 rounded-md mt-8 font-bold hover:bg-blue-900 hover:text-white"
          >
            Listen
          </button>
          <div className="switch flex justify-center items-center my-[2rem] gap-3">
            {" "}
            <label className="font-bold" htmlFor="check">
              Login
            </label>{" "}
            <input
              type="checkbox"
              name="check"
              id="check"
              checked={isLogin}
              onChange={checkAuth}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;