docker build . -t api
docker run -d -p 9000:9000 --name api api