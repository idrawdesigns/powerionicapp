import React, { useContext, useState, useRef, useEffect } from "react";
//history
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonPage,
  IonRow,
  IonCol,
  IonText,
  IonToast,
  IonSpinner,
} from "@ionic/react";
import "./signup.css";

//helper for hiding tabs on auth page
import { hideTabs, showTabs } from "../utils/hideTabBar";

//Auth context
import { AuthContext } from "../context/AuthContext";

//AuthService
import AuthService from "../utils/services/auth.service";
import AuthHeader from "../components/AuthHeader";

const SignUpPage: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  //remove tabs on auth pages

  useEffect(() => {
    hideTabs();
    return () => {
      showTabs();
    };
  }, []);

  //inputs refs
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const history = useHistory();

  const signupUser = async () => {
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

    AuthService.register(userDetails).then((response) => {
      dispatch({
        type: "LOADING",
        payload: response,
      });
      dispatch({
        type: "REGISTER",
        payload: response,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      console.log(response);
      history.push("/all-users");

      if (!state.user.data) {
        setToastMessage("User Created Succesfully");
      }
    });
  };

  return (
    <>
      <IonPage>
        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          color="warning"
          duration={2000}
          onDidDismiss={() => setToastMessage("")}
        />
        <AuthHeader />
        <IonContent>
          <div className="center">
            <div className="heading-column-lr">
              <IonButton fill="clear" routerLink={"/signup"}>
                <h1 className="big-heading"> Sign up </h1>
              </IonButton>

              <IonButton fill="clear" routerLink={"/"}>
                <h2 className="small-heading">LOG IN</h2>
              </IonButton>
            </div>
            <IonLabel>sign up or signin for amazing loans</IonLabel>
          </div>
          {state.loading && <IonSpinner />}
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

          <IonButton className="ion-padding" color="dark" onClick={signupUser}>
            Submit
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default SignUpPage;
