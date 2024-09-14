import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signin } = useAuth();
  const LOGIN_DELAY = 300;

  const isValidForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(async () => {
      try {
        await signin(username, password);
      } catch (error) {
        setError("Username atau password salah. Silakan coba lagi.");
        setUsername("");
        setPassword("");
      } finally {
        setLoading(false);
      }
    }, LOGIN_DELAY);
  };

  const handleGoHome = () => {
    navigate("/");
  };


  return (
    <div className="login-panel shadow-8 p-fluid">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>Masukan username dan password anda</p>

          {loading && (
            <ProgressBar
              mode="indeterminate"
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          )}

          {error && (
            <div
              className="error-message"
              style={{ color: "red", marginBottom: "1rem" }}
            >
              {error}
            </div>
          )}

          <div className="p-field mb-4">
            <InputText
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>

          <div className="p-field mb-4">
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
              placeholder="Password"
            />
          </div>

          <div className="button-group">
            <Button
              label="Login"
              icon="pi pi-sign-in"
              type="submit"
              disabled={!isValidForm() || loading}
              style={{ marginBottom: "1rem" }}
            />
            <Button
              label="Kembali ke Halaman Utama"
              icon="pi pi-home"
              type="button"
              onClick={handleGoHome}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
