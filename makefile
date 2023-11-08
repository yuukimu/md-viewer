.PHONY: build
build:
	wails build -clean

.PHONY: build_all
build_all:
	wails build -platform=windows/amd64,darwin/arm64,darwin/amd64 -clean

.PHONY: build_darwin_arm64
build_darwin_arm64:
	wails build -platform=darwin/arm64 -clean

build_darwin_amd64:
	wails build -platform=darwin/amd64 -clean

build_windows_amd64:
	wails build -platform=windows/amd64 -clean
