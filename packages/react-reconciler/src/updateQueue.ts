import {Action} from 'shared/ReactType';

export type Update<State> = {
	action: Action<State>;
};

export type SharedQueue<State> = {
	pending: Update<State> | null;
};

export type UpdateQueue<State> = {
	shared: SharedQueue<State>;
};

/**
 * @description 创建update实例
 * @param {Action<State>} action
 * @returns
 */
export function createUpdate<State>(action: Action<State>): Update<State> {
	return {
		action
	};
}

/**
 * @description 创建updateQuene实例
 * @returns
 */
export function createUpdateQueue<State>(): UpdateQueue<State> {
	return {
		shared: {
			pending: null
		}
	} as UpdateQueue<State>;
}

/**
 * @description 添加update加入到updateQueue的队列中
 * @param updateQueue 更新队列
 * @param update 更新
 */
export function enqueueUpdate<State>(
	updateQueue: UpdateQueue<State>,
	update: Update<State>
) {
	updateQueue.shared.pending = update;
}

/**
 * @desc 更新队列状态更新消费处理
 * @param baseState 传入状态值
 * @param pendingUpdate 更新的数据源
 * @returns 返回处理后的更新数据源
 */
export function processUpdateQueue<State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): {memoizedState: State} {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		// 判断是函数还是其他数据类型，
		if (action instanceof Function) {
			result.memoizedState = action(baseState); // 取函数的返回值
		} else {
			result.memoizedState = action; // 直接赋值更新
		}
	}

	return result;
}
