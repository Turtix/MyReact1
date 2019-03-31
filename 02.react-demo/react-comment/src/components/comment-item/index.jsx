import React,{Component} from 'react';
import PropTypes from "prop-types";
export  default  class CommentItem  extends Component{
    static propTypes={
        comment:PropTypes.object.isRequired,
        delComment:PropTypes.func.isRequired
    }

    del = ()=>{
        const {id,username} = this.props.comment;
        //判断是否确认要删除
        if(window.confirm(`你确定要删除${username}的评论吗?`)){
            this.props.delComment(id);
        }
    }
    render(){
        const {comment:{username,content}} = this.props;
        return (
            <li className="list-group-item">
                <div className="handle">
                    <button onClick={this.del}>删除</button>
                </div>
                <p className="user"><span>{username}</span><span>说:</span></p>
                <p className="centence">{content}</p>
            </li>
        )
    }
}
