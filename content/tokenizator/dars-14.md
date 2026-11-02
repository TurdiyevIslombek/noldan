# Dars 14 — Oʻzbek apostrofi: bitta harf, besh xil yozuv

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 13 — Soʻz chegarasi va regex
> **Vaqt:** ~55 daqiqa
> **Kerak:** Dars 01–13. Regex naqsh, `train_regex`, `encode_regex`

---

## Bu darsdan keyin siz...

- **koʻrasiz** notoʻgʻri apostrof soʻzni qanday qilib **koʻrinmas devor** bilan kesib qoʻyishini;
- **bilasiz** internetda `oʻ` qanday yozilishini — haqiqiy raqamlar bilan;
- **ajrata olasiz** ikkita toʻgʻri belgini: `ʻ` (oʻ, gʻ) va `ʼ` (tutuq belgisi);
- **yozasiz** belgining **atrofiga qarab** qaror qiladigan normalizator;
- **topasiz** haqiqiy tokenizatordagi ikkita boʻshliqni — va ularni tuzatasiz;
- **tushunasiz** 2026-yilgi yangi alifbo tokenizatorga nima qilishini va uni **qayta oʻqitmasdan** qanday hal qilish mumkinligini.

---

## 1. Bitta savol

Dars 13 oxirida savol qoldirgan edim:

> Agar korpusingizda `oʻzbek` har xil yozilgan boʻlsa, lugʻatingizning qancha qismi
> bekorga ketadi?

Javob siz kutgandan yomonroq. Muammo faqat lugʻatda emas.

Dars 13 dagi naqshimizni olamiz va bitta soʻzni besh xil yozib, unga beramiz:

```python
import re

NAQSH = r" ?\w+| ?[^\s\w]+|\s+"

for v in ["o\u02bbzbek", "o'zbek", "o\u2018zbek", "o\u2019zbek", "o`zbek"]:
    print(f"  {v!r:10s} -> {re.findall(NAQSH, v)}")
```

**Natija:**

```
  'oʻzbek'   -> ['oʻzbek']
  "o'zbek"   -> ['o', "'", 'zbek']
  'o‘zbek'   -> ['o', '‘', 'zbek']
  'o’zbek'   -> ['o', '’', 'zbek']
  'o`zbek'   -> ['o', '`', 'zbek']
```

**Toʻxtang va buni diqqat bilan koʻring.**

Toʻgʻri yozilgan `oʻzbek` — **bitta** boʻlak. Qolgan toʻrttasi — **uchta** boʻlak:
`o`, belgi, `zbek`.

Dars 13 da nima oʻrgangan edik? **BPE hech qachon boʻlak chegarasidan oʻtmaydi.**
Biz uni ataylab shunday qurgan edik — `lar ` kabi ifloslangan tokenlarni toʻxtatish
uchun.

Endi oʻsha himoya **bizga qarshi** ishlayapti. Notoʻgʻri apostrof soʻzning ichiga
**koʻrinmas devor** qoʻydi. Tokenizator qancha oʻqimasin, `o'zbek` ni hech qachon
uchtadan kam tokenga keltira olmaydi.

Bitta belgi — va soʻz abadiy uch boʻlakka boʻlinib qoldi.

<!-- animatsiya: p1 | Koʻrinmas devor -->

---

## 2. Internetda `oʻ` qanday yoziladi

"Odamlar baʼzan notoʻgʻri yozadi" degan gap — taxmin. Bizga raqam kerak.

Men **3 000 ta haqiqiy oʻzbekcha veb-hujjatni** oldim (FineWeb-2 korpusidan, hech
qanday tozalashsiz) va `oʻ`, `gʻ` dagi belgi qanday yozilganini sanadim:

| Belgi | Raqami | Ulushi |
|---|---|---|
| `‘` chap qoʻshtirnoq | 8216 | **34%** |
| `ʻ` **toʻgʻri belgi** | 699 | 23% |
| `'` oddiy apostrof | 39 | 19% |
| `’` oʻng qoʻshtirnoq | 8217 | 18% |
| `` ` `` teskari urgʻu | 96 | 6% |

**Toʻgʻri belgi — atigi 23%.** Toʻrtta soʻzdan uchtasida `oʻ` notoʻgʻri yozilgan.

Va eng koʻp ishlatiladigani — toʻgʻri belgi ham emas, `'` ham emas. **Chap
qoʻshtirnoq** `‘`. Nima uchun? Chunki u baʼzi telefon klaviaturalarida va Word'da
apostrof tugmasini bosganda avtomatik chiqadi, va koʻzga `ʻ` ga eng oʻxshaydigani.

> Bu jadvalni Dars 05 ning oxirgi mashqida koʻrgan edingiz. Mana uning manbasi.

Bu jadval dars davomida bizga bir necha marta kerak boʻladi.

<!-- animatsiya: p2 | Besh xil yozuv -->

---

## 3. Oltita belgi va nima uchun devor paydo boʻldi

Nima uchun `ʻ` soʻz ichida qoldi, `'` esa devor boʻldi? Dars 13 dagi `\w` ni eslang:
u faqat **harflarni** oladi. Demak savol: qaysi belgi harf?

```python
import unicodedata

for b in ["\u02bb", "\u2018", "'", "\u2019", "`", "\u02bc"]:
    print(f"  {b!r:5s} ord={ord(b):5d}  kat={unicodedata.category(b)}  harfmi={b.isalpha()}")
```

**Natija:**

```
  'ʻ'   ord=  699  kat=Lm  harfmi=True
  '‘'   ord= 8216  kat=Pi  harfmi=False
  "'"   ord=   39  kat=Po  harfmi=False
  '’'   ord= 8217  kat=Pf  harfmi=False
  '`'   ord=   96  kat=Sk  harfmi=False
  'ʼ'   ord=  700  kat=Lm  harfmi=True
```

**Ikkita yangi narsa:**

**1. `"\u02bb"` — belgini raqami bilan yozish.** Dars 05 da `U+02BB` yozuvini
koʻrgan edingiz. Python'da satr ichida `\u` va undan keyin toʻrtta oʻn oltilik
raqam yozsangiz — oʻsha belgi hosil boʻladi. Bu klaviaturada yoʻq belgilarni
yozishning eng ishonchli yoʻli:

```python
print("\u02bb" == "ʻ")    # True
```

Bu darsda apostroflarni doim shunday yozamiz — `‘` va `ʻ` ni koʻz bilan farqlash
qiyin, `\u2018` va `\u02bb` ni esa adashtirib boʻlmaydi.

**2. `.isalpha()` — "bu harfmi?"** `True` yoki `False` qaytaradi.

Endi jadvalni oʻqiymiz:

- `ʻ` va `ʼ` — kategoriyasi **`Lm`**, harf. `\w` ularni soʻzning bir qismi deb biladi.
- Qolgan toʻrttasi — **tinish belgisi** (`P...`) yoki **belgi** (`Sk`). `\w`
  ularni harf deb bilmaydi va soʻzni oʻsha joyda kesadi.

**Devorning sababi shu.** Unicode `ʻ` ni harf deb belgilagan, `'` ni esa yoʻq.
Bizning naqshimiz Unicode'ga ishonadi.

