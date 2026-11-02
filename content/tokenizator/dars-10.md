# Dars 10 — Trening tsikli

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 09 — Birlashtirish (`merge`)
> **Vaqt:** ~50 daqiqa
> **Kerak:** Dars 01–09. `get_stats`, `merge`, `while`, `max(key=)`

---

## Bu darsdan keyin siz...

- **yozasiz** BPE trening tsiklini — tokenizatoringiz shu yerda "o'qiydi";
- **tushunasiz** `merges` jadvali nima uchun **butun tokenizator** ekanini;
- **ko'rasiz** o'zbek qo'shimchalari qadam-baqadam qurilishini — 20 ta birlashtirishda;
- **kashf qilasiz** algoritm `ʻ` belgisini o'zi qayta yig'ishini;
- **ko'rasiz** chiroyli raqam qanday qilib yolg'on gapirishi mumkinligini.

Oxirgi punkt — bu darsning eng muhim qismi.

---

## 1. Bitta savol

Dars 09 oxirida savol qoldirgan edim:

> Birlashtirishlar **tartibini** eslab qolish nima uchun shart?

Javob Dars 09 dagi natijada turibdi. Ikkinchi birlashtirish shunday edi:

```
257 = (256, 114)
```

Diqqat qiling: `256` — bu **bizning yangi tokenimiz**. U birinchi birlashtirishda
yasalgan edi.

Ya'ni 257-tokenni yasash uchun 256-token **allaqachon mavjud bo'lishi shart**.
Agar tartibni almashtirsangiz — 257 ni birinchi qilsangiz — `(256, 114)` juftligini
matnda umuman topa olmaysiz, chunki hali `256` degan token yo'q.

> **Birlashtirishlar — bu ro'yxat emas, bu zanjir.** Har bir halqa oldingisiga
> tayanadi.

Shuning uchun biz ularni **tartib bilan** saqlashimiz kerak. Bu jadvalning nomi —
**`merges`**, va u aslida butun tokenizatoringiz.

---

## 2. `merges` — tokenizatorning butun bilimi

Tokenizator o'qiganidan keyin nima saqlanadi? Modelning vaznlari emas, matn emas.
Faqat bitta jadval:

```
(108, 97)  → 256
(256, 114) → 257
(115, 104) → 258
...
```

Chapda — juftlik, o'ngda — u qaysi tokenga aylanadi.

**Shu jadval bo'lsa, tokenizator to'liq tiklanadi:**
- yangi matnni kodlash uchun — juftliklarni shu tartibda qidirib almashtirasiz (Dars 12)
- tokenlarni matnga qaytarish uchun — jadvaldan `vocab` ni qurasiz (Dars 11)

Sizning `uzbek-bpe-16k` tokenizatoringizda bu jadvalda **16 128 ta qator** bor.
Faylning butun hajmi bir necha yuz kilobayt. **Butun tokenizator shu.**

<!-- animatsiya: l1 | Zanjir -->

---

## 3. Yangi narsa: `break`

Tsiklni **erta to'xtatish** uchun:

```python
for i in range(10):
    if i == 3:
        break
    print(i, end=" ")
```

```
0 1 2
```

`break` — "tsiklni hoziroq tugat". Qolgan aylanishlar bajarilmaydi.

Bizga u nima uchun kerak? Chunki ba'zan **birlashtiradigan narsa qolmaydi**:
matn juda qisqa bo'lsa yoki hamma juftlik allaqachon birlashtirilgan bo'lsa.
Unday holda tsiklni davom ettirishning ma'nosi yo'q.

---

## 4. Trening tsikli

Endi hammasini birlashtiramiz. Bu funksiya Dars 09 dagi qo'lda qilgan ishimizni
avtomatlashtiradi:

