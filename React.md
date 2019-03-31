 ###使用React需要引入的库
    <script src="../js/react.development.js"></script>
    <script src="../js/react-dom.development.js"></script>
    <script src="../js/babel.min.js"></script>
    其中react是react-dom的依赖.
 ###创建虚拟DOM对象方式
   1.js语法(标签字符串) : 
       const vDom = '<h1>Hello React!</h1>'; 
       const vDom2 = React.createElement('h2',{id:'myId',className:'test1-h2'},'这是js语法的h2',子虚拟DOM对象);
        不需要引入babel库
   2.React jsx语法: 
       const vDom = <h1>Hello React!</h1>;  
       const content = '这是jsx语法的h2';
       const  id = 'myId2';
       const  vDom3 = <h2 id={id}>{content}<span>这是jsx的span</span></h2>;
       需要引入babel库,将jsx语法转化成为浏览器能够是别的语法.
   共同点及注意点: 
     类名需要用: className.
     要将script标签的将 text/javascript 改为 text/babel 才能生效
 ###React定义组件.
 注意: 1.组件名首字母必须大写.
           2.组件标签(所有js的标签)必须要有结束符.
                单标签  <xx  />    当组件沒内容时,用单标签
                双标签  <xx></xx>   当组件有内容时,可以用双标签
           3.组件内反悔的虚拟DOM对象,有且只有一个根元素.
               如果组件内有多个元素,需要在最外层包一个包裹元素.
 定义方式:
    方式1: 工厂函数组件(简单组件)   直接调用
    ```
    function MyComponent1 () {
      console.log(this) // undefined 严格模式,禁止this指向window,将指向window的this指向undefined.
      return <h2>工厂函数组件(简单组件)</h2>
    }
    ```
    
    方式2:  ES6类组件(复杂组件)   构造调用,自动在调用时创建实例对象.
    ```
    class MyComponent2 extends React.Component {
      render () {
        console.log(this) // MyComponent2的实例对象
        return (
            <div>
                <h2>ES6类组件(复杂组件)</h2>
                <input/>
            </div>
        );
      }
    }
    ```
 使用组件
    ReactDOM.render(<MyComponent1></MyComponent1>,document.getElementById('example1'));
    ReactDOM.render(<MyComponent2 />,document.getElementById('example2'));


###React组件三大属性1: state
   1.设置初始值
    用类的构造方法.  //参数props的作用,用来在constructor函数中操作this.props.
        constructor(props){
          super(props);
          this.state = {
            isLikeMe: false
          }
    可以简写: 不需要写类的构造方法.
           state = {
             isLikeMe: false
           }
    2.更新状态  (事件里面写)
     this.setState({
              isLikeMe: !isLikeMe
            })
    用來: 保存组件内的数据  和  更新界面数据.属于组件内
###React组件三大属性2: props
    //对属性进行必要性检查
      Person.propTypes = {
        name: PropTypes.string,
        age: PropTypes.number.isRequired,
        sex:PropTypes.string.isRequired
      };
    
      //为属性设置默认值
      Person.defaultProps = {
        name:'ccc'
      };
      
 简写方式如下:
          //对属性进行必要性检查
          static propTypes = {
            name: PropTypes.string,
            age: PropTypes.number.isRequired,
            sex:PropTypes.string.isRequired
          };
      
          //为属性设置默认值
          static defaultProps = {
            name:'ccc'
          };
    用来获取组件外的属性和方法. 属于组件外.
    接收数据和显示数据  组件内部只读不能修改
    //传递给组件
    ReactDOM.render(<Person age={person.age} sex={person.sex}/>,document.getElementById('example1'));
    //获取组件外,向组件内传递的标签属性
    const {name,age,sex} = this.props;
###React组件三大属性3: refs
/*
获取当前DOM元素:
方式一:   建议使用
      标签里面写ref属性:<input type="text" ref={this.xxx}/>
      结合:constructor(props){
            super(props);
        this.xxx = React.createRef();
      }
      在组件中可以通过this.createRef.current获取当前的DOM元素.
方式二:
    <input type="text" ref={(input)=>this.funcRef = input}/>&nbsp;&nbsp;
    在组件中可以通过: this.funcRef 获取当前的DOM元素.

方式三:   淘汰
      <input type="text" ref="stringRef"/>
      在组件中可以通过: this.refs.stringRef 获取当前的DOM元素.

清空数据:
    this.createRef.current.value = ''; //提示后清空数据. 
    注意不能用value = ''(清空的是变量的值不是DOM元素的属性值.).

*/
  用来: 获取DOM元素。


###
###脚手架
   cd 切换文件
   create-react-app  myreact
   npm  i  yarn  -g   下载yarn
   cd  myreact      切换到当前项目目录
   npm start    启动当前项目
删除yarn: 
   npm root -g   查看npm 目录
   C:\Users\18339\AppData\Roaming\npm\node_modules
   删除里面的yarn
   再在C:\Users\18339\AppData\Roaming\npm 中删除yarn.

###生命周期函数
   *初始化渲染: 
        执行顺序:
              constructor()
              componentWillMount()
              render()
              componentDidMount()
        函数作用:
            constructor()  构造方法   只在初始化渲染时调用一次
                1. 初始化state
                2. 初始化React.createRef()
                3. 绑定函数的this指向（过去用,现在不用）
            componentWillMount()   组件将要被挂载  只在初始化渲染时调用一次 (将废弃)
                将来的17版本将被标记为UNSAFE，在未来18版本直接被废弃
                这个函数一般没用
            render()  
                用来生成将要渲染的组件,但是组件还没有被渲染.
            componentDidMount()   组件已经被挂载.  只在初始化渲染时调用一次
                1. 发送ajax请求
                2. 设置异步任务 --> 绑定事件或者设置定时器等
   *更新渲染:
        函数有:  (执行顺序如下)
            componentWillReceiveProps()   组件将要接收props  (将废弃)
            shouldComponentUpdate(prevProps(之前接收的属性), nextState(现在的状态))       组件是否应该要更新       
                专门用来做React性能优化的：将之前的状态/属性和当前的状态/属性进行对比，如果一样，就不更新，如果不一样就更新
                        返回值为true就更新
                        返回值为false就不更新
                使用时必须要有一个返回值
            componentWillUpdate()         组件将要更新  (将废弃)
            render()        
            componentDidUpdate()          组件已更新
                可以获取更新后DOM元素，从而进行操作
        注意: 父组件render() 全都执行
              this.setState() 第一步不执行
              this.forceupdate() 是强制更新,第一,二步不执行
   *卸载:
         函数: componentWillUnmount   组件将要销毁
               做一些收尾工作：清除定时器、全局变量、取消ajax请求。。。
                  //清除组件的方法  从某个节点上卸载组件.
                  ReactDOM.unmountComponentAtNode(document.getElementById('example'))
