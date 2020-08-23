import React from "react";
import { IonHeader } from "@ionic/react";

//logo
import Logo from "../assets/Power-Horizontal Lockup.svg";

const AuthHeader: React.FC = () => {
  return (
    <IonHeader no-border>
      <div className="login-header ion-padding">
        <img className="logo-img" src={Logo} alt="power logo" />
      </div>
    </IonHeader>
  );
};

export default AuthHeader;
