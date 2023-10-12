module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: "csv-loader",
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scholar.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img.google.com",
      },
    ],
  },
};
