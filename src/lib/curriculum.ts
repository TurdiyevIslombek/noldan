/* --------------------------------------------------------------------
   Noldan curriculum data.

   Source of truth: "Noldan tokenizator qurish — boshlangʻich kurs" by
   Islombek Turdiyev. The Uzbek copy here is the author's own text,
   transcribed verbatim — do not paraphrase it. Only structure was added
   so the site can render it as lesson pages.

   Inline formatting inside `text` supports **bold** and `code`.
   -------------------------------------------------------------------- */

export type Block =
  | { kind: "text"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "steps"; items: string[] }
  | { kind: "note"; tone: "tip" | "warn" | "key"; text: string }
  | { kind: "code"; code: string }
  | { kind: "output"; text: string }
  | { kind: "flow"; text: string }
  | { kind: "viz"; id: string }
  | { kind: "subhead"; text: string };

export type Exercise = {
  id: string;
  label: string;
  prompt: string;
  hint?: string;
  answerCode?: string;
  answerOutput?: string;
  answerText?: string;
};

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type Lesson = {
  id: string;
  /** Display number. `null` for the non-numbered opening guide. */
  n: number | null;
  title: string;
  subtitle: string;
  minutes: number;
  /** Group heading, for courses split into parts. */
  part?: string;
  /** "soon" = listed in the syllabus, content not written yet. */
  status?: "ready" | "soon";
  intro: Block[];
  sections: Section[];
  exercises: Exercise[];
};

export type Course = {
  id: string;
  name: string;
  short: string;
  tagline: string;
  lessons: Lesson[];
};

/* ------------------------------------------------------------------ */

const L_START: Lesson = {
  id: "boshlash",
  n: null,
  title: "Qanday oʻqish kerak",
  subtitle: "Boshlashdan oldin — 5 ta qoida",
  minutes: 4,
  intro: [
    {
      kind: "text",
      text: "Bu kursda biz sunʼiy intellekt (AI) uchun eng muhim narsalardan birini — **tokenizator**ni noldan quramiz.",
    },
    {
      kind: "note",
      tone: "key",
      text: "**Tokenizator** — bu matnni AI tushunadigan raqamlarga aylantiruvchi vosita.",
    },
    {
      kind: "text",
      text: "Agar siz hayotingizda bir marta ham kod yozmagan boʻlsangiz — xavotir olmang. Har bir qatorni sodda tilda tushuntiramiz, natijasini koʻrsatamiz, va oxirida oʻzingizning tokenizatoringizni yasashni oʻrganasiz.",
    },
    {
      kind: "note",
      tone: "tip",
      text: "**Yakuniy maqsad:** oʻzbek tili uchun GPT-4 nikidan tejamkorroq tokenizator — har bir soʻzga oʻrtacha **1.85 token** (GPT-4 da 2.62), lekin ~12 baravar kichik lugʻat bilan.",
    },
  ],
  sections: [
    {
      id: "qoidalar",
      title: "Besh qadam",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Bepul vosita oching.** Kompyuteringizga hech narsa oʻrnatish shart emas. Google Colab yoki Kaggle ga kiring va yangi “notebook” oching.",
            "**Kodni yozing.** Har bir kod boʻlagini “katak” (cell) ichiga yozing va **Shift + Enter** bosing — natija darhol chiqadi.",
            "**Oʻzingiz yozib koʻring.** Nusxa koʻchirmang — qoʻlingiz bilan yozing. Shunda tez oʻrganasiz.",
            "**Natijani solishtiring.** Har kod ostida **Natija** boʻlimi bor — sizniki bilan bir xilmi, tekshiring.",
            "**Mashqlarni bajaring.** Har dars oxirida mashqlar bor. Avval **oʻzingiz** yeching, keyingina “Javobni koʻrish”ni oching.",
          ],
        },
      ],
    },
  ],
  exercises: [],
};

