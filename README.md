required programs to run (no clue what version, so just do the latest lts):
- docker
- git
- makefile

to install: (only first time)
- add the env files: `backend.env` and `bot.env`. to the root of the project (where this file is located)
- make download
- make runDocker (will return a error at first, and stating a command that you need to run. After you run that command, run `make runDocker` again)
- make install

to run: (only if you havnt run the install commands this session)
- make runDocker

Every url starts with localhost:{port}

ports:
- front-end: 3000
- back-end: 8080
- php my admin: 8081
- mysql: 6033
- storybook: 6006


make commands (start all commands with `make `):
- download
  - pulls all repositories from github and adds the code to the correct folders
- install
  - installs items like vendor in php using docker
- runDocker
  - runs docker-compose up
- stopDocker
  - runs docker-compose down
- rebuildBot
  - Because of how discord works, you need to rebuild the bot to see new changes, this will rebuild the discord bot
- shBackend
  - gets you into the backend container to run commands
- shFrontend
  - gets you into the frontend container to run commands
- shBot
  - gets you into the bot container to run commands
- cmdBackend cmd="{cmd}"
  - runs a command in the backend container
- cmdFrontend cmd="{cmd}"
  - runs a command in the frontend container
- cmdBot cmd="{cmd}"
  - runs a command in the bot container


extra commands:
- make cmdFrontend cmd="npm run storybook"
- make cmdFrontend cmd="npm run test"
- make cmdFrontend cmd="npm run test:watch"
