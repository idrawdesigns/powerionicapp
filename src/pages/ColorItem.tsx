import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonPage,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonIcon,
  IonLabel,
} from "@ionic/react";

import { COLOR_DATA } from "./ColorList";

import { useParams } from "react-router-dom";
import { todaySharp, apertureSharp, warningSharp } from "ionicons/icons";

const ColorItem: React.FC = () => {
  const selectedColorId = useParams<{ colorId: string }>().colorId;

  const selectedColor = COLOR_DATA.find(
    (c) => c.id === parseInt(selectedColorId)
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>
            {selectedColor ? selectedColor.name : "No Color found"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          {selectedColor && selectedColor ? (
            <>
              <div
                style={{
                  backgroundColor: selectedColor?.color,
                  width: "100%",
                  height: "150px",
                }}
              >
                <h3>{selectedColor.color.toUpperCase()}</h3>
              </div>
              <IonCardTitle>
                <IonCardTitle>{selectedColor.name.toUpperCase()}</IonCardTitle>
              </IonCardTitle>
              <IonCardContent>
                <IonChip>
                  <IonIcon icon={todaySharp} />
                  <IonLabel>{selectedColor.year}</IonLabel>
                </IonChip>

                <IonChip style={{ background: selectedColor?.color }}>
                  <IonIcon icon={apertureSharp} />
                  <IonLabel>{selectedColor.pantone_value}</IonLabel>
                </IonChip>
              </IonCardContent>
            </>
          ) : (
            <IonCardContent className="ion-text-center">
              <IonChip outline color="danger">
                <IonIcon icon={warningSharp} />
                <IonLabel>Selected Color Not found</IonLabel>
              </IonChip>
            </IonCardContent>
          )}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ColorItem;
