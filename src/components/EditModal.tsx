import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";

const EditModal: React.FC<{
  show: boolean;
  cancelEditUserHandler: () => void;
}> = (props) => {
  return (
    <IonModal isOpen={props.show}>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Edit User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Enter Name</IonLabel>
                <IonInput type="text" />
              </IonItem>
              {/* Enter Job Input*/}
              <IonItem>
                <IonLabel position="floating">Enter a Job</IonLabel>
                <IonInput type="text" />
              </IonItem>
            </IonCol>
          </IonRow>

          {/* Action Buttons*/}
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton
                fill="clear"
                color="dark"
                onClick={props.cancelEditUserHandler}
              >
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="secondary" expand="block">
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default EditModal;
