 ###React中引入文件的顺序:
   1.通过npm下载的模块.
   2.自定义的js模块
   3.样式图片等其他资源
   这样写的原因是: 
      下面的模块可能会需要上面的模块作为依赖
      自定义的设置会覆盖默认的设置,确保自定义的内容能够生效.
 ###React组件
  展示组件内容
  Route: 一旦url变为path对应的值，就加载component中的组件进行显示
  Redirect: 什么路径都匹配，一旦匹配上就跳转到指定网址
  Switch: 切换显示（针对内部组件 - 子组件） --> 从上到下匹配，一旦有一个匹配上，其他就不看了
  
  通过Route加载的组件就是路由组件，路由组件默认有三个属性：history、location、match
###路由组件三大属性
    history:
    location:
    match:


###find  
   filter
   map
   reduce
   
