import path from 'path';
import fs from 'fs';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

/**
 * @desc 获取打包路径
 * @param {string} pkgName 包名
 * @param {boolean} isDist 是否是构建路径
 */
export function resolvePackage(pkgName, isDist) {
	return isDist ? `${distPath}/${pkgName}` : `${pkgPath}/${pkgName}`;
}

/**
 *
 * @param {*} pkgName 包名
 * @returns 返回包对应的package.json内容
 */
export function getPackageContent(pkgName) {
	const path = `${resolvePackage(pkgName)}/package.json}`;
	const ctx = fs.readFileSync(path, {encoding: 'utf-8'});
	return JSON.parse(ctx);
}
