
default:
		@echo "\nmake deps     Install all required dependencies"
		@echo "make test     Run the unit tests\n"

deps:
		@npm install

tests:
		@./node_modules/vows/bin/vows --spec ./test/*.js