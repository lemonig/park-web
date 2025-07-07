# 使用 Nginx 作为基础镜像
FROM nginx:alpine

# 复制打包后的 dist 文件到 Nginx 的默认静态目录
COPY build /usr/share/nginx/html

# 暴露端口
EXPOSE 80

#nginx 配置
COPY _nginx/default.conf /etc/nginx/conf.d/

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]