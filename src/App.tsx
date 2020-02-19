import React from 'react';
import Home from './views/home'
import Messages from './views/messages'
import NewChannel from './views/newChannel'
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

const channel: Channel = {
  name: "channel 1",
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
            <Route path="/" children={ this.LoginRoute } />          
          </Switch>
        </div>
      </Router>
    );
  }

  MessagesRoute = () => {
    let { channelId } = useParams();
    return <Messages onQuestionAsked={f1} onQuestionAnswered={f2} toggleAnswerMode={f3} {...this.state} {...this.props} />
  } 
  
  NewChannelRoute = () => {
    return <NewChannel onNewChannel={this.addChannel} />
  }

  HomeRoute = () => {
    return <Home onUpdateUser={this.addUser} {...this.state} {...this.props} />
  } 
  
  LoginRoute = () => {
    return <Home onUpdateUser={this.addUser} {...this.state} {...this.props} />
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
