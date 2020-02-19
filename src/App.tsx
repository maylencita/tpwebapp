import React from 'react';
import Home from './views/home'
import Messages from './views/messages'
import NewChannel from './views/newChannel'
import { Channel, User, Question } from './models'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom'
import { stat } from 'fs';
import answer from './components/answer';

function f1() { }

function f2() { }

function f3() { }

const channel: Channel = {
  name: "channel 1",
  questions: []
}

type AppState = {
  channel: Channel
  channels: Array<Channel>
  user: User
  question: Question
}

type AppProps = {
  appName: string
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    channel: channel,
    channels: [],
    user: { name: "Anonymous", avatar: "?_?" },
    question: { answers: [], content: "", id: "", user: { avatar: "", name: "" } }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/messages/:channelId" children={<this.MessagesRoute />} />
            <Route path="/newChannel" children={this.NewChannelRoute} />
            <Route path="/addUser" children={this.HomeRoute} />
            <Route path="/" children={this.LoginRoute} />
          </Switch>
        </div>
      </Router>
    );
  }

  MessagesRoute = () => {
    let { channelId } = useParams();
    return <Messages onQuestionAsked={this.addMessage} onQuestionAnswered={f2} toggleAnswerMode={f3} {...this.state} {...this.props} />
  }

  NewChannelRoute = () => {
    return <NewChannel onNewChannel={this.addChannel} {...this.state} {...this.props} />
  }

  HomeRoute = () => {
    return <Home onUpdateUser={this.updateUser} {...this.state} {...this.props} />
  }

  LoginRoute = () => {
    return <Home onUpdateUser={this.updateUser} {...this.state} {...this.props} />
  }

  addChannel = (name: string) => {
    const newChannel = {
      name: name,
      questions: []
    }

    this.setState((state, props) => {
      return {
        channels: [...state.channels, newChannel]
      }
    })
  }

  updateUser = (user: User) => {
    this.setState((state, props) => {
      return {
        user: user
      }
    })
  }
  addMessage = (channelId: String, question: String) => {
    const newQuestion = {
      id: channelId,
      content: question,
      answer : [],
      user :{ name: "Anonymous", avatar: "?_?" }
    }

    //this.setState((state, props) => {
    //  return {
    //    question : newQuestion
    //  }
    //})
  }
}

export default App;
