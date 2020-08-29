import fs from 'fs';

/**
 * 获取指定目录下的文件
 */
export const readdirSync = (target: string) => {
  try {
    return fs.readdirSync(target);
  } catch (err) {
    return [];
  }
};


/**
 * 获取模板路径
 * @desc 若模板存在，则返回模板路径。若模板不存在则返回空字符串
 */
export function checkFilePath(filePath: string) {
  return fs.existsSync(filePath) ? filePath : null;
} 
