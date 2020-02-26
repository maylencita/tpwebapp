import * as React from 'react'

import Layout from './layout'
import Input from '../components/messageInput'
import { User, Channel } from '../models'
import { Link } from 'react-router-dom';

interface LoginProps {
  user?: User,
  appName: string,  
  channels: Array<Channel>
  onLogin: (username: string) => void
  onChannelLinkClicked: (channelId: string) => void
}

type HomeState = {
  name: string
};

class home extends React.Component<LoginProps, HomeState> {
  state: HomeState = this.props.user ? {...this.props.user} : {
    name: ''
  }

  render() {
    return (
      <Layout {...this.props}>
        <div className="homeView">
          <Link to="/messages" className="newChannel_close"> <span>X</span> </Link>
          <form onSubmit={this.updateUser}>
            <h3> WELCOME TO {this.props.appName} </h3>

            <h2>What is your name ?</h2>
            <Input placeholder="your name" className="name" value={this.state.name} onChange={this.changeUserName} />

            <div className="home_buttonsWrapper">
              <button type="submit">Let's Go!</button>
            </div>
          </form>
        </div>
      </Layout>
    )
  }

  updateUser = (event: any) => {
    event.preventDefault();

    this.props.onLogin(this.state.name);
  }

  changeUserName = (name: string) => {
    this.setState({
      name
    })
  }

}

export default home