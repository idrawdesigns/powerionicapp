import React, { useEffect } from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonPage,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";

//context
import { UserContext } from "../context/UserContext";

import UserService from "../utils/services/user.service";

import { useParams } from "react-router-dom";

const UserItem: React.FC = () => {
  const { state, dispatch } = React.useContext(UserContext);
  const selectedUserById = useParams<{ userId: string }>().userId;

  useEffect(() => {
    state.selectedUser && fetchSelectedUserAction();
    // eslint-disable-next-line
  }, []);

  const fetchSelectedUserAction = async () => {
    //convert user id from params to integer
    const selectedUserId = parseInt(selectedUserById);

    UserService.getUser(selectedUserId).then((response) => {
      dispatch({
        type: "FETCH_USER",
        payload: response.data,
      });
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>
            {state.selectedUser
              ? state.selectedUser.first_name
              : "No such user Exists"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          {state && state.selectedUser ? (
            <IonCardContent>
              <IonText>{`Names: ${state.selectedUser.first_name} ${state.selectedUser.last_name}`}</IonText>
              <br />
              <IonText>{`email: ${state.selectedUser.email} `}</IonText>
            </IonCardContent>
          ) : (
            <IonCardContent>No user Found</IonCardContent>
          )}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default UserItem;
