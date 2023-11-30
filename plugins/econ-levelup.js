import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.imgur.com/whjlJSf.jpg');
    let user = global.db.data.users[m.sender];
    let background = 'https://i.ibb.co/4YBNyvP/images-76.jpg'; // Fixed background URL

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier);
        let txt = `
┌───⊷ *المستوى*
▢ اليوزر : *${name}*
▢ المستوى : *${user.level}*
▢ نقاط الخبرة : *${user.exp - min}/${xp}*
▢ الدور : *${user.role}*
└──────────────

مرحبا, ${name}! عشان توصل للمستوى اللي بعده تحتاج*${max - user.exp}* نقطة خبرة\nشد حيلك! 🚀
`.trim();

        try {
            let imgg = `https://wecomeapi.onrender.com/rankup-image?username=${encodeURIComponent(name)}&currxp=${user.exp - min}&needxp=${xp}&level=${user.level}&rank=${encodeURIComponent(pp)}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(background)}`;
            conn.sendFile(m.chat, imgg, 'level.jpg', txt, m);
        } catch (e) {
            m.reply(txt);
        }
    } else {
        let str = `
┌─⊷ *ازداد المستوى*
▢ المستوى السابق : *${user.level - 1}*
▢ المستوى الحالي : *${user.level}*
▢ الدور : *${user.role}*
└──────────────

مبرووك ${name} !مستواك الان *${user.level}*! \n🎉 نتطلع لإرتقائك القادم 🎊
`.trim();

        try {
            let img = `https://wecomeapi.onrender.com/levelup-image?avatar=${encodeURIComponent(pp)}`;
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m);
        } catch (e) {
            m.reply(str);
        }
    }
}

handler.help = ['levelup'];
handler.tags = ['econ'];
handler.command = ['لفل', 'lvl', 'المستوى', 'level'];

export default handler
