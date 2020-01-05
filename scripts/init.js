const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const spawn = require("cross-spawn");

module.exports = function(
  appPath,
  appName,
  verbose,
  originalDirectory,
  templateName
) {
  const appPackage = require(path.join(appPath, "package.json"));
  const ownPackageName = require(path.join(__dirname, "..", "package.json"))
    .name;
  const templatePath = path.join(appPath, "node_modules", ownPackageName);
  const templateDir = path.join(templatePath, "template");
  const templateJson = require(path.join(templatePath, "template.json"));
  console.log(
    `Installing ${chalk.cyan(appName)} ${chalk.cyan(appPackage.name)}...`
  );
  templateJson.name = appPackage.name;
  templateJson.version = appPackage.version;
  templateJson.description = appPackage.description;
  fs.writeFileSync(
    path.join(appPath, "package.json"),
    JSON.stringify(templateJson, null, 2)
  );
  if (fs.existsSync(templateDir)) {
    fs.copySync(templateDir, appPath);
  }
  fs.removeSync(path.join(appPath, "node_modules"));
};
