import * as React from 'react'
import { Link } from 'react-router-dom'

interface LoginFormState {
  userName: string
}

interface LoginFormProps {
  onLogin: (name: string) => void
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

  state: LoginFormState = {
    userName: ''
  }
  
  render() {
    return (
      <div className="newChannel">
        <div className="newChannel_content">
          <Link to="/" className="newChannel_close"> <span>X</span> </Link>
          <form onSubmit={this.handleOnSubmit}>
            <h1>Login</h1>
            <label>User name</label>
            <div className="inputWrapper">
              <input 
                id="channelName" 
                placeholder="e.g. leads" 
                value={this.state.userName}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="newChannel_buttonsWrapper">
              <Link to="/"> <button className="cancel">Cancel</button> </Link>
              <button className="create">Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  handleNameChange = (event: any) => {
    this.setState({
      userName: event.target.value
    })
  }

  handleOnSubmit = (event: any) => {
    event.preventDefault();
    this.props.onLogin(this.state.userName)
  }
}

export default LoginForm