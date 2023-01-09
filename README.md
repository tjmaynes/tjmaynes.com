# tjmaynes.github.io

## Usage
To edit the website, run the following command:
```bash
docker run \
  --name website \
  --volume=index.html:/usr/share/nginx/html:ro \
  --publish=8080:80 \
  nginx
```
