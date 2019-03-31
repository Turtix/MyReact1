import React,{Component} from "react";
import ProtoTypes from 'prop-types';
import  axios from 'axios';

let isSearching =  false  // 代表正在搜索中

export default class List extends Component{
    static protoTypes = {
        searchName: ProtoTypes.string.isRequired
    }
    state = {
        status:0,  //0  初始化,1  loading状态,2  成功状态,3  失败状态.
        arr:[],
        error:''
    }
    //静态方法没有this.
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.searchName && !isSearching) {
            isSearching = true;
            return {status:1};
        }else{
            return null;
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const {searchName} = this.props;
        if(prevProps.searchName !== searchName ){
            axios.get(`https://api.github.com/search/users?q=${searchName}`)
                .then(res=>{
                    // 更新状态
                    if(res.data.items !==[]){
                        this.setState({
                            status:2,
                            arr: res.data.items.map((item) => {
                                return {
                                    name: item.login,
                                    url: item.html_url,
                                    image: item.avatar_url
                                }
                            },() => {
                                // 会在渲染完成后重新调用  setState的第二个参数,当setState第一个参数执行完就会执行它.
                                isSearching = false;
                            })
                        })
                    }
                })
                .catch(err=>{
                    console.log(err);
                    this.setState({status:3,error:err},() => {
                        // 组件渲染完毕后才调用，不能再重新更新状态，所以定义成变量
                        isSearching = false;
                    })
                })
        }
    }

    render(){
        const { status,arr,error } = this.state;
        switch(status){
            case 0:
                return <h2>enter name to search</h2>;
            case 1:
                return <h2>Loading...</h2>;
            case 2:
                return (
                    <div className="row">
                        {
                            arr.map((item, index) => {
                                return <div className="card" key={index}>
                                    <a href={item.url} rel="noopener noreferrer">
                                        <img src={item.image} style={{width: 100}} alt='1'/>
                                    </a>
                                    <p className="card-text">{item.name}</p>
                                </div>
                            })
                        }
                    </div>
                );
            case 3:
                // 对象不能直接输出
                return <h2>{error.toString()}</h2>;
            default:break;
        }
    }
}


