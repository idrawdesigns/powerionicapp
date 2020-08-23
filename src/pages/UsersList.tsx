import React, { useState, useRef, useEffect, useContext, memo } from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonPage,
  IonList,
  IonIcon,
  IonFab,
  IonFabButton,
  IonAlert,
  IonToast,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";

//components
import EditModal from "../components/EditModal";
import EditableUser from "../components/EditableUser";
import AddUserModal from "../components/AddUser";

//services
import UserService from "../utils/services/user.service";

//context
import { UserContext } from "../context/UserContext";

const UsersList: React.FC = () => {
  const { state, dispatch } = useContext(UserContext);
  const [startedDeleting, setStartedDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);

  useEffect(() => {
    state.users.length === 0 && fetchAllUsersAction();
  });

  const fetchAllUsersAction = async () => {
    UserService.getAllusers().then((response) => {
      dispatch({
        type: "FETCH_USERS",
        payload: response.data,
      });
    });
  };

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  //starting the deleting process, to enable deletion confirmation
  const startUserDeletionHandler = () => {
    setStartedDeleting(true);
  };

  //handle delete user
  const deleteUserHandler = () => {
    setStartedDeleting(false);
    setToastMessage("Deleted User");
    console.log("deleted ...");
  };

  //handle Edit user
  const startEditingUserHandler = () => {
    slidingOptionsRef.current?.closeOpened();

    setIsEditing(true);
  };

  //handle Add user
  const addUserHandler = () => {
    setIsAddUser(true);
  };

  //cancel Edit
  const cancelEditUserHandler = () => {
    setIsEditing(false);
  };

  //cancel Add user
  const cancelAddUserHandler = () => {
    setIsAddUser(false);
  };

  return (
    <>
      <EditModal
        show={isEditing}
        cancelEditUserHandler={cancelEditUserHandler}
      />

      <AddUserModal show={isAddUser} cancel={cancelAddUserHandler} />
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setToastMessage("")}
      />

      <IonAlert
        isOpen={startedDeleting}
        header="Are you Sure?"
        message="Do you want to delete User?"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => {
              setStartedDeleting(false);
            },
          },
          {
            text: "Yes",
            handler: deleteUserHandler,
          },
        ]}
      />

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>All Users</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList className="ion-padding">
            {state &&
              state.users.map((user: any) => (
                <EditableUser
                  key={user.id}
                  user={user}
                  slidingOptionsRef={slidingOptionsRef}
                  startEditingUserHandler={startEditingUserHandler}
                  startUserDeletionHandler={startUserDeletionHandler}
                />
              ))}
          </IonList>

          <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="secondary" onClick={addUserHandler}>
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    </>
  );
};

export default memo(UsersList);
