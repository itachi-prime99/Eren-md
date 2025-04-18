module.exports = {
  name: 'help',
  aliases: ['commands'],
  description: 'Displays a list of available commands.',
  execute: async (message) => {
    const commands = ['uptime', 'ping', 'info', 'cmdinstall'];
    message.reply(`Here are the available commands: \n${commands.join(', ')}`);
  }
};
