import {Container} from './hostConfig';
import {FiberNode, FiberRootNode} from './fiber';
import {HostRoot} from './workTag';
import {
	createUpdateQueue,
	createUpdate,
	enqueueUpdate,
	UpdateQueue
} from './updateQueue';
import {ReactElementType} from '../../shared/ReactType';
import {scheduleUpdateOnFiber} from './workLoop';
/**
 * ReactDom.createRoot(rootElement).render(<App/>)
 * 在mount的时候
 * createRoot()方法内部会执行creatContainer()
 * render()方法内部会执行updateContainer()
 */

/**
 *
 * @param container 挂载的根节点
 * @returns FiberRootNode
 */
export function creatContainer(container: Container): FiberRootNode {
	// 初始化一个hostRootFiber
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	// 创建updateQueue队列 为后面更新插入update使用
	hostRootFiber.updateQueue = createUpdateQueue();
	return root;
}

export function updateContainer(
	element: ReactElementType | null,
	root: FiberRootNode
) {
	// 从FiberRootNode中获取hostRootFiber
	const hostRootFiber = root.current;
	const update = createUpdate<ReactElementType | null>(element);
	// 插入一个ReactElement类型的update 到 updateQueue中
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);
	// 调度功能，串联renderRoot()方法，开始fiber的遍历
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
