docker stop $(docker ps -aqf name="api*") || exit 0
docker rm $(docker ps -aqf name="api*")