"use client";

import { hobbies } from "@/config/hobbies";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchemaType, userSchema } from "../../validations/userSchema";

export default function UserForm() {
  const inputClass =
    "border border-red-400 rounded-md h-10 p-2 w-full bg-transparent outline-none";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserSchemaType>({
    resolver: yupResolver(userSchema),
  });

  const [userHobbies, setHobbies] = useState<Array<string> | []>([]);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("profile", file);
    }
  };

  useEffect(() => {
    setValue("hobbies", userHobbies);
  }, [userHobbies]);

  const onSubmit = (payload: UserSchemaType) => {
    console.log("The payload is", payload);
  };

  return (
    <div className="w-[500px] shadow bg-[#282828] rounded-lg p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold text-[white]">validation</h1>
        <h1 className="text-[white]">Handle Validation like a pro</h1>
        <div className="mt-5">
          <label className="text-[white]">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className={inputClass}
            {...register("name")}
          />
          <span className="text-red-500 font-bold">{errors.name?.message}</span>
        </div>
        <div className="mt-5">
          <label className="text-[white]">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className={inputClass}
            {...register("email")}
          />
          <span className="text-red-500 font-bold">
            {errors.email?.message}
          </span>
        </div>
        <div className="mt-5">
          <label className="text-[white]">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className={inputClass}
            {...register("password")}
          />
          <span className="text-red-500 font-bold">
            {errors.password?.message}
          </span>
        </div>
        <div className="mt-5">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className={inputClass}
            {...register("password_confirmation")}
          />
          <span className="text-red-500 font-bold">
            {errors.password_confirmation?.message}
          </span>
        </div>
        <div className="mt-5">
          <label className="text-[white]">Select Hobbies</label>
          <div className="grid grid-cols-3 mt-2">
            {hobbies.map((item) => (
              <div className="flex items-center" key={item.key}>
                <label htmlFor={item.key}>{item.value}</label>
                <input
                  type="checkbox"
                  value={item.key}
                  className="ml-2"
                  id={item.key}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setHobbies([...userHobbies, event.target.value]);
                    } else {
                      const filterHobbies = userHobbies.filter(
                        (item) => item != event.target.value
                      );
                      setHobbies(filterHobbies);
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <span className="text-red-500 font-bold">
            {errors.hobbies?.message}
          </span>
        </div>
        <div className="mt-5">
          <label className="text-[white]">Profile Image</label>
          <input type="file" onChange={handleImage} className={inputClass} />
          <span className="text-red-500 font-bold">
            {errors.profile?.message}
          </span>
        </div>
        <div className="mt-5">
          <button className="bg-red-500 w-full p-2 h-10 rounded-lg">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
