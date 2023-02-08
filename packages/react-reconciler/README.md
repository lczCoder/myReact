协调器：用于区分哪些元素状态发生了变化，并且调用渲染方法对其更新 UI

需要一个特殊的数据结构，介于 ReactElement 和真实 Dom 之间
特点：

- 能表达当前元素的一个状态
- 能关联其父子或者兄弟元素 (能表达不同 dom 节点之间的关系)
- 有良好的扩展性

FiberNode (虚拟 dom 在 react 中的实现， vue 中是 VNode)

jsx | React Element | FiberNode | Dom Element

current FiberNode <===> workInProgress

<!--  -->

组件如何触发更新？
两种情况

- 一种是组件在 mount 的时候
- 一种是组件在 update 的时候

更新可能发生在任意组件，而更新的流程是从根节点进行递归的
需要一个根节点来保存通用的信息

## mount

首屏渲染中，需要完成以下事件
1、根据 FiberRootNode 生成对应的 WorkInProgress Tree
2、给需要更新视图的节点，打上 flag 标记

<!-- 不包含属性变化相关，只看结构是否发生变化 -->

placement
插入 a->ab abc->bca

childDeletion
删除 ul>li*3 -> ul>li*2

<!-- 属性相关的变化 -->

update
更新 <div key='a'></div> -> <div key='b'></div>

HostRoot beginWork
1、计算状态的最新值
2、创建子 fiberNode

HostComponent beginWork
1、创建子 fiberNode

HostText beginWork() 不做任何操作，直接返回执行 completeWork()

创建子 fiberNode 节点，需要比较 current FiberNode 和 子 ReactElement

<A>
  <B/>
</A>
// 当进入A的beginWork()的时候，比较B current fiberNode 和 B的 ReactElement 
生成B对应的wip fiberNode
