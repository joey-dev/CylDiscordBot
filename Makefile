install: create_apps create_packages

create_apps: create_backend create_frontend create_bot

create_packages: create_languages

create_backend: create_directories
	echo 'creating backend'
	git clone git@github.com:joey-dev/CylDiscordBot-backend.git
	mv CylDiscordBot-backend apps/backend
	cd apps/backend && make

create_frontend: create_directories
	echo 'creating frontend'
	git clone git@github.com:joey-dev/CylDiscordBot-frontend.git
	mv CylDiscordBot-frontend apps/frontend
	cd apps/frontend && make

create_bot: create_directories
	echo 'creating bot'
	git clone git@github.com:joey-dev/CylDiscordBot-bot.git
	mv CylDiscordBot-bot apps/bot
	cd apps/bot && make

create_languages: create_directories
	echo 'creating languages'
	git clone git@github.com:joey-dev/CylDiscordBotLanguage.git
	mv CylDiscordBotLanguage packages/languages
	# cd packages/languages && make

create_directories:
	echo "creating directories..."
	mkdir 'apps'
	mkdir 'packages'

