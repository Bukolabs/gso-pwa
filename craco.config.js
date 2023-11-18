const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@core": path.resolve(__dirname, "src/app/core"),
      "@domain": path.resolve(__dirname, "src/app/domain"),
      "@shared": path.resolve(__dirname, "src/app/shared"),
      "@api": path.resolve(__dirname, "src/api"),
    },
  },
};
