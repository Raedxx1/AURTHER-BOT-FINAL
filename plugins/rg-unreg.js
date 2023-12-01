//import db from '../lib/database.js'

import { createHash } from 'crypto'
let handler = async function (m, { conn, args, usedPrefix}) {
  if (!args[0]) throw `*أكتب الأيدي الخاص بك ... لمعرفة الأيدي أكتب ( .ايدي )*`
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw '⚠️ *الأيدي خطأ*'
  user.registered = false
  m.reply(`✅ *تم تسجيل الخروج*`)
}
handler.help = ['unreg <Num Serie>'] 
handler.tags = ['rg']

handler.command = ['خروج'] 
handler.register = true

export default handler

