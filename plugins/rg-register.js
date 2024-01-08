//import db from '../lib/database.js'

import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix, command, args, groupMetadata }) {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
   if (!(who in global.db.data.users)) throw `المستخدم غير موجود ف قاعدة بياناتي`
  let user = global.db.data.users[who]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `*لقد تم تسجيلك ب الفعل*`

  let Reg = /^\s*([^]*)\s*$/
  if (!Reg.test(text)) throw `*المثال الصحيح: ${usedPrefix}تسجيل اسمك*`

  let [_, name] = text.match(Reg)
  if (!name) throw '*أكتب اللقب*'
  if (name.length >= 30) throw '*الأسم طويل*' 

  user.name = name.trim()
  user.regTime = +new Date()
  user.registered = true

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 21)

  m.reply(`*❃ ──────⊰ ❀ ⊱────── ❃*
◍ *تم تسجيلك في قاعدة البيانات*
*❃ ──────⊰ ❀ ⊱────── ❃*
◍ *الأسم :* *${name}*
◍ *الايدي :* *${sn}*
*❃ ──────⊰ ❀ ⊱────── ❃*
`.trim())
}

handler.help = ['reg'].map(v => v + ' <الأسم>')
handler.tags = ['rg']
handler.command = ['تسجيل', 'اشتراك', 'register', 'registrar'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
