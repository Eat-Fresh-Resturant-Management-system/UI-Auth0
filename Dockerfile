# Brug en node image som base
FROM node:16-alpine AS build
ENV ASPNETCORE_URLS=http://+:3000

# Sæt arbejdsmappen til /app
WORKDIR /app

# Kopier package.json og package-lock.json til arbejdsbiblioteket
COPY package*.json ./

# Installer afhængigheder
RUN npm install

# Opdater caniuse-lite databasen
RUN npx browserslist@latest --update-db

# Kopier resten af app-kilderne til arbejdsbiblioteket
COPY . .

# Byg appen til produktionsbrug
RUN npm run build

# Brug en nginx image som base til den endelige container
FROM nginx:alpine

# Kopier de byggede filer til nginx' html mappe
COPY --from=build /app/build /usr/share/nginx/html

# Kopier nginx konfigurationsfil (valgfrit)
# COPY nginx.conf /etc/nginx/nginx.conf

# Eksponer port 80
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
