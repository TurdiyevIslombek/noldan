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
                  "**1.839**"
                ],
                [
                  "GPT-4o",
                  "200 019",
                  "2.724"
                ],
                [
                  "GPT-2",
                  "50 257",
                  "3.584"
                ]
              ]
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
                    "text": "**Mana shu farq — butun kursning sababi.** Fertility (so'zga to'g'ri keladigan token soni) GPT-4o uchun o'zbek tilida 2.724. Ya'ni har bir so'z o'rtacha 2.7 ta tokenga bo'linadi."
                  },
                  {
                    "kind": "text",
                    "text": "Biz quradigan tokenizatorda bu raqam **1.839** bo'ladi — chunki uning lug'ati o'zbek so'zlaridan qurilgan."
                  },
                  {
                    "kind": "text",
                    "text": "Dars 15 da siz bu raqamni **o'z tokenizatoringizda o'zingiz o'lchaysiz**."
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
              "kind": "code",
              "code": "natija = []              # 1. boʻsh roʻyxat yasa\n# ... bu yerda toʻldirasan ...\nnatija.append(nimadir)   # 2. har safar bittadan qoʻsh",
              "lang": "python",
              "mode": "type"
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
              "text": "Dars 15 da siz tokenizatorni haqiqiy katta o'zbek matnida o'qitasiz. U birinchi o'rganadigan tokenlar taxminan shular bo'ladi:"
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
                    "text": "Dars 01 dagi `1.839` va `2.724` raqamlari — aynan shu farqning o'lchovi."
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
                    "text": "**Nima uchun bu falokat:** tasavvur qiling, internetdagi o'zbek matnining 40% ida `'` (39), 30% ida `‘` (8216), 30% ida `ʻ` (699) ishlatilgan. Tokenizator bu uchtasini uch xil so'z deb o'rganadi, va har birini uchdan bir ma'lumot bilan o'rganadi."
                  },
                  {
                    "kind": "text",
                    "text": "Normalizatsiyadan keyin esa uchalasi **bitta** so'z bo'ladi va butun ma'lumot bir joyga yig'iladi. Shuning uchun Dars 14 dagi ikki qator kod tokenizator sifatini sezilarli oshiradi — u modelga uch barobar ko'p ma'lumot beradi, hech narsa qo'shmasdan."
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
              "text": "Dars 01 dagi jadvalni eslang: yaxshi tokenizatorda `fertility` **1.839** edi, ya'ni har bir so'z uchun ~2 token. Bu jumlada 3 ta so'z bor, demak yaxshi tokenizator ~6 token ishlatishi kerak."
            },
            {
              "kind": "text",
              "text": "Bizniki 29 ta ishlatyapti. **Besh barobar ko'p.**"
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
                  "3.584"
                ],
                [
                  "GPT-4o",
                  "200 019",
                  "2.724"
                ],
                [
                  "uzbek-bpe-16k",
                  "16 384",
                  "**1.839**"
                ]
              ]
            },
            {
              "kind": "text",
              "text": "Bizniki eng yomoni. GPT-4o dan **uch barobar**, maqsaddan **besh barobar** yomon."
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
              "code": "print(\"bayt tokenizator :\", round(1024 / 8.938), \"ta soʻz\")\nprint(\"GPT-4o           :\", round(1024 / 2.724), \"ta soʻz\")\nprint(\"uzbek-bpe-16k    :\", round(1024 / 1.839), \"ta soʻz\")",
              "lang": "python",
              "mode": "type"
            },
            {
              "kind": "output",
              "text": "bayt tokenizator : 115 ta soʻz\nGPT-4o           : 376 ta soʻz\nuzbek-bpe-16k    : 557 ta soʻz"
            },
            {
              "kind": "text",
              "text": "**115 ta so'z.** Bu taxminan yarim sahifa. Model bundan ortig'ini bir vaqtda ko'ra olmaydi."
            },
            {
              "kind": "text",
              "text": "Bir xil model, bir xil xotira — lekin yaxshi tokenizator bilan **beshdan bir ko'proq matn** sig'adi. Hech qanday qo'shimcha hisob, hech qanday qo'shimcha parametr. Faqat tokenizator."
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
              "text": "Model har bir tokenni **alohida** ishlaydi. 29 ta token = 29 ta qadam. 6 ta token = 6 ta qadam."
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
                    "text": "Shuning uchun natija 8.938 dan 1.839 gacha tushadi — chizig'iy emas, to'planib boradi."
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
                    "text": "`uzbek-bpe-16k` bilan esa 300 so'z = 552 token — **sig'adi**, hatto yarmidan ko'p joy qoladi."
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
                "**Fertility** — sifat o'lchovi. Bizniki **8.938**, GPT-4o 2.724, maqsad **1.839**.",
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
              "kind": "code",
              "code": "for juftlik in zip(tokenlar, tokenlar[1:]):",
              "lang": "python",
              "mode": "type"
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
                    "text": "Dars 01 dagi `1.839` va `2.724` farqining haqiqiy sababi shu."
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
      "title": "Birlashtirish (`merge`)",
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
              "kind": "code",
              "code": "if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:",
              "lang": "python",
              "mode": "type"
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
              "kind": "code",
              "code": "yangi.append(yangi_id)\ni += 2",
              "lang": "python",
              "mode": "type"
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
              "kind": "code",
              "code": "yangi.append(tokenlar[i])\ni += 1",
              "lang": "python",
              "mode": "type"
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
              "text": "**16 128 marta takrorlansa**, sizning lug'atingizda `lar`, `lari`, `larida`, `bolalar`, `kitoblar` kabi tokenlar paydo bo'ladi. Aynan shuning uchun `fertility` 8.938 dan 1.839 gacha tushadi."
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
    }
  ]
};
