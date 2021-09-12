import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import "./Signup.scss";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: "",
    password: "",
    name: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSignUp = e => {
    e.preventDefault();
    const { history, setUser } = this.props;
    this.authService.signup(this.state).then(
      user => {
        setUser(user);
        history.push("/");
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { username, password, name } = this.state;

    return (
      <div className="signup-container">
        <h1 className="signup-title">Signup</h1>
        <form className="signup-form" onSubmit={this.handleSignUp}>
          <div className="signup-param">
            <label>Nombre de usuario </label>
            <input
              className="signup-field"
              type="text"
              name="username"
              value={username}
              required
              onChange={this.handleChange}
              placeholder="username"
            />
          </div>
          <div className="signup-param">
            <label>Password </label>
            <input
              className="signup-field"
              type="password"
              value={password}
              pattern="{4,20}"
              name="password"
              required
              onChange={this.handleChange}
              placeholder="contraseña"
            />
          </div>
          <div className="signup-param">
            <label>Nombre </label>
            <input
              className="signup-field"
              type="text"
              value={name}
              pattern="[A-Za-z_ áéíóú]{1,10}"
              name="name"
              required
              onChange={this.handleChange}
              placeholder="nombre"
            />
          </div>
          <input className="submit-button" type="submit" value="Enviar" />
        </form>
      </div>
    );
  }
}
