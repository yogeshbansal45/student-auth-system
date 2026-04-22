// 

import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "https://student-auth-backend-7a5h.onrender.com/api/login",
        form
      );

      // 🔥 token save
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      // redirect to dashboard
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data?.msg || "Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-3">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button className="btn btn-success w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;