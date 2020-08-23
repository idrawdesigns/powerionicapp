import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonPage,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";

//dummy data

export const COLOR_DATA = [
  {
    id: 1,
    name: "cerulean",
    year: 2000,
    color: "#98B2D1",
    pantone_value: "15-4020",
  },
  {
    id: 2,
    name: "fuchsia rose",
    year: 2001,
    color: "#C74375",
    pantone_value: "17-2031",
  },
  {
    id: 3,
    name: "true red",
    year: 2002,
    color: "#BF1932",
    pantone_value: "19-1664",
  },
  {
    id: 4,
    name: "aqua sky",
    year: 2003,
    color: "#7BC4C4",
    pantone_value: "14-4811",
  },
  {
    id: 5,
    name: "tigerlily",
    year: 2004,
    color: "#E2583E",
    pantone_value: "17-1456",
  },
];

const ColorsList: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Colors</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="ion-padding">
          {COLOR_DATA.map((color) => (
            <IonItem key={color.id}>
              <IonLabel>{color.name}</IonLabel>
              <IonButton routerLink={`/colors/${color.id}`}>
                View Details
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ColorsList;