```python
jurnal = True


def train(matn, vocab_size):
    tokenlar = kodla(matn)
    merges = {}

    vocab = {}
    for i in range(256):
        vocab[i] = bytes([i])

    for yangi_id in range(256, vocab_size):
        stats = get_stats(tokenlar)

        if len(stats) == 0:
            if jurnal:
                print("  juftlik qolmadi, toʻxtadik")
            break

        eng = max(stats, key=stats.get)
        soni = stats[eng]

        tokenlar = merge(tokenlar, eng, yangi_id)
        merges[eng] = yangi_id
        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]

        if jurnal:
            print(f"  {yangi_id}: {eng} ({soni} marta) -> {vocab[yangi_id]!r}   | {len(tokenlar)} token")

    return merges, vocab, tokenlar
```

**Qatorma-qator:**

| Qator | Nima qiladi | Qayerdan |
|---|---|---|
| `tokenlar = kodla(matn)` | matnni baytlarga | Dars 06 |
| `merges = {}` | bo'sh jadval | Dars 04 |
| `for i in range(256): vocab[i] = bytes([i])` | 256 ta boshlang'ich token | Dars 07 |
| `for yangi_id in range(256, vocab_size)` | **256 dan boshlanadi** | Dars 03 |
| `stats = get_stats(tokenlar)` | juftliklarni sana | Dars 08 |
| `if len(stats) == 0: break` | qoladigan narsa yo'q — to'xta | shu dars |
| `eng = max(stats, key=stats.get)` | eng ko'p uchraganini top | Dars 08 |
| `tokenlar = merge(...)` | almashtir | Dars 09 |
| `merges[eng] = yangi_id` | **jadvalga yoz** | shu dars |
| `vocab[yangi_id] = ... + ...` | yangi token nimadan iborat | Dars 09 |

**Yangi kod — atigi uchta qator.** Qolgani oldingi olti darsdan.

`jurnal` — har bir birlashtirishni ekranga chiqarish kerakmi? Hozir `True`: algoritm
nima qilayotganini koʻrmoqchimiz.

### `range(256, vocab_size)` — nima uchun 256 dan?

Chunki 0–255 **allaqachon band** (baytlar, Dars 06). Birinchi bo'sh raqam — 256.

Agar `vocab_size = 276` desangiz, `range(256, 276)` → 20 ta aylanish, ya'ni
**20 ta birlashtirish**. Lug'at 256 dan 276 gacha o'sadi.

Umumiy formula: **birlashtirishlar soni = `vocab_size` − 256.**

Sizning tokenizatoringizda: 16 384 − 256 = **16 128 ta birlashtirish**.

---

## 5. Ishga tushiramiz

O'quv matnimiz (etti qatorlik o'zbekcha matn):

```python
matn = """Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi.
Oʻqituvchi darsni tushuntirdi. Oʻquvchilar savollarga javob berishdi.
Kechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.
Otalar ishdan kelishdi. Hamma birga dasturxonga oʻtirishdi.
Ertalab bolalar yana maktabga borishdi. Ular yangi darslarni oʻrganishdi.
Kitoblarda qiziqarli hikoyalar bor edi. Bolalar hikoyalarni yoqtirishdi.
Oʻqituvchilar savollar berishdi. Oʻquvchilar javoblarni yozishdi."""

print("belgilar:", len(matn), "| soʻzlar:", len(matn.split()), "| tokenlar:", len(kodla(matn)))

merges, vocab, tokenlar = train(matn, 276)
```

**Natija:**

