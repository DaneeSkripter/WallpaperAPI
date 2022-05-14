const express = require('express');
const app = express()
const fs = require("fs");
const path = require('path');

app.get('/api/:device', function (req, res) {
    const device = req.params.device
    if (device === 'phone') {
        const phoneFolder = path.resolve(__dirname + '/wallpapers/phone')
        const phoneWallpapers = fs.readdirSync(phoneFolder).map(wallpaper => `https://wallpaperapi.tk/img/phone/${wallpaper}`)
        const phoneRandomWallpaper = phoneWallpapers[Math.floor(Math.random() * phoneWallpapers.length)]
        
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
            wallpaper: phoneRandomWallpaper
          });
    } else if (device === 'desktop') {
        const desktopFolder = path.resolve(__dirname + '/wallpapers/desktop')
        const desktopWallpapers = fs.readdirSync(desktopFolder).map(wallpaper => `https://wallpaperapi.tk/img/desktop/${wallpaper}`)
        const desktopRandomWallpaper = desktopWallpapers[Math.floor(Math.random() * desktopWallpapers.length)]
        
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
            wallpaper: desktopRandomWallpaper
          });
    } else {
        res.redirect('https://use.wallpaperapi.tk')
    }
})

app.get('/api', function (req, res) {
    res.redirect('https://use.wallpaperapi.tk')
})

app.get('/img/:device/:img', function (req, res) {
    const device = req.params.device
    const img = req.params.img
    if (device === 'phone') {
        const wallpaper = path.resolve(__dirname + `/wallpapers/phone/${img}`)

        if (!fs.existsSync(wallpaper)) return res.sendStatus(404);

        res.setHeader("Content-Type", "image/png");
        res.send(fs.readFileSync(wallpaper))
    } else if (device === 'desktop') {
        const wallpaper = path.resolve(__dirname + `/wallpapers/desktop/${img}`)

        if (!fs.existsSync(wallpaper)) return res.sendStatus(404);

        res.setHeader("Content-Type", "image/png");
        res.send(fs.readFileSync(wallpaper))
    } else {
        res.redirect('https://use.wallpaperapi.tk')
    }

})

app.get('/', function (req, res) {
    res.redirect('https://use.wallpaperapi.tk')
})

app.listen(5025)
console.log('Listening on 5025')