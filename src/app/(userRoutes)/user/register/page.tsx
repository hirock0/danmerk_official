"use client";

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  image: string | File;
  termsChecked: boolean;
}

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1048576) {
        swal({
          title: "Image too large",
          text: "Image must be smaller than 1MB",
          icon: "warning",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setBase64Image(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onRegister = async (info: RegisterFormInputs) => {
    setLoader(true);
    try {
      if (info.password === info.rePassword) {
        const { rePassword, ...rest } = info;

        if (!base64Image) {
          swal({
            title: "Please upload a valid image",
            icon: "warning",
          });
          setLoader(false);
          return;
        }

        const payload = {
          ...rest,
          image: base64Image,
          flag: "normalAuth",
        };

        const response = await axios.post(`/pages/api/users/register`, payload);

        if (response?.data?.success) {
          swal({
            title: response.data.message,
            icon: "success",
          });
          setLoader(false);
          router.push("/dashboard");
        } else {
          swal({
            title: response.data.message,
            icon: "warning",
          });
          setLoader(false);
        }
      } else {
        swal({
          title: "Password is not matched",
          icon: "warning",
        });
        setLoader(false);
      }
    } catch (error: unknown) {
      setLoader(false);
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : (error as Error).message || "Something went wrong";

      swal({
        title: "Error",
        text: message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onRegister)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Need your name to register" })}
            placeholder="Your Name"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Need your email to register",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            placeholder="Email Address"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Need your password to register",
                minLength: {
                  value: 6,
                  message: "At least 6 characters required",
                },
              })}
              placeholder="Password"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Re-type Password */}
        <div className="mb-4">
          <label htmlFor="rePassword" className="block text-gray-600">
            Re-type Password
          </label>
          <div className="relative">
            <input
              type={showRePassword ? "text" : "password"}
              {...register("rePassword", {
                required: "Please re-type your password",
              })}
              placeholder="Re-type Password"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
            <span
              onClick={() => setShowRePassword(!showRePassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showRePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          {errors.rePassword && (
            <p className="text-red-500 text-sm">{errors.rePassword.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-600">
            Upload Image (max 1MB)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 h-24 w-24 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Terms */}
        <div className="mb-4 flex items-start gap-2">
          <input
            type="checkbox"
            {...register("termsChecked", {
              required: "You must agree to the terms",
            })}
          />
          <span className="text-sm text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-blue-500 underline">
              terms and conditions
            </a>
          </span>
        </div>
        {errors.termsChecked && (
          <p className="text-red-500 text-sm">{errors.termsChecked.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loader}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {loader ? (
            <div className="flex justify-center items-center">
              <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
