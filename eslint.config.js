// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const {
  plugin: importPlugin,
  configs: importConfigs,
} = require("eslint-plugin-import");

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      ...importConfigs.recommended.rules,
    },
  },
  {
    ignores: ["dist/*"],
  },
]);
