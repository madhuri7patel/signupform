import { bytesToMb } from "@/helper";
import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().min(3).max(30).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20).required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password not matched."),
  hobbies: yup
    .mixed<Array<string> | []>()
    .test("hobbies", "Please select at least one Hobby.", (data: any) => {
      const isValid = data?.length >= 1;
      return isValid;
    }),
  profile: yup
    .mixed()
    .test("profileType", "Profile must be an image.", (file: any) => {
      const isValid =
        file?.type === "image/jpeg" ||
        file?.type === "image/png" ||
        file?.type === "image/jpg" ||
        file?.type === "image/svg" ||
        file?.type === "image/webp";
      return isValid;
    })
    .test("profileSize", "Profile must be less than 2 MB", (file: any) => {
      const isValid = bytesToMb(file?.size) <= 2;
      return isValid;
    })
    .required(),
});

export type UserSchemaType = yup.InferType<typeof userSchema>;
