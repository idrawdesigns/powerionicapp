import React, { useContext, useRef, useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonButton,
  IonText,
  IonToast,
} from "@ionic/react";

import { UserContext } from "../context/UserContext";

//auth service
import UserService from "../utils/services/user.service";

const AddUserModal: React.FC<{
  show: boolean;
  cancel: () => void;
}> = (props) => {
  const { dispatch } = useContext(UserContext);
  const [error, setError] = useState("");

  const [toastMessage, setToastMessage] = useState("");

  const nameRef = useRef<HTMLIonInputElement>(null);
  const jobRef = useRef<HTMLIonInputElement>(null);

  const saveHandler = () => {
    const enteredName = nameRef.current!.value;
    const enteredJob = jobRef.current!.value;

    if (
      !enteredName ||
      !enteredJob ||
      enteredName.toString().trim().length === 0 ||
      enteredJob.toString().trim().length === 0
    ) {
      setError("Please enter a valid Name and Job title");
      return;
    }
    setError("");

    let newUser = {
      name: enteredName,
      job: enteredJob,
    };

    //create user through API
    UserService.createUser(newUser).then((response) => {
      dispatch({
        type: "CREATE_USER",
        payload: response,
      });

      setToastMessage("User Created Succesfully");
      props.cancel();
    });
  };

  return (
    <>
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        color="warning"
        duration={2000}
        onDidDismiss={() => setToastMessage("")}
      />
      <IonModal isOpen={props.show}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add User</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                {/* Enter a Name input */}
                <IonItem>
                  <IonLabel position="floating">Name</IonLabel>
                  <IonInput type="text" name="name" ref={nameRef} />
                </IonItem>
                {/* Enter a  Job input */}
                <IonItem>
                  <IonLabel position="floating">Job</IonLabel>
                  <IonInput type="text" name="job" ref={jobRef} />
                </IonItem>
              </IonCol>
            </IonRow>
            {error && (
              <IonRow className="ion-text-center">
                <IonCol>
                  <IonText color="danger">
                    <p>{error}</p>
                  </IonText>
                </IonCol>
              </IonRow>
            )}
            <IonRow className="ion-text-center">
              <IonCol>
                <IonButton fill="clear" color="dark" onClick={props.cancel}>
                  Cancel
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  color="secondary"
                  expand="block"
                  onClick={saveHandler}
                >
                  Save
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </>
  );
};

export default AddUserModal;
