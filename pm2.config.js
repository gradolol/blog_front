const path = require('path')

module.exports = {
  apps: [
    {
      name: 'gnarly-react-redux-app',
      cwd: path.resolve(__dirname),
      script: 'npm',
      args: 'start',
    },
  ],
}
