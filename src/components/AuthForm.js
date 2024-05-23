import { useState } from "react";
import { Form, json, redirect, useActionData } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const actionData = useActionData();

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1> Log in </h1>
        <p>{actionData && actionData.message && actionData.message}</p>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
        <p>
          <a className={classes.signupLink} href="/signup">
            Click to create new account
          </a>
        </p>
      </Form>
    </>
  );
}

export default AuthForm;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),

    password: data.get("password"),
  };

  const response = await fetch("http://localhost:5000/clinic/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "could not create account" }, { status: 500 });
  }

  if (response.status === 201) {
    const resData = await response.json();
    console.log("setting the token");
    localStorage.setItem("token", resData.token);
    return redirect("/");
  }

  return redirect("/login");
}
