import {FiberNode} from './fiber';
import {HostRoot, HostComponent, HostText} from './workTag';
import {UpdateQueue, processUpdateQueue} from './updateQueue';
import {ReactElementType} from '../../shared/ReactType';

export function beginwork(wip: FiberNode) {
	// 递归比较：返回子节点的fiberNode对象
	switch (
		wip.tag // 判断是哪一类fiber节点
	) {
		case HostRoot: // 挂载根元素
			return updateHostRoot(wip);
		case HostComponent: // 挂载根组件
			return updateRootComponent(wip);
		case HostText: // 根文本元素
			return null;
		default:
			if (__DEV__) {
				console.warn('beginWork无法处理当前类型');
			}
	}
}

function updateHostRoot(wip: FiberNode) {
	/*
	 *  1、计算状态的最新值
	 *	2、创建子 fiberNode
	 */
	const baseState = wip.memoizedState; // 首屏渲染为 null
	const updateQueue = wip.updateQueue as UpdateQueue<Element>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null; // 清除之前的状态（后面计算完成进行重新赋值）
	const {memoizedState} = processUpdateQueue(baseState, pending); // 计算最新状态
	// update 是一个ReactElement类型 所以返回的memoizedState就是传入的ReactElemnt
	wip.memoizedState = memoizedState; // 赋值最新状态

	const nextChildren = wip.memoizedState;
	reconcileChildren(wip, nextChildren);
	return wip.child;
}

function updateRootComponent(wip: FiberNode) {
	const nextProps = wip.pendingProps;
	const nextChildren = nextProps.children;
	reconcileChildren(wip, nextChildren);
	return wip.child;
}

function reconcileChildren(wip: FiberNode, children?: ReactElementType) {
	const current = wip.alternate;

	reconcileChildFibers(wip, current?.child, children);
}

// 生成fiberNode
function reconcileChildFibers(
	wip: FiberNode,
	child: any,
	children: ReactElementType | undefined
) {
	console.log(wip, child, children);
}
