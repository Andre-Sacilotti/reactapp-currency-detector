module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: ['bin', 'txt', 'jpg', 'ttf', 'png', 'json'],
      sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx']
    },
  };