import React from 'react';
import Home from './views/home'
import Messages from './views/messages'
import NewChannel from './views/newChannel'
import Login from './views/Login'
import HttpService from './HttpService'
import ServiceState from './HttpService'
import { Channel, User, Question } from './models'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom'
import { stat } from 'fs';
import answer from './components/answer';

const chatService = new HttpService()

const channel: Channel = {
  name: "No active Channel",
  questions: []
}

const question: Question = {
  answers: [],
  content: "",
  id: "",
  user: { avatar: "", name: "" },
  points: 0
}

type AppState = {
  channel: Channel // est le channel actif
  channels: Array<Channel>
  user: User
  activeQuestion: Question // est la question actif
}

type AppProps = {
  appName: string
}


function predicat_find_channel(channelId: string) {
  return (value: Channel, index: number, obj: Channel[]) => {
    if (value.name == channelId) {
      return value;
    };
  }
}

function predicat_find_question(questionId: string) {
  return (value: Question, index: number, obj: Question[]) => {
    if (value.id == questionId) {
      return value;
    };
  }
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    channel: channel,
    channels: [],
    user: { name: "Anonymous", avatar: "?_?" },
    activeQuestion: question
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
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

  MessagesRoute = () => {
    let { channelId } = useParams();
    return <Messages addPoint={this.addPointQuestion} onChannelLinkClicked={this.updateCurrentChannel} onQuestionAsked={this.addMessage} onQuestionAnswered={this.answerQuestion} toggleAnswerMode={this.toggleAnswerMode} {...this.state} {...this.props} />
  }

  NewChannelRoute = () => {
    return <NewChannel onNewChannel={this.addChannel} {...this.state} {...this.props} />
  }

  LoginRoute = () => {
    return <Login onLogin={this.onLogin} {...this.state} {...this.props} />
  }

  HomeRoute = () => {
    return <Home onChannelLinkClicked={this.updateCurrentChannel} onUpdateUser={this.updateUser} {...this.state} {...this.props} />
  }

  addChannel = (name: string) => {
    const newChannel = {
      name: name,
      questions: []
    }
    chatService.addChannel(newChannel)
      .then(channels => this.setState(state => { return { channels: channels } }))

    // this.setState((state, props) => {
    //   return {
    //     channels: [...state.channels, newChannel]
    //   }
    // })
  }

  updateUser = (user: User) => {
    this.setState((state, props) => {
      return {
        user: user
      }
    })
  }

  onLogin = (name: string) => {
    chatService.loginUser(name)
      .then(serviceState => this.setState(state => { return { ...state, user: serviceState.user } }))
      .catch(error => alert(`Opps: $error`))

    //this.setState((state, props) => {
    // return {
    //    user: { name: name , avatar : state.user.avatar }
    //   }
    // })
  }
  addMessage = (channelId: string, question: string) => {
    const channelQuestion = this.state.channels.find(predicat_find_channel(channelId)) || channel
    const newQuestion = {
      id: channelId + "Q" + channelQuestion.questions.length,
      user: this.state.user,
      content: question,
      answers: [],
      points: 0
    }
    chatService.addQuestion(newQuestion, channelId)
      .then(channels => this.setState(state => { return { ...state, channels: channels } }))


    // const newQuestion = {
    //   id: channelId,
    //   content: question,
    //   answers: [],
    //   user: { name: "Anonymous", avatar: "?_?" }
    // }
    // this.setState((state, props) => {
    //   return {
    //     activeChannelId: { questions : [...state.questions, newQuestion] }
    //   }
    // })
  }


  answerQuestion = (channelId: string, questionId: string, content: string) => {
    const activechannel = this.state.channels.find(predicat_find_channel(channelId)) || channel
    const activequestion = activechannel.questions.find(predicat_find_question(questionId)) || question
    const newAnswer = {
      id: channelId + "Q" + activechannel.questions.length + "A" + activequestion.answers.length,
      user: this.state.user,
      content: content,
      points: 0
    }
    chatService.addAnswer(newAnswer, questionId, channelId)
      .then(channels => this.setState(state => { return { ...state, channels: channels } }))
  }

  toggleAnswerMode = (questionId: string) => {
    this.setState((state, props) => {
      return {
        activeQuestion: this.state.channel.questions.find(predicat_find_question(questionId)) || question
      }
    })
  }

  updateCurrentChannel = (channelId: string) => {
    this.setState((state, props) => {
      return {
        channel: this.state.channels.find(predicat_find_channel(channelId)) || channel,
        activeQuestion: question // reset activeQuestion
      }
    })
  }


  addPointQuestion = (question: Question) => {
    this.setState((state, props) => {
      return {
        activeQuestion: { ...state.activeQuestion, points: question.points + 1 }
      }
    })
  }
}

export default App;
