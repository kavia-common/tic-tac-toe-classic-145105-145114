.PHONY: build lint android

build:
	@echo "Makefile: Using CI-safe build shim"
	@./build.sh

lint:
	@npm --workspace tic_tac_toe_frontend run lint

android:
	@npm --workspace tic_tac_toe_frontend run build-android