```
belgilar: 480 | soʻzlar: 53 | tokenlar: 487
  256: (108, 97) (26 marta) -> b'la'   | 461 token
  257: (256, 114) (20 marta) -> b'lar'   | 441 token
  258: (115, 104) (15 marta) -> b'sh'   | 426 token
  259: (100, 105) (15 marta) -> b'di'   | 411 token
  260: (259, 46) (14 marta) -> b'di.'   | 397 token
  261: (257, 32) (13 marta) -> b'lar '   | 384 token
  262: (105, 258) (13 marta) -> b'ish'   | 371 token
  263: (97, 32) (11 marta) -> b'a '   | 360 token
  264: (262, 260) (11 marta) -> b'ishdi.'   | 349 token
  265: (105, 32) (8 marta) -> b'i '   | 341 token
  266: (103, 263) (7 marta) -> b'ga '   | 334 token
  267: (202, 187) (7 marta) -> b'\xca\xbb'   | 327 token
  268: (116, 97) (6 marta) -> b'ta'   | 321 token
  269: (114, 264) (6 marta) -> b'rishdi.'   | 315 token
  270: (98, 111) (5 marta) -> b'bo'   | 310 token
  271: (110, 265) (5 marta) -> b'ni '   | 305 token
  272: (267, 113) (5 marta) -> b'\xca\xbbq'   | 300 token
  273: (100, 97) (5 marta) -> b'da'   | 295 token
  274: (99, 104) (5 marta) -> b'ch'   | 290 token
  275: (256, 261) (4 marta) -> b'lalar '   | 286 token
```

**487 tokendan 286 tokenga.** 20 ta birlashtirish bilan.

Endi bu jurnalni **satr-satr o'qiymiz** — unda uchta muhim narsa yashiringan.

---

## 6. Birinchi kashfiyot: qo'shimchalar qadam-baqadam quriladi

O'ng ustunni kuzating:

```
256: la
257: lar        ← la + r
261: "lar "     ← lar + boʻshliq
275: "lalar "   ← la + "lar "
```

```
258: sh
262: ish        ← i + sh
264: ishdi.     ← ish + "di."
269: rishdi.    ← r + "ishdi."
```

Har bir yangi token **oldingilaridan** qurilgan. Bu **inshoot**, ro'yxat emas.

To'liq zanjirni chizing:

```
l  a  →  la
la r  →  lar
lar ␣ →  "lar "
```

```
d  i  →  di
di .  →  "di."
i  sh →  ish
ish "di." → "ishdi."
r "ishdi." → "rishdi."
```

Uchta harfdan boshlab, algoritm **`-rishdi.`** ni yasadi — bu o'zbek fe'lining
o'tgan zamon, ko'plik shakli va jumla oxiri, birgalikda.

Yana bir bor: hech kim unga grammatika o'rgatmagan. U 20 marta "eng ko'p uchraydigan
juftlikni birlashtir" degan buyruqni bajardi, xolos.

---

## 7. Ikkinchi kashfiyot: `ʻ` qayta yig'ildi

267-qatorga qarang:

```
267: (202, 187) (7 marta) -> b'\xca\xbb'
```

`202` va `187` — tanish raqamlar. Dars 06 dan: bular **`ʻ` belgisining ikkita
bayti**.

```python
print(vocab[267].decode("utf-8"))
```

```
ʻ
```

**To'xtang va nima bo'lganini o'ylang.**

- Dars 05: Unicode'da yagona `oʻ` belgisi yo'q, shuning uchun `ʻ` alohida belgi (699).
- Dars 06: UTF-8 uni ikkita baytga bo'ldi — 202 va 187.
- Dars 07: bizning tokenizatorimiz uchun `ʻ` **ikkita alohida token** edi.
- **Dars 10: BPE ularni qaytadan bitta tokenga yig'di.**

Algoritm buni nima uchun qildi? Chunki 202 va 187 matnda **har doim birga**
uchraydi — 7 marta ketma-ket. Boshqa hech qanday kombinatsiyada emas.

Statistika ularning ajralmas ekanini **o'zi payqadi**. Va keyingi qadamda
(272-token) u `ʻ` va `q` ni birlashtirib, `ʻq` ni yasadi — `oʻqish`, `oʻqituvchi`
so'zlarining o'zagiga yaqinlashib.

> Bu — UTF-8 bo'lgan zararni BPE ning **qisman tuzatishi**. To'liq emas: `ʻ`
> baribir bitta token yeydi, va uni yasash uchun lug'atdan joy ketdi. Lekin
> keyingi safar `ʻ` uchrasa, u ikkita emas, bitta token bo'ladi.

