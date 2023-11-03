package main

import (
	"context"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"github.com/yuukimu/md-viewer/model"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet() (string, string) {
	md, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select File",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Markdown",
				Pattern:     "*.md",
			},
		},
	})

	if md == "" || err != nil {
		return "File select cancel", ""
	}

	data, err := os.ReadFile(md)
	if err != nil {
		return "md read error", ""
	}

	return md, string(data)
}

func (a *App) LoadMD() model.MDInfo {
	var mdInfo model.MDInfo = model.MDInfo{
		MDPath:  "",
		Content: "",
	}
	md, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select File",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Markdown",
				Pattern:     "*.md",
			},
		},
	})

	if md == "" || err != nil {
		return mdInfo
	}

	data, err := os.ReadFile(md)
	if err != nil {
		return mdInfo
	}

	mdInfo = model.MDInfo{
		MDPath:  md,
		Content: string(data),
	}

	return mdInfo
}
