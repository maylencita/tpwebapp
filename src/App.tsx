import React from 'react';
import Home from './views/home'
import Messages from './views/messages'
import NewChannel from './views/newChannel'
import LoginForm from './views/login'
import { Channel, User, Question } from './models'
import HttpService from './httpService'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom'


function predicateChanel(channelId: string | undefined) {
  return (value: Channel, index: number, obj: Channel[]) => {
    if (value.name == channelId) {
      return value;
    };
  }
}

function predicateQuestion(questionId: string | undefined) {
  return (value: Question, index: number, obj: Question[]) => {
    if (value.id == questionId) {
      return value;
    };
  }
}

const channel: Channel = {
  name: "nochannel",
  questions: []
}

const user: User = {
  name: "Anonymous",
  avatar: "?_?"
}

const question: Question = {
  id: "noId",
  user: user,
  content: "noquestion",
  answers:[]
}

type AppState = {
  channels: Array<Channel>
  user: User
  activeChannel: Channel
}

type AppProps = {
  appName: string
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    activeChannel: channel,
    channels: [],
    user: user
  }



  chatService = new HttpService()

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/messages/:channelId/:questionId" children={<this.AnswerModeRoute />} />
            <Route path="/messages/:channelId" children={<this.MessagesRoute />} />
            <Route path="/newChannel" children={this.NewChannelRoute} />
            <Route path="/addUser" children={this.HomeRoute} />
            <Route path="/login" children={this.LoginRoute} />
            <Route path="/" children={this.HomeRoute} />
          </Switch>
        </div>
      </Router>
    );
  }

  AnswerModeRoute = () => {
    let { channelId, questionId } = useParams();
    const newActiveChannel = this.state.channels.find(predicateChanel(channelId)) || channel;
    const activeQuestion = newActiveChannel.questions.find(predicateQuestion(questionId)) || question;
    return <Messages onQuestionAsked={this.askQuestion}
     onQuestionAnswered={this.addAnswer} {...this.state} {...this.props}
     activeChannel={newActiveChannel}
     activeQuestion={activeQuestion} />
  }

  MessagesRoute = () => {
    let { channelId } = useParams();
    const newActiveChannel = this.state.channels.find(predicateChanel(channelId)) || channel;
    return <Messages onQuestionAsked={this.askQuestion} 
    onQuestionAnswered={this.addAnswer} {...this.state} {...this.props} 
    activeChannel={newActiveChannel} />
  }

  NewChannelRoute = () => {
    return <NewChannel onNewChannel={this.addChannel} />
  }

  HomeRoute = () => {
    return <Home onUpdateUser={this.addUser} {...this.state} {...this.props} />
  }

  LoginRoute = () => {
    return <LoginForm onLogin={this.handleLogin} />
  }

 
  handleLogin = (username: string) => {
    this.chatService.loginUser(username)
    .then(serviceState => this.setState(state => {
      return {...state, user: serviceState.user, channels: serviceState.channels}
    }))
    .catch(error => error.error ? alert(`Opps: ${error.error}`) : alert(`Unexpected error: $error`) )
  }

  addChannel = (name: string) => {
    const newChannel = {
      name: name,
      questions: []
    }

    this.chatService.addChannel(newChannel).then(
      channels => this.setState((state) => {
        return { ...state, channels: channels }
      })
    )
  }

  askQuestion = (channelId: string, question: string) => {
    const newActiveChannel = this.state.channels.find(predicateChanel(channelId)) || channel;
    
    const newQuestion = {
      id: "question" + newActiveChannel.questions.length,
      user: this.state.user,
      content: question,
      answers: []
    }
    
    this.setState(state => {
      return {...state, activeChannel: newActiveChannel}
    })
    
    this.chatService.addQuestion(newQuestion, channelId).then(
      channels => this.setState((state) => {

        return { ...state, channels:channels}
      })
    )
  }

  addAnswer = (channelId: string, questionId: string, answer:string) => {
    const newActiveChannel = this.state.channels.find(predicateChanel(channelId)) || channel;

    const newactiveQuestion = newActiveChannel.questions.find(predicateQuestion(questionId)) || question;

    const newAnswer = {
      content: answer,
      id: "answer" + newactiveQuestion.answers.length,
      user: this.state.user
    }

    this.setState(state => {
      return {...state, activeChannel: newActiveChannel}
    })

    this.chatService.addAnswer(newAnswer, questionId, channelId).then(
      channels => this.setState((state) => {
        return { ...state, channels:channels}
      })
    )

    console.log(this.state)
  }

  addUser = (user: User) => {
    const newUser = {
      name: user.name,
      avatar: user.avatar
    }
    this.setState((state, props) => {
      return {
        user: newUser
      }
    })
  }

}

export default App;