<!-- animatsiya: l2 | ʻ qayta yigʻildi -->

---

## 8. Siqilishni o'lchaymiz

```python
w = len(matn.split())
print("boshlangʻich:", 487, "token | fertility:", round(487 / w, 3))
print("oxirgi      :", len(tokenlar), "token | fertility:", round(len(tokenlar) / w, 3))
print("siqilish    :", round(487 / len(tokenlar), 3), "barobar")
```

**Natija:**

```
boshlangʻich: 487 token | fertility: 9.189
oxirgi      : 286 token | fertility: 5.396
siqilish    : 1.703 barobar
```

Atigi 20 ta yangi token — va fertility 9.189 dan **5.396** ga tushdi.

Davom etsak nima bo'ladi? Jurnalni oʻchirib qoʻyamiz — endi u yuzlab qator boʻladi:

```python
jurnal = False

print("vocab_size | tokenlar | fertility")
for vs in [256, 276, 306, 356, 406]:
    _, v, t = train(matn, vs)
    print(f"{vs:10d} | {len(t):8d} | {len(t)/w:.3f}")
```

**Natija:**

```
vocab_size | tokenlar | fertility
       256 |      487 | 9.189
       276 |      286 | 5.396
       306 |      202 | 3.811
       356 |      128 | 2.415
       406 |       78 | 1.472
```

---

## 9. Uchinchi kashfiyot: raqam yolg'on gapiryapti

Oxirgi qatorga qarang: **fertility 1.472**.

Dars 01 dagi jadvalni eslang:

| Tokenizator | Fertility |
|---|---|
| **bizniki, 406 ta token** | **1.472** |
| uzbek-bpe-16k | 1.749 |
| GPT-4o | 2.578 |

Bizning o'yinchoq tokenizatorimiz — 406 ta token bilan, 40 barobar kichik lug'at
bilan — haqiqiy tokenizatordan **yaxshiroq** natija ko'rsatyapti.

**Bu mumkinmi?** Yo'q. Tekshiramiz — u nimalarni o'rgangan ekan:

```python
_, v, t = train(matn, 356)
print("280 =", repr(v[280]))
print("300 =", repr(v[300]))
print("355 uzunligi:", len(v[355]), "bayt")
print("355 =", repr(v[355])[:100])
```

**Natija:**

```
280 = b'O\xca\xbbq'
300 = b'maktabga borishdi. U'
355 uzunligi: 106 bayt
355 = b'Bolalar maktabga borishdi. Ular kitoblarni o\xca\xbbqishdi va daftarlarga yozishdi.\nO\xca\xbbqitu
```

**355-token — bu 106 baytlik matn bo'lagi.** Butun birinchi jumla va ikkinchisining
yarmi. Bitta token sifatida.

300-token esa `maktabga borishdi. U` — ikki so'z, tinish belgisi va uchinchi so'zning
boshi.

### Nima bo'ldi

Tokenizator matnni **yodlab oldi**.

Bizning matnimizda atigi 53 ta so'z bor. 150 ta birlashtirish uchun bu juda kam.
Haqiqiy qo'shimchalar tugagandan keyin, algoritm boshqa takror topa olmadi — va
butun jumlalarni birlashtirishga o'tdi, chunki ular ham "takrorlanadi" (aynan
bir marta, matnning o'zida).

**Fertility 1.472 — bu chiroyli raqam, va u yolg'on.**

U faqat **shu matnda** to'g'ri. Yangi o'zbekcha jumla bering — 355-token u yerda
hech qachon uchramaydi, va tokenizator butunlay foydasiz bo'ladi.

<!-- animatsiya: l3 | Chiroyli yolgʻon -->

### Ikkita xulosa

**1. Ko'p ma'lumot kerak.** 53 ta so'zli matnda 150 ta birlashtirish qilib
bo'lmaydi. Haqiqiy tokenizator uchun **millionlab** so'z kerak. Buni Dars 15 da
ko'ramiz.

