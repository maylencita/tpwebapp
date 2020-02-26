import React from 'react';
import Home from './views/home'
import Messages from './views/messages'
import NewChannel from './views/newChannel'
import Login from './views/login'
import { Channel, User } from './models'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom'

import ChatService from './httpService';

function f1(){}

function f2(){}

function f3(){}

const channel: Channel = {
  name: "channel 1",
  questions: []
}

type AppState = {
  channel: Channel
  channels: Array<Channel>
  user?: User
  activeChannelId?: string
}

type AppProps = {
  appName: string
}

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    channel: channel,
    channels: []
  }

  render(){
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/messages/:channelId" children={<this.MessagesRoute />} />              
            <Route path="/newChannel" children={this.NewChannelRoute} />
            <Route path="/login" children={this.LoginRoute} />
            <Route path="/" children={ this.HomeRoute } />          
          </Switch>
        </div>
      </Router>
    );
  }

  MessagesRoute = () => {
    let { channelId } = useParams();
    return <Messages 
      onChannelLinkClicked={this.updateCurrentChannel} 
      onQuestionAsked={f1} 
      onQuestionAnswered={f2} 
      toggleAnswerMode={f3} 
      {...this.state} 
      {...this.props} 
    />
  } 
  
  NewChannelRoute = () => {
    return <NewChannel onNewChannel={this.addChannel} />
  }

  HomeRoute = () => {
    return <Home 
      onChannelLinkClicked={this.updateCurrentChannel} 
      onUpdateUser={(user: User) => {}} 
      {...this.state} 
      {...this.props} 
    />
  } 
  
  LoginRoute = () => {
    return <Login 
      onChannelLinkClicked={this.updateCurrentChannel} 
      onLogin={this.handleLogin} 
      {...this.state} 
      {...this.props} 
    />
  }

  //==============
  chatService = new ChatService()

  addChannel = (name: string) => {
    const newChannel = {
      name: name,
      questions: []
    }
  
    // this.setState((state, props) => {
    //   return {
    //     channels: [...state.channels, newChannel]
    //   }
    // })
    this.chatService.addChannel(newChannel)
    .then(channels => this.setState(state => ({...state, channels})))
    .catch(error => error.error ? alert(`Opps: ${error.error}`) : alert(`Unexpected error: $error`) )
  }

  // Default user name is "Admin"
  handleLogin = (username: string) => {
    // this.setState(state => {
    //   return {...state, user: { name: username }}
    // })
    this.chatService.loginUser(username)
    .then(serviceState => this.setState(state => {
      return {...state, user: serviceState.user, channels: serviceState.channels}
    }))
    .catch(error => error.error ? alert(`Opps: ${error.error}`) : alert(`Unexpected error: $error`) )
  }

  updateCurrentChannel = (channelId: string) => {
    this.setState(state => {
      return {...state, activeChannelId: channelId }
    })
  }
   
}

export default App;
