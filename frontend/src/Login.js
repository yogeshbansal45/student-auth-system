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

    try {
      const res = await axios.post("http://localhost:5001/api/login", form);

      // 🔥 token save
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      // redirect to dashboard
      window.location.href = "/dashboard";

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="password" placeholder="Password" onChange={handleChange} /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;