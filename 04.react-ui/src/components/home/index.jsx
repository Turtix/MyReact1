/*
   react模块
*/
import React from "react";
import  {Route,Redirect,Switch} from 'react-router-dom';
/*
   自定义模块
*/
import  MyNavLink from '../my-nav-link'
import  News from '../news';
import Message from "../message";
/*
   样式图片等其他资源
*/

export default function Home(){
        return (
            <div>
                    <h2>Home组件内容</h2>
                    <div>
                            <ul className="nav nav-tabs">
                                    <li><MyNavLink  to="/home/news">News</MyNavLink></li>
                                    <li><MyNavLink to="/home/message">Message</MyNavLink></li>
                            </ul>
                            <div>
                                 <Switch>
                                        <Route path="/home/news" component={News}/>
                                        <Route path="/home/message" component={Message}/>
                                        <Redirect to="/home/news"/>
                                 </Switch>

                            </div>
                    </div>
            </div>
        )
}