const L0: Lesson = {
  id: "dars-0",
  n: 0,
  title: "Kodlash asoslari",
  subtitle: "print, oʻzgaruvchi, roʻyxat, lugʻat, sikl, funksiya",
  minutes: 15,
  intro: [
    {
      kind: "text",
      text: "Kod — bu kompyuterga beriladigan **buyruqlar**. Biz **Python** tilida yozamiz: u sodda va AI dunyosida eng koʻp ishlatiladigan til.",
    },
    {
      kind: "text",
      text: "Bu darsda 6 ta asosiy narsani oʻrganamiz: ekranga yozish, oʻzgaruvchi, matn, roʻyxat, lugʻat, sikl va funksiya. Bularning hammasi keyin tokenizator qurishda kerak boʻladi.",
    },
  ],
  sections: [
    {
      id: "0-1",
      title: "0.1 · Ekranga yozish (print)",
      blocks: [
        { kind: "text", text: "`print` kompyuterga “buni ekranga yoz” deb buyuradi." },
        { kind: "code", code: 'print("Salom, dunyo!")' },
        { kind: "subhead", text: "Har bir qator nima qiladi:" },
        {
          kind: "bullets",
          items: [
            "`print(...)` — qavs ichidagini ekranga chiqaradi.",
            "`\"...\"` — qoʻshtirnoq ichidagi narsa **matn** (soʻz yoki gap).",
          ],
        },
        { kind: "output", text: "Salom, dunyo!" },
      ],
    },
    {
      id: "0-2",
      title: "0.2 · Oʻzgaruvchi",
      blocks: [
        {
          kind: "text",
          text: "Oʻzgaruvchi — bu **quticha**ga oʻxshaydi. Unga bir qiymat solamiz, keyin nomi orqali ishlatamiz.",
        },
        { kind: "code", code: 'ism = "Islom"\nprint(ism)' },
        {
          kind: "bullets",
          items: [
            '`ism = "Islom"` — `ism` nomli qutichaga `"Islom"` matnini solamiz.',
            "`print(ism)` — quticha ichidagini ekranga chiqaramiz.",
          ],
        },
        { kind: "output", text: "Islom" },
      ],
    },
    {
      id: "0-3",
      title: "0.3 · Sonlar bilan ishlash",
      blocks: [
        { kind: "text", text: "Kompyuter sonlar bilan hisob-kitob qila oladi." },
        { kind: "code", code: "son = 5\nprint(son + 3)" },
        {
          kind: "bullets",
          items: ["`son = 5` — `5` sonini saqlaymiz.", "`son + 3` — 5 ga 3 ni qoʻshamiz."],
        },
        { kind: "output", text: "8" },
      ],
    },
    {
      id: "0-4",
      title: "0.4 · Matn: uzunlik va harflar",
      blocks: [
        {
          kind: "text",
          text: "Matn — bu harflar ketma-ketligi. Har bir harfning **oʻrni** (indeksi) bor, va sanoq **0 dan** boshlanadi.",
        },
        { kind: "code", code: 'matn = "olma"\nprint(len(matn))\nprint(matn[0])' },
        {
          kind: "bullets",
          items: [
            "`len(matn)` — matndagi harflar sonini beradi.",
            "`matn[0]` — 0-oʻrindagi (yaʼni **birinchi**) harfni beradi.",
          ],
        },
        { kind: "output", text: "4\no" },
        {
          kind: "note",
          tone: "warn",
          text: "**Diqqat:** Pythonda sanoq 1 dan emas, **0 dan** boshlanadi. Shuning uchun `matn[0]` birinchi harf, `matn[1]` ikkinchi harf.",
        },
      ],
    },
    {
      id: "0-5",
      title: "0.5 · Roʻyxat",
      blocks: [
        {
          kind: "text",
          text: "Roʻyxat — bir nechta narsani bitta joyda saqlaydi (masalan, mevalar roʻyxati).",
        },
        {
          kind: "code",
          code: 'mevalar = ["olma", "nok", "uzum"]\nprint(mevalar[0])\nmevalar.append("anor")\nprint(mevalar)',
        },
        {
          kind: "bullets",
          items: [
            "`[...]` — kvadrat qavs **roʻyxat** yasaydi.",
            "`mevalar[0]` — roʻyxatning birinchi elementi.",
            '`.append("anor")` — roʻyxat **oxiriga** yangi element qoʻshadi.',
          ],
        },
        { kind: "output", text: "olma\n['olma', 'nok', 'uzum', 'anor']" },
      ],
    },
    {
      id: "0-6",
      title: "0.6 · Lugʻat",
      blocks: [
        {
          kind: "text",
          text: "Lugʻat — “kalit → qiymat” juftliklarini saqlaydi. Xuddi haqiqiy lugʻatdek: soʻz (kalit) → maʼnosi (qiymat).",
        },
        { kind: "code", code: 'yoshlar = {"Islom": 18, "Aziz": 20}\nprint(yoshlar["Islom"])' },
        {
          kind: "bullets",
          items: [
            "`{...}` — figurali qavs **lugʻat** yasaydi.",
            '`"Islom": 18` — kalit `"Islom"`, qiymati `18`.',
            "`yoshlar[\"Islom\"]` — kalit boʻyicha qiymatni topadi.",
          ],
        },
        { kind: "output", text: "18" },
        {
          kind: "note",
          tone: "tip",
          text: "Lugʻat tokenizatorda juda muhim boʻladi — biz unda “juftlik → nechchi marta uchradi” ni saqlaymiz.",
        },
      ],
    },
    {
      id: "0-7",
      title: "0.7 · Sikl (for)",
      blocks: [
        { kind: "text", text: "Sikl — bir ishni roʻyxatdagi **har bir** element uchun takrorlaydi." },
        {
          kind: "code",
          code: 'mevalar = ["olma", "nok", "uzum"]\nfor meva in mevalar:\n    print(meva)',
        },
        {
          kind: "bullets",
          items: [
            "`for meva in mevalar:` — roʻyxatdagi har bir elementni navbat bilan `meva`ga oladi.",
            "`print(meva)` — har safar shu elementni chiqaradi.",
          ],
        },
        { kind: "output", text: "olma\nnok\nuzum" },
        {
          kind: "note",
          tone: "warn",
          text: "Ichki qatordagi **boʻsh joy** (chekinish, odatda 4 ta probel) Pythonda majburiy. U “bu qator siklga tegishli” deb bildiradi.",
        },
      ],
    },
    {
      id: "0-8",
      title: "0.8 · Funksiya",
      blocks: [
        {
          kind: "text",
          text: "Funksiya — koddan bir boʻlakni nom bilan saqlaydi, keyin uni istagancha ishlatamiz. Xuddi **retsept** kabi: bir marta yozasiz, koʻp marta ishlatasiz.",
        },
        { kind: "code", code: "def qoshish(a, b):\n    return a + b\n\nprint(qoshish(2, 3))" },
        {
          kind: "bullets",
          items: [
            "`def qoshish(a, b):` — `qoshish` nomli funksiya yasaymiz; u 2 ta son (`a` va `b`) oladi.",
            "`return a + b` — natijani (yigʻindini) **qaytaradi**.",
            "`qoshish(2, 3)` — funksiyani `2` va `3` bilan **chaqiramiz**.",
          ],
        },
        { kind: "output", text: "5" },
      ],
    },
  ],
  exercises: [
    {
      id: "0-1",
      label: "Mashq 0.1",
      prompt: "Oʻz ismingizni ekranga chiqaring.",
      answerCode: 'print("Aziz")',
      answerOutput: "Aziz",
    },
    {
      id: "0-2",
      label: "Mashq 0.2",
      prompt: "10 va 7 sonlarini qoʻshib, natijani chiqaring.",
      answerCode: "print(10 + 7)",
      answerOutput: "17",
    },
    {
      id: "0-3",
      label: "Mashq 0.3",
      prompt: "`\"kitob\"` soʻzining **oxirgi** harfini chiqaring.",
      hint: "Oxirgi harf uchun manfiy indeks `matn[-1]` ishlatiladi.",
      answerCode: 'matn = "kitob"\nprint(matn[-1])',
      answerOutput: "b",
    },
    {
      id: "0-4",
      label: "Mashq 0.4",
      prompt: "`[2, 4, 6]` roʻyxatidagi har bir sonni 2 ga koʻpaytirib chiqaring.",
      answerCode: "sonlar = [2, 4, 6]\nfor s in sonlar:\n    print(s * 2)",
      answerOutput: "4\n8\n12",
    },
  ],
};

