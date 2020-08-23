import React from "react";

import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { list, peopleOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/custom-theme.css";

//components
import Colors from "./pages/ColorList";
import LoginPage from "./pages/LoginPage";
import ColorItem from "./pages/ColorItem";
import UsersList from "./pages/UsersList";
import UserItem from "./pages/UserItem";
import SignUpPage from "./pages/SignUpPage";

//context
import { UserContextProvider } from "./context/UserContext";
import { AuthContextProvider } from "./context/AuthContext";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/" component={LoginPage} exact={true} />
              <Route path="/signup" component={SignUpPage} exact={true} />
              <Route path="/all-colors" component={Colors} exact={true} />
              <Route
                path="/colors/:colorId"
                component={ColorItem}
                exact={true}
              />
              <Route path="/all-users" component={UsersList} exact={true} />
              <Route path="/users/:userId" component={UserItem} exact={true} />
              <Redirect to="/all-colors" />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="x" href="/all-colors">
                <IonIcon icon={list} />
                <IonLabel>All Colors</IonLabel>
              </IonTabButton>

              <IonTabButton tab="y" href="/all-users">
                <IonIcon icon={peopleOutline} />
                <IonLabel>All Users</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </UserContextProvider>
      </AuthContextProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
