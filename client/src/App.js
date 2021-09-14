import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import AuthService from "./services/AuthService";

import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import MainBar from "./components/MainBar/MainBar";
import GameComponent from "./components/GameComponent/GameComponent";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    user: null,
  };

  setUser = user => {
    this.setState({ ...this.state, user });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService
        .loggedInUser()
        .then(
          user => {
            this.setUser(user);
          },
          error => {
            this.setUser(false);
          }
        )
        .catch(() => {
          this.setUser(false);
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  handleLogout = e => {
    e.preventDefault();
    this.authService.logout(this.state).then(
      () => {
        this.setState({ user: null });
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { user } = this.state;

    const NoMatch = ({ location }) => (
      <div className="nomatch-component">
        <img
          className="no-gif"
          src="https://media2.giphy.com/media/ly8G39g1ujpNm/giphy.gif?cid=790b761142e4c6ee9a3e38ce715d90695af72b14bdcd671f&rid=giphy.gif"
          alt="404"
        ></img>
         
      </div>
    );

    return (
      <div>
        {user && (
          <Switch>
            <Route
              exact
              path="/"
              render={match => (
                <React.Fragment>
                  <MainBar {...match} user={user} logout={this.handleLogout}></MainBar>
                  <GameComponent {...match} user={user}></GameComponent>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/users/:id"
              render={match => (
                <React.Fragment>
                </React.Fragment>
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        )}

        {!user && (
          <Switch>
            <Route
              exact
              path="/"
              render={match => (
                <React.Fragment>
                  Home No User
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/users/:id"
              render={match => (
                <React.Fragment>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/login"
              render={match => (
                <React.Fragment>
                  <Login {...match} setUser={this.setUser}/>
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/signup"
              render={match => (
                <React.Fragment>
                  <SignUp {...match} setUser={this.setUser}/>
                </React.Fragment>
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        )}
      </div>
    );
  }
}
