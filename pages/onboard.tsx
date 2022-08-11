import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/lib/auth";
import { UserDetails } from "../middleware/models.interface";
import { ObjectId } from "mongodb";
import { setUserDetails } from "@/lib/db";
import * as yup from "yup";
import { useRouter } from "next/router";
import Allowed from "hocs/Allowed";
import InputGroup from "@/components/core/InputGroup/InputGroup.component";
import TextArea from "@/components/core/TextArea/TextArea.component";
import Button from "@/components/core/Button/Button.component";

type FormData = {
  fullName: string;
  diagnosticName: string;
  email: string;
  address: string;
  phoneNumber: string;
};

const styles = {
  errorStyle: "text-red-500",
  inputStyles: "border-2 border-black block",
  button: "border-2 border-black mt-10 bg-blue-400 active:bg-blue-700",
};

const schema = yup.object().shape({
  diagnosticName: yup.string().strict().required(),
  fullName: yup.string().strict().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
});
const Onboard = () => {
  const { user } = useAuth();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  setValue("phoneNumber", user && user.phoneNumber ? user.phoneNumber : "");

  const router = useRouter();

  // useEffect(() => {}, [user]);

  const submitForm = async (data: FormData) => {
    console.log(data);
    const token = (await user?.getIdToken()) || "invalid";
    const res = await setUserDetails(token, data);
    console.log(res);
    if (res.status === 201) {
      router.push("/dashboard");
    }

    if (res.status === 409) {
      console.log("changing route");
      router.push("/");
    }
  };

  return (
    <div className="grid  h-screen place-content-center">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col md:w-[500px]"
      >
        <InputGroup
          labelName="Diagnostic Centre Name"
          inputName="diagnosticName"
          placeholder="Add Diagnostic name"
          error={errors.diagnosticName?.message}
          register={register}
        />
        <InputGroup
          labelName="Full Name"
          inputName="fullName"
          placeholder="Add your name"
          error={errors.fullName?.message}
          register={register}
        />
        <InputGroup
          labelName="Email"
          inputName="email"
          placeholder="example@example.com"
          error={errors.email?.message}
          register={register}
        />
        <InputGroup
          value={user && user.phoneNumber ? user.phoneNumber : ""}
          labelName="Phone Number"
          inputName="phoneNumber"
          placeholder="Add your phone"
          error={errors.phoneNumber?.message}
          register={register}
        />
        <TextArea
          labelName="Address"
          inputName="address"
          error={errors.address?.message}
          placeholder="Add your address"
          register={register}
        />

        {/* <input
          {...register("diagnosticName")}
          // ref={register}
          className={styles.inputStyles}
          name="diagnosticName"
          placeholder="Diagnostic Name"
        />
        <span className={styles.errorStyle}>
          {errors.diagnosticName?.message}
        </span> */}
        {/* <input
          {...register("fullName")}
          // ref={register}
          className={styles.inputStyles}
          name="fullName"
          placeholder="Full Name"
        />
        <span className={styles.errorStyle}>{errors.fullName?.message}</span> */}

        {/* <input
          {...register("email")}
          className={styles.inputStyles}
          name="email"
          placeholder="Email"
        />
        <span className={styles.errorStyle}>{errors.email?.message}</span> */}

        {/* <input
          {...register("phoneNumber")}
          className={styles.inputStyles}
          disabled
          // value={user && user.phoneNumber ? user.phoneNumber : ""}
          name="phoneNumber"
          placeholder="Phone Number"
        /> */}
        {/* <textarea
          {...register("address")}
          // ref={register}
          className={styles.inputStyles}
          name="address"
          placeholder="Address"
        />
        <span className={styles.errorStyle}>{errors.address?.message}</span> */}
        <div className="flex justify-center pt-2">
          <Button type="submit" name="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Onboard;