---

## 4. Ikkita toʻgʻri belgi

Jadvalning oxirgi qatoriga qarang: `ʼ` — **700**. U ham harf. U nima?

Bu yerda men Dars 05 dagi bir soddalashtirishimni tuzatishim kerak. U yerda
"faqat 699 toʻgʻri" degan edim. Aslida oʻzbek lotin yozuvida **ikkita** toʻgʻri
belgi bor:

| Belgi | Raqami | Vazifasi | Misollar |
|---|---|---|---|
| `ʻ` | 699 | **oʻ** va **gʻ** harflarining qismi | oʻzbek, gʻalaba, bogʻ |
| `ʼ` | 700 | **tutuq belgisi** — tovushni ajratadi | maʼno, taʼlim, sanʼat, maʼlumot |

Koʻzga deyarli bir xil. Lekin vazifasi butunlay boshqa:

- `oʻ` — bu **bitta harf**. `ʻ` uning ajralmas qismi.
- `maʼno` dagi `ʼ` — harf emas, **toʻxtash belgisi**. U `a` va `n` ni ajratib
  turadi: *ma-no* emas, *maʼ-no*.

Klaviaturada ikkalasi ham yoʻq. Shuning uchun odamlar ikkalasini ham bir xil —
`'`, `‘`, `’` yoki `` ` `` bilan yozadi. Tokenizator esa ularni qaytadan ajratishi
kerak.

**Qanday ajratadi?** Mana darsning asosiy savoli.

---

## 5. Birinchi urinish: hammasini almashtiramiz

Eng oddiy gʻoya — Dars 02 dagi `.replace()` ni zanjir qilib ishlatish:

```python
def hammasini_almashtir(matn):
    matn = matn.replace("'", "\u02bb")
    matn = matn.replace("\u2018", "\u02bb")
    matn = matn.replace("\u2019", "\u02bb")
    matn = matn.replace("`", "\u02bb")
    return matn


for s in ["o'zbek", "o\u2018qish", "ma'no", "U \u2018salom\u2019 dedi"]:
    print(f"  {s!r:18s} -> {hammasini_almashtir(s)!r}")
```

**Natija:**

```
  "o'zbek"           -> 'oʻzbek'
  'o‘qish'           -> 'oʻqish'
  "ma'no"            -> 'maʻno'
  'U ‘salom’ dedi'   -> 'U ʻsalomʻ dedi'
```

Birinchi ikkitasi — toʻgʻri. Keyingi ikkitasi — **buzildi**:

- `maʼno` → `maʻno`. Tutuq belgisi `oʻ` belgisiga aylandi.
- `‘salom’` → `ʻsalomʻ`. Bu **qoʻshtirnoq** edi! U umuman apostrof emas.

Muammo: `.replace()` faqat **belgining oʻziga** qaraydi. U bilmaydi:
- belgi `o` dan keyin turibdimi (unda `oʻ`),
- ikki harf orasidami (unda tutuq),
- yoki soʻz chetidami (unda qoʻshtirnoq).

> **Asosiy fikr:** bu yerda belgining oʻzi hech narsani hal qilmaydi.
> **Uning atrofi** hal qiladi.

---

## 6. Qoida: atrofga qarash

Belgining oldidagi va keyingi belgiga qarab, toʻrtta qoida yozamiz:

| # | Shart | Natija | Misol |
|---|---|---|---|
| 1 | oldida `g` yoki `G` | `ʻ` | `bog'` → `bogʻ`, `g'alaba` → `gʻalaba` |
| 2 | oldida `o` yoki `O`, **va keyin harf** | `ʻ` | `o'qish` → `oʻqish` |
| 3 | oldida harf **va keyin harf** | `ʼ` | `ma'no` → `maʼno` |
| 4 | boshqa hamma holat | **tegmaymiz** | `‘salom’` — qoʻshtirnoq |

### Nima uchun `g` va `o` uchun shart har xil?

Diqqat qiling: `g` dan keyin **har doim** `ʻ` qoʻyamiz, `o` dan keyin esa
**faqat keyin harf kelsa**.

Sababi oʻzbek tilining oʻzida:

- **`gʻ` bilan tugaydigan soʻzlar koʻp:** bogʻ, togʻ, sogʻ, yogʻ, chogʻ. `gʻ` dan
  keyin boʻshliq yoki nuqta kelishi — normal holat.
- **`oʻ` bilan tugaydigan soʻz esa deyarli yoʻq.** Lekin `o` bilan tugaydigan
  soʻzlar koʻp: dunyo, kino, radio, avto. Va ular qoʻshtirnoq ichida kelsa —
  `'dunyo'` — yopuvchi qoʻshtirnoq `o` dan keyin turadi.

Agar 2-qoidada "keyin harf" sharti boʻlmasa, `'dunyo'` → `'dunyoʻ` boʻlib qolardi.
Bu xayoliy muammo emas — buni 9-boʻlimda haqiqiy tokenizatorda koʻrasiz.

<!-- animatsiya: p3 | Atrof hal qiladi -->

---

## 7. Kodga aylantiramiz

Ikkita yangi narsa kerak.

### `elif` — "aks holda, agar"

Dars 04 da `if` va `else` ni oʻrgandik. Ikkitadan koʻp variant boʻlsa — `elif`:

```python
son = 0
if son > 0:
    print("musbat")
elif son < 0:
    print("manfiy")
else:
    print("nol")
```

```
nol
```

Python shartlarni **yuqoridan pastga** tekshiradi va **birinchi rost** boʻlganini
bajaradi. Qolganlari tekshirilmaydi ham. Bu tartib keyinroq juda muhim boʻladi.

### `in` — "ichidami?"

Dars 04 da `"Ali" in yoshlar` ni lugʻatda ishlatgan edik. U roʻyxat va matnda ham
ishlaydi:

```python
print("g" in ["g", "G"])     # True
print("a" in ["g", "G"])     # False
print("'" in "'\u2018\u2019")  # True
```

### Funksiya

```python
OKINA = "\u02bb"    # oʻ va gʻ dagi belgi
TUTUQ = "\u02bc"    # maʼno dagi belgi
APOSTROFLAR = "'\u2018\u2019`\u02bb\u02bc"


def apostrof_tuzat(matn):
    belgilar = list(matn)

    for i in range(len(belgilar)):
        if belgilar[i] in APOSTROFLAR:
            oldingi = ""
            keyingi = ""
            if i > 0:
                oldingi = belgilar[i - 1]
            if i < len(belgilar) - 1:
                keyingi = belgilar[i + 1]

            if oldingi in ["g", "G"]:
                belgilar[i] = OKINA
            elif oldingi in ["o", "O"] and keyingi.isalpha():
                belgilar[i] = OKINA
            elif oldingi.isalpha() and keyingi.isalpha():
                belgilar[i] = TUTUQ

    return "".join(belgilar)
