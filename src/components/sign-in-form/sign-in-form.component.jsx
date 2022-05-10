import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;

  const handleChange = event => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  }

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      // Pulizia campi form
      setFormFields(defaultFormFields);
    } catch(error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert("Wrong password for email " + email);
          break;
        case 'auth/user-not-found':
          alert("No user associated with this email: " + email);
          break;
        default:
          console.error(error);
      }
    }
  }

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required/>
        <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>Sign In With Google</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;