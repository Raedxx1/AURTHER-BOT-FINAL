import { canLevelUp, xpRange } from '../lib/levelling.js'
import Canvacord from 'canvacord';

let handler = async (m, { conn }) => {
let { exp, level, role } = global.db.data.users[who];
let { min, xp } = xpRange(user.level, global.multiplier);
let name = conn.getName(who);
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
 
 if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`;

let crxp = exp - min
let customBackground  = './Assets/rankbg.jpg'
let requiredXpToLevelUp = xp
 const card = await new Canvacord.Rank()
  .setAvatar(pp)
  .setLevel(level)
  .setCurrentXP(crxp) 
  .setRequiredXP(requiredXpToLevelUp) 
  .setProgressBar('#db190b', 'COLOR') // Set progress bar color here
  .setDiscriminator(who.substring(3, 7))
  .setCustomStatusColor('#db190b')
  .setLevelColor('#FFFFFF', '#FFFFFF')
  .setOverlay('#000000')
  .setUsername(username)
  .setBackground('IMAGE', customBackground)
  .setRank(level, 'LEVEL', false)
  .renderEmojis(true)
  .build();
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg');
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
     conn.sendFile(m.chat, card, 'rank.jpg', str, m, false, { mentions: [who] });
    m.react('✅');
  } catch (error) {
    console.error(error);
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
 conn.sendFile(m.chat, card, 'rank.jpg', str, m, false, { mentions: [who] });
    m.react('✅');
  } catch (error) {
    console.error(error);
        }
    }
await delay(5 * 5000)  
}
handler.help = ['levelup']
handler.tags = ['xp']

handler.command = ['nivel', 'lvl', 'لفل'] 

export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
