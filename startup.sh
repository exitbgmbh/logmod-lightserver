#!/bin/bash
cd /home/pi/logmod-lightserver

git pull
npm install

sudo nodejs server.js