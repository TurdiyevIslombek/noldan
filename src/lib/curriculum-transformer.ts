/* --------------------------------------------------------------------
   Noldan — Transformer (GPT) course data.

   Source of truth: "Noldan Transformer (GPT) Yasash" by Islombek
   Turdiyev. The Uzbek copy is the author's own text, transcribed
   verbatim — do not paraphrase it.

   STATUS: 1-QISM (01–04) is authored here; 2-QISM (05–09) lives in
   curriculum-transformer-p2.ts. Lessons 10–18 are registered with their
   real titles and parts so the syllabus is complete and honest, and are
   marked `status: "soon"` until transcribed from the source document.
   -------------------------------------------------------------------- */

import type { Course, Lesson } from "./curriculum";
import { PART2 } from "./curriculum-transformer-p2";

const T1: Lesson = {
  id: "dars-1",
  n: 1,
  part: "1-QISM: ASOSLAR",
  title: "Model nima qiladi?",
  subtitle: "Bitta vazifa, taqsimot va tensor shakli",
  minutes: 14,
  intro: [
    {
      kind: "text",
      text: "Telefon klaviaturasi siz yozayotganda keyingi soʻzni taklif qiladi. Bu — kichik til modeli. GPT **aynan shu ishni** qiladi, faqat ancha yaxshi va **token**lar bilan.",
    },
    {
      kind: "note",
      tone: "key",
      text: "**Modelning bitta vazifasi bor:** berilgan tokenlar ketma-ketligiga qarab, **keyingi token** nima boʻlishini taxmin qilish.",
    },
    {
      kind: "text",
      text: "Boshqa hech narsa. Butun ChatGPT shu bitta ishni qiladi — faqat juda yaxshi qiladi.",
    },
  ],
  sections: [
    {
      id: "t1-1",
      title: "Muhim nozik jihat",
      blocks: [
        {
          kind: "text",
          text: "Model “keyingi token — bu” deb **bitta javob bermaydi**. U **har bir mumkin boʻlgan token uchun** ehtimollik chiqaradi.",
        },
        {
          kind: "text",
          text: "Masalan vocab da 51 ta token boʻlsa, model **51 ta son** chiqaradi:",
        },
        {
          kind: "bullets",
          items: ["har biri 0 va 1 orasida", "hammasining yigʻindisi aniq 1"],
        },
        {
          kind: "text",
          text: "Yaxshi oʻqitilgan model toʻgʻri tokenga katta son beradi, qolganlariga kichik.",
        },
        {
          kind: "text",
          text: "**Nima uchun bitta javob emas, butun taqsimot?** Chunki tilda bir kontekstdan keyin **koʻp** variant toʻgʻri boʻlishi mumkin: “Men non ___” → `yedim`, `oldim`, `pishirdim` — hammasi toʻgʻri!",
        },
        {
          kind: "text",
          text: "Taqsimot modelga **ikkilanish** imkonini beradi. Bu ijodkorlik va toʻgʻri oʻqitish uchun zarur.",
        },
      ],
    },
    {
      id: "t1-2",
      title: "Generatsiya — bir harakat, takrorlangan",
      blocks: [
        { kind: "text", text: "Matn yozish shundan iborat:" },
        {
          kind: "flow",
          text: "kontekst → taqsimot → token tanlash → kontekstga qoʻshish → takrorla",
        },
        {
          kind: "text",
          text: "Model **faqat** keyingi tokenni taxmin qiladi. Buni **qayta-qayta** qilish butun gap, paragraf, hikoya yozadi.",
        },
      ],
    },
    {
      id: "t1-3",
      title: "PyTorch bilan tanishuv",
      blocks: [
        {
          kind: "text",
          text: "Modelni qurish uchun **PyTorch** kutubxonasi kerak. Uning asosiy qurilmasi — **tensor**.",
        },
        {
          kind: "text",
          text: "**Tensor nima?** Bu raqamlar joylashtirilgan quti. Roʻyxatga oʻxshaydi, lekin matematika uchun tez va qulay.",
        },
        {
          kind: "code",
          code: "import torch\n\nids = torch.tensor([14, 9, 33])\nprint(ids)\nprint(ids.shape)",
        },
        { kind: "output", text: "tensor([14,  9, 33])\ntorch.Size([3])" },
        {
          kind: "bullets",
          items: [
            "`torch.tensor([...])` — roʻyxatdan tensor yasaydi",
            "`.shape` — **shakl**: tensor qanday oʻlchamda",
          ],
        },
        {
          kind: "text",
          text: "`torch.Size([3])` — ichida **bitta** son bor, demak bu **1 oʻlchovli** tensor, uzunligi 3. Oddiy tekis roʻyxat.",
        },
        {
          kind: "note",
          tone: "warn",
          text: "`.shape` — sizning eng muhim qurolingiz. PyTorch dagi xatolarning 90% shakl notoʻgʻri boʻlgani uchun chiqadi. Har doim shaklni tekshiring!",
        },
      ],
    },
    {
      id: "t1-4",
      title: "Ikki oʻlchovli tensor — (B, T)",
      blocks: [
        {
          kind: "text",
          text: "Haqiqiy trening bitta gap bilan emas, **bir necha** gap bilan bir vaqtda boʻladi. Bu ikki oʻlchovli tensor yasaydi:",
        },
        {
          kind: "code",
          code: "batch = torch.tensor([[14, 9, 33],\n                      [7, 21, 5]])\nprint(batch.shape)",
        },
        { kind: "output", text: "torch.Size([2, 3])" },
        {
          kind: "text",
          text: "**2 qator, 3 ustun.** Bu shakl butun kurs davomida ishlatiladi, shuning uchun nomlarini yodlab qoling:",
        },
        {
          kind: "bullets",
          items: [
            "**Qatorlar = `B`** (*batch*) — nechta alohida ketma-ketlik. Bu yerda 2 ta.",
            "**Ustunlar = `T`** (*time*) — har bir ketma-ketlikda nechta token. Bu yerda 3 ta.",
          ],
        },
        { kind: "viz", id: "tensor" },
        {
          kind: "text",
          text: "Ichidagi har bir son — **token ID**, yaʼni sizning tokenizatoringiz chiqargan raqam.",
        },
        {
          kind: "note",
          tone: "key",
          text: "**`(B, T)` — GPT ga kiradigan shakl.** Boshqa hech narsa kirmaydi: faqat raqamlar jadvali.",
        },
      ],
    },
    {
      id: "t1-5",
      title: "Xulosa",
      blocks: [
        {
          kind: "bullets",
          items: [
            "Modelning **bitta** vazifasi: keyingi tokenni taxmin qilish",
            "Model **bitta javob emas**, har bir token uchun **ehtimollik** chiqaradi",
            "Ehtimolliklar: 0–1 orasida, yigʻindisi 1",
            "Generatsiya = shu bitta harakatni takrorlash",
            "**Tensor** — PyTorch ning raqam qutisi",
            "**`(B, T)`** — `B` ta ketma-ketlik, har birida `T` ta token",
          ],
        },
      ],
    },
  ],
  exercises: [
    {
      id: "t1-1",
      label: "Mashq 1.1",
      prompt:
        "Vocab da 51 ta token bor. Model keyingi tokenni taxmin qilganda nechta son chiqaradi va ular nimaga teng boʻladi?",
      answerText:
        "**51 ta son.** Har biri “shu token keyingi boʻlish ehtimoli”. Hammasining yigʻindisi **1** ga teng.\n\nMuhim: `i`-chi son = “`i`-chi token keyingi boʻladi” degan ehtimol. Bu tokenlarning bir-biriga oʻxshashligi **emas**.",
    },
    {
      id: "t1-2",
      label: "Mashq 1.2",
      prompt: "Quyidagi tensorning shakli qanday? Avval taxmin qiling.",
      hint: "`t = torch.tensor([[1,2,3,4],[5,6,7,8],[9,10,11,12]])`",
      answerCode:
        "t = torch.tensor([[1, 2, 3, 4],\n                  [5, 6, 7, 8],\n                  [9, 10, 11, 12]])\nprint(t.shape)",
      answerOutput: "torch.Size([3, 4])",
      answerText:
        "3 qator (`B`=3), 4 ustun (`T`=4). Yaʼni 3 ta ketma-ketlik, har birida 4 ta token.",
    },
    {
      id: "t1-3",
      label: "Mashq 1.3 (fikrlash)",
      prompt:
        "Nima uchun model bitta token emas, butun ehtimolliklar taqsimotini chiqaradi? Ikki sabab aytib bering.",
      answerText:
        "**1-sabab:** tilda bir kontekstdan keyin koʻp variant toʻgʻri boʻladi. “Men kitob ___” dan keyin `oʻqidim`, `oldim`, `berdim` — hammasi mumkin. Taqsimot modelga ikkilanish imkonini beradi.\n\n**2-sabab:** ijodkorlik. Agar model har doim bitta javob bersa, u har safar bir xil matn yozadi. Taqsimotdan tanlash matnni xilma-xil qiladi.",
    },
  ],
};

