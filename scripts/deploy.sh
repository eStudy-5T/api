docker build . -t api
docker run -d -p 9001:6789 --name api api