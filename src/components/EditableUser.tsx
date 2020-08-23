import React from "react";
import {
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonItem,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import { trash, createSharp, eyeSharp } from "ionicons/icons";

const EditableUser: React.FC<{
  slidingOptionsRef: React.Ref<HTMLIonItemSlidingElement>;
  startUserDeletionHandler: () => void;
  startEditingUserHandler: () => void;

  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}> = (props) => {
  return (
    <IonItemSliding ref={props.slidingOptionsRef}>
      <IonItemOptions side="start">
        <IonItemOption onClick={props.startUserDeletionHandler} color="danger">
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
      <IonItem button>
        <IonAvatar slot="start">
          <img src={props.user.avatar} alt={props.user.first_name} />
        </IonAvatar>
        <IonLabel>
          <h2>{`${props.user.first_name} ${props.user.last_name}`}</h2>
          <p>{props.user.email}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption style={{ backgroundColor: "#7974ff" }}>
          <IonIcon
            slot="icon-only"
            icon={createSharp}
            onClick={props.startEditingUserHandler}
          />
        </IonItemOption>
        <IonItemOption routerLink={`/users/${props.user.id}`}>
          <IonIcon slot="icon-only" icon={eyeSharp} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default EditableUser;
