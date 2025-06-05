const plugin = require("tailwindcss");

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      ["inline-import", { extensions: [".svgx"] }],
      "react-native-reanimated/plugin",
    ],
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
          unstable_transformImportMeta: true,
        },
      ],
      "nativewind/babel",
    ],
  };
};
