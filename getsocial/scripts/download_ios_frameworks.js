#!/usr/bin/env node

/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const gsPackage = require('./../package.json');

const fs = require('fs');
const path = require('path');
const request = require('request');
const https = require('https');
const unzipper = require('unzipper');
const exec = require('child_process').exec;

// Read out dir of app project
const projectDir = process.cwd();

function getDownloadUrl() {
  return new Promise((resolve, reject) => {
    request('https://downloads.getsocial.im/ios/releases/latest.json', function(error, response, body) {
      if (error) {
        reject(error);
      }
      if (!error && response.statusCode == 200) {
        const importedJSON = JSON.parse(body);
        resolve(importedJSON['url']);
      }
    });
  });
};

function checkIfFrameworkDownloaded() {
  return new Promise((resolve, reject) => {
    if (fs.exists(projectDir + '/ios/GetSocial/GetSocial.framework', function(exists) {
      resolve(exists);
    }));
  });
};

function downloadFramework(url) {
  !fs.existsSync(projectDir + '/ios/GetSocial') && fs.mkdirSync(projectDir + '/ios/GetSocial');
  const dest = projectDir + '/ios/GetSocial/getsocial-ios-frameworks.zip';
  const file = fs.createWriteStream(dest);
  return new Promise((resolve, reject) => {
    let responseSent = false; // flag to make sure that response is sent only once.
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () =>{
        file.close(() => {
          if (responseSent) return;
          responseSent = true;
          resolve();
        });
      });
    }).on('error', (err) => {
      if (responseSent) return;
      responseSent = true;
      reject(err);
    });
  });
};

function findInfoPlist(startDir, files) {
  if (startDir.includes('node_modules') || startDir.includes('android') || startDir.includes('framework') || startDir.includes('Test')) return;
  fs.readdirSync(startDir).forEach(function(file) {
    const completePath = path.join(startDir, file);
    if (fs.lstatSync(completePath).isDirectory()) {
      findInfoPlist(completePath, files);
    } else {
      if (completePath.indexOf('Info.plist') != -1) {
        files.push(completePath);
      }
    }
  });
}

function updatePlist() {
  return new Promise((resolve, reject) => {
    const files = [];
    findInfoPlist(projectDir, files);
    files.forEach((plist) => {
      // Update plist with new values
      console.info('Updating ' + plist);
      exec('/usr/libexec/PlistBuddy -c "Add im.getsocial.sdk.WrapperVersion string ' + gsPackage.version + '" ' + plist);
      exec('/usr/libexec/PlistBuddy -c "Add im.getsocial.sdk.Runtime string REACTNATIVE" ' + plist);
    });
    resolve();
  });
}

function unzip() {
  // eslint-disable-next-line new-cap
  return fs.createReadStream(projectDir + '/ios/GetSocial/getsocial-ios-frameworks.zip').pipe(unzipper.Extract({path: projectDir + '/ios/GetSocial/'})).promise();
}

function copyInstallerFile() {
  return new Promise((resolve, reject) => {
    const targetDir = projectDir + '/ios/';
    const sourceFile = 'node_modules/getsocial-react-native-sdk/scripts/getsocial.sh';
    exec('cp -rf ' + sourceFile + ' ' + targetDir);
    resolve();
  });
}

(() => {
  checkIfFrameworkDownloaded().then((downloaded) => {
    console.info('iOS frameworks downloaded: ' + downloaded);
    if (!downloaded) {
      getDownloadUrl().then((url) => {
        console.info('Downloading from: ' + url);
        downloadFramework(url).then(() => {
          unzip();
        });
      });
    }
  }).catch((error) => {
    console.error(error);
  });
  updatePlist().then(() => {
    console.info('Info.plist has been updated.');
  });
  copyInstallerFile().then(() => {
    console.info('getsocial.sh file has been copied to project folder');
  });
})();
