/*
    通过npm下载的模块.
*/
import React, { Component } from 'react';

import { Button } from 'antd';


export default class App extends Component {
    render(){
        return(
            <div>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
            </div>
        )
    }
}


