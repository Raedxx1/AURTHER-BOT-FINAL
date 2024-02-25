let enabledAdmin = {}; // Object to store enabled admins

let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let kickMsg = `*منشن شخص مصاب ب داء تشارمي لمعالجته*`;

    // Check if the message contains the specified trigger
    if (m.text && m.text.toLowerCase() === 'علاج') {
        // Check if an admin is mentioned or replied to
        if (!m.mentionedJid[0] && !m.quoted) 
            return m.reply(kickMsg, m.chat, { mentions: conn.parseMention(kickMsg) });

        // Get the mentioned admin
        let admin = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

        // Store the mentioned admin as enabled
        enabledAdmin[admin] = true;
        m.reply('*تمت سيتم علاجه ب اذن الله*');
    } else {
        // If the handler is not enabled, return a message
        if (!enabledAdmin[m.sender]) 
            return m.reply('*انت مسموح لك*');

        // Check if a user is mentioned or replied to
        if (!m.mentionedJid[0] && !m.quoted) 
            return m.reply(kickMsg, m.chat, { mentions: conn.parseMention(kickMsg) });

        // Get the user to be kicked
        let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

        // Remove the user
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
        m.reply(`*تمت*`);
    }
}

// Enable the handler for the mentioned admin
handler.all = async (m, { conn, participants }) => {
    // Check if the message contains the specified trigger
    if (m.text && m.text.toLowerCase() === 'علاج') {
        // Check if an admin is mentioned or replied to
        if (!m.mentionedJid[0] && !m.quoted) 
            return m.reply(kickMsg, m.chat, { mentions: conn.parseMention(kickMsg) });

        // Get the mentioned admin
        let admin = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

        // Store the mentioned admin as enabled
        enabledAdmin[admin] = true;
        m.reply('*توك ما تعالجت انت اللقم بعده*');
    }
}

// Enable the handler for the mentioned admin
handler.admin = async (m, { conn, participants }) => {
    // Check if the sender is an admin
    let isAdmin = participants.find(p => p.jid === m.sender && p.isAdmin);

    // Check if the sender is an admin and the handler is enabled for them
    if (isAdmin && enabledAdmin[m.sender]) {
        // Enable the handler for the mentioned admin
        handler.command = ['طرد @user'];
        m.reply('*ما اتعالجت انت*');
    }
}

handler.help = ['kick @user'];
handler.tags = ['group'];
handler.command = ['kick @user'];
handler.group = true;
handler.botAdmin = true;

export default handler;