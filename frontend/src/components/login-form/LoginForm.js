"use client";

import { signIn, getCsrfToken } from "next-auth/react";
import styles from "./LoginForm.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleButton from "../google-button/GoogleButton";
import Link from "next/link";

const LoginForm = ({ i18n }) => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      throw new Error("No csrf token");
    }

    await signIn("credentials", {
      ...data,
      csrfToken,
      redirect: false,
    }).then((response) => {
      if (response.error) {
        console.log(response.error);
        return;
      }
      router.push("/");
    });
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleFormSubmit}>
        <h1>{i18n.title}</h1>
        <input
          type="text"
          name="username"
          placeholder={i18n.emailPlaceholder}
          required
          value={data.username}
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="*******"
          required
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <input type="submit" value={i18n.submit} />
        <p>
          {i18n.register} <Link href={"/signup"}>{i18n.registerLink}</Link>
        </p>
      </form>
      {/* <GoogleButton /> */}
    </div>
  );
};

export default LoginForm;
