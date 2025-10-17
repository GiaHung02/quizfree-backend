# 1. Chọn image Node
FROM node:18-alpine

# 2. Tạo thư mục làm việc
WORKDIR /app

# 3. Copy package.json trước để cache
COPY package*.json ./

# 4. Cài dependencies
RUN npm install --production

# 5. Copy toàn bộ source
COPY . .

# 6. Expose port (ví dụ app chạy ở 3000)
EXPOSE 3000

# 7. Lệnh chạy app
CMD ["node", "server.js"]