```

**Qatorma-qator:**

- `APOSTROFLAR` — oltita belgining hammasi bitta matnda. **`ʻ` va `ʼ` ham shu
  yerda!** Nima uchun toʻgʻri belgilarni ham tekshiramiz? Chunki ular ham
  notoʻgʻri joyda turishi mumkin: `oʼzbek` (tutuq `oʻ` oʻrnida) yoki `maʻno`.
  Ularni ham atrofiga qarab tuzatamiz.
- `belgilar = list(matn)` — matnni belgilar roʻyxatiga aylantiramiz. Nima uchun?
  Dars 03 dan eslang: **matnni oʻzgartirib boʻlmaydi**, roʻyxatni esa mumkin.
- `oldingi = ""` va `keyingi = ""` — avval boʻsh deb olamiz. Belgi matnning
  boshida turgan boʻlsa, uning oldida hech narsa yoʻq; oxirida boʻlsa — keyin.
- `if i > 0:` — chegara himoyasi, Dars 09 dagidek. `belgilar[-1]` ga tushib
  qolmaslik uchun (`-1` oxirgi belgini beradi — bu yerda xato boʻlardi).
- Uchta `if`/`elif` — 6-boʻlimdagi jadvalning 1–3 qoidalari. 4-qoida uchun
  **hech narsa yozmadik**: hech biri bajarilmasa, belgi oʻzgarmay qoladi.
- `"".join(belgilar)` — roʻyxatni qaytadan matnga yigʻamiz (Dars 11).

### Sinaymiz

```python
testlar = [
    "o'zbek", "O\u2018zbekiston", "g\u2019alaba", "ko`cha",
    "to'g'ri", "bog'", "ma'no", "ta\u2019lim", "o\u02bczbek", "ma\u02bbno",
    "U \u2018salom\u2019 dedi", "U 'dunyo' dedi",
]
for t in testlar:
    print(f"  {t!r:18s} -> {apostrof_tuzat(t)!r}")
```

**Natija:**

```
  "o'zbek"           -> 'oʻzbek'
  'O‘zbekiston'      -> 'Oʻzbekiston'
  'g’alaba'          -> 'gʻalaba'
  'ko`cha'           -> 'koʻcha'
  "to'g'ri"          -> 'toʻgʻri'
  "bog'"             -> 'bogʻ'
  "ma'no"            -> 'maʼno'
  'ta’lim'           -> 'taʼlim'
  'oʼzbek'           -> 'oʻzbek'
  'maʻno'            -> 'maʼno'
  'U ‘salom’ dedi'   -> 'U ‘salom’ dedi'
  "U 'dunyo' dedi"   -> "U 'dunyo' dedi"
```

**Oʻn ikkitadan oʻn ikkitasi toʻgʻri.** Har bir belgi atrofiga qarab hal qilindi:

- `oʻ` va `gʻ` — qaysi belgi bilan yozilmasin, `ʻ` boʻldi
- tutuq — `ʼ` boʻldi, hatto `maʻno` dagi notoʻgʻri `ʻ` ham
- qoʻshtirnoqlar — tegilmadi, `'dunyo'` ham

---

## 8. Ataylab xato: boʻsh satr tuzogʻi

Endi bitta kichik oʻzgartirish qilamiz. Roʻyxat `["g", "G"]` oʻrniga qisqaroq —
matn `"gG"` yozamiz. Ishlashi kerak-ku: `"g" in "gG"` → `True`.

```python
def apostrof_tuzat_buzuq(matn):
    belgilar = list(matn)
    for i in range(len(belgilar)):
        if belgilar[i] in APOSTROFLAR:
            oldingi = ""
            keyingi = ""
            if i > 0:
                oldingi = belgilar[i - 1]
            if i < len(belgilar) - 1:
                keyingi = belgilar[i + 1]

            if oldingi in "gG":                              # <- oʻzgardi
                belgilar[i] = OKINA
            elif oldingi in "oO" and keyingi.isalpha():      # <- oʻzgardi
                belgilar[i] = OKINA
            elif oldingi.isalpha() and keyingi.isalpha():
                belgilar[i] = TUTUQ
    return "".join(belgilar)


print(repr(apostrof_tuzat("\u2018Salom\u2019 dedi")))
print(repr(apostrof_tuzat_buzuq("\u2018Salom\u2019 dedi")))
```

```
'‘Salom’ dedi'
'ʻSalom’ dedi'
```

**Ikkinchisida qoʻshtirnoq buzildi.** Jumla boshidagi `‘` → `ʻ` ga aylandi. Nima uchun?

Bu belgi matnning **eng boshida** turibdi. Demak `oldingi = ""` — boʻsh. Endi:

```python
print("" in "gG")
print("" in ["g", "G"])
```

```
True
False
```

**Boʻsh matn har qanday matnning "ichida" boʻladi.** Python uchun `""` —
har bir matnning boshida, oxirida va har bir belgi orasida turadi. Shuning uchun
`"" in "gG"` → `True`.

Roʻyxatda esa bunday emas: `["g", "G"]` da faqat ikkita element bor, va hech biri
boʻsh emas.

> Bu xato **jimgina** ishlaydi. Xato xabari yoʻq. 99% matnlarda hech narsa
> sezilmaydi — faqat qoʻshtirnoq bilan boshlanadigan matnlar buziladi.
> Million hujjatli korpusda bunday matnlar minglab boʻladi.
>
> **Qoida:** biror narsa "ulardan biri" ekanini tekshirayotganda roʻyxat ishlating:
> `x in ["a", "b"]`. Matn `x in "ab"` faqat `x` hech qachon boʻsh boʻlmasa xavfsiz.

---

## 9. Tartib muhim — toʻrtinchi marta

Dars 10 da minora, Dars 11 da `KeyError`, Dars 12 da `[256, 114]`. Endi
toʻrtinchisi.

7-boʻlimda aytgan edim: `elif` zanjirida **birinchi rost** shart bajariladi.
Shartlarning tartibini almashtiramiz — tutuqni birinchi qoʻyamiz:

```python
def apostrof_tuzat_teskari(matn):
    belgilar = list(matn)
    for i in range(len(belgilar)):
        if belgilar[i] in APOSTROFLAR:
            oldingi = ""
            keyingi = ""
            if i > 0:
                oldingi = belgilar[i - 1]
            if i < len(belgilar) - 1:
                keyingi = belgilar[i + 1]

            if oldingi.isalpha() and keyingi.isalpha():      # <- endi birinchi
                belgilar[i] = TUTUQ
            elif oldingi in ["g", "G"]:
                belgilar[i] = OKINA
            elif oldingi in ["o", "O"] and keyingi.isalpha():
                belgilar[i] = OKINA
    return "".join(belgilar)


for soz in ["o'qish", "to'g'ri", "bog'"]:
    print(f"  {soz!r:10s} toʻgʻri: {apostrof_tuzat(soz)!r:12s} teskari: {apostrof_tuzat_teskari(soz)!r}")
