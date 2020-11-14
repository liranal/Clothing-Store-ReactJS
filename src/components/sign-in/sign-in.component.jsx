import React, { useState } from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss"
import {auth, signInWithGoogle} from '../../firebase/firebase.utils'
function SignIn() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async  (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email,password);
      setemail('')
      setpassword('')
    }
    catch (err){
      console.error(err)
    }
  };
  return (
    <div>
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            label="email"
            required
            handleChange={(e) => {
              setemail(e.target.value);
            }}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            label="password"
            handleChange={(e) => {
              setpassword(e.target.value);
            }}
            required
          />
          <div className="buttons">
          <CustomButton type="submit" >Sign in</CustomButton>
          <CustomButton onClick={signInWithGoogle}  isGoogleSignIn>Sign in with Google</CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
