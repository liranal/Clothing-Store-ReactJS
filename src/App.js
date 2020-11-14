import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribefromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        console.log(userAuth.displayName);
        const userRef = await createUserProfileDocument(userAuth);
        console.log(userRef);
        userRef.onSnapshot((snapshot) => {
          dispatch(setCurrentUser({ id: snapshot.id, ...snapshot.data() }));
        });
      }
      console.log(userAuth);

      dispatch(setCurrentUser(userAuth));
    });
    return () => {
      unsubscribefromAuth();
    };
  }, [dispatch]);
  console.log(currentUser);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
