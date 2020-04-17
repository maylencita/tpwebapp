import * as React from 'react'

import AnswerComponent from './answer'
import { UserIcon } from './user'
import { Question, Answer } from '../models';
import { Link } from 'react-router-dom';

interface QuestionProps {
  question: Question
  channelName: string
  isActiveQuestion: boolean
}

interface QuestionState {
}

class QuestionComponent extends React.Component<QuestionProps, QuestionState> {
  state: QuestionState = {}

  render() {
    return (
      <div className="message">
        <div className="message_gutter">
          <UserIcon userIcon={this.props.question.user.avatar || '[...]'} />
        </div>
        <div className="message_content">
          <div className="message_content_header">
            {this.props.question.user.name}
          </div>
          <div className="message_content_body">
            <div className="message_content_question"> 
              <div className="question_text">
                {this.props.question.content}
              </div>
            </div>
            <div className="message_content_answers">
              {
                this.props.question.answers.map(this.renderAnswer)
              }
            </div>
          </div>
        </div>    
        <div className="message_buttons">
          <span className="message_buttons_points">0</span>
          <button className="message_buttons_addPoints" onClick={this.addPoints}>+1</button>
          <Link to={this.questionLink}><span className="question_buttons_answer">A</span></Link>
        </div>
      </div>  
    )
  }  

  addPoints = () => {
    //@TODO
  }

  renderAnswer = (obj: any, index: number) => (
    <AnswerComponent answer={obj.answer} key={index} />
  )

 
  questionLink = () => {
    return "/messages/" + this.props.channelName + "/" + this.props.question.id
  }

}

export default QuestionComponent;
