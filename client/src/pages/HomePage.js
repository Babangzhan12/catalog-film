import React, { useState } from "react";
import COVER_IMAGE1 from "../assets/asset1.png";
import EXTRA_IMAGE1 from "../assets/asset2.png";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmitLogin = async () => {
    setLoading(true);
    navigate("/signin", {
      replace: true,
    });
    setLoading(false);
  };

  const handleSubmitRegister = async () => {
    setLoading(true);
    navigate("/register", {
      replace: true,
    });
    setLoading(false);
  };

  return (
    <section id="hero">
      <div className="hero main-container">
        <div className="hero-grid">
          <div className="hero-left">
            <h3 className="pre-title">Halo, selamat datang.</h3>
            <h1 className="hero-name">Temukan film kesukaanmu.</h1>
            <p>Nikmatilah film gratis sekarang juga dan daftar sekarang juga</p>
            <div className="buttons">
              <Button
                label="Daftar"
                icon="pi pi-user-plus"
                className="button"
                type="button"
                onClick={handleSubmitRegister}
                disabled={loading}
              />
              <Button
                label="Login"
                icon="pi pi-sign-in"
                className="button"
                type="button"
                onClick={handleSubmitLogin}
                disabled={loading}
              />
            </div>
          </div>
          <div className="hero-right">
            <img
              className="rocket-image"
              src={COVER_IMAGE1}
              alt=""
            />
            <img 
            className="extra-image"
            src={EXTRA_IMAGE1}
            alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
