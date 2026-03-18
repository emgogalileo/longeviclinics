const fs = require('fs');
const appJson = JSON.parse(fs.readFileSync('./app.json', 'utf8'));

const buildNumber = process.env.GITHUB_RUN_NUMBER || '1';

// Update Android versionCode
if (appJson.expo.android) {
  appJson.expo.android.versionCode = parseInt(buildNumber);
}

// Update iOS buildNumber
if (appJson.expo.ios) {
  appJson.expo.ios.buildNumber = buildNumber;
}

fs.writeFileSync('./app.json', JSON.stringify(appJson, null, 2));
console.log(`Updated build versions to: ${buildNumber}`);
