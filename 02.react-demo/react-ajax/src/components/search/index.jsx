import React,{Component} from "react";
import  {publish} from 'pubsub-js';

export default class Search extends Component{
    state = {
        searchName:''
    }
    change = (e)=>{
        this.setState({
            searchName:e.target.value
        })
    }
    search = ()=>{
        publish('SEARCH',this.state.searchName);
    }
    render(){
        return(
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input type="text" placeholder="enter the name you search" onChange={this.change}/>
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}


