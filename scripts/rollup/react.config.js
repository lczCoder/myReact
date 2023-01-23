import generatePackage from 'rollup-plugin-generate-package-json';
import {resolvePackage, getPackageContent, basePlugins} from './utils';
const {name, module} = getPackageContent('react');
// react 包路径
const reactPkgPath = resolvePackage(name);
// react 构建产物路径
const reactBuildPath = resolvePackage(name, true);

// rollup 配置
export default [
	// react
	{
		input: `${reactPkgPath}/${module}`,
		output: [
			{
				file: `${reactBuildPath}/index.js`,
				name: 'index.js',
				format: 'umd'
			}
		],
		plugins: [
			...basePlugins(),
			generatePackage({
				inputFolder: reactPkgPath,
				outputFolder: reactBuildPath,
				baseContents: ({name, description, version}) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// jsx
	{
		input: `${reactPkgPath}/src/jsx.ts`,
		output: [
			{
				file: `${reactBuildPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			{
				file: `${reactBuildPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: [...basePlugins()]
	}
];
