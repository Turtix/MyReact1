import React,{Component} from "react";
import {Route,Link} from 'react-router-dom';

import MessageDetial from '../message-detial';

export default  class  Message  extends Component{
    state = {
        messages :[]
    }
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                messages :[
                    {id: 1, message: 'message001'},
                    {id: 3, message: 'message003'},
                    {id: 4, message: 'message004'}
                    ]
            })
        },1000)
    }
    push = (path)=>{
        return ()=>{
            this.props.history.push(path);
        }
    };
    replace = (path)=>{
        return () => {
            this.props.history.replace(path);
        }
    };
    goForward = ()=>{
        this.props.history.goForward();
    }
    goBack = ()=>{
        this.props.history.goBack();
    }
    render (){
        const  {messages} = this.state;
      return (
          <div>
              <ul>
                  {
                      messages.map((item )=>{
                          const  path = `/home/message/${item.id}`;
                          return (
                              <li key={item.id}>
                                  <Link  to={path}>{item.message}</Link>&nbsp;
                                  <button onClick={this.push(path)}>push</button>  &nbsp;
                                  <button onClick={this.replace(path)}>replace</button>
                              </li>

                          )
                      })
                  }
              </ul>
              <button onClick={this.goForward}>前进</button>
              <button onClick={this.goBack}>后退</button>
              <Route path="/home/message/:id" component={MessageDetial}/>
          </div>

      )
    }
}