**2. Raqamga ishonmang — uni qayerda o'lchaganingizni so'rang.**

Biz fertility ni **tokenizator o'qigan matnda** o'lchadik. Bu — imtihon savollarini
oldindan ko'rib olgan talabaga baho qo'ygandek. Baho ajoyib chiqadi, lekin u hech
narsani anglatmaydi.

> **To'g'ri usul: tokenizatorni bir matnda o'qiting, boshqa matnda o'lchang.**
>
> Bu qoida oddiy ko'rinadi, lekin uni buzish juda oson — va buzilganda natija
> **yaxshiroq** ko'rinadi, shuning uchun hech kim shubhalanmaydi.
>
> **Dars 17 to'liq shu mavzuga bag'ishlangan.** Hozircha shuni bilib qo'ying:
> bu sizning birinchi marta yolg'on raqam ko'rishingiz. Oxirgisi bo'lmaydi.

---

## 10. Chekka holat: juftlik tugaganda

```python
jurnal = True
merges, vocab, tokenlar = train("aaaa", 300)
jurnal = False
print(tokenlar)
for tid in range(256, len(vocab)):
    print(tid, "=", vocab[tid])
```

**Natija:**

```
  256: (97, 97) (3 marta) -> b'aa'   | 2 token
  257: (256, 256) (1 marta) -> b'aaaa'   | 1 token
  juftlik qolmadi, toʻxtadik
[257]
256 = b'aa'
257 = b'aaaa'
```

`vocab_size = 300` so'radik — 44 ta birlashtirish. Lekin atigi **ikkitasi** bo'ldi.

Uchinchisida matn bitta tokenga aylanib qolgan edi, `get_stats([257])` bo'sh
lug'at qaytardi (Dars 08), va `break` ishladi.

**`break` bo'lmasa nima bo'lardi?** `max({})` — bo'sh lug'atdan eng kattasini
topishga urinish — `ValueError` beradi va dastur qulab tushadi.

---

## 11. Qancha vaqt oladi?

```python
import time

t0 = time.perf_counter()
merges, vocab, tokenlar = train(matn, 276)
print(f"vaqt: {time.perf_counter() - t0:.4f} soniya")
```

```
vaqt: 0.0020 soniya
```

480 baytda 20 ta birlashtirish — bir zumda.

Lekin o'ylab ko'ring. Har bir birlashtirishda biz **butun matnni ikki marta**
aylanib chiqamiz: bir marta `get_stats` uchun, bir marta `merge` uchun.

- 20 ta birlashtirish × 480 bayt = 9 600 qadam. Hech narsa.
- **16 128 ta birlashtirish × 100 000 000 bayt** = 1.6 trillion qadam.

Bu sof Python'da **haftalab** ishlaydi. Dars 16 da haqiqiy korpusda o'qitganingizda
bu muammoga duch kelasiz, va u yerda uni qanday hal qilishni ko'ramiz.

---

## 12. Muammo

Bizda endi `merges` va `vocab` bor. Tokenizator o'qidi.

Lekin u hali **ishlatib bo'lmaydigan** holatda:

**1. Tokenlarni matnga qaytara olmaymiz.** `tokenlar` ro'yxatida `257` bor.
`vocab[257]` bizga `b'lar'` beradi — lekin butun ro'yxatni matnga aylantiradigan
funksiya hali yo'q. Dars 06 dagi `dekodla` faqat baytlar bilan ishlaydi, 257 esa
bayt emas.

**2. Yangi matnni kodlay olmaymiz.** `train` faqat o'z matnini kodladi. Boshqa
jumla bersangiz — uni `merges` jadvali bo'yicha qayta ishlash kerak, va bu alohida
funksiya.

Keyingi ikki dars aynan shu ikkitasi haqida: **`decode`** va **`encode`**.

---

## 13. To'liq kod

