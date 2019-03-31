import React,{Component} from 'react';
import PropTypes from 'prop-types';
export  default  class AddComment  extends Component{
    state = {
        username:'',
        content:''
    }
    static  protoTypes = {
        updateComponent: PropTypes.func.isRequired
    }
    addComment = ()=>{
        //收集表单数据
        const {username,content} = this.state;
        if(!username || !content){
            alert('用户名或密码不能为空!');
            return ;
        }
        //添加评论
        const {updateComponent} = this.props;
        updateComponent({username,content});
        //清空表单数据
        this.setState({
            username:'',
            content:''
        })
    }
    change = (name)=>{
        return (e)=>{
            this.setState({
                [name]: e.target.value
            })

        }
    }
    render(){
        const {username,content} = this.state;
        return (
            <div className="col-md-4">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label>用户名</label>
                        {/* 为了在清空状态的同时,清空表单数据,需要给表单添加属性value={状态属性的值} */}
                        <input type="text" className="form-control" placeholder="用户名" value={username} onChange={this.change('username')}/>
                    </div>
                    <div className="form-group">
                        <label>评论内容</label>
                        <textarea className="form-control" rows="6" placeholder="评论内容" value={content} onChange={this.change('content')}></textarea>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" className="btn btn-default pull-right" onClick={this.addComment}>提交</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
