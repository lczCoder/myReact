import {REACT_ELEMENT_TYPE} from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ElementType,
	ReactElementType
} from 'shared/ReactType';
// ReactElement
export const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'lcz'
	};
	return element;
};

// jsx 方法定义
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const value = config[prop];
		if (prop === 'key' && value !== undefined) {
			key = value + '';
			continue;
		}
		if (prop === 'ref' && value !== undefined) {
			ref = value;
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = value;
		}
	}
	const childrenLength = maybeChildren.length;

	switch (childrenLength) {
		case 1:
			props.children = maybeChildren[0];
			break;
		default:
			props.children = maybeChildren;
	}

	return ReactElement(type, key, ref, props);
};

//  dev环境 jsx的实现，比生产环境多了一些校验和判断
export const jsxDev = jsx;
