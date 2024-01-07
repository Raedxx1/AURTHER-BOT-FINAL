import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix }) {
let user = global.db.data.users[m.sender]
let name2 = conn.getName(m.sender)
m.reply(`*❃ ──────⊰ ❀ ⊱────── ❃*
◍ *لقبه :*  ${name}
*❃ ──────⊰ ❀ ⊱────── ❃*
`.trim())
}
handler.help = ['mysn']
handler.tags = ['rg']
handler.command = ['لقبه', 'sn', 'mysn'] 
handler.register = true
export default handler
