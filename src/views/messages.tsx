import * as React from 'react'
import Layout from './layout'

import QuestionBlock from '../components/question'
import MessageInput from '../components/messageInput'
import { Channel, Question } from '../models'
import answer from '../components/answer'

interface MessagesProps {
  appName: string,
  channel: Channel
  channels: Array<Channel>
  activeQuestion?: Question
  onQuestionAsked: (channelId: string, question: string) => void
  onQuestionAnswered: (channelId: string, questionId: string, content: string) => void
  toggleAnswerMode: (questionId: string) => void
  onChannelLinkClicked: (channelId: string) => void
  addPoint: (q: Question) => void
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

  render() {
    return (
      <Layout {...this.props}>
      <div className="answer"> {
        this.props.activeQuestion &&
        <form onSubmit={this.sendAnswer}>
          <MessageInput placeholder={"Answer " + this.props.activeQuestion.content} value={this.state.currentAnswer} onChange={this.updateAnswer} />
          <button>Add Answer</button>
        </form>
      }
      </div>
        <div className="messages_container">

          <div className="messages_body">
            <div className="message_list_scroll">
              {
                this.props.channel.questions &&
                this.props.channel.questions.map((question, index) => this.renderQuestion(question, index))
              }
            </div>
          </div>
          <footer className="messages_footer">
            <form onSubmit={this.sendMessage}>
              <MessageInput placeholder={"Ask a question on #" + this.props.channel.name} value={this.state.currentMessage} onChange={this.updateQuestion} />
              <button type="submit">Add Question</button>
            </form>
            <div className="messagesContainer_notifBar" />
          </footer>
        </div>
      </Layout>
    )
  }

  updateQuestion = (currentMessage: string) => {
    this.setState({ currentMessage });
  }

  updateAnswer = (currentAnswer: string) => {
    this.setState({ currentAnswer });
  }

  sendMessage = (event: any) => {
    event.preventDefault();
    this.props.onQuestionAsked(this.props.channel.name, this.state.currentMessage);
  }

  sendAnswer = (event: any) => {
    event.preventDefault();
    if (this.props.activeQuestion?.id)
      this.props.onQuestionAnswered(this.props.channel.name, this.props.activeQuestion.id, this.state.currentAnswer);
  }

  renderQuestion = (question: Question, index: number) => {
    return <QuestionBlock addPoint={this.props.addPoint} question={question} key={index} toggleAnswerMode={this.props.toggleAnswerMode} />
  }
}

export default Messages
