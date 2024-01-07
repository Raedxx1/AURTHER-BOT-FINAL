import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix }) {
let sn = createHash('md5').update(m.sender).digest('hex')
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
