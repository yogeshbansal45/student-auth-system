// import { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     course: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5001/api/register", form);
//       alert(res.data.msg);
//     } catch (err) {
//       alert("Error");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>

//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" onChange={handleChange} /><br />
//         <input name="email" placeholder="Email" onChange={handleChange} /><br />
//         <input name="password" placeholder="Password" onChange={handleChange} /><br />
//         <input name="course" placeholder="Course" onChange={handleChange} /><br />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;


import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ basic validation
    if (!form.name || !form.email || !form.password || !form.course) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "https://student-auth-backend-7a5h.onrender.com/api/register",
        form
      );

      alert(res.data.msg);

      // ✅ clear form after success
      setForm({
        name: "",
        email: "",
        password: "",
        course: ""
      });

    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-3">Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="course"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;