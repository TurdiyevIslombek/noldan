/* GENERATED from content/*.md by scripts/build-catalog.mjs — do not edit. */
import type { Lesson } from "./curriculum-types.js";

export const FREE_LESSONS: Record<string, Lesson[]> = {
  "tokenizator": [
    {
      "id": "dars-01",
      "n": 1,
      "title": "Nega o'zbek tili AI uchun qimmat?",
      "subtitle": "",
      "minutes": 40,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**bilasiz** nima uchun ChatGPT o'zbek tilida yomonroq va qimmatroq ishlashini;",
                "**yozasiz** o'zingizning birinchi dasturingizni;",
                "**ko'rasiz** birinchi xatoyingizni — va uni o'qishni o'rganasiz;",
                "**sanaysiz** matndagi belgilar va so'zlar sonini kod bilan;",
                "**isbotlaysiz** o'zbekcha jumla inglizchasidan uzunroq ekanini — o'z kodingiz bilan."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "ChatGPT'ga ikki xil savol beramiz. Ma'nosi bir xil."
            },
            {
              "kind": "text",
              "text": "Inglizcha: **I like reading**\nO'zbekcha: **Men oʻqishni yaxshi koʻraman**"
            },
            {
              "kind": "text",
              "text": "Ikkalasi ham bir xil narsani aytadi. Endi diqqat qiling — ChatGPT bu jumlalarni o'qiyotganda ularni bo'laklarga bo'ladi. Va bo'laklar soni bir xil emas:"
            },
            {
              "kind": "table",
              "head": [
                "Jumla",
                "ChatGPT necha bo'lakka bo'ladi"
              ],
              "rows": [
                [
                  "I like reading",
                  "**3**"
                ],
                [
                  "Men oʻqishni yaxshi koʻraman",
                  "**9**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Uch barobar ko'p."
            },
            {
              "kind": "media",
              "id": "c1",
              "title": "Bir xil jumla, ikki narx"
            },
            {
              "kind": "text",
              "text": "Bu bo'laklarning nomi bor — ular **token** deb ataladi. Va bu raqam juda muhim, chunki:"
            },
            {
              "kind": "bullets",
              "items": [
                "**Siz pulni token uchun to'laysiz.** Uch barobar ko'p token — uch barobar qimmat.",
                "**Javob sekinroq keladi.** Model har bir tokenni alohida ishlaydi.",
                "**Model kamroq eslab qoladi.** Modelning \"xotirasi\" token bilan o'lchanadi. Bir xil xotiraga o'zbekcha matndan uch barobar kam sig'adi."
              ]
            },
            {
              "kind": "text",
              "text": "Ya'ni: **bir xil ish uchun o'zbek tilida gapiradigan odam ko'proq to'laydi, uzoqroq kutadi va yomonroq javob oladi.**"
            },
            {
              "kind": "text",
              "text": "Bu adolatsizlik, va bu tasodif emas. Buni tuzatish mumkin. Bu kursda biz uni tuzatadigan narsani — **tokenizator**ni — noldan quramiz."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Buni o'zingiz tekshirishingiz mumkin: **tiktokenizer.vercel.app** saytiga kiring va ikkala jumlani yozib ko'ring. Bo'laklar rangli ko'rinadi."
            }
          ]
        },
        {
          "id": "2-tokenizator-nima",
          "title": "2. Tokenizator nima?",
          "blocks": [
            {
              "kind": "text",
              "text": "Kompyuter harfni tushunmaydi. U faqat **raqam** bilan ishlaydi. Demak, matn modelga kirishidan oldin kimdir uni raqamga aylantirishi kerak."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Tokenizator** — bu matnni bo'laklarga bo'lib, har bir bo'lakka raqam beradigan dastur. Va orqaga: raqamlarni yana matnga aylantiradi."
            },
            {
              "kind": "pre",
              "text": "\"Men oʻqishni\"  →  tokenizator  →  [1523, 88, 9041]  →  MODEL\n                                                          ↓\n\"Men oʻqishni yaxshi\"  ←  tokenizator  ←  [1523, 88, 9041, 412]"
            },
            {
              "kind": "text",
              "text": "Tokenizator — modelning eshigi. Har bir so'z u orqali kiradi va u orqali chiqadi."
            },
            {
              "kind": "text",
              "text": "Va mana eng muhim gap: **ChatGPT ning tokenizatori ingliz tili uchun qurilgan.** U o'zbek tilini ko'rmagan, shuning uchun o'zbekcha so'zlarni mayda bo'laklarga maydalaydi. `koʻraman` — bitta so'z — uning uchun 3-4 ta bo'lak."
            },
            {
              "kind": "text",
              "text": "Biz o'zbek tili uchun qurilgan tokenizator yozamiz. Va u ChatGPT nikidan **yaxshiroq** ishlaydi — o'zbek tilida."
            },
            {
              "kind": "text",
              "text": "Buni allaqachon isbotlangan raqam bilan aytaman. Har bir so'z uchun o'rtacha nechta token kerakligi **fertility** deb ataladi (kam bo'lgani yaxshi):"
            },
            {
              "kind": "table",
              "head": [
                "Tokenizator",
                "Lug'at hajmi",
                "Fertility"
              ],
              "rows": [
                [
                  "**uzbek-bpe-16k** (biz quradigan turi)",
                  "16 384",
                  "**1.749**"
                ],
                [
                  "GPT-4o",
                  "200 019",
                  "2.578"
                ],
                [
                  "GPT-2",
                  "50 257",
                  "3.426"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Bu raqamlar 474 ta oʻzbekcha veb-hujjatda oʻlchangan — tokenizator ularni oʻqish paytida hech qachon koʻrmagan. Nima uchun bu shart — Dars 17 da koʻrasiz."
            },
            {
              "kind": "text",
              "text": "O'zbek tili uchun qurilgan kichkina tokenizator, lug'ati **12 barobar kichik** bo'lsa ham, GPT-4o nikidan yaxshiroq. Chunki u to'g'ri til uchun qurilgan."
            },
            {
              "kind": "text",
              "text": "Kurs oxirida sizda ham shunday tokenizator bo'ladi."
            }
          ]
        },
        {
          "id": "3-birinchi-dastur",
          "title": "3. Birinchi dastur",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi kod yozamiz. Agar siz hech qachon kod yozmagan bo'lsangiz — hech qanday muammo yo'q. Bu dars aynan siz uchun yozilgan."
            },
            {
              "kind": "h3",
              "id": "3-1-qayerda-yozamiz",
              "text": "3.1. Qayerda yozamiz"
            },
            {
              "kind": "text",
              "text": "**Google Colab** ni ishlatamiz. Bu bepul va kompyuteringizga hech narsa o'rnatish shart emas."
            },
            {
              "kind": "steps",
              "items": [
                "Brauzerda **colab.research.google.com** ni oching",
                "Google hisobingiz bilan kiring",
                "**\"New notebook\"** (yangi daftar) ni bosing"
              ]
            },
            {
              "kind": "text",
              "text": "Oldingizda bo'sh qutcha paydo bo'ladi. Uning nomi — **katak** (cell). Kodni shu yerga yozasiz."
            },
            {
              "kind": "text",
              "text": "Kodni **ishga tushirish** uchun katakning chap tomonidagi ▶ tugmasini bosing, yoki klaviaturada **Shift + Enter** bosing."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Ishga tushirish — bu kompyuterga \"yozganimni bajarib ber\" deyish. Kompyuter kodni **yuqoridan pastga**, qator-ma-qator o'qiydi va bajaradi. Tartib muhim."
            },
            {
              "kind": "media",
              "id": "c2",
              "title": "Dastur yuqoridan pastga oʻqiladi"
            },
            {
              "kind": "h3",
              "id": "3-2-print-kompyuterga-gapirishni-buyurish",
              "text": "3.2. `print` — kompyuterga gapirishni buyurish"
            },
            {
              "kind": "text",
              "text": "Birinchi katakka shuni yozing va ishga tushiring:"
            },
            {
              "kind": "code",
              "code": "print(\"Salom, dunyo!\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Salom, dunyo!"
            },
            {
              "kind": "text",
              "text": "Tabriklayman — siz dastur yozdingiz."
            },
            {
              "kind": "text",
              "text": "Endi har bir bo'lakni tushunamiz:"
            },
            {
              "kind": "bullets",
              "items": [
                "`print` — bu **buyruq**. Ma'nosi: \"ekranga chiqar\". Kompyuter bu so'zni biladi.",
                "`(` va `)` — qavslar. Buyruqqa **nimani** bajarish kerakligini shu qavslar ichida beramiz. Buyruqdan keyin qavs har doim kerak.",
                "`\"Salom, dunyo!\"` — bu **matn**. Dasturlashda matn **satr** (string) deb ataladi.",
                "`\"` qo'shtirnoqlar — ular kompyuterga \"bu yerdan bu yergacha bo'lgani matn\" deydi. Ularsiz kompyuter matnni buyruq deb o'ylaydi."
              ]
            },
            {
              "kind": "text",
              "text": "Boshqa matn bilan sinab ko'ring:"
            },
            {
              "kind": "code",
              "code": "print(\"Men tokenizator quraman\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Men tokenizator quraman"
            },
            {
              "kind": "h3",
              "id": "3-3-birinchi-xato-va-nega-u-yaxshi",
              "text": "3.3. Birinchi xato — va nega u yaxshi"
            },
            {
              "kind": "text",
              "text": "Endi **ataylab** xato qilamiz. Qo'shtirnoqlarni olib tashlang:"
            },
            {
              "kind": "code",
              "code": "print(Salom)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "NameError: name 'Salom' is not defined",
              "error": true
            },
            {
              "kind": "text",
              "text": "Kompyuter bajarmadi. U xato qaytardi."
            },
            {
              "kind": "text",
              "text": "**Shu yerda to'xtang.** Ko'p odam birinchi xatoni ko'rib qo'rqadi va \"men buni uddalay olmayman\" deb o'ylaydi. Bu noto'g'ri fikr, va mana nega:"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Xato — bu kompyuterning gapirishi. U sizni tanbeh qilmayapti, u sizga nima bo'lganini aytyapti.**"
            },
            {
              "kind": "media",
              "id": "c3",
              "title": "Xato — bu gap"
            },
            {
              "kind": "text",
              "text": "Xatoni o'qishni o'rganamiz. Uni ikki bo'lakka ajrating:"
            },
            {
              "kind": "bullets",
              "items": [
                "`NameError` — xatoning **turi**. \"Name\" = nom. Ya'ni nom bilan bog'liq muammo.",
                "`name 'Salom' is not defined` — xatoning **izohi**. \"'Salom' nomi aniqlanmagan\"."
              ]
            },
            {
              "kind": "text",
              "text": "Kompyuter nima o'yladi? Qo'shtirnoqsiz `Salom` — bu matn emas, bu **nom**. Kompyuter bunday nomni qidirdi, topolmadi va shuni aytdi."
            },
            {
              "kind": "text",
              "text": "Tuzatish — qo'shtirnoqni qaytarish:"
            },
            {
              "kind": "code",
              "code": "print(\"Salom\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "**Buni odat qiling:** xato chiqsa, birinchi navbatda **oxirgi qatorini o'qing**. Xato matnining eng muhim qismi har doim oxirida turadi. Kurs davomida siz yuzlab xato ko'rasiz — bu normal. Tajribali dasturchi ham kuniga o'nlab xato oladi. Farq shundaki, u ularni **o'qiydi**."
            },
            {
              "kind": "h3",
              "id": "3-4-ozgaruvchi-matnni-saqlab-qoyish",
              "text": "3.4. O'zgaruvchi — matnni saqlab qo'yish"
            },
            {
              "kind": "text",
              "text": "Har safar matnni qayta yozish noqulay. Uni **saqlab qo'yish** mumkin:"
            },
            {
              "kind": "code",
              "code": "matn = \"Men oʻqishni yaxshi koʻraman\"\nprint(matn)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Men oʻqishni yaxshi koʻraman"
            },
            {
              "kind": "text",
              "text": "Bu qatorda nima bo'ldi:"
            },
            {
              "kind": "bullets",
              "items": [
                "`matn` — bu **o'zgaruvchi**. Nomni o'zingiz tanlaysiz. Bu — qutining ustidagi yorliq.",
                "`=` — bu \"teng\" emas! Bu **\"joyla\"** degani. O'ngdagini olib, chapdagi qutiga solib qo'y. O'ng tomondan chap tomonga.",
                "Keyin `print(matn)` yozganda qo'shtirnoq **yo'q**, chunki endi `matn` — bu nom, matn emas. Kompyuter nomni qidiradi, quti ichiga qaraydi va u yerdagi matnni chiqaradi."
              ]
            },
            {
              "kind": "text",
              "text": "Farqni ko'ring:"
            },
            {
              "kind": "code",
              "code": "print(\"matn\")\nprint(matn)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "matn\nMen oʻqishni yaxshi koʻraman"
            },
            {
              "kind": "text",
              "text": "Birinchisi — qo'shtirnoqli, ya'ni matnning o'zi. Ikkinchisi — qutining ichidagi narsa."
            },
            {
              "kind": "note",
              "tone": "warn",
              "text": "**O'zgaruvchi nomi qoidalari:** bo'shliq bo'lmaydi (`men matn` ❌, `men_matn` ✓), raqam bilan boshlanmaydi (`1matn` ❌, `matn1` ✓), o'zbekcha `ʻ` ishlatmang (`soʻz` ❌, `soz` ✓ — ba'zi tahrirlagichlar uni buzadi)."
            },
            {
              "kind": "h3",
              "id": "3-5-izoh-ozingizga-yozgan-eslatma",
              "text": "3.5. Izoh — o'zingizga yozgan eslatma"
            },
            {
              "kind": "text",
              "text": "`#` belgisidan keyingi hamma narsani kompyuter **o'qimaydi**:"
            },
            {
              "kind": "code",
              "code": "# Bu izoh. Kompyuter buni koʻrmaydi.\nmatn = \"Salom\"   # bu ham izoh\nprint(matn)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Salom"
            },
            {
              "kind": "text",
              "text": "Izoh — bu kelajakdagi o'zingizga yozilgan xat. Ikki haftadan keyin o'z kodingizga qaraganingizda, \"bu nima qilyapti?\" deb o'ylamaslik uchun."
            },
            {
              "kind": "h3",
              "id": "3-6-len-sanash",
              "text": "3.6. `len` — sanash"
            },
            {
              "kind": "text",
              "text": "Endi birinchi haqiqiy foydali narsa. `len` buyrug'i matndagi **belgilar sonini** qaytaradi:"
            },
            {
              "kind": "code",
              "code": "matn = \"Men oʻqishni yaxshi koʻraman\"\nprint(len(matn))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "28"
            },
            {
              "kind": "bullets",
              "items": [
                "`len` — inglizcha *length* (uzunlik) so'zining qisqartmasi.",
                "U **sanaydi**: matnda nechta belgi bor. Bo'shliqlar ham hisobga olinadi.",
                "E'tibor bering: `len(matn)` **ichkarida** turibdi, `print(...)` esa tashqarida. Kompyuter avval ichkaridagini bajaradi (sanaydi), keyin natijani tashqaridagiga beradi (chiqaradi). Ichkaridan tashqariga."
              ]
            },
            {
              "kind": "text",
              "text": "Endi ikkala jumlani taqqoslaymiz:"
            },
            {
              "kind": "code",
              "code": "uzbekcha = \"Men oʻqishni yaxshi koʻraman\"\ninglizcha = \"I like reading\"\n\nprint(\"oʻzbekcha:\", len(uzbekcha))\nprint(\"inglizcha:\", len(inglizcha))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "oʻzbekcha: 28\ninglizcha: 14"
            },
            {
              "kind": "bullets",
              "items": [
                "`print` ichida vergul bilan bir nechta narsa berish mumkin. Ular orasiga kompyuter o'zi bo'shliq qo'yadi.",
                "Birinchisi — qo'shtirnoqli matn (yorliq), ikkinchisi — hisoblangan son."
              ]
            },
            {
              "kind": "text",
              "text": "**28 va 14.** Bir xil ma'noli jumla, lekin o'zbekchasi **ikki barobar uzun**."
            },
            {
              "kind": "h3",
              "id": "3-7-split-sozlarga-bolish",
              "text": "3.7. `.split` — so'zlarga bo'lish"
            },
            {
              "kind": "text",
              "text": "Belgi emas, **so'z** sanashni xohlasak?"
            },
            {
              "kind": "code",
              "code": "uzbekcha = \"Men oʻqishni yaxshi koʻraman\"\nprint(uzbekcha.split())",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['Men', 'oʻqishni', 'yaxshi', 'koʻraman']"
            },
            {
              "kind": "text",
              "text": "Nima bo'ldi:"
            },
            {
              "kind": "bullets",
              "items": [
                "`.split()` — bu ham buyruq, lekin u **matnga tegishli**. Shuning uchun matndan keyin nuqta qo'yib yoziladi: `uzbekcha.split()`. Nuqta \"shu narsaning ichidagi buyruq\" degani.",
                "U matnni **bo'shliqlar bo'yicha** bo'ladi.",
                "Natija kvadrat qavs ichida chiqdi: `[...]`. Bu — **ro'yxat**. Unda 4 ta alohida matn bor. Ro'yxat bilan batafsil Dars 03 da shug'ullanamiz; hozir shuni bilish yetarli: bu bir nechta narsa bir joyda turibdi.",
                "`split` dan keyin ham qavs bor: `()`. Bo'sh bo'lsa ham, qavs **majburiy** — u kompyuterga \"bu buyruqni hozir bajar\" deydi."
              ]
            },
            {
              "kind": "text",
              "text": "Endi sanaymiz:"
            },
            {
              "kind": "code",
              "code": "uzbekcha = \"Men oʻqishni yaxshi koʻraman\"\ninglizcha = \"I like reading\"\n\nprint(\"oʻzbekcha soʻzlar:\", len(uzbekcha.split()))\nprint(\"inglizcha soʻzlar:\", len(inglizcha.split()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "oʻzbekcha soʻzlar: 4\ninglizcha soʻzlar: 3"
            },
            {
              "kind": "text",
              "text": "`len(uzbekcha.split())` — uch qavat. Ichkaridan tashqariga o'qing:"
            },
            {
              "kind": "steps",
              "items": [
                "`uzbekcha` — matnni ol",
                "`.split()` — so'zlarga bo'l",
                "`len(...)` — nechtaligini sana"
              ]
            }
          ]
        },
        {
          "id": "4-muammo",
          "title": "4. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda endi ikkita o'lchov bor. Ikkalasi ham — **noto'g'ri** o'lchov."
            },
            {
              "kind": "text",
              "text": "**Belgi bo'ladimi?** Bitta belgi = bitta token qilsak, `koʻraman` 8 ta token bo'ladi:"
            },
            {
              "kind": "code",
              "code": "soz = \"koʻraman\"\nprint(\"belgilar:\", len(soz))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "belgilar: 8"
            },
            {
              "kind": "text",
              "text": "Bitta so'z uchun 8 ta token — bu juda isrof. Model har bir belgini alohida ishlashi kerak bo'ladi va hech narsa ulgurmaydi."
            },
            {
              "kind": "text",
              "text": "**So'z bo'ladimi?** Unda `koʻraman` bitta token bo'ladi — yaxshi. Lekin o'zbek tili\n**agglyutinativ**: bitta o'zakka ko'p qo'shimcha ulanadi."
            },
            {
              "kind": "pre",
              "text": "koʻr      koʻraman      koʻrmadim      koʻrolmaganlaridan"
            },
            {
              "kind": "text",
              "text": "Bularning har biri alohida so'z. Agar har bir so'z alohida token bo'lsa, lug'atda millionlab token kerak bo'ladi — va yangi so'z chiqsa, model uni umuman bilmaydi."
            },
            {
              "kind": "text",
              "text": "**Demak, to'g'ri javob o'rtada.** Belgidan katta, so'zdan kichik. `koʻraman` ni `koʻr` + `aman` qilib bo'lish kerak — chunki `aman` boshqa so'zlarda ham qaytariladi."
            },
            {
              "kind": "text",
              "text": "Lekin qayerdan bo'lish kerakligini kim aytadi? Qo'lda yozib chiqamizmi? Yo'q — **algoritm o'zi topadi**. Shu algoritmning nomi **BPE**, va uni Dars 08 dan qura boshlaymiz."
            },
            {
              "kind": "text",
              "text": "Undan oldin yana bitta narsa: **kompyuter harfni qanday saqlaydi?** Chunki hozirgacha biz belgi sanadik, lekin kompyuter uchun `koʻraman` da 8 ta emas, **9 ta** joy band. Nega bittasi ortiqcha — bu 6-darsda ochiladi."
            }
          ]
        },
        {
          "id": "5-toliq-kod",
          "title": "5. To'liq kod",
          "blocks": [
            {
              "kind": "text",
              "text": "Colab'da yangi katak ochib, hammasini yozing va ishga tushiring:"
            },
            {
              "kind": "code",
              "code": "# ---- 1. Birinchi dastur ----\nprint(\"Salom, dunyo!\")\n\n# ---- 2. Oʻzgaruvchi ----\nuzbekcha = \"Men oʻqishni yaxshi koʻraman\"\ninglizcha = \"I like reading\"\nprint(uzbekcha)\nprint(inglizcha)\n\n# ---- 3. Belgilarni sanash ----\nprint(\"oʻzbekcha belgilar:\", len(uzbekcha))\nprint(\"inglizcha belgilar:\", len(inglizcha))\n\n# ---- 4. Soʻzlarga boʻlish ----\nprint(uzbekcha.split())\nprint(inglizcha.split())\n\n# ---- 5. Soʻzlarni sanash ----\nprint(\"oʻzbekcha soʻzlar:\", len(uzbekcha.split()))\nprint(\"inglizcha soʻzlar:\", len(inglizcha.split()))\n\n# ---- 6. Bitta soʻz ----\nsoz = \"koʻraman\"\nprint(\"koʻraman — belgilar soni:\", len(soz))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Salom, dunyo!\nMen oʻqishni yaxshi koʻraman\nI like reading\noʻzbekcha belgilar: 28\ninglizcha belgilar: 14\n['Men', 'oʻqishni', 'yaxshi', 'koʻraman']\n['I', 'like', 'reading']\noʻzbekcha soʻzlar: 4\ninglizcha soʻzlar: 3\nkoʻraman — belgilar soni: 8",
              "label": "Kutilgan natija"
            },
            {
              "kind": "text",
              "text": "Agar sizda boshqacha chiqsa — kodni qatorma-qator solishtiring. Bir belgi farq qilsa ham natija o'zgaradi."
            }
          ]
        },
        {
          "id": "6-ozingiz-yozing",
          "title": "6. O'zingiz yozing",
          "blocks": [
            {
              "kind": "text",
              "text": "Quyidagi kodda bo'sh joylar bor. To'ldiring va ishga tushiring."
            },
            {
              "kind": "code",
              "code": "ism = \"___\"              # bu yerga oʻz ismingizni yozing\n\nprint(\"Mening ismim:\", ___)\nprint(\"Ismimda ___ ta belgi bor:\", len(___))",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "ism = \"Islombek\"\n\nprint(\"Mening ismim:\", ism)\nprint(\"Ismimda nechta belgi bor:\", len(ism))",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "output",
                  "text": "Mening ismim: Islombek\nIsmimda nechta belgi bor: 8"
                },
                {
                  "kind": "text",
                  "text": "Diqqat: `print(\"Mening ismim:\", ism)` da birinchisi qo'shtirnoqli (matnning o'zi), ikkinchisi qo'shtirnoqsiz (qutining nomi)."
                }
              ]
            }
          ]
        },
        {
          "id": "7-mashqlar",
          "title": "7. Mashqlar",
          "blocks": [
            {
              "kind": "text",
              "text": "Javobni ochishdan **oldin** o'zingiz yozib ko'ring va ishga tushiring."
            },
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`print` ni `Print` deb yozib ko'ring. Qanday xato chiqadi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "NameError: name 'Print' is not defined",
                    "error": true
                  },
                  {
                    "kind": "text",
                    "text": "Python **katta va kichik harfni farqlaydi**. `print` va `Print` — ikki xil nom. Kompyuter `Print` degan buyruqni bilmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Bu kurs davomida ko'p uchraydigan xato. Xato turi `NameError` bo'lsa, birinchi tekshiradigan narsangiz — imlo va katta harf."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu ikkitasining natijasi nima uchun har xil?"
                },
                {
                  "kind": "code",
                  "code": "son = \"8\"\nprint(len(son))\nprint(len(\"son\"))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "1\n3"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`len(son)` — qo'shtirnoqsiz, ya'ni quti ichiga qaraydi. Ichida `\"8\"` bor, unda 1 ta belgi.",
                      "`len(\"son\")` — qo'shtirnoqli, ya'ni matnning o'zi. `s`, `o`, `n` — 3 ta belgi."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "**Qo'shtirnoq bor yoki yo'qligi butun ma'noni o'zgartiradi.** Boshlovchilar uchun bu eng ko'p chalkashtiradigan narsa, shuning uchun uni hozir mustahkamlang."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Quyidagi jumla nechta belgi va nechta so'zdan iborat? Avval **qo'lda hisoblang**, keyin kod bilan tekshiring."
                },
                {
                  "kind": "pre",
                  "text": "Oʻzbekiston Respublikasi poytaxti Toshkent"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "jumla = \"Oʻzbekiston Respublikasi poytaxti Toshkent\"\nprint(len(jumla))\nprint(len(jumla.split()))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "42\n4"
                  },
                  {
                    "kind": "text",
                    "text": "Qo'lda sanaganda bo'shliqlarni unutmaslik kerak — ular ham belgi. 4 ta so'z orasida 3 ta bo'shliq bor."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`.split()` bo'shliq bo'yicha bo'ladi. Unda bu nima qaytaradi?"
                },
                {
                  "kind": "code",
                  "code": "print(\"salom\".split())",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "['salom']"
                  },
                  {
                    "kind": "text",
                    "text": "Bitta elementli ro'yxat. Bo'shliq yo'q, shuning uchun bo'linmadi — lekin natija baribir **ro'yxat** bo'lib chiqdi, oddiy matn emas."
                  },
                  {
                    "kind": "text",
                    "text": "Bu muhim: `.split()` har doim ro'yxat qaytaradi, hatto bo'lish kerak bo'lmasa ham. `len(\"salom\")` = 5 (belgilar), `len(\"salom\".split())` = 1 (so'zlar). Ikki xil savol, ikki xil javob."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Kursning boshida aytilgan edi: ChatGPT o'zbekcha jumlani 9 ta tokenga, inglizchasini 3 ta tokenga bo'ladi. Lekin biz kod bilan o'lchaganimizda so'zlar soni 4 va 3 chiqdi — ya'ni deyarli teng."
                },
                {
                  "kind": "text",
                  "text": "Nima uchun token soni va so'z soni bunchalik farq qiladi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "Chunki **token so'z emas**."
                  },
                  {
                    "kind": "text",
                    "text": "Inglizcha jumlada har bir so'z ChatGPT ning lug'atida **butunicha** bor: `I`, `like`, `reading` → 3 so'z, 3 token. Deyarli mos."
                  },
                  {
                    "kind": "text",
                    "text": "O'zbekcha jumlada esa so'zlar lug'atda yo'q. ChatGPT ularni bo'laklarga maydalaydi: `koʻraman` bitta so'z, lekin uning uchun 3-4 ta token ketadi. Natijada 4 so'z → 9 token."
                  },
                  {
                    "kind": "text",
                    "text": "**Mana shu farq — butun kursning sababi.** Fertility (so'zga to'g'ri keladigan token soni) GPT-4o uchun o'zbek tilida 2.578. Ya'ni har bir so'z o'rtacha 2.6 ta tokenga bo'linadi."
                  },
                  {
                    "kind": "text",
                    "text": "Biz quradigan tokenizatorda bu raqam **1.749** bo'ladi — chunki uning lug'ati o'zbek so'zlaridan qurilgan."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 16 da siz bu raqamni **o'z tokenizatoringizda o'zingiz o'lchaysiz**."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "8-xulosa",
          "title": "8. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "Model matnni tushunmaydi — u faqat raqam bilan ishlaydi. Matnni raqamga aylantiradigan narsa — **tokenizator**.",
                "ChatGPT ning tokenizatori ingliz tili uchun qurilgan, shuning uchun o'zbekcha matn 3 barobar ko'p tokenga bo'linadi — qimmatroq, sekinroq, yomonroq.",
                "`print()` — ekranga chiqaradi. Qavs ichidagi qo'shtirnoqli narsa — matn.",
                "`nom = qiymat` — qiymatni qutiga joylaydi. `=` \"teng\" emas, \"joyla\" degani.",
                "`len()` — nechtaligini sanaydi. `.split()` — bo'shliq bo'yicha bo'ladi.",
                "**Xato — bu ma'lumot, jazo emas.** Oxirgi qatorini o'qing."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Bugun matnni butunicha ishlatdik. Lekin tokenizator matnni **bo'laklarga** bo'lishi kerak — demak matn ichidan alohida harfni, alohida bo'lakni olishni bilish kerak."
            },
            {
              "kind": "text",
              "text": "**Dars 02 — Matn bilan ishlash.** Satrdan bitta harfni olish, o'rtasidan bo'lak kesish, matnlarni qo'shish va almashtirish."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *`\"salom\"` matnining 0-belgisi qaysi harf — `s` mi yoki `a` mi?* Javob ko'pchilikni hayron qoldiradi."
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "hech narsa. Kod yozmagan bo'lsangiz ham, bu dars siz uchun."
    },
    {
      "id": "dars-02",
      "n": 2,
      "title": "Matn bilan ishlash",
      "subtitle": "",
      "minutes": 45,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**olasiz** matndan istalgan bitta belgini — nomeri bo'yicha;",
                "**kesasiz** matnning istalgan bo'lagini — boshidan, o'rtasidan, oxiridan;",
                "**tushunasiz** nima uchun Python noldan sanashini, va bu nima uchun aslida qulay;",
                "**almashtirasiz** matn ichidagi belgilarni — bu tokenizatoringizning haqiqiy qismi bo'ladi;",
                "**ko'rasiz** `oʻ` ning ichida yashiringan sirni, va u butun kursga ta'sir qiladi."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "O'tgan darsda savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "`\"salom\"` matnining **0-belgisi** qaysi harf?"
            },
            {
              "kind": "text",
              "text": "Ko'pchilik `a` deb javob beradi. Mantiq shunday: birinchi harf `s`, demak 0-chisi undan oldin, yoki keyingisi..."
            },
            {
              "kind": "text",
              "text": "Tekshiramiz:"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\nprint(soz[0])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "s"
            },
            {
              "kind": "text",
              "text": "**0-belgi — bu birinchi harf.**"
            },
            {
              "kind": "text",
              "text": "Python (va deyarli barcha dasturlash tillari) **noldan sanaydi**. Birinchi — 0, ikkinchi — 1, uchinchi — 2."
            },
            {
              "kind": "text",
              "text": "Bu g'alati tuyuladi, lekin sababi bor va u darsning o'rtasida ochiladi."
            },
            {
              "kind": "text",
              "text": "Hozir esa ikkinchi savol, va bu ancha muhimroq:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "`\"koʻraman\"` matnining **1-belgisi** nima?"
            },
            {
              "kind": "text",
              "text": "Siz `oʻ` deb o'ylayapsiz. Javob boshqacha. Va bu farq butun kursning eng muhim texnik muammolaridan birini ochadi."
            }
          ]
        },
        {
          "id": "2-matn-bu-belgilar-zanjiri",
          "title": "2. Matn — bu belgilar zanjiri",
          "blocks": [
            {
              "kind": "text",
              "text": "Kompyuter uchun matn — bu bir-biriga ulangan belgilar zanjiri. Har bir belgining o'z **o'rni** bor, va o'rinlar raqamlangan:"
            },
            {
              "kind": "pre",
              "text": " s   a   l   o   m\n 0   1   2   3   4"
            },
            {
              "kind": "text",
              "text": "Bu raqam **indeks** deb ataladi. Indeks — bu belgining manzili."
            },
            {
              "kind": "text",
              "text": "Matndan bitta belgini olish uchun kvadrat qavs ichida uning indeksini yozasiz:"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\nprint(soz[0])\nprint(soz[1])\nprint(soz[4])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "s\na\nm"
            },
            {
              "kind": "bullets",
              "items": [
                "`soz[0]` — 0-manzildagi belgi, ya'ni `s`",
                "`soz[1]` — 1-manzildagi belgi, ya'ni `a`",
                "`soz[4]` — 4-manzildagi belgi, ya'ni `m` (oxirgisi)"
              ]
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Diqqat:** qavs turi muhim. `soz(0)` ❌ — dumaloq qavs buyruq chaqiradi. `soz[0]` ✓ — kvadrat qavs indeks oladi."
            }
          ]
        },
        {
          "id": "3-ataylab-xato-chegaradan-chiqish",
          "title": "3. Ataylab xato: chegaradan chiqish",
          "blocks": [
            {
              "kind": "text",
              "text": "Nima bo'ladi, agar mavjud bo'lmagan manzilni so'rasak? `\"salom\"` da 5 ta belgi bor, manzillar 0 dan 4 gacha. `soz[5]` ni so'raymiz:"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\nprint(soz[5])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "IndexError: string index out of range",
              "error": true
            },
            {
              "kind": "text",
              "text": "Xatoni o'qiymiz (Dars 01 dagidek — ikki bo'lakka ajratamiz):"
            },
            {
              "kind": "bullets",
              "items": [
                "`IndexError` — xato **turi**. Indeks bilan bog'liq muammo.",
                "`string index out of range` — **izohi**: \"satr indeksi chegaradan tashqarida\"."
              ]
            },
            {
              "kind": "text",
              "text": "Kompyuter 5-manzilga bordi, u yerda hech narsa yo'q edi, va shuni aytdi."
            },
            {
              "kind": "text",
              "text": "**Qoida:** `n` ta belgili matnda manzillar **0 dan n−1 gacha**. 5 ta belgi → 0, 1, 2, 3, 4. Oxirgi manzil har doim `len(matn) - 1`."
            },
            {
              "kind": "text",
              "text": "Bu `-1` ni Dars 01 dagi savolga bog'lang: sanash noldan boshlangani uchun, oxirgi raqam har doim **umumiy sondan bitta kam**."
            },
            {
              "kind": "media",
              "id": "d1",
              "title": "Noldan sanash"
            }
          ]
        },
        {
          "id": "4-orqadan-sanash",
          "title": "4. Orqadan sanash",
          "blocks": [
            {
              "kind": "text",
              "text": "Oxirgi belgini olish uchun har safar `len(matn) - 1` hisoblash noqulay. Python osonroq yo'l beradi — **manfiy indeks**:"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\nprint(soz[-1])\nprint(soz[-2])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "m\no"
            },
            {
              "kind": "pre",
              "text": " s   a   l   o   m\n 0   1   2   3   4      ← oldidan\n-5  -4  -3  -2  -1      ← orqadan"
            },
            {
              "kind": "bullets",
              "items": [
                "`soz[-1]` — oxirgi belgi. **Har doim.** Matn uzunligini bilish shart emas.",
                "`soz[-2]` — oxiridan ikkinchisi."
              ]
            },
            {
              "kind": "text",
              "text": "E'tibor bering: orqadan sanash **birdan** boshlanadi, noldan emas. Chunki `-0` degan narsa yo'q — `-0` bu `0`, ya'ni birinchi belgi."
            },
            {
              "kind": "text",
              "text": "`soz[-1]` ni yodlab qo'ying. Bu kursda juda ko'p ishlatiladi."
            }
          ]
        },
        {
          "id": "5-yashirin-belgi",
          "title": "5. Yashirin belgi",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi 1-bo'limdagi ikkinchi savolga qaytamiz."
            },
            {
              "kind": "code",
              "code": "soz = \"koʻraman\"\nprint(\"belgilar soni:\", len(soz))\nprint(\"0:\", soz[0])\nprint(\"1:\", soz[1])\nprint(\"2:\", soz[2])\nprint(\"3:\", soz[3])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "belgilar soni: 8\n0: k\n1: o\n2: ʻ\n3: r"
            },
            {
              "kind": "text",
              "text": "**To'xtang va buni diqqat bilan o'qing.**"
            },
            {
              "kind": "text",
              "text": "Siz `koʻraman` ni ko'rganingizda `koʻ` ni **bitta harf** deb o'ylaysiz. O'zbek tilida bu bitta tovush, bitta harf."
            },
            {
              "kind": "text",
              "text": "Kompyuter uchun esa bu **ikkita alohida belgi**:"
            },
            {
              "kind": "pre",
              "text": " k   o   ʻ   r   a   m   a   n\n 0   1   2   3   4   5   6   7"
            },
            {
              "kind": "bullets",
              "items": [
                "1-manzilda — oddiy `o` harfi",
                "2-manzilda — `ʻ` belgisi, **butunlay alohida**"
              ]
            },
            {
              "kind": "text",
              "text": "Ya'ni `oʻ` — bu bitta harf emas, bu `o` va undan keyin turgan boshqa belgi."
            },
            {
              "kind": "media",
              "id": "d2",
              "title": "Yashirin belgi"
            },
            {
              "kind": "text",
              "text": "**Nega bu muhim?**"
            },
            {
              "kind": "steps",
              "items": [
                "`koʻraman` sizning ko'zingizda 7 harf, kompyuter uchun **8 belgi**.",
                "Tokenizator `oʻ` ni tasodifan ikkiga bo'lib yuborishi mumkin — va `o` + `ʻ` degan ma'nosiz bo'laklar hosil bo'ladi.",
                "Va eng yomoni: `ʻ` ni odamlar **to'rt xil** yozadi — `oʻ`, `o'`, `o‘`, `o`. Kompyuter uchun bular to'rt xil so'z."
              ]
            },
            {
              "kind": "text",
              "text": "Bu — o'zbek tili uchun tokenizator qurishdagi asosiy texnik muammolardan biri. Uni Dars 14 da to'liq hal qilamiz. Hozircha shuni biling: **ko'z ko'rgan narsa va kompyuter ko'rgan narsa — har doim bir xil emas.**"
            }
          ]
        },
        {
          "id": "6-kesish-bolak-olish",
          "title": "6. Kesish — bo'lak olish",
          "blocks": [
            {
              "kind": "text",
              "text": "Bitta belgi emas, **bo'lak** olish kerak bo'lsa, ikki nuqta ishlatiladi:"
            },
            {
              "kind": "code",
              "code": "soz = \"koʻraman\"\nprint(soz[0:3])\nprint(soz[3:8])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "koʻ\nraman"
            },
            {
              "kind": "text",
              "text": "Yozilishi: `matn[boshi:oxiri]`"
            },
            {
              "kind": "bullets",
              "items": [
                "`boshi` — qayerdan boshlab olish (shu manzil **kiradi**)",
                "`oxiri` — qayerda to'xtash (shu manzil **kirmaydi**)"
              ]
            },
            {
              "kind": "text",
              "text": "`soz[0:3]` = 0, 1, 2-manzillar. **3-manzil kirmaydi.**"
            },
            {
              "kind": "h3",
              "id": "nima-uchun-oxirgisi-kirmaydi",
              "text": "Nima uchun oxirgisi kirmaydi?"
            },
            {
              "kind": "text",
              "text": "Bu boshida g'alati tuyuladi, lekin sababi juda amaliy."
            },
            {
              "kind": "text",
              "text": "Indekslarni **belgilarda emas, belgilar orasidagi kesish joylarida** tasavvur qiling:"
            },
            {
              "kind": "pre",
              "text": " |  k  |  o  |  ʻ  |  r  |  a  |  m  |  a  |  n  |\n 0     1     2     3     4     5     6     7     8"
            },
            {
              "kind": "text",
              "text": "Endi `soz[0:3]` — bu \"0-kesikdan 3-kesikgacha bo'lgan bo'lak\". Va hammasi joyiga tushadi:"
            },
            {
              "kind": "bullets",
              "items": [
                "bo'lak uzunligi har doim `oxiri - boshi` = 3 − 0 = 3 ✓",
                "`soz[0:3]` va `soz[3:8]` — hech narsa yo'qolmaydi, hech narsa takrorlanmaydi",
                "ikkisini qo'shsangiz, butun so'z chiqadi"
              ]
            },
            {
              "kind": "text",
              "text": "Bu tokenizator uchun hayotiy muhim: so'zni bo'laklarga bo'lganda **hamma belgi aynan bir marta** ishlatilishi kerak."
            },
            {
              "kind": "media",
              "id": "d3",
              "title": "Kesish"
            },
            {
              "kind": "h3",
              "id": "qisqartmalar",
              "text": "Qisqartmalar"
            },
            {
              "kind": "text",
              "text": "Agar boshi 0 bo'lsa yoki oxiri matn oxirigacha bo'lsa, ularni yozmasa ham bo'ladi:"
            },
            {
              "kind": "code",
              "code": "soz = \"koʻraman\"\nprint(soz[:3])\nprint(soz[3:])\nprint(soz[:])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "koʻ\nraman\nkoʻraman"
            },
            {
              "kind": "bullets",
              "items": [
                "`soz[:3]` — boshidan 3-gacha",
                "`soz[3:]` — 3-dan oxirigacha",
                "`soz[:]` — butunicha (nusxa)"
              ]
            },
            {
              "kind": "text",
              "text": "Bitta mashq, o'zingiz taxmin qiling: `\"salom\"[1:4]` nima beradi?"
            },
            {
              "kind": "code",
              "code": "print(\"salom\"[1:4])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "alo"
            },
            {
              "kind": "text",
              "text": "1, 2, 3-manzillar: `a`, `l`, `o`. 4-manzil (`m`) kirmadi."
            }
          ]
        },
        {
          "id": "7-matnlarni-qoshish",
          "title": "7. Matnlarni qo'shish",
          "blocks": [
            {
              "kind": "code",
              "code": "a = \"salom\"\nb = \"dunyo\"\nprint(a + b)\nprint(a + \" \" + b)\nprint(a * 3)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "salomdunyo\nsalom dunyo\nsalomsalomsalom"
            },
            {
              "kind": "bullets",
              "items": [
                "`+` — matnlarni **ulaydi**. Bo'shliq o'zi qo'shilmaydi, kerak bo'lsa qo'lda qo'shasiz: `a + \" \" + b`.",
                "`*` — matnni takrorlaydi."
              ]
            },
            {
              "kind": "text",
              "text": "Diqqat: `+` sonlar bilan qo'shadi, matnlar bilan ulaydi. `2 + 3` = `5`, lekin `\"2\" + \"3\"` = `\"23\"`."
            },
            {
              "kind": "h3",
              "id": "ataylab-xato-turlarni-aralashtirish",
              "text": "Ataylab xato: turlarni aralashtirish"
            },
            {
              "kind": "code",
              "code": "print(\"salom\" + 5)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "TypeError: can only concatenate str (not \"int\") to str",
              "error": true
            },
            {
              "kind": "bullets",
              "items": [
                "`TypeError` — **tur** bilan bog'liq xato.",
                "Izohi: \"satrga faqat satrni ulash mumkin, `int` ni emas\".",
                "`str` = string (satr, matn). `int` = integer (butun son)."
              ]
            },
            {
              "kind": "text",
              "text": "Kompyuter matn bilan sonni qo'sha olmaydi — ular boshqa turdagi narsalar."
            },
            {
              "kind": "text",
              "text": "Tuzatish: sonni matnga aylantiramiz:"
            },
            {
              "kind": "code",
              "code": "print(\"salom\" + str(5))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "salom5"
            },
            {
              "kind": "text",
              "text": "`str(...)` — istalgan narsani matnga aylantiradi."
            }
          ]
        },
        {
          "id": "8-matnni-ozgartirish",
          "title": "8. Matnni o'zgartirish",
          "blocks": [
            {
              "kind": "h3",
              "id": "lower-va-upper",
              "text": "`.lower()` va `.upper()`"
            },
            {
              "kind": "code",
              "code": "katta = \"Men OʻQISHNI Yaxshi Koʻraman\"\nprint(katta.lower())\nprint(katta.upper())",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "men oʻqishni yaxshi koʻraman\nMEN OʻQISHNI YAXSHI KOʻRAMAN"
            },
            {
              "kind": "text",
              "text": "Nima uchun bu kerak? Chunki kompyuter uchun `Men` va `men` — **ikki xil matn**. Agar tokenizator ularni alohida o'rgansa, bilim ikkiga bo'linadi va ikkalasi ham yomon o'rganiladi. Shuning uchun ko'pincha matn avval kichiklashtiriladi."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "E'tibor bering: `.upper()` da `ʻ` o'zgarmadi. Uning katta harfi yo'q — u harf emas, yordamchi belgi. Yana bir dalil: `ʻ` alohida yashaydi."
            },
            {
              "kind": "h3",
              "id": "replace-almashtirish",
              "text": "`.replace()` — almashtirish"
            },
            {
              "kind": "code",
              "code": "xato = \"o'zbek tili o'zbekcha\"\ntogri = xato.replace(\"'\", \"ʻ\")\nprint(\"oldin :\", xato)\nprint(\"keyin :\", togri)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "oldin : o'zbek tili o'zbekcha\nkeyin : oʻzbek tili oʻzbekcha"
            },
            {
              "kind": "text",
              "text": "`matn.replace(nimani, nimaga)` — ikkita parametr oladi:"
            },
            {
              "kind": "bullets",
              "items": [
                "**1-parametr** — nimani qidirish kerak",
                "**2-parametr** — o'rniga nimani qo'yish kerak"
              ]
            },
            {
              "kind": "text",
              "text": "Va u **hamma** uchragan joyni almashtiradi, faqat birinchisini emas:"
            },
            {
              "kind": "code",
              "code": "print(\"aaa\".replace(\"a\", \"b\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bbb"
            },
            {
              "kind": "text",
              "text": "**Shu ikki qator kod — sizning tokenizatoringizning haqiqiy qismi.** O'zbek matnida odamlar `ʻ` o'rniga oddiy apostrof `'` yozadi. Tokenizator ishlashidan oldin ularni bir xil ko'rinishga keltirish kerak. Bu **normalizatsiya** deb ataladi va Dars 14 da to'liq yozamiz."
            },
            {
              "kind": "h3",
              "id": "muhim-tuzoq-matn-ozgarmaydi",
              "text": "Muhim tuzoq: matn o'zgarmaydi"
            },
            {
              "kind": "code",
              "code": "asl = \"salom\"\nasl.replace(\"s\", \"S\")\nprint(asl)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "salom"
            },
            {
              "kind": "text",
              "text": "**Hech narsa o'zgarmadi!** Nega?"
            },
            {
              "kind": "text",
              "text": "Chunki `.replace()` asl matnni **o'zgartirmaydi** — u **yangi** matn qaytaradi. Agar uni saqlab olmasangiz, natija yo'qoladi."
            },
            {
              "kind": "text",
              "text": "To'g'ri yo'l:"
            },
            {
              "kind": "code",
              "code": "asl = \"salom\"\nyangi = asl.replace(\"s\", \"S\")\nprint(yangi)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Salom"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Python'da matn **o'zgarmas** (immutable). Uni tahrirlab bo'lmaydi, faqat yangisini yasash mumkin. `.lower()`, `.upper()`, `.replace()` — hammasi shunday ishlaydi: natijani **o'zgaruvchiga yozib olish kerak.** Bu boshlovchilar eng ko'p qoqiladigan tuzoq. \"Kodim ishlamayapti\" deganlarning yarmi aynan shu."
            }
          ]
        },
        {
          "id": "9-f-satr-matn-ichiga-qiymat-qoyish",
          "title": "9. `f`-satr — matn ichiga qiymat qo'yish",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 01 da `print` ichida vergul ishlatgan edik. Chiroyliroq yo'l bor:"
            },
            {
              "kind": "code",
              "code": "soz = \"koʻraman\"\nprint(f\"{soz} soʻzida {len(soz)} ta belgi bor\")\nprint(f\"birinchi belgi: {soz[0]}, oxirgi belgi: {soz[-1]}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "koʻraman soʻzida 8 ta belgi bor\nbirinchi belgi: k, oxirgi belgi: n"
            },
            {
              "kind": "bullets",
              "items": [
                "Qo'shtirnoqdan **oldin** `f` harfi turadi — bu \"formatlangan satr\" degani.",
                "`{...}` ichidagi narsa **hisoblanadi** va natijasi matnga qo'yiladi.",
                "`{}` ichiga o'zgaruvchi ham, buyruq ham (`len(soz)`), indeks ham (`soz[0]`) yozish mumkin."
              ]
            },
            {
              "kind": "text",
              "text": "`f` ni unutsangiz, xato chiqmaydi — shunchaki qavslar matn bo'lib chiqadi:"
            },
            {
              "kind": "code",
              "code": "print(\"{soz} ta belgi\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{soz} ta belgi"
            },
            {
              "kind": "text",
              "text": "Xato yo'q, lekin natija noto'g'ri. **Bunday xatolarni topish qiyinroq**, chunki kompyuter shikoyat qilmaydi."
            }
          ]
        },
        {
          "id": "10-buni-tokenizatorga-boglaymiz",
          "title": "10. Buni tokenizatorga bog'laymiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi biz **so'zni bo'laklarga bo'la olamiz**. Tokenizatorning butun ishi shu:"
            },
            {
              "kind": "code",
              "code": "soz = \"koʻraman\"\n\nozak = soz[:3]\nqoshimcha = soz[3:]\n\nprint(\"oʻzak     :\", ozak)\nprint(\"qoʻshimcha:\", qoshimcha)\nprint(\"qayta yigʻish:\", ozak + qoshimcha)\nprint(\"teng keldimi:\", ozak + qoshimcha == soz)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "oʻzak     : koʻ\nqoʻshimcha: raman\nqayta yigʻish: koʻraman\nteng keldimi: True"
            },
            {
              "kind": "text",
              "text": "Oxirgi qatorda yangi belgi bor: `==`."
            },
            {
              "kind": "bullets",
              "items": [
                "`=` (bitta) — **joyla**: o'ngdagini chapdagi qutiga sol.",
                "`==` (ikkita) — **tengmi?**: ikki tomonni solishtir va `True` yoki `False` qaytar."
              ]
            },
            {
              "kind": "text",
              "text": "Bu ikkisini aralashtirmang. `==` hech narsani o'zgartirmaydi, faqat tekshiradi."
            },
            {
              "kind": "text",
              "text": "`True` — bu \"rost\". Ya'ni bo'laklarni qayta yig'ganimizda aynan asl so'z chiqdi. Hech narsa yo'qolmadi."
            },
            {
              "kind": "text",
              "text": "**Bu tekshiruvning nomi bor: round-trip (borib-kelish).** Tokenizator uchun bu eng muhim sinov:"
            },
            {
              "kind": "pre",
              "text": "matn → bo'laklar → raqamlar → bo'laklar → matn"
            },
            {
              "kind": "text",
              "text": "Agar oxirida asl matn chiqmasa, tokenizator buzuq. Kurs davomida bu tekshiruvni ko'p marta yozasiz."
            }
          ]
        },
        {
          "id": "11-muammo",
          "title": "11. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Bo'laklarga bo'lishni o'rgandik. Lekin bitta savol javobsiz qoldi:"
            },
            {
              "kind": "text",
              "text": "**Qayerdan bo'lish kerakligini kim aytadi?**"
            },
            {
              "kind": "text",
              "text": "Men `soz[:3]` deb yozdim — ya'ni bo'lish joyini **o'zim** tanladim. `koʻ` + `raman`. Nega 3? Chunki men o'zbek tilini bilaman."
            },
            {
              "kind": "text",
              "text": "Lekin tokenizator million so'zni bo'lishi kerak. Ularning har biri uchun qo'lda raqam yozib chiqib bo'lmaydi."
            },
            {
              "kind": "text",
              "text": "Va ikkinchi muammo: hozircha men faqat **bitta** so'z bilan ishladim. Million so'zni qanday ishlayman? Har biri uchun alohida `print` yozamanmi?"
            },
            {
              "kind": "text",
              "text": "Ikkala muammoning ham javobi bitta narsada: **ko'p narsani bir joyda saqlash va ular bo'ylab avtomatik yurish**. Bu keyingi darsning mavzusi."
            }
          ]
        },
        {
          "id": "12-toliq-kod",
          "title": "12. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "# ---- 1. Indeks ----\nsoz = \"salom\"\nprint(soz[0])       # s\nprint(soz[4])       # m\nprint(soz[-1])      # m  (oxirgisi)\n\n# ---- 2. Yashirin belgi ----\nsoz2 = \"koʻraman\"\nprint(\"belgilar soni:\", len(soz2))\nprint(\"0:\", soz2[0], \"| 1:\", soz2[1], \"| 2:\", soz2[2], \"| 3:\", soz2[3])\n\n# ---- 3. Kesish ----\nprint(soz2[0:3])    # koʻ\nprint(soz2[3:])     # raman\nprint(soz2[:])      # koʻraman\n\n# ---- 4. Qoʻshish ----\na = \"salom\"\nb = \"dunyo\"\nprint(a + \" \" + b)\nprint(a * 3)\n\n# ---- 5. Oʻzgartirish ----\nkatta = \"Men Koʻraman\"\nprint(katta.lower())\n\nxato = \"o'zbek tili\"\ntogri = xato.replace(\"'\", \"ʻ\")\nprint(togri)\n\n# ---- 6. f-satr ----\nprint(f\"{soz2} soʻzida {len(soz2)} ta belgi bor\")\n\n# ---- 7. Round-trip tekshiruvi ----\nozak = soz2[:3]\nqoshimcha = soz2[3:]\nprint(\"teng keldimi:\", ozak + qoshimcha == soz2)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "s\nm\nm\nbelgilar soni: 8\n0: k | 1: o | 2: ʻ | 3: r\nkoʻ\nraman\nkoʻraman\nsalom dunyo\nsalomsalomsalom\nmen koʻraman\noʻzbek tili\nkoʻraman soʻzida 8 ta belgi bor\nteng keldimi: True",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "13-ozingiz-yozing",
          "title": "13. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "soz = \"oʻqishni\"\n\n# 1. Nechta belgi bor?\nprint(\"belgilar:\", ___)\n\n# 2. Birinchi va oxirgi belgini chiqaring\nprint(\"birinchi:\", soz[___])\nprint(\"oxirgi  :\", soz[___])\n\n# 3. Soʻzni ikkiga boʻling: \"oʻqish\" va \"ni\"\nbirinchi_bolak = soz[___:___]\nikkinchi_bolak = soz[___:]\nprint(birinchi_bolak, \"+\", ikkinchi_bolak)\n\n# 4. Round-trip tekshiruvi\nprint(\"teng keldimi:\", birinchi_bolak + ikkinchi_bolak == ___)",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Avval belgilarni sanash kerak. `oʻqishni` — `o`, `ʻ`, `q`, `i`, `s`, `h`, `n`, `i` = **8 ta**. (`oʻ` ikkita belgi ekanini unutmang!)"
                },
                {
                  "kind": "code",
                  "code": "soz = \"oʻqishni\"\n\nprint(\"belgilar:\", len(soz))            # 8\n\nprint(\"birinchi:\", soz[0])              # o\nprint(\"oxirgi  :\", soz[-1])             # i\n\nbirinchi_bolak = soz[0:6]               # oʻqish\nikkinchi_bolak = soz[6:]                # ni\nprint(birinchi_bolak, \"+\", ikkinchi_bolak)\n\nprint(\"teng keldimi:\", birinchi_bolak + ikkinchi_bolak == soz)   # True",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "output",
                  "text": "belgilar: 8\nbirinchi: o\noxirgi  : i\noʻqish + ni\nteng keldimi: True"
                },
                {
                  "kind": "text",
                  "text": "Nega 6? Chunki `oʻqish` — `o`, `ʻ`, `q`, `i`, `s`, `h` = 6 ta belgi, ya'ni 0 dan 5 gacha. Kesish 6-da to'xtaydi va 6 kirmaydi."
                }
              ]
            }
          ]
        },
        {
          "id": "14-mashqlar",
          "title": "14. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`\"Toshkent\"` matnida:"
                },
                {
                  "kind": "bullets",
                  "items": [
                    "0-belgi nima?",
                    "3-belgi nima?",
                    "`[-1]` nima?",
                    "`[0:4]` nima beradi?"
                  ]
                },
                {
                  "kind": "text",
                  "text": "Avval qo'lda yozing, keyin tekshiring."
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "pre",
                    "text": " T   o   s   h   k   e   n   t\n 0   1   2   3   4   5   6   7"
                  },
                  {
                    "kind": "code",
                    "code": "shahar = \"Toshkent\"\nprint(shahar[0])     # T\nprint(shahar[3])     # h\nprint(shahar[-1])    # t\nprint(shahar[0:4])   # Tosh",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "`[0:4]` = 0, 1, 2, 3-manzillar = `Tosh`. 4-manzil (`k`) kirmadi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu kod nima uchun xato beradi va uni qanday tuzatasiz?"
                },
                {
                  "kind": "code",
                  "code": "yosh = 17\nprint(\"Mening yoshim: \" + yosh)",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "TypeError: can only concatenate str (not \"int\") to str",
                    "error": true
                  },
                  {
                    "kind": "text",
                    "text": "`yosh` — bu son (`int`), `\"Mening yoshim: \"` — bu matn (`str`). `+` bilan ularni ulab bo'lmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Uch xil tuzatish, uchalasi ham to'g'ri:"
                  },
                  {
                    "kind": "code",
                    "code": "print(\"Mening yoshim: \" + str(yosh))     # sonni matnga aylantirish\nprint(\"Mening yoshim:\", yosh)            # vergul (Dars 01)\nprint(f\"Mening yoshim: {yosh}\")          # f-satr — eng qulayi",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Uchalasi ham `Mening yoshim: 17` beradi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu kod nima chiqaradi? **Ishga tushirmasdan** ayting."
                },
                {
                  "kind": "code",
                  "code": "matn = \"salom\"\nmatn.upper()\nprint(matn)",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "salom"
                  },
                  {
                    "kind": "text",
                    "text": "Katta harf bilan emas!"
                  },
                  {
                    "kind": "text",
                    "text": "`matn.upper()` yangi matn qaytardi, lekin uni **hech kim saqlamadi**. Natija paydo bo'ldi va darhol yo'qoldi. `matn` esa o'zgarmadi — chunki Python'da matn o'zgarmas."
                  },
                  {
                    "kind": "text",
                    "text": "To'g'ri yo'l:"
                  },
                  {
                    "kind": "code",
                    "code": "matn = matn.upper()\nprint(matn)      # SALOM",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Bu tuzoqni yaxshi eslab qoling. Kursda `.replace()` ni ko'p ishlatasiz va bu xatoni albatta bir marta qilasiz."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`\"gʻalaba\"` so'zida nechta belgi bor? Avval qo'lda sanang, keyin tekshiring. Va `[1]` qaysi belgi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "soz = \"gʻalaba\"\nprint(len(soz))     # 7\nprint(soz[0])       # g\nprint(soz[1])       # ʻ\nprint(soz[2])       # a",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "**7 ta belgi**, chunki `gʻ` — ikkita alohida belgi, xuddi `oʻ` kabi:"
                  },
                  {
                    "kind": "pre",
                    "text": " g   ʻ   a   l   a   b   a\n 0   1   2   3   4   5   6"
                  },
                  {
                    "kind": "text",
                    "text": "Ko'zingiz `gʻalaba` da 6 harf ko'radi. Kompyuter 7 ta belgi ko'radi."
                  },
                  {
                    "kind": "text",
                    "text": "O'zbek lotin yozuvida shunday ikki juftlik bor: `oʻ` va `gʻ`. Ikkalasi ham tokenizator uchun alohida e'tibor talab qiladi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Quyidagi uchta matn ko'zga bir xil ko'rinadi. Lekin Python uchun ular bir xilmi?"
                },
                {
                  "kind": "code",
                  "code": "a = \"oʻzbek\"      # toʻgʻri belgi (U+02BB)\nb = \"o'zbek\"      # oddiy apostrof\nc = \"o‘zbek\"      # burchakli qoʻshtirnoq\n\nprint(len(a), len(b), len(c))\nprint(a == b)\nprint(a == c)",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "6 6 6\nFalse\nFalse"
                  },
                  {
                    "kind": "text",
                    "text": "Uchalasining ham uzunligi bir xil — 6 belgi. Lekin ular **teng emas**."
                  },
                  {
                    "kind": "text",
                    "text": "Har uchtasi ham `o` + biror belgi, lekin o'sha \"biror belgi\" har safar boshqa: `ʻ` (U+02BB), `'` (oddiy apostrof), `‘` (burchakli qo'shtirnoq)."
                  },
                  {
                    "kind": "text",
                    "text": "**Nima uchun bu falokat:** internetdagi o'zbek matnida uchchalasi ham uchraydi, chunki odamlar turli klaviaturada yozadi. Agar tokenizator ularni tuzatmasa, u `oʻzbek` so'zini **uch xil so'z** deb o'rganadi. Lug'atda uch marta joy egallaydi, va har biri uchun bilim uch marta kam bo'ladi."
                  },
                  {
                    "kind": "text",
                    "text": "Yechim — hammasini bittasiga keltirish:"
                  },
                  {
                    "kind": "code",
                    "code": "b = b.replace(\"'\", \"ʻ\")\nc = c.replace(\"‘\", \"ʻ\")\nprint(a == b, a == c)    # True True",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "**Mana shu — Dars 14 ning butun mazmuni.** Va bu haqiqiy tokenizatorda haqiqatan bor: `uzbek-bpe-16k` ishlashidan oldin aynan shunday normalizatsiya qiladi. Siz hozir uni allaqachon yoza olasiz."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "15-xulosa",
          "title": "15. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "Matn — belgilar zanjiri. Har bir belgining manzili (indeks) bor, va sanash **noldan** boshlanadi.",
                "`matn[i]` — bitta belgi. `matn[-1]` — oxirgisi.",
                "`matn[a:b]` — bo'lak. **`b` kirmaydi.** Indekslarni belgilar orasidagi kesish joylari deb tasavvur qiling — shunda hammasi joyiga tushadi.",
                "`oʻ` va `gʻ` — **ikkitadan belgi**. Ko'z ko'rgan narsa kompyuter ko'rgan narsa emas.",
                "`.lower()`, `.replace()` — yangi matn qaytaradi, **eskisini o'zgartirmaydi**. Natijani saqlab oling.",
                "`=` joylaydi, `==` tekshiradi.",
                "Round-trip: bo'laklarni qayta yig'ganda asl matn chiqishi **shart**."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Bugun bitta so'z bilan ishladik. Tokenizator esa millionlab so'z bilan ishlaydi."
            },
            {
              "kind": "text",
              "text": "**Dars 03 — Ro'yxat va tsikl.** Ko'p narsani bitta joyda saqlash va ular bo'ylab avtomatik yurish. Shundan keyin \"har bir belgini ko'rib chiq\" degan buyruqni bitta qatorda yoza olasiz."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *`\"salom\"` so'zidagi hamma qo'shni juftliklarni (`sa`, `al`, `lo`, `om`) qanday chiqarasiz — qo'lda yozmasdan?* Bu juftliklar BPE algoritmining birinchi qadami bo'ladi."
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01. `print`, o'zgaruvchi, `len`, `.split()`"
    },
    {
      "id": "dars-03",
      "n": 3,
      "title": "Ro'yxat va tsikl",
      "subtitle": "",
      "minutes": 50,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "bullets",
              "items": [
                "**saqlaysiz** ko'p narsani bitta o'zgaruvchida — ro'yxat (list) yordamida;",
                "**yozasiz** tsikl — kompyuterga \"har bir element uchun shuni qil\" degan buyruq;",
                "**tushunasiz** Python'dagi bo'sh joy (otstup) nima uchun majburiy ekanini;",
                "**chiqarasiz** matndagi hamma qo'shni juftliklarni — qo'lda yozmasdan;",
                "**bilasiz** kortej (tuple) nima va nima uchun u ro'yxatdan farq qiladi."
              ]
            },
            {
              "kind": "text",
              "text": "Bu dars oxirida siz **BPE algoritmining birinchi qadamini** yozgan bo'lasiz."
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 02 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "`\"salom\"` so'zidagi hamma qo'shni juftliklarni — `sa`, `al`, `lo`, `om` — qanday chiqarasiz?"
            },
            {
              "kind": "text",
              "text": "Hozirgi bilimingiz bilan buni yozish mumkin:"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\nprint(soz[0] + soz[1])\nprint(soz[1] + soz[2])\nprint(soz[2] + soz[3])\nprint(soz[3] + soz[4])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "sa\nal\nlo\nom"
            },
            {
              "kind": "text",
              "text": "Ishladi. Lekin endi o'ylang."
            },
            {
              "kind": "text",
              "text": "Dars 15 da biz tokenizatorni **haqiqiy o'zbek matnida** o'qitamiz. U matnda taxminan **5 000 000 belgi** bor. Demak 4 999 999 ta juftlik."
            },
            {
              "kind": "text",
              "text": "Shuncha `print` yozasizmi?"
            },
            {
              "kind": "text",
              "text": "Bu kod ishlaydi, lekin u **bir marta ishlatiladigan** kod. Bizga esa **takrorlanadigan** kod kerak — matn qanday uzun bo'lsa ham ishlaydigani. Buning uchun ikkita yangi narsa\nkerak: **ro'yxat** (ko'p narsani saqlash) va **tsikl** (ular bo'ylab avtomatik yurish)."
            }
          ]
        },
        {
          "id": "2-royxat-raqamlangan-javon",
          "title": "2. Ro'yxat — raqamlangan javon",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 02 da matn belgilar zanjiri ekanini ko'rdik, va har bir belgining manzili bor edi."
            },
            {
              "kind": "text",
              "text": "**Ro'yxat ham xuddi shunday, faqat unda harf emas — istalgan narsa turadi.**"
            },
            {
              "kind": "code",
              "code": "mevalar = [\"olma\", \"anor\", \"uzum\"]\nprint(mevalar)\nprint(len(mevalar))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['olma', 'anor', 'uzum']\n3"
            },
            {
              "kind": "bullets",
              "items": [
                "`[` va `]` — kvadrat qavslar ro'yxat yasaydi.",
                "Elementlar **vergul** bilan ajratiladi.",
                "`len()` — bu yerda ham ishlaydi, lekin endi **belgilar** emas, **elementlar** sonini qaytaradi. `mevalar` da 3 ta element bor."
              ]
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Dars 01 da `.split()` natijasi kvadrat qavs ichida chiqqan edi — `['Men', 'oʻqishni', ...]`. Endi bilasiz: `.split()` **ro'yxat** qaytaradi."
            },
            {
              "kind": "h3",
              "id": "manzil-olish-xuddi-matndagidek",
              "text": "Manzil olish — xuddi matndagidek"
            },
            {
              "kind": "code",
              "code": "mevalar = [\"olma\", \"anor\", \"uzum\"]\nprint(mevalar[0])\nprint(mevalar[2])\nprint(mevalar[-1])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "olma\nuzum\nuzum"
            },
            {
              "kind": "text",
              "text": "**Hech qanday yangi qoida yo'q.** Noldan sanash, manfiy indeks, kesish — hammasi matndagi bilan **bir xil** ishlaydi. Dars 02 da o'rgangan narsangiz shu yerda bepul qayta ishlatiladi."
            },
            {
              "kind": "text",
              "text": "Chegaradan chiqsangiz ham xato bir xil:"
            },
            {
              "kind": "code",
              "code": "print(mevalar[3])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "IndexError: list index out of range",
              "error": true
            },
            {
              "kind": "text",
              "text": "Faqat bitta so'z o'zgardi: `string index` emas, `list index`."
            },
            {
              "kind": "h3",
              "id": "royxatda-har-xil-narsa-turishi-mumkin",
              "text": "Ro'yxatda har xil narsa turishi mumkin"
            },
            {
              "kind": "code",
              "code": "aralash = [\"salom\", 5, \"koʻraman\"]\nprint(aralash)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['salom', 5, 'koʻraman']"
            },
            {
              "kind": "text",
              "text": "Matn ham, son ham bir ro'yxatda. Amalda buni kamdan-kam qilasiz — lekin mumkin."
            }
          ]
        },
        {
          "id": "3-royxat-ozgaradi-matn-esa-yoq",
          "title": "3. Ro'yxat o'zgaradi — matn esa yo'q",
          "blocks": [
            {
              "kind": "text",
              "text": "Bu Dars 02 dagi eng muhim tuzoqning davomi. Solishtiring:"
            },
            {
              "kind": "code",
              "code": "mevalar = [\"olma\", \"anor\", \"uzum\"]\nmevalar[1] = \"shaftoli\"\nprint(mevalar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['olma', 'shaftoli', 'uzum']"
            },
            {
              "kind": "text",
              "text": "Ishladi. Endi xuddi shuni matnda qilamiz:"
            },
            {
              "kind": "code",
              "code": "matn = \"salom\"\nmatn[0] = \"S\"",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "TypeError: 'str' object does not support item assignment",
              "error": true
            },
            {
              "kind": "text",
              "text": "**Ro'yxatni tahrirlash mumkin. Matnni — yo'q.**"
            },
            {
              "kind": "bullets",
              "items": [
                "Matn **o'zgarmas** (immutable). `.replace()` yangi matn yasaydi.",
                "Ro'yxat **o'zgaruvchan** (mutable). Uning elementini joyida almashtirish mumkin."
              ]
            },
            {
              "kind": "text",
              "text": "Bu farqni hozir yaxshi tushunib oling. Dars 09 da `merge` funksiyasini yozganingizda, siz aynan ro'yxatning shu xususiyatiga tayanasiz."
            },
            {
              "kind": "h3",
              "id": "append-oxiriga-qoshish",
              "text": "`.append()` — oxiriga qo'shish"
            },
            {
              "kind": "text",
              "text": "Eng ko'p ishlatiladigan buyruq. Bo'sh ro'yxat yasab, unga to'ldirib boramiz:"
            },
            {
              "kind": "code",
              "code": "royxat = []\nprint(royxat, len(royxat))\n\nroyxat.append(\"birinchi\")\nroyxat.append(\"ikkinchi\")\nprint(royxat, len(royxat))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[] 0\n['birinchi', 'ikkinchi'] 2"
            },
            {
              "kind": "bullets",
              "items": [
                "`[]` — bo'sh ro'yxat. Hech narsa yo'q, uzunligi 0.",
                "`.append(narsa)` — ro'yxat **oxiriga** bitta element qo'shadi.",
                "Nuqta bilan yoziladi (`royxat.append(...)`), chunki bu ro'yxatga tegishli buyruq — xuddi `matn.replace(...)` kabi."
              ]
            },
            {
              "kind": "note",
              "tone": "warn",
              "text": "**Muhim farq:** `.replace()` yangi matn **qaytaradi**, `.append()` esa hech narsa qaytarmaydi — u ro'yxatning **o'zini** o'zgartiradi. Shuning uchun `royxat = royxat.append(\"x\")` deb **yozmang** — bu ro'yxatni yo'q qiladi.\nTo'g'risi: `royxat.append(\"x\")`, xolos."
            },
            {
              "kind": "text",
              "text": "**Naqsh (pattern) — buni yodlab oling:**"
            },
            {
              "kind": "pre",
              "text": "natija = []              # 1. boʻsh roʻyxat yasa\n# ... bu yerda toʻldirasan ...\nnatija.append(nimadir)   # 2. har safar bittadan qoʻsh"
            },
            {
              "kind": "text",
              "text": "Bu kursda siz bu naqshni **o'nlab marta** yozasiz."
            }
          ]
        },
        {
          "id": "4-tsikl-har-bir-element-uchun",
          "title": "4. Tsikl — \"har bir element uchun\"",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi asosiy narsa."
            },
            {
              "kind": "code",
              "code": "sozlar = [\"olma\", \"anor\", \"uzum\"]\nfor meva in sozlar:\n    print(meva)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "olma\nanor\nuzum"
            },
            {
              "kind": "text",
              "text": "Buni **ovoz chiqarib o'qing**: \"`sozlar` ichidagi **har bir** `meva` uchun — `meva` ni chiqar\"."
            },
            {
              "kind": "text",
              "text": "Har bir bo'lakni tushunamiz:"
            },
            {
              "kind": "bullets",
              "items": [
                "`for` — tsikl boshlanishini bildiruvchi so'z.",
                "`meva` — **siz o'ylab topgan nom**. Har aylanishda ro'yxatning navbatdagi elementi shu nomga joylanadi. `for x in sozlar` deb ham yozsa bo'lardi — lekin ma'noli nom qo'ying, kodni o'zingiz o'qiysiz.",
                "`in` — \"ichidagi\".",
                "`sozlar` — nimaning bo'ylab yurish kerak.",
                "`:` — **ikki nuqta majburiy**. U \"shu yerdan tsiklning tanasi boshlanadi\" deydi.",
                "Keyingi qator **ichkariga surilgan** (otstup)."
              ]
            },
            {
              "kind": "text",
              "text": "Kompyuter nima qildi:"
            },
            {
              "kind": "pre",
              "text": "1-aylanish:  meva = \"olma\"   →  print(meva)  →  olma\n2-aylanish:  meva = \"anor\"   →  print(meva)  →  anor\n3-aylanish:  meva = \"uzum\"   →  print(meva)  →  uzum"
            },
            {
              "kind": "media",
              "id": "e1",
              "title": "Tsikl"
            },
            {
              "kind": "text",
              "text": "Tsikl ichida istalgan narsa qilish mumkin:"
            },
            {
              "kind": "code",
              "code": "for meva in sozlar:\n    print(meva, \"-\", len(meva))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "olma - 4\nanor - 4\nuzum - 4"
            }
          ]
        },
        {
          "id": "5-otstup-pythonning-eng-qattiq-qoidasi",
          "title": "5. Otstup — Python'ning eng qattiq qoidasi",
          "blocks": [
            {
              "kind": "text",
              "text": "Bu boshlovchilarni eng ko'p to'xtatadigan narsa, shuning uchun alohida to'xtaymiz."
            },
            {
              "kind": "text",
              "text": "Ko'p dasturlash tillarida tsikl tanasi qavs bilan belgilanadi. **Python'da esa bo'sh joy bilan.** Ichkariga surilgan qatorlar — tsiklning ichida. Surilmaganlari — tashqarisida."
            },
            {
              "kind": "code",
              "code": "for meva in sozlar:\n    print(meva)        # ← tsikl ICHIDA (har aylanishda ishlaydi)\nprint(\"tugadi\")        # ← tsikl TASHQARISIDA (bir marta ishlaydi)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "olma\nanor\nuzum\ntugadi"
            },
            {
              "kind": "text",
              "text": "`tugadi` bir marta chiqdi, chunki u surilmagan."
            },
            {
              "kind": "media",
              "id": "e2",
              "title": "Otstup"
            },
            {
              "kind": "h3",
              "id": "ataylab-xato-1-ikki-nuqta-unutilgan",
              "text": "Ataylab xato 1 — ikki nuqta unutilgan"
            },
            {
              "kind": "code",
              "code": "for harf in \"salom\"\n    print(harf)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "SyntaxError: expected ':'",
              "error": true
            },
            {
              "kind": "text",
              "text": "`SyntaxError` — **yozilish** xatosi. Kompyuter kodni umuman tushunmadi. Izohi to'g'ridan-to'g'ri aytyapti: ikki nuqta kutilgan edi."
            },
            {
              "kind": "h3",
              "id": "ataylab-xato-2-otstup-yoq",
              "text": "Ataylab xato 2 — otstup yo'q"
            },
            {
              "kind": "code",
              "code": "for harf in \"salom\":\nprint(harf)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "IndentationError: expected an indented block after 'for' statement on line 1",
              "error": true
            },
            {
              "kind": "text",
              "text": "\"1-qatordagi `for` dan keyin ichkariga surilgan blok kutilgan edi.\""
            },
            {
              "kind": "h3",
              "id": "ataylab-xato-3-otstup-notekis",
              "text": "Ataylab xato 3 — otstup notekis"
            },
            {
              "kind": "code",
              "code": "for harf in \"salom\":\n    print(harf)\n     print(harf)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "IndentationError: unexpected indent",
              "error": true
            },
            {
              "kind": "text",
              "text": "Ikkinchi `print` bitta bo'shliqqa ko'proq surilgan. Python uchun bu — xato."
            },
            {
              "kind": "text",
              "text": "**Qoida:** bitta blok ichidagi hamma qator **aynan bir xil** miqdorda surilishi kerak. Standart — **4 ta bo'shliq**. Colab'da `Tab` tugmasi buni o'zi qiladi."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu qattiq qoida zerikarli tuyuladi, lekin foydasi bor: Python kodi **har doim** bir xil ko'rinadi. Boshqa odamning kodini ochganingizda, tuzilishi darhol ko'rinadi."
            }
          ]
        },
        {
          "id": "6-matn-boylab-tsikl",
          "title": "6. Matn bo'ylab tsikl",
          "blocks": [
            {
              "kind": "text",
              "text": "Tsikl faqat ro'yxat bilan emas, **matn bilan ham** ishlaydi. Unda har bir element — bitta belgi:"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\nfor harf in soz:\n    print(harf)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "s\na\nl\no\nm"
            },
            {
              "kind": "text",
              "text": "Mana bu — **muhim lahza**. Endi siz istalgan uzunlikdagi matnning har bir belgisini ko'rib chiqa olasiz. 5 ta belgimi, 5 million tami — kod **bir xil**."
            },
            {
              "kind": "text",
              "text": "Sinab ko'ring:"
            },
            {
              "kind": "code",
              "code": "for harf in \"koʻraman\":\n    print(harf)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Natijada 8 ta qator chiqadi — va ulardan biri yolg'iz `ʻ` bo'ladi. Dars 02 dagi kashfiyot endi ko'z oldingizda qatorma-qator turadi."
            }
          ]
        },
        {
          "id": "7-range-raqamlar-boylab-tsikl",
          "title": "7. `range()` — raqamlar bo'ylab tsikl",
          "blocks": [
            {
              "kind": "text",
              "text": "Ba'zan bizga elementning **o'zi** emas, uning **manzili** kerak. Buning uchun `range()` ishlatiladi:"
            },
            {
              "kind": "code",
              "code": "for son in range(5):\n    print(son)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "0\n1\n2\n3\n4"
            },
            {
              "kind": "text",
              "text": "`range(5)` — 0 dan boshlab **5 tagacha**, lekin **5 ning o'zisiz**. Ya'ni 0, 1, 2, 3, 4."
            },
            {
              "kind": "text",
              "text": "**Tanish qoida!** Dars 02 dagi kesish bilan bir xil: oxirgisi kirmaydi. Python'da bu qoida hamma joyda bir xil."
            },
            {
              "kind": "text",
              "text": "Ko'rish uchun ro'yxatga aylantiramiz:"
            },
            {
              "kind": "code",
              "code": "print(list(range(5)))\nprint(list(range(2, 6)))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[0, 1, 2, 3, 4]\n[2, 3, 4, 5]"
            },
            {
              "kind": "bullets",
              "items": [
                "`range(5)` — 0 dan 5 gacha",
                "`range(2, 6)` — 2 dan 6 gacha",
                "`list(...)` — natijani ro'yxat qilib ko'rsatadi (`range` o'zi ro'yxat emas, lekin hozircha shunday deb o'ylash yetarli)"
              ]
            },
            {
              "kind": "h3",
              "id": "manzil-va-belgi-birga",
              "text": "Manzil va belgi — birga"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\nfor i in range(len(soz)):\n    print(i, soz[i])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "0 s\n1 a\n2 l\n3 o\n4 m"
            },
            {
              "kind": "text",
              "text": "Bu naqshni tushuning, chunki keyingi qadam aynan shunga quriladi:"
            },
            {
              "kind": "bullets",
              "items": [
                "`len(soz)` = 5",
                "`range(5)` → i = 0, 1, 2, 3, 4",
                "`soz[i]` → har bir manzildagi belgi"
              ]
            },
            {
              "kind": "text",
              "text": "`i` — bu \"index\" so'zining qisqartmasi. Dasturchilar orasida odat bo'lgan nom."
            }
          ]
        },
        {
          "id": "8-juftliklar-darsning-maqsadi",
          "title": "8. Juftliklar — darsning maqsadi",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi 1-bo'limdagi savolga javob beramiz."
            },
            {
              "kind": "text",
              "text": "Bizga kerak: har bir belgi va **undan keyingisi**. Ya'ni `soz[i]` va `soz[i+1]`."
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\njuftliklar = []\n\nfor i in range(len(soz) - 1):\n    juftlik = soz[i] + soz[i + 1]\n    juftliklar.append(juftlik)\n\nprint(juftliklar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['sa', 'al', 'lo', 'om']"
            },
            {
              "kind": "text",
              "text": "Qatorma-qator:"
            },
            {
              "kind": "steps",
              "items": [
                "`juftliklar = []` — bo'sh ro'yxat (3-bo'limdagi naqsh).",
                "`range(len(soz) - 1)` — **`-1` ga diqqat qiling**. Buni hozir tushuntiraman.",
                "`soz[i] + soz[i + 1]` — hozirgi belgi va keyingisi ulanadi.",
                "`.append(juftlik)` — ro'yxatga qo'shiladi."
              ]
            },
            {
              "kind": "h3",
              "id": "nega-1",
              "text": "Nega `-1`?"
            },
            {
              "kind": "text",
              "text": "Bu darsdagi eng muhim `-1`. Uni tushuntirish uchun uni **olib tashlab ko'ramiz**:"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\nfor i in range(len(soz)):\n    print(soz[i] + soz[i + 1])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "sa\nal\nlo\nom\nIndexError: string index out of range",
              "error": true
            },
            {
              "kind": "text",
              "text": "**Diqqat qiling:** to'rtta to'g'ri juftlik chiqdi, **keyin** xato."
            },
            {
              "kind": "text",
              "text": "Nima bo'ldi? Oxirgi aylanishda `i = 4`, ya'ni `soz[4]` (`m`) va `soz[5]` — lekin 5-manzil yo'q. `salom` da manzillar 0 dan 4 gacha (Dars 02)."
            },
            {
              "kind": "text",
              "text": "**Qoida:** `i + 1` ga murojaat qiladigan har qanday tsikl **bittaga erta** to'xtashi kerak."
            },
            {
              "kind": "text",
              "text": "Shuning uchun juftliklar soni har doim **belgilar sonidan bitta kam**: 5 belgi → 4 juftlik."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu xatoning nomi bor: **off-by-one** (bittaga adashish). Bu dasturlashdagi eng ko'p uchraydigan xato, va tajribali dasturchilar ham uni qiladi. Xavfli tomoni shundaki — kod ko'pincha **deyarli** to'g'ri ishlaydi, faqat chekkasida buziladi."
            },
            {
              "kind": "media",
              "id": "e3",
              "title": "Juftliklar va bittaga adashish"
            }
          ]
        },
        {
          "id": "9-zip-chiroyliroq-yol",
          "title": "9. `zip()` — chiroyliroq yo'l",
          "blocks": [
            {
              "kind": "text",
              "text": "Xuddi shu natijaga boshqa yo'l bilan ham yetish mumkin. Avval fikrni ko'ring:"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\nprint(soz)\nprint(soz[1:])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "salom\nalom"
            },
            {
              "kind": "text",
              "text": "Ikkisini bir-birining ustiga qo'ying:"
            },
            {
              "kind": "pre",
              "text": "s  a  l  o  m\na  l  o  m"
            },
            {
              "kind": "text",
              "text": "Ustma-ust turgan harflar — aynan bizga kerak bo'lgan juftliklar! `sa`, `al`, `lo`, `om`."
            },
            {
              "kind": "text",
              "text": "`zip()` aynan shuni qiladi: ikki narsani **yonma-yon** bog'laydi."
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\nfor a, b in zip(soz, soz[1:]):\n    print(a + b)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "sa\nal\nlo\nom"
            },
            {
              "kind": "bullets",
              "items": [
                "`zip(x, y)` — ikkisidan **juft-juft** qilib oladi.",
                "`for a, b in ...` — har juftlikdan ikkita qiymat chiqadi, ularni ikkita nomga taqsimlaymiz. Bu **ochish** (unpacking) deb ataladi.",
                "**`-1` kerak emas!** `zip` kaltaroq tomon tugagan joyda o'zi to'xtaydi. `soz` da 5 ta, `soz[1:]` da 4 ta belgi — `zip` 4 tada to'xtaydi."
              ]
            },
            {
              "kind": "text",
              "text": "Ikki usul ham to'g'ri. Birinchisi (`range`) — aniq va oshkora. Ikkinchisi (`zip`) — qisqa va xatosiz. Dars 08 da `zip` ni ishlatamiz."
            }
          ]
        },
        {
          "id": "10-kortej-tuple-ozgarmas-juftlik",
          "title": "10. Kortej (tuple) — o'zgarmas juftlik",
          "blocks": [
            {
              "kind": "text",
              "text": "`zip` aslida nima qaytaradi? Ko'ramiz:"
            },
            {
              "kind": "code",
              "code": "juft = (\"s\", \"a\")\nprint(juft)\nprint(juft[0], juft[1])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "('s', 'a')\ns a"
            },
            {
              "kind": "text",
              "text": "Bu **kortej** (tuple). Ro'yxatga juda o'xshaydi, ikkita farq bilan:"
            },
            {
              "kind": "table",
              "head": [
                "",
                "Ro'yxat",
                "Kortej"
              ],
              "rows": [
                [
                  "Qavs",
                  "`[ ]`",
                  "`( )`"
                ],
                [
                  "O'zgartirish",
                  "mumkin",
                  "**mumkin emas**"
                ]
              ]
            },
            {
              "kind": "code",
              "code": "juft[0] = \"x\"",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "TypeError: 'tuple' object does not support item assignment",
              "error": true
            },
            {
              "kind": "text",
              "text": "Ro'yxat — javon, undan narsa olib-qo'yish mumkin. Kortej — **muhrlangan quti**."
            },
            {
              "kind": "h3",
              "id": "nega-bizga-kortej-kerak",
              "text": "Nega bizga kortej kerak?"
            },
            {
              "kind": "text",
              "text": "Savol o'rinli: juftlikni `\"sa\"` deb saqlash mumkin-ku, nega `(\"s\", \"a\")` kerak?"
            },
            {
              "kind": "text",
              "text": "Chunki **hozir harflar bilan ishlayapmiz, keyin raqamlar bilan ishlaymiz**."
            },
            {
              "kind": "text",
              "text": "Harflarni ulasa bo'ladi: `\"s\" + \"a\"` = `\"sa\"` — ikkala harf ham ko'rinib turibdi."
            },
            {
              "kind": "text",
              "text": "Raqamlarni-chi? Tokenlar raqam bo'ladi (Dars 06 dan boshlab). Aytaylik, 1-token va 2-token juftligi:"
            },
            {
              "kind": "code",
              "code": "print(1 + 2)\nprint((1, 2))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "3\n(1, 2)"
            },
            {
              "kind": "text",
              "text": "**`1 + 2` bu `3`.** Ikkala token ham yo'qoldi! `3` dan `1` va `2` ni tiklab bo'lmaydi. `(1, 5)` va `(2, 4)` ham `+` dan keyin `6` bo'ladi — ular bir-biridan farq qilmay qoladi."
            },
            {
              "kind": "text",
              "text": "Kortej esa hech narsani qo'shmaydi, u faqat **yonma-yon ushlab turadi**. Ikkala qiymat ham saqlanadi."
            },
            {
              "kind": "text",
              "text": "**Shuning uchun BPE algoritmi juftliklarni kortej sifatida saqlaydi.**"
            },
            {
              "kind": "text",
              "text": "Juftliklarni kortej qilib yig'amiz:"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\njuftliklar = []\nfor a, b in zip(soz, soz[1:]):\n    juftliklar.append((a, b))\nprint(juftliklar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[('s', 'a'), ('a', 'l'), ('l', 'o'), ('o', 'm')]"
            },
            {
              "kind": "text",
              "text": "E'tibor bering: `.append((a, b))` da **ikkita qavs** bor. Tashqi qavs — `append` ning qavsi, ichki qavs — kortej qavsi. Bittasini unutsangiz, xato chiqadi."
            }
          ]
        },
        {
          "id": "11-ozbekcha-sozda-sinaymiz",
          "title": "11. O'zbekcha so'zda sinaymiz",
          "blocks": [
            {
              "kind": "code",
              "code": "soz = \"koʻraman\"\njuftliklar = []\nfor a, b in zip(soz, soz[1:]):\n    juftliklar.append(a + b)\n\nprint(juftliklar)\nprint(\"juftliklar soni:\", len(juftliklar), \"| belgilar soni:\", len(soz))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['ko', 'oʻ', 'ʻr', 'ra', 'am', 'ma', 'an']\njuftliklar soni: 7 | belgilar soni: 8"
            },
            {
              "kind": "text",
              "text": "8 belgi → 7 juftlik. ✓"
            },
            {
              "kind": "text",
              "text": "Endi natijaga **diqqat bilan qarang**. Ikkinchi va uchinchi juftlik:"
            },
            {
              "kind": "pre",
              "text": "'oʻ'   ← o va ʻ birga\n'ʻr'   ← ʻ va r birga"
            },
            {
              "kind": "text",
              "text": "`oʻ` — bu o'zbek tilining bitta harfi. Lekin algoritm buni bilmaydi. U uchun `ʻ` oddiy belgi, va u `ʻr` degan ma'nosiz juftlikni ham xuddi shunday sanaydi."
            },
            {
              "kind": "text",
              "text": "**Bu bezovta qiladigan narsa, va shunday bo'lishi kerak.** Bu muammoni Dars 14 da hal qilamiz. Hozircha shuni ko'rib qo'ying — keyin yechimni ko'rganingizda, nima uchun kerakligini allaqachon bilasiz."
            }
          ]
        },
        {
          "id": "12-muammo",
          "title": "12. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda endi juftliklar ro'yxati bor. BPE algoritmi esa shuni so'raydi:"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Qaysi juftlik eng ko'p marta uchradi?**"
            },
            {
              "kind": "text",
              "text": "Buning uchun sanash kerak: `('o', 'ʻ')` necha marta, `('r', 'a')` necha marta, va hokazo. Ya'ni bizga shunday narsa kerak:"
            },
            {
              "kind": "pre",
              "text": "('k', 'o')  →  1\n('o', 'ʻ')  →  1\n('ʻ', 'r')  →  1\n('r', 'a')  →  1\n..."
            },
            {
              "kind": "text",
              "text": "Chapda — juftlik, o'ngda — soni. **Bog'langan juftliklar.**"
            },
            {
              "kind": "text",
              "text": "Ro'yxat buni uddalay olmaydi. Ro'yxatda faqat qiymatlar bor, ularning \"yorlig'i\" yo'q. Siz `royxat[('o', 'ʻ')]` deb yoza olmaysiz — ro'yxat faqat raqamli manzilni tushunadi."
            },
            {
              "kind": "text",
              "text": "Bizga **nimadan → nimaga** saqlaydigan boshqa idish kerak. Uning nomi — **lug'at**, va u keyingi darsning mavzusi."
            }
          ]
        },
        {
          "id": "13-toliq-kod",
          "title": "13. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "# ---- 1. Roʻyxat ----\nmevalar = [\"olma\", \"anor\", \"uzum\"]\nprint(mevalar, \"| uzunlik:\", len(mevalar))\nprint(\"birinchi:\", mevalar[0], \"| oxirgi:\", mevalar[-1])\n\n# ---- 2. Oʻzgartirish ----\nmevalar[1] = \"shaftoli\"\nprint(mevalar)\n\n# ---- 3. Boʻsh roʻyxat + append ----\nroyxat = []\nroyxat.append(\"birinchi\")\nroyxat.append(\"ikkinchi\")\nprint(royxat)\n\n# ---- 4. Tsikl: roʻyxat boʻylab ----\nfor meva in mevalar:\n    print(meva, \"-\", len(meva))\n\n# ---- 5. Tsikl: matn boʻylab ----\nfor harf in \"salom\":\n    print(harf)\n\n# ---- 6. range ----\nsoz = \"salom\"\nfor i in range(len(soz)):\n    print(i, soz[i])\n\n# ---- 7. Juftliklar (range usuli) ----\nsoz = \"salom\"\njuftliklar = []\nfor i in range(len(soz) - 1):\n    juftliklar.append(soz[i] + soz[i + 1])\nprint(juftliklar)\n\n# ---- 8. Juftliklar (zip usuli) ----\njuftliklar2 = []\nfor a, b in zip(soz, soz[1:]):\n    juftliklar2.append(a + b)\nprint(juftliklar2)\nprint(\"ikki usul teng keldimi:\", juftliklar == juftliklar2)\n\n# ---- 9. Kortej sifatida ----\njuftliklar3 = []\nfor a, b in zip(soz, soz[1:]):\n    juftliklar3.append((a, b))\nprint(juftliklar3)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['olma', 'anor', 'uzum'] | uzunlik: 3\nbirinchi: olma | oxirgi: uzum\n['olma', 'shaftoli', 'uzum']\n['birinchi', 'ikkinchi']\nolma - 4\nshaftoli - 8\nuzum - 4\ns\na\nl\no\nm\n0 s\n1 a\n2 l\n3 o\n4 m\n['sa', 'al', 'lo', 'om']\n['sa', 'al', 'lo', 'om']\nikki usul teng keldimi: True\n[('s', 'a'), ('a', 'l'), ('l', 'o'), ('o', 'm')]",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "14-ozingiz-yozing",
          "title": "14. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "soz = \"oʻzbek\"\n\n# 1. Har bir belgini alohida qatorda chiqaring\nfor ___ in ___:\n    print(___)\n\n# 2. Hamma qoʻshni juftliklarni roʻyxatga yigʻing\njuftliklar = ___\nfor i in range(len(soz) ___ ___):\n    juftliklar.append(soz[i] ___ soz[i + 1])\nprint(juftliklar)\n\n# 3. Nechta juftlik chiqdi? Nechta belgi bor?\nprint(\"juftliklar:\", ___)\nprint(\"belgilar  :\", ___)",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "soz = \"oʻzbek\"\n\n# 1.\nfor harf in soz:\n    print(harf)\n\n# 2.\njuftliklar = []\nfor i in range(len(soz) - 1):\n    juftliklar.append(soz[i] + soz[i + 1])\nprint(juftliklar)\n\n# 3.\nprint(\"juftliklar:\", len(juftliklar))\nprint(\"belgilar  :\", len(soz))",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "output",
                  "text": "o\nʻ\nz\nb\ne\nk\n['oʻ', 'ʻz', 'zb', 'be', 'ek']\njuftliklar: 5\nbelgilar  : 6"
                },
                {
                  "kind": "text",
                  "text": "`oʻzbek` — 6 belgi (`oʻ` ikkita!), demak 5 juftlik. Va birinchi ikkita juftlik yana o'sha muammoni ko'rsatadi: `oʻ` va `ʻz`."
                }
              ]
            }
          ]
        },
        {
          "id": "15-mashqlar",
          "title": "15. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu kod nima chiqaradi? Ishga tushirmasdan ayting."
                },
                {
                  "kind": "code",
                  "code": "sonlar = [10, 20, 30]\nfor son in sonlar:\n    print(son * 2)\nprint(sonlar)",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "20\n40\n60\n[10, 20, 30]"
                  },
                  {
                    "kind": "text",
                    "text": "Oxirgi qator muhim: **ro'yxat o'zgarmadi.** `son * 2` yangi qiymat hisobladi va chiqardi, lekin uni hech qayerga saqlamadi. `son` — bu nusxa, ro'yxatning o'zi emas."
                  },
                  {
                    "kind": "text",
                    "text": "Ro'yxatni haqiqatan o'zgartirish uchun yangi ro'yxat yig'ish kerak:"
                  },
                  {
                    "kind": "code",
                    "code": "yangi = []\nfor son in sonlar:\n    yangi.append(son * 2)\nprint(yangi)      # [20, 40, 60]",
                    "lang": "python",
                    "mode": "static"
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu ikki kod nima uchun har xil natija beradi?"
                },
                {
                  "kind": "code",
                  "code": "# A\nfor harf in \"salom\":\n    print(harf)\nprint(\"tugadi\")\n\n# B\nfor harf in \"salom\":\n    print(harf)\n    print(\"tugadi\")",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "**A** — `tugadi` bir marta chiqadi (6 qator):"
                  },
                  {
                    "kind": "pre",
                    "text": "s\na\nl\no\nm\ntugadi"
                  },
                  {
                    "kind": "text",
                    "text": "**B** — `tugadi` **besh marta** chiqadi (10 qator):"
                  },
                  {
                    "kind": "pre",
                    "text": "s\ntugadi\na\ntugadi\n..."
                  },
                  {
                    "kind": "text",
                    "text": "Yagona farq — otstup. **A** da `print(\"tugadi\")` tsikl tashqarisida, **B** da ichida."
                  },
                  {
                    "kind": "text",
                    "text": "Bo'sh joy Python'da bezak emas — u **ma'no**. To'rtta bo'shliq kodning nima qilishini butunlay o'zgartiradi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`\"Toshkent\"` so'zidan hamma qo'shni juftliklarni chiqaring. Nechta juftlik bo'lishini **oldindan** ayting."
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "`Toshkent` — 8 belgi, demak **7 juftlik**."
                  },
                  {
                    "kind": "code",
                    "code": "soz = \"Toshkent\"\njuftliklar = []\nfor a, b in zip(soz, soz[1:]):\n    juftliklar.append(a + b)\nprint(juftliklar)\nprint(len(juftliklar))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "['To', 'os', 'sh', 'hk', 'ke', 'en', 'nt']\n7"
                  },
                  {
                    "kind": "text",
                    "text": "E'tibor bering: `sh` juftligi chiqdi. O'zbek tilida `sh` ham bitta tovush — xuddi `oʻ` kabi. Lekin `sh` ikkita oddiy harfdan iborat, shuning uchun u muammo tug'dirmaydi. BPE algoritmi `sh` ni ko'p uchraganini o'zi sezadi va uni bitta token qilib birlashtiradi. Dars 10 da buni o'z ko'zingiz bilan ko'rasiz."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Quyidagi kodda xato bor. Xatoni toping, nima chiqishini ayting, va tuzating."
                },
                {
                  "kind": "code",
                  "code": "sozlar = [\"olma\", \"anor\"]\nfor soz in sozlar\n    print(soz)",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "SyntaxError: expected ':'",
                    "error": true
                  },
                  {
                    "kind": "text",
                    "text": "`for` qatorining oxirida **ikki nuqta yo'q**."
                  },
                  {
                    "kind": "code",
                    "code": "sozlar = [\"olma\", \"anor\"]\nfor soz in sozlar:\n    print(soz)",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "`SyntaxError` — bu xatoning eng \"yaxshi\" turi, chunki kompyuter kodni umuman ishga tushirmaydi. Ya'ni siz xatoni **darhol** bilasiz. Eng yomon xatolar — kod ishlaydigan, lekin noto'g'ri natija beradiganlari."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu ikki kod bir xil natija beradimi? Nima uchun?"
                },
                {
                  "kind": "code",
                  "code": "# A\nsoz = \"salom\"\nfor i in range(len(soz) - 1):\n    print(soz[i] + soz[i + 1])\n\n# B\nsoz = \"salom\"\nfor a, b in zip(soz, soz[1:]):\n    print(a + b)",
                  "lang": "python",
                  "mode": "type"
                },
                {
                  "kind": "text",
                  "text": "Va `soz = \"a\"` (bitta belgi) bo'lsa, ikkalasi nima qiladi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "`\"salom\"` uchun ikkalasi ham bir xil: `sa`, `al`, `lo`, `om`."
                  },
                  {
                    "kind": "text",
                    "text": "`\"a\"` uchun — **ikkalasi ham hech narsa chiqarmaydi**, va bu to'g'ri javob:"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "**A:** `len(\"a\") - 1` = 0. `range(0)` bo'sh, tsikl umuman aylanmaydi.",
                      "**B:** `\"a\"[1:]` = `\"\"` (bo'sh matn). `zip(\"a\", \"\")` bo'sh, tsikl aylanmaydi."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Bitta belgidan juftlik yasab bo'lmaydi — juftlik uchun ikkita kerak. Ikkala kod ham buni to'g'ri uddaladi, **hech qanday maxsus tekshiruvsiz**."
                  },
                  {
                    "kind": "text",
                    "text": "**Bu muhim:** yaxshi yozilgan tsikl chekka holatlarni (bo'sh matn, bitta belgi) o'zi to'g'ri ishlaydi. Agar sizning kodingiz `if len(soz) < 2:` kabi qo'shimcha tekshiruvni talab qilsa — ehtimol tsiklni noto'g'ri yozgansiz."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "16-xulosa",
          "title": "16. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "**Ro'yxat** `[...]` — ko'p narsani bitta joyda saqlaydi. Indeks, kesish, `len` — hammasi matndagidek ishlaydi.",
                "Ro'yxat **o'zgaradi**, matn — **yo'q**. `.append()` ro'yxatning o'zini o'zgartiradi va hech narsa qaytarmaydi.",
                "`for x in narsa:` — har bir element uchun takrorlaydi. **Ikki nuqta va otstup majburiy.**",
                "`range(n)` — 0 dan n gacha, n kirmaydi. Kesishdagi qoida bilan bir xil.",
                "`i + 1` ishlatadigan tsikl `len(...) - 1` da to'xtashi kerak. Aks holda **off-by-one** xatosi.",
                "`zip(x, y)` — yonma-yon bog'laydi va o'zi to'xtaydi. `-1` kerak emas.",
                "**Kortej** `(a, b)` — o'zgarmas juftlik. Qiymatlarni qo'shmaydi, yonma-yon saqlaydi. Shuning uchun BPE undan foydalanadi.",
                "`n` belgidan har doim `n − 1` juftlik chiqadi."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Juftliklar bor. Endi ularni **sanash** kerak."
            },
            {
              "kind": "text",
              "text": "**Dars 04 — Lug'at va funksiya.** \"Nimadan → nimaga\" saqlaydigan idish, va kodni bir marta yozib ko'p marta ishlatish usuli."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *`koʻraman` so'zida eng ko'p uchraydigan juftlik qaysi?* U so'zda har bir juftlik bir martadan uchraydi — demak savol jiddiyroq matnda ma'no kasb etadi. Va javobni topadigan kod — bu `get_stats`, BPE algoritmining birinchi haqiqiy funksiyasi."
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–02. Indeks, kesish, `len`, `+`, `==`, f-satr"
    },
    {
      "id": "dars-04",
      "n": 4,
      "title": "Lug'at, shart va funksiya",
      "subtitle": "",
      "minutes": 55,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "bullets",
              "items": [
                "**saqlaysiz** \"nimadan → nimaga\" bog'lanishini — lug'at (dict) yordamida;",
                "**sanaysiz** biror narsa necha marta uchraganini — dasturlashdagi eng ko'p ishlatiladigan naqsh;",
                "**yozasiz** shart: \"agar shunday bo'lsa — buni qil, aks holda — buni\";",
                "**yasaysiz** o'z funksiyangizni — bir marta yozib, cheksiz ishlatiladigan kod;",
                "**qurasiz** `get_stats` — **BPE algoritmining birinchi haqiqiy funksiyasi.**"
              ]
            },
            {
              "kind": "text",
              "text": "Bu — Python bo'limining oxirgi darsi. Keyingi darsdan boshlab tokenizatorning o'zini quramiz."
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 03 da juftliklarni chiqarishni o'rgandik:"
            },
            {
              "kind": "pre",
              "text": "['ko', 'oʻ', 'ʻr', 'ra', 'am', 'ma', 'an']"
            },
            {
              "kind": "text",
              "text": "BPE algoritmi endi shuni so'raydi:"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Qaysi juftlik eng ko'p marta uchradi?**"
            },
            {
              "kind": "text",
              "text": "Buni bilish uchun har bir juftlikning **sonini** saqlash kerak:"
            },
            {
              "kind": "pre",
              "text": "('l', 'a')  →  8\n('a', 'r')  →  6\n('b', 'o')  →  4"
            },
            {
              "kind": "text",
              "text": "Ro'yxat buni uddalay olmaydi. Ro'yxatga murojaat qilish uchun **raqamli manzil** kerak: `royxat[0]`, `royxat[1]`. Lekin bizga `royxat[('l', 'a')]` kerak — manzil sifatida juftlikning o'zi."
            },
            {
              "kind": "text",
              "text": "Bunday idish bor va u **lug'at** deb ataladi."
            },
            {
              "kind": "media",
              "id": "f1",
              "title": "Javon va shkaf"
            }
          ]
        },
        {
          "id": "2-lugat-yorliqli-tortmalar",
          "title": "2. Lug'at — yorliqli tortmalar",
          "blocks": [
            {
              "kind": "text",
              "text": "Ro'yxat — raqamlangan javon. **Lug'at — yorliqli tortmalar shkafi.** Tortmani raqami bilan emas, **yorlig'i** bilan ochasiz."
            },
            {
              "kind": "code",
              "code": "yoshlar = {\"Ali\": 17, \"Vali\": 19, \"Hasan\": 16}\nprint(yoshlar)\nprint(yoshlar[\"Ali\"])\nprint(len(yoshlar))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{'Ali': 17, 'Vali': 19, 'Hasan': 16}\n17\n3"
            },
            {
              "kind": "bullets",
              "items": [
                "`{` va `}` — **figurali qavslar** lug'at yasaydi. (Ro'yxatda `[ ]` edi.)",
                "Har bir element ikki qismdan iborat: `\"Ali\": 17`",
                "`\"Ali\"` — **kalit** (key), ya'ni yorliq",
                "`17` — **qiymat** (value), ya'ni tortmaning ichidagi narsa",
                "Ikki nuqta ularni ajratadi, vergul elementlarni ajratadi.",
                "`yoshlar[\"Ali\"]` — kalit bo'yicha qiymatni oladi. **Kvadrat qavs**, lug'at yasashda figurali qavs ishlatilgan bo'lsa ham.",
                "`len()` — nechta juftlik borligini qaytaradi."
              ]
            },
            {
              "kind": "h3",
              "id": "ataylab-xato-yoq-kalit",
              "text": "Ataylab xato: yo'q kalit"
            },
            {
              "kind": "code",
              "code": "print(yoshlar[\"Karim\"])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "KeyError: 'Karim'",
              "error": true
            },
            {
              "kind": "text",
              "text": "Yangi xato turi. `KeyError` — **kalit topilmadi**. Bunday yorliqli tortma yo'q."
            },
            {
              "kind": "text",
              "text": "Dars 02 va 03 dagi `IndexError` bilan solishtiring: u \"manzil chegaradan tashqarida\" degan edi. Bu esa \"bunday yorliq umuman yo'q\" deydi. Ikkalasi ham \"so'raganingiz yo'q\" ma'nosini beradi, lekin idish har xil bo'lgani uchun xato ham har xil."
            },
            {
              "kind": "h3",
              "id": "yangi-kalit-qoshish",
              "text": "Yangi kalit qo'shish"
            },
            {
              "kind": "text",
              "text": "Ro'yxatda yangi element qo'shish uchun `.append()` kerak edi. Lug'atda esa — shunchaki yozasiz:"
            },
            {
              "kind": "code",
              "code": "yoshlar[\"Karim\"] = 18\nprint(yoshlar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{'Ali': 17, 'Vali': 19, 'Hasan': 16, 'Karim': 18}"
            },
            {
              "kind": "text",
              "text": "Va mavjud kalitni o'zgartirish ham xuddi shunday ko'rinadi:"
            },
            {
              "kind": "code",
              "code": "yoshlar[\"Ali\"] = 18\nprint(yoshlar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{'Ali': 18, 'Vali': 19, 'Hasan': 16, 'Karim': 18}"
            },
            {
              "kind": "note",
              "tone": "warn",
              "text": "**Diqqat:** bir xil kod ikki xil ish qildi — birinchisi yangi tortma yasadi, ikkinchisi mavjudini o'zgartirdi. Python farqni o'zi hal qiladi: kalit bor bo'lsa — ustiga yozadi, yo'q bo'lsa — yangisini yasaydi. **Eski qiymat ogohlantirishsiz yo'qoladi.**"
            }
          ]
        },
        {
          "id": "3-tekshirish-in-va-get",
          "title": "3. Tekshirish: `in` va `.get()`",
          "blocks": [
            {
              "kind": "text",
              "text": "Kalit bor-yo'qligini oldindan bilish uchun `in` ishlatiladi:"
            },
            {
              "kind": "code",
              "code": "print(\"Ali\" in yoshlar)\nprint(\"Sardor\" in yoshlar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "True\nFalse"
            },
            {
              "kind": "text",
              "text": "`True` / `False` — bu **mantiqiy qiymatlar**. Dars 02 da `==` dan keyin ko'rgan edingiz."
            },
            {
              "kind": "text",
              "text": "Ikkinchi yo'l — `.get()`. U `KeyError` bermaydi:"
            },
            {
              "kind": "code",
              "code": "yoshlar = {\"Ali\": 17, \"Vali\": 19, \"Hasan\": 16}\nprint(yoshlar.get(\"Ali\"))\nprint(yoshlar.get(\"Sardor\"))\nprint(yoshlar.get(\"Sardor\", 0))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "17\nNone\n0"
            },
            {
              "kind": "bullets",
              "items": [
                "`.get(kalit)` — kalit bor bo'lsa qiymatni, yo'q bo'lsa **`None`** ni qaytaradi.",
                "`None` — \"hech narsa\" degan maxsus qiymat. Xato emas, shunchaki bo'shlik.",
                "`.get(kalit, 0)` — **ikkinchi parametr**: kalit yo'q bo'lsa nima qaytarilsin. Bu yerda `0`."
              ]
            },
            {
              "kind": "text",
              "text": "**`.get(kalit, 0)` ni yaxshi eslab qoling.** Bu kursda eng ko'p ishlatiladigan buyruqlardan biri bo'ladi, va sababi darhol ko'rinadi."
            }
          ]
        },
        {
          "id": "4-shart-if-va-else",
          "title": "4. Shart — `if` va `else`",
          "blocks": [
            {
              "kind": "text",
              "text": "Sanashga o'tishdan oldin bitta yangi narsa kerak: kompyuterga **qaror qildirish**."
            },
            {
              "kind": "text",
              "text": "Avval solishtirishni ko'ramiz:"
            },
            {
              "kind": "code",
              "code": "son = 5\nprint(son > 3)\nprint(son > 10)\nprint(son == 5)\nprint(son != 5)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "True\nFalse\nTrue\nFalse"
            },
            {
              "kind": "bullets",
              "items": [
                "`>` katta, `<` kichik",
                "`==` teng (Dars 02)",
                "`!=` teng emas"
              ]
            },
            {
              "kind": "text",
              "text": "Endi shu javobga qarab ish qilamiz:"
            },
            {
              "kind": "code",
              "code": "son = 5\nif son > 3:\n    print(\"kattaroq\")\nelse:\n    print(\"kichikroq\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "kattaroq"
            },
            {
              "kind": "bullets",
              "items": [
                "`if shart:` — \"agar shart rost bo'lsa\".",
                "`else:` — \"aks holda\". Ixtiyoriy, yozmasa ham bo'ladi.",
                "**Ikki nuqta va otstup** — `for` dagidek (Dars 03). Xuddi shu qoidalar."
              ]
            },
            {
              "kind": "text",
              "text": "Ikkitasidan faqat **bittasi** ishlaydi, hech qachon ikkalasi ham emas."
            },
            {
              "kind": "h3",
              "id": "qisqartma",
              "text": "Qisqartma: `+=`"
            },
            {
              "kind": "text",
              "text": "Yana bitta kichik narsa, sanash uchun kerak:"
            },
            {
              "kind": "code",
              "code": "hisob = 0\nhisob = hisob + 1\nprint(hisob)\nhisob += 1\nprint(hisob)\nhisob += 10\nprint(hisob)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "1\n2\n12"
            },
            {
              "kind": "text",
              "text": "`hisob += 1` — bu `hisob = hisob + 1` ning qisqartmasi. Ma'nosi bir xil, yozilishi qisqaroq. Sanashda juda ko'p ishlatiladi."
            }
          ]
        },
        {
          "id": "5-sanash-naqshi",
          "title": "5. Sanash naqshi",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi darsning yuragi. Matndagi har bir harf necha marta uchraganini sanaymiz."
            },
            {
              "kind": "code",
              "code": "matn = \"bolalar\"\nhisob = {}\n\nfor harf in matn:\n    if harf in hisob:\n        hisob[harf] += 1\n    else:\n        hisob[harf] = 1\n\nprint(hisob)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{'b': 1, 'o': 1, 'l': 2, 'a': 2, 'r': 1}"
            },
            {
              "kind": "text",
              "text": "Qatorma-qator:"
            },
            {
              "kind": "steps",
              "items": [
                "`hisob = {}` — **bo'sh lug'at**. (Dars 03 dagi `[]` naqshiga o'xshash.)",
                "`for harf in matn:` — har bir harf uchun.",
                "`if harf in hisob:` — bu harfni ilgari ko'rganmizmi? - **ko'rgan bo'lsak** → `hisob[harf] += 1`, sonini bittaga oshiramiz - **ko'rmagan bo'lsak** → `hisob[harf] = 1`, birinchi marta, soni 1"
              ]
            },
            {
              "kind": "text",
              "text": "`bolalar` da `l` ikki marta, `a` ikki marta, qolganlari bir martadan. ✓"
            },
            {
              "kind": "h3",
              "id": "qisqaroq-yol",
              "text": "Qisqaroq yo'l"
            },
            {
              "kind": "text",
              "text": "Xuddi shu narsani `if` siz ham yozish mumkin:"
            },
            {
              "kind": "code",
              "code": "matn = \"bolalar\"\nhisob = {}\n\nfor harf in matn:\n    hisob[harf] = hisob.get(harf, 0) + 1\n\nprint(hisob)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{'b': 1, 'o': 1, 'l': 2, 'a': 2, 'r': 1}"
            },
            {
              "kind": "text",
              "text": "**Aynan bir xil natija.** Bitta qator."
            },
            {
              "kind": "text",
              "text": "Nima bo'lyapti: `hisob.get(harf, 0)` — \"bu harfning hozirgi soni; agar hali yo'q bo'lsa, 0\". Keyin `+ 1` va natijani qaytarib yozamiz."
            },
            {
              "kind": "text",
              "text": "Ya'ni `.get(..., 0)` \"birinchi marta\" holatini **o'zi** hal qiladi — shuning uchun `if` kerak emas."
            },
            {
              "kind": "text",
              "text": "Ikkala variant ham to'g'ri. Birinchisi — oshkora, o'qish oson. Ikkinchisi — qisqa va haqiqiy kodda shunday yoziladi. **Ikkalasini ham tushuning, ikkinchisini ishlating.**"
            }
          ]
        },
        {
          "id": "6-lugat-boylab-tsikl-items",
          "title": "6. Lug'at bo'ylab tsikl — `.items()`",
          "blocks": [
            {
              "kind": "text",
              "text": "Lug'atdagi hamma juftlikni ko'rib chiqish uchun:"
            },
            {
              "kind": "code",
              "code": "yoshlar = {\"Ali\": 17, \"Vali\": 19}\n\nfor ism, yosh in yoshlar.items():\n    print(ism, \"->\", yosh)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Ali -> 17\nVali -> 19"
            },
            {
              "kind": "text",
              "text": "`.items()` har bir tortmani **kortej** qilib beradi: `(\"Ali\", 17)`. Va Dars 03 dagi ochish (unpacking) ishlaydi — `for ism, yosh in ...`."
            },
            {
              "kind": "text",
              "text": "Dars 03 da `zip` bilan aynan shunday yozgan edingiz: `for a, b in zip(...)`. Bir xil naqsh, boshqa manba."
            },
            {
              "kind": "h3",
              "id": "eng-kattasini-topish",
              "text": "Eng kattasini topish"
            },
            {
              "kind": "text",
              "text": "Endi 1-bo'limdagi savolga javob bera olamiz:"
            },
            {
              "kind": "code",
              "code": "hisob = {\"la\": 8, \"ar\": 6, \"bo\": 4}\n\neng_kop = None\neng_kop_soni = 0\n\nfor juftlik, soni in hisob.items():\n    if soni > eng_kop_soni:\n        eng_kop = juftlik\n        eng_kop_soni = soni\n\nprint(eng_kop, eng_kop_soni)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "la 8"
            },
            {
              "kind": "text",
              "text": "Bu naqsh ham klassik. G'oya: **hozirgacha ko'rilgan eng yaxshisini eslab yurish.**"
            },
            {
              "kind": "steps",
              "items": [
                "Boshida hech narsa ko'rmaganmiz: `eng_kop = None`, `eng_kop_soni = 0`.",
                "Har bir elementni ko'rib chiqamiz.",
                "Agar hozirgisi eslab turganimizdan kattaroq bo'lsa — yangisini eslaymiz.",
                "Tsikl tugagach, `eng_kop` da eng kattasi qoladi."
              ]
            },
            {
              "kind": "text",
              "text": "`eng_kop_soni = 0` dan boshlash muhim: har qanday haqiqiy son 0 dan katta, shuning uchun birinchi element albatta eslanadi."
            }
          ]
        },
        {
          "id": "7-funksiya-bir-marta-yoz-kop-marta-ishlat",
          "title": "7. Funksiya — bir marta yoz, ko'p marta ishlat",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda endi sanash kodi bor. Lekin u bitta matn uchun yozilgan. Boshqa matnni sanash uchun **hammasini qayta nusxalash** kerak bo'ladi."
            },
            {
              "kind": "text",
              "text": "Funksiya aynan shu muammoni hal qiladi."
            },
            {
              "kind": "media",
              "id": "f3",
              "title": "Funksiya"
            },
            {
              "kind": "code",
              "code": "def salomlash(ism):\n    return \"Salom, \" + ism + \"!\"\n\nprint(salomlash(\"Islombek\"))\nprint(salomlash(\"Ali\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Salom, Islombek!\nSalom, Ali!"
            },
            {
              "kind": "text",
              "text": "Har bir bo'lakni ko'ramiz:"
            },
            {
              "kind": "bullets",
              "items": [
                "`def` — \"define\", ya'ni \"aniqlayman\". Yangi funksiya yasashni bildiradi.",
                "`salomlash` — **nom**. O'zingiz tanlaysiz, xuddi o'zgaruvchi nomi kabi.",
                "`(ism)` — **parametr**. Bu funksiya ichidagi o'zgaruvchi, va u chaqirilganda to'ldiriladi.",
                "`:` va otstup — `for` va `if` dagidek.",
                "`return` — **natijani qaytaradi**. Funksiya shu yerda tugaydi."
              ]
            },
            {
              "kind": "text",
              "text": "Ishlatish: `salomlash(\"Islombek\")`. Qavs ichidagi qiymat `ism` ga joylanadi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**`print` va `return` bir xil emas.** `print` — ekranga chiqaradi, odam ko'rishi uchun. `return` — qiymatni **kodga qaytaradi**, keyin u bilan ishlash mumkin."
            },
            {
              "kind": "text",
              "text": "Bir nechta parametr ham bo'ladi:"
            },
            {
              "kind": "code",
              "code": "def qosh(a, b):\n    return a + b\n\nprint(qosh(2, 3))\nprint(qosh(\"sa\", \"lom\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "5\nsalom"
            },
            {
              "kind": "text",
              "text": "Bitta funksiya, ikki xil ish — chunki `+` sonlarni qo'shadi, matnlarni ulaydi (Dars 02)."
            },
            {
              "kind": "h3",
              "id": "ataylab-xato-return-unutilgan",
              "text": "Ataylab xato: `return` unutilgan"
            },
            {
              "kind": "code",
              "code": "def hech_nima(x):\n    print(\"ishladim:\", x)\n\nnatija = hech_nima(5)\nprint(\"natija:\", natija)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "ishladim: 5\nnatija: None"
            },
            {
              "kind": "text",
              "text": "Funksiya ishladi, ekranga chiqardi — lekin `natija` da `None` turibdi."
            },
            {
              "kind": "text",
              "text": "Chunki `return` yozilmagan. **`return` siz funksiya har doim `None` qaytaradi.**"
            },
            {
              "kind": "text",
              "text": "Bu xato ogohlantirish bermaydi va uni topish qiyin. Funksiya \"ishlagandek\" ko'rinadi, lekin natijasi yo'qoladi. Yozganingizda o'zingizga savol bering: *bu funksiya nimadir qaytarishi kerakmi?*"
            }
          ]
        },
        {
          "id": "8-get-stats-birinchi-haqiqiy-funksiya",
          "title": "8. `get_stats` — birinchi haqiqiy funksiya",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi hammasini birlashtiramiz. Dars 03 dagi juftliklar + bu darsdagi sanash + funksiya:"
            },
            {
              "kind": "code",
              "code": "def get_stats(matn):\n    hisob = {}\n    for a, b in zip(matn, matn[1:]):\n        juftlik = (a, b)\n        hisob[juftlik] = hisob.get(juftlik, 0) + 1\n    return hisob\n\n\nprint(get_stats(\"salom\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{('s', 'a'): 1, ('a', 'l'): 1, ('l', 'o'): 1, ('o', 'm'): 1}"
            },
            {
              "kind": "text",
              "text": "Har bir qator tanish bo'lishi kerak:"
            },
            {
              "kind": "table",
              "head": [
                "Qator",
                "Qayerdan"
              ],
              "rows": [
                [
                  "`def get_stats(matn):`",
                  "shu dars, 7-bo'lim"
                ],
                [
                  "`hisob = {}`",
                  "shu dars, 5-bo'lim"
                ],
                [
                  "`for a, b in zip(matn, matn[1:])`",
                  "Dars 03, 9-bo'lim"
                ],
                [
                  "`juftlik = (a, b)`",
                  "Dars 03, 10-bo'lim (kortej)"
                ],
                [
                  "`hisob.get(juftlik, 0) + 1`",
                  "shu dars, 5-bo'lim"
                ],
                [
                  "`return hisob`",
                  "shu dars, 7-bo'lim"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "**Yangi hech narsa yo'q.** To'rt darsda o'rgangan narsalaringiz bitta funksiyaga yig'ildi."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Nomi nima uchun inglizcha? Chunki bu funksiya haqiqiy BPE kodida aynan shunday ataladi. Kurs tugagach siz boshqalarning kodini o'qiysiz — o'sha yerda ham `get_stats` turadi. Atamalarni tarjima qilmayapmiz, ular sizning kalitingiz."
            },
            {
              "kind": "h3",
              "id": "haqiqiy-ozbek-matnida",
              "text": "Haqiqiy o'zbek matnida"
            },
            {
              "kind": "code",
              "code": "matn = \"bolalar kitoblarni oʻqishdi. bolalar darslarni yozishdi. bolalar maktabga borishdi.\"\n\nstats = get_stats(matn)\nprint(\"belgilar soni :\", len(matn))\nprint(\"juftliklar    :\", len(matn) - 1)\nprint(\"turli juftlik :\", len(stats))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "belgilar soni : 83\njuftliklar    : 82\nturli juftlik : 45"
            },
            {
              "kind": "text",
              "text": "83 belgi → 82 juftlik (Dars 03 dagi `n − 1` qoidasi ✓). Lekin **turli** juftlik faqat 45 ta — demak ba'zilari takrorlangan. Qaysilari?"
            },
            {
              "kind": "code",
              "code": "eng_kop = None\neng_kop_soni = 0\n\nfor juftlik, soni in stats.items():\n    if soni > eng_kop_soni:\n        eng_kop = juftlik\n        eng_kop_soni = soni\n\nprint(\"eng koʻp juftlik:\", eng_kop, \"->\", eng_kop_soni, \"marta\")\nprint(\"yopishtirilgan  :\", eng_kop[0] + eng_kop[1])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "eng koʻp juftlik: ('l', 'a') -> 8 marta\nyopishtirilgan  : la"
            }
          ]
        },
        {
          "id": "9-toxtang-nima-bolganini-koring",
          "title": "9. To'xtang — nima bo'lganini ko'ring",
          "blocks": [
            {
              "kind": "text",
              "text": "Eng ko'p uchragan juftlik — **`la`**."
            },
            {
              "kind": "text",
              "text": "Endi matnga qarang: `bolalar`, `kitoblarni`, `darslarni`. Uchalasida ham **`-lar`** bor — o'zbek tilining **ko'plik qo'shimchasi**."
            },
            {
              "kind": "text",
              "text": "**Algoritm o'zbek grammatikasini o'rganmadi.** U faqat sanadi. Lekin eng ko'p uchragan juftlik aynan grammatik qo'shimchaning boshlanishi bo'lib chiqdi."
            },
            {
              "kind": "media",
              "id": "f2",
              "title": "Sanoq"
            },
            {
              "kind": "text",
              "text": "Bu tasodif emas. Til — takrorlanadigan naqshlardan iborat, va eng ko'p takrorlanadigan naqshlar aynan qo'shimchalar, o'zaklar va ko'p ishlatiladigan so'zlar. **Statistika grammatikani o'zi topadi.**"
            },
            {
              "kind": "text",
              "text": "Dars 16 da siz tokenizatorni haqiqiy katta o'zbek matnida o'qitasiz. U birinchi o'rganadigan tokenlar taxminan shular bo'ladi:"
            },
            {
              "kind": "pre",
              "text": "lar   da   ni   ga   di"
            },
            {
              "kind": "text",
              "text": "Ya'ni o'zbek tilining kelishik va ko'plik qo'shimchalari. Hech kim ularni aytmaydi — algoritm ularni o'zi topadi, faqat sanash orqali."
            },
            {
              "kind": "text",
              "text": "**Mana shu — butun BPE algoritmining g'oyasi.** Qolgan darslar shu g'oyani oxirigacha olib boradi."
            }
          ]
        },
        {
          "id": "10-muammo",
          "title": "10. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "`get_stats` ishlaydi. Lekin u **harflar** bilan ishlaydi."
            },
            {
              "kind": "text",
              "text": "Ikkita muammo bor:"
            },
            {
              "kind": "text",
              "text": "**Birinchi.** Dars 01 da aytilgan edi: model harfni tushunmaydi, u faqat raqam bilan ishlaydi. Bizning juftliklarimiz esa `('l', 'a')` — harflar. Ularni modelga bera olmaymiz."
            },
            {
              "kind": "text",
              "text": "**Ikkinchi.** Harf nima o'zi? `a` bitta narsami? `ʻ` chi? `😀` chi? Turli tillarda turli belgi bor, va kompyuter ularning hammasini bir xil usulda saqlashi kerak."
            },
            {
              "kind": "text",
              "text": "Demak, keyingi savol: **kompyuter harfni qanday saqlaydi?**"
            },
            {
              "kind": "text",
              "text": "Javob sizni hayratda qoldirmaydi — raqam bilan. Lekin **qaysi** raqam, va nima uchun aynan o'sha — bu keyingi ikki darsning mavzusi. Va o'sha yerda nihoyat `oʻ` ning nima uchun ikkita belgi ekanini oxirigacha tushunasiz."
            }
          ]
        },
        {
          "id": "11-toliq-kod",
          "title": "11. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "# ---- 1. Lugʻat ----\nyoshlar = {\"Ali\": 17, \"Vali\": 19, \"Hasan\": 16}\nprint(yoshlar[\"Ali\"])\nyoshlar[\"Karim\"] = 18\nprint(yoshlar)\nprint(\"Sardor\" in yoshlar)\nprint(yoshlar.get(\"Sardor\", 0))\n\n# ---- 2. Shart ----\nson = 5\nif son > 3:\n    print(\"kattaroq\")\nelse:\n    print(\"kichikroq\")\n\n# ---- 3. Sanash naqshi ----\nmatn = \"bolalar\"\nhisob = {}\nfor harf in matn:\n    hisob[harf] = hisob.get(harf, 0) + 1\nprint(hisob)\n\n# ---- 4. Lugʻat boʻylab tsikl ----\nfor harf, soni in hisob.items():\n    print(harf, \"->\", soni)\n\n# ---- 5. Funksiya ----\ndef get_stats(matn):\n    hisob = {}\n    for a, b in zip(matn, matn[1:]):\n        juftlik = (a, b)\n        hisob[juftlik] = hisob.get(juftlik, 0) + 1\n    return hisob\n\n# ---- 6. Eng koʻp uchraganini topish ----\ndef eng_kop_juftlik(hisob):\n    eng = None\n    eng_soni = 0\n    for juftlik, soni in hisob.items():\n        if soni > eng_soni:\n            eng = juftlik\n            eng_soni = soni\n    return eng\n\n# ---- 7. Sinov ----\nmatn = \"bolalar kitoblarni oʻqishdi. bolalar darslarni yozishdi. bolalar maktabga borishdi.\"\nstats = get_stats(matn)\n\nprint(\"turli juftlik :\", len(stats))\neng = eng_kop_juftlik(stats)\nprint(\"eng koʻp      :\", eng, \"->\", stats[eng], \"marta\")\nprint(\"yopishtirilgan:\", eng[0] + eng[1])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "17\n{'Ali': 17, 'Vali': 19, 'Hasan': 16, 'Karim': 18}\nFalse\n0\nkattaroq\n{'b': 1, 'o': 1, 'l': 2, 'a': 2, 'r': 1}\nb -> 1\no -> 1\nl -> 2\na -> 2\nr -> 1\nturli juftlik : 45\neng koʻp      : ('l', 'a') -> 8 marta\nyopishtirilgan: la",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "12-ozingiz-yozing",
          "title": "12. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "# Soʻzlar roʻyxatidagi har bir soʻz necha marta uchraganini sanang\n\nsozlar = [\"olma\", \"anor\", \"olma\", \"uzum\", \"olma\", \"anor\"]\n\nhisob = ___                      # boʻsh lugʻat\n\nfor soz in ___:\n    hisob[soz] = hisob.___(soz, ___) + 1\n\nprint(hisob)\n\n# Eng koʻp uchragan soʻzni toping\neng = ___\neng_soni = ___\nfor soz, soni in hisob.___():\n    if soni ___ eng_soni:\n        eng = ___\n        eng_soni = ___\n\nprint(\"eng koʻp:\", eng, eng_soni)",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "sozlar = [\"olma\", \"anor\", \"olma\", \"uzum\", \"olma\", \"anor\"]\n\nhisob = {}\n\nfor soz in sozlar:\n    hisob[soz] = hisob.get(soz, 0) + 1\n\nprint(hisob)\n\neng = None\neng_soni = 0\nfor soz, soni in hisob.items():\n    if soni > eng_soni:\n        eng = soz\n        eng_soni = soni\n\nprint(\"eng koʻp:\", eng, eng_soni)",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "output",
                  "text": "{'olma': 3, 'anor': 2, 'uzum': 1}\neng koʻp: olma 3"
                },
                {
                  "kind": "text",
                  "text": "E'tibor bering: sanash naqshi **bir xil** — harflar uchun ham, so'zlar uchun ham, juftliklar uchun ham. Faqat nima sanayotganingiz o'zgaradi. Shuning uchun uni bir marta tushunsangiz yetadi."
                }
              ]
            }
          ]
        },
        {
          "id": "13-mashqlar",
          "title": "13. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu kod nima chiqaradi? Ishga tushirmasdan ayting."
                },
                {
                  "kind": "code",
                  "code": "d = {\"a\": 1}\nd[\"b\"] = 2\nd[\"a\"] = 5\nprint(d)\nprint(len(d))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "{'a': 5, 'b': 2}\n2"
                  },
                  {
                    "kind": "text",
                    "text": "`d[\"b\"] = 2` — yangi kalit qo'shdi. `d[\"a\"] = 5` — mavjud kalitni **ustiga yozdi**. Eski qiymat (1) yo'qoldi."
                  },
                  {
                    "kind": "text",
                    "text": "Uzunlik 2 — chunki `a` ikki marta emas, bir marta. **Lug'atda kalit takrorlanmaydi.**"
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu ikkisining farqi nima?"
                },
                {
                  "kind": "code",
                  "code": "d = {\"Ali\": 17}\nprint(d[\"Vali\"])\nprint(d.get(\"Vali\"))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "Birinchisi:"
                  },
                  {
                    "kind": "output",
                    "text": "KeyError: 'Vali'",
                    "error": true
                  },
                  {
                    "kind": "text",
                    "text": "Dastur **to'xtaydi**. Keyingi qatorlar umuman ishlamaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Ikkinchisi:"
                  },
                  {
                    "kind": "pre",
                    "text": "None"
                  },
                  {
                    "kind": "text",
                    "text": "Dastur **davom etadi**."
                  },
                  {
                    "kind": "text",
                    "text": "Qachon qaysi biri kerak?"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`d[kalit]` — kalit **albatta bo'lishi kerak** bo'lsa. Yo'q bo'lsa — bu xato, va siz buni darhol bilishingiz kerak.",
                      "`.get(kalit, 0)` — kalit **bo'lmasligi normal** bo'lsa. Sanashda aynan shunday: har bir yangi juftlik birinchi marta yo'q bo'ladi."
                    ]
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`get_stats(\"aaaa\")` nima qaytaradi? Avval qo'lda hisoblang."
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(get_stats(\"aaaa\"))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "{('a', 'a'): 3}"
                  },
                  {
                    "kind": "text",
                    "text": "4 ta belgi → 3 ta juftlik (`n − 1` qoidasi). Va uchalasi ham bir xil: `('a','a')`."
                  },
                  {
                    "kind": "text",
                    "text": "Shuning uchun lug'atda faqat **bitta** kalit bor, qiymati 3."
                  },
                  {
                    "kind": "text",
                    "text": "Bu muhim chekka holat: BPE algoritmi takrorlanuvchi belgilar bilan ishlaganda ehtiyot bo'lish kerak. Dars 09 da `merge` ni yozganingizda `aaaa` ni sinab ko'rasiz — va o'sha yerda qiziq muammo chiqadi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu funksiya nima uchun `None` qaytaradi? Tuzating."
                },
                {
                  "kind": "code",
                  "code": "def kopaytir(a, b):\n    natija = a * b\n    print(natija)\n\nx = kopaytir(3, 4)\nprint(\"x =\", x)",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "12\nx = None"
                  },
                  {
                    "kind": "text",
                    "text": "Funksiya `12` ni **chiqardi**, lekin **qaytarmadi**. `print` va `return` — ikki xil narsa."
                  },
                  {
                    "kind": "code",
                    "code": "def kopaytir(a, b):\n    natija = a * b\n    return natija\n\nx = kopaytir(3, 4)\nprint(\"x =\", x)      # x = 12",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Yoki qisqaroq: `return a * b`."
                  },
                  {
                    "kind": "text",
                    "text": "Qoida: funksiya natijasi bilan **keyin ishlashingiz** kerak bo'lsa — `return`. Faqat ko'rsatish kerak bo'lsa — `print`. Ko'pincha `return` to'g'ri javob, chunki chaqirgan tomon xohlasa o'zi chop etadi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Quyidagi ikki matn uchun `get_stats` ni ishga tushiring va eng ko'p uchragan juftlikni toping:"
                },
                {
                  "kind": "code",
                  "code": "matn1 = \"kitoblar daftarlar qalamlar\"\nmatn2 = \"maktabda bogʻda uyda\"",
                  "lang": "python",
                  "mode": "type"
                },
                {
                  "kind": "text",
                  "text": "Natijalar o'zbek tili haqida nimani aytadi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(eng_kop_juftlik(get_stats(matn1)))   # ('l', 'a')\nprint(eng_kop_juftlik(get_stats(matn2)))   # ('d', 'a')",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Birinchisida — `la`, ya'ni **`-lar`** (ko'plik qo'shimchasi). Ikkinchisida — `da`, ya'ni **`-da`** (o'rin-payt kelishigi)."
                  },
                  {
                    "kind": "text",
                    "text": "Ikkala holatda ham algoritm **grammatik qo'shimchani** topdi. U grammatikani bilmaydi, u faqat takrorni ko'radi — lekin o'zbek tilida eng ko'p takrorlanadigan narsa aynan qo'shimchalar, chunki til **agglyutinativ**: har bir so'zga bir xil qo'shimchalar ulanadi."
                  },
                  {
                    "kind": "text",
                    "text": "**Shuning uchun BPE o'zbek tilida yaxshi ishlaydi.** Va shuning uchun ingliz tili uchun qurilgan tokenizator o'zbekchada yomon ishlaydi — u `-lar` va `-da` ni hech qachon ko'rmagan, shuning uchun ularni har safar bo'laklab yuboradi."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 01 dagi `1.749` va `2.578` raqamlari — aynan shu farqning o'lchovi."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "14-xulosa",
          "title": "14. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "**Lug'at** `{kalit: qiymat}` — raqamli manzil emas, **yorliq** bo'yicha saqlaydi. Yo'q kalit → `KeyError`.",
                "`.get(kalit, 0)` — kalit yo'q bo'lsa xato bermaydi, `0` qaytaradi. Sanashning kaliti.",
                "**Sanash naqshi:** `hisob[x] = hisob.get(x, 0) + 1`. Butun kursda ishlatasiz.",
                "`if` / `else` — shart. Ikki nuqta va otstup, `for` dagidek.",
                "**Eng kattasini topish naqshi:** hozirgacha ko'rilgan eng yaxshisini eslab yurish.",
                "**Funksiya** `def ... return` — bir marta yoz, ko'p marta ishlat. `return` siz funksiya `None` qaytaradi.",
                "`get_stats` tayyor — va u o'zbek tilining ko'plik qo'shimchasini o'zi topdi."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Python bo'limi tugadi. **Endi tokenizatorni quramiz.**"
            },
            {
              "kind": "text",
              "text": "**Dars 05 — Kompyuter harfni qanday saqlaydi.** Har bir belgining o'z raqami bor, va bu raqamlar tizimi butun dunyo uchun bitta."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *`ord(\"a\")` nima qaytaradi — va nima uchun aynan o'sha raqam?* Javob 1960-yillarga borib taqaladi, va u `oʻ` muammosining ildizini ochadi."
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–03. Ro'yxat, tsikl, `zip`, kortej, `==`"
    },
    {
      "id": "dars-05",
      "n": 5,
      "title": "Kompyuter harfni qanday saqlaydi",
      "subtitle": "",
      "minutes": 45,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "bullets",
              "items": [
                "**bilasiz** kompyuter harfni qanday saqlashini — va nima uchun aynan shunday;",
                "**aylantirasiz** istalgan belgini raqamga va raqamni belgiga;",
                "**tushunasiz** `U+02BB` degan yozuv nimani anglatishini;",
                "**oxirigacha tushuntirasiz** nima uchun `oʻ` ikkita belgi ekanini — raqamlar bilan;",
                "**yozasiz** birinchi haqiqiy `kodla` / `dekodla` juftligini."
              ]
            },
            {
              "kind": "text",
              "text": "**Bu — tokenizator qurishning birinchi darsi.** Python bo'limi tugadi."
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 04 oxirida savol qoldirgan edim. Python'da shunday buyruq bor:"
            },
            {
              "kind": "code",
              "code": "print(ord(\"a\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "97"
            },
            {
              "kind": "text",
              "text": "`a` harfi — bu `97`."
            },
            {
              "kind": "text",
              "text": "Savol: **nima uchun aynan 97?**"
            },
            {
              "kind": "text",
              "text": "Nima uchun 1 emas? Nima uchun 0 emas? `a` — alifboning birinchi harfi, mantiqan 1 bo'lishi kerakdek."
            },
            {
              "kind": "text",
              "text": "Javob 1963-yilga borib taqaladi, va u sizning `oʻ` muammoyingizning ildizini ochadi."
            }
          ]
        },
        {
          "id": "2-kompyuterda-faqat-raqam-bor",
          "title": "2. Kompyuterda faqat raqam bor",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 01 da aytilgan edi: model raqam bilan ishlaydi. Endi buni kengaytiramiz — **kompyuterda umuman faqat raqam bor.**"
            },
            {
              "kind": "text",
              "text": "Ekrandagi harf, rasm, musiqa, video — hammasi raqam. Boshqa hech narsa yo'q."
            },
            {
              "kind": "text",
              "text": "Demak har bir harf uchun **raqam tayinlanishi** kerak. Kim tayinlaydi? Odamlar, kelishib."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Eng muhim fikr:** raqamning qiymati ahamiyatsiz. Muhimi — **hamma bir xil raqamdan foydalanishi.** Agar men `a` ni 97 deb yuborsam, siz esa 97 ni `b` deb o'qisangiz — xabar buziladi."
            },
            {
              "kind": "media",
              "id": "g1",
              "title": "Kelishuv"
            },
            {
              "kind": "text",
              "text": "Shuning uchun **kelishuv jadvali** kerak: qaysi belgi qaysi raqam. Bu jadval butun dunyo uchun bitta bo'lishi kerak."
            },
            {
              "kind": "text",
              "text": "Bu jadvalning hozirgi nomi — **Unicode**."
            }
          ]
        },
        {
          "id": "3-ord-va-chr",
          "title": "3. `ord()` va `chr()`",
          "blocks": [
            {
              "kind": "text",
              "text": "Ikkita buyruq bilan jadvalga ikki tomondan qarash mumkin."
            },
            {
              "kind": "code",
              "code": "print(ord(\"a\"))\nprint(ord(\"b\"))\nprint(ord(\"c\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "97\n98\n99"
            },
            {
              "kind": "code",
              "code": "print(chr(97))\nprint(chr(98))\nprint(chr(99))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "a\nb\nc"
            },
            {
              "kind": "bullets",
              "items": [
                "`ord(belgi)` — **belgidan raqamga**. (\"ord\" — inglizcha *ordinal*, \"tartib raqami\".)",
                "`chr(raqam)` — **raqamdan belgiga**. (\"chr\" — *character*, \"belgi\".)"
              ]
            },
            {
              "kind": "text",
              "text": "Ikkalasi bir-birining teskarisi. `chr(ord(\"a\"))` → `\"a\"`."
            },
            {
              "kind": "note",
              "tone": "warn",
              "text": "`ord()` **bitta** belgi qabul qiladi. `ord(\"salom\")` yozsangiz xato chiqadi."
            },
            {
              "kind": "text",
              "text": "Butun so'zni ko'ramiz:"
            },
            {
              "kind": "code",
              "code": "for harf in \"salom\":\n    print(harf, \"->\", ord(harf))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "s -> 115\na -> 97\nl -> 108\no -> 111\nm -> 109"
            },
            {
              "kind": "text",
              "text": "Mana `salom` so'zining haqiqiy ko'rinishi kompyuter ichida: `115 97 108 111 109`."
            }
          ]
        },
        {
          "id": "4-raqamlar-tartibli",
          "title": "4. Raqamlar tartibli",
          "blocks": [
            {
              "kind": "text",
              "text": "Diqqat qiling: `a`=97, `b`=98, `c`=99. **Ketma-ket.**"
            },
            {
              "kind": "code",
              "code": "print(ord(\"a\"), ord(\"z\"))\nprint(ord(\"A\"), ord(\"Z\"))\nprint(ord(\"a\") - ord(\"A\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "97 122\n65 90\n32"
            },
            {
              "kind": "bullets",
              "items": [
                "Kichik harflar: **97 dan 122 gacha** (26 ta harf)",
                "Katta harflar: **65 dan 90 gacha** (26 ta harf)",
                "Orasidagi farq: **aniq 32**"
              ]
            },
            {
              "kind": "text",
              "text": "Bu tasodif emas. Jadvalni tuzganlar alifboni ketma-ket joylashtirgan, va katta/kichik harflarni aniq 32 raqam farq bilan qo'ygan. Shuning uchun `.lower()` va `.upper()` juda tez ishlaydi — ular shunchaki 32 qo'shadi yoki ayiradi."
            },
            {
              "kind": "text",
              "text": "Boshqa belgilar ham bor:"
            },
            {
              "kind": "code",
              "code": "print(ord(\"0\"), ord(\"9\"))\nprint(ord(\" \"))\nprint(ord(\"!\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "48 57\n32\n33"
            },
            {
              "kind": "text",
              "text": "**Bo'shliq ham belgi** — uning raqami 32. Dars 01 da `len` bo'shliqni sanagan edi, endi nima uchun ekanini bilasiz: u haqiqiy belgi, huddi harflar kabi."
            },
            {
              "kind": "h3",
              "id": "tuzoq-5-va-5",
              "text": "Tuzoq: `\"5\"` va `5`"
            },
            {
              "kind": "code",
              "code": "print(\"5\" == 5)\nprint(ord(\"5\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "False\n53"
            },
            {
              "kind": "text",
              "text": "**`\"5\"` va `5` — butunlay boshqa narsa.**"
            },
            {
              "kind": "bullets",
              "items": [
                "`5` — bu son. U bilan hisoblash mumkin: `5 + 5 = 10`.",
                "`\"5\"` — bu **belgi**, uning jadvaldagi raqami 53. `\"5\" + \"5\"` = `\"55\"` (Dars 02)."
              ]
            },
            {
              "kind": "text",
              "text": "Boshlovchilar buni juda ko'p chalkashtiradi. Qo'shtirnoq bor bo'lsa — bu matn, son emas."
            }
          ]
        },
        {
          "id": "5-nima-uchun-97-1963-yil",
          "title": "5. Nima uchun 97? — 1963-yil",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi 1-bo'limdagi savolga javob."
            },
            {
              "kind": "text",
              "text": "1963-yilda Amerikada birinchi keng tarqalgan kelishuv jadvali tuzildi. Uning nomi — **ASCII**."
            },
            {
              "kind": "text",
              "text": "ASCII da atigi **128 ta** belgi bor edi:"
            },
            {
              "kind": "table",
              "head": [
                "Raqamlar",
                "Nima"
              ],
              "rows": [
                [
                  "0–31",
                  "boshqaruv belgilari (yangi qator, tabulyatsiya va h.k.)"
                ],
                [
                  "32–47",
                  "bo'shliq va tinish belgilari"
                ],
                [
                  "48–57",
                  "raqamlar `0`–`9`"
                ],
                [
                  "65–90",
                  "katta harflar `A`–`Z`"
                ],
                [
                  "97–122",
                  "kichik harflar `a`–`z`"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "`a` ning 97 bo'lishi shundan: birinchi 96 ta joy boshqaruv belgilari, raqamlar va katta harflarga ketgan."
            },
            {
              "kind": "text",
              "text": "Ishlaydi:"
            },
            {
              "kind": "code",
              "code": "print(chr(72) + chr(101) + chr(108) + chr(108) + chr(111))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Hello"
            },
            {
              "kind": "text",
              "text": "**Lekin muammoni ko'rdingizmi?**"
            },
            {
              "kind": "text",
              "text": "128 ta belgi. Ingliz alifbosi uchun yetarli. **Dunyodagi boshqa hech qaysi til uchun yetarli emas.**"
            },
            {
              "kind": "text",
              "text": "O'zbek lotin alifbosidagi `oʻ` uchun joy yo'q. Rus kirillitsasi uchun joy yo'q. Xitoy ieroglifi uchun joy yo'q. Arab, hind, yunon — hech biri uchun joy yo'q."
            },
            {
              "kind": "text",
              "text": "Bu texnik cheklov emas edi — bu **tanlov** edi. Jadvalni tuzganlar ingliz tilida yozgan va ingliz tili uchun tuzgan."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Dars 01 dagi adolatsizlikni eslang: o'zbek tilida ChatGPT uch barobar qimmat. Uning ildizi shu yerdan boshlanadi — kompyuter dunyosi ingliz tilidan boshlangan, va qolgan hamma til keyin, qiyinchilik bilan qo'shilgan."
            },
            {
              "kind": "media",
              "id": "g2",
              "title": "128 ta joy"
            }
          ]
        },
        {
          "id": "6-unicode-dunyo-uchun-bitta-jadval",
          "title": "6. Unicode — dunyo uchun bitta jadval",
          "blocks": [
            {
              "kind": "text",
              "text": "1990-yillarda yangi jadval tuzildi: **Unicode**. Maqsad — **dunyodagi hamma yozuv tizimi uchun bitta jadval**."
            },
            {
              "kind": "text",
              "text": "Birinchi 128 ta raqam ASCII bilan **aynan bir xil** qoldirildi (eski dasturlar ishlashda davom etishi uchun). Keyin esa millionlab yangi joy qo'shildi."
            },
            {
              "kind": "code",
              "code": "namunalar = [\"a\", \"ʻ\", \"g\", \"ў\", \"я\", \"漢\", \"😀\"]\nfor b in namunalar:\n    print(f\"{b!r:8s} -> {ord(b):8d}  U+{ord(b):04X}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'a'      ->       97  U+0061\n'ʻ'      ->      699  U+02BB\n'g'      ->      103  U+0067\n'ў'      ->     1118  U+045E\n'я'      ->     1103  U+044F\n'漢'      ->    28450  U+6F22\n'😀'      ->   128512  U+1F600"
            },
            {
              "kind": "text",
              "text": "Hamma narsa bitta jadvalda: lotin harfi, o'zbek belgisi, kirill harfi, xitoy ieroglifi, hatto emoji."
            },
            {
              "kind": "code",
              "code": "import sys\nprint(\"eng katta Unicode raqami:\", sys.maxunicode)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "eng katta Unicode raqami: 1114111"
            },
            {
              "kind": "text",
              "text": "**1 114 112 ta joy.** Hozircha ularning taxminan 150 000 tasi to'ldirilgan."
            },
            {
              "kind": "h3",
              "id": "u-02bb-degan-yozuv-nima",
              "text": "`U+02BB` degan yozuv nima?"
            },
            {
              "kind": "text",
              "text": "Yuqoridagi jadvalda ikkinchi ustunda `U+02BB` kabi yozuvlar bor. Bu **o'sha raqamning o'zi**, faqat boshqa sanoq sistemasida yozilgan."
            },
            {
              "kind": "text",
              "text": "Biz o'nlik sanoqda yozamiz: 699. Kompyuter olamida esa **o'n oltilik** (hex) qulayroq."
            },
            {
              "kind": "code",
              "code": "print(hex(699))\nprint(int(\"2BB\", 16))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "0x2bb\n699"
            },
            {
              "kind": "text",
              "text": "`2BB` — bu o'n oltilikda 699. `U+` old qo'shimchasi \"bu Unicode raqami\" degani."
            },
            {
              "kind": "text",
              "text": "Hozir o'n oltilikni chuqur tushunishingiz shart emas. Shuni bilish yetarli:"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**`U+02BB` va `699` — bir xil raqam, ikki xil yozuv.**"
            },
            {
              "kind": "text",
              "text": "Bu yozuvni hujjatlarda, saytlarda, xato xabarlarida doim ko'rasiz — endi uni tanib olasiz."
            }
          ]
        },
        {
          "id": "7-o-muammosi-nihoyat-toliq-javob",
          "title": "7. `oʻ` muammosi — nihoyat to'liq javob",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 02 da kashf qilgan edingiz: `koʻraman` da 8 ta belgi bor, garchi ko'z 7 ta harf ko'rsa ham. Endi sababni **raqamlarda** ko'rasiz."
            },
            {
              "kind": "code",
              "code": "for harf in \"oʻ\":\n    print(repr(harf), \"->\", ord(harf))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'o' -> 111\n'ʻ' -> 699"
            },
            {
              "kind": "text",
              "text": "Ikkita belgi, ikkita raqam: **111** va **699**."
            },
            {
              "kind": "text",
              "text": "**Nima uchun bitta raqam emas?** Chunki Unicode jadvalida `oʻ` degan **yagona belgi yo'q**. Uni tuzganlar o'zbek lotin alifbosi uchun alohida joy ajratmagan. Shuning uchun `oʻ` ikkita mavjud belgidan yig'iladi: oddiy `o` (111) va maxsus belgi `ʻ` (699)."
            },
            {
              "kind": "text",
              "text": "Bu kimningdir xatosi emas — Unicode 1990-yillarda tuzilgan, o'zbek lotin alifbosi esa o'sha davrda endi joriy qilinayotgan edi."
            },
            {
              "kind": "h3",
              "id": "va-endi-tortta-apostrof",
              "text": "Va endi — to'rtta apostrof"
            },
            {
              "kind": "text",
              "text": "Dars 02 dagi eng muhim mashqni eslang: uchta `oʻzbek` ko'zga bir xil ko'rinardi, lekin teng emas edi. Mana nima uchun:"
            },
            {
              "kind": "code",
              "code": "belgilar = [\"'\", \"\\u2018\", \"\\u2019\", \"\\u02bb\"]\nfor b in belgilar:\n    print(repr(b), \"->\", ord(b), \"-> U+\" + format(ord(b), \"04X\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "\"'\" -> 39 -> U+0027\n'‘' -> 8216 -> U+2018\n'’' -> 8217 -> U+2019\n'ʻ' -> 699 -> U+02BB"
            },
            {
              "kind": "text",
              "text": "To'rtta belgi. Ko'zga deyarli bir xil. Kompyuter uchun — **to'rtta butunlay boshqa raqam**:"
            },
            {
              "kind": "table",
              "head": [
                "Belgi",
                "Raqam",
                "Nomi",
                "Qayerdan keladi"
              ],
              "rows": [
                [
                  "`'`",
                  "39",
                  "oddiy apostrof",
                  "klaviaturadagi tugma"
                ],
                [
                  "`‘`",
                  "8216",
                  "chap burchakli qo'shtirnoq",
                  "Word avtomatik almashtiradi"
                ],
                [
                  "`’`",
                  "8217",
                  "o'ng burchakli qo'shtirnoq",
                  "Word avtomatik almashtiradi"
                ],
                [
                  "`ʻ`",
                  "**699**",
                  "**to'g'ri belgi**",
                  "o'zbek lotin alifbosi standarti"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Faqat **699** to'g'ri. Qolgan uchtasi — xato, lekin internetdagi o'zbek matnining katta qismida aynan ular turadi."
            },
            {
              "kind": "media",
              "id": "g3",
              "title": "Toʻrtta apostrof"
            },
            {
              "kind": "text",
              "text": "**Tokenizator uchun bu nimani anglatadi?** `oʻzbek` so'zi **to'rt xil so'z** bo'lib ko'rinadi. Lug'atda to'rt marta joy egallaydi, va har biri uchun bilim to'rt marta kam bo'ladi."
            },
            {
              "kind": "text",
              "text": "Yechim oddiy va sizda allaqachon bor — Dars 02 dagi `.replace()`:"
            },
            {
              "kind": "code",
              "code": "matn = matn.replace(\"'\", \"ʻ\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Dars 14 da buni to'liq, hamma variant bilan yozamiz. Endi **nima uchun** kerakligini raqamlar darajasida bilasiz."
            }
          ]
        },
        {
          "id": "8-birinchi-kodla-dekodla",
          "title": "8. Birinchi `kodla` / `dekodla`",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi bizda matnni raqamga aylantiradigan hamma narsa bor. Yozamiz:"
            },
            {
              "kind": "code",
              "code": "def kodla(matn):\n    raqamlar = []\n    for harf in matn:\n        raqamlar.append(ord(harf))\n    return raqamlar\n\n\ndef dekodla(raqamlar):\n    matn = \"\"\n    for raqam in raqamlar:\n        matn += chr(raqam)\n    return matn",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "**Satr izohi:**"
            },
            {
              "kind": "bullets",
              "items": [
                "`kodla` — Dars 03 dagi naqsh: bo'sh ro'yxat → tsikl → `.append()` → `return`.",
                "`dekodla` — o'xshash, lekin `matn = \"\"` bo'sh **matndan** boshlanadi, va `+=` bilan harf qo'shiladi. `+=` matnlar bilan ham ishlaydi (Dars 02: `+` matnlarni ulaydi)."
              ]
            },
            {
              "kind": "text",
              "text": "Sinaymiz:"
            },
            {
              "kind": "code",
              "code": "matn = \"koʻraman\"\nraqamlar = kodla(matn)\nprint(raqamlar)\nprint(dekodla(raqamlar))\nprint(\"round-trip:\", dekodla(kodla(matn)) == matn)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[107, 111, 699, 114, 97, 109, 97, 110]\nkoʻraman\nround-trip: True"
            },
            {
              "kind": "text",
              "text": "**Bu ro'yxatga diqqat bilan qarang:**"
            },
            {
              "kind": "pre",
              "text": " k    o    ʻ    r    a    m    a    n\n107  111  699  114   97  109   97  110\n           ↑\n boshqalardan ancha katta"
            },
            {
              "kind": "text",
              "text": "`699` boshqa hamma raqamdan keskin ajralib turibdi. Qolganlari 97–115 oralig'ida (ASCII zonasi), `ʻ` esa undan ancha uzoqda. Bu — o'zbek belgisining Unicode jadvaliga keyin, alohida joyga qo'shilganining izi."
            },
            {
              "kind": "text",
              "text": "`round-trip: True` — Dars 02 dagi tekshiruv. Matn → raqamlar → matn, va asl matn qaytdi. Hech narsa yo'qolmadi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Bu allaqachon tokenizator.** Juda sodda: har bir belgi = bitta token. U ishlaydi, round-trip to'g'ri. Faqat u **yomon** tokenizator, va nima uchun yomonligini Dars 07 da ko'rasiz."
            }
          ]
        },
        {
          "id": "9-muammo",
          "title": "9. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Ikkita muammo bor, va ikkalasi ham keyingi darsning mavzusi."
            },
            {
              "kind": "text",
              "text": "**Birinchi — lug'at juda katta.**"
            },
            {
              "kind": "text",
              "text": "Har bir Unicode belgisi alohida token bo'lsa, lug'atimizda **1 114 112** ta token bo'ladi. Dars 01 dagi jadvalni eslang: GPT-4o da 200 019, bizning tokenizatorimizda 16 384. Million — bu juda ko'p."
            },
            {
              "kind": "text",
              "text": "**Ikkinchi — va bu jiddiyroq — raqamni qanday saqlash kerak?**"
            },
            {
              "kind": "text",
              "text": "Kompyuter xotirasi **bayt**lardan iborat. Bitta bayt faqat **0 dan 255 gacha** raqamni saqlay oladi. Boshqa hech qanday raqamni."
            },
            {
              "kind": "text",
              "text": "Endi qarang:"
            },
            {
              "kind": "bullets",
              "items": [
                "`ord(\"a\")` = 97 → baytga sig'adi ✓",
                "`ord(\"ʻ\")` = 699 → **sig'maydi** ✗",
                "`ord(\"😀\")` = 128512 → **umuman sig'maydi** ✗"
              ]
            },
            {
              "kind": "text",
              "text": "Demak 699 ni bitta baytga yozib bo'lmaydi. Uni qandaydir yo'l bilan **bir nechta baytga bo'lish** kerak."
            },
            {
              "kind": "text",
              "text": "Va aynan shu yerda `oʻ` ning ikkinchi siri yotadi. Dars 01 da aytgan edim: `koʻraman` da 8 ta belgi bor, lekin kompyuter xotirasida **9 ta joy** band bo'ladi. Nima uchun bittasi ortiqcha — javob keyingi darsda."
            }
          ]
        },
        {
          "id": "10-toliq-kod",
          "title": "10. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "# ---- 1. Belgi <-> raqam ----\nprint(ord(\"a\"), ord(\"A\"), ord(\"0\"), ord(\" \"))\nprint(chr(115), chr(97), chr(108))\n\n# ---- 2. Butun soʻz ----\nfor harf in \"salom\":\n    print(harf, \"->\", ord(harf))\n\n# ---- 3. Oʻzbekcha va boshqa belgilar ----\nnamunalar = [\"a\", \"ʻ\", \"ў\", \"😀\"]\nfor b in namunalar:\n    print(f\"{b!r:6s} -> {ord(b):8d}  U+{ord(b):04X}\")\n\n# ---- 4. Toʻrtta apostrof ----\nbelgilar = [\"'\", \"\\u2018\", \"\\u2019\", \"\\u02bb\"]\nfor b in belgilar:\n    print(repr(b), \"->\", ord(b))\n\n# ---- 5. kodla / dekodla ----\ndef kodla(matn):\n    raqamlar = []\n    for harf in matn:\n        raqamlar.append(ord(harf))\n    return raqamlar\n\n\ndef dekodla(raqamlar):\n    matn = \"\"\n    for raqam in raqamlar:\n        matn += chr(raqam)\n    return matn\n\n\n# ---- 6. Sinov ----\nmatn = \"koʻraman\"\nprint(kodla(matn))\nprint(dekodla(kodla(matn)))\nprint(\"round-trip:\", dekodla(kodla(matn)) == matn)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "97 65 48 32\ns a l\ns -> 115\na -> 97\nl -> 108\no -> 111\nm -> 109\n'a'    ->       97  U+0061\n'ʻ'    ->      699  U+02BB\n'ў'    ->     1118  U+045E\n'😀'    ->   128512  U+1F600\n\"'\" -> 39\n'‘' -> 8216\n'’' -> 8217\n'ʻ' -> 699\n[107, 111, 699, 114, 97, 109, 97, 110]\nkoʻraman\nround-trip: True",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "11-ozingiz-yozing",
          "title": "11. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "# 1. Oʻz ismingizni raqamlarga aylantiring\nism = \"___\"\nprint(kodla(___))\n\n# 2. Bu raqamlar qaysi soʻz? Qoʻlda taxmin qiling, keyin tekshiring\nraqamlar = [111, 699, 122, 98, 101, 107]\nprint(dekodla(___))\n\n# 3. \"gʻ\" ikkita belgi ekanini raqamlar bilan isbotlang\nfor harf in \"gʻ\":\n    print(harf, \"->\", ___(harf))\n\n# 4. chr() bilan \"AI\" soʻzini yasang (ord ishlatmasdan)\nprint(chr(___) + chr(___))",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "# 1.\nism = \"Islombek\"\nprint(kodla(ism))\n# [73, 115, 108, 111, 109, 98, 101, 107]\n\n# 2.\nraqamlar = [111, 699, 122, 98, 101, 107]\nprint(dekodla(raqamlar))\n# oʻzbek\n\n# 3.\nfor harf in \"gʻ\":\n    print(harf, \"->\", ord(harf))\n# g -> 103\n# ʻ -> 699\n\n# 4.\nprint(chr(65) + chr(73))\n# AI",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "text",
                  "text": "2-topshiriqda `699` ni ko'rganingizda darhol bilishingiz kerak edi: bu `ʻ`, demak so'zda `oʻ` yoki `gʻ` bor. Birinchi raqam 111 (`o`) — demak `oʻ`."
                },
                {
                  "kind": "text",
                  "text": "4-topshiriqda: `A` = 65 (katta harflar 65 dan boshlanadi), `I` = 65 + 8 = 73, chunki `I` alifboda 9-harf."
                }
              ]
            }
          ]
        },
        {
          "id": "12-mashqlar",
          "title": "12. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`ord(\"A\")` = 65. `ord(\"C\")` nima bo'ladi? Ishga tushirmasdan ayting."
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "**67.**"
                  },
                  {
                    "kind": "text",
                    "text": "Harflar ketma-ket: `A`=65, `B`=66, `C`=67."
                  },
                  {
                    "kind": "text",
                    "text": "Umumiy qoida: `ord(\"A\") + n` — alifboning `n+1`-harfi. `ord(\"A\") + 25` = 90 = `Z`."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu kod nima chiqaradi?"
                },
                {
                  "kind": "code",
                  "code": "print(chr(ord(\"a\") + 1))\nprint(chr(ord(\"z\") - 25))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "b\na"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`ord(\"a\")` = 97, `+1` = 98, `chr(98)` = `b`",
                      "`ord(\"z\")` = 122, `−25` = 97, `chr(97)` = `a`"
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Raqam bilan ishlab, keyin belgiga qaytish — bu **shifrlash** algoritmlarining asosi. Sezar shifri aynan shunday ishlaydi: har bir harfga bir xil son qo'shiladi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Nima uchun bu `False` qaytaradi?"
                },
                {
                  "kind": "code",
                  "code": "print(\"olma\" == \"Olma\")",
                  "lang": "python",
                  "mode": "type"
                },
                {
                  "kind": "text",
                  "text": "Raqamlar bilan tushuntiring."
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(ord(\"o\"), ord(\"O\"))\n# 111 79",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "`o` = 111, `O` = 79. **Ikki xil raqam, demak ikki xil belgi.**"
                  },
                  {
                    "kind": "text",
                    "text": "Kompyuter uchun `\"olma\"` = `[111, 108, 109, 97]`, `\"Olma\"` = `[79, 108, 109, 97]`. Birinchi raqamlar har xil, shuning uchun matnlar teng emas."
                  },
                  {
                    "kind": "text",
                    "text": "Shuning uchun Dars 02 da `.lower()` ishlatgan edik: tokenizator `Men` va `men` ni bitta so'z deb bilishi uchun."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu ikkisi nima uchun har xil?"
                },
                {
                  "kind": "code",
                  "code": "print(5 + 5)\nprint(chr(53) + chr(53))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "10\n55"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`5 + 5` — **sonlar** qo'shildi → 10",
                      "`chr(53)` = `\"5\"` — bu **belgi**. `\"5\" + \"5\"` = `\"55\"` (matnlar ulandi)"
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "53 — bu `\"5\"` belgisining Unicode raqami, `5` sonining o'zi emas."
                  },
                  {
                    "kind": "text",
                    "text": "Bu farq keyinchalik juda muhim bo'ladi: tokenlar **raqam** bo'ladi, lekin ular son sifatida emas, **nomer** sifatida ishlatiladi. 1523-token va 88-tokenni qo'shish ma'nosiz — xuddi uy raqamlarini qo'shgandek."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu uch matnning uzunligi ham, ko'rinishi ham bir xil. Har birini `kodla` dan o'tkazing va farqni toping."
                },
                {
                  "kind": "code",
                  "code": "a = \"oʻqish\"\nb = \"o'qish\"\nc = \"o‘qish\"",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(kodla(a))\nprint(kodla(b))\nprint(kodla(c))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "[111, 699, 113, 105, 115, 104]\n[111, 39, 113, 105, 115, 104]\n[111, 8216, 113, 105, 115, 104]"
                  },
                  {
                    "kind": "text",
                    "text": "Uchalasida ham **faqat ikkinchi raqam** farq qiladi: **699**, **39**, **8216**."
                  },
                  {
                    "kind": "text",
                    "text": "Qolgan hamma narsa bir xil. Bitta raqam — va tokenizator uchun bu uch xil so'z."
                  },
                  {
                    "kind": "text",
                    "text": "**Nima uchun bu muammo:** buning haqiqiy raqamlari bor. 3 000 ta haqiqiy oʻzbekcha veb-hujjatda `oʻ` va `gʻ` dagi belgi shunday yozilgan:"
                  },
                  {
                    "kind": "table",
                    "head": [
                      "Belgi",
                      "Raqami",
                      "Ulushi"
                    ],
                    "rows": [
                      [
                        "`‘`",
                        "8216",
                        "**34%**"
                      ],
                      [
                        "`ʻ` — toʻgʻri",
                        "699",
                        "23%"
                      ],
                      [
                        "`'`",
                        "39",
                        "19%"
                      ],
                      [
                        "`’`",
                        "8217",
                        "18%"
                      ],
                      [
                        "`` ` ``",
                        "96",
                        "6%"
                      ]
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Toʻgʻri belgi — atigi **23%**. Eng koʻp ishlatiladigani esa umuman boshqa belgi."
                  },
                  {
                    "kind": "text",
                    "text": "Normalizatsiyasiz tokenizator `oʻ` haqidagi bilimini besh xil variantga boʻlib oʻrganadi, va toʻgʻri yozilgani uchun maʼlumotning faqat toʻrtdan biri qoladi. Normalizatsiyadan keyin beshalasi **bitta** boʻladi va hamma maʼlumot bir joyga yigʻiladi."
                  },
                  {
                    "kind": "text",
                    "text": "Bu amalda qanchalik farq qiladi — Dars 14 da raqam bilan oʻlchaymiz."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "13-xulosa",
          "title": "13. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "Kompyuterda **faqat raqam** bor. Har bir belgi — kelishilgan raqam.",
                "`ord(belgi)` → raqam. `chr(raqam)` → belgi. Bir-birining teskarisi.",
                "**ASCII** (1963) — 128 ta belgi, faqat ingliz tili uchun. `a` = 97 shundan.",
                "**Unicode** — dunyo uchun bitta jadval, 1 114 112 ta joy. Birinchi 128 tasi ASCII bilan bir xil.",
                "`U+02BB` va `699` — bir xil raqam, ikki xil yozuv (o'n oltilik va o'nlik).",
                "`oʻ` = `o` (111) + `ʻ` (699). Unicode'da yagona `oʻ` belgisi **yo'q**.",
                "To'rtta apostrof: 39, 8216, 8217, **699**. Faqat oxirgisi to'g'ri.",
                "`\"5\"` (53) va `5` — butunlay boshqa narsa."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda raqamlar bor. Lekin raqamlar xotiraga qanday yoziladi?"
            },
            {
              "kind": "text",
              "text": "**Dars 06 — Baytlar.** Bitta bayt 0 dan 255 gacha raqamni saqlaydi. `699` esa sig'maydi. Nima qilish kerak?"
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *`koʻraman` da 8 ta belgi bor. Nima uchun kompyuter xotirasida **9 ta** joy band bo'ladi?* Javob — tokenizatorning butun poydevori."
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–04. Tsikl, lug'at, funksiya, `return`"
    },
    {
      "id": "dars-06",
      "n": 6,
      "title": "Baytlar",
      "subtitle": "",
      "minutes": 50,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**bilasiz** bayt nima ekanini va nima uchun u faqat 0 dan 255 gacha raqamni saqlashini;",
                "**aylantirasiz** istalgan matnni baytlarga va baytlarni matnga qaytarasiz;",
                "**tushuntirasiz** nima uchun `koʻraman` da 8 belgi, lekin **9 bayt** borligini;",
                "**ko'rasiz** UTF-8 qoidasini ichidan — bitlar darajasida;",
                "**tushunasiz** nima uchun **256** — tokenizatorimizning boshlang'ich lug'at hajmi."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 05 oxirida savol qoldirgan edim. Tekshiramiz:"
            },
            {
              "kind": "code",
              "code": "matn = \"koʻraman\"\nprint(\"belgilar:\", len(matn))\nprint(\"baytlar :\", len(matn.encode(\"utf-8\")))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "belgilar: 8\nbaytlar : 9"
            },
            {
              "kind": "text",
              "text": "**8 ta belgi. 9 ta bayt.** Bittasi ortiqcha."
            },
            {
              "kind": "text",
              "text": "Dars 02 da bilib olgan edingiz: ko'z 7 harf ko'radi, kompyuter 8 belgi ko'radi. Endi uchinchi raqam qo'shildi: **xotira 9 joy band qiladi.**"
            },
            {
              "kind": "text",
              "text": "Uchta har xil raqam, bitta so'z uchun. Bu darsda uchalasi ham tushuntiriladi."
            }
          ]
        },
        {
          "id": "2-bayt-nima",
          "title": "2. Bayt nima?",
          "blocks": [
            {
              "kind": "text",
              "text": "Kompyuter xotirasi bir xil o'lchamdagi kataklardan iborat. Har bir katakning nomi — **bayt** (byte)."
            },
            {
              "kind": "text",
              "text": "Bitta bayt **8 ta bit** dan iborat. Bit — bu eng kichik birlik, u faqat `0` yoki `1` bo'ladi."
            },
            {
              "kind": "text",
              "text": "8 ta bit bilan nechta har xil kombinatsiya yasash mumkin?"
            },
            {
              "kind": "pre",
              "text": "2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 2⁸ = 256"
            },
            {
              "kind": "text",
              "text": "Shuning uchun:"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Bitta bayt 0 dan 255 gacha raqamni saqlaydi. Boshqa hech qanday raqamni.**"
            },
            {
              "kind": "text",
              "text": "`256` emas. `−1` emas. `3.5` emas. Faqat 0–255, jami 256 ta variant."
            },
            {
              "kind": "text",
              "text": "Ko'rish uchun:"
            },
            {
              "kind": "code",
              "code": "print(format(97, \"08b\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "01100001"
            },
            {
              "kind": "text",
              "text": "`format(son, \"08b\")` — sonni **ikkilik** (binary) ko'rinishda, 8 ta xonada chiqaradi. `97` = `01100001`. Sakkizta bit, bitta bayt."
            },
            {
              "kind": "h3",
              "id": "va-endi-muammo",
              "text": "Va endi muammo"
            },
            {
              "kind": "text",
              "text": "Dars 05 dan eslang:"
            },
            {
              "kind": "table",
              "head": [
                "Belgi",
                "Unicode raqami",
                "Baytga sig'adimi?"
              ],
              "rows": [
                [
                  "`a`",
                  "97",
                  "✓ ha"
                ],
                [
                  "`z`",
                  "122",
                  "✓ ha"
                ],
                [
                  "`ʻ`",
                  "**699**",
                  "✗ **yo'q**"
                ],
                [
                  "`ў`",
                  "1118",
                  "✗ yo'q"
                ],
                [
                  "`😀`",
                  "128512",
                  "✗ yo'q"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "699 > 255. Sig'maydi."
            },
            {
              "kind": "media",
              "id": "h1",
              "title": "255 chegarasi"
            },
            {
              "kind": "text",
              "text": "Demak kerak: **katta raqamni bir nechta baytga bo'lish qoidasi**. Va bu qoida shunday bo'lishi kerakki, keyin uni **qayta yig'ib** olish mumkin bo'lsin."
            },
            {
              "kind": "text",
              "text": "Bu qoidaning nomi — **UTF-8**."
            }
          ]
        },
        {
          "id": "3-encode-matndan-baytga",
          "title": "3. `.encode()` — matndan baytga",
          "blocks": [
            {
              "kind": "code",
              "code": "matn = \"koʻraman\"\nprint(matn.encode(\"utf-8\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "b'ko\\xca\\xbbraman'"
            },
            {
              "kind": "text",
              "text": "G'alati ko'rinadi. Tushuntiraman:"
            },
            {
              "kind": "bullets",
              "items": [
                "`b'...'` — boshidagi `b` harfi \"bu matn emas, **baytlar**\" degani.",
                "`ko`, `raman` — bu baytlar ASCII zonasida bo'lgani uchun Python ularni o'qiladigan harf sifatida ko'rsatadi (qulaylik uchun).",
                "`\\xca\\xbb` — bu **ikkita bayt**, o'n oltilikda yozilgan (Dars 05 dagi hex). `ca` = 202, `bb` = 187."
              ]
            },
            {
              "kind": "text",
              "text": "Raqamlarni toza ko'rish uchun ro'yxatga aylantiramiz:"
            },
            {
              "kind": "code",
              "code": "print(list(matn.encode(\"utf-8\")))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[107, 111, 202, 187, 114, 97, 109, 97, 110]"
            },
            {
              "kind": "text",
              "text": "**Mana o'sha 9 ta raqam.** Hammasi 0–255 oralig'ida. Hammasi baytga sig'adi."
            },
            {
              "kind": "text",
              "text": "Sanang: 9 ta. ✓"
            }
          ]
        },
        {
          "id": "4-ascii-belgilar-hech-narsa-ozgarmaydi",
          "title": "4. ASCII belgilar — hech narsa o'zgarmaydi",
          "blocks": [
            {
              "kind": "text",
              "text": "Diqqat qiling, bu juda muhim:"
            },
            {
              "kind": "code",
              "code": "soz = \"salom\"\n\nord_raqamlar = []\nfor harf in soz:\n    ord_raqamlar.append(ord(harf))\n\nprint(\"ord bilan  :\", ord_raqamlar)\nprint(\"bayt bilan :\", list(soz.encode(\"utf-8\")))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "ord bilan  : [115, 97, 108, 111, 109]\nbayt bilan : [115, 97, 108, 111, 109]"
            },
            {
              "kind": "text",
              "text": "**Aynan bir xil.**"
            },
            {
              "kind": "text",
              "text": "Kod raqami 0–127 oralig'idagi har bir belgi uchun UTF-8 **hech narsa qilmaydi** — bitta bayt, va bayt qiymati kod raqamining o'zi."
            },
            {
              "kind": "text",
              "text": "Bu tasodif emas, bu **ataylab** shunday qilingan. UTF-8 ASCII bilan orqaga mos (backwards compatible): 1990-yillarda yozilgan eski ingliz matnlari hech qanday o'zgarishsiz ishlashda davom etdi. Aynan shu sabab UTF-8 g'alaba qozondi va bugun internetning 98% dan ortig'i shu kodlashda."
            },
            {
              "kind": "text",
              "text": "**Lekin narxi bor.** Ingliz tili bepul o'tadi. Qolgan hamma til to'laydi."
            }
          ]
        },
        {
          "id": "5-utf-8-qoidasi",
          "title": "5. UTF-8 qoidasi",
          "blocks": [
            {
              "kind": "code",
              "code": "for belgi in [\"a\", \"ʻ\", \"ў\", \"漢\", \"😀\"]:\n    b = belgi.encode(\"utf-8\")\n    print(f\"{belgi!r:6s} ord={ord(belgi):7d}  baytlar={len(b)}  {list(b)}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'a'    ord=     97  baytlar=1  [97]\n'ʻ'    ord=    699  baytlar=2  [202, 187]\n'ў'    ord=   1118  baytlar=2  [209, 158]\n'漢'    ord=  28450  baytlar=3  [230, 188, 162]\n'😀'    ord= 128512  baytlar=4  [240, 159, 152, 128]"
            },
            {
              "kind": "text",
              "text": "Naqsh ko'rinib turibdi — **raqam qancha katta bo'lsa, shuncha ko'p bayt kerak**:"
            },
            {
              "kind": "table",
              "head": [
                "Kod raqami",
                "Baytlar soni",
                "Qaysi belgilar"
              ],
              "rows": [
                [
                  "0 – 127",
                  "**1**",
                  "ingliz harflari, raqamlar, tinish belgilari"
                ],
                [
                  "128 – 2047",
                  "**2**",
                  "`ʻ`, kirill, yunon, arab"
                ],
                [
                  "2048 – 65535",
                  "**3**",
                  "xitoy, yapon, koreys, hind"
                ],
                [
                  "65536 – 1114111",
                  "**4**",
                  "emoji, qadimgi yozuvlar"
                ]
              ]
            },
            {
              "kind": "media",
              "id": "h2",
              "title": "UTF-8 narvoni"
            },
            {
              "kind": "h3",
              "id": "ichidan-qarash-bitlar",
              "text": "Ichidan qarash — bitlar"
            },
            {
              "kind": "text",
              "text": "`ʻ` nima uchun aynan `202` va `187` ekanini ko'ramiz. Bu bo'limni tushunmasangiz ham dars davom etadi, lekin tushunsangiz — UTF-8 sizga sehr bo'lib qolmaydi."
            },
            {
              "kind": "text",
              "text": "699 ni ikkilik ko'rinishda yozamiz, 11 xonada:"
            },
            {
              "kind": "code",
              "code": "print(format(699, \"011b\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "01010111011"
            },
            {
              "kind": "text",
              "text": "UTF-8 ning ikki baytlik shakli quyidagicha tuzilgan:"
            },
            {
              "kind": "pre",
              "text": "1-bayt:  1 1 0 x x x x x\n2-bayt:  1 0 x x x x x x"
            },
            {
              "kind": "bullets",
              "items": [
                "`110` — **belgi boshlanadi va u 2 baytdan iborat** degan signal",
                "`10` — **bu davomiy bayt, o'zi boshlanish emas** degan signal",
                "`x` lar — haqiqiy ma'lumot uchun joy: 5 + 6 = **11 ta bit**"
              ]
            },
            {
              "kind": "text",
              "text": "699 ning 11 ta bitini shu joylarga taqsimlaymiz:"
            },
            {
              "kind": "pre",
              "text": "01010111011\n↓↓↓↓↓ ↓↓↓↓↓↓\n01010  111011\n\n1-bayt:  110 + 01010  =  11001010  =  202  ✓\n2-bayt:   10 + 111011  =  10111011  =  187  ✓"
            },
            {
              "kind": "text",
              "text": "**Mana shuning uchun 202 va 187.**"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**UTF-8 ning eng aqlli jihati:** davomiy bayt har doim `10` bilan boshlanadi. Demak matnning **istalgan joyiga** tushib qolsangiz ham, belgining boshini topa olasiz — orqaga yurib, `10` bilan boshlanmaydigan birinchi baytni topsangiz bas. Bu xususiyat UTF-8 ni buzilgan fayllarda ham ishlaydigan qiladi."
            }
          ]
        },
        {
          "id": "6-decode-baytdan-matnga",
          "title": "6. `.decode()` — baytdan matnga",
          "blocks": [
            {
              "kind": "text",
              "text": "Teskari yo'l:"
            },
            {
              "kind": "code",
              "code": "baytlar = \"koʻraman\".encode(\"utf-8\")\nprint(baytlar.decode(\"utf-8\"))\nprint(\"round-trip:\", baytlar.decode(\"utf-8\") == \"koʻraman\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "koʻraman\nround-trip: True"
            },
            {
              "kind": "text",
              "text": "Raqamlar ro'yxatidan boshlash uchun avval ularni bayt qilib yig'ish kerak:"
            },
            {
              "kind": "code",
              "code": "print(bytes([115, 97, 108, 111, 109]).decode(\"utf-8\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "salom"
            },
            {
              "kind": "text",
              "text": "`bytes([...])` — raqamlar ro'yxatidan bayt obyektini yasaydi. Har bir raqam **0–255 oralig'ida bo'lishi shart**, aks holda xato chiqadi."
            },
            {
              "kind": "h3",
              "id": "ataylab-xato-buzilgan-baytlar",
              "text": "Ataylab xato: buzilgan baytlar"
            },
            {
              "kind": "text",
              "text": "Har qanday raqamlar to'plami to'g'ri UTF-8 bo'lavermaydi:"
            },
            {
              "kind": "code",
              "code": "bytes([200, 100]).decode(\"utf-8\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "UnicodeDecodeError: 'utf-8' codec can't decode byte 0xc8 in position 0: invalid continuation byte",
              "error": true
            },
            {
              "kind": "text",
              "text": "`200` = `11001000` — bu `110` bilan boshlanadi, ya'ni \"men 2 baytlik belgining boshiman\" deb da'vo qilyapti. Lekin keyingi bayt `100` = `01100100`, u `10` bilan boshlanmaydi. Qoida buzildi."
            },
            {
              "kind": "text",
              "text": "`invalid continuation byte` — \"noto'g'ri davomiy bayt\". Endi bu xabar sizga tushunarli."
            },
            {
              "kind": "text",
              "text": "**Bu xato Dars 11 da yana qaytadi**, va o'sha yerda uni qanday hal qilishni ko'ramiz — chunki tokenizator ba'zan haqiqatan to'liq bo'lmagan baytlarni dekodlashga urinadi."
            }
          ]
        },
        {
          "id": "7-koraman-toliq-javob",
          "title": "7. `koʻraman` — to'liq javob",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi 1-bo'limdagi savolga to'liq javob bera olamiz:"
            },
            {
              "kind": "code",
              "code": "for h in \"koʻraman\":\n    b = h.encode(\"utf-8\")\n    print(f\"  {h!r:5s} ord={ord(h):5d}  {len(b)} bayt  {list(b)}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  'k'   ord=  107  1 bayt  [107]\n  'o'   ord=  111  1 bayt  [111]\n  'ʻ'   ord=  699  2 bayt  [202, 187]\n  'r'   ord=  114  1 bayt  [114]\n  'a'   ord=   97  1 bayt  [97]\n  'm'   ord=  109  1 bayt  [109]\n  'a'   ord=   97  1 bayt  [97]\n  'n'   ord=  110  1 bayt  [110]"
            },
            {
              "kind": "text",
              "text": "Sanang: 7 ta belgi 1 baytdan, 1 ta belgi 2 baytdan. **7 + 2 = 9.**"
            },
            {
              "kind": "text",
              "text": "Uchta raqam, uchta sabab:"
            },
            {
              "kind": "table",
              "head": [
                "Raqam",
                "Nima",
                "Sabab"
              ],
              "rows": [
                [
                  "**7**",
                  "ko'z ko'rgan harflar",
                  "`oʻ` — o'zbek tilida bitta harf"
                ],
                [
                  "**8**",
                  "Unicode belgilari",
                  "Unicode'da yagona `oʻ` belgisi yo'q (Dars 05)"
                ],
                [
                  "**9**",
                  "baytlar",
                  "`ʻ` (699) bitta baytga sig'maydi (shu dars)"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Endi bu so'zning har bir darajasini tushuntira olasiz."
            },
            {
              "kind": "media",
              "id": "h3",
              "title": "Uch qatlam"
            }
          ]
        },
        {
          "id": "8-narxni-olchaymiz",
          "title": "8. Narxni o'lchaymiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 01 dagi ikki jumlaga qaytamiz:"
            },
            {
              "kind": "code",
              "code": "uzbekcha = \"Men oʻqishni yaxshi koʻraman\"\ninglizcha = \"I like reading\"\n\nfor nom, s in [(\"oʻzbekcha\", uzbekcha), (\"inglizcha\", inglizcha)]:\n    print(f\"{nom:10s} belgilar={len(s):3d}  baytlar={len(s.encode('utf-8')):3d}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "oʻzbekcha  belgilar= 28  baytlar= 30\ninglizcha  belgilar= 14  baytlar= 14"
            },
            {
              "kind": "text",
              "text": "Inglizcha: 14 belgi → 14 bayt. **Har bir belgi aynan 1 bayt.**\nO'zbekcha: 28 belgi → 30 bayt. **Ikkita qo'shimcha bayt** — `oʻ` va `koʻ` dagi ikkita `ʻ` uchun."
            },
            {
              "kind": "text",
              "text": "Ya'ni o'zbekcha matn **jismonan kattaroq**. Xotirada ko'proq joy, tarmoqda ko'proq trafik, faylda ko'proq hajm."
            },
            {
              "kind": "text",
              "text": "Bu farq bu yerda kichik (30 vs 14 — ikki barobar, lekin asosan matn uzunligi sababli). Kirill yoki xitoy yozuvida esa farq keskin: har bir belgi 2–3 bayt."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Dars 01 dagi adolatsizlik uchta qatlamdan iborat ekan:** 1. Unicode'da o'zbek harfi uchun alohida joy yo'q (Dars 05) 2. UTF-8 da u ortiqcha bayt turadi (shu dars) 3. Tokenizator uni bo'laklarga maydalaydi (Dars 01, va biz buni tuzatamiz) Biz uchinchi qatlamni tuzata olamiz. Birinchi ikkitasi — tarix, ular bilan yashashga to'g'ri keladi."
            }
          ]
        },
        {
          "id": "9-yangi-kodla-dekodla",
          "title": "9. Yangi `kodla` / `dekodla`",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 05 dagi funksiyalarimizni yangilaymiz. Endi ular `ord`/`chr` emas, baytlar bilan ishlaydi:"
            },
            {
              "kind": "code",
              "code": "def kodla(matn):\n    return list(matn.encode(\"utf-8\"))\n\n\ndef dekodla(raqamlar):\n    return bytes(raqamlar).decode(\"utf-8\")\n\n\nm = \"oʻzbek tili\"\nprint(kodla(m))\nprint(dekodla(kodla(m)))\nprint(\"round-trip:\", dekodla(kodla(m)) == m)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[111, 202, 187, 122, 98, 101, 107, 32, 116, 105, 108, 105]\noʻzbek tili\nround-trip: True"
            },
            {
              "kind": "text",
              "text": "Ikki qator funksiya. Ikkalasi ham bitta qatordan iborat, chunki og'ir ishni Python o'zi qiladi."
            },
            {
              "kind": "text",
              "text": "E'tibor bering: ro'yxatda `32` bor — bu bo'shliq (Dars 05: `ord(\" \")` = 32). Bo'shliq ham bayt, u ham hisobga olinadi."
            }
          ]
        },
        {
          "id": "10-nima-uchun-aynan-256-va-nima-uchun-bu-ajoyib",
          "title": "10. Nima uchun aynan 256 — va nima uchun bu ajoyib",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi asosiy xulosa. Baytlar bilan ishlaganimizda:"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Har qanday matn — 0 dan 255 gacha bo'lgan raqamlar ro'yxati. Har qanday til. Har qanday belgi. Istisnosiz.**"
            },
            {
              "kind": "text",
              "text": "Buning oqibatlarini o'ylang:"
            },
            {
              "kind": "text",
              "text": "**1. Lug'at hajmi aniq 256.** Unicode'dagi 1 114 112 emas. Faqat 256 ta boshlang'ich token — chunki bundan ko'p bayt qiymati **mavjud emas**."
            },
            {
              "kind": "text",
              "text": "**2. Notanish belgi bo'lishi mumkin emas.** Tokenizatorimiz hech qachon \"bu belgini bilmayman\" demaydi. Emoji, xitoy ieroglifi, hech kim ko'rmagan belgi — hammasi baytlarga bo'linadi, va bayt har doim tanish."
            },
            {
              "kind": "text",
              "text": "Bu juda muhim. Boshqa yondashuvlarda (so'z bo'yicha yoki belgi bo'yicha) `<UNK>` — \"notanish\" degan maxsus token bo'ladi, va model uni ko'rganda hech narsa qila olmaydi. **Bayt darajasida `<UNK>` umuman kerak emas.**"
            },
            {
              "kind": "text",
              "text": "**3. Bitta kod hamma til uchun ishlaydi.** Siz o'zbek tili uchun tokenizator yozyapsiz, lekin kodingizda hech qayerda \"o'zbek\" degan so'z bo'lmaydi. U tojik, qozoq yoki xitoy matnida ham xuddi shunday ishlaydi."
            },
            {
              "kind": "text",
              "text": "**Shuning uchun zamonaviy tokenizatorlar — GPT-4 ham, sizniki ham — baytlar ustida ishlaydi.** Bu \"byte-level BPE\" deb ataladi va Dars 08 dan boshlab aynan shuni quramiz."
            }
          ]
        },
        {
          "id": "11-muammo",
          "title": "11. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda ishlaydigan tokenizator bor: matn → baytlar → matn, round-trip to'g'ri, lug'at 256 ta token, notanish belgi yo'q."
            },
            {
              "kind": "text",
              "text": "**Lekin u dahshatli yomon.** Nima uchun — buni raqamda ko'ring:"
            },
            {
              "kind": "code",
              "code": "matn = \"bolalar kitoblarni oʻqishdi.\"\nprint(\"belgilar:\", len(matn), \"| baytlar:\", len(kodla(matn)))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "belgilar: 28 | baytlar: 29"
            },
            {
              "kind": "text",
              "text": "**29 ta token** — bitta qisqa jumla uchun."
            },
            {
              "kind": "text",
              "text": "Dars 01 dagi jadvalni eslang: yaxshi tokenizatorda `fertility` **1.749** edi, ya'ni har bir so'z uchun ~2 tokendan kam. Bu jumlada 3 ta so'z bor, demak yaxshi tokenizator ~5 token ishlatishi kerak."
            },
            {
              "kind": "text",
              "text": "Bizniki 29 ta ishlatyapti. **Besh barobardan ko'p.**"
            },
            {
              "kind": "text",
              "text": "Nima uchun bu yomon:"
            },
            {
              "kind": "bullets",
              "items": [
                "model har bir tokenni alohida ishlashi kerak — besh barobar sekin",
                "modelning xotirasi token bilan o'lchanadi — besh barobar kam matn sig'adi",
                "`bolalar` so'zi 7 ta alohida tokenga bo'linadi, model uni **so'z** sifatida umuman ko'rmaydi"
              ]
            },
            {
              "kind": "text",
              "text": "Keyingi darsda bu muammoni o'z ko'zingiz bilan, to'liq ko'rasiz. Keyin esa uni hal qiladigan algoritmni quramiz."
            }
          ]
        },
        {
          "id": "12-toliq-kod",
          "title": "12. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "# ---- 1. Belgilar va baytlar ----\nmatn = \"koʻraman\"\nprint(\"belgilar:\", len(matn))\nprint(\"baytlar :\", len(matn.encode(\"utf-8\")))\nprint(list(matn.encode(\"utf-8\")))\n\n# ---- 2. ASCII hech narsa oʻzgartirmaydi ----\nsoz = \"salom\"\nord_raqamlar = []\nfor harf in soz:\n    ord_raqamlar.append(ord(harf))\nprint(ord_raqamlar)\nprint(list(soz.encode(\"utf-8\")))\n\n# ---- 3. UTF-8 qoidasi ----\nfor belgi in [\"a\", \"ʻ\", \"ў\", \"漢\", \"😀\"]:\n    b = belgi.encode(\"utf-8\")\n    print(f\"{belgi!r:6s} ord={ord(belgi):7d}  baytlar={len(b)}  {list(b)}\")\n\n# ---- 4. Bitlar ----\nprint(format(699, \"011b\"))\nprint(format(202, \"08b\"), format(187, \"08b\"))\n\n# ---- 5. koʻraman jadvali ----\nfor h in \"koʻraman\":\n    b = h.encode(\"utf-8\")\n    print(f\"{h!r:5s} ord={ord(h):5d}  {len(b)} bayt  {list(b)}\")\n\n# ---- 6. kodla / dekodla ----\ndef kodla(matn):\n    return list(matn.encode(\"utf-8\"))\n\n\ndef dekodla(raqamlar):\n    return bytes(raqamlar).decode(\"utf-8\")\n\n\nm = \"oʻzbek tili\"\nprint(kodla(m))\nprint(dekodla(kodla(m)))\nprint(\"round-trip:\", dekodla(kodla(m)) == m)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "belgilar: 8\nbaytlar : 9\n[107, 111, 202, 187, 114, 97, 109, 97, 110]\n[115, 97, 108, 111, 109]\n[115, 97, 108, 111, 109]\n'a'    ord=     97  baytlar=1  [97]\n'ʻ'    ord=    699  baytlar=2  [202, 187]\n'ў'    ord=   1118  baytlar=2  [209, 158]\n'漢'    ord=  28450  baytlar=3  [230, 188, 162]\n'😀'    ord= 128512  baytlar=4  [240, 159, 152, 128]\n01010111011\n11001010 10111011\n'k'   ord=  107  1 bayt  [107]\n'o'   ord=  111  1 bayt  [111]\n'ʻ'   ord=  699  2 bayt  [202, 187]\n'r'   ord=  114  1 bayt  [114]\n'a'   ord=   97  1 bayt  [97]\n'm'   ord=  109  1 bayt  [109]\n'a'   ord=   97  1 bayt  [97]\n'n'   ord=  110  1 bayt  [110]\n[111, 202, 187, 122, 98, 101, 107, 32, 116, 105, 108, 105]\noʻzbek tili\nround-trip: True",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "13-ozingiz-yozing",
          "title": "13. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "# 1. Oʻz ismingiz necha belgi va necha bayt?\nism = \"___\"\nprint(\"belgilar:\", len(___))\nprint(\"baytlar :\", len(ism.___(\"utf-8\")))\n\n# 2. \"gʻalaba\" soʻzining baytlarini chiqaring. Nechta boʻlishini oldin ayting\nsoz = \"gʻalaba\"\nprint(___(soz.encode(\"utf-8\")))\n\n# 3. Bu baytlar qaysi soʻz?\nbaytlar = [111, 202, 187, 122, 98, 101, 107]\nprint(___(baytlar).decode(\"utf-8\"))\n\n# 4. Har bir belgi necha bayt ekanini chiqaring\nfor harf in \"bogʻ\":\n    print(harf, \"->\", len(harf.encode(\"utf-8\")))",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "# 1.\nism = \"Islombek\"\nprint(\"belgilar:\", len(ism))      # 8\nprint(\"baytlar :\", len(ism.encode(\"utf-8\")))   # 8\n\n# 2.\nsoz = \"gʻalaba\"\nprint(list(soz.encode(\"utf-8\")))\n# [103, 202, 187, 97, 108, 97, 98, 97]\n\n# 3.\nbaytlar = [111, 202, 187, 122, 98, 101, 107]\nprint(bytes(baytlar).decode(\"utf-8\"))\n# oʻzbek\n\n# 4.\nfor harf in \"bogʻ\":\n    print(harf, \"->\", len(harf.encode(\"utf-8\")))\n# b -> 1\n# o -> 1\n# g -> 1\n# ʻ -> 2",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "text",
                  "text": "1-topshiriqda `Islombek` uchun belgilar va baytlar **teng** — chunki hamma harf ASCII zonasida."
                },
                {
                  "kind": "text",
                  "text": "2-topshiriqda: `gʻalaba` 7 belgi, lekin **8 bayt** — `ʻ` ikkita bayt olgani uchun. Va `202, 187` juftligini ko'rganingizda darhol bilishingiz kerak: bu `ʻ`."
                }
              ]
            }
          ]
        },
        {
          "id": "14-mashqlar",
          "title": "14. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Quyidagi so'zlarning har biri necha belgi va necha bayt? Avval qo'lda hisoblang."
                },
                {
                  "kind": "pre",
                  "text": "\"maktab\"      \"bogʻ\"      \"oʻquvchi\""
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "table",
                    "head": [
                      "So'z",
                      "Belgilar",
                      "Baytlar",
                      "Sabab"
                    ],
                    "rows": [
                      [
                        "`maktab`",
                        "6",
                        "6",
                        "hammasi ASCII"
                      ],
                      [
                        "`bogʻ`",
                        "4",
                        "5",
                        "bitta `ʻ`"
                      ],
                      [
                        "`oʻquvchi`",
                        "8",
                        "9",
                        "bitta `ʻ`"
                      ]
                    ]
                  },
                  {
                    "kind": "code",
                    "code": "for s in [\"maktab\", \"bogʻ\", \"oʻquvchi\"]:\n    print(s, len(s), len(s.encode(\"utf-8\")))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "**Qoida:** baytlar soni = belgilar soni + `ʻ` va `gʻ` dagi `ʻ` lar soni. O'zbek lotin matnida bu farq odatda 5–8% atrofida bo'ladi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu ikki raqam nima uchun bir xil?"
                },
                {
                  "kind": "code",
                  "code": "print(ord(\"A\"))\nprint(list(\"A\".encode(\"utf-8\")))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "65\n[65]"
                  },
                  {
                    "kind": "text",
                    "text": "Chunki `A` ning kod raqami 65, va u 0–127 oralig'ida. UTF-8 bunday belgilar uchun **hech narsa qilmaydi** — bitta bayt, qiymat kod raqamining o'zi."
                  },
                  {
                    "kind": "text",
                    "text": "`ord()` va `.encode()` faqat ASCII zonasida bir xil natija beradi. 127 dan yuqorida ular butunlay farq qiladi:"
                  },
                  {
                    "kind": "code",
                    "code": "print(ord(\"ʻ\"))                      # 699\nprint(list(\"ʻ\".encode(\"utf-8\")))     # [202, 187]",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Bitta raqam 699 emas — **ikkita raqam**, 202 va 187. Ikkalasi ham 699 emas."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Nima uchun bu xato beradi?"
                },
                {
                  "kind": "code",
                  "code": "print(bytes([699]))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "ValueError: bytes must be in range(0, 256)",
                    "error": true
                  },
                  {
                    "kind": "text",
                    "text": "`bytes()` faqat 0–255 oralig'idagi raqamlarni qabul qiladi, chunki **bayt shundan boshqasini saqlay olmaydi**."
                  },
                  {
                    "kind": "text",
                    "text": "699 ni saqlash uchun uni avval UTF-8 qoidasi bo'yicha ikkita baytga bo'lish kerak:"
                  },
                  {
                    "kind": "code",
                    "code": "print(bytes([202, 187]).decode(\"utf-8\"))    # ʻ",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Bu mashq butun darsning mag'zi: **bayt — qattiq chegara.** 0 dan 255 gacha, va bu chegarani hech kim kengaytira olmaydi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`\"😀\"` bitta belgi. `kodla(\"😀\")` nechta raqam qaytaradi? Va `len(\"😀\")` nima?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(len(\"😀\"))                 # 1\nprint(kodla(\"😀\"))               # [240, 159, 152, 128]\nprint(len(kodla(\"😀\")))          # 4",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "**1 belgi, 4 bayt.**"
                  },
                  {
                    "kind": "text",
                    "text": "Emoji kod raqami 128512 — juda katta, shuning uchun UTF-8 unga to'rtta bayt ajratadi."
                  },
                  {
                    "kind": "text",
                    "text": "Buning amaliy oqibati bor: agar tokenizator baytlar ustida ishlasa, bitta emoji **4 ta token** turadi. Shuning uchun emoji ko'p bo'lgan matn qimmat."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu uch matnni `kodla` dan o'tkazing:"
                },
                {
                  "kind": "code",
                  "code": "a = \"oʻzbek\"\nb = \"o'zbek\"\nc = \"ozbek\"",
                  "lang": "python",
                  "mode": "type"
                },
                {
                  "kind": "text",
                  "text": "Har birida nechta bayt bor? Va nima uchun tokenizator uchun bu muhim?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(kodla(\"oʻzbek\"), len(kodla(\"oʻzbek\")))\nprint(kodla(\"o'zbek\"), len(kodla(\"o'zbek\")))\nprint(kodla(\"ozbek\"),  len(kodla(\"ozbek\")))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "[111, 202, 187, 122, 98, 101, 107] 7\n[111, 39, 122, 98, 101, 107] 6\n[111, 122, 98, 101, 107] 5"
                  },
                  {
                    "kind": "text",
                    "text": "**7, 6, 5 bayt.** Bir xil so'z, uch xil uzunlik."
                  },
                  {
                    "kind": "text",
                    "text": "To'g'ri yozilgani (`ʻ` = 202 187) **eng uzun**. Ya'ni to'g'ri yozish qimmatroq turadi."
                  },
                  {
                    "kind": "text",
                    "text": "**Tokenizator uchun nima uchun muhim:**"
                  },
                  {
                    "kind": "text",
                    "text": "Uchala variant **butunlay boshqa bayt ketma-ketligi**. Ular orasida hech qanday umumiylik yo'q — `[202, 187]`, `[39]` va hech narsa. BPE algoritmi ularni uch xil so'z deb o'rganadi, va uchalasi uchun alohida token yasaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Lug'at hajmi cheklangan (16 384). Har bir isrof qilingan token — foydali token uchun yo'qolgan joy."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 14 da normalizatsiya yozganingizda, siz aslida **lug'at joyini tejayapsiz**. Ikki qator kod, lekin ta'siri butun tokenizatorga tarqaladi."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "15-xulosa",
          "title": "15. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "**Bayt** = 8 bit = 0 dan 255 gacha raqam. Qattiq chegara, kengaytirib bo'lmaydi.",
                "`.encode(\"utf-8\")` — matndan baytga. `.decode(\"utf-8\")` — baytdan matnga.",
                "**UTF-8** katta kod raqamini bir nechta baytga bo'ladi: 1, 2, 3 yoki 4.",
                "ASCII belgilar (0–127) uchun UTF-8 hech narsa qilmaydi — bayt = kod raqami. Shuning uchun ingliz tili bepul, qolganlari to'laydi.",
                "`koʻraman` = 7 harf (ko'z) = 8 belgi (Unicode) = **9 bayt** (xotira).",
                "Har qanday matn — 0–255 raqamlar ro'yxati. Demak lug'at hajmi **aniq 256**, va **notanish belgi bo'lishi mumkin emas**.",
                "Shuning uchun zamonaviy tokenizatorlar bayt darajasida ishlaydi."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda tokenizator bor: 256 ta token, hamma til uchun ishlaydi, hech qachon buzilmaydi."
            },
            {
              "kind": "text",
              "text": "**Dars 07 — Birinchi tokenizator va uning muammosi.** Uni haqiqiy o'zbek matnida sinab ko'ramiz va nima uchun bunday holda qoldirib bo'lmasligini aniq ko'ramiz."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *`bolalar` so'zi modelga nechta alohida bo'lak bo'lib ko'rinadi — va u bu so'zni umuman \"so'z\" deb bila oladimi?*"
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–05. `ord`, `chr`, funksiya, tsikl"
    },
    {
      "id": "dars-07",
      "n": 7,
      "title": "Birinchi tokenizator va uning muammosi",
      "subtitle": "",
      "minutes": 45,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**qurasiz** to'liq ishlaydigan tokenizatorni — 256 tokenli lug'at bilan;",
                "**o'lchaysiz** uning sifatini raqam bilan — `fertility`;",
                "**ko'rasiz** model `bolalar` so'zini qanday ko'rishini (va u so'z emasligini);",
                "**hisoblaysiz** bu tokenizator modelning xotirasidan qanchasini yeyishini;",
                "**aytib bera olasiz** yechimning g'oyasini bitta jumlada."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 06 oxirida ko'rgan edik: `bolalar kitoblarni oʻqishdi.` — 29 ta token."
            },
            {
              "kind": "text",
              "text": "Endi savol boshqacha:"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Model `bolalar` so'zini ko'rganda aslida nimani ko'radi?**"
            },
            {
              "kind": "code",
              "code": "soz = \"bolalar\"\nprint(kodla(soz))\nprint(\"tokenlar soni:\", len(kodla(soz)))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[98, 111, 108, 97, 108, 97, 114]\ntokenlar soni: 7"
            },
            {
              "kind": "text",
              "text": "**Yettita alohida raqam.**"
            },
            {
              "kind": "text",
              "text": "Siz `bolalar` ni bitta so'z deb ko'rasiz. Model esa yettita bir-biriga bog'liq bo'lmagan raqamni ko'radi. Ular orasida \"bu bitta so'z\" degan hech qanday belgi yo'q."
            },
            {
              "kind": "text",
              "text": "Bu darsda shu holatning narxini **raqamda** o'lchaymiz."
            }
          ]
        },
        {
          "id": "2-tokenizatorni-toliq-yigamiz",
          "title": "2. Tokenizatorni to'liq yig'amiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 06 dagi ikki funksiya allaqachon ishlaydi. Ularga **lug'at** qo'shamiz — har bir token raqami nimani anglatishini ko'rsatadigan jadval."
            },
            {
              "kind": "code",
              "code": "def kodla(matn):\n    return list(matn.encode(\"utf-8\"))\n\n\ndef dekodla(raqamlar):\n    return bytes(raqamlar).decode(\"utf-8\")\n\n\nvocab = {}\nfor i in range(256):\n    vocab[i] = bytes([i])\n\nprint(\"lugʻat hajmi:\", len(vocab))\nprint(\"vocab[98]  =\", vocab[98])\nprint(\"vocab[97]  =\", vocab[97])\nprint(\"vocab[202] =\", vocab[202])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "lugʻat hajmi: 256\nvocab[98]  = b'b'\nvocab[97]  = b'a'\nvocab[202] = b'\\xca'"
            },
            {
              "kind": "text",
              "text": "**Satr izohi:**"
            },
            {
              "kind": "bullets",
              "items": [
                "`vocab` — inglizcha *vocabulary*, \"lug'at\". Haqiqiy kodda shunday ataladi.",
                "`for i in range(256)` — 0 dan 255 gacha. Dars 06: baytda boshqa qiymat yo'q.",
                "`vocab[i] = bytes([i])` — har bir raqamga o'sha raqamdan iborat bitta baytni mos qo'yamiz.",
                "`vocab[202]` = `b'\\xca'` — bu **yarim belgi**. Yodda tuting: 202 o'zi hech narsa emas, u faqat 187 bilan birga `ʻ` ni yasaydi (Dars 06)."
              ]
            },
            {
              "kind": "text",
              "text": "**Mana, tokenizator tayyor.** Uchta narsa: `kodla`, `dekodla`, `vocab`. Ishlaydi, hamma tilda ishlaydi, hech qachon buzilmaydi."
            },
            {
              "kind": "text",
              "text": "Endi uning qanchalik yomon ekanini ko'ramiz."
            }
          ]
        },
        {
          "id": "3-model-nimani-koradi",
          "title": "3. Model nimani ko'radi",
          "blocks": [
            {
              "kind": "text",
              "text": "Har bir tokenni alohida ochamiz:"
            },
            {
              "kind": "code",
              "code": "for t in kodla(\"bolalar\"):\n    print(t, \"->\", repr(dekodla([t])))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "98 -> 'b'\n111 -> 'o'\n108 -> 'l'\n97 -> 'a'\n108 -> 'l'\n97 -> 'a'\n114 -> 'r'"
            },
            {
              "kind": "text",
              "text": "Model uchun `bolalar` — bu:"
            },
            {
              "kind": "pre",
              "text": "98  111  108  97  108  97  114"
            },
            {
              "kind": "text",
              "text": "**Bu raqamlar orasida hech qanday aloqa yo'q.** Model uchun 98 va 111 birga turishining sababi yo'q — xuddi shu ketma-ketlikda kelgan, xolos."
            },
            {
              "kind": "text",
              "text": "Solishtiring:"
            },
            {
              "kind": "code",
              "code": "print(\"bolalar  :\", kodla(\"bolalar\"))\nprint(\"bolalarni:\", kodla(\"bolalarni\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bolalar  : [98, 111, 108, 97, 108, 97, 114]\nbolalarni: [98, 111, 108, 97, 108, 97, 114, 110, 105]"
            },
            {
              "kind": "text",
              "text": "Model `bolalarni` ning `bolalar` bilan bog'liqligini bilishi uchun, u **yettita raqamning aynan shu tartibda kelishini** o'rganishi kerak. Har safar, har bir so'z uchun, noldan."
            },
            {
              "kind": "text",
              "text": "Odam esa `bolalar` ni bir marta o'rganadi va `bolalarni`, `bolalarga`, `bolalardan` ni darhol tanib oladi."
            },
            {
              "kind": "media",
              "id": "i1",
              "title": "Model nima koʻradi"
            }
          ]
        },
        {
          "id": "4-sifatni-olchaymiz-fertility",
          "title": "4. Sifatni o'lchaymiz — `fertility`",
          "blocks": [
            {
              "kind": "text",
              "text": "\"Yomon\" degan so'z yetarli emas. Raqam kerak."
            },
            {
              "kind": "text",
              "text": "Dars 01 dagi o'lchovni eslang: **fertility** — har bir so'zga to'g'ri keladigan o'rtacha token soni. **Kam bo'lgani yaxshi.**"
            },
            {
              "kind": "code",
              "code": "matn = \"bolalar kitoblarni oʻqishdi.\"\ntokenlar = kodla(matn)\n\nprint(\"belgilar :\", len(matn))\nprint(\"soʻzlar  :\", len(matn.split()))\nprint(\"tokenlar :\", len(tokenlar))\nprint(\"fertility:\", round(len(tokenlar) / len(matn.split()), 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "belgilar : 28\nsoʻzlar  : 3\ntokenlar : 29\nfertility: 9.667"
            },
            {
              "kind": "bullets",
              "items": [
                "`round(son, 3)` — sonni 3 xonagacha yaxlitlaydi.",
                "`len(tokenlar) / len(matn.split())` — tokenlar soni bo'lingan so'zlar soniga."
              ]
            },
            {
              "kind": "text",
              "text": "**9.667.** Har bir so'z uchun deyarli **o'n** token."
            },
            {
              "kind": "text",
              "text": "Bitta jumla kam — kattaroq matnda o'lchaymiz:"
            },
            {
              "kind": "code",
              "code": "paragraf = \"Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi. Oʻqituvchi darsni tushuntirdi. Kechqurun bolalar uyga qaytishdi.\"\n\nt = kodla(paragraf)\nw = len(paragraf.split())\n\nprint(\"belgilar :\", len(paragraf))\nprint(\"soʻzlar  :\", w)\nprint(\"tokenlar :\", len(t))\nprint(\"fertility:\", round(len(t) / w, 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "belgilar : 141\nsoʻzlar  : 16\ntokenlar : 143\nfertility: 8.938"
            },
            {
              "kind": "text",
              "text": "**8.938.** Endi buni Dars 01 dagi jadvalga qo'shamiz:"
            },
            {
              "kind": "table",
              "head": [
                "Tokenizator",
                "Lug'at",
                "Fertility (o'zbekcha)"
              ],
              "rows": [
                [
                  "**bizning bayt tokenizatorimiz**",
                  "**256**",
                  "**8.938**"
                ],
                [
                  "GPT-2",
                  "50 257",
                  "3.426"
                ],
                [
                  "GPT-4o",
                  "200 019",
                  "2.578"
                ],
                [
                  "uzbek-bpe-16k",
                  "16 384",
                  "**1.749**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Bizniki eng yomoni. GPT-4o dan **uch yarim barobar**, maqsaddan **besh barobar** yomon."
            }
          ]
        },
        {
          "id": "5-uchta-aniq-zarar",
          "title": "5. Uchta aniq zarar",
          "blocks": [
            {
              "kind": "h3",
              "id": "zarar-1-modelning-xotirasi-yeyiladi",
              "text": "Zarar 1 — modelning xotirasi yeyiladi"
            },
            {
              "kind": "text",
              "text": "Modelning \"xotirasi\" — **kontekst oynasi** — token bilan o'lchanadi. Sizning `uzbek-gpt-103m` modelingizda u **1024 token**."
            },
            {
              "kind": "text",
              "text": "Shu 1024 tokenga nechta o'zbek so'zi sig'adi?"
            },
            {
              "kind": "code",
              "code": "print(\"bayt tokenizator :\", round(1024 / 8.938), \"ta soʻz\")\nprint(\"GPT-4o           :\", round(1024 / 2.578), \"ta soʻz\")\nprint(\"uzbek-bpe-16k    :\", round(1024 / 1.749), \"ta soʻz\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bayt tokenizator : 115 ta soʻz\nGPT-4o           : 397 ta soʻz\nuzbek-bpe-16k    : 585 ta soʻz"
            },
            {
              "kind": "text",
              "text": "**115 ta so'z.** Bu taxminan yarim sahifa. Model bundan ortig'ini bir vaqtda ko'ra olmaydi."
            },
            {
              "kind": "text",
              "text": "Bir xil model, bir xil xotira — lekin yaxshi tokenizator bilan **besh barobar ko'proq matn** sig'adi. Hech qanday qo'shimcha hisob, hech qanday qo'shimcha parametr. Faqat tokenizator."
            },
            {
              "kind": "media",
              "id": "i2",
              "title": "Kontekst oynasi"
            },
            {
              "kind": "h3",
              "id": "zarar-2-hamma-narsa-sekinroq-va-qimmatroq",
              "text": "Zarar 2 — hamma narsa sekinroq va qimmatroq"
            },
            {
              "kind": "text",
              "text": "Model har bir tokenni **alohida** ishlaydi. 29 ta token = 29 ta qadam. 5 ta token = 5 ta qadam."
            },
            {
              "kind": "text",
              "text": "Trening ham, javob berish ham shunga proporsional. Dars 01 dagi \"uch barobar qimmat\" — bu yerda **besh barobar** bo'ladi."
            },
            {
              "kind": "h3",
              "id": "zarar-3-model-sozni-kormaydi",
              "text": "Zarar 3 — model so'zni ko'rmaydi"
            },
            {
              "kind": "text",
              "text": "Bu eng nozik va eng jiddiy zarar."
            },
            {
              "kind": "text",
              "text": "Modelga `-lar` ko'plik qo'shimchasi ekanini o'rganish kerak. Bayt darajasida bu `[108, 97, 114]` degan uchta raqam ketma-ketligini o'rganish demak — va uni `bolalar`, `kitoblar`, `daftarlar`, `qalamlar` da alohida-alohida tanib olish."
            },
            {
              "kind": "text",
              "text": "Agar `lar` **bitta token** bo'lsa, model uni bir marta o'rganadi va hamma joyda tanib oladi."
            },
            {
              "kind": "text",
              "text": "**Tokenizator modelga qanday qurilish bloklari berishini hal qiladi.** Bloklar juda mayda bo'lsa, model ularni yig'ishga kuch sarflaydi — o'rganishga emas."
            }
          ]
        },
        {
          "id": "6-ozbek-tili-bu-yerda-ham-koproq-tolaydi",
          "title": "6. O'zbek tili bu yerda ham ko'proq to'laydi",
          "blocks": [
            {
              "kind": "text",
              "text": "Bir xil ma'nodagi inglizcha matnni o'lchaymiz:"
            },
            {
              "kind": "code",
              "code": "ing = \"The children went to school. They read the books and wrote in their notebooks. The teacher explained the lesson. In the evening the children returned home.\"\n\nti = kodla(ing)\nwi = len(ing.split())\nprint(\"inglizcha soʻzlar:\", wi, \"| tokenlar:\", len(ti), \"| fertility:\", round(len(ti)/wi, 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "inglizcha soʻzlar: 26 | tokenlar: 155 | fertility: 5.962"
            },
            {
              "kind": "text",
              "text": "**Inglizcha 5.962, o'zbekcha 8.938.** Bayt darajasida ham o'zbek tili 50% ko'proq to'laydi."
            },
            {
              "kind": "text",
              "text": "Ikkita sabab:"
            },
            {
              "kind": "steps",
              "items": [
                "O'zbek so'zlari uzunroq (agglyutinativ til — qo'shimchalar ulanadi)",
                "Har bir `ʻ` **ikkita** token turadi (Dars 06)"
              ]
            },
            {
              "kind": "code",
              "code": "print(kodla(\"oʻ\"), \"vs\", kodla(\"ol\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[111, 202, 187] vs [111, 108]"
            },
            {
              "kind": "text",
              "text": "`oʻ` — 3 token. `ol` — 2 token. Bir xil ko'rinadigan ikki bo'g'in, har xil narx."
            }
          ]
        },
        {
          "id": "7-yechimning-goyasi",
          "title": "7. Yechimning g'oyasi",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi eng muhim qismi. Muammoni ko'rdik — yechim nima?"
            },
            {
              "kind": "text",
              "text": "Paragrafdagi juftliklarni sanaymiz. **Dars 04 dagi `get_stats` ni ishlatamiz — faqat endi harflar emas, raqamlar ustida:**"
            },
            {
              "kind": "code",
              "code": "hisob = {}\nfor x, y in zip(t, t[1:]):\n    hisob[(x, y)] = hisob.get((x, y), 0) + 1\n\neng = None\neng_soni = 0\nfor juftlik, soni in hisob.items():\n    if soni > eng_soni:\n        eng = juftlik\n        eng_soni = soni\n\nprint(\"juftliklar        :\", len(t) - 1)\nprint(\"turli juftliklar  :\", len(hisob))\nprint(\"eng koʻp juftlik  :\", eng, \"->\", eng_soni, \"marta\")\nprint(\"u nimani anglatadi:\", repr(dekodla(list(eng))))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "juftliklar        : 142\nturli juftliklar  : 85\neng koʻp juftlik  : (108, 97) -> 7 marta\nu nimani anglatadi: 'la'"
            },
            {
              "kind": "text",
              "text": "**To'xtang va buni ko'ring.**"
            },
            {
              "kind": "text",
              "text": "Dars 04 da xuddi shu funksiyani **harflar** ustida ishlatgan edik va javob `la` chiqqan edi. Endi uni **baytlar** ustida ishlatdik — va javob yana `la`."
            },
            {
              "kind": "text",
              "text": "Kod bir xil. Faqat ichidagi narsa harf emas, raqam. Dars 03 dagi kortej shuning uchun kerak edi: `(108, 97)` — ikkita raqam yonma-yon, qo'shilmagan."
            },
            {
              "kind": "h3",
              "id": "va-endi-goya",
              "text": "Va endi g'oya"
            },
            {
              "kind": "text",
              "text": "`(108, 97)` juftligi paragrafda **7 marta** uchraydi. Har safar u **ikkita** token yeydi. Jami 14 ta token."
            },
            {
              "kind": "text",
              "text": "Nima bo'lardi, agar biz **yangi token** yasasak?"
            },
            {
              "kind": "pre",
              "text": "256-token  =  (108, 97)  =  \"la\""
            },
            {
              "kind": "text",
              "text": "Endi har bir `la` **bitta** token. 14 o'rniga 7. **Yettita token tejaldi**, faqat bitta yangi token qo'shish evaziga."
            },
            {
              "kind": "text",
              "text": "Va buni to'xtatish shart emas. Yana sanaymiz, yana eng ko'p uchraganini birlashtiramiz. Yana. Yana. Har safar lug'at bittaga o'sadi va matn qisqaradi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**BPE algoritmi bitta jumlada:** **Eng ko'p uchraydigan juftlikni topib, uni bitta yangi token bilan almashtir. Keyin buni qayta-qayta takrorla.** Boshida 256 ta token bor. 16 128 marta takrorlasangiz — 16 384 ta token bo'ladi. Aynan sizning tokenizatoringiz."
            },
            {
              "kind": "media",
              "id": "i3",
              "title": "BPE gʻoyasi"
            },
            {
              "kind": "text",
              "text": "Nomi shundan: **BPE — Byte Pair Encoding**, ya'ni \"bayt juftligini kodlash\"."
            }
          ]
        },
        {
          "id": "8-muammo",
          "title": "8. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "G'oya aniq. Lekin uni bajarish uchun ikkita narsa yetishmayapti."
            },
            {
              "kind": "text",
              "text": "**Birinchi.** Biz eng ko'p uchraydigan juftlikni **topdik**, lekin uni hali **almashtirganimiz yo'q**. `[98, 111, 108, 97, 108, 97, 114]` ro'yxatida `108, 97` ni topib, ularni `256` ga almashtirish kerak. Bu ko'rinadigandan qiyinroq — chunki ro'yxat bo'ylab yurayotganda uning uzunligi o'zgaradi."
            },
            {
              "kind": "text",
              "text": "**Ikkinchi.** Buni **bir marta emas, minglab marta** takrorlash kerak. Va har safar oldingi natija ustida ishlash kerak."
            },
            {
              "kind": "text",
              "text": "Keyingi ikki dars aynan shu ikki muammo haqida."
            }
          ]
        },
        {
          "id": "9-toliq-kod",
          "title": "9. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "# ---- Tokenizator ----\ndef kodla(matn):\n    return list(matn.encode(\"utf-8\"))\n\n\ndef dekodla(raqamlar):\n    return bytes(raqamlar).decode(\"utf-8\")\n\n\nvocab = {}\nfor i in range(256):\n    vocab[i] = bytes([i])\n\n\ndef get_stats(tokenlar):\n    hisob = {}\n    for x, y in zip(tokenlar, tokenlar[1:]):\n        juftlik = (x, y)\n        hisob[juftlik] = hisob.get(juftlik, 0) + 1\n    return hisob\n\n\ndef eng_kop_juftlik(hisob):\n    eng = None\n    eng_soni = 0\n    for juftlik, soni in hisob.items():\n        if soni > eng_soni:\n            eng = juftlik\n            eng_soni = soni\n    return eng\n\n\n# ---- Sinov ----\nparagraf = \"Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi. Oʻqituvchi darsni tushuntirdi. Kechqurun bolalar uyga qaytishdi.\"\n\nt = kodla(paragraf)\nw = len(paragraf.split())\n\nprint(\"lugʻat hajmi :\", len(vocab))\nprint(\"soʻzlar      :\", w)\nprint(\"tokenlar     :\", len(t))\nprint(\"fertility    :\", round(len(t) / w, 3))\nprint(\"round-trip   :\", dekodla(t) == paragraf)\n\nstats = get_stats(t)\neng = eng_kop_juftlik(stats)\nprint(\"eng koʻp juftlik:\", eng, \"->\", stats[eng], \"marta =\", repr(dekodla(list(eng))))\n\n# ---- Kontekst hisobi ----\nf = len(t) / w\nprint(\"1024 tokenga sigʻadi:\", round(1024 / f), \"ta soʻz\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "lugʻat hajmi : 256\nsoʻzlar      : 16\ntokenlar     : 143\nfertility    : 8.938\nround-trip   : True\neng koʻp juftlik: (108, 97) -> 7 marta = 'la'\n1024 tokenga sigʻadi: 115 ta soʻz",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "10-ozingiz-yozing",
          "title": "10. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "# 1. Oʻz ismingiz nechta token?\nism = \"___\"\nprint(len(kodla(___)))\n\n# 2. Bu ikki soʻzning fertility sini solishtiring\nfor soz in [\"maktab\", \"maktablarimizdagi\"]:\n    tokenlar = ___(soz)\n    print(soz, \"->\", len(tokenlar), \"token\")\n\n# 3. Oʻz jumlangizni yozing va fertility sini hisoblang\njumla = \"___\"\nprint(\"fertility:\", round(len(kodla(jumla)) / len(jumla.___()), 3))",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "# 1.\nism = \"Islombek\"\nprint(len(kodla(ism)))          # 8\n\n# 2.\nfor soz in [\"maktab\", \"maktablarimizdagi\"]:\n    tokenlar = kodla(soz)\n    print(soz, \"->\", len(tokenlar), \"token\")\n# maktab -> 6 token\n# maktablarimizdagi -> 17 token\n\n# 3.\njumla = \"Men oʻzbek tilida gaplashaman\"\nprint(\"fertility:\", round(len(kodla(jumla)) / len(jumla.split()), 3))\n# fertility: 7.5",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "text",
                  "text": "2-topshiriq o'zbek tilining muammosini ko'rsatadi: `maktablarimizdagi` — bitta so'z, lekin **17 ta token**. Qo'shimchalar ulangan sari narx o'sadi."
                },
                {
                  "kind": "text",
                  "text": "Ingliz tilida bunday so'z yo'q — u \"in our schools\" deb **uch so'zga** bo'linadi, va har biri qisqa. O'zbek tili esa hammasini bitta so'zga yig'adi, va bayt tokenizator uni butunlay maydalaydi."
                }
              ]
            }
          ]
        },
        {
          "id": "11-mashqlar",
          "title": "11. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`kodla(\"aaa\")` nechta token qaytaradi? `get_stats` undan nima topadi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(kodla(\"aaa\"))              # [97, 97, 97]\nprint(get_stats(kodla(\"aaa\")))   # {(97, 97): 2}",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "3 ta token, 2 ta juftlik, ikkalasi ham `(97, 97)`."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 04 dagi `get_stats(\"aaa\")` bilan bir xil naqsh — faqat harf o'rniga raqam."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Nima uchun `oʻzbek` va `ozbek` har xil sondagi token beradi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(kodla(\"oʻzbek\"), len(kodla(\"oʻzbek\")))   # 7\nprint(kodla(\"ozbek\"),  len(kodla(\"ozbek\")))    # 5",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "`ʻ` ikkita bayt (Dars 06), shuning uchun **ikkita token**. `ozbek` da u umuman yo'q."
                  },
                  {
                    "kind": "text",
                    "text": "7 va 5 — ikki token farq, bitta belgi uchun."
                  },
                  {
                    "kind": "text",
                    "text": "Bu amaliy oqibat: to'g'ri yozilgan o'zbekcha matn tokenizator uchun qimmatroq. Dars 14 dagi normalizatsiya buni to'g'rilamaydi — u faqat **turli variantlarni bittaga keltiradi**, narxni kamaytirmaydi. Narxni kamaytiradigan narsa — BPE: u `[202, 187]` juftligini juda ko'p ko'radi va tez orada uni bitta tokenga birlashtiradi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bizning tokenizatorimiz **hech qachon** xato bermaydi — hatto hech kim ko'rmagan belgida ham. Buni isbotlang."
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "for matn in [\"salom\", \"привет\", \"你好\", \"😀🎉\", \"مرحبا\"]:\n    t = kodla(matn)\n    print(f\"{matn:8s} -> {len(t):2d} token -> {dekodla(t)}\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Hammasi ishlaydi, hammasi round-trip qiladi."
                  },
                  {
                    "kind": "text",
                    "text": "Sabab (Dars 06): har qanday matn — 0–255 raqamlar ro'yxati. Notanish bayt degan narsa yo'q, chunki 256 tadan ortiq bayt qiymati mavjud emas."
                  },
                  {
                    "kind": "text",
                    "text": "Bu **haqiqiy ustunlik**, va uni BPE ham saqlab qoladi: yangi tokenlar qo'shilganda ham eski 256 tasi joyida qoladi. Shuning uchun BPE tokenizator hech qachon `<UNK>` chiqarmaydi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Fertility 8.938 edi. Agar biz `la` ni bitta token qilsak, u qanchaga tushadi? Qo'lda hisoblang."
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "`la` 7 marta uchraydi. Har safar 2 token o'rniga 1 token → **7 ta token tejaladi**."
                  },
                  {
                    "kind": "pre",
                    "text": "eski: 143 token / 16 soʻz = 8.938\nyangi: 136 token / 16 soʻz = 8.500"
                  },
                  {
                    "kind": "code",
                    "code": "print(round((143 - 7) / 16, 3))   # 8.5",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Bitta birlashtirish uchun 0.438 yaxshilanish. Kichik."
                  },
                  {
                    "kind": "text",
                    "text": "**Lekin buni 16 128 marta takrorlaysiz.** Va har bir keyingi birlashtirish oldingilarining ustiga quriladi: `la` bitta token bo'lgach, `lar` ni yasash uchun endi faqat bitta qo'shimcha birlashtirish kerak (`la` + `r`), uchta emas."
                  },
                  {
                    "kind": "text",
                    "text": "Shuning uchun natija 8.938 dan 1.749 gacha tushadi — chizig'iy emas, to'planib boradi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`uzbek-gpt-103m` modelining konteksti 1024 token. Bayt tokenizator bilan unga 115 ta so'z sig'adi."
                },
                {
                  "kind": "text",
                  "text": "Model bir sahifa matnni (taxminan 300 so'z) o'qiy oladimi? Va bu nimani anglatadi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "**Yo'q, o'qiy olmaydi.**"
                  },
                  {
                    "kind": "text",
                    "text": "300 so'z × 8.938 = **2681 token**. Kontekst 1024 ta. Sig'maydi — sahifaning atigi 38% i."
                  },
                  {
                    "kind": "text",
                    "text": "Nimani anglatadi:"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "Model bir sahifalik matnning boshi va oxirini **bir vaqtda ko'ra olmaydi**",
                      "Uzun savolga javob bera olmaydi",
                      "Hikoyaning boshini eslay olmaydi"
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "`uzbek-bpe-16k` bilan esa 300 so'z = 525 token — **sig'adi**, va kontekstning deyarli yarmi bo'sh qoladi."
                  },
                  {
                    "kind": "text",
                    "text": "**Bu kursning butun ma'nosi shu yerda.** Tokenizator \"kichik texnik detal\" emas. U modelning nimani ko'ra olishini va nimani ko'ra olmasligini hal qiladi."
                  },
                  {
                    "kind": "text",
                    "text": "Modelni kattalashtirish qimmat — ko'proq GPU, ko'proq vaqt, ko'proq pul. Tokenizatorni yaxshilash **bepul** — u bir marta o'qitiladi va abadiy ishlaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Shuning uchun ishni undan boshlash kerak."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "12-xulosa",
          "title": "12. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "Bizda **to'liq ishlaydigan tokenizator** bor: 256 token, `kodla`, `dekodla`, round-trip to'g'ri, hamma tilda ishlaydi.",
                "**Fertility** — sifat o'lchovi. Bizniki **8.938**, GPT-4o 2.578, maqsad **1.749**.",
                "Uchta zarar: kontekst 5 barobar kam (115 so'z), hisob 5 barobar qimmat, model so'zni umuman ko'rmaydi.",
                "O'zbek tili bayt darajasida ham 50% ko'proq to'laydi (8.938 vs 5.962).",
                "`get_stats` **raqamlar ustida ham** ishlaydi va yana `la` ni topdi.",
                "**BPE g'oyasi:** eng ko'p uchraydigan juftlikni bitta yangi token bilan almashtir, va buni qayta-qayta takrorla."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "G'oya aniq. Endi uni kodga aylantiramiz."
            },
            {
              "kind": "text",
              "text": "**Dars 08 — Juftlarni sanash.** `get_stats` ni rasmiy funksiya sifatida yozamiz, uni tezlashtiramiz va haqiqiy matnda sinaymiz."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *`[1, 2, 1, 2, 1]` ro'yxatida `(1, 2)` juftligi necha marta uchraydi — ikki martami yoki uch marta?* Javob oddiy ko'rinadi, lekin u `merge` funksiyasidagi eng nozik xatoning ildizi."
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–06. `kodla`, `dekodla`, lug'at, funksiya"
    },
    {
      "id": "dars-08",
      "n": 8,
      "title": "Juftlarni sanash",
      "subtitle": "",
      "minutes": 50,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**yozasiz** `get_stats` ni rasmiy, yakuniy ko'rinishda — bu tokenizatoringizning birinchi qismi;",
                "**qisqartirasiz** tsiklni bitta qatorga — ro'yxat ichida tsikl (list comprehension);",
                "**topasiz** lug'atdagi eng katta qiymatni bitta buyruq bilan — `max(key=)`;",
                "**ko'rasiz** o'zbek tilining qo'shimchalari statistikadan o'zi chiqib kelishini;",
                "**tushunasiz** ustma-ust tushish (overlap) tuzog'ini — `merge` dagi eng nozik xato."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 07 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "`[1, 2, 1, 2, 1]` ro'yxatida `(1, 2)` juftligi necha marta uchraydi?"
            },
            {
              "kind": "text",
              "text": "Tekshiramiz:"
            },
            {
              "kind": "code",
              "code": "print(get_stats([1, 2, 1, 2, 1]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{(1, 2): 2, (2, 1): 2}"
            },
            {
              "kind": "text",
              "text": "`(1, 2)` — ikki marta. Ko'pchilik shunday javob beradi, va bu **to'g'ri**."
            },
            {
              "kind": "text",
              "text": "Endi ikkinchi savol, va bu qiyinroq:"
            },
            {
              "kind": "code",
              "code": "print(get_stats([1, 1, 1]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{(1, 1): 2}"
            },
            {
              "kind": "text",
              "text": "`(1, 1)` — **ikki marta**. Ro'yxatda esa atigi uchta element bor."
            },
            {
              "kind": "text",
              "text": "Endi o'ylang: agar biz `(1, 1)` ni bitta yangi token bilan almashtirmoqchi bo'lsak, buni **necha marta** qila olamiz?"
            },
            {
              "kind": "text",
              "text": "Javob: **bir marta.** Chunki birinchi ikkita `1` ni birlashtirgandan keyin, uchinchi `1` yolg'iz qoladi — u bilan juft yasash uchun hech kim qolmadi."
            },
            {
              "kind": "text",
              "text": "**Sanoq 2 ta dedi. Amalda 1 ta birlashtirish bo'ladi.**"
            },
            {
              "kind": "text",
              "text": "Bu farq — keyingi darsdagi eng nozik xatoning ildizi. Uni shu darsda oxirigacha tushunamiz."
            }
          ]
        },
        {
          "id": "2-get-stats-yakuniy-korinish",
          "title": "2. `get_stats` — yakuniy ko'rinish",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 04 da bu funksiyani harflar uchun yozgan edik, Dars 07 da uni raqamlarda sinab ko'rdik. Endi uni **rasmiy** qilamiz:"
            },
            {
              "kind": "code",
              "code": "def get_stats(tokenlar):\n    hisob = {}\n    for juftlik in zip(tokenlar, tokenlar[1:]):\n        hisob[juftlik] = hisob.get(juftlik, 0) + 1\n    return hisob",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "**Dars 04 dagidan bitta farq bor.** Avval shunday edi:"
            },
            {
              "kind": "code",
              "code": "for a, b in zip(tokenlar, tokenlar[1:]):\n    juftlik = (a, b)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Endi shunday:"
            },
            {
              "kind": "pre",
              "text": "for juftlik in zip(tokenlar, tokenlar[1:]):"
            },
            {
              "kind": "text",
              "text": "Nima o'zgardi: avval `zip` bergan kortejni ikkita nomga **ochib**, keyin qaytadan kortej qilib **yig'ayotgan** edik. Ortiqcha ish. `zip` allaqachon kortej beradi — uni to'g'ridan-to'g'ri olsa bo'ladi."
            },
            {
              "kind": "text",
              "text": "Tekshiramiz:"
            },
            {
              "kind": "code",
              "code": "tokenlar = [1, 2, 1, 2, 1]\nfor juftlik in zip(tokenlar, tokenlar[1:]):\n    print(juftlik)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "(1, 2)\n(2, 1)\n(1, 2)\n(2, 1)"
            },
            {
              "kind": "text",
              "text": "Ha, `zip` ning o'zi kortej qaytaryapti. Qo'shimcha qadam kerak emas."
            },
            {
              "kind": "h3",
              "id": "chekka-holatlar",
              "text": "Chekka holatlar"
            },
            {
              "kind": "text",
              "text": "Yaxshi funksiya g'alati kirishlarda ham buzilmasligi kerak:"
            },
            {
              "kind": "code",
              "code": "print(get_stats([]))\nprint(get_stats([5]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{}\n{}"
            },
            {
              "kind": "text",
              "text": "Bo'sh ro'yxat — bo'sh natija. Bitta element — ham bo'sh natija, chunki juftlik uchun ikkita kerak."
            },
            {
              "kind": "text",
              "text": "**Hech qanday `if` tekshiruvi yozmadik.** `zip` bu holatlarni o'zi to'g'ri hal qildi (Dars 03, Mashq 5). Yaxshi yozilgan kod shunday bo'ladi."
            }
          ]
        },
        {
          "id": "3-yangi-narsa-royxat-ichida-tsikl",
          "title": "3. Yangi narsa: ro'yxat ichida tsikl",
          "blocks": [
            {
              "kind": "text",
              "text": "Bu dasturlashda juda ko'p ishlatiladigan qisqartma. Uni endi ko'rsataman, chunki bundan keyin kodda uchraydi."
            },
            {
              "kind": "text",
              "text": "Oddiy misol. Ikki usul, bir xil natija:"
            },
            {
              "kind": "code",
              "code": "# 1-usul: odatdagi tsikl\nkv1 = []\nfor x in range(5):\n    kv1.append(x * x)\n\n# 2-usul: roʻyxat ichida tsikl\nkv2 = [x * x for x in range(5)]\n\nprint(kv1, kv2)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[0, 1, 4, 9, 16] [0, 1, 4, 9, 16]"
            },
            {
              "kind": "text",
              "text": "Ikkinchi usulni **o'ngdan chapga** o'qing:"
            },
            {
              "kind": "pre",
              "text": "[  x * x     for x in range(5)  ]\n   ↑              ↑\n   nima qilinsin  nima boʻylab yurilsin"
            },
            {
              "kind": "text",
              "text": "Ya'ni: \"`range(5)` dagi har bir `x` uchun `x * x` ni ol va ro'yxatga qo'y\"."
            },
            {
              "kind": "text",
              "text": "Bu **uch qatorni bir qatorga** yig'adi:"
            },
            {
              "kind": "pre",
              "text": "natija = []            }\nfor x in ...:          }  →  natija = [ ... for x in ... ]\n    natija.append(...)  }"
            },
            {
              "kind": "note",
              "tone": "warn",
              "text": "**Boshida buni yozmang, faqat o'qing.** Qisqa kod — tushunarli kod degani emas. Kursda men uni faqat qisqartma foyda berganda ishlataman. O'zingiz yozayotganda oddiy tsikl bilan boshlang, keyin xohlasangiz qisqartiring."
            },
            {
              "kind": "text",
              "text": "Bizning juftliklarga qo'llasak:"
            },
            {
              "kind": "code",
              "code": "tokenlar = [1, 2, 1, 2, 1]\nusul1 = []\nfor juftlik in zip(tokenlar, tokenlar[1:]):\n    usul1.append(juftlik)\n\nusul2 = [juftlik for juftlik in zip(tokenlar, tokenlar[1:])]\n\nprint(\"teng:\", usul1 == usul2)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "teng: True"
            }
          ]
        },
        {
          "id": "4-yangi-narsa-max-key",
          "title": "4. Yangi narsa: `max(..., key=...)`",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 04 da eng ko'p uchragan juftlikni topish uchun olti qator yozgan edik:"
            },
            {
              "kind": "code",
              "code": "eng = None\neng_soni = 0\nfor juftlik, soni in hisob.items():\n    if soni > eng_soni:\n        eng = juftlik\n        eng_soni = soni",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Python'da buni **bitta qatorda** qilish mumkin. Lekin uni tushunish uchun yangi g'oya kerak."
            },
            {
              "kind": "h3",
              "id": "avval-max-ning-oddiy-ishlashi",
              "text": "Avval — `max` ning oddiy ishlashi"
            },
            {
              "kind": "code",
              "code": "hisob = {\"la\": 8, \"ar\": 6, \"bo\": 4}\nprint(max(hisob))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "la"
            },
            {
              "kind": "text",
              "text": "Ishladi... lekin tasodifan. `max` lug'atga berilganda uning **kalitlarini** solishtiradi, qiymatlarini emas. Bu yerda `\"la\"` alifboda eng oxirgisi bo'lgani uchun chiqdi — soni eng katta bo'lgani uchun emas."
            },
            {
              "kind": "text",
              "text": "Buni isbotlash oson: `{\"zz\": 1, \"aa\": 99}` da `max` `\"zz\"` ni qaytaradi."
            },
            {
              "kind": "h3",
              "id": "key-parametri",
              "text": "`key` parametri"
            },
            {
              "kind": "text",
              "text": "Bizga kerak: **kalitlarni solishtir, lekin ularning qiymati bo'yicha.**"
            },
            {
              "kind": "code",
              "code": "print(max(hisob, key=hisob.get))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "la"
            },
            {
              "kind": "text",
              "text": "Endi bu to'g'ri sabab bilan chiqdi."
            },
            {
              "kind": "text",
              "text": "**`key=hisob.get` nima?**"
            },
            {
              "kind": "text",
              "text": "Diqqat qiling: `hisob.get` — **qavssiz**. Bu uni **chaqirish** emas."
            },
            {
              "kind": "bullets",
              "items": [
                "`hisob.get(\"la\")` — chaqiruv. Natija: `8`.",
                "`hisob.get` — **funksiyaning o'zi**. Hali chaqirilmagan."
              ]
            },
            {
              "kind": "text",
              "text": "Ya'ni funksiya ham qiymat bo'lishi mumkin — uni o'zgaruvchiga solish, boshqa funksiyaga **uzatish** mumkin. `max` ni shunday tushuning:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "\"Mana senga kalitlar. Va mana senga funksiya. Har bir kalitni shu funksiyadan o'tkaz, chiqqan raqamlarni solishtir, va eng kattasini bergan **kalitni** qaytar.\""
            },
            {
              "kind": "text",
              "text": "Ichida taxminan shu bo'ladi:"
            },
            {
              "kind": "pre",
              "text": "\"la\" → hisob.get(\"la\") → 8\n\"ar\" → hisob.get(\"ar\") → 6\n\"bo\" → hisob.get(\"bo\") → 4\n                          ↑ eng kattasi → \"la\" qaytariladi"
            },
            {
              "kind": "text",
              "text": "**Qaytariladigan narsa kalit, qiymat emas.** `8` emas, `\"la\"`."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu g'oya — funksiyani boshqa funksiyaga berish — Python'da hamma joyda uchraydi. Hozir uni to'liq o'zlashtirish shart emas; `max(hisob, key=hisob.get)` ni **ibora sifatida** eslab qoling. Ma'nosi: \"eng katta qiymatli kalitni ber\"."
            },
            {
              "kind": "media",
              "id": "j3",
              "title": "key= parametri"
            },
            {
              "kind": "h3",
              "id": "teng-bolsa-nima-boladi",
              "text": "Teng bo'lsa nima bo'ladi?"
            },
            {
              "kind": "code",
              "code": "h2 = {\"aa\": 3, \"bb\": 3, \"cc\": 1}\nprint(max(h2, key=h2.get))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "aa"
            },
            {
              "kind": "text",
              "text": "Ikkita kalit teng — `max` **birinchi uchraganini** qaytaradi. Xato emas, shunchaki bilib qo'ying: BPE da tenglik holatlari bo'ladi va natija lug'atga qo'shilish tartibiga bog'liq bo'ladi."
            }
          ]
        },
        {
          "id": "5-haqiqiy-matnda-ishlatamiz",
          "title": "5. Haqiqiy matnda ishlatamiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi kattaroq o'zbekcha matnda sinaymiz:"
            },
            {
              "kind": "code",
              "code": "matn = \"\"\"Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi.\nOʻqituvchi darsni tushuntirdi. Oʻquvchilar savollarga javob berishdi.\nKechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.\nOtalar ishdan kelishdi. Hamma birga dasturxonga oʻtirishdi.\"\"\"\n\nt = kodla(matn)\nstats = get_stats(t)\n\nprint(\"belgilar:\", len(matn), \"| tokenlar:\", len(t), \"| soʻzlar:\", len(matn.split()))\nprint(\"juftliklar:\", len(t) - 1, \"| turli juftliklar:\", len(stats))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "belgilar: 267 | tokenlar: 271 | soʻzlar: 30\njuftliklar: 270 | turli juftliklar: 123"
            },
            {
              "kind": "text",
              "text": "270 ta juftlik bor, lekin ular orasida **123 tasi** turlicha. Demak ko'pchiligi takrorlangan — aynan shu takror bizga kerak."
            },
            {
              "kind": "h3",
              "id": "eng-kop-uchragan-10-tasi",
              "text": "Eng ko'p uchragan 10 tasi"
            },
            {
              "kind": "code",
              "code": "nusxa = dict(stats)\n\nfor _ in range(10):\n    eng = max(nusxa, key=nusxa.get)\n    print(f\"{eng}  {nusxa[eng]:3d} marta   {dekodla(list(eng))!r}\")\n    del nusxa[eng]",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "**Satr izohi:**"
            },
            {
              "kind": "bullets",
              "items": [
                "`dict(stats)` — lug'atning **nusxasini** yasaydi. Asl `stats` ga tegmaymiz.",
                "`del nusxa[eng]` — kalitni lug'atdan **o'chiradi**. Shunda keyingi aylanishda `max` navbatdagisini topadi.",
                "`dekodla(list(eng))` — kortejni ro'yxatga aylantirib, matnga qaytaramiz. Ya'ni `(108, 97)` → `'la'`."
              ]
            },
            {
              "kind": "output",
              "text": "(108, 97)   12 marta   'la'\n(97, 114)   11 marta   'ar'\n(115, 104)   10 marta   'sh'\n(104, 100)    9 marta   'hd'\n(100, 105)    9 marta   'di'\n(97, 32)    8 marta   'a '\n(105, 115)    8 marta   'is'\n(105, 46)    8 marta   'i.'\n(114, 32)    6 marta   'r '\n(103, 97)    6 marta   'ga'"
            }
          ]
        },
        {
          "id": "6-toxtang-bu-royxatga-qarang",
          "title": "6. To'xtang — bu ro'yxatga qarang",
          "blocks": [
            {
              "kind": "text",
              "text": "O'ng ustunni o'qing, boshqa hech narsaga qaramasdan:"
            },
            {
              "kind": "pre",
              "text": "la    ar    sh    hd    di    a     is    i.    r     ga"
            },
            {
              "kind": "text",
              "text": "Endi bu bo'laklarni o'zbek so'zlarida qidiring:"
            },
            {
              "kind": "table",
              "head": [
                "Bo'lak",
                "Qayerda uchraydi",
                "Bu nima"
              ],
              "rows": [
                [
                  "`la` + `ar`",
                  "bola**lar**, kitob**lar**, ona**lar**",
                  "**`-lar`** — ko'plik qo'shimchasi"
                ],
                [
                  "`sh` + `hd` + `di`",
                  "bori**shdi**, oʻqi**shdi**, kelishdi",
                  "**`-shdi`** — o'tgan zamon, ko'plik"
                ],
                [
                  "`di`",
                  "tushuntir**di**, qayt**di**",
                  "**`-di`** — o'tgan zamon"
                ],
                [
                  "`ga`",
                  "maktab**ga**, uy**ga**, dasturxon**ga**",
                  "**`-ga`** — jo'nalish kelishigi"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "**Eng ko'p uchraydigan o'nta bayt juftligi — bu deyarli to'liq o'zbek qo'shimchalari ro'yxati.**"
            },
            {
              "kind": "text",
              "text": "Hech kim algoritmga o'zbek grammatikasini o'rgatmadi. Kodda \"ko'plik\" degan so'z yo'q. `get_stats` ning ichida atigi to'rt qator bor, va ularning hech biri til haqida emas."
            },
            {
              "kind": "media",
              "id": "j2",
              "title": "Qoʻshimchalar oʻzi chiqadi"
            },
            {
              "kind": "text",
              "text": "**Nima uchun shunday chiqadi?** Chunki o'zbek tili **agglyutinativ**: har bir so'zga bir xil qo'shimchalar ulanadi. `-lar`, `-di`, `-ga`, `-ni`, `-da` — ular minglab so'zda qayta-qayta takrorlanadi. Statistika esa aynan takrorni ko'radi."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu kursning markaziy g'oyasi: **til tuzilishi statistikada yashiringan.** Uni topish uchun tilshunos bo'lish shart emas — sanash yetarli. Dars 16 da siz buni **haqiqiy katta korpusda** ko'rasiz, va u yerda ro'yxat yanada tozaroq chiqadi: `lar`, `da`, `ni`, `ga`, `di` — bir-biriga qo'shilgan holda."
            },
            {
              "kind": "text",
              "text": "Va yana bitta narsa: `a ` va `r ` — bo'shliq bilan tugaydigan juftliklar. Bu **so'z chegarasi**. Algoritm so'zlarning qayerda tugashini ham sezyapti. Bu keyinroq muammo tug'diradi (Dars 13), lekin hozircha u foydali."
            }
          ]
        },
        {
          "id": "7-ustma-ust-tushish-tuzogi",
          "title": "7. Ustma-ust tushish tuzog'i",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi 1-bo'limdagi savolga qaytamiz va uni oxirigacha yechamiz."
            },
            {
              "kind": "code",
              "code": "print(get_stats([1, 1, 1]))\nprint(get_stats([1, 1, 1, 1]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{(1, 1): 2}\n{(1, 1): 3}"
            },
            {
              "kind": "text",
              "text": "`[1, 1, 1, 1]` da `(1, 1)` **uch marta** sanaldi:"
            },
            {
              "kind": "pre",
              "text": "[1, 1, 1, 1]\n └──┘            1-juftlik\n    └──┘         2-juftlik\n       └──┘      3-juftlik"
            },
            {
              "kind": "text",
              "text": "Uchala juftlik ham bir-biriga **ustma-ust tushgan**. O'rtadagi `1` lar ikkita juftlikda bir vaqtda qatnashyapti."
            },
            {
              "kind": "text",
              "text": "Endi birlashtirishga urinib ko'ring. Qo'lda, qog'ozda:"
            },
            {
              "kind": "pre",
              "text": "[1, 1, 1, 1]\n └──┘              birinchi juftlikni X ga almashtiramiz\n[X, 1, 1]\n    └──┘           qolganini ham almashtiramiz\n[X, X]"
            },
            {
              "kind": "text",
              "text": "**Ikki marta** birlashtirish bo'ldi. Sanoq esa **uch** degan edi."
            },
            {
              "kind": "text",
              "text": "`[1, 1, 1]` uchun esa:"
            },
            {
              "kind": "pre",
              "text": "[1, 1, 1]\n └──┘              birlashtiramiz\n[X, 1]             uchinchi 1 yolgʻiz qoldi"
            },
            {
              "kind": "text",
              "text": "**Bir marta.** Sanoq **ikki** degan edi."
            },
            {
              "kind": "h3",
              "id": "qoida",
              "text": "Qoida"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Juftlikning ikkala elementi bir xil bo'lsa, sanoq haqiqiy birlashtirishlar sonidan katta bo'ladi.**"
            },
            {
              "kind": "text",
              "text": "Elementlar har xil bo'lsa — muammo yo'q:"
            },
            {
              "kind": "code",
              "code": "print(get_stats([1, 2, 1, 2, 1]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{(1, 2): 2, (2, 1): 2}"
            },
            {
              "kind": "text",
              "text": "`(1, 2)` ni birlashtirsak: `[X, X, 1]` — ikki marta. Sanoq ham ikki. **Mos keldi.**"
            },
            {
              "kind": "text",
              "text": "Chunki `1` va `2` har xil, shuning uchun juftliklar ustma-ust tusha olmaydi."
            },
            {
              "kind": "h3",
              "id": "bu-muhimmi",
              "text": "Bu muhimmi?"
            },
            {
              "kind": "text",
              "text": "Amalda — deyarli yo'q. BPE da bu farq algoritmni buzmaydi: eng ko'p uchraydigan juftlik biroz ortiqcha sanalsa ham, u baribir eng ko'p uchraydigani bo'lib qoladi, va birlashtirish baribir foyda beradi."
            },
            {
              "kind": "text",
              "text": "**Lekin `merge` funksiyasini yozayotganda bu sizni tuzoqqa tushiradi.** Agar ro'yxat bo'ylab noto'g'ri yursangiz, `[1, 1, 1]` da birinchi `1` ni ikkita juftlikda bir vaqtda ishlatib yuborasiz — va natija buziladi."
            },
            {
              "kind": "text",
              "text": "Keyingi darsda `merge` ni yozganingizda `aaaa` bilan albatta sinab ko'rasiz. Endi nima uchun ekanini bilasiz."
            },
            {
              "kind": "media",
              "id": "j1",
              "title": "Ustma-ust tushish"
            }
          ]
        },
        {
          "id": "8-muammo",
          "title": "8. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda endi:"
            },
            {
              "kind": "bullets",
              "items": [
                "✓ eng ko'p uchraydigan juftlikni **topa olamiz**",
                "✗ uni **almashtira olmaymiz**"
              ]
            },
            {
              "kind": "text",
              "text": "Kerak bo'lgan narsa: `[98, 111, 108, 97, 108, 97, 114]` ro'yxatida `(108, 97)` ni topib, uni `256` ga almashtirish, natijada `[98, 111, 256, 256, 114]` olish."
            },
            {
              "kind": "text",
              "text": "Bu ko'rinishdan oson, lekin ichida ikkita tuzoq bor:"
            },
            {
              "kind": "steps",
              "items": [
                "**Ro'yxat uzunligi o'zgaradi.** Ikkita element bittaga aylanadi, demak qolgan hamma element chapga suriladi. Oddiy `for i in range(len(...))` tsikli buzilib ketadi.",
                "**Ustma-ust tushish.** Yuqorida ko'rgan muammo — `[1, 1, 1]`."
              ]
            },
            {
              "kind": "text",
              "text": "Keyingi darsda `merge` ni yozamiz va ikkala tuzoqni ham hal qilamiz."
            }
          ]
        },
        {
          "id": "9-toliq-kod",
          "title": "9. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "def kodla(matn):\n    return list(matn.encode(\"utf-8\"))\n\n\ndef dekodla(raqamlar):\n    return bytes(raqamlar).decode(\"utf-8\")\n\n\ndef get_stats(tokenlar):\n    hisob = {}\n    for juftlik in zip(tokenlar, tokenlar[1:]):\n        hisob[juftlik] = hisob.get(juftlik, 0) + 1\n    return hisob\n\n\n# ---- Sinov ----\nmatn = \"\"\"Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi.\nOʻqituvchi darsni tushuntirdi. Oʻquvchilar savollarga javob berishdi.\nKechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.\nOtalar ishdan kelishdi. Hamma birga dasturxonga oʻtirishdi.\"\"\"\n\nt = kodla(matn)\nstats = get_stats(t)\n\nprint(\"tokenlar:\", len(t), \"| turli juftliklar:\", len(stats))\n\neng = max(stats, key=stats.get)\nprint(\"eng koʻp:\", eng, \"->\", stats[eng], \"marta =\", repr(dekodla(list(eng))))\n\nprint(\"\\nTop 10:\")\nnusxa = dict(stats)\nfor _ in range(10):\n    e = max(nusxa, key=nusxa.get)\n    print(f\"  {e}  {nusxa[e]:3d}   {dekodla(list(e))!r}\")\n    del nusxa[e]\n\n# ---- Chekka holatlar ----\nprint(\"\\nChekka holatlar:\")\nprint(get_stats([]))\nprint(get_stats([5]))\nprint(get_stats([1, 1, 1]))\nprint(get_stats([1, 1, 1, 1]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "tokenlar: 271 | turli juftliklar: 123\neng koʻp: (108, 97) -> 12 marta = 'la'\n\nTop 10:\n  (108, 97)   12   'la'\n  (97, 114)   11   'ar'\n  (115, 104)   10   'sh'\n  (104, 100)    9   'hd'\n  (100, 105)    9   'di'\n  (97, 32)    8   'a '\n  (105, 115)    8   'is'\n  (105, 46)    8   'i.'\n  (114, 32)    6   'r '\n  (103, 97)    6   'ga'\n\nChekka holatlar:\n{}\n{}\n{(1, 1): 2}\n{(1, 1): 3}",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "10-ozingiz-yozing",
          "title": "10. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "# 1. Oʻz matningizni yozing (kamida 5 jumla, oʻzbekcha)\nmatn = \"\"\"___\"\"\"\n\n# 2. Tokenlarga aylantiring va juftliklarni sanang\nt = ___(matn)\nstats = ___(t)\n\n# 3. Eng koʻp uchraganini toping\neng = max(stats, key=___)\nprint(eng, stats[eng], bytes(eng))\n\n# 4. Top 5 ni chiqaring\nnusxa = ___(stats)\nfor _ in range(___):\n    e = max(nusxa, key=nusxa.get)\n    print(bytes(e), nusxa[e])\n    ___ nusxa[e]",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "note",
              "tone": "warn",
              "text": "Bu yerda `dekodla` emas, `bytes(...)` ishlatilgani bejiz emas: eng koʻp uchraydigan juftliklar orasida **yarim belgi** ham boʻladi (Dars 07: `vocab[202] = b'\\xca'`), va uni matnga aylantirib boʻlmaydi — `dekodla` xato beradi. `bytes(...)` esa har doim ishlaydi."
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "matn = \"\"\"Men har kuni kitob oʻqiyman. Singlim ham kitob oʻqiydi.\nOtam gazeta oʻqiydi. Onam jurnal oʻqiydi. Biz kitoblarni yaxshi koʻramiz.\"\"\"\n\nt = kodla(matn)\nstats = get_stats(t)\n\neng = max(stats, key=stats.get)\nprint(eng, stats[eng], bytes(eng))\n\nnusxa = dict(stats)\nfor _ in range(5):\n    e = max(nusxa, key=nusxa.get)\n    print(bytes(e), nusxa[e])\n    del nusxa[e]",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "text",
                  "text": "Natija sizning matningizga bog'liq. Lekin deyarli har qanday o'zbekcha matnda top 5 ichida `di`, `la`, `ar`, `ni`, `im` kabi qo'shimcha bo'laklari bo'ladi."
                },
                {
                  "kind": "text",
                  "text": "**Buni albatta o'z matningizda sinab ko'ring.** Natija har safar boshqacha bo'ladi, lekin naqsh bir xil qoladi — va shu naqshni o'z ko'zingiz bilan ko'rish, men aytganimdan ko'ra ishonarliroq."
                }
              ]
            }
          ]
        },
        {
          "id": "11-mashqlar",
          "title": "11. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`get_stats([7])` va `get_stats([7, 7])` nima qaytaradi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(get_stats([7]))       # {}\nprint(get_stats([7, 7]))    # {(7, 7): 1}",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Bitta element — juftlik yasab bo'lmaydi, bo'sh lug'at. Ikkita element — aynan bitta juftlik."
                  },
                  {
                    "kind": "text",
                    "text": "`n` ta elementdan `n − 1` ta juftlik (Dars 03)."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu ikkisi bir xil natija beradimi?"
                },
                {
                  "kind": "code",
                  "code": "a = max(hisob)\nb = max(hisob, key=hisob.get)",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "**Umuman yo'q.**"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`max(hisob)` — **kalitlarni** solishtiradi. Kalitlar kortej bo'lsa, ularni raqam bo'yicha solishtiradi: `(200, 5)` > `(108, 97)`, chunki 200 > 108.",
                      "`max(hisob, key=hisob.get)` — **qiymatlarni** solishtiradi va eng katta qiymatli kalitni qaytaradi."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Sinab ko'ring:"
                  },
                  {
                    "kind": "code",
                    "code": "h = {(200, 5): 1, (108, 97): 99}\nprint(max(h))                    # (200, 5)   — notoʻgʻri!\nprint(max(h, key=h.get))         # (108, 97)  — toʻgʻri",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "`key=` ni unutish — jimgina ishlaydigan, lekin butunlay noto'g'ri natija beradigan xato. Eng xavfli turdagi xato."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`dekodla(list((108, 97)))` nima uchun `list(...)` talab qiladi? `dekodla((108, 97))` ishlaydimi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "Aslida **ishlaydi**:"
                  },
                  {
                    "kind": "code",
                    "code": "print(dekodla((108, 97)))   # la",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "`bytes()` kortejni ham qabul qiladi. Demak `list(...)` bu yerda shart emas."
                  },
                  {
                    "kind": "text",
                    "text": "Lekin men uni yozdim, va sababi bor: **kodni o'qiyotgan odam uchun aniqroq.** `dekodla` funksiyasi **ro'yxat** kutadi degan kelishuvimiz bor edi (Dars 06). Unga kortej berish ishlaydi, lekin kelishuvni buzadi."
                  },
                  {
                    "kind": "text",
                    "text": "Katta kodda bunday \"ishlaydi-ku\" joylar to'planib, keyin tushunish qiyin bo'lib qoladi. **Ishlashi va to'g'ri bo'lishi — bir xil narsa emas.**"
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Quyidagi ro'yxatda `(5, 5)` juftligi necha marta sanaladi, va uni necha marta birlashtirish mumkin?"
                },
                {
                  "kind": "pre",
                  "text": "[5, 5, 5, 5, 5]"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(get_stats([5, 5, 5, 5, 5]))   # {(5, 5): 4}",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "**Sanoq: 4.** (5 ta element → 4 ta juftlik, hammasi bir xil.)"
                  },
                  {
                    "kind": "text",
                    "text": "**Birlashtirish: 2 marta.**"
                  },
                  {
                    "kind": "pre",
                    "text": "[5, 5, 5, 5, 5]\n └──┘\n[X, 5, 5, 5]\n    └──┘\n[X, X, 5]          uchinchi 5 yolgʻiz qoldi"
                  },
                  {
                    "kind": "text",
                    "text": "Umumiy qoida: `n` ta bir xil element bo'lsa, sanoq `n − 1`, birlashtirish esa `n // 2` marta bo'ladi (`//` — butun bo'lish)."
                  },
                  {
                    "kind": "text",
                    "text": "5 ta element: sanoq 4, birlashtirish 2. ✓"
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`get_stats` ni **ikki xil matnda** ishlating va natijalarni solishtiring:"
                },
                {
                  "kind": "code",
                  "code": "uzbekcha = \"bolalar kitoblarni oʻqishdi va daftarlarga yozishdi\"\ninglizcha = \"the children read the books and wrote in the notebooks\"",
                  "lang": "python",
                  "mode": "type"
                },
                {
                  "kind": "text",
                  "text": "Har birida eng ko'p uchragan 3 juftlikni chiqaring. Farqi nimada?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "O'zbekchada top juftliklar **qo'shimcha bo'laklari** bo'ladi: `la`, `ar`, `sh`, `di`, `ni`."
                  },
                  {
                    "kind": "text",
                    "text": "Inglizchada esa **alohida qisqa so'zlar va ularning atrofidagi bo'shliqlar**\nbo'ladi: `th`, `he`, `e `, ` t`."
                  },
                  {
                    "kind": "text",
                    "text": "**Nima uchun bu farq muhim:**"
                  },
                  {
                    "kind": "text",
                    "text": "Ingliz tilida ma'no ko'pincha **alohida so'zlarda** turadi: \"in the notebooks\" — uchta so'z. Tokenizator ularni butunicha token qilib olsa yetadi."
                  },
                  {
                    "kind": "text",
                    "text": "O'zbek tilida esa xuddi shu ma'no **bitta so'z ichida** turadi: `daftarlarimizda` — o'zak + ko'plik + egalik + kelishik. Tokenizator so'zning **ichini** to'g'ri bo'lishi kerak."
                  },
                  {
                    "kind": "text",
                    "text": "Shuning uchun ingliz tili uchun qurilgan tokenizator o'zbekchada yomon ishlaydi: u so'zlarni butunicha yodlashga o'rgangan, o'zbek tilida esa so'zlar deyarli hech qachon takrorlanmaydi — takrorlanadigan narsa **qo'shimchalar**."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 01 dagi `1.749` va `2.578` farqining haqiqiy sababi shu."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "12-xulosa",
          "title": "12. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "`get_stats` yakuniy ko'rinishda — to'rt qator, `zip` ning kortejini to'g'ridan-to'g'ri oladi.",
                "Bo'sh va bir elementli ro'yxatlarda `if` siz to'g'ri ishlaydi.",
                "`[x for x in ...]` — tsiklning qisqartmasi. O'qishni biling, yozishga shoshilmang.",
                "`max(hisob, key=hisob.get)` — eng katta qiymatli **kalitni** qaytaradi. `key=` ni unutsangiz, jimgina noto'g'ri natija olasiz.",
                "O'zbek matnidagi eng ko'p uchraydigan bayt juftliklari — `la`, `ar`, `sh`, `di`, `ga` — **o'zbek qo'shimchalari**. Statistika grammatikani o'zi topadi.",
                "**Ustma-ust tushish:** juftlikning ikkala elementi bir xil bo'lsa, sanoq birlashtirishlar sonidan katta chiqadi."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Juftlikni topdik. Endi uni almashtirish kerak."
            },
            {
              "kind": "text",
              "text": "**Dars 09 — Birlashtirish (`merge`).** Ro'yxat ichida juftlikni topib, uni bitta yangi token bilan almashtiradigan funksiya. Bu kursdagi eng qiyin funksiya — lekin u atigi sakkiz qator."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *ro'yxat bo'ylab yurayotib uning uzunligini o'zgartirsangiz nima bo'ladi?* Javob: `for` tsikli bu ish uchun yaramaydi. Shuning uchun keyingi darsda yangi tsikl turini ko'ramiz — `while`."
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–07. `kodla`, `dekodla`, lug'at, funksiya, tsikl"
    },
    {
      "id": "dars-09",
      "n": 9,
      "title": "Birlashtirish (merge)",
      "subtitle": "",
      "minutes": 55,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**bilasiz** nima uchun `for` tsikli bu ish uchun yaramasligini — o'z ko'zingiz bilan;",
                "**yozasiz** `while` tsiklini va uni to'g'ri to'xtatasiz;",
                "**qurasiz** `merge` funksiyasini — kursdagi eng qiyin sakkiz qator;",
                "**tushunasiz** `and` ning qisqa tutashuvini va u qanday qilib xatoni yashirishini;",
                "**ko'rasiz** algoritm `lar` qo'shimchasini ikki qadamda o'zi yasashini."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 08 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Ro'yxat bo'ylab yurayotib uning **uzunligini o'zgartirsangiz** nima bo'ladi?"
            },
            {
              "kind": "text",
              "text": "Sinab ko'ramiz. Vazifa: `[98, 111, 108, 97, 108, 97, 114]` ro'yxatidagi `(108, 97)` juftliklarini `256` ga almashtirish."
            },
            {
              "kind": "text",
              "text": "Eng tabiiy urinish — `for` tsikli bilan, joyida tahrirlash:"
            },
            {
              "kind": "code",
              "code": "tokenlar = [98, 111, 108, 97, 108, 97, 114]\nyangi = list(tokenlar)\n\nfor i in range(len(yangi)):\n    if yangi[i] == 108 and yangi[i + 1] == 97:\n        yangi[i] = 256\n        del yangi[i + 1]\n\nprint(yangi)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "IndexError: list index out of range",
              "error": true
            },
            {
              "kind": "text",
              "text": "Nima bo'ldi:"
            },
            {
              "kind": "bullets",
              "items": [
                "`range(len(yangi))` tsikl boshlanishida **bir marta** hisoblanadi — 7 ta element, demak `i` 0 dan 6 gacha boradi.",
                "Lekin `del` har safar ro'yxatni **qisqartiradi**. Ikkita `del` dan keyin ro'yxatda atigi 5 ta element qoladi.",
                "`i` esa baribir 6 gacha yuraveradi. 5-manzil yo'q, 6-manzil yo'q."
              ]
            },
            {
              "kind": "text",
              "text": "**`for` tsikli o'zgarmas uzunlik uchun mo'ljallangan.** U boshida \"necha marta aylanaman\" deb hal qiladi va keyin fikrini o'zgartirmaydi."
            },
            {
              "kind": "media",
              "id": "k1",
              "title": "for tsikli qulaydi"
            },
            {
              "kind": "text",
              "text": "Bizga esa boshqa narsa kerak: **har qadamda o'zim qaror qiladigan** tsikl. Ba'zan bir qadam, ba'zan ikki qadam oldinga."
            }
          ]
        },
        {
          "id": "2-while-ozingiz-boshqaradigan-tsikl",
          "title": "2. `while` — o'zingiz boshqaradigan tsikl",
          "blocks": [
            {
              "kind": "code",
              "code": "i = 0\nwhile i < 5:\n    print(i, end=\" \")\n    i += 1",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "0 1 2 3 4"
            },
            {
              "kind": "text",
              "text": "Tuzilishi:"
            },
            {
              "kind": "pre",
              "text": "while  shart:\n    tana"
            },
            {
              "kind": "text",
              "text": "Ma'nosi: **\"shart rost ekan — tanani takrorla\"**. Har aylanishdan oldin shart qayta tekshiriladi."
            },
            {
              "kind": "text",
              "text": "`for` bilan solishtiring:"
            },
            {
              "kind": "table",
              "head": [
                "",
                "`for`",
                "`while`"
              ],
              "rows": [
                [
                  "Ma'nosi",
                  "\"har bir element uchun\"",
                  "\"shart rost ekan\""
                ],
                [
                  "Hisoblagich",
                  "Python boshqaradi",
                  "**siz boshqarasiz**"
                ],
                [
                  "Qachon ishlatiladi",
                  "nechta aylanish kerakligi ma'lum",
                  "oldindan ma'lum emas"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "`end=\" \"` — `print` ning parametri: qator oxiriga yangi qator emas, bo'shliq qo'yadi. Shuning uchun hammasi bir qatorda chiqdi."
            },
            {
              "kind": "h3",
              "id": "qadamni-ozingiz-tanlaysiz",
              "text": "Qadamni o'zingiz tanlaysiz"
            },
            {
              "kind": "code",
              "code": "i = 0\nwhile i < 10:\n    print(i, end=\" \")\n    i += 2",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "0 2 4 6 8"
            },
            {
              "kind": "text",
              "text": "`i += 2` — ikkitadan sakraydi. **Mana shu narsa bizga kerak bo'ladi:** juftlikni birlashtirganda ikkita tokenni bir vaqtda \"iste'mol qilamiz\", demak ikki qadam oldinga yurishimiz kerak."
            },
            {
              "kind": "h3",
              "id": "cheksiz-tsikl",
              "text": "⚠️ Cheksiz tsikl"
            },
            {
              "kind": "text",
              "text": "`while` da bitta jiddiy xavf bor:"
            },
            {
              "kind": "code",
              "code": "i = 0\nwhile i < 5:\n    print(i)\n    # i += 1  ni unutdik!",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Bu **hech qachon tugamaydi**. `i` o'zgarmaydi, shart har doim rost qoladi, tsikl abadiy aylanaveradi."
            },
            {
              "kind": "text",
              "text": "Colab'da bu bo'lsa: chap tomondagi **⏹ (to'xtatish)** tugmasini bosing."
            },
            {
              "kind": "text",
              "text": "**Qoida:** `while` yozganingizda darhol o'zingizga savol bering — *shart qachon yolg'on bo'ladi?* Javob topolmasangiz, tsikl noto'g'ri."
            },
            {
              "kind": "text",
              "text": "Bizning holatda: `i < len(tokenlar)`, va `i` har aylanishda kamida bittaga oshadi. Demak u albatta `len(tokenlar)` ga yetadi. ✓"
            }
          ]
        },
        {
          "id": "3-merge-qadam-baqadam",
          "title": "3. `merge` — qadam-baqadam",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi funksiyani quramiz. G'oyasi:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Ro'yxat bo'ylab yuramiz. Har qadamda qaraymiz: **shu yerdan juftlik boshlanadimi?** - Ha bo'lsa → natijaga **yangi token** qo'shamiz va **ikki** qadam sakraymiz - Yo'q bo'lsa → natijaga **hozirgi tokenni** qo'shamiz va **bir** qadam yuramiz"
            },
            {
              "kind": "text",
              "text": "Diqqat: biz eski ro'yxatni **tahrirlamayapmiz**. Yangisini yig'yapmiz. Shuning uchun uzunlik o'zgarishi bizga xalaqit bermaydi."
            },
            {
              "kind": "code",
              "code": "def merge(tokenlar, juftlik, yangi_id):\n    yangi = []\n    i = 0\n    while i < len(tokenlar):\n        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:\n            yangi.append(yangi_id)\n            i += 2\n        else:\n            yangi.append(tokenlar[i])\n            i += 1\n    return yangi",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "**Sakkiz qator. Kursdagi eng qiyin funksiya.** Har birini alohida ko'ramiz."
            },
            {
              "kind": "h3",
              "id": "parametrlar",
              "text": "Parametrlar"
            },
            {
              "kind": "bullets",
              "items": [
                "`tokenlar` — kirish ro'yxati, masalan `[98, 111, 108, 97, 108, 97, 114]`",
                "`juftlik` — nimani qidiramiz, masalan `(108, 97)`",
                "`yangi_id` — nima bilan almashtiramiz, masalan `256`"
              ]
            },
            {
              "kind": "h3",
              "id": "yangi-va-i-0",
              "text": "`yangi = []` va `i = 0`"
            },
            {
              "kind": "text",
              "text": "Bo'sh natija ro'yxati (Dars 03 naqshi) va ko'rsatkich. `i` — bu bizning \"barmog'imiz\", ro'yxat bo'ylab suriladi."
            },
            {
              "kind": "h3",
              "id": "while-i-len-tokenlar",
              "text": "`while i < len(tokenlar):`"
            },
            {
              "kind": "text",
              "text": "Barmoq ro'yxat ichida turgan ekan — davom etamiz."
            },
            {
              "kind": "note",
              "tone": "warn",
              "text": "`len(tokenlar)` har aylanishda qayta hisoblanadi, lekin `tokenlar` o'zgarmaydi — biz uni tahrirlamayapmiz. Shuning uchun bu xavfsiz."
            },
            {
              "kind": "h3",
              "id": "shart-uchta-qism",
              "text": "Shart — uchta qism"
            },
            {
              "kind": "pre",
              "text": "if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:"
            },
            {
              "kind": "text",
              "text": "Uchta shart `and` bilan bog'langan. **Hammasi rost bo'lishi kerak:**"
            },
            {
              "kind": "steps",
              "items": [
                "`i < len(tokenlar) - 1` — oldinda yana kamida bitta token bormi?",
                "`tokenlar[i] == juftlik[0]` — hozirgi token juftlikning birinchi yarmimi?",
                "`tokenlar[i + 1] == juftlik[1]` — keyingisi ikkinchi yarmimi?"
              ]
            },
            {
              "kind": "h3",
              "id": "ha-bolsa",
              "text": "Ha bo'lsa"
            },
            {
              "kind": "pre",
              "text": "yangi.append(yangi_id)\ni += 2"
            },
            {
              "kind": "text",
              "text": "Yangi tokenni qo'yamiz va **ikkita** tokendan sakrab o'tamiz — ikkalasi ham iste'mol qilindi."
            },
            {
              "kind": "h3",
              "id": "yoq-bolsa",
              "text": "Yo'q bo'lsa"
            },
            {
              "kind": "pre",
              "text": "yangi.append(tokenlar[i])\ni += 1"
            },
            {
              "kind": "text",
              "text": "Tokenni o'zgartirmasdan ko'chiramiz va **bitta** qadam yuramiz."
            },
            {
              "kind": "media",
              "id": "k2",
              "title": "merge ichidan"
            }
          ]
        },
        {
          "id": "4-sinaymiz",
          "title": "4. Sinaymiz",
          "blocks": [
            {
              "kind": "code",
              "code": "print(merge([1, 2, 1, 2, 1], (1, 2), 256))\nprint(merge([1, 1, 1],       (1, 1), 256))\nprint(merge([1, 1, 1, 1],    (1, 1), 256))\nprint(merge([1, 2, 3],       (9, 9), 256))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[256, 256, 1]\n[256, 1]\n[256, 256]\n[1, 2, 3]"
            },
            {
              "kind": "text",
              "text": "Har birini tekshiring:"
            },
            {
              "kind": "bullets",
              "items": [
                "`[1, 2, 1, 2, 1]` → ikkita juftlik topildi, oxirgi `1` yolg'iz qoldi ✓",
                "`[1, 1, 1]` → **bitta** birlashtirish, uchinchi `1` qoldi ✓",
                "`[1, 1, 1, 1]` → ikkita birlashtirish ✓",
                "`[1, 2, 3]` da `(9, 9)` yo'q → ro'yxat **o'zgarmasdan** qaytdi ✓"
              ]
            },
            {
              "kind": "text",
              "text": "**Ikkinchi va uchinchi natijaga alohida qarang.** Dars 08 da aynan shuni bashorat qilgan edik:"
            },
            {
              "kind": "table",
              "head": [
                "Ro'yxat",
                "`get_stats` sanadi",
                "`merge` bajardi"
              ],
              "rows": [
                [
                  "`[1, 1, 1]`",
                  "2",
                  "**1**"
                ],
                [
                  "`[1, 1, 1, 1]`",
                  "3",
                  "**2**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Sanoq va birlashtirish farq qildi — va `merge` **to'g'ri** ishladi. Sababi: `i += 2`. Birinchi juftlikni olganimizda ikkala `1` ni ham iste'mol qildik, shuning uchun ikkinchi (ustma-ust tushgan) juftlik umuman ko'rilmadi."
            },
            {
              "kind": "text",
              "text": "**Ustma-ust tushish muammosi `i += 2` bilan hal bo'ldi.** Bitta qator."
            },
            {
              "kind": "h3",
              "id": "bolalar-da",
              "text": "`bolalar` da"
            },
            {
              "kind": "code",
              "code": "t = kodla(\"bolalar\")\nprint(\"oldin :\", t, len(t))\n\nt2 = merge(t, (108, 97), 256)\nprint(\"keyin :\", t2, len(t2))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "oldin : [98, 111, 108, 97, 108, 97, 114] 7\nkeyin : [98, 111, 256, 256, 114] 5"
            },
            {
              "kind": "text",
              "text": "**7 token → 5 token.** Ikkita `la` bitta tokenga aylandi."
            }
          ]
        },
        {
          "id": "5-chegara-tekshiruvi-va-and-ning-qisqa-tutashuvi",
          "title": "5. Chegara tekshiruvi va `and` ning qisqa tutashuvi",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi shartning **birinchi** qismiga qaytamiz:"
            },
            {
              "kind": "code",
              "code": "i < len(tokenlar) - 1",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Nima uchun kerak? Uni **olib tashlab** ko'ramiz:"
            },
            {
              "kind": "code",
              "code": "def merge_xato(tokenlar, juftlik, yangi_id):\n    yangi = []\n    i = 0\n    while i < len(tokenlar):\n        if tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:\n            yangi.append(yangi_id)\n            i += 2\n        else:\n            yangi.append(tokenlar[i])\n            i += 1\n    return yangi",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "To'rtta kirishda sinaymiz:"
            },
            {
              "kind": "code",
              "code": "print(merge_xato([98, 111, 108, 97], (108, 97), 256))\nprint(merge_xato([1, 2, 3],          (9, 9),    256))\nprint(merge_xato([1, 2, 108],        (108, 97), 256))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[98, 111, 256]\n[1, 2, 3]\nIndexError: list index out of range",
              "error": true
            },
            {
              "kind": "text",
              "text": "**To'xtang va buni diqqat bilan qarang.**"
            },
            {
              "kind": "text",
              "text": "Birinchi ikkitasi **ishladi**. Uchinchisi **qulab tushdi**. Nima uchun?"
            },
            {
              "kind": "h3",
              "id": "and-qisqa-tutashuvi",
              "text": "`and` qisqa tutashuvi"
            },
            {
              "kind": "text",
              "text": "Python `A and B` ni tekshirganda: agar `A` **yolg'on** bo'lsa, `B` ni **umuman hisoblamaydi**. Natija baribir yolg'on bo'ladi, demak tekshirishning ma'nosi yo'q."
            },
            {
              "kind": "text",
              "text": "Bu **qisqa tutashuv** (short-circuit) deb ataladi."
            },
            {
              "kind": "text",
              "text": "Endi uchala holatni ko'ring, oxirgi element ustida:"
            },
            {
              "kind": "table",
              "head": [
                "Ro'yxat",
                "Oxirgi element",
                "`tokenlar[i] == 108`",
                "`tokenlar[i+1]` hisoblanadimi?"
              ],
              "rows": [
                [
                  "`[98, 111, 108, 97]`",
                  "`97`",
                  "`97 == 108` → **yolg'on**",
                  "yo'q — qutuldik"
                ],
                [
                  "`[1, 2, 3]`",
                  "`3`",
                  "`3 == 108` → **yolg'on**",
                  "yo'q — qutuldik"
                ],
                [
                  "`[1, 2, 108]`",
                  "`108`",
                  "`108 == 108` → **rost**",
                  "**ha → IndexError**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "**Xato faqat oxirgi element juftlikning birinchi yarmiga teng bo'lganda chiqadi.**"
            },
            {
              "kind": "text",
              "text": "Bu — dasturlashdagi eng yomon turdagi xato. U:"
            },
            {
              "kind": "bullets",
              "items": [
                "**ko'p hollarda chiqmaydi** — siz kodni sinab ko'rasiz, ishlaydi, ishonasiz",
                "**tasodifiy ma'lumotda chiqadi** — million tokenli korpusda albatta chiqadi",
                "**sizni chalg'itadi** — \"kecha ishlagan edi-ku\""
              ]
            },
            {
              "kind": "text",
              "text": "`i < len(tokenlar) - 1` shartini **birinchi** qo'yish uni butunlay oldini oladi: agar oldinda token qolmagan bo'lsa, qolgan ikkita shart umuman tekshirilmaydi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Qoida:** `and` bilan bog'langan shartlarda **himoya shartini birinchi qo'ying.** Tartib muhim. `A and B` va `B and A` bir xil natija beradi, lekin bittasi qulab tushishi mumkin."
            }
          ]
        },
        {
          "id": "6-ikkita-birlashtirish-ketma-ket",
          "title": "6. Ikkita birlashtirish ketma-ket",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi eng qiziq qismi. Bitta birlashtirish qilib, keyin **qaytadan sanaymiz** va yana birlashtiramiz."
            },
            {
              "kind": "code",
              "code": "matn = \"bolalar kitoblarni oʻqishdi va daftarlarga yozishdi\"\nt = kodla(matn)\nprint(\"boshlangʻich:\", len(t), \"token\")\n\n# --- 1-birlashtirish ---\nstats = get_stats(t)\neng = max(stats, key=stats.get)\nprint(\"1-juftlik:\", eng, repr(dekodla(list(eng))), stats[eng], \"marta\")\nt = merge(t, eng, 256)\nprint(\"256 dan keyin:\", len(t), \"token\")\n\n# --- 2-birlashtirish ---\nstats = get_stats(t)\neng2 = max(stats, key=stats.get)\nprint(\"2-juftlik:\", eng2, stats[eng2], \"marta\")\nt = merge(t, eng2, 257)\nprint(\"257 dan keyin:\", len(t), \"token\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "boshlangʻich: 52 token\n1-juftlik: (108, 97) 'la' 4 marta\n256 dan keyin: 48 token\n2-juftlik: (256, 114) 3 marta\n257 dan keyin: 45 token"
            },
            {
              "kind": "text",
              "text": "52 → 48 → 45. Har birlashtirish matnni qisqartiryapti."
            },
            {
              "kind": "text",
              "text": "**Endi ikkinchi juftlikka qarang: `(256, 114)`.**"
            },
            {
              "kind": "text",
              "text": "`256` — bu bizning **yangi** tokenimiz, `la`. `114` — bu `r`."
            },
            {
              "kind": "text",
              "text": "Ya'ni algoritm `la` va `r` ni birlashtirmoqchi. Natija nima bo'ladi?"
            },
            {
              "kind": "code",
              "code": "vocab = {}\nfor x in range(256):\n    vocab[x] = bytes([x])\n\nvocab[256] = vocab[108] + vocab[97]\nvocab[257] = vocab[eng2[0]] + vocab[eng2[1]]\n\nprint(\"256 =\", vocab[256])\nprint(\"257 =\", vocab[257])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "256 = b'la'\n257 = b'lar'"
            }
          ]
        },
        {
          "id": "7-toxtang-nima-bolganini-koring",
          "title": "7. To'xtang — nima bo'lganini ko'ring",
          "blocks": [
            {
              "kind": "text",
              "text": "Algoritm ikki qadamda **`lar`** qo'shimchasini yasadi:"
            },
            {
              "kind": "pre",
              "text": "1-qadam:  l + a    →  la     (256)\n2-qadam:  la + r   →  lar    (257)"
            },
            {
              "kind": "text",
              "text": "Va e'tibor bering: ikkinchi qadam **birinchisining ustiga qurildi**. `lar` ni yasash uchun algoritm `la` ni qayta yasashi kerak bo'lmadi — u allaqachon bitta token edi."
            },
            {
              "kind": "text",
              "text": "**Mana shu — BPE ning kuchi.** Har bir yangi token oldingilarining ustiga quriladi:"
            },
            {
              "kind": "pre",
              "text": "l, a, r  →  la  →  lar  →  lari  →  larida  ..."
            },
            {
              "kind": "text",
              "text": "Uchta harfdan boshlab, algoritm butun qo'shimchani, keyin qo'shimchalar zanjirini yasay oladi. Va buning uchun unga hech kim o'zbek grammatikasini o'rgatmadi — Dars 08 dagi kabi, u faqat sanaydi."
            },
            {
              "kind": "text",
              "text": "**16 128 marta takrorlansa**, sizning lug'atingizda `lar`, `lari`, `larida`, `bolalar`, `kitoblar` kabi tokenlar paydo bo'ladi. Aynan shuning uchun `fertility` 8.938 dan 1.749 gacha tushadi."
            },
            {
              "kind": "media",
              "id": "k3",
              "title": "lar yasaldi"
            }
          ]
        },
        {
          "id": "8-aaaa-sinovi",
          "title": "8. `aaaa` sinovi",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 08 da va'da qilgan edim. Sinaymiz:"
            },
            {
              "kind": "code",
              "code": "print(kodla(\"aaaa\"))\nprint(merge(kodla(\"aaaa\"), (97, 97), 256))\nprint(merge([97, 97, 97, 97, 97],     (97, 97), 256))\nprint(merge([97, 97, 97, 97, 97, 97], (97, 97), 256))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[97, 97, 97, 97]\n[256, 256]\n[256, 256, 97]\n[256, 256, 256]"
            },
            {
              "kind": "bullets",
              "items": [
                "4 ta `a` → 2 ta yangi token, hech narsa qolmadi",
                "5 ta `a` → 2 ta yangi token + 1 ta yolg'iz `a`",
                "6 ta `a` → 3 ta yangi token"
              ]
            },
            {
              "kind": "text",
              "text": "Dars 08 dagi formula: `n` ta bir xil element → `n // 2` ta birlashtirish. 4//2 = 2 ✓, 5//2 = 2 ✓, 6//2 = 3 ✓."
            },
            {
              "kind": "text",
              "text": "**`merge` ustma-ust tushishni to'g'ri hal qildi**, va buning uchun hech qanday maxsus kod yozilmadi. `i += 2` ning o'zi yetdi."
            }
          ]
        },
        {
          "id": "9-chekka-holatlar",
          "title": "9. Chekka holatlar",
          "blocks": [
            {
              "kind": "code",
              "code": "print(merge([],  (1, 2), 256))\nprint(merge([5], (1, 2), 256))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[]\n[5]"
            },
            {
              "kind": "text",
              "text": "Bo'sh ro'yxat → bo'sh natija. Bitta element → o'zgarmasdan qaytadi (`while` bir marta aylanadi, shart yolg'on bo'ladi, `else` ishlaydi)."
            },
            {
              "kind": "text",
              "text": "Yana bir marta: **hech qanday `if len(...) == 0` tekshiruvi yozmadik.** Yaxshi yozilgan tsikl chekka holatlarni o'zi to'g'ri hal qiladi."
            }
          ]
        },
        {
          "id": "10-muammo",
          "title": "10. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda endi ikkita funksiya bor:"
            },
            {
              "kind": "bullets",
              "items": [
                "`get_stats` — eng ko'p uchraydigan juftlikni topadi",
                "`merge` — uni almashtiradi"
              ]
            },
            {
              "kind": "text",
              "text": "Va biz ularni **qo'lda** ikki marta ishlatdik: 256, keyin 257."
            },
            {
              "kind": "text",
              "text": "Lug'atni 16 384 gacha yetkazish uchun buni **16 128 marta** takrorlash kerak. Qo'lda yozib chiqib bo'lmaydi."
            },
            {
              "kind": "text",
              "text": "Kerak bo'lgan narsa: tsikl ichida `get_stats` va `merge` ni navbatma-navbat chaqirish, va har safar yangi token raqamini bittaga oshirish. Shu bilan birga qaysi juftlik qaysi raqamga aylanganini **eslab qolish** kerak — aks holda keyin dekodlab bo'lmaydi."
            },
            {
              "kind": "text",
              "text": "Bu keyingi darsning mavzusi."
            }
          ]
        },
        {
          "id": "11-toliq-kod",
          "title": "11. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "def kodla(matn):\n    return list(matn.encode(\"utf-8\"))\n\n\ndef dekodla(raqamlar):\n    return bytes(raqamlar).decode(\"utf-8\")\n\n\ndef get_stats(tokenlar):\n    hisob = {}\n    for juftlik in zip(tokenlar, tokenlar[1:]):\n        hisob[juftlik] = hisob.get(juftlik, 0) + 1\n    return hisob\n\n\ndef merge(tokenlar, juftlik, yangi_id):\n    yangi = []\n    i = 0\n    while i < len(tokenlar):\n        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:\n            yangi.append(yangi_id)\n            i += 2\n        else:\n            yangi.append(tokenlar[i])\n            i += 1\n    return yangi\n\n\n# ---- Sinov ----\nprint(merge([1, 2, 1, 2, 1], (1, 2), 256))\nprint(merge([1, 1, 1],       (1, 1), 256))\nprint(merge([1, 1, 1, 1],    (1, 1), 256))\nprint(merge([1, 2, 3],       (9, 9), 256))\n\n# ---- Ikkita birlashtirish ----\nmatn = \"bolalar kitoblarni oʻqishdi va daftarlarga yozishdi\"\nt = kodla(matn)\nvocab = {}\nfor x in range(256):\n    vocab[x] = bytes([x])\n\nprint(\"boshlangʻich:\", len(t), \"token\")\n\nstats = get_stats(t)\neng = max(stats, key=stats.get)\nt = merge(t, eng, 256)\nvocab[256] = vocab[eng[0]] + vocab[eng[1]]\nprint(\"256 =\", vocab[256], \"|\", len(t), \"token\")\n\nstats = get_stats(t)\neng2 = max(stats, key=stats.get)\nt = merge(t, eng2, 257)\nvocab[257] = vocab[eng2[0]] + vocab[eng2[1]]\nprint(\"257 =\", vocab[257], \"|\", len(t), \"token\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[256, 256, 1]\n[256, 1]\n[256, 256]\n[1, 2, 3]\nboshlangʻich: 52 token\n256 = b'la' | 48 token\n257 = b'lar' | 45 token",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "12-ozingiz-yozing",
          "title": "12. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "# merge funksiyasini toʻldiring\n\ndef merge(tokenlar, juftlik, yangi_id):\n    yangi = ___                      # boʻsh roʻyxat\n    i = ___                          # boshlangʻich koʻrsatkich\n    while i ___ len(tokenlar):\n        if i < len(tokenlar) ___ 1 and tokenlar[i] == juftlik[___] and tokenlar[i + 1] == juftlik[___]:\n            yangi.append(___)        # yangi tokenni qoʻy\n            i += ___                 # ikkita tokendan sakra\n        else:\n            yangi.append(tokenlar[___])\n            i += ___\n    return ___\n\n# Sinov — bu natijalarni olishingiz kerak:\nprint(merge([1, 1, 1], (1, 1), 256))      # [256, 1]\nprint(merge([5, 6, 5, 6], (5, 6), 99))    # [99, 99]",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "def merge(tokenlar, juftlik, yangi_id):\n    yangi = []\n    i = 0\n    while i < len(tokenlar):\n        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:\n            yangi.append(yangi_id)\n            i += 2\n        else:\n            yangi.append(tokenlar[i])\n            i += 1\n    return yangi",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "text",
                  "text": "Eng ko'p xato qilinadigan uchta joy:"
                },
                {
                  "kind": "steps",
                  "items": [
                    "`i += 2` o'rniga `i += 1` — natijada ustma-ust tushish xatosi chiqadi va `[1, 1, 1]` → `[256, 256]` bo'ladi (noto'g'ri, chunki uchta `1` dan ikkita juftlik yasab bo'lmaydi).",
                    "`juftlik[0]` va `juftlik[1]` ni almashtirib yuborish — juftlik teskari qidiriladi.",
                    "`- 1` ni unutish — 5-bo'limdagi yashirin `IndexError`."
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "13-mashqlar",
          "title": "13. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`merge([7, 8, 9], (7, 8), 100)` nima qaytaradi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "[100, 9]"
                  },
                  {
                    "kind": "text",
                    "text": "`i = 0`: `7` va `8` mos keldi → `100` qo'yiladi, `i` 2 ga aylanadi. `i = 2`: `2 < 2` yolg'on → `else` → `9` ko'chiriladi."
                  },
                  {
                    "kind": "text",
                    "text": "3 ta token → 2 ta token."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu ikkisi nima uchun har xil natija beradi?"
                },
                {
                  "kind": "code",
                  "code": "print(merge([1, 2, 1, 2], (1, 2), 9))\nprint(merge([1, 2, 1, 2], (2, 1), 9))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "[9, 9]\n[1, 9, 2]"
                  },
                  {
                    "kind": "text",
                    "text": "Birinchisi `(1, 2)` ni qidiradi — u ikki marta uchraydi, ikkalasi ham birlashtiriladi."
                  },
                  {
                    "kind": "text",
                    "text": "Ikkinchisi `(2, 1)` ni qidiradi — u faqat **o'rtada** bir marta uchraydi (2-manzil va 3-manzil orasida... aniqrog'i 1-manzildagi `2` va 2-manzildagi `1`). Natijada chetdagi `1` va `2` yolg'iz qoladi."
                  },
                  {
                    "kind": "text",
                    "text": "**Juftlikdagi tartib muhim.** `(1, 2)` va `(2, 1)` — ikki xil juftlik. Shuning uchun Dars 03 da kortej kerak edi: u tartibni saqlaydi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`merge` ni shunday o'zgartiringki, u `i += 2` o'rniga `i += 1` qilsin. `[1, 1, 1]` da nima chiqadi va nima uchun bu noto'g'ri?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "def merge_buzuq(tokenlar, juftlik, yangi_id):\n    yangi = []\n    i = 0\n    while i < len(tokenlar):\n        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:\n            yangi.append(yangi_id)\n            i += 1                      # ← xato: 2 oʻrniga 1\n        else:\n            yangi.append(tokenlar[i])\n            i += 1\n    return yangi\n\n\nprint(merge_buzuq([1, 1, 1], (1, 1), 256))   # [256, 256, 1]",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "**Noto'g'ri.** Uchta `1` dan ikkita juftlik yasab bo'lmaydi — o'rtadagi `1` ikki marta ishlatildi."
                  },
                  {
                    "kind": "text",
                    "text": "Buni tekshirish oson: birlashtirilgan tokenlarni qaytadan ochsak, `[256, 256, 1]` → `1,1` + `1,1` + `1` = **beshta** `1`. Boshida esa uchta edi."
                  },
                  {
                    "kind": "text",
                    "text": "**Ma'lumot yaratildi.** Bu round-trip ni buzadi: `dekodla(kodla(x))` endi `x` ga teng bo'lmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "`i += 2` shuning uchun kerak: birlashtirilgan ikkita token **iste'mol qilinadi**, ular keyingi juftlikda qatnasha olmaydi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`merge` chaqirilgandan keyin **asl** ro'yxat o'zgaradimi?"
                },
                {
                  "kind": "code",
                  "code": "t = [1, 2, 3]\nnatija = merge(t, (1, 2), 9)\nprint(t)\nprint(natija)",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "[1, 2, 3]\n[9, 3]"
                  },
                  {
                    "kind": "text",
                    "text": "**Asl ro'yxat o'zgarmaydi.** `merge` yangi ro'yxat yasaydi va uni qaytaradi."
                  },
                  {
                    "kind": "text",
                    "text": "Bu ataylab shunday: agar u asl ro'yxatni tahrirlaganida, 1-bo'limdagi muammo qaytardi."
                  },
                  {
                    "kind": "text",
                    "text": "Shuning uchun uni ishlatganda natijani **saqlab olish kerak**:"
                  },
                  {
                    "kind": "code",
                    "code": "t = merge(t, juftlik, 256)     # ✓ toʻgʻri\nmerge(t, juftlik, 256)         # ✗ natija yoʻqoladi",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Dars 02 dagi `.replace()` tuzog'i bilan bir xil naqsh."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Uchta birlashtirishni ketma-ket bajaring va har safar `vocab` ga yangi tokenni qo'shing. Uchinchi token nima bo'ladi?"
                },
                {
                  "kind": "code",
                  "code": "matn = \"bolalar kitoblarni oʻqishdi va daftarlarga yozishdi\"",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "t = kodla(matn)\nvocab = {}\nfor x in range(256):\n    vocab[x] = bytes([x])\n\nfor yangi_id in [256, 257, 258]:\n    stats = get_stats(t)\n    eng = max(stats, key=stats.get)\n    t = merge(t, eng, yangi_id)\n    vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n    print(yangi_id, \"=\", vocab[yangi_id], \"|\", len(t), \"token\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "256 = b'la' | 48 token\n257 = b'lar' | 45 token\n258 = b'i ' | 43 token"
                  },
                  {
                    "kind": "text",
                    "text": "Uchinchisi — **`i ` (harf va boʻshliq)**. Bu soʻz oxiri: `kitoblarni`, `oʻqishdi`, `yozishdi` — hammasi `i` bilan tugaydi va keyin boʻshliq keladi."
                  },
                  {
                    "kind": "text",
                    "text": "Bu qiziq va biroz xavotirli. Algoritm **soʻz chegarasini** token ichiga kiritdi — `i` va boʻshliq endi bitta narsa. Dars 13 da bu muammoga aylanadi va biz uni hal qilamiz."
                  },
                  {
                    "kind": "text",
                    "text": "**Va e'tibor bering: bu kod endi tsikl ichida.** Uchta birlashtirishni qo'lda yozmadik — `for yangi_id in [256, 257, 258]` bilan avtomatlashtirdik."
                  },
                  {
                    "kind": "text",
                    "text": "Keyingi darsda aynan shu tsiklni 16 128 gacha kengaytiramiz."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "14-xulosa",
          "title": "14. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "`for` tsikli uzunligi o'zgaradigan ro'yxat uchun **yaramaydi** — u aylanishlar sonini boshida hal qiladi.",
                "`while shart:` — siz boshqaradigan tsikl. Har doim o'zingizdan so'rang: *shart qachon yolg'on bo'ladi?*",
                "`merge` eski ro'yxatni tahrirlamaydi — **yangisini yig'adi**.",
                "`i += 2` — birlashtirilgan ikkita token iste'mol qilinadi. Ustma-ust tushish muammosi shu bitta qator bilan hal bo'ladi.",
                "`i < len(tokenlar) - 1` — chegara himoyasi. `and` qisqa tutashuvi tufayli u **birinchi** turishi shart.",
                "Har bir yangi token oldingilarining ustiga quriladi: `l + a → la`, keyin `la + r → lar`."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Ikkita funksiya tayyor. Endi ularni tsiklga solamiz."
            },
            {
              "kind": "text",
              "text": "**Dars 10 — Trening tsikli.** `get_stats` va `merge` ni yuzlab marta navbatma-navbat chaqiramiz, `merges` jadvalini yig'amiz va lug'atning o'sishini kuzatamiz."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *birlashtirishlar tartibini eslab qolish nima uchun shart?* Javob Dars 12 da (`encode`) ochiladi, lekin jadvalni **hozir** to'g'ri yig'ish kerak — aks holda keyin hamma narsa buziladi."
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–08. `get_stats`, ro'yxat, `if`, funksiya"
    },
    {
      "id": "dars-10",
      "n": 10,
      "title": "Trening tsikli",
      "subtitle": "",
      "minutes": 50,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "bullets",
              "items": [
                "**yozasiz** BPE trening tsiklini — tokenizatoringiz shu yerda \"o'qiydi\";",
                "**tushunasiz** `merges` jadvali nima uchun **butun tokenizator** ekanini;",
                "**ko'rasiz** o'zbek qo'shimchalari qadam-baqadam qurilishini — 20 ta birlashtirishda;",
                "**kashf qilasiz** algoritm `ʻ` belgisini o'zi qayta yig'ishini;",
                "**ko'rasiz** chiroyli raqam qanday qilib yolg'on gapirishi mumkinligini."
              ]
            },
            {
              "kind": "text",
              "text": "Oxirgi punkt — bu darsning eng muhim qismi."
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 09 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Birlashtirishlar **tartibini** eslab qolish nima uchun shart?"
            },
            {
              "kind": "text",
              "text": "Javob Dars 09 dagi natijada turibdi. Ikkinchi birlashtirish shunday edi:"
            },
            {
              "kind": "pre",
              "text": "257 = (256, 114)"
            },
            {
              "kind": "text",
              "text": "Diqqat qiling: `256` — bu **bizning yangi tokenimiz**. U birinchi birlashtirishda yasalgan edi."
            },
            {
              "kind": "text",
              "text": "Ya'ni 257-tokenni yasash uchun 256-token **allaqachon mavjud bo'lishi shart**. Agar tartibni almashtirsangiz — 257 ni birinchi qilsangiz — `(256, 114)` juftligini matnda umuman topa olmaysiz, chunki hali `256` degan token yo'q."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Birlashtirishlar — bu ro'yxat emas, bu zanjir.** Har bir halqa oldingisiga tayanadi."
            },
            {
              "kind": "text",
              "text": "Shuning uchun biz ularni **tartib bilan** saqlashimiz kerak. Bu jadvalning nomi — **`merges`**, va u aslida butun tokenizatoringiz."
            }
          ]
        },
        {
          "id": "2-merges-tokenizatorning-butun-bilimi",
          "title": "2. `merges` — tokenizatorning butun bilimi",
          "blocks": [
            {
              "kind": "text",
              "text": "Tokenizator o'qiganidan keyin nima saqlanadi? Modelning vaznlari emas, matn emas. Faqat bitta jadval:"
            },
            {
              "kind": "pre",
              "text": "(108, 97)  → 256\n(256, 114) → 257\n(115, 104) → 258\n..."
            },
            {
              "kind": "text",
              "text": "Chapda — juftlik, o'ngda — u qaysi tokenga aylanadi."
            },
            {
              "kind": "text",
              "text": "**Shu jadval bo'lsa, tokenizator to'liq tiklanadi:**"
            },
            {
              "kind": "bullets",
              "items": [
                "yangi matnni kodlash uchun — juftliklarni shu tartibda qidirib almashtirasiz (Dars 12)",
                "tokenlarni matnga qaytarish uchun — jadvaldan `vocab` ni qurasiz (Dars 11)"
              ]
            },
            {
              "kind": "text",
              "text": "Sizning `uzbek-bpe-16k` tokenizatoringizda bu jadvalda **16 128 ta qator** bor. Faylning butun hajmi bir necha yuz kilobayt. **Butun tokenizator shu.**"
            },
            {
              "kind": "media",
              "id": "l1",
              "title": "Zanjir"
            }
          ]
        },
        {
          "id": "3-yangi-narsa-break",
          "title": "3. Yangi narsa: `break`",
          "blocks": [
            {
              "kind": "text",
              "text": "Tsiklni **erta to'xtatish** uchun:"
            },
            {
              "kind": "code",
              "code": "for i in range(10):\n    if i == 3:\n        break\n    print(i, end=\" \")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "0 1 2"
            },
            {
              "kind": "text",
              "text": "`break` — \"tsiklni hoziroq tugat\". Qolgan aylanishlar bajarilmaydi."
            },
            {
              "kind": "text",
              "text": "Bizga u nima uchun kerak? Chunki ba'zan **birlashtiradigan narsa qolmaydi**: matn juda qisqa bo'lsa yoki hamma juftlik allaqachon birlashtirilgan bo'lsa. Unday holda tsiklni davom ettirishning ma'nosi yo'q."
            }
          ]
        },
        {
          "id": "4-trening-tsikli",
          "title": "4. Trening tsikli",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi hammasini birlashtiramiz. Bu funksiya Dars 09 dagi qo'lda qilgan ishimizni avtomatlashtiradi:"
            },
            {
              "kind": "code",
              "code": "jurnal = True\n\n\ndef train(matn, vocab_size):\n    tokenlar = kodla(matn)\n    merges = {}\n\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n\n    for yangi_id in range(256, vocab_size):\n        stats = get_stats(tokenlar)\n\n        if len(stats) == 0:\n            if jurnal:\n                print(\"  juftlik qolmadi, toʻxtadik\")\n            break\n\n        eng = max(stats, key=stats.get)\n        soni = stats[eng]\n\n        tokenlar = merge(tokenlar, eng, yangi_id)\n        merges[eng] = yangi_id\n        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n\n        if jurnal:\n            print(f\"  {yangi_id}: {eng} ({soni} marta) -> {vocab[yangi_id]!r}   | {len(tokenlar)} token\")\n\n    return merges, vocab, tokenlar",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "**Qatorma-qator:**"
            },
            {
              "kind": "table",
              "head": [
                "Qator",
                "Nima qiladi",
                "Qayerdan"
              ],
              "rows": [
                [
                  "`tokenlar = kodla(matn)`",
                  "matnni baytlarga",
                  "Dars 06"
                ],
                [
                  "`merges = {}`",
                  "bo'sh jadval",
                  "Dars 04"
                ],
                [
                  "`for i in range(256): vocab[i] = bytes([i])`",
                  "256 ta boshlang'ich token",
                  "Dars 07"
                ],
                [
                  "`for yangi_id in range(256, vocab_size)`",
                  "**256 dan boshlanadi**",
                  "Dars 03"
                ],
                [
                  "`stats = get_stats(tokenlar)`",
                  "juftliklarni sana",
                  "Dars 08"
                ],
                [
                  "`if len(stats) == 0: break`",
                  "qoladigan narsa yo'q — to'xta",
                  "shu dars"
                ],
                [
                  "`eng = max(stats, key=stats.get)`",
                  "eng ko'p uchraganini top",
                  "Dars 08"
                ],
                [
                  "`tokenlar = merge(...)`",
                  "almashtir",
                  "Dars 09"
                ],
                [
                  "`merges[eng] = yangi_id`",
                  "**jadvalga yoz**",
                  "shu dars"
                ],
                [
                  "`vocab[yangi_id] = ... + ...`",
                  "yangi token nimadan iborat",
                  "Dars 09"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "**Yangi kod — atigi uchta qator.** Qolgani oldingi olti darsdan."
            },
            {
              "kind": "text",
              "text": "`jurnal` — har bir birlashtirishni ekranga chiqarish kerakmi? Hozir `True`: algoritm nima qilayotganini koʻrmoqchimiz."
            },
            {
              "kind": "h3",
              "id": "range-256-vocab-size-nima-uchun-256-dan",
              "text": "`range(256, vocab_size)` — nima uchun 256 dan?"
            },
            {
              "kind": "text",
              "text": "Chunki 0–255 **allaqachon band** (baytlar, Dars 06). Birinchi bo'sh raqam — 256."
            },
            {
              "kind": "text",
              "text": "Agar `vocab_size = 276` desangiz, `range(256, 276)` → 20 ta aylanish, ya'ni **20 ta birlashtirish**. Lug'at 256 dan 276 gacha o'sadi."
            },
            {
              "kind": "text",
              "text": "Umumiy formula: **birlashtirishlar soni = `vocab_size` − 256.**"
            },
            {
              "kind": "text",
              "text": "Sizning tokenizatoringizda: 16 384 − 256 = **16 128 ta birlashtirish**."
            }
          ]
        },
        {
          "id": "5-ishga-tushiramiz",
          "title": "5. Ishga tushiramiz",
          "blocks": [
            {
              "kind": "text",
              "text": "O'quv matnimiz (etti qatorlik o'zbekcha matn):"
            },
            {
              "kind": "code",
              "code": "matn = \"\"\"Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi.\nOʻqituvchi darsni tushuntirdi. Oʻquvchilar savollarga javob berishdi.\nKechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.\nOtalar ishdan kelishdi. Hamma birga dasturxonga oʻtirishdi.\nErtalab bolalar yana maktabga borishdi. Ular yangi darslarni oʻrganishdi.\nKitoblarda qiziqarli hikoyalar bor edi. Bolalar hikoyalarni yoqtirishdi.\nOʻqituvchilar savollar berishdi. Oʻquvchilar javoblarni yozishdi.\"\"\"\n\nprint(\"belgilar:\", len(matn), \"| soʻzlar:\", len(matn.split()), \"| tokenlar:\", len(kodla(matn)))\n\nmerges, vocab, tokenlar = train(matn, 276)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "belgilar: 480 | soʻzlar: 53 | tokenlar: 487\n  256: (108, 97) (26 marta) -> b'la'   | 461 token\n  257: (256, 114) (20 marta) -> b'lar'   | 441 token\n  258: (115, 104) (15 marta) -> b'sh'   | 426 token\n  259: (100, 105) (15 marta) -> b'di'   | 411 token\n  260: (259, 46) (14 marta) -> b'di.'   | 397 token\n  261: (257, 32) (13 marta) -> b'lar '   | 384 token\n  262: (105, 258) (13 marta) -> b'ish'   | 371 token\n  263: (97, 32) (11 marta) -> b'a '   | 360 token\n  264: (262, 260) (11 marta) -> b'ishdi.'   | 349 token\n  265: (105, 32) (8 marta) -> b'i '   | 341 token\n  266: (103, 263) (7 marta) -> b'ga '   | 334 token\n  267: (202, 187) (7 marta) -> b'\\xca\\xbb'   | 327 token\n  268: (116, 97) (6 marta) -> b'ta'   | 321 token\n  269: (114, 264) (6 marta) -> b'rishdi.'   | 315 token\n  270: (98, 111) (5 marta) -> b'bo'   | 310 token\n  271: (110, 265) (5 marta) -> b'ni '   | 305 token\n  272: (267, 113) (5 marta) -> b'\\xca\\xbbq'   | 300 token\n  273: (100, 97) (5 marta) -> b'da'   | 295 token\n  274: (99, 104) (5 marta) -> b'ch'   | 290 token\n  275: (256, 261) (4 marta) -> b'lalar '   | 286 token"
            },
            {
              "kind": "text",
              "text": "**487 tokendan 286 tokenga.** 20 ta birlashtirish bilan."
            },
            {
              "kind": "text",
              "text": "Endi bu jurnalni **satr-satr o'qiymiz** — unda uchta muhim narsa yashiringan."
            }
          ]
        },
        {
          "id": "6-birinchi-kashfiyot-qoshimchalar-qadam-baqadam-quriladi",
          "title": "6. Birinchi kashfiyot: qo'shimchalar qadam-baqadam quriladi",
          "blocks": [
            {
              "kind": "text",
              "text": "O'ng ustunni kuzating:"
            },
            {
              "kind": "pre",
              "text": "256: la\n257: lar        ← la + r\n261: \"lar \"     ← lar + boʻshliq\n275: \"lalar \"   ← la + \"lar \""
            },
            {
              "kind": "pre",
              "text": "258: sh\n262: ish        ← i + sh\n264: ishdi.     ← ish + \"di.\"\n269: rishdi.    ← r + \"ishdi.\""
            },
            {
              "kind": "text",
              "text": "Har bir yangi token **oldingilaridan** qurilgan. Bu **inshoot**, ro'yxat emas."
            },
            {
              "kind": "text",
              "text": "To'liq zanjirni chizing:"
            },
            {
              "kind": "pre",
              "text": "l  a  →  la\nla r  →  lar\nlar ␣ →  \"lar \""
            },
            {
              "kind": "pre",
              "text": "d  i  →  di\ndi .  →  \"di.\"\ni  sh →  ish\nish \"di.\" → \"ishdi.\"\nr \"ishdi.\" → \"rishdi.\""
            },
            {
              "kind": "text",
              "text": "Uchta harfdan boshlab, algoritm **`-rishdi.`** ni yasadi — bu o'zbek fe'lining o'tgan zamon, ko'plik shakli va jumla oxiri, birgalikda."
            },
            {
              "kind": "text",
              "text": "Yana bir bor: hech kim unga grammatika o'rgatmagan. U 20 marta \"eng ko'p uchraydigan juftlikni birlashtir\" degan buyruqni bajardi, xolos."
            }
          ]
        },
        {
          "id": "7-ikkinchi-kashfiyot-qayta-yigildi",
          "title": "7. Ikkinchi kashfiyot: `ʻ` qayta yig'ildi",
          "blocks": [
            {
              "kind": "text",
              "text": "267-qatorga qarang:"
            },
            {
              "kind": "pre",
              "text": "267: (202, 187) (7 marta) -> b'\\xca\\xbb'"
            },
            {
              "kind": "text",
              "text": "`202` va `187` — tanish raqamlar. Dars 06 dan: bular **`ʻ` belgisining ikkita bayti**."
            },
            {
              "kind": "code",
              "code": "print(vocab[267].decode(\"utf-8\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "ʻ"
            },
            {
              "kind": "text",
              "text": "**To'xtang va nima bo'lganini o'ylang.**"
            },
            {
              "kind": "bullets",
              "items": [
                "Dars 05: Unicode'da yagona `oʻ` belgisi yo'q, shuning uchun `ʻ` alohida belgi (699).",
                "Dars 06: UTF-8 uni ikkita baytga bo'ldi — 202 va 187.",
                "Dars 07: bizning tokenizatorimiz uchun `ʻ` **ikkita alohida token** edi.",
                "**Dars 10: BPE ularni qaytadan bitta tokenga yig'di.**"
              ]
            },
            {
              "kind": "text",
              "text": "Algoritm buni nima uchun qildi? Chunki 202 va 187 matnda **har doim birga** uchraydi — 7 marta ketma-ket. Boshqa hech qanday kombinatsiyada emas."
            },
            {
              "kind": "text",
              "text": "Statistika ularning ajralmas ekanini **o'zi payqadi**. Va keyingi qadamda (272-token) u `ʻ` va `q` ni birlashtirib, `ʻq` ni yasadi — `oʻqish`, `oʻqituvchi` so'zlarining o'zagiga yaqinlashib."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu — UTF-8 bo'lgan zararni BPE ning **qisman tuzatishi**. To'liq emas: `ʻ` baribir bitta token yeydi, va uni yasash uchun lug'atdan joy ketdi. Lekin keyingi safar `ʻ` uchrasa, u ikkita emas, bitta token bo'ladi."
            },
            {
              "kind": "media",
              "id": "l2",
              "title": "ʻ qayta yigʻildi"
            }
          ]
        },
        {
          "id": "8-siqilishni-olchaymiz",
          "title": "8. Siqilishni o'lchaymiz",
          "blocks": [
            {
              "kind": "code",
              "code": "w = len(matn.split())\nprint(\"boshlangʻich:\", 487, \"token | fertility:\", round(487 / w, 3))\nprint(\"oxirgi      :\", len(tokenlar), \"token | fertility:\", round(len(tokenlar) / w, 3))\nprint(\"siqilish    :\", round(487 / len(tokenlar), 3), \"barobar\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "boshlangʻich: 487 token | fertility: 9.189\noxirgi      : 286 token | fertility: 5.396\nsiqilish    : 1.703 barobar"
            },
            {
              "kind": "text",
              "text": "Atigi 20 ta yangi token — va fertility 9.189 dan **5.396** ga tushdi."
            },
            {
              "kind": "text",
              "text": "Davom etsak nima bo'ladi? Jurnalni oʻchirib qoʻyamiz — endi u yuzlab qator boʻladi:"
            },
            {
              "kind": "code",
              "code": "jurnal = False\n\nprint(\"vocab_size | tokenlar | fertility\")\nfor vs in [256, 276, 306, 356, 406]:\n    _, v, t = train(matn, vs)\n    print(f\"{vs:10d} | {len(t):8d} | {len(t)/w:.3f}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "vocab_size | tokenlar | fertility\n       256 |      487 | 9.189\n       276 |      286 | 5.396\n       306 |      202 | 3.811\n       356 |      128 | 2.415\n       406 |       78 | 1.472"
            }
          ]
        },
        {
          "id": "9-uchinchi-kashfiyot-raqam-yolgon-gapiryapti",
          "title": "9. Uchinchi kashfiyot: raqam yolg'on gapiryapti",
          "blocks": [
            {
              "kind": "text",
              "text": "Oxirgi qatorga qarang: **fertility 1.472**."
            },
            {
              "kind": "text",
              "text": "Dars 01 dagi jadvalni eslang:"
            },
            {
              "kind": "table",
              "head": [
                "Tokenizator",
                "Fertility"
              ],
              "rows": [
                [
                  "**bizniki, 406 ta token**",
                  "**1.472**"
                ],
                [
                  "uzbek-bpe-16k",
                  "1.749"
                ],
                [
                  "GPT-4o",
                  "2.578"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Bizning o'yinchoq tokenizatorimiz — 406 ta token bilan, 40 barobar kichik lug'at bilan — haqiqiy tokenizatordan **yaxshiroq** natija ko'rsatyapti."
            },
            {
              "kind": "text",
              "text": "**Bu mumkinmi?** Yo'q. Tekshiramiz — u nimalarni o'rgangan ekan:"
            },
            {
              "kind": "code",
              "code": "_, v, t = train(matn, 356)\nprint(\"280 =\", repr(v[280]))\nprint(\"300 =\", repr(v[300]))\nprint(\"355 uzunligi:\", len(v[355]), \"bayt\")\nprint(\"355 =\", repr(v[355])[:100])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "280 = b'O\\xca\\xbbq'\n300 = b'maktabga borishdi. U'\n355 uzunligi: 106 bayt\n355 = b'Bolalar maktabga borishdi. Ular kitoblarni o\\xca\\xbbqishdi va daftarlarga yozishdi.\\nO\\xca\\xbbqitu"
            },
            {
              "kind": "text",
              "text": "**355-token — bu 106 baytlik matn bo'lagi.** Butun birinchi jumla va ikkinchisining yarmi. Bitta token sifatida."
            },
            {
              "kind": "text",
              "text": "300-token esa `maktabga borishdi. U` — ikki so'z, tinish belgisi va uchinchi so'zning boshi."
            },
            {
              "kind": "h3",
              "id": "nima-boldi",
              "text": "Nima bo'ldi"
            },
            {
              "kind": "text",
              "text": "Tokenizator matnni **yodlab oldi**."
            },
            {
              "kind": "text",
              "text": "Bizning matnimizda atigi 53 ta so'z bor. 150 ta birlashtirish uchun bu juda kam. Haqiqiy qo'shimchalar tugagandan keyin, algoritm boshqa takror topa olmadi — va butun jumlalarni birlashtirishga o'tdi, chunki ular ham \"takrorlanadi\" (aynan bir marta, matnning o'zida)."
            },
            {
              "kind": "text",
              "text": "**Fertility 1.472 — bu chiroyli raqam, va u yolg'on.**"
            },
            {
              "kind": "text",
              "text": "U faqat **shu matnda** to'g'ri. Yangi o'zbekcha jumla bering — 355-token u yerda hech qachon uchramaydi, va tokenizator butunlay foydasiz bo'ladi."
            },
            {
              "kind": "media",
              "id": "l3",
              "title": "Chiroyli yolgʻon"
            },
            {
              "kind": "h3",
              "id": "ikkita-xulosa",
              "text": "Ikkita xulosa"
            },
            {
              "kind": "text",
              "text": "**1. Ko'p ma'lumot kerak.** 53 ta so'zli matnda 150 ta birlashtirish qilib bo'lmaydi. Haqiqiy tokenizator uchun **millionlab** so'z kerak. Buni Dars 15 da ko'ramiz."
            },
            {
              "kind": "text",
              "text": "**2. Raqamga ishonmang — uni qayerda o'lchaganingizni so'rang.**"
            },
            {
              "kind": "text",
              "text": "Biz fertility ni **tokenizator o'qigan matnda** o'lchadik. Bu — imtihon savollarini oldindan ko'rib olgan talabaga baho qo'ygandek. Baho ajoyib chiqadi, lekin u hech narsani anglatmaydi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**To'g'ri usul: tokenizatorni bir matnda o'qiting, boshqa matnda o'lchang.** Bu qoida oddiy ko'rinadi, lekin uni buzish juda oson — va buzilganda natija **yaxshiroq** ko'rinadi, shuning uchun hech kim shubhalanmaydi. **Dars 17 to'liq shu mavzuga bag'ishlangan.** Hozircha shuni bilib qo'ying: bu sizning birinchi marta yolg'on raqam ko'rishingiz. Oxirgisi bo'lmaydi."
            }
          ]
        },
        {
          "id": "10-chekka-holat-juftlik-tugaganda",
          "title": "10. Chekka holat: juftlik tugaganda",
          "blocks": [
            {
              "kind": "code",
              "code": "jurnal = True\nmerges, vocab, tokenlar = train(\"aaaa\", 300)\njurnal = False\nprint(tokenlar)\nfor tid in range(256, len(vocab)):\n    print(tid, \"=\", vocab[tid])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  256: (97, 97) (3 marta) -> b'aa'   | 2 token\n  257: (256, 256) (1 marta) -> b'aaaa'   | 1 token\n  juftlik qolmadi, toʻxtadik\n[257]\n256 = b'aa'\n257 = b'aaaa'"
            },
            {
              "kind": "text",
              "text": "`vocab_size = 300` so'radik — 44 ta birlashtirish. Lekin atigi **ikkitasi** bo'ldi."
            },
            {
              "kind": "text",
              "text": "Uchinchisida matn bitta tokenga aylanib qolgan edi, `get_stats([257])` bo'sh lug'at qaytardi (Dars 08), va `break` ishladi."
            },
            {
              "kind": "text",
              "text": "**`break` bo'lmasa nima bo'lardi?** `max({})` — bo'sh lug'atdan eng kattasini topishga urinish — `ValueError` beradi va dastur qulab tushadi."
            }
          ]
        },
        {
          "id": "11-qancha-vaqt-oladi",
          "title": "11. Qancha vaqt oladi?",
          "blocks": [
            {
              "kind": "code",
              "code": "import time\n\nt0 = time.perf_counter()\nmerges, vocab, tokenlar = train(matn, 276)\nprint(f\"vaqt: {time.perf_counter() - t0:.4f} soniya\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "vaqt: 0.0020 soniya"
            },
            {
              "kind": "text",
              "text": "480 baytda 20 ta birlashtirish — bir zumda."
            },
            {
              "kind": "text",
              "text": "Lekin o'ylab ko'ring. Har bir birlashtirishda biz **butun matnni ikki marta** aylanib chiqamiz: bir marta `get_stats` uchun, bir marta `merge` uchun."
            },
            {
              "kind": "bullets",
              "items": [
                "20 ta birlashtirish × 480 bayt = 9 600 qadam. Hech narsa.",
                "**16 128 ta birlashtirish × 100 000 000 bayt** = 1.6 trillion qadam."
              ]
            },
            {
              "kind": "text",
              "text": "Bu sof Python'da **haftalab** ishlaydi. Dars 16 da haqiqiy korpusda o'qitganingizda bu muammoga duch kelasiz, va u yerda uni qanday hal qilishni ko'ramiz."
            }
          ]
        },
        {
          "id": "12-muammo",
          "title": "12. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda endi `merges` va `vocab` bor. Tokenizator o'qidi."
            },
            {
              "kind": "text",
              "text": "Lekin u hali **ishlatib bo'lmaydigan** holatda:"
            },
            {
              "kind": "text",
              "text": "**1. Tokenlarni matnga qaytara olmaymiz.** `tokenlar` ro'yxatida `257` bor. `vocab[257]` bizga `b'lar'` beradi — lekin butun ro'yxatni matnga aylantiradigan funksiya hali yo'q. Dars 06 dagi `dekodla` faqat baytlar bilan ishlaydi, 257 esa bayt emas."
            },
            {
              "kind": "text",
              "text": "**2. Yangi matnni kodlay olmaymiz.** `train` faqat o'z matnini kodladi. Boshqa jumla bersangiz — uni `merges` jadvali bo'yicha qayta ishlash kerak, va bu alohida funksiya."
            },
            {
              "kind": "text",
              "text": "Keyingi ikki dars aynan shu ikkitasi haqida: **`decode`** va **`encode`**."
            }
          ]
        },
        {
          "id": "13-toliq-kod",
          "title": "13. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "import time\n\njurnal = True\n\n\ndef kodla(matn):\n    return list(matn.encode(\"utf-8\"))\n\n\ndef dekodla(raqamlar):\n    return bytes(raqamlar).decode(\"utf-8\")\n\n\ndef get_stats(tokenlar):\n    hisob = {}\n    for juftlik in zip(tokenlar, tokenlar[1:]):\n        hisob[juftlik] = hisob.get(juftlik, 0) + 1\n    return hisob\n\n\ndef merge(tokenlar, juftlik, yangi_id):\n    yangi = []\n    i = 0\n    while i < len(tokenlar):\n        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:\n            yangi.append(yangi_id)\n            i += 2\n        else:\n            yangi.append(tokenlar[i])\n            i += 1\n    return yangi\n\n\ndef train(matn, vocab_size):\n    tokenlar = kodla(matn)\n    merges = {}\n\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n\n    for yangi_id in range(256, vocab_size):\n        stats = get_stats(tokenlar)\n        if len(stats) == 0:\n            if jurnal:\n                print(\"  juftlik qolmadi, toʻxtadik\")\n            break\n\n        eng = max(stats, key=stats.get)\n        soni = stats[eng]\n\n        tokenlar = merge(tokenlar, eng, yangi_id)\n        merges[eng] = yangi_id\n        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n\n        if jurnal:\n            print(f\"  {yangi_id}: {eng} ({soni} marta) -> {vocab[yangi_id]!r}   | {len(tokenlar)} token\")\n\n    return merges, vocab, tokenlar\n\n\n# ---- Sinov ----\nmatn = \"\"\"Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi.\nOʻqituvchi darsni tushuntirdi. Oʻquvchilar savollarga javob berishdi.\nKechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.\nOtalar ishdan kelishdi. Hamma birga dasturxonga oʻtirishdi.\nErtalab bolalar yana maktabga borishdi. Ular yangi darslarni oʻrganishdi.\nKitoblarda qiziqarli hikoyalar bor edi. Bolalar hikoyalarni yoqtirishdi.\nOʻqituvchilar savollar berishdi. Oʻquvchilar javoblarni yozishdi.\"\"\"\n\nw = len(matn.split())\nboshlangich = len(kodla(matn))\nprint(\"belgilar:\", len(matn), \"| soʻzlar:\", w, \"| tokenlar:\", boshlangich)\n\nt0 = time.perf_counter()\nmerges, vocab, tokenlar = train(matn, 276)\nprint(f\"vaqt: {time.perf_counter() - t0:.4f} soniya\")\n\nprint(\"fertility:\", round(boshlangich / w, 3), \"->\", round(len(tokenlar) / w, 3))\nprint(\"merges hajmi:\", len(merges), \"| vocab hajmi:\", len(vocab))",
              "lang": "python",
              "mode": "type"
            }
          ]
        },
        {
          "id": "14-ozingiz-yozing",
          "title": "14. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "def train(matn, vocab_size):\n    tokenlar = ___(matn)               # matnni baytlarga\n    merges = ___                       # boʻsh jadval\n\n    vocab = {}\n    for i in range(___):               # 256 ta boshlangʻich token\n        vocab[i] = bytes([i])\n\n    for yangi_id in range(___, vocab_size):\n        stats = ___(tokenlar)\n        if len(stats) == 0:\n            ___                        # tsiklni toʻxtat\n        eng = max(stats, key=___)\n        tokenlar = ___(tokenlar, eng, yangi_id)\n        merges[___] = ___              # juftlik -> yangi raqam\n        vocab[yangi_id] = vocab[eng[___]] + vocab[eng[___]]\n\n    return merges, vocab, tokenlar",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "def train(matn, vocab_size):\n    tokenlar = kodla(matn)\n    merges = {}\n\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n\n    for yangi_id in range(256, vocab_size):\n        stats = get_stats(tokenlar)\n        if len(stats) == 0:\n            break\n        eng = max(stats, key=stats.get)\n        tokenlar = merge(tokenlar, eng, yangi_id)\n        merges[eng] = yangi_id\n        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n\n    return merges, vocab, tokenlar",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "text",
                  "text": "Eng ko'p xato qilinadigan joy — `merges[eng] = yangi_id` ni teskari yozish: `merges[yangi_id] = eng`. Ikkalasi ham ishlaydi, lekin Dars 12 da (`encode`) bizga **juftlikdan raqamga** qidirish kerak bo'ladi, teskarisi emas."
                },
                {
                  "kind": "text",
                  "text": "Ikkinchi xato — `vocab[eng[0]] + vocab[eng[1]]` o'rniga `bytes(eng)` yozish. Bu faqat `eng` dagi ikkala raqam ham 255 dan kichik bo'lganda ishlaydi. `(256, 114)` da darhol qulaydi."
                }
              ]
            }
          ]
        },
        {
          "id": "15-mashqlar",
          "title": "15. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`train(matn, 256)` nima qaytaradi? Nechta birlashtirish bo'ladi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "**Nol ta birlashtirish.**"
                  },
                  {
                    "kind": "text",
                    "text": "`range(256, 256)` — bo'sh diapazon, tsikl umuman aylanmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "`merges` bo'sh lug'at, `vocab` da atigi 256 ta boshlang'ich token, `tokenlar` esa `kodla(matn)` ning o'zi, o'zgarmagan."
                  },
                  {
                    "kind": "text",
                    "text": "Ya'ni `vocab_size = 256` — bu Dars 07 dagi bayt tokenizatori. BPE hech narsa qilmaydi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Nima uchun `merges[eng] = yangi_id` deb yozdik, `merges[yangi_id] = eng` emas?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "Chunki **qidiruv yo'nalishi** muhim."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 12 da yangi matnni kodlaganimizda savol shunday bo'ladi: *\"mening qo'limda `(108, 97)` juftligi bor — u qaysi tokenga aylanadi?\"*"
                  },
                  {
                    "kind": "text",
                    "text": "`merges[(108, 97)]` → `256`. Bir qadamda topildi."
                  },
                  {
                    "kind": "text",
                    "text": "Agar teskari saqlagan bo'lsak, butun jadvalni aylanib chiqib qidirish kerak bo'lardi — 16 128 ta qatorni, har bir juftlik uchun."
                  },
                  {
                    "kind": "text",
                    "text": "**Lug'atda kalit — bu siz bilgan narsa, qiymat — bilmoqchi bo'lgan narsa.** Jadvalni tuzayotganda o'zingizdan so'rang: *keyin men nimadan nimani qidiraman?*"
                  },
                  {
                    "kind": "text",
                    "text": "(Teskari jadval ham kerak bo'ladi — `vocab` aynan shu: raqamdan baytlarga. Shuning uchun ikkalasini ham saqlaymiz.)"
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Matnni ikki barobar uzaytiring (o'sha matnni ikki marta yozing) va `train(matn2, 276)` ni ishga tushiring. Birinchi 5 ta birlashtirish o'zgaradimi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "**O'zgarmaydi** — faqat sanoqlar ikki barobar oshadi."
                  },
                  {
                    "kind": "pre",
                    "text": "256: (108, 97) (52 marta) -> b'la'\n257: (256, 114) (40 marta) -> b'lar'\n..."
                  },
                  {
                    "kind": "text",
                    "text": "Sabab: BPE **nisbiy chastotaga** qaraydi. Hamma juftlikning soni ikki barobar oshsa, ularning tartibi o'zgarmaydi — eng ko'p uchragani baribir eng ko'p uchragani bo'lib qoladi."
                  },
                  {
                    "kind": "text",
                    "text": "**Bu muhim xususiyat:** tokenizator matnning **hajmiga** emas, **tuzilishiga** qarab o'qiydi. Shuning uchun katta korpusdan bir bo'lagini olib sinab ko'rish mantiqiy — natija o'xshash bo'ladi."
                  },
                  {
                    "kind": "text",
                    "text": "Lekin diqqat: bu faqat matn **bir xil turdagi** bo'lsa to'g'ri. Yangilik matni va she'riyat matni butunlay boshqa tokenlar beradi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`vocab[275]` = `b'lalar '`. Bu token qaysi so'zlarda uchraydi? Va u yaxshi tokenmi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "Faqat **`bolalar `** da. Tekshiring: `bolalar ` = `bo` + `lalar `. `Onalar `, `hikoyalar` da `lalar ` yoʻq — ularda `alar ` bor."
                  },
                  {
                    "kind": "text",
                    "text": "**Yaxshi tokenmi? Qisman.**"
                  },
                  {
                    "kind": "text",
                    "text": "Yaxshi tomoni: `bolalar` matnda tez-tez uchraydi, uni bitta tokenga yaqinlashtirish foydali."
                  },
                  {
                    "kind": "text",
                    "text": "Yomon tomoni: **oxiridagi bo'shliq.** `lalar ` — bu `lalar` va bo'shliq birga. Demak `bolalar,` (vergul bilan) yoki `bolalarni` bu tokenni ishlata olmaydi — ular uchun boshqa token kerak bo'ladi."
                  },
                  {
                    "kind": "text",
                    "text": "Bitta so'z, uch xil variant (`bolalar `, `bolalar,`, `bolalarni`) — uchta alohida token. **Lug'at joyi isrof bo'ladi.**"
                  },
                  {
                    "kind": "text",
                    "text": "Bu muammoning nomi bor va u Dars 13 ning mavzusi. Yechim: so'zlarni **oldindan bo'lish**, shunda bitta token hech qachon so'z chegarasidan o'tmaydi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Tokenizatorni yuqoridagi matnda o'qiting (`vocab_size = 406`), keyin uni **yangi** jumlada sinab ko'ring:"
                },
                {
                  "kind": "code",
                  "code": "yangi_jumla = \"Talabalar universitetga kirishdi va imtihonlarni topshirishdi.\"",
                  "lang": "python",
                  "mode": "type"
                },
                {
                  "kind": "text",
                  "text": "Bu jumlada 406-tokenli lug'atdan qaysi tokenlar foydali bo'ladi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "Qaysi tokenlar ishlaydi:"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`la`, `lar`, `lar ` — **ha**, `Talabalar` va `imtihonlarni` da bor",
                      "`di`, `di.`, `ish`, `ishdi.`, `rishdi.` — **ha**, `kirishdi` va `topshirishdi.` da bor",
                      "`ga `, `ni `, `da` — **ha**"
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Qaysilari ishlamaydi:"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`maktabga borishdi. U` (300-token) — **yo'q**",
                      "106 baytlik 355-token — **yo'q**",
                      "`lalar ` — **yo'q** (`Talabalar ` da `alar ` bor, `lalar ` emas)"
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "**Xulosa:** foydali tokenlar — **qisqa, grammatik** bo'laklar. Isrof bo'lganlari — **uzun, matnga xos** bo'laklar."
                  },
                  {
                    "kind": "text",
                    "text": "Va e'tibor bering: 150 ta birlashtirishning ko'pchiligi ikkinchi turdan edi. Ya'ni lug'atning katta qismi **bu jumlada umuman ishlatilmaydi**."
                  },
                  {
                    "kind": "text",
                    "text": "Agar siz fertility ni shu yangi jumlada o'lchasangiz, u 1.472 dan ancha yomon chiqadi — va **aynan shu raqam haqiqiy raqam** bo'ladi."
                  },
                  {
                    "kind": "text",
                    "text": "Mana shuning uchun Dars 17 kerak."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "16-xulosa",
          "title": "16. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "Trening tsikli — `get_stats` va `merge` ni navbatma-navbat chaqirish. Yangi kod atigi uch qator.",
                "`merges` jadvali — **butun tokenizator**. Juftlikdan yangi raqamga.",
                "Tartib zanjir: `257 = (256, 114)` — 256 allaqachon mavjud bo'lishi shart.",
                "Birlashtirishlar soni = `vocab_size − 256`.",
                "Algoritm qo'shimchalarni **qatlam-qatlam** quradi: `la → lar → \"lar \"`, `sh → ish → \"ishdi.\" → \"rishdi.\"`",
                "BPE `ʻ` ning ikkita UTF-8 baytini **qaytadan bitta tokenga** yig'di.",
                "**Kam matnda ko'p birlashtirish = yodlab olish.** Fertility chiroyli chiqadi va yolg'on gapiradi. O'qitgan matningizda o'lchamang."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Tokenizator o'qidi. Endi uni ishlatish kerak."
            },
            {
              "kind": "text",
              "text": "**Dars 11 — `decode`.** `[98, 111, 257]` ro'yxatini `bolalar` ga qaytarish. Va bir savol: agar ro'yxat **buzuq** bo'lsa — yarim belgi bilan tugasa — nima qilish kerak?"
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *`dekodla([202])` nima qaytaradi?* Dars 06 dan eslang: 202 — bu `ʻ` ning **birinchi yarmi**. Yolg'iz o'zi u nimani anglatadi?"
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–09. `get_stats`, `merge`, `while`, `max(key=)`"
    },
    {
      "id": "dars-11",
      "n": 11,
      "title": "decode: raqamdan matnga",
      "subtitle": "",
      "minutes": 45,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**yozasiz** `decode` — tokenlar ro'yxatini matnga qaytaradigan funksiya;",
                "**ko'rasiz** to'liq round-trip ishlashini: matn → tokenlar → matn;",
                "**bilasiz** `b\"\".join()` nima uchun `+=` dan **o'nlab barobar** tez ekanini;",
                "**hal qilasiz** yarim belgi muammosini — `errors=\"replace\"` bilan;",
                "**tiklaysiz** butun `vocab` ni faqat `merges` jadvalidan."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 10 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "`dekodla([202])` nima qaytaradi?"
            },
            {
              "kind": "text",
              "text": "Dars 06 dan eslang: `202` — bu `ʻ` belgisining **birinchi yarmi**. Ikkinchi yarmi — `187`."
            },
            {
              "kind": "text",
              "text": "Yolg'iz o'zi u nima?"
            },
            {
              "kind": "code",
              "code": "print(bytes([202]).decode(\"utf-8\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "UnicodeDecodeError: 'utf-8' codec can't decode byte 0xca in position 0: unexpected end of data",
              "error": true
            },
            {
              "kind": "text",
              "text": "**Dastur qulab tushdi.**"
            },
            {
              "kind": "text",
              "text": "Xatoni o'qing: `unexpected end of data` — \"ma'lumot kutilmaganda tugadi\"."
            },
            {
              "kind": "text",
              "text": "`202` = `11001010` (Dars 06). Boshidagi `110` — bu signal: **\"men 2 baytlik belgining boshiman, mendan keyin yana bitta bayt keladi\"**."
            },
            {
              "kind": "text",
              "text": "Lekin keyin hech narsa kelmadi. Dekoder kutdi, kutdi — va xato berdi."
            },
            {
              "kind": "text",
              "text": "**Bu shunchaki qiziq holat emas.** Bu real muammo, va uni hal qilmasangiz, tokenizatoringizni ishlatgan dastur ishonchsiz bo'ladi. Nima uchun — 6-bo'limda ko'rasiz."
            }
          ]
        },
        {
          "id": "2-decode-nima-qiladi",
          "title": "2. `decode` nima qiladi",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda `vocab` bor — har bir token raqami qaysi baytlarga to'g'ri kelishini ko'rsatadigan jadval (Dars 10):"
            },
            {
              "kind": "code",
              "code": "for tid in [98, 202, 256, 257, 267]:\n    print(f\"  vocab[{tid}] = {vocab[tid]!r}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  vocab[98] = b'b'\n  vocab[202] = b'\\xca'\n  vocab[256] = b'la'\n  vocab[257] = b'lar'\n  vocab[267] = b'\\xca\\xbb'"
            },
            {
              "kind": "text",
              "text": "`decode` ning ishi uch qadamdan iborat:"
            },
            {
              "kind": "pre",
              "text": "[98, 111, 257]                     tokenlar\n     ↓  har birini vocab dan olamiz\nb'b'  b'o'  b'lar'                 baytlar\n     ↓  qoʻshamiz\nb'bolar'                           bitta bayt ketma-ketligi\n     ↓  .decode(\"utf-8\")\n\"bolar\"                            matn"
            }
          ]
        },
        {
          "id": "3-birinchi-versiya",
          "title": "3. Birinchi versiya",
          "blocks": [
            {
              "kind": "code",
              "code": "def decode(ids, vocab):\n    baytlar = b\"\"\n    for tid in ids:\n        baytlar += vocab[tid]\n    return baytlar.decode(\"utf-8\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "**Satr izohi:**"
            },
            {
              "kind": "bullets",
              "items": [
                "`baytlar = b\"\"` — **bo'sh bayt ketma-ketligi**. Oddiy `\"\"` emas! `b` old qo'shimchasi \"bu matn emas, baytlar\" degani (Dars 06).",
                "`baytlar += vocab[tid]` — har bir tokenning baytlarini ulaymiz. `+=` baytlar bilan ham ishlaydi (Dars 02 dagi `+` kabi).",
                "`.decode(\"utf-8\")` — baytlarni matnga aylantiramiz (Dars 06)."
              ]
            },
            {
              "kind": "note",
              "tone": "warn",
              "text": "`b\"\"` va `\"\"` ni aralashtirmang. `b\"\" + \"salom\"` → `TypeError`. Baytga faqat baytni qo'shish mumkin."
            },
            {
              "kind": "text",
              "text": "Sinaymiz:"
            },
            {
              "kind": "code",
              "code": "print(decode([98, 111, 257], vocab))\nprint(decode([256, 261], vocab))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bolar\nlalar"
            },
            {
              "kind": "text",
              "text": "`[98, 111, 257]` = `b` + `o` + `lar` = `bolar` ✓"
            }
          ]
        },
        {
          "id": "4-toliq-round-trip",
          "title": "4. To'liq round-trip",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi eng muhim sinov. Dars 10 da `train` bizga `tokenlar` ni qaytargan edi — butun matnning siqilgan ko'rinishi. Uni qaytaramiz:"
            },
            {
              "kind": "code",
              "code": "merges, vocab, tokenlar = train(matn, 276)\n\nqayta = decode(tokenlar, vocab)\nprint(\"tokenlar soni:\", len(tokenlar))\nprint(\"round-trip:\", qayta == matn)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "tokenlar soni: 286\nround-trip: True"
            },
            {
              "kind": "text",
              "text": "**286 ta raqamdan 480 belgilik matn to'liq tiklandi.** Bitta belgi ham yo'qolmadi."
            },
            {
              "kind": "text",
              "text": "Bu — Dars 02 da o'rgangan round-trip tekshiruvi, endi butun tokenizator darajasida:"
            },
            {
              "kind": "pre",
              "text": "matn → kodla → merge × 20 → decode → matn"
            },
            {
              "kind": "text",
              "text": "Agar bu `True` bo'lmasa, tokenizatoringiz **buzuq**. Va bu tekshiruvni har safar qilish kerak — u bir qator, lekin u hamma narsani tekshiradi."
            }
          ]
        },
        {
          "id": "5-join-va-nima-uchun-u-muhim",
          "title": "5. `.join()` — va nima uchun u muhim",
          "blocks": [
            {
              "kind": "text",
              "text": "Kodimiz ishlaydi. Lekin unda **jiddiy tezlik muammosi** bor, va uni ko'rsatmoqchiman."
            },
            {
              "kind": "text",
              "text": "Avval yangi buyruq:"
            },
            {
              "kind": "code",
              "code": "print(b\"\".join([b\"bo\", b\"la\", b\"lar\"]))\nprint(\" \".join([\"bir\", \"ikki\", \"uch\"]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "b'bolalar'\nbir ikki uch"
            },
            {
              "kind": "text",
              "text": "`ajratgich.join(roʻyxat)` — ro'yxatdagi bo'laklarni **birlashtiradi**, orasiga ajratgichni qo'yib."
            },
            {
              "kind": "bullets",
              "items": [
                "`b\"\".join(...)` — bo'sh ajratgich, ya'ni shunchaki yopishtiradi. Baytlar uchun.",
                "`\" \".join(...)` — bo'shliq bilan. Matnlar uchun."
              ]
            },
            {
              "kind": "text",
              "text": "Ikkinchi versiya:"
            },
            {
              "kind": "code",
              "code": "def decode_join(ids, vocab):\n    qismlar = []\n    for tid in ids:\n        qismlar.append(vocab[tid])\n    return b\"\".join(qismlar).decode(\"utf-8\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "G'oya: avval hamma bo'lakni **ro'yxatga yig'amiz**, keyin **bir marta** birlashtiramiz."
            },
            {
              "kind": "h3",
              "id": "farqni-olchaymiz",
              "text": "Farqni o'lchaymiz"
            },
            {
              "kind": "code",
              "code": "import time\n\nuzun = tokenlar * 500      # 143 000 token\n\nt0 = time.perf_counter()\ndecode(uzun, vocab)\na = time.perf_counter() - t0\n\nt0 = time.perf_counter()\ndecode_join(uzun, vocab)\nb = time.perf_counter() - t0\n\nprint(f\"+= usuli   : {a:.3f} s\")\nprint(f\"join usuli : {b:.4f} s\")\nprint(f\"farq       : {a/b:.0f} barobar\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "+= usuli   : 0.468 s\njoin usuli : 0.0123 s\nfarq       : 38 barobar"
            },
            {
              "kind": "text",
              "text": "**38 barobar.** Bir xil natija, bir xil ma'lumot."
            },
            {
              "kind": "h3",
              "id": "nima-uchun-bunchalik-farq",
              "text": "Nima uchun bunchalik farq?"
            },
            {
              "kind": "text",
              "text": "Chunki **baytlar o'zgarmas** (Dars 02 dagi matn kabi). `baytlar += yangi` deganda Python eskisini o'zgartirmaydi — u **butunlay yangi** bayt ketma-ketligi yasaydi va eskisining hammasini unga **ko'chiradi**."
            },
            {
              "kind": "pre",
              "text": "1-qadam:  b\"bo\"                      2 bayt koʻchirildi\n2-qadam:  b\"bo\" + b\"la\"  → yangi     4 bayt koʻchirildi\n3-qadam:  b\"bola\" + b\"lar\" → yangi   7 bayt koʻchirildi\n...\n100 000-qadam:                       ~200 000 bayt koʻchirildi"
            },
            {
              "kind": "text",
              "text": "Ya'ni oxirgi qadamlarda Python har safar butun matnni qaytadan ko'chiradi."
            },
            {
              "kind": "text",
              "text": "`join` esa bo'laklarni ro'yxatda saqlaydi (ko'chirish yo'q), oxirida jami hajmni hisoblaydi, bir marta joy ajratadi va bir marta ko'chiradi."
            },
            {
              "kind": "media",
              "id": "m3",
              "title": "+= va join"
            },
            {
              "kind": "text",
              "text": "**Bu shunchaki \"biroz tezroq\" emas — farq matn uzayishi bilan o'sib boradi:**"
            },
            {
              "kind": "pre",
              "text": " 57 200 token  →  22 barobar\n143 000 token  →  38 barobar"
            },
            {
              "kind": "text",
              "text": "Farqning o'zi ham o'sdi. 100 MB korpusda bu farq **soatlarni** anglatadi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Qoida:** tsikl ichida matn yoki baytni `+=` bilan yig'manglar. Ro'yxatga yig'ing, oxirida `join` qiling. Bu Python'dagi eng ko'p uchraydigan tezlik xatosi."
            },
            {
              "kind": "text",
              "text": "Bundan keyin `decode` ning `join` versiyasini ishlatamiz."
            }
          ]
        },
        {
          "id": "6-buzuq-ketma-ketlik",
          "title": "6. Buzuq ketma-ketlik",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi 1-bo'limdagi muammoga qaytamiz."
            },
            {
              "kind": "code",
              "code": "print(decode([270, 202], vocab))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "UnicodeDecodeError: 'utf-8' codec can't decode byte 0xca in position 2: unexpected end of data",
              "error": true
            },
            {
              "kind": "text",
              "text": "`270` = `bo`, `202` = `ʻ` ning yarmi. Natija — qulash."
            },
            {
              "kind": "h3",
              "id": "bu-qachon-haqiqatan-sodir-boladi",
              "text": "Bu qachon haqiqatan sodir bo'ladi?"
            },
            {
              "kind": "text",
              "text": "Uchta holatda, va uchalasi ham amaliy:"
            },
            {
              "kind": "text",
              "text": "**1. Model matn yaratganda.** Til modeli tokenlarni **bittalab** chiqaradi. U ehtimollik bo'yicha tanlaydi (Kurs 2, Dars 07) va hech narsa uni to'g'ri juftlikni tanlashga majbur qilmaydi. Model `202` ni chiqarib, keyin `187` emas, boshqa tokenni chiqarishi mumkin."
            },
            {
              "kind": "text",
              "text": "**2. Oqim (streaming) paytida.** ChatGPT javobni yozayotganda harflar birin-ketin paydo bo'ladi — bu har bir yangi tokendan keyin matnni qayta dekodlash demak. Ba'zi lahzalarda qo'lingizda **yarim belgi** bo'ladi."
            },
            {
              "kind": "text",
              "text": "**3. Matn kesilganda.** Uzun matnni bo'laklarga bo'lganingizda kesish joyi belgining o'rtasiga tushishi mumkin."
            },
            {
              "kind": "text",
              "text": "**Uchala holatda ham dastur qulashi mumkin emas.** Foydalanuvchi chiroyli xabar olishi kerak, `UnicodeDecodeError` emas."
            }
          ]
        },
        {
          "id": "7-yechim-errors-replace",
          "title": "7. Yechim: `errors=\"replace\"`",
          "blocks": [
            {
              "kind": "code",
              "code": "def decode(ids, vocab):\n    qismlar = []\n    for tid in ids:\n        qismlar.append(vocab[tid])\n    baytlar = b\"\".join(qismlar)\n    return baytlar.decode(\"utf-8\", errors=\"replace\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Faqat bitta parametr qo'shildi. Sinaymiz:"
            },
            {
              "kind": "code",
              "code": "print(repr(decode([202], vocab)))\nprint(repr(decode([270, 202], vocab)))\nprint(repr(decode([202, 187], vocab)))\nprint(repr(decode([111, 202, 187, 113], vocab)))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'�'\n'bo�'\n'ʻ'\n'oʻq'"
            },
            {
              "kind": "bullets",
              "items": [
                "Yolg'iz `202` → `�`",
                "`bo` + yarim belgi → `bo�`",
                "`202` va `187` **birga** → to'g'ri `ʻ`",
                "To'liq `oʻq` → to'g'ri"
              ]
            },
            {
              "kind": "text",
              "text": "**Dastur endi hech qachon qulamaydi.**"
            },
            {
              "kind": "h3",
              "id": "nima",
              "text": "`�` nima?"
            },
            {
              "kind": "code",
              "code": "print(ord(\"\\ufffd\"), hex(ord(\"\\ufffd\")))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "65533 0xfffd"
            },
            {
              "kind": "text",
              "text": "Bu **U+FFFD**, maxsus Unicode belgisi. Rasmiy nomi — *replacement character*, \"almashtirish belgisi\". Uning yagona vazifasi: **\"bu yerda nimadir bor edi, lekin men uni o'qiy olmadim\"** deyish."
            },
            {
              "kind": "text",
              "text": "Siz uni internetda ko'rgansiz — buzilgan saytlarda, eski fayllarda. Endi bilasiz: u **xato belgisi emas**, u **xato haqidagi xabar**."
            },
            {
              "kind": "media",
              "id": "m1",
              "title": "Yarim belgi"
            },
            {
              "kind": "h3",
              "id": "errors-ning-boshqa-qiymatlari",
              "text": "`errors` ning boshqa qiymatlari"
            },
            {
              "kind": "table",
              "head": [
                "Qiymat",
                "Nima qiladi"
              ],
              "rows": [
                [
                  "`\"strict\"`",
                  "**standart** — xato bersa, qulaydi"
                ],
                [
                  "`\"replace\"`",
                  "`�` qo'yadi va davom etadi"
                ],
                [
                  "`\"ignore\"`",
                  "buzuq baytni **jimgina tashlab yuboradi**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "`\"ignore\"` ni ishlatmang. U muammoni yashiradi: matn \"toza\" ko'rinadi, lekin undan bo'laklar **ovozsiz** yo'qolgan bo'ladi. `\"replace\"` esa muammo borligini ko'rsatadi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Umumiy qoida:** xatoni yashirmang — uni **ko'rinadigan** qiling."
            }
          ]
        },
        {
          "id": "8-oqimni-koramiz",
          "title": "8. Oqimni ko'ramiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi eng qiziq demo. Modelning matn yozishini taqlid qilamiz: tokenlarni bittalab qo'shib, har safar dekodlaymiz."
            },
            {
              "kind": "code",
              "code": "baytlar = kodla(\"oʻzbek\")\nprint(baytlar)\n\nyigilgan = []\nfor tid in baytlar:\n    yigilgan.append(tid)\n    print(f\"  {tid:4d} -> {decode(yigilgan, vocab)!r}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[111, 202, 187, 122, 98, 101, 107]\n   111 -> 'o'\n   202 -> 'o�'\n   187 -> 'oʻ'\n   122 -> 'oʻz'\n    98 -> 'oʻzb'\n   101 -> 'oʻzbe'\n   107 -> 'oʻzbek'"
            },
            {
              "kind": "text",
              "text": "**Ikkinchi va uchinchi qatorga qarang.**"
            },
            {
              "kind": "pre",
              "text": "202 -> 'o�'      ← yarim belgi, ekranda � koʻrinadi\n187 -> 'oʻ'      ← juftlik toʻldi, belgi tiklandi"
            },
            {
              "kind": "text",
              "text": "Bir lahza uchun ekranda `�` turadi, keyin u `ʻ` ga aylanadi."
            },
            {
              "kind": "text",
              "text": "**Bu — haqiqiy hodisa.** Agar siz ChatGPT ga o'zbekcha savol berib, javobni diqqat bilan kuzatsangiz, ba'zan `ʻ` o'rnida bir lahza `�` yonib o'tishini ko'rishingiz mumkin. Endi nima uchun ekanini bilasiz."
            },
            {
              "kind": "text",
              "text": "Va `errors=\"replace\"` bo'lmasa — bu joyda butun dastur **qulab tushardi**."
            },
            {
              "kind": "media",
              "id": "m2",
              "title": "Oqim"
            }
          ]
        },
        {
          "id": "9-vocab-ni-merges-dan-tiklash",
          "title": "9. `vocab` ni `merges` dan tiklash",
          "blocks": [
            {
              "kind": "text",
              "text": "Oxirgi muhim narsa. Dars 10 da aytgan edim: **`merges` — butun tokenizator.** Buni endi isbotlaymiz."
            },
            {
              "kind": "text",
              "text": "Faylga saqlanadigan narsa — `merges`. `vocab` esa undan **qayta hisoblanadi**:"
            },
            {
              "kind": "code",
              "code": "def vocab_qur(merges):\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n\n    for juftlik, tid in merges.items():\n        vocab[tid] = vocab[juftlik[0]] + vocab[juftlik[1]]\n\n    return vocab",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Tekshiramiz:"
            },
            {
              "kind": "code",
              "code": "v2 = vocab_qur(merges)\nprint(\"teng:\", v2 == vocab)\nprint(\"v2[257] =\", v2[257])\nprint(\"v2[275] =\", v2[275])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "teng: True\nv2[257] = b'lar'\nv2[275] = b'lalar '"
            },
            {
              "kind": "text",
              "text": "**Aynan bir xil.**"
            },
            {
              "kind": "h3",
              "id": "nima-uchun-bu-ishlaydi",
              "text": "Nima uchun bu ishlaydi?"
            },
            {
              "kind": "text",
              "text": "Chunki Python lug'ati **qo'shilish tartibini saqlaydi**. `merges` ga qatorlar Dars 10 dagi tsiklda tartib bilan qo'shilgan edi — 256, 257, 258..."
            },
            {
              "kind": "text",
              "text": "Demak `for juftlik, tid in merges.items()` ham **o'sha tartibda** yuradi. Va `vocab[257] = vocab[256] + vocab[114]` hisoblanganda, `vocab[256]` allaqachon mavjud bo'ladi."
            },
            {
              "kind": "text",
              "text": "**Bu — Dars 10 dagi \"tartib zanjir\" g'oyasining amaliy natijasi.** Agar `merges` tartibsiz bo'lganida, bu funksiya `KeyError` bilan qulardi."
            },
            {
              "kind": "text",
              "text": "Va amaliy foyda: faylga faqat `merges` ni yozasiz (Dars 18). `vocab` — hosila, uni saqlash shart emas."
            }
          ]
        },
        {
          "id": "10-muammo",
          "title": "10. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Yarim tokenizator tayyor:"
            },
            {
              "kind": "bullets",
              "items": [
                "✓ `decode` — tokenlardan matnga",
                "✗ `encode` — **yangi** matndan tokenlarga"
              ]
            },
            {
              "kind": "text",
              "text": "Diqqat: `train` matnni kodladi, lekin **faqat o'z matnini**. Yangi jumla bersangiz — uni qayta ishlash kerak."
            },
            {
              "kind": "text",
              "text": "Va bu ko'rinishdan qiyinroq. Yangi matnni baytlarga aylantirish oson (`kodla`). Lekin keyin `merges` jadvalidagi birlashtirishlarni **qaysi tartibda** qo'llash kerak?"
            },
            {
              "kind": "text",
              "text": "Dars 10 dagi zanjir esingizdami? `257 = (256, 114)`. Demak `257` ni yasashdan oldin `256` yasalgan bo'lishi shart."
            },
            {
              "kind": "text",
              "text": "Agar tartibni noto'g'ri qo'llasangiz — natija noto'g'ri tokenlar bo'ladi, va model ularni tanimaydi."
            },
            {
              "kind": "text",
              "text": "Keyingi dars aynan shu haqda."
            }
          ]
        },
        {
          "id": "11-toliq-kod",
          "title": "11. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "def decode(ids, vocab):\n    qismlar = []\n    for tid in ids:\n        qismlar.append(vocab[tid])\n    baytlar = b\"\".join(qismlar)\n    return baytlar.decode(\"utf-8\", errors=\"replace\")\n\n\ndef vocab_qur(merges):\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n    for juftlik, tid in merges.items():\n        vocab[tid] = vocab[juftlik[0]] + vocab[juftlik[1]]\n    return vocab\n\n\n# ---- Sinov ----\nmerges, vocab, tokenlar = train(matn, 276)\n\n# 1. Round-trip\nqayta = decode(tokenlar, vocab)\nprint(\"tokenlar:\", len(tokenlar), \"| round-trip:\", qayta == matn)\n\n# 2. Buzuq ketma-ketlik qulamaydi\nprint(repr(decode([202], vocab)))\nprint(repr(decode([270, 202], vocab)))\nprint(repr(decode([202, 187], vocab)))\n\n# 3. Oqim\nyigilgan = []\nfor tid in kodla(\"oʻzbek\"):\n    yigilgan.append(tid)\n    print(f\"  {tid:4d} -> {decode(yigilgan, vocab)!r}\")\n\n# 4. vocab ni merges dan tiklash\nprint(\"tiklandi:\", vocab_qur(merges) == vocab)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "tokenlar: 286 | round-trip: True\n'�'\n'bo�'\n'ʻ'\n   111 -> 'o'\n   202 -> 'o�'\n   187 -> 'oʻ'\n   122 -> 'oʻz'\n    98 -> 'oʻzb'\n   101 -> 'oʻzbe'\n   107 -> 'oʻzbek'\ntiklandi: True",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "12-ozingiz-yozing",
          "title": "12. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "def decode(ids, vocab):\n    qismlar = ___                       # boʻsh roʻyxat\n    for tid in ids:\n        qismlar.append(vocab[___])      # tokenning baytlari\n    baytlar = ___.join(qismlar)         # bayt ajratgich\n    return baytlar.decode(\"utf-8\", ___=\"replace\")\n\n\n# Sinov — bu natijalarni olishingiz kerak:\nprint(decode([98, 111, 257], vocab))    # bolar\nprint(repr(decode([202], vocab)))       # '�'",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "def decode(ids, vocab):\n    qismlar = []\n    for tid in ids:\n        qismlar.append(vocab[tid])\n    baytlar = b\"\".join(qismlar)\n    return baytlar.decode(\"utf-8\", errors=\"replace\")",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "text",
                  "text": "Ikkita eng ko'p xato:"
                },
                {
                  "kind": "steps",
                  "items": [
                    "`\"\".join(...)` — `b` unutilgan. Natija: `TypeError: sequence item 0: expected str instance, bytes found`. Bo'sh **matn** bilan **baytlarni** birlashtirib bo'lmaydi.",
                    "`errors=\"replace\"` ni tashlab ketish. Kod ishlaydi — to'g'ri ma'lumotda. Keyin bir kun model yarim belgi chiqaradi va hamma narsa to'xtaydi."
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "13-mashqlar",
          "title": "13. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`decode([], vocab)` nima qaytaradi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(repr(decode([], vocab)))    # ''",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Bo'sh matn."
                  },
                  {
                    "kind": "text",
                    "text": "`qismlar` bo'sh ro'yxat bo'lib qoladi, `b\"\".join([])` → `b\"\"`, `b\"\".decode()` → `\"\"`."
                  },
                  {
                    "kind": "text",
                    "text": "Hech qanday `if len(ids) == 0` tekshiruvi kerak emas — Dars 08 va 09 dagi kabi, yaxshi yozilgan kod chekka holatni o'zi hal qiladi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bu ikkisining farqi nima?"
                },
                {
                  "kind": "code",
                  "code": "a = decode([202, 187], vocab)\nb = decode([267], vocab)",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(repr(a), repr(b), a == b)    # 'ʻ' 'ʻ' True",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "**Bir xil matn, ikki xil yo'l.**"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`[202, 187]` — ikkita bayt-token, dekodlashda birlashib `ʻ` beradi",
                      "`[267]` — bitta BPE token, uning ichida allaqachon ikkala bayt bor"
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "`decode` uchun farq yo'q — u baytlarni yig'ib, keyin bir marta dekodlaydi."
                  },
                  {
                    "kind": "text",
                    "text": "**Lekin model uchun farq katta:** birinchisi 2 token, ikkinchisi 1 token. Aynan shu farq `fertility` ni tashkil qiladi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Nima uchun bu xato beradi?"
                },
                {
                  "kind": "code",
                  "code": "print(decode([99999], vocab))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "KeyError: 99999",
                    "error": true
                  },
                  {
                    "kind": "text",
                    "text": "`vocab` da bunday kalit yo'q — bizning lug'atimizda 0 dan 275 gacha tokenlar bor."
                  },
                  {
                    "kind": "text",
                    "text": "Bu qachon sodir bo'ladi? Agar:"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "model boshqa lug'at bilan o'qitilgan bo'lsa",
                      "token ro'yxati boshqa tokenizatordan kelgan bo'lsa",
                      "kodda xato bo'lsa"
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "**Bu yerda `errors=\"replace\"` yordam bermaydi** — u faqat UTF-8 dekodlash xatosini hal qiladi, `vocab` dagi yo'q kalitni emas."
                  },
                  {
                    "kind": "text",
                    "text": "Haqiqiy tokenizatorlar bunday holat uchun tekshiruv qo'shadi. Dars 18 da klassni yozganingizda buni qo'shishingiz mumkin."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`errors=\"ignore\"` bilan sinab ko'ring va nima uchun u yomonroq ekanini ayting."
                },
                {
                  "kind": "code",
                  "code": "print(repr(bytes([98, 111, 202]).decode(\"utf-8\", errors=\"ignore\")))\nprint(repr(bytes([98, 111, 202]).decode(\"utf-8\", errors=\"replace\")))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "'bo'\n'bo�'"
                  },
                  {
                    "kind": "text",
                    "text": "`\"ignore\"` buzuq baytni **jimgina o'chirib tashladi**. Natija toza ko'rinadi — `'bo'` — va hech kim u yerda nimadir yo'qolganini bilmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "`\"replace\"` esa `�` qoldirdi: **\"bu yerda muammo bor\"**."
                  },
                  {
                    "kind": "text",
                    "text": "Nima uchun bu muhim: tasavvur qiling, siz 100 MB korpusni tozalayapsiz va `\"ignore\"` ishlatdingiz. Fayl \"toza\" chiqadi. Lekin undan minglab belgi ovozsiz yo'qolgan bo'ladi, va siz buni **hech qachon bilmaysiz**."
                  },
                  {
                    "kind": "text",
                    "text": "`\"replace\"` bilan esa `�` larni sanab, muammo qanchalik katta ekanini o'lchay olasiz:"
                  },
                  {
                    "kind": "code",
                    "code": "print(matn.count(\"\\ufffd\"))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "**Dars 15 da korpusni tozalaganingizda aynan shunday qilasiz.**"
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`merges` ni **teskari tartibda** aylanib `vocab` qurishga urining. Nima bo'ladi va nima uchun?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "def vocab_qur_teskari(merges):\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n    juftliklar = list(merges.items())\n    i = len(juftliklar) - 1\n    while i >= 0:\n        juftlik, tid = juftliklar[i]\n        vocab[tid] = vocab[juftlik[0]] + vocab[juftlik[1]]\n        i -= 1\n    return vocab\n\n\nvocab_qur_teskari(merges)",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "KeyError: 256",
                    "error": true
                  },
                  {
                    "kind": "text",
                    "text": "Teskari tartibda birinchi bo'lib `275 = (256, 261)` hisoblanadi. Lekin `vocab[256]` hali mavjud emas — u eng oxirida hisoblanardi."
                  },
                  {
                    "kind": "text",
                    "text": "**Bu Dars 10 dagi minora tajribasining kod ko'rinishi.** Pastdagi g'ishtni olib tashlasangiz, ustidagi hammasi qulaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Amaliy xulosa: `merges` ni faylga saqlaganingizda **tartibni saqlash shart**. Agar uni tartibsiz formatda (masalan oddiy JSON obyekti sifatida, tartib kafolatisiz) saqlasangiz, yuklashda tokenizator buziladi."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 18 da saqlash formatini tanlaganingizda buni yodda tuting."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "14-xulosa",
          "title": "14. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "`decode` uch qadam: `vocab` dan baytlarni ol → birlashtir → `.decode(\"utf-8\")`.",
                "**Round-trip** — `decode(tokenlar) == matn` — tokenizatorning asosiy sinovi. Bir qator, hamma narsani tekshiradi.",
                "`b\"\".join(roʻyxat)` — `+=` dan **o'nlab barobar** tez, va farq matn uzayishi bilan **o'sib boradi**. Tsikl ichida `+=` bilan yig'manglar.",
                "Yarim belgi real muammo: model generatsiyasi, oqim, matn kesish.",
                "`errors=\"replace\"` dasturning qulashini oldini oladi va `�` (U+FFFD) qoldiradi.",
                "`errors=\"ignore\"` ishlatmang — u muammoni **yashiradi**.",
                "`vocab` ni `merges` dan to'liq tiklash mumkin, chunki `merges` tartib saqlaydi."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "`decode` tayyor. Endi teskarisi."
            },
            {
              "kind": "text",
              "text": "**Dars 12 — `encode`.** Yangi matnni tokenlarga aylantirish. Bu `decode` dan ancha qiyinroq, chunki birlashtirishlarni **to'g'ri tartibda** qo'llash kerak."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *matnda `(108, 97)` va `(256, 114)` juftliklari bor. Qaysi birini birinchi birlashtirasiz — va nima uchun bu muhim?*"
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–10. `vocab`, `merges`, `train`"
    },
    {
      "id": "dars-12",
      "n": 12,
      "title": "encode: matndan raqamga",
      "subtitle": "",
      "minutes": 55,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "bullets",
              "items": [
                "**yozasiz** `encode` — **yangi** matnni tokenlarga aylantiradigan funksiya;",
                "**isbotlaysiz** birlashtirish tartibi nima uchun buzilmasligi kerakligini;",
                "**bilasiz** `float(\"inf\")` nima va u qanday qilib \"hech qachon tanlanma\" deyishini;",
                "**o'lchaysiz** ikki xil yozilgan bir xil funksiyaning **378 barobar** farqini;",
                "**ko'rasiz** tokenizatoringizning **haqiqiy** fertility raqamini — o'qimagan matnda."
              ]
            },
            {
              "kind": "text",
              "text": "Tokenizator shu darsdan keyin **to'liq ishlaydi**."
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 11 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Matnda `(108, 97)` va `(256, 114)` juftliklari bor. Qaysi birini birinchi birlashtirasiz — va nima uchun bu muhim?"
            },
            {
              "kind": "text",
              "text": "Sinab ko'ramiz. Bizda ikkita birlashtirish bor:"
            },
            {
              "kind": "code",
              "code": "kichik_merges = {(108, 97): 256, (256, 114): 257}",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Ya'ni: `l + a → la` (256), keyin `la + r → lar` (257)."
            },
            {
              "kind": "text",
              "text": "`\"lar\"` so'zini kodlaymiz:"
            },
            {
              "kind": "code",
              "code": "t = kodla(\"lar\")\nprint(\"baytlar:\", t)\n\n# toʻgʻri tartib\na = merge(t, (108, 97), 256)\na = merge(a, (256, 114), 257)\nprint(\"toʻgʻri tartib :\", a)\n\n# teskari tartib\nb = merge(t, (256, 114), 257)\nb = merge(b, (108, 97), 256)\nprint(\"teskari tartib :\", b)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "baytlar: [108, 97, 114]\ntoʻgʻri tartib : [257]\nteskari tartib : [256, 114]"
            },
            {
              "kind": "text",
              "text": "**Ikki xil natija.**"
            },
            {
              "kind": "bullets",
              "items": [
                "To'g'ri tartib: **1 ta token** — `257` = `lar`",
                "Teskari tartib: **2 ta token** — `256` va `114`"
              ]
            },
            {
              "kind": "text",
              "text": "Nima bo'ldi? Teskari tartibda biz avval `(256, 114)` ni qidirdik. Lekin o'sha paytda `256` degan token hali **mavjud emas** edi — u keyin yasaladi. Shuning uchun hech narsa topilmadi, va o'sha birlashtirish bekorga ketdi."
            },
            {
              "kind": "text",
              "text": "**Ikkita oqibat, ikkalasi ham yomon:**"
            },
            {
              "kind": "steps",
              "items": [
                "**Siqilish yomonlashdi** — 1 o'rniga 2 token.",
                "**Model tanimaydi.** Model `257` tokenini ko'rgan va o'rgangan. Siz unga `256, 114` bersangiz — bu u uchun butunlay boshqa narsa."
              ]
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Qoida: kodlashda birlashtirishlar aynan o'qitilgan tartibda qo'llanilishi shart.** Bu — Dars 10 dagi minora va Dars 11 dagi `KeyError` bilan bir xil g'oya, uchinchi marta."
            },
            {
              "kind": "media",
              "id": "n1",
              "title": "Tartib"
            }
          ]
        },
        {
          "id": "2-eng-oddiy-encode",
          "title": "2. Eng oddiy `encode`",
          "blocks": [
            {
              "kind": "text",
              "text": "Tartib muhim bo'lsa, eng sodda yechim — **hamma birlashtirishni tartib bilan qo'llash**:"
            },
            {
              "kind": "code",
              "code": "def encode_oddiy(matn, merges):\n    tokenlar = kodla(matn)\n    for juftlik, tid in merges.items():\n        tokenlar = merge(tokenlar, juftlik, tid)\n    return tokenlar",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Uch qator. Trening tsiklida nima qilgan bo'lsak — aynan shuni takrorlaymiz, faqat endi sanash yo'q, chunki qaysi juftlikni birlashtirishni allaqachon bilamiz."
            },
            {
              "kind": "text",
              "text": "`merges.items()` **qo'shilish tartibida** yuradi (Dars 11), demak 256, 257, 258... tartibida. Aynan kerakli tartib."
            },
            {
              "kind": "code",
              "code": "print(encode_oddiy(\"bolalar\", merges))\nprint(encode_oddiy(\"lar\", kichik_merges))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[270, 256, 257]\n[257]"
            },
            {
              "kind": "text",
              "text": "`bolalar` = `bo` + `la` + `lar` — **3 ta token** (bayt darajasida 7 ta edi)."
            }
          ]
        },
        {
          "id": "3-eng-muhim-tekshiruv",
          "title": "3. Eng muhim tekshiruv",
          "blocks": [
            {
              "kind": "text",
              "text": "`encode` to'g'ri ishlayotganini qanday bilamiz?"
            },
            {
              "kind": "text",
              "text": "Javob: **u `train` bilan bir xil natija berishi shart.** `train` o'z matnini kodlagan edi; `encode` xuddi shu matnni bersak, xuddi shu tokenlarni berishi kerak."
            },
            {
              "kind": "code",
              "code": "e = encode_oddiy(matn, merges)\nprint(\"encode:\", len(e), \"| train:\", len(tokenlar), \"| teng:\", e == tokenlar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "encode: 286 | train: 286 | teng: True"
            },
            {
              "kind": "text",
              "text": "**Bu sinovni har doim qiling.** Agar bu `False` bo'lsa, `encode` da xato bor — va u jimgina noto'g'ri tokenlar chiqaradi, hech qanday xatosiz."
            },
            {
              "kind": "text",
              "text": "Endi to'liq aylanma:"
            },
            {
              "kind": "code",
              "code": "yangi = \"Talabalar universitetga kirishdi va imtihonlarni topshirishdi.\"\n\nte = encode_oddiy(yangi, merges)\nprint(\"tokenlar:\", len(te))\nprint(\"round-trip:\", decode(te, vocab) == yangi)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "tokenlar: 41\nround-trip: True"
            },
            {
              "kind": "text",
              "text": "**Tokenizator to'liq ishlaydi.** Matn → tokenlar → matn, hech narsa yo'qolmaydi. Va bu **yangi** matn — tokenizator uni hech qachon ko'rmagan."
            }
          ]
        },
        {
          "id": "4-qaysi-tokenlar-ishladi",
          "title": "4. Qaysi tokenlar ishladi?",
          "blocks": [
            {
              "kind": "text",
              "text": "Qiziq: o'rgangan tokenlarimizdan qaysilari yangi matnda foydali bo'ldi?"
            },
            {
              "kind": "code",
              "code": "for tid in te[:14]:\n    print(f\"  {tid:4d} = {vocab[tid]!r}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "    84 = b'T'\n    97 = b'a'\n   256 = b'la'\n    98 = b'b'\n    97 = b'a'\n   261 = b'lar '\n   117 = b'u'\n   110 = b'n'\n   105 = b'i'\n   118 = b'v'\n   101 = b'e'\n   114 = b'r'\n   115 = b's'\n   105 = b'i'"
            },
            {
              "kind": "text",
              "text": "`Talabalar ` so'zi shunday bo'lindi:"
            },
            {
              "kind": "pre",
              "text": "T  a  la  b  a  \"lar \"\n84 97 256 98 97  261"
            },
            {
              "kind": "text",
              "text": "**Olti token.** Ikkitasi o'rgangan tokenimiz (`la`, `lar `), qolgani oddiy harflar."
            },
            {
              "kind": "text",
              "text": "`universitetga` so'ziga qarang — u deyarli butunlay **harflarga** bo'lindi. Sabab oddiy: bizning o'quv matnimizda `universitet` degan so'z yo'q edi, shuning uchun tokenizator u haqda hech narsa bilmaydi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Xulosa:** tokenizator faqat **ko'rgan** narsasini yaxshi kodlaydi. Shuning uchun o'quv korpusi keng va xilma-xil bo'lishi kerak (Dars 15)."
            }
          ]
        },
        {
          "id": "5-haqiqiy-raqam",
          "title": "5. Haqiqiy raqam",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi Dars 10 dagi muammoga qaytamiz. U yerda fertility ni **o'qigan matnda** o'lchagan edik va u yolg'on chiqqan edi."
            },
            {
              "kind": "text",
              "text": "Endi ikkalasini ham o'lchaymiz:"
            },
            {
              "kind": "code",
              "code": "w1 = len(matn.split())\nw2 = len(yangi.split())\n\nprint(\"oʻqigan matn:\", round(len(e) / w1, 3))\nprint(\"yangi matn  :\", round(len(te) / w2, 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "oʻqigan matn: 5.396\nyangi matn  : 6.833"
            },
            {
              "kind": "text",
              "text": "**Yangi matnda natija yomonroq.** 5.396 emas, **6.833**."
            },
            {
              "kind": "text",
              "text": "Bu normal va kutilgan. Tokenizator o'z matniga **moslashgan** — u `bolalar`, `oʻqishdi`, `maktabga` ni yaxshi biladi, chunki ularni ko'rgan. `universitetga` va `imtihonlarni` ni esa bilmaydi."
            },
            {
              "kind": "text",
              "text": "**Qaysi raqam haqiqiy?** — **6.833.**"
            },
            {
              "kind": "text",
              "text": "Chunki tokenizatorni siz yangi matnlarda ishlatasiz, o'z o'quv matningizda emas."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu qoidani hozir yozib qo'ying, chunki u butun ML sohasida bir xil ishlaydi: **Modelni (yoki tokenizatorni) o'qitgan ma'lumotingizda baholamang. Ko'rmagan ma'lumotda baholang.** Dars 17 shu qoidani to'liq ochadi — va u yerda buni qanday **to'g'ri** qilishni ko'rsataman, chunki uni buzish o'ylaganingizdan ancha oson."
            }
          ]
        },
        {
          "id": "6-tezlik-muammosi",
          "title": "6. Tezlik muammosi",
          "blocks": [
            {
              "kind": "text",
              "text": "`encode_oddiy` to'g'ri ishlaydi. Lekin unda jiddiy kamchilik bor."
            },
            {
              "kind": "text",
              "text": "O'ylab ko'ring: qisqa jumla kodlash uchun u **hamma** birlashtirishni qo'llaydi. Sizning tokenizatoringizda 16 128 ta birlashtirish bor. Demak ikki so'zlik jumla uchun ham **16 128 marta** matn bo'ylab yuriladi."
            },
            {
              "kind": "text",
              "text": "Ularning deyarli hammasi hech narsa topmaydi — bekor ish."
            },
            {
              "kind": "text",
              "text": "O'lchaymiz. `\"Bolalar keldi.\"` jumlasini 1000 marta kodlaymiz, turli hajmdagi `merges` bilan:"
            },
            {
              "kind": "pre",
              "text": "merges | encode_oddiy | tez usul | farq\n    20 |      0.014 s |  0.023 s |    1x\n   500 |      0.277 s |  0.026 s |   11x\n  4000 |      2.232 s |  0.024 s |   94x\n 16128 |      8.851 s |  0.023 s |  378x"
            },
            {
              "kind": "text",
              "text": "Uchta narsaga e'tibor bering:"
            },
            {
              "kind": "text",
              "text": "**1. `encode_oddiy` ning vaqti `merges` hajmiga qarab chiziqli o'sadi.** 20 → 16 128 (800 barobar) bo'lganda vaqt ham taxminan 600 barobar oshdi."
            },
            {
              "kind": "text",
              "text": "**2. Tez usulning vaqti umuman o'zgarmadi.** 0.023–0.026 soniya, doim. Chunki u faqat **matnda haqiqatan bor** juftliklarga qaraydi, va matn qisqa."
            },
            {
              "kind": "text",
              "text": "**3. 20 ta birlashtirishda oddiy usul tezroq!** Bu halol detal: tez usulda qo'shimcha hisob bor (`get_stats` har qadamda), va kichik jadvalda u o'zini oqlamaydi."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu — dasturlashdagi muhim saboq: **\"tezroq algoritm\" har doim tezroq emas.** U ma'lum hajmdan keyin tezroq bo'ladi. Qaysi hajmdan — o'lchab bilish kerak."
            },
            {
              "kind": "text",
              "text": "Bizning holatda hajm 16 384 bo'ladi, shuning uchun tez usul kerak."
            },
            {
              "kind": "media",
              "id": "n3",
              "title": "Ikki yoʻl"
            }
          ]
        },
        {
          "id": "7-float-inf-cheksizlik",
          "title": "7. `float(\"inf\")` — cheksizlik",
          "blocks": [
            {
              "kind": "text",
              "text": "Tez usulni yozishdan oldin bitta yangi narsa kerak."
            },
            {
              "kind": "code",
              "code": "print(float(\"inf\"))\nprint(5 < float(\"inf\"))\nprint(999999999 < float(\"inf\"))\nprint(float(\"inf\") < float(\"inf\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "inf\nTrue\nTrue\nFalse"
            },
            {
              "kind": "text",
              "text": "`float(\"inf\")` — **cheksizlik**. Python'dagi har qanday sondan katta."
            },
            {
              "kind": "text",
              "text": "Nima uchun kerak? **Eng kichigini topish** uchun."
            },
            {
              "kind": "text",
              "text": "Dars 04 dagi eng kattasini topish naqshini eslang:"
            },
            {
              "kind": "pre",
              "text": "eng = None\neng_soni = 0                       # eng kichik boshlangʻich qiymat\nfor ...:\n    if soni > eng_soni:            # kattaroqmi?"
            },
            {
              "kind": "text",
              "text": "`0` dan boshlagan edik, chunki har qanday haqiqiy sanoq undan katta."
            },
            {
              "kind": "text",
              "text": "Endi bizga **teskarisi** kerak: eng kichik raqamli birlashtirishni topish."
            },
            {
              "kind": "pre",
              "text": "eng = None\neng_raqam = float(\"inf\")           # eng katta boshlangʻich qiymat\nfor ...:\n    if raqam < eng_raqam:          # kichikroqmi?"
            },
            {
              "kind": "text",
              "text": "**Bir xil naqsh, teskari yo'nalish.** Va boshlang'ich qiymat ham teskari: maksimum uchun `0`, minimum uchun `cheksizlik`."
            },
            {
              "kind": "text",
              "text": "Agar `eng_raqam = 999999` deb boshlaganimizda, 999999 dan katta token raqami bo'lsa xato chiqardi. `inf` esa **kafolatlangan**."
            },
            {
              "kind": "h3",
              "id": "va-ikkinchi-vazifa",
              "text": "Va ikkinchi vazifa"
            },
            {
              "kind": "text",
              "text": "`float(\"inf\")` bizga yana bir ish qiladi. Agar juftlik `merges` da **yo'q** bo'lsa:"
            },
            {
              "kind": "code",
              "code": "raqam = merges.get(juftlik, float(\"inf\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "`.get(kalit, standart)` (Dars 04) — juftlik topilmasa, `inf` qaytadi. Va `inf` hech qachon \"eng kichik\" bo'la olmaydi."
            },
            {
              "kind": "text",
              "text": "Ya'ni **\"bu juftlik o'rganilmagan, uni hech qachon tanlama\"** degan ma'no. Bitta qiymat, ikkita vazifa."
            },
            {
              "kind": "media",
              "id": "n2",
              "title": "Cheksizlik"
            }
          ]
        },
        {
          "id": "8-tez-encode",
          "title": "8. Tez `encode`",
          "blocks": [
            {
              "kind": "code",
              "code": "def encode(matn, merges):\n    tokenlar = kodla(matn)\n\n    while len(tokenlar) >= 2:\n        stats = get_stats(tokenlar)\n\n        eng_juftlik = None\n        eng_raqam = float(\"inf\")\n        for juftlik in stats:\n            raqam = merges.get(juftlik, float(\"inf\"))\n            if raqam < eng_raqam:\n                eng_raqam = raqam\n                eng_juftlik = juftlik\n\n        if eng_juftlik is None:\n            break\n\n        tokenlar = merge(tokenlar, eng_juftlik, merges[eng_juftlik])\n\n    return tokenlar",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "**Qatorma-qator:**"
            },
            {
              "kind": "bullets",
              "items": [
                "`while len(tokenlar) >= 2` — juftlik uchun kamida ikkita token kerak. Bitta token qolsa, ish tugadi.",
                "`stats = get_stats(tokenlar)` — matnda **hozir** qanday juftliklar bor. Diqqat: bizga sanoq kerak emas, faqat **qaysi juftliklar borligi**. Shuning uchun `for juftlik in stats` — qiymatlarsiz, faqat kalitlar bo'ylab.",
                "Min-topish naqshi — 7-bo'limdagi.",
                "`if eng_juftlik is None: break` — hech bir juftlik `merges` da yo'q. Hammasi `inf` bo'ldi, va `inf < inf` yolg'on (7-bo'limga qarang), shuning uchun `eng_juftlik` `None` bo'lib qoldi. To'xtaymiz.",
                "`merge(...)` — eng erta o'rganilgan juftlikni birlashtiramiz."
              ]
            },
            {
              "kind": "text",
              "text": "**G'oya:** har qadamda \"mavjud juftliklar ichidan **eng erta o'rganilganini** birlashtir\". Bu tartibni avtomatik to'g'ri saqlaydi."
            },
            {
              "kind": "h3",
              "id": "tekshiramiz",
              "text": "Tekshiramiz"
            },
            {
              "kind": "code",
              "code": "print(encode(\"bolalar\", merges))\nprint(\"oddiy bilan teng:\", encode(matn, merges) == encode_oddiy(matn, merges))\nprint(\"train bilan teng:\", encode(matn, merges) == tokenlar)\nprint(\"yangi matn teng :\", encode(yangi, merges) == encode_oddiy(yangi, merges))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[270, 256, 257]\noddiy bilan teng: True\ntrain bilan teng: True\nyangi matn teng : True"
            },
            {
              "kind": "text",
              "text": "**Uchala sinov ham o'tdi.** Ikki xil yozilgan funksiya, bir xil natija, 378 barobar tezlik farqi."
            }
          ]
        },
        {
          "id": "9-chekka-holatlar-va-boshqa-tillar",
          "title": "9. Chekka holatlar va boshqa tillar",
          "blocks": [
            {
              "kind": "code",
              "code": "print(encode(\"\", merges))\nprint(encode(\"a\", merges))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[]\n[97]"
            },
            {
              "kind": "text",
              "text": "Bo'sh matn — bo'sh ro'yxat. Bitta harf — bitta token, `while` sharti darhol yolg'on bo'ladi."
            },
            {
              "kind": "text",
              "text": "Boshqa tillarda:"
            },
            {
              "kind": "code",
              "code": "for s in [\"hello world\", \"привет мир\", \"你好\"]:\n    tk = encode(s, merges)\n    print(f\"  {s!r:15s} -> {len(tk):3d} token | round-trip: {decode(tk, vocab) == s}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  'hello world'   ->  11 token | round-trip: True\n  'привет мир'    ->  19 token | round-trip: True\n  '你好'            ->   6 token | round-trip: True"
            },
            {
              "kind": "text",
              "text": "**Hammasi ishlaydi.** Tokenizator o'zbek matnida o'qitilgan, lekin xitoy matnini ham buzilmasdan kodlaydi — chunki u **bayt darajasida** ishlaydi (Dars 06)."
            },
            {
              "kind": "text",
              "text": "Yaxshi kodlaydimi? Yo'q — `你好` ikkita belgi uchun 6 token. Lekin **qulamaydi**, va round-trip to'g'ri. Dars 06 dagi va'da bajarildi: `<UNK>` degan narsa yo'q."
            }
          ]
        },
        {
          "id": "10-muammo",
          "title": "10. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Tokenizator ishlaydi. Endi uning **sifatiga** qaraymiz."
            },
            {
              "kind": "text",
              "text": "4-bo'limdagi jadvalga qayting. 261-token — `b'lar '`, oxirida **bo'shliq bilan**."
            },
            {
              "kind": "text",
              "text": "Bu nimani anglatadi:"
            },
            {
              "kind": "code",
              "code": "print(\"bolalar keldi  :\", encode(\"bolalar keldi\", merges))\nprint(\"bolalar, keldi :\", encode(\"bolalar, keldi\", merges))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bolalar keldi  : [270, 275, 107, 101, 108, 259]\nbolalar, keldi : [270, 256, 257, 44, 32, 107, 101, 108, 259]"
            },
            {
              "kind": "text",
              "text": "**6 token va 9 token.** Bitta vergul uchta qoʻshimcha token turdi."
            },
            {
              "kind": "text",
              "text": "Faqat `bolalar` qismini ajratamiz:"
            },
            {
              "kind": "table",
              "head": [
                "Matn",
                "Tokenlar",
                "Soni"
              ],
              "rows": [
                [
                  "`bolalar `",
                  "`bo` + `lalar `",
                  "**2**"
                ],
                [
                  "`bolalar,`",
                  "`bo` + `la` + `lar` + `,` + `␣`",
                  "**5**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Birinchisida 275-token (`lalar `) ishladi — u boʻshliq bilan tugaydi. Ikkinchisida boʻshliq oʻrniga vergul turibdi, shuning uchun u **umuman ishlamaydi**, va soʻz mayda boʻlaklarga tarqab ketadi."
            },
            {
              "kind": "text",
              "text": "**Bitta so'z, ikki xil kodlash.** Va lug'atda ikkala variant uchun alohida token kerak bo'ladi."
            },
            {
              "kind": "text",
              "text": "Dars 10 dagi 300-tokenni ham eslang: `b'maktabga borishdi. U'` — uchta so'z, nuqta va keyingi so'zning boshi, bitta tokenda."
            },
            {
              "kind": "text",
              "text": "**Muammoning ildizi:** BPE ga hech kim \"so'z chegarasidan o'tma\" demagan. U bo'shliqni ham oddiy bayt deb biladi (Dars 05: `ord(\" \")` = 32)."
            },
            {
              "kind": "text",
              "text": "Bu lug'at joyini isrof qiladi:"
            },
            {
              "kind": "pre",
              "text": "\"bolalar \"   \"bolalar,\"   \"bolalarni\"   \"bolalar.\""
            },
            {
              "kind": "text",
              "text": "To'rtta alohida token — bitta so'z uchun."
            },
            {
              "kind": "text",
              "text": "Keyingi dars shu muammoni hal qiladi."
            }
          ]
        },
        {
          "id": "11-toliq-kod",
          "title": "11. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "def encode(matn, merges):\n    tokenlar = kodla(matn)\n\n    while len(tokenlar) >= 2:\n        stats = get_stats(tokenlar)\n\n        eng_juftlik = None\n        eng_raqam = float(\"inf\")\n        for juftlik in stats:\n            raqam = merges.get(juftlik, float(\"inf\"))\n            if raqam < eng_raqam:\n                eng_raqam = raqam\n                eng_juftlik = juftlik\n\n        if eng_juftlik is None:\n            break\n\n        tokenlar = merge(tokenlar, eng_juftlik, merges[eng_juftlik])\n\n    return tokenlar\n\n\n# ---- Sinovlar ----\nmerges, vocab, tokenlar = train(matn, 276)\n\n# 1. train bilan mos keladimi\nprint(\"train bilan teng:\", encode(matn, merges) == tokenlar)\n\n# 2. Yangi matnda round-trip\nyangi = \"Talabalar universitetga kirishdi va imtihonlarni topshirishdi.\"\nte = encode(yangi, merges)\nprint(\"tokenlar:\", len(te), \"| round-trip:\", decode(te, vocab) == yangi)\n\n# 3. Haqiqiy fertility\nprint(\"oʻqigan matn:\", round(len(tokenlar) / len(matn.split()), 3))\nprint(\"yangi matn  :\", round(len(te) / len(yangi.split()), 3))\n\n# 4. Chekka holatlar\nprint(encode(\"\", merges), encode(\"a\", merges))\n\n# 5. Boshqa tillar\nfor s in [\"hello world\", \"привет мир\", \"你好\"]:\n    tk = encode(s, merges)\n    print(f\"  {s!r:15s} -> {len(tk):3d} token | round-trip: {decode(tk, vocab) == s}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "train bilan teng: True\ntokenlar: 41 | round-trip: True\noʻqigan matn: 5.396\nyangi matn  : 6.833\n[] [97]\n  'hello world'   ->  11 token | round-trip: True\n  'привет мир'    ->  19 token | round-trip: True\n  '你好'            ->   6 token | round-trip: True",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "12-ozingiz-yozing",
          "title": "12. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "def encode(matn, merges):\n    tokenlar = ___(matn)\n\n    while len(tokenlar) >= ___:\n        stats = ___(tokenlar)\n\n        eng_juftlik = ___\n        eng_raqam = float(___)\n        for juftlik in stats:\n            raqam = merges.___(juftlik, float(\"inf\"))\n            if raqam ___ eng_raqam:\n                eng_raqam = ___\n                eng_juftlik = ___\n\n        if eng_juftlik ___ None:\n            break\n\n        tokenlar = ___(tokenlar, eng_juftlik, merges[___])\n\n    return tokenlar",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "def encode(matn, merges):\n    tokenlar = kodla(matn)\n\n    while len(tokenlar) >= 2:\n        stats = get_stats(tokenlar)\n\n        eng_juftlik = None\n        eng_raqam = float(\"inf\")\n        for juftlik in stats:\n            raqam = merges.get(juftlik, float(\"inf\"))\n            if raqam < eng_raqam:\n                eng_raqam = raqam\n                eng_juftlik = juftlik\n\n        if eng_juftlik is None:\n            break\n\n        tokenlar = merge(tokenlar, eng_juftlik, merges[eng_juftlik])\n\n    return tokenlar",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "text",
                  "text": "Uchta eng ko'p xato:"
                },
                {
                  "kind": "steps",
                  "items": [
                    "`if raqam > eng_raqam` — **eng kattasini** izlash. Natija: teskari tartib, 1-bo'limdagi muammo.",
                    "`eng_raqam = 0` — `inf` o'rniga nol. Unda hech qachon hech narsa tanlanmaydi (`raqam < 0` hech qachon rost bo'lmaydi), va funksiya baytlarni o'zgarishsiz qaytaradi. **Xato bermaydi** — shunchaki hech narsa qilmaydi.",
                    "`while len(tokenlar) >= 1` — bitta token qolganda `get_stats` bo'sh qaytaradi, `eng_juftlik` `None` bo'ladi, `break` ishlaydi. Ya'ni bu xato **ishlaydi**, lekin bitta ortiqcha aylanish qiladi."
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "13-mashqlar",
          "title": "13. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`encode(\"la\", merges)` va `encode(\"lar\", merges)` nima qaytaradi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(encode(\"la\", merges))    # [256]\nprint(encode(\"lar\", merges))   # [257]",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "`la` → 256 (bitta token), `lar` → 257 (bitta token)."
                  },
                  {
                    "kind": "text",
                    "text": "Diqqat: `lar` **ikkita** birlashtirish natijasi (`l+a`, keyin `la+r`), lekin oxirida bitta token."
                  },
                  {
                    "kind": "text",
                    "text": "Uch harf → bitta token. Bu aynan biz xohlagan narsa."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Nima uchun bu ikkisi har xil?"
                },
                {
                  "kind": "code",
                  "code": "print(len(encode(\"bolalar\", merges)))\nprint(len(encode(\"Bolalar\", merges)))",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "3\n4"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`bolalar` → `[270, 256, 257]` = `bo` + `la` + `lar`",
                      "`Bolalar` → `[66, 111, 256, 257]` = `B` + `o` + `la` + `lar`"
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Katta `B` (66) va kichik `b` (98) — **boshqa baytlar** (Dars 05). Tokenizator `bo` juftligini o'rgangan, `Bo` ni esa o'rganmagan (matnda u kamroq uchragan)."
                  },
                  {
                    "kind": "text",
                    "text": "Shuning uchun katta harfli so'z bitta token ko'proq turadi."
                  },
                  {
                    "kind": "text",
                    "text": "**Amaliy xulosa:** agar matnni oldindan kichik harfga o'tkazsangiz (`.lower()`), lug'at joyi tejaladi. Lekin unda model katta harflarni umuman yo'qotadi. Bu — haqiqiy tanlov, va ikkala yo'lning ham narxi bor."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`merges` ni bo'sh lug'at qilib `encode` ga bering. Nima bo'ladi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(encode(\"bolalar\", {}))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "[98, 111, 108, 97, 108, 97, 114]"
                  },
                  {
                    "kind": "text",
                    "text": "Sof baytlar — Dars 07 dagi tokenizator."
                  },
                  {
                    "kind": "text",
                    "text": "Nima bo'ldi: `merges.get(juftlik, float(\"inf\"))` hamma juftlik uchun `inf` qaytardi. `inf < inf` yolg'on, shuning uchun `eng_juftlik` `None` bo'lib qoldi va birinchi aylanishdayoq `break` ishladi."
                  },
                  {
                    "kind": "text",
                    "text": "**Bu — to'g'ri xulq.** Birlashtirish yo'q bo'lsa, natija bayt darajasida bo'lishi kerak. Va hech qanday maxsus tekshiruv yozmadik — `inf` o'zi hal qildi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`encode` ni ikki marta ketma-ket qo'llasangiz nima bo'ladi?"
                },
                {
                  "kind": "code",
                  "code": "a = encode(\"bolalar\", merges)\nb = encode(decode(a, vocab), merges)\nprint(a == b)",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "True"
                  },
                  {
                    "kind": "text",
                    "text": "`encode` → `decode` → `encode` bir xil natija beradi."
                  },
                  {
                    "kind": "text",
                    "text": "Bu **barqarorlik** (idempotence) deb ataladi va u muhim xususiyat: matnni kodlab, dekodlab, qayta kodlasangiz — hech narsa o'zgarmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Agar bu `False` bo'lsa, tokenizatoringizda jiddiy xato bor: har bir kodlash-dekodlash aylanishi matnni asta-sekin buzadi."
                  },
                  {
                    "kind": "text",
                    "text": "**Bu sinovni Dars 18 da klassga qo'shing.** U round-trip sinoviga qaraganda kuchliroq."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Tokenizatorni **o'z matningizda** o'qiting (`vocab_size = 406`), keyin fertility ni ikki joyda o'lchang: o'quv matnida va yangi jumlada. Farq qancha?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "m2, v2, t2 = train(matn, 406)\n\nyangi = \"Talabalar universitetga kirishdi va imtihonlarni topshirishdi.\"\nte2 = encode(yangi, m2)\n\nprint(\"oʻqigan matn:\", round(len(t2) / len(matn.split()), 3))\nprint(\"yangi matn  :\", round(len(te2) / len(yangi.split()), 3))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "oʻqigan matn: 1.472\nyangi matn  : 6.167"
                  },
                  {
                    "kind": "text",
                    "text": "Oʻqigan matnda **1.472** (Dars 10 dagi chiroyli raqam). Yangi matnda **6.167** — toʻrt barobardan koʻproq yomon."
                  },
                  {
                    "kind": "text",
                    "text": "**Farq nima uchun bunchalik katta?** Chunki 150 ta birlashtirishning ko'pchiligi **matnga xos** edi — `maktabga borishdi. U` kabi. Ular yangi matnda umuman uchramaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Ya'ni lug'atning katta qismi **o'lik og'irlik**: joy egallaydi, foyda bermaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Ikkita raqam orasidagi farq — bu **yodlab olishning o'lchovi**. Farq qancha katta bo'lsa, tokenizator shuncha ko'p yodlagan va shuncha kam o'rgangan."
                  },
                  {
                    "kind": "text",
                    "text": "Haqiqiy tokenizatorda (16 384 token, millionlab so'zli korpus) bu farq juda kichik bo'ladi — chunki u yodlashga ulgurmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "**Dars 17 da bu farqni to'g'ri o'lchashni o'rganamiz.**"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "14-xulosa",
          "title": "14. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "Birlashtirishlar **o'qitilgan tartibda** qo'llanilishi shart. Aks holda boshqa tokenlar chiqadi va model ularni tanimaydi.",
                "`encode_oddiy` — hamma birlashtirishni tartib bilan qo'llash. To'g'ri, lekin `merges` hajmiga qarab sekinlashadi.",
                "Tez `encode` — har qadamda **eng erta o'rganilgan mavjud** juftlikni birlashtirish. Vaqti `merges` hajmiga bog'liq emas.",
                "16 128 ta birlashtirishda farq — **378 barobar**. Lekin 20 tada oddiy usul tezroq: \"tezroq algoritm\" har doim tezroq emas.",
                "`float(\"inf\")` ikki ish qiladi: minimum uchun boshlang'ich qiymat, va \"o'rganilmagan juftlikni hech qachon tanlama\" belgisi.",
                "**Asosiy sinov:** `encode(matn) == train dagi tokenlar`.",
                "Fertility o'qigan matnda 5.396, yangi matnda 6.833. **Haqiqiysi — ikkinchisi.**"
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Tokenizator to'liq ishlaydi. Endi uni **yaxshilaymiz**."
            },
            {
              "kind": "text",
              "text": "**Dars 13 — So'z chegarasi muammosi.** `b'lar '`, `b'maktabga borishdi. U'` — bo'shliq va tinish belgilari token ichiga kirib ketyapti. Buni regex bilan to'xtatamiz."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *`bolalar`, `bolalar,`, `bolalarni`, `bolalar.` — bular tokenizator uchun necha xil narsa, va nechta bo'lishi kerak?*"
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–11. `merges`, `merge`, `get_stats`, `decode`"
    },
    {
      "id": "dars-13",
      "n": 13,
      "title": "So'z chegarasi va regex",
      "subtitle": "",
      "minutes": 55,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "bullets",
              "items": [
                "**ko'rasiz** tokenizatoringiz matnni yodlab olishining **haqiqiy sababini**;",
                "**o'rganasiz** regex asoslarini — matnni naqsh bo'yicha bo'lish;",
                "**tekshirasiz** naqshingiz o'zbek `ʻ` belgisini buzmasligini (ko'pchilik buni unutadi);",
                "**qurasiz** matnni oldindan bo'lib, keyin BPE qo'llaydigan tokenizatorni;",
                "**ko'rasiz** eng uzun token **228 baytdan 13 baytga** tushishini;",
                "**tushunasiz** nima uchun to'g'ri yechim ba'zan raqamni **yomonlashtirishini**."
              ]
            },
            {
              "kind": "text",
              "text": "Oxirgi punkt — bu darsning eng qiyin va eng foydali qismi."
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 12 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "`bolalar`, `bolalar,`, `bolalarni`, `bolalar.` — bular tokenizator uchun necha xil narsa, va nechta bo'lishi kerak?"
            },
            {
              "kind": "text",
              "text": "Tekshiramiz:"
            },
            {
              "kind": "code",
              "code": "for s in [\"bolalar\", \"bolalar,\", \"bolalarni\", \"bolalar.\"]:\n    print(f\"  {s!r:12s} -> {encode(s, merges)}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  'bolalar'    -> [270, 256, 257]\n  'bolalar,'   -> [270, 256, 257, 44]\n  'bolalarni'  -> [270, 256, 257, 110, 105]\n  'bolalar.'   -> [270, 256, 257, 46]"
            },
            {
              "kind": "text",
              "text": "Bu unchalik yomon ko'rinmaydi — hammasi `[270, 256, 257]` bilan boshlanadi."
            },
            {
              "kind": "text",
              "text": "Lekin Dars 12 dagi haqiqiy misolni eslang:"
            },
            {
              "kind": "code",
              "code": "print(\"bolalar keldi  :\", len(encode(\"bolalar keldi\", merges)), \"token\")\nprint(\"bolalar, keldi :\", len(encode(\"bolalar, keldi\", merges)), \"token\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bolalar keldi  : 6 token\nbolalar, keldi : 9 token"
            },
            {
              "kind": "text",
              "text": "**Bitta vergul — uchta qo'shimcha token.**"
            },
            {
              "kind": "text",
              "text": "Chunki bo'shliq bilan yozilganda 275-token (`b'lalar '`, oxirida bo'shliq bilan) ishlaydi. Vergul qo'ysangiz — u **umuman ishlamaydi**, va so'z mayda bo'laklarga tarqab ketadi."
            },
            {
              "kind": "text",
              "text": "Muammo bitta narsada: **tokenizator uchun bo'shliq — oddiy belgi.** U so'z chegarasi degan narsani bilmaydi."
            }
          ]
        },
        {
          "id": "2-muammoning-haqiqiy-hajmi",
          "title": "2. Muammoning haqiqiy hajmi",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 10 dagi eng yomon holatni eslang. `vocab_size = 406` bilan o'qitganimizda 355-token shunday chiqqan edi:"
            },
            {
              "kind": "pre",
              "text": "b'Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftar...'"
            },
            {
              "kind": "text",
              "text": "O'lchaymiz:"
            },
            {
              "kind": "code",
              "code": "m_2, v_2, t_2 = train(matn, 406)\nprint(\"eng uzun token:\", len(max(v_2.values(), key=len)), \"bayt\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "eng uzun token: 228 bayt"
            },
            {
              "kind": "text",
              "text": "**228 bayt.** Bitta \"token\" — deyarli butun xatboshi."
            },
            {
              "kind": "text",
              "text": "Va lug'atda bunday tokenlar ko'p: `di.`, `lar `, `a `, `i `, `ga `, `ishdi.`, `rishdi.`, `ni ` — birinchi 20 ta tokendan **9 tasi** bo'shliq yoki tinish belgisini o'z ichiga oladi."
            },
            {
              "kind": "text",
              "text": "**Bu lug'at joyining isrofi.** `lar` va `lar ` — deyarli bir xil narsa, lekin ikkita alohida token. Sizning tokenizatoringizda 16 384 ta joy bor; har bir takroriy variant foydali token uchun yo'qolgan joy."
            }
          ]
        },
        {
          "id": "3-yechim-oldindan-bolish",
          "title": "3. Yechim: oldindan bo'lish",
          "blocks": [
            {
              "kind": "text",
              "text": "G'oya oddiy:"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Matnni avval so'zlarga bo'lamiz. Keyin BPE ni har bir so'z ichida alohida ishlatamiz. Birlashtirish hech qachon so'z chegarasidan o'tmaydi.**"
            },
            {
              "kind": "text",
              "text": "Ya'ni:"
            },
            {
              "kind": "pre",
              "text": "\"bolalar, keldi\"\n     ↓  oldindan boʻlish\n[\"bolalar\", \",\", \" keldi\"]\n     ↓  har biriga alohida BPE\n[b,o,lalar] [,] [ keldi...]"
            },
            {
              "kind": "text",
              "text": "Birlashtirish faqat bitta bo'lak ichida bo'ladi. `r` va `,` hech qachon birlashmaydi, chunki ular boshqa bo'laklarda."
            },
            {
              "kind": "text",
              "text": "Buni qiladigan vosita — **regex**."
            }
          ]
        },
        {
          "id": "4-regex-asoslari",
          "title": "4. Regex asoslari",
          "blocks": [
            {
              "kind": "text",
              "text": "**Regex** (regular expression, \"muntazam ifoda\") — matnda **naqsh** qidirish tili. Python'da u `re` moduli orqali ishlaydi."
            },
            {
              "kind": "code",
              "code": "import re\n\nprint(re.findall(r\"\\w+\", \"Ular oʻqishdi, va!\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['Ular', 'oʻqishdi', 'va']"
            },
            {
              "kind": "bullets",
              "items": [
                "`re.findall(naqsh, matn)` — naqshga mos keladigan **hamma** bo'lakni topadi va ro'yxat qaytaradi.",
                "`r\"...\"` — **xom satr** (raw string). `r` old qo'shimchasi Python'ga \"`\\` belgisini oddiy belgi deb qabul qil\" deydi. Regex da `\\` juda ko'p ishlatiladi, shuning uchun `r` deyarli har doim qo'yiladi."
              ]
            },
            {
              "kind": "h3",
              "id": "kerakli-uchta-naqsh",
              "text": "Kerakli uchta naqsh"
            },
            {
              "kind": "code",
              "code": "print(re.findall(r\"\\w+\",      \"Ular oʻqishdi, va!\"))\nprint(re.findall(r\"[^\\s\\w]+\", \"Ular oʻqishdi, va!\"))\nprint(re.findall(r\"\\s+\",      \"Ular oʻqishdi, va!\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['Ular', 'oʻqishdi', 'va']\n[',', '!']\n[' ', ' ']"
            },
            {
              "kind": "table",
              "head": [
                "Naqsh",
                "Ma'nosi"
              ],
              "rows": [
                [
                  "`\\w`",
                  "**so'z belgisi** — harf, raqam yoki `_`"
                ],
                [
                  "`\\s`",
                  "**bo'shliq** — probel, tabulyatsiya, yangi qator"
                ],
                [
                  "`+`",
                  "oldingisidan **bir yoki ko'p**"
                ],
                [
                  "`[...]`",
                  "qavs ichidagilardan **bittasi**"
                ],
                [
                  "`[^...]`",
                  "qavs ichidagilardan **bo'lmagan** bittasi"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Demak:"
            },
            {
              "kind": "bullets",
              "items": [
                "`\\w+` — ketma-ket kelgan bir yoki bir nechta so'z belgisi",
                "`[^\\s\\w]+` — bo'shliq ham, so'z belgisi ham **bo'lmagan** narsalar, ya'ni tinish belgilari",
                "`\\s+` — bo'shliqlar"
              ]
            }
          ]
        },
        {
          "id": "5-eng-muhim-tekshiruv-buzilmaydimi",
          "title": "5. ⚠️ Eng muhim tekshiruv: `ʻ` buzilmaydimi?",
          "blocks": [
            {
              "kind": "text",
              "text": "**To'xtang.** Naqsh yozishdan oldin, uni o'zbek matnida sinash **shart**."
            },
            {
              "kind": "text",
              "text": "Ko'pchilik shunday yozadi:"
            },
            {
              "kind": "code",
              "code": "print(re.findall(r\"[a-zA-Z]+\", \"oʻqish gʻalaba\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['o', 'qish', 'g', 'alaba']"
            },
            {
              "kind": "text",
              "text": "**Falokat.** `oʻqish` uchga bo'lindi: `o`, `ʻ`, `qish` — va o'rtadagi `ʻ` umuman yo'qoldi."
            },
            {
              "kind": "text",
              "text": "Sabab: `[a-zA-Z]` faqat ingliz harflarini biladi. `ʻ` (U+02BB) u uchun harf emas."
            },
            {
              "kind": "text",
              "text": "Endi to'g'ri variantni sinaymiz:"
            },
            {
              "kind": "code",
              "code": "print(re.findall(r\"\\w+\", \"oʻqish gʻalaba\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['oʻqish', 'gʻalaba']"
            },
            {
              "kind": "text",
              "text": "**Ishladi.** `\\w` — bu ASCII emas, u **Unicode** bo'yicha ishlaydi."
            },
            {
              "kind": "text",
              "text": "Nima uchun ishladi? Tekshiramiz:"
            },
            {
              "kind": "code",
              "code": "import unicodedata\nprint(unicodedata.category(\"ʻ\"), \"ʻ\".isalpha())",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Lm True"
            },
            {
              "kind": "text",
              "text": "`Lm` — *Letter, modifier* (\"o'zgartiruvchi harf\"). Python uni **harf** deb biladi, shuning uchun `\\w` uni qabul qiladi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Bu tasodif.** Unicode tuzuvchilari `ʻ` ni `Lm` kategoriyasiga qo'ygan — va aynan shuning uchun bizning naqshimiz ishlaydi. Boshqa kategoriyada bo'lganida, o'zbek tili uchun maxsus naqsh yozishga to'g'ri kelardi. **Xulosa:** naqshni har doim **o'z tilingizda sinab ko'ring.** Ingliz matnida ishlagani hech narsani kafolatlamaydi."
            },
            {
              "kind": "media",
              "id": "o2",
              "title": "[a-zA-Z] oʻzbekchani buzadi"
            }
          ]
        },
        {
          "id": "6-toliq-naqsh",
          "title": "6. To'liq naqsh",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi uchala qismni birlashtiramiz:"
            },
            {
              "kind": "code",
              "code": "NAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "`|` — **\"yoki\"**. Python chapdan o'ngga sinab ko'radi va birinchi mos kelganini oladi."
            },
            {
              "kind": "text",
              "text": "Uchta variant:"
            },
            {
              "kind": "table",
              "head": [
                "Qism",
                "Nimani tutadi"
              ],
              "rows": [
                [
                  "` ?\\w+`",
                  "ixtiyoriy bo'shliq + so'z. Masalan ` maktabga`"
                ],
                [
                  "` ?[^\\s\\w]+`",
                  "ixtiyoriy bo'shliq + tinish. Masalan ` —` yoki `,`"
                ],
                [
                  "`\\s+`",
                  "qolgan bo'shliqlar (yangi qator, ketma-ket probellar)"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "`?` — **\"nol yoki bitta\"**. Ya'ni bo'shliq bo'lsa ham, bo'lmasa ham mos keladi."
            },
            {
              "kind": "text",
              "text": "Sinaymiz:"
            },
            {
              "kind": "code",
              "code": "namuna = \"Bolalar maktabga borishdi. Ular oʻqishdi, va yozishdi!\"\nprint(re.findall(NAQSH, namuna))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['Bolalar', ' maktabga', ' borishdi', '.', ' Ular', ' oʻqishdi', ',', ' va', ' yozishdi', '!']"
            },
            {
              "kind": "text",
              "text": "**Diqqat qiling: bo'shliq so'zning oldiga yopishdi**, orqasiga emas."
            },
            {
              "kind": "text",
              "text": "` maktabga` — bo'shliq va so'z birga. Nima uchun shunday?"
            },
            {
              "kind": "text",
              "text": "Chunki matnda so'z **deyarli har doim** bo'shliqdan keyin keladi. Agar bo'shliq so'zning bir qismi bo'lsa, tokenizator ` maktabga` ni bitta token qilib o'rganishi mumkin — va u har joyda ishlaydi. Agar bo'shliq orqaga yopishsa (`maktabga `), u faqat keyin bo'shliq kelganda ishlardi — vergul kelsa, buzilardi."
            },
            {
              "kind": "text",
              "text": "**Bu aynan 1-bo'limdagi muammoning yechimi.**"
            },
            {
              "kind": "h3",
              "id": "eng-muhim-tekshiruv-hech-narsa-yoqolmadimi",
              "text": "Eng muhim tekshiruv: hech narsa yo'qolmadimi?"
            },
            {
              "kind": "code",
              "code": "boshlar = re.findall(NAQSH, matn)\nprint(\"parchalar soni:\", len(boshlar))\nprint(\"round-trip:\", \"\".join(boshlar) == matn)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "parchalar soni: 73\nround-trip: True"
            },
            {
              "kind": "text",
              "text": "Bo'laklarni qayta yopishtirsak, **aynan asl matn** chiqadi. Hech bir belgi yo'qolmadi — bo'shliqlar ham, yangi qatorlar ham."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Bu tekshiruvni hech qachon o'tkazib yubormang.** Naqsh yozganda bir narsani unutish juda oson, va natijada matnning bir qismi jimgina yo'qoladi. Sinab ko'ring: `re.findall(r\"\\w+\", matn)` bilan `\"\".join(...)` qilsangiz → `False`. Barcha bo'shliq va tinish belgilari yo'qolgan bo'ladi."
            }
          ]
        },
        {
          "id": "7-treningni-ozgartiramiz",
          "title": "7. Treningni o'zgartiramiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi `train` ni yangilaymiz. Ikkita o'zgarish:"
            },
            {
              "kind": "text",
              "text": "**1. Matnni bo'laklarga ajratamiz.** **2. Statistikani hamma bo'lakdan yig'amiz, lekin merge har bo'lakda alohida.**"
            },
            {
              "kind": "text",
              "text": "Birinchi navbatda `get_stats` ning yig'adigan variantini yozamiz:"
            },
            {
              "kind": "code",
              "code": "def get_stats_qoshib(tokenlar, hisob):\n    for juftlik in zip(tokenlar, tokenlar[1:]):\n        hisob[juftlik] = hisob.get(juftlik, 0) + 1\n    return hisob",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Farqi: u **tayyor lug'atni** qabul qiladi va unga qo'shadi. Shunda bir nechta bo'lakdan bitta umumiy statistika yig'ish mumkin:"
            },
            {
              "kind": "code",
              "code": "h = {}\nget_stats_qoshib([1, 2, 3], h)\nget_stats_qoshib([2, 3, 4], h)\nprint(h)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{(1, 2): 1, (2, 3): 2, (3, 4): 1}"
            },
            {
              "kind": "text",
              "text": "`(2, 3)` ikkala ro'yxatda ham bor — sanoq **2** bo'ldi. ✓"
            },
            {
              "kind": "text",
              "text": "Endi trening:"
            },
            {
              "kind": "code",
              "code": "def train_regex(matn, vocab_size, naqsh):\n    boshlar = re.findall(naqsh, matn)\n\n    parchalar = []\n    for b in boshlar:\n        parchalar.append(kodla(b))\n\n    merges = {}\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n\n    for yangi_id in range(256, vocab_size):\n        stats = {}\n        for p in parchalar:\n            get_stats_qoshib(p, stats)\n\n        if len(stats) == 0:\n            break\n\n        eng = max(stats, key=stats.get)\n\n        yangi_parchalar = []\n        for p in parchalar:\n            yangi_parchalar.append(merge(p, eng, yangi_id))\n        parchalar = yangi_parchalar\n\n        merges[eng] = yangi_id\n        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n\n    return merges, vocab, parchalar",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "**Dars 10 dagidan farqi:**"
            },
            {
              "kind": "table",
              "head": [
                "Dars 10",
                "Dars 13"
              ],
              "rows": [
                [
                  "`tokenlar` — bitta uzun ro'yxat",
                  "`parchalar` — ro'yxatlar ro'yxati"
                ],
                [
                  "`get_stats(tokenlar)`",
                  "har bir parchadan **yig'iladi**"
                ],
                [
                  "`merge(tokenlar, ...)`",
                  "**har bir parchaga alohida**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Mana shu \"har bir parchaga alohida\" — butun yechim shu yerda. Juftlik ikki parcha orasida bo'la olmaydi, chunki ular alohida ro'yxatlar."
            }
          ]
        },
        {
          "id": "8-natijani-koramiz",
          "title": "8. Natijani ko'ramiz",
          "blocks": [
            {
              "kind": "code",
              "code": "NAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\nm_r, v_r, p_r = train_regex(matn, 276, NAQSH)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Ikkala lug'atni yonma-yon qo'yamiz:"
            },
            {
              "kind": "pre",
              "text": "       regexsiz          regexli\n  256: b'la'             b'la'\n  257: b'lar'            b'lar'\n  258: b'sh'             b'sh'\n  259: b'di'             b'di'\n  260: b'di.'            b'ish'\n  261: b'lar '           b'ishdi'\n  262: b'ish'            b'ga'\n  263: b'a '             b' b'\n  264: b'ishdi.'         b'\\xca\\xbb'\n  265: b'i '             b'ta'\n  266: b'ga '            b'rishdi'\n  267: b'\\xca\\xbb'       b'da'\n  268: b'ta'             b'hi'\n  269: b'rishdi.'        b' bo'\n  270: b'bo'             b'ni'\n  271: b'ni '            b'\\xca\\xbbq'\n  272: b'\\xca\\xbbq'      b' y'\n  273: b'da'             b'lalar'\n  274: b'ch'             b'it'\n  275: b'lalar '         b'ob'"
            },
            {
              "kind": "text",
              "text": "**Chap ustunda** bo'shliq va nuqta bilan ifloslangan tokenlar: `di.`, `lar `, `a `, `i `, `ga `, `ishdi.`, `rishdi.`, `ni `, `lalar ` — **to'qqiztasi**."
            },
            {
              "kind": "text",
              "text": "**O'ng ustunda** esa toza morfemalar: `la`, `lar`, `sh`, `di`, `ish`, `ishdi`, `ga`, `ta`, `rishdi`, `da`, `ni`, `lalar` — **hech birida nuqta yo'q**."
            },
            {
              "kind": "text",
              "text": "`b' b'`, `b' bo'`, `b' y'` — bularda bo'shliq **oldinda**, va bu to'g'ri: ular so'z **boshlanishini** bildiradi."
            }
          ]
        },
        {
          "id": "9-hal-qiluvchi-dalil",
          "title": "9. Hal qiluvchi dalil",
          "blocks": [
            {
              "kind": "code",
              "code": "m_r2, v_r2, _ = train_regex(matn, 406, NAQSH)\nm_2, v_2, _ = train(matn, 406)\n\nprint(\"regexsiz eng uzun token:\", len(max(v_2.values(), key=len)), \"bayt\")\nprint(\"regexli  eng uzun token:\", len(max(v_r2.values(), key=len)), \"bayt\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "regexsiz eng uzun token: 228 bayt\nregexli  eng uzun token: 13 bayt"
            },
            {
              "kind": "text",
              "text": "**228 → 13.**"
            },
            {
              "kind": "text",
              "text": "Sababi oddiy va kafolatlangan: **token hech qachon bitta bo'lakdan uzun bo'la olmaydi.** Eng uzun bo'lak — eng uzun so'z. Demak eng uzun token — eng uzun so'z."
            },
            {
              "kind": "text",
              "text": "Yodlab olish endi **imkonsiz**. Tokenizator qancha ko'p birlashtirish qilmasin, u butun jumlani bitta token qila olmaydi."
            },
            {
              "kind": "text",
              "text": "Dars 10 dagi 355-tokenni solishtiring:"
            },
            {
              "kind": "pre",
              "text": "regexsiz 355 = b'Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftar...'\nregexli  355 = b'Kechqur'"
            },
            {
              "kind": "media",
              "id": "o1",
              "title": "Chegara"
            }
          ]
        },
        {
          "id": "10-encode-ni-ham-ozgartiramiz",
          "title": "10. `encode` ni ham o'zgartiramiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Agar trening bo'laklar bilan bo'lsa, kodlash ham shunday bo'lishi shart. Natijani o'lchashdan oldin shu funksiya kerak bo'ladi:"
            },
            {
              "kind": "code",
              "code": "def encode_regex(matn, merges, naqsh):\n    natija = []\n\n    for bosh in re.findall(naqsh, matn):\n        tk = kodla(bosh)\n\n        while len(tk) >= 2:\n            stats = {}\n            get_stats_qoshib(tk, stats)\n            eng_j = None\n            eng_r = float(\"inf\")\n            for j in stats:\n                r = merges.get(j, float(\"inf\"))\n                if r < eng_r:\n                    eng_r = r\n                    eng_j = j\n            if eng_j is None:\n                break\n            tk = merge(tk, eng_j, merges[eng_j])\n\n        natija = natija + tk\n\n    return natija",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Ichkarisi — Dars 12 dagi `encode` ning o'zi. Farqi: u **har bir bo'lak uchun alohida** ishlaydi, natijalar oxirida birlashtiriladi."
            },
            {
              "kind": "code",
              "code": "yangi = \"Talabalar universitetga kirishdi va imtihonlarni topshirishdi.\"\n\nte = encode_regex(yangi, m_r, NAQSH)\nprint(\"tokenlar:\", len(te), \"| round-trip:\", decode(te, v_r) == yangi)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "tokenlar: 42 | round-trip: True"
            },
            {
              "kind": "note",
              "tone": "warn",
              "text": "**`encode` va `train` bir xil naqshni ishlatishi shart.** Agar boshqa naqsh ishlatsangiz — boshqa bo'laklar, boshqa tokenlar, va model hech narsani tanimaydi. Dars 18 da naqshni tokenizator bilan birga saqlaysiz."
            }
          ]
        },
        {
          "id": "11-halol-gap-raqam-yomonlashdi",
          "title": "11. Halol gap: raqam yomonlashdi",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi eng qiyin qismi. Fertility ni o'lchaymiz:"
            },
            {
              "kind": "code",
              "code": "w = len(yangi.split())\n\nprint(\"regexsiz, yangi matn:\", round(len(encode(yangi, merges)) / w, 3))\nprint(\"regexli,  yangi matn:\", round(len(encode_regex(yangi, m_r, NAQSH)) / w, 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "regexsiz, yangi matn: 6.833\nregexli,  yangi matn: 7.0"
            },
            {
              "kind": "text",
              "text": "**Regex fertility ni yomonlashtirdi.** 6.833 dan 7.0 ga."
            },
            {
              "kind": "text",
              "text": "Va Dars 12 dagi misolda ham:"
            },
            {
              "kind": "pre",
              "text": "bolalar keldi   regexsiz: 6 token | regexli: 8 token\nbolalar, keldi  regexsiz: 9 token | regexli: 9 token"
            },
            {
              "kind": "text",
              "text": "Birinchi holatda regexli variant **yomonroq** (8 vs 6)."
            },
            {
              "kind": "text",
              "text": "**Demak biz vaziyatni buzdikmi?**"
            },
            {
              "kind": "h3",
              "id": "yoq-va-nima-uchun-ekanini-tushunish-muhim",
              "text": "Yo'q. Va nima uchun ekanini tushunish muhim."
            },
            {
              "kind": "text",
              "text": "**Sabab 1 — barqarorlik.** Yuqoridagi ikki qatorga qayting:"
            },
            {
              "kind": "table",
              "head": [
                "",
                "bo'shliq bilan",
                "vergul bilan",
                "farq"
              ],
              "rows": [
                [
                  "regexsiz",
                  "6 token",
                  "9 token",
                  "**+50%**"
                ],
                [
                  "regexli",
                  "8 token",
                  "9 token",
                  "**+12%**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Regexsiz variantda bitta vergul narxni **yarmiga oshiradi**. Regexli variantda esa deyarli o'zgarmaydi."
            },
            {
              "kind": "text",
              "text": "**So'z bir xil narxda bo'lishi kerak**, undan keyin nima kelishidan qat'i nazar. Model uchun bu juda muhim: u `bolalar` so'zini bitta naqsh sifatida o'rganishi kerak, to'rtta emas."
            },
            {
              "kind": "text",
              "text": "**Sabab 2 — yodlash to'xtadi.** Katta lug'at bilan o'lchaymiz:"
            },
            {
              "kind": "pre",
              "text": "                oʻqigan matn   yangi matn   farq\nregexsiz 406        1.472         6.167      4.19x\nregexli  406        1.906         6.000      3.15x"
            },
            {
              "kind": "text",
              "text": "Diqqat qiling:"
            },
            {
              "kind": "bullets",
              "items": [
                "**O'qigan matnda** regexli variant **yomonroq** (1.906 vs 1.472) — chunki u yodlay olmaydi.",
                "**Yangi matnda** regexli variant **yaxshiroq** (6.000 vs 6.167).",
                "**Farq kamaydi:** 4.19× dan 3.15× ga."
              ]
            },
            {
              "kind": "text",
              "text": "Ikki raqam orasidagi farq — bu yodlashning o'lchovi (Dars 12). Regex uni kamaytirdi."
            },
            {
              "kind": "text",
              "text": "**Sabab 3 — bizning korpusimiz juda kichik.** 53 ta so'z. Haqiqiy korpusda (millionlab so'z) regexli variant fertility bo'yicha ham **aniq yutadi**, chunki u lug'at joyini isrof qilmaydi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Eng muhim saboq:** **Raqam yaxshilanishi to'g'ri qaror degani emas. Raqam yomonlashishi noto'g'ri qaror degani ham emas.** Siz **qaysi** raqamga qarayotganingizni va u **nimani** o'lchayotganini bilishingiz kerak. Bu yerda: fertility bitta kichik matnda biroz yomonlashdi, lekin yodlash to'xtadi va barqarorlik oshdi. Bu — yaxshi savdo. Dars 17 da bu mavzuga qaytamiz."
            },
            {
              "kind": "media",
              "id": "o3",
              "title": "Raqam yomonlashdi"
            }
          ]
        },
        {
          "id": "12-toliq-kod",
          "title": "12. To'liq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "import re\n\nNAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\n\n\ndef get_stats_qoshib(tokenlar, hisob):\n    for juftlik in zip(tokenlar, tokenlar[1:]):\n        hisob[juftlik] = hisob.get(juftlik, 0) + 1\n    return hisob\n\n\ndef train_regex(matn, vocab_size, naqsh):\n    boshlar = re.findall(naqsh, matn)\n    parchalar = []\n    for b in boshlar:\n        parchalar.append(kodla(b))\n\n    merges = {}\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n\n    for yangi_id in range(256, vocab_size):\n        stats = {}\n        for p in parchalar:\n            get_stats_qoshib(p, stats)\n        if len(stats) == 0:\n            break\n\n        eng = max(stats, key=stats.get)\n\n        yangi_parchalar = []\n        for p in parchalar:\n            yangi_parchalar.append(merge(p, eng, yangi_id))\n        parchalar = yangi_parchalar\n\n        merges[eng] = yangi_id\n        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n\n    return merges, vocab, parchalar\n\n\ndef encode_regex(matn, merges, naqsh):\n    natija = []\n    for bosh in re.findall(naqsh, matn):\n        tk = kodla(bosh)\n        while len(tk) >= 2:\n            stats = {}\n            get_stats_qoshib(tk, stats)\n            eng_j = None\n            eng_r = float(\"inf\")\n            for j in stats:\n                r = merges.get(j, float(\"inf\"))\n                if r < eng_r:\n                    eng_r = r\n                    eng_j = j\n            if eng_j is None:\n                break\n            tk = merge(tk, eng_j, merges[eng_j])\n        natija = natija + tk\n    return natija\n\n\n# ---- Sinovlar ----\n# 1. Naqsh hech narsani yoʻqotmaydi\nboshlar = re.findall(NAQSH, matn)\nprint(\"parchalar:\", len(boshlar), \"| round-trip:\", \"\".join(boshlar) == matn)\n\n# 2. oʻ buzilmaydi\nprint(re.findall(r\"\\w+\", \"oʻqish gʻalaba\"))\n\n# 3. Trening\nm_r, v_r, p_r = train_regex(matn, 276, NAQSH)\nfor tid in range(256, 266):\n    print(f\"  {tid} = {v_r[tid]!r}\")\n\n# 4. Eng uzun token\nm_r2, v_r2, _ = train_regex(matn, 406, NAQSH)\nm_2, v_2, _ = train(matn, 406)\nprint(\"regexsiz eng uzun:\", len(max(v_2.values(), key=len)), \"bayt\")\nprint(\"regexli  eng uzun:\", len(max(v_r2.values(), key=len)), \"bayt\")\n\n# 5. Round-trip\nyangi = \"Talabalar universitetga kirishdi va imtihonlarni topshirishdi.\"\nte = encode_regex(yangi, m_r, NAQSH)\nprint(\"tokenlar:\", len(te), \"| round-trip:\", decode(te, v_r) == yangi)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "parchalar: 73 | round-trip: True\n['oʻqish', 'gʻalaba']\n  256 = b'la'\n  257 = b'lar'\n  258 = b'sh'\n  259 = b'di'\n  260 = b'ish'\n  261 = b'ishdi'\n  262 = b'ga'\n  263 = b' b'\n  264 = b'\\xca\\xbb'\n  265 = b'ta'\nregexsiz eng uzun: 228 bayt\nregexli  eng uzun: 13 bayt\ntokenlar: 42 | round-trip: True",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "13-ozingiz-yozing",
          "title": "13. O'zingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "import re\n\n# 1. Oʻz naqshingizni sinang — hech narsa yoʻqolmasligi kerak\nnamuna = \"Bolalar oʻqishdi, va gʻalaba qozonishdi!\"\nNAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\n\nboshlar = re.___(NAQSH, namuna)\nprint(boshlar)\nprint(\"round-trip:\", \"\".___(boshlar) == namuna)\n\n# 2. oʻ va gʻ buzilmadimi? Parchalarda ularni qidiring\nfor b in boshlar:\n    if \"ʻ\" in b:\n        print(\"ʻ bor:\", repr(b))\n\n# 3. Notoʻgʻri naqsh bilan solishtiring\nprint(re.findall(r\"[a-zA-Z]+\", namuna))",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni ko'rsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "namuna = \"Bolalar oʻqishdi, va gʻalaba qozonishdi!\"\nNAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\n\nboshlar = re.findall(NAQSH, namuna)\nprint(boshlar)\nprint(\"round-trip:\", \"\".join(boshlar) == namuna)\n\nfor b in boshlar:\n    if \"ʻ\" in b:\n        print(\"ʻ bor:\", repr(b))\n\nprint(re.findall(r\"[a-zA-Z]+\", namuna))",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "output",
                  "text": "['Bolalar', ' oʻqishdi', ',', ' va', ' gʻalaba', ' qozonishdi', '!']\nround-trip: True\nʻ bor: ' oʻqishdi'\nʻ bor: ' gʻalaba'\n['Bolalar', 'o', 'qishdi', 'va', 'g', 'alaba', 'qozonishdi']"
                },
                {
                  "kind": "text",
                  "text": "Oxirgi qatorga qarang: `[a-zA-Z]+` bilan `oʻqishdi` → `o` va `qishdi`, `gʻalaba` → `g` va `alaba`. **Har ikkala o'zbek harfi ham buzildi.**"
                },
                {
                  "kind": "text",
                  "text": "Va e'tibor bering: `ʻ` belgilari butunlay **yo'qoldi** — ular natijada umuman yo'q. Round-trip ham `False` bo'lardi."
                }
              ]
            }
          ]
        },
        {
          "id": "14-mashqlar",
          "title": "14. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`re.findall(r\"\\w+\", \"salom, dunyo!\")` va `re.findall(r\"\\S+\", \"salom, dunyo!\")` — farqi nima?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "['salom', 'dunyo']\n['salom,', 'dunyo!']"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`\\w+` — faqat so'z belgilari. Tinish belgilari **tashlab yuboriladi**.",
                      "`\\S+` — bo'shliq bo'lmagan hamma narsa. Tinish belgisi **so'zga yopishadi**."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Ikkalasi ham bizga to'g'ri kelmaydi:"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`\\w+` — ma'lumot yo'qotadi (round-trip buziladi)",
                      "`\\S+` — `dunyo!` va `dunyo` ikki xil bo'lak bo'ladi, ya'ni 1-bo'limdagi muammo qaytadi"
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Shuning uchun uchta variantli naqsh kerak bo'ldi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Nima uchun bo'shliq so'zning **oldiga** yopishtiriladi, orqasiga emas?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "Chunki matnda so'zdan **keyin** har xil narsa kelishi mumkin: bo'shliq, vergul, nuqta, qator oxiri. Lekin so'zdan **oldin** deyarli har doim bo'shliq turadi."
                  },
                  {
                    "kind": "pre",
                    "text": "\" bolalar\"   ← bu naqsh har joyda ishlaydi\n\"bolalar \"   ← bu faqat keyin boʻshliq kelganda ishlaydi"
                  },
                  {
                    "kind": "text",
                    "text": "Agar bo'shliq orqaga yopishsa, `bolalar ` va `bolalar,` ikki xil bo'lak bo'lardi — va bu aynan biz tuzatmoqchi bo'lgan muammo."
                  },
                  {
                    "kind": "text",
                    "text": "GPT-2, GPT-4 va sizning tokenizatoringiz — hammasi bo'shliqni **oldinga** yopishtiradi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`train_regex` da `merge` har bir parchaga alohida qo'llanadi. Agar hammasini bitta ro'yxatga qo'shib yuborib, keyin merge qilsak nima o'zgaradi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "**Regex butunlay ma'nosiz bo'lib qoladi.**"
                  },
                  {
                    "kind": "text",
                    "text": "Agar parchalarni birlashtirsak, ularning chegarasi yo'qoladi va `merge` yana chegaradan o'tib ketadi. `bolalar` ning oxirgi `r` i va `,` yonma-yon bo'lib qoladi — va ular birlashishi mumkin."
                  },
                  {
                    "kind": "text",
                    "text": "**Butun g'oya shundaki, parchalar alohida qoladi.** `merge(p, ...)` har bir `p` uchun alohida chaqiriladi, shuning uchun birinchi parchaning oxiri va ikkinchisining boshi hech qachon uchrashmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Statistika esa **umumiy** — chunki biz `la` juftligi butun matnda necha marta uchraganini bilishimiz kerak, har bir so'zda alohida emas."
                  },
                  {
                    "kind": "text",
                    "text": "**Statistika umumiy, birlashtirish alohida.** Shu ikki so'z butun funksiyani tushuntiradi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Yangi naqsh yozing: raqamlarni alohida bo'lak qilsin. `\"2024yilda 15ta kitob\"` qanday bo'linadi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "Hozirgi naqsh bilan:"
                  },
                  {
                    "kind": "code",
                    "code": "print(re.findall(NAQSH, \"2024yilda 15ta kitob\"))\n# ['2024yilda', ' 15ta', ' kitob']",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "`\\w` raqamni ham qamrab oladi, shuning uchun `2024yilda` bitta bo'lak bo'lib qoldi."
                  },
                  {
                    "kind": "text",
                    "text": "Raqamlarni harflardan ajratish uchun:"
                  },
                  {
                    "kind": "code",
                    "code": "NAQSH2 = r\" ?\\d+| ?[^\\s\\d\\W]+| ?[^\\s\\w]+|\\s+\"\nprint(re.findall(NAQSH2, \"2024yilda 15ta kitob\"))\n# ['2024', 'yilda', ' 15', 'ta', ' kitob']",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "`\\d` — raqam, `\\W` — so'z belgisi bo'lmagan."
                  },
                  {
                    "kind": "text",
                    "text": "**Nima uchun raqamlarni ajratish kerak?** Chunki `2024` va `2025` — turli sonlar, lekin tokenizator ularni alohida token qilib yodlab olishi mumkin. Raqamlarni mayda bo'lib qoldirish modelga arifmetikani o'rganishga yordam beradi. GPT-4 ning naqshida raqamlar uch xonadan ko'p bo'lmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Bu — ixtiyoriy yaxshilash. Dars 18 da naqshingizni tanlaganingizda o'ylab ko'ring."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Naqshdan `\\s+` qismini olib tashlang va round-trip ni tekshiring. Nima yo'qoladi?"
                }
              ],
              "answer": {
                "summary": "Javobni ko'rsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "NAQSH_BUZUQ = r\" ?\\w+| ?[^\\s\\w]+\"\nboshlar = re.findall(NAQSH_BUZUQ, matn)\nprint(\"round-trip:\", \"\".join(boshlar) == matn)",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "round-trip: False"
                  },
                  {
                    "kind": "text",
                    "text": "**Yangi qatorlar yo'qoldi.** Bizning matnimizda `\\n` belgilari bor, va ular ` ?\\w+` ga ham, ` ?[^\\s\\w]+` ga ham mos kelmaydi (chunki ikkalasi ham faqat **bitta** ixtiyoriy bo'shliqni qabul qiladi, `\\n` esa alohida bo'shliq belgisi)."
                  },
                  {
                    "kind": "text",
                    "text": "`\\s+` — bu **tutqich** (catch-all): qolgan hamma bo'shliqni ushlaydi."
                  },
                  {
                    "kind": "text",
                    "text": "**Nima uchun bu xavfli:** kod xato bermaydi. Tokenizator ishlaydi. Faqat dekodlaganingizda matnning tuzilishi yo'qolgan bo'ladi — hamma narsa bitta qatorga yopishib qoladi."
                  },
                  {
                    "kind": "text",
                    "text": "Va siz buni faqat **round-trip tekshiruvi** orqali bilib olasiz."
                  },
                  {
                    "kind": "text",
                    "text": "**Shuning uchun har bir naqsh o'zgarishidan keyin round-trip ni tekshiring.** Bir qator kod, ammo u jimgina ma'lumot yo'qotishning oldini oladi."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "15-xulosa",
          "title": "15. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "Tokenizator uchun bo'shliq — oddiy belgi. Shuning uchun u so'z chegarasidan o'tib ketadi va `lar `, `ishdi.`, hatto 228 baytlik tokenlar yasaydi.",
                "Yechim: matnni **oldindan bo'lish**, va BPE ni har bir bo'lak **ichida** alohida ishlatish.",
                "`re.findall(naqsh, matn)` — regex. `\\w` so'z belgisi, `\\s` bo'shliq, `+` bir yoki ko'p, `|` yoki, `?` nol yoki bitta.",
                "**`[a-zA-Z]` ishlatmang** — u `oʻ` va `gʻ` ni buzadi. `\\w` to'g'ri ishlaydi, chunki u Unicode bo'yicha ishlaydi.",
                "Bo'shliq so'zning **oldiga** yopishadi: ` bolalar`, `bolalar ` emas.",
                "**Round-trip tekshiruvi majburiy:** `\"\".join(re.findall(naqsh, matn)) == matn`.",
                "Natija: eng uzun token **228 baytdan 13 baytga**. Yodlash imkonsiz bo'ldi.",
                "Fertility kichik matnda biroz **yomonlashdi** — bu normal. Muhimi: barqarorlik oshdi va yodlash farqi 4.19× dan 3.15× ga tushdi."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Bitta muammo qoldi, va u eng o'zbekchasi."
            },
            {
              "kind": "text",
              "text": "**Dars 14 — O'zbek apostrofi.** Dars 05 da ko'rgan edingiz: `ʻ` to'rt xil yoziladi — `ʻ` (699), `'` (39), `‘` (8216), `’` (8217). Tokenizator uchun bular to'rt xil so'z."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *agar korpusingizda `oʻzbek` har xil yozilgan bo'lsa, lug'atingizning qancha qismi bekorga ketadi?*"
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–12. To'liq ishlaydigan tokenizator"
    },
    {
      "id": "dars-14",
      "n": 14,
      "title": "Oʻzbek apostrofi: bitta harf, besh xil yozuv",
      "subtitle": "",
      "minutes": 55,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**koʻrasiz** notoʻgʻri apostrof soʻzni qanday qilib **koʻrinmas devor** bilan kesib qoʻyishini;",
                "**bilasiz** internetda `oʻ` qanday yozilishini — haqiqiy raqamlar bilan;",
                "**ajrata olasiz** ikkita toʻgʻri belgini: `ʻ` (oʻ, gʻ) va `ʼ` (tutuq belgisi);",
                "**yozasiz** belgining **atrofiga qarab** qaror qiladigan normalizator;",
                "**topasiz** haqiqiy tokenizatordagi ikkita boʻshliqni — va ularni tuzatasiz;",
                "**tushunasiz** 2026-yilgi yangi alifbo tokenizatorga nima qilishini va uni **qayta oʻqitmasdan** qanday hal qilish mumkinligini."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 13 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Agar korpusingizda `oʻzbek` har xil yozilgan boʻlsa, lugʻatingizning qancha qismi bekorga ketadi?"
            },
            {
              "kind": "text",
              "text": "Javob siz kutgandan yomonroq. Muammo faqat lugʻatda emas."
            },
            {
              "kind": "text",
              "text": "Dars 13 dagi naqshimizni olamiz va bitta soʻzni besh xil yozib, unga beramiz:"
            },
            {
              "kind": "code",
              "code": "import re\n\nNAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\n\nfor v in [\"o\\u02bbzbek\", \"o'zbek\", \"o\\u2018zbek\", \"o\\u2019zbek\", \"o`zbek\"]:\n    print(f\"  {v!r:10s} -> {re.findall(NAQSH, v)}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  'oʻzbek'   -> ['oʻzbek']\n  \"o'zbek\"   -> ['o', \"'\", 'zbek']\n  'o‘zbek'   -> ['o', '‘', 'zbek']\n  'o’zbek'   -> ['o', '’', 'zbek']\n  'o`zbek'   -> ['o', '`', 'zbek']"
            },
            {
              "kind": "text",
              "text": "**Toʻxtang va buni diqqat bilan koʻring.**"
            },
            {
              "kind": "text",
              "text": "Toʻgʻri yozilgan `oʻzbek` — **bitta** boʻlak. Qolgan toʻrttasi — **uchta** boʻlak: `o`, belgi, `zbek`."
            },
            {
              "kind": "text",
              "text": "Dars 13 da nima oʻrgangan edik? **BPE hech qachon boʻlak chegarasidan oʻtmaydi.** Biz uni ataylab shunday qurgan edik — `lar ` kabi ifloslangan tokenlarni toʻxtatish uchun."
            },
            {
              "kind": "text",
              "text": "Endi oʻsha himoya **bizga qarshi** ishlayapti. Notoʻgʻri apostrof soʻzning ichiga **koʻrinmas devor** qoʻydi. Tokenizator qancha oʻqimasin, `o'zbek` ni hech qachon uchtadan kam tokenga keltira olmaydi."
            },
            {
              "kind": "text",
              "text": "Bitta belgi — va soʻz abadiy uch boʻlakka boʻlinib qoldi."
            },
            {
              "kind": "media",
              "id": "p1",
              "title": "Koʻrinmas devor"
            }
          ]
        },
        {
          "id": "2-internetda-o-qanday-yoziladi",
          "title": "2. Internetda `oʻ` qanday yoziladi",
          "blocks": [
            {
              "kind": "text",
              "text": "\"Odamlar baʼzan notoʻgʻri yozadi\" degan gap — taxmin. Bizga raqam kerak."
            },
            {
              "kind": "text",
              "text": "Men **3 000 ta haqiqiy oʻzbekcha veb-hujjatni** oldim (FineWeb-2 korpusidan, hech qanday tozalashsiz) va `oʻ`, `gʻ` dagi belgi qanday yozilganini sanadim:"
            },
            {
              "kind": "table",
              "head": [
                "Belgi",
                "Raqami",
                "Ulushi"
              ],
              "rows": [
                [
                  "`‘` chap qoʻshtirnoq",
                  "8216",
                  "**34%**"
                ],
                [
                  "`ʻ` **toʻgʻri belgi**",
                  "699",
                  "23%"
                ],
                [
                  "`'` oddiy apostrof",
                  "39",
                  "19%"
                ],
                [
                  "`’` oʻng qoʻshtirnoq",
                  "8217",
                  "18%"
                ],
                [
                  "`` ` `` teskari urgʻu",
                  "96",
                  "6%"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "**Toʻgʻri belgi — atigi 23%.** Toʻrtta soʻzdan uchtasida `oʻ` notoʻgʻri yozilgan."
            },
            {
              "kind": "text",
              "text": "Va eng koʻp ishlatiladigani — toʻgʻri belgi ham emas, `'` ham emas. **Chap qoʻshtirnoq** `‘`. Nima uchun? Chunki u baʼzi telefon klaviaturalarida va Word'da apostrof tugmasini bosganda avtomatik chiqadi, va koʻzga `ʻ` ga eng oʻxshaydigani."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu jadvalni Dars 05 ning oxirgi mashqida koʻrgan edingiz. Mana uning manbasi."
            },
            {
              "kind": "text",
              "text": "Bu jadval dars davomida bizga bir necha marta kerak boʻladi."
            },
            {
              "kind": "media",
              "id": "p2",
              "title": "Besh xil yozuv"
            }
          ]
        },
        {
          "id": "3-oltita-belgi-va-nima-uchun-devor-paydo-boldi",
          "title": "3. Oltita belgi va nima uchun devor paydo boʻldi",
          "blocks": [
            {
              "kind": "text",
              "text": "Nima uchun `ʻ` soʻz ichida qoldi, `'` esa devor boʻldi? Dars 13 dagi `\\w` ni eslang: u faqat **harflarni** oladi. Demak savol: qaysi belgi harf?"
            },
            {
              "kind": "code",
              "code": "import unicodedata\n\nfor b in [\"\\u02bb\", \"\\u2018\", \"'\", \"\\u2019\", \"`\", \"\\u02bc\"]:\n    print(f\"  {b!r:5s} ord={ord(b):5d}  kat={unicodedata.category(b)}  harfmi={b.isalpha()}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  'ʻ'   ord=  699  kat=Lm  harfmi=True\n  '‘'   ord= 8216  kat=Pi  harfmi=False\n  \"'\"   ord=   39  kat=Po  harfmi=False\n  '’'   ord= 8217  kat=Pf  harfmi=False\n  '`'   ord=   96  kat=Sk  harfmi=False\n  'ʼ'   ord=  700  kat=Lm  harfmi=True"
            },
            {
              "kind": "text",
              "text": "**Ikkita yangi narsa:**"
            },
            {
              "kind": "text",
              "text": "**1. `\"\\u02bb\"` — belgini raqami bilan yozish.** Dars 05 da `U+02BB` yozuvini koʻrgan edingiz. Python'da satr ichida `\\u` va undan keyin toʻrtta oʻn oltilik raqam yozsangiz — oʻsha belgi hosil boʻladi. Bu klaviaturada yoʻq belgilarni yozishning eng ishonchli yoʻli:"
            },
            {
              "kind": "code",
              "code": "print(\"\\u02bb\" == \"ʻ\")    # True",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Bu darsda apostroflarni doim shunday yozamiz — `‘` va `ʻ` ni koʻz bilan farqlash qiyin, `\\u2018` va `\\u02bb` ni esa adashtirib boʻlmaydi."
            },
            {
              "kind": "text",
              "text": "**2. `.isalpha()` — \"bu harfmi?\"** `True` yoki `False` qaytaradi."
            },
            {
              "kind": "text",
              "text": "Endi jadvalni oʻqiymiz:"
            },
            {
              "kind": "bullets",
              "items": [
                "`ʻ` va `ʼ` — kategoriyasi **`Lm`**, harf. `\\w` ularni soʻzning bir qismi deb biladi.",
                "Qolgan toʻrttasi — **tinish belgisi** (`P...`) yoki **belgi** (`Sk`). `\\w` ularni harf deb bilmaydi va soʻzni oʻsha joyda kesadi."
              ]
            },
            {
              "kind": "text",
              "text": "**Devorning sababi shu.** Unicode `ʻ` ni harf deb belgilagan, `'` ni esa yoʻq. Bizning naqshimiz Unicode'ga ishonadi."
            }
          ]
        },
        {
          "id": "4-ikkita-togri-belgi",
          "title": "4. Ikkita toʻgʻri belgi",
          "blocks": [
            {
              "kind": "text",
              "text": "Jadvalning oxirgi qatoriga qarang: `ʼ` — **700**. U ham harf. U nima?"
            },
            {
              "kind": "text",
              "text": "Bu yerda men Dars 05 dagi bir soddalashtirishimni tuzatishim kerak. U yerda \"faqat 699 toʻgʻri\" degan edim. Aslida oʻzbek lotin yozuvida **ikkita** toʻgʻri belgi bor:"
            },
            {
              "kind": "table",
              "head": [
                "Belgi",
                "Raqami",
                "Vazifasi",
                "Misollar"
              ],
              "rows": [
                [
                  "`ʻ`",
                  "699",
                  "**oʻ** va **gʻ** harflarining qismi",
                  "oʻzbek, gʻalaba, bogʻ"
                ],
                [
                  "`ʼ`",
                  "700",
                  "**tutuq belgisi** — tovushni ajratadi",
                  "maʼno, taʼlim, sanʼat, maʼlumot"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Koʻzga deyarli bir xil. Lekin vazifasi butunlay boshqa:"
            },
            {
              "kind": "bullets",
              "items": [
                "`oʻ` — bu **bitta harf**. `ʻ` uning ajralmas qismi.",
                "`maʼno` dagi `ʼ` — harf emas, **toʻxtash belgisi**. U `a` va `n` ni ajratib turadi: *ma-no* emas, *maʼ-no*."
              ]
            },
            {
              "kind": "text",
              "text": "Klaviaturada ikkalasi ham yoʻq. Shuning uchun odamlar ikkalasini ham bir xil — `'`, `‘`, `’` yoki `` ` `` bilan yozadi. Tokenizator esa ularni qaytadan ajratishi kerak."
            },
            {
              "kind": "text",
              "text": "**Qanday ajratadi?** Mana darsning asosiy savoli."
            }
          ]
        },
        {
          "id": "5-birinchi-urinish-hammasini-almashtiramiz",
          "title": "5. Birinchi urinish: hammasini almashtiramiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Eng oddiy gʻoya — Dars 02 dagi `.replace()` ni zanjir qilib ishlatish:"
            },
            {
              "kind": "code",
              "code": "def hammasini_almashtir(matn):\n    matn = matn.replace(\"'\", \"\\u02bb\")\n    matn = matn.replace(\"\\u2018\", \"\\u02bb\")\n    matn = matn.replace(\"\\u2019\", \"\\u02bb\")\n    matn = matn.replace(\"`\", \"\\u02bb\")\n    return matn\n\n\nfor s in [\"o'zbek\", \"o\\u2018qish\", \"ma'no\", \"U \\u2018salom\\u2019 dedi\"]:\n    print(f\"  {s!r:18s} -> {hammasini_almashtir(s)!r}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  \"o'zbek\"           -> 'oʻzbek'\n  'o‘qish'           -> 'oʻqish'\n  \"ma'no\"            -> 'maʻno'\n  'U ‘salom’ dedi'   -> 'U ʻsalomʻ dedi'"
            },
            {
              "kind": "text",
              "text": "Birinchi ikkitasi — toʻgʻri. Keyingi ikkitasi — **buzildi**:"
            },
            {
              "kind": "bullets",
              "items": [
                "`maʼno` → `maʻno`. Tutuq belgisi `oʻ` belgisiga aylandi.",
                "`‘salom’` → `ʻsalomʻ`. Bu **qoʻshtirnoq** edi! U umuman apostrof emas."
              ]
            },
            {
              "kind": "text",
              "text": "Muammo: `.replace()` faqat **belgining oʻziga** qaraydi. U bilmaydi:"
            },
            {
              "kind": "bullets",
              "items": [
                "belgi `o` dan keyin turibdimi (unda `oʻ`),",
                "ikki harf orasidami (unda tutuq),",
                "yoki soʻz chetidami (unda qoʻshtirnoq)."
              ]
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Asosiy fikr:** bu yerda belgining oʻzi hech narsani hal qilmaydi. **Uning atrofi** hal qiladi."
            }
          ]
        },
        {
          "id": "6-qoida-atrofga-qarash",
          "title": "6. Qoida: atrofga qarash",
          "blocks": [
            {
              "kind": "text",
              "text": "Belgining oldidagi va keyingi belgiga qarab, toʻrtta qoida yozamiz:"
            },
            {
              "kind": "table",
              "head": [
                "#",
                "Shart",
                "Natija",
                "Misol"
              ],
              "rows": [
                [
                  "1",
                  "oldida `g` yoki `G`",
                  "`ʻ`",
                  "`bog'` → `bogʻ`, `g'alaba` → `gʻalaba`"
                ],
                [
                  "2",
                  "oldida `o` yoki `O`, **va keyin harf**",
                  "`ʻ`",
                  "`o'qish` → `oʻqish`"
                ],
                [
                  "3",
                  "oldida harf **va keyin harf**",
                  "`ʼ`",
                  "`ma'no` → `maʼno`"
                ],
                [
                  "4",
                  "boshqa hamma holat",
                  "**tegmaymiz**",
                  "`‘salom’` — qoʻshtirnoq"
                ]
              ]
            },
            {
              "kind": "h3",
              "id": "nima-uchun-g-va-o-uchun-shart-har-xil",
              "text": "Nima uchun `g` va `o` uchun shart har xil?"
            },
            {
              "kind": "text",
              "text": "Diqqat qiling: `g` dan keyin **har doim** `ʻ` qoʻyamiz, `o` dan keyin esa **faqat keyin harf kelsa**."
            },
            {
              "kind": "text",
              "text": "Sababi oʻzbek tilining oʻzida:"
            },
            {
              "kind": "bullets",
              "items": [
                "**`gʻ` bilan tugaydigan soʻzlar koʻp:** bogʻ, togʻ, sogʻ, yogʻ, chogʻ. `gʻ` dan keyin boʻshliq yoki nuqta kelishi — normal holat.",
                "**`oʻ` bilan tugaydigan soʻz esa deyarli yoʻq.** Lekin `o` bilan tugaydigan soʻzlar koʻp: dunyo, kino, radio, avto. Va ular qoʻshtirnoq ichida kelsa — `'dunyo'` — yopuvchi qoʻshtirnoq `o` dan keyin turadi."
              ]
            },
            {
              "kind": "text",
              "text": "Agar 2-qoidada \"keyin harf\" sharti boʻlmasa, `'dunyo'` → `'dunyoʻ` boʻlib qolardi. Bu xayoliy muammo emas — buni 9-boʻlimda haqiqiy tokenizatorda koʻrasiz."
            },
            {
              "kind": "media",
              "id": "p3",
              "title": "Atrof hal qiladi"
            }
          ]
        },
        {
          "id": "7-kodga-aylantiramiz",
          "title": "7. Kodga aylantiramiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Ikkita yangi narsa kerak."
            },
            {
              "kind": "h3",
              "id": "elif-aks-holda-agar",
              "text": "`elif` — \"aks holda, agar\""
            },
            {
              "kind": "text",
              "text": "Dars 04 da `if` va `else` ni oʻrgandik. Ikkitadan koʻp variant boʻlsa — `elif`:"
            },
            {
              "kind": "code",
              "code": "son = 0\nif son > 0:\n    print(\"musbat\")\nelif son < 0:\n    print(\"manfiy\")\nelse:\n    print(\"nol\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "nol"
            },
            {
              "kind": "text",
              "text": "Python shartlarni **yuqoridan pastga** tekshiradi va **birinchi rost** boʻlganini bajaradi. Qolganlari tekshirilmaydi ham. Bu tartib keyinroq juda muhim boʻladi."
            },
            {
              "kind": "h3",
              "id": "in-ichidami",
              "text": "`in` — \"ichidami?\""
            },
            {
              "kind": "text",
              "text": "Dars 04 da `\"Ali\" in yoshlar` ni lugʻatda ishlatgan edik. U roʻyxat va matnda ham ishlaydi:"
            },
            {
              "kind": "code",
              "code": "print(\"g\" in [\"g\", \"G\"])     # True\nprint(\"a\" in [\"g\", \"G\"])     # False\nprint(\"'\" in \"'\\u2018\\u2019\")  # True",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "h3",
              "id": "funksiya",
              "text": "Funksiya"
            },
            {
              "kind": "code",
              "code": "OKINA = \"\\u02bb\"    # oʻ va gʻ dagi belgi\nTUTUQ = \"\\u02bc\"    # maʼno dagi belgi\nAPOSTROFLAR = \"'\\u2018\\u2019`\\u02bb\\u02bc\"\n\n\ndef apostrof_tuzat(matn):\n    belgilar = list(matn)\n\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n\n            if oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n\n    return \"\".join(belgilar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "**Qatorma-qator:**"
            },
            {
              "kind": "bullets",
              "items": [
                "`APOSTROFLAR` — oltita belgining hammasi bitta matnda. **`ʻ` va `ʼ` ham shu yerda!** Nima uchun toʻgʻri belgilarni ham tekshiramiz? Chunki ular ham notoʻgʻri joyda turishi mumkin: `oʼzbek` (tutuq `oʻ` oʻrnida) yoki `maʻno`. Ularni ham atrofiga qarab tuzatamiz.",
                "`belgilar = list(matn)` — matnni belgilar roʻyxatiga aylantiramiz. Nima uchun? Dars 03 dan eslang: **matnni oʻzgartirib boʻlmaydi**, roʻyxatni esa mumkin.",
                "`oldingi = \"\"` va `keyingi = \"\"` — avval boʻsh deb olamiz. Belgi matnning boshida turgan boʻlsa, uning oldida hech narsa yoʻq; oxirida boʻlsa — keyin.",
                "`if i > 0:` — chegara himoyasi, Dars 09 dagidek. `belgilar[-1]` ga tushib qolmaslik uchun (`-1` oxirgi belgini beradi — bu yerda xato boʻlardi).",
                "Uchta `if`/`elif` — 6-boʻlimdagi jadvalning 1–3 qoidalari. 4-qoida uchun **hech narsa yozmadik**: hech biri bajarilmasa, belgi oʻzgarmay qoladi.",
                "`\"\".join(belgilar)` — roʻyxatni qaytadan matnga yigʻamiz (Dars 11)."
              ]
            },
            {
              "kind": "h3",
              "id": "sinaymiz",
              "text": "Sinaymiz"
            },
            {
              "kind": "code",
              "code": "testlar = [\n    \"o'zbek\", \"O\\u2018zbekiston\", \"g\\u2019alaba\", \"ko`cha\",\n    \"to'g'ri\", \"bog'\", \"ma'no\", \"ta\\u2019lim\", \"o\\u02bczbek\", \"ma\\u02bbno\",\n    \"U \\u2018salom\\u2019 dedi\", \"U 'dunyo' dedi\",\n]\nfor t in testlar:\n    print(f\"  {t!r:18s} -> {apostrof_tuzat(t)!r}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  \"o'zbek\"           -> 'oʻzbek'\n  'O‘zbekiston'      -> 'Oʻzbekiston'\n  'g’alaba'          -> 'gʻalaba'\n  'ko`cha'           -> 'koʻcha'\n  \"to'g'ri\"          -> 'toʻgʻri'\n  \"bog'\"             -> 'bogʻ'\n  \"ma'no\"            -> 'maʼno'\n  'ta’lim'           -> 'taʼlim'\n  'oʼzbek'           -> 'oʻzbek'\n  'maʻno'            -> 'maʼno'\n  'U ‘salom’ dedi'   -> 'U ‘salom’ dedi'\n  \"U 'dunyo' dedi\"   -> \"U 'dunyo' dedi\""
            },
            {
              "kind": "text",
              "text": "**Oʻn ikkitadan oʻn ikkitasi toʻgʻri.** Har bir belgi atrofiga qarab hal qilindi:"
            },
            {
              "kind": "bullets",
              "items": [
                "`oʻ` va `gʻ` — qaysi belgi bilan yozilmasin, `ʻ` boʻldi",
                "tutuq — `ʼ` boʻldi, hatto `maʻno` dagi notoʻgʻri `ʻ` ham",
                "qoʻshtirnoqlar — tegilmadi, `'dunyo'` ham"
              ]
            }
          ]
        },
        {
          "id": "8-ataylab-xato-bosh-satr-tuzogi",
          "title": "8. Ataylab xato: boʻsh satr tuzogʻi",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi bitta kichik oʻzgartirish qilamiz. Roʻyxat `[\"g\", \"G\"]` oʻrniga qisqaroq — matn `\"gG\"` yozamiz. Ishlashi kerak-ku: `\"g\" in \"gG\"` → `True`."
            },
            {
              "kind": "code",
              "code": "def apostrof_tuzat_buzuq(matn):\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n\n            if oldingi in \"gG\":                              # <- oʻzgardi\n                belgilar[i] = OKINA\n            elif oldingi in \"oO\" and keyingi.isalpha():      # <- oʻzgardi\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n    return \"\".join(belgilar)\n\n\nprint(repr(apostrof_tuzat(\"\\u2018Salom\\u2019 dedi\")))\nprint(repr(apostrof_tuzat_buzuq(\"\\u2018Salom\\u2019 dedi\")))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'‘Salom’ dedi'\n'ʻSalom’ dedi'"
            },
            {
              "kind": "text",
              "text": "**Ikkinchisida qoʻshtirnoq buzildi.** Jumla boshidagi `‘` → `ʻ` ga aylandi. Nima uchun?"
            },
            {
              "kind": "text",
              "text": "Bu belgi matnning **eng boshida** turibdi. Demak `oldingi = \"\"` — boʻsh. Endi:"
            },
            {
              "kind": "code",
              "code": "print(\"\" in \"gG\")\nprint(\"\" in [\"g\", \"G\"])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "True\nFalse"
            },
            {
              "kind": "text",
              "text": "**Boʻsh matn har qanday matnning \"ichida\" boʻladi.** Python uchun `\"\"` — har bir matnning boshida, oxirida va har bir belgi orasida turadi. Shuning uchun `\"\" in \"gG\"` → `True`."
            },
            {
              "kind": "text",
              "text": "Roʻyxatda esa bunday emas: `[\"g\", \"G\"]` da faqat ikkita element bor, va hech biri boʻsh emas."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu xato **jimgina** ishlaydi. Xato xabari yoʻq. 99% matnlarda hech narsa sezilmaydi — faqat qoʻshtirnoq bilan boshlanadigan matnlar buziladi. Million hujjatli korpusda bunday matnlar minglab boʻladi. **Qoida:** biror narsa \"ulardan biri\" ekanini tekshirayotganda roʻyxat ishlating: `x in [\"a\", \"b\"]`. Matn `x in \"ab\"` faqat `x` hech qachon boʻsh boʻlmasa xavfsiz."
            }
          ]
        },
        {
          "id": "9-tartib-muhim-tortinchi-marta",
          "title": "9. Tartib muhim — toʻrtinchi marta",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 10 da minora, Dars 11 da `KeyError`, Dars 12 da `[256, 114]`. Endi toʻrtinchisi."
            },
            {
              "kind": "text",
              "text": "7-boʻlimda aytgan edim: `elif` zanjirida **birinchi rost** shart bajariladi. Shartlarning tartibini almashtiramiz — tutuqni birinchi qoʻyamiz:"
            },
            {
              "kind": "code",
              "code": "def apostrof_tuzat_teskari(matn):\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n\n            if oldingi.isalpha() and keyingi.isalpha():      # <- endi birinchi\n                belgilar[i] = TUTUQ\n            elif oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n    return \"\".join(belgilar)\n\n\nfor soz in [\"o'qish\", \"to'g'ri\", \"bog'\"]:\n    print(f\"  {soz!r:10s} toʻgʻri: {apostrof_tuzat(soz)!r:12s} teskari: {apostrof_tuzat_teskari(soz)!r}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  \"o'qish\"   toʻgʻri: 'oʻqish'     teskari: 'oʼqish'\n  \"to'g'ri\"  toʻgʻri: 'toʻgʻri'    teskari: 'toʼgʼri'\n  \"bog'\"     toʻgʻri: 'bogʻ'       teskari: 'bogʻ'"
            },
            {
              "kind": "text",
              "text": "`o'qish` da `o` ham harf, `q` ham harf — tutuq sharti **ham** rost. U birinchi turgani uchun u bajarildi, va `oʻqish` → `oʼqish` boʻldi. Notoʻgʻri."
            },
            {
              "kind": "text",
              "text": "`bog'` toʻgʻri qoldi — chunki undan keyin harf yoʻq, tutuq sharti yolgʻon. Yaʼni xato **baʼzi** soʻzlarda chiqadi, baʼzilarida yoʻq. Eng yomon turdagi xato (Dars 09 dan tanish)."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Qoida:** `elif` zanjirida **eng aniq** shart birinchi turadi. \"Oldida `o` va keyin harf\" — bu \"oldida harf va keyin harf\" ning **xususiy holi**. Xususiy holat umumiysidan oldin tekshirilishi shart."
            }
          ]
        },
        {
          "id": "10-haqiqiy-tokenizator-bilan-solishtiramiz",
          "title": "10. Haqiqiy tokenizator bilan solishtiramiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi bir narsani ochiq aytaman."
            },
            {
              "kind": "text",
              "text": "Mening `uzbek-bpe-16k` tokenizatorim ham apostrofni normallashtiradi. Uning qoidalari shunday:"
            },
            {
              "kind": "steps",
              "items": [
                "`’` va `` ` `` → `'` ga aylanadi",
                "`o'`, `O'`, `g'`, `G'` → `oʻ`, `Oʻ`, `gʻ`, `Gʻ`",
                "ikki harf orasidagi apostrof → `ʼ`"
              ]
            },
            {
              "kind": "text",
              "text": "Bu qoidalar `'`, `’`, `` ` `` bilan yozilgan `oʻzbek` ni toʻgʻri tuzatadi. Lekin ularda **ikkita boʻshliq** bor, va men ularni oʻzim oʻlchab topdim:"
            },
            {
              "kind": "text",
              "text": "**Boʻshliq 1: `‘` umuman tegilmaydi.** Birinchi qoida faqat `’` va `` ` `` ni oladi — `‘` ni emas. 2-boʻlimdagi jadvalga qayting: `‘` — internetdagi **eng koʻp** uchraydigan variant, 34%. Yaʼni tokenizatorim aynan eng keng tarqalgan yozuvni tuzatmaydi. Har bir `o‘zbek` bitta ortiqcha token turadi. Hisob-kitobim boʻyicha, uni tuzatish fertility ni taxminan **2%** yaxshilardi."
            },
            {
              "kind": "text",
              "text": "**Boʻshliq 2: soʻz chegarasi tekshirilmaydi.** 2-qoida `o` dan keyingi har qanday `'` ni oladi. Natijada `'dunyo'` → `'dunyoʻ` boʻladi — qoʻshtirnoq harfga aylanadi."
            },
            {
              "kind": "text",
              "text": "Ikkala boʻshliq ham sizning `apostrof_tuzat` funksiyangizda **yoʻq**:"
            },
            {
              "kind": "table",
              "head": [
                "Kirish",
                "`uzbek-bpe-16k`",
                "Sizning funksiyangiz"
              ],
              "rows": [
                [
                  "`o‘zbek`",
                  "`o‘zbek` — tuzatilmadi",
                  "`oʻzbek` ✓"
                ],
                [
                  "`U 'dunyo' dedi`",
                  "`U 'dunyoʻ dedi` — buzildi",
                  "`U 'dunyo' dedi` ✓"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "**Nima uchun tuzatmadim?** Chunki `uzbek-gpt-103m` modelim aynan shu tokenizator bilan oʻqitilgan. Tokenizatorni oʻzgartirsam, model oʻzi oʻrgangan tokenlarni tanimay qoladi va uni qaytadan oʻqitish kerak boʻladi (Dars 12 dagi \"model tanimaydi\" muammosi)."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Bundan ikkita saboq:** 1. **Har qanday qoidani haqiqiy maʼlumotda tekshiring.** Mening qoidalarim `'`, `’`, `` ` `` bilan sinab koʻrilgan edi va ishlardi. Faqat haqiqiy internet matnini sanaganimda eng koʻp variant tushib qolganini koʻrdim. 2. **Tokenizator — model bilan bogʻlangan.** Model oʻqitilgandan keyin tokenizatorni \"biroz yaxshilash\" mumkin emas. Shuning uchun uni **avval** puxta qilish kerak. Dars 18 da `uzbek-bpe-16k` ni yuklab ishlatganingizda `‘` tegilmay qolganini oʻzingiz koʻrasiz. Endi sababini bilasiz."
            }
          ]
        },
        {
          "id": "11-nfc-kozga-bir-xil-baytlarda-har-xil",
          "title": "11. NFC: koʻzga bir xil, baytlarda har xil",
          "blocks": [
            {
              "kind": "text",
              "text": "Normalizatsiyaning yana bitta qatlami bor, va u 14-boʻlimda muhim boʻladi."
            },
            {
              "kind": "text",
              "text": "Ayrim harflarni Unicode'da **ikki xil** yozish mumkin. Masalan `ö`:"
            },
            {
              "kind": "code",
              "code": "a = \"\\u00f6\"           # bitta belgi: ö\nb = \"o\\u0308\"          # ikkita belgi: o + ustidagi ikki nuqta\n\nprint(a, b)\nprint(\"uzunligi:\", len(a), len(b))\nprint(\"teng:\", a == b)\nprint(\"baytlar:\", list(a.encode()), list(b.encode()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "ö ö\nuzunligi: 1 2\nteng: False\nbaytlar: [195, 182] [111, 204, 136]"
            },
            {
              "kind": "text",
              "text": "Koʻzga — **bir xil**. Python uchun — **har xil**. Baytlarda — butunlay boshqa."
            },
            {
              "kind": "text",
              "text": "Ikkinchisida `o` oddiy harf, `\\u0308` esa \"oldingi harf ustiga ikki nuqta qoʻy\" degan alohida belgi. Ekranda ular bitta boʻlib chiziladi."
            },
            {
              "kind": "text",
              "text": "Bu qayerdan keladi? Turli klaviaturalar, turli operatsion tizimlar, nusxa koʻchirish. Bir hujjatda biri, boshqasida ikkinchisi."
            },
            {
              "kind": "text",
              "text": "**Yechim — `unicodedata.normalize(\"NFC\", matn)`:**"
            },
            {
              "kind": "code",
              "code": "print(unicodedata.normalize(\"NFC\", b) == a)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "True"
            },
            {
              "kind": "text",
              "text": "`NFC` — \"har bir harfni iloji boricha **bitta** belgiga yigʻ\". Ikki qismli `ö` bitta `ö` ga aylanadi."
            },
            {
              "kind": "text",
              "text": "`oʻ` ga esa u tegmaydi — `ʻ` alohida belgi, uni hech qanday harf bilan yigʻib boʻlmaydi. Demak NFC bizning apostrof ishimizni buzmaydi."
            },
            {
              "kind": "h3",
              "id": "yakuniy-normalizator",
              "text": "Yakuniy normalizator"
            },
            {
              "kind": "text",
              "text": "NFC ni birinchi qadam qilib qoʻshamiz:"
            },
            {
              "kind": "code",
              "code": "def normallashtir(matn):\n    matn = unicodedata.normalize(\"NFC\", matn)\n    matn = apostrof_tuzat(matn)\n    return matn",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Nima uchun NFC **birinchi**? Chunki apostrof qoidasi \"oldingi belgi harfmi?\" deb soʻraydi. Agar harf ikki qismda turgan boʻlsa (`o` + `\\u0308`), oldingi belgi harf emas, ikki nuqta boʻlib chiqadi — va qoida notoʻgʻri ishlaydi. Avval yigʻamiz, keyin tekshiramiz."
            },
            {
              "kind": "h3",
              "id": "barqarorlik",
              "text": "Barqarorlik"
            },
            {
              "kind": "text",
              "text": "Dars 12 dagi sinovni eslang: normalizatsiyani **ikki marta** qoʻllasak, natija oʻzgarmasligi kerak."
            },
            {
              "kind": "code",
              "code": "for t in testlar:\n    n = normallashtir(t)\n    if normallashtir(n) != n:\n        print(\"BARQAROR EMAS:\", t)\nprint(\"tekshirildi\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "tekshirildi"
            },
            {
              "kind": "text",
              "text": "Hech biri chiqmadi. Toʻgʻri yozilgan matnga normalizator **tegmaydi**."
            }
          ]
        },
        {
          "id": "12-olchaymiz",
          "title": "12. Oʻlchaymiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi asosiy savol: bu amalda qanchalik farq qiladi?"
            },
            {
              "kind": "text",
              "text": "Dars 10 dagi oʻquv matnimizni olamiz, lekin endi undagi yettita `oʻ` ni internetdagidek aralash yozamiz:"
            },
            {
              "kind": "code",
              "code": "matn_aralash = \"\"\"Bolalar maktabga borishdi. Ular kitoblarni o‘qishdi va daftarlarga yozishdi.\nOʻqituvchi darsni tushuntirdi. O'quvchilar savollarga javob berishdi.\nKechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.\nOtalar ishdan kelishdi. Hamma birga dasturxonga o‘tirishdi.\nErtalab bolalar yana maktabga borishdi. Ular yangi darslarni o’rganishdi.\nKitoblarda qiziqarli hikoyalar bor edi. Bolalar hikoyalarni yoqtirishdi.\nO‘qituvchilar savollar berishdi. O'quvchilar javoblarni yozishdi.\"\"\"\n\nprint(normallashtir(matn_aralash) == matn)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "True"
            },
            {
              "kind": "text",
              "text": "Normalizatsiyadan keyin u **aynan** Dars 10 dagi matnga aylanadi."
            },
            {
              "kind": "text",
              "text": "Ikkita tokenizator oʻqitamiz — biri xom matnda, biri normallashtirilganida:"
            },
            {
              "kind": "code",
              "code": "m_xom, v_xom, _ = train_regex(matn_aralash, 306, NAQSH)\nm_nor, v_nor, _ = train_regex(normallashtir(matn_aralash), 306, NAQSH)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Va ikkalasini **yangi** jumlada sinaymiz — u ham internetdagidek aralash yozilgan:"
            },
            {
              "kind": "code",
              "code": "sinov = \"O\\u2018quvchilar o'qituvchiga savol berishdi. O\\u2019qituvchi javob berdi.\"\n\nt_xom = encode_regex(sinov, m_xom, NAQSH)\nt_nor = encode_regex(normallashtir(sinov), m_nor, NAQSH)\n\nw = len(sinov.split())\nprint(\"normalizatsiyasiz:\", len(t_xom), \"token | fertility:\", round(len(t_xom) / w, 3))\nprint(\"normalizatsiya bilan:\", len(t_nor), \"token | fertility:\", round(len(t_nor) / w, 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "normalizatsiyasiz: 32 token | fertility: 4.571\nnormalizatsiya bilan: 28 token | fertility: 4.0"
            },
            {
              "kind": "text",
              "text": "**12% kamroq token.**"
            },
            {
              "kind": "h3",
              "id": "tokenizator-nimani-organdi",
              "text": "Tokenizator nimani oʻrgandi?"
            },
            {
              "kind": "text",
              "text": "Ikkala lugʻatdan apostrof belgisini oʻz ichiga olgan tokenlarni qidiramiz:"
            },
            {
              "kind": "code",
              "code": "def apostrofli(vocab):\n    natija = []\n    for tid in range(256, len(vocab)):\n        matn = vocab[tid].decode(\"utf-8\", errors=\"replace\")\n        for b in APOSTROFLAR:\n            if b in matn:\n                natija.append(matn)\n    return natija\n\n\nprint(\"normalizatsiyasiz:\", apostrofli(v_xom))\nprint(\"normalizatsiya bilan:\", apostrofli(v_nor))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "normalizatsiyasiz: ['‘']\nnormalizatsiya bilan: ['ʻ', 'ʻq', 'Oʻq', 'Oʻqit']"
            },
            {
              "kind": "text",
              "text": "Normalizatsiya bilan tokenizator **`oʻqi-` oʻzagini** qura boshladi: `ʻq` → `Oʻq` → `Oʻqit`. Normalizatsiyasiz esa — deyarli hech narsa. Statistika toʻrtta variantga boʻlinib ketdi va hech biri birlashtirish uchun yetarlicha tez-tez uchramadi."
            },
            {
              "kind": "h3",
              "id": "eng-galati-natija",
              "text": "Eng gʻalati natija"
            },
            {
              "kind": "text",
              "text": "Endi bitta soʻzni uch xil yozib, ikkala tokenizatorda kodlaymiz:"
            },
            {
              "kind": "code",
              "code": "def korsat(tokenlar, vocab):\n    return [decode([t], vocab) for t in tokenlar]\n\nfor soz in [\" o\\u02bbqituvchi\", \" o'qituvchi\", \" o\\u2018qituvchi\"]:\n    a = encode_regex(soz, m_xom, NAQSH)\n    b = encode_regex(normallashtir(soz), m_nor, NAQSH)\n    print(f\"  {soz!r:16s} xom: {len(a)} {korsat(a, v_xom)}\")\n    print(f\"  {'':16s} nor: {len(b)} {korsat(b, v_nor)}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  ' oʻqituvchi'    xom: 5 [' o', '�', '�', 'qit', 'uvchi']\n                   nor: 4 [' o', 'ʻq', 'it', 'uvchi']\n  \" o'qituvchi\"    xom: 4 [' o', \"'\", 'qit', 'uvchi']\n                   nor: 4 [' o', 'ʻq', 'it', 'uvchi']\n  ' o‘qituvchi'    xom: 4 [' o', '‘', 'qit', 'uvchi']\n                   nor: 4 [' o', 'ʻq', 'it', 'uvchi']"
            },
            {
              "kind": "text",
              "text": "**Birinchi qatorga qarang.** Normalizatsiyasiz tokenizatorda **toʻgʻri** yozilgan soʻz **eng qimmat** — 5 token. Va ulardan ikkitasi `�` — Dars 11 dagi yarim belgilar!"
            },
            {
              "kind": "text",
              "text": "Nima boʻldi? Toʻgʻri `ʻ` matnda kam uchragani uchun tokenizator uning ikkita baytini (202 va 187) birlashtirishni oʻrganmagan. Natijada `ʻ` ikki boʻlakda qoldi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Normalizatsiyasiz tokenizator toʻgʻri yozganlarni jazolaydi.** Chunki internetda toʻgʻri yozuv — ozchilik. Normalizatsiya bilan esa uchala yozuv **aynan bir xil** tokenlarga aylanadi."
            },
            {
              "kind": "h3",
              "id": "halol-izoh",
              "text": "Halol izoh"
            },
            {
              "kind": "text",
              "text": "12% — bu **bizning kichkina matnimizdagi** raqam. Unda atigi 7 ta `oʻ` bor, va har biri katta taʼsir qiladi."
            },
            {
              "kind": "text",
              "text": "Haqiqiy katta korpusda farq ancha kichik boʻladi. Millionlab hujjatda tokenizator har bir variantni alohida oʻrganishga yetarli maʼlumot topadi — u shunchaki lugʻatda koʻproq joy isrof qiladi va har bir notoʻgʻri yozilgan soʻz uchun bitta ortiqcha token turadi. 10-boʻlimdagi raqamni eslang: mening tokenizatorimda bitta varianti (`‘`) tuzatilmagani taxminan **2%** turadi."
            },
            {
              "kind": "text",
              "text": "**Kichik matn effektni kattalashtiradi. Tushunish uchun foydali — lekin uni haqiqiy natija deb aytmang.**"
            }
          ]
        },
        {
          "id": "13-normalizatsiya-qayerda-turadi",
          "title": "13. Normalizatsiya qayerda turadi",
          "blocks": [
            {
              "kind": "text",
              "text": "Tokenizatorning toʻliq zanjiri endi shunday:"
            },
            {
              "kind": "pre",
              "text": "matn → normallashtir → regex boʻlish → BPE → tokenlar"
            },
            {
              "kind": "text",
              "text": "Va bu zanjir **ikki joyda** bir xil boʻlishi shart — Dars 13 dagi naqsh kabi:"
            },
            {
              "kind": "code",
              "code": "# oʻqitishda\nmerges, vocab, _ = train_regex(normallashtir(matn), 306, NAQSH)\n\n# kodlashda\ndef encode_toliq(matn, merges):\n    return encode_regex(normallashtir(matn), merges, NAQSH)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "h3",
              "id": "round-trip-endi-boshqacha",
              "text": "Round-trip endi boshqacha"
            },
            {
              "kind": "text",
              "text": "Endi muhim oʻzgarish. Dars 11 da asosiy sinovimiz shu edi:"
            },
            {
              "kind": "pre",
              "text": "decode(encode(x)) == x"
            },
            {
              "kind": "text",
              "text": "Endi u **har doim ham** ishlamaydi:"
            },
            {
              "kind": "code",
              "code": "for x in [\"o'zbek tili\", \"o\\u02bbzbek tili\"]:\n    y = decode(encode_toliq(x, m_nor), v_nor)\n    print(f\"  {x!r:14s} -> {y!r:14s} | == x: {y == x} | == normallashtir(x): {y == normallashtir(x)}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  \"o'zbek tili\"  -> 'oʻzbek tili'  | == x: False | == normallashtir(x): True\n  'oʻzbek tili'  -> 'oʻzbek tili'  | == x: True | == normallashtir(x): True"
            },
            {
              "kind": "text",
              "text": "`o'zbek` kirdi — `oʻzbek` chiqdi. **Asl belgi qaytmaydi.**"
            },
            {
              "kind": "text",
              "text": "Bu xato emas — bu **qaror**. Normalizatsiya **bir tomonlama**: biz besh xil yozuvni ataylab bittaga birlashtirdik, va qaysi biri boshida turganini eslab qolmadik. Oʻzbek tilida ular orasida maʼno farqi yoʻq."
            },
            {
              "kind": "text",
              "text": "Shuning uchun sinov ham oʻzgaradi:"
            },
            {
              "kind": "pre",
              "text": "decode(encode(x)) == normallashtir(x)"
            },
            {
              "kind": "h3",
              "id": "baholash-uchun-muhim-qoida",
              "text": "⚠️ Baholash uchun muhim qoida"
            },
            {
              "kind": "text",
              "text": "Bir xavfli narsa bor. Agar siz tokenizatoringizni **boshqa tokenizatorlar bilan** solishtirmoqchi boʻlsangiz:"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Sinov matnini oldindan normallashtirib saqlamang.** Hamma tokenizatorga **asl internet matnini** bering — har biri oʻz normalizatsiyasini oʻzi qilsin."
            },
            {
              "kind": "text",
              "text": "Agar matnni sizning normalizatoringizdan oʻtkazib saqlasangiz, u **sizning** tokenizatoringiz yaxshi koʻradigan imloda boʻladi. Boshqa tokenizatorlar esa internetdagi imloda oʻrgangan. Solishtiruv sizning foydangizga ogʻadi — sezilmay."
            },
            {
              "kind": "text",
              "text": "Bu xatoni men oʻzim qilganman. Dars 17 da qanday topganimni aytib beraman."
            }
          ]
        },
        {
          "id": "14-2026-yil-yangi-alifbo",
          "title": "14. 2026-yil: yangi alifbo",
          "blocks": [
            {
              "kind": "text",
              "text": "Bu darsni yozayotgan paytda oʻzbek alifbosi oʻzgaryapti."
            },
            {
              "kind": "text",
              "text": "**2026-yil 10-sentabrda** Senat lotin alifbosiga oʻzgartirishlarni maʼqulladi:"
            },
            {
              "kind": "table",
              "head": [
                "Eski",
                "Yangi"
              ],
              "rows": [
                [
                  "oʻ",
                  "**ö**"
                ],
                [
                  "gʻ",
                  "**ğ**"
                ],
                [
                  "sh",
                  "**ş**"
                ],
                [
                  "ch",
                  "**ç**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Tutuq belgisi `ʼ` qoladi. Maktab darsliklari 2031-yilgacha yangi yozuvga oʻtishi rejalashtirilgan."
            },
            {
              "kind": "text",
              "text": "Bu `oʻ` va `gʻ` muammosining oxirimi? Ham ha, ham yoʻq:"
            },
            {
              "kind": "bullets",
              "items": [
                "**Ha** — yangi matnlarda apostrofli harflar boʻlmaydi.",
                "**Yoʻq** — internetdagi millionlab eski matnlar qoladi. Va bir necha yil davomida odamlar **ikkala** yozuvda yozadi."
              ]
            },
            {
              "kind": "h3",
              "id": "tokenizatorga-nima-boladi",
              "text": "Tokenizatorga nima boʻladi?"
            },
            {
              "kind": "text",
              "text": "Mening tokenizatorim eski yozuvda oʻqitilgan. U `ö` ni hech qachon koʻrmagan. Men buni oʻlchadim: bir xil test matnini yangi yozuvga oʻtkazganimda, `uzbek-bpe-16k` ning fertility si **1.709 dan 2.353 ga** oshdi — **38% koʻproq token**. *(Bu oʻlchov normallashtirilgan imlodagi test matnida qilingan, shuning uchun Dars 01 dagi 1.749 dan biroz farq qiladi.)*"
            },
            {
              "kind": "text",
              "text": "Qiziq tomoni: `ö` — **2 bayt**, `oʻ` esa **3 bayt**:"
            },
            {
              "kind": "code",
              "code": "print(list(\"ö\".encode()), list(\"o\\u02bb\".encode()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[195, 182] [111, 202, 187]"
            },
            {
              "kind": "text",
              "text": "Yangi harf **kamroq** bayt turadi — lekin **koʻproq** token. Chunki tokenning narxi baytlarga emas, **tokenizator nimani oʻrganganiga** bogʻliq."
            },
            {
              "kind": "h3",
              "id": "yechim-yana-normalizatsiya",
              "text": "Yechim — yana normalizatsiya"
            },
            {
              "kind": "text",
              "text": "Modelni yangi yozuvda qaytadan oʻqitish — haftalar va pul. Lekin bunga hojat yoʻq."
            },
            {
              "kind": "text",
              "text": "Tokenizatordan **oldin** yangi harflarni eskisiga qaytarsak — `ö` → `oʻ`, `ş` → `sh` — tokenizator oʻzi biladigan matnni oladi. Men buni sinab koʻrdim: fertility **aynan 1.709 ga** qaytdi. Qayta oʻqitish yoʻq, GPU yoʻq, model ham oʻzgarishsiz ishlaydi."
            },
            {
              "kind": "text",
              "text": "Bu funksiyani 18-boʻlimdagi 5-mashqda **oʻzingiz** yozasiz."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Bu darsning eng muhim gʻoyasi:** normalizatsiya — tokenizatorning **eng arzon richagi**. U oʻqitilgan modelga tegmaydi. Faqat matnni modelga tanish shaklga keltiradi. Apostrof muammosi ham, alifbo islohoti ham — bitta usul bilan."
            },
            {
              "kind": "media",
              "id": "p4",
              "title": "Yangi alifbo"
            }
          ]
        },
        {
          "id": "15-muammo",
          "title": "15. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi tokenizatoringiz **toʻliq**:"
            },
            {
              "kind": "bullets",
              "items": [
                "✓ baytlar (Dars 06) — notanish belgi yoʻq",
                "✓ BPE (Dars 08–12) — qoʻshimchalarni oʻzi topadi",
                "✓ regex (Dars 13) — soʻz chegarasidan oʻtmaydi",
                "✓ normalizatsiya (Dars 14) — `oʻ` qanday yozilmasin, bir xil"
              ]
            },
            {
              "kind": "text",
              "text": "Lekin u **53 ta soʻzda** oʻqitilgan. Dars 10 dan bilasiz: bu juda kam — kichik matnda tokenizator oʻrganmaydi, yodlaydi."
            },
            {
              "kind": "text",
              "text": "Haqiqiy tokenizator uchun **millionlab** hujjat kerak. Bu darsdagi senzus ham 3 000 ta haqiqiy hujjatdan olingan edi."
            },
            {
              "kind": "text",
              "text": "Bunday matn qayerdan olinadi? Kim ruxsat beradi? Va eng muhimi — internetdagi matn qanchalik iflos? Dublikatlar, reklamalar, boshqa tillar, buzilgan baytlar..."
            },
            {
              "kind": "text",
              "text": "Keyingi dars aynan shu haqida."
            }
          ]
        },
        {
          "id": "16-toliq-kod",
          "title": "16. Toʻliq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "import re\nimport unicodedata\n\nNAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\n\nOKINA = \"\\u02bb\"    # oʻ va gʻ dagi belgi\nTUTUQ = \"\\u02bc\"    # maʼno dagi belgi\nAPOSTROFLAR = \"'\\u2018\\u2019`\\u02bb\\u02bc\"\n\n\ndef apostrof_tuzat(matn):\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n\n            if oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n    return \"\".join(belgilar)\n\n\ndef normallashtir(matn):\n    matn = unicodedata.normalize(\"NFC\", matn)\n    matn = apostrof_tuzat(matn)\n    return matn\n\n\ndef encode_toliq(matn, merges):\n    return encode_regex(normallashtir(matn), merges, NAQSH)\n\n\n# ---- 1. Qoidalar ----\nfor t in [\"o'zbek\", \"g\\u2019alaba\", \"bog'\", \"ma'no\", \"U \\u2018salom\\u2019 dedi\", \"U 'dunyo' dedi\"]:\n    print(f\"  {t!r:18s} -> {normallashtir(t)!r}\")\n\n# ---- 2. NFC ----\nprint(\"NFC:\", normallashtir(\"o\\u0308\") == \"ö\")\n\n# ---- 3. Trening va sinov ----\nmatn_aralash = \"\"\"Bolalar maktabga borishdi. Ular kitoblarni o‘qishdi va daftarlarga yozishdi.\nOʻqituvchi darsni tushuntirdi. O'quvchilar savollarga javob berishdi.\nKechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.\nOtalar ishdan kelishdi. Hamma birga dasturxonga o‘tirishdi.\nErtalab bolalar yana maktabga borishdi. Ular yangi darslarni o’rganishdi.\nKitoblarda qiziqarli hikoyalar bor edi. Bolalar hikoyalarni yoqtirishdi.\nO‘qituvchilar savollar berishdi. O'quvchilar javoblarni yozishdi.\"\"\"\n\nm_xom, v_xom, _ = train_regex(matn_aralash, 306, NAQSH)\nm_nor, v_nor, _ = train_regex(normallashtir(matn_aralash), 306, NAQSH)\n\nsinov = \"O\\u2018quvchilar o'qituvchiga savol berishdi. O\\u2019qituvchi javob berdi.\"\nw = len(sinov.split())\nt_xom = encode_regex(sinov, m_xom, NAQSH)\nt_nor = encode_toliq(sinov, m_nor)\nprint(\"normalizatsiyasiz:\", len(t_xom), \"token |\", round(len(t_xom) / w, 3))\nprint(\"normalizatsiya bilan:\", len(t_nor), \"token |\", round(len(t_nor) / w, 3))\n\n# ---- 4. Round-trip ----\nx = \"o'zbek tili\"\ny = decode(encode_toliq(x, m_nor), v_nor)\nprint(\"round-trip:\", y == normallashtir(x))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  \"o'zbek\"           -> 'oʻzbek'\n  'g’alaba'          -> 'gʻalaba'\n  \"bog'\"             -> 'bogʻ'\n  \"ma'no\"            -> 'maʼno'\n  'U ‘salom’ dedi'   -> 'U ‘salom’ dedi'\n  \"U 'dunyo' dedi\"   -> \"U 'dunyo' dedi\"\nNFC: True\nnormalizatsiyasiz: 32 token | 4.571\nnormalizatsiya bilan: 28 token | 4.0\nround-trip: True",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "17-ozingiz-yozing",
          "title": "17. Oʻzingiz yozing",
          "blocks": [
            {
              "kind": "code",
              "code": "def apostrof_tuzat(matn):\n    belgilar = ___(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i ___ 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) ___ 1:\n                keyingi = belgilar[i + 1]\n\n            if oldingi in [___, ___]:\n                belgilar[i] = OKINA\n            ___ oldingi in [\"o\", \"O\"] and keyingi.___():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() ___ keyingi.isalpha():\n                belgilar[i] = ___\n    return ___.join(belgilar)\n\n\n# Bu natijani olishingiz kerak:\nprint(apostrof_tuzat(\"To'g'ri ma'no, bog'da\"))     # Toʻgʻri maʼno, bogʻda",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni koʻrsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "def apostrof_tuzat(matn):\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n\n            if oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n    return \"\".join(belgilar)",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "text",
                  "text": "Bitta jumlada uchala qoida ishladi: `toʻgʻri` (o va g), `maʼno` (tutuq), `bogʻda` (g, keyin harf)."
                },
                {
                  "kind": "text",
                  "text": "Eng koʻp qilinadigan xatolar:"
                },
                {
                  "kind": "steps",
                  "items": [
                    "`[\"g\", \"G\"]` oʻrniga `\"gG\"` — 8-boʻlimdagi boʻsh satr tuzogʻi.",
                    "`elif` oʻrniga `if` — unda bitta belgi uchun bir nechta qoida ketma-ket ishlashi mumkin, va oxirgisi \"yutadi\".",
                    "Tutuq qoidasini birinchi qoʻyish — 9-boʻlimdagi `oʼqish` xatosi."
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "18-mashqlar",
          "title": "18. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Ishga tushirmasdan ayting: `normallashtir` bulardan nima qiladi?"
                },
                {
                  "kind": "pre",
                  "text": "\"G‘ozi\"    \"O'g'il\"    \"ko’cha\"    \"Ma`lumot\"    \"sog'lom\""
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "'G‘ozi'      -> 'Gʻozi'\n\"O'g'il\"     -> 'Oʻgʻil'\n'ko’cha'     -> 'koʻcha'\n'Ma`lumot'   -> 'Maʼlumot'\n\"sog'lom\"    -> 'sogʻlom'"
                  },
                  {
                    "kind": "text",
                    "text": "`Maʼlumot` ga diqqat qiling: oldida `a`, keyin `l` — ikkalasi ham harf, va `a` na `o`, na `g`. Demak tutuq. Qaysi belgi bilan yozilgani (`` ` ``) muhim emas."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`normallashtir(\"don't\")` va `normallashtir(\"it's\")` nima qaytaradi? Bu muammomi?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "'donʼt'\n'itʼs'"
                  },
                  {
                    "kind": "text",
                    "text": "Inglizcha apostrof ham ikki harf orasida turibdi — demak 3-qoida uni tutuqqa aylantirdi."
                  },
                  {
                    "kind": "text",
                    "text": "**Muammomi?** Qisman. Oʻzbekcha korpusda inglizcha soʻzlar ham uchraydi, va ular endi biroz \"buzilgan\" boʻladi."
                  },
                  {
                    "kind": "text",
                    "text": "Lekin bu **ongli savdo**: tokenizator oʻzbek tili uchun. Inglizcha matn kam, va `donʼt` ning `don't` dan farqi model uchun katta emas. Agar inglizcha matn koʻp boʻlsa, normalizatsiyadan oldin **tilni aniqlash** kerak boʻlardi — va bu Dars 15 ning mavzusi."
                  },
                  {
                    "kind": "text",
                    "text": "Har bir qoida qayerdadir xato qiladi. Muhimi — **qayerda** ekanini bilish va bu narx toʻlashga arziydimi, hal qilish."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bizning qoidalarimiz `'dunyo'` ni toʻgʻri qoldiradi. Lekin bitta oʻxshash holat bor, unda ular **xato qiladi**. Topa olasizmi? `g` haqida oʻylang."
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(repr(normallashtir(\"U 'bog' dedi\")))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "\"U 'bogʻ dedi\""
                  },
                  {
                    "kind": "text",
                    "text": "Qoʻshtirnoq ichidagi soʻz `g` bilan tugasa, yopuvchi qoʻshtirnoq `gʻ` ga aylanadi."
                  },
                  {
                    "kind": "text",
                    "text": "**Nima uchun tuzatmadik?** Chunki `bogʻ` (oxirida `gʻ`) va `'bog'` (qoʻshtirnoq ichida) **bir xil koʻrinadi**. Belgining atrofi ikkalasida ham aynan bir xil: oldida `g`, keyin boʻshliq. Qaysi biri ekanini faqat **maʼno** hal qiladi — va bizning qoidamiz maʼnoni bilmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "`bogʻ`, `togʻ`, `sogʻ` — juda koʻp uchraydi. `g` bilan tugaydigan soʻzni qoʻshtirnoqqa olish — juda kam. Shuning uchun koʻp uchraydigan holatni toʻgʻri qilib, kam uchraydiganida xato qilishni tanladik."
                  },
                  {
                    "kind": "text",
                    "text": "**Mukammal qoida yoʻq. Faqat yaxshi tanlangan xatolar bor.**"
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`decode(encode_toliq(\"O'zbekiston\", m_nor), v_nor)` nima qaytaradi? Round-trip sinovini qanday yozish kerak?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "output",
                    "text": "'Oʻzbekiston'"
                  },
                  {
                    "kind": "text",
                    "text": "`O'zbekiston` emas — `Oʻzbekiston`. Normalizatsiya bir tomonlama."
                  },
                  {
                    "kind": "text",
                    "text": "Shuning uchun:"
                  },
                  {
                    "kind": "code",
                    "code": "x = \"O'zbekiston\"\ny = decode(encode_toliq(x, m_nor), v_nor)\n\nprint(y == x)                  # False — bu sinov notoʻgʻri\nprint(y == normallashtir(x))   # True  — bu toʻgʻri sinov",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "text",
                    "text": "Agar siz eski sinovni (`y == x`) ishlatsangiz, u **ishlaydigan** tokenizatorni \"buzuq\" deb koʻrsatadi. Sinov ham kod bilan birga oʻzgarishi kerak."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Yangi alifboda yozilgan matnni eski yozuvga qaytaradigan `eski_imloga` funksiyasini yozing: `ö` → `oʻ`, `ğ` → `gʻ`, `ş` → `sh`, `ç` → `ch` (katta harflar ham). Keyin `m_nor` tokenizatorida uch xil matnni oʻlchang:"
                },
                {
                  "kind": "code",
                  "code": "eski  = \"Oʻquvchilar oʻqituvchiga savol berishdi. Oʻqituvchi javob berdi.\"\nyangi = \"Öquvçilar öqituvçiga savol berişdi. Öqituvçi javob berdi.\"",
                  "lang": "python",
                  "mode": "type"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "def eski_imloga(matn):\n    matn = unicodedata.normalize(\"NFC\", matn)\n    matn = matn.replace(\"ş\", \"sh\").replace(\"Ş\", \"Sh\")\n    matn = matn.replace(\"ç\", \"ch\").replace(\"Ç\", \"Ch\")\n    matn = matn.replace(\"ö\", \"o\\u02bb\").replace(\"Ö\", \"O\\u02bb\")\n    matn = matn.replace(\"ğ\", \"g\\u02bb\").replace(\"Ğ\", \"G\\u02bb\")\n    return matn\n\n\nprint(eski_imloga(yangi) == eski)\n\nw = len(eski.split())\nfor nom, m in [(\"eski imlo\", eski), (\"yangi imlo\", yangi), (\"qaytarilgan\", eski_imloga(yangi))]:\n    t = encode_toliq(m, m_nor)\n    print(f\"  {nom:12s} {len(t):3d} token | {len(t) / w:.3f}\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "True\n  eski imlo     28 token | 4.000\n  yangi imlo    49 token | 7.000\n  qaytarilgan   28 token | 4.000"
                  },
                  {
                    "kind": "text",
                    "text": "**Yangi imlo — 75% koʻproq token.** Qaytarilgandan keyin — **aynan** eski raqam."
                  },
                  {
                    "kind": "text",
                    "text": "Mening haqiqiy tokenizatorimda farq 38% edi (1.709 → 2.353), va qaytarish ham uni aynan 1.709 ga tikladi. Bizning kichkina tokenizatorda farq kattaroq — u kamroq soʻz biladi."
                  },
                  {
                    "kind": "text",
                    "text": "**Nima uchun birinchi qator NFC?** 11-boʻlimni eslang: `ö` ikki xil yozilishi mumkin. Agar matnda ikki qismli `o` + `\\u0308` boʻlsa, `.replace(\"ö\", ...)` uni **topmaydi**. NFC avval ularni bitta `ö` ga yigʻadi."
                  },
                  {
                    "kind": "text",
                    "text": "**Cheklov:** `ŞAHAR` → `ShAHAR` boʻladi (`SHAHAR` emas). Va turkcha ismlar ham\noʻzgaradi: `Gökhan` → `Goʻkhan`. Haqiqiy konvertor bunday holatlarni ham hisobga olishi kerak."
                  },
                  {
                    "kind": "text",
                    "text": "**Va eng muhimi:** siz hozir alifbo islohotiga tokenizatorni **qayta oʻqitmasdan** moslashtirdingiz. Bitta funksiya, sakkizta `.replace()`."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "19-xulosa",
          "title": "19. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "Notoʻgʻri apostrof soʻzni regex darajasida **kesib qoʻyadi** — `o'zbek` → uch boʻlak. BPE bu devordan hech qachon oʻta olmaydi.",
                "Internetda `oʻ` ning toʻgʻri yozuvi — atigi **23%**. Eng koʻp — `‘` (34%).",
                "Ikkita toʻgʻri belgi: `ʻ` (699) — `oʻ`, `gʻ` uchun; `ʼ` (700) — tutuq uchun. Ikkalasi ham Unicode'da **harf**.",
                "Belgining oʻzi emas — **atrofi** hal qiladi. `.replace()` bu ishni qila olmaydi.",
                "`g` dan keyin — doim `ʻ`. `o` dan keyin — faqat keyin harf boʻlsa. Ikki harf orasida — `ʼ`. Qolgan hammasi — tegilmaydi.",
                "`elif` zanjirida **eng aniq shart birinchi**. `x in [\"a\", \"b\"]` — `x in \"ab\"` emas (`\"\" in \"ab\"` → `True`).",
                "**NFC** — koʻzga bir xil, baytlarda har xil harflarni bittaga yigʻadi. Apostrof qoidasidan **oldin**.",
                "Normalizatsiya **bir tomonlama**. Sinov: `decode(encode(x)) == normallashtir(x)`.",
                "Sinov matnini oldindan normallashtirib saqlamang — solishtiruv sizning foydangizga ogʻadi.",
                "Normalizatsiya — **eng arzon richag**. Alifbo islohotiga ham qayta oʻqitmasdan moslashtiradi."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "Tokenizator toʻliq. Endi unga **haqiqiy maʼlumot** kerak."
            },
            {
              "kind": "text",
              "text": "**Dars 15 — Maʼlumot: qayerdan olish va qanday tozalash.** Oʻzbek matni qayerda bor, qaysi birini ishlatish mumkin, va internet matnini tokenizatorga berishdan oldin undan nimalarni olib tashlash kerak."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *agar bitta yangilik maqolasi oʻnta saytda qayta chop etilgan boʻlsa — va hammasi korpusingizga tushsa — bu tokenizatorga qanday taʼsir qiladi?*"
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–13. Regex naqsh, `train_regex`, `encode_regex`"
    },
    {
      "id": "dars-15",
      "n": 15,
      "title": "Maʼlumot: qayerdan olish va qanday tozalash",
      "subtitle": "",
      "minutes": 75,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**bilasiz** oʻzbek matni internetda qayerda bor — va qancha (haqiqiy raqamlar bilan);",
                "**ajrata olasiz** uchta savolni: undan oʻqitsam boʻladimi, uni tarqatsam boʻladimi, nima shart;",
                "**koʻrasiz** \"tozalangan\" korpus ichida aslida nimalar yotganini;",
                "**oʻqiysiz va yozasiz** fayllarni — va notoʻgʻri kodlash harflarni qanday buzishini;",
                "**qurasiz** olti bosqichli tozalash quvurini, har bosqichda raqam bilan;",
                "**oʻlchaysiz** iflos korpus tokenizatorga nima qilishini."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 14 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Agar bitta yangilik maqolasi oʻnta saytda qayta chop etilgan boʻlsa — va hammasi korpusingizga tushsa — bu tokenizatorga qanday taʼsir qiladi?"
            },
            {
              "kind": "text",
              "text": "Dars 08 ni eslang: BPE **eng koʻp uchragan** juftni birlashtiradi. U \"bu juft muhimmi?\" deb soʻramaydi. Faqat sanaydi."
            },
            {
              "kind": "text",
              "text": "Demak bitta maqola oʻn marta uchrasa, uning soʻzlari tokenizator uchun **oʻn barobar muhim** boʻlib qoladi. Lugʻatdagi joylar — cheklangan. Ular oʻsha bitta maqolaga ketadi."
            },
            {
              "kind": "text",
              "text": "Bu — gipoteza. Darsning oxirida uni oʻlchaymiz. Lekin avval bizga haqiqiy matn kerak. U qayerdan keladi?"
            }
          ]
        },
        {
          "id": "2-ozbek-matni-qayerda-bor",
          "title": "2. Oʻzbek matni qayerda bor",
          "blocks": [
            {
              "kind": "text",
              "text": "Shu paytgacha biz oʻzimiz yozgan 7 qatorli matnda ishladik. Haqiqiy tokenizatorga **millionlab** hujjat kerak. Hech kim ularni qoʻlda yozmaydi — ular internetdan olinadi."
            },
            {
              "kind": "h3",
              "id": "common-crawl",
              "text": "Common Crawl"
            },
            {
              "kind": "text",
              "text": "**Common Crawl** — notijorat tashkilot. U internetni muntazam aylanib chiqadi, sahifalarni yuklab oladi va hammasini **bepul** tarqatadi. Har bir aylanish — bitta **surat** (snapshot) deyiladi."
            },
            {
              "kind": "text",
              "text": "Lekin Common Crawl — xom material. Unda HTML kodi, menyular, reklama, yuzlab tillar, spam — hammasi aralash. Undan foydalanish uchun kimdir tozalashi kerak."
            },
            {
              "kind": "h3",
              "id": "fineweb-2",
              "text": "FineWeb-2"
            },
            {
              "kind": "text",
              "text": "**FineWeb-2** — Hugging Face jamoasi Common Crawl'dan yasagan korpus. Ular:"
            },
            {
              "kind": "steps",
              "items": [
                "**96 ta suratni** oldi — 2013-yil yozidan 2024-yil aprelgacha;",
                "HTML'dan **faqat matnni** ajratdi (`trafilatura` dasturi bilan);",
                "har bir hujjatning **tilini aniqladi** (`GlotLID` modeli bilan);",
                "har bir til uchun **dublikatlarni** olib tashladi;",
                "sifat **filtrlari**dan oʻtkazdi."
              ]
            },
            {
              "kind": "text",
              "text": "Natija — taxminan 20 terabayt, 1 868 ta til-yozuv juftligi. Oʻzbek tili ikki boʻlimda:"
            },
            {
              "kind": "table",
              "head": [
                "Boʻlim",
                "Hujjatlar",
                "Soʻzlar",
                "Hajmi (UTF-8)"
              ],
              "rows": [
                [
                  "`uzn_Latn` — lotin",
                  "1 233 463",
                  "687 002 994",
                  "4.45 GB"
                ],
                [
                  "`uzn_Cyrl` — kirill",
                  "1 357 811",
                  "544 866 919",
                  "6.12 GB"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Ikkita narsaga eʼtibor bering."
            },
            {
              "kind": "text",
              "text": "**Birinchi:** kirill yozuvidagi oʻzbekcha hujjatlar lotinchadan **koʻproq** — 124 348 taga. Internetning katta qismi hali kirillda. Bizning tokenizatorimiz lotin uchun — demak bu hujjatlarni ishlatmaymiz (8-boʻlimda qaytamiz)."
            },
            {
              "kind": "text",
              "text": "**Ikkinchi:** shu korpusda rus tilida **588 579 493 780** soʻz bor. Bu oʻzbek lotin boʻlimidan **857 marta** koʻp. Dars 01 da \"nega oʻzbek tili AI uchun qimmat?\" deb soʻragan edik. Mana javobning bir qismi — raqamda."
            },
            {
              "kind": "h3",
              "id": "boshqa-manbalar",
              "text": "Boshqa manbalar"
            },
            {
              "kind": "table",
              "head": [
                "Manba",
                "Oʻzbekcha hajmi",
                "Nima",
                "Qayerda"
              ],
              "rows": [
                [
                  "**FineWeb-2**",
                  "1.23 mln hujjat (lotin)",
                  "Common Crawl 2013–2024, tozalangan",
                  "Hugging Face"
                ],
                [
                  "**CC-100**",
                  "91 mln token, 0.7 GiB",
                  "Common Crawl, faqat 2018-yil",
                  "Hugging Face, statmt"
                ],
                [
                  "**OSCAR**",
                  "—",
                  "Common Crawl, bir necha versiya",
                  "Hugging Face, **soʻrov bilan**"
                ],
                [
                  "**Vikipediya**",
                  "354 569 maqola (2026-avgust)",
                  "ensiklopediya",
                  "dumps.wikimedia.org"
                ],
                [
                  "**UzCrawl**",
                  "1.3 mln yangilik + 368 ming Telegram post",
                  "yangilik saytlari, Telegram",
                  "Hugging Face"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Bir nechta izoh:"
            },
            {
              "kind": "bullets",
              "items": [
                "**CC-100** — XLM-R modelini oʻqitish uchun yigʻilgan. Kichik va eski (2018).",
                "**OSCAR** — yuklab olish uchun avval ruxsat soʻrash kerak.",
                "**Vikipediya** — tili toza, lekin oʻzbekcha maqolalarning koʻpi **botlar** bilan yaratilgan (2013-yilda butun Oʻzbekiston milliy ensiklopediyasi import qilingan). Mavzular tor, uslub bir xil.",
                "**UzCrawl** — yangiliklar uchun eng katta manba. Uning litsenziyasi haqida 4-boʻlimda."
              ]
            },
            {
              "kind": "text",
              "text": "Bu darsda **FineWeb-2** bilan ishlaymiz: eng katta, eng yangi, va — muhimi — har bir hujjat haqida koʻp maʼlumot saqlaydi."
            }
          ]
        },
        {
          "id": "3-bitta-haqiqiy-yozuv",
          "title": "3. Bitta haqiqiy yozuv",
          "blocks": [
            {
              "kind": "text",
              "text": "FineWeb-2 ning har bir hujjati — bitta **yozuv** (record). Oʻzbek lotin boʻlimining eng birinchi yozuvi mana bunday:"
            },
            {
              "kind": "table",
              "head": [
                "Maydon",
                "Qiymati",
                "Maʼnosi"
              ],
              "rows": [
                [
                  "`text`",
                  "`Qirg’izistonda joriy yil qator oliygohlarda…`",
                  "matnning oʻzi"
                ],
                [
                  "`url`",
                  "`http://www.amerikaovozi.com/content/higher-education-kyrgyzstan/1476380.html`",
                  "qaysi sahifadan"
                ],
                [
                  "`dump`",
                  "`CC-MAIN-2013-20`",
                  "qaysi Common Crawl suratidan"
                ],
                [
                  "`date`",
                  "`2013-06-19T04:27:40Z`",
                  "qachon yuklangan"
                ],
                [
                  "`language`",
                  "`uzn`",
                  "til (shimoliy oʻzbek)"
                ],
                [
                  "`language_script`",
                  "`Latn`",
                  "yozuv"
                ],
                [
                  "`language_score`",
                  "`1.000`",
                  "til aniqlovchi qanchalik ishonchli"
                ],
                [
                  "`minhash_cluster_size`",
                  "**17**",
                  "⬅ shunga diqqat"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Oxirgi maydon — eng qiziqarlisi. **17** — bu matn Common Crawl'da **17 nusxada** topilganini bildiradi. FineWeb-2 ulardan **bittasini** qoldirdi, qolgan 16 tasini tashladi — va qancha boʻlganini shu yerga yozib qoʻydi."
            },
            {
              "kind": "text",
              "text": "Nusxalar qayerdan keladi? Bir xil sahifa har yili qayta yuklanadi (96 ta surat!), maqolalar boshqa saytlarga koʻchiriladi, bitta sahifa bir necha manzilda turadi. Demak 1-boʻlimdagi savol xayoliy emas. Men koʻrgan birinchi 14 ta hujjat orasida `79` va `91` ham bor edi — ikkalasi Vikipediya maqolalari."
            },
            {
              "kind": "h3",
              "id": "yuklab-olish",
              "text": "Yuklab olish"
            },
            {
              "kind": "text",
              "text": "Colab'da FineWeb-2 dan hujjatlarni shunday oʻqish mumkin:"
            },
            {
              "kind": "code",
              "code": "# Colab'da, agar kerak boʻlsa, avval:  !pip install datasets\nfrom datasets import load_dataset\n\nds = load_dataset(\"HuggingFaceFW/fineweb-2\", name=\"uzn_Latn\", split=\"train\", streaming=True)\n\nfor hujjat in ds:\n    print(hujjat[\"url\"])\n    print(hujjat[\"dump\"], round(hujjat[\"language_score\"], 3), hujjat[\"minhash_cluster_size\"])\n    print(hujjat[\"text\"][:80])\n    break",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "http://www.amerikaovozi.com/content/higher-education-kyrgyzstan/1476380.html\nCC-MAIN-2013-20 1.0 17\nQirg’izistonda joriy yil qator oliygohlarda byudjet o’rinlari bo’sh qolgan. Muta"
            },
            {
              "kind": "text",
              "text": "Har bir parametr:"
            },
            {
              "kind": "bullets",
              "items": [
                "`\"HuggingFaceFW/fineweb-2\"` — korpusning Hugging Face'dagi nomi.",
                "`name=\"uzn_Latn\"` — qaysi boʻlim. Kirill uchun — `\"uzn_Cyrl\"`.",
                "`split=\"train\"` — qaysi qism. FineWeb-2 da kichkina `test` qismi ham bor — va korpus mualliflari ochiq yozgan: **undan oʻqitmang**. Nima uchun — Dars 17 da.",
                "`streaming=True` — 1.9 GB ni birdaniga yuklamaydi. Hujjatlarni **birma-bir** oʻqiydi. `for` tsikli har aylanganda — bitta yangi hujjat.",
                "`break` — birinchi hujjatdan keyin toʻxtaymiz (Dars 10)."
              ]
            },
            {
              "kind": "text",
              "text": "Bu darsning qolgan qismida biz katta korpus bilan emas, **kichkina oʻquv korpusi** bilan ishlaymiz — 29 ta hujjat. Sababi oddiy: 1.2 million hujjatda har bir bosqichni koʻz bilan tekshirib boʻlmaydi. 29 tada — boʻladi. Oʻquv korpusidagi matnlar kurs uchun yozilgan, lekin ulardagi muammolar haqiqiy: bir qismini FineWeb-2 ning oʻzida topdim (5-boʻlimda koʻrasiz), qolganlari — FineWeb-2 kabi korpuslar xom internet matnidan olib tashlaydigan narsalar."
            }
          ]
        },
        {
          "id": "4-litsenziya-uchta-savol",
          "title": "4. Litsenziya: uchta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "\"Internetda bor\" degani \"xohlagancha ishlatsa boʻladi\" degani emas."
            },
            {
              "kind": "text",
              "text": "Har bir manba uchun **uchta** savol bering:"
            },
            {
              "kind": "steps",
              "items": [
                "Undan **oʻqitsam** boʻladimi? (tokenizator yoki model)",
                "Matnning oʻzini **qayta tarqatsam** boʻladimi? (masalan, tozalangan korpusni saytga qoʻyish)",
                "Buning uchun nima **shart**?"
              ]
            },
            {
              "kind": "table",
              "head": [
                "Manba",
                "Litsenziya",
                "Asosiy shart"
              ],
              "rows": [
                [
                  "FineWeb-2",
                  "**ODC-By 1.0**",
                  "manbani koʻrsatish"
                ],
                [
                  "Vikipediya",
                  "**CC BY-SA**",
                  "manbani koʻrsatish **va** oʻzgartirilgan matnni **xuddi shu litsenziya** bilan tarqatish"
                ],
                [
                  "OSCAR",
                  "metamaʼlumot — CC0",
                  "matnning oʻzi — Common Crawl'dan; kirish uchun soʻrov"
                ],
                [
                  "CC-100",
                  "Hugging Face sahifasida — \"unknown\"",
                  "aniq emas"
                ],
                [
                  "UzCrawl",
                  "yorliqda — Apache-2.0",
                  "pastga qarang"
                ]
              ]
            },
            {
              "kind": "h3",
              "id": "eng-muhim-farq-toplam-va-matn",
              "text": "Eng muhim farq: toʻplam va matn"
            },
            {
              "kind": "text",
              "text": "Bu jadvaldagi litsenziyalar — asosan **toʻplamni yigʻgan odamlarning ishi**\nuchun: tanlash, tozalash, qadoqlash. Matnning oʻzini esa ular yozmagan. Uni saytlar, jurnalistlar, oddiy odamlar yozgan."
            },
            {
              "kind": "text",
              "text": "OSCAR buni ochiq aytadi: CC0 faqat **metamaʼlumot** uchun, matn esa Common Crawl'dan olingan. FineWeb-2 sayt egalari uchun **oʻchirish soʻrovi** shaklini ochib qoʻygan. UzCrawl'ning yorligʻi Apache-2.0 — lekin ichidagi yangilik maqolalari yangilik saytlariniki."
            },
            {
              "kind": "text",
              "text": "**Yorliqdagi litsenziya — bu toʻplamni yigʻganlarning ruxsati. Matn egasining emas.**"
            },
            {
              "kind": "h3",
              "id": "shaxsiy-malumot",
              "text": "Shaxsiy maʼlumot"
            },
            {
              "kind": "text",
              "text": "FineWeb-2 elektron pochta manzillarini `email@example.com` ga, IP manzillarni soxta raqamlarga almashtirgan. **Telefon raqamlarini esa almashtirmagan** — mualliflar yozishicha, ularni qidiradigan qoida juda koʻp xato qilgan. Demak korpusingizda telefon raqamlari boʻlishi mumkin."
            },
            {
              "kind": "h3",
              "id": "amaliy-qoidalar",
              "text": "Amaliy qoidalar"
            },
            {
              "kind": "steps",
              "items": [
                "**Har bir manbani yozib qoʻying:** nomi, versiyasi, qachon yuklangani, litsenziyasi, havolasi. 15-boʻlimda buni kod bilan qilamiz.",
                "**Model chiqarsangiz** — qaysi korpusda oʻqitilganini koʻrsating.",
                "**Korpusni tarqatmoqchi boʻlsangiz** — eng qattiq litsenziyaga qarang. Vikipediya matni aralashgan boʻlsa — CC BY-SA sharti butun toʻplamga taʼsir qilishi mumkin."
              ]
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Men yurist emasman. Bu boʻlim — xarita, yuridik maslahat emas. Tijoriy loyiha boʻlsa, mutaxassisdan soʻrang."
            },
            {
              "kind": "text",
              "text": "Bu darsdagi oʻquv korpusi kurs uchun yozilgan — uni istalgancha ishlating."
            }
          ]
        },
        {
          "id": "5-tozalangan-korpus-ichida-nima-bor",
          "title": "5. \"Tozalangan\" korpus ichida nima bor",
          "blocks": [
            {
              "kind": "text",
              "text": "FineWeb-2 — \"tozalangan\" korpus. Men oʻzbek lotin boʻlimining **birinchi 14 ta hujjatini** oʻqib chiqdim. Mana topganlarim:"
            },
            {
              "kind": "text",
              "text": "**1. Buzilgan harflar.** `samdu.uz` dagi hujjatda shunday satrlar bor:"
            },
            {
              "kind": "pre",
              "text": "Ushbu ma‚Äôruza muallif tomonidan 2009 yilda Samarqand Davlat universitetida o‚Äôtkazilgan ‚ÄĚSinguilarity Theory"
            },
            {
              "kind": "text",
              "text": "`ma‚Äôruza` — aslida `ma’ruza`. `o‚Äôtkazilgan` — aslida `o’tkazilgan`. Bitta belgi uchta axlat belgiga aylangan. Va oʻsha hujjatning **boshqa joyida** `o’qituvchilar` toʻgʻri yozilgan. Bitta hujjat — ham toʻgʻri, ham buzuq."
            },
            {
              "kind": "text",
              "text": "**2. Sayt qoldiqlari.** Oʻsha hujjat `DocumentsDate added` bilan boshlanadi — bu saytning jadval sarlavhasi. TED saytidagi hujjat `Click on any phrase to play the video at that point.Close` bilan boshlanadi va inglizcha tarjimai hol bilan tugaydi: `…its rings and its moons. Full bio »`. Uning `language_score` i — **1.000**."
            },
            {
              "kind": "text",
              "text": "**3. Shablon satrlar.** Uchta Vikipediya hujjati bir xil satr bilan tugaydi:"
            },
            {
              "kind": "pre",
              "text": "|Ushbu maqolani yozishda Oʻzbekiston milliy ensiklopediyasi (2000-2005) maʼlumotlaridan foydalanilgan.|"
            },
            {
              "kind": "text",
              "text": "**4. Aralash apostroflar.** \"Yusuf\" maqolasida bitta hujjatning oʻzida `'` 253 marta, `ʻ` 27 marta, `ʼ` 11 marta uchraydi. Dars 14 dagi muammo — bitta hujjat ichida."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**\"Tozalangan\" korpus — toza korpus emas.** Bu — boshqa birov **oʻz maqsadi uchun** tozalagan korpus. Sizning maqsadingiz boshqa boʻlishi mumkin."
            },
            {
              "kind": "text",
              "text": "Bu toʻrt muammoning hammasi bizning oʻquv korpusimizda bor. Ularni topish va tuzatish uchun avval fayllar bilan ishlashni oʻrganamiz."
            }
          ]
        },
        {
          "id": "6-fayllar-bilan-ishlash",
          "title": "6. Fayllar bilan ishlash",
          "blocks": [
            {
              "kind": "text",
              "text": "Shu paytgacha matnni toʻgʻridan-toʻgʻri kodga yozdik: `matn = \"...\"`. Haqiqiy korpus esa **faylda** turadi."
            },
            {
              "kind": "h3",
              "id": "faylga-yozish",
              "text": "Faylga yozish"
            },
            {
              "kind": "code",
              "code": "with open(\"salom.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Salom, dunyo!\\n\")\n    f.write(\"O\\u02bbzbek tili\\n\")\n\nprint(\"yozildi\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "yozildi"
            },
            {
              "kind": "text",
              "text": "Har bir qism:"
            },
            {
              "kind": "bullets",
              "items": [
                "`open(...)` — faylni ochadi.",
                "`\"salom.txt\"` — fayl nomi. Colab'da u chap tomondagi papka belgisida paydo boʻladi.",
                "`\"w\"` — **yozish** rejimi (*write*). ⚠️ Agar fayl bor boʻlsa, uning ichidagi hamma narsa **oʻchadi**.",
                "`encoding=\"utf-8\"` — harflarni baytlarga **qanday** aylantirish (Dars 06).",
                "`with ... as f:` — faylni ochib, unga `f` deb nom beradi. Ichkariga surilgan qatorlar tugagach, faylni **oʻzi yopadi**. Yopilmagan fayl — yozilmay qolgan maʼlumot boʻlishi mumkin.",
                "`f.write(...)` — matnni yozadi. **Yangi qatorga oʻtkazmaydi** — `\\n` ni oʻzimiz qoʻshdik."
              ]
            },
            {
              "kind": "h3",
              "id": "fayldan-oqish",
              "text": "Fayldan oʻqish"
            },
            {
              "kind": "code",
              "code": "with open(\"salom.txt\", encoding=\"utf-8\") as f:\n    matn = f.read()\n\nprint(repr(matn))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'Salom, dunyo!\\nOʻzbek tili\\n'"
            },
            {
              "kind": "bullets",
              "items": [
                "Rejim yozilmasa — **oʻqish** rejimi.",
                "`f.read()` — butun faylni bitta satr qilib qaytaradi."
              ]
            },
            {
              "kind": "text",
              "text": "Faylni **qatorma-qator** ham oʻqish mumkin — `for` bilan:"
            },
            {
              "kind": "code",
              "code": "with open(\"salom.txt\", encoding=\"utf-8\") as f:\n    for qator in f:\n        print(repr(qator), \"->\", repr(qator.strip()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'Salom, dunyo!\\n' -> 'Salom, dunyo!'\n'Oʻzbek tili\\n' -> 'Oʻzbek tili'"
            },
            {
              "kind": "text",
              "text": "Har bir qator oxirida `\\n` bor. `.strip()` — satrning **ikki chetidagi** boʻshliq va `\\n` larni olib tashlaydi. Oʻrtasidagilarga tegmaydi:"
            },
            {
              "kind": "code",
              "code": "print(repr(\"   salom   \".strip()))\nprint(repr(\"\\n\\n matn \\n\".strip()))\nprint(repr(\" bir  ikki \".strip()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'salom'\n'matn'\n'bir  ikki'"
            },
            {
              "kind": "text",
              "text": "Va Dars 01 dagi `.split()` ga argument bersangiz — oʻsha belgi boʻyicha boʻladi:"
            },
            {
              "kind": "code",
              "code": "print(matn.split(\"\\n\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['Salom, dunyo!', 'Oʻzbek tili', '']"
            },
            {
              "kind": "text",
              "text": "Oxirgi `''` ga eʼtibor bering: oxirgi `\\n` dan keyin **boʻsh satr** qoldi. Bu bizga keyin kerak boʻladi."
            },
            {
              "kind": "h3",
              "id": "notogri-kodlash",
              "text": "Notoʻgʻri kodlash"
            },
            {
              "kind": "text",
              "text": "Endi oʻsha faylni **boshqa kodlash** bilan oʻqiymiz:"
            },
            {
              "kind": "code",
              "code": "with open(\"salom.txt\", encoding=\"latin-1\") as f:\n    print(repr(f.read()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'Salom, dunyo!\\nOÊ»zbek tili\\n'"
            },
            {
              "kind": "text",
              "text": "`Oʻzbek` → `OÊ»zbek`. Nima boʻldi? Dars 06 ni eslang:"
            },
            {
              "kind": "code",
              "code": "print(list(\"\\u02bb\".encode(\"utf-8\")))\nprint(chr(202), chr(187))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[202, 187]\nÊ »"
            },
            {
              "kind": "text",
              "text": "`ʻ` — UTF-8 da **ikki bayt**: 202 va 187. `latin-1` esa har bir baytni **alohida harf** deb oʻqiydi: 202 → `Ê`, 187 → `»`. Baytlar toʻgʻri. **Oʻqish usuli** notoʻgʻri."
            },
            {
              "kind": "text",
              "text": "Bu hodisaning nomi bor: **mojibake** (yaponcha — \"buzilgan harflar\"). 5-boʻlimdagi `ma‚Äôruza` — aynan shu. Faqat u yerda boshqa kodlash ishlatilgan."
            },
            {
              "kind": "h3",
              "id": "ataylab-xato-ascii",
              "text": "Ataylab xato: `ascii`"
            },
            {
              "kind": "text",
              "text": "`ascii` — eng eski kodlash. U faqat 0 dan 127 gacha baytlarni biladi:"
            },
            {
              "kind": "code",
              "code": "with open(\"salom.txt\", encoding=\"ascii\") as f:\n    print(f.read())",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "UnicodeDecodeError: 'ascii' codec can't decode byte 0xca in position 15: ordinal not in range(128)",
              "error": true
            },
            {
              "kind": "text",
              "text": "Xatoni oʻqiymiz:"
            },
            {
              "kind": "bullets",
              "items": [
                "`UnicodeDecodeError` — **baytdan matnga** aylantirishda xato.",
                "`'ascii' codec can't decode byte 0xca` — `ascii` `0xca` baytini oʻqiy olmadi. `0xca` — bu 202 ning oʻn oltilik yozuvi. `ʻ` ning birinchi bayti!",
                "`in position 15` — 15-baytda. `Salom, dunyo!\\n` — 14 bayt, keyin `O` (14-bayt), keyin `ʻ` (15-bayt).",
                "`ordinal not in range(128)` — 202 soni 0–127 oraligʻida emas."
              ]
            },
            {
              "kind": "text",
              "text": "`latin-1` xato bermadi — **jim** buzdi. `ascii` esa baqirdi. Qaysi biri yaxshiroq? **Baqirgani.** Jim buzilgan matn korpusga kirib ketadi va uni hech kim sezmaydi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Qoida:** har doim `encoding=\"utf-8\"` deb yozing — oʻqiganda ham, yozganda ham."
            },
            {
              "kind": "media",
              "id": "p2",
              "title": "Buzilgan harflar"
            }
          ]
        },
        {
          "id": "7-json-va-jsonl",
          "title": "7. JSON va JSONL",
          "blocks": [
            {
              "kind": "text",
              "text": "Korpusda har bir hujjat uchun matndan tashqari **maʼlumot** ham saqlaymiz: qayerdan olingani, raqami. Bunga Dars 04 dagi lugʻat (`dict`) mos keladi. Lekin lugʻatni faylga qanday yozamiz?"
            },
            {
              "kind": "text",
              "text": "**JSON** — lugʻatni matnga aylantirishning standart usuli:"
            },
            {
              "kind": "code",
              "code": "import json\n\nhujjat = {\"id\": 1, \"url\": \"https://misol.uz\", \"text\": \"Salom\"}\nsatr = json.dumps(hujjat)\n\nprint(satr)\nprint(type(satr))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{\"id\": 1, \"url\": \"https://misol.uz\", \"text\": \"Salom\"}\n<class 'str'>"
            },
            {
              "kind": "bullets",
              "items": [
                "`json.dumps(...)` — lugʻat → **matn** (*dump string*)."
              ]
            },
            {
              "kind": "text",
              "text": "Teskarisi:"
            },
            {
              "kind": "code",
              "code": "qaytdi = json.loads(satr)\n\nprint(qaytdi[\"text\"])\nprint(qaytdi == hujjat)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Salom\nTrue"
            },
            {
              "kind": "bullets",
              "items": [
                "`json.loads(...)` — matn → **lugʻat** (*load string*). Toʻliq qaytdi."
              ]
            },
            {
              "kind": "h3",
              "id": "ensure-ascii-tuzogi",
              "text": "`ensure_ascii` tuzogʻi"
            },
            {
              "kind": "code",
              "code": "h = {\"text\": \"o\\u02bbzbek\"}\n\nprint(json.dumps(h))\nprint(json.dumps(h, ensure_ascii=False))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{\"text\": \"o\\u02bbzbek\"}\n{\"text\": \"oʻzbek\"}"
            },
            {
              "kind": "text",
              "text": "Standart holatda `json.dumps` **ascii** dan tashqaridagi har bir belgini `\\u02bb` koʻrinishida yozadi — 6 ta belgi bitta harf oʻrniga. Maʼlumot yoʻqolmaydi (`json.loads` uni qaytaradi), lekin faylni koʻz bilan oʻqib boʻlmaydi va u kattaroq boʻladi. `ensure_ascii=False` — \"harflarni oʻzicha yoz\"."
            },
            {
              "kind": "h3",
              "id": "jsonl-har-qatorda-bitta-hujjat",
              "text": "JSONL — har qatorda bitta hujjat"
            },
            {
              "kind": "text",
              "text": "Korpus fayllari odatda **JSONL** formatida: har bir qatorda — bitta JSON. Lekin matnning oʻzida yangi qator boʻlsa-chi?"
            },
            {
              "kind": "code",
              "code": "h = {\"text\": \"birinchi qator\\nikkinchi qator\"}\nprint(json.dumps(h, ensure_ascii=False))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{\"text\": \"birinchi qator\\nikkinchi qator\"}"
            },
            {
              "kind": "text",
              "text": "JSON matn ichidagi yangi qatorni `\\n` ikki belgisi bilan yozadi. Demak bitta hujjat — **har doim bitta qator**. Fayldagi qatorlar soni = hujjatlar soni."
            }
          ]
        },
        {
          "id": "8-oquv-korpusimiz",
          "title": "8. Oʻquv korpusimiz",
          "blocks": [
            {
              "kind": "text",
              "text": "Oʻquv korpusi — [xom_korpus.jsonl](/data/xom_korpus.jsonl) fayli. Uni yuklab oling va Colab'ning chap tomonidagi papka belgisiga tashlang. Yoki darsning oxiridagi **Ilova A** kodini birinchi katakda ishga tushiring — u aynan shu faylni yaratadi (lekin kodni hozir oʻqimang, ichida javoblar bor)."
            },
            {
              "kind": "h3",
              "id": "bizga-kerak-boladigan-eski-kod",
              "text": "Bizga kerak boʻladigan eski kod"
            },
            {
              "kind": "text",
              "text": "Dars 13 dagi `train_regex`, `encode_regex`, `decode`, `NAQSH` va Dars 14 dagi normalizator:"
            },
            {
              "kind": "code",
              "code": "import re\nimport unicodedata\n\nOKINA = \"\\u02bb\"\nTUTUQ = \"\\u02bc\"\nAPOSTROFLAR = \"'\\u2018\\u2019`\\u02bb\\u02bc\"\n\n\ndef normallashtir(matn):\n    matn = unicodedata.normalize(\"NFC\", matn)\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n\n            if oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n    return \"\".join(belgilar)\n\n\nprint(normallashtir(\"O'zbekiston, ma'no, bog'\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Oʻzbekiston, maʼno, bogʻ"
            },
            {
              "kind": "h3",
              "id": "korpusni-oqiymiz",
              "text": "Korpusni oʻqiymiz"
            },
            {
              "kind": "code",
              "code": "def oqish(fayl):\n    hujjatlar = []\n    with open(fayl, encoding=\"utf-8\") as f:\n        for qator in f:\n            hujjatlar.append(json.loads(qator))\n    return hujjatlar\n\n\nhujjatlar = oqish(\"xom_korpus.jsonl\")\n\nprint(\"hujjatlar soni:\", len(hujjatlar))\nprint(\"maydonlar:\", list(hujjatlar[0].keys()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "hujjatlar soni: 29\nmaydonlar: ['id', 'url', 'text']"
            },
            {
              "kind": "text",
              "text": "Har bir qator — `json.loads` — lugʻat — roʻyxatga. Hammasini bir koʻrib chiqamiz:"
            },
            {
              "kind": "code",
              "code": "for h in hujjatlar:\n    sozlar = len(h[\"text\"].split())\n    print(f\"{h['id']:3d} | {sozlar:3d} soʻz | {h['text'][:38]!r}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  1 |  65 soʻz | 'Metroda yangi bekat yoʻlovchilarni kut'\n  2 |  65 soʻz | \"Metroda yangi bekat yo'lovchilarni kut\"\n  3 |  63 soʻz | 'Metroda yangi bekat yo‘lovchilarni kut'\n  4 |  65 soʻz | 'Metroda yangi bekat yoʻlovchilarni kut'\n  5 |  60 soʻz | 'Poytaxtda yangi metro bekati foydalani'\n  6 |  69 soʻz | \"Metroda yangi bekat yo'lovchilarni kut\"\n  7 |  39 soʻz | 'Ertaga ob-havo qanday boʻladi\\nErtaga p'\n  8 |  43 soʻz | 'Maktablarda yangi oʻquv dasturi\\nYangi '\n  9 |  54 soʻz | 'Toshkent palovi qanday tayyorlanadi\\nPa'\n 10 |  39 soʻz | \"Navro'z bayrami\\nNavro'z bahor va yangi\"\n 11 |  37 soʻz | 'Terma jamoa navbatdagi oʻyinga tayyorl'\n 12 |  36 soʻz | 'Bug’doy hosili yig’ib olindi\\nViloyatda'\n 13 |  43 soʻz | 'Sunʼiy intellekt boʻyicha bepul kurs\\nY'\n 14 |  40 soʻz | 'Samarqandga sayohat\\nSamarqand dunyodag'\n 15 |  39 soʻz | 'Amudaryo\\nAmudaryo Oʻrta Osiyodagi eng '\n 16 |  31 soʻz | 'Paxta\\nPaxta gʻoʻza oʻsimligining tolas'\n 17 |  41 soʻz | 'Alisher Navoiy\\nAlisher Navoiy buyuk sh'\n 18 |  34 soʻz | 'Oʻzbek tili bayrami\\nHar yili 21-oktabr'\n 19 |  19 soʻz | 'Сегодня в Ташкенте открылась книжная я'\n 20 |  17 soʻz | 'Бугун пойтахтда китоб кўргазмаси очилд'\n 21 |  31 soʻz | 'Kutubxonada yangi o‚Äôquv zali ochildi'\n 22 |  12 soʻz | '������ �� ������: �������, �������� ��'\n 23 |   2 soʻz | 'Sahifa topilmadi.'\n 24 |   8 soʻz | 'Bosh sahifa | Yangiliklar | Sport | Al'\n 25 |   6 soʻz | 'Saytga xush kelibsiz!\\nBarcha huquqlar '\n 26 |  43 soʻz | 'Shaxmat turnirida yoshlar gʻalaba qozo'\n 27 |  42 soʻz | 'Ertaga ob-havo qanday boʻladi\\nErtaga p'\n 28 |  33 soʻz | 'Quyosh tizimi\\nQuyosh tizimida sakkizta'\n 29 |  43 soʻz | 'Talabalar uchun yangi mobil ilova\\nTala'"
            },
            {
              "kind": "text",
              "text": "**Toʻxtang va bu roʻyxatni oʻqing.** Tozalashdan oldin har doim xom maʼlumotga **koʻz bilan** qarang. Nimalarni koʻryapsiz?"
            },
            {
              "kind": "bullets",
              "items": [
                "1–6: metro haqidagi bitta yangilik — har xil apostrof bilan, har xil saytda.",
                "19, 20: kirill yozuvi.",
                "21: `o‚Äôquv` — 5-boʻlimdagi buzilish.",
                "22: deyarli butunlay `�`.",
                "23–25: juda qisqa sahifalar.",
                "7 va 27: bir xil boshlanadi."
              ]
            },
            {
              "kind": "text",
              "text": "Endi hammasini kod bilan topamiz. Har bir bosqichdan keyin nechta hujjat qolganini yozib boramiz:"
            },
            {
              "kind": "code",
              "code": "voronka = []\nvoronka.append((\"0. oʻqildi\", len(hujjatlar)))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "`voronka` — **(nom, son)** juftliklari roʻyxati (Dars 03 dagi kortejlar)."
            }
          ]
        },
        {
          "id": "9-1-bosqich-kodlash",
          "title": "9. 1-bosqich: kodlash",
          "blocks": [
            {
              "kind": "h3",
              "id": "belgisi",
              "text": "`�` belgisi"
            },
            {
              "kind": "text",
              "text": "Dars 11 ni eslang: `errors=\"replace\"` oʻqib boʻlmagan baytlar oʻrniga `�` qoʻyadi. Agar biror hujjat butunlay `�` boʻlsa — kimdir uni notoʻgʻri kodlash bilan oʻqigan, va asl baytlar **yoʻqolgan**. Uni tuzatib boʻlmaydi."
            },
            {
              "kind": "text",
              "text": "`�` ning raqami — `\\ufffd`. Har bir hujjatda uning ulushini sanaymiz:"
            },
            {
              "kind": "code",
              "code": "def buzuq_ulushi(matn):\n    if len(matn) == 0:\n        return 0\n    return matn.count(\"\\ufffd\") / len(matn)\n\n\nfor h in hujjatlar:\n    u = buzuq_ulushi(h[\"text\"])\n    if u > 0:\n        print(h[\"id\"], round(u, 3), repr(h[\"text\"][:30]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "22 0.835 '������ �� ������: �������, ���'"
            },
            {
              "kind": "bullets",
              "items": [
                "`.count(x)` — satrda `x` necha marta uchrashini sanaydi."
              ]
            },
            {
              "kind": "text",
              "text": "22-hujjatning **83.5%** i — `�`. Asl matn nima boʻlganini endi hech kim bilmaydi — baytlar yoʻqolgan."
            },
            {
              "kind": "h3",
              "id": "mojibake-buzilgan-lekin-tuzatsa-boladi",
              "text": "Mojibake: buzilgan, lekin tuzatsa boʻladi"
            },
            {
              "kind": "text",
              "text": "21-hujjat boshqacha. Unda `�` yoʻq — baytlar **saqlangan**, faqat notoʻgʻri oʻqilgan. Qanday notoʻgʻri? Tekshiramiz:"
            },
            {
              "kind": "code",
              "code": "belgi = \"\\u2019\"\nbaytlar = belgi.encode(\"utf-8\")\n\nprint(list(baytlar))\nprint(baytlar.decode(\"mac_latin2\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[226, 128, 153]\n‚Äô"
            },
            {
              "kind": "text",
              "text": "`’` — UTF-8 da uch bayt: 226, 128, 153. **`mac_latin2`** — eski Macintosh kompyuterlarining Markaziy Yevropa kodlashi — ularni uchta alohida harf deb\noʻqiydi: `‚`, `Ä`, `ô`."
            },
            {
              "kind": "text",
              "text": "Qaysi kodlash ekanini qanday bildim? `’` ni boshqa eski Mac kodlashi — `mac_roman` — ham xuddi shunday buzadi. Farq **yopuvchi qoʻshtirnoqda** chiqadi:"
            },
            {
              "kind": "code",
              "code": "belgi = \"\\u201d\"\n\nprint(belgi.encode(\"utf-8\").decode(\"mac_roman\"))\nprint(belgi.encode(\"utf-8\").decode(\"mac_latin2\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "‚Äù\n‚ÄĚ"
            },
            {
              "kind": "text",
              "text": "5-boʻlimdagi haqiqiy hujjatda `‚ÄĚ` bor — demak `mac_latin2`. Buzilgan matn qanday buzilganini oʻzi aytib turadi — faqat diqqat bilan qarash kerak."
            },
            {
              "kind": "text",
              "text": "Baytlar saqlangan ekan — demak **teskari yoʻl** bilan tuzatsa boʻladi:"
            },
            {
              "kind": "code",
              "code": "buzuq = \"o‚Äôquv\"\nprint(buzuq.encode(\"mac_latin2\").decode(\"utf-8\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "o’quv"
            },
            {
              "kind": "text",
              "text": "Buzilgan matnni → `mac_latin2` bilan **baytga qaytaramiz** → baytlarni **toʻgʻri** (`utf-8`) oʻqiymiz."
            },
            {
              "kind": "text",
              "text": "Lekin bu har doim ham ishlamaydi. Agar matnda `mac_latin2` bilmaydigan harf boʻlsa, `.encode` **xato** beradi. Xato butun dasturni toʻxtatadi. Bizga esa \"ishlamasa — tegma\" degan qaror kerak."
            },
            {
              "kind": "h3",
              "id": "try-except-urinib-kor-bolmasa",
              "text": "`try` / `except` — \"urinib koʻr, boʻlmasa...\""
            },
            {
              "kind": "text",
              "text": "Avval boʻsh joyda. Lugʻatda yoʻq kalitni soʻrasak:"
            },
            {
              "kind": "code",
              "code": "narxlar = {\"non\": 5000, \"choy\": 3000}\n\nprint(narxlar[\"sut\"])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "KeyError: 'sut'",
              "error": true
            },
            {
              "kind": "text",
              "text": "Endi xuddi shuni `try` ichida:"
            },
            {
              "kind": "code",
              "code": "try:\n    print(narxlar[\"sut\"])\nexcept KeyError:\n    print(\"bunday mahsulot yoʻq\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bunday mahsulot yoʻq"
            },
            {
              "kind": "bullets",
              "items": [
                "`try:` — ichkaridagi kodni **urinib koʻradi**.",
                "`except KeyError:` — agar aynan `KeyError` chiqsa, dastur toʻxtamaydi — buning oʻrniga shu qism bajariladi."
              ]
            },
            {
              "kind": "text",
              "text": "Xato boʻlmasa — `except` qismi umuman ishlamaydi:"
            },
            {
              "kind": "code",
              "code": "try:\n    print(narxlar[\"non\"])\nexcept KeyError:\n    print(\"bunday mahsulot yoʻq\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "5000"
            },
            {
              "kind": "text",
              "text": "Va bizning holat — kodlash xatosi:"
            },
            {
              "kind": "code",
              "code": "try:\n    print(bytes([202, 187]).decode(\"ascii\"))\nexcept UnicodeDecodeError:\n    print(\"ascii bu baytlarni oʻqiy olmadi\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "ascii bu baytlarni oʻqiy olmadi"
            },
            {
              "kind": "h3",
              "id": "tuzatuvchi-funksiya",
              "text": "Tuzatuvchi funksiya"
            },
            {
              "kind": "code",
              "code": "def kodlashni_tuzat(matn):\n    if \"‚Ä\" in matn:\n        try:\n            return matn.encode(\"mac_latin2\").decode(\"utf-8\")\n        except (UnicodeEncodeError, UnicodeDecodeError):\n            return matn\n    return matn\n\n\nprint(hujjatlar[20][\"text\"].split(\"\\n\")[0])\nprint(kodlashni_tuzat(hujjatlar[20][\"text\"]).split(\"\\n\")[0])\nprint(kodlashni_tuzat(\"o‚Äôquv va o\\u02bbqish\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Kutubxonada yangi o‚Äôquv zali ochildi\nKutubxonada yangi o’quv zali ochildi\no‚Äôquv va oʻqish"
            },
            {
              "kind": "text",
              "text": "Qator-qator:"
            },
            {
              "kind": "bullets",
              "items": [
                "`if \"‚Ä\" in matn:` — nima uchun aynan `‚Ä`? `‘ ’ “ ”` va tire belgilarining hammasi UTF-8 da 226, 128 bilan boshlanadi. `mac_latin2` bu ikki baytni har doim `‚Ä` deb oʻqiydi. Bu belgi boʻlmasa — tuzatadigan narsa yoʻq, matnga tegmaymiz.",
                "`except (UnicodeEncodeError, UnicodeDecodeError):` — qavs ichida **ikki** xato turi: baytga aylantirishdagi va matnga aylantirishdagi. Ikkalasida ham — `return matn`, yaʼni tegmaymiz.",
                "Uchinchi qatorga qarang: matnda `ʻ` bor, `mac_latin2` uni bilmaydi → xato → matn **oʻzgarmadi**. Dastur ham toʻxtamadi."
              ]
            },
            {
              "kind": "h3",
              "id": "bosqichni-qollaymiz",
              "text": "Bosqichni qoʻllaymiz"
            },
            {
              "kind": "code",
              "code": "qoldi = []\nfor h in hujjatlar:\n    h[\"text\"] = kodlashni_tuzat(h[\"text\"])\n    if buzuq_ulushi(h[\"text\"]) <= 0.01:\n        qoldi.append(h)\n    else:\n        print(\"olib tashlandi:\", h[\"id\"], h[\"url\"])\n\nhujjatlar = qoldi\nvoronka.append((\"1. kodlash\", len(hujjatlar)))\nprint(\"qoldi:\", len(hujjatlar))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "olib tashlandi: 22 https://sayt18.misol/pogoda\nqoldi: 28"
            },
            {
              "kind": "text",
              "text": "Nima uchun chegara `0.01` (1%), nolga emas? Haqiqiy matnlarda baʼzan bitta-ikkita buzilgan emoji yoki belgi uchraydi. Shu sababli butun hujjatni tashlash — isrof. 83.5% — esa boshqa gap."
            }
          ]
        },
        {
          "id": "10-2-bosqich-til",
          "title": "10. 2-bosqich: til",
          "blocks": [
            {
              "kind": "text",
              "text": "Oʻzbek korpuslarida rus tili koʻp aralashgan. Va oʻzbekcha kirill yozuvidagi matnlar ham bor. Bizning tokenizatorimiz — lotin uchun."
            },
            {
              "kind": "text",
              "text": "Eng oddiy usul: harflarning necha foizi **kirill**? Dars 05 ni eslang — har bir harfning raqami bor:"
            },
            {
              "kind": "code",
              "code": "for harf in [\"a\", \"z\", \"Б\", \"я\", \"ў\", \"қ\"]:\n    print(harf, ord(harf))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "a 97\nz 122\nБ 1041\nя 1103\nў 1118\nқ 1179"
            },
            {
              "kind": "text",
              "text": "Kirill harflarining hammasi **1024 dan 1279 gacha** oraliqda turadi. (Unicode ularni bitta blokka yigʻgan. Oʻzbekcha `ў` va `қ` ham shu yerda.)"
            },
            {
              "kind": "code",
              "code": "def kirill_ulushi(matn):\n    harflar = 0\n    kirill = 0\n    for belgi in matn:\n        if belgi.isalpha():\n            harflar += 1\n            if ord(belgi) >= 1024 and ord(belgi) <= 1279:\n                kirill += 1\n    if harflar == 0:\n        return 0\n    return kirill / harflar\n\n\nprint(kirill_ulushi(\"Salom dunyo\"))\nprint(kirill_ulushi(\"Салом дунё\"))\nprint(round(kirill_ulushi(\"U «Спасибо» dedi\"), 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "0.0\n1.0\n0.583"
            },
            {
              "kind": "bullets",
              "items": [
                "Faqat **harflarni** sanaymiz (`.isalpha()`, Dars 14) — boʻshliq va tinish belgilari hisobga kirmaydi.",
                "`if harflar == 0: return 0` — harfsiz matnda nolga boʻlish boʻlmasin."
              ]
            },
            {
              "kind": "text",
              "text": "Chegarani **0.3** qilamiz: harflarning 30% dan koʻpi kirill boʻlsa — tashlaymiz."
            },
            {
              "kind": "code",
              "code": "qoldi = []\nfor h in hujjatlar:\n    u = kirill_ulushi(h[\"text\"])\n    if u <= 0.3:\n        qoldi.append(h)\n    else:\n        print(\"olib tashlandi:\", h[\"id\"], round(u, 3), repr(h[\"text\"][:25]))\n    if 0 < u <= 0.3:\n        print(\"qoldi, lekin kirill bor:\", h[\"id\"], round(u, 3))\n\nhujjatlar = qoldi\nvoronka.append((\"2. til\", len(hujjatlar)))\nprint(\"qoldi:\", len(hujjatlar))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "olib tashlandi: 19 1.0 'Сегодня в Ташкенте открыл'\nolib tashlandi: 20 1.0 'Бугун пойтахтда китоб кўр'\nqoldi, lekin kirill bor: 26 0.037\nqoldi: 26"
            },
            {
              "kind": "bullets",
              "items": [
                "`0 < u <= 0.3` — \"u noldan katta **va** 0.3 dan oshmaydi\". Python ikki taqqoslashni shunday zanjir qilib yozishga ruxsat beradi."
              ]
            },
            {
              "kind": "text",
              "text": "26-hujjat — shaxmat haqidagi oʻzbekcha maqola, unda gʻolib `«Спасибо всем!»` deydi. 3.7% kirill. **Qoldi — va toʻgʻri qoldi.** Shuning uchun chegara nolga emas."
            },
            {
              "kind": "text",
              "text": "20-hujjat esa — **oʻzbekcha**, faqat kirillda. Biz uni yomon boʻlgani uchun emas, tokenizatorimiz lotin uchun boʻlgani uchun tashladik. FineWeb-2 dagi 1.36 million kirill hujjatni lotinga **oʻgirib** (transliteratsiya) ishlatish mumkin — lekin bu alohida katta ish."
            },
            {
              "kind": "h3",
              "id": "tartib-muhim-beshinchi-marta",
              "text": "Tartib muhim — beshinchi marta"
            },
            {
              "kind": "text",
              "text": "Nima uchun kodlash bosqichi **birinchi** keldi? 22-hujjatni olib, til filtridan oʻtkazib koʻramiz:"
            },
            {
              "kind": "code",
              "code": "xom = oqish(\"xom_korpus.jsonl\")\nh22 = xom[21]\n\nprint(\"kirill ulushi:\", kirill_ulushi(h22[\"text\"]))\nprint(\"soʻzlar:\", len(h22[\"text\"].split()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "kirill ulushi: 0\nsoʻzlar: 12"
            },
            {
              "kind": "text",
              "text": "22-hujjatda **bitta ham harf yoʻq** — hammasi `�`. Demak kirill ulushi — 0, va u til filtridan **oʻtib ketadi**. 12 ta \"soʻz\" — keyingi uzunlik filtridan ham."
            },
            {
              "kind": "text",
              "text": "Agar kodlash bosqichi boʻlmaganida, bu axlat korpusga kirardi va uni hech bir boshqa filtr ushlamasdi."
            }
          ]
        },
        {
          "id": "11-3-bosqich-shablon-satrlar",
          "title": "11. 3-bosqich: shablon satrlar",
          "blocks": [
            {
              "kind": "text",
              "text": "`Barcha huquqlar himoyalangan.` — bu jumla minglab saytning pastida turadi. Uni hech kim yozmagan — sayt dasturi qoʻshadi. Tokenizator uchun u **shovqin**: har bir saytda takrorlanib, lugʻatdan joy egallaydi."
            },
            {
              "kind": "text",
              "text": "Qanday topamiz? Gʻoya: **koʻp hujjatda aynan bir xil turgan satr** — shablon."
            },
            {
              "kind": "text",
              "text": "Buning uchun yangi tur kerak."
            },
            {
              "kind": "h3",
              "id": "set-toplam",
              "text": "`set` — toʻplam"
            },
            {
              "kind": "code",
              "code": "mevalar = [\"olma\", \"nok\", \"olma\", \"uzum\", \"nok\"]\ntoplam = set(mevalar)\n\nprint(len(mevalar), len(toplam))\nprint(\"olma\" in toplam, \"anor\" in toplam)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "5 3\nTrue False"
            },
            {
              "kind": "bullets",
              "items": [
                "`set(...)` — **toʻplam**. Unda har bir element **faqat bir marta** boʻladi. Beshta mevadan uchtasi qoldi.",
                "`in` — roʻyxatdagidek ishlaydi (Dars 04, 14)."
              ]
            },
            {
              "kind": "code",
              "code": "toplam.add(\"anor\")\ntoplam.add(\"olma\")\n\nprint(len(toplam))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "4"
            },
            {
              "kind": "bullets",
              "items": [
                "`.add(x)` — qoʻshadi. `olma` allaqachon bor edi — ikkinchi marta qoʻshilmadi."
              ]
            },
            {
              "kind": "text",
              "text": "Toʻplam bilan roʻyxatning yana ikki farqi:"
            },
            {
              "kind": "steps",
              "items": [
                "**Tartibi yoʻq.** `toplam[0]` deb boʻlmaydi. Uni chop etsangiz, elementlar har safar boshqa tartibda chiqishi mumkin.",
                "**`in` juda tez.** Roʻyxatda `in` har bir elementni birma-bir tekshiradi. Toʻplamda — darhol topadi. Bir million element boʻlsa — bu farq soniyalar va soatlar orasidagi farq."
              ]
            },
            {
              "kind": "text",
              "text": "Va bitta tuzoq:"
            },
            {
              "kind": "code",
              "code": "print(type(set()), type({}))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "<class 'set'> <class 'dict'>"
            },
            {
              "kind": "text",
              "text": "Boʻsh toʻplam — `set()`. `{}` esa — boʻsh **lugʻat**."
            },
            {
              "kind": "h3",
              "id": "satrlarni-sanaymiz",
              "text": "Satrlarni sanaymiz"
            },
            {
              "kind": "text",
              "text": "Har bir satr **nechta hujjatda** uchrashini sanaymiz. Bitta hujjat ichida ikki marta uchrasa — bir deb hisoblaymiz:"
            },
            {
              "kind": "code",
              "code": "def qatorlarni_sana(hujjatlar):\n    hisob = {}\n    for h in hujjatlar:\n        korilgan = set()\n        for qator in h[\"text\"].split(\"\\n\"):\n            qator = qator.strip()\n            if qator != \"\" and qator not in korilgan:\n                korilgan.add(qator)\n                hisob[qator] = hisob.get(qator, 0) + 1\n    return hisob\n\n\nhisob = qatorlarni_sana(hujjatlar)\n\nshablonlar = set()\nfor qator, son in hisob.items():\n    if son >= 3:\n        shablonlar.add(qator)\n        print(son, repr(qator))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "8 'Ulashish: Telegram | Facebook | X'\n8 'Barcha huquqlar himoyalangan.'\n4 'We use cookies to improve your experience.'\n3 'Ushbu maqolani yozishda Oʻzbekiston milliy ensiklopediyasi (2000-2005) maʼlumotlaridan foydalanilgan.'"
            },
            {
              "kind": "text",
              "text": "Qator-qator:"
            },
            {
              "kind": "bullets",
              "items": [
                "`korilgan = set()` — **har bir hujjat uchun yangi** toʻplam. Bu hujjatda koʻrilgan satrlar.",
                "`qator.strip()` — chetdagi boʻshliqlarsiz. `\"Barcha huquqlar himoyalangan. \"` va `\"Barcha huquqlar himoyalangan.\"` bir xil hisoblansin.",
                "`qator != \"\"` — 6-boʻlimdagi boʻsh satrni sanamaymiz.",
                "`qator not in korilgan` — bu hujjatda birinchi marta koʻrilsa.",
                "`hisob.get(qator, 0) + 1` — Dars 04 dagi sanash usuli.",
                "`son >= 3` — kamida **uchta** hujjatda uchragan satr — shablon."
              ]
            },
            {
              "kind": "text",
              "text": "Toʻrtta shablon topildi, hammasi — saytning \"dumi\". Metro maqolasining satrlari roʻyxatda **yoʻq**: ular koʻpi bilan ikki hujjatda aynan bir xil (qolganlarida apostrof boshqacha)."
            },
            {
              "kind": "h3",
              "id": "olib-tashlaymiz",
              "text": "Olib tashlaymiz"
            },
            {
              "kind": "code",
              "code": "def shablonni_olib_tashla(matn, shablonlar):\n    qolgan = []\n    for qator in matn.split(\"\\n\"):\n        if qator.strip() not in shablonlar:\n            qolgan.append(qator)\n    return \"\\n\".join(qolgan)\n\n\nolib_tashlangan = 0\nfor h in hujjatlar:\n    oldin = len(h[\"text\"].split(\"\\n\"))\n    h[\"text\"] = shablonni_olib_tashla(h[\"text\"], shablonlar)\n    olib_tashlangan += oldin - len(h[\"text\"].split(\"\\n\"))\n\nvoronka.append((\"3. shablon\", len(hujjatlar)))\nprint(\"olib tashlangan satrlar:\", olib_tashlangan)\nprint(\"hujjatlar:\", len(hujjatlar))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "olib tashlangan satrlar: 23\nhujjatlar: 26"
            },
            {
              "kind": "text",
              "text": "Hujjatlar soni oʻzgarmadi — biz hujjatni emas, uning **ichidagi satrlarni** olib tashladik."
            },
            {
              "kind": "note",
              "tone": "warn",
              "text": "\"3 ta hujjat\" chegarasi — bizning 29 talik korpus uchun. Haqiqiy korpusda u ancha katta boʻladi. Va bu qoidaning bitta xavfli tomoni bor — uni Mashq 3 da topasiz."
            }
          ]
        },
        {
          "id": "12-4-bosqich-uzunlik",
          "title": "12. 4-bosqich: uzunlik",
          "blocks": [
            {
              "kind": "code",
              "code": "qoldi = []\nfor h in hujjatlar:\n    sozlar = len(h[\"text\"].split())\n    if sozlar >= 12:\n        qoldi.append(h)\n    else:\n        print(\"olib tashlandi:\", h[\"id\"], sozlar, \"soʻz:\", repr(h[\"text\"]))\n\nhujjatlar = qoldi\nvoronka.append((\"4. uzunlik\", len(hujjatlar)))\nprint(\"qoldi:\", len(hujjatlar))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "olib tashlandi: 23 2 soʻz: 'Sahifa topilmadi.'\nolib tashlandi: 24 8 soʻz: 'Bosh sahifa | Yangiliklar | Sport | Aloqa'\nolib tashlandi: 25 3 soʻz: 'Saytga xush kelibsiz!'\nqoldi: 23"
            },
            {
              "kind": "text",
              "text": "`Sahifa topilmadi.`, menyu satri, salomlashuv. Bular — matn emas, sayt qoldiqlari."
            },
            {
              "kind": "text",
              "text": "25-hujjatga qarang: `Saytga xush kelibsiz!` — **3 soʻz**. Lekin xom korpusda unda 6 ta soʻz bor edi — `Barcha huquqlar himoyalangan.` bilan. Shablon bosqichi boʻlmaganida ham u 12 dan kam boʻlardi — bu safar omad kuldi. Lekin chegara 5 boʻlganida edi — shablon bosqichisiz u **oʻtib ketardi**."
            },
            {
              "kind": "text",
              "text": "Haqiqiy quvurlarda **juda uzun** hujjatlar ham tekshiriladi: masalan, bitta satrda minglab belgi boʻlsa — bu odatda matn emas, kod yoki jadval qoldigʻi. Bizning korpusda bunday hujjat yoʻq."
            }
          ]
        },
        {
          "id": "13-5-bosqich-aniq-dublikat",
          "title": "13. 5-bosqich: aniq dublikat",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi darsning asosiy savoliga yaqinlashdik. Metro maqolasi bir necha nusxada. Ularni qanday topamiz?"
            },
            {
              "kind": "text",
              "text": "Har bir hujjatni boshqa har biri bilan harfma-harf solishtirish mumkin. Lekin buning yoʻli bor — **barmoq izi**."
            },
            {
              "kind": "h3",
              "id": "hashlib-matnning-barmoq-izi",
              "text": "`hashlib` — matnning barmoq izi"
            },
            {
              "kind": "code",
              "code": "import hashlib\n\nprint(hashlib.md5(\"salom\".encode(\"utf-8\")).hexdigest())\nprint(hashlib.md5(\"salom\".encode(\"utf-8\")).hexdigest())\nprint(hashlib.md5(\"Salom\".encode(\"utf-8\")).hexdigest())",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "7650d3efe9d32071f601e9d148767d26\n7650d3efe9d32071f601e9d148767d26\n4be1041e508b1bcadd666d5170a4bfce"
            },
            {
              "kind": "bullets",
              "items": [
                "`import hashlib` — Python bilan birga keladigan kutubxona.",
                "`hashlib.md5(...)` — **MD5** algoritmi. U **baytlarni** oladi (shuning uchun `.encode`) va ulardan \"barmoq izi\" yasaydi.",
                "`.hexdigest()` — barmoq izini oʻn oltilik raqamlar matni qilib beradi."
              ]
            },
            {
              "kind": "text",
              "text": "Uchta xususiyatga qarang:"
            },
            {
              "kind": "steps",
              "items": [
                "**Bir xil matn → bir xil iz.** Har safar, har qanday kompyuterda.",
                "**Bitta harf farq → butunlay boshqa iz.** `s` → `S` — va hamma 32 belgi oʻzgardi.",
                "**Uzunligi doim bir xil:**"
              ]
            },
            {
              "kind": "code",
              "code": "uzun = \"Bu juda uzun matn. \" * 1000\n\nprint(len(uzun))\nprint(len(hashlib.md5(uzun.encode(\"utf-8\")).hexdigest()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "19000\n32"
            },
            {
              "kind": "text",
              "text": "(`\"...\" * 1000` — matnni 1000 marta takrorlaydi.)"
            },
            {
              "kind": "text",
              "text": "19 000 belgili matn ham — 32 belgi. Shuning uchun matnlarning oʻzini emas, **izlarini** toʻplamda saqlaymiz. FineWeb-2 ning oʻzbek boʻlimi uchun bu 1 233 463 × 32 = taxminan **39 MB** — 4.45 GB oʻrniga."
            },
            {
              "kind": "h3",
              "id": "birinchi-urinish",
              "text": "Birinchi urinish"
            },
            {
              "kind": "code",
              "code": "korilgan = set()\nfor h in hujjatlar:\n    iz = hashlib.md5(h[\"text\"].encode(\"utf-8\")).hexdigest()\n    if iz in korilgan:\n        print(\"dublikat:\", h[\"id\"], h[\"url\"])\n    korilgan.add(iz)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "dublikat: 4 https://sayt01.misol/yangiliklar/metro?sahifa=2\ndublikat: 27 https://sayt02.misol/ob-havo"
            },
            {
              "kind": "text",
              "text": "Ikkita topildi:"
            },
            {
              "kind": "bullets",
              "items": [
                "**4** — 1-hujjatning aynan nusxasi, faqat manzilda `?sahifa=2`.",
                "**27** — 7-hujjat bilan bir xil ob-havo xabari, boshqa saytda. Ularning dumi har xil edi (`Barcha huquqlar…` va `Ulashish…`). **Shablon bosqichi dumlarni olib tashlagani uchun** endi ular aynan bir xil. Tartib muhim — oltinchi marta."
              ]
            },
            {
              "kind": "text",
              "text": "Lekin 2 va 3 topilmadi. Nima uchun?"
            },
            {
              "kind": "code",
              "code": "for i in [0, 1, 2]:\n    print(hujjatlar[i][\"id\"], repr(hujjatlar[i][\"text\"][:28]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "1 'Metroda yangi bekat yoʻlovch'\n2 \"Metroda yangi bekat yo'lovch\"\n3 'Metroda yangi bekat yo‘lovch'"
            },
            {
              "kind": "text",
              "text": "Bir xil matn — har xil apostrof. Bitta belgi farq — butunlay boshqa iz."
            },
            {
              "kind": "h3",
              "id": "kalit-avval-normallashtir-keyin-iz-ol",
              "text": "Kalit: avval normallashtir, keyin iz ol"
            },
            {
              "kind": "code",
              "code": "def kalit(matn):\n    matn = normallashtir(matn)\n    matn = matn.lower()\n    matn = \" \".join(matn.split())\n    return hashlib.md5(matn.encode(\"utf-8\")).hexdigest()\n\n\nfor i in [0, 1, 2]:\n    print(hujjatlar[i][\"id\"], kalit(hujjatlar[i][\"text\"]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "1 9280fc033b4c03c2dbf08c6dbf3f3588\n2 9280fc033b4c03c2dbf08c6dbf3f3588\n3 9280fc033b4c03c2dbf08c6dbf3f3588"
            },
            {
              "kind": "text",
              "text": "Uchalasi — **bir xil** iz. Qator-qator:"
            },
            {
              "kind": "bullets",
              "items": [
                "`normallashtir` — Dars 14 dagi ish. `'`, `‘`, `ʻ` — hammasi bitta.",
                "`.lower()` — `Metro` va `metro` farq qilmasin.",
                "`\" \".join(matn.split())` — har qanday boʻshliqlar (ikkita boʻshliq, `\\n`, tabulyatsiya) → bitta boʻshliq."
              ]
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Muhim:** biz matnni **faqat kalit uchun** normallashtiramiz. Hujjatning oʻzida **asl** yozuv qoladi. Nima uchun — 15-boʻlimda."
            },
            {
              "kind": "h3",
              "id": "bosqichni-qollaymiz-2",
              "text": "Bosqichni qoʻllaymiz"
            },
            {
              "kind": "code",
              "code": "korilgan = set()\nqoldi = []\nfor h in hujjatlar:\n    k = kalit(h[\"text\"])\n    if k in korilgan:\n        print(\"dublikat:\", h[\"id\"], h[\"url\"])\n    else:\n        korilgan.add(k)\n        qoldi.append(h)\n\nhujjatlar = qoldi\nvoronka.append((\"5. aniq dublikat\", len(hujjatlar)))\nprint(\"qoldi:\", len(hujjatlar))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "dublikat: 2 https://sayt02.misol/news/12345\ndublikat: 3 https://sayt03.misol/2024/metro-bekat\ndublikat: 4 https://sayt01.misol/yangiliklar/metro?sahifa=2\ndublikat: 27 https://sayt02.misol/ob-havo\nqoldi: 19"
            },
            {
              "kind": "text",
              "text": "Toʻrtta dublikat — va har biri **birinchi** uchragan nusxaga qarab topildi. Qaysi nusxa qoladi? Birinchisi. FineWeb-2 ham shunday qiladi: har bir guruhdan bittasini qoldiradi va guruh hajmini `minhash_cluster_size` ga yozadi."
            },
            {
              "kind": "text",
              "text": "Nima uchun dublikatlarni bunchalik sinchiklab olib tashlayapmiz? Bitta sababini 16-boʻlimda koʻrasiz. **Ikkinchisi — muhimrogʻi** — Dars 17 da. Hozircha shunchaki qiling."
            }
          ]
        },
        {
          "id": "14-6-bosqich-qisman-dublikat",
          "title": "14. 6-bosqich: qisman dublikat",
          "blocks": [
            {
              "kind": "text",
              "text": "5-hujjatga qaraymiz:"
            },
            {
              "kind": "code",
              "code": "h1 = hujjatlar[0]\nh5 = hujjatlar[1]\n\nfor h in [h1, h5]:\n    qatorlar = h[\"text\"].split(\"\\n\")\n    print(h[\"id\"], \"|\", qatorlar[0])\n    print(\"  |\", qatorlar[1][:60], \"...\")\n    print(\"  |\", \"...\", qatorlar[1][-60:])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "1 | Metroda yangi bekat yoʻlovchilarni kutmoqda\n  | Toshkent metropolitenining halqa yoʻnalishida yangi bekat yo ...\n  | ... ovchilarga xaritani oldindan koʻrib chiqish tavsiya etiladi.\n5 | Poytaxtda yangi metro bekati foydalanishga topshirildi\n  | Shahrimizda yana bir metro bekati ochilib, yo’lovchilarni qa ...\n  | ... ovchilarga xaritani oldindan ko’rib chiqish tavsiya etiladi."
            },
            {
              "kind": "text",
              "text": "Sarlavha va birinchi jumla qayta yozilgan. Qolgani — aynan metro maqolasi, faqat apostroflari boshqa. Bu juda koʻp uchraydi: sayt maqolani oladi, boshini oʻzgartiradi, qolganini qoldiradi. Barmoq izi bu yerda ojiz — bitta harf farq qilsa ham iz boshqa."
            },
            {
              "kind": "text",
              "text": "Bizga \"**qanchalik** oʻxshash?\" degan savolga javob beradigan oʻlchov kerak."
            },
            {
              "kind": "h3",
              "id": "soz-bolaklari-n-gramma",
              "text": "Soʻz boʻlaklari (n-gramma)"
            },
            {
              "kind": "text",
              "text": "Matnni ketma-ket turgan **5 soʻzli boʻlaklarga** ajratamiz:"
            },
            {
              "kind": "code",
              "code": "sozlar = \"bekat har kuni ertalab soat beshdan ishlaydi\".split()\n\nfor i in range(len(sozlar) - 5 + 1):\n    print(\" \".join(sozlar[i:i + 5]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bekat har kuni ertalab soat\nhar kuni ertalab soat beshdan\nkuni ertalab soat beshdan ishlaydi"
            },
            {
              "kind": "text",
              "text": "7 ta soʻz → 3 ta boʻlak. Har bir boʻlak bitta soʻzga surilgan. Bunday boʻlaklar **n-gramma** deyiladi (bizda n = 5)."
            },
            {
              "kind": "text",
              "text": "Ikki matn qancha umumiy boʻlakka ega boʻlsa — shuncha oʻxshash. Bitta jumla oʻzgarsa — faqat oʻsha joydagi boʻlaklar oʻzgaradi, qolganlari bir xil qoladi."
            },
            {
              "kind": "code",
              "code": "def ngrammalar(matn, n=5):\n    sozlar = normallashtir(matn).lower().split()\n    natija = set()\n    for i in range(len(sozlar) - n + 1):\n        natija.add(\" \".join(sozlar[i:i + n]))\n    return natija\n\n\nprint(len(ngrammalar(h1[\"text\"])), len(ngrammalar(h5[\"text\"])))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "52 53"
            },
            {
              "kind": "bullets",
              "items": [
                "`n=5` — parametrning **standart qiymati**. `ngrammalar(matn)` desangiz n = 5, `ngrammalar(matn, 3)` desangiz n = 3.",
                "Natija — **toʻplam**: bir xil boʻlak ikki marta uchrasa ham, bir marta sanaladi."
              ]
            },
            {
              "kind": "h3",
              "id": "toplam-amallari-va",
              "text": "Toʻplam amallari: `&` va `|`"
            },
            {
              "kind": "text",
              "text": "Avval sonlarda:"
            },
            {
              "kind": "code",
              "code": "a = {1, 2, 3, 4}\nb = {3, 4, 5}\n\nprint(a & b)\nprint(a | b)\nprint(len(a & b) / len(a | b))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{3, 4}\n{1, 2, 3, 4, 5}\n0.4"
            },
            {
              "kind": "bullets",
              "items": [
                "`{1, 2, 3, 4}` — toʻplamni toʻgʻridan-toʻgʻri yozish (lugʻatga oʻxshaydi, lekin `:` yoʻq).",
                "`a & b` — **kesishma**: ikkalasida ham bor elementlar.",
                "`a | b` — **birlashma**: kamida bittasida bor elementlar.",
                "Umumiylar soni / hammasining soni = **0.4**."
              ]
            },
            {
              "kind": "text",
              "text": "Bu oxirgi son — **Jaccard oʻxshashligi**. 1 — toʻplamlar bir xil. 0 — umumiy element yoʻq."
            },
            {
              "kind": "code",
              "code": "def jaccard(a, b):\n    birlashma = a | b\n    if len(birlashma) == 0:\n        return 0\n    return len(a & b) / len(birlashma)\n\n\nn1 = ngrammalar(hujjatlar[0][\"text\"])\nfor h in hujjatlar[1:4]:\n    print(hujjatlar[0][\"id\"], \"va\", h[\"id\"], round(jaccard(n1, ngrammalar(h[\"text\"])), 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "1 va 5 0.641\n1 va 6 0.881\n1 va 7 0.0"
            },
            {
              "kind": "bullets",
              "items": [
                "1 va 5 — **0.641**: boshi qayta yozilgan, qolgani bir xil.",
                "1 va 6 — **0.881**: 6-hujjat — metro maqolasi + bitta qoʻshimcha jumla.",
                "1 va 7 — **0**: metro va ob-havo. Umumiy 5 soʻzli boʻlak yoʻq."
              ]
            },
            {
              "kind": "text",
              "text": "Chegarani **0.5** qilamiz: boʻlaklarning yarmidan koʻpi umumiy boʻlsa — dublikat."
            },
            {
              "kind": "h3",
              "id": "bosqichni-qollaymiz-3",
              "text": "Bosqichni qoʻllaymiz"
            },
            {
              "kind": "code",
              "code": "qoldi = []\nsolishtirish = 0\nfor h in hujjatlar:\n    a = ngrammalar(h[\"text\"])\n    oxshash = False\n    for q in qoldi:\n        solishtirish += 1\n        if jaccard(a, ngrammalar(q[\"text\"])) >= 0.5:\n            print(\"oʻxshash:\", h[\"id\"], \"~\", q[\"id\"])\n            oxshash = True\n            break\n    if not oxshash:\n        qoldi.append(h)\n\nhujjatlar = qoldi\nvoronka.append((\"6. qisman dublikat\", len(hujjatlar)))\nprint(\"solishtirishlar:\", solishtirish)\nprint(\"qoldi:\", len(hujjatlar))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "oʻxshash: 5 ~ 1\noʻxshash: 6 ~ 1\nsolishtirishlar: 138\nqoldi: 17"
            },
            {
              "kind": "bullets",
              "items": [
                "`oxshash = False` — \"hali oʻxshashi topilmadi\". `True` / `False` — Dars 14 dagi `.isalpha()` qaytaradigan qiymatlar.",
                "`break` — oʻxshashi topildimi, qolganlarini tekshirish shart emas (Dars 10).",
                "`if not oxshash:` — `not` — **teskarisi**. \"Agar oʻxshash **boʻlmasa**\"."
              ]
            },
            {
              "kind": "h3",
              "id": "muammo-juftlar-soni",
              "text": "Muammo: juftlar soni"
            },
            {
              "kind": "text",
              "text": "Har bir hujjat oʻzidan oldin qolganlarning **har biri** bilan solishtirildi. 19 ta hujjatda bu oz. FineWeb-2 ning oʻzbek boʻlimida-chi? Har bir juft:"
            },
            {
              "kind": "code",
              "code": "n = 1233463\nprint(n * (n - 1) // 2)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "760714869453"
            },
            {
              "kind": "text",
              "text": "(`//` — **butun** boʻlish: `7 // 2` → `3`.)"
            },
            {
              "kind": "text",
              "text": "**760 milliard juft.** Kompyuter soniyasiga million juft solishtirsa ham — 8.8 kun. Va har bir juft — ikki toʻplamning kesishmasi."
            },
            {
              "kind": "text",
              "text": "Shuning uchun katta korpuslarda boshqa usul ishlatiladi — **MinHash**. U har bir hujjatni hamma bilan emas, faqat oʻxshash **boʻlishi mumkin** boʻlganlar bilan solishtiradi. FineWeb-2 dagi `minhash_cluster_size` — aynan shu usulning natijasi. Bu kursda uni yozmaymiz. Muhimi — gʻoya bir xil: n-grammalar va Jaccard."
            },
            {
              "kind": "media",
              "id": "p4",
              "title": "Barmoq izi"
            }
          ]
        },
        {
          "id": "15-natija-voronka-va-saqlash",
          "title": "15. Natija: voronka va saqlash",
          "blocks": [
            {
              "kind": "code",
              "code": "for nom, son in voronka:\n    print(f\"{nom:22s} {son:3d}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "0. oʻqildi              29\n1. kodlash              28\n2. til                  26\n3. shablon              26\n4. uzunlik              23\n5. aniq dublikat        19\n6. qisman dublikat      17"
            },
            {
              "kind": "text",
              "text": "**29 → 17.** Hujjatlarning 41% i ketdi. Va bu — \"tozalangan\" internet matniga oʻxshatib yasalgan korpus."
            },
            {
              "kind": "media",
              "id": "p3",
              "title": "Voronka"
            },
            {
              "kind": "h3",
              "id": "asl-yozuv-saqlandi",
              "text": "Asl yozuv saqlandi"
            },
            {
              "kind": "code",
              "code": "for h in hujjatlar:\n    if h[\"id\"] == 10:\n        print(h[\"text\"][:40])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Navro'z bayrami\nNavro'z bahor va yangila"
            },
            {
              "kind": "text",
              "text": "`Navro'z` — oddiy `'` bilan, internetdagidek. Biz uni **normallashtirmadik**. Uchta sabab:"
            },
            {
              "kind": "steps",
              "items": [
                "**Tokenizator buni oʻzi qiladi.** Dars 14 dagi zanjir: `matn → normallashtir → regex → BPE`. Korpusni oldindan normallashtirish — ikki marta ish.",
                "**Sinov matni asl holida boʻlishi kerak.** Dars 14 dagi qoidani eslang: boshqa tokenizatorlar bilan solishtirganda hammaga asl internet matnini berish kerak. Sinov matni shu korpusdan olinadi.",
                "**Normalizator yaxshilanadi.** Ertaga qoidangizda xato topsangiz (Dars 14 da men topdim), asl matndan qaytadan boshlaysiz. Normallashtirilgan matndan — yoʻq."
              ]
            },
            {
              "kind": "h3",
              "id": "faylga-yozamiz",
              "text": "Faylga yozamiz"
            },
            {
              "kind": "code",
              "code": "with open(\"toza_korpus.jsonl\", \"w\", encoding=\"utf-8\") as f:\n    for h in hujjatlar:\n        f.write(json.dumps(h, ensure_ascii=False) + \"\\n\")\n\nprint(\"saqlandi:\", len(oqish(\"toza_korpus.jsonl\")), \"ta hujjat\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "saqlandi: 17 ta hujjat"
            },
            {
              "kind": "h3",
              "id": "hisobot",
              "text": "Hisobot"
            },
            {
              "kind": "text",
              "text": "4-boʻlimdagi qoidani eslang: **har bir manbani yozib qoʻying.** Tozalash ham — qanday qilinganini yozib qoʻyish kerak boʻlgan narsa:"
            },
            {
              "kind": "code",
              "code": "hisobot = {\n    \"manba\": \"xom_korpus.jsonl (Noldan, Dars 15)\",\n    \"sana\": \"2026-10-22\",\n    \"bosqichlar\": voronka,\n    \"chegaralar\": {\"buzuq\": 0.01, \"kirill\": 0.3, \"shablon\": 3, \"soz\": 12, \"jaccard\": 0.5},\n}\n\nwith open(\"hisobot.json\", \"w\", encoding=\"utf-8\") as f:\n    f.write(json.dumps(hisobot, ensure_ascii=False, indent=2))\n\nprint(json.dumps(hisobot[\"chegaralar\"]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{\"buzuq\": 0.01, \"kirill\": 0.3, \"shablon\": 3, \"soz\": 12, \"jaccard\": 0.5}"
            },
            {
              "kind": "bullets",
              "items": [
                "`\"sana\"` — oʻzingiz ishlagan kunni yozing.",
                "`indent=2` — JSON ni chiroyli, qatorma-qator yozadi (har bir daraja 2 boʻshliq bilan surilgan). Faylni ochib koʻring."
              ]
            },
            {
              "kind": "text",
              "text": "Olti oy oʻtib \"bu korpus qanday tozalangan edi?\" deb soʻrasangiz — javob shu faylda. Dars 17 da bu fayl nima uchun **hayotiy** ekanini koʻrasiz."
            }
          ]
        },
        {
          "id": "16-javob-iflos-korpus-tokenizatorga-nima-qiladi",
          "title": "16. Javob: iflos korpus tokenizatorga nima qiladi",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi 1-boʻlimdagi savolga qaytamiz. Ikkita tokenizator oʻqitamiz: biri **xom** korpusda, biri **toza** korpusda. Hammasi bir xil — normalizatsiya, regex, lugʻat hajmi 356 (yaʼni 100 ta birlashtirish)."
            },
            {
              "kind": "code",
              "code": "xom_hujjatlar = oqish(\"xom_korpus.jsonl\")\n\nxom_matn = \"\\n\\n\".join([h[\"text\"] for h in xom_hujjatlar])\ntoza_matn = \"\\n\\n\".join([h[\"text\"] for h in hujjatlar])\n\nprint(\"xom:\", len(xom_matn.encode(\"utf-8\")), \"bayt\")\nprint(\"toza:\", len(toza_matn.encode(\"utf-8\")), \"bayt\")\n\nm_xom, v_xom, _ = train_regex(normallashtir(xom_matn), 356, NAQSH)\nm_toza, v_toza, _ = train_regex(normallashtir(toza_matn), 356, NAQSH)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "xom: 9577 bayt\ntoza: 5000 bayt"
            },
            {
              "kind": "text",
              "text": "Xom korpusda deyarli **ikki barobar** koʻp matn. Odatda koʻp matn — yaxshi. Koʻramiz."
            },
            {
              "kind": "h3",
              "id": "tokenizator-nimani-organdi",
              "text": "Tokenizator nimani oʻrgandi?"
            },
            {
              "kind": "text",
              "text": "Dars 10 ni eslang: **eng uzun** tokenlar tokenizator nimani \"yodlaganini\" koʻrsatadi. Ularni topish uchun bitta yangi funksiya — `sorted`:"
            },
            {
              "kind": "code",
              "code": "print(sorted([3, 1, 2]))\nprint(sorted([\"ccc\", \"a\", \"bb\"], key=len, reverse=True))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[1, 2, 3]\n['ccc', 'bb', 'a']"
            },
            {
              "kind": "bullets",
              "items": [
                "`sorted(...)` — tartiblangan **yangi** roʻyxat qaytaradi.",
                "`key=len` — nimaga qarab tartiblash (Dars 08 dagi `max(..., key=...)` kabi).",
                "`reverse=True` — kattadan kichikka."
              ]
            },
            {
              "kind": "code",
              "code": "def tokenlar(vocab):\n    natija = []\n    for tid in range(256, len(vocab)):\n        natija.append(vocab[tid].decode(\"utf-8\", errors=\"replace\"))\n    return natija\n\n\nprint(\"xom: \", sorted(tokenlar(v_xom), key=len, reverse=True)[:10])\nprint(\"toza:\", sorted(tokenlar(v_toza), key=len, reverse=True)[:10])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "xom:  [' yoʻlovchilar', 'vchilar', ' bekat', 'chilar', ' yangi', ' yoʻlo', 'ladi', 'ekat', ' koʻ', '����']\ntoza: ['lanadi', ' uchun', 'chilar', ' yangi', 'moqda', 'ladi', 'nadi', ' boʻ', ' uch', 'ayyo']"
            },
            {
              "kind": "text",
              "text": "**Toʻxtang va ikkala qatorni solishtiring.**"
            },
            {
              "kind": "text",
              "text": "Xom tokenizatorning eng uzun tokeni — ` yoʻlovchilar`. Roʻyxatda yana ` bekat`, ` yoʻlo`, `ekat` bor. Bu — **metro maqolasi**. U korpusda olti nusxada edi, va tokenizator uni \"oʻzbek tilining eng muhim qismi\" deb oʻrgandi."
            },
            {
              "kind": "text",
              "text": "Toza tokenizatorda esa — `lanadi`, ` uchun`, `moqda`, `nadi`. Bular — **oʻzbek tilining qoʻshimchalari**, har qanday matnda ishlaydigan boʻlaklar."
            },
            {
              "kind": "text",
              "text": "Endi axlatni qidiramiz — `�`, kirill harflari va `|`:"
            },
            {
              "kind": "code",
              "code": "def iflos(vocab):\n    natija = []\n    for t in tokenlar(vocab):\n        if \"\\ufffd\" in t or kirill_ulushi(t) > 0 or \"|\" in t:\n            natija.append(t)\n    return natija\n\n\nprint(\"xom: \", iflos(v_xom))\nprint(\"toza:\", iflos(v_toza))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "xom:  ['�', '�', '��', ' �', 'а', '����', 'и', ' |', 'т', 'р']\ntoza: []"
            },
            {
              "kind": "text",
              "text": "100 ta birlashtirishdan **10 tasi** — sof axlatga ketgan: 22-hujjatning `�` baytlari, rus harflari va ularning yarimlari (19, 20-hujjatlar), ` |` (menyu va \"Ulashish\" satri). Toza tokenizatorda — **nol**."
            },
            {
              "kind": "h3",
              "id": "yangi-matnda-olchaymiz",
              "text": "Yangi matnda oʻlchaymiz"
            },
            {
              "kind": "text",
              "text": "Va asosiy savol — ikkala tokenizator **koʻrmagan** matnda qanday ishlaydi?"
            },
            {
              "kind": "code",
              "code": "sinovlar = [\n    \"Yangi oʻquv yilida maktablarda koʻplab oʻzgarishlar boʻladi. Oʻqituvchilar va oʻquvchilar bunga tayyorlanmoqda.\",\n    \"Viloyatda yangi kasalxona qurildi. Unda zamonaviy uskunalar bor va shifokorlar bepul maslahat beradi.\",\n    \"Ertaga shaharda katta konsert boʻlib oʻtadi. Chiptalarni internet orqali sotib olish mumkin.\",\n    \"Talabalar universitetda ingliz tili va matematika fanlarini oʻrganishmoqda.\",\n]\n\nsozlar = 0\nt_xom = 0\nt_toza = 0\nfor s in sinovlar:\n    sozlar += len(s.split())\n    t_xom += len(encode_regex(normallashtir(s), m_xom, NAQSH))\n    t_toza += len(encode_regex(normallashtir(s), m_toza, NAQSH))\n\nprint(\"soʻzlar:\", sozlar)\nprint(\"xom: \", t_xom, \"token | fertility:\", round(t_xom / sozlar, 3))\nprint(\"toza:\", t_toza, \"token | fertility:\", round(t_toza / sozlar, 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "soʻzlar: 45\nxom:  219 token | fertility: 4.867\ntoza: 204 token | fertility: 4.533"
            },
            {
              "kind": "text",
              "text": "**Toza tokenizator — 7% kamroq token.** Ikki barobar **kam** matnda oʻqitilgan boʻlsa ham."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Koʻproq matn har doim yaxshi emas. Koʻproq *iflos* matn — yomonroq tokenizator.**"
            },
            {
              "kind": "media",
              "id": "p1",
              "title": "Olti nusxa"
            },
            {
              "kind": "h3",
              "id": "halol-izoh",
              "text": "Halol izoh"
            },
            {
              "kind": "text",
              "text": "Dars 14 dagidek: bu — **kichkina** korpusdagi raqam. 29 ta hujjatda bitta maqolaning besh nusxasi — matnning katta qismi. Haqiqiy korpusda effekt kichikroq boʻladi."
            },
            {
              "kind": "text",
              "text": "Lekin yoʻnalishi oʻsha. 3-boʻlimdagi raqamlarni eslang: Common Crawl'da bitta Vikipediya maqolasi **91 nusxada** uchragan. Dublikatlar olib tashlanmasa, uning har bir soʻzi 91 barobar \"muhim\" boʻlib qoladi."
            }
          ]
        },
        {
          "id": "17-muammo",
          "title": "17. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi qoʻlingizda:"
            },
            {
              "kind": "bullets",
              "items": [
                "✓ tokenizator (Dars 06–14)",
                "✓ toza korpus va uni qanday olganingiz haqida hisobot (Dars 15)"
              ]
            },
            {
              "kind": "text",
              "text": "Lekin toza korpusimiz — 17 ta hujjat, 5 000 bayt. Haqiqiy oʻzbek boʻlimi — 4.45 GB. Bu taxminan **900 ming barobar** koʻp."
            },
            {
              "kind": "text",
              "text": "Bizning `train_regex` Dars 10 da yozilgan va har bir birlashtirishda **butun** matnni qaytadan sanaydi. 900 ming barobar koʻp matnda, 16 384 hajmli lugʻat uchun — u qancha ishlaydi? Bir soatmi? Bir yilmi?"
            },
            {
              "kind": "text",
              "text": "Va bitta savol ochiq qoldi: dublikatlarni olib tashlashning **ikkinchi** sababi. Uni men qimmat yoʻl bilan oʻrgandim. Dars 17 da aytib beraman."
            }
          ]
        },
        {
          "id": "18-toliq-kod",
          "title": "18. Toʻliq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "import json\nimport hashlib\nimport unicodedata\n\n# ---- Dars 14: normalizator ----\nOKINA = \"\\u02bb\"\nTUTUQ = \"\\u02bc\"\nAPOSTROFLAR = \"'\\u2018\\u2019`\\u02bb\\u02bc\"\n\n\ndef normallashtir(matn):\n    matn = unicodedata.normalize(\"NFC\", matn)\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n            if oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n    return \"\".join(belgilar)\n\n\n# ---- fayllar ----\ndef oqish(fayl):\n    hujjatlar = []\n    with open(fayl, encoding=\"utf-8\") as f:\n        for qator in f:\n            hujjatlar.append(json.loads(qator))\n    return hujjatlar\n\n\ndef saqlash(hujjatlar, fayl):\n    with open(fayl, \"w\", encoding=\"utf-8\") as f:\n        for h in hujjatlar:\n            f.write(json.dumps(h, ensure_ascii=False) + \"\\n\")\n\n\n# ---- tekshiruvlar ----\ndef buzuq_ulushi(matn):\n    if len(matn) == 0:\n        return 0\n    return matn.count(\"\\ufffd\") / len(matn)\n\n\ndef kodlashni_tuzat(matn):\n    if \"‚Ä\" in matn:\n        try:\n            return matn.encode(\"mac_latin2\").decode(\"utf-8\")\n        except (UnicodeEncodeError, UnicodeDecodeError):\n            return matn\n    return matn\n\n\ndef kirill_ulushi(matn):\n    harflar = 0\n    kirill = 0\n    for belgi in matn:\n        if belgi.isalpha():\n            harflar += 1\n            if ord(belgi) >= 1024 and ord(belgi) <= 1279:\n                kirill += 1\n    if harflar == 0:\n        return 0\n    return kirill / harflar\n\n\ndef qatorlarni_sana(hujjatlar):\n    hisob = {}\n    for h in hujjatlar:\n        korilgan = set()\n        for qator in h[\"text\"].split(\"\\n\"):\n            qator = qator.strip()\n            if qator != \"\" and qator not in korilgan:\n                korilgan.add(qator)\n                hisob[qator] = hisob.get(qator, 0) + 1\n    return hisob\n\n\ndef shablonni_olib_tashla(matn, shablonlar):\n    qolgan = []\n    for qator in matn.split(\"\\n\"):\n        if qator.strip() not in shablonlar:\n            qolgan.append(qator)\n    return \"\\n\".join(qolgan)\n\n\ndef kalit(matn):\n    matn = normallashtir(matn)\n    matn = matn.lower()\n    matn = \" \".join(matn.split())\n    return hashlib.md5(matn.encode(\"utf-8\")).hexdigest()\n\n\ndef ngrammalar(matn, n=5):\n    sozlar = normallashtir(matn).lower().split()\n    natija = set()\n    for i in range(len(sozlar) - n + 1):\n        natija.add(\" \".join(sozlar[i:i + n]))\n    return natija\n\n\ndef jaccard(a, b):\n    birlashma = a | b\n    if len(birlashma) == 0:\n        return 0\n    return len(a & b) / len(birlashma)\n\n\n# ---- quvur ----\ndef tozalash(hujjatlar):\n    voronka = [(\"0. oʻqildi\", len(hujjatlar))]\n\n    # 1. kodlash\n    qoldi = []\n    for h in hujjatlar:\n        h[\"text\"] = kodlashni_tuzat(h[\"text\"])\n        if buzuq_ulushi(h[\"text\"]) <= 0.01:\n            qoldi.append(h)\n    hujjatlar = qoldi\n    voronka.append((\"1. kodlash\", len(hujjatlar)))\n\n    # 2. til\n    qoldi = []\n    for h in hujjatlar:\n        if kirill_ulushi(h[\"text\"]) <= 0.3:\n            qoldi.append(h)\n    hujjatlar = qoldi\n    voronka.append((\"2. til\", len(hujjatlar)))\n\n    # 3. shablon satrlar\n    hisob = qatorlarni_sana(hujjatlar)\n    shablonlar = set()\n    for qator, son in hisob.items():\n        if son >= 3:\n            shablonlar.add(qator)\n    for h in hujjatlar:\n        h[\"text\"] = shablonni_olib_tashla(h[\"text\"], shablonlar)\n    voronka.append((\"3. shablon\", len(hujjatlar)))\n\n    # 4. uzunlik\n    qoldi = []\n    for h in hujjatlar:\n        if len(h[\"text\"].split()) >= 12:\n            qoldi.append(h)\n    hujjatlar = qoldi\n    voronka.append((\"4. uzunlik\", len(hujjatlar)))\n\n    # 5. aniq dublikat\n    korilgan = set()\n    qoldi = []\n    for h in hujjatlar:\n        k = kalit(h[\"text\"])\n        if k not in korilgan:\n            korilgan.add(k)\n            qoldi.append(h)\n    hujjatlar = qoldi\n    voronka.append((\"5. aniq dublikat\", len(hujjatlar)))\n\n    # 6. qisman dublikat\n    qoldi = []\n    for h in hujjatlar:\n        a = ngrammalar(h[\"text\"])\n        oxshash = False\n        for q in qoldi:\n            if jaccard(a, ngrammalar(q[\"text\"])) >= 0.5:\n                oxshash = True\n                break\n        if not oxshash:\n            qoldi.append(h)\n    hujjatlar = qoldi\n    voronka.append((\"6. qisman dublikat\", len(hujjatlar)))\n\n    return hujjatlar, voronka\n\n\nhujjatlar, voronka = tozalash(oqish(\"xom_korpus.jsonl\"))\nsaqlash(hujjatlar, \"toza_korpus.jsonl\")\n\nfor nom, son in voronka:\n    print(f\"{nom:22s} {son:3d}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "0. oʻqildi              29\n1. kodlash              28\n2. til                  26\n3. shablon              26\n4. uzunlik              23\n5. aniq dublikat        19\n6. qisman dublikat      17",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "19-ozingiz-yozing",
          "title": "19. Oʻzingiz yozing",
          "blocks": [
            {
              "kind": "text",
              "text": "Dublikatlarni topadigan ikki funksiyani va aniq dublikat bosqichini toʻldiring:"
            },
            {
              "kind": "code",
              "code": "def kalit(matn):\n    matn = ___(matn)\n    matn = matn.___()\n    matn = \" \".join(matn.___())\n    return hashlib.___(matn.___(\"utf-8\")).___()\n\n\ndef jaccard(a, b):\n    birlashma = a ___ b\n    if len(birlashma) == 0:\n        return 0\n    return len(a ___ b) / len(___)\n\n\nkorilgan = ___()\nqoldi = []\nfor h in hujjatlar:\n    k = kalit(h[\"text\"])\n    if k ___ korilgan:\n        korilgan.___(k)\n        qoldi.append(h)\n\n# Tekshiruv:\nprint(kalit(\"O'zbekiston\") == kalit(\"o\\u2018zbekiston\"))      # True\nprint(jaccard({1, 2, 3}, {2, 3, 4}))                         # 0.5",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni koʻrsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "def kalit(matn):\n    matn = normallashtir(matn)\n    matn = matn.lower()\n    matn = \" \".join(matn.split())\n    return hashlib.md5(matn.encode(\"utf-8\")).hexdigest()\n\n\ndef jaccard(a, b):\n    birlashma = a | b\n    if len(birlashma) == 0:\n        return 0\n    return len(a & b) / len(birlashma)\n\n\nkorilgan = set()\nqoldi = []\nfor h in hujjatlar:\n    k = kalit(h[\"text\"])\n    if k not in korilgan:\n        korilgan.add(k)\n        qoldi.append(h)\n\nprint(kalit(\"O'zbekiston\") == kalit(\"o\\u2018zbekiston\"))\nprint(jaccard({1, 2, 3}, {2, 3, 4}))",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "output",
                  "text": "True\n0.5"
                },
                {
                  "kind": "text",
                  "text": "Eng koʻp qilinadigan xatolar:"
                },
                {
                  "kind": "steps",
                  "items": [
                    "`korilgan = {}` — bu boʻsh **lugʻat**, toʻplam emas. `.add` ishlamaydi: `AttributeError: 'dict' object has no attribute 'add'`.",
                    "`.encode(\"utf-8\")` ni unutish — `md5` matnni emas, **baytni** oladi: `TypeError: Strings must be encoded before hashing`.",
                    "`&` va `|` ni almashtirish — natija 1 dan katta chiqadi. Jaccard **hech qachon** 1 dan oshmaydi — buni tekshiruv sifatida ishlating."
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "20-mashqlar",
          "title": "20. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Ishga tushirmasdan ayting: bu uchta matndan qaysilarining `kalit` i bir xil?"
                },
                {
                  "kind": "pre",
                  "text": "\"Oʻzbekiston  poytaxti\"      \"o'zbekiston poytaxti\"      \"Ozbekiston poytaxti\""
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "for t in [\"O\\u02bbzbekiston  poytaxti\", \"o'zbekiston poytaxti\", \"Ozbekiston poytaxti\"]:\n    print(f\"{t!r:25s} {kalit(t)}\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "'Oʻzbekiston  poytaxti'   f9e927a7c2dec78732b00a2bef80d7c7\n\"o'zbekiston poytaxti\"    f9e927a7c2dec78732b00a2bef80d7c7\n'Ozbekiston poytaxti'     09d16f404022255d41a9431f18083583"
                  },
                  {
                    "kind": "text",
                    "text": "**Birinchi ikkitasi** bir xil: katta harf → `.lower()`, ikkita boʻshliq → `\" \".join(...split())`, `'` → `normallashtir`."
                  },
                  {
                    "kind": "text",
                    "text": "Uchinchisi — boshqa. Unda apostrof umuman **yoʻq**. Normalizator notoʻgʻri belgini toʻgʻrisiga almashtira oladi, lekin yoʻq belgini **qoʻsha olmaydi** — `Ozbekiston` dagi `O` dan keyin `ʻ` boʻlishi kerakligini bilish uchun soʻzni bilish kerak."
                  },
                  {
                    "kind": "text",
                    "text": "Agar sizning korpusingizda bitta maqola `Oʻzbekiston` bilan ham, `Ozbekiston` bilan ham uchrasa — aniq dublikat bosqichi uni oʻtkazib yuboradi. Uni 6-bosqich (Jaccard) ushlaydi — chunki qolgan soʻzlar bir xil."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bizning til filtrimiz faqat **kirillni** sanaydi. TED hujjatidagi inglizcha matn undan oʻtadimi? Tekshiring. Keyin uni ushlaydigan oddiy usul oʻylab toping."
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "inglizcha = (\"Click on any phrase to play the video at that point. As the leader of the Imaging Team \"\n             \"on the Cassini mission to Saturn, Carolyn Porco interprets and shares the pictures.\")\n\nprint(kirill_ulushi(inglizcha), len(inglizcha.split()))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "0.0 31"
                  },
                  {
                    "kind": "text",
                    "text": "Kirill — 0, soʻzlar — 12 dan koʻp. **Ikkala filtrdan ham oʻtadi.**"
                  },
                  {
                    "kind": "text",
                    "text": "Oddiy usul: oʻzbek tilida **juda koʻp uchraydigan** qisqa soʻzlarni sanash. Har qanday oʻzbekcha matnda `va`, `bu`, `bilan`, `uchun` boʻladi. Inglizchada — yoʻq:"
                  },
                  {
                    "kind": "code",
                    "code": "YORDAMCHI = {\"va\", \"bu\", \"bilan\", \"uchun\", \"ham\", \"bir\", \"har\", \"deb\", \"esa\", \"eng\"}\n\n\ndef ozbekcha_ulushi(matn):\n    sozlar = re.findall(r\"\\w+\", normallashtir(matn).lower())\n    if len(sozlar) == 0:\n        return 0\n    topildi = 0\n    for s in sozlar:\n        if s in YORDAMCHI:\n            topildi += 1\n    return topildi / len(sozlar)\n\n\nprint(\"inglizcha:\", ozbekcha_ulushi(inglizcha))\nfor h in hujjatlar:\n    u = ozbekcha_ulushi(h[\"text\"])\n    if u == 0:\n        print(\"diqqat:\", h[\"id\"], repr(h[\"text\"][:40]))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "inglizcha: 0.0\ndiqqat: 7 'Ertaga ob-havo qanday boʻladi\\nErtaga poy'\ndiqqat: 11 'Terma jamoa navbatdagi oʻyinga tayyorlan'"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`re.findall(r\"\\w+\", ...)` — Dars 13 dagi regex: faqat soʻzlar, tinish belgilarisiz. `kerak.` emas, `kerak`."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Inglizcha — 0. Lekin qarang: **7 va 11-hujjatlar ham 0**. Bular — oʻzbekcha ob-havo xabari va futbol yangiligi: \"Ertaga poytaxtda havo bulutli boʻladi…\", \"Bosh murabbiy yigʻinga yigirma uch nafar futbolchini chaqirdi…\". Ularda roʻyxatdagi soʻzlarning birortasi ham yoʻq. Agar chegarani `> 0` qilsak — ikkita toza oʻzbekcha hujjatni tashlaymiz."
                  },
                  {
                    "kind": "text",
                    "text": "Mana shuning uchun haqiqiy quvurlar oʻqitilgan **til aniqlovchi modellar**dan foydalanadi (FineWeb-2 — `GlotLID`). Lekin ular ham mukammal emas: 5-boʻlimdagi TED hujjati `language_score = 1.000` olgan — chunki baho **butun hujjat** uchun beriladi, oxiridagi inglizcha qism esa kichkina."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 14 dagi xulosa bu yerda ham ishlaydi: **har bir filtr qayerdadir xato qiladi. Muhimi — qayerda ekanini bilish.**"
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Shablon qoidasi: \"kamida 3 ta hujjatda uchragan satr\". Faraz qiling, bitta maqola **uchta** saytda aynan bir xil chop etilgan. Shablon va uzunlik bosqichlaridan keyin nima qoladi? Tekshiring va qoidani tuzating."
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "maqola = (\"Yangi kutubxona ochildi\\n\"\n          \"Shahar markazida uch qavatli yangi kutubxona ochildi, unda oʻn ming kitob va katta oʻquv zali bor.\")\n\nsinov = []\nfor i in range(3):\n    sinov.append({\"id\": 100 + i, \"text\": maqola})\n\nhisob = qatorlarni_sana(sinov)\nsh = set()\nfor qator, son in hisob.items():\n    if son >= 3:\n        sh.add(qator)\n\nfor h in sinov:\n    h[\"text\"] = shablonni_olib_tashla(h[\"text\"], sh)\n    print(h[\"id\"], repr(h[\"text\"]), len(h[\"text\"].split()), \"soʻz\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "100 '' 0 soʻz\n101 '' 0 soʻz\n102 '' 0 soʻz"
                  },
                  {
                    "kind": "text",
                    "text": "**Maqola butunlay yoʻqoldi.** Uning har bir satri uch hujjatda uchragani uchun \"shablon\" deb topildi va oʻchirildi. Keyin boʻsh hujjatlarni uzunlik bosqichi tashlaydi. Dublikat bosqichi bittasini qoldirishi kerak edi — lekin unga hech narsa yetib kelmadi."
                  },
                  {
                    "kind": "text",
                    "text": "**Tuzatish:** shablon satrlar odatda **qisqa** boʻladi. Maqola jumlalari — uzun. Ikkinchi shart qoʻshamiz:"
                  },
                  {
                    "kind": "code",
                    "code": "def shablonlarni_top(hujjatlar):\n    hisob = qatorlarni_sana(hujjatlar)\n    natija = set()\n    for qator, son in hisob.items():\n        if son >= 3 and len(qator.split()) <= 10:\n            natija.add(qator)\n    return natija\n\n\nsinov = []\nfor i in range(3):\n    sinov.append({\"id\": 100 + i, \"text\": maqola})\n\nsh = shablonlarni_top(sinov)\nfor h in sinov:\n    h[\"text\"] = shablonni_olib_tashla(h[\"text\"], sh)\n    print(h[\"id\"], len(h[\"text\"].split()), \"soʻz\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "100 16 soʻz\n101 16 soʻz\n102 16 soʻz"
                  },
                  {
                    "kind": "text",
                    "text": "Endi asosiy jumla qoldi — va dublikat bosqichi bittasini saqlab qoladi."
                  },
                  {
                    "kind": "text",
                    "text": "Lekin diqqat: **sarlavha** (`Yangi kutubxona ochildi`, 3 soʻz) baribir oʻchdi — u qisqa va uch marta uchragan. Qoida uni shablondan ajrata olmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Bizning toʻrtta haqiqiy shablonimiz-chi? Ular 3, 6, 7 va 9 soʻzli — chegara 10 boʻlgani uchun hammasi topiladi. Tekshiramiz:"
                  },
                  {
                    "kind": "code",
                    "code": "print(len(shablonlarni_top(oqish(\"xom_korpus.jsonl\"))))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "4"
                  },
                  {
                    "kind": "text",
                    "text": "Agar chegarani 8 qilganimizda, ensiklopediya satri (9 soʻz) topilmay qolardi. Chegarani tanlashdan oldin — haqiqiy shablonlaringizning uzunligiga qarang."
                  },
                  {
                    "kind": "text",
                    "text": "Bu ham — **tartib** muammosi. Shablon bosqichi dublikat bosqichidan oldin turibdi, shuning uchun dublikatlar shablon boʻlib koʻrinadi. Agar tartibni almashtirsak — 13-boʻlimdagi 27-hujjat aniq dublikat bosqichida ushlanmaydi (dumlari har xil); uni faqat qimmatroq 6-bosqich ushlaydi. Mukammal tartib yoʻq — har bir tartibning oʻz narxi bor."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Toza korpusni `ensure_ascii` siz saqlang (`json.dumps(h)`). Fayl hajmi qanday oʻzgaradi? Oʻqib olingan hujjatlar bir xilmi?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "with open(\"ascii_korpus.jsonl\", \"w\", encoding=\"utf-8\") as f:\n    for h in hujjatlar:\n        f.write(json.dumps(h) + \"\\n\")\n\nwith open(\"toza_korpus.jsonl\", encoding=\"utf-8\") as f:\n    a = f.read()\nwith open(\"ascii_korpus.jsonl\", encoding=\"utf-8\") as f:\n    b = f.read()\n\nprint(\"ensure_ascii=False:\", len(a.encode(\"utf-8\")), \"bayt\")\nprint(\"standart:          \", len(b.encode(\"utf-8\")), \"bayt\")\nprint(\"hujjatlar bir xilmi:\", oqish(\"ascii_korpus.jsonl\") == oqish(\"toza_korpus.jsonl\"))\nprint(b[60:120])",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "ensure_ascii=False: 6122 bayt\nstandart:           6540 bayt\nhujjatlar bir xilmi: True\ntext\": \"Metroda yangi bekat yo\\u02bblovchilarni kutmoqda\\nTo"
                  },
                  {
                    "kind": "text",
                    "text": "Fayl **7% kattaroq**: har bir `ʻ` (2 bayt) endi `\\u02bb` (6 bayt). Bizning korpusda ascii boʻlmagan belgilar kam. Kirill yoki arab yozuvidagi matnda esa har bir harf shunday boʻladi — fayl bir necha barobar oʻsadi."
                  },
                  {
                    "kind": "text",
                    "text": "Hujjatlar esa **aynan bir xil** qaytadi — `json.loads` `\\u02bb` ni yana `ʻ` ga aylantiradi. Demak bu xato emas — lekin faylni koʻz bilan oʻqib boʻlmaydi (oxirgi qatorga qarang). 8-boʻlimda biz korpusni **koʻz bilan** tekshirdik. Bunday faylda buni qila olmaysiz."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Bizning `kodlashni_tuzat` oʻquv korpusidagi 21-hujjatni tuzatdi. Endi uni 5-boʻlimdagi **haqiqiy** FineWeb-2 hujjatining parchasida sinang:"
                },
                {
                  "kind": "code",
                  "code": "haqiqiy = (\"maqsadi ko’zlangan. Ushbu ma‚Äôruza muallif tomonidan 2009 yilda Samarqand \"\n           \"Davlat universitetida o‚Äôtkazilgan ‚ÄĚSinguilarity Theory\")",
                  "lang": "python",
                  "mode": "type"
                },
                {
                  "kind": "text",
                  "text": "Ishladimi? Nima uchun? Tuzating."
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "haqiqiy = (\"maqsadi ko’zlangan. Ushbu ma‚Äôruza muallif tomonidan 2009 yilda Samarqand \"\n           \"Davlat universitetida o‚Äôtkazilgan ‚ÄĚSinguilarity Theory\")\n\nprint(kodlashni_tuzat(haqiqiy) == haqiqiy)\n\ntry:\n    haqiqiy.encode(\"mac_latin2\").decode(\"utf-8\")\nexcept UnicodeDecodeError as xato:\n    print(xato)",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "True\n'utf-8' codec can't decode byte 0xd5 in position 10: invalid continuation byte"
                  },
                  {
                    "kind": "text",
                    "text": "**Ishlamadi** — matn oʻzgarmadi."
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`except UnicodeDecodeError as xato:` — `as xato` xatoning oʻzini oʻzgaruvchiga saqlaydi. Uni chop etib, xabarini oʻqish mumkin."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Xabarni oʻqiymiz: `0xd5` baytini oʻqiy olmadi, **10-oʻrinda**. 10-oʻrinda — `ko’zlangan` dagi `’`. Bu belgi **buzilmagan**! Bu hujjatning bir qismi toʻgʻri, bir qismi buzuq. Butun matnni `mac_latin2` orqali qaytarganimizda toʻgʻri `’` ham \"qaytarildi\" — va `0xd5` baytiga aylandi, u esa UTF-8 da maʼnosiz. `try` bizni qutqardi — dastur toʻxtamadi — lekin hech narsa tuzatilmadi."
                  },
                  {
                    "kind": "text",
                    "text": "**Tuzatish:** butun matnni emas, faqat **buzilgan boʻlaklarni** almashtiramiz. Har bir tirnoq belgisining buzilgan shaklini oʻzimiz yasaymiz:"
                  },
                  {
                    "kind": "code",
                    "code": "def kodlashni_tuzat2(matn):\n    for belgi in [\"\\u2018\", \"\\u2019\", \"\\u201c\", \"\\u201d\", \"\\u2013\", \"\\u2014\"]:\n        buzuq = belgi.encode(\"utf-8\").decode(\"mac_latin2\")\n        matn = matn.replace(buzuq, belgi)\n    return matn\n\n\ntuzatildi = kodlashni_tuzat2(haqiqiy)\nprint(tuzatildi)\nprint(normallashtir(tuzatildi))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "maqsadi ko’zlangan. Ushbu ma’ruza muallif tomonidan 2009 yilda Samarqand Davlat universitetida o’tkazilgan ”Singuilarity Theory\nmaqsadi koʻzlangan. Ushbu maʼruza muallif tomonidan 2009 yilda Samarqand Davlat universitetida oʻtkazilgan ”Singuilarity Theory"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "Roʻyxatda oltita belgi: `‘ ’ “ ”` va ikki xil tire (`–`, `—`).",
                      "`belgi.encode(\"utf-8\").decode(\"mac_latin2\")` — 9-boʻlimdagi buzilishni **ataylab** takrorlaymiz: `’` → `‚Äô`. Endi nimani qidirishni aniq bilamiz.",
                      "`.replace(buzuq, belgi)` — Dars 02. Faqat buzilgan joylar oʻzgaradi. Toʻgʻri `’` ga tegilmaydi."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Ikkinchi qatorda Dars 14 normalizatori ishini tugatdi: `maʼruza`, `oʻtkazilgan`, `koʻzlangan`."
                  },
                  {
                    "kind": "text",
                    "text": "**Bu mashqning asosiy saboqi:** oʻquv korpusimiz haqiqatdan **osonroq** edi. Unda 21-hujjat butunlay buzilgan edi. Haqiqiy internetda esa bitta hujjat ichida toʻgʻri va buzuq aralash keladi. Toʻliq koddagi `kodlashni_tuzat` ni shu funksiya bilan almashtiring — u ikkala holatda ham ishlaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Va har doim: **filtringizni oʻzingiz yasagan misolda emas, haqiqiy maʼlumotda sinang.**"
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "21-xulosa",
          "title": "21. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "Oʻzbek matni asosan **Common Crawl** dan keladi. FineWeb-2: lotinda 1.23 mln hujjat, 687 mln soʻz. Kirillda — **koʻproq** hujjat. Rus tilida — 857 marta koʻp soʻz.",
                "Har bir manba uchun uchta savol: **oʻqitish**, **tarqatish**, **shart**. Toʻplamning litsenziyasi — matn egasining ruxsati emas.",
                "\"Tozalangan\" korpus — toza korpus emas. Avval **koʻz bilan** qarang.",
                "Fayllar: `with open(..., encoding=\"utf-8\")`. Notoʻgʻri kodlash — **mojibake**: baytlar toʻgʻri, oʻqish usuli notoʻgʻri.",
                "**JSONL** — har qatorda bitta hujjat. `ensure_ascii=False`.",
                "`try` / `except` — \"urinib koʻr, boʻlmasa tegma\".",
                "**Olti bosqich:** kodlash → til → shablon → uzunlik → aniq dublikat → qisman dublikat. Bizda: **29 → 17**.",
                "Tartib muhim: kodlashsiz `�` hujjat til filtridan oʻtadi; shablonsiz 27-hujjat dublikat sifatida ushlanmaydi.",
                "`set` — takrorsiz, tez `in`. `hashlib.md5` — barmoq izi. `&`, `|` — Jaccard. Juftlarni solishtirish katta korpusda imkonsiz — **MinHash**.",
                "Korpusni **asl yozuvda** saqlang, normallashtirish — faqat kalit uchun. Va **hisobot** yozing.",
                "Iflos korpus: metro maqolasi va axlat lugʻatni egalladi; toza korpusda — 7% kamroq token, ikki barobar kam matn bilan."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "**Dars 16 — Haqiqiy matnda trening.** 5 000 bayt emas — millionlab. Bizning `train_regex` bunga chidaydimi? Uni qanday tezlashtirish mumkin? Va birinchi marta **16 384** hajmli lugʻat bilan tokenizator oʻqitib, `fertility` ni oʻlchaymiz."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *`train_regex` ning har bir qadamida qaysi ish **behuda** takrorlanadi?*"
            }
          ]
        },
        {
          "id": "ilova-a-oquv-korpusini-yaratadigan-kod",
          "title": "Ilova A — oʻquv korpusini yaratadigan kod",
          "blocks": [
            {
              "kind": "text",
              "text": "Buni Colab daftarining **birinchi katagida** ishga tushiring. U `xom_korpus.jsonl` faylini yaratadi. Matnlar kurs uchun yozilgan; ulardagi muammolar — internet matnidagi (va FineWeb-2 ning oʻzidagi) haqiqiy muammolarning nusxasi. Kod alohida fayl sifatida ham bor: [korpus_yasash.py](/data/korpus_yasash.py)."
            },
            {
              "kind": "reveal",
              "summary": "Korpusni yaratadigan kod (ochib, nusxa qiling)",
              "blocks": [
                {
                  "kind": "code",
                  "code": "# Dars 15 uchun oʻquv korpusi.\n# Bu matnlar oʻquv uchun toʻqilgan. Ulardagi muammolar esa haqiqiy:\n# internet matnida (va FineWeb-2 ning oʻzida) uchraydigan narsalar.\nimport json\n\nULASHISH = \"Ulashish: Telegram | Facebook | X\"\nHUQUQ = \"Barcha huquqlar himoyalangan.\"\nCOOKIE = \"We use cookies to improve your experience.\"\nENSIKLOPEDIYA = \"Ushbu maqolani yozishda Oʻzbekiston milliy ensiklopediyasi (2000-2005) maʼlumotlaridan foydalanilgan.\"\n\n# --- bitta yangilik, bir necha saytda ---\nMETRO_SARLAVHA = \"Metroda yangi bekat yoʻlovchilarni kutmoqda\"\nMETRO = (\"Toshkent metropolitenining halqa yoʻnalishida yangi bekat yoʻlovchilarni qabul qila boshladi. \"\n         \"Bekat zamonaviy uslubda qurilgan, unda lift va eskalatorlar bor. \"\n         \"Metropoliten maʼlumotiga koʻra, bekat har kuni ertalab soat beshdan tungi yarim birgacha ishlaydi. \"\n         \"Yoʻl haqi oʻzgarmadi. \"\n         \"Yangi bekat yonidagi avtobus bekatlari ham koʻchiriladi, shuning uchun yoʻlovchilarga xaritani oldindan koʻrib chiqish tavsiya etiladi.\")\n\ndef belgi_bilan(matn, okina, tutuq):\n    return matn.replace(\"ʻ\", okina).replace(\"ʼ\", tutuq)\n\nob_havo = (\"Ertaga ob-havo qanday boʻladi\\n\"\n           \"Ertaga poytaxtda havo bulutli boʻladi, kunduzi yengil yomgʻir yogʻishi kutilmoqda. \"\n           \"Havo harorati kunduzi 18-20 daraja, kechasi 9-11 daraja iliq boʻladi. \"\n           \"Shamol shimoli-gʻarbdan sekundiga 5-8 metr tezlikda esadi. \"\n           \"Mutaxassislar haydovchilarni ehtiyot boʻlishga chaqirmoqda.\")\n\nkutubxona = (\"Kutubxonada yangi o’quv zali ochildi\\n\"\n             \"Zalda o’n beshta kompyuter va tez internet bor. \"\n             \"O’quvchilar u yerda bepul dars tayyorlashlari mumkin. \"\n             \"Kutubxona har kuni soat to’qqizdan oltigacha ishlaydi, dam olish kuni yakshanba.\")\n\nhujjatlar = [\n    (\"sayt01.misol/yangiliklar/metro\", METRO_SARLAVHA + \"\\n\" + METRO + \"\\n\" + ULASHISH + \"\\n\" + HUQUQ),\n    (\"sayt02.misol/news/12345\", belgi_bilan(METRO_SARLAVHA + \"\\n\" + METRO, \"'\", \"'\") + \"\\n\" + ULASHISH + \"\\n\" + HUQUQ),\n    (\"sayt03.misol/2024/metro-bekat\", belgi_bilan(METRO_SARLAVHA + \"\\n\" + METRO, \"‘\", \"’\") + \"\\n\" + COOKIE),\n    (\"sayt01.misol/yangiliklar/metro?sahifa=2\", METRO_SARLAVHA + \"\\n\" + METRO + \"\\n\" + ULASHISH + \"\\n\" + HUQUQ),\n    (\"sayt05.misol/shahar/metro\",\n     belgi_bilan(\"Poytaxtda yangi metro bekati foydalanishga topshirildi\\n\"\n                 \"Shahrimizda yana bir metro bekati ochilib, yoʻlovchilarni qabul qila boshladi. \"\n                 + METRO.split(\". \", 1)[1], \"’\", \"’\") + \"\\n\" + HUQUQ),\n    (\"sayt06.misol/uz/metro\",\n     belgi_bilan(METRO_SARLAVHA + \"\\n\" + METRO\n                 + \" Bekat ochilishida shahar hokimligi vakillari ishtirok etdi.\", \"'\", \"'\") + \"\\n\" + ULASHISH),\n\n    (\"sayt01.misol/ob-havo\", ob_havo + \"\\n\" + HUQUQ),\n    (\"sayt07.misol/maktab\",\n     \"Maktablarda yangi oʻquv dasturi\\n\"\n     \"Yangi oʻquv yilidan boshlab boshlangʻich sinflarda dasturlash asoslari oʻqitiladi. \"\n     \"Darslar haftada bir marta oʻtadi va oʻyin shaklida tashkil etiladi. \"\n     \"Oʻqituvchilar yozgi taʼtil davomida maxsus kurslarda malaka oshirdi. \"\n     \"Ota-onalar bu yangilikni ijobiy kutib olishmoqda.\\n\" + ULASHISH),\n    (\"sayt08.misol/taomlar/palov\",\n     \"Toshkent palovi qanday tayyorlanadi\\n\"\n     \"Palov uchun guruch, goʻsht, sabzi, piyoz va oʻsimlik yogʻi kerak boʻladi. \"\n     \"Avval qozonda yogʻ yaxshilab qizdiriladi, keyin piyoz va goʻsht qovuriladi. \"\n     \"Sabzi somoncha shaklida toʻgʻraladi va goʻshtga qoʻshiladi. \"\n     \"Zirvak tayyor boʻlgach, yuvilgan guruch tekis solinadi va ustidan suv quyiladi. \"\n     \"Palov past olovda damlanadi.\\n\" + COOKIE),\n    (\"sayt09.misol/bayram/navruz\",\n     \"Navro'z bayrami\\n\"\n     \"Navro'z bahor va yangilanish bayrami. U har yili 21-mart kuni keng nishonlanadi. \"\n     \"Bayram kunlari sumalak pishiriladi, mahallalarda sayillar o'tkaziladi. \"\n     \"Odamlar bir-birini tabriklab, qarindoshlarnikiga boradi. \"\n     \"Navro'z O'zbekistonda eng sevimli bayramlardan biri hisoblanadi.\\n\" + ULASHISH),\n    (\"sayt10.misol/sport/futbol\",\n     \"Terma jamoa navbatdagi oʻyinga tayyorlanmoqda\\n\"\n     \"Milliy terma jamoa saralash bosqichining navbatdagi uchrashuviga tayyorgarlik koʻrmoqda. \"\n     \"Bosh murabbiy yigʻinga yigirma uch nafar futbolchini chaqirdi. \"\n     \"Jamoa mashgʻulotlarni poytaxtdagi markaziy stadionda oʻtkazmoqda. \"\n     \"Uchrashuv shanba kuni kechqurun boʻlib oʻtadi.\\n\" + HUQUQ),\n    (\"sayt11.misol/qishloq/bugdoy\",\n     \"Bug’doy hosili yig’ib olindi\\n\"\n     \"Viloyatda bug’doy o’rimi yakunlandi. \"\n     \"Fermerlar bu yil har gektardan o’rtacha oltmish sentnerdan hosil olishdi. \"\n     \"Hosilni tez yig’ib olish uchun qo’shimcha kombaynlar jalb qilindi. \"\n     \"Mutaxassislarning fikricha, yaxshi hosilga o’z vaqtida sug’orish sabab bo’lgan.\"),\n    (\"sayt12.misol/talim/ai-kurs\",\n     \"Sunʼiy intellekt boʻyicha bepul kurs\\n\"\n     \"Yoshlar uchun sunʼiy intellekt asoslari boʻyicha bepul onlayn kurs boshlandi. \"\n     \"Kursda Python tili, maʼlumotlar bilan ishlash va oddiy modellar qurish oʻrgatiladi. \"\n     \"Darslar oʻzbek tilida olib boriladi. \"\n     \"Kursni muvaffaqiyatli tugatganlar sertifikat oladi.\\n\" + COOKIE),\n    (\"sayt13.misol/sayohat/samarqand\",\n     \"Samarqandga sayohat\\n\"\n     \"Samarqand dunyodagi eng qadimiy shaharlardan biri. \"\n     \"Registon maydoni, Go`ri Amir maqbarasi va Shohi Zinda majmuasi sayyohlarni o`ziga tortadi. \"\n     \"Bahor va kuz oylari sayohat uchun eng qulay vaqt hisoblanadi. \"\n     \"Shaharga Toshkentdan tezyurar poyezdda taxminan ikki soatda yetib borish mumkin.\"),\n    (\"ensiklopediya.misol/amudaryo\",\n     \"Amudaryo\\n\"\n     \"Amudaryo Oʻrta Osiyodagi eng yirik daryolardan biri. \"\n     \"U Pomir togʻlaridan boshlanadi va Orol dengizi tomon oqadi. \"\n     \"Daryo suvi qadimdan dehqonchilikda sugʻorish uchun ishlatiladi. \"\n     \"Amudaryo boʻyida koʻplab qadimiy shaharlar joylashgan.\\n\" + ENSIKLOPEDIYA),\n    (\"ensiklopediya.misol/paxta\",\n     \"Paxta\\n\"\n     \"Paxta gʻoʻza oʻsimligining tolasi. \"\n     \"Undan ip, gazlama va kiyim tayyorlanadi. \"\n     \"Paxta chigitidan esa yogʻ olinadi. \"\n     \"Oʻzbekistonda paxta yetishtirish uzoq tarixga ega.\\n\" + ENSIKLOPEDIYA),\n    (\"ensiklopediya.misol/navoiy\",\n     \"Alisher Navoiy\\n\"\n     \"Alisher Navoiy buyuk shoir va mutafakkir. \"\n     \"U 1441-yilda Hirotda tugʻilgan. \"\n     \"Navoiy turkiy tilda yozilgan koʻplab asarlar muallifi, uning eng mashhur asari «Xamsa» hisoblanadi. \"\n     \"Uning tavallud kuni har yili 9-fevralda nishonlanadi.\\n\" + ENSIKLOPEDIYA),\n    (\"sayt14.misol/til-bayrami\",\n     \"Oʻzbek tili bayrami\\n\"\n     \"Har yili 21-oktabr Oʻzbek tili bayrami kuni sifatida nishonlanadi. \"\n     \"Bu kunda maktab va universitetlarda turli tadbirlar oʻtkaziladi. \"\n     \"Yoshlar oʻzbek tilida yozilgan sheʼrlarni yoddan aytishadi. \"\n     \"Tilni asrash va rivojlantirish har birimizning burchimizdir.\"),\n    (\"sayt15.misol/ru/kniga\",\n     \"Сегодня в Ташкенте открылась \"\n     \"книжная ярмарка. \"\n     \"В ней участвуют более ста \"\n     \"издательств. \"\n     \"Посетители могут прийти \"\n     \"бесплатно до конца недели.\"),\n    (\"sayt16.misol/kitob\",\n     \"Бугун пойтахтда китоб \"\n     \"кўргазмаси очилди. \"\n     \"Кўргазмада юздан ортиқ \"\n     \"нашриёт иштирок этмоқда. \"\n     \"Ташриф буюрувчилар \"\n     \"кўргазмани бепул кўришлари \"\n     \"мумкин.\"),\n    (\"sayt17.misol/kutubxona\", kutubxona.encode(\"utf-8\").decode(\"mac_latin2\")),\n    (\"sayt18.misol/pogoda\",\n     \"Погода на завтра: \"\n     \"облачно, возможен \"\n     \"небольшой дождь, \"\n     \"температура днём \"\n     \"до двадцати градусов.\"\n     .encode(\"cp1251\").decode(\"utf-8\", errors=\"replace\")),\n    (\"sayt19.misol/404\", \"Sahifa topilmadi.\"),\n    (\"sayt20.misol/\", \"Bosh sahifa | Yangiliklar | Sport | Aloqa\"),\n    (\"sayt21.misol/\", \"Saytga xush kelibsiz!\\n\" + HUQUQ),\n    (\"sayt22.misol/sport/shaxmat\",\n     \"Shaxmat turnirida yoshlar gʻalaba qozondi\\n\"\n     \"Toshkentda boʻlib oʻtgan shaxmat turnirida yosh oʻyinchilar yaxshi natija koʻrsatdi. \"\n     \"Gʻolib turnirdan soʻng jurnalistlarga «Спасибо всем!» \"\n     \"deb rus tilida ham minnatdorlik bildirdi. \"\n     \"Keyingi turnir yoz oylarida oʻtkaziladi. \"\n     \"Musobaqada oʻttizdan ortiq ishtirokchi qatnashdi.\\n\" + ULASHISH),\n    (\"sayt02.misol/ob-havo\", ob_havo + \"\\n\" + ULASHISH),\n    (\"sayt23.misol/fan/quyosh\",\n     \"Quyosh tizimi\\n\"\n     \"Quyosh tizimida sakkizta sayyora bor. \"\n     \"Ulardan eng kattasi Yupiter, eng kichigi esa Merkuriy. \"\n     \"Yer Quyoshdan uchinchi sayyora hisoblanadi. \"\n     \"Sayyoralar Quyosh atrofida turli tezlikda aylanadi.\\n\" + COOKIE),\n    (\"sayt24.misol/texno/ilova\",\n     \"Talabalar uchun yangi mobil ilova\\n\"\n     \"Talabalar uchun dars jadvalini koʻrsatadigan yangi mobil ilova ishga tushirildi. \"\n     \"Ilovada imtihon sanalari va kutubxona ish vaqti ham koʻrsatiladi. \"\n     \"U bepul va internet boʻlmaganda ham ishlaydi. \"\n     \"Ishlab chiquvchilar ilovani yanada qulay qilish uchun takliflar kutmoqda.\\n\" + HUQUQ),\n]\n\nwith open(\"xom_korpus.jsonl\", \"w\", encoding=\"utf-8\") as f:\n    for i in range(len(hujjatlar)):\n        url, matn = hujjatlar[i]\n        hujjat = {\"id\": i + 1, \"url\": \"https://\" + url, \"text\": matn}\n        f.write(json.dumps(hujjat, ensure_ascii=False) + \"\\n\")\n\nprint(\"yozildi:\", len(hujjatlar), \"ta hujjat\")",
                  "lang": "python",
                  "mode": "copy"
                },
                {
                  "kind": "output",
                  "text": "yozildi: 29 ta hujjat"
                }
              ]
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–14. `normallashtir` (Dars 14), `train_regex`, `encode_regex`, `NAQSH` (Dars 13)"
    },
    {
      "id": "dars-16",
      "n": 16,
      "title": "Haqiqiy matnda trening: takror ishni bir marta qiling",
      "subtitle": "",
      "minutes": 80,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**yuklab olasiz** haqiqiy oʻzbekcha korpusni — 148 ming jumla, hech qanday hisobsiz;",
                "**oʻlchaysiz** `train_regex` qanchalik sekin ekanini — va nima uchun;",
                "**topasiz** ikki xil behuda ishni va ularni yoʻqotasiz;",
                "**isbotlaysiz** tez versiya aynan bir xil natija berishini — sinov bilan;",
                "**oʻqitasiz** birinchi haqiqiy tokenizatoringizni: **16 384** token;",
                "**oʻlchaysiz** uning fertility sini — va bu raqamga savol berasiz."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 15 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "`train_regex` ning har bir qadamida qaysi ish **behuda** takrorlanadi?"
            },
            {
              "kind": "text",
              "text": "Va undan ham oldin, Dars 10 da vaʼda bergan edim: \"Dars 16 da haqiqiy korpusda oʻqitganingizda bu muammoga duch kelasiz.\" Bugun — oʻsha kun."
            },
            {
              "kind": "text",
              "text": "Avval muammoni **oʻz koʻzimiz bilan** koʻramiz: haqiqiy matnni yuklab olamiz, `train_regex` ni ishga tushiramiz va soatga qaraymiz. Keyin sababini topamiz."
            }
          ]
        },
        {
          "id": "2-haqiqiy-korpus-common-voice",
          "title": "2. Haqiqiy korpus: Common Voice",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 15 da FineWeb-2 bilan tanishdik: oʻzbek lotin boʻlimi — 4.45 GB. Birinchi haqiqiy trening uchun bizga kichikroq, lekin **haqiqiy** korpus kerak."
            },
            {
              "kind": "text",
              "text": "**Common Voice** — Mozilla jamoasining loyihasi. Odamlar ekrandagi jumlalarni ovoz chiqarib oʻqiydi va shu yozuvlardan nutqni taniydigan modellar oʻqitiladi. Buning uchun har bir tilda koʻp **jumlalar** kerak — va ular ochiq saqlanadi."
            },
            {
              "kind": "text",
              "text": "Oʻzbek tili uchun ular 148 mingdan ortiq. Dars 15 dagi uchta savolga javob:"
            },
            {
              "kind": "steps",
              "items": [
                "Undan oʻqitsam boʻladimi? — **Ha.**",
                "Uni tarqatsam boʻladimi? — **Ha.**",
                "Nima shart? — **Hech narsa.** Jumlalar **CC0** litsenziyasi bilan chiqarilgan — yaʼni jamoat mulki. Common Voice jumla qoʻshayotgan har bir odamdan matnda mualliflik huquqi yoʻqligini tasdiqlashni talab qiladi."
              ]
            },
            {
              "kind": "h3",
              "id": "yuklab-olamiz",
              "text": "Yuklab olamiz"
            },
            {
              "kind": "code",
              "code": "import urllib.request\n\nMANZIL = (\"https://raw.githubusercontent.com/common-voice/common-voice/\"\n          \"57f42edbf6f6d3b128e0bcd3f916360af0d328b6/server/data/uz/sentence-collector.txt\")\n\nurllib.request.urlretrieve(MANZIL, \"uz_jumlalar.txt\")\nprint(\"yuklandi\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "yuklandi"
            },
            {
              "kind": "bullets",
              "items": [
                "`urllib.request` — Python bilan birga keladigan, internetdan fayl oladigan modul. Hech narsa oʻrnatish shart emas.",
                "`urlretrieve(manzil, fayl)` — manzildagi faylni yuklab, kompyuterga shu nom bilan saqlaydi.",
                "Manzil ikki qatorga boʻlingan: qavs ichidagi ikki satr Python'da **bitta** satrga qoʻshiladi. Uzun qatorni oʻqishga qulay qilish uchun.",
                "`57f42ed…` — bu faylning **versiya raqami** (GitHub'da *commit* deyiladi). U faylning 2026-yil 21-oktabrdagi holatini koʻrsatadi. Common Voice keyin yangi jumlalar qoʻshsa ham, bu manzil **aynan shu** faylni beradi. Demak sizning ekraningizdagi raqamlar meniki bilan bir xil chiqadi."
              ]
            },
            {
              "kind": "h3",
              "id": "ichiga-qaraymiz",
              "text": "Ichiga qaraymiz"
            },
            {
              "kind": "code",
              "code": "with open(\"uz_jumlalar.txt\", encoding=\"utf-8\") as f:\n    jumlalar = f.read().split(\"\\n\")\n\nprint(\"jumlalar:\", len(jumlalar))\nfor j in jumlalar[:4]:\n    print(repr(j))\nprint(\"...\")\nfor j in jumlalar[50000:50003]:\n    print(repr(j))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "jumlalar: 148391\n'! Shu pulga qancha sigareta keladi?'\n'\" Cobalt\" va \"Nexia\" qo‘shni davlatlarda qimmatroq sotilmoqda'\n'\"Abdulla Oripov\" hujjatli filmining premyerasi bo‘lib o‘tdi'\n'\"Abdulloh qaerda?\"'\n...\n'Koʻzi koʻr edi.'\n'Koʻzi och ekanmi buning dedi.'\n'Koʻzi oʻyib olingan'"
            },
            {
              "kind": "text",
              "text": "Ikkita narsa koʻzga tashlanadi:"
            },
            {
              "kind": "steps",
              "items": [
                "**Mavzular aralash:** yangilik sarlavhalari (\"Afgʻoniston\", \"prezident\") va badiiy adabiyotdan jumlalar (\"Koʻzi koʻr edi.\").",
                "**Alifbo tartibida:** fayl `!` va `\"` bilan boshlanadi, 50 000-qatorda `Koʻ…` ga yetgan. Bu hozir muhim emas. Dars 17 da — juda muhim boʻladi."
              ]
            },
            {
              "kind": "h3",
              "id": "dars-14-dagi-senzus-yana-bir-bor",
              "text": "Dars 14 dagi senzus — yana bir bor"
            },
            {
              "kind": "code",
              "code": "matn_xom = \"\\n\".join(jumlalar)\n\nfor b in [\"\\u2018\", \"\\u2019\", \"\\u02bb\", \"`\", \"'\", \"\\u02bc\"]:\n    print(repr(b), matn_xom.count(b))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'‘' 93940\n'’' 20792\n'ʻ' 16547\n'`' 10723\n\"'\" 8480\n'ʼ' 3581"
            },
            {
              "kind": "text",
              "text": "Dars 14 da 3 000 ta veb-hujjatda `‘` birinchi oʻrinda edi. Bu yerda ham — va yana ham koʻproq. Toʻgʻri belgi `ʻ` — uchinchi oʻrinda. Normalizatsiyasiz bu korpusda oʻqitish — Dars 14 dagi devorlarni minglab marta qurish boʻlardi."
            }
          ]
        },
        {
          "id": "3-tozalash-dars-15-quvuri-jumlalar-uchun",
          "title": "3. Tozalash: Dars 15 quvuri — jumlalar uchun",
          "blocks": [
            {
              "kind": "text",
              "text": "Avval Dars 14–15 dagi uchta funksiya kerak:"
            },
            {
              "kind": "code",
              "code": "import re\nimport hashlib\nimport unicodedata\n\nNAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\nOKINA = \"\\u02bb\"\nTUTUQ = \"\\u02bc\"\nAPOSTROFLAR = \"'\\u2018\\u2019`\\u02bb\\u02bc\"\n\n\ndef normallashtir(matn):\n    matn = unicodedata.normalize(\"NFC\", matn)\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n            if oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n    return \"\".join(belgilar)\n\n\ndef kirill_ulushi(matn):\n    harflar = 0\n    kirill = 0\n    for belgi in matn:\n        if belgi.isalpha():\n            harflar += 1\n            if ord(belgi) >= 1024 and ord(belgi) <= 1279:\n                kirill += 1\n    if harflar == 0:\n        return 0\n    return kirill / harflar\n\n\ndef kalit(matn):\n    matn = normallashtir(matn)\n    matn = matn.lower()\n    matn = \" \".join(matn.split())\n    return hashlib.md5(matn.encode(\"utf-8\")).hexdigest()\n\n\nprint(normallashtir(\"O'zbekiston\"), kirill_ulushi(\"Салом\"), kalit(\"Salom\")[:8])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Oʻzbekiston 1.0 7650d3ef"
            },
            {
              "kind": "text",
              "text": "Dars 15 dagi olti bosqichdan qaysilari jumlalarga kerak?"
            },
            {
              "kind": "table",
              "head": [
                "Bosqich",
                "Kerakmi?",
                "Nima uchun"
              ],
              "rows": [
                [
                  "1. kodlash",
                  "tekshiramiz",
                  "pastda"
                ],
                [
                  "2. til",
                  "**ha**",
                  ""
                ],
                [
                  "3. shablon",
                  "yoʻq",
                  "jumlalarda sayt \"dumi\" yoʻq"
                ],
                [
                  "4. uzunlik",
                  "yoʻq",
                  "jumla qisqa boʻlishi — normal"
                ],
                [
                  "5. aniq dublikat",
                  "**ha**",
                  ""
                ],
                [
                  "6. qisman dublikat",
                  "**qila olmaymiz**",
                  "pastda"
                ]
              ]
            },
            {
              "kind": "h3",
              "id": "kodlash",
              "text": "Kodlash"
            },
            {
              "kind": "code",
              "code": "print(\"U+FFFD:\", matn_xom.count(\"\\ufffd\"))\nprint(\"‚Ä:\", matn_xom.count(\"‚Ä\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "U+FFFD: 0\n‚Ä: 0"
            },
            {
              "kind": "text",
              "text": "Toza. Lekin boshqa narsa topildi."
            },
            {
              "kind": "h3",
              "id": "korinmas-belgilar",
              "text": "Koʻrinmas belgilar"
            },
            {
              "kind": "text",
              "text": "Korpusda shunday jumla bor: `Adib frontdan qaytgan zahoti bu roman ustida ish boshlab yubordi`. Ekranda hech qanday muammo koʻrinmaydi. Lekin `qaytgan` soʻzining ichida **koʻrinmas** belgi bor:"
            },
            {
              "kind": "code",
              "code": "soz = \"qayt\\u00adgan\"\n\nprint(soz)\nprint(len(soz), len(\"qaytgan\"))\nprint(re.findall(NAQSH, soz))\nprint(unicodedata.name(\"\\u00ad\"), unicodedata.category(\"\\u00ad\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "qayt­gan\n8 7\n['qayt', '\\xad', 'gan']\nSOFT HYPHEN Cf"
            },
            {
              "kind": "bullets",
              "items": [
                "`\\u00ad` — **yumshoq defis** (*soft hyphen*). Matn muharrirlari uni \"agar soʻz qator oxiriga sigʻmasa, shu yerdan boʻl\" degan belgi sifatida qoʻyadi. Ekranda koʻrinmaydi.",
                "Lekin uning kategoriyasi — `Cf`, harf emas. Dars 14 ni eslang: `\\w` faqat harflarni oladi. Demak regex `qaytgan` ni **uch boʻlakka** boʻldi."
              ]
            },
            {
              "kind": "text",
              "text": "Bu — Dars 14 dagi koʻrinmas devor. Faqat bu safar u **haqiqatan** koʻrinmas."
            },
            {
              "kind": "text",
              "text": "Yana bittasi — `\\u200b`, **nol kenglikdagi boʻshliq**. Sanaymiz:"
            },
            {
              "kind": "code",
              "code": "print(\"yumshoq defis:\", matn_xom.count(\"\\u00ad\"))\nprint(\"nol kenglikdagi boʻshliq:\", matn_xom.count(\"\\u200b\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "yumshoq defis: 349\nnol kenglikdagi boʻshliq: 69"
            },
            {
              "kind": "text",
              "text": "Ikkalasi ham hech qanday maʼno tashimaydi. Ularni shunchaki **oʻchiramiz**."
            },
            {
              "kind": "h3",
              "id": "til-va-dublikatlar",
              "text": "Til va dublikatlar"
            },
            {
              "kind": "code",
              "code": "toza = []\nkorilgan = {}\nmisollar = []\nolib_tashlandi = {\"kirill\": 0, \"dublikat\": 0}\n\nfor j in jumlalar:\n    j = j.replace(\"\\u00ad\", \"\").replace(\"\\u200b\", \"\").strip()\n    if j == \"\":\n        continue\n    if kirill_ulushi(j) > 0.3:\n        olib_tashlandi[\"kirill\"] += 1\n        continue\n    k = kalit(j)\n    if k in korilgan:\n        olib_tashlandi[\"dublikat\"] += 1\n        if len(misollar) < 3:\n            misollar.append((korilgan[k], j))\n        continue\n    korilgan[k] = j\n    toza.append(j)\n\nprint(\"qoldi:\", len(toza))\nprint(olib_tashlandi)\nfor a, b in misollar:\n    print(repr(a), \"=\", repr(b))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "qoldi: 148102\n{'kirill': 6, 'dublikat': 283}\n'Afg‘on deb atalgan olis tuproqda' = 'Afg’on deb atalgan olis tuproqda'\n'Agar eshitmasa, masofani oʻttiz qadamga qisqartirasiz.' = 'Agar eshitmasa, masofani o‘ttiz qadamga qisqartirasiz.'\n'Agar ular sevgining qo‘lidan mahkam tutishganida bu to‘siqdan o‘tishlari mushkul emasdi.' = 'Agar ular sevgining qo’lidan mahkam tutishganida bu to’siqdan o’tishlari mushkul emasdi.'"
            },
            {
              "kind": "text",
              "text": "Bitta yangi soʻz — **`continue`**. Dars 10 dagi `break` tsiklni butunlay toʻxtatadi. `continue` esa faqat **shu aylanishni** toʻxtatadi va keyingi jumlaga oʻtadi. \"Bu jumla bilan ish tugadi — keyingisi.\""
            },
            {
              "kind": "text",
              "text": "Va bitta oʻzgarish: `korilgan` — endi toʻplam emas, **lugʻat**. Kalit → oʻsha kalit bilan birinchi koʻrilgan jumla. Shunda dublikat topilganda \"kimning nusxasi\" ekanini ham koʻrsata olamiz."
            },
            {
              "kind": "text",
              "text": "Common Voice aynan bir xil jumlalarni allaqachon olib tashlagan — faylda hamma qatorlar har xil. Lekin koʻrinmas belgilar va normalizatsiyadan keyin yana **283 ta** dublikat chiqdi. Misollarga\nqarang: `ʻ` va `‘`, `’` va `‘`, katta va kichik harf. Dars 15 dagi `kalit` aynan shu uchun."
            },
            {
              "kind": "h3",
              "id": "qisman-dublikat-chi",
              "text": "Qisman dublikat-chi?"
            },
            {
              "kind": "text",
              "text": "148 102 ta jumla. Har bir juftni solishtirish — Dars 15 dagi formula:"
            },
            {
              "kind": "code",
              "code": "n = len(toza)\nprint(n * (n - 1) // 2)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "10967027151"
            },
            {
              "kind": "text",
              "text": "**11 milliard juft.** Dars 15 da aytganimizdek — bunday hajmda MinHash kerak, va biz uni yozmaymiz. Bu korpusda qisman dublikatlar qoladi. Buni yodda tuting."
            },
            {
              "kind": "h3",
              "id": "saqlaymiz",
              "text": "Saqlaymiz"
            },
            {
              "kind": "code",
              "code": "with open(\"korpus.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"\\n\".join(toza))\n\nmatn = normallashtir(\"\\n\".join(toza))\nprint(\"bayt:\", len(matn.encode(\"utf-8\")))\nprint(\"soʻz:\", len(matn.split()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bayt: 8007356\nsoʻz: 981206"
            },
            {
              "kind": "text",
              "text": "Faylga **asl** yozuvni saqladik (Dars 15 qoidasi). `matn` esa — tokenizator koʻradigan, normallashtirilgan nusxa. **8 MB, deyarli bir million soʻz.** Dars 13 dagi 7 qatorli matndan 16 000 barobar katta."
            }
          ]
        },
        {
          "id": "4-birinchi-urinish-train-regex",
          "title": "4. Birinchi urinish: `train_regex`",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 10 da `time.perf_counter()` bilan vaqt oʻlchagan edik. Korpusning boshidagi 2 000, 4 000 va 8 000 jumlada **50 ta** birlashtirish qilamiz:"
            },
            {
              "kind": "code",
              "code": "import time\n\nfor n in [2000, 4000, 8000]:\n    qism = normallashtir(\"\\n\".join(toza[:n]))\n    t0 = time.perf_counter()\n    train_regex(qism, 306, NAQSH)\n    print(f\"{n:5d} jumla | {len(qism.encode('utf-8')):7d} bayt | {time.perf_counter() - t0:.2f} soniya\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": " 2000 jumla |  113530 bayt | 1.67 soniya\n 4000 jumla |  234078 bayt | 3.26 soniya\n 8000 jumla |  453597 bayt | 6.88 soniya",
              "label": "Natija (sizda raqamlar boshqacha boʻladi — kompyuter tezligiga qarab)"
            },
            {
              "kind": "text",
              "text": "Matn ikki barobar — vaqt ham taxminan ikki barobar. Bu ajablanarli emas: har bir birlashtirishda `train_regex` **butun** matnni aylanib chiqadi."
            },
            {
              "kind": "text",
              "text": "Endi butun korpusda — atigi **3 ta** birlashtirish:"
            },
            {
              "kind": "code",
              "code": "t0 = time.perf_counter()\ntrain_regex(matn, 259, NAQSH)\nbitta = (time.perf_counter() - t0) / 3\n\nprint(f\"bitta birlashtirish: {bitta:.1f} soniya\")\nprint(f\"16 128 ta birlashtirish: {bitta * 16128 / 3600:.1f} soat\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bitta birlashtirish: 4.0 soniya\n16 128 ta birlashtirish: 17.8 soat"
            },
            {
              "kind": "text",
              "text": "**17 soatdan ortiq.** (Keyingi qadamlarda matn qisqaradi va ular biroz tezlashadi — lekin baribir soatlar.) Colab'ning bepul sessiyasi esa koʻpi bilan 12 soat ishlaydi."
            },
            {
              "kind": "text",
              "text": "Bu tokenizator **hech qachon** oʻqimaydi. Nima behuda ketyapti?"
            },
            {
              "kind": "media",
              "id": "p1",
              "title": "17 soat"
            }
          ]
        },
        {
          "id": "5-behuda-ish-1-bir-xil-bolaklar",
          "title": "5. Behuda ish №1: bir xil boʻlaklar",
          "blocks": [
            {
              "kind": "text",
              "text": "Regex matnni boʻlaklarga boʻladi (Dars 13). Ularni sanaymiz:"
            },
            {
              "kind": "code",
              "code": "def boshlar_sana(matn, naqsh):\n    hisob = {}\n    for b in re.findall(naqsh, matn):\n        hisob[b] = hisob.get(b, 0) + 1\n    return hisob\n\n\nhisob = boshlar_sana(matn, NAQSH)\n\nprint(\"boʻlaklar:\", len(re.findall(NAQSH, matn)))\nprint(\"noyob boʻlaklar:\", len(hisob))\nprint()\nfor b in sorted(hisob, key=hisob.get, reverse=True)[:10]:\n    print(f\"{b!r:10s} {hisob[b]:7d}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "boʻlaklar: 1331204\nnoyob boʻlaklar: 153567\n\n'\\n'        148101\n'.'          72530\n','          52206\n'-'          17618\n' ham'        9772\n' bilan'      9023\n' va'         8728\n'?'           8308\n'•'           7908\n' bir'        6832"
            },
            {
              "kind": "text",
              "text": "**1.33 million boʻlakdan atigi 153 ming tasi noyob.** Qolgani — takror. ` va` 8 ming martadan koʻp uchraydi, ` bilan` — 9 ming."
            },
            {
              "kind": "text",
              "text": "Endi `train_regex` nima qiladi? Har bir qadamda ` bilan` ning juftlarini **9 ming marta** sanaydi: `( b)`, `(bi)`, `(il)`, `(la)`, `(an)` — har safar bir xil natija. Keyin ` bilan` ga **9 ming marta** `merge` qiladi — har safar bir xil natija."
            },
            {
              "kind": "text",
              "text": "**Yechim:** har bir noyob boʻlakni **bir marta** saqlaymiz, yoniga — nechta uchraganini. Juftlarni sanaganda 1 emas, **shu sonni** qoʻshamiz."
            },
            {
              "kind": "text",
              "text": "Oddiy misolda:"
            },
            {
              "kind": "pre",
              "text": "boʻlaklar:  \" olma\", \" olma\", \" nok\", \" olma\"\nnoyoblar:   \" olma\" × 3,  \" nok\" × 1\n\n(\"l\", \"m\") juftining soni:\n  eski usul:  1 + 1 + 1        = 3   (uch marta sanaymiz)\n  yangi usul: 3                = 3   (bir marta sanab, 3 ni qoʻshamiz)"
            },
            {
              "kind": "text",
              "text": "Natija bir xil. Ish — kam."
            },
            {
              "kind": "media",
              "id": "p2",
              "title": "Bir xil boʻlaklar"
            },
            {
              "kind": "h3",
              "id": "train-tez1",
              "text": "`train_tez1`"
            },
            {
              "kind": "code",
              "code": "def eng_juft(stats):\n    return max(stats, key=stats.get)\n\n\ndef train_tez1(matn, vocab_size, naqsh):\n    hisob = boshlar_sana(matn, naqsh)\n    sozlar = []\n    sonlar = []\n    for b in hisob:\n        sozlar.append(kodla(b))\n        sonlar.append(hisob[b])\n\n    merges = {}\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n    tarix = []\n\n    for yangi_id in range(256, vocab_size):\n        stats = {}\n        for i in range(len(sozlar)):\n            soz = sozlar[i]\n            for juft in zip(soz, soz[1:]):\n                stats[juft] = stats.get(juft, 0) + sonlar[i]\n        if len(stats) == 0:\n            break\n        eng = eng_juft(stats)\n        tarix.append(stats[eng])\n        for i in range(len(sozlar)):\n            sozlar[i] = merge(sozlar[i], eng, yangi_id)\n        merges[eng] = yangi_id\n        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n\n    return merges, vocab, tarix",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "`train_regex` dan farqi — uch joyda:"
            },
            {
              "kind": "steps",
              "items": [
                "**Boshida:** `parchalar` roʻyxati oʻrniga ikkita roʻyxat: `sozlar` (har bir noyob boʻlakning tokenlari) va `sonlar` (u necha marta uchragani). `sozlar[i]` va `sonlar[i]` — bir juftlik.",
                "**Sanashda:** `+ 1` emas, `+ sonlar[i]`. Bu — **tsikl ichida tsikl**: tashqi tsikl soʻzlar boʻylab, ichki tsikl — har bir soʻzning juftlari boʻylab.",
                "**Tanlashda:** `max(...)` ni alohida `eng_juft` funksiyasiga chiqardik. Nima uchun — 6-boʻlimda bilasiz."
              ]
            },
            {
              "kind": "text",
              "text": "Va bitta qoʻshimcha: `tarix` — har qadamda tanlangan juft necha marta uchragani. Keyin kerak boʻladi."
            },
            {
              "kind": "h3",
              "id": "eng-muhim-sinov",
              "text": "Eng muhim sinov"
            },
            {
              "kind": "text",
              "text": "Tez funksiya yozish oson. **Toʻgʻri** tez funksiya yozish — qiyin. Tez versiya **aynan bir xil** natija berishi kerak. Tekshiramiz:"
            },
            {
              "kind": "code",
              "code": "qism = normallashtir(\"\\n\".join(toza[:2000]))\n\nm_sekin, _, _ = train_regex(qism, 306, NAQSH)\nm_tez1, _, _ = train_tez1(qism, 306, NAQSH)\n\nprint(list(m_sekin.items()) == list(m_tez1.items()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "True"
            },
            {
              "kind": "text",
              "text": "50 ta birlashtirishning **hammasi** — bir xil, bir xil tartibda."
            },
            {
              "kind": "bullets",
              "items": [
                "`list(m.items())` — lugʻatni `(juft, raqam)` juftliklari roʻyxatiga aylantiradi. Ikki roʻyxat teng boʻlishi uchun **tartib** ham bir xil boʻlishi kerak."
              ]
            },
            {
              "kind": "h3",
              "id": "qancha-tezlashdi",
              "text": "Qancha tezlashdi?"
            },
            {
              "kind": "code",
              "code": "t0 = time.perf_counter()\ntrain_tez1(matn, 259, NAQSH)\nbitta = (time.perf_counter() - t0) / 3\n\nprint(f\"bitta birlashtirish: {bitta:.2f} soniya\")\nprint(f\"16 128 ta birlashtirish: {bitta * 16128 / 3600:.1f} soat\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bitta birlashtirish: 0.66 soniya\n16 128 ta birlashtirish: 3.0 soat"
            },
            {
              "kind": "text",
              "text": "17 soatdan — 3 soatga. Yaxshi. Lekin hali ham soatlar."
            }
          ]
        },
        {
          "id": "6-behuda-ish-2-hammasini-qaytadan-sanash",
          "title": "6. Behuda ish №2: hammasini qaytadan sanash",
          "blocks": [
            {
              "kind": "text",
              "text": "`train_tez1` ning ichiga yana qarang. Har bir qadamda:"
            },
            {
              "kind": "steps",
              "items": [
                "**153 ming** soʻzning hamma juftlarini sanaydi;",
                "bitta juftni birlashtiradi;",
                "**153 ming** soʻzning hammasiga `merge` qiladi."
              ]
            },
            {
              "kind": "text",
              "text": "Lekin oʻylab koʻring: agar `(\"l\", \"a\")` ni birlashtirsak, qaysi soʻzlar oʻzgaradi? **Faqat ichida `la` bor soʻzlar.** ` nok` ga hech narsa boʻlmaydi — uning juftlari ham, soni ham oʻsha-oʻsha. Biz uni har qadamda qaytadan sanab, **ayni** natijani olamiz."
            },
            {
              "kind": "h3",
              "id": "goya-qaysi-juft-qayerda",
              "text": "Gʻoya: qaysi juft qayerda?"
            },
            {
              "kind": "text",
              "text": "Har bir juft uchun — u **qaysi soʻzlarda** borligini yozib qoʻyamiz. Bunga Dars 15 dagi toʻplam juda mos:"
            },
            {
              "kind": "code",
              "code": "sozlar = [list(\"olma\"), list(\"nok\"), list(\"bolalar\")]\nsonlar = [3, 1, 2]\n\nstats = {}\nqayerda = {}\nfor i in range(len(sozlar)):\n    soz = sozlar[i]\n    for juft in zip(soz, soz[1:]):\n        stats[juft] = stats.get(juft, 0) + sonlar[i]\n        if juft not in qayerda:\n            qayerda[juft] = set()\n        qayerda[juft].add(i)\n\nprint(\"('l', 'a'):\", stats[(\"l\", \"a\")], \"marta, soʻzlarda:\", qayerda[(\"l\", \"a\")])\nprint(\"('o', 'k'):\", stats[(\"o\", \"k\")], \"marta, soʻzlarda:\", qayerda[(\"o\", \"k\")])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "('l', 'a'): 4 marta, soʻzlarda: {2}\n('o', 'k'): 1 marta, soʻzlarda: {1}"
            },
            {
              "kind": "text",
              "text": "`(\"l\", \"a\")` — faqat **2-soʻzda**, `bolalar` da. U yerda ikki marta (`bo-la-lar`), soʻzning oʻzi esa 2 marta uchragan: 2 × 2 = 4. `(\"o\", \"k\")` — faqat 1-soʻzda, `nok` da."
            },
            {
              "kind": "text",
              "text": "Endi `(\"l\", \"a\")` ni birlashtirsak — faqat **2-soʻzga** tegamiz:"
            },
            {
              "kind": "code",
              "code": "juft = (\"l\", \"a\")\nfor i in qayerda[juft]:\n    eski = sozlar[i]\n    yangi = merge(eski, juft, \"la\")\n\n    # 1. eski juftlarni ayiramiz\n    for j in zip(eski, eski[1:]):\n        stats[j] -= sonlar[i]\n        if stats[j] == 0:\n            del stats[j]\n\n    # 2. yangi juftlarni qoʻshamiz\n    for j in zip(yangi, yangi[1:]):\n        stats[j] = stats.get(j, 0) + sonlar[i]\n        if j not in qayerda:\n            qayerda[j] = set()\n        qayerda[j].add(i)\n\n    sozlar[i] = yangi\n    print(eski, \"->\", yangi)\n\nprint(stats)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['b', 'o', 'l', 'a', 'l', 'a', 'r'] -> ['b', 'o', 'la', 'la', 'r']\n{('o', 'l'): 3, ('l', 'm'): 3, ('m', 'a'): 3, ('n', 'o'): 1, ('o', 'k'): 1, ('b', 'o'): 2, ('o', 'la'): 2, ('la', 'la'): 2, ('la', 'r'): 2}"
            },
            {
              "kind": "text",
              "text": "Qator-qator:"
            },
            {
              "kind": "bullets",
              "items": [
                "`for i in qayerda[juft]:` — faqat shu juft bor soʻzlar. `olma` va `nok` ga umuman qaramadik.",
                "`stats[j] -= sonlar[i]` — eski soʻzning **har bir** jufti uchun uning sonini ayiramiz. Soʻz endi bunday koʻrinishda yoʻq.",
                "`if stats[j] == 0: del stats[j]` — `del` — lugʻatdan kalitni **oʻchiradi**. Soni nolga tushgan juft — endi hech qayerda yoʻq.",
                "Keyin yangi soʻzning juftlarini **qoʻshamiz** — va ularni `qayerda` ga ham yozamiz."
              ]
            },
            {
              "kind": "text",
              "text": "Natijaga qarang: `('l', 'a')` yoʻqoldi, `('o', 'la')`, `('la', 'la')`, `('la', 'r')` paydo boʻldi. `('o', 'l')` — 3 (olma × 3 dan) qoldi, chunki `olma` ga tegmadik. `stats` aynan qaytadan sanagandek — lekin biz faqat **bitta** soʻzni qayta ishladik."
            },
            {
              "kind": "h3",
              "id": "train-tez2",
              "text": "`train_tez2`"
            },
            {
              "kind": "code",
              "code": "def train_tez2(matn, vocab_size, naqsh):\n    hisob = boshlar_sana(matn, naqsh)\n    sozlar = []\n    sonlar = []\n    for b in hisob:\n        sozlar.append(kodla(b))\n        sonlar.append(hisob[b])\n\n    # boshlangʻich hisob — faqat bir marta\n    stats = {}\n    qayerda = {}\n    for i in range(len(sozlar)):\n        soz = sozlar[i]\n        for juft in zip(soz, soz[1:]):\n            stats[juft] = stats.get(juft, 0) + sonlar[i]\n            if juft not in qayerda:\n                qayerda[juft] = set()\n            qayerda[juft].add(i)\n\n    merges = {}\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n    tarix = []\n\n    for yangi_id in range(256, vocab_size):\n        if len(stats) == 0:\n            break\n        eng = eng_juft(stats)\n        tarix.append(stats[eng])\n\n        for i in qayerda[eng]:\n            eski = sozlar[i]\n            yangi = merge(eski, eng, yangi_id)\n            if len(yangi) == len(eski):\n                continue\n            for j in zip(eski, eski[1:]):\n                stats[j] -= sonlar[i]\n                if stats[j] == 0:\n                    del stats[j]\n            for j in zip(yangi, yangi[1:]):\n                stats[j] = stats.get(j, 0) + sonlar[i]\n                if j not in qayerda:\n                    qayerda[j] = set()\n                qayerda[j].add(i)\n            sozlar[i] = yangi\n\n        del qayerda[eng]\n        merges[eng] = yangi_id\n        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n\n    return merges, vocab, tarix",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Oddiy misoldagi ish — endi tsikl ichida. Ikki yangi qator:"
            },
            {
              "kind": "bullets",
              "items": [
                "`if len(yangi) == len(eski): continue` — `qayerda` baʼzan **eskirgan** boʻladi: soʻz bir vaqtlar bu juftga ega edi, lekin oldingi birlashtirish uni oʻzgartirib yubordi. Bunday soʻzda `merge` hech narsani oʻzgartirmaydi — uzunligi bir xil qoladi. Unda — keyingi soʻzga.",
                "`del qayerda[eng]` — bu juft endi hech qayerda yoʻq. Uning roʻyxati ham kerak emas."
              ]
            },
            {
              "kind": "media",
              "id": "p3",
              "title": "Faqat tegilganlar"
            },
            {
              "kind": "h3",
              "id": "sinov-va-kutilmagan-natija",
              "text": "Sinov — va kutilmagan natija"
            },
            {
              "kind": "text",
              "text": "`train_tez1` bilan solishtiramiz:"
            },
            {
              "kind": "code",
              "code": "m_tez1, v_tez1, tarix1 = train_tez1(qism, 306, NAQSH)\nm_tez2, v_tez2, tarix2 = train_tez2(qism, 306, NAQSH)\n\nprint(list(m_tez1.items()) == list(m_tez2.items()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "False"
            },
            {
              "kind": "text",
              "text": "**Mos kelmadi.** Biror joyda xato qildikmi? Birinchi farqni qidiramiz:"
            },
            {
              "kind": "code",
              "code": "r1 = list(m_tez1)\nr2 = list(m_tez2)\n\nfor k in range(len(r1)):\n    if r1[k] != r2[k]:\n        print(f\"birinchi farq: {k + 1}-birlashtirishda\")\n        print(\"tez1 tanladi:\", r1[k], repr(decode([m_tez1[r1[k]]], v_tez1)), \"| soni:\", tarix1[k])\n        print(\"tez2 tanladi:\", r2[k], repr(decode([m_tez2[r2[k]]], v_tez2)), \"| soni:\", tarix2[k])\n        break",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "birinchi farq: 38-birlashtirishda\ntez1 tanladi: (115, 116) 'st' | soni: 358\ntez2 tanladi: (97, 114) 'ar' | soni: 358"
            },
            {
              "kind": "text",
              "text": "37 ta birlashtirish bir xil. 38-sida `tez1` — `st` ni, `tez2` — `ar` ni tanladi. Va ikkalasining soni — **bir xil**: 358."
            },
            {
              "kind": "text",
              "text": "Bu — **durang**. Ikki juft teng. `max(stats, key=stats.get)` bunday holatda qaysi birini qaytaradi? **Lugʻatda birinchi turganini.** Lugʻatdagi tartib esa — kalitlar qoʻshilgan tartib."
            },
            {
              "kind": "bullets",
              "items": [
                "`tez1` har qadamda `stats` ni **noldan** quradi — juftlar matndagi tartibda qoʻshiladi.",
                "`tez2` esa `stats` ni **oʻzgartirib boradi**: juftlar oʻchiriladi, yangilari oxiriga qoʻshiladi. Tartib — boshqa."
              ]
            },
            {
              "kind": "text",
              "text": "Ikkalasi ham \"eng koʻp uchragan juftni\" tanladi. Ikkalasi ham toʻgʻri. Lekin **har xil**. Va 38-birlashtirishdan keyin ular butunlay boshqa yoʻldan ketadi."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Saboq:** agar natija **tasodifiy narsaga** (bu yerda — lugʻatdagi tartibga) bogʻliq boʻlsa, bu qoidani aniq yozish kerak."
            },
            {
              "kind": "h3",
              "id": "durang-qoidasi",
              "text": "Durang qoidasi"
            },
            {
              "kind": "text",
              "text": "Yangi qoida: **eng koʻp uchragan juft; durang boʻlsa — raqami kichigi.**"
            },
            {
              "kind": "code",
              "code": "def eng_juft(stats):\n    eng_son = max(stats.values())\n    nomzodlar = []\n    for juft in stats:\n        if stats[juft] == eng_son:\n            nomzodlar.append(juft)\n    return min(nomzodlar)\n\n\nprint(eng_juft({(5, 9): 7, (3, 4): 7, (1, 2): 2}))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "(3, 4)"
            },
            {
              "kind": "bullets",
              "items": [
                "`stats.values()` — lugʻatning faqat **qiymatlari** (sonlar).",
                "`max(stats.values())` — eng katta son.",
                "`nomzodlar` — shu songa ega hamma juftlar.",
                "`min(nomzodlar)` — juftlar orasidagi eng kichigi. Juftlar ham solishtiriladi: avval birinchi raqam, teng boʻlsa — ikkinchisi. `(3, 4) < (5, 9)`."
              ]
            },
            {
              "kind": "text",
              "text": "Endi qoida **lugʻatdagi tartibga bogʻliq emas**."
            },
            {
              "kind": "media",
              "id": "p4",
              "title": "Durang"
            },
            {
              "kind": "text",
              "text": "Va bu yerda bitta chiroyli narsa: biz `train_tez1` va `train_tez2` ni **qayta yozmaymiz**. Ular ikkalasi ham `eng_juft` ni chaqiradi. Python funksiyani **chaqirilgan paytda** qidiradi — demak endi ikkalasi ham yangi `eng_juft` ni ishlatadi:"
            },
            {
              "kind": "code",
              "code": "m_tez1, v_tez1, tarix1 = train_tez1(qism, 306, NAQSH)\nm_tez2, v_tez2, tarix2 = train_tez2(qism, 306, NAQSH)\n\nprint(list(m_tez1.items()) == list(m_tez2.items()))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "True"
            },
            {
              "kind": "text",
              "text": "**Mos keldi.** (`train_regex` esa endi biroz farq qiladi — u eski `max` ni ishlatadi. Bu normal: u — boshqa durang qoidasi bilan ishlaydigan, xuddi shunday toʻgʻri tokenizator.)"
            },
            {
              "kind": "h3",
              "id": "qancha-tezlashdi-2",
              "text": "Qancha tezlashdi?"
            },
            {
              "kind": "code",
              "code": "qism = normallashtir(\"\\n\".join(toza[:8000]))\n\nfor nom, funksiya in [(\"train_regex\", train_regex), (\"train_tez1\", train_tez1), (\"train_tez2\", train_tez2)]:\n    t0 = time.perf_counter()\n    funksiya(qism, 306, NAQSH)\n    print(f\"{nom:12s} {time.perf_counter() - t0:.2f} soniya\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "train_regex  7.87 soniya\ntrain_tez1   2.70 soniya\ntrain_tez2   0.66 soniya"
            },
            {
              "kind": "bullets",
              "items": [
                "`for nom, funksiya in [...]` — funksiyalarni ham roʻyxatga qoʻyish mumkin. Ular ham oddiy qiymat: `funksiya(...)` — roʻyxatdan olinganini chaqiradi."
              ]
            },
            {
              "kind": "text",
              "text": "Bu — kichkina boʻlakda, 50 ta birlashtirish. Butun korpusda farq **yanada** katta boʻladi: `train_tez2` ning boshidagi hisob bir marta qilinadi, keyingi har bir qadam esa faqat **tegilgan** soʻzlarni qayta ishlaydi. Oxirgi birlashtirishlar — juda kam uchraydigan juftlar — atigi bir nechta soʻzga tegadi."
            }
          ]
        },
        {
          "id": "7-haqiqiy-trening-16-384-token",
          "title": "7. Haqiqiy trening: 16 384 token",
          "blocks": [
            {
              "kind": "text",
              "text": "Hammasi tayyor. Butun korpus, **16 384** hajmli lugʻat — yaʼni 16 128 ta birlashtirish."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu katak bir necha daqiqa ishlaydi. Mening kompyuterimda — 5 daqiqaga yaqin, Colab'da 5–10 daqiqa. Choy damlab keling."
            },
            {
              "kind": "code",
              "code": "t0 = time.perf_counter()\nmerges, vocab, tarix = train_tez2(matn, 16384, NAQSH)\n\nprint(f\"vaqt: {(time.perf_counter() - t0) / 60:.1f} daqiqa\")\nprint(\"birlashtirishlar:\", len(merges))\nprint(\"lugʻat:\", len(vocab))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "vaqt: 5.0 daqiqa\nbirlashtirishlar: 16128\nlugʻat: 16384"
            },
            {
              "kind": "text",
              "text": "**17 soat → bir necha daqiqa.** Algoritm — oʻsha BPE. Natija — oʻsha (durang qoidasigacha). Faqat behuda ish yoʻq."
            },
            {
              "kind": "h3",
              "id": "tarix-nima-deydi",
              "text": "`tarix` nima deydi?"
            },
            {
              "kind": "code",
              "code": "for k in [0, 9, 99, 999, 9999, 16127]:\n    print(f\"{k + 1:6d}-birlashtirish: juft {tarix[k]:6d} marta uchragan\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "     1-birlashtirish: juft 154125 marta uchragan\n    10-birlashtirish: juft  73164 marta uchragan\n   100-birlashtirish: juft   9847 marta uchragan\n  1000-birlashtirish: juft    587 marta uchragan\n 10000-birlashtirish: juft     31 marta uchragan\n 16128-birlashtirish: juft     16 marta uchragan"
            },
            {
              "kind": "text",
              "text": "Birinchi birlashtirish — 154 ming marta uchragan juft. Oxirgisi — atigi **16** marta. Bir million soʻzlik korpusda bu — juda kam. Oxirgi minglab tokenlar **kamyob** soʻzlar uchun. Buni yodda tuting — 8-boʻlimda koʻrasiz."
            },
            {
              "kind": "h3",
              "id": "saqlab-qoyamiz",
              "text": "Saqlab qoʻyamiz"
            },
            {
              "kind": "text",
              "text": "Colab sessiyasi tugasa, `merges` yoʻqoladi. Yana 5 daqiqa kutmaslik uchun — faylga yozamiz. Dars 15 dagi `json` bilan:"
            },
            {
              "kind": "code",
              "code": "import json\n\nroyxat = []\nfor juft in merges:\n    royxat.append([juft[0], juft[1], merges[juft]])\n\nwith open(\"merges_16k.json\", \"w\", encoding=\"utf-8\") as f:\n    f.write(json.dumps(royxat))\n\nprint(royxat[:3])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[[108, 97, 256], [202, 187, 257], [97, 110, 258]]"
            },
            {
              "kind": "text",
              "text": "JSON kortejni (`(a, b)`) lugʻat kaliti sifatida saqlay olmaydi. Shuning uchun har bir birlashtirishni `[a, b, yangi_id]` roʻyxati qilib yozdik. Toʻgʻri saqlash va qayta yuklash — Dars 18 da."
            }
          ]
        },
        {
          "id": "8-tokenizator-nimani-organdi",
          "title": "8. Tokenizator nimani oʻrgandi?",
          "blocks": [
            {
              "kind": "text",
              "text": "Birinchi oʻnta birlashtirish:"
            },
            {
              "kind": "code",
              "code": "for juft in list(merges)[:10]:\n    print(repr(decode([merges[juft]], vocab)))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'la'\n'ʻ'\n'an'\n'sh'\n'di'\n'oʻ'\n'in'\n' b'\n'da'\n'li'"
            },
            {
              "kind": "text",
              "text": "Birinchisi — `la` (`bolalar`, `kitoblar`… — koʻplik qoʻshimchasi). Ikkinchisi — `ʻ`: uning ikki bayti (202, 187) bitta tokenga aylandi. Dars 14 ni eslang: normalizatsiyasiz kichik tokenizatorda `ʻ` ikki boʻlakda qolib ketgan edi. Normalizatsiya tufayli bu korpusda `ʻ` juda koʻp — va u ikkinchi oʻrinda birlashdi. Oltinchisi — `oʻ`."
            },
            {
              "kind": "text",
              "text": "Eng uzun tokenlar (Dars 15 dagi `sorted`):"
            },
            {
              "kind": "code",
              "code": "tokenlar = []\nfor tid in range(256, len(vocab)):\n    tokenlar.append(decode([tid], vocab))\n\nprint(sorted(tokenlar, key=len, reverse=True)[:10])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['Oʻzsanoatqurilishbank', ' takomillashtiriladi', ' rejalashtirilmoqda', ' rivojlantirishning', ' takomillashtirish', ' xususiylashtirish', ' oʻzbekistonliklar', 'Qoraqalpogʻistonda', ' Respublikasining', ' rivojlantirishga']"
            },
            {
              "kind": "text",
              "text": "`takomillashtiriladi`, `rejalashtirilmoqda`, `rivojlantirishning` — oʻzbek tilining uzun soʻzlari bitta token boʻldi. Bu — rasmiy yangiliklar tili: korpusdagi sarlavhalar shunday soʻzlarga boy."
            },
            {
              "kind": "text",
              "text": "Va birinchi oʻrinda — **`Oʻzsanoatqurilishbank`**. Bank nomi! Necha marta uchraydi?"
            },
            {
              "kind": "code",
              "code": "print(matn.count(\"O\\u02bbzsanoatqurilishbank\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "26"
            },
            {
              "kind": "text",
              "text": "Bir million soʻzlik korpusda — **26 marta**. Shu yetarli boʻldi: bu nom 16 384 ta joydan bittasini oldi. Dars 15 dagi metro maqolasini eslang — tokenizator **oʻz korpusining koʻzgusi**."
            },
            {
              "kind": "text",
              "text": "Uchta jumlada sinab koʻramiz:"
            },
            {
              "kind": "code",
              "code": "for s in [\"Oʻzbekiston Respublikasi Prezidenti farmon imzoladi.\",\n          \"Bolalar maktabga borishdi.\",\n          \"Toshkent metropolitenining halqa yoʻnalishida yangi bekat ochildi.\"]:\n    t = encode_regex(normallashtir(s), merges, NAQSH)\n    qismlar = []\n    for x in t:\n        qismlar.append(decode([x], vocab))\n    print(len(t), \"token:\", qismlar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "6 token: ['Oʻzbekiston', ' Respublikasi', ' Prezidenti', ' farmon', ' imzoladi', '.']\n5 token: ['Bolalar', ' maktabga', ' bor', 'ishdi', '.']\n13 token: ['Toshkent', ' met', 'rop', 'oli', 'ten', 'ining', ' hal', 'qa', ' yoʻnalishida', ' yangi', ' bekat', ' ochildi', '.']"
            },
            {
              "kind": "bullets",
              "items": [
                "Birinchi jumla — **har bir soʻz bitta token**. Rasmiy til — korpusning yuragi.",
                "Ikkinchida ` bor` + `ishdi` — feʼl oʻzagi va qoʻshimchasi. Tokenizator morfologiyani hech kim oʻrgatmasdan topdi.",
                "Uchinchida `metropolitenining` **besh** boʻlakka boʻlindi. Korpusda metro haqida deyarli hech narsa yoʻq."
              ]
            }
          ]
        },
        {
          "id": "9-kodlash-ham-sekin",
          "title": "9. Kodlash ham sekin",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi fertility oʻlchamoqchimiz: butun korpusni kodlab, tokenlarni sanash kerak. Dars 13 dagi `encode_regex` bilan — korpusning kichik qismlarida:"
            },
            {
              "kind": "code",
              "code": "for n in [500, 1000, 2000]:\n    qism = normallashtir(\"\\n\".join(toza[:n]))\n    t0 = time.perf_counter()\n    encode_regex(qism, merges, NAQSH)\n    print(f\"{n:5d} jumla | {time.perf_counter() - t0:.2f} soniya\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  500 jumla | 0.18 soniya\n 1000 jumla | 0.47 soniya\n 2000 jumla | 2.06 soniya"
            },
            {
              "kind": "text",
              "text": "Jumlalar **ikki** barobar — vaqt **ikki barobardan koʻp**. Matn kattalashgan sari yomonlashadi. Nima uchun?"
            },
            {
              "kind": "text",
              "text": "`encode_regex` ning ichida shu qator bor:"
            },
            {
              "kind": "pre",
              "text": "natija = natija + tk"
            },
            {
              "kind": "text",
              "text": "`natija + tk` — **yangi** roʻyxat yasaydi: `natija` ning hamma elementlarini nusxalab, oxiriga `tk` ni qoʻshadi. `natija` da 100 000 token boʻlsa — 100 000 ta nusxa. Har bir boʻlak uchun. Roʻyxat oʻsgan sari har bir qadam qimmatlashadi."
            },
            {
              "kind": "text",
              "text": "Va **behuda ish №1** bu yerda ham bor: ` bilan` ni 9 ming marta qaytadan kodlaymiz — har safar bir xil natija."
            },
            {
              "kind": "h3",
              "id": "encode-tez",
              "text": "`encode_tez`"
            },
            {
              "kind": "code",
              "code": "def encode_tez(matn, merges, naqsh):\n    kesh = {}\n    natija = []\n    for bosh in re.findall(naqsh, matn):\n        if bosh not in kesh:\n            kesh[bosh] = encode_regex(bosh, merges, naqsh)\n        natija.extend(kesh[bosh])\n    return natija",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Ikki yechim:"
            },
            {
              "kind": "bullets",
              "items": [
                "**`kesh`** (*cache*) — lugʻat: boʻlak → uning tokenlari. Boʻlak birinchi marta kelganda — kodlaymiz va yozib qoʻyamiz. Keyingi safar — tayyorini olamiz. `encode_regex(bosh, ...)` — bitta boʻlakni ham shu funksiya kodlay oladi.",
                "**`.extend(...)`** — roʻyxatning **oxiriga** boshqa roʻyxatning elementlarini qoʻshadi. Yangi roʻyxat yasamaydi, nusxa olmaydi."
              ]
            },
            {
              "kind": "code",
              "code": "royxat = [1, 2]\nroyxat.extend([3, 4])\nprint(royxat)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[1, 2, 3, 4]"
            },
            {
              "kind": "text",
              "text": "Sinov — bir xil natija berishi shart:"
            },
            {
              "kind": "code",
              "code": "qism = normallashtir(\"\\n\".join(toza[:2000]))\n\nt0 = time.perf_counter()\na = encode_regex(qism, merges, NAQSH)\nt1 = time.perf_counter()\nb = encode_tez(qism, merges, NAQSH)\nt2 = time.perf_counter()\n\nprint(\"bir xilmi:\", a == b)\nprint(f\"encode_regex: {t1 - t0:.2f} soniya\")\nprint(f\"encode_tez:   {t2 - t1:.2f} soniya\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bir xilmi: True\nencode_regex: 2.12 soniya\nencode_tez:   0.23 soniya"
            },
            {
              "kind": "text",
              "text": "Endi butun korpus:"
            },
            {
              "kind": "code",
              "code": "t0 = time.perf_counter()\ntokenlar_hammasi = encode_tez(matn, merges, NAQSH)\n\nprint(f\"vaqt: {time.perf_counter() - t0:.1f} soniya\")\nprint(\"tokenlar:\", len(tokenlar_hammasi))\nprint(\"round-trip:\", decode(tokenlar_hammasi, vocab) == matn)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "vaqt: 6.1 soniya\ntokenlar: 1748128\nround-trip: True"
            },
            {
              "kind": "text",
              "text": "Bir million soʻz — bir necha soniyada. Va round-trip (Dars 14) — toʻgʻri."
            }
          ]
        },
        {
          "id": "10-fertility",
          "title": "10. Fertility",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 01 dagi oʻlchovimiz: **bitta soʻzga nechta token**."
            },
            {
              "kind": "code",
              "code": "sozlar_soni = len(matn.split())\nbaytlar = len(matn.encode(\"utf-8\"))\n\nprint(\"soʻzlar:\", sozlar_soni)\nprint(\"baytlar / soʻz:\", round(baytlar / sozlar_soni, 3))\nprint(\"tokenlar / soʻz:\", round(len(tokenlar_hammasi) / sozlar_soni, 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "soʻzlar: 981206\nbaytlar / soʻz: 8.161\ntokenlar / soʻz: 1.782"
            },
            {
              "kind": "text",
              "text": "Birlashtirishsiz (Dars 07 dagi \"har bir bayt — token\") bitta soʻzga 8 tadan ortiq token ketardi. 16 384 hajmli lugʻat bilan — **2 tadan kam**. Taxminan 4.6 barobar siqish."
            },
            {
              "kind": "text",
              "text": "(Bu yerda \"soʻz\" — boʻshliq bilan ajratilgan boʻlak. Har bir jumla oxiridagi nuqta va yangi qator ham token boʻladi, shuning uchun qisqa jumlalarda fertility biroz yuqoriroq chiqadi.)"
            },
            {
              "kind": "h3",
              "id": "lugat-hajmi-qancha-bolishi-kerak",
              "text": "Lugʻat hajmi qancha boʻlishi kerak?"
            },
            {
              "kind": "text",
              "text": "Birlashtirishlar tartib bilan oʻrganilgan. Demak birinchi 1 000 tasini olsak — bu 1 256 hajmli tokenizator. Turli hajmlarni solishtiramiz:"
            },
            {
              "kind": "code",
              "code": "for hajm in [1024, 2048, 4096, 8192, 16384]:\n    qisqa = {}\n    for juft in merges:\n        if merges[juft] < hajm:\n            qisqa[juft] = merges[juft]\n    t = encode_tez(matn, qisqa, NAQSH)\n    print(f\"{hajm:6d} | fertility: {len(t) / sozlar_soni:.3f}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "  1024 | fertility: 3.141\n  2048 | fertility: 2.652\n  4096 | fertility: 2.282\n  8192 | fertility: 1.998\n 16384 | fertility: 1.782"
            },
            {
              "kind": "text",
              "text": "Har safar lugʻat **ikki barobar** — lekin har safar yutuq **kamayib** boradi. 15.6% → 14.0% → 12.4% → 10.8% (Mashq 4 da hisoblaysiz). 16 384 dan keyin yana ikki barobar oshirsak, yutuq yanada kichik boʻladi — lekin model uchun har bir token qimmat (Kurs 2 da koʻrasiz). Mening haqiqiy tokenizatorim ham 16 384 hajmli."
            }
          ]
        },
        {
          "id": "11-muammo",
          "title": "11. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Bizda birinchi haqiqiy tokenizator bor: 16 384 token, bir million soʻzda oʻqitilgan, fertility — 2 dan kam."
            },
            {
              "kind": "text",
              "text": "Lekin bitta savol. Bu raqamni **qayerda** oʻlchadik?"
            },
            {
              "kind": "text",
              "text": "`matn` da. Tokenizatorni **oʻqitgan** matnimizda."
            },
            {
              "kind": "text",
              "text": "Bu — imtihon savollarini oldindan berib, keyin oʻsha savollardan imtihon olishga oʻxshaydi. 8-boʻlimdagi `Oʻzsanoatqurilishbank` ni eslang: tokenizator uni bitta token qilib **yodlab oldi** — chunki u shu matnda bor edi. Bizning fertility raqamimiz bunday \"yodlangan\" soʻzlarni ham oʻz ichiga oladi."
            },
            {
              "kind": "text",
              "text": "Tokenizator **koʻrmagan** matnda qanday ishlaydi? Farq kattami yoki kichikmi — buni taxmin qilmaymiz. **Oʻlchaymiz.**"
            },
            {
              "kind": "text",
              "text": "Va eng qiziqi: buni tekshirish uchun matnni ikkiga boʻlish kifoyami? Esingizdami — korpus **alifbo tartibida**. Va Dars 15 da biz dublikatlarni olib tashlashning **ikkinchi** sababini keyinga qoldirgan edik."
            },
            {
              "kind": "text",
              "text": "Keyingi dars — aynan shu haqida. Va u mening oʻz xatoyim bilan boshlanadi."
            }
          ]
        },
        {
          "id": "12-toliq-kod",
          "title": "12. Toʻliq kod",
          "blocks": [
            {
              "kind": "code",
              "code": "import re\nimport json\nimport time\nimport hashlib\nimport unicodedata\nimport urllib.request\n\nNAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\nOKINA = \"\\u02bb\"\nTUTUQ = \"\\u02bc\"\nAPOSTROFLAR = \"'\\u2018\\u2019`\\u02bb\\u02bc\"\nMANZIL = (\"https://raw.githubusercontent.com/common-voice/common-voice/\"\n          \"57f42edbf6f6d3b128e0bcd3f916360af0d328b6/server/data/uz/sentence-collector.txt\")\n\n\n# ---- Dars 06–13 ----\ndef kodla(matn):\n    return list(matn.encode(\"utf-8\"))\n\n\ndef merge(tokenlar, juftlik, yangi_id):\n    yangi = []\n    i = 0\n    while i < len(tokenlar):\n        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:\n            yangi.append(yangi_id)\n            i += 2\n        else:\n            yangi.append(tokenlar[i])\n            i += 1\n    return yangi\n\n\ndef decode(ids, vocab):\n    qismlar = []\n    for tid in ids:\n        qismlar.append(vocab[tid])\n    return b\"\".join(qismlar).decode(\"utf-8\", errors=\"replace\")\n\n\ndef encode_regex(matn, merges, naqsh):\n    natija = []\n    for bosh in re.findall(naqsh, matn):\n        tk = kodla(bosh)\n        while len(tk) >= 2:\n            stats = {}\n            for juft in zip(tk, tk[1:]):\n                stats[juft] = stats.get(juft, 0) + 1\n            eng_j = None\n            eng_r = float(\"inf\")\n            for j in stats:\n                r = merges.get(j, float(\"inf\"))\n                if r < eng_r:\n                    eng_r = r\n                    eng_j = j\n            if eng_j is None:\n                break\n            tk = merge(tk, eng_j, merges[eng_j])\n        natija = natija + tk\n    return natija\n\n\n# ---- Dars 14–15 ----\ndef normallashtir(matn):\n    matn = unicodedata.normalize(\"NFC\", matn)\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n            if oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n    return \"\".join(belgilar)\n\n\ndef kirill_ulushi(matn):\n    harflar = 0\n    kirill = 0\n    for belgi in matn:\n        if belgi.isalpha():\n            harflar += 1\n            if ord(belgi) >= 1024 and ord(belgi) <= 1279:\n                kirill += 1\n    if harflar == 0:\n        return 0\n    return kirill / harflar\n\n\ndef kalit(matn):\n    matn = normallashtir(matn)\n    matn = matn.lower()\n    matn = \" \".join(matn.split())\n    return hashlib.md5(matn.encode(\"utf-8\")).hexdigest()\n\n\n# ---- Dars 16 ----\ndef boshlar_sana(matn, naqsh):\n    hisob = {}\n    for b in re.findall(naqsh, matn):\n        hisob[b] = hisob.get(b, 0) + 1\n    return hisob\n\n\ndef eng_juft(stats):\n    eng_son = max(stats.values())\n    nomzodlar = []\n    for juft in stats:\n        if stats[juft] == eng_son:\n            nomzodlar.append(juft)\n    return min(nomzodlar)\n\n\ndef train_tez2(matn, vocab_size, naqsh):\n    hisob = boshlar_sana(matn, naqsh)\n    sozlar = []\n    sonlar = []\n    for b in hisob:\n        sozlar.append(kodla(b))\n        sonlar.append(hisob[b])\n\n    stats = {}\n    qayerda = {}\n    for i in range(len(sozlar)):\n        soz = sozlar[i]\n        for juft in zip(soz, soz[1:]):\n            stats[juft] = stats.get(juft, 0) + sonlar[i]\n            if juft not in qayerda:\n                qayerda[juft] = set()\n            qayerda[juft].add(i)\n\n    merges = {}\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n    tarix = []\n\n    for yangi_id in range(256, vocab_size):\n        if len(stats) == 0:\n            break\n        eng = eng_juft(stats)\n        tarix.append(stats[eng])\n\n        for i in qayerda[eng]:\n            eski = sozlar[i]\n            yangi = merge(eski, eng, yangi_id)\n            if len(yangi) == len(eski):\n                continue\n            for j in zip(eski, eski[1:]):\n                stats[j] -= sonlar[i]\n                if stats[j] == 0:\n                    del stats[j]\n            for j in zip(yangi, yangi[1:]):\n                stats[j] = stats.get(j, 0) + sonlar[i]\n                if j not in qayerda:\n                    qayerda[j] = set()\n                qayerda[j].add(i)\n            sozlar[i] = yangi\n\n        del qayerda[eng]\n        merges[eng] = yangi_id\n        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n\n    return merges, vocab, tarix\n\n\ndef encode_tez(matn, merges, naqsh):\n    kesh = {}\n    natija = []\n    for bosh in re.findall(naqsh, matn):\n        if bosh not in kesh:\n            kesh[bosh] = encode_regex(bosh, merges, naqsh)\n        natija.extend(kesh[bosh])\n    return natija\n\n\n# ---- 1. Yuklab olish va tozalash ----\nurllib.request.urlretrieve(MANZIL, \"uz_jumlalar.txt\")\nwith open(\"uz_jumlalar.txt\", encoding=\"utf-8\") as f:\n    jumlalar = f.read().split(\"\\n\")\n\ntoza = []\nkorilgan = set()\nfor j in jumlalar:\n    j = j.replace(\"\\u00ad\", \"\").replace(\"\\u200b\", \"\").strip()\n    if j == \"\" or kirill_ulushi(j) > 0.3:\n        continue\n    k = kalit(j)\n    if k in korilgan:\n        continue\n    korilgan.add(k)\n    toza.append(j)\n\nwith open(\"korpus.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"\\n\".join(toza))\nprint(\"jumlalar:\", len(toza))\n\n# ---- 2. Trening ----\nmatn = normallashtir(\"\\n\".join(toza))\nt0 = time.perf_counter()\nmerges, vocab, tarix = train_tez2(matn, 16384, NAQSH)\nprint(f\"trening: {(time.perf_counter() - t0) / 60:.1f} daqiqa\")\n\nroyxat = []\nfor juft in merges:\n    royxat.append([juft[0], juft[1], merges[juft]])\nwith open(\"merges_16k.json\", \"w\", encoding=\"utf-8\") as f:\n    f.write(json.dumps(royxat))\n\n# ---- 3. Oʻlchash ----\ntokenlar_hammasi = encode_tez(matn, merges, NAQSH)\nprint(\"round-trip:\", decode(tokenlar_hammasi, vocab) == matn)\nprint(\"fertility:\", round(len(tokenlar_hammasi) / len(matn.split()), 3))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "jumlalar: 148102\ntrening: 5.3 daqiqa\nround-trip: True\nfertility: 1.782",
              "label": "Kutilgan natija (vaqt sizda boshqacha boʻladi)"
            }
          ]
        },
        {
          "id": "13-ozingiz-yozing",
          "title": "13. Oʻzingiz yozing",
          "blocks": [
            {
              "kind": "text",
              "text": "`train_tez2` ning yuragi — tanlangan juftni birlashtirib, faqat tegilgan soʻzlarni yangilaydigan qism. Uni toʻldiring:"
            },
            {
              "kind": "code",
              "code": "for i in qayerda[eng]:\n    eski = sozlar[i]\n    yangi = ___(eski, eng, yangi_id)\n    if len(yangi) == len(eski):\n        ___\n    for j in zip(eski, eski[1:]):\n        stats[j] ___ sonlar[i]\n        if stats[j] == 0:\n            ___ stats[j]\n    for j in zip(yangi, yangi[1:]):\n        stats[j] = stats.___(j, 0) + sonlar[i]\n        if j not in qayerda:\n            qayerda[j] = ___()\n        qayerda[j].___(i)\n    sozlar[i] = ___",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni koʻrsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "# train_tez2 ichidagi qism\nfor i in qayerda[eng]:\n    eski = sozlar[i]\n    yangi = merge(eski, eng, yangi_id)\n    if len(yangi) == len(eski):\n        continue\n    for j in zip(eski, eski[1:]):\n        stats[j] -= sonlar[i]\n        if stats[j] == 0:\n            del stats[j]\n    for j in zip(yangi, yangi[1:]):\n        stats[j] = stats.get(j, 0) + sonlar[i]\n        if j not in qayerda:\n            qayerda[j] = set()\n        qayerda[j].add(i)\n    sozlar[i] = yangi",
                  "lang": "py",
                  "mode": "static"
                },
                {
                  "kind": "text",
                  "text": "Tekshirish uchun — 6-boʻlimdagi sinov: `train_tez1` va `train_tez2` ning natijalari bir xil boʻlishi kerak."
                },
                {
                  "kind": "text",
                  "text": "Eng koʻp qilinadigan xatolar:"
                },
                {
                  "kind": "steps",
                  "items": [
                    "`-=` oʻrniga `-= 1` — soʻz necha marta uchragan boʻlsa, shuncha ayirish kerak. Natija: `stats` asta-sekin notoʻgʻri boʻlib boradi, va sinov bir necha oʻn qadamdan keyin buziladi.",
                    "`qayerda[j] = set()` ni har safar yozish (`if` siz) — oldingi soʻzlar roʻyxati oʻchib ketadi. Keyingi birlashtirishlar baʼzi soʻzlarga **tegmay** qoladi.",
                    "`sozlar[i] = yangi` ni unutish — soʻz oʻzgarmaydi, keyingi qadamda yana eski juftlar ayiriladi va `stats` manfiy sonlarga tushadi."
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "14-mashqlar",
          "title": "14. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Ishga tushirmasdan ayting: `boshlar_sana(\" va va bilan va\", NAQSH)` nima qaytaradi?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "print(boshlar_sana(\" va va bilan va\", NAQSH))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "{' va': 3, ' bilan': 1}"
                  },
                  {
                    "kind": "text",
                    "text": "Regex `\" ?\\w+\"` — boʻshliq **soʻz bilan birga** olinadi (Dars 13). Shuning uchun\nboʻlaklar: ` va`, ` va`, ` bilan`, ` va`. Noyoblari — ikkita. ` va` — 3 marta."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`encode_tez` ning kesh i qanchalik foydali? Butun korpusda `encode_regex` necha marta chaqiriladi, va kesh necha marta ishga tushadi?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "jami = len(re.findall(NAQSH, matn))\nnoyob = len(boshlar_sana(matn, NAQSH))\n\nprint(\"boʻlaklar:\", jami)\nprint(\"encode_regex chaqiriladi:\", noyob)\nprint(f\"keshdan olinadi: {jami - noyob} ({(jami - noyob) / jami:.1%})\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "boʻlaklar: 1331204\nencode_regex chaqiriladi: 153567\nkeshdan olinadi: 1177637 (88.5%)"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`:.1%` — f-satrda sonni **foiz** qilib, bir xona aniqlikda chiqaradi."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Har 10 ta boʻlakdan 9 tasi — keshdan. Bu tasodif emas. Tilda bir necha yuz soʻz (` va`, ` bilan`, ` bu`, `.`) matnning katta qismini tashkil qiladi — 5-boʻlimdagi roʻyxatni eslang. Har qanday tilda shunday. Kesh aynan shu notekislikdan foyda oladi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`tarix` roʻyxatidan foydalanib toping: nechanchi birlashtirishdan boshlab tanlangan juft **100 martadan kam** uchraydi? Bu nimani anglatadi?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "for k in range(len(tarix)):\n    if tarix[k] < 100:\n        print(f\"{k + 1}-birlashtirish: {tarix[k]} marta\")\n        break\n\nkam = 0\nfor son in tarix:\n    if son < 100:\n        kam += 1\nprint(\"100 dan kam:\", kam, \"ta birlashtirish\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "4199-birlashtirish: 99 marta\n100 dan kam: 11930 ta birlashtirish"
                  },
                  {
                    "kind": "text",
                    "text": "4 199-birlashtirishdan boshlab — hammasi 100 martadan kam. 16 128 tadan **11 930 tasi** — 74%. Lugʻatning katta qismi — korpusda 100 martadan kam uchragan juftlar. Bir million soʻzda 100 marta — bu har 10 000 soʻzda bir marta."
                  },
                  {
                    "kind": "text",
                    "text": "Bunday tokenlar xavfli tomonga ogʻishi mumkin: ular **shu korpusdagi** kamyob soʻzlarni yodlaydi (`Oʻzsanoatqurilishbank`). Boshqa matnda ular deyarli ishlatilmaydi. Bu Dars 17 ning savoliga bogʻlanadi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "10-boʻlimdagi jadvaldan: lugʻat har ikki barobar oshganda fertility necha foizga kamaydi? Qaysi qadamda yutuq eng kichik?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "oldingi = None\nfor hajm in [1024, 2048, 4096, 8192, 16384]:\n    qisqa = {}\n    for juft in merges:\n        if merges[juft] < hajm:\n            qisqa[juft] = merges[juft]\n    f = len(encode_tez(matn, qisqa, NAQSH)) / sozlar_soni\n    if oldingi is None:\n        print(f\"{hajm:6d} | {f:.3f}\")\n    else:\n        print(f\"{hajm:6d} | {f:.3f} | {(oldingi - f) / oldingi:.1%} kamaydi\")\n    oldingi = f",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "  1024 | 3.141\n  2048 | 2.652 | 15.6% kamaydi\n  4096 | 2.282 | 14.0% kamaydi\n  8192 | 1.998 | 12.4% kamaydi\n 16384 | 1.782 | 10.8% kamaydi"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`oldingi is None` — \"hali oldingi qiymat yoʻqmi?\" (`None` — Dars 12 dagi `eng_j = None` kabi)."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Har ikki barobarda yutuq kichrayib boradi. Bu — **kamayuvchi qaytim**: lugʻatga qoʻshilgan har bir yangi token avvalgisidan kamroq uchraydigan narsani ifodalaydi (Mashq 3)."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "3-boʻlimda 0 dan katta, lekin 0.3 dan kichik kirill ulushiga ega jumlalarni qoldirdik. Ulardan biri:"
                },
                {
                  "kind": "pre",
                  "text": "Eshikdan chiqayotib, Аzizaning yalt etgan hurkak nigohini sezdi."
                },
                {
                  "kind": "text",
                  "text": "Bu jumlada nima gʻalati? Koʻz bilan topib boʻlmaydi — kod bilan toping. Keyin bunday jumlalar korpusda nechta ekanini sanang va tokenizatorimiz `Аzizaning` ni qanday kodlashini koʻring."
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "jumla = \"Eshikdan chiqayotib, \\u0410zizaning yalt etgan hurkak nigohini sezdi.\"\n\nfor belgi in jumla:\n    if ord(belgi) >= 1024 and ord(belgi) <= 1279:\n        print(repr(belgi), ord(belgi), unicodedata.name(belgi))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "'А' 1040 CYRILLIC CAPITAL LETTER A"
                  },
                  {
                    "kind": "text",
                    "text": "`Аzizaning` dagi birinchi harf — lotincha `A` (65) emas, **kirillcha** `А` (1040). Koʻzga — aynan bir xil. Bunday harflar **gomoglif** deyiladi: shakli bir xil, raqami boshqa. Odamlar ikki tilli klaviaturada yozganda tez-tez uchraydi."
                  },
                  {
                    "kind": "text",
                    "text": "Korpusda nechta?"
                  },
                  {
                    "kind": "code",
                    "code": "lotin_ichida = 0\nfor j in toza:\n    for i in range(1, len(j) - 1):\n        oldingi = j[i - 1]\n        keyingi = j[i + 1]\n        if (ord(j[i]) >= 1024 and ord(j[i]) <= 1279\n                and oldingi.isascii() and oldingi.isalpha()\n                and keyingi.isascii() and keyingi.isalpha()):\n            lotin_ichida += 1\n            break\nprint(\"lotin soʻz ichida kirill harfi bor jumlalar:\", lotin_ichida)\n\nfor s in [\"\\u0410zizaning\", \"Azizaning\"]:\n    t = encode_tez(normallashtir(\" \" + s), merges, NAQSH)\n    qismlar = []\n    for x in t:\n        qismlar.append(decode([x], vocab))\n    print(repr(s), len(t), \"token:\", qismlar)\n\nkirill_tokenlar = []\nfor tid in range(256, len(vocab)):\n    t = decode([tid], vocab)\n    if kirill_ulushi(t) > 0:\n        kirill_tokenlar.append(t)\nprint(\"lugʻatdagi kirill tokenlar:\", kirill_tokenlar)",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "lotin soʻz ichida kirill harfi bor jumlalar: 34\n'Аzizaning' 3 token: [' А', 'ziz', 'aning']\n'Azizaning' 3 token: [' A', 'ziz', 'aning']\nlugʻatdagi kirill tokenlar: ['А', ' А', ' Аmir']"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`.isascii()` — belgi oddiy lotin klaviaturasidagi (0–127) belgimi?",
                      "Uzun shart qavs ichida bir necha qatorga boʻlingan — Python qavs ichida qator koʻchishiga ruxsat beradi.",
                      "Bizning sanoq faqat soʻz **ichidagi** gomogliflarni topadi (ikki tomonida lotin harfi). `Аzizaning` dagi kabi soʻz **boshidagilari** ham bor — ularni sanash uchun shartni kengaytirish kerak. Sinab koʻring."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "Token soni bir xil — lekin tokenlar **boshqa**: ` А` va ` A`. Model uchun `Аziza` va `Aziza` — ikki xil ism, va u ularni bir-biriga bogʻlay olmaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Oxirgi qatorga qarang: lugʻatda **uchta** kirill token bor — `А`, ` А` va **` Аmir`**. Amir Temur haqidagi jumlalarda kimdir `А` ni kirillcha yozgan — va bu xato shunchalik koʻp takrorlanganki, 16 384 ta joydan biri unga ketdi."
                  },
                  {
                    "kind": "text",
                    "text": "**Tuzatish** — Dars 14 dagi kabi normalizatsiya: lotin harflari orasidagi kirillcha `А`, `о`, `е`, `с`, `р` … ni lotinchasiga almashtirish. Lekin ehtiyot boʻling: rus tilidagi iqtibos ichidagi harflarga tegmaslik kerak (Dars 15 dagi `«Спасибо всем!»`). Shuning uchun qoida harfning **atrofiga** qarashi kerak — xuddi apostrof qoidasidek."
                  },
                  {
                    "kind": "text",
                    "text": "Bu mashqning saboqi: tozalash hech qachon tugamaydi. Har safar korpusga yangi koʻz bilan qarasangiz — yangi narsa topasiz."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "15-xulosa",
          "title": "15. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "**Common Voice** — 148 391 ta oʻzbekcha jumla, **CC0**. Versiya raqami bilan yuklab olsangiz — hammada bir xil fayl, bir xil raqamlar.",
                "Bu korpusda ham `‘` — eng koʻp apostrof. Normalizatsiyadan keyin yana **283** dublikat chiqdi.",
                "**Koʻrinmas belgilar** (`\\u00ad`, `\\u200b`) — haqiqatan koʻrinmas devor. Oʻchiriladi.",
                "`train_regex` butun korpusda — **17 soatdan ortiq**.",
                "**Behuda ish №1:** bir xil boʻlaklarni qayta-qayta sanash. Yechim — noyob boʻlak + soni. 1.33 mln → 153 ming.",
                "**Behuda ish №2:** har qadamda hamma soʻzni qayta sanash. Yechim — `qayerda` indeksi va faqat **tegilgan** soʻzlarni yangilash.",
                "Tez versiya **aynan bir xil** natija berishi kerak — buni sinov bilan isbotlang.",
                "**Durang** — tasodifiy tartibga bogʻliq. Qoidani aniq yozing: eng koʻp; teng boʻlsa — raqami kichigi.",
                "Kodlash ham: `natija + tk` → `.extend`, va **kesh**.",
                "16 384 token, fertility — 2 dan kam. Lekin bu raqam **oʻqitilgan matnda** oʻlchangan."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "**Dars 17 — Halol baholash: ifloslanish.** Tokenizatorni koʻrmagan matnda qanday oʻlchash kerak? Matnni ikkiga qanday boʻlish kerak — va nima uchun alifbo tartibidagi korpusni \"boshidan 90%\" deb boʻlish xato? Va men oʻz modelimni solishtirganda qilgan xato — test matnim trening matni ichida boʻlib chiqqani."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *agar tokenizatorni oʻqitgan matnimizda emas, boshqa matnda oʻlchasak, fertility yaxshilanadimi yoki yomonlashadimi — va qanchaga?*"
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–15. `kodla`, `merge`, `decode`, `train_regex`, `encode_regex`, `NAQSH` (Dars 06–13), `normallashtir` (Dars 14), `kirill_ulushi`, `kalit` (Dars 15)"
    },
    {
      "id": "dars-17",
      "n": 17,
      "title": "Halol baholash: ifloslanish",
      "subtitle": "",
      "minutes": 80,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**tushunasiz** nima uchun oʻqitgan matningizda oʻlchangan raqam ishonchsiz;",
                "**boʻlasiz** korpusni `train` va `test` ga — toʻgʻri vaqtda va toʻgʻri usulda;",
                "**koʻrasiz** alifbo tartibidagi korpusni \"oxirgi 10%\" deb boʻlish nimaga olib kelishini;",
                "**tekshirasiz** test matnini trening ichidan qidirib — va bu tekshiruv qachon aldashini;",
                "**oʻlchaysiz** test matnining **imlosi** solishtiruvni qanday oʻzgartirishini;",
                "**yozasiz** boshqalar (va olti oydan keyin oʻzingiz) tekshira oladigan hisobot."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 16 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Agar tokenizatorni oʻqitgan matnimizda emas, boshqa matnda oʻlchasak, fertility yaxshilanadimi yoki yomonlashadimi — va qanchaga?"
            },
            {
              "kind": "text",
              "text": "Bu darsda unga javob beramiz. Lekin avval — nima uchun bu savol men uchun shaxsiy."
            }
          ]
        },
        {
          "id": "2-mening-xatoyim",
          "title": "2. Mening xatoyim",
          "blocks": [
            {
              "kind": "text",
              "text": "Men oʻzbek tili uchun tokenizator va kichkina til modeli qurdim, keyin ularni boshqalari bilan solishtirdim: GPT-4o, mGPT, XLM-R va boshqalar. Raqamlarni oʻlchadim, jadvallar tuzdim, maqola yozdim."
            },
            {
              "kind": "text",
              "text": "Keyin, butunlay boshqa narsani tuzatayotib, oʻzimga oddiy savol berdim: **mening test matnim haqiqatan \"koʻrilmagan\"mi?**"
            },
            {
              "kind": "text",
              "text": "Javob — yoʻq. Va bitta xato emas, uchta."
            },
            {
              "kind": "h3",
              "id": "1-xato-test-trening-matnining-boshi",
              "text": "1-xato: test — trening matnining boshi"
            },
            {
              "kind": "text",
              "text": "Test toʻplamini korpusning **birinchi 200 000 soʻzidan** olgan edim. Lekin korpus trening va validatsiyaga **joylashuv boʻyicha** boʻlingan edi: birinchi 90% — trening. Demak mening \"testim\" — trening matnining **boshi** edi."
            },
            {
              "kind": "text",
              "text": "Tekshirdim: testdan 32 tokenli 12 ta parcha olib, trening faylidan qidirdim. **12 tadan 11 tasi** u yerda bor edi — xuddi oʻsha joylarda. Model imtihon savollarini oldindan koʻrgan edi."
            },
            {
              "kind": "media",
              "id": "p1",
              "title": "12 tadan 11 tasi"
            },
            {
              "kind": "h3",
              "id": "2-xato-internet-ozini-takrorlaydi",
              "text": "2-xato: internet oʻzini takrorlaydi"
            },
            {
              "kind": "text",
              "text": "Testni validatsiya qismidan oldim. Endi toza boʻlishi kerak edi. Lekin 16 ta parchadan **6 tasi** baribir trening ichida topildi — har xil joylarda. Sababi — Dars 15 da koʻrganimiz: internetda bir xil sahifa koʻp marta uchraydi."
            },
            {
              "kind": "text",
              "text": "Shunda trening matnining **har bir 24 tokenli oynasiga** barmoq izi yasadim — 27.4 million iz. Validatsiya hujjatlarini birma-bir tekshirdim: bitta ham umumiy izi boʻlsa — tashladim. **780 hujjatdan 306 tasi — 39.2% — tashlandi.** 474 tasi qoldi."
            },
            {
              "kind": "text",
              "text": "Va mustaqil tekshiruv: qolgan hujjatlardan 16 ta parcha — trening ichida **bittasi ham** topilmadi."
            },
            {
              "kind": "h3",
              "id": "3-xato-test-matni-mening-imlomda-edi",
              "text": "3-xato: test matni mening imlomda edi"
            },
            {
              "kind": "text",
              "text": "Dars 14 da \"bu xatoni men oʻzim qilganman\" degan edim. Mana u."
            },
            {
              "kind": "text",
              "text": "Validatsiya fayli matnni **mening normalizatorimdan oʻtgan** holda saqlagan edi. Demak test hujjatlaridagi hamma apostroflar — mening tokenizatorim yaxshi koʻradigan shaklda. Boshqa tokenizatorlar esa internetdagi imloda oʻrgangan."
            },
            {
              "kind": "text",
              "text": "Haqiqiy internet nusxasini FineWeb-2 dan tikladim. U 474 hujjatda `oʻ` va `gʻ` dagi belgilar mana bunday yozilgan ekan:"
            },
            {
              "kind": "table",
              "head": [
                "Belgi",
                "Ulushi"
              ],
              "rows": [
                [
                  "`'`",
                  "70%"
                ],
                [
                  "`‘`",
                  "19%"
                ],
                [
                  "`’`",
                  "6%"
                ],
                [
                  "`ʻ` (toʻgʻri)",
                  "**5%**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Mening testimda esa — 100% `ʻ`. Uy maydonida oʻynagan ekanman."
            },
            {
              "kind": "h3",
              "id": "natija",
              "text": "Natija"
            },
            {
              "kind": "text",
              "text": "Hammasini toza test matnida, asl internet imlosida qayta oʻlchadim. Mana tokenizatorlar jadvali — 474 hujjat, 200 818 soʻz:"
            },
            {
              "kind": "table",
              "head": [
                "Tokenizator",
                "Lugʻat",
                "Fertility ↓"
              ],
              "rows": [
                [
                  "**uzbek-bpe-16k** (meniki)",
                  "16 384",
                  "**1.749**"
                ],
                [
                  "XLM-RoBERTa",
                  "250 002",
                  "2.218"
                ],
                [
                  "GPT-4o",
                  "200 019",
                  "2.578"
                ],
                [
                  "mGPT",
                  "100 000",
                  "3.159"
                ],
                [
                  "GPT-2",
                  "50 257",
                  "3.426"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Tartib oʻzgarmadi. Lekin endi **bu raqamlarga ishonsa boʻladi**."
            },
            {
              "kind": "text",
              "text": "Eng katta zarba esa modelga tushdi. mGPT modelini oʻzbek matnida qoʻshimcha oʻqitish (*fine-tuning*) eski, ifloslangan testda **katta foyda** bergandek koʻringan edi. Toza testda — **deyarli hech qanday**: 0.041 dan 0.003 ga tushdi. Chunki uning oʻqitish matni ham eski test bilan ustma-ust tushgan ekan. Bu raqamlar nimani anglatishini Kurs 2 da koʻrasiz. Hozircha muhimi: **xulosam notoʻgʻri edi**, va buni hech kim sezmasdi."
            },
            {
              "kind": "text",
              "text": "Bu darsda uchala xatoni **oʻz kompyuteringizda** qaytarasiz — va har birini tuzatasiz."
            }
          ]
        },
        {
          "id": "3-qoida",
          "title": "3. Qoida",
          "blocks": [
            {
              "kind": "note",
              "tone": "key",
              "text": "**Tokenizatorni (yoki modelni) oʻqitgan matningizda baholasangiz, olgan raqamingiz yolgʻon boʻladi.**"
            },
            {
              "kind": "text",
              "text": "Toʻgʻri tartib:"
            },
            {
              "kind": "pre",
              "text": "tozalash  →  boʻlish  →  oʻqitish (faqat train)  →  baholash (faqat test)"
            },
            {
              "kind": "text",
              "text": "Test — **muhrlangan konvert**. Uni boʻlgandan keyin oʻqitishda ham, sozlashda ham ishlatmaysiz. Faqat oxirida, bir marta — oʻlchash uchun."
            },
            {
              "kind": "text",
              "text": "Dars 16 da biz bu qoidani buzdik: tokenizatorni **butun** korpusda oʻqitdik va fertility ni oʻsha korpusda oʻlchadik. Konvert ochilgan edi. Endi boshidan boshlaymiz — toʻgʻri tartibda."
            },
            {
              "kind": "media",
              "id": "p2",
              "title": "Muhrlangan konvert"
            }
          ]
        },
        {
          "id": "4-tayyorgarlik",
          "title": "4. Tayyorgarlik",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 16 dagi funksiyalar va tozalangan korpus kerak. Agar Colab sessiyangiz yangi boʻlsa — quyidagi katakni ishga tushiring: u funksiyalarni yaratadi va korpusni qaytadan yuklab, tozalaydi."
            },
            {
              "kind": "reveal",
              "summary": "Dars 14–16 dagi kod (ochib, nusxa qiling)",
              "blocks": [
                {
                  "kind": "code",
                  "code": "import re\nimport json\nimport time\nimport random\nimport hashlib\nimport unicodedata\nimport urllib.request\n\nNAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\nOKINA = \"\\u02bb\"\nTUTUQ = \"\\u02bc\"\nAPOSTROFLAR = \"'\\u2018\\u2019`\\u02bb\\u02bc\"\nMANZIL = (\"https://raw.githubusercontent.com/common-voice/common-voice/\"\n          \"57f42edbf6f6d3b128e0bcd3f916360af0d328b6/server/data/uz/sentence-collector.txt\")\n\n\ndef kodla(matn):\n    return list(matn.encode(\"utf-8\"))\n\n\ndef merge(tokenlar, juftlik, yangi_id):\n    yangi = []\n    i = 0\n    while i < len(tokenlar):\n        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:\n            yangi.append(yangi_id)\n            i += 2\n        else:\n            yangi.append(tokenlar[i])\n            i += 1\n    return yangi\n\n\ndef decode(ids, vocab):\n    qismlar = []\n    for tid in ids:\n        qismlar.append(vocab[tid])\n    return b\"\".join(qismlar).decode(\"utf-8\", errors=\"replace\")\n\n\ndef encode_regex(matn, merges, naqsh):\n    natija = []\n    for bosh in re.findall(naqsh, matn):\n        tk = kodla(bosh)\n        while len(tk) >= 2:\n            stats = {}\n            for juft in zip(tk, tk[1:]):\n                stats[juft] = stats.get(juft, 0) + 1\n            eng_j = None\n            eng_r = float(\"inf\")\n            for j in stats:\n                r = merges.get(j, float(\"inf\"))\n                if r < eng_r:\n                    eng_r = r\n                    eng_j = j\n            if eng_j is None:\n                break\n            tk = merge(tk, eng_j, merges[eng_j])\n        natija = natija + tk\n    return natija\n\n\ndef normallashtir(matn):\n    matn = unicodedata.normalize(\"NFC\", matn)\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n            if oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n    return \"\".join(belgilar)\n\n\ndef kirill_ulushi(matn):\n    harflar = 0\n    kirill = 0\n    for belgi in matn:\n        if belgi.isalpha():\n            harflar += 1\n            if ord(belgi) >= 1024 and ord(belgi) <= 1279:\n                kirill += 1\n    if harflar == 0:\n        return 0\n    return kirill / harflar\n\n\ndef kalit(matn):\n    matn = normallashtir(matn)\n    matn = matn.lower()\n    matn = \" \".join(matn.split())\n    return hashlib.md5(matn.encode(\"utf-8\")).hexdigest()\n\n\ndef ngrammalar(matn, n=5):\n    sozlar = normallashtir(matn).lower().split()\n    natija = set()\n    for i in range(len(sozlar) - n + 1):\n        natija.add(\" \".join(sozlar[i:i + n]))\n    return natija\n\n\ndef boshlar_sana(matn, naqsh):\n    hisob = {}\n    for b in re.findall(naqsh, matn):\n        hisob[b] = hisob.get(b, 0) + 1\n    return hisob\n\n\ndef eng_juft(stats):\n    eng_son = max(stats.values())\n    nomzodlar = []\n    for juft in stats:\n        if stats[juft] == eng_son:\n            nomzodlar.append(juft)\n    return min(nomzodlar)\n\n\ndef train_tez2(matn, vocab_size, naqsh):\n    hisob = boshlar_sana(matn, naqsh)\n    sozlar = []\n    sonlar = []\n    for b in hisob:\n        sozlar.append(kodla(b))\n        sonlar.append(hisob[b])\n\n    stats = {}\n    qayerda = {}\n    for i in range(len(sozlar)):\n        soz = sozlar[i]\n        for juft in zip(soz, soz[1:]):\n            stats[juft] = stats.get(juft, 0) + sonlar[i]\n            if juft not in qayerda:\n                qayerda[juft] = set()\n            qayerda[juft].add(i)\n\n    merges = {}\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n    tarix = []\n\n    for yangi_id in range(256, vocab_size):\n        if len(stats) == 0:\n            break\n        eng = eng_juft(stats)\n        tarix.append(stats[eng])\n        for i in qayerda[eng]:\n            eski = sozlar[i]\n            yangi = merge(eski, eng, yangi_id)\n            if len(yangi) == len(eski):\n                continue\n            for j in zip(eski, eski[1:]):\n                stats[j] -= sonlar[i]\n                if stats[j] == 0:\n                    del stats[j]\n            for j in zip(yangi, yangi[1:]):\n                stats[j] = stats.get(j, 0) + sonlar[i]\n                if j not in qayerda:\n                    qayerda[j] = set()\n                qayerda[j].add(i)\n            sozlar[i] = yangi\n        del qayerda[eng]\n        merges[eng] = yangi_id\n        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n\n    return merges, vocab, tarix\n\n\ndef encode_tez(matn, merges, naqsh):\n    kesh = {}\n    natija = []\n    for bosh in re.findall(naqsh, matn):\n        if bosh not in kesh:\n            kesh[bosh] = encode_regex(bosh, merges, naqsh)\n        natija.extend(kesh[bosh])\n    return natija\n\n\n# ---- korpus (Dars 16, 3-boʻlim) ----\nurllib.request.urlretrieve(MANZIL, \"uz_jumlalar.txt\")\nwith open(\"uz_jumlalar.txt\", encoding=\"utf-8\") as f:\n    jumlalar = f.read().split(\"\\n\")\n\ntoza = []\nkorilgan = set()\nfor j in jumlalar:\n    j = j.replace(\"\\u00ad\", \"\").replace(\"\\u200b\", \"\").strip()\n    if j == \"\" or kirill_ulushi(j) > 0.3:\n        continue\n    k = kalit(j)\n    if k in korilgan:\n        continue\n    korilgan.add(k)\n    toza.append(j)\n\nwith open(\"korpus.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"\\n\".join(toza))\nprint(\"tayyor:\", len(toza), \"ta jumla\")",
                  "lang": "python",
                  "mode": "copy"
                },
                {
                  "kind": "output",
                  "text": "tayyor: 148102 ta jumla"
                }
              ]
            },
            {
              "kind": "text",
              "text": "Korpusni oʻqiymiz:"
            },
            {
              "kind": "code",
              "code": "with open(\"korpus.txt\", encoding=\"utf-8\") as f:\n    korpus = f.read().split(\"\\n\")\n\nprint(\"jumlalar:\", len(korpus))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "jumlalar: 148102"
            },
            {
              "kind": "text",
              "text": "Bitta yangi funksiya kerak — fertility ni oʻlchaydigan:"
            },
            {
              "kind": "code",
              "code": "def fertility(jumlalar, merges):\n    matn = normallashtir(\"\\n\".join(jumlalar))\n    tokenlar = encode_tez(matn, merges, NAQSH)\n    return len(tokenlar) / len(matn.split())",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Dars 16 dagi hisob — faqat funksiyaga oʻralgan: jumlalarni birlashtirib, normallashtirib, kodlaydi va **token / soʻz** ni qaytaradi."
            }
          ]
        },
        {
          "id": "5-qanday-bolish-kerak",
          "title": "5. Qanday boʻlish kerak?",
          "blocks": [
            {
              "kind": "h3",
              "id": "birinchi-urinish-joylashuv-boyicha",
              "text": "Birinchi urinish: joylashuv boʻyicha"
            },
            {
              "kind": "text",
              "text": "Eng oddiy gʻoya — mening 1-xatoyimga olib kelgan gʻoya: birinchi 90% — train, oxirgi 10% — test."
            },
            {
              "kind": "code",
              "code": "chegara = int(len(korpus) * 0.9)\n\ntrain_joy = korpus[:chegara]\ntest_joy = korpus[chegara:]\n\nprint(\"train:\", len(train_joy), \"| test:\", len(test_joy))\nprint(\"test boshi:\", repr(test_joy[0][:45]))\nprint(\"test oxiri:\", repr(test_joy[-1][:45]))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "train: 133291 | test: 14811\ntest boshi: '— Asfalosofilinda turkiy tuzemetslar uchun ta'\ntest oxiri: '\\uf0d8 yagona interaktiv davlat xizmatlari portali'"
            },
            {
              "kind": "bullets",
              "items": [
                "`int(...)` — sonning **butun** qismi: `int(13329.8)` → `13329`. Roʻyxat indeksi kasr boʻla olmaydi."
              ]
            },
            {
              "kind": "text",
              "text": "Test `—` bilan boshlanadi. Nima uchun? Dars 16 ni eslang: korpus **alifbo tartibida**. Oxirgi 10% — alifbodan keyin keladigan belgilar bilan boshlangan jumlalar. Test qismidagi jumlalar qaysi belgi bilan boshlanadi — sanaymiz:"
            },
            {
              "kind": "code",
              "code": "boshlar = {}\nfor j in test_joy:\n    boshlar[j[0]] = boshlar.get(j[0], 0) + 1\n\nfor b in sorted(boshlar, key=boshlar.get, reverse=True)[:5]:\n    print(repr(b), boshlar[b])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'•' 7908\n'—' 5357\n'“' 1491\n'…' 37\n'„' 5"
            },
            {
              "kind": "text",
              "text": "Test qismi — deyarli butunlay **maqollar** (`•` bilan boshlangan roʻyxat) va **dialoglar** (`—`). Train qismida esa maqollar umuman yoʻq — hammasi oxiriga tushgan. Biz tokenizatorni yangiliklar va hikoyalarda oʻqitib, maqollarda imtihon olgan boʻlardik."
            },
            {
              "kind": "text",
              "text": "Bu ifloslanish emas — buning teskarisi. Lekin xulosa bir xil: **raqam yolgʻon**. Faqat bu safar u qaysi tomonga yolgʻon gapirishini bilmaymiz."
            },
            {
              "kind": "text",
              "text": "Mening holatimda yana yomonroq boʻlgan: test **boshidan** olingan, trening ham **boshidan**. Ikkalasi ustma-ust tushgan."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Fayl tartibiga hech qachon ishonmang.** Alifbo, sana, sayt — har qanday tartib boʻlishi mumkin. Boʻlishdan oldin — aralashtiring."
            },
            {
              "kind": "h3",
              "id": "random-tasodifiy-aralashtirish",
              "text": "`random` — tasodifiy aralashtirish"
            },
            {
              "kind": "text",
              "text": "Python'da tasodif bilan ishlaydigan modul — `random`:"
            },
            {
              "kind": "code",
              "code": "import random\n\nrandom.seed(42)\nsonlar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nrandom.shuffle(sonlar)\nprint(sonlar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[8, 4, 3, 9, 6, 7, 10, 5, 1, 2]"
            },
            {
              "kind": "bullets",
              "items": [
                "`random.shuffle(roʻyxat)` — roʻyxatni **joyida** aralashtiradi (yangi roʻyxat qaytarmaydi).",
                "`random.seed(42)` — tasodifning **urugʻi**. Kompyuterning \"tasodifi\" aslida formula: bir xil urugʻdan — har doim bir xil ketma-ketlik."
              ]
            },
            {
              "kind": "text",
              "text": "Tekshiramiz — oʻsha urugʻ, oʻsha natija:"
            },
            {
              "kind": "code",
              "code": "random.seed(42)\nsonlar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nrandom.shuffle(sonlar)\nprint(sonlar)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[8, 4, 3, 9, 6, 7, 10, 5, 1, 2]"
            },
            {
              "kind": "text",
              "text": "Aynan bir xil. Nima uchun bu muhim? Chunki boʻlinishni **yozib qoʻyishimiz** kerak. \"Tasodifiy boʻldim\" — tekshirib boʻlmaydigan gap. \"`random.seed(0)` bilan aralashtirib, 90/10 boʻldim\" — har kim qaytara oladigan gap."
            },
            {
              "kind": "text",
              "text": "Uchinchi funksiya — `random.sample`: roʻyxatdan tasodifiy bir nechtasini oladi (roʻyxatning oʻziga tegmaydi):"
            },
            {
              "kind": "code",
              "code": "random.seed(7)\nprint(random.sample([\"olma\", \"nok\", \"uzum\", \"anor\", \"behi\"], 2))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['uzum', 'nok']"
            },
            {
              "kind": "h3",
              "id": "togri-bolish",
              "text": "Toʻgʻri boʻlish"
            },
            {
              "kind": "code",
              "code": "aralash = list(korpus)\nrandom.seed(0)\nrandom.shuffle(aralash)\n\ntrain = aralash[:chegara]\ntest = aralash[chegara:]\n\nprint(\"train:\", len(train), \"| test:\", len(test))\nprint(\"test boshi:\", repr(test[0][:45]))\n\nboshlar = {}\nfor j in test:\n    boshlar[j[0]] = boshlar.get(j[0], 0) + 1\nfor b in sorted(boshlar, key=boshlar.get, reverse=True)[:5]:\n    print(repr(b), boshlar[b])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "train: 133291 | test: 14811\ntest boshi: 'Jahonga sochilgan durdonalar'\n'B' 1530\n'S' 1138\n'O' 1027\n'A' 797\n'M' 790"
            },
            {
              "kind": "bullets",
              "items": [
                "`list(korpus)` — roʻyxatning **nusxasi**. `random.shuffle` roʻyxatni joyida oʻzgartiradi; nusxa olmasak, `korpus` ning oʻzi aralashib ketardi."
              ]
            },
            {
              "kind": "text",
              "text": "Endi test qismi — korpusning kichik nusxasi: `B`, `S`, `O` bilan boshlangan oddiy jumlalar koʻp, maqollar va dialoglar esa oʻz ulushida."
            },
            {
              "kind": "text",
              "text": "Ikkala qismni faylga yozamiz:"
            },
            {
              "kind": "code",
              "code": "with open(\"train.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"\\n\".join(train))\nwith open(\"test.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"\\n\".join(test))\n\nprint(\"saqlandi\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "saqlandi"
            },
            {
              "kind": "text",
              "text": "**`test.txt` — muhrlangan konvert.** Uni 8-boʻlimgacha ochmaymiz."
            }
          ]
        },
        {
          "id": "6-oqitamiz-faqat-trainda",
          "title": "6. Oʻqitamiz — faqat train'da",
          "blocks": [
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu katak Dars 16 dagidek bir necha daqiqa ishlaydi."
            },
            {
              "kind": "code",
              "code": "t0 = time.perf_counter()\nmerges, vocab, tarix = train_tez2(normallashtir(\"\\n\".join(train)), 16384, NAQSH)\nprint(f\"vaqt: {(time.perf_counter() - t0) / 60:.1f} daqiqa\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "vaqt: 4.7 daqiqa"
            },
            {
              "kind": "text",
              "text": "Tokenizator `test` dagi **bitta ham** jumlani koʻrmadi."
            }
          ]
        },
        {
          "id": "7-jonli-namoyish-korgan-va-kormagan-matn",
          "title": "7. Jonli namoyish: koʻrgan va koʻrmagan matn",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi Dars 16 dagi savolga javob. Bitta tokenizator — ikki xil matnda:"
            },
            {
              "kind": "code",
              "code": "f_train = fertility(train, merges)\nf_test = fertility(test, merges)\n\nprint(f\"oʻqitgan matnida (train): {f_train:.3f}\")\nprint(f\"koʻrmagan matnida (test): {f_test:.3f}\")\nprint(f\"farq: {(f_test - f_train) / f_train:.1%}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "oʻqitgan matnida (train): 1.781\nkoʻrmagan matnida (test): 1.798\nfarq: 1.0%"
            },
            {
              "kind": "text",
              "text": "**Koʻrmagan matnda — yomonroq.** Dars 16 dagi savolning javobi: yomonlashadi."
            },
            {
              "kind": "text",
              "text": "Va halol aytaman: farq **kichik** — 1% atrofida. Nega bunchalik kichik? Chunki bir million soʻzlik korpusda tokenizator asosan **umumiy** boʻlaklarni oʻrganadi — `lar`, `ning`, ` bilan` — ular har qanday matnda bor. Yodlangan narsalar (`Oʻzsanoatqurilishbank`) — lugʻatning kichik qismi."
            },
            {
              "kind": "h3",
              "id": "farq-qachon-katta-boladi",
              "text": "Farq qachon katta boʻladi?"
            },
            {
              "kind": "text",
              "text": "Dars 10 ni eslang: **kichik matn + katta lugʻat = yodlash**. Sinab koʻramiz — faqat 5 000 ta jumlada, 4 096 hajmli lugʻat bilan:"
            },
            {
              "kind": "code",
              "code": "kichik = train[:5000]\nm_kichik, _, _ = train_tez2(normallashtir(\"\\n\".join(kichik)), 4096, NAQSH)\n\nf1 = fertility(kichik, m_kichik)\nf2 = fertility(test, m_kichik)\nprint(f\"oʻqitgan matnida: {f1:.3f}\")\nprint(f\"koʻrmagan matnida: {f2:.3f}\")\nprint(f\"farq: {(f2 - f1) / f1:.1%}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "oʻqitgan matnida: 2.230\nkoʻrmagan matnida: 2.342\nfarq: 5.0%"
            },
            {
              "kind": "text",
              "text": "Farq **besh barobar** kattalashdi. Kichik korpusda tokenizator matnning oʻziga xos soʻzlarini yodlaydi — va ular test'da yoʻq."
            },
            {
              "kind": "text",
              "text": "Uchta xulosa:"
            },
            {
              "kind": "steps",
              "items": [
                "**Yoʻnalish doim bir xil.** Oʻqitgan matningizdagi raqam — har doim sizning foydangizga yolgʻon.",
                "**Hajmi — oldindan nomaʼlum.** Bizning katta korpusda 1%, kichigida 5%. Uni bilishning yagona yoʻli — **oʻlchash**.",
                "**Modellar uchun yolgʻon ancha katta.** Tokenizator faqat boʻlaklarni yodlaydi. Model esa **butun jumlalarni** yodlay oladi. 2-boʻlimdagi 0.041 → 0.003 — aynan shuning natijasi."
              ]
            }
          ]
        },
        {
          "id": "8-yashirin-ifloslanish-dublikatlar",
          "title": "8. Yashirin ifloslanish: dublikatlar",
          "blocks": [
            {
              "kind": "text",
              "text": "Esingizdami, Dars 15 da dublikatlarni nega bunchalik sinchiklab olib tashlaganimizni \"Dars 17 da bilasiz\" degan edim? Mana sababi."
            },
            {
              "kind": "text",
              "text": "Agar bitta jumla korpusda **ikki marta** boʻlsa, tasodifiy boʻlishda ulardan biri train'ga, ikkinchisi test'ga tushishi mumkin. Shunda test'dagi jumla — aslida trening matni. Konvert muhrlangan, lekin ichidagi xat — nusxa."
            },
            {
              "kind": "text",
              "text": "Dars 16 da normallashtirilgan dublikatlarni (283 ta) olib tashladik. Ammo **qisman** dublikatlarni — Dars 15 dagi 6-bosqichni — 11 milliard juft tufayli qila olmadik. Endi tekshiramiz: test'ga trening nusxalari tushdimi?"
            },
            {
              "kind": "h3",
              "id": "tekshiruv-1-test-jumlalarini-train-ichidan-qidirish",
              "text": "Tekshiruv №1: test jumlalarini train ichidan qidirish"
            },
            {
              "kind": "text",
              "text": "Rejadagi oddiy usul: test'dan tasodifiy **20 ta** jumla olib, train matni ichidan qidiramiz."
            },
            {
              "kind": "text",
              "text": "Avval tekshiruvning oʻzini tekshiramiz — **mening 1-xatoyimni** qaytaramiz. Test deb korpusning **boshini** olamiz, train esa — birinchi 90%:"
            },
            {
              "kind": "code",
              "code": "buzuq_test = korpus[:10000]\ntrain_joy_matn = \"\\n\".join(train_joy)\n\nrandom.seed(1)\nnamuna = random.sample(buzuq_test, 20)\n\ntopildi = 0\nfor j in namuna:\n    if j in train_joy_matn:\n        topildi += 1\nprint(\"buzuq boʻlinish:\", topildi, \"/ 20 topildi\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "buzuq boʻlinish: 20 / 20 topildi"
            },
            {
              "kind": "text",
              "text": "**20 tadan 20 tasi.** Tekshiruv ishlaydi: bunday xatoni darhol topadi. Mening holatimda — 12 tadan 11 tasi edi."
            },
            {
              "kind": "bullets",
              "items": [
                "`j in matn` — Dars 04 dagi `in`, lekin satr uchun: \"`j` matnning **ichida** bormi?\""
              ]
            },
            {
              "kind": "text",
              "text": "Endi bizning toʻgʻri boʻlinishimiz:"
            },
            {
              "kind": "code",
              "code": "train_matn = \"\\n\".join(train)\n\nrandom.seed(1)\nnamuna = random.sample(test, 20)\n\nfor j in namuna:\n    if j in train_matn:\n        print(\"topildi:\", repr(j))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "topildi: 'Shayx xafa bo‘lmaydi.'"
            },
            {
              "kind": "text",
              "text": "Bitta topildi! Boʻlinish buzilganmi? Qaraymiz — u train'da **qayerda**?"
            },
            {
              "kind": "code",
              "code": "for j in train:\n    if \"Shayx xafa bo\\u2018lmaydi.\" in j:\n        print(repr(j))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'Shayx xafa bo‘lmaydi. Umuman, xafa bo‘lishni bilmaydi. Iljayadi.'"
            },
            {
              "kind": "text",
              "text": "**Yolgʻon signal.** Test jumlasi — qisqa: `Shayx xafa bo‘lmaydi.` U train'dagi **boshqa, uzunroq** jumlaning ichida turibdi. Bu — dublikat emas, shunchaki bir xil soʻzlar."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Tekshiruv ham xato qilishi mumkin.** Satr ichidan qidirish qisqa jumlalarda yolgʻon signal beradi. Butun jumlani butun jumla bilan solishtirish kerak."
            },
            {
              "kind": "text",
              "text": "Toʻgʻrisi — toʻplam bilan (Dars 15):"
            },
            {
              "kind": "code",
              "code": "train_toplam = set(train)\n\ntopildi = 0\nfor j in namuna:\n    if j in train_toplam:\n        topildi += 1\nprint(\"butun jumla sifatida topildi:\", topildi, \"/ 20\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "butun jumla sifatida topildi: 0 / 20"
            },
            {
              "kind": "text",
              "text": "Toza."
            },
            {
              "kind": "h3",
              "id": "tekshiruv-2-barmoq-izlari",
              "text": "Tekshiruv №2: barmoq izlari"
            },
            {
              "kind": "text",
              "text": "20 ta jumla — oz. Agar test'ning 2% i ifloslangan boʻlsa, 20 talik namunada uni topmasligimiz ehtimoli katta (Mashq 2 da hisoblaysiz). Mening 39.2% li holatimda 20 ta yetardi. Kichik ifloslanish uchun esa — **hammasini** tekshirish kerak."
            },
            {
              "kind": "text",
              "text": "Mening usulim: trening matnining har bir **oynasiga** barmoq izi. Men 24 tokenli oyna ishlatganman. Bizning jumlalar qisqa — **8 soʻzli** oyna olamiz. Dars 15 dagi `ngrammalar` aynan shu ishni qiladi, faqat `n=8` bilan:"
            },
            {
              "kind": "code",
              "code": "izlar = {}\nfor i in range(len(train)):\n    for oyna in ngrammalar(train[i], 8):\n        if oyna not in izlar:\n            izlar[oyna] = i\n\nprint(\"train'dagi 8 soʻzli oynalar:\", len(izlar))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "train'dagi 8 soʻzli oynalar: 123038"
            },
            {
              "kind": "bullets",
              "items": [
                "`izlar` — lugʻat: oyna → u birinchi uchragan train jumlasining raqami. Toʻplam ham yetardi, lekin raqam bilan **qaysi** jumlaga oʻxshashini koʻrsata olamiz."
              ]
            },
            {
              "kind": "text",
              "text": "Endi test'ning **har bir** jumlasini tekshiramiz:"
            },
            {
              "kind": "code",
              "code": "ifloslangan = []\ntekshirildi = 0\nfor j in test:\n    oynalar = ngrammalar(j, 8)\n    if len(oynalar) == 0:\n        continue\n    tekshirildi += 1\n    for oyna in sorted(oynalar):\n        if oyna in izlar:\n            ifloslangan.append((j, train[izlar[oyna]]))\n            break\n\nprint(\"tekshirildi (8+ soʻzli):\", tekshirildi)\nprint(f\"ifloslangan: {len(ifloslangan)} ({len(ifloslangan) / tekshirildi:.1%})\")\nprint()\nfor t, tr in ifloslangan[:3]:\n    print(\"test: \", t)\n    print(\"train:\", tr)\n    print()",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "tekshirildi (8+ soʻzli): 5230\nifloslangan: 98 (1.9%)\n\ntest:  Tokio Olimpiadasi sovrindori Bekzod Abdurahmonov va O‘zbekiston bayroqdori Nigora Tursunqulova turmush qurdi\ntrain: Tokio Olimpiadasi sovrindori Bekzod Abdurahmonov va O‘zbekiston bayroqdori Nigora Tursunqulova turmush quradi\n\ntest:  Sergelida kuchli ta’sir qiluvchi dori vositalarini noqonuniy sotayotgan dorixona aniqlandi\ntrain: Chilonzorda kuchli ta’sir qiluvchi dori vositalarini noqonuniy sotayotgan dorixona aniqlandi\n\ntest:  Ayniqsa, mahalliy millatlarning orasiga rahna solinishi, din va qadriyatlarning tahqirlanishi hamda kelajakda\ntrain: Ayniqsa, mahalliy millatlarning orasiga rahna solinishi, din va qadriyatlarning tahqirlanishi"
            },
            {
              "kind": "bullets",
              "items": [
                "`if len(oynalar) == 0: continue` — 8 soʻzdan qisqa jumlada 8 soʻzli oyna yoʻq. Ularni bu usul tekshira olmaydi.",
                "`sorted(oynalar)` — toʻplamning tartibi har ishga tushirishda boshqacha boʻlishi mumkin (Dars 15). Tartiblasak, hammada bir xil misollar chiqadi."
              ]
            },
            {
              "kind": "text",
              "text": "Misollarga qarang. Birinchisi — bir xil yangilikning **ikki xil sarlavhasi** (`qurdi` va `quradi`). Uchinchisi — bitta jumlaning qisqartirilgan nusxasi. Ikkinchisi esa\nqiziq: **boshqa** tumandagi **boshqa** voqea, lekin aynan bir xil qolipda yozilgan. Dublikatmi? Matn jihatidan — deyarli. Test uchun xavfsizroq yoʻl — uni ham chiqarish. Dars 15 dagi metro maqolasi — faqat haqiqiy."
            },
            {
              "kind": "text",
              "text": "Bizda — 1.9%. Mening internet korpusimda — 39.2%. Farq tushunarli: men butun **hujjatlarni** tekshirganman (uzun matnda bitta umumiy oyna topilish ehtimoli katta), va internet sahifalari jumlalardan koʻra koʻproq koʻchiriladi."
            },
            {
              "kind": "h3",
              "id": "tozalaymiz",
              "text": "Tozalaymiz"
            },
            {
              "kind": "text",
              "text": "Men qilgandek — ifloslangan test jumlalarini **test'dan** olib tashlaymiz. Train'ga\ntegmaymiz: tokenizator allaqachon oʻqitilgan."
            },
            {
              "kind": "code",
              "code": "iflos_toplam = set()\nfor t, tr in ifloslangan:\n    iflos_toplam.add(t)\n\ntest_toza = []\nfor j in test:\n    if j not in iflos_toplam:\n        test_toza.append(j)\n\nprint(\"toza test:\", len(test_toza))\nprint(f\"fertility: {fertility(test_toza, merges):.3f}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "toza test: 14713\nfertility: 1.800"
            },
            {
              "kind": "text",
              "text": "Fertility deyarli oʻzgarmadi — bu ifloslanish tokenizator raqamiga sezilarli taʼsir qilmagan. Lekin buni **bilish uchun tekshirish kerak edi**. Endi \"test toza\" deb aytsak — buning dalili bor: 8 soʻzli oyna boʻyicha nol umumiy iz."
            },
            {
              "kind": "media",
              "id": "p3",
              "title": "Barmoq izlari"
            }
          ]
        },
        {
          "id": "9-imlo-kimning-uyida-oynaymiz",
          "title": "9. Imlo: kimning uyida oʻynaymiz?",
          "blocks": [
            {
              "kind": "text",
              "text": "Mening 3-xatoyim — test matni mening normalizatorimdan oʻtgan edi. Buni ham qaytaramiz."
            },
            {
              "kind": "text",
              "text": "Bizga **raqib** kerak — normalizatsiya qilmaydigan tokenizator. GPT-4o kabi: u matnni qanday yozilgan boʻlsa, shunday oladi. Uni oʻsha train matnida, oʻsha hajmda oʻqitamiz — faqat `normallashtir` siz:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Yana bir necha daqiqa."
            },
            {
              "kind": "code",
              "code": "t0 = time.perf_counter()\nm_raqib, v_raqib, _ = train_tez2(\"\\n\".join(train), 16384, NAQSH)\nprint(f\"vaqt: {(time.perf_counter() - t0) / 60:.1f} daqiqa\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "vaqt: 4.5 daqiqa"
            },
            {
              "kind": "text",
              "text": "Endi ikkala tokenizatorni test'ning **ikki xil yozuvida** oʻlchaymiz:"
            },
            {
              "kind": "bullets",
              "items": [
                "**asl** — internetda odamlar yozgandek (`‘`, `’`, `` ` ``, `'` aralash);",
                "**normallashtirilgan** — mening xatoyimdagidek, hammasi `ʻ` va `ʼ`."
              ]
            },
            {
              "kind": "code",
              "code": "def fertility_raqib(jumlalar, merges):\n    matn = \"\\n\".join(jumlalar)\n    tokenlar = encode_tez(matn, merges, NAQSH)\n    return len(tokenlar) / len(matn.split())\n\n\ntest_norm = []\nfor j in test_toza:\n    test_norm.append(normallashtir(j))\n\nfor nom, jumlalar_ in [(\"asl imlo\", test_toza), (\"normallashtirilgan\", test_norm)]:\n    biz = fertility(jumlalar_, merges)\n    raqib = fertility_raqib(jumlalar_, m_raqib)\n    print(f\"{nom:20s} biz: {biz:.3f} | raqib: {raqib:.3f} | raqib {(raqib - biz) / biz:.1%} koʻproq token\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "asl imlo             biz: 1.800 | raqib: 2.042 | raqib 13.4% koʻproq token\nnormallashtirilgan   biz: 1.800 | raqib: 1.858 | raqib 3.2% koʻproq token"
            },
            {
              "kind": "bullets",
              "items": [
                "`fertility_raqib` — `fertility` ning aynan oʻzi, faqat `normallashtir` siz. Raqib matnni oʻzgartirmaydi.",
                "Bizning tokenizator ikkala holatda ham bir xil natija beradi — u baribir hammasini normallashtiradi."
              ]
            },
            {
              "kind": "text",
              "text": "**Toʻxtang va oxirgi ustunga qarang.**"
            },
            {
              "kind": "text",
              "text": "Ikkala tokenizator — **bir xil**. Test jumlalari — **bir xil**. Faqat apostroflar boshqacha yozilgan. Va \"bizning ustunligimiz\" bir necha barobar oʻzgardi."
            },
            {
              "kind": "text",
              "text": "Nima boʻldi? Normallashtirilgan test'da biz raqibga **oʻz normalizatorimizni tekin berdik**. Uning ishining eng qiyin qismi — `o‘zbek`, `o'zbek`, `o’zbek` ni tanish — oldindan bajarib qoʻyilgan. Dars 14 dagi devorlar unga xalaqit bermadi."
            },
            {
              "kind": "text",
              "text": "Qaysi raqam haqiqat? **Foydalanuvchi yozadigan matndagisi** — asl imlo. Internetda odamlar aynan shunday yozadi (Dars 14: toʻgʻri `ʻ` — ozchilik)."
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**Test matnining imlosi — natijaning bir qismi.** U solishtiruvni ham bizning foydamizga, ham zararimizga burishi mumkin. Bu yerda u bizning ustunligimizni **yashirdi**. Mening maqolamda esa (u yerda raqiblar boshqa tokenizatorlar va modellar edi) — **oshirib koʻrsatdi**. Ikkala holatda ham yechim bitta: test matnini **asl** holida saqlang, va qaysi imloda oʻlchaganingizni yozing."
            },
            {
              "kind": "media",
              "id": "p4",
              "title": "Kimning uyida?"
            }
          ]
        },
        {
          "id": "10-yozib-qoyish",
          "title": "10. Yozib qoʻyish",
          "blocks": [
            {
              "kind": "text",
              "text": "Rejadagi oxirgi qadam — eng zerikarli koʻrinadigan, lekin eng muhimi. Mening uchala xatoyim ham **yozilmagan qaror** tufayli boʻlgan: \"test qayerdan olingan?\", \"fayl qanday tartibda?\", \"matn qaysi imloda saqlangan?\""
            },
            {
              "kind": "code",
              "code": "with open(\"test.txt\", encoding=\"utf-8\") as f:\n    test_iz = hashlib.md5(f.read().encode(\"utf-8\")).hexdigest()\n\nhisobot = {\n    \"manba\": MANZIL,\n    \"tozalash\": \"Dars 16: koʻrinmas belgilar, kirill > 0.3, kalit boʻyicha dublikatlar\",\n    \"jumlalar\": len(korpus),\n    \"boʻlish\": {\"usul\": \"random.shuffle\", \"seed\": 0, \"train\": len(train), \"test\": len(test)},\n    \"test_md5\": test_iz,\n    \"tekshiruv\": {\n        \"aniq_jumla_20_ta\": \"0 / 20\",\n        \"oyna\": \"8 soʻz\",\n        \"ifloslangan_olib_tashlandi\": len(ifloslangan),\n        \"toza_test\": len(test_toza),\n    },\n    \"test_imlosi\": \"asl (normallashtirilmagan)\",\n    \"lugʻat\": len(vocab),\n    \"fertility_test\": round(fertility(test_toza, merges), 3),\n}\n\nwith open(\"hisobot.json\", \"w\", encoding=\"utf-8\") as f:\n    f.write(json.dumps(hisobot, ensure_ascii=False, indent=2))\n\nprint(json.dumps(hisobot[\"boʻlish\"]))\nprint(hisobot[\"test_md5\"])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "{\"usul\": \"random.shuffle\", \"seed\": 0, \"train\": 133291, \"test\": 14811}\na1d49c3a0c6b6b4c8fc2d6070b33b6ff"
            },
            {
              "kind": "text",
              "text": "Har bir maydon — bitta savolga javob:"
            },
            {
              "kind": "bullets",
              "items": [
                "**`manba`** — versiya raqami bilan. Bir yildan keyin ham aynan shu faylni olish mumkin.",
                "**`boʻlish`** + **`seed`** — boʻlinishni har kim qaytara oladi.",
                "**`test_md5`** — test faylining barmoq izi (Dars 15). Kimdir \"men ham sizning test'ingizda oʻlchadim\" desa — izni solishtirasiz. Bitta harf farq qilsa ham iz boshqacha.",
                "**`tekshiruv`** — \"test toza\" degan gapning **dalili**.",
                "**`test_imlosi`** — 9-boʻlimdagi saboq."
              ]
            },
            {
              "kind": "text",
              "text": "Bularsiz natijangizni hech kim tekshira olmaydi. **Olti oydan keyin — siz ham.**"
            }
          ]
        },
        {
          "id": "11-muammo",
          "title": "11. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi qoʻlimizda halol oʻlchangan tokenizator bor. Lekin u **tarqoq**: `merges` lugʻati, `vocab` lugʻati, `normallashtir`, `NAQSH`, `encode_tez`, `decode` — hammasi alohida. Colab sessiyasi tugasa — hammasi yoʻqoladi. Boshqa odamga bersangiz — qaysi funksiyani qaysi tartibda chaqirishni tushuntirishingiz kerak."
            },
            {
              "kind": "text",
              "text": "Va eng qiziq savol hali ochiq: bizning tokenizator **mening haqiqiy tokenizatorim** — `uzbek-bpe-16k` — bilan solishtirganda qanday?"
            },
            {
              "kind": "text",
              "text": "Keyingi — Kurs 1 ning oxirgi darsi."
            }
          ]
        },
        {
          "id": "12-toliq-kod",
          "title": "12. Toʻliq kod",
          "blocks": [
            {
              "kind": "text",
              "text": "4-boʻlimdagi funksiyalardan keyin:"
            },
            {
              "kind": "code",
              "code": "def fertility(jumlalar, merges):\n    matn = normallashtir(\"\\n\".join(jumlalar))\n    tokenlar = encode_tez(matn, merges, NAQSH)\n    return len(tokenlar) / len(matn.split())\n\n\n# ---- 1. Boʻlish: avval aralashtir, keyin boʻl ----\nwith open(\"korpus.txt\", encoding=\"utf-8\") as f:\n    korpus = f.read().split(\"\\n\")\n\naralash = list(korpus)\nrandom.seed(0)\nrandom.shuffle(aralash)\nchegara = int(len(aralash) * 0.9)\ntrain = aralash[:chegara]\ntest = aralash[chegara:]\n\n# ---- 2. Oʻqitish: faqat train ----\nmerges, vocab, tarix = train_tez2(normallashtir(\"\\n\".join(train)), 16384, NAQSH)\n\n# ---- 3. Ifloslanish tekshiruvi: 8 soʻzli oynalar ----\nizlar = set()\nfor j in train:\n    for oyna in ngrammalar(j, 8):\n        izlar.add(oyna)\n\ntest_toza = []\nfor j in test:\n    iflos = False\n    for oyna in ngrammalar(j, 8):\n        if oyna in izlar:\n            iflos = True\n            break\n    if not iflos:\n        test_toza.append(j)\n\n# ---- 4. Baholash: faqat test, asl imloda ----\nprint(\"train:\", len(train), \"| test:\", len(test), \"| toza test:\", len(test_toza))\nprint(f\"fertility (train): {fertility(train, merges):.3f}\")\nprint(f\"fertility (toza test): {fertility(test_toza, merges):.3f}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "train: 133291 | test: 14811 | toza test: 14713\nfertility (train): 1.781\nfertility (toza test): 1.800",
              "label": "Kutilgan natija"
            }
          ]
        },
        {
          "id": "13-ozingiz-yozing",
          "title": "13. Oʻzingiz yozing",
          "blocks": [
            {
              "kind": "text",
              "text": "Boʻlish va ifloslanish tekshiruvini toʻldiring:"
            },
            {
              "kind": "code",
              "code": "aralash = ___(korpus)\nrandom.___(0)\nrandom.___(aralash)\nchegara = ___(len(aralash) * 0.9)\ntrain = aralash[___:chegara]\ntest = aralash[chegara___]\n\nizlar = ___()\nfor j in train:\n    for oyna in ngrammalar(j, ___):\n        izlar.___(oyna)\n\ntest_toza = []\nfor j in test:\n    iflos = False\n    for oyna in ngrammalar(j, 8):\n        if oyna ___ izlar:\n            iflos = True\n            ___\n    if ___ iflos:\n        test_toza.append(j)\n\nprint(len(test_toza))     # 12-boʻlimdagi bilan bir xil boʻlishi kerak",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni koʻrsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "aralash = list(korpus)\nrandom.seed(0)\nrandom.shuffle(aralash)\nchegara = int(len(aralash) * 0.9)\ntrain = aralash[:chegara]\ntest = aralash[chegara:]\n\nizlar = set()\nfor j in train:\n    for oyna in ngrammalar(j, 8):\n        izlar.add(oyna)\n\ntest_toza = []\nfor j in test:\n    iflos = False\n    for oyna in ngrammalar(j, 8):\n        if oyna in izlar:\n            iflos = True\n            break\n    if not iflos:\n        test_toza.append(j)\n\nprint(len(test_toza))",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "output",
                  "text": "14713"
                },
                {
                  "kind": "text",
                  "text": "Eng koʻp qilinadigan xatolar:"
                },
                {
                  "kind": "steps",
                  "items": [
                    "`aralash = korpus` (`list` siz) — nusxa emas, **oʻsha** roʻyxat. `shuffle` `korpus` ning oʻzini aralashtirib yuboradi, va keyingi hamma kod boshqa tartibni koʻradi.",
                    "`random.seed` ni `shuffle` dan **keyin** yozish — urugʻ hech narsaga taʼsir qilmaydi, har safar boshqa boʻlinish chiqadi.",
                    "`train = aralash[:chegara + 1]` — bitta jumla ikkala qismga ham tushadi. Kichik xato — lekin aynan \"ifloslanish\" deb ataladigan narsa."
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "14-mashqlar",
          "title": "14. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "5-boʻlimda joylashuv boʻyicha boʻlinishda test'ning qanchasi maqol (`•`) va dialog (`—`) edi? Tasodifiy boʻlinishda-chi? Butun korpusda-chi?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "def ulush(jumlalar):\n    son = 0\n    for j in jumlalar:\n        if j[0] == \"\\u2022\" or j[0] == \"\\u2014\":   # \"•\" va \"—\"\n            son += 1\n    return son / len(jumlalar)\n\n\nprint(f\"joylashuv test: {ulush(test_joy):.1%}\")\nprint(f\"tasodifiy test: {ulush(test):.1%}\")\nprint(f\"butun korpus:   {ulush(korpus):.1%}\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "joylashuv test: 89.6%\ntasodifiy test: 9.1%\nbutun korpus:   9.5%"
                  },
                  {
                    "kind": "text",
                    "text": "Tasodifiy test — korpusning **kichik nusxasi**: ulush deyarli bir xil. Joylashuv boʻyicha test esa — butunlay boshqa matn. Bu test boʻlinishining eng oddiy\ntekshiruvi: **test train'ga oʻxshaydimi?** Har qanday oddiy belgini (jumla uzunligi, birinchi harf, mavzu) solishtiring."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Test'ning `p` qismi ifloslangan boʻlsa, 20 talik tasodifiy namunada **bittasi ham** topilmaslik ehtimoli — `(1 - p) ** 20`. Uni p = 39.2% (mening holatim), 10% va 1.9% (bizning holat) uchun hisoblang. Xulosa?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "for p in [0.392, 0.10, 0.019]:\n    print(f\"p = {p:.1%} | hech narsa topmaslik ehtimoli: {(1 - p) ** 20:.1%}\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "p = 39.2% | hech narsa topmaslik ehtimoli: 0.0%\np = 10.0% | hech narsa topmaslik ehtimoli: 12.2%\np = 1.9% | hech narsa topmaslik ehtimoli: 68.1%"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`**` — darajaga koʻtarish: `2 ** 3` → `8`."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "39.2% da — 20 ta parcha **deyarli doim** ifloslanishni topadi. Shuning uchun men oddiy namuna bilan topdim."
                  },
                  {
                    "kind": "text",
                    "text": "1.9% da esa — **koʻpincha topmaydi**. 20 talik tekshiruv \"toza\" deydi, lekin test ifloslangan. Shuning uchun 8-boʻlimda **hamma** jumlalarni barmoq izi bilan tekshirdik."
                  },
                  {
                    "kind": "text",
                    "text": "Namuna — tez tekshiruv. Toʻliq tekshiruv — dalil."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "8 soʻzli oyna oʻrniga 4, 6 va 12 soʻzli oyna olsak, nechta test jumlasi \"ifloslangan\" deb topiladi? 4 soʻzli oyna topgan misollarga qarang — ular haqiqatan dublikatmi?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "for n in [4, 6, 8, 12]:\n    izlar_n = set()\n    for j in train:\n        for oyna in ngrammalar(j, n):\n            izlar_n.add(oyna)\n    topildi = 0\n    misol = None\n    for j in test:\n        for oyna in sorted(ngrammalar(j, n)):\n            if oyna in izlar_n:\n                topildi += 1\n                if misol is None:\n                    misol = (j, oyna)\n                break\n    print(f\"{n:2d} soʻz: {topildi:5d} ta | misol: {misol[1]!r}\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": " 4 soʻz:  1037 ta | misol: 'bor va soʻz bor.'\n 6 soʻz:   297 ta | misol: 'bor, siz bor va soʻz bor.'\n 8 soʻz:    98 ta | misol: 'bekzod abdurahmonov va oʻzbekiston bayroqdori nigora tursunqulova turmush'\n12 soʻz:     4 ta | misol: 'falak gardishi bilan vujudning bir aʼzosi kasallansa, albatta, boshqa aʼzolar ham ziyon'"
                  },
                  {
                    "kind": "text",
                    "text": "Qisqa oyna — **koʻp** topadi, lekin topganlarining katta qismi dublikat emas: oddiy iboralar (*\"bor va soʻz bor.\"*), maqollardagi umumiy boshlanishlar. Bu — **yolgʻon signal**."
                  },
                  {
                    "kind": "text",
                    "text": "Uzun oyna — **kam** topadi, lekin topgani deyarli aniq nusxa. Biroq u qisqa jumlalarni umuman tekshira olmaydi (12 soʻzdan qisqa jumlada 12 soʻzli oyna yoʻq)."
                  },
                  {
                    "kind": "text",
                    "text": "Har bir oyna uzunligi — savdo. Men 24 tokenli oynani tanlaganman: hujjatlarim uzun edi, va 24 token — oddiy ibora uchun juda uzun, nusxa uchun esa yetarli."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Nima uchun 7-boʻlimdagi farq atigi 1%? Test matnidagi regex boʻlaklarining qanchasi train'da **umuman uchramagan**? Ular uchun nechtadan token ketadi?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "train_boshlar = boshlar_sana(normallashtir(\"\\n\".join(train)), NAQSH)\ntest_boshlar = boshlar_sana(normallashtir(\"\\n\".join(test_toza)), NAQSH)\n\nkorilgan_son = 0\nkorilgan_token = 0\nyangi_son = 0\nyangi_token = 0\nfor b in test_boshlar:\n    t = len(encode_regex(b, merges, NAQSH)) * test_boshlar[b]\n    if b in train_boshlar:\n        korilgan_son += test_boshlar[b]\n        korilgan_token += t\n    else:\n        yangi_son += test_boshlar[b]\n        yangi_token += t\n\njami = korilgan_son + yangi_son\nprint(f\"train'da koʻrilgan boʻlaklar: {korilgan_son / jami:.1%} | {korilgan_token / korilgan_son:.2f} token\")\nprint(f\"train'da koʻrilmagan:         {yangi_son / jami:.1%} | {yangi_token / yangi_son:.2f} token\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "train'da koʻrilgan boʻlaklar: 92.8% | 1.22 token\ntrain'da koʻrilmagan:         7.2% | 2.67 token"
                  },
                  {
                    "kind": "text",
                    "text": "Test boʻlaklarining **93%** i train'da allaqachon uchragan — ular uchun tokenizator\ntayyor: 1.22 token. Koʻrilmagan boʻlaklar esa **ikki barobardan koʻp** qimmat — 2.67 token. Lekin ular atigi 7%."
                  },
                  {
                    "kind": "text",
                    "text": "Mana nima uchun farq kichik: katta korpusda \"yangi soʻz\" — kamyob hodisa. Kichik korpusda (7-boʻlimdagi 5 000 jumla) koʻrilmagan boʻlaklar ancha koʻp — va farq besh barobar katta."
                  },
                  {
                    "kind": "text",
                    "text": "Bu oʻzbek tili uchun alohida muhim: qoʻshimchalar tufayli bitta soʻzning yuzlab shakli bor. Korpus qanchalik kichik boʻlsa — test'da shunchalik koʻp \"yangi\" shakl."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Hisobotingiz haqiqatan ishlaydimi? Faraz qiling: siz faqat `hisobot.json` va `korpus.txt` ni oldingiz. Boʻlinishni **qaytadan yasang** va test faylining barmoq izi hisobotdagiga mos kelishini tekshiring. Keyin — `seed` ni 1 qilib xuddi shuni qiling."
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "with open(\"hisobot.json\", encoding=\"utf-8\") as f:\n    h = json.loads(f.read())\n\nwith open(\"korpus.txt\", encoding=\"utf-8\") as f:\n    k = f.read().split(\"\\n\")\n\nfor seed in [h[\"boʻlish\"][\"seed\"], 1]:\n    a = list(k)\n    random.seed(seed)\n    random.shuffle(a)\n    c = int(len(a) * 0.9)\n    qayta_test = \"\\n\".join(a[c:])\n    iz = hashlib.md5(qayta_test.encode(\"utf-8\")).hexdigest()\n    print(f\"seed {seed}: {iz} | hisobotga mos: {iz == h['test_md5']}\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "seed 0: a1d49c3a0c6b6b4c8fc2d6070b33b6ff | hisobotga mos: True\nseed 1: 03c933221cc6bdfe39e951c2db53b86e | hisobotga mos: False"
                  },
                  {
                    "kind": "text",
                    "text": "`seed 0` — **aynan** oʻsha test. Bitta fayl, bitta urugʻ, bitta qoida — va boshqa odam sizning boʻlinishingizni harfma-harf qaytardi. Natijangizni tekshirish mumkin."
                  },
                  {
                    "kind": "text",
                    "text": "`seed 1` — butunlay boshqa test. Agar hisobotda urugʻ yozilmaganida, hech kim (siz ham) qaysi boʻlinishda oʻlchaganingizni bilmasdi."
                  },
                  {
                    "kind": "text",
                    "text": "Mening maqolamdagi tuzatishlarni tekshirib boʻlgani ham shu sababli: men eski test toʻplamini tuzatilgan baholash kodi bilan qayta oʻlchadim — va u avval eʼlon qilgan raqamlarimni **toʻrtta xona aniqligida** qaytardi. Shundan keyingina \"yangi raqamlar — tuzatishning natijasi, tasodif emas\" deb ayta oldim."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "15-xulosa",
          "title": "15. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "Oʻqitgan matningizda oʻlchangan raqam — **har doim** sizning foydangizga yolgʻon. Hajmi — oldindan nomaʼlum. Uni oʻlchash kerak.",
                "Tartib: **tozalash → boʻlish → oʻqitish (train) → baholash (test)**. Test — muhrlangan konvert.",
                "**Fayl tartibiga ishonmang.** Alifbo tartibidagi korpusda \"oxirgi 10%\" — maqollar va dialoglar. Avval aralashtiring.",
                "`random.seed` + `random.shuffle` — tasodifiy, lekin **qaytariladigan** boʻlinish.",
                "Bizning tokenizatorda koʻrgan va koʻrmagan matn farqi — **1%**. Kichik korpusda — **5%**. Modelda — ancha katta.",
                "**Dublikatlar — yashirin ifloslanish.** Shuning uchun Dars 15 dagi ish kerak edi.",
                "20 talik namuna katta ifloslanishni topadi, kichigini — yoʻq. Toʻliq tekshiruv — **barmoq izlari** (oyna boʻyicha).",
                "Tekshiruv ham xato qiladi: satr ichidan qidirish — yolgʻon signal; qisqa oyna — yolgʻon signal.",
                "**Test imlosi** — natijaning bir qismi. Asl imloda saqlang va buni yozing.",
                "**Hisobot**: manba (versiya bilan), boʻlish (seed bilan), test izi, tekshiruv natijasi, imlo. Bularsiz natijani hech kim tekshira olmaydi."
              ]
            }
          ]
        },
        {
          "id": "keyingi-dars",
          "title": "Keyingi dars",
          "blocks": [
            {
              "kind": "text",
              "text": "**Dars 18 — Bitta klass + haqiqiy tokenizator.** Hamma tarqoq funksiyalarni bitta **klassga** yigʻamiz: `train`, `encode`, `decode`, `save`, `load`. Keyin mening `uzbek-bpe-16k` tokenizatorimni yuklab olib, uni oʻz tokenizatoringiz bilan **halol** solishtirasiz — bugungi qoidalar bilan."
            },
            {
              "kind": "text",
              "text": "Keyingi darsning savoli: *Colab sessiyasi tugaganda ham tokenizator yoʻqolmasligi uchun uni qanday saqlash kerak — va saqlangan fayldan aynan oʻsha tokenizatorni qaytarib olganingizni qanday isbotlaysiz?*"
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–16. `train_tez2`, `encode_tez`, `boshlar_sana`, `eng_juft` (Dars 16), `normallashtir` (Dars 14), `ngrammalar`, `kalit` (Dars 15)"
    },
    {
      "id": "dars-18",
      "n": 18,
      "title": "Bitta klass va haqiqiy tokenizator",
      "subtitle": "",
      "minutes": 80,
      "status": "ready",
      "intro": [],
      "sections": [
        {
          "id": "bu-darsdan-keyin-siz",
          "title": "Bu darsdan keyin siz...",
          "blocks": [
            {
              "kind": "goals",
              "items": [
                "**yozasiz** birinchi **klassingizni** — va tushunasiz `self` nima ekanini;",
                "**yigʻasiz** butun tokenizatorni bitta `Tokenizator` klassiga;",
                "**saqlaysiz** uni faylga va **isbotlaysiz** qaytarib olingani aynan oʻsha ekanini;",
                "**yuklab olasiz** mening haqiqiy tokenizatorimni — `uzbek-bpe-16k` — va uni `AutoTokenizer` bilan ishlatasiz;",
                "**solishtirasiz** ikkalasini **halol** — Dars 17 qoidalari bilan;",
                "**tuzatasiz** haqiqiy tokenizatordagi xatoni — qayta oʻqitmasdan."
              ]
            }
          ]
        },
        {
          "id": "1-bitta-savol",
          "title": "1. Bitta savol",
          "blocks": [
            {
              "kind": "text",
              "text": "Dars 17 oxirida savol qoldirgan edim:"
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Colab sessiyasi tugaganda ham tokenizator yoʻqolmasligi uchun uni qanday saqlash kerak — va saqlangan fayldan **aynan oʻsha** tokenizatorni qaytarib olganingizni qanday isbotlaysiz?"
            },
            {
              "kind": "text",
              "text": "Avval boshqa muammoni hal qilamiz — busiz saqlash ham chalkash boʻladi."
            }
          ]
        },
        {
          "id": "2-muammo-tarqoq-kod",
          "title": "2. Muammo: tarqoq kod",
          "blocks": [
            {
              "kind": "text",
              "text": "Bitta jumlani kodlash uchun hozir nimalarni eslab qolishingiz kerak?"
            },
            {
              "kind": "steps",
              "items": [
                "`normallashtir` ni chaqirish — **oʻqitishda ham, kodlashda ham** (Dars 14);",
                "`NAQSH` — aynan oʻsha regex (Dars 13);",
                "`merges` lugʻati — trening natijasi;",
                "`vocab` lugʻati — `decode` uchun;",
                "`encode_tez` — `encode_regex` emas, aks holda sekin (Dars 16);",
                "`kesh` — har safar yangidan;",
                "`decode(ids, vocab)` — `vocab` ni ham berish."
              ]
            },
            {
              "kind": "text",
              "text": "Yettita narsa. Bittasini unutsangiz — xato. Va eng yomoni — **jim** xato: masalan, `normallashtir` siz kodlasangiz, dastur ishlaydi, faqat natija boshqacha chiqadi."
            },
            {
              "kind": "text",
              "text": "Bularning hammasi **bitta narsaga** tegishli: tokenizatorga. Python'da bir-biriga tegishli maʼlumot va funksiyalarni bitta joyga yigʻish usuli bor — **klass**."
            },
            {
              "kind": "media",
              "id": "p1",
              "title": "Yetti narsa, bitta quti"
            }
          ]
        },
        {
          "id": "3-klass-bosh-joyda",
          "title": "3. Klass — boʻsh joyda",
          "blocks": [
            {
              "kind": "text",
              "text": "Avval tokenizatorsiz, oddiy misolda."
            },
            {
              "kind": "h3",
              "id": "birinchi-klass",
              "text": "Birinchi klass"
            },
            {
              "kind": "code",
              "code": "class Sanagich:\n    def __init__(self):\n        self.son = 0\n\n    def qosh(self):\n        self.son += 1\n\n\na = Sanagich()\na.qosh()\na.qosh()\na.qosh()\nprint(a.son)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "3"
            },
            {
              "kind": "text",
              "text": "Qator-qator:"
            },
            {
              "kind": "bullets",
              "items": [
                "`class Sanagich:` — yangi **klass**. Klass — **qolip**: \"sanagich qanday boʻladi\" degan tavsif. Oʻzi hech narsa sanamaydi.",
                "`def __init__(self):` — klassdan yangi nusxa yaratilganda **avtomatik** ishlaydigan funksiya. Ikki pastki chiziq — Python'ning maxsus nomi.",
                "`self` — \"**men oʻzim**\". Har bir nusxa oʻzi haqida gapirganda `self` deydi.",
                "`self.son = 0` — nusxaning **oʻz** oʻzgaruvchisi (*atribut*). Har bir nusxada — alohida.",
                "`def qosh(self):` — klass ichidagi funksiya (*metod*). Birinchi parametri doim `self`.",
                "`a = Sanagich()` — qolipdan **nusxa** (*obyekt*) yasaymiz. Shu paytda `__init__` ishlaydi.",
                "`a.qosh()` — `a` ning metodini chaqiramiz. Python `self` oʻrniga `a` ni oʻzi qoʻyadi."
              ]
            },
            {
              "kind": "h3",
              "id": "har-bir-nusxa-oziniki",
              "text": "Har bir nusxa — oʻziniki"
            },
            {
              "kind": "code",
              "code": "a = Sanagich()\nb = Sanagich()\n\na.qosh()\na.qosh()\nb.qosh()\n\nprint(\"a:\", a.son, \"| b:\", b.son)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "a: 2 | b: 1"
            },
            {
              "kind": "text",
              "text": "Bitta qolip — ikkita mustaqil sanagich. `a` ning soni `b` ga taʼsir qilmaydi. Tokenizatorlar uchun bu aynan kerak: 7-boʻlimda ikkita tokenizatorni yonma-yon ishlatamiz."
            },
            {
              "kind": "h3",
              "id": "parametrli-init",
              "text": "Parametrli `__init__`"
            },
            {
              "kind": "code",
              "code": "class Kitob:\n    def __init__(self, nom, sahifa):\n        self.nom = nom\n        self.sahifa = sahifa\n        self.oqilgan = 0\n\n    def oqi(self, n):\n        self.oqilgan += n\n\n    def qoldi(self):\n        return self.sahifa - self.oqilgan\n\n\nk = Kitob(\"Oʻtgan kunlar\", 384)\nk.oqi(100)\nk.oqi(50)\nprint(k.nom, \"— qoldi:\", k.qoldi(), \"sahifa\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "Oʻtgan kunlar — qoldi: 234 sahifa"
            },
            {
              "kind": "bullets",
              "items": [
                "`Kitob(\"Oʻtgan kunlar\", 384)` — qavs ichidagilar `__init__` ga ketadi: `nom` va `sahifa`. `self` ni Python oʻzi qoʻyadi.",
                "`self.nom = nom` — chap tomon — nusxaning atributi, oʻng tomon — parametr. Nomlari bir xil, lekin ular **ikki boshqa** narsa.",
                "`qoldi` metodi `return` qiladi — oddiy funksiyadek."
              ]
            },
            {
              "kind": "h3",
              "id": "ataylab-xato-self-ni-unutish",
              "text": "Ataylab xato: `self` ni unutish"
            },
            {
              "kind": "code",
              "code": "class Xato:\n    def salom():\n        print(\"salom\")\n\n\nXato().salom()",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "TypeError: Xato.salom() takes 0 positional arguments but 1 was given",
              "error": true
            },
            {
              "kind": "text",
              "text": "Xatoni oʻqiymiz: \"`salom()` 0 ta argument oladi, lekin 1 ta berildi.\" Biz hech qanday argument bermadikku? **Berdik** — Python `Xato().salom()` ni chaqirganda nusxaning oʻzini (`self`) birinchi argument qilib **jim** uzatadi. Metodda unga joy yoʻq edi."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Klass ichidagi har bir metodning birinchi parametri — `self`."
            }
          ]
        },
        {
          "id": "4-tokenizator-klassi",
          "title": "4. `Tokenizator` klassi",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi 2-boʻlimdagi yettita narsani bitta qolipga yigʻamiz. Dars 14–17 dagi funksiyalar kerak — yangi sessiyada quyidagi katakni ishga tushiring:"
            },
            {
              "kind": "reveal",
              "summary": "Dars 14–17 dagi kod (ochib, nusxa qiling)",
              "blocks": [
                {
                  "kind": "code",
                  "code": "import re\nimport json\nimport time\nimport random\nimport hashlib\nimport unicodedata\nimport urllib.request\n\nNAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\nOKINA = \"\\u02bb\"\nTUTUQ = \"\\u02bc\"\nAPOSTROFLAR = \"'\\u2018\\u2019`\\u02bb\\u02bc\"\nMANZIL = (\"https://raw.githubusercontent.com/common-voice/common-voice/\"\n          \"57f42edbf6f6d3b128e0bcd3f916360af0d328b6/server/data/uz/sentence-collector.txt\")\n\n\ndef kodla(matn):\n    return list(matn.encode(\"utf-8\"))\n\n\ndef merge(tokenlar, juftlik, yangi_id):\n    yangi = []\n    i = 0\n    while i < len(tokenlar):\n        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:\n            yangi.append(yangi_id)\n            i += 2\n        else:\n            yangi.append(tokenlar[i])\n            i += 1\n    return yangi\n\n\ndef decode(ids, vocab):\n    qismlar = []\n    for tid in ids:\n        qismlar.append(vocab[tid])\n    return b\"\".join(qismlar).decode(\"utf-8\", errors=\"replace\")\n\n\ndef encode_regex(matn, merges, naqsh):\n    natija = []\n    for bosh in re.findall(naqsh, matn):\n        tk = kodla(bosh)\n        while len(tk) >= 2:\n            stats = {}\n            for juft in zip(tk, tk[1:]):\n                stats[juft] = stats.get(juft, 0) + 1\n            eng_j = None\n            eng_r = float(\"inf\")\n            for j in stats:\n                r = merges.get(j, float(\"inf\"))\n                if r < eng_r:\n                    eng_r = r\n                    eng_j = j\n            if eng_j is None:\n                break\n            tk = merge(tk, eng_j, merges[eng_j])\n        natija = natija + tk\n    return natija\n\n\ndef normallashtir(matn):\n    matn = unicodedata.normalize(\"NFC\", matn)\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n            if oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n    return \"\".join(belgilar)\n\n\ndef kirill_ulushi(matn):\n    harflar = 0\n    kirill = 0\n    for belgi in matn:\n        if belgi.isalpha():\n            harflar += 1\n            if ord(belgi) >= 1024 and ord(belgi) <= 1279:\n                kirill += 1\n    if harflar == 0:\n        return 0\n    return kirill / harflar\n\n\ndef kalit(matn):\n    matn = normallashtir(matn)\n    matn = matn.lower()\n    matn = \" \".join(matn.split())\n    return hashlib.md5(matn.encode(\"utf-8\")).hexdigest()\n\n\ndef ngrammalar(matn, n=5):\n    sozlar = normallashtir(matn).lower().split()\n    natija = set()\n    for i in range(len(sozlar) - n + 1):\n        natija.add(\" \".join(sozlar[i:i + n]))\n    return natija\n\n\ndef boshlar_sana(matn, naqsh):\n    hisob = {}\n    for b in re.findall(naqsh, matn):\n        hisob[b] = hisob.get(b, 0) + 1\n    return hisob\n\n\ndef eng_juft(stats):\n    eng_son = max(stats.values())\n    nomzodlar = []\n    for juft in stats:\n        if stats[juft] == eng_son:\n            nomzodlar.append(juft)\n    return min(nomzodlar)\n\n\ndef train_tez2(matn, vocab_size, naqsh):\n    hisob = boshlar_sana(matn, naqsh)\n    sozlar = []\n    sonlar = []\n    for b in hisob:\n        sozlar.append(kodla(b))\n        sonlar.append(hisob[b])\n\n    stats = {}\n    qayerda = {}\n    for i in range(len(sozlar)):\n        soz = sozlar[i]\n        for juft in zip(soz, soz[1:]):\n            stats[juft] = stats.get(juft, 0) + sonlar[i]\n            if juft not in qayerda:\n                qayerda[juft] = set()\n            qayerda[juft].add(i)\n\n    merges = {}\n    vocab = {}\n    for i in range(256):\n        vocab[i] = bytes([i])\n    tarix = []\n\n    for yangi_id in range(256, vocab_size):\n        if len(stats) == 0:\n            break\n        eng = eng_juft(stats)\n        tarix.append(stats[eng])\n        for i in qayerda[eng]:\n            eski = sozlar[i]\n            yangi = merge(eski, eng, yangi_id)\n            if len(yangi) == len(eski):\n                continue\n            for j in zip(eski, eski[1:]):\n                stats[j] -= sonlar[i]\n                if stats[j] == 0:\n                    del stats[j]\n            for j in zip(yangi, yangi[1:]):\n                stats[j] = stats.get(j, 0) + sonlar[i]\n                if j not in qayerda:\n                    qayerda[j] = set()\n                qayerda[j].add(i)\n            sozlar[i] = yangi\n        del qayerda[eng]\n        merges[eng] = yangi_id\n        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]\n\n    return merges, vocab, tarix\n\n\ndef encode_tez(matn, merges, naqsh):\n    kesh = {}\n    natija = []\n    for bosh in re.findall(naqsh, matn):\n        if bosh not in kesh:\n            kesh[bosh] = encode_regex(bosh, merges, naqsh)\n        natija.extend(kesh[bosh])\n    return natija\n\n\n# ---- korpus (Dars 16, 3-boʻlim) ----\nurllib.request.urlretrieve(MANZIL, \"uz_jumlalar.txt\")\nwith open(\"uz_jumlalar.txt\", encoding=\"utf-8\") as f:\n    jumlalar = f.read().split(\"\\n\")\n\ntoza = []\nkorilgan = set()\nfor j in jumlalar:\n    j = j.replace(\"\\u00ad\", \"\").replace(\"\\u200b\", \"\").strip()\n    if j == \"\" or kirill_ulushi(j) > 0.3:\n        continue\n    k = kalit(j)\n    if k in korilgan:\n        continue\n    korilgan.add(k)\n    toza.append(j)\n\nwith open(\"korpus.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"\\n\".join(toza))\nprint(\"tayyor:\", len(toza), \"ta jumla\")",
                  "lang": "python",
                  "mode": "copy"
                },
                {
                  "kind": "output",
                  "text": "tayyor: 148102 ta jumla"
                }
              ]
            },
            {
              "kind": "text",
              "text": "Va klass:"
            },
            {
              "kind": "code",
              "code": "class Tokenizator:\n    def __init__(self):\n        self.merges = {}\n        self.vocab = {}\n        for i in range(256):\n            self.vocab[i] = bytes([i])\n        self.kesh = {}\n\n    def train(self, matn, vocab_size):\n        self.merges, self.vocab, _ = train_tez2(normallashtir(matn), vocab_size, NAQSH)\n        self.kesh = {}\n\n    def encode(self, matn):\n        natija = []\n        for bosh in re.findall(NAQSH, normallashtir(matn)):\n            if bosh not in self.kesh:\n                self.kesh[bosh] = encode_regex(bosh, self.merges, NAQSH)\n            natija.extend(self.kesh[bosh])\n        return natija\n\n    def decode(self, ids):\n        qismlar = []\n        for tid in ids:\n            qismlar.append(self.vocab[tid])\n        return b\"\".join(qismlar).decode(\"utf-8\", errors=\"replace\")\n\n    def qismlar(self, matn):\n        natija = []\n        for tid in self.encode(matn):\n            natija.append(self.decode([tid]))\n        return natija",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Har bir metod — 2-boʻlimdagi bitta muammoning yechimi:"
            },
            {
              "kind": "table",
              "head": [
                "Metod",
                "Nima qiladi",
                "Qaysi muammo yoʻqoldi"
              ],
              "rows": [
                [
                  "`__init__`",
                  "boʻsh tokenizator: 256 bayt, kesh",
                  "`vocab` ni qoʻlda qurish"
                ],
                [
                  "`train`",
                  "**har doim** `normallashtir` bilan oʻqitadi",
                  "1, 3, 4"
                ],
                [
                  "`encode`",
                  "**har doim** `normallashtir`, `NAQSH`, kesh",
                  "1, 2, 5, 6"
                ],
                [
                  "`decode`",
                  "oʻz `vocab` idan foydalanadi",
                  "7"
                ],
                [
                  "`qismlar`",
                  "tokenlarni matn boʻlaklari qilib koʻrsatadi",
                  "(qulaylik)"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Endi normalizatsiyani **unutib boʻlmaydi** — u klassning ichida. Ishlatuvchi faqat `tok.encode(matn)` deydi."
            },
            {
              "kind": "text",
              "text": "Ikki nozik joy:"
            },
            {
              "kind": "bullets",
              "items": [
                "`self.kesh` — kesh endi **nusxaning** ichida yashaydi. Dars 16 dagi `encode_tez` har chaqiruvda keshni noldan boshlardi. Endi u chaqiruvlar orasida saqlanadi: ikkinchi jumla birinchisining kesh idan foydalanadi.",
                "`train` keshni tozalaydi (`self.kesh = {}`). Nima uchun? Yangi `merges` bilan eski kesh **notoʻgʻri** tokenlar beradi."
              ]
            },
            {
              "kind": "h3",
              "id": "oqitamiz-dars-17-qoidalari-bilan",
              "text": "Oʻqitamiz — Dars 17 qoidalari bilan"
            },
            {
              "kind": "text",
              "text": "Dars 17 dagi boʻlinish: `seed 0`, 90/10, keyin test'dan 8 soʻzli oynalar boʻyicha ifloslanganlarni olib tashlash."
            },
            {
              "kind": "code",
              "code": "with open(\"korpus.txt\", encoding=\"utf-8\") as f:\n    korpus = f.read().split(\"\\n\")\n\naralash = list(korpus)\nrandom.seed(0)\nrandom.shuffle(aralash)\nchegara = int(len(aralash) * 0.9)\ntrain = aralash[:chegara]\ntest = aralash[chegara:]\n\nizlar = set()\nfor j in train:\n    for oyna in ngrammalar(j, 8):\n        izlar.add(oyna)\n\ntest_toza = []\nfor j in test:\n    iflos = False\n    for oyna in ngrammalar(j, 8):\n        if oyna in izlar:\n            iflos = True\n            break\n    if not iflos:\n        test_toza.append(j)\n\nprint(\"train:\", len(train), \"| toza test:\", len(test_toza))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "train: 133291 | toza test: 14713"
            },
            {
              "kind": "text",
              "text": "Dars 17 dagi raqamlar — aynan oʻsha. `seed` shuning uchun kerak edi."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Bu katak bir necha daqiqa ishlaydi."
            },
            {
              "kind": "code",
              "code": "tok = Tokenizator()\n\nt0 = time.perf_counter()\ntok.train(\"\\n\".join(train), 16384)\nprint(f\"vaqt: {(time.perf_counter() - t0) / 60:.1f} daqiqa\")\nprint(\"lugʻat:\", len(tok.vocab))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "vaqt: 4.2 daqiqa\nlugʻat: 16384"
            },
            {
              "kind": "text",
              "text": "Sinab koʻramiz:"
            },
            {
              "kind": "code",
              "code": "jumla = \"O'zbekiston Respublikasi Prezidenti farmon imzoladi.\"\n\nids = tok.encode(jumla)\nprint(ids)\nprint(tok.qismlar(jumla))\nprint(tok.decode(ids))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[537, 3252, 2798, 8930, 6359, 46]\n['Oʻzbekiston', ' Respublikasi', ' Prezidenti', ' farmon', ' imzoladi', '.']\nOʻzbekiston Respublikasi Prezidenti farmon imzoladi."
            },
            {
              "kind": "text",
              "text": "Uchta qator — uchta metod. `O'zbekiston` dagi oddiy `'` — `ʻ` ga aylandi: klass normalizatsiyani oʻzi qildi."
            }
          ]
        },
        {
          "id": "5-saqlash",
          "title": "5. Saqlash",
          "blocks": [
            {
              "kind": "h3",
              "id": "ataylab-xato-json-va-kortej",
              "text": "Ataylab xato: JSON va kortej"
            },
            {
              "kind": "text",
              "text": "Eng oddiy gʻoya — `merges` ni toʻgʻridan-toʻgʻri JSON qilish:"
            },
            {
              "kind": "code",
              "code": "json.dumps(tok.merges)",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "TypeError: keys must be str, int, float, bool or None, not tuple",
              "error": true
            },
            {
              "kind": "text",
              "text": "\"Kalitlar matn, son, ... boʻlishi kerak — **kortej emas**.\" Dars 16 da buni chetlab oʻtgan edik: har bir birlashtirishni `[a, b, yangi_id]` roʻyxati qilib yozdik. Endi shuni klassning metodiga aylantiramiz."
            },
            {
              "kind": "h3",
              "id": "save-va-yukla",
              "text": "`save` va `yukla`"
            },
            {
              "kind": "code",
              "code": "def save(self, fayl):\n    royxat = []\n    for juft in self.merges:\n        royxat.append([juft[0], juft[1], self.merges[juft]])\n    malumot = {\"versiya\": 1, \"naqsh\": NAQSH, \"merges\": royxat}\n    with open(fayl, \"w\", encoding=\"utf-8\") as f:\n        f.write(json.dumps(malumot))\n\n\ndef yukla(fayl):\n    with open(fayl, encoding=\"utf-8\") as f:\n        malumot = json.loads(f.read())\n    if malumot[\"naqsh\"] != NAQSH:\n        print(\"DIQQAT: fayldagi naqsh boshqa!\")\n    yangi = Tokenizator()\n    for a, b, tid in malumot[\"merges\"]:\n        yangi.merges[(a, b)] = tid\n        yangi.vocab[tid] = yangi.vocab[a] + yangi.vocab[b]\n    return yangi\n\n\nTokenizator.save = save",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "text",
              "text": "Qator-qator:"
            },
            {
              "kind": "bullets",
              "items": [
                "`save` — `self` bilan yozilgan, demak u **metod**. `Tokenizator.save = save` — tayyor klassga yangi metod qoʻshdik. (Toʻliq kodda u klassning ichida turadi; bu yerda klassni qayta yozmaslik uchun shunday qildik.)",
                "`\"versiya\": 1` — fayl formatining raqami. Ertaga formatni oʻzgartirsangiz, eski fayllarni ajrata olasiz.",
                "`\"naqsh\": NAQSH` — regex ham saqlanadi. Dars 13: naqsh oʻqitishda va kodlashda **bir xil** boʻlishi shart. Boshqa naqsh bilan yuklangan merges — jim xato.",
                "`yukla` — **oddiy funksiya**, metod emas: u tokenizatordan emas, **fayldan** boshlaydi va yangi tokenizator qaytaradi.",
                "`yangi.vocab[tid] = yangi.vocab[a] + yangi.vocab[b]` — `vocab` ni qayta quramiz (Dars 11). Bu faqat merges **tartib bilan** kelgani uchun ishlaydi: `a` va `b` doim `tid` dan oldin yaratilgan. JSON roʻyxati tartibni saqlaydi."
              ]
            },
            {
              "kind": "code",
              "code": "tok.save(\"tokenizator.json\")\n\nwith open(\"tokenizator.json\", encoding=\"utf-8\") as f:\n    hajm = len(f.read().encode(\"utf-8\"))\nprint(\"fayl:\", hajm, \"bayt\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "fayl: 304645 bayt"
            },
            {
              "kind": "text",
              "text": "Bir necha yuz kilobayt — 16 384 tokenli tokenizator. 5 daqiqalik trening endi bitta faylda."
            },
            {
              "kind": "h3",
              "id": "isbot-aynan-oshami",
              "text": "Isbot: aynan oʻshami?"
            },
            {
              "kind": "text",
              "text": "Endi asosiy savol. Uchta tekshiruv — har biri avvalgisidan kuchliroq:"
            },
            {
              "kind": "code",
              "code": "tok2 = yukla(\"tokenizator.json\")\n\n# 1. merges bir xilmi?\nprint(\"merges:\", tok2.merges == tok.merges)\n\n# 2. butun toza test bir xil kodlanadimi?\ntest_matn = \"\\n\".join(test_toza)\nprint(\"encode:\", tok2.encode(test_matn) == tok.encode(test_matn))\n\n# 3. qayta saqlansa — fayl harfma-harf bir xilmi?\ntok2.save(\"tokenizator_2.json\")\nizlar_fayl = []\nfor fayl in [\"tokenizator.json\", \"tokenizator_2.json\"]:\n    with open(fayl, encoding=\"utf-8\") as f:\n        izlar_fayl.append(hashlib.md5(f.read().encode(\"utf-8\")).hexdigest())\nprint(\"fayl izi:\", izlar_fayl[0] == izlar_fayl[1], izlar_fayl[0])",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "merges: True\nencode: True\nfayl izi: True ec70ecd6094a456ec956989c64a3c4e6"
            },
            {
              "kind": "bullets",
              "items": [
                "**1-tekshiruv** — lugʻatlar bir xil. Lekin `vocab` ham toʻgʻri qurildimi?",
                "**2-tekshiruv** — 14 ming jumla, 100 mingga yaqin soʻz — hammasi aynan bir xil tokenlarga aylandi. Bu `merges` ni ham, `vocab` ni ham, `encode` ni ham tekshiradi.",
                "**3-tekshiruv** — **saqla → yukla → yana saqla**: ikki fayl — harfma-harf bir xil (Dars 15 dagi barmoq izi). Yuklashda hech narsa yoʻqolmadi, hech narsa qoʻshilmadi."
              ]
            },
            {
              "kind": "media",
              "id": "p2",
              "title": "Saqla → yukla → yana saqla"
            },
            {
              "kind": "text",
              "text": "Bu izni Dars 17 dagi hisobotga yozsangiz — \"men aynan shu tokenizator bilan oʻlchadim\" degan gapning dalili boʻladi."
            }
          ]
        },
        {
          "id": "6-haqiqiy-tokenizator-uzbek-bpe-16k",
          "title": "6. Haqiqiy tokenizator: `uzbek-bpe-16k`",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi mening tokenizatorim. U Hugging Face'da `IslombekT/uzbek-bpe-16k` nomi bilan turibdi, va aynan oʻsha fayl GitHub'da ham bor. Biz GitHub'dan — versiya raqami bilan (Dars 16) — yuklab olamiz: hisob ham, internet tezligi ham muammo boʻlmaydi."
            },
            {
              "kind": "code",
              "code": "import os\n\nGITHUB = (\"https://raw.githubusercontent.com/TurdiyevIslombek/uzbek-tokenizer/\"\n          \"f34493144a630162d6167aaf99c351bd6931e7ac/\")\n\nos.makedirs(\"uzbek-bpe-16k\", exist_ok=True)\nfor fayl in [\"tokenizer.json\", \"tokenizer_config.json\"]:\n    urllib.request.urlretrieve(GITHUB + fayl, \"uzbek-bpe-16k/\" + fayl)\n\nprint(sorted(os.listdir(\"uzbek-bpe-16k\")))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['tokenizer.json', 'tokenizer_config.json']"
            },
            {
              "kind": "bullets",
              "items": [
                "`os` — Python'ning fayl va papkalar bilan ishlaydigan moduli.",
                "`os.makedirs(papka, exist_ok=True)` — papka yaratadi; `exist_ok=True` — \"bor boʻlsa, xato berma\".",
                "`os.listdir(papka)` — papkadagi fayllar roʻyxati. Uning tartibi kompyuterga qarab boshqacha boʻlishi mumkin — shuning uchun `sorted` (Dars 15)."
              ]
            },
            {
              "kind": "text",
              "text": "`tokenizer.json` — bizning `tokenizator.json` ning \"katta akasi\": unda merges ham, normalizator ham, regex ham — hammasi bor. Bu format **Hugging Face** kutubxonalari uchun standart."
            },
            {
              "kind": "h3",
              "id": "autotokenizer",
              "text": "`AutoTokenizer`"
            },
            {
              "kind": "text",
              "text": "`transformers` — Hugging Face'ning kutubxonasi. Colab'da u oʻrnatilgan."
            },
            {
              "kind": "code",
              "code": "from transformers import AutoTokenizer\n\nhf = AutoTokenizer.from_pretrained(\"uzbek-bpe-16k\")\nprint(len(hf))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "16384"
            },
            {
              "kind": "bullets",
              "items": [
                "`AutoTokenizer.from_pretrained(papka)` — papkadagi `tokenizer.json` ni oʻqib, tayyor tokenizator qaytaradi. \"Auto\" — qaysi turdagi tokenizator ekanini faylning oʻzidan aniqlaydi.",
                "Papka oʻrniga `\"IslombekT/uzbek-bpe-16k\"` yozsangiz, Hugging Face'dan toʻgʻridan- toʻgʻri yuklaydi."
              ]
            },
            {
              "kind": "text",
              "text": "16 384 — xuddi biznikidek."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Eski `transformers` versiyasida bu qator xato berishi mumkin. Unda: `from tokenizers import Tokenizer` va `Tokenizer.from_file(\"uzbek-bpe-16k/tokenizer.json\")` — natija bir xil."
            },
            {
              "kind": "h3",
              "id": "ichiga-qaraymiz",
              "text": "Ichiga qaraymiz"
            },
            {
              "kind": "code",
              "code": "jumla = \"Oʻzbekiston Respublikasi Prezidenti farmon imzoladi.\"\n\nids = hf.encode(jumla, add_special_tokens=False)\nprint(ids)\nprint(hf.convert_ids_to_tokens(ids))\nprint(hf.decode(ids))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "[1879, 806, 1719, 10031, 13811, 14]\n['OÊ»zbekiston', 'ĠRespublikasi', 'ĠPrezidenti', 'Ġfarmon', 'Ġimzoladi', '.']\nOʻzbekiston Respublikasi Prezidenti farmon imzoladi."
            },
            {
              "kind": "bullets",
              "items": [
                "`add_special_tokens=False` — maxsus tokenlar (masalan, matn oxiri belgisi) qoʻshma. Bizga faqat matnning oʻzi kerak.",
                "`convert_ids_to_tokens` — har bir tokenning **ichki** yozuvi."
              ]
            },
            {
              "kind": "text",
              "text": "Ikkinchi qatorga qarang: `ĠRespublikasi`, `OÊ»zbekiston`. Tanish koʻrinyaptimi?"
            },
            {
              "kind": "text",
              "text": "`OÊ»zbek` — **Dars 15 dagi mojibake!** `ʻ` ning ikki bayti (202, 187) bitta-bittadan harf sifatida koʻrsatilgan. Bu yerda bu xato emas: Hugging Face baytli tokenlarni **ichkarida** shunday yozadi — har bir baytni bitta koʻrinadigan belgi bilan. `Ġ` — boʻshliq (32-bayt). `decode` esa baytlarni toʻgʻri yigʻadi — uchinchi qatorda matn toza."
            },
            {
              "kind": "text",
              "text": "Bizning tokenizatorimiz bilan solishtiring — 4-boʻlimda ham aynan 6 ta token, aynan shu boʻlaklar edi. Ikki tokenizator turli korpusda, turli dasturda oʻqitilgan — lekin oʻzbek tilida bir xil soʻzlarni topgan."
            },
            {
              "kind": "h3",
              "id": "mening-tokenizatorimdagi-ikkita-xato",
              "text": "Mening tokenizatorimdagi ikkita xato"
            },
            {
              "kind": "text",
              "text": "Dars 14 da aytgan edim: mening haqiqiy tokenizatorimda ikkita boʻshliq bor. Mana ular — oʻz koʻzingiz bilan:"
            },
            {
              "kind": "code",
              "code": "for s in [\"O\\u2018zbekiston\", \"U 'dunyo' dedi\"]:\n    a = hf.encode(s, add_special_tokens=False)\n    b = tok.encode(s)\n    print(repr(s))\n    print(\"   uzbek-bpe-16k:\", len(a), hf.convert_ids_to_tokens(a), \"->\", repr(hf.decode(a)))\n    print(\"   bizniki:      \", len(b), tok.qismlar(s), \"->\", repr(tok.decode(b)))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "'O‘zbekiston'\n   uzbek-bpe-16k: 3 ['O', 'âĢĺ', 'zbekiston'] -> 'O‘zbekiston'\n   bizniki:       1 ['Oʻzbekiston'] -> 'Oʻzbekiston'\n\"U 'dunyo' dedi\"\n   uzbek-bpe-16k: 6 ['U', \"Ġ'\", 'd', 'un', 'yoÊ»', 'Ġdedi'] -> \"U 'dunyoʻ dedi\"\n   bizniki:       6 ['U', ' ', \"'\", 'dunyo', \"'\", ' dedi'] -> \"U 'dunyo' dedi\""
            },
            {
              "kind": "steps",
              "items": [
                "**`‘` tanilmaydi.** Mening normalizatorim `’`, `` ` `` va `'` ni biladi — lekin internetdagi **eng koʻp** uchraydigan `‘` ni emas (Dars 14 senzusi: 34%). Natija — Dars 14 dagi devor: `O` | `‘` | `zbekiston`, 3 token.",
                "**`'dunyo'` buziladi.** Qoʻshtirnoq ichidagi `dunyo` — `dunyoʻ` boʻlib qoldi. Mening qoidam \"`o` dan keyingi `'`\" ni **har doim** `ʻ` qiladi — Dars 14 dagi \"keyin harf\" sharti yoʻq."
              ]
            },
            {
              "kind": "text",
              "text": "Sizning tokenizatoringizda ikkalasi ham **yoʻq**: Dars 14 da biz aynan shu xatolarni tuzatgan edik. Talaba ustozidan oʻzdi — kichik joyda, lekin haqiqatan."
            }
          ]
        },
        {
          "id": "7-halol-solishtiruv",
          "title": "7. Halol solishtiruv",
          "blocks": [
            {
              "kind": "text",
              "text": "Endi asosiy savol: qaysi biri yaxshiroq?"
            },
            {
              "kind": "text",
              "text": "Dars 17 qoidalari:"
            },
            {
              "kind": "steps",
              "items": [
                "**Bir xil test** — ikkalasi uchun.",
                "**Asl imlo** — har biri oʻz normalizatsiyasini oʻzi qilsin.",
                "**Koʻrilmagan matn** — test ikkalasining treningida ham boʻlmasligi kerak."
              ]
            },
            {
              "kind": "text",
              "text": "Uchinchisida bitta halol eʼtiroz bor: bizniki Common Voice'ning **train** qismida oʻqitilgan — test'ni koʻrmagan. Mening tokenizatorim esa FineWeb-2 da oʻqitilgan. Common Voice'dagi yangilik sarlavhalari internetda ham bor — demak ulardan baʼzilari mening treningimga tushgan boʻlishi **mumkin**. Buni tekshira olmaymiz: FineWeb-2 ning 4.45 GB ini bu yerda qidirib boʻlmaydi. Yozib qoʻyamiz va davom etamiz."
            },
            {
              "kind": "code",
              "code": "def fertility_hf(matn, hf):\n    ids = hf.encode(matn, add_special_tokens=False)\n    return len(ids) / len(matn.split())\n\n\ndef fertility_tok(matn, tok):\n    return len(tok.encode(matn)) / len(matn.split())\n\n\nprint(f\"bizniki:        {fertility_tok(test_matn, tok):.3f}\")\nprint(f\"uzbek-bpe-16k:  {fertility_hf(test_matn, hf):.3f}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bizniki:        1.800\nuzbek-bpe-16k:  2.119"
            },
            {
              "kind": "text",
              "text": "**Bizniki yutdi** — va katta farq bilan. Kurs boshida yozgan birinchi qatoringizdan 18 dars oʻtib — mening maqoladagi tokenizatorimni yengdingiz."
            },
            {
              "kind": "text",
              "text": "Lekin xursand boʻlishdan oldin — Dars 17 savoli: **nima uchun?**"
            },
            {
              "kind": "h3",
              "id": "sabab-1",
              "text": "Sabab №1: `‘`"
            },
            {
              "kind": "text",
              "text": "Test'da `‘` qancha?"
            },
            {
              "kind": "code",
              "code": "print(test_matn.count(\"\\u2018\"))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "9289"
            },
            {
              "kind": "text",
              "text": "Common Voice'da `‘` — apostroflarning 61% i (Dars 16 senzusi). Mening tokenizatorim uni tanimaydi — demak test'ning katta qismida Dars 14 devorlari turibdi."
            },
            {
              "kind": "text",
              "text": "Buni oʻlchash mumkin. **Faqat tashxis uchun** (sarlavha raqami emas!) — mening tokenizatorimga sizning normalizatoringizdan oʻtgan matnni beramiz:"
            },
            {
              "kind": "code",
              "code": "print(f\"uzbek-bpe-16k, normallashtirilgan matnda: {fertility_hf(normallashtir(test_matn), hf):.3f}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "uzbek-bpe-16k, normallashtirilgan matnda: 1.949"
            },
            {
              "kind": "text",
              "text": "Farqning katta qismi — bitta belgi: `‘`. (Mashq 5 da buni mening tokenizatorimning **oʻzida** tuzatasiz.)"
            },
            {
              "kind": "h3",
              "id": "sabab-2-kimning-uyida",
              "text": "Sabab №2: kimning uyida?"
            },
            {
              "kind": "text",
              "text": "Qolgan farq-chi? Bizniki **Common Voice** jumlalarida oʻqitilgan va Common Voice jumlalarida oʻlchanmoqda. Bu — uy maydoni. Mening tokenizatorim esa internet **hujjatlarida** oʻqitilgan: yangiliklar, maqolalar, Vikipediya."
            },
            {
              "kind": "text",
              "text": "Tekshirish uchun — teskari tajriba: ikkalasi ham **koʻrmagan**, lekin internet yangiliklariga oʻxshash matn kerak. Bizda bunday matn bor: **Dars 15 dagi oʻquv korpusi**. U kurs uchun yozilgan — demak hech qanday tokenizatorning treningida **boʻlishi mumkin emas**."
            },
            {
              "kind": "note",
              "tone": "tip",
              "text": "Agar `toza_korpus.jsonl` yoʻq boʻlsa — Dars 15 dagi Ilova A va Toʻliq kod kataklarini ishga tushiring."
            },
            {
              "kind": "code",
              "code": "hujjatlar = []\nwith open(\"toza_korpus.jsonl\", encoding=\"utf-8\") as f:\n    for qator in f:\n        hujjatlar.append(json.loads(qator)[\"text\"])\nyangilik = \"\\n\\n\".join(hujjatlar)\n\nprint(\"soʻzlar:\", len(yangilik.split()))\nprint(f\"bizniki:        {fertility_tok(yangilik, tok):.3f}\")\nprint(f\"uzbek-bpe-16k:  {fertility_hf(yangilik, hf):.3f}\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "soʻzlar: 607\nbizniki:        1.745\nuzbek-bpe-16k:  1.643"
            },
            {
              "kind": "text",
              "text": "**Natija teskari.** Yangiliklarga oʻxshash matnda mening tokenizatorim yutadi."
            },
            {
              "kind": "text",
              "text": "(Bu matn kichik — 607 soʻz. Bitta jumla ham natijani biroz siljitadi. Lekin yoʻnalishi aniq.)"
            },
            {
              "kind": "note",
              "tone": "key",
              "text": "**\"Eng yaxshi tokenizator\" degan narsa yoʻq. Faqat \"shu matn uchun eng yaxshi\" bor.** Har bir tokenizator oʻz korpusiga oʻxshash matnda kuchli."
            },
            {
              "kind": "media",
              "id": "p3",
              "title": "Uy maydoni"
            },
            {
              "kind": "text",
              "text": "Shuning uchun mening maqoladagi 1.749 ni bizning 1.8 bilan **solishtirmang**: ular **boshqa matnda** oʻlchangan. Turli test'dagi raqamlar — turli imtihondagi baholar."
            }
          ]
        },
        {
          "id": "8-kurs-1-nima-qurdik",
          "title": "8. Kurs 1 — nima qurdik",
          "blocks": [
            {
              "kind": "text",
              "text": "18 dars oldin siz `print(\"Salom\")` deb yozgan edingiz. Mana nima qurdingiz:"
            },
            {
              "kind": "pre",
              "text": "matn\n  │  normallashtir        Dars 14  — oʻ besh xil yozilsa ham, bitta\n  ▼\nboʻlaklar               Dars 13  — regex: soʻz chegarasidan oʻtilmaydi\n  │\n  ▼\nbaytlar                 Dars 05–07 — har qanday belgi, hech qanday \"notanish\" yoʻq\n  │  BPE (merges)        Dars 08–12 — eng koʻp juft → yangi token\n  ▼\ntokenlar  →  decode  →  matn         Dars 11"
            },
            {
              "kind": "text",
              "text": "Va bu zanjir atrofida:"
            },
            {
              "kind": "bullets",
              "items": [
                "**maʼlumot** — qayerdan, qaysi litsenziya bilan, qanday tozalanadi (Dars 15);",
                "**tezlik** — 17 soatlik trening 5 daqiqada (Dars 16);",
                "**halollik** — boʻlish, ifloslanish, imlo, hisobot (Dars 17);",
                "**bitta klass**, saqlash va isbot (Dars 18)."
              ]
            },
            {
              "kind": "text",
              "text": "Kurs boshidagi savol: \"nega oʻzbek tili AI uchun qimmat?\" Endi javobni **raqamda** bilasiz — va uni qanday kamaytirishni **qoʻlingiz bilan** qila olasiz."
            }
          ]
        },
        {
          "id": "9-muammo",
          "title": "9. Muammo",
          "blocks": [
            {
              "kind": "text",
              "text": "Tokenizator matnni raqamlarga aylantiradi. Lekin raqamlar hech narsani **tushunmaydi**. `[537, 3252, 2798]` — bu \"Oʻzbekiston Respublikasi Prezidenti\" ekanini biz bilamiz, kompyuter esa — yoʻq."
            },
            {
              "kind": "text",
              "text": "Keyingi tokenni **taxmin qiladigan** narsa kerak. Shu raqamlarni oʻqib, \"keyin nima keladi?\" degan savolga javob beradigan narsa."
            },
            {
              "kind": "text",
              "text": "**Endi tokenlar bor. Ularni oʻqiydigan model qurish kerak.**"
            }
          ]
        },
        {
          "id": "10-toliq-kod-tokenizator-py",
          "title": "10. Toʻliq kod — `tokenizator.py`",
          "blocks": [
            {
              "kind": "text",
              "text": "Kurs 1 ning butun natijasi — bitta fayl. Uni `tokenizator.py` deb saqlang."
            },
            {
              "kind": "code",
              "code": "import re\nimport json\nimport hashlib\nimport unicodedata\n\nNAQSH = r\" ?\\w+| ?[^\\s\\w]+|\\s+\"\nOKINA = \"\\u02bb\"\nTUTUQ = \"\\u02bc\"\nAPOSTROFLAR = \"'\\u2018\\u2019`\\u02bb\\u02bc\"\n\n\ndef normallashtir(matn):\n    matn = unicodedata.normalize(\"NFC\", matn)\n    belgilar = list(matn)\n    for i in range(len(belgilar)):\n        if belgilar[i] in APOSTROFLAR:\n            oldingi = \"\"\n            keyingi = \"\"\n            if i > 0:\n                oldingi = belgilar[i - 1]\n            if i < len(belgilar) - 1:\n                keyingi = belgilar[i + 1]\n            if oldingi in [\"g\", \"G\"]:\n                belgilar[i] = OKINA\n            elif oldingi in [\"o\", \"O\"] and keyingi.isalpha():\n                belgilar[i] = OKINA\n            elif oldingi.isalpha() and keyingi.isalpha():\n                belgilar[i] = TUTUQ\n    return \"\".join(belgilar)\n\n\ndef merge(tokenlar, juftlik, yangi_id):\n    yangi = []\n    i = 0\n    while i < len(tokenlar):\n        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:\n            yangi.append(yangi_id)\n            i += 2\n        else:\n            yangi.append(tokenlar[i])\n            i += 1\n    return yangi\n\n\ndef eng_juft(stats):\n    eng_son = max(stats.values())\n    nomzodlar = []\n    for juft in stats:\n        if stats[juft] == eng_son:\n            nomzodlar.append(juft)\n    return min(nomzodlar)\n\n\nclass Tokenizator:\n    def __init__(self):\n        self.merges = {}\n        self.vocab = {}\n        for i in range(256):\n            self.vocab[i] = bytes([i])\n        self.kesh = {}\n\n    def train(self, matn, vocab_size):\n        hisob = {}\n        for b in re.findall(NAQSH, normallashtir(matn)):\n            hisob[b] = hisob.get(b, 0) + 1\n        sozlar = []\n        sonlar = []\n        for b in hisob:\n            sozlar.append(list(b.encode(\"utf-8\")))\n            sonlar.append(hisob[b])\n\n        stats = {}\n        qayerda = {}\n        for i in range(len(sozlar)):\n            soz = sozlar[i]\n            for juft in zip(soz, soz[1:]):\n                stats[juft] = stats.get(juft, 0) + sonlar[i]\n                if juft not in qayerda:\n                    qayerda[juft] = set()\n                qayerda[juft].add(i)\n\n        for yangi_id in range(256, vocab_size):\n            if len(stats) == 0:\n                break\n            eng = eng_juft(stats)\n            for i in qayerda[eng]:\n                eski = sozlar[i]\n                yangi = merge(eski, eng, yangi_id)\n                if len(yangi) == len(eski):\n                    continue\n                for j in zip(eski, eski[1:]):\n                    stats[j] -= sonlar[i]\n                    if stats[j] == 0:\n                        del stats[j]\n                for j in zip(yangi, yangi[1:]):\n                    stats[j] = stats.get(j, 0) + sonlar[i]\n                    if j not in qayerda:\n                        qayerda[j] = set()\n                    qayerda[j].add(i)\n                sozlar[i] = yangi\n            del qayerda[eng]\n            self.merges[eng] = yangi_id\n            self.vocab[yangi_id] = self.vocab[eng[0]] + self.vocab[eng[1]]\n        self.kesh = {}\n\n    def _bolakni_kodla(self, bosh):\n        tk = list(bosh.encode(\"utf-8\"))\n        while len(tk) >= 2:\n            eng_j = None\n            eng_r = float(\"inf\")\n            for j in zip(tk, tk[1:]):\n                r = self.merges.get(j, float(\"inf\"))\n                if r < eng_r:\n                    eng_r = r\n                    eng_j = j\n            if eng_j is None:\n                break\n            tk = merge(tk, eng_j, self.merges[eng_j])\n        return tk\n\n    def encode(self, matn):\n        natija = []\n        for bosh in re.findall(NAQSH, normallashtir(matn)):\n            if bosh not in self.kesh:\n                self.kesh[bosh] = self._bolakni_kodla(bosh)\n            natija.extend(self.kesh[bosh])\n        return natija\n\n    def decode(self, ids):\n        qismlar = []\n        for tid in ids:\n            qismlar.append(self.vocab[tid])\n        return b\"\".join(qismlar).decode(\"utf-8\", errors=\"replace\")\n\n    def qismlar(self, matn):\n        natija = []\n        for tid in self.encode(matn):\n            natija.append(self.decode([tid]))\n        return natija\n\n    def save(self, fayl):\n        royxat = []\n        for juft in self.merges:\n            royxat.append([juft[0], juft[1], self.merges[juft]])\n        malumot = {\"versiya\": 1, \"naqsh\": NAQSH, \"merges\": royxat}\n        with open(fayl, \"w\", encoding=\"utf-8\") as f:\n            f.write(json.dumps(malumot))\n\n\ndef yukla(fayl):\n    with open(fayl, encoding=\"utf-8\") as f:\n        malumot = json.loads(f.read())\n    if malumot[\"naqsh\"] != NAQSH:\n        print(\"DIQQAT: fayldagi naqsh boshqa!\")\n    yangi = Tokenizator()\n    for a, b, tid in malumot[\"merges\"]:\n        yangi.merges[(a, b)] = tid\n        yangi.vocab[tid] = yangi.vocab[a] + yangi.vocab[b]\n    return yangi\n\n\n# ---- Ishlatish ----\n# Oʻqitish (bir marta, bir necha daqiqa):\n#     tok = Tokenizator()\n#     tok.train(open(\"train.txt\", encoding=\"utf-8\").read(), 16384)\n#     tok.save(\"tokenizator.json\")\n\ntok = yukla(\"tokenizator.json\")\njumla = \"O‘zbekiston Respublikasi Prezidenti farmon imzoladi.\"\nprint(tok.qismlar(jumla))\nprint(tok.decode(tok.encode(jumla)))",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "['Oʻzbekiston', ' Respublikasi', ' Prezidenti', ' farmon', ' imzoladi', '.']\nOʻzbekiston Respublikasi Prezidenti farmon imzoladi.",
              "label": "Kutilgan natija"
            },
            {
              "kind": "text",
              "text": "Bir nechta oʻzgarish, 4-boʻlimdagi klassga nisbatan:"
            },
            {
              "kind": "bullets",
              "items": [
                "`train` endi **oʻzi** hamma ishni qiladi (Dars 16 dagi `train_tez2` ning ichi) — fayl boshqa funksiyalarga bogʻliq emas.",
                "`_bolakni_kodla` — Dars 12 dagi `encode` ning bitta boʻlak uchun qismi. Nom oldidagi `_` — \"bu ichki metod, tashqaridan chaqirmang\" degan kelishuv. Python buni taqiqlamaydi, faqat ishora qiladi. U Dars 12 dagidan biroz qisqa: juftlarni sanash shart emas — bizga faqat **qaysi juftlar borligi** va ularning darajasi kerak.",
                "`save` — klassning ichida."
              ]
            },
            {
              "kind": "text",
              "text": "Tokenizator fayldan bir zumda yuklandi. 5 daqiqalik trening shart emas."
            }
          ]
        },
        {
          "id": "11-ozingiz-yozing",
          "title": "11. Oʻzingiz yozing",
          "blocks": [
            {
              "kind": "text",
              "text": "`save` va `yukla` ni toʻldiring:"
            },
            {
              "kind": "code",
              "code": "def save(self, fayl):\n    royxat = []\n    for juft in self.___:\n        royxat.append([juft[___], juft[___], self.merges[___]])\n    malumot = {\"versiya\": 1, \"naqsh\": ___, \"merges\": royxat}\n    with open(fayl, \"___\", encoding=\"utf-8\") as f:\n        f.write(json.___(malumot))\n\n\ndef yukla(fayl):\n    with open(fayl, encoding=\"utf-8\") as f:\n        malumot = json.___(f.read())\n    yangi = ___()\n    for a, b, tid in malumot[\"___\"]:\n        yangi.merges[(a, b)] = ___\n        yangi.vocab[tid] = yangi.vocab[___] + yangi.vocab[___]\n    return ___",
              "lang": "python",
              "mode": "template"
            },
            {
              "kind": "reveal",
              "summary": "Yechimni koʻrsatish",
              "blocks": [
                {
                  "kind": "code",
                  "code": "def save(self, fayl):\n    royxat = []\n    for juft in self.merges:\n        royxat.append([juft[0], juft[1], self.merges[juft]])\n    malumot = {\"versiya\": 1, \"naqsh\": NAQSH, \"merges\": royxat}\n    with open(fayl, \"w\", encoding=\"utf-8\") as f:\n        f.write(json.dumps(malumot))\n\n\ndef yukla(fayl):\n    with open(fayl, encoding=\"utf-8\") as f:\n        malumot = json.loads(f.read())\n    yangi = Tokenizator()\n    for a, b, tid in malumot[\"merges\"]:\n        yangi.merges[(a, b)] = tid\n        yangi.vocab[tid] = yangi.vocab[a] + yangi.vocab[b]\n    return yangi\n\n\nTokenizator.save = save\ntok_t = yukla(\"tokenizator.json\")\nprint(tok_t.encode(\"Salom, dunyo!\") == tok.encode(\"Salom, dunyo!\"))",
                  "lang": "python",
                  "mode": "static"
                },
                {
                  "kind": "output",
                  "text": "True"
                },
                {
                  "kind": "text",
                  "text": "Eng koʻp qilinadigan xatolar:"
                },
                {
                  "kind": "steps",
                  "items": [
                    "`yangi.merges[a, b] = tid` oʻrniga `yangi.merges[[a, b]] = tid` — roʻyxat lugʻat kaliti boʻla olmaydi: `TypeError: unhashable type: 'list'`. JSON kortejni roʻyxat qilib qaytaradi — uni yana kortejga aylantirish kerak: `(a, b)`.",
                    "`vocab` ni qayta qurishni unutish — `encode` ishlaydi (u faqat `merges` dan foydalanadi), lekin `decode` `KeyError` beradi. Yarim ishlaydigan tokenizator — eng xavflisi: 5-boʻlimdagi 2-tekshiruv uni ushlaydi, 1-tekshiruv — yoʻq.",
                    "`\"w\"` oʻrniga `\"a\"` (qoʻshish rejimi) — fayl oxiriga ikkinchi JSON yoziladi va `json.loads` xato beradi."
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "12-mashqlar",
          "title": "12. Mashqlar",
          "blocks": [
            {
              "kind": "exercise",
              "label": "Mashq 1",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Ishga tushirmasdan ayting: nima chop etiladi?"
                },
                {
                  "kind": "pre",
                  "text": "s = Sanagich()\nt = s\nt.qosh()\nt.qosh()\nprint(s.son)"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "s = Sanagich()\nt = s\nt.qosh()\nt.qosh()\nprint(s.son)",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "2"
                  },
                  {
                    "kind": "text",
                    "text": "**2**, nol emas. `t = s` — **yangi nusxa yasamaydi**. `t` va `s` — bitta sanagichning ikki nomi. Yangi nusxa faqat `Sanagich()` — qavs bilan — yasaladi."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 17 dagi `list(korpus)` ni eslang — aynan shu sabab: `aralash = korpus` deb yozsangiz, `shuffle` `korpus` ning oʻzini aralashtirardi."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 2",
              "blocks": [
                {
                  "kind": "text",
                  "text": "`Tokenizator` ga `siqish(matn)` metodini qoʻshing: matnning **bayt** soni / **token** soni (bitta token oʻrtacha necha baytni bosadi). Uni ikkala tokenizator uchun test'da hisoblang."
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "def siqish(self, matn):\n    return len(normallashtir(matn).encode(\"utf-8\")) / len(self.encode(matn))\n\n\nTokenizator.siqish = siqish\n\nprint(f\"bizniki:       {tok.siqish(test_matn):.3f} bayt/token\")\nhf_ids = hf.encode(test_matn, add_special_tokens=False)\nprint(f\"uzbek-bpe-16k: {len(test_matn.encode('utf-8')) / len(hf_ids):.3f} bayt/token\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "bizniki:       4.539 bayt/token\nuzbek-bpe-16k: 3.903 bayt/token"
                  },
                  {
                    "kind": "text",
                    "text": "Bu — maqolalardagi ikkinchi koʻrsatkich (*bytes per token*). Fertility \"soʻzga nechta token\" deydi, bu esa \"tokenga necha bayt\". Biri kattaroq — yaxshi, ikkinchisi kichikroq — yaxshi."
                  },
                  {
                    "kind": "text",
                    "text": "Eʼtibor bering: bizniki baytni **normallashtirilgan** matndan sanaydi. `ʻ` 2 bayt, `'` 1 bayt — demak normalizatsiya matnni biroz **uzaytiradi**. Bu kichik farq — lekin halol solishtiruvda uni ham bilish kerak. Fertility esa soʻzlarni sanaydi va bu muammodan holi — shuning uchun bu kursda asosiy oʻlchov — fertility."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 3",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Saqlangan fayldagi **bitta** birlashtirishni oʻzgartiring (masalan, 1000-sining raqamlarini almashtiring) va yuklang. 5-boʻlimdagi uchta tekshiruvdan qaysilari buni ushlaydi?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "with open(\"tokenizator.json\", encoding=\"utf-8\") as f:\n    malumot = json.loads(f.read())\n\na, b, tid = malumot[\"merges\"][1000]\nmalumot[\"merges\"][1000] = [b, a, tid]\n\nwith open(\"buzuq.json\", \"w\", encoding=\"utf-8\") as f:\n    f.write(json.dumps(malumot))\n\ntok3 = yukla(\"buzuq.json\")\nprint(\"merges:\", tok3.merges == tok.merges)\nprint(\"encode:\", tok3.encode(test_matn) == tok.encode(test_matn))\nprint(\"decode:\", tok3.decode(tok3.encode(test_matn)) == normallashtir(test_matn))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "merges: False\nencode: False\ndecode: True"
                  },
                  {
                    "kind": "text",
                    "text": "16 128 tadan **bitta** birlashtirish oʻzgardi — va `merges` ham, `encode` ham buni darhol koʻrsatdi."
                  },
                  {
                    "kind": "text",
                    "text": "Lekin oxirgi qatorga qarang: **round-trip** (Dars 11) baribir `True`! Buzuq tokenizator matnni baribir toʻgʻri qaytaradi — chunki `vocab` ham \"buzuq\" tartibda qurildi va har bir token oʻzining (notoʻgʻri) baytlariga toʻgʻri qaytadi. Round-trip — tokenizator **ishlashini** tekshiradi, u **aynan oʻsha** ekanini emas."
                  },
                  {
                    "kind": "note",
                    "tone": "tip",
                    "text": "\"Ishlaydi\" va \"aynan oʻsha\" — ikki xil savol. Ikkinchisi uchun — barmoq izi va natijalarni solishtirish."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 4",
              "blocks": [
                {
                  "kind": "text",
                  "text": "Mening tokenizatorimda maxsus token bor: `<|endoftext|>`. Uni kodlab koʻring — ikkala tokenizatorda. Farq nima, va nima uchun model uchun bunday token kerak?"
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "code",
                    "code": "belgi = \"<|endoftext|>\"\n\nprint(\"uzbek-bpe-16k:\", hf.encode(belgi, add_special_tokens=False))\nprint(\"bizniki:      \", tok.encode(belgi))\nprint(tok.qismlar(belgi))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "uzbek-bpe-16k: [0]\nbizniki:       [60, 124, 325, 100, 611, 116, 2688, 116, 124, 62]\n['<', '|', 'en', 'd', 'of', 't', 'ex', 't', '|', '>']"
                  },
                  {
                    "kind": "text",
                    "text": "Mening tokenizatorimda u — **bitta** token, raqami 0. Biznikida — **10 ta** oddiy\nboʻlak: `<`, `|`, `en`, `d`, `of`… — chunki biz bunday tokenni hech qachon qoʻshmaganmiz, va bu belgilar oʻzbekcha jumlalarda deyarli uchramaydi."
                  },
                  {
                    "kind": "text",
                    "text": "Nima uchun kerak? Model oʻqiganda hujjatlar ketma-ket tizilgan boʻladi: maqola, keyin boshqa maqola, keyin yana. Model **qayerda bitta matn tugab, boshqasi boshlanganini** bilishi kerak — aks holda u metro haqidagi maqoladan keyin palov retsepti kelishini \"oʻrganib\" oladi. `<|endoftext|>` — shu chegara."
                  },
                  {
                    "kind": "text",
                    "text": "Bu Kurs 2 ning birinchi qadamlaridan biri."
                  }
                ]
              }
            },
            {
              "kind": "exercise",
              "label": "Mashq 5 (eng muhimi)",
              "blocks": [
                {
                  "kind": "text",
                  "text": "7-boʻlimda mening tokenizatorim `‘` tufayli yutqazdi. Uni **qayta oʻqitmasdan** tuzating. `hf.backend_tokenizer.normalizer` — uning normalizatori. Dars 14 dagi qoidalarni Hugging Face normalizatori qilib yozing va oʻrniga qoʻying. Keyin fertility ni qayta oʻlchang va `'dunyo'` ni tekshiring."
                }
              ],
              "answer": {
                "summary": "Javobni koʻrsatish",
                "blocks": [
                  {
                    "kind": "text",
                    "text": "Avval — hozirgi normalizator nima qiladi:"
                  },
                  {
                    "kind": "code",
                    "code": "misol = \"O\\u2018zbekiston o\\u2019qish g`alaba U 'dunyo' dedi ma'no\"\nprint(hf.backend_tokenizer.normalizer.normalize_str(misol))",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "O‘zbekiston oʻqish gʻalaba U 'dunyoʻ dedi maʼno"
                  },
                  {
                    "kind": "text",
                    "text": "`‘` — oʻzgarmadi. `'dunyo'` — `'dunyoʻ` boʻldi. Endi Dars 14 qoidalari bilan yangi normalizator:"
                  },
                  {
                    "kind": "code",
                    "code": "from tokenizers import normalizers, Regex\n\nyangi_norm = normalizers.Sequence([\n    normalizers.Replace(\"\\u2018\", \"'\"),\n    normalizers.Replace(\"\\u2019\", \"'\"),\n    normalizers.Replace(\"`\", \"'\"),\n    normalizers.Replace(\"g'\", \"g\\u02bb\"),\n    normalizers.Replace(\"G'\", \"G\\u02bb\"),\n    normalizers.Replace(Regex(\"o'(?=\\\\p{L})\"), \"o\\u02bb\"),\n    normalizers.Replace(Regex(\"O'(?=\\\\p{L})\"), \"O\\u02bb\"),\n    normalizers.Replace(Regex(\"(?<=\\\\p{L})'(?=\\\\p{L})\"), \"\\u02bc\"),\n])\n\nhf.backend_tokenizer.normalizer = yangi_norm\nprint(hf.backend_tokenizer.normalizer.normalize_str(misol))\nprint(f\"uzbek-bpe-16k (tuzatilgan): {fertility_hf(test_matn, hf):.3f}\")",
                    "lang": "python",
                    "mode": "static"
                  },
                  {
                    "kind": "output",
                    "text": "Oʻzbekiston oʻqish gʻalaba U 'dunyo' dedi maʼno\nuzbek-bpe-16k (tuzatilgan): 1.951"
                  },
                  {
                    "kind": "text",
                    "text": "Qator-qator:"
                  },
                  {
                    "kind": "bullets",
                    "items": [
                      "`normalizers.Sequence([...])` — normalizatorlar zanjiri, tartib bilan (Dars 14: tartib muhim!).",
                      "Birinchi uchta qator — hamma variantlarni bitta `'` ga yigʻadi. **`‘` — yangi.**",
                      "`g'` → `gʻ` — **har doim** (Dars 14, 1-qoida).",
                      "`Regex(\"o'(?=\\\\p{L})\")` — `o'`, faqat **keyin harf** kelsa. `(?=...)` — \"oldinda shu boʻlsin, lekin uni olma\". Bu — Dars 14 dagi `keyingi.isalpha()` sharti. `'dunyo'` endi buzilmaydi.",
                      "Oxirgisi — ikki harf orasidagi `'` → tutuq `ʼ` (3-qoida). `(?<=\\\\p{L})` — \"orqada harf boʻlsin\"."
                    ]
                  },
                  {
                    "kind": "text",
                    "text": "**Natija:** fertility 2.119 dan **1.951** ga tushdi va `'dunyo'` tuzaldi. Tokenizatorning **bitta ham** birlashtirishi oʻzgarmadi — faqat uning oldidagi qoidalar."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 14 dagi xulosa: **normalizatsiya — eng arzon richag.** Bu safar siz uni boshqa odamning — kurs muallifining — tokenizatoriga qoʻlladingiz."
                  },
                  {
                    "kind": "media",
                    "id": "p4",
                    "title": "Qayta oʻqitmasdan"
                  },
                  {
                    "kind": "text",
                    "text": "Ushbu tuzatish xotirada: `hf` ni qayta yuklasangiz, eski normalizator qaytadi. Saqlash uchun — `hf.save_pretrained(\"uzbek-bpe-16k-tuzatilgan\")`."
                  }
                ]
              }
            }
          ]
        },
        {
          "id": "13-xulosa",
          "title": "13. Xulosa",
          "blocks": [
            {
              "kind": "steps",
              "items": [
                "**Klass** — qolip. **Obyekt** — undan yasalgan nusxa. `self` — \"men oʻzim\". `__init__` — yaratilganda ishlaydi.",
                "Har bir metodning birinchi parametri — `self`. Unutsangiz — `takes 0 positional arguments but 1 was given`.",
                "`Tokenizator` — 7 ta tarqoq narsa bitta joyda. Normalizatsiyani endi unutib boʻlmaydi.",
                "JSON kortej kalitni saqlay olmaydi — `[a, b, id]` roʻyxati. **Naqsh** va **versiya** ham faylga yoziladi.",
                "Isbot: **saqla → yukla → yana saqla** — fayl izi bir xil; butun test bir xil kodlanadi. Round-trip — yetarli emas (Mashq 3).",
                "`AutoTokenizer.from_pretrained` — Hugging Face formatidagi tokenizatorni yuklaydi. `Ġ` va `Ê»` — ichki baytli yozuv, xato emas.",
                "`uzbek-bpe-16k` da ikki xato bor: `‘` tanilmaydi, `'dunyo'` buziladi. Ikkalasi ham normalizatorni almashtirish bilan, **qayta oʻqitmasdan** tuzaladi.",
                "Common Voice test'da — bizniki yutadi; yangiliklarga oʻxshash matnda — meniki. **\"Eng yaxshi tokenizator\" yoʻq — faqat \"shu matn uchun eng yaxshi\" bor.**",
                "Turli test'dagi raqamlarni solishtirmang."
              ]
            }
          ]
        },
        {
          "id": "keyingi-qadam-kurs-2",
          "title": "Keyingi qadam — Kurs 2",
          "blocks": [
            {
              "kind": "text",
              "text": "**Kurs 2 — Til modeli.** Tokenlarni oʻqib, keyingi tokenni taxmin qiladigan model: eng oddiy hisoblagichdan boshlab, oʻz GPT ingizgacha — xuddi shu `tokenizator.py` ustida."
            },
            {
              "kind": "text",
              "text": "Kurs 2 ning birinchi savoli: *agar faqat oldingi **bitta** tokenga qarab keyingisini taxmin qilsak — bu qanchalik yomon ishlaydi?*"
            }
          ]
        }
      ],
      "exercises": [],
      "needs": "Dars 01–17. Dars 17 dagi boʻlinish (`seed 0`, 90/10) va toza test"
    }
  ]
};
