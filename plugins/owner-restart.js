import { spawn } from 'child_process'
let handler = async (m, { conn,  text }) => {
    if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
    if (conn.user.jid == conn.user.jid) {
    await m.reply('🔄 تست...\n اصبر شويتين')
    process.send('reset')
  } else throw 'eh'
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['ريستارت'] 

handler.admin = true;
handler.botAdmin = true;

export default handler
