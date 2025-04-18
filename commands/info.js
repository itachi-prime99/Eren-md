module.exports = {
  name: 'info',
  description: 'Displays bot and user information.',
  execute: async (message) => {
    const botInfo = {
      botName: 'イタチ',
      owner: 'Eren Yeager',
      version: '1.0.0'
    };
    message.reply(`Bot Information: \nName: ${botInfo.botName} \nOwner: ${botInfo.owner} \nVersion: ${botInfo.version}`);
  }
};
