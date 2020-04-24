import * as React from 'react'
import { Answer } from '../models'

interface AnswerProps {
  answer: Answer
}

const answer = (props: AnswerProps) => {
  return (
    <div className="answer">
      <div className="answer_gutter">
        <div className="user_icon"> {props.answer.user.avatar} </div>
      </div>
      <div className="answer_content">
        <div className="answer_header">{props.answer.user.name}</div>
        <div className="answer_text">
          {props.answer.content}
        </div>
      </div>
      <div className="message_buttons">
        <span className="message_buttons_points">3</span>
        <span className="message_buttons_addPoints">+1</span>
      </div>
    </div>    
  )
}

export default answer