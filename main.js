const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'SpotifyStats',
        width: 1000,
        height: 800
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, './my-app/build/index.html'),
        protocol: 'file:'
    });

    mainWindow.loadURL(startUrl);
}

app.on('ready', createMainWindow);