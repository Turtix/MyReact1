import React, { Component } from 'react';

import List from  './components/list';
import Search from  './components/search';

export default class App extends Component {
    render(){
        return(
            <div className="container">
                <Search />
                <List />
            </div>
        )
    }
}


