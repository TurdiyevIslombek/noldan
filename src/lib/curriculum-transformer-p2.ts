/* --------------------------------------------------------------------
   Transformer course — 2-QISM: BIRINCHI ISHLAYDIGAN MODEL.

   Source of truth: "Noldan Transformer (GPT) Yasash" by Islombek
   Turdiyev, lessons 05–09. Uzbek copy is the author's own, transcribed
   verbatim.
   -------------------------------------------------------------------- */

import type { Lesson } from "./curriculum";

const PART = "2-QISM: BIRINCHI ISHLAYDIGAN MODEL";

export const T5: Lesson = {
  id: "dars-5",
  n: 5,
  part: PART,
  title: "Maʼlumotni tayyorlash",
  subtitle: "Target — kirishning bir qadam surilgani",
  minutes: 15,
  intro: [
    {
      kind: "text",
      text: "Model oʻqitish uchun **misollar** kerak: “shu kontekstdan keyin shu token keladi”. Bu misollarni matndan qanday olamiz?",
    },
    {
      kind: "note",
      tone: "key",
      text: "**Butun hiyla bitta gʻoyada:** *target — kirishning bir qadam surilgani.*",
    },
  ],
  sections: [
    {
      id: "t5-1",
      title: "Surishni koʻramiz",
      blocks: [
        { kind: "text", text: "Tokenlar oqimi `[12, 24, 34, 43, 24, 25]` (“Maktab”). Undan ikki ketma-ketlik yasaymiz:" },
        {
          kind: "code",
          code: "kirish : [12, 24, 34, 43, 24]     # oxirgisidan tashqari hammasi\ntarget : [24, 34, 43, 24, 25]     # birinchisidan tashqari hammasi",
        },
        { kind: "subhead", text: "Yonma-yon oʻqiymiz:" },
        {
          kind: "bullets",
          items: [
            "kirish `12` → target `24` (“M dan keyin a keladi”)",
            "kirish `24` → target `34` (“a dan keyin k”)",
            "kirish `34` → target `43` (“k dan keyin t”)",
          ],
        },
        {
          kind: "note",
          tone: "tip",
          text: "**6 ta tokendan 5 ta oʻquv misoli chiqdi — bepul!** Umumiy qoida: `n` ta tokendan `n-1` ta misol (oxirgi tokendan keyin hech narsa yoʻq).",
        },
        {
          kind: "code",
          code: 'print("kirish:", kichik[:-1])\nprint("target:", kichik[1:])\nfor a, b in zip(kichik[:-1], kichik[1:]):\n    print(f"  {repr(itos[a])} -> {repr(itos[b])}")',
        },
        {
          kind: "output",
          text: "oqim  : [12, 24, 34, 43, 24, 25] -> 'Maktab'\nkirish: [12, 24, 34, 43, 24]\ntarget: [24, 34, 43, 24, 25]\n  'M' -> 'a'\n  'a' -> 'k'\n  'k' -> 't'\n  't' -> 'a'\n  'a' -> 'b'",
        },
        {
          kind: "bullets",
          items: [
            "`dtype=torch.long` — **muhim!** Embedding qidiruvi **butun son** talab qiladi. Kasr son bilan xato chiqadi.",
            "`kichik[:-1]` — oxirgisidan tashqari hammasi",
            "`kichik[1:]` — birinchisidan tashqari hammasi",
          ],
        },
      ],
    },
    {
      id: "t5-2",
      title: "Batch — bir vaqtda koʻp misol",
      blocks: [
        {
          kind: "text",
          text: "Butun matnni bir marta bermaymiz (juda katta). Buning oʻrniga **tasodifiy kichik boʻlaklar** olib, ularni ustma-ust qoʻyamiz. Ikki son bu boʻlaklarni belgilaydi:",
        },
        {
          kind: "bullets",
          items: [
            "**`block_size`** (`T`) — bitta boʻlak necha token. Model bir vaqtda koʻra oladigan **eng koʻp kontekst**.",
            "**`batch_size`** (`B`) — nechta boʻlakni birga ishlaymiz.",
          ],
        },
        {
          kind: "code",
          code: 'torch.manual_seed(1337)\nbatch_size, block_size = 4, 8\n\ndef get_batch(d):\n    ix = torch.randint(len(d) - block_size, (batch_size,))\n    x = torch.stack([d[i     : i+block_size]     for i in ix])\n    y = torch.stack([d[i + 1 : i+block_size + 1] for i in ix])\n    return x, y\n\nxb, yb = get_batch(data)\nprint("x shakli:", xb.shape)\nprint("y shakli:", yb.shape)\nprint("x[0] matn:", repr(decode(xb[0].tolist())))\nprint("y[0] matn:", repr(decode(yb[0].tolist())))',
        },
        {
          kind: "output",
          text: "x shakli: torch.Size([4, 8])\ny shakli: torch.Size([4, 8])\nx[0]: [37, 1, 44, 37, 1, 43, 38, 41]\ny[0]: [1, 44, 37, 1, 43, 38, 41, 43]\nx[0] matn: 'n un tor'\ny[0] matn: ' un tort'",
        },
        { kind: "viz", id: "tensor" },
        {
          kind: "text",
          text: "**Natijani oʻqiymiz:** `x[0]` = `'n un tor'`, `y[0]` = `' un tort'`. Diqqat: `y` ning har bir harfi `x` ning **keyingi** harfi. Aynan surish!",
        },
        {
          kind: "note",
          tone: "key",
          text: "**Bitta `(4, 8)` batch ichida `4 × 8 = 32` ta oʻquv misoli bor.** Juda samarali.",
        },
      ],
    },
    {
      id: "t5-3",
      title: "Xulosa",
      blocks: [
        {
          kind: "bullets",
          items: [
            "**`target = kirish, bir qadam surilgan`**",
            "`n` ta tokendan `n-1` ta oʻquv misoli",
            "**`block_size`** (`T`) — kontekst uzunligi",
            "**`batch_size`** (`B`) — bir vaqtda nechta boʻlak",
            "Batch shakli: **`(B, T)`** — 1-darsdagi shakl!",
            "`dtype=torch.long` majburiy (embedding butun son talab qiladi)",
          ],
        },
      ],
    },
  ],
  exercises: [
    {
      id: "t5-1",
      label: "Mashq 5.1",
      prompt: "`block_size = 16`, `batch_size = 8` boʻlsa, bitta batch ichida nechta oʻquv misoli bor?",
      answerOutput: "8 × 16 = 128",
      answerText:
        "Har bir qatorda `block_size` ta pozitsiya, har biri bitta misol. `batch_size` qator bor. Demak `8 × 16 = 128` ta misol bitta qadamda.",
    },
    {
      id: "t5-2",
      label: "Mashq 5.2 (fikrlash)",
      prompt: "Nega `torch.randint(len(d) - block_size, ...)` da `- block_size` bor?",
      answerText:
        "Chunki boʻlak **sigʻishi** kerak. Agar boshlanish nuqtasi oxiriga juda yaqin boʻlsa, `d[i : i+block_size]` yetarli token topa olmaydi — va `y` uchun yana bitta qoʻshimcha token kerak. `- block_size` bu xatoni oldini oladi.",
    },
  ],
};

