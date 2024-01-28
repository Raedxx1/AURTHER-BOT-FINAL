//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    let user = global.db.data.users[who]
    if (!who) throw `منشن شخص`
if (global.premso.includes(who.split`@`[0])) throw 'لقد اصبح مشرف ب الفعل'
global.premso.push(`${who.split`@`[0]}`)

conn.reply(m.chat, `*تمت*`, m, { mentions: [who] })

}
handler.help = ['addprem <@tag>']
handler.tags = ['owner']
handler.command = ['مشرف'] 

handler.group = true
handler.admin = true

export default handler
