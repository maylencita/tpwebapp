import React from 'react';
import Home from './views/home'
import Messages from './views/messages'
import NewChannel from './views/newChannel'
import LoginForm from './views/login'
import { Channel, User } from './models'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom'

function f1(){}

function f2(){}

function f3(){}

function predicate (channelId:string|undefined) {
  return (value: Channel, index: number, obj: Channel[]) => {
    if (value.name == channelId) {
      return value;
    };
  }
}

const channel: Channel = {
  name: "this channel doesn't exist",
  questions: []
}

const user: User = {
  name: "Anonymous",
  avatar: "?_?"
}

type AppState = {
  channel: Channel
  channels: Array<Channel>
  user: User
}

type AppProps = {
  appName: string
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    channel: channel,
    channels: [],
    user: user 
  }

  render(){
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/messages/:channelId" children={<this.MessagesRoute />} />              
            <Route path="/newChannel" children={this.NewChannelRoute} />
            <Route path="/addUser" children={ this.HomeRoute } />
            <Route path="/login" children={ this.LoginRoute } />
            <Route path="/" children={ this.HomeRoute } />
          </Switch>
        </div>
      </Router>
    );
  }

  MessagesRoute = () => {
    let { channelId } = useParams();
    const activeChannel = this.state.channels.find(predicate(channelId)) || channel ;
    return <Messages onQuestionAsked={f1} onQuestionAnswered={f2} toggleAnswerMode={f3} {...this.state} {...this.props} activeChannel={activeChannel} />
  } 
  
  NewChannelRoute = () => {
    return <NewChannel onNewChannel={this.addChannel} />
  }

  HomeRoute = () => {
    return <Home onUpdateUser={this.addUser} {...this.state} {...this.props} />
  } 
  
  LoginRoute = () => {
    return <LoginForm onLogin={this.addUserName} />
  }

  addUserName = (name: string) => {
    const newUser = {
      name: name,
    }
  
    this.setState((state, props) => {
      return {
        user: newUser
      }
    })
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
