package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

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

func (a *App) LoadImgBase64(mdpath string, imgpath string) string {
	abspath := a.getAbsPath([] string{mdpath, imgpath})

	bytes, err := os.ReadFile(abspath)
	if err != nil {
		return "error"
	}
	b64str := base64.StdEncoding.EncodeToString(bytes)
	
	b, err := base64.StdEncoding.DecodeString(b64str)
	if err != nil {
		return "error"
	}
	ext :=  filepath.Ext(imgpath)
	fmt.Println(ext)
	// SVGのmimetypeが取得出来ないので拡張子で判別
	if ext == ".svg" {
		return fmt.Sprintf("data:%s;base64,%s", "image/svg+xml", base64.StdEncoding.EncodeToString(bytes))
	}
	// SVG以外のmimetype
	return fmt.Sprintf("data:%s;base64,%s", http.DetectContentType(b), base64.StdEncoding.EncodeToString(bytes))
}

// 画像ファイルの絶対パスを取得
func (a *App) getAbsPath(paths []string) string {
	d := filepath.Dir(paths[0])
	os.Chdir(d)
	abspath, _ := filepath.Abs(paths[1])
	return abspath
}