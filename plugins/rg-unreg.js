//import db from '../lib/database.js'

import { createHash } from 'crypto'
let handler = async function (m, { conn, args, usedPrefix}) {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let user = global.db.data.users[who];
  let { name } = global.db.data.users[who];
  if (!args[0]) throw `*أكتب اللقب الي تبي تحذفه من قاعدة البيانات*`
  if (args[0] !== name) throw '⚠️ *تمت ازالتة مسبقا*'
  user.registered = false
  m.reply(`✅ *تم حذف اللقب*`)
}
handler.help = ['unreg <Num Serie>'] 
handler.tags = ['rg']

handler.command = ['ازالة'] 
handler.register = true
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
