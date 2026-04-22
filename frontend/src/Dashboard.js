
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Dashboard() {

//   const [user, setUser] = useState({});
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [newCourse, setNewCourse] = useState("");

//   // 🔐 Protect route (important)
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       window.location.href = "/";
//       return;
//     }

//     axios.get("http://localhost:5001/api/dashboard", {
//       headers: {
//         Authorization: token
//       }
//     })
//     .then(res => setUser(res.data))
//     .catch(() => {
//       localStorage.removeItem("token");
//       window.location.href = "/";
//     });

//   }, []);

//   // 🚪 Logout
//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   // 🔐 Update Password
//   const updatePassword = async () => {
//     if (!oldPassword || !newPassword) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await axios.put(
//         "http://localhost:5001/api/update-password",
//         { oldPassword, newPassword },
//         {
//           headers: {
//             Authorization: localStorage.getItem("token")
//           }
//         }
//       );

//       alert(res.data.msg);
//       setOldPassword("");
//       setNewPassword("");
//     } catch (err) {
//       alert("Error updating password");
//     }
//   };

//   // 🎓 Update Course
//   const updateCourse = async () => {
//     if (!newCourse) {
//       alert("Enter course");
//       return;
//     }

//     try {
//       const res = await axios.put(
//         "http://localhost:5001/api/update-course",
//         { course: newCourse },
//         {
//           headers: {
//             Authorization: localStorage.getItem("token")
//           }
//         }
//       );

//       alert(res.data.msg);
//       setNewCourse("");

//       // update UI instantly
//       setUser({ ...user, course: newCourse });

//     } catch (err) {
//       alert("Error updating course");
//     }
//   };

//   return (
//     <div className="container mt-5">

//       {/* 🧾 User Info */}
//       <div className="card p-4 shadow">
//         <h2 className="text-center mb-3">Dashboard</h2>

//         <p><b>Name:</b> {user.name}</p>
//         <p><b>Email:</b> {user.email}</p>
//         <p><b>Course:</b> {user.course}</p>

//         <button className="btn btn-danger" onClick={logout}>
//           Logout
//         </button>
//       </div>

//       {/* 🔐 Update Password */}
//       <div className="card p-4 mt-4 shadow">
//         <h4>Update Password</h4>

//         <input
//           className="form-control mb-2"
//           placeholder="Old Password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//         />

//         <input
//           className="form-control mb-2"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />

//         <button className="btn btn-primary" onClick={updatePassword}>
//           Update Password
//         </button>
//       </div>

//       {/* 🎓 Update Course */}
//       <div className="card p-4 mt-4 shadow">
//         <h4>Update Course</h4>

//         <input
//           className="form-control mb-2"
//           placeholder="New Course"
//           value={newCourse}
//           onChange={(e) => setNewCourse(e.target.value)}
//         />

//         <button className="btn btn-success" onClick={updateCourse}>
//           Update Course
//         </button>
//       </div>

//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [user, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newCourse, setNewCourse] = useState("");

  // 🔐 Protect route + fetch user
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    axios.get(
      "https://student-auth-backend-7a5h.onrender.com/api/dashboard",
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(res => setUser(res.data))
    .catch(() => {
      localStorage.removeItem("token");
      window.location.href = "/";
    });

  }, []);

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // 🔐 Update Password
  const updatePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.put(
        "https://student-auth-backend-7a5h.onrender.com/api/update-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert(res.data.msg);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating password");
    }
  };

  // 🎓 Update Course
  const updateCourse = async () => {
    if (!newCourse) {
      alert("Enter course");
      return;
    }

    try {
      const res = await axios.put(
        "https://student-auth-backend-7a5h.onrender.com/api/update-course",
        { course: newCourse },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert(res.data.msg);
      setNewCourse("");

      // update UI instantly
      setUser({ ...user, course: newCourse });

    } catch (err) {
      alert(err.response?.data?.msg || "Error updating course");
    }
  };

  return (
    <div className="container mt-5">

      {/* 🧾 User Info */}
      <div className="card p-4 shadow">
        <h2 className="text-center mb-3">Dashboard</h2>

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Course:</b> {user.course}</p>

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* 🔐 Update Password */}
      <div className="card p-4 mt-4 shadow">
        <h4>Update Password</h4>

        <input
          className="form-control mb-2"
          placeholder="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="btn btn-primary" onClick={updatePassword}>
          Update Password
        </button>
      </div>

      {/* 🎓 Update Course */}
      <div className="card p-4 mt-4 shadow">
        <h4>Update Course</h4>

        <input
          className="form-control mb-2"
          placeholder="New Course"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
        />

        <button className="btn btn-success" onClick={updateCourse}>
          Update Course
        </button>
      </div>

    </div>
  );
}

export default Dashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";

// function Dashboard() {

//   const [user, setUser] = useState({});
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [newCourse, setNewCourse] = useState("");

//   // ✅ Get user data
//   useEffect(() => {
//     axios.get("http://localhost:5001/api/dashboard", {
//       headers: {
//         Authorization: localStorage.getItem("token")
//       }
//     }).then(res => setUser(res.data));
//   }, []);

//   // ✅ Logout
//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   // ✅ Update Password
//   const updatePassword = async () => {
//     try {
//       const res = await axios.put(
//         "http://localhost:5001/api/update-password",
//         { oldPassword, newPassword },
//         {
//           headers: {
//             Authorization: localStorage.getItem("token")
//           }
//         }
//       );

//       alert(res.data.msg);
//     } catch (err) {
//       alert("Error updating password");
//     }
//   };

//   // ✅ Update Course
//   const updateCourse = async () => {
//     try {
//       const res = await axios.put(
//         "http://localhost:5001/api/update-course",
//         { course: newCourse },
//         {
//           headers: {
//             Authorization: localStorage.getItem("token")
//           }
//         }
//       );

//       alert(res.data.msg);
//     } catch (err) {
//       alert("Error updating course");
//     }
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>

//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//       <p>Course: {user.course}</p>

//       <button onClick={logout}>Logout</button>

//       <hr />

//       {/* 🔐 Update Password */}
//       <h3>Update Password</h3>

//       <input
//         placeholder="Old Password"
//         onChange={(e) => setOldPassword(e.target.value)}
//       /><br />

//       <input
//         placeholder="New Password"
//         onChange={(e) => setNewPassword(e.target.value)}
//       /><br />

//       <button onClick={updatePassword}>Update Password</button>

//       <hr />

//       {/* 🎓 Update Course */}
//       <h3>Update Course</h3>

//       <input
//         placeholder="New Course"
//         onChange={(e) => setNewCourse(e.target.value)}
//       /><br />

//       <button onClick={updateCourse}>Update Course</button>

//     </div>
//   );
// }



// export default Dashboard;