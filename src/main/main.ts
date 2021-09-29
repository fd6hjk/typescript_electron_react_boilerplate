import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import { join } from "path";
import electronReload from 'electron-reload';

const createWindow = () => {
  const browser = new BrowserWindow();
  if(isDev) {
    electronReload(__dirname, {
      electron: join(__dirname, "../..", "node_modules", ".bin", process.platform === "win32" ? "electron.cmd" : "electron")
    });
    browser.loadURL("http://localhost:3000");
  } else {
    browser.loadFile(join(__dirname, "../renderer/public/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if(process.platform !== "darwin") {
    app.quit();
  }
});
