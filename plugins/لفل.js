import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.imgur.com/whjlJSf.jpg');
    let user = global.db.data.users[m.sender];
    let background = 'https://telegra.ph/file/779adac9def567988655b.jpg'; // Fixed background URL

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier);
        let txt = `
*❃ ──────⊰ ❀ ⊱────── ❃*
◍ *الأسم :*  *${name}*
◍ *المستوى :*  *${user.level}*
◍ *الخبرة :* *${user.exp - min}/${xp}*
◍ *التصنيف :* *${user.role}*
*❃ ──────⊰ ❀ ⊱────── ❃*

*مرحبا* *${name}* *لايمكنك الترقي حاليا انت تحتاج الى* *${max - user.exp}* *للصعود للمستوى التالي*`.trim();

        try {
            let imgg = `https://wecomeapi.onrender.com/rankup-image?username=${encodeURIComponent(name)}&currxp=${user.exp - min}&needxp=${xp}&level=${user.level}&rank=${encodeURIComponent(pp)}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(background)}`;
            conn.sendFile(m.chat, imgg, 'level.jpg', txt, m);
        } catch (e) {
            m.reply(txt);
        }
    } else {
        let str = `
*❃ ──────⊰ ❀ ⊱────── ❃*
◍ *المستوى السابق :* *${user.level - 1}*
◍ *المستوى الحالي :* *${user.level}*
◍ *التصنيف :* *${user.role}*
*❃ ──────⊰ ❀ ⊱────── ❃*`.trim();

        try {
            let img = `https://wecomeapi.onrender.com/levelup-image?avatar=${encodeURIComponent(pp)}`;
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m);
        } catch (e) {
            m.reply(str);
        }
    }
}

handler.help = ['levelup'];
handler.tags = ['economy'];
handler.command = ['لفل', 'مستوى', 'level'];

export default handler
