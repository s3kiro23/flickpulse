"use client";

import { signIn } from "next-auth/react";
import styles from "./LoginForm.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleButton from "../google-button/GoogleButton";

const LoginForm = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((response) => {
        if (response.error) {
          console.log(response.error);
          return;
        }
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
      router.push("/");
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleFormSubmit}>
        <h1>Connexion</h1>
        <input
          type="text"
          name="email"
          placeholder="Pseudo"
          required
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
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
        <input type="submit" value="Se connecter" />
      </form>
      {/* <GoogleButton /> */}
    </div>
  );
};

export default LoginForm;
