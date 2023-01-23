import {resolvePackage, getPackageContent} from './utils';
const {name, module} = getPackageContent('react');
// react 包路径
const reactPkgPath = resolvePackage(name);
// react 构建产物路径
const reactBuildPath = resolvePackage(name, true);

// rollup 配置
export default [
	{
		input: `${reactPkgPath}/${module}`,
		output: {
			file: `${reactBuildPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		}
	}
];