```python
import time

jurnal = True


def kodla(matn):
    return list(matn.encode("utf-8"))


def dekodla(raqamlar):
    return bytes(raqamlar).decode("utf-8")


def get_stats(tokenlar):
    hisob = {}
    for juftlik in zip(tokenlar, tokenlar[1:]):
        hisob[juftlik] = hisob.get(juftlik, 0) + 1
    return hisob


def merge(tokenlar, juftlik, yangi_id):
    yangi = []
    i = 0
    while i < len(tokenlar):
        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:
            yangi.append(yangi_id)
            i += 2
        else:
            yangi.append(tokenlar[i])
            i += 1
    return yangi


def train(matn, vocab_size):
    tokenlar = kodla(matn)
    merges = {}

    vocab = {}
    for i in range(256):
        vocab[i] = bytes([i])

    for yangi_id in range(256, vocab_size):
        stats = get_stats(tokenlar)
        if len(stats) == 0:
            if jurnal:
                print("  juftlik qolmadi, toʻxtadik")
            break

        eng = max(stats, key=stats.get)
        soni = stats[eng]

        tokenlar = merge(tokenlar, eng, yangi_id)
        merges[eng] = yangi_id
        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]

        if jurnal:
            print(f"  {yangi_id}: {eng} ({soni} marta) -> {vocab[yangi_id]!r}   | {len(tokenlar)} token")

    return merges, vocab, tokenlar


# ---- Sinov ----
matn = """Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi.
Oʻqituvchi darsni tushuntirdi. Oʻquvchilar savollarga javob berishdi.
Kechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.
Otalar ishdan kelishdi. Hamma birga dasturxonga oʻtirishdi.
Ertalab bolalar yana maktabga borishdi. Ular yangi darslarni oʻrganishdi.
Kitoblarda qiziqarli hikoyalar bor edi. Bolalar hikoyalarni yoqtirishdi.
Oʻqituvchilar savollar berishdi. Oʻquvchilar javoblarni yozishdi."""

w = len(matn.split())
boshlangich = len(kodla(matn))
print("belgilar:", len(matn), "| soʻzlar:", w, "| tokenlar:", boshlangich)

t0 = time.perf_counter()
merges, vocab, tokenlar = train(matn, 276)
print(f"vaqt: {time.perf_counter() - t0:.4f} soniya")

print("fertility:", round(boshlangich / w, 3), "->", round(len(tokenlar) / w, 3))
print("merges hajmi:", len(merges), "| vocab hajmi:", len(vocab))
```

---

## 14. O'zingiz yozing

```python
def train(matn, vocab_size):
    tokenlar = ___(matn)               # matnni baytlarga
    merges = ___                       # boʻsh jadval

    vocab = {}
    for i in range(___):               # 256 ta boshlangʻich token
        vocab[i] = bytes([i])

    for yangi_id in range(___, vocab_size):
        stats = ___(tokenlar)
        if len(stats) == 0:
            ___                        # tsiklni toʻxtat
        eng = max(stats, key=___)
        tokenlar = ___(tokenlar, eng, yangi_id)
        merges[___] = ___              # juftlik -> yangi raqam
        vocab[yangi_id] = vocab[eng[___]] + vocab[eng[___]]

    return merges, vocab, tokenlar
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
def train(matn, vocab_size):
    tokenlar = kodla(matn)
    merges = {}

    vocab = {}
    for i in range(256):
        vocab[i] = bytes([i])

    for yangi_id in range(256, vocab_size):
        stats = get_stats(tokenlar)
        if len(stats) == 0:
            break
        eng = max(stats, key=stats.get)
        tokenlar = merge(tokenlar, eng, yangi_id)
        merges[eng] = yangi_id
        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]

    return merges, vocab, tokenlar
```

Eng ko'p xato qilinadigan joy — `merges[eng] = yangi_id` ni teskari yozish:
`merges[yangi_id] = eng`. Ikkalasi ham ishlaydi, lekin Dars 12 da (`encode`)
bizga **juftlikdan raqamga** qidirish kerak bo'ladi, teskarisi emas.

