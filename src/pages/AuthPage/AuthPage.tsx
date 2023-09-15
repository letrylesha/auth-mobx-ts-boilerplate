import React, { ReactElement } from "react";
import { authApi } from "../../api/auth.api";
import { useAuthForm } from "../../hooks/useAuthForm";
import { on } from "events";

const inputStyles = {
  width: "90%",
  margin: "0 auto",
  marginBottom: "10px",
};

interface AuthFormProps {
  type: "signUp" | "signIn";
  onSubmit: (login: string, password: string) => Promise<void>;
}
const AuthForm = (props: AuthFormProps) => {
  const { type, onSubmit } = props;
  const { login, password, onChangeLogin, onChangePassword } = useAuthForm();

  const headerMapper = {
    signUp: "Sign up form",
    signIn: "Sign in form",
  };

  const handleSubmit = async () => {
    await onSubmit(login, password);
  };

  return (
    <div>
      <h2>{headerMapper[type]}</h2>
      <input
        type="text"
        value={login}
        placeholder="Login"
        onChange={onChangeLogin}
        style={inputStyles}
      />
      <input
        // type="password"
        placeholder="Password"
        value={password}
        onChange={onChangePassword}
        style={inputStyles}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export const AuthPage = (): ReactElement => {
  return (
    <div style={inputStyles}>
      <h1>Auth page</h1>

      <AuthForm type="signUp" onSubmit={authApi.signUp} />
      <AuthForm type="signIn" onSubmit={authApi.signIn} />
    </div>
  );
};
