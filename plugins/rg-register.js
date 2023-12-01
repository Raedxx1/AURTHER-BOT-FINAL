//import db from '../lib/database.js'

import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `*لقد تم تسجيلك ب الفعل*`
  if (!Reg.test(text)) throw `*مثال : .تسجيل اسمك.عمرك*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '*الأسم لا يمكن أن يكون فارغ*'
  if (!age) throw '*العمر لا يمكن أن يكون فارغ*'
  if (name.length >= 30) throw '*الأسم طويل*' 
  age = parseInt(age)
  if (age > 100) throw '*استهبال هو ؟؟ تست رح تاخذ باند من البوت*'
  if (age < 5) throw '🚼*دزمها يا بزر وش جابك هنا*'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`*❃ ──────⊰ ❀ ⊱────── ❃*
◍ *تم تسجيلك في قاعدة البيانات*
*❃ ──────⊰ ❀ ⊱────── ❃*
◍ *الأسم :* *${name}*
◍ *العمر :* *${age}* 
◍ *الايدي :* *${sn}*
*❃ ──────⊰ ❀ ⊱────── ❃*
`.trim())
}
handler.help = ['reg'].map(v => v + ' <name.age>')
handler.tags = ['rg']

handler.command = ['تسجيل', 'اشتراك', 'register', 'registrar'] 

export default handler

