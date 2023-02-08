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


