// 宿主环境是否支持symbol
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

// react element 类型定义
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
