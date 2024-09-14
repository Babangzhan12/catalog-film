import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import axios from "axios";
import { APP_BASE_URL } from "../config/constants";
import { ProgressBar } from "primereact/progressbar";
import { useNavigate } from "react-router-dom";
import { Password } from "primereact/password";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showSuccessButton, setShowSuccessButton] = useState(false);
  const handleGoHome = () => {
    navigate("/", { replace: true });
  };
  const REGISTER_DELAY = 300;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${APP_BASE_URL}/auth/signup`,
          formData
        );
        const responseData = response.data;
        setSuccess(responseData.message || "Registration successful!");
        setFormData({ username: "", password: "", email: "" });
        setShowSuccessButton(true);
      } catch (err) {
        if (err.response && err.response.data) {
          setError(
            err.response.data.message ||
              "Registration failed. Please try again."
          );
        } else {
          setError("Registration failed. Please try again.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, REGISTER_DELAY);
  };

  const handleSuccessButtonClick = () => {
    navigate("/signin", { replace: true });
  };

  const isValidForm = () => {
    return (
      formData.username.length > 0 &&
      formData.password.length > 0 &&
      formData.email.length > 0
    );
  };

  return (
    <div className="register-panel shadow-8 p-fluid">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        {loading && (
          <ProgressBar mode="indeterminate" style={{ width: "100%" }} />
        )}
        {error && <Message severity="error" text={error} />}
        {success && (
          <div>
            <Message severity="success" text={success} />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="p-field mb-4">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="p-field mb-4">
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              name="password"
              type="password"
              toggleMask
              feedback={false}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="p-field mb-4">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <Button
            label="Register"
            icon="pi pi-user-plus"
            type="submit"
            disabled={!isValidForm() || loading}
            className="w-full"
            style={{ marginBottom: "1rem" }}
          />
          {!success && (
            <Button
              label="Kembali ke Halaman Utama"
              icon="pi pi-home"
              type="button"
              onClick={handleGoHome}
              className="mt-2"
            />
          )}
          {success && (
            <div>
              {showSuccessButton && (
                <Button
                  label="Proceed to Sign In"
                  icon="pi pi-arrow-right"
                  onClick={handleSuccessButtonClick}
                  className="mt-4"
                />
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