Ikkinchi xato — `vocab[eng[0]] + vocab[eng[1]]` o'rniga `bytes(eng)` yozish.
Bu faqat `eng` dagi ikkala raqam ham 255 dan kichik bo'lganda ishlaydi.
`(256, 114)` da darhol qulaydi.
</details>

---

## 15. Mashqlar

---

**Mashq 1.** `train(matn, 256)` nima qaytaradi? Nechta birlashtirish bo'ladi?

<details>
<summary>Javobni ko'rsatish</summary>

**Nol ta birlashtirish.**

`range(256, 256)` — bo'sh diapazon, tsikl umuman aylanmaydi.

`merges` bo'sh lug'at, `vocab` da atigi 256 ta boshlang'ich token, `tokenlar`
esa `kodla(matn)` ning o'zi, o'zgarmagan.

Ya'ni `vocab_size = 256` — bu Dars 07 dagi bayt tokenizatori. BPE hech narsa
qilmaydi.
</details>

---

**Mashq 2.** Nima uchun `merges[eng] = yangi_id` deb yozdik, `merges[yangi_id] = eng`
emas?

<details>
<summary>Javobni ko'rsatish</summary>

Chunki **qidiruv yo'nalishi** muhim.

Dars 12 da yangi matnni kodlaganimizda savol shunday bo'ladi: *"mening qo'limda
`(108, 97)` juftligi bor — u qaysi tokenga aylanadi?"*

`merges[(108, 97)]` → `256`. Bir qadamda topildi.

Agar teskari saqlagan bo'lsak, butun jadvalni aylanib chiqib qidirish kerak
bo'lardi — 16 128 ta qatorni, har bir juftlik uchun.

**Lug'atda kalit — bu siz bilgan narsa, qiymat — bilmoqchi bo'lgan narsa.**
Jadvalni tuzayotganda o'zingizdan so'rang: *keyin men nimadan nimani
qidiraman?*

(Teskari jadval ham kerak bo'ladi — `vocab` aynan shu: raqamdan baytlarga.
Shuning uchun ikkalasini ham saqlaymiz.)
</details>

---

