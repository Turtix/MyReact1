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
           3.组件内返回的虚拟DOM对象,有且只有一个根元素.
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
    可以简写为: 不需要写类的构造方法.
           state = {
             isLikeMe: false
           }
    2.更新状态  
     this.setState({
          isLikeMe: !isLikeMe
     })
    属于组件内,用來: 保存组件内的数据  和  更新界面数据.
    
    原理：用户界面要发生变化，就更新state，导致组件重新渲染，从而更新页面
###React组件三大属性2: props
    *1.接收数据者,对属性进行必要性检查
      Person.propTypes = {
        name: PropTypes.string,
        age: PropTypes.number.isRequired,
        sex:PropTypes.string.isRequired
      };
    
    *2.接收数据者,为属性设置默认值
      Person.defaultProps = {
        name:'ccc'
      };
      
    *简写方式如下:
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
    
    *3.传递给组件
        ReactDOM.render(<Person age={person.age} sex={person.sex}/>,document.getElementById('example1'));
        注意 : age={person.age} sex={person.sex}  可以简写成{...person}
              这一过程是由babel帮助对象识别三点运算符语法
    *4.获取组件外,向组件内传递的标签属性
        const {name,age,sex} = this.props;
    
    用来: 获取组件外的属性和方法. 属于组件外.
         组件内接收数据和显示数据     组件内部只读不能修改
###React组件三大属性3: refs
获取当前DOM元素:
方式一:   建议使用
      标签里面写ref属性:<input type="text" ref={this.xxx}/>
      组件内部结合:constructor(props){
            super(props);
        this.xxx = React.createRef();
      }
      在组件中可以通过this.xxx.current获取当前的DOM元素.通过this.xxx.current.value获取当前DOM元素的内容.  
方式二:  
    标签里面写ref属性:<input type="text" ref={(input)=>this.funcRef = input}/>&nbsp;&nbsp;
    在组件中可以通过: this.funcRef 获取当前的DOM元素.

方式三:   淘汰
      标签里面写ref属性:<input type="text" ref="stringRef"/>
      在组件中可以通过: this.refs.stringRef 获取当前的DOM元素.

清空数据:
    this.xxx.current.value = ''; //提示后清空数据. 
    注意不能用:
        const value = this.xxx.current.value;
        value = ''(清空的是变量的值不是DOM元素的属性值.).
  用来: 获取DOM元素。
  
###受控和非受控组件组件
   非受控组件: 直接用resf收集表单数据. 官网不推荐直接操作DOM元素.
   受控组件(专门用来收集表单数据的): 
        用state状态来保存组件内的数据,通过输入框的onChange事件来更新状态值.
        注意: 不要在回调函数中写箭头函数，它会每次渲染时重新创建新的函数，性能不好.
        需要用到高阶函数(返回值是函数的函数): 外层函数传递参数  内层函数才是真正的事件回调(用到闭包).
   禁止表单的默认行为
       先给form表单绑定事件:onSubmit,再用 e.preventDefault();\
       
###jsx语法
 注释: {*多行注释*}
       //单行注释
 样式写法:
       {{opacity:1,marginTop:10}}   //驼峰命名法
 constructor属性作用: 用来在constructor 函数中操作this.props.
 
###生命周期函数
   *初始化渲染: 
   ```
        执行顺序:
              constructor()
              componentWillMount()
              render()
              componentDidMount()
        函数作用:
            constructor()  构造方法                   只在初始化渲染时调用一次
                1. 初始化state
                2. 初始化React.createRef()
                3. 绑定函数的this指向（过去用,现在不用）
            componentWillMount()   组件将要被挂载      只在初始化渲染时调用一次 (将废弃)
                将来的17版本将被标记为UNSAFE，在未来18版本直接被废弃
                这个函数一般没用
            render()  
                用来生成将要渲染的组件,但是组件还没有被渲染.
            componentDidMount()   组件已经被挂载.      只在初始化渲染时调用一次
                1. 发送ajax请求
                2. 设置异步任务 --> 绑定事件或者设置定时器等
   ```
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

###diff算法
*diff 策略
    *Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
    *拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
    *对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。
*diff算法: 
    React 分别对 tree diff(树)、component diff(组件) 以及 element diff(元素) 进行算法优化.
    对树进行分层比较，两棵树只会对同一层次的节点进行比较。
    会创建一个新树和一个旧树,新树和旧树之间进行比较,只比较相同的节点,不同的节点不比较,
        如果发生改变了,就标记这个节点,等全部对比完后,再只更新这个节点,其他的节点不更新.
*原理: 
    初始化显示界面:
        创建虚拟DOM树-->真实DOM树-->绘制界面显示
    更新界面:
        setState()更新状态-->重新创建虚拟DOM树-->新/旧树比较差异-->更新差异对应的真实DOM树-->局部界面重绘.
*总结
    React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；
    React 通过分层求异的策略，对 tree diff 进行算法优化；
    React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
    React 通过设置唯一 key的策略，对 element diff 进行算法优化；(所以在遍历生成li时必须要加上唯一的key值)

###应注意保持稳定的 DOM 结构
    不要频繁的操作DOM   
        1.尽量使用受控组件(state)  少用非受控组件(refs).
        2.尽量减少类似将最后一个节点移动到列表首部的操作 (元素的下标变了 会导致所有元素都被重新渲染).
        3.当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。
        
###key值问题
    id作为key:  
    index作为key: 
    问题: 为什么列表的key尽量不要用index
       http://jsbin.com/wohima/edit?js,output
       http://taobaofed.org/blog/2016/08/24/react-key/?utm_source=tuicool&utm_medium=referral
       简单来说: 当数组中的数据发生变化时: React 比较更新前后的元素 key 值，
       如果相同则更新，如果不同则销毁之前的，重新创建一个元素
    
       结论：
        如果今后需要往数组最前面插入数据，必须用id作为key的值，
        如果不是，而是往最后追加，可以用index作为key的值，（如果数据中有id属性，就用id）
        
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
   
### 声明式和命令式
* 声明式编程：类似于填空题，调用某个方法得出答案
  * 举个栗子：我们调用arr.sort()直接就排序好了，这种叫声明式编程
* 命令式编程：类似于简答题，需要详细的过程解出答案
  * 举个栗子：我们手写两层for循环的冒泡排序，每一个过程都进行控制，这种叫命令式编程

### this指向问题
* 函数直接调用，this指向window（如果是严格模式，是undefined）
* 隐式调用，指向调用它的对象
* 显示调用，call/apply/bind 指向传入第一个参数
* new 调用，指向新创建的实例对象
* 回调函数
  * 事件回调函数 this指向被绑定事件的DOM对象
  * 普通回调函数（定时器，map）：this指向window（如果是严格模式，是undefined）
* 箭头函数：指向离他最近的包裹它的函数的this，如果没有就是window
* 框架中的生命周期函数
  * 生命周期函数this指向组件的实例对象
  * 其他自定义函数this指向undefined  
* 基本class中方法，this指向实例对象


