import React, { Component } from 'react';

import AddComment from './components/add-comment';
import CommentList from './components/comment-list';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments:[
               {username:'aaa', content:'111',id:1},
               {username:'bbb', content:'222',id:2}
               ]
        }
    }
    //更新评论信息
    updateComponent = (comment) => {
        const { comments } = this.state;
        this.setState({
            comments:[{...comment,id:comments.length+1},...comments]
        })
    }
    //删除评论信息
    delComment = (id)=>{
        this.setState({
            comments:this.state.comments.filter((item)=>{return item.id !== id})
        })
    }
  render() {
    const {comments} = this.state;

    return (
        <div>
            <header className="site-header jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1>请发表对React的评论</h1>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <AddComment updateComponent={this.updateComponent}/>
                <CommentList comments={comments} delComment={this.delComment}/>
            </div>
        </div>
    )
  }
}


