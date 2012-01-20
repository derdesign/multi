
deps:
		@npm install

test:
		@./node_modules/vows/bin/vows --spec ./tests/*.js