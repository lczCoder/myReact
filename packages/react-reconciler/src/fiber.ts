import {Props, Key, Ref} from 'shared/ReactType';
import {WorkTag} from './workTag';

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
	}
}
