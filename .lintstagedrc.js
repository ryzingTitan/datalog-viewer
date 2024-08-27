const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --max-warnings 0 --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(" ")}`;

module.exports = {
  "!(.lintstagedrc).{js,jsx,ts,tsx}": [
    buildEslintCommand,
    buildPrettierCommand,
  ],
  ".lintstagedrc.js": [buildPrettierCommand],
};