```

```
  "o'qish"   toʻgʻri: 'oʻqish'     teskari: 'oʼqish'
  "to'g'ri"  toʻgʻri: 'toʻgʻri'    teskari: 'toʼgʼri'
  "bog'"     toʻgʻri: 'bogʻ'       teskari: 'bogʻ'
```

`o'qish` da `o` ham harf, `q` ham harf — tutuq sharti **ham** rost. U birinchi
turgani uchun u bajarildi, va `oʻqish` → `oʼqish` boʻldi. Notoʻgʻri.

`bog'` toʻgʻri qoldi — chunki undan keyin harf yoʻq, tutuq sharti yolgʻon.
Yaʼni xato **baʼzi** soʻzlarda chiqadi, baʼzilarida yoʻq. Eng yomon turdagi xato
(Dars 09 dan tanish).

> **Qoida:** `elif` zanjirida **eng aniq** shart birinchi turadi. "Oldida `o` va
> keyin harf" — bu "oldida harf va keyin harf" ning **xususiy holi**. Xususiy
> holat umumiysidan oldin tekshirilishi shart.

---

## 10. Haqiqiy tokenizator bilan solishtiramiz

Endi bir narsani ochiq aytaman.

Mening `uzbek-bpe-16k` tokenizatorim ham apostrofni normallashtiradi. Uning
qoidalari shunday:

1. `’` va `` ` `` → `'` ga aylanadi
2. `o'`, `O'`, `g'`, `G'` → `oʻ`, `Oʻ`, `gʻ`, `Gʻ`
3. ikki harf orasidagi apostrof → `ʼ`

Bu qoidalar `'`, `’`, `` ` `` bilan yozilgan `oʻzbek` ni toʻgʻri tuzatadi. Lekin
ularda **ikkita boʻshliq** bor, va men ularni oʻzim oʻlchab topdim:

**Boʻshliq 1: `‘` umuman tegilmaydi.** Birinchi qoida faqat `’` va `` ` `` ni
oladi — `‘` ni emas. 2-boʻlimdagi jadvalga qayting: `‘` — internetdagi **eng koʻp**
uchraydigan variant, 34%. Yaʼni tokenizatorim aynan eng keng tarqalgan yozuvni
tuzatmaydi. Har bir `o‘zbek` bitta ortiqcha token turadi. Hisob-kitobim boʻyicha,
uni tuzatish fertility ni taxminan **2%** yaxshilardi.

**Boʻshliq 2: soʻz chegarasi tekshirilmaydi.** 2-qoida `o` dan keyingi har qanday
`'` ni oladi. Natijada `'dunyo'` → `'dunyoʻ` boʻladi — qoʻshtirnoq harfga aylanadi.

Ikkala boʻshliq ham sizning `apostrof_tuzat` funksiyangizda **yoʻq**:

| Kirish | `uzbek-bpe-16k` | Sizning funksiyangiz |
|---|---|---|
| `o‘zbek` | `o‘zbek` — tuzatilmadi | `oʻzbek` ✓ |
| `U 'dunyo' dedi` | `U 'dunyoʻ dedi` — buzildi | `U 'dunyo' dedi` ✓ |

