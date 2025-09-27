import Lottie from "lottie-react";
import login from "../../assets/login.json";
import AuthContext from "../../context/AuthContext";
import { useContext, useState } from "react";
import {useNavigate } from "react-router-dom"; // 🔹 Import useNavigate
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const { signInUser, loading } = useContext(AuthContext);
  const [error, setError] = useState(""); // 🔴 Error message state
  const navigate = useNavigate(); // 🔹 Hook for redirection


  const from = "/dashboard";

  if (loading) {
    <span className="loading loading-ring loading-lg"></span>;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setError(""); // Reset error

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = { email: result.user.email };
        axios
          .post("https://rajproperty-backend-1.onrender.com/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });

        Swal.fire({
          title: "Login Successful. Redirecting you to Dashboard",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        }); // ✅ Show success message
        setTimeout(() => navigate(from, { replace: true }), 2000); // 
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        setError(error.message); // 🔴 Show error message
      });
    setTimeout(form.reset(), 2000);
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Lottie animationData={login} />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form className="fieldset" onSubmit={handleLogin}>
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                  id="email"
                  required
                />
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  id="password"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}{" "}
                {/* 🔴 Show error */}

                <button className="btn btn-neutral mt-4">Login</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
