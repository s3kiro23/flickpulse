import React from "react";
import LoginForm from "@/components/login-form/LoginForm";
import { getDictionary } from "@/utils/dictionaries";

const LoginPage = async ({ params: { locale } }) => {
  const i18n = await getDictionary(locale).then((res) => res.login);
  return (
    <>
      <LoginForm i18n={i18n} />
    </>
  );
};

export default LoginPage;
