import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
import { promises,readFileSync } from 'fs';
import moment from 'moment-timezone';
import { join } from 'path';
import os from 'os';
import fs from 'fs';

    let handler = async (m, { conn, usedPrefix, command}) => {
  try {
    let vn = 'https://i.imgur.com/ey6rk2T.mp4'; // Video URL
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? 
    conn.user.jid : m.sender;
    if (!(who in global.db.data.users)) throw `✳️ هذا المستخدم غير موجود في قاعدة بياناتي`;
    let user = global.db.data.users[who];
    let about = (await conn.fetchStatus(who).catch(console.error) || {}).status || '';
    let { name, exp, credit, lastclaim, registered, regTime, age, level, role, wealth, warn } = 
    global.db.data.users[who];
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    let username = conn.getName(who);
    let math = max - xp;

    

    // Menu text
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
    `.trim();

   
    //let messageOptions = {
      //text: str
    //};

    // Sending the menu text
    //conn.sendMessage(m.chat, messageOptions, 'extendedTextMessage', {
      //quoted: m,
      //contextInfo: { mentionedJid: [m.sender] }
    //});

    // Sending the video
    conn.sendMessage(m.chat, { video: { url: vn }, caption: str.trim(), gifPlayback: true, gifAttribution: 0 }, { quoted: m });
  } catch {
    conn.reply(m.chat, '*هناك خطأ*', m);
  }
};

handler.command = /^(اوامر)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;
