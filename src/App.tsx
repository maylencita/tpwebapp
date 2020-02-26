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

function f2() { }

function f3() { }

const chatService = new HttpService()

const channel: Channel = {
  name: "channel 1",
  questions: []
}

type AppState = {
  channel: Channel
  channels: Array<Channel>
  user: User
  question: Question
  activeChannelId: string
}

type AppProps = {
  appName: string
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    channel: channel,
    channels: [],
    user: { name: "Anonymous", avatar: "?_?" },
    question: { answers: [], content: "", id: "", user: { avatar: "", name: "" } },
    activeChannelId: "No active channel"
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
    return <Messages onChannelLinkClicked={this.updateCurrentChannel} onQuestionAsked={this.addMessage} onQuestionAnswered={f2} toggleAnswerMode={f3} {...this.state} {...this.props} />
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
  addMessage = (channelId: String, question: String) => {

    const newQuestion = {
      id: channelId,
      content: question,
      answer: [],
      user: { name: "Anonymous", avatar: "?_?" }
    }
    //this.setState((state, props) => {
    //  return {
    //    question : newQuestion
    //  }
    //})
  }
  updateCurrentChannel = (channelId: string) => {
    this.setState((state, props) => {
      return {
        activeChannelId: channelId
      }
    })
  }
}

export default App;
