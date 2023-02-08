import {jsx} from './src/jsx';
if (__DEV__) {
	console.warn('当前是开发环境');
}
// React Api
export default {
	version: '1.0.0',
	createElement: jsx
};
