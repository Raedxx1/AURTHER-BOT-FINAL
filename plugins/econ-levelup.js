import { canLevelUp, xpRange } from '../lib/levelling.js'

let handler = async (m, { conn }) => {
let { role } = global.db.data.users[m.sender]
let name = conn.getName(m.sender)
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.imgur.com/whjlJSf.jpg')
let background = 'https://i.ibb.co/4YBNyvP/images-76.jpg'
let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
      let lvl = `*╾───━⛱️━───╼*
*┇ 『الإسـم╎ 🪪⌞ ${name}』*
*┇ 『المستوى╎ 📊⌞ ${user.level}』*
*┇ 『التصنيف╎ 🎭⌞ ${role}』*
*┇ 『 اكس بي╎ 🔢⌞ ${user.exp - min}/${xp}』*
*╾───━⛱️━───╼*
*-انت تحتاج ${max - user.exp} من  اكس بي للوصول الى مستوى التالي⏳*
*╾───━⛱️━───╼*
`
try {
            let imgg = `https://wecomeapi.onrender.com/rankup-image?username=${encodeURIComponent(name)}&currxp=${user.exp - min}&needxp=${xp}&level=${user.level}&rank=${encodeURIComponent(pp)}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(background)}`
            conn.sendFile(m.chat, imgg, 'level.jpg', txt, m)
        } catch (e) {
            m.reply(lvl)
    }

    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let teks = `عاش يحب! ${conn.getName(m.sender)} المستوى: ${user.level}`
        let str = `
*╾───━⛱️━───╼*
*┇『المستـوى السابق╎ 📈⌞ ${before}』*
*┇『المستـوى الحالي╎ 📊⌞ ${user.level}』*
*┇『التصنيف╎ ♟️⌞ ${role}』*
*╾───━⛱️━───╼*
`
          .trim()
        try {
            let img = `https://wecomeapi.onrender.com/levelup-image?avatar=${encodeURIComponent(pp)}`
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        } catch (e) {
            m.reply(str)
        }
    }
await delay(5 * 5000)  
}
handler.help = ['levelup']
handler.tags = ['xp']

handler.command = ['nivel', 'lvl', 'رانك', 'لفل'] 

export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
