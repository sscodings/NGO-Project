import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

const UserAuthForm = ({ type }) => {

  const authForm = useRef();
  const [role, setRole] = useState("volunteer");

  return (
    <AnimationWrapper keyValue={type}>
      <section className="min-h-screen flex items-center justify-center bg-[#f3f2ef]">

        <Toaster />

        <form
          ref={authForm}
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
              <InputBox
                name="email"
                type="email"
                placeholder="you@example.com"
                icon="fi-rr-envelope"
              />

              <InputBox
                name="password"
                type="password"
                placeholder="Password"
                icon="fi-rr-key"
              />

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
                  <InputBox
                    name="fullname"
                    type="text"
                    placeholder="Full Name"
                    icon="fi-rr-user"
                  />

                  <InputBox
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    icon="fi-rr-envelope"
                  />

                  <InputBox
                    name="password"
                    type="password"
                    placeholder="Password"
                    icon="fi-rr-key"
                  />
                </>
              )}

              {role === "organization" && (
                <>
                  <InputBox
                    name="orgname"
                    type="text"
                    placeholder="Your NGO Name"
                    icon="fi-rr-building"
                  />

                  <InputBox
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    icon="fi-rr-envelope"
                  />

                  <InputBox
                    name="location"
                    type="text"
                    placeholder="City, State"
                    icon="fi-rr-marker"
                  />

                  <InputBox
                    name="password"
                    type="password"
                    placeholder="Password"
                    icon="fi-rr-key"
                  />
                </>
              )}

              <div className="flex items-center gap-2 text-sm mt-4 mb-6">
                <input type="checkbox" />
                <p>
                  I agree to the
                  <span className="text-blue-600"> Terms of Service</span> and
                  <span className="text-blue-600"> Privacy Policy</span>
                </p>
              </div>
            </>
          )}

          {/* Button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
            {type === "sign-in"
              ? `Login as ${role}`
              : `Create ${role === "volunteer" ? "Volunteer" : "Organization"} Account`}
          </button>

          {/* Switch auth */}
          {type === "sign-in" ? (
            <p className="text-center text-sm mt-4">
              Don't have an account?
              <Link to="/signup" className="text-blue-600 ml-1">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="text-center text-sm mt-4">
              Already have an account?
              <Link to="/signin" className="text-blue-600 ml-1">
                Login
              </Link>
            </p>
          )}

        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;