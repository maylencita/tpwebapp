import * as React from 'react'
import { Link } from 'react-router-dom'

interface LoginFormState {
    userName: string
    //loginPass: string
}

interface LoginFormProps {
    onLogin: (name: string) => void
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    state: LoginFormState = {
        userName: 'Anonymous'
    }

    render() {
        return (
            <div className="newChannel">
                <div className="newChannel_content">
                    {<Link to="/" className="newChannel_close"> <span>X</span> </Link>}
                    <form onSubmit={this.handleOnSubmit}>
                        <h1>Login</h1>
                        <label>Username :</label>
                        <div className="inputWrapper">
                            <input
                                id="username"
                                placeholder="e.g. leads"
                                value={this.state.userName}
                                onChange={this.handleLogin}
                            />
                        </div>
                        <div className="newChannel_buttonsWrapper">
                            {<Link to="/" > <span>
                                <button className="cancel">Cancel</button>
                            </span> </Link>}
                            <button className="create">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }




    handleLogin = (event: any) => {
        this.setState({
            userName: event.target.value
        })
    }

    handleOnSubmit = (event: any) => {
        event.preventDefault(); //  evite que la page se recharge
        this.props.onLogin(this.state.userName);
    }
}

export default LoginForm