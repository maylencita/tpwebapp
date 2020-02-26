import * as React from 'react'
import { Link } from 'react-router-dom'

import ChannelSidebar from '../components/channelsSidebar'
import { User, Channel } from '../models'

interface LayoutProps {
  appName: string
  children?: React.ReactNode
  user?: User
  channels: Array<Channel>
  activeChannel?: Channel
}

const layout = (props: LayoutProps) => {
  return (
    <div className="container">
      <div className="top_nav">
        <div className="app_title">
        <a href="/"><h1>{props.appName}</h1> </a>
          {
            (props.user && <div> [<span>{props.user.avatar}</span>] <span>{props.user.name}</span></div>) ||
          <div>[?_?] Anonymous</div> 
          }
        </div>
        <div className="chanel_header">
          {
            (props.activeChannel && <h2># <span>{props.activeChannel.name}</span></h2>) ||
            <h2># No active channel</h2>
          }
          
        </div>
      </div>
      <div className="sidebar">
        <ChannelSidebar {...props}/>
      </div>
      <div className="primary_view">
        <div className="primary_view_container">
          {props.children}
        </div>
      </div>
    </div>    
  )
}

export default layout;