jsx

通过 babel 编译，最终是执行 react.jsx(createElement) 方法
jsx 方法最终返回 ReactElement 的数据结构

jsx 的执行顺序

- [x] DFS 深度优先遍历 ✔️
      BFS 广度优先遍历

React Element
有子节点，优先遍历子节点
如果没有子节点，遍历兄弟节点
如果都没有，返回父节点