**Mashq 3.** Matnni ikki barobar uzaytiring (o'sha matnni ikki marta yozing) va
`train(matn2, 276)` ni ishga tushiring. Birinchi 5 ta birlashtirish o'zgaradimi?

<details>
<summary>Javobni ko'rsatish</summary>

**O'zgarmaydi** — faqat sanoqlar ikki barobar oshadi.

```
256: (108, 97) (52 marta) -> b'la'
257: (256, 114) (40 marta) -> b'lar'
...
```

Sabab: BPE **nisbiy chastotaga** qaraydi. Hamma juftlikning soni ikki barobar
oshsa, ularning tartibi o'zgarmaydi — eng ko'p uchragani baribir eng ko'p
uchragani bo'lib qoladi.

**Bu muhim xususiyat:** tokenizator matnning **hajmiga** emas, **tuzilishiga**
qarab o'qiydi. Shuning uchun katta korpusdan bir bo'lagini olib sinab ko'rish
mantiqiy — natija o'xshash bo'ladi.

Lekin diqqat: bu faqat matn **bir xil turdagi** bo'lsa to'g'ri. Yangilik matni
va she'riyat matni butunlay boshqa tokenlar beradi.
</details>

---

**Mashq 4.** `vocab[275]` = `b'lalar '`. Bu token qaysi so'zlarda uchraydi?
Va u yaxshi tokenmi?

<details>
<summary>Javobni ko'rsatish</summary>

Faqat **`bolalar `** da. Tekshiring: `bolalar ` = `bo` + `lalar `.
`Onalar `, `hikoyalar` da `lalar ` yoʻq — ularda `alar ` bor.

**Yaxshi tokenmi? Qisman.**

Yaxshi tomoni: `bolalar` matnda tez-tez uchraydi, uni bitta tokenga yaqinlashtirish
foydali.

Yomon tomoni: **oxiridagi bo'shliq.** `lalar ` — bu `lalar` va bo'shliq birga.
Demak `bolalar,` (vergul bilan) yoki `bolalarni` bu tokenni ishlata olmaydi —
ular uchun boshqa token kerak bo'ladi.

Bitta so'z, uch xil variant (`bolalar `, `bolalar,`, `bolalarni`) — uchta alohida
token. **Lug'at joyi isrof bo'ladi.**

Bu muammoning nomi bor va u Dars 13 ning mavzusi. Yechim: so'zlarni
**oldindan bo'lish**, shunda bitta token hech qachon so'z chegarasidan
o'tmaydi.
</details>

---

**Mashq 5 (eng muhimi).** Tokenizatorni yuqoridagi matnda o'qiting
(`vocab_size = 406`), keyin uni **yangi** jumlada sinab ko'ring:

```python
yangi_jumla = "Talabalar universitetga kirishdi va imtihonlarni topshirishdi."
```

Bu jumlada 406-tokenli lug'atdan qaysi tokenlar foydali bo'ladi?

<details>
<summary>Javobni ko'rsatish</summary>

Qaysi tokenlar ishlaydi:

- `la`, `lar`, `lar ` — **ha**, `Talabalar` va `imtihonlarni` da bor
- `di`, `di.`, `ish`, `ishdi.`, `rishdi.` — **ha**, `kirishdi` va `topshirishdi.` da bor
- `ga `, `ni `, `da` — **ha**

Qaysilari ishlamaydi:

- `maktabga borishdi. U` (300-token) — **yo'q**
- 106 baytlik 355-token — **yo'q**
- `lalar ` — **yo'q** (`Talabalar ` da `alar ` bor, `lalar ` emas)

**Xulosa:** foydali tokenlar — **qisqa, grammatik** bo'laklar. Isrof bo'lganlari —
**uzun, matnga xos** bo'laklar.

Va e'tibor bering: 150 ta birlashtirishning ko'pchiligi ikkinchi turdan edi.
Ya'ni lug'atning katta qismi **bu jumlada umuman ishlatilmaydi**.

Agar siz fertility ni shu yangi jumlada o'lchasangiz, u 1.472 dan ancha yomon
chiqadi — va **aynan shu raqam haqiqiy raqam** bo'ladi.

Mana shuning uchun Dars 17 kerak.
</details>

---

## 16. Xulosa

1. Trening tsikli — `get_stats` va `merge` ni navbatma-navbat chaqirish.
   Yangi kod atigi uch qator.
2. `merges` jadvali — **butun tokenizator**. Juftlikdan yangi raqamga.
3. Tartib zanjir: `257 = (256, 114)` — 256 allaqachon mavjud bo'lishi shart.
4. Birlashtirishlar soni = `vocab_size − 256`.
5. Algoritm qo'shimchalarni **qatlam-qatlam** quradi: `la → lar → "lar "`,
   `sh → ish → "ishdi." → "rishdi."`
6. BPE `ʻ` ning ikkita UTF-8 baytini **qaytadan bitta tokenga** yig'di.
7. **Kam matnda ko'p birlashtirish = yodlab olish.** Fertility chiroyli chiqadi
   va yolg'on gapiradi. O'qitgan matningizda o'lchamang.

---

## Keyingi dars

Tokenizator o'qidi. Endi uni ishlatish kerak.

**Dars 11 — `decode`.** `[98, 111, 257]` ro'yxatini `bolalar` ga qaytarish.
Va bir savol: agar ro'yxat **buzuq** bo'lsa — yarim belgi bilan tugasa —
nima qilish kerak?

Keyingi darsning savoli: *`dekodla([202])` nima qaytaradi?* Dars 06 dan eslang:
202 — bu `ʻ` ning **birinchi yarmi**. Yolg'iz o'zi u nimani anglatadi?
