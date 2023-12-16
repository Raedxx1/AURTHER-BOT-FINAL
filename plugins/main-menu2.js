import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'
const time = moment.tz('Asia/Kolkata').format('HH')
let wib = moment.tz('Asia/Kolkata').format('HH:mm:ss')
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command}) => {
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
let pp = 'https://i.imgur.com/ey6rk2T.mp4'
let user = global.db.data.users[who]
let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let totaluser = Object.values(global.db.data.users).length 
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850) 
let greeting = ucapan()
let quote = quotes[Math.floor(Math.random() * quotes.length)];

let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let str = `
*❃ ──────⊰ ❀ ⊱────── ❃*
                      *الـمـجـمـوعـات*
*❃ ──────⊰ ❀ ⊱────── ❃* 
  ◍ منشن
  ◍ مخفي
  ◍ طرد
  ◍ اضافة
  ◍ ترقيه
  ◍ تخفيض
  ◍ احذف
  ◍ جروب فتح
  ◍ جروب قفل
  ◍ تغيرالصوره
  ◍ لينك
  ◍ طرد_رمز
  ◍ انذار
  ◍ الغاء_الانذار 
*❃ ──────⊰ ❀ ⊱────── ❃*
                          *الفعاليات*
*❃ ──────⊰ ❀ ⊱────── ❃* 
  ◍ ش
  ◍ سؤال
  ◍ عين
  ◍ علم
  ◍ ديني
  ◍ لاعب
  ◍ كت
  ◍ تف
  ◍ تر 
*❃ ──────⊰ ❀ ⊱────── ❃*
                    *الحياة الافتراضية*
*❃ ──────⊰ ❀ ⊱────── ❃* 
  ◍ المحفظة
  ◍ البنك
  ◍ المتجر 
  ◍ تسوق
  ◍ تسجيل
  ◍ خروج
  ◍ ايدي
  ◍ عملات
  ◍ يومي
  ◍ رانك
  ◍ بروفايل
  ◍ مغامرة
  ◍ شفاء
  ◍ تعدين
  ◍ سرقة
  ◍ تحويل
  ◍ عمل
  ◍ المتصدرين
  ◍ منح 
*❃ ──────⊰ ❀ ⊱────── ❃*
                        *الـتـحـمـيـل*
*❃ ──────⊰ ❀ ⊱────── ❃* 
  ◍ فيديو
  ◍ اغنيه
  ◍ صورة
  ◍ طقم
  ◍ فيديو
  ◍ البحث
  ◍ تيك 
*❃ ──────⊰ ❀ ⊱────── ❃*
                          *الـتـرفـيـه*
*❃ ──────⊰ ❀ ⊱────── ❃* 
  ◍ اكس_او
  ◍ احذف_اللعبه
  ◍ تحدي
  ◍ حظ
  ◍ جميل
  ◍ ورع
  ◍ اهبل
  ◍ خروف
  ◍ قول
  ◍ نسبة
  ◍ لو
  ◍ شخصية
  ◍ تاج
  ◍ اسئلني
  ◍ شطرنج
  ◍ سلاحي
  ◍ نصايح 
*❃ ──────⊰ ❀ ⊱────── ❃*
                         *الـتـحـويـل*
*❃ ──────⊰ ❀ ⊱────── ❃* 
  ◍ ملصق
  ◍ حقوق
  ◍ لصورة
  ◍ لفيديو
  ◍ لرابط
  ◍ حيوان
  ◍ قط
  ◍ كلب
  ◍ ستك
  ◍ مترجم 
*❃ ──────⊰ ❀ ⊱────── ❃*
                          *الاعـضـاء*
*❃ ──────⊰ ❀ ⊱────── ❃* 
  ◍ اختفاء
  ◍ تحدث
  ◍ سرعه
  ◍ خط
  ◍ دمج
  ◍ هل
  ◍ منشني
  ◍ توب
  ◍ تصاميم
  ◍ ايات
  ◍ المطور
  ◍ جوجل 
*❃ ──────⊰ ❀ ⊱────── ❃*
                             *آرثر*
*❃ ──────⊰ ❀ ⊱────── ❃* 
  ◍ بان
  ◍ بان_فك
  ◍ بان_شات
  ◍ بان_شات_فك
  ◍ حطها_بروفايل
  ◍ اخرج
  ◍ ادخل
*❃ ──────⊰ ❀ ⊱────── ❃*
`

    try {
  conn.sendMessage(m.chat, { video: { url: pp }, caption: str.trim(), gifPlayback: true, gifAttribution: 0}, { quoted: m })
} catch (e) {
  await conn.reply(m.chat, "Error", m)
  throw e
}
    
handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu2', 'help2'] 

export default handler