**Nima uchun tuzatmadim?** Chunki `uzbek-gpt-103m` modelim aynan shu tokenizator
bilan oʻqitilgan. Tokenizatorni oʻzgartirsam, model oʻzi oʻrgangan tokenlarni
tanimay qoladi va uni qaytadan oʻqitish kerak boʻladi (Dars 12 dagi "model
tanimaydi" muammosi).

> **Bundan ikkita saboq:**
>
> 1. **Har qanday qoidani haqiqiy maʼlumotda tekshiring.** Mening qoidalarim
>    `'`, `’`, `` ` `` bilan sinab koʻrilgan edi va ishlardi. Faqat haqiqiy
>    internet matnini sanaganimda eng koʻp variant tushib qolganini koʻrdim.
> 2. **Tokenizator — model bilan bogʻlangan.** Model oʻqitilgandan keyin
>    tokenizatorni "biroz yaxshilash" mumkin emas. Shuning uchun uni **avval**
>    puxta qilish kerak.
>
> Dars 18 da `uzbek-bpe-16k` ni yuklab ishlatganingizda `‘` tegilmay qolganini
> oʻzingiz koʻrasiz. Endi sababini bilasiz.

---

## 11. NFC: koʻzga bir xil, baytlarda har xil

Normalizatsiyaning yana bitta qatlami bor, va u 14-boʻlimda muhim boʻladi.

Ayrim harflarni Unicode'da **ikki xil** yozish mumkin. Masalan `ö`:

```python
a = "\u00f6"           # bitta belgi: ö
b = "o\u0308"          # ikkita belgi: o + ustidagi ikki nuqta

print(a, b)
print("uzunligi:", len(a), len(b))
print("teng:", a == b)
print("baytlar:", list(a.encode()), list(b.encode()))
```

**Natija:**

```
ö ö
uzunligi: 1 2
teng: False
baytlar: [195, 182] [111, 204, 136]
```

Koʻzga — **bir xil**. Python uchun — **har xil**. Baytlarda — butunlay boshqa.

Ikkinchisida `o` oddiy harf, `\u0308` esa "oldingi harf ustiga ikki nuqta qoʻy"
degan alohida belgi. Ekranda ular bitta boʻlib chiziladi.

Bu qayerdan keladi? Turli klaviaturalar, turli operatsion tizimlar, nusxa
koʻchirish. Bir hujjatda biri, boshqasida ikkinchisi.

**Yechim — `unicodedata.normalize("NFC", matn)`:**

```python
print(unicodedata.normalize("NFC", b) == a)
```

```
True
```

`NFC` — "har bir harfni iloji boricha **bitta** belgiga yigʻ". Ikki qismli `ö`
bitta `ö` ga aylanadi.

`oʻ` ga esa u tegmaydi — `ʻ` alohida belgi, uni hech qanday harf bilan yigʻib
boʻlmaydi. Demak NFC bizning apostrof ishimizni buzmaydi.

### Yakuniy normalizator

NFC ni birinchi qadam qilib qoʻshamiz:

```python
def normallashtir(matn):
    matn = unicodedata.normalize("NFC", matn)
    matn = apostrof_tuzat(matn)
    return matn
```

Nima uchun NFC **birinchi**? Chunki apostrof qoidasi "oldingi belgi harfmi?" deb
soʻraydi. Agar harf ikki qismda turgan boʻlsa (`o` + `\u0308`), oldingi belgi
harf emas, ikki nuqta boʻlib chiqadi — va qoida notoʻgʻri ishlaydi. Avval yigʻamiz,
keyin tekshiramiz.

### Barqarorlik

Dars 12 dagi sinovni eslang: normalizatsiyani **ikki marta** qoʻllasak, natija
oʻzgarmasligi kerak.

```python
for t in testlar:
    n = normallashtir(t)
    if normallashtir(n) != n:
        print("BARQAROR EMAS:", t)
print("tekshirildi")
```

```
tekshirildi
```

Hech biri chiqmadi. Toʻgʻri yozilgan matnga normalizator **tegmaydi**.

---

## 12. Oʻlchaymiz

Endi asosiy savol: bu amalda qanchalik farq qiladi?

Dars 10 dagi oʻquv matnimizni olamiz, lekin endi undagi yettita `oʻ` ni
internetdagidek aralash yozamiz:

```python
matn_aralash = """Bolalar maktabga borishdi. Ular kitoblarni o‘qishdi va daftarlarga yozishdi.
Oʻqituvchi darsni tushuntirdi. O'quvchilar savollarga javob berishdi.
Kechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.
Otalar ishdan kelishdi. Hamma birga dasturxonga o‘tirishdi.
Ertalab bolalar yana maktabga borishdi. Ular yangi darslarni o’rganishdi.
Kitoblarda qiziqarli hikoyalar bor edi. Bolalar hikoyalarni yoqtirishdi.
O‘qituvchilar savollar berishdi. O'quvchilar javoblarni yozishdi."""

print(normallashtir(matn_aralash) == matn)
```

```
True
```

Normalizatsiyadan keyin u **aynan** Dars 10 dagi matnga aylanadi.

Ikkita tokenizator oʻqitamiz — biri xom matnda, biri normallashtirilganida:

```python
m_xom, v_xom, _ = train_regex(matn_aralash, 306, NAQSH)
m_nor, v_nor, _ = train_regex(normallashtir(matn_aralash), 306, NAQSH)
```

Va ikkalasini **yangi** jumlada sinaymiz — u ham internetdagidek aralash yozilgan:

```python
sinov = "O\u2018quvchilar o'qituvchiga savol berishdi. O\u2019qituvchi javob berdi."

t_xom = encode_regex(sinov, m_xom, NAQSH)
t_nor = encode_regex(normallashtir(sinov), m_nor, NAQSH)

w = len(sinov.split())
print("normalizatsiyasiz:", len(t_xom), "token | fertility:", round(len(t_xom) / w, 3))
print("normalizatsiya bilan:", len(t_nor), "token | fertility:", round(len(t_nor) / w, 3))
```

**Natija:**

```
normalizatsiyasiz: 32 token | fertility: 4.571
normalizatsiya bilan: 28 token | fertility: 4.0
```

**12% kamroq token.**

### Tokenizator nimani oʻrgandi?

Ikkala lugʻatdan apostrof belgisini oʻz ichiga olgan tokenlarni qidiramiz:

```python
def apostrofli(vocab):
    natija = []
    for tid in range(256, len(vocab)):
        matn = vocab[tid].decode("utf-8", errors="replace")
        for b in APOSTROFLAR:
            if b in matn:
                natija.append(matn)
    return natija


print("normalizatsiyasiz:", apostrofli(v_xom))
print("normalizatsiya bilan:", apostrofli(v_nor))
```

```
normalizatsiyasiz: ['‘']
normalizatsiya bilan: ['ʻ', 'ʻq', 'Oʻq', 'Oʻqit']
```

Normalizatsiya bilan tokenizator **`oʻqi-` oʻzagini** qura boshladi: `ʻq` →
`Oʻq` → `Oʻqit`. Normalizatsiyasiz esa — deyarli hech narsa. Statistika toʻrtta
variantga boʻlinib ketdi va hech biri birlashtirish uchun yetarlicha tez-tez
uchramadi.

### Eng gʻalati natija

Endi bitta soʻzni uch xil yozib, ikkala tokenizatorda kodlaymiz:

```python
def korsat(tokenlar, vocab):
    return [decode([t], vocab) for t in tokenlar]

for soz in [" o\u02bbqituvchi", " o'qituvchi", " o\u2018qituvchi"]:
    a = encode_regex(soz, m_xom, NAQSH)
    b = encode_regex(normallashtir(soz), m_nor, NAQSH)
    print(f"  {soz!r:16s} xom: {len(a)} {korsat(a, v_xom)}")
    print(f"  {'':16s} nor: {len(b)} {korsat(b, v_nor)}")
```

**Natija:**

```
  ' oʻqituvchi'    xom: 5 [' o', '�', '�', 'qit', 'uvchi']
                   nor: 4 [' o', 'ʻq', 'it', 'uvchi']
  " o'qituvchi"    xom: 4 [' o', "'", 'qit', 'uvchi']
                   nor: 4 [' o', 'ʻq', 'it', 'uvchi']
  ' o‘qituvchi'    xom: 4 [' o', '‘', 'qit', 'uvchi']
                   nor: 4 [' o', 'ʻq', 'it', 'uvchi']
```

**Birinchi qatorga qarang.** Normalizatsiyasiz tokenizatorda **toʻgʻri** yozilgan
soʻz **eng qimmat** — 5 token. Va ulardan ikkitasi `�` — Dars 11 dagi yarim belgilar!

Nima boʻldi? Toʻgʻri `ʻ` matnda kam uchragani uchun tokenizator uning ikkita
baytini (202 va 187) birlashtirishni oʻrganmagan. Natijada `ʻ` ikki boʻlakda
qoldi.

> **Normalizatsiyasiz tokenizator toʻgʻri yozganlarni jazolaydi.** Chunki
> internetda toʻgʻri yozuv — ozchilik.
>
> Normalizatsiya bilan esa uchala yozuv **aynan bir xil** tokenlarga aylanadi.

### Halol izoh

12% — bu **bizning kichkina matnimizdagi** raqam. Unda atigi 7 ta `oʻ` bor, va
har biri katta taʼsir qiladi.

Haqiqiy katta korpusda farq ancha kichik boʻladi. Millionlab hujjatda tokenizator
har bir variantni alohida oʻrganishga yetarli maʼlumot topadi — u shunchaki
lugʻatda koʻproq joy isrof qiladi va har bir notoʻgʻri yozilgan soʻz uchun bitta
ortiqcha token turadi. 10-boʻlimdagi raqamni eslang: mening tokenizatorimda bitta
varianti (`‘`) tuzatilmagani taxminan **2%** turadi.

**Kichik matn effektni kattalashtiradi. Tushunish uchun foydali — lekin uni
haqiqiy natija deb aytmang.**

---

## 13. Normalizatsiya qayerda turadi

Tokenizatorning toʻliq zanjiri endi shunday:

```
matn → normallashtir → regex boʻlish → BPE → tokenlar
```

Va bu zanjir **ikki joyda** bir xil boʻlishi shart — Dars 13 dagi naqsh kabi:

```python
# oʻqitishda
merges, vocab, _ = train_regex(normallashtir(matn), 306, NAQSH)

# kodlashda
def encode_toliq(matn, merges):
    return encode_regex(normallashtir(matn), merges, NAQSH)
```

### Round-trip endi boshqacha

Endi muhim oʻzgarish. Dars 11 da asosiy sinovimiz shu edi:

```
decode(encode(x)) == x
```

Endi u **har doim ham** ishlamaydi:

```python
for x in ["o'zbek tili", "o\u02bbzbek tili"]:
    y = decode(encode_toliq(x, m_nor), v_nor)
    print(f"  {x!r:14s} -> {y!r:14s} | == x: {y == x} | == normallashtir(x): {y == normallashtir(x)}")
```

```
  "o'zbek tili"  -> 'oʻzbek tili'  | == x: False | == normallashtir(x): True
  'oʻzbek tili'  -> 'oʻzbek tili'  | == x: True | == normallashtir(x): True
```

`o'zbek` kirdi — `oʻzbek` chiqdi. **Asl belgi qaytmaydi.**

Bu xato emas — bu **qaror**. Normalizatsiya **bir tomonlama**: biz besh xil
yozuvni ataylab bittaga birlashtirdik, va qaysi biri boshida turganini
eslab qolmadik. Oʻzbek tilida ular orasida maʼno farqi yoʻq.

Shuning uchun sinov ham oʻzgaradi:

```
decode(encode(x)) == normallashtir(x)
```

### ⚠️ Baholash uchun muhim qoida

Bir xavfli narsa bor. Agar siz tokenizatoringizni **boshqa tokenizatorlar bilan**
solishtirmoqchi boʻlsangiz:

> **Sinov matnini oldindan normallashtirib saqlamang.** Hamma tokenizatorga
> **asl internet matnini** bering — har biri oʻz normalizatsiyasini oʻzi qilsin.

Agar matnni sizning normalizatoringizdan oʻtkazib saqlasangiz, u **sizning**
tokenizatoringiz yaxshi koʻradigan imloda boʻladi. Boshqa tokenizatorlar esa
internetdagi imloda oʻrgangan. Solishtiruv sizning foydangizga ogʻadi — sezilmay.

Bu xatoni men oʻzim qilganman. Dars 17 da qanday topganimni aytib beraman.

---

## 14. 2026-yil: yangi alifbo

Bu darsni yozayotgan paytda oʻzbek alifbosi oʻzgaryapti.

**2026-yil 10-sentabrda** Senat lotin alifbosiga oʻzgartirishlarni maʼqulladi:

| Eski | Yangi |
|---|---|
| oʻ | **ö** |
| gʻ | **ğ** |
| sh | **ş** |
| ch | **ç** |

Tutuq belgisi `ʼ` qoladi. Maktab darsliklari 2031-yilgacha yangi yozuvga oʻtishi
rejalashtirilgan.

Bu `oʻ` va `gʻ` muammosining oxirimi? Ham ha, ham yoʻq:

- **Ha** — yangi matnlarda apostrofli harflar boʻlmaydi.
- **Yoʻq** — internetdagi millionlab eski matnlar qoladi. Va bir necha yil
  davomida odamlar **ikkala** yozuvda yozadi.

### Tokenizatorga nima boʻladi?

Mening tokenizatorim eski yozuvda oʻqitilgan. U `ö` ni hech qachon koʻrmagan.
Men buni oʻlchadim: bir xil test matnini yangi yozuvga oʻtkazganimda,
`uzbek-bpe-16k` ning fertility si **1.709 dan 2.353 ga** oshdi — **38% koʻproq
token**. *(Bu oʻlchov normallashtirilgan imlodagi test matnida qilingan, shuning
uchun Dars 01 dagi 1.749 dan biroz farq qiladi.)*

Qiziq tomoni: `ö` — **2 bayt**, `oʻ` esa **3 bayt**:

```python
print(list("ö".encode()), list("o\u02bb".encode()))
```

```
[195, 182] [111, 202, 187]
```

Yangi harf **kamroq** bayt turadi — lekin **koʻproq** token. Chunki tokenning
narxi baytlarga emas, **tokenizator nimani oʻrganganiga** bogʻliq.

### Yechim — yana normalizatsiya

Modelni yangi yozuvda qaytadan oʻqitish — haftalar va pul. Lekin bunga hojat
yoʻq.

Tokenizatordan **oldin** yangi harflarni eskisiga qaytarsak — `ö` → `oʻ`,
`ş` → `sh` — tokenizator oʻzi biladigan matnni oladi. Men buni sinab koʻrdim:
fertility **aynan 1.709 ga** qaytdi. Qayta oʻqitish yoʻq, GPU yoʻq, model
ham oʻzgarishsiz ishlaydi.

Bu funksiyani 18-boʻlimdagi 5-mashqda **oʻzingiz** yozasiz.

> **Bu darsning eng muhim gʻoyasi:** normalizatsiya — tokenizatorning **eng arzon
> richagi**. U oʻqitilgan modelga tegmaydi. Faqat matnni modelga tanish shaklga
> keltiradi. Apostrof muammosi ham, alifbo islohoti ham — bitta usul bilan.

<!-- animatsiya: p4 | Yangi alifbo -->

---

## 15. Muammo

Endi tokenizatoringiz **toʻliq**:

- ✓ baytlar (Dars 06) — notanish belgi yoʻq
- ✓ BPE (Dars 08–12) — qoʻshimchalarni oʻzi topadi
- ✓ regex (Dars 13) — soʻz chegarasidan oʻtmaydi
- ✓ normalizatsiya (Dars 14) — `oʻ` qanday yozilmasin, bir xil

Lekin u **53 ta soʻzda** oʻqitilgan. Dars 10 dan bilasiz: bu juda kam — kichik
matnda tokenizator oʻrganmaydi, yodlaydi.

Haqiqiy tokenizator uchun **millionlab** hujjat kerak. Bu darsdagi senzus ham
3 000 ta haqiqiy hujjatdan olingan edi.

Bunday matn qayerdan olinadi? Kim ruxsat beradi? Va eng muhimi — internetdagi
matn qanchalik iflos? Dublikatlar, reklamalar, boshqa tillar, buzilgan baytlar...

Keyingi dars aynan shu haqida.

---

## 16. Toʻliq kod

```python
import re
import unicodedata

NAQSH = r" ?\w+| ?[^\s\w]+|\s+"

OKINA = "\u02bb"    # oʻ va gʻ dagi belgi
TUTUQ = "\u02bc"    # maʼno dagi belgi
APOSTROFLAR = "'\u2018\u2019`\u02bb\u02bc"


def apostrof_tuzat(matn):
    belgilar = list(matn)
    for i in range(len(belgilar)):
        if belgilar[i] in APOSTROFLAR:
            oldingi = ""
            keyingi = ""
            if i > 0:
                oldingi = belgilar[i - 1]
            if i < len(belgilar) - 1:
                keyingi = belgilar[i + 1]

            if oldingi in ["g", "G"]:
                belgilar[i] = OKINA
            elif oldingi in ["o", "O"] and keyingi.isalpha():
                belgilar[i] = OKINA
            elif oldingi.isalpha() and keyingi.isalpha():
                belgilar[i] = TUTUQ
    return "".join(belgilar)


def normallashtir(matn):
    matn = unicodedata.normalize("NFC", matn)
    matn = apostrof_tuzat(matn)
    return matn


def encode_toliq(matn, merges):
    return encode_regex(normallashtir(matn), merges, NAQSH)


# ---- 1. Qoidalar ----
for t in ["o'zbek", "g\u2019alaba", "bog'", "ma'no", "U \u2018salom\u2019 dedi", "U 'dunyo' dedi"]:
    print(f"  {t!r:18s} -> {normallashtir(t)!r}")

# ---- 2. NFC ----
print("NFC:", normallashtir("o\u0308") == "ö")

# ---- 3. Trening va sinov ----
matn_aralash = """Bolalar maktabga borishdi. Ular kitoblarni o‘qishdi va daftarlarga yozishdi.
Oʻqituvchi darsni tushuntirdi. O'quvchilar savollarga javob berishdi.
Kechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.
Otalar ishdan kelishdi. Hamma birga dasturxonga o‘tirishdi.
Ertalab bolalar yana maktabga borishdi. Ular yangi darslarni o’rganishdi.
Kitoblarda qiziqarli hikoyalar bor edi. Bolalar hikoyalarni yoqtirishdi.
O‘qituvchilar savollar berishdi. O'quvchilar javoblarni yozishdi."""

m_xom, v_xom, _ = train_regex(matn_aralash, 306, NAQSH)
m_nor, v_nor, _ = train_regex(normallashtir(matn_aralash), 306, NAQSH)

sinov = "O\u2018quvchilar o'qituvchiga savol berishdi. O\u2019qituvchi javob berdi."
w = len(sinov.split())
t_xom = encode_regex(sinov, m_xom, NAQSH)
t_nor = encode_toliq(sinov, m_nor)
print("normalizatsiyasiz:", len(t_xom), "token |", round(len(t_xom) / w, 3))
print("normalizatsiya bilan:", len(t_nor), "token |", round(len(t_nor) / w, 3))

# ---- 4. Round-trip ----
x = "o'zbek tili"
y = decode(encode_toliq(x, m_nor), v_nor)
print("round-trip:", y == normallashtir(x))
```

**Kutilgan natija:**

```
  "o'zbek"           -> 'oʻzbek'
  'g’alaba'          -> 'gʻalaba'
  "bog'"             -> 'bogʻ'
  "ma'no"            -> 'maʼno'
  'U ‘salom’ dedi'   -> 'U ‘salom’ dedi'
  "U 'dunyo' dedi"   -> "U 'dunyo' dedi"
NFC: True
normalizatsiyasiz: 32 token | 4.571
normalizatsiya bilan: 28 token | 4.0
round-trip: True
```

---

## 17. Oʻzingiz yozing

```python
def apostrof_tuzat(matn):
    belgilar = ___(matn)
    for i in range(len(belgilar)):
        if belgilar[i] in APOSTROFLAR:
            oldingi = ""
            keyingi = ""
            if i ___ 0:
                oldingi = belgilar[i - 1]
            if i < len(belgilar) ___ 1:
                keyingi = belgilar[i + 1]

            if oldingi in [___, ___]:
                belgilar[i] = OKINA
            ___ oldingi in ["o", "O"] and keyingi.___():
                belgilar[i] = OKINA
            elif oldingi.isalpha() ___ keyingi.isalpha():
                belgilar[i] = ___
    return ___.join(belgilar)


# Bu natijani olishingiz kerak:
print(apostrof_tuzat("To'g'ri ma'no, bog'da"))     # Toʻgʻri maʼno, bogʻda
```

<details>
<summary>Yechimni koʻrsatish</summary>

```python
def apostrof_tuzat(matn):
    belgilar = list(matn)
    for i in range(len(belgilar)):
        if belgilar[i] in APOSTROFLAR:
            oldingi = ""
            keyingi = ""
            if i > 0:
                oldingi = belgilar[i - 1]
            if i < len(belgilar) - 1:
                keyingi = belgilar[i + 1]

            if oldingi in ["g", "G"]:
                belgilar[i] = OKINA
            elif oldingi in ["o", "O"] and keyingi.isalpha():
                belgilar[i] = OKINA
            elif oldingi.isalpha() and keyingi.isalpha():
                belgilar[i] = TUTUQ
    return "".join(belgilar)
```

Bitta jumlada uchala qoida ishladi: `toʻgʻri` (o va g), `maʼno` (tutuq), `bogʻda`
(g, keyin harf).

Eng koʻp qilinadigan xatolar:

1. `["g", "G"]` oʻrniga `"gG"` — 8-boʻlimdagi boʻsh satr tuzogʻi.
2. `elif` oʻrniga `if` — unda bitta belgi uchun bir nechta qoida ketma-ket
   ishlashi mumkin, va oxirgisi "yutadi".
3. Tutuq qoidasini birinchi qoʻyish — 9-boʻlimdagi `oʼqish` xatosi.
</details>

---

## 18. Mashqlar

---

**Mashq 1.** Ishga tushirmasdan ayting: `normallashtir` bulardan nima qiladi?

```
"G‘ozi"    "O'g'il"    "ko’cha"    "Ma`lumot"    "sog'lom"
```

<details>
<summary>Javobni koʻrsatish</summary>

```
'G‘ozi'      -> 'Gʻozi'
"O'g'il"     -> 'Oʻgʻil'
'ko’cha'     -> 'koʻcha'
'Ma`lumot'   -> 'Maʼlumot'
"sog'lom"    -> 'sogʻlom'
```

`Maʼlumot` ga diqqat qiling: oldida `a`, keyin `l` — ikkalasi ham harf, va `a`
na `o`, na `g`. Demak tutuq. Qaysi belgi bilan yozilgani (`` ` ``) muhim emas.
</details>

