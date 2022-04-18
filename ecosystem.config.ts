export default {
  apps: [{
    script: 'cron.ts',
    watch: ['server', 'client'],
    // Delay between restart
    watch_delay: 1000,
    ignore_watch : ['node_modules']
  }]
}