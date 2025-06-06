/*
 * @Author: Jonny
 * @Date: 2024-10-11 17:49:11
 * @LastEditors: Jonny
 * @LastEditTime: 2025-06-05 11:10:13
 * @FilePath: \park-h5\src\utils\public.js
 */
/**
 * 压缩图片
 * @param {file} 输入图片
 * @returns {Promise} resolved promise 返回压缩后的新图片
 */
export function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onerror = reject;
    img.onload = () => {
      const maxWidth = 1024;
      const maxHeight = 1024;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("压缩失败"));
          }
        },
        "image/jpeg",
        0.8 // 压缩质量
      );
    };
  });
}
