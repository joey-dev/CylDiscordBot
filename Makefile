install: create_apps create_packages

create_apps: create_backend create_frontend create_bot

create_packages: create_languages

create_backend: create_directories
	echo 'creating backend'
	mkdir 'apps/backend'
	# pull from github
	# run that makefile

create_frontend: create_directories
	echo 'creating frontend'
	mkdir 'apps/frontend'
	# pull from github
	# run that makefile

create_bot: create_directories
	echo 'creating bot'
	mkdir 'apps/bot'
	# pull from github
	# run that makefile

create_languages: create_directories
	echo 'creating languages'
	mkdir 'packages/languages'
	# pull from github
	# run that makefile

create_directories:
	echo "creating directories..."
	mkdir 'apps'
	mkdir 'packages'

