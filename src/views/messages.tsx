import * as React from 'react'
import Layout from './layout'

import QuestionBlock from '../components/question'
import MessageInput from '../components/messageInput'
import { Channel, Question } from '../models'

interface MessagesProps {
  appName: string,
  activeChannel: Channel
  channels: Array<Channel>
  activeQuestion?: Question
  onQuestionAsked: (channelId: string, question: string) => void
  onQuestionAnswered: (channelId: string, questionId: string, content: string) => void
}

interface MessagesState {
  currentMessage: string
  currentAnswer: string
}

class Messages extends React.Component<MessagesProps, MessagesState> {

  state: MessagesState = {
    currentMessage: '',
    currentAnswer: ''
  }

  render(){
    return (
      <Layout {...this.props}>
        <div className="messages_container">
          <div className="messages_body">
            <div className="message_list_scroll">
              {
                this.props.activeChannel.questions &&
                this.props.activeChannel.questions.map((question, index) => this.renderQuestion(question, index))
              }                      
            </div>
          </div>
          <footer className="messages_footer">
            <form onSubmit={this.sendMessage}>
              <MessageInput placeholder="Ask a question on this channel" value={this.state.currentMessage} onChange={this.updateQuestion} />
              <button>Ask a question</button>

            </form>
            {
              this.props.activeQuestion &&
              <form onSubmit={this.sendAnswer}>
                <MessageInput placeholder="Answer a question on this channel" value={this.state.currentAnswer} onChange={this.updateAnswer} />
                  <button>Answer this question</button>
              </form>
            }
            <div className="messagesContainer_notifBar" />
          </footer>
        </div>
      </Layout>
    )   
  }

  updateQuestion = (currentMessage: string) => {
    this.setState( (state) => {
      return {...state, currentMessage }
    });
  }

  updateAnswer = (currentAnswer: string) => {
    this.setState( (state) => {
      return {...state, currentAnswer }
    });
  }

  sendMessage = (event: any) => {
    event.preventDefault();
    this.props.onQuestionAsked(this.props.activeChannel.name, this.state.currentMessage)
  }

  sendAnswer = (event: any) => {
    event.preventDefault();
    if (this.props.activeQuestion?.id)
      this.props.onQuestionAnswered(this.props.activeChannel.name, this.props.activeQuestion?.id, this.state.currentAnswer)
  }

  renderQuestion = (question: Question, index: number) => {
    return <QuestionBlock channelName={this.props.activeChannel.name} question={question} key={index} isActiveQuestion={question == this.props.activeQuestion}/>
  }
}

export default Messages
