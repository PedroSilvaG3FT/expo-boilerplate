const plugin = require("tailwindcss");

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "react-native-reanimated/plugin",
      "@babel/plugin-proposal-export-namespace-from",
      ["inline-import", { extensions: [".svgx"] }],
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
