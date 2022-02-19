download: create_apps create_packages
	echo "add the .env files and enter make install"

install:
	cd apps/backend && make
	cd apps/frontend && make
	cd apps/bot && make
	cd packages/languages && make
	cd packages/types && make

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
