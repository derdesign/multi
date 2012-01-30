
default:
		@echo "\nmake deps       Install all required dependencies"
		@echo "make test       Run the unit tests\n"

deps:
		@npm install

test:
		@./node_modules/vows/bin/vows --spec ./test/*.js

.PHONY: test