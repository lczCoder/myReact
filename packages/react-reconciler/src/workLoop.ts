import {FiberNode} from './fiber';
import {beginwork} from './beginWork';
import {completeWork} from './completeWork';

let workInProgress: FiberNode | null = null;

function renderRoot(unitOfWork: FiberNode) {
	prepareRefreshStack(unitOfWork); // 初始化方法
	do {
		try {
			workLoop();
			break;
		} catch (error) {
			console.error('workLoop执行错误，错误原因：', error);
			workInProgress = null;
		}
	} while (true);
}

// 初始化把workInProgress指向要递归的fiberNode 根节点
function prepareRefreshStack(root: FiberNode) {
	// fiberNode root 赋值给workInProgress
	workInProgress = root;
}

function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

// 执行工作单元 遍历子节点
function performUnitOfWork(fiber: FiberNode) {
	// next 为当前fiberNode的子fiber节点 | null
	const next = beginwork(fiber);
	fiber.memoizedProps = fiber.pendingProps; // 当前节点执行完毕，更改工作单元状态
	if (next === null) {
		// 无子节点
		completeUnitOfWork(fiber);
	} else {
		// 把当前工作单元替换成子节点继续遍历
		workInProgress = next;
	}
}

// 遍历兄弟节点
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;
		// 存在兄弟节点 继续遍历兄弟节点 替换当前的工作单元为兄弟节点
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		// 返回当前fiberNode的父节点，替换当前的工作单元为父节点
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