export const T6: Lesson = {
  id: "dars-6",
  n: 6,
  part: PART,
  title: "Modelni yigʻish",
  subtitle: "nn.Module — barcha qismlar bitta joyda",
  minutes: 16,
  intro: [
    {
      kind: "text",
      text: "Hozirgacha bizning model **alohida qismlar**: `table = nn.Embedding(...)`, `layer = nn.Linear(...)`. Ikki qism uchun bu yaxshi. Lekin toʻliq GPT da **oʻnlab** qism boʻladi: attention, MLP, normalizatsiya, bloklar…",
    },
    {
      kind: "bullets",
      items: [
        "qaysi qism qaysiga tegishli — chalkashadi",
        "**eng yomoni:** trening barcha oʻrganiladigan sonlarni topishi kerak, lekin ularni yigʻishning toza yoʻli boʻlmaydi",
      ],
    },
  ],
  sections: [
    {
      id: "t6-1",
      title: "Yechim: nn.Module",
      blocks: [
        {
          kind: "text",
          text: "PyTorch modelni bitta narsaga yigʻish uchun **`nn.Module`** beradi. Uni **retsept kartochkasi** deb tasavvur qiling. Uch ish qiladi:",
        },
        {
          kind: "steps",
          items: [
            "**Qismlarni saqlaydi** — embedding va linear model *ichida* yashaydi",
            "**Oqimni belgilaydi** — “maʼlumot kirsa, avval bu, keyin bu”",
            "**Barcha sozlagichlarni avtomatik kuzatadi** — trening ularni bitta chaqiruv bilan topadi",
          ],
        },
        { kind: "text", text: "Uchinchisi eng muhim, 8-darsda koʻrasiz." },
      ],
    },
    {
      id: "t6-2",
      title: "Kod: nn.Module shakli",
      blocks: [
        {
          kind: "code",
          code: "class BigramModel(nn.Module):\n    def __init__(self, vocab_size, n_embd):\n        super().__init__()\n        self.table = nn.Embedding(vocab_size, n_embd)\n        self.layer = nn.Linear(n_embd, vocab_size)\n\n    def forward(self, idx):\n        emb = self.table(idx)\n        logits = self.layer(emb)\n        return logits",
        },
        { kind: "subhead", text: "Har bir qismni tushunamiz:" },
        {
          kind: "bullets",
          items: [
            "`class BigramModel(nn.Module):` — “`nn.Module` ustiga qur” degani; PyTorch ning barcha imkoniyatlarini meros qilib olamiz.",
            "`def __init__(self, ...)` — model **yasalganda** bir marta ishlaydi. Qismlarni shu yerda yaratamiz.",
            "`super().__init__()` — majburiy satr; PyTorch ning ichki hisobini yoqadi. Buni yozmasangiz hech narsa ishlamaydi.",
          ],
        },
        {
          kind: "note",
          tone: "warn",
          text: "**`self.` juda muhim!** U qismni modelga **tegishli** qiladi. Shu sababli PyTorch keyin ularning sozlagichlarini topa oladi. `self.` ni tushirib qoldirsangiz — qism shunchaki vaqtinchalik oʻzgaruvchi boʻlib qoladi va trening uni koʻrmaydi.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "t6-1",
      label: "Mashq 6.1 (fikrlash)",
      prompt: "`__init__` ichida `self.layer = ...` emas, oddiy `layer = ...` yozsak nima boʻladi?",
      answerText:
        "Qatlam yasaladi, lekin **modelga tegishli boʻlmaydi** — u `__init__` tugagach yoʻqoladi. `model.parameters()` uni topa olmaydi, demak trening uning vaznlarini **hech qachon oʻqitmaydi**. Bu juda koʻp uchraydigan va topish qiyin xato.",
    },
    {
      id: "t6-2",
      label: "Mashq 6.2",
      prompt: "Nima uchun modelni `model.forward(xb)` emas, `model(xb)` deb chaqiramiz?",
      answerText:
        "`model(xb)` PyTorch ning ichki mexanizmini ham ishga soladi (hook lar, trening/baholash rejimi va boshqalar), keyin `forward` ni chaqiradi. `forward` ni toʻgʻridan-toʻgʻri chaqirish bu qadamlarni chetlab oʻtadi. Har doim `model(...)` yozing.",
    },
  ],
};

export const T7: Lesson = {
  id: "dars-7",
  n: 7,
  part: PART,
  title: "Loss — xatoni oʻlchash",
  subtitle: "Cross-entropy: ishonch bilan yanglishishni shafqatsiz jazolaydi",
  minutes: 15,
  intro: [
    {
      kind: "text",
      text: "Model taxmin qiladi, lekin **oʻqitilmagan** — taxminlari bemaʼni. Uni oʻqitish uchun avval **“qanchalik yanglishdi”** ni oʻlchashimiz kerak. Bitta son: kichik = yaxshi taxmin, katta = yomon taxmin.",
    },
    {
      kind: "note",
      tone: "key",
      text: "Oʻlchov boʻlmasa — trening boʻlmaydi. Chunki trening aynan shu: “sozlagichlarni shu son kamayadigan tomonga burash”.",
    },
  ],
  sections: [
    {
      id: "t7-1",
      title: "Qanday oʻlchov kerak?",
      blocks: [
        { kind: "text", text: "Toʻgʻri keyingi token — `2`-ID. Ikki model:" },
        {
          kind: "bullets",
          items: [
            "**A model**: `2`-tokenga `0.9` ehtimol berdi (ishonch bilan toʻgʻri)",
            "**B model**: `2`-tokenga `0.001` berdi (butunlay yanglishdi)",
          ],
        },
        {
          kind: "text",
          text: "Bizga kerak: A uchun **kichik** xato, B uchun **katta** xato. Yaʼni: **toʻgʻri tokenga berilgan ehtimol oshsa — xato kamayishi kerak.**",
        },
        {
          kind: "output",
          text: "p=1.0   -> -ln(p) = 0.0000\np=0.9   -> -ln(p) = 0.1054\np=0.5   -> -ln(p) = 0.6931\np=0.1   -> -ln(p) = 2.3026\np=0.01  -> -ln(p) = 4.6052",
        },
        {
          kind: "text",
          text: "Ehtimol kamayganda xato **avval sekin, keyin portlab** oshadi. Nolga yaqinlashganda cheksizlikka ketadi. Aynan kerak boʻlgan shakl: yaxshi taxminni deyarli jazolamaydi, ishonch bilan yanglishishni **shafqatsiz** jazolaydi.",
        },
        {
          kind: "note",
          tone: "key",
          text: "Bu **cross-entropy loss** deb ataladi. Barcha til modellari — ChatGPT ham — shu funksiya bilan oʻqitiladi. Diqqat: **natural logarifm** (`ln`, asosi `e`), oʻnli logarifm emas!",
        },
      ],
    },
    {
      id: "t7-2",
      title: "Kod: F.cross_entropy",
      blocks: [
        { kind: "text", text: "PyTorch softmax va `-ln` ni **bitta** amalga birlashtirgan:" },
        {
          kind: "code",
          code: 'logits = model(xb)\nB, T, V = logits.shape\nloss = F.cross_entropy(logits.view(B*T, V), yb.view(B*T))\nprint("loss:", loss.item())',
        },
        {
          kind: "note",
          tone: "warn",
          text: "`F.cross_entropy` **xom logitlarni** kutadi, softmax qilinganini emas. Oʻzi ichida softmax qiladi. Ikki marta softmax qilsangiz natija notoʻgʻri boʻladi.",
        },
        { kind: "viz", id: "softmax" },
      ],
    },
  ],
  exercises: [
    {
      id: "t7-1",
      label: "Mashq 7.1",
      prompt:
        "Vocab 51 ta. Oʻqitilmagan model uchun kutilgan loss qancha boʻladi?",
      hint: "Teng taqsimotda toʻgʻri tokenga `1/51` ehtimol tegadi.",
      answerOutput: "-ln(1/51) ≈ 3.93",
      answerText:
        "Oʻqitilmagan model hammasiga teng ehtimol beradi — `1/51 ≈ 0.0196`. Demak loss `-ln(0.0196) ≈ 3.93`. Trening boshida shundan ancha katta son koʻrsangiz, kodda xato bor.",
    },
    {
      id: "t7-2",
      label: "Mashq 7.2 (fikrlash)",
      prompt: "Nega oddiy “toʻgʻri/notoʻgʻri” sanashdan foydalanmaymiz?",
      answerText:
        "Chunki u **silliq emas**. “Toʻgʻri javob soni” faqat sakrab oʻzgaradi — model ozgina yaxshilanganda u umuman oʻzgarmaydi, demak gradient nol boʻladi va trening yoʻl topa olmaydi. Cross-entropy esa har bir kichik yaxshilanishga javob beradi.",
    },
  ],
};

export const T8: Lesson = {
  id: "dars-8",
  n: 8,
  part: PART,
  title: "Trening tsikli",
  subtitle: "Gradient, optimizer va uch qatorlik sehr",
  minutes: 18,
  intro: [
    {
      kind: "text",
      text: "Bizda hammasi bor: sozlagichlari boʻlgan model va xatoni oʻlchaydigan loss. **Trening** — bitta gap: *sozlagichlarni loss kamayadigan tomonga burash.* Buni minglab marta takrorlash = model oʻrganadi.",
    },
    {
      kind: "text",
      text: "Lekin **qaysi tomonga** burashni qanday bilamiz? Modelda minglab sozlagich bor!",
    },
  ],
  sections: [
    {
      id: "t8-1",
      title: "Ahmoqona usul va aqlli usul",
      blocks: [
        {
          kind: "text",
          text: "**Ahmoqona usul:** bitta sozlagichni ozgina oʻngga bur, loss ni qayta hisobla. Kamaydimi? Davom et. Oshdimi? Chapga bur. **Muammo:** minglab sozlagich bor — bitta qadam uchun minglab hisob. Umuman imkonsiz.",
        },
        {
          kind: "text",
          text: "**Aqlli usul: gradient.** Matematikadan **hosila** (yoki **qiyalik**) aynan kerakli savolga javob beradi: “Bu sozlagichni ozgina oshirsam, loss oshadimi yoki kamayadimi, va qanchalik tez?”",
        },
        {
          kind: "bullets",
          items: [
            "Qiyalik **musbat** → oshirsak loss oshadi → **kamaytir**",
            "Qiyalik **manfiy** → oshirsak loss kamayadi → **oshir**",
            "Qiyalik **tik** → bu sozlagich muhim, katta qadam",
          ],
        },
      ],
    },
    {
      id: "t8-2",
      title: "Optimizer",
      blocks: [
        {
          kind: "code",
          code: "optimizer = torch.optim.AdamW(model.parameters(), lr=1e-2)",
        },
        {
          kind: "note",
          tone: "key",
          text: "**`model.parameters()`** — **mana 6-darsda `self.` yozganimizning mevasi!** Bu bitta chaqiruv model ichidagi **barcha** oʻrganiladigan sonlarni topib beradi. Qoʻlda sanab chiqmaymiz.",
        },
        {
          kind: "text",
          text: "**`lr=1e-2`** — **learning rate** (oʻqish tezligi): har qadamda **qanchalik katta** siljish. Bu treningdagi **eng muhim sozlama**:",
        },
        {
          kind: "bullets",
          items: [
            "juda katta → maqsaddan oshib ketadi, loss sakraydi yoki portlaydi",
            "juda kichik → juda sekin oʻrganadi",
          ],
        },
        {
          kind: "text",
          text: "**AdamW** — “aqlli gradient descent”. Har bir sozlagich uchun qadam kattaligini **avtomatik** moslashtiradi. Bugungi standart optimizer.",
        },
      ],
    },
    {
      id: "t8-3",
      title: "Kod: toʻliq trening tsikli",
      blocks: [
        {
          kind: "code",
          code: 'optimizer = torch.optim.AdamW(model.parameters(), lr=1e-2)\n\nfor step in range(3000):\n    xb2, yb2 = get_batch(data)              # yangi tasodifiy batch\n    logits = model(xb2)\n    B, T, V = logits.shape\n    loss = F.cross_entropy(logits.view(B*T, V), yb2.view(B*T))\n\n    optimizer.zero_grad()      # eski qiyaliklarni tozala\n    loss.backward()            # yangi qiyaliklarni hisobla\n    optimizer.step()           # sozlagichlarni sur\n\n    if step % 500 == 0:\n        print(f"  step {step:4d}  loss {loss.item():.4f}")',
        },
        {
          kind: "note",
          tone: "warn",
          text: "`optimizer.zero_grad()` ni tushirib qoldirsangiz, qiyaliklar **yigʻilib** boradi va trening buziladi. Uchta qator har doim shu tartibda: `zero_grad` → `backward` → `step`.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "t8-1",
      label: "Mashq 8.1 (fikrlash)",
      prompt: "`optimizer.zero_grad()` ni yozmasak nima boʻladi?",
      answerText:
        "PyTorch qiyaliklarni **qoʻshib** boradi (accumulate). Ikkinchi qadamda 1- va 2-qadamning qiyaliklari qoʻshiladi, uchinchisida uchtasi… Natijada qadamlar tobora kattalashadi va trening portlaydi. Shuning uchun har qadam boshida tozalash kerak.",
    },
    {
      id: "t8-2",
      label: "Mashq 8.2",
      prompt: "Trening boshida loss ~3.9 edi, 3000 qadamdan keyin ~2.4. Bu yaxshi belgi mi?",
      answerText:
        "Ha. `3.9` — teng taqsimot (`-ln(1/51)`), yaʼni model hech narsa bilmaydi. `2.4` ga tushishi model **haqiqatan** naqsh oʻrganganini bildiradi. Bigram model uchun bu kutilgan natija — undan yaxshisi uchun kontekst kerak (10-dars).",
    },
  ],
};

export const T9: Lesson = {
  id: "dars-9",
  n: 9,
  part: PART,
  title: "Matn generatsiya",
  subtitle: "Sampling va bigram modelning chegarasi",
  minutes: 16,
  intro: [
    {
      kind: "text",
      text: "Modelimiz oʻqitildi. Endi undan **matn yozdiramiz**. 1-darsdagi gʻoyani eslaymiz — generatsiya bitta harakatni takrorlash:",
    },
    {
      kind: "steps",
      items: [
        "Kontekstni modelga ber",
        "Oxirgi pozitsiyaning logitlarini ol",
        "Softmax → ehtimolliklar",
        "Bitta token **TANLA**",
        "Kontekstga qoʻsh",
        "Takrorla",
      ],
    },
  ],
  sections: [
    {
      id: "t9-1",
      title: "4-qadamda tanlov: qanday tanlaymiz?",
      blocks: [
        {
          kind: "text",
          text: "**1. Eng kattasini olish (greedy).** Har doim eng yuqori ehtimolli tokenni tanlash. Natija: har safar **aynan bir xil** matn. Zerikarli.",
        },
        {
          kind: "text",
          text: "**2. Ehtimol boʻyicha tasodifiy tanlash (sampling).** Ehtimoli `0.7` boʻlgan token ~70% hollarda tanlanadi, `0.1` boʻlgani ~10%.",
        },
        {
          kind: "note",
          tone: "key",
          text: "Biz **sampling** ishlatamiz — haqiqiy modellar shunday qiladi. Shu sababli ChatGPT bir xil savolga har xil javob beradi. PyTorch da bu **`torch.multinomial`**.",
        },
        {
          kind: "text",
          text: "**`torch.cat([context, nxt.unsqueeze(0)], dim=1)`** — yangi tokenni kontekst oxiriga yopishtiradi. `dim=1` — vaqt oʻqi boʻylab (`T`).",
        },
      ],
    },
    {
      id: "t9-2",
      title: "Natija: bigram nima yozdi?",
      blocks: [
        {
          kind: "output",
          text: "Mut r. m ktuvortan xtnngʻzanorayiqilarlad Oʻlaydiobinikuladil Qin.\nParosi.\nMubobor Bikeng tisi.\nTivchk. q i.\nTanoboydayor kuvosek ndi kula ngʻpr bir Oʻzliladugʻlad Ki foʻyoʻragʻyupobil h basam mar ch d",
        },
        { kind: "subhead", text: "Diqqat bilan oʻqing. Uch narsani koʻramiz:" },
        {
          kind: "steps",
          items: [
            "**Haqiqiy oʻzbek boʻlaklari bor:** `kuladil`, `bir`, `Oʻz`, `ladi`, `bobor`. Model oʻzbek harflari qanday ketma-ketlikda kelishini **oʻrgandi**.",
            "**Baʼzi juftliklar toʻgʻri:** `qi`, `la`, `di`, `oʻ` — oʻzbek tilida haqiqatan koʻp uchraydigan birikmalar.",
            "**Lekin maʼno YOʻQ.** Bitta ham toʻgʻri soʻz emas, gap ham yoʻq. Butunlay bemaʼni.",
          ],
        },
        {
          kind: "note",
          tone: "warn",
          text: "Nima uchun bunday? Chunki bigram model faqat **bitta oldingi tokenga** qaraydi. U “oʻzbek tilida `q` dan keyin koʻpincha `i` keladi” ni biladi, lekin gapni eslab qolmaydi. Yechim — **kontekst**, va u attention bilan keladi (3-QISM).",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "t9-1",
      label: "Mashq 9.1 (fikrlash)",
      prompt: "Nega greedy tanlov (har doim eng kattasi) yaramaydi?",
      answerText:
        "Ikki sabab. **Bir xillik:** bir xil kontekstdan har safar bir xil matn chiqadi — ijodkorlik yoʻq. **Tuzoq:** model bitta takrorlanuvchi halqaga tushib qolishi mumkin (`la la la…`), chunki eng ehtimolli token har doim bir xil boʻladi. Sampling bu ikki muammoni ham yechadi.",
    },
    {
      id: "t9-2",
      label: "Mashq 9.2",
      prompt:
        "Bigram model nimani oʻrgandi va nimani oʻrganmadi?",
      answerText:
        "**Oʻrgandi:** harflar orasidagi juftlik statistikasi — `q` dan keyin `i`, `l` dan keyin `a` koʻp keladi. Shuning uchun chiqqan matn oʻzbekchaga *oʻxshaydi*. **Oʻrganmadi:** soʻz, gap, maʼno — chunki u faqat bitta oldingi tokenni koʻradi. Ikkitadan uzoqroq bogʻliqlikni ushlash uchun attention kerak.",
    },
  ],
};

export const PART2 = [T5, T6, T7, T8, T9];
