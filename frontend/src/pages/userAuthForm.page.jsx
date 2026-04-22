import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const UserAuthForm = ({ type }) => {
  const authForm = useRef();
  const navigate = useNavigate();
  const [role, setRole] = useState("volunteer");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let serverRoute = "";
    if (type === "sign-in") {
      serverRoute = role === "volunteer" ? "/user/login" : "/organistaion/login";
    } else {
      serverRoute = role === "volunteer" ? "/user/signup" : "/organistaion/signup";
    }

    const form = new FormData(authForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    // Format data according to schemas
    let payload = {};

    if (role === "volunteer") {
      if (type === "sign-up") {
        payload = {
          name: formData.fullname,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          bio: formData.bio || "",
          skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : [],
        };
      } else {
        payload = {
          email: formData.email,
          password: formData.password,
        };
      }
    } else if (role === "organization") {
      if (type === "sign-up") {
        payload = {
          name: formData.orgname,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          description: formData.description,
          type: formData.orgType || "Other",
          registrationNumber: formData.registrationNumber,
          address: {
            city: formData.city || "",
            state: formData.state || "",
            pincode: formData.pincode || "",
          }
        };
      } else {
        payload = {
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          registrationNumber: formData.registrationNumber,
        };
      }
    }

    try {
      // Assuming backend is running on localhost:5000 or similar. Vite config usually sets proxy or we use absolute URL
      // Wait, is backend running? Let's use relative route and let Vite proxy or specify port.
      // Usually backend is on port 3000 or 5000. Let's use http://localhost:3000
      const { data } = await axios.post(`http://localhost:3000${serverRoute}`, payload);
      
      toast.success(data.message || "Success!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", role);
      
      setTimeout(() => {
        if (role === "volunteer") navigate("/user-dashboard");
        else navigate("/ngo-dashboard");
      }, 1000);

    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="min-h-screen flex items-center justify-center bg-[#f3f2ef] py-10">
        <Toaster />
        <form
          ref={authForm}
          onSubmit={handleSubmit}
          className="bg-white w-[90%] max-w-[420px] p-8 rounded-2xl shadow-md"
        >
          {/* Header */}
          <h1 className="text-3xl font-bold text-center mb-2">
            {type === "sign-in" ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-center text-dark-grey mb-6">
            {type === "sign-in"
              ? "Login to continue your journey"
              : "Join the movement for social change"}
          </p>

          {/* Toggle */}
          <div className="flex bg-grey rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setRole("volunteer")}
              className={`flex-1 py-2 rounded-md flex items-center justify-center gap-2 ${
                role === "volunteer" ? "bg-white shadow" : ""
              }`}
            >
              <i className="fi fi-rr-user"></i>
              Volunteer
            </button>
            <button
              type="button"
              onClick={() => setRole("organization")}
              className={`flex-1 py-2 rounded-md flex items-center justify-center gap-2 ${
                role === "organization" ? "bg-white shadow" : ""
              }`}
            >
              <i className="fi fi-rr-building"></i>
              Organization
            </button>
          </div>

          {/* SIGN IN FORM */}
          {type === "sign-in" && (
            <>
              <InputBox name="email" type="email" placeholder="you@example.com" icon="fi-rr-envelope" />
              <InputBox name="password" type="password" placeholder="Password" icon="fi-rr-key" />
              
              {role === "organization" && (
                <>
                  <InputBox name="phone" type="text" placeholder="Phone Number" icon="fi-rr-phone-call" />
                  <InputBox name="registrationNumber" type="text" placeholder="Registration Number" icon="fi-rr-id-badge" />
                </>
              )}

              <div className="flex justify-between items-center text-sm mb-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Remember me
                </label>
                <span className="text-blue-600 cursor-pointer">
                  Forgot password?
                </span>
              </div>
            </>
          )}

          {/* SIGN UP FORM */}
          {type === "sign-up" && (
            <>
              {role === "volunteer" && (
                <>
                  <InputBox name="fullname" type="text" placeholder="Full Name" icon="fi-rr-user" />
                  <InputBox name="email" type="email" placeholder="you@example.com" icon="fi-rr-envelope" />
                  <InputBox name="password" type="password" placeholder="Password" icon="fi-rr-key" />
                  <InputBox name="phone" type="text" placeholder="Phone Number" icon="fi-rr-phone-call" />
                  <div className="relative w-full mb-4">
                    <textarea name="bio" placeholder="Short Bio (Optional)" className="input-box resize-none h-24"></textarea>
                    <i className="fi fi-rr-info input-icon top-6"></i>
                  </div>
                  <InputBox name="skills" type="text" placeholder="Skills (comma separated)" icon="fi-rr-briefcase" />
                </>
              )}

              {role === "organization" && (
                <div className="max-h-[60vh] overflow-y-auto px-1 -mx-1">
                  <InputBox name="orgname" type="text" placeholder="Your NGO Name" icon="fi-rr-building" />
                  <InputBox name="email" type="email" placeholder="you@example.com" icon="fi-rr-envelope" />
                  <InputBox name="password" type="password" placeholder="Password" icon="fi-rr-key" />
                  <InputBox name="phone" type="text" placeholder="Phone Number" icon="fi-rr-phone-call" />
                  
                  <div className="relative w-full mb-4">
                    <textarea name="description" required placeholder="NGO Description" className="input-box resize-none h-24"></textarea>
                    <i className="fi fi-rr-info input-icon top-6"></i>
                  </div>
                  
                  <div className="relative w-full mb-4">
                    <select name="orgType" className="input-box appearance-none">
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Environment">Environment</option>
                      <option value="Animal Welfare">Animal Welfare</option>
                      <option value="Other">Other</option>
                    </select>
                    <i className="fi fi-rr-apps input-icon"></i>
                  </div>

                  <InputBox name="registrationNumber" type="text" placeholder="Registration Number" icon="fi-rr-id-badge" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputBox name="city" type="text" placeholder="City" icon="fi-rr-marker" />
                    <InputBox name="state" type="text" placeholder="State" icon="fi-rr-map" />
                  </div>
                  <InputBox name="pincode" type="text" placeholder="Pincode" icon="fi-rr-thumbtack" />
                </div>
              )}

              <div className="flex items-center gap-2 text-sm mt-4 mb-6">
                <input type="checkbox" required />
                <p>
                  I agree to the
                  <span className="text-blue-600"> Terms of Service</span> and
                  <span className="text-blue-600"> Privacy Policy</span>
                </p>
              </div>
            </>
          )}

          {/* Button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
            {type === "sign-in"
              ? `Login as ${role}`
              : `Create ${role === "volunteer" ? "Volunteer" : "Organization"} Account`}
          </button>

          {/* Switch auth */}
          {type === "sign-in" ? (
            <p className="text-center text-sm mt-4">
              Don't have an account?
              <Link to="/signup" className="text-blue-600 ml-1">Sign up</Link>
            </p>
          ) : (
            <p className="text-center text-sm mt-4">
              Already have an account?
              <Link to="/signin" className="text-blue-600 ml-1">Login</Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;