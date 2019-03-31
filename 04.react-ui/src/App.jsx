/*
    通过npm下载的模块.
*/
import React, { Component } from 'react';
import {Switch,Route,Redirect } from 'react-router-dom';

/*
    自定义的js模块
*/
import About from "./components/about";
import Home from "./components/home";
import MyNavLink from "./components/my-nav-link";

/*
    样式图片等其他资源.
*/


export default class App extends Component {
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header"><h2>React Router Demo</h2></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2 col-xs-offset-2">
                        <div className="list-group">
                            <MyNavLink  to="/about">About</MyNavLink>
                            <MyNavLink  to="/home">Home</MyNavLink>
                            {/*<a className="list-group-item" href="javascript:">About</a>
                            <a className="list-group-item" href="javascript:">Home</a>*/}
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <div className="panel-body">
                                <Switch>
                                    <Route path="/about" component={About}/>
                                    <Route path="/home" component={Home}/>
                                    <Redirect to="/about" />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


