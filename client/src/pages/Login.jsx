import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    matricNumber: "",
    pin: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetFormData = () => {
    setFormData({
      matricNumber: "",
      pin: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const student = await login({
        matricNumber: formData.matricNumber,
        pin: formData.pin,
      });

      // console.log("Login successful:", student);
      // console.log("Student data:", student);
      toast.success("Login successful!");
      // Redirect after login
      navigate("/vote");

      resetFormData();
    } catch (error) {
      console.error(
        "Login failed:",
        error.message || "An unexpected error occurred"
      );

      if (error.response?.status === 401) {
        toast.error("Incorrect password. Please try again.");
      } else if (error.response?.status === 404) {
        toast.error("User not registered." || error.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="relative w-[100vw] overflow-hidden">
      <div className="relative z-10 container mx-auto flex flex-col items-center gap-4 py-12 xl:py-24 px-4">
        <form
          className="w-full max-w-2xl mt-12 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-[0_0_20px_5px_var(--color-neonBlue)] flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 text-center pb-4">
            <h1 className="text-accent text-3xl">Log In</h1>
            <p className="text-md text-secondary/50">
              Enter the details you filled in the registration form
            </p>
          </div>
          <div>
            <input
              name="matricNumber"
              type="text"
              placeholder="Matric No."
              className="w-full px-4 py-3 text-secondary border border-secondary rounded-lg placeholder:text-secondary/30 
              focus:outline-none focus:ring-2 focus:ring-special/50"
              value={formData.matricNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              name="pin"
              type="password"
              placeholder="4-digit Pin"
              className="w-full px-4 py-3 text-secondary border border-secondary rounded-lg placeholder:text-secondary/30 
              focus:outline-none focus:ring-2 focus:ring-special/50"
              value={formData.pin}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="self-start px-6 py-3 mt-4 w-full text-white bg-gradient-to-b from-[var(--color-special)] to-[var(--color-accent)] 
            font-bold rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"
          >
            Let Me In!
          </button>
        </form>
        {/* {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>} */}
      </div>
    </div>
  );
};

export default Login;