---

**Mashq 2.** `normallashtir("don't")` va `normallashtir("it's")` nima qaytaradi?
Bu muammomi?

<details>
<summary>Javobni koʻrsatish</summary>

```
'donʼt'
'itʼs'
```

Inglizcha apostrof ham ikki harf orasida turibdi — demak 3-qoida uni tutuqqa
aylantirdi.

**Muammomi?** Qisman. Oʻzbekcha korpusda inglizcha soʻzlar ham uchraydi, va ular
endi biroz "buzilgan" boʻladi.

Lekin bu **ongli savdo**: tokenizator oʻzbek tili uchun. Inglizcha matn kam, va
`donʼt` ning `don't` dan farqi model uchun katta emas. Agar inglizcha matn
koʻp boʻlsa, normalizatsiyadan oldin **tilni aniqlash** kerak boʻlardi — va bu
Dars 15 ning mavzusi.

Har bir qoida qayerdadir xato qiladi. Muhimi — **qayerda** ekanini bilish va bu
narx toʻlashga arziydimi, hal qilish.
</details>

---

**Mashq 3.** Bizning qoidalarimiz `'dunyo'` ni toʻgʻri qoldiradi. Lekin bitta
oʻxshash holat bor, unda ular **xato qiladi**. Topa olasizmi? `g` haqida oʻylang.

