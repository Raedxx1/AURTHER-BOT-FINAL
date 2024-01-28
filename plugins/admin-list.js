let handler = async (m, { conn, args, usedPrefix, command }) => {
let premo = global.premso.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid) 
let teks = `▢ *المشرفين*\n─────────────\n` + premo.map(v => '- @' + v.replace(/@.+/, '')).join`\n`
m.reply(teks, null, {mentions: conn.parseMention(teks)})

}
handler.help = ['listprem']
handler.tags = ['main']
handler.command = ['مشرفين'] 

export default handler
