import * as React from 'react'
import { Link } from 'react-router-dom'
import { Channel } from '../models'

interface ChannelProps {
  channels: Array<Channel>
  onChannelLinkClicked: (channelId: string) => void
}

export default class ChannelSidebar extends React.Component<ChannelProps, {} > {

  render() {
    return (
      <div className="sideBar_channels">
        <h2 className="sideBar_channels_title">
          Channels <Link to="/newChannel"> <button className="addButton sideBar_channels_add">+</button></Link>
        </h2>
        <ul>
        {
          this.props.channels.map(this.renderChannelLink)
        }
        </ul>
      </div>  
    )
  }

  renderChannelLink = (channel: Channel, index: number) => {
    return (
      <li key={index}>
        <Link to={`/messages/${channel.name}`} className="sideBar_channel sideBar_channels_link" key={index} onClick={this.updateActiveChannel(channel)}> # {channel.name} </Link>
      </li>
    )
  }

  updateActiveChannel = (channel: Channel) => (event: any) => {
    this.props.onChannelLinkClicked(channel.name)
  }  
 }