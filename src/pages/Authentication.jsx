import { AlertCircle, Eye, EyeOff, Globe, GraduationCap, Lock, Mail, User } from "lucide-react";
import React from "react";  
import {useState} from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { registerUser } from "../services/authService";

/* ================= LOGIN ================= */
function LoginForm({ onSwitch }) {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await login({ email, password });
      const user = res.payload.user;

      addToast({
        type: "success",
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });

      if (user.role === "student") {
        navigate("/userdashboard");
      } else if (user.role === "agent" || user.role === "admin") {
        navigate("/admindashboard");
      }
      
    } catch (errMsg) {
      setError(errMsg || "Login failed");
      addToast({
        type: "error",
        title: "Login Failed",
        description: errMsg || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-fadeIn">
      <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-105 transition-all duration-300">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-600">Continue your journey</p>
          </div>

          {error && (
            <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl flex gap-3 animate-slideDown">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <div className="relative mt-2 group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white/50"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <div className="relative mt-2 group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-12 pr-12 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white/50"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <button
              onClick={onSwitch}
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Create one
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REGISTER ================= */
function RegisterForm({ onSwitch }) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill all fields");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);
    try {
      // Backend register call
      await registerUser({
        first_name: form.name.split(" ")[0],
        last_name: form.name.split(" ")[1] || "",
        email: form.email,
        password: form.password,
      });

      // Auto-login after register
    //   await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-fadeIn">
      <div className="bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-105 transition-all duration-300">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Start Your Journey</h2>
          </div>

          

          {["name", "email", "password", "confirm"].map((field) => (
            <div key={field} className="mb-4 relative group">
              {field === "name" && (
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500" />
              )}
              {(field === "password" || field === "confirm") && (
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500" />
              )}
              {field === "email" && (
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500" />
              )}

              <input
                type={
                  field.includes("password") ? (showPassword ? "text" : "password") : "text"
                }
                placeholder={field}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white/50"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-blue-600 mb-4"
          >
            Toggle Password
          </button>

          {error && (
            <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl flex gap-3 animate-slideDown">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <button onClick={onSwitch} className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN WRAPPER ================= */
export default function AuthUI() {
  const [view, setView] = useState("login");

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]"></div>

      <div className="relative z-10 w-full max-w-md">
        {view === "login" ? (
          <LoginForm onSwitch={() => setView("register")} />
        ) : (
          <RegisterForm onSwitch={() => setView("login")} />
        )}
      </div>
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-40px) scale(1.1); }
        }
        .animate-blob {
          animation: blob 15s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-fadeIn {
          animation: fadeIn .5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(20px);}
          to { opacity:1; transform:translateY(0);}
        }
        .animate-slideDown {
          animation: slideDown .3s ease-out;
        }
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-10px);}
          to { opacity:1; transform:translateY(0);}
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }   
      `}</style>
    </div>
  );
}

