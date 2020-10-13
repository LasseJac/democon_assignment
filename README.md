**FOR DEVCON REVIEWER:**

For the purpose of the interview you can choose to focus on the /src folder - the rest is mostly work-in-progress infrastructure not related to the assignment

Totally underestimated the scope of the assignment so there was some rushing happening to meet the deadline - there are definitely symptoms of that (e.g. didn't have time to consolidate talk details with talk preview, convert day picker to native inputs for better experience on mobile/tablet, no url based routing, etc.)

Project hosted at: 34.89.176.65

**TO-DO:**

- PWA POC
- SSR POC
- SSL Termination (Caddy)
- Finalize server dependency separation (nodemon currently installed as a client package)
- CI pipeline
- if k8s: skaffold/helm/prometheus/ingress, else: docker-compose/swarm
- Reload client on dist change in development (simple homebrew solution using chokidar and sockets?)
- Source maps
- nodemon ignore dist folder

**COMMANDS:**

docker run -p 3000:3000 -e PORT=3000 \
--mount type=bind,source="$(pwd)",target=/app \
devcon:latest

docker build . --target=dev -t devcon:latest 

DOCKER_BUILDKIT=1 docker build . -t devcon:latest

docker exec -it *container id* /bin/bash