<details>
<summary>Javobni koʻrsatish</summary>

```python
print(repr(normallashtir("U 'bog' dedi")))
```

```
"U 'bogʻ dedi"
```

Qoʻshtirnoq ichidagi soʻz `g` bilan tugasa, yopuvchi qoʻshtirnoq `gʻ` ga aylanadi.

**Nima uchun tuzatmadik?** Chunki `bogʻ` (oxirida `gʻ`) va `'bog'` (qoʻshtirnoq
ichida) **bir xil koʻrinadi**. Belgining atrofi ikkalasida ham aynan bir xil:
oldida `g`, keyin boʻshliq. Qaysi biri ekanini faqat **maʼno** hal qiladi — va
bizning qoidamiz maʼnoni bilmaydi.

`bogʻ`, `togʻ`, `sogʻ` — juda koʻp uchraydi. `g` bilan tugaydigan soʻzni
qoʻshtirnoqqa olish — juda kam. Shuning uchun koʻp uchraydigan holatni toʻgʻri
qilib, kam uchraydiganida xato qilishni tanladik.

**Mukammal qoida yoʻq. Faqat yaxshi tanlangan xatolar bor.**
</details>

---

**Mashq 4.** `decode(encode_toliq("O'zbekiston", m_nor), v_nor)` nima qaytaradi?
Round-trip sinovini qanday yozish kerak?

