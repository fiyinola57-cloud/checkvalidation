import { useState } from "react";

const FormInput = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    //updates input values
    setValues({ ...values, [name]: value });

    //Remove error when input is correct
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      //Username validation
      if (name === "username") {
        if (value.trim().length >= 3) {
          delete updatedErrors.username;
        }
      }

      //Email validation
      if (name === "email") {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          delete updatedErrors.email;
        }
      }

      //Birthday validation
      if (name === "birthday") {
        const today = new Date().toISOString().split("T")[0];

        if (value && value <= today) {
          delete updatedErrors.birthday;
        }
      }

      //password validation
      if (name === "password") {
        if (value.length >= 8) {
          delete updatedErrors.password;
        }
      }

      // Confirm password validation
      if (name === "confirmPassword") {
        if (value && value === values.password) {
          delete updatedErrors.confirmPassword;
        } else if (value) {
          updatedErrors.confirmPassword = "Passwords do not match";
        }
      }
      return updatedErrors;
    });
  }

  //Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    //Username validation
    if (!values.username.trim()) {
      newErrors.username = "Username is required";
    } else if (values.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    //Email validation
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    //Birthday validation
    if (!values.birthday) {
      newErrors.birthday = "Birthday is required";
    } else if (values.birthday > new Date().toISOString().split("T")[0]) {
      newErrors.birthday = "Birthday cannot be in the future";
    }

    //Password validation
    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    //Confirm password validation
    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Registration successful!");
      console.log("Form Data:", values);
    }
  };
  return (
    <form className="regform" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label>Birthday</label>
        <input
          type="date"
          name="birthday"
          placeholder="Birthday"
          value={values.birthday}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
        />
        {errors.birthday && <span className="error">{errors.birthday}</span>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm Password" />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>
      <button>Submit</button>
    </form>
  );
};

export default FormInput;
