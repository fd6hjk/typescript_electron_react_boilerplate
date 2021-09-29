import { app, BrowserWindow } from "electron";
import { join } from "path";

const createWindow = () => {
  const browser = new BrowserWindow();
  browser.loadFile(join(__dirname, "../renderer/public/index.html"))
  //browser.loadFile(join(__dirname, "./static/index.html"));
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if(process.platform !== "darwin") {
    app.quit();
  }
});