<details>
<summary>Javobni koʻrsatish</summary>

```
'Oʻzbekiston'
```

`O'zbekiston` emas — `Oʻzbekiston`. Normalizatsiya bir tomonlama.

Shuning uchun:

```python
x = "O'zbekiston"
y = decode(encode_toliq(x, m_nor), v_nor)

print(y == x)                  # False — bu sinov notoʻgʻri
print(y == normallashtir(x))   # True  — bu toʻgʻri sinov
```

Agar siz eski sinovni (`y == x`) ishlatsangiz, u **ishlaydigan** tokenizatorni
"buzuq" deb koʻrsatadi. Sinov ham kod bilan birga oʻzgarishi kerak.
</details>

---

**Mashq 5 (eng muhimi).** Yangi alifboda yozilgan matnni eski yozuvga qaytaradigan
`eski_imloga` funksiyasini yozing: `ö` → `oʻ`, `ğ` → `gʻ`, `ş` → `sh`, `ç` → `ch`
(katta harflar ham). Keyin `m_nor` tokenizatorida uch xil matnni oʻlchang:

```python
eski  = "Oʻquvchilar oʻqituvchiga savol berishdi. Oʻqituvchi javob berdi."
yangi = "Öquvçilar öqituvçiga savol berişdi. Öqituvçi javob berdi."
```

<details>
<summary>Javobni koʻrsatish</summary>

```python
def eski_imloga(matn):
    matn = unicodedata.normalize("NFC", matn)
    matn = matn.replace("ş", "sh").replace("Ş", "Sh")
    matn = matn.replace("ç", "ch").replace("Ç", "Ch")
    matn = matn.replace("ö", "o\u02bb").replace("Ö", "O\u02bb")
    matn = matn.replace("ğ", "g\u02bb").replace("Ğ", "G\u02bb")
    return matn


print(eski_imloga(yangi) == eski)

w = len(eski.split())
for nom, m in [("eski imlo", eski), ("yangi imlo", yangi), ("qaytarilgan", eski_imloga(yangi))]:
    t = encode_toliq(m, m_nor)
    print(f"  {nom:12s} {len(t):3d} token | {len(t) / w:.3f}")
```

```
True
  eski imlo     28 token | 4.000
  yangi imlo    49 token | 7.000
  qaytarilgan   28 token | 4.000
```

**Yangi imlo — 75% koʻproq token.** Qaytarilgandan keyin — **aynan** eski raqam.

Mening haqiqiy tokenizatorimda farq 38% edi (1.709 → 2.353), va qaytarish ham
uni aynan 1.709 ga tikladi. Bizning kichkina tokenizatorda farq kattaroq — u
kamroq soʻz biladi.

**Nima uchun birinchi qator NFC?** 11-boʻlimni eslang: `ö` ikki xil yozilishi
mumkin. Agar matnda ikki qismli `o` + `\u0308` boʻlsa, `.replace("ö", ...)` uni
**topmaydi**. NFC avval ularni bitta `ö` ga yigʻadi.

**Cheklov:** `ŞAHAR` → `ShAHAR` boʻladi (`SHAHAR` emas). Va turkcha ismlar ham
oʻzgaradi: `Gökhan` → `Goʻkhan`. Haqiqiy konvertor bunday holatlarni ham hisobga
olishi kerak.

**Va eng muhimi:** siz hozir alifbo islohotiga tokenizatorni **qayta oʻqitmasdan**
moslashtirdingiz. Bitta funksiya, sakkizta `.replace()`.
</details>

---

## 19. Xulosa

1. Notoʻgʻri apostrof soʻzni regex darajasida **kesib qoʻyadi** — `o'zbek` → uch
   boʻlak. BPE bu devordan hech qachon oʻta olmaydi.
2. Internetda `oʻ` ning toʻgʻri yozuvi — atigi **23%**. Eng koʻp — `‘` (34%).
3. Ikkita toʻgʻri belgi: `ʻ` (699) — `oʻ`, `gʻ` uchun; `ʼ` (700) — tutuq uchun.
   Ikkalasi ham Unicode'da **harf**.
4. Belgining oʻzi emas — **atrofi** hal qiladi. `.replace()` bu ishni qila olmaydi.
5. `g` dan keyin — doim `ʻ`. `o` dan keyin — faqat keyin harf boʻlsa. Ikki harf
   orasida — `ʼ`. Qolgan hammasi — tegilmaydi.
6. `elif` zanjirida **eng aniq shart birinchi**. `x in ["a", "b"]` — `x in "ab"`
   emas (`"" in "ab"` → `True`).
7. **NFC** — koʻzga bir xil, baytlarda har xil harflarni bittaga yigʻadi.
   Apostrof qoidasidan **oldin**.
8. Normalizatsiya **bir tomonlama**. Sinov: `decode(encode(x)) == normallashtir(x)`.
9. Sinov matnini oldindan normallashtirib saqlamang — solishtiruv sizning
   foydangizga ogʻadi.
10. Normalizatsiya — **eng arzon richag**. Alifbo islohotiga ham qayta
    oʻqitmasdan moslashtiradi.

---

## Keyingi dars

Tokenizator toʻliq. Endi unga **haqiqiy maʼlumot** kerak.

**Dars 15 — Maʼlumot: qayerdan olish va qanday tozalash.** Oʻzbek matni qayerda
bor, qaysi birini ishlatish mumkin, va internet matnini tokenizatorga berishdan
oldin undan nimalarni olib tashlash kerak.

Keyingi darsning savoli: *agar bitta yangilik maqolasi oʻnta saytda qayta chop
etilgan boʻlsa — va hammasi korpusingizga tushsa — bu tokenizatorga qanday
taʼsir qiladi?*
