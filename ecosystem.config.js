module.exports = {
  apps: [
    {
      name: 'network-bureau-com',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: '47.94.133.12',
      ref: 'origin/master',
      repo: 'git@github.com:a896853205/network-bureau-com.git',
      path: '/network-bureau/network-bureau-com',
      'post-deploy':
        'npm install && npm run build',
      'post-setup': 'npm install && npm run build'
    }
  }
};