const T2: Lesson = {
  id: "dars-2",
  n: 2,
  part: "1-QISM: ASOSLAR",
  title: "Embedding",
  subtitle: "ID — son emas, manzil",
  minutes: 16,
  intro: [
    {
      kind: "text",
      text: "Tokenizator har bir tokenga raqam beradi: `non` = 9, `uxladim` = 10. Lekin bu raqam **shunchaki yorliq**. Xuddi stadiondagi **oʻrindiq raqami** kabi: 5000-oʻrindiqdagi odam 5-oʻrindiqdagidan “1000 marta koʻp” emas. Raqam faqat **qayerda oʻtirganini** koʻrsatadi.",
    },
  ],
  sections: [
    {
      id: "t2-1",
      title: "Muammo: xom ID yaramaydi",
      blocks: [
        { kind: "subhead", text: "1-xato: yolgʻon kattalik" },
        {
          kind: "text",
          text: "Matematika 5000 ni “katta”, 5 ni “kichik” deb koʻradi. Model yashirincha 5000-tokenni “katta narsa” deb oʻylaydi. Lekin bu maʼnosiz — ikkisi ham oddiy soʻz!",
        },
        { kind: "subhead", text: "2-xato: yolgʻon yaqinlik" },
        {
          kind: "text",
          text: "Son oʻqida 9 va 10 yonma-yon. Matematika ularni “deyarli bir xil” deb koʻradi. Lekin 9-token `non` (ovqat), 10-token `uxladim` (harakat) boʻlishi mumkin. **ID da yonma-yon boʻlish maʼnoda yaqinlikni bildirmaydi.**",
        },
        {
          kind: "note",
          tone: "warn",
          text: "**Xulosa:** xom ID matematikaga ikki marta yolgʻon aytadi.",
        },
      ],
    },
    {
      id: "t2-2",
      title: "Yechim: embedding",
      blocks: [
        {
          kind: "text",
          text: "Xom raqam oʻrniga har bir tokenga **oʻz sonlar roʻyxatini** beramiz: `non -> [0.2, -1.1, 0.5, 0.8]`. Bu roʻyxat **embedding** deyiladi. Roʻyxat uzunligi — **`n_embd`**.",
        },
        {
          kind: "text",
          text: "**Nima uchun bu yaxshi?** Chunki bu sonlar **oʻrganiladi**. Boshida tasodifiy, lekin trening davomida model ularni asta-sekin toʻgʻrilaydi.",
        },
        {
          kind: "text",
          text: "Natijada: **oʻxshash ishlatiladigan tokenlar oʻxshash sonlar oladi.** `non` va `osh` (ikkisi ham ovqat) yaqin boʻladi, `non` va `uxladim` uzoq. Model **haqiqiy** yaqinlikni matndan oʻzi oʻrganadi.",
        },
        {
          kind: "text",
          text: "Bitta raqam bilan hech narsa ifodalab boʻlmaydi. Sonlar roʻyxati bilan — koʻp narsa. Shu qoʻshimcha joy butun gap.",
        },
        { kind: "viz", id: "embed" },
        {
          kind: "note",
          tone: "key",
          text: "Token ID `9` → jadvalning **9-qatoriga** bor → shu qatorni ol → bu tokenning embeddingi. ID endi matematika qiladigan **son emas**. U **manzil** — “9-qatorni olib kel”.",
        },
      ],
    },
    {
      id: "t2-3",
      title: "Kod: jadvalni yasash",
      blocks: [
        {
          kind: "text",
          text: "Avval oʻquv matnimizni tayyorlaymiz. Bu kursda **oʻzbek matni** ishlatamiz:",
        },
        {
          kind: "code",
          code: 'MATN = """Maktabda oʻquvchilar kitob oʻqiydilar. Oʻqituvchi darsni tushuntiradi.\nTalabalar universitetda bilim oladilar. Kitob insonni boyitadi.\nBahorda daraxtlar gullaydi. Qushlar uyaga qaytadi. Havo iliq boʻladi."""',
        },
        { kind: "text", text: "Endi eng oddiy tokenizator yasaymiz — **belgi darajasida**:" },
        {
          kind: "code",
          code: 'belgilar = sorted(set(MATN))\nvocab_size = len(belgilar)\nstoi = {ch: i for i, ch in enumerate(belgilar)}\nitos = {i: ch for i, ch in enumerate(belgilar)}\n\nencode = lambda s: [stoi[c] for c in s]\ndecode = lambda l: "".join(itos[i] for i in l)\n\nprint("vocab_size:", vocab_size)\nprint("encode(\'kitob\'):", encode("kitob"))\nprint("decode:", decode(encode("kitob")))',
        },
        {
          kind: "output",
          text: "vocab_size: 51\nencode('kitob'): [34, 32, 43, 38, 25]\ndecode: kitob",
        },
        {
          kind: "bullets",
          items: [
            "`set(MATN)` — takrorlarni olib tashlaydi, faqat turli belgilar qoladi",
            "`sorted(...)` — alifbo tartibiga soladi (har safar bir xil natija uchun)",
            "`stoi` — *string to integer*: belgi → raqam",
            "`itos` — *integer to string*: raqam → belgi",
            "`lambda` — qisqa funksiya yozish usuli",
          ],
        },
        {
          kind: "note",
          tone: "tip",
          text: "**Nima uchun BPE emas, belgi darajasida?** Chunki vocab kichik (51) boʻlsa model **tez** oʻqiladi va natijani darhol koʻramiz. Sizning BPE tokenizatoringiz **aynan shu joyga** ulanadi.",
        },
      ],
    },
    {
      id: "t2-4",
      title: "Kod: embedding jadvali va qidiruv",
      blocks: [
        {
          kind: "code",
          code: 'import torch\nimport torch.nn as nn\n\ntorch.manual_seed(42)\n\nn_embd = 4\ntable = nn.Embedding(vocab_size, n_embd)\nprint("jadval shakli:", table.weight.shape)',
        },
        { kind: "output", text: "jadval shakli: torch.Size([51, 4])" },
        {
          kind: "bullets",
          items: [
            "`nn.Embedding(qator_soni, qator_uzunligi)` — jadval yasaydi",
            "Tartib: **avval nechta qator, keyin har qator uzunligi**",
            "`table.weight` — jadvalning ichidagi sonlar",
            "`torch.manual_seed(42)` — tasodifiy sonlarni **qotirib** qoʻyadi, shunda sizda ham menda ham **bir xil** natija chiqadi",
          ],
        },
        { kind: "code", code: "out = table(torch.tensor([9]))\nprint(out)\nprint(out.shape)" },
        {
          kind: "output",
          text: "tensor([[ 0.3189, -0.4245,  0.3057, -0.7746]], grad_fn=<EmbeddingBackward0>)\ntorch.Size([1, 4])",
        },
        {
          kind: "text",
          text: "**Nima boʻldi?** `table(...)` — qidiruv. 9-ID ni berdik, u jadvalning **9-qatorini** olib qaytardi: 4 ta son.",
        },
        {
          kind: "text",
          text: "**Nima uchun sonlar tasodifiy?** Chunki jadval hozir yasaldi — model hali **hech narsa** koʻrmagan. Bu **boshlangʻich nuqta**, oxirgi natija emas.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "t2-1",
      label: "Mashq 2.1",
      prompt:
        "`nn.Embedding(100, 8)` yasadingiz. `table.weight.shape` nima boʻladi va bu nimani bildiradi?",
      answerOutput: "torch.Size([100, 8])",
      answerText:
        "100 qator — vocab da 100 ta token. Har qatorda 8 son — `n_embd` = 8. Yaʼni har bir token 8 oʻlchovli vektor bilan ifodalanadi.",
    },
    {
      id: "t2-2",
      label: "Mashq 2.2 (fikrlash)",
      prompt: "Nima uchun xom token ID ni toʻgʻridan-toʻgʻri modelga bermaymiz?",
      answerText:
        "Ikki sabab. **Yolgʻon kattalik:** matematika 5000 ni 5 dan katta deb koʻradi, lekin ikkisi ham oddiy soʻz. **Yolgʻon yaqinlik:** 9 va 10 son oʻqida yonma-yon, lekin `non` va `uxladim` maʼnoda yaqin emas. Embedding bu ikki yolgʻonni yoʻqotadi — sonlar oʻrganiladi va haqiqiy yaqinlikni aks ettiradi.",
    },
  ],
};

const T3: Lesson = {
  id: "dars-3",
  n: 3,
  part: "1-QISM: ASOSLAR",
  title: "Linear qatlam va logitlar",
  subtitle: "4 ta sondan 51 ta son",
  minutes: 15,
  intro: [
    {
      kind: "text",
      text: "Bizda embedding bor: bitta token → **4 ta son**. Lekin 1-darsdan bilamiz: modelning javobi **har bir token uchun bitta son** boʻlishi kerak. Vocab 51 ta boʻlsa — **51 ta son**.",
    },
    { kind: "note", tone: "key", text: "Demak kerak: **4 ta sondan 51 ta son yasash.**" },
  ],
  sections: [
    {
      id: "t3-1",
      title: "Skalyar koʻpaytma va matritsa",
      blocks: [
        {
          kind: "text",
          text: "**Skalyar koʻpaytma** (*dot product*) ikkita roʻyxatni olib **bitta son** qaytaradi:",
        },
        {
          kind: "flow",
          text: "[a, b, c, d] · [w, x, y, z] → a*w + b*x + c*y + d*z → BITTA son",
        },
        {
          kind: "text",
          text: "Lekin bizga **51 ta** son kerak. Yechim: **51 marta** skalyar koʻpaytma qilamiz, har biri oʻz vaznlar roʻyxati bilan. Natijada 51 ta son!",
        },
        {
          kind: "text",
          text: "**Koʻp skalyar koʻpaytmani bir vaqtda qilish — aynan matritsa koʻpaytmasi.** Bu PyTorch da **`nn.Linear`** deb ataladi — **linear qatlam**. Uning vaznlari ham embedding kabi **oʻrganiladi**.",
        },
        {
          kind: "bullets",
          items: [
            "Kirish: **4** son",
            "Chiqish: **51** son",
            "Demak 51 ta vaznlar roʻyxati, har biri 4 uzunlikda → **`[51, 4]`** matritsa",
          ],
        },
      ],
    },
    {
      id: "t3-2",
      title: "Ehtiyot boʻling — ikki xil tartib!",
      blocks: [
        {
          kind: "text",
          text: "Bu joyda eng koʻp xato qilinadi. `nn.Linear` da **ikki xil tartib** bor:",
        },
        {
          kind: "code",
          code: 'layer = nn.Linear(n_embd, vocab_size)   # YASASH: (kirish, chiqish)\nprint("weight shakli:", layer.weight.shape)   # SAQLASH: [chiqish, kirish]',
        },
        { kind: "output", text: "weight shakli: torch.Size([51, 4])" },
        {
          kind: "note",
          tone: "warn",
          text: "**Ikki tartibni yodda tuting:** yasash `nn.Linear(kirish, chiqish)`, saqlash `.weight.shape` = `[chiqish, kirish]`.",
        },
      ],
    },
    {
      id: "t3-3",
      title: "Kod: 4 ta sondan 51 ta son",
      blocks: [
        {
          kind: "code",
          code: 'torch.manual_seed(42)\ntable = nn.Embedding(vocab_size, n_embd)\nlayer = nn.Linear(n_embd, vocab_size)\n\nemb = table(torch.tensor([9]))\nlogits = layer(emb)\n\nprint("emb shakli   :", emb.shape)\nprint("logits shakli:", logits.shape)\nprint("birinchi 5 logit:", logits[0][:5])',
        },
        {
          kind: "output",
          text: "emb shakli   : torch.Size([1, 4])\nlogits shakli: torch.Size([1, 51])\nbirinchi 5 logit: tensor([ 0.1521, -0.2449, -0.4017, -0.5831,  0.2090], grad_fn=<SliceBackward0>)",
        },
        {
          kind: "text",
          text: "**4 ta son kirdi, 51 ta son chiqdi.** Aynan kerak boʻlgani.",
        },
      ],
    },
    {
      id: "t3-4",
      title: "Yangi soʻz: logit",
      blocks: [
        {
          kind: "text",
          text: "Chiqqan 51 ta sonni **logit** deb ataymiz. **Logit nima?** Bu **xom ballar** — ehtimolliklarga aylantirilmagan holat.",
        },
        {
          kind: "bullets",
          items: [
            "**manfiy** sonlar bor",
            "0–1 orasida **emas**",
            "yigʻindisi 1 ga teng **emas**",
          ],
        },
        {
          kind: "note",
          tone: "key",
          text: "Logitlar **oʻqitilgandan keyin ham** cheklanmagan boʻlib qoladi. Manfiy boʻlishi mumkin, yigʻindisi 1 boʻlmaydi. Bu xato emas — shunday boʻlishi kerak.",
        },
        {
          kind: "text",
          text: "Ularni ehtimolliklarga aylantirish — keyingi darsning ishi.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "t3-1",
      label: "Mashq 3.1",
      prompt: "`nn.Linear(16, 4)` yasadingiz. `.weight.shape` nima boʻladi?",
      answerOutput: "torch.Size([4, 16])",
      answerText:
        "Saqlash tartibi `[chiqish, kirish]` — shuning uchun `[4, 16]`, yasashdagi tartibning teskarisi.",
    },
    {
      id: "t3-2",
      label: "Mashq 3.2 (fikrlash)",
      prompt: "Nega logitlar manfiy boʻlishi mumkin? Bu xato emasmi?",
      answerText:
        "Xato emas. Logit — **xom ball**, hech qanday cheklov yoʻq. U matritsa koʻpaytmasining natijasi, shuning uchun manfiy ham, juda katta ham boʻlishi mumkin. Ehtimollikka aylantirish softmax ning ishi (keyingi dars).",
    },
  ],
};

const T4: Lesson = {
  id: "dars-4",
  n: 4,
  part: "1-QISM: ASOSLAR",
  title: "Softmax",
  subtitle: "Logitdan ehtimolga — exp va normalizatsiya",
  minutes: 15,
  intro: [
    {
      kind: "text",
      text: "Bizda 51 ta logit bor: `[0.15, -0.24, -0.40, ...]`. Bizga esa 51 ta **ehtimollik** kerak: har biri 0–1 orasida, yigʻindisi 1.",
    },
    {
      kind: "bullets",
      items: [
        "**Manfiy sonlar bor** — ehtimollik manfiy boʻlmaydi",
        "**Yigʻindisi 1 emas**",
      ],
    },
  ],
  sections: [
    {
      id: "t4-1",
      title: "1-qadam: hammasini musbat qilish",
      blocks: [
        {
          kind: "text",
          text: "Har qanday sonni — hatto manfiyni ham — musbat qiladigan amal kerak. **Yechim: `exp`** — yaʼni `e^x`.",
        },
        {
          kind: "bullets",
          items: [
            "**Har doim musbat.** `e^x` hech qachon nol yoki manfiy boʻlmaydi. `e^(-3) ≈ 0.05`, `e^0 = 1`, `e^3 ≈ 20`.",
            "**Tartibni saqlaydi.** Katta kirish → katta chiqish. `-3 < 0 < 3` → `0.05 < 1 < 20`.",
          ],
        },
        {
          kind: "note",
          tone: "warn",
          text: "Nima uchun kvadratga koʻtarish yaramaydi? Chunki `(-3)² = 9` va `3² = 9` — **bir xil**! Kvadrat manfiy va musbatni farqlay olmaydi, maʼnoni yoʻqotadi. `exp` esa farqlaydi.",
        },
      ],
    },
    {
      id: "t4-2",
      title: "2-qadam: yigʻindini 1 qilish",
      blocks: [
        {
          kind: "text",
          text: "Bu oson: **har birini yigʻindiga boʻlamiz.** Misol: `[2, 1, 1]` → yigʻindi 4 → `[0.5, 0.25, 0.25]`. Yigʻindi 1 boʻldi, nisbatlar saqlandi. Bu amal **normalizatsiya** deyiladi.",
        },
        { kind: "subhead", text: "Ikkisi birga = softmax" },
        {
          kind: "steps",
          items: [
            "Har bir logitni `exp` qil → hammasi musbat, tartib saqlangan",
            "Har birini yigʻindiga boʻl → yigʻindi 1",
          ],
        },
        {
          kind: "text",
          text: "Bu ikki qadam **softmax** deb ataladi. U transformerda **ikki joyda** ishlatiladi — bu yerda va attention ichida.",
        },
        { kind: "viz", id: "softmax" },
      ],
    },
    {
      id: "t4-3",
      title: "Kod: haqiqiy logitlarda",
      blocks: [
        {
          kind: "code",
          code: 'probs = F.softmax(logits, dim=-1)\n\nprint("shakli:", probs.shape)\nprint("yigʻindi:", probs.sum().item())\nprint("birinchi 5:", probs[0][:5])\nprint("1/vocab_size =", round(1/vocab_size, 5))',
        },
        {
          kind: "output",
          text: "shakli: torch.Size([1, 51])\nyigʻindi: 1.0\nbirinchi 5: tensor([0.0199, 0.0134, 0.0115, 0.0096, 0.0211], grad_fn=<SliceBackward0>)\n1/vocab_size = 0.01961",
        },
        {
          kind: "steps",
          items: [
            "**Shakl oʻzgarmadi** — `[1, 51]`. Softmax qiymatlarni oʻzgartiradi, shaklni emas.",
            "**Yigʻindi aniq 1.0** — softmax vazifasini bajardi.",
            "**Hamma qiymat `0.0196` atrofida** — bu `1/51` ga teng! Model ehtimolni **deyarli teng** taqsimlagan.",
          ],
        },
        {
          kind: "text",
          text: "Nima uchun teng? Chunki model **oʻqitilmagan** — hali hech narsa bilmaydi, shuning uchun hech birini afzal koʻrmaydi. Bu toʻgʻri xatti-harakat.",
        },
        { kind: "subhead", text: "`dim=-1` nima?" },
        {
          kind: "text",
          text: "Softmax “qaysi guruh 1 ga teng boʻlishi kerak” ni bilishi kerak. `dim=-1` = “**oxirgi** oʻq boʻylab”. Shakl `[1, 51]`, oxirgi oʻq — 51 ta logit. Demak: har bir qatordagi 51 ta son yigʻindisi 1 boʻladi.",
        },
        {
          kind: "note",
          tone: "warn",
          text: "`dim` parametri PyTorch da eng koʻp xato qiladigan joy. Har doim “qaysi oʻq boʻylab?” deb soʻrang.",
        },
      ],
    },
    {
      id: "t4-4",
      title: "Endi sizda toʻliq zanjir bor",
      blocks: [
        {
          kind: "flow",
          text: "ID → embedding → linear → logitlar → softmax → ehtimolliklar",
        },
        {
          kind: "note",
          tone: "key",
          text: "Bu GPT ning **haqiqiy** birinchi qismi. Qolgan hamma narsa shu zanjirning **oʻrtasiga** qoʻshiladi.",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "t4-1",
      label: "Mashq 4.1",
      prompt: "`[1, 1, 1]` logitlarini softmax qilsak natija nima boʻladi? Avval oʻylab koʻring.",
      answerOutput: "[0.3333, 0.3333, 0.3333]",
      answerText:
        "Hammasi teng boʻlsa, ehtimol ham teng taqsimlanadi — har biri `1/3`. Softmax faqat **farqqa** qaraydi, absolyut qiymatga emas.",
    },
    {
      id: "t4-2",
      label: "Mashq 4.2 (muhim)",
      prompt:
        "Oʻqitilmagan modelning ehtimolliklari nega `1/vocab_size` atrofida boʻladi?",
      answerText:
        "Chunki vaznlar tasodifiy — model hech narsa bilmaydi va hech bir tokenni afzal koʻrmaydi. Shuning uchun logitlar bir-biriga yaqin, softmax esa ularni deyarli teng taqsimlaydi. Bu **toʻgʻri** boshlangʻich holat: agar oʻqitilmagan model biror tokenga katta ehtimol bersa, bu xato belgisi boʻlardi.",
    },
  ],
};

/** Lessons 05–18: real syllabus, content still being transcribed. */
const PENDING: Array<{ n: number; part: string; title: string; subtitle: string }> = [
  { n: 10, part: "3-QISM: ATTENTION — YURAK", title: "Nima uchun kontekst kerak", subtitle: "Bigram modelning cheki" },
  { n: 11, part: "3-QISM: ATTENTION — YURAK", title: "Query, Key, Value", subtitle: "Attention ning toʻrt qadami" },
  { n: 12, part: "3-QISM: ATTENTION — YURAK", title: "Masshtablash va multi-head", subtitle: "Bir necha bosh birga" },
  { n: 13, part: "4-QISM: TOʻLIQ BLOK", title: "Feed-forward", subtitle: "Har bir token ustida oʻylash" },
  { n: 14, part: "4-QISM: TOʻLIQ BLOK", title: "Residual va normalizatsiya", subtitle: "Chuqur tarmoqni oʻqitish" },
  { n: 15, part: "4-QISM: TOʻLIQ BLOK", title: "Blok va toʻliq GPT", subtitle: "Hammasini birlashtirish" },
  { n: 16, part: "5-QISM: TRENING VA ZAMONAVIY QISMLAR", title: "GPT ni oʻqitamiz", subtitle: "Haqiqiy trening" },
  { n: 17, part: "5-QISM: TRENING VA ZAMONAVIY QISMLAR", title: "Zamonaviy almashtirishlar", subtitle: "RoPE, RMSNorm, SwiGLU" },
  { n: 18, part: "5-QISM: TRENING VA ZAMONAVIY QISMLAR", title: "Keyin nima qilish kerak", subtitle: "Oʻz tokenizatoringizni ulash" },
];

const PENDING_LESSONS: Lesson[] = PENDING.map((p) => ({
  id: `dars-${p.n}`,
  n: p.n,
  part: p.part,
  title: p.title,
  subtitle: p.subtitle,
  minutes: 0,
  status: "soon" as const,
  intro: [
    {
      kind: "note" as const,
      tone: "tip" as const,
      text: "Bu dars tayyorlanmoqda. Sillabusda oʻz oʻrni bor, matni tez orada qoʻshiladi.",
    },
  ],
  sections: [],
  exercises: [],
}));

const ATTENTION_PREVIEW: Lesson = {
  ...PENDING_LESSONS.find((l) => l.id === "dars-11")!,
  minutes: 6,
  intro: [
    {
      kind: "note",
      tone: "tip",
      text: "Bu darsning toʻliq matni tayyorlanmoqda. Quyida attention ning asosiy gʻoyasini interaktiv koʻrishingiz mumkin.",
    },
  ],
  sections: [
    {
      id: "t11-preview",
      title: "Kauzal attention — oldindan koʻrish",
      blocks: [
        {
          kind: "text",
          text: "Attention da har bir token oʻzidan **oldingi** tokenlarga qaraydi va qaysi biri muhimligini oʻzi hal qiladi. Kelajakni koʻrish taqiqlangan — bu **kauzal maska**.",
        },
        { kind: "viz", id: "attention" },
      ],
    },
  ],
};

const lessons: Lesson[] = [
  T1,
  T2,
  T3,
  T4,
  ...PART2,
  ...PENDING_LESSONS.map((l) => (l.id === "dars-11" ? ATTENTION_PREVIEW : l)),
];

export const TRANSFORMER_COURSE: Course = {
  id: "transformer",
  name: "Transformer (GPT) qurish",
  short: "TR",
  tagline: "Tokenizatordan keyingi qadam — oʻz til modelingizni quramiz.",
  lessons,
};
