/*
 * @Author: Jonny
 * @Date: 2024-08-29 17:26:05
 * @LastEditors: Jonny
 * @LastEditTime: 2024-08-29 17:27:05
 * @FilePath: \alarm-h5\src\components\index.js
 */
import IconFont from './IconFont'
import List from './List'
import Statistic from './Statistic'

export {
  IconFont,
  List,
  Statistic
}



// const requireComponent = require.context(
//   '../components',    // 查找 components 目录
//   true,              // 查找子目录
//   /index\.jsx$/      // 只匹配 index.jsx 文件
// );

// const components = {};

// requireComponent.keys().forEach((fileName) => {
//   // 获取组件名称，可以使用文件夹名作为组件名
//   const componentName = fileName
//     .replace(/^.\//, '')  // 移除 './'
//     .replace(/\/index\.jsx$/, '');  // 去掉文件名部分，保留文件夹名

//   // 导入组件并存储
//   components[componentName] = requireComponent(fileName).default || requireComponent(fileName);
// });

// console.log(components);  // 输出所有导入的组件

