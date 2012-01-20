
deps:
		@npm install

tests:
		@./node_modules/vows/bin/vows --spec ./test/*.js