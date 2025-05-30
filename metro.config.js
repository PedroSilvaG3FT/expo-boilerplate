const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);

config.resolver.sourceExts.push("svgx");
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = [
  "browser",
  "require",
  "default",
  "react-native",
];

config.resolver.resolveRequest = function packageExportsResolver(
  context,
  moduleImport,
  platform
) {
  if (moduleImport === "axios" || moduleImport.startsWith("axios/")) {
    return context.resolveRequest(
      {
        ...context,
        unstable_conditionNames: ["browser"],
      },
      moduleImport,
      platform
    );
  }

  return context.resolveRequest(context, moduleImport, platform);
};

const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
