import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  // Split the text into words
  let words = text.split(' ');

  // The first word should be the key, the rest is the text to stylize
  let شكل = words[0];
  let textToStyle = words.slice(1).join(' ');

  // If no key and text provided, show all styles of a default text
  if (words.length === 0 || !شكل || !textToStyle) {
    let defaultText = 'AURTHER';
    let styledTexts = await Promise.all([...Array(34).keys()].map(i => stylizeText(defaultText, i + 1)));
    conn.reply(m.chat, styledTexts.join`\n\n`, m);
    return;
  }

  // Check if the key is a number between 1 and 34
  if (!Number.isInteger(+شكل) || +شكل < 1 || +شكل > 34) {
    throw 'أختر شكل بين 1\34';
  }

  // Get the styled text
  let styledText = await stylizeText(textToStyle, شكل);

  conn.reply(m.chat, styledText, m);
}

handler.help = ['style'].map(v => v + ' <شكل> <text>');
handler.tags = ['tools'];
handler.command = /^(زخرفة)$/i;
handler.exp = 0;

export default handler;

async function stylizeText(text, شكل) {
  let res = await fetch(`https://inrl-web-fkns.onrender.com/api/fancy?text=${encodeURIComponent(text)}&شكل=${شكل}`);
  let data = await res.json();

  // Use 'result' field for the styled text.
  return `*شكل ${شكل}*\n${data.result}`;
}

