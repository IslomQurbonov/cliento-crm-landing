module.exports = {
  apps: [{
    name: 'cliento-landing',
    script: 'node_modules/.bin/next',
    args: 'start -p 4012',
    cwd: '/var/www/cliento-landing',
    env: {
      NODE_ENV: 'production',
      PORT: 4012,
    },
    instances: 1,
    autorestart: true,
    max_memory_restart: '512M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }],
};
