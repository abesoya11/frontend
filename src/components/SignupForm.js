import { Form, redirect, useActionData } from "react-router-dom";
import { useState } from "react";
import { json } from "react-router-dom";
import classes from "./SignupForm.module.css";

function SignupForm() {
  const actionData = useActionData();
  const [isError, setIsError] = useState(false);

  return (
    <>
      <p className={isError ? classes.showError : classes.error}>actionData</p>
      <Form method="post" className={classes.form}>
        <h1> Create a new user</h1>
        {actionData && actionData.error && (
          <ul>
            {Object.values(actionData).map((ele) => {
              return (
                <li className={classes.showError} key={ele}>
                  {ele}
                </li>
              );
            })}
          </ul>
        )}

        {actionData && actionData.message && <p>{actionData.message}</p>}

        <p>
          <label htmlFor="role">Role</label>
          <select id="role" name="role">
            <option value="s"> S</option>
            <option value="c"> C</option>
            <option value="d">D </option>
            <option value="aa">E</option>
          </select>
        </p>
        <p>
          <label htmlFor="name">Name</label>
          <input id="name" type="name" name="name" required />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <p>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
          />
        </p>

        <div className={classes.actions}>
          <button>Create Account</button>
        </div>
        <p>
          <a className={classes.signupLink} href="/login">
            Go Back to Login
          </a>
        </p>
      </Form>
    </>
  );
}

export default SignupForm;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    name: data.get("name"),
    password: data.get("password"),
    role: data.get("role"),
    cpassword: data.get("confirmPassword"),
  };
  let password = data.get("password");
  let cpassword = data.get("confirmPassword");

  if (password !== cpassword) {
    console.log("password dont match");
    return { error: "password dont match" };
  } else {
    const response = await fetch("http://localhost:5000/clinic/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (response.status === 422) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "could not create account" }, { status: 500 });
    }

    if (response.status === 200) {
      // window.alert(response.message);

      let val = await response.json();
      window.alert(val.message);
    }

    return redirect("/login");
  }
}
