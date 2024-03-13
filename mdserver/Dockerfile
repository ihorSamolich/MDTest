# Використання Node
FROM node:latest

# Встановлення
RUN apt-get update && apt-get install -y zip

# Визначення робочого каталогу в контейнері
WORKDIR /usr/src/app

# Копіювання файлів package.json та package-lock.json та встановлення залежностей
COPY package*.json index.js ./
RUN npm install

# Копіювання всіх файлів додатка в контейнер
COPY . .

# Вказівка порту, на якому працює додаток
EXPOSE 3000

# Запуск додатку
CMD ["node", "index.js"]

