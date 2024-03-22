"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./SignupForm.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

const SignupForm = ({ i18n }) => {
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
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    })
      .catch((error) => NextResponse.json({ error }))
      .then((response) => {
        if (response.ok) {
          router.push("/login");
        }
      });
  };
  return (
    <div className={styles.signupForm}>
      <form onSubmit={handleFormSubmit}>
        <h1>{i18n.title}</h1>
        <input type="text" name="email" placeholder={i18n.emailPlaceholder} />
        <input type="password" name="password" placeholder="*******" />
        <input type="submit" value={i18n.submit} />
      </form>
    </div>
  );
};

export default SignupForm;
