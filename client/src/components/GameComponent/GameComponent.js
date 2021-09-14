import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./GameComponent.scss";

export default class GameComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      points: 0,
      dollars: 49,
      extraPercentage: 5,
      currentAdd: 10,
      options: [
        {name: "pochoclo",
        price: 100,
        description: "empaguesas delisiosas",
        id: 1},
        {name: "roomba",
        price: 50,
        description: "tu aspiradora etelegente",
        id: 2},
        {name: "cursor",
        price: 200,
        description: "un aliade amistoso",
        id: 3}
      ],
    };
  }

  playerClicked = () => {
    let luckyNumber = Math.floor(Math.random() * (100 - 0 + 1) + 0);
    if(luckyNumber <= this.state.extraPercentage){
      luckyNumber = Math.floor(Math.random() * (100 - 0 + 1) + 0);
      luckyNumber <= 10 ? this.generateExtra() : this.generateChildren();
      
    }
    this.addPoints()

  }

  addPoints = (multiplier) => {

    if(multiplier){
      for (var i = 0; i < this.state.currentAdd*multiplier; i++) {
        this.setState({
          ...this.state,
          points: ++this.state.points
        });
        if(this.state.points%100 == 0){this.setState({...this.state, dollars: ++this.state.dollars})};
      }
     } else {
       console.log("entro")
      for (var i = 0; i < this.state.currentAdd; i++) {
        console.log(this.state.points)
        this.setState({
          ...this.state,
          points: ++this.state.points
        });
        if(this.state.points%100 == 0){this.setState({...this.state, dollars: ++this.state.dollars})};
     }
    }

  }

  generateChildren = () => {
    const that = this;
    let playerChildren = document.createElement("div");
    playerChildren.className = "playerChildren";
    playerChildren.style.left = "500px";
    playerChildren.style.top = "350px";
    document.querySelector('.main-container').appendChild(playerChildren);
    setTimeout(function () {
    playerChildren.style.transform  = `translate(${Math.floor(Math.random() * (450 - (-500) + 1) + (-500))}px,${Math.floor(Math.random() * (300 - (-350) + 1) + (-350))}px) scale(1)`;
    
    playerChildren.onclick = function () {
      this.parentElement.removeChild(this);
      that.addPoints(5)
  };
    }, 100)
    // setTimeout(function () {
    //   playerChildren.style.animation = "rotating 10s linear infinite";
    // }, 200)
  }

  generateExtra = () => {
    const that = this;
    let playerChildren = document.createElement("div");
    playerChildren.className = "playerExtra";
    playerChildren.style.left = "500px";
    playerChildren.style.top = "350px";
    document.querySelector('.main-container').appendChild(playerChildren);
    setTimeout(function () {
    playerChildren.style.transform  = `translate(${Math.floor(Math.random() * (450 - (-500) + 1) + (-500))}px,${Math.floor(Math.random() * (300 - (-350) + 1) + (-350))}px) scale(1)`;

    playerChildren.onclick = function () {
      this.parentElement.removeChild(this);
      that.addPoints(20)
  };
    }, 100)
    // setTimeout(function () {
    //   playerChildren.style.animation = "rotating 10s linear infinite";
    // }, 200)

  }

  buyItem = (option) => {
    this.setState({
      ...this.state,
      dollars: this.state.dollars - option.price,
      user: {...this.state.user,
      items: [...this.state.user.items, option.id]}
    })
  }

  displayOptions = () => {
    const { options } = this.state;
    return options.map((option, i) => 
    this.state.user.items.some(item => item.id == option.id) ? 
      ''
    :
    <div className="option" key={i} onClick={ev => console.log("click")}>
    {this.state.dollars >= option.price ? '' : <div className="disabled-div"></div>}
    <div className="option-specs">
      <h3 className="option-title">{option.name}</h3>
      <p className="option-desc">{option.description}</p>
    </div>
    <div className="option-price">
      <h3 className="price">{option.price}$</h3>
      <button className="buy-button" onClick={e => this.buyItem(option)}>Buy</button>
    </div>
  </div>
    
)
  }


  render() {
    const { user } = this.state;

    return (
      <div className="layout">
      <div className="main-container">
        <p className="counter">{this.state.points} dogecoins</p>
        <p className="dollar-counter">{this.state.dollars} $</p>
        <div className="main-player rotating" onClick={e => this.playerClicked()}>
        </div>
      </div>
      <div className="store">
          <h2>Tiendita</h2>
          <div className="store-options">
          {this.displayOptions()}
          </div>
      </div>
      </div>
    );
  }
}
