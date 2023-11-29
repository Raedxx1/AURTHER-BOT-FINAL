global.rpg = {
  role(level) {
    level = parseInt(level);
    if (isNaN(level)) return { name: "", level: "" };

    const role = [
      { name: "مواطن 👦🏻", level: 0 },
      { name: "شينوبي 🗡️", level: 5 }, //»»————⍟——««\n
      { name: "شونين⚔️", level: 10 },
      { name: "ساموراي 🗡️", level: 15 },
      { name: "هاشيرا ⚕️", level: 20 },
      { name: "حاكم الدمار👺", level: 25 }, //𐏓・,〔𒁷, 𒆜〢
      { name: "تارتاروس 👹", level: 30 },
      { name: "شينيغامي 💀", level: 35 },
      { name: "ملك التنانين 🐉", level: 40 },
      { name: "يونكو 🧛🏻", level: 45 },
      { name: "ملك قراصنة👒", level: 50 },
      { name: "الأسطورة الخالدة", level: 60 },
      { name: "الفارس الأسود 🖤", level: 70 },
      { name: "القوت 🐐", level: 80 },
      { name: "العم", level: 90 },
      { name: "العم آرثر", level: 100 },
    ];

    return role.reverse().find((role) => level >= role.level);
  },
};
