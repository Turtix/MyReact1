
import React,{Component} from 'react';
import CommentItem from "../comment-item";
import {subscribe} from 'pubsub-js';

export default class  ComponentList extends  Component{
    state = {
        comments:[
            {username:'aaa', content:'111',id:1},
            {username:'bbb', content:'222',id:2}
        ]
    }
    //删除评论信息
    delComment = (id)=>{
        this.setState({
            comments:this.state.comments.filter((item)=>{return item.id !== id})
        })
    }
    componentDidMount() {
        /*
      1. 不会影响初始化渲染速度
      2. 能够保证先订阅，再发布
      3. 保证订阅只能一次，发布可以多次
     */
        let  id = this.state.comments.length;
        subscribe('ADD_COMMENT', (msg,data) => {

            console.log(msg,data);
            //更新评论信息
            this.setState({
                comments:[{...data,id:++id},...this.state.comments]
            })
        });
    }
    render(){
        const {comments} = this.state;
        const isDisplay = comments.length ? 'none' : 'block';
        // console.log(comments)
        return (
            <div className="col-md-8">
                <h3 className="reply">评论回复：</h3>
                <h2 style={{display: isDisplay}}>暂无评论，点击左侧添加评论！！！</h2>
                <ul className="list-group">
                    {
                        comments.map((item)=><CommentItem comment={item} key={item.id} delComment={this.delComment}/>)
                    }
                </ul>
            </div>
        )
    }
}
