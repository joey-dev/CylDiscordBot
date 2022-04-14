info:
	echo "read the README.md for info about the commands"

download: create_apps create_packages add_env
	echo "add the .env files and enter make install (like in the readme.md)"

install:
	cd apps/backend && make install
	cd apps/frontend && make
	cd apps/bot && make
	cd packages/languages && make
	cd packages/types && make

runDocker:
	docker-compose up

stopDocker:
	docker-compose down

rebuildBot:
	docker-compose up --build bot
	exit

shBackend:
	docker exec -it cyldiscordbot_php_1 sh

shFrontend:
	docker exec -it cyldiscordbot_frontend_1 sh

shBot:
	docker exec -it bot sh

cmdBackend:
	docker exec -it cyldiscordbot_php_1 ${cmd}

cmdFrontend:
	docker exec -it cyldiscordbot_frontend_1 ${cmd}

cmdBot:
	docker exec -it bot ${cmd}

frontend:
	cd apps/frontend && make ${command}

# only for extra use inside of the makefile, not to run in command line

create_apps: create_backend create_frontend create_bot

create_packages: create_languages create_types

create_backend:
	echo 'creating backend'
	git clone git@github.com:joey-dev/CylDiscordBot-backend.git
	rm -rf apps/backend
	mv CylDiscordBot-backend apps/backend

create_frontend:
	echo 'creating frontend'
	git clone git@github.com:joey-dev/CylDiscordBot-frontend.git
	rm -rf apps/frontend
	mv CylDiscordBot-frontend apps/frontend

create_bot:
	echo 'creating bot'
	git clone git@github.com:joey-dev/CylDiscordBot-bot.git
	rm -rf apps/bot
	mv CylDiscordBot-bot apps/bot

create_languages:
	echo 'creating languages'
	git clone git@github.com:joey-dev/CylDiscordBotLanguage.git
	rm -rf packages/languages
	mv CylDiscordBotLanguage packages/languages

create_types:
	echo 'creating types'
	git clone git@github.com:joey-dev/CylDiscordBot-types.git
	rm -rf packages/types
	mv CylDiscordBot-types packages/types

add_env:
	mv backend.env apps/backend/.env
	mv bot.env apps/bot/.env
