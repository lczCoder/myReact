import {Props, Key, Ref} from 'shared/ReactType';
import {WorkTag} from './workTag';
import {Flags, NoFlags} from './fiberFlags';
import {Container} from 'hostConfig';

export class FiberNode {
	tag: WorkTag;
	key: Key;
	type: any;
	ref: Ref;
	pendingProps: Props;
	stateNode: any;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	memoizedProps: Props | null;
	memoizedState: any;
	alternate: FiberNode | null;
	flags: Flags;
	updateQueue: unknown;
	/**
	 *
	 * @param tag fiberNode节点的标签 每个类型有对应的值
	 * @param pendingProps fiberNode当前props
	 * @param key key
	 */
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag; // 对应不同fiberNode的类型数值
		this.key = key;
		this.stateNode = null; // <div></div>  stateNode = div
		this.type = null; // fn组件的type ()=>{} 的内容
		this.ref = null;

		/************** 构成fiberNode树状结构的属性 ******************/
		// 指向父节点的fiberNode
		this.return = null;
		// 指向兄弟节点的fiberNode
		this.sibling = null;
		// 指向子节点的fiberNode
		this.child = null;
		// 同级fiber节点中的位置索引
		this.index = 0;

		/************** 构成fiberNode工作单元的属性 ******************/
		this.pendingProps = pendingProps; // 初始props
		this.memoizedProps = null; // 最终props
		this.memoizedState = null; // 更新队列消费状态值
		this.updateQueue = null; // 更新队列

		this.alternate = null; // fiber双缓存树，指向对方
		// current.alternate = workInProgress  workInProgress.alternate = current

		/************** 副作用 ******************/
		this.flags = NoFlags; // fiber执行dom操作的标记符
	}
}
/**
 * @description 最顶层fiber根节点
 */
export class FiberRootNode {
	container: Container; // 挂载容器 dom环境下 <div id="app"></div>
	current: FiberNode; // 指向根fiberNode
	finishedWork: FiberNode | null; // 指向更新完成的hostRootFiber
	/**
	 * @param container
	 * @param hostRootFiber
	 */
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

/**
 * @desc 创建工作单元  连接双缓存fiber树
 * @param current
 * @param pendingProps
 * @returns
 */
export function createWorkInProgress(
	current: FiberNode,
	pendingProps: Props
): FiberNode {
	// 判断是否存在WorkInProgress树
	let wip = current.alternate;
	// 首屏渲染时候，fiber双缓存 WorkInProgress树为空
	if (wip === null) {
		// mount阶段
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.stateNode = current.stateNode;
		// 建立双缓存fiber树的连接 互相指向
		wip.alternate = current;
		current.alternate = wip;
	} else {
		// update更新props数据
		wip.pendingProps = pendingProps;
		// 移除副作用状态
		wip.flags = NoFlags;
	}
	// 同步双缓存树公用属性和状态
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedProps = current.memoizedProps;
	wip.memoizedState = current.memoizedState;

	return wip;
}
