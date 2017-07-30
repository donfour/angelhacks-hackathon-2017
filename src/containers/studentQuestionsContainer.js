import React from 'react'
import Question from '../components/question'
import axios from 'axios'

export default class StudentQuestionsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newQuestion: ""
    }
  }

  updateQuestion(e) {
    this.setState({
      newQuestion: e.target.value
    })
  }

  askQuestionClicked(e) {
    e.preventDefault();
    if(this.state.newQuestion === "") return
    const nodeId = this.props.nodeId;
    const username = 'spike';
    const topic = this.props.topic;
    const question = this.state.newQuestion;
    const questionObj = {username: username, topic: topic, question: question};
    axios.post('http://localhost:3000/addQuestion', {questionObj: questionObj, nodeId: nodeId})
    .then((resp) => {
      console.log('got to the then');
    });
    this.props.socket.emit('newQuestion', {username: username, topic: topic, question: question})
  }

  render() {
    return(

<div>
  <nav className="main-menu" id="nav">
    <a href="#" className="untarget"><i className="large material-icons center ">keyboard_arrow_left</i></a>
    <ul>
      <li>
        <div className="card-row-1 card-panel   white  card-panel-question">
          <div className="input-field ask-question-form">
            <input id="questionInput" type="text" class="validate" placeholder="Ask a new question..." onChange={(e) => this.updateQuestion(e)}/>
        </div>

        </div>
        <a  onClick={(e) => this.askQuestionClicked(e)} className="waves-effect waves-light btn askButton">Ask!</a>

      </li>
      {this.props.questionsArr.map((question, i) => <Question key={i} index={i} question={question.question} username={question.username}/>)}
</ul>
</nav>
</div>
    )
  }
}
