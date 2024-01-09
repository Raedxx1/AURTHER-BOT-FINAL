let handler = async function (m, { conn, args }) {
  let registeredNames = Object.values(global.db.data.users)
    .filter(user => user.registered && user.name.match(/[\u0600-\u06FF]/)) // Filter only names with Arabic characters
    .map(user => user.name)
    .sort((a, b) => a.localeCompare(b, 'ar'))

  if (registeredNames.length === 0) {
    return m.reply('لا يوجد أسماء مسجلة بالحروف العربية في قاعدة البيانات.')
  }

  let namesList = '*❃ ──────⊰ ❀ ⊱────── ❃*\n                    *الألقاب المأخوذة* '

  let currentLetter = ''
  for (let name of registeredNames) {
    let firstLetter = name.charAt(0)
    if (firstLetter !== currentLetter) {
      namesList += `\n*❃ ──────⊰ ${firstLetter} ⊱────── ❃*\n\n`
      currentLetter = firstLetter
    }
    namesList += `◍ *${name}* \n`
  }

  conn.reply(m.chat, namesList.trim(), m)
}

handler.help = ['قائمة']
handler.tags = ['قائمة', 'أسماء', 'عربية']
handler.command = ['الألقاب', 'الالقاب' ,'~']
handler.group = true
handler.admin = false
handler.botAdmin = false
handler.fail = null

export default handler
