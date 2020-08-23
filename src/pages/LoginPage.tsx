import React, { useRef, useEffect, useState, useContext } from "react";
//history
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonText,
  IonToast,
} from "@ionic/react";
import "./signup.css";

//helper for hiding tabs on auth page
import { hideTabs } from "../utils/hideTabBar";

//Auth context
import { AuthContext } from "../context/AuthContext";

//AuthService
import AuthService from "../utils/services/auth.service";
import AuthHeader from "../components/AuthHeader";

const LoginPage: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  //remove tabs on auth pages

  useEffect(() => {
    hideTabs();
  }, []);

  //inputs refs
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const history = useHistory();

  const loginUser = async () => {
    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    if (
      !enteredEmail ||
      !enteredPassword ||
      enteredEmail.toString().trim().length === 0 ||
      enteredPassword.toString().trim().length === 0
    ) {
      setError("Please enter a valid Email and Password");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(enteredEmail.toString())) {
      setError("Email is invalid");
      return;
    }

    //combine email + passowrd to an object to pass to api call
    let userDetails = {
      email: enteredEmail,
      password: enteredPassword,
    };

    //Login user Api call

    AuthService.login(userDetails).then((response) => {
      dispatch({
        type: "LOGIN",
        payload: response,
      });

      if (state.user.token) {
        localStorage.setItem("token", state.user.token);
      }

      history.push("/all-users");

      if (!state.user.data) {
        setToastMessage("Logged in  Succesfully");
      }
    });
  };

  return (
    <>
      <IonPage>
        <AuthHeader />
        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          color="warning"
          duration={2000}
          onDidDismiss={() => setToastMessage("")}
        />
        <IonContent>
          <div className="center">
            <div className="heading-column-lr">
              <IonButton fill="clear" routerLink={"/"}>
                <h1 className="big-heading">LOG IN </h1>
              </IonButton>

              <IonButton fill="clear" routerLink={"/signup"}>
                <h2 className="small-heading">Sign up</h2>
              </IonButton>
            </div>
            <IonLabel>sign up or signin for amazing loans</IonLabel>
          </div>

          <IonItem>
            <IonLabel position="floating">Enter Email</IonLabel>
            <IonInput type="email" ref={emailRef} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Enter Password</IonLabel>
            <IonInput type="password" ref={passwordRef} />
          </IonItem>

          {error && (
            <IonRow className="ion-text-center">
              <IonCol>
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              </IonCol>
            </IonRow>
          )}

          {state.user.error && (
            <IonRow className="ion-text-center">
              <IonCol>
                <IonText color="danger">
                  <p>{state.user.error}</p>
                </IonText>
              </IonCol>
            </IonRow>
          )}

          <IonButton className="ion-padding" color="dark" onClick={loginUser}>
            Submit
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default LoginPage;
