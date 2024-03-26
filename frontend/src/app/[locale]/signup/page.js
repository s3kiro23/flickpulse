import SignupForm from "@/components/signup-form/SignupForm";
import React from "react";
import { getDictionary } from "@/utils/dictionaries";

const SignupPage = async ({ params: { locale } }) => {
  const i18n = await getDictionary(locale).then((res) => res.signup);
  return <SignupForm i18n={i18n} />;
};

export default SignupPage;
