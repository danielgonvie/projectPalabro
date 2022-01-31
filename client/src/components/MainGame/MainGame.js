import React, { Component } from "react";
import "./MainGame.scss";
import { dictionary } from './dictionary.js'

export default class MainGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      currentWord: "CARCA",
      attemps: 6,
      userRows: [...Array(6).fill([])],
      userAnswer:"",
      currentAttemp: 0,
      newArr: []
    };
  }

  componentDidMount() {
    console.log("se armó")
 }


  playerClicked = () => {

  }

  displayRow = (row, i) => {
      console.log(row, i, "NUEVA ROW ---------------")
    const { currentWord } = this.state;
    let splitWord = currentWord.split('');
    console.log(splitWord, "la palabra")
    let splitAnswer = row;
    console.log(splitAnswer, "la palabra del man");

    if(this.state.currentAttemp > i){
        let finalArr = [...Array(splitWord.length - splitAnswer.length).fill(" ")];
        finalArr = [...splitAnswer, ...finalArr]
        console.log(finalArr, "el arr final");
        return <div className="gameRow">
        {finalArr.map((character, i) => 
           this.fillRow(character, i)
        )}
        </div>
     } else if(this.state.currentAttemp == i){
        let finalArr = [...Array(splitWord.length - splitAnswer.length).fill(" ")];
        finalArr = [...splitAnswer, ...finalArr]
        console.log(finalArr, "el arr final");
        return <div className="gameRow">
        {finalArr.map((character, i) => 
           this.checkFilled(character, i)
        )}
        </div>
     } else {
        return <div className="gameRow">
        {splitWord.map((character, i) => 
           this.checkFilled(" ", i)
        )}
        </div>
    }
  }

  checkFilled = (char, i) => {
    return char !== " " ? <div className="filledBox">{char}</div> : <div className="emptyBox" key={i}></div>
  }

  fillRow = (char, i) => {
    return char !== " " ? <div className={'filledBox ' + char.color}>{char.letter}</div> : <div className="emptyBox" key={i}></div>
  }

  displayGame = () => {
    const { userRows } = this.state;
    console.log(userRows, "los intentos")
    return userRows.map((row, i) => 
    this.displayRow(row, i))
  }

  checkAnswer = () => {
        
            if(this.state.userRows[this.state.currentAttemp].join('') == this.state.currentWord.toUpperCase()){
                console.log("correcto", this.state.userRows[this.state.currentAttemp].join(''), this.state.currentWord.toUpperCase())
                alert("You won!!");
            } else {
                console.log("incorrecto", this.state.userRows[this.state.currentAttemp].join(''), this.state.currentWord.toUpperCase());
                this.colorWord(this.state.userRows[this.state.currentAttemp]);
                this.setState({ ...this.state, currentAttemp: this.state.currentAttemp+1});
                document.querySelector("input").value = "";
                if (this.state.currentAttemp >= 6) {
                    console.log("gameover")
                }
            } 
  }

  colorWord = (userArr) => {
    let splitWord = this.state.currentWord.split('');
    let cloneArr = userArr;
    for (let i = 0; i < userArr.length; i++) {
      console.log(splitWord, "--------------------------------");
        if (splitWord.some(element => element == userArr[i])) {
          console.log("--------------------------------");
            if(cloneArr[i] == splitWord[i]){
                let count = 0;
                for (let j = 0; j < cloneArr.length; j++) {
                    if (cloneArr[i] === splitWord[j]) {
                        count++;
                        console.log(count, "veces que encontró la letra");
                        console.log(cloneArr[j], splitWord[i], "que compara");
                    }
                }
                
                if(count > 1){
                    cloneArr[i] = {letter: cloneArr[i], color: "blue"}
                } else {
                    cloneArr[i] = {letter: cloneArr[i], color: "green"}
                }

            } else {
                cloneArr[i] = {letter: cloneArr[i], color: "yellow"}
            }
            
        } else {
            cloneArr[i] = {letter: cloneArr[i], color: "grey"}
        }
    }
    console.log(cloneArr, " lololololololo cloneArr")
    this.setState({ ...this.state, userRows: [...cloneArr]})
  }



  handleChangeInput = e => {
      let copyArr = [...this.state.userRows]
      copyArr[this.state.currentAttemp] = e.target.value.toUpperCase().split("")
    this.setState({ ...this.state, userRows: [...copyArr]});
  };


  render() {
    const { user } = this.state;

    return (
      <div className="layout">
          <div className="gameField">
          {this.displayGame()}
          </div>
          <input type="text" name="userAnswer" className="falseField" onChange={e => this.handleChangeInput(e)} maxLength={this.state.currentWord.length}></input>
          <div className="falseSend" onClick={e => this.checkAnswer()}>Send</div>
      </div>
    );
  }
}