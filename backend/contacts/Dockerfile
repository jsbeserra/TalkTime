# Base image
FROM node:18

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar arquivos de origem
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o código-fonte
COPY . .

# Definindo as variáveis de ambiente
ENV MONGODB_URI=mongodb://admin:admin@172.17.0.1:27018
ENV MONGODB_NAME=chat
ENV SECRETE=secrete
ENV PORT=5051
ENV CLIENTID=api-contacts
ENV BROKERS=172.17.0.1:9092

# Build da aplicação
RUN npm run build

# Expor a porta em que a aplicação irá rodar
EXPOSE 5051

# Comando para iniciar a aplicação
CMD ["node", "./dist/main/main.js"]