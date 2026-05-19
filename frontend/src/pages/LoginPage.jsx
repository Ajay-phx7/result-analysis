import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate =
    useNavigate();

  const [role, setRole] =
    useState("student");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    try {

      setLoading(true);

      const response =
        await axios.post(
          `http://localhost:5000/api/auth/login/${role}`,
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          role === "student"
            ? response.data.student
            : response.data.teacher
        )
      );

      if (role === "student") {

        navigate("/student");

      } else {

        navigate("/teacher");

      }

    } catch (error) {

      alert(
        error.response?.data?.message
        || "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb]">

      <div className="bg-white p-8 rounded-3xl shadow-sm w-[350px]">

        <h1 className="text-3xl font-bold text-center mb-2">
          ResultSys
        </h1>

        <p className="text-center text-gray-500 mb-8">
          College Result Analysis
        </p>

        <select
          className="w-full border p-3 rounded-lg mb-4"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >

          <option value="student">
            Student
          </option>

          <option value="teacher">
            Teacher
          </option>

        </select>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-6"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 transition text-white p-3 rounded-lg"
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

      </div>

    </div>
  );
}

export default LoginPage;