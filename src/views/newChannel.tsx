import * as React from 'react'
import { Link } from 'react-router-dom'

interface ChannelFormState {
  channelName: string
}

interface ChannelFormProps {
  onNewChannel: (name: string) => void
}

class NewChannelForm extends React.Component<ChannelFormProps, ChannelFormState> {

  state: ChannelFormState = {
    channelName: ''
  }

  render() {
    return (
      <div className="newChannel">
        <div className="newChannel_content">
          {<Link to="/" className="newChannel_close"> <span>X</span> </Link>}
          <form onSubmit={this.handleAddChannel}>
            <h1>Create a channel</h1>
            <label>Name</label>
            <div className="inputWrapper">
              <input
                id="channelName"
                placeholder="e.g. leads"
                value={this.state.channelName}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="newChannel_buttonsWrapper">
              {<Link to="/" > <span>
                <button className="cancel">Cancel</button>
              </span> </Link>}
              <button className="create">Create channel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }




  handleNameChange = (event: any) => {
    this.setState({
      channelName: event.target.value
    })
  }

  handleAddChannel = (event: any) => {
    this.props.onNewChannel(this.state.channelName)
    event.preventDefault();
  }
}

export default NewChannelForm