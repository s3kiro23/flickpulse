"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./SignupForm.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

const SignupForm = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/user/profile");
    }
  }, [status, router]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    fetch(`/api/signup`, {
      method: "POST",
      body: JSON.stringify({
        pseudo: formData.get("pseudo"),
        password: formData.get("password"),
      }),
    })
    .catch((error) => NextResponse.json({ error }))
    .then((response) => {
      if (response.ok) {
        signIn();
      }
    });
  };
  return (
    <div className={styles.signupForm}>
      <form onSubmit={handleFormSubmit}>
        <h1>Inscription</h1>
        <input type="text" name="pseudo" placeholder="Pseudo" />
        <input type="password" name="password" placeholder="*******" />
        <input type="submit" value="S'inscrire" />
      </form>
    </div>
  );
};

export default SignupForm;