const L1: Lesson = {
  id: "dars-1",
  n: 1,
  title: "AI raqamlar bilan ishlaydi",
  subtitle: "Unicode, baytlar va oʻzbekcha harflar",
  minutes: 12,
  intro: [
    {
      kind: "text",
      text: "Bir sirni ochamiz: kompyuter aslida **harflarni tushunmaydi**. U faqat **raqamlar** bilan ishlaydi. Shuning uchun matnni AI ga berishdan oldin uni **raqamlarga aylantirishimiz** kerak.",
    },
    {
      kind: "text",
      text: "Bu darsda har bir harf qanday raqamga aylanishini koʻramiz. Aynan shu — tokenizatorning birinchi qadami.",
    },
  ],
  sections: [
    {
      id: "1-1",
      title: "1.1 · Har harfning raqami bor (ord, chr)",
      blocks: [
        {
          kind: "text",
          text: "Jahon standartida har bir belgi (harf, raqam, tinish belgisi) uchun bitta raqam bor — bu **Unicode**. `ord()` harfdan raqamni, `chr()` raqamdan harfni beradi.",
        },
        { kind: "code", code: 'print(ord("A"))\nprint(chr(65))' },
        {
          kind: "bullets",
          items: [
            '`ord("A")` — `"A"` harfining Unicode raqamini beradi.',
            "`chr(65)` — `65`-raqamga mos harfni beradi.",
          ],
        },
        { kind: "output", text: "65\nA" },
      ],
    },
    {
      id: "1-2",
      title: "1.2 · Boshqa harflar",
      blocks: [
        { kind: "text", text: "Har bir harfning oʻz raqami bor." },
        { kind: "code", code: 'print(ord("o"))\nprint(ord("z"))' },
        { kind: "output", text: "111\n122" },
      ],
    },
    {
      id: "1-3",
      title: "1.3 · Baytlar — kompyuterning asosiy tili",
      blocks: [
        {
          kind: "text",
          text: "Kompyuter ichida matn **baytlar**ga aylanadi. Bayt — bu **0 dan 255 gacha** boʻlgan raqam. `.encode(\"utf-8\")` matnni baytlarga aylantiradi.",
        },
        {
          kind: "code",
          code: 'matn = "salom"\nprint(matn.encode("utf-8"))\nprint(list(matn.encode("utf-8")))',
        },
        {
          kind: "bullets",
          items: [
            '`.encode("utf-8")` — matnni baytlarga aylantiradi.',
            "`b'salom'` — boshidagi `b` harfi “bu bayt” ekanini bildiradi.",
            "`list(...)` — baytlarni oddiy raqamlar roʻyxatiga aylantiradi.",
          ],
        },
        { kind: "output", text: "b'salom'\n[115, 97, 108, 111, 109]" },
        {
          kind: "note",
          tone: "tip",
          text: "Har bir bayt 0–255 oraligʻida. Demak bor-yoʻgʻi **256 ta** “asosiy belgi” bilan dunyodagi istalgan matnni yozish mumkin. Tokenizator aynan shu 256 tadan boshlanadi.",
        },
      ],
    },
    {
      id: "1-4",
      title: "1.4 · Oʻzbekcha harflar — bir nechta bayt",
      blocks: [
        {
          kind: "text",
          text: "Oddiy inglizcha harf = **1 bayt**. Ammo oʻzbekcha maxsus belgilar (masalan `oʻ`, `gʻ`) **bir nechta bayt** boʻladi.",
        },
        {
          kind: "code",
          code: 'soz = "oʻzbek"\nprint(len(soz))\nprint(list(soz.encode("utf-8")))\nprint(len(soz.encode("utf-8")))',
        },
        {
          kind: "bullets",
          items: [
            "`len(soz)` — **belgilar** soni (koʻz bilan koʻrgan harflar).",
            "`list(...encode...)` — baytlar roʻyxati.",
            "`len(...encode...)` — **baytlar** soni.",
          ],
        },
        { kind: "output", text: "6\n[111, 202, 187, 122, 98, 101, 107]\n7" },
        { kind: "viz", id: "bytes" },
        {
          kind: "note",
          tone: "key",
          text: "**Eng muhim tushuncha:** `\"oʻzbek\"` — 6 ta belgi, lekin **7 ta bayt**. Chunki `ʻ` (okina) belgisi **2 bayt** (`202, 187`) egallaydi. Aynan shu narsa — oʻzbek matni baytlarda “shishib ketishi” — oʻzbek tili uchun **maxsus tokenizator** kerakligining sababi.",
        },
      ],
    },
    {
      id: "1-5",
      title: "1.5 · Teskarisi: baytdan matnga (decode)",
      blocks: [
        { kind: "text", text: "Baytlardan matnni qaytarish ham mumkin." },
        {
          kind: "code",
          code: 'baytlar = [115, 97, 108, 111, 109]\nprint(bytes(baytlar).decode("utf-8"))',
        },
        {
          kind: "bullets",
          items: [
            "`bytes(...)` — raqamlar roʻyxatini baytlarga aylantiradi.",
            '`.decode("utf-8")` — baytlardan matnni tiklaydi.',
          ],
        },
        { kind: "output", text: "salom" },
        {
          kind: "note",
          tone: "tip",
          text: "Demak yoʻl ikki tomonlama: **matn → baytlar** (`encode`) va **baytlar → matn** (`decode`). Tokenizator ham xuddi shunday oldinga (kodlash) va orqaga (dekodlash) ishlaydi.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "1-1",
      label: "Mashq 1.1",
      prompt: "`\"non\"` soʻzining baytlarini roʻyxat qilib chiqaring.",
      answerCode: 'print(list("non".encode("utf-8")))',
      answerOutput: "[110, 111, 110]",
    },
    {
      id: "1-2",
      label: "Mashq 1.2",
      prompt: "`\"tosh\"` soʻzida nechta **belgi** va nechta **bayt** bor?",
      answerCode:
        'soz = "tosh"\nprint(len(soz), "belgi")\nprint(len(soz.encode("utf-8")), "bayt")',
      answerOutput: "4 belgi\n4 bayt",
      answerText: "Hammasi oddiy harf boʻlgani uchun belgi va bayt soni bir xil.",
    },
    {
      id: "1-3",
      label: "Mashq 1.3",
      prompt: "`\"gʻisht\"` soʻzining baytlarini chiqaring va nechta bayt ekanini toping.",
      answerCode:
        'soz = "gʻisht"\nprint(list(soz.encode("utf-8")))\nprint(len(soz.encode("utf-8")), "bayt")',
      answerOutput: "[103, 202, 187, 105, 115, 104, 116]\n7 bayt",
      answerText: "`gʻ` ichidagi okina yana `202, 187` — 2 bayt egalladi.",
    },
  ],
};

const L2: Lesson = {
  id: "dars-2",
  n: 2,
  title: "BPE gʻoyasi: juftliklarni sanash",
  subtitle: "get_stats va eng koʻp uchragan juftlik",
  minutes: 12,
  intro: [
    { kind: "text", text: "Endi tokenizatorning **yuragiga** oʻtamiz." },
    {
      kind: "text",
      text: "**Muammo:** baytlar juda koʻp boʻladi — har harf 1–2 bayt, demak uzun matn juda uzun raqamlar ketma-ketligiga aylanadi.",
    },
    {
      kind: "text",
      text: "**Yechim:** tez-tez uchraydigan **juftliklarni birlashtirib**, ketma-ketlikni qisqartirish. Bu usul **BPE** (Byte-Pair Encoding — “bayt-juftlik kodlash”) deyiladi.",
    },
    {
      kind: "note",
      tone: "key",
      text: "**Gʻoya:** Agar `1 2` juftligi koʻp uchrasa, unga yangi **bitta** raqam beramiz. Shunda 2 ta belgi 1 taga aylanadi va ketma-ketlik qisqaradi. Buni bir necha marta takrorlab, eng foydali birikmalarni topamiz.",
    },
    { kind: "text", text: "Bu darsda birinchi qadamni — **juftliklarni sanash**ni oʻrganamiz." },
  ],
  sections: [
    {
      id: "2-1",
      title: "2.1 · Juftliklarni sanaydigan funksiya (get_stats)",
      blocks: [
        {
          kind: "text",
          text: "Birlashtirishdan oldin, qaysi juftlik eng koʻp uchrashini bilishimiz kerak. Quyidagi funksiya har bir **yonma-yon** juftlikni sanaydi.",
        },
        {
          kind: "code",
          code:
            "def get_stats(ids):\n    counts = {}\n    for pair in zip(ids, ids[1:]):\n        counts[pair] = counts.get(pair, 0) + 1\n    return counts\n\nids = [1, 2, 3, 1, 2]\nprint(get_stats(ids))",
        },
        {
          kind: "bullets",
          items: [
            "`def get_stats(ids):` — `ids` (raqamlar roʻyxati) ni oladigan funksiya.",
            "`counts = {}` — boʻsh lugʻat: “juftlik → nechta marta”.",
            "`zip(ids, ids[1:])` — har bir yonma-yon juftlikni beradi: `(1,2)`, `(2,3)`, `(3,1)`, `(1,2)`.",
            "`counts[pair] = counts.get(pair, 0) + 1` — juftlik sonini 1 ga oshiradi (avval boʻlmasa 0 dan boshlaydi).",
            "`return counts` — natijani qaytaradi.",
          ],
        },
        { kind: "output", text: "{(1, 2): 2, (2, 3): 1, (3, 1): 1}" },
        { kind: "viz", id: "pairs" },
        {
          kind: "note",
          tone: "tip",
          text: "Koʻryapsizmi — `(1, 2)` juftligi **2 marta** uchradi, qolganlari 1 martadan.",
        },
      ],
    },
    {
      id: "2-2",
      title: "2.2 · Eng koʻp uchragan juftlikni topish",
      blocks: [
        {
          kind: "text",
          text: "Endi eng koʻp uchragan juftlikni tanlaymiz — chunki aynan uni birlashtirsak, eng koʻp foyda.",
        },
        {
          kind: "code",
          code: "ids = [1, 2, 3, 1, 2]\nstats = get_stats(ids)\ntop = max(stats, key=stats.get)\nprint(top)",
        },
        {
          kind: "bullets",
          items: [
            "`max(stats, key=stats.get)` — lugʻatdan eng katta **qiymatga** ega kalitni (yaʼni eng koʻp uchragan juftlikni) topadi.",
          ],
        },
        { kind: "output", text: "(1, 2)" },
      ],
    },
    {
      id: "2-3",
      title: "2.3 · Haqiqiy baytlarda",
      blocks: [
        { kind: "text", text: "Xuddi shu narsa haqiqiy matn baytlarida ham ishlaydi." },
        {
          kind: "code",
          code:
            'matn = "salomsalom"\nids = list(matn.encode("utf-8"))\nprint(ids)\nstats = get_stats(ids)\ntop = max(stats, key=stats.get)\nprint("eng koʻp juftlik:", top, "->", stats[top], "marta")',
        },
        {
          kind: "output",
          text: "[115, 97, 108, 111, 109, 115, 97, 108, 111, 109]\neng koʻp juftlik: (115, 97) -> 2 marta",
        },
        {
          kind: "note",
          tone: "tip",
          text: "`(115, 97)` — bu `s` va `a` baytlari (chunki “salom” ikki marta takrorlangan). Keyingi darsda aynan shu juftlikni **birlashtiramiz** va tokenizatorni oʻqitamiz.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "2-1",
      label: "Mashq 2.1",
      prompt:
        "`[5, 5, 5, 7]` roʻyxatida har bir juftlikni sanang va eng koʻp uchraganini toping.",
      hint: "`get_stats` funksiyasidan foydalaning.",
      answerCode:
        "ids = [5, 5, 5, 7]\nstats = get_stats(ids)\nprint(stats)\nprint(max(stats, key=stats.get))",
      answerOutput: "{(5, 5): 2, (5, 7): 1}\n(5, 5)",
    },
    {
      id: "2-2",
      label: "Mashq 2.2 (fikrlash)",
      prompt: "Nega biz **eng koʻp** uchragan juftlikni birlashtiramiz, kam uchraganini emas?",
      answerText:
        "Chunki eng koʻp uchragan juftlikni birlashtirsak, ketma-ketlik **eng koʻp qisqaradi** — koʻp joyda 2 belgi 1 taga aylanadi. Kam uchragan juftlikni birlashtirsak, deyarli hech qanday foyda boʻlmaydi (faqat bir-ikki joyda qisqaradi). Maqsad — matnni imkon qadar qisqartirish, shuning uchun har doim eng foydali (eng koʻp uchragan) juftlikni tanlaymiz.",
    },
  ],
};

const L3: Lesson = {
  id: "dars-3",
  n: 3,
  title: "Juftliklarni birlashtirish va oʻqitish",
  subtitle: "merge funksiyasi va oʻqitish sikli",
  minutes: 14,
  intro: [
    {
      kind: "text",
      text: "Oldingi darsda eng koʻp uchragan juftlikni **topdik**. Endi uni **birlashtiramiz** — yaʼni ikki belgini bitta yangi belgiga aylantiramiz. Keyin buni bir necha marta takrorlab, tokenizatorni **oʻqitamiz**.",
    },
  ],
  sections: [
    {
      id: "3-1",
      title: "3.1 · Birlashtirish funksiyasi (merge)",
      blocks: [
        {
          kind: "text",
          text: "`merge` — ketma-ketlikdagi berilgan juftlikni yangi raqamga almashtiradi.",
        },
        {
          kind: "code",
          code:
            "def merge(ids, pair, idx):\n    new_ids = []\n    i = 0\n    while i < len(ids):\n        if i < len(ids) - 1 and ids[i] == pair[0] and ids[i+1] == pair[1]:\n            new_ids.append(idx)\n            i += 2\n        else:\n            new_ids.append(ids[i])\n            i += 1\n    return new_ids\n\nids = [1, 2, 3, 1, 2]\nprint(merge(ids, (1, 2), 99))",
        },
        {
          kind: "bullets",
          items: [
            "`def merge(ids, pair, idx):` — roʻyxat (`ids`), qidiriladigan juftlik (`pair`) va yangi raqam (`idx`) oladi.",
            "`new_ids = []` — natija uchun boʻsh roʻyxat.",
            "`while i < len(ids):` — roʻyxat boʻyicha bosqichma-bosqich yuramiz.",
            "`if ... ids[i] == pair[0] and ids[i+1] == pair[1]:` — hozirgi va keyingi element juftlikka mos kelsa...",
            "`new_ids.append(idx); i += 2` — ikkalasini yangi raqamga almashtiramiz va **2 qadam** oldinga oʻtamiz.",
            "`else: ... i += 1` — mos kelmasa, elementni oʻzgarishsiz qoʻshamiz va 1 qadam oldinga.",
          ],
        },
        { kind: "output", text: "[99, 3, 99]" },
        { kind: "note", tone: "tip", text: "Har ikkala `(1, 2)` ham `99` ga aylandi." },
      ],
    },
    {
      id: "3-2",
      title: "3.2 · Oʻqitish sikli",
      blocks: [
        {
          kind: "text",
          text: "Endi hammasini birlashtiramiz: **sanash → eng koʻp juftlikni tanlash → birlashtirish → qoidani yozib qoʻyish**. Buni kerakli marta takrorlaymiz. Bu — tokenizatorni **oʻqitish**.",
        },
        {
          kind: "code",
          code:
            'text = "salom dunyo salom dunyo"\nids = list(text.encode("utf-8"))\nprint("boshlangʻich uzunlik:", len(ids))\n\nvocab_size = 260              # 256 asosiy bayt + 4 ta yangi birlashma\nnum_merges = vocab_size - 256\nmerges = {}\n\nfor i in range(num_merges):\n    stats = get_stats(ids)\n    pair = max(stats, key=stats.get)     # eng koʻp uchragan juftlik\n    idx = 256 + i                        # unga yangi raqam beramiz\n    ids = merge(ids, pair, idx)          # birlashtiramiz\n    merges[pair] = idx                   # qoidani eslab qolamiz\n    print(f"birlashtirish {i+1}: {pair} -> {idx}")\n\nprint("yakuniy uzunlik:", len(ids))',
        },
        {
          kind: "bullets",
          items: [
            '`ids = list(text.encode("utf-8"))` — matnni baytlar roʻyxatiga aylantiramiz.',
            "`vocab_size = 260` — jami lugʻat hajmi: 256 asosiy bayt + 4 ta yangi belgi.",
            "`merges = {}` — oʻrganilgan qoidalarni saqlaydigan lugʻat.",
            "Sikl ichida: `get_stats` bilan **sanaymiz** → `max` bilan eng koʻpini **tanlaymiz** → `256 + i` yangi raqam **beramiz** → `merge` bilan **birlashtiramiz** → `merges`ga qoidani **yozamiz**.",
          ],
        },
        {
          kind: "output",
          text:
            "boshlangʻich uzunlik: 23\nbirlashtirish 1: (115, 97) -> 256\nbirlashtirish 2: (256, 108) -> 257\nbirlashtirish 3: (257, 111) -> 258\nbirlashtirish 4: (258, 109) -> 259\nyakuniy uzunlik: 15",
        },
        { kind: "viz", id: "merge" },
        {
          kind: "note",
          tone: "key",
          text: "**Qarang, nima yuz berdi!** Tokenizator asta-sekin **“salom”** soʻzini yigʻdi: `(115, 97)` = `s` + `a` → **256** (`sa`); `(256, 108)` = `sa` + `l` → **257** (`sal`); `(257, 111)` = `sal` + `o` → **258** (`salo`); `(258, 109)` = `salo` + `m` → **259** (`salom`). Endi butun **“salom”** soʻzi bitta raqam — `259`! Va uzunlik **23 dan 15 ga** qisqardi. Aynan shu — BPE ning butun sehri.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "3-1",
      label: "Mashq 3.1",
      prompt:
        "`merge([7, 7, 7, 7], (7, 7), 88)` nima qaytaradi? Avval qogʻozda oʻylab koʻring.",
      answerCode: "print(merge([7, 7, 7, 7], (7, 7), 88))",
      answerOutput: "[88, 88]",
      answerText: "`(7, 7)` juftligi ikki marta topildi va har biri `88` ga aylandi.",
    },
    {
      id: "3-2",
      label: "Mashq 3.2 (fikrlash)",
      prompt: "Nega yangi raqamlar **256 dan** boshlanadi?",
      answerText:
        "Chunki `0`–`255` raqamlar allaqachon **baytlar** uchun band (Dars 1 ni eslang — bayt 0 dan 255 gacha). Yangi birlashmalarga band boʻlmagan raqamlar kerak, shuning uchun `256` dan boshlaymiz.",
    },
  ],
};

const L4: Lesson = {
  id: "dars-4",
  n: 4,
  title: "Kodlash va dekodlash",
  subtitle: "encode, decode va round-trip tekshiruvi",
  minutes: 14,
  intro: [
    {
      kind: "text",
      text: "Tokenizatorni oʻqitdik — `merges` tayyor. Endi undan **foydalanamiz**:",
    },
    {
      kind: "bullets",
      items: [
        "**encode** — yangi matnni raqamlarga aylantirish,",
        "**decode** — raqamlarni matnga qaytarish.",
      ],
    },
  ],
  sections: [
    {
      id: "4-1",
      title: "4.1 · Lugʻat va dekodlash (decode)",
      blocks: [
        {
          kind: "text",
          text: "Dekodlash uchun har bir raqam qaysi baytlarga tengligini bilishimiz kerak. `build_vocab` shu jadvalni tuzadi, `decode` esa raqamlarni matnga qaytaradi.",
        },
        {
          kind: "code",
          code:
            'def build_vocab(merges):\n    vocab = {i: bytes([i]) for i in range(256)}       # 256 ta asosiy bayt\n    for (p0, p1), idx in merges.items():\n        vocab[idx] = vocab[p0] + vocab[p1]            # birlashma = ikki qismning yigʻindisi\n    return vocab\n\ndef decode(ids, vocab):\n    tokens = b"".join(vocab[idx] for idx in ids)      # har raqamni baytga aylantiramiz\n    return tokens.decode("utf-8", errors="replace")   # baytlardan matn\n\nvocab = build_vocab(merges)\nprint(decode([115, 97, 108, 111, 109], vocab))',
        },
        {
          kind: "bullets",
          items: [
            "`vocab = {i: bytes([i]) for i in range(256)}` — `0`–`255` har biri oʻz baytiga teng.",
            "`vocab[idx] = vocab[p0] + vocab[p1]` — yangi belgi = uni tashkil qilgan **ikki belgining baytlari** qoʻshiladi.",
            '`b"".join(...)` — barcha baytlarni bir-biriga ulaydi.',
            '`.decode("utf-8", errors="replace")` — baytlardan matn tiklaydi.',
          ],
        },
        { kind: "output", text: "salom" },
      ],
    },
    {
      id: "4-2",
      title: "4.2 · Kodlash (encode)",
      blocks: [
        {
          kind: "text",
          text: "`encode` teskarisini qiladi: matnni oladi va oʻrganilgan qoidalarni **eng erta oʻrganilganidan** boshlab qoʻllaydi.",
        },
        {
          kind: "code",
          code:
            'def encode(text, merges):\n    ids = list(text.encode("utf-8"))\n    while len(ids) >= 2:\n        stats = get_stats(ids)\n        pair = min(stats, key=lambda p: merges.get(p, float("inf")))\n        if pair not in merges:\n            break\n        ids = merge(ids, pair, merges[pair])\n    return ids\n\nkod = encode("salom dunyo", merges)\nprint(kod)\nprint("uzunligi:", len(kod))',
        },
        {
          kind: "bullets",
          items: [
            '`ids = list(text.encode("utf-8"))` — matnni baytlarga.',
            "`while len(ids) >= 2:` — kamida 2 ta belgi boʻlsa davom etamiz.",
            '`pair = min(stats, key=lambda p: merges.get(p, float("inf")))` — qoʻllash mumkin boʻlgan **eng erta oʻrganilgan** juftlikni tanlaydi (raqami eng kichigini).',
            "`if pair not in merges: break` — birlashtiradigan qoida qolmasa, toʻxtaymiz.",
            "`ids = merge(...)` — juftlikni birlashtiramiz.",
          ],
        },
        { kind: "output", text: "[259, 32, 100, 117, 110, 121, 111]\nuzunligi: 7" },
        {
          kind: "note",
          tone: "tip",
          text: "`259` = butun **“salom”**, `32` = probel, keyin `d u n y o` (dunyo hali oʻrganilmagan, shuning uchun alohida baytlar). 11 ta belgi **7 taga** qisqardi.",
        },
      ],
    },
    {
      id: "4-3",
      title: "4.3 · Tekshiruv: oldinga va orqaga (round-trip)",
      blocks: [
        {
          kind: "text",
          text: "Eng muhim tekshiruv: matnni kodlab, keyin dekodlab, **asl matn** qaytishi kerak.",
        },
        {
          kind: "code",
          code:
            'asl = "salom dunyo salom"\nqayta = decode(encode(asl, merges), vocab)\nprint(asl == qayta)',
        },
        { kind: "output", text: "True" },
        {
          kind: "note",
          tone: "key",
          text: "matn → raqamlar → matn, va asl bilan **bir xil**. Tokenizator toʻgʻri ishlayapti.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "4-1",
      label: "Mashq 4.1",
      prompt: "`encode(\"salom\", merges)` nechta raqam beradi deb oʻylaysiz?",
      hint: "“salom” oʻqitishda toʻliq oʻrganilgan edi.",
      answerCode: 'print(encode("salom", merges))',
      answerOutput: "[259]",
      answerText:
        "Atigi **1 ta** raqam! Chunki butun “salom” soʻzi bitta belgiga (`259`) oʻrganilgan. 5 harf → 1 token.",
    },
    {
      id: "4-2",
      label: "Mashq 4.2 (fikrlash)",
      prompt: "`decode`da nega `errors=\"replace\"` yozilgan?",
      answerText:
        "Baʼzan baytlar ketma-ketligi toʻliq boʻlmasligi mumkin (masalan, oʻzbekcha belgining faqat yarmi). `errors=\"replace\"` bunday holatda dastur **buzilib qolmasligi** uchun, xato baytni maxsus belgi (�) bilan almashtiradi. Yaʼni himoya — kod hech qachon toʻxtab qolmaydi.",
    },
  ],
};

const L5: Lesson = {
  id: "dars-5",
  n: 5,
  title: "Oʻzbekcha apostrof va tozalash",
  subtitle: "normalize va toʻliq quvur",
  minutes: 10,
  intro: [
    {
      kind: "text",
      text: "Oʻzbek tilida `oʻ` va `gʻ` harflari koʻpincha `o'` va `g'` (apostrof bilan) yoziladi. Va apostrofning bir necha xil koʻrinishi bor: `'`, `’`, `` ` ``.",
    },
    {
      kind: "text",
      text: "**Muammo:** agar ularni tartibga solmasak, tokenizator bitta soʻzni har xil koʻradi — `o'zbek`, `o’zbek`, `oʻzbek` unga **uch xil** soʻzdek koʻrinadi. Bu tokenlarni isrof qiladi.",
    },
    { kind: "text", text: "**Yechim:** matnni kodlashdan **oldin tozalaymiz** (normalize)." },
  ],
  sections: [
    {
      id: "5-1",
      title: "5.1 · Tozalash funksiyasi (normalize)",
      blocks: [
        {
          kind: "text",
          text: "`normalize` — har xil apostroflarni bitta standart koʻrinishga keltiradi va `o'`/`g'` ni haqiqiy `oʻ`/`gʻ` (okina) ga aylantiradi.",
        },
        {
          kind: "code",
          code:
            'def normalize(text):\n    text = text.replace("\\u2019", "\'")     # egri \u2019 -> tekis \'\n    text = text.replace("`", "\'")          # teskari ` -> tekis \'\n    text = text.replace("o\'", "oʻ").replace("O\'", "Oʻ")\n    text = text.replace("g\'", "gʻ").replace("G\'", "Gʻ")\n    return text\n\nprint(normalize("o\'zbekiston g\'isht"))',
        },
        {
          kind: "bullets",
          items: [
            "`.replace(\"\\u2019\", \"'\")` — “aqlli” (egri) apostrofni oddiy apostrofga.",
            "`.replace(\"`\", \"'\")` — teskari tirnoqni ham oddiy apostrofga.",
            "`.replace(\"o'\", \"oʻ\")` — `o` + apostrof → haqiqiy okinali `oʻ`.",
            "`.replace(\"g'\", \"gʻ\")` — xuddi shunday `gʻ` uchun (katta harflar `O'`, `G'` uchun ham).",
          ],
        },
        { kind: "output", text: "oʻzbekiston gʻisht" },
        {
          kind: "note",
          tone: "key",
          text: "Endi matn qanday yozilishidan qatʼi nazar (`o'zbek`, `o’zbek`, `oʻzbek`) — tokenizator uchun **bitta xil** koʻrinadi. Bu tokenlarni tejaydi va aniqlikni oshiradi.",
        },
      ],
    },
    {
      id: "5-2",
      title: "5.2 · Toʻliq quvur (pipeline)",
      blocks: [
        { kind: "text", text: "Tozalash — kodlashdan **oldin** turadi. Toʻliq yoʻl shunday:" },
        { kind: "flow", text: "matn → normalize → encode → [raqamlar] → decode → matn" },
        {
          kind: "text",
          text: "Real tokenizatorda yana **maxsus tokenlar** ham boʻladi — masalan, matn tugaganini bildiradigan `<|endoftext|>`. Bular oddiy soʻz emas, alohida vazifadagi belgilar; ularga odatda eng katta raqamlar beriladi.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "5-1",
      label: "Mashq 5.1",
      prompt: "`normalize(\"G'alaba\")` nima qaytaradi?",
      answerCode: "print(normalize(\"G'alaba\"))",
      answerOutput: "Gʻalaba",
      answerText: "`G'` → `Gʻ` (katta harf uchun ham ishladi).",
    },
    {
      id: "5-2",
      label: "Mashq 5.2 (fikrlash)",
      prompt: "Nega `normalize` kodlashdan **oldin** ishlashi kerak?",
      answerText:
        "Chunki `normalize` matnni **bir xil koʻrinishga** keltiradi. Agar avval kodlasak, har xil apostrofli soʻzlar (`o'zbek` va `oʻzbek`) har xil raqamlarga aylanadi va tokenizator ularni boshqa-boshqa soʻz deb oʻylaydi — bu token isrof qiladi va aniqlikni buzadi. Shuning uchun avval tozalaymiz, keyin kodlaymiz.",
    },
  ],
};

const L6: Lesson = {
  id: "dars-6",
  n: 6,
  title: "Haqiqiy matnda oʻqitish va natija",
  subtitle: "Oʻlchash, oʻqitish va toʻliq kod",
  minutes: 16,
  intro: [
    {
      kind: "text",
      text: "Endi hamma qismni birlashtiramiz va haqiqiy oʻzbek matnida sinaymiz. Kichik matnda oʻqitib, tokenizator matnni qanchalik **qisqartirishini** oʻlchaymiz.",
    },
  ],
  sections: [
    {
      id: "6-1",
      title: "6.1 · Avval oʻlchaymiz (birlashtirishsiz)",
      blocks: [
        {
          kind: "text",
          text: "Baseline: birlashtirishsiz (xom baytlar) har bir soʻzga nechta belgi toʻgʻri keladi?",
        },
        {
          kind: "code",
          code:
            'matn = ("O\'zbekiston Markaziy Osiyoda joylashgan davlat. "\n        "O\'zbek tili davlat tili hisoblanadi. "\n        "Ta\'lim va fan sohasida katta ishlar olib borilmoqda. "\n        "Yoshlar yangi texnologiyalarni o\'rganmoqda.")\nmatn = normalize(matn)\n\nsozlar = matn.split()\nbayt_soni = len(matn.encode("utf-8"))\nprint("soʻzlar soni:", len(sozlar))\nprint("baytlar soni:", bayt_soni)\nprint(f"token/soʻz (xom baytlar): {bayt_soni / len(sozlar):.2f}")',
        },
        {
          kind: "bullets",
          items: [
            "`matn.split()` — matnni soʻzlarga ajratadi (probel boʻyicha).",
            '`len(matn.encode("utf-8"))` — jami baytlar soni.',
            "`bayt_soni / len(sozlar)` — har bir soʻzga necha bayt.",
          ],
        },
        {
          kind: "output",
          text: "soʻzlar soni: 22\nbaytlar soni: 184\ntoken/soʻz (xom baytlar): 8.36",
        },
        {
          kind: "note",
          tone: "warn",
          text: "Birlashtirishsiz har soʻzga **~8.36** belgi — juda koʻp! Endi oʻqitib, buni kamaytiramiz.",
        },
      ],
    },
    {
      id: "6-2",
      title: "6.2 · Oʻqitamiz va natijani oʻlchaymiz",
      blocks: [
        {
          kind: "code",
          code:
            'ids = list(matn.encode("utf-8"))\nmerges = {}\nfor i in range(256):                       # koʻproq birlashmaga ruxsat\n    stats = get_stats(ids)\n    if not stats:\n        break\n    pair = max(stats, key=stats.get)\n    if stats[pair] < 2:                     # takrorlanadigan juftlik qolmasa, toʻxtaymiz\n        break\n    idx = 256 + i\n    ids = merge(ids, pair, idx)\n    merges[pair] = idx\n\nprint("birlashmalar soni:", len(merges))\nprint("tokenlar soni:", len(ids))\nprint(f"token/soʻz (oʻqitilgandan keyin): {len(ids) / len(sozlar):.2f}")',
        },
        {
          kind: "bullets",
          items: [
            "Bu — Dars 3 dagi oʻqitish sikli, faqat koʻproq birlashmaga ruxsat berilgan.",
            "`if stats[pair] < 2: break` — kichik matnda takrorlanadigan juftlik tugaganda toʻxtaydi.",
          ],
        },
        {
          kind: "output",
          text:
            "birlashmalar soni: 30\ntokenlar soni: 105\ntoken/soʻz (oʻqitilgandan keyin): 4.77",
        },
        {
          kind: "note",
          tone: "key",
          text: "**8.36 dan 4.77 ga** tushdi — deyarli ikki barobar qisqardi! Va bu atigi 30 ta birlashma bilan, juda kichik matnda.",
        },
      ],
    },
    {
      id: "6-3",
      title: "Haqiqiy loyihadagi natija",
      blocks: [
        { kind: "text", text: "Bu kichik matn edi. Haqiqiy loyihada:" },
        {
          kind: "bullets",
          items: [
            "**50 MB oʻzbek matni** (FineWeb-2) da oʻqitildi,",
            "**16 384** ta belgi (lugʻat hajmi) bilan,",
            "natijada har soʻzga **1.85 token** — GPT-4 tokenizatoriga (**2.62**) qaraganda **1.42 baravar tejamkor**, va ~12 baravar kichik lugʻat bilan.",
          ],
        },
        { kind: "text", text: "Qonuniyat oddiy:" },
        {
          kind: "note",
          tone: "key",
          text: "**Koʻproq matn + koʻproq birlashma = kamroq token/soʻz.**",
        },
        {
          kind: "text",
          text: "Siz buni oʻz koʻzingiz bilan kichik matnda koʻrdingiz (**8.36 → 4.77**). Kattaroq matnda esa u **1.85** gacha tushadi.",
        },
      ],
    },
    {
      id: "6-4",
      title: "Toʻliq kod — bitta joyda",
      blocks: [
        {
          kind: "text",
          text: "Mana barcha qismlar birga. Buni bitta katakka nusxa qilib, oʻz matningizda sinab koʻring:",
        },
        {
          kind: "code",
          code:
            'def get_stats(ids):\n    counts = {}\n    for pair in zip(ids, ids[1:]):\n        counts[pair] = counts.get(pair, 0) + 1\n    return counts\n\ndef merge(ids, pair, idx):\n    new_ids = []\n    i = 0\n    while i < len(ids):\n        if i < len(ids) - 1 and ids[i] == pair[0] and ids[i+1] == pair[1]:\n            new_ids.append(idx); i += 2\n        else:\n            new_ids.append(ids[i]); i += 1\n    return new_ids\n\ndef normalize(text):\n    text = text.replace("\\u2019", "\'").replace("`", "\'")\n    text = text.replace("o\'", "oʻ").replace("O\'", "Oʻ")\n    text = text.replace("g\'", "gʻ").replace("G\'", "Gʻ")\n    return text\n\ndef train(text, vocab_size):\n    ids = list(normalize(text).encode("utf-8"))\n    merges = {}\n    for i in range(vocab_size - 256):\n        stats = get_stats(ids)\n        if not stats:\n            break\n        pair = max(stats, key=stats.get)\n        idx = 256 + i\n        ids = merge(ids, pair, idx)\n        merges[pair] = idx\n    return merges\n\ndef build_vocab(merges):\n    vocab = {i: bytes([i]) for i in range(256)}\n    for (p0, p1), idx in merges.items():\n        vocab[idx] = vocab[p0] + vocab[p1]\n    return vocab\n\ndef encode(text, merges):\n    ids = list(normalize(text).encode("utf-8"))\n    while len(ids) >= 2:\n        stats = get_stats(ids)\n        pair = min(stats, key=lambda p: merges.get(p, float("inf")))\n        if pair not in merges:\n            break\n        ids = merge(ids, pair, merges[pair])\n    return ids\n\ndef decode(ids, vocab):\n    tokens = b"".join(vocab[idx] for idx in ids)\n    return tokens.decode("utf-8", errors="replace")\n\n\n# --- ishlatish ---\nmatn = "O\'zbekiston mustaqil davlat. O\'zbek tili — davlat tili."\nmerges = train(matn, vocab_size=300)     # oʻqitamiz\nvocab = build_vocab(merges)\n\nkod = encode("O\'zbek tili", merges)      # kodlaymiz\nprint(kod)\nprint(decode(kod, vocab))                # dekodlaymiz',
        },
        { kind: "output", text: "[262, 272]\nOʻzbek tili" },
      ],
    },
    {
      id: "6-5",
      title: "Tabriklaymiz!",
      blocks: [
        {
          kind: "text",
          text: "Siz **noldan** ishlaydigan tokenizator qurdingiz — kod bilmagan holdan boshlab. Mana nimalarni oʻrgandingiz:",
        },
        {
          kind: "bullets",
          items: [
            "**Kodlash asoslari** — `print`, oʻzgaruvchi, matn, roʻyxat, lugʻat, sikl, funksiya.",
            "**AI raqamlar bilan ishlaydi** — Unicode, baytlar; oʻzbekcha `oʻ`/`gʻ` 2 baytdan.",
            "**BPE** — juftliklarni sanash (`get_stats`), birlashtirish (`merge`), oʻqitish (`train`).",
            "**Kodlash/dekodlash** — `encode`, `decode`, va oldinga-orqaga tekshiruv.",
            "**Oʻzbekcha tozalash** — `normalize` bilan apostrof va okina.",
            "**Natija** — matn qanday qisqarishini oʻz koʻzingiz bilan koʻrdingiz.",
          ],
        },
        { kind: "subhead", text: "Keyingi qadam" },
        {
          kind: "steps",
          items: [
            "**Oʻz matningizda sinab koʻring** — biror oʻzbekcha maqola yoki kitobni `train` ga bering, `vocab_size` ni oshirib, natijani kuzating.",
            "**Kattaroq matn toping** — qancha koʻp matn, shuncha yaxshi tokenizator.",
            "**Ulashing** — tayyor tokenizatorni Hugging Face yoki GitHub ga joylang, boshqalar ham foydalansin.",
          ],
        },
        {
          kind: "text",
          text: "Endi siz tokenizator qanday ishlashini **chinakam** bilasiz — nafaqat nusxa koʻchirib, balki har bir qatorni tushunib.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "6-1",
      label: "Mashq 6.1 (fikrlash)",
      prompt:
        "Agar `vocab_size` ni 260 dan 500 ga oshirsak, token/soʻz **koʻpayadimi** yoki **kamayadimi**?",
      answerText:
        "**Kamayadi.** Koʻproq birlashma = koʻproq soʻz yoki boʻlak bitta raqamga sigʻadi = kamroq token. Lekin cheksiz emas: juda katta lugʻat modelni sekinlashtiradi va kam uchraydigan birikmalarni ham oʻrganib, joyni isrof qiladi. Shuning uchun **muvozanatli** son tanlanadi — masalan, `16 384`.",
    },
  ],
};


/* Added from the expanded course document: the pre-split step that stops
   BPE from merging across word boundaries. */
const L7: Lesson = {
  id: "dars-7",
  n: 7,
  title: "Regex bilan boʻlish",
  subtitle: "Merge soʻz chegarasini kesib oʻtmasin",
  minutes: 14,
  intro: [
    {
      kind: "text",
      text: "Oʻqitishni kattaroq matnda ishlatsak, gʻalati narsa chiqadi — **butun iboralar bitta token boʻlib qoladi**. Masalan `oʻzbek tili oʻzbek ` — hammasi bitta token.",
    },
    {
      kind: "bullets",
      items: [
        "**Behuda:** bu aniq ibora boshqa hech qayerda uchramaydi",
        "**Chegara buzildi:** tokenizator soʻzlar orasidan oʻtib ketdi",
        "**Takrorlanish:** `oʻzbek`, `oʻzbek `, ` oʻzbek`, `oʻzbek t` — bir soʻzning 4 xil varianti, hammasi alohida token",
      ],
    },
    {
      kind: "text",
      text: "Xuddi shu muammo punktuatsiya bilan ham boʻladi: `kitob`, `kitob.`, `kitob,`, `kitob!` — hammasi alohida token boʻlib, vocab ni behuda toʻldiradi.",
    },
  ],
  sections: [
    {
      id: "7-1",
      title: "7.1 · Yechim: avval boʻlaklarga ajratamiz",
      blocks: [
        {
          kind: "text",
          text: "**Gʻoya:** BPE dan **oldin** matnni mantiqiy boʻlaklarga ajratamiz. Keyin BPE har bir boʻlak **ichida** ishlaydi, boʻlaklar orasidan oʻtmaydi.",
        },
        {
          kind: "note",
          tone: "key",
          text: "Yaʼni qoida qoʻyamiz: **merge hech qachon soʻz chegarasini kesib oʻtmaydi.**",
        },
        {
          kind: "text",
          text: "Buni **regex** (muntazam ifoda) yordamida qilamiz. Regex — matndan naqsh izlash tili. GPT-2 modeli ishlatgan naqshni olamiz, u sinovdan oʻtgan.",
        },
      ],
    },
    {
      id: "7-2",
      title: "7.2 · Naqsh",
      blocks: [
        {
          kind: "text",
          text: "Bizga oddiy `re` emas, `regex` kutubxonasi kerak (u koʻproq imkoniyat beradi):",
        },
        {
          kind: "code",
          code: 'import regex as re\n\nPATTERN = r"""\'s|\'t|\'re|\'ve|\'m|\'ll|\'d| ?\\p{L}+| ?\\p{N}+| ?[^\\s\\p{L}\\p{N}]+|\\s+(?!\\S)|\\s+"""\ncompiled = re.compile(PATTERN)',
        },
        {
          kind: "text",
          text: "**Bu naqsh qoʻrqinchli koʻrinadi, lekin qismlarga boʻlsak oddiy.** `|` belgisi “yoki” degani. Har bir qism bitta turdagi boʻlakni tutadi:",
        },
        {
          kind: "bullets",
          items: [
            "` ?\\p{L}+` — **harflar** ketma-ketligi (oldida boʻsh joy boʻlishi mumkin)",
            "` ?\\p{N}+` — **raqamlar** ketma-ketligi",
            "` ?[^\\s\\p{L}\\p{N}]+` — **punktuatsiya** (harf ham, raqam ham, boʻsh joy ham emas)",
            "`\\s+` — boʻsh joylar",
          ],
        },
        { kind: "subhead", text: "Eng muhim belgilar:" },
        {
          kind: "bullets",
          items: [
            "`\\p{L}` — **har qanday tildagi harf**. Bu bizga juda muhim: lotin ham, kiril ham, `oʻ` ham — hammasi harf hisoblanadi",
            "`\\p{N}` — har qanday raqam",
            "`+` — “bir yoki koʻp marta”",
            "`?` — “bor yoki yoʻq” (ixtiyoriy)",
            "`[^...]` — “bulardan **boshqa**” (`^` inkor qiladi)",
          ],
        },
        {
          kind: "note",
          tone: "tip",
          text: "`r\"\"\"...\"\"\"` — `r` “xom satr” degani. Regex da `\\` belgilari koʻp, `r` boʻlmasa Python ularni boshqacha tushunadi.",
        },
      ],
    },
    {
      id: "7-3",
      title: "7.3 · Naqshni sinab koʻramiz",
      blocks: [
        {
          kind: "code",
          code: 'matn = "Oʻzbekiston 2024-yilda 5 ta shahar qurdi!"\nboshlar = compiled.findall(matn)\nprint(boshlar)\nprint("boʻlak soni:", len(boshlar))',
        },
        {
          kind: "output",
          text: "['Oʻzbekiston', ' 2024', '-', 'yilda', ' 5', ' ta', ' shahar', ' qurdi', '!']\nboʻlak soni: 9",
        },
        { kind: "viz", id: "split" },
        { kind: "subhead", text: "Diqqat bilan qaraymiz — naqsh nimalarni ajratdi:" },
        {
          kind: "bullets",
          items: [
            "`'Oʻzbekiston'` — harflar birga qoldi",
            "`' 2024'` — raqamlar **alohida** boʻlak (harflardan ajratilgan)",
            "`'-'` — punktuatsiya **alohida**",
            "`'!'` — punktuatsiya alohida",
          ],
        },
        {
          kind: "text",
          text: "Muhim: boʻsh joy **keyingi soʻzga** qoʻshildi (`' shahar'`). Bu GPT-2 ning tanlovi — shunda `shahar` va ` shahar` orasida farq boʻladi, lekin har biri bitta toza token.",
        },
      ],
    },
    {
      id: "7-4",
      title: "7.4 · Punktuatsiya ajralishini koʻramiz",
      blocks: [
        {
          kind: "code",
          code: 'for t in compiled.findall("salom, dunyo! salom."):\n    print(repr(t))',
        },
        { kind: "output", text: "'salom'\n','\n' dunyo'\n'!'\n' salom'\n'.'" },
        {
          kind: "note",
          tone: "key",
          text: "**Mana yechim!** `salom` va `,` **alohida** boʻlaklar. Demak BPE ularni **hech qachon** birlashtira olmaydi. Natijada `salom.`, `salom,`, `salom!` kabi behuda tokenlar **yasalmaydi**.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "7-1",
      label: "Mashq 7.1",
      prompt: "`compiled.findall(\"Bugun 15-may, soat 9!\")` nima qaytaradi deb oʻylaysiz?",
      hint: "Harf, raqam va punktuatsiya alohida boʻlaklarga ajraladi.",
      answerOutput: "['Bugun', ' 15', '-', 'may', ',', ' soat', ' 9', '!']",
      answerText:
        "Raqamlar (`15`, `9`) harflardan ajraldi, `-` va `,` va `!` alohida boʻlak boʻldi. Boʻsh joy keyingi soʻzga qoʻshildi.",
    },
    {
      id: "7-2",
      label: "Mashq 7.2 (fikrlash)",
      prompt: "Nega `\\p{L}` ishlatamiz, oddiy `[a-z]` emas?",
      answerText:
        "Chunki `[a-z]` faqat inglizcha kichik harflarni tutadi. Oʻzbekcha `oʻ`, `gʻ`, katta harflar, kiril alifbosi — hammasi tashqarida qolardi va punktuatsiya deb hisoblanardi. `\\p{L}` esa **har qanday tildagi harfni** tutadi, shuning uchun oʻzbek matni toʻgʻri boʻlinadi.",
    },
  ],
};

export const TOKENIZER_COURSE: Course = {
  id: "tokenizator",
  name: "Tokenizator qurish",
  short: "TK",
  tagline: "Hech qachon kod yozmaganlar uchun. Bosqichma-bosqich. Oʻzbek tilida.",
  lessons: [L_START, L0, L1, L2, L3, L4, L5, L6, L7],
};

import { TRANSFORMER_COURSE } from "./curriculum-transformer";

export const COURSES: Course[] = [TOKENIZER_COURSE, TRANSFORMER_COURSE];

export function findLesson(courseId: string, lessonId: string) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return null;
  const index = course.lessons.findIndex((l) => l.id === lessonId);
  if (index < 0) return null;
  return {
    course,
    lesson: course.lessons[index],
    prev: index > 0 ? course.lessons[index - 1] : null,
    next: index < course.lessons.length - 1 ? course.lessons[index + 1] : null,
    index,
  };
}
