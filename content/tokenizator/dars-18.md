# Dars 18 — Bitta klass va haqiqiy tokenizator

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 17 — Halol baholash: ifloslanish
> **Vaqt:** ~80 daqiqa (+ ~5 daqiqa treningni kutish)
> **Kerak:** Dars 01–17. Dars 17 dagi boʻlinish (`seed 0`, 90/10) va toza test

---

## Bu darsdan keyin siz...

- **yozasiz** birinchi **klassingizni** — va tushunasiz `self` nima ekanini;
- **yigʻasiz** butun tokenizatorni bitta `Tokenizator` klassiga;
- **saqlaysiz** uni faylga va **isbotlaysiz** qaytarib olingani aynan oʻsha ekanini;
- **yuklab olasiz** mening haqiqiy tokenizatorimni — `uzbek-bpe-16k` — va uni
  `AutoTokenizer` bilan ishlatasiz;
- **solishtirasiz** ikkalasini **halol** — Dars 17 qoidalari bilan;
- **tuzatasiz** haqiqiy tokenizatordagi xatoni — qayta oʻqitmasdan.

---

## 1. Bitta savol

Dars 17 oxirida savol qoldirgan edim:

> Colab sessiyasi tugaganda ham tokenizator yoʻqolmasligi uchun uni qanday saqlash
> kerak — va saqlangan fayldan **aynan oʻsha** tokenizatorni qaytarib olganingizni
> qanday isbotlaysiz?

Avval boshqa muammoni hal qilamiz — busiz saqlash ham chalkash boʻladi.

---

## 2. Muammo: tarqoq kod

Bitta jumlani kodlash uchun hozir nimalarni eslab qolishingiz kerak?

1. `normallashtir` ni chaqirish — **oʻqitishda ham, kodlashda ham** (Dars 14);
2. `NAQSH` — aynan oʻsha regex (Dars 13);
3. `merges` lugʻati — trening natijasi;
4. `vocab` lugʻati — `decode` uchun;
5. `encode_tez` — `encode_regex` emas, aks holda sekin (Dars 16);
6. `kesh` — har safar yangidan;
7. `decode(ids, vocab)` — `vocab` ni ham berish.

Yettita narsa. Bittasini unutsangiz — xato. Va eng yomoni — **jim** xato: masalan,
`normallashtir` siz kodlasangiz, dastur ishlaydi, faqat natija boshqacha chiqadi.

Bularning hammasi **bitta narsaga** tegishli: tokenizatorga. Python'da bir-biriga
tegishli maʼlumot va funksiyalarni bitta joyga yigʻish usuli bor — **klass**.

<!-- animatsiya: p1 | Yetti narsa, bitta quti -->

---

## 3. Klass — boʻsh joyda

Avval tokenizatorsiz, oddiy misolda.

### Birinchi klass

```python
class Sanagich:
    def __init__(self):
        self.son = 0

    def qosh(self):
        self.son += 1


a = Sanagich()
a.qosh()
a.qosh()
a.qosh()
print(a.son)
```

**Natija:**

```
3
```

Qator-qator:

- `class Sanagich:` — yangi **klass**. Klass — **qolip**: "sanagich qanday boʻladi"
  degan tavsif. Oʻzi hech narsa sanamaydi.
- `def __init__(self):` — klassdan yangi nusxa yaratilganda **avtomatik** ishlaydigan
  funksiya. Ikki pastki chiziq — Python'ning maxsus nomi.
- `self` — "**men oʻzim**". Har bir nusxa oʻzi haqida gapirganda `self` deydi.
- `self.son = 0` — nusxaning **oʻz** oʻzgaruvchisi (*atribut*). Har bir nusxada —
  alohida.
- `def qosh(self):` — klass ichidagi funksiya (*metod*). Birinchi parametri doim
  `self`.
- `a = Sanagich()` — qolipdan **nusxa** (*obyekt*) yasaymiz. Shu paytda `__init__`
  ishlaydi.
- `a.qosh()` — `a` ning metodini chaqiramiz. Python `self` oʻrniga `a` ni oʻzi
  qoʻyadi.

### Har bir nusxa — oʻziniki

```python
a = Sanagich()
b = Sanagich()

a.qosh()
a.qosh()
b.qosh()

print("a:", a.son, "| b:", b.son)
```

**Natija:**

```
a: 2 | b: 1
```

Bitta qolip — ikkita mustaqil sanagich. `a` ning soni `b` ga taʼsir qilmaydi.
Tokenizatorlar uchun bu aynan kerak: 7-boʻlimda ikkita tokenizatorni yonma-yon
ishlatamiz.

### Parametrli `__init__`

```python
class Kitob:
    def __init__(self, nom, sahifa):
        self.nom = nom
        self.sahifa = sahifa
        self.oqilgan = 0

    def oqi(self, n):
        self.oqilgan += n

    def qoldi(self):
        return self.sahifa - self.oqilgan


k = Kitob("Oʻtgan kunlar", 384)
k.oqi(100)
k.oqi(50)
print(k.nom, "— qoldi:", k.qoldi(), "sahifa")
```

**Natija:**

```
Oʻtgan kunlar — qoldi: 234 sahifa
```

- `Kitob("Oʻtgan kunlar", 384)` — qavs ichidagilar `__init__` ga ketadi: `nom` va
  `sahifa`. `self` ni Python oʻzi qoʻyadi.
- `self.nom = nom` — chap tomon — nusxaning atributi, oʻng tomon — parametr.
  Nomlari bir xil, lekin ular **ikki boshqa** narsa.
- `qoldi` metodi `return` qiladi — oddiy funksiyadek.

### Ataylab xato: `self` ni unutish

```python
class Xato:
    def salom():
        print("salom")


Xato().salom()
```

**Natija:**

```
TypeError: Xato.salom() takes 0 positional arguments but 1 was given
```

Xatoni oʻqiymiz: "`salom()` 0 ta argument oladi, lekin 1 ta berildi." Biz hech qanday
argument bermadikku? **Berdik** — Python `Xato().salom()` ni chaqirganda nusxaning
oʻzini (`self`) birinchi argument qilib **jim** uzatadi. Metodda unga joy yoʻq edi.

> Klass ichidagi har bir metodning birinchi parametri — `self`.

---

## 4. `Tokenizator` klassi

Endi 2-boʻlimdagi yettita narsani bitta qolipga yigʻamiz. Dars 14–17 dagi
funksiyalar kerak — yangi sessiyada quyidagi katakni ishga tushiring:

<details>
<summary>Dars 14–17 dagi kod (ochib, nusxa qiling)</summary>

```python
import re
import json
import time
import random
import hashlib
import unicodedata
import urllib.request

NAQSH = r" ?\w+| ?[^\s\w]+|\s+"
OKINA = "\u02bb"
TUTUQ = "\u02bc"
APOSTROFLAR = "'\u2018\u2019`\u02bb\u02bc"
MANZIL = ("https://raw.githubusercontent.com/common-voice/common-voice/"
          "57f42edbf6f6d3b128e0bcd3f916360af0d328b6/server/data/uz/sentence-collector.txt")


def kodla(matn):
    return list(matn.encode("utf-8"))


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


def decode(ids, vocab):
    qismlar = []
    for tid in ids:
        qismlar.append(vocab[tid])
    return b"".join(qismlar).decode("utf-8", errors="replace")


def encode_regex(matn, merges, naqsh):
    natija = []
    for bosh in re.findall(naqsh, matn):
        tk = kodla(bosh)
        while len(tk) >= 2:
            stats = {}
            for juft in zip(tk, tk[1:]):
                stats[juft] = stats.get(juft, 0) + 1
            eng_j = None
            eng_r = float("inf")
            for j in stats:
                r = merges.get(j, float("inf"))
                if r < eng_r:
                    eng_r = r
                    eng_j = j
            if eng_j is None:
                break
            tk = merge(tk, eng_j, merges[eng_j])
        natija = natija + tk
    return natija


def normallashtir(matn):
    matn = unicodedata.normalize("NFC", matn)
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


def kirill_ulushi(matn):
    harflar = 0
    kirill = 0
    for belgi in matn:
        if belgi.isalpha():
            harflar += 1
            if ord(belgi) >= 1024 and ord(belgi) <= 1279:
                kirill += 1
    if harflar == 0:
        return 0
    return kirill / harflar


def kalit(matn):
    matn = normallashtir(matn)
    matn = matn.lower()
    matn = " ".join(matn.split())
    return hashlib.md5(matn.encode("utf-8")).hexdigest()


def ngrammalar(matn, n=5):
    sozlar = normallashtir(matn).lower().split()
    natija = set()
    for i in range(len(sozlar) - n + 1):
        natija.add(" ".join(sozlar[i:i + n]))
    return natija


def boshlar_sana(matn, naqsh):
    hisob = {}
    for b in re.findall(naqsh, matn):
        hisob[b] = hisob.get(b, 0) + 1
    return hisob


def eng_juft(stats):
    eng_son = max(stats.values())
    nomzodlar = []
    for juft in stats:
        if stats[juft] == eng_son:
            nomzodlar.append(juft)
    return min(nomzodlar)


def train_tez2(matn, vocab_size, naqsh):
    hisob = boshlar_sana(matn, naqsh)
    sozlar = []
    sonlar = []
    for b in hisob:
        sozlar.append(kodla(b))
        sonlar.append(hisob[b])

    stats = {}
    qayerda = {}
    for i in range(len(sozlar)):
        soz = sozlar[i]
        for juft in zip(soz, soz[1:]):
            stats[juft] = stats.get(juft, 0) + sonlar[i]
            if juft not in qayerda:
                qayerda[juft] = set()
            qayerda[juft].add(i)

    merges = {}
    vocab = {}
    for i in range(256):
        vocab[i] = bytes([i])
    tarix = []

    for yangi_id in range(256, vocab_size):
        if len(stats) == 0:
            break
        eng = eng_juft(stats)
        tarix.append(stats[eng])
        for i in qayerda[eng]:
            eski = sozlar[i]
            yangi = merge(eski, eng, yangi_id)
            if len(yangi) == len(eski):
                continue
            for j in zip(eski, eski[1:]):
                stats[j] -= sonlar[i]
                if stats[j] == 0:
                    del stats[j]
            for j in zip(yangi, yangi[1:]):
                stats[j] = stats.get(j, 0) + sonlar[i]
                if j not in qayerda:
                    qayerda[j] = set()
                qayerda[j].add(i)
            sozlar[i] = yangi
        del qayerda[eng]
        merges[eng] = yangi_id
        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]

    return merges, vocab, tarix


def encode_tez(matn, merges, naqsh):
    kesh = {}
    natija = []
    for bosh in re.findall(naqsh, matn):
        if bosh not in kesh:
            kesh[bosh] = encode_regex(bosh, merges, naqsh)
        natija.extend(kesh[bosh])
    return natija


# ---- korpus (Dars 16, 3-boʻlim) ----
urllib.request.urlretrieve(MANZIL, "uz_jumlalar.txt")
with open("uz_jumlalar.txt", encoding="utf-8") as f:
    jumlalar = f.read().split("\n")

toza = []
korilgan = set()
for j in jumlalar:
    j = j.replace("\u00ad", "").replace("\u200b", "").strip()
    if j == "" or kirill_ulushi(j) > 0.3:
        continue
    k = kalit(j)
    if k in korilgan:
        continue
    korilgan.add(k)
    toza.append(j)

with open("korpus.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(toza))
print("tayyor:", len(toza), "ta jumla")
```

**Natija:**

```
tayyor: 148102 ta jumla
```

</details>

Va klass:

```python
class Tokenizator:
    def __init__(self):
        self.merges = {}
        self.vocab = {}
        for i in range(256):
            self.vocab[i] = bytes([i])
        self.kesh = {}

    def train(self, matn, vocab_size):
        self.merges, self.vocab, _ = train_tez2(normallashtir(matn), vocab_size, NAQSH)
        self.kesh = {}

    def encode(self, matn):
        natija = []
        for bosh in re.findall(NAQSH, normallashtir(matn)):
            if bosh not in self.kesh:
                self.kesh[bosh] = encode_regex(bosh, self.merges, NAQSH)
            natija.extend(self.kesh[bosh])
        return natija

    def decode(self, ids):
        qismlar = []
        for tid in ids:
            qismlar.append(self.vocab[tid])
        return b"".join(qismlar).decode("utf-8", errors="replace")

    def qismlar(self, matn):
        natija = []
        for tid in self.encode(matn):
            natija.append(self.decode([tid]))
        return natija
```

Har bir metod — 2-boʻlimdagi bitta muammoning yechimi:

| Metod | Nima qiladi | Qaysi muammo yoʻqoldi |
|---|---|---|
| `__init__` | boʻsh tokenizator: 256 bayt, kesh | `vocab` ni qoʻlda qurish |
| `train` | **har doim** `normallashtir` bilan oʻqitadi | 1, 3, 4 |
| `encode` | **har doim** `normallashtir`, `NAQSH`, kesh | 1, 2, 5, 6 |
| `decode` | oʻz `vocab` idan foydalanadi | 7 |
| `qismlar` | tokenlarni matn boʻlaklari qilib koʻrsatadi | (qulaylik) |

Endi normalizatsiyani **unutib boʻlmaydi** — u klassning ichida. Ishlatuvchi faqat
`tok.encode(matn)` deydi.

Ikki nozik joy:

- `self.kesh` — kesh endi **nusxaning** ichida yashaydi. Dars 16 dagi `encode_tez`
  har chaqiruvda keshni noldan boshlardi. Endi u chaqiruvlar orasida saqlanadi:
  ikkinchi jumla birinchisining kesh idan foydalanadi.
- `train` keshni tozalaydi (`self.kesh = {}`). Nima uchun? Yangi `merges` bilan
  eski kesh **notoʻgʻri** tokenlar beradi.

### Oʻqitamiz — Dars 17 qoidalari bilan

Dars 17 dagi boʻlinish: `seed 0`, 90/10, keyin test'dan 8 soʻzli oynalar boʻyicha
ifloslanganlarni olib tashlash.

```python
with open("korpus.txt", encoding="utf-8") as f:
    korpus = f.read().split("\n")

aralash = list(korpus)
random.seed(0)
random.shuffle(aralash)
chegara = int(len(aralash) * 0.9)
train = aralash[:chegara]
test = aralash[chegara:]

izlar = set()
for j in train:
    for oyna in ngrammalar(j, 8):
        izlar.add(oyna)

test_toza = []
for j in test:
    iflos = False
    for oyna in ngrammalar(j, 8):
        if oyna in izlar:
            iflos = True
            break
    if not iflos:
        test_toza.append(j)

print("train:", len(train), "| toza test:", len(test_toza))
```

**Natija:**

```
train: 133291 | toza test: 14713
```

Dars 17 dagi raqamlar — aynan oʻsha. `seed` shuning uchun kerak edi.

> Bu katak bir necha daqiqa ishlaydi.

```python
tok = Tokenizator()

t0 = time.perf_counter()
tok.train("\n".join(train), 16384)
print(f"vaqt: {(time.perf_counter() - t0) / 60:.1f} daqiqa")
print("lugʻat:", len(tok.vocab))
```

**Natija:**

```
vaqt: 4.2 daqiqa
lugʻat: 16384
```

Sinab koʻramiz:

```python
jumla = "O'zbekiston Respublikasi Prezidenti farmon imzoladi."

ids = tok.encode(jumla)
print(ids)
print(tok.qismlar(jumla))
print(tok.decode(ids))
```

**Natija:**

```
[537, 3252, 2798, 8930, 6359, 46]
['Oʻzbekiston', ' Respublikasi', ' Prezidenti', ' farmon', ' imzoladi', '.']
Oʻzbekiston Respublikasi Prezidenti farmon imzoladi.
```

Uchta qator — uchta metod. `O'zbekiston` dagi oddiy `'` — `ʻ` ga aylandi: klass
normalizatsiyani oʻzi qildi.

---

## 5. Saqlash

### Ataylab xato: JSON va kortej

Eng oddiy gʻoya — `merges` ni toʻgʻridan-toʻgʻri JSON qilish:

```python
json.dumps(tok.merges)
```

**Natija:**

```
TypeError: keys must be str, int, float, bool or None, not tuple
```

"Kalitlar matn, son, ... boʻlishi kerak — **kortej emas**." Dars 16 da buni chetlab
oʻtgan edik: har bir birlashtirishni `[a, b, yangi_id]` roʻyxati qilib yozdik. Endi
shuni klassning metodiga aylantiramiz.

### `save` va `yukla`

```python
def save(self, fayl):
    royxat = []
    for juft in self.merges:
        royxat.append([juft[0], juft[1], self.merges[juft]])
    malumot = {"versiya": 1, "naqsh": NAQSH, "merges": royxat}
    with open(fayl, "w", encoding="utf-8") as f:
        f.write(json.dumps(malumot))


def yukla(fayl):
    with open(fayl, encoding="utf-8") as f:
        malumot = json.loads(f.read())
    if malumot["naqsh"] != NAQSH:
        print("DIQQAT: fayldagi naqsh boshqa!")
    yangi = Tokenizator()
    for a, b, tid in malumot["merges"]:
        yangi.merges[(a, b)] = tid
        yangi.vocab[tid] = yangi.vocab[a] + yangi.vocab[b]
    return yangi


Tokenizator.save = save
```

Qator-qator:

- `save` — `self` bilan yozilgan, demak u **metod**. `Tokenizator.save = save` —
  tayyor klassga yangi metod qoʻshdik. (Toʻliq kodda u klassning ichida turadi;
  bu yerda klassni qayta yozmaslik uchun shunday qildik.)
- `"versiya": 1` — fayl formatining raqami. Ertaga formatni oʻzgartirsangiz, eski
  fayllarni ajrata olasiz.
- `"naqsh": NAQSH` — regex ham saqlanadi. Dars 13: naqsh oʻqitishda va kodlashda
  **bir xil** boʻlishi shart. Boshqa naqsh bilan yuklangan merges — jim xato.
- `yukla` — **oddiy funksiya**, metod emas: u tokenizatordan emas, **fayldan**
  boshlaydi va yangi tokenizator qaytaradi.
- `yangi.vocab[tid] = yangi.vocab[a] + yangi.vocab[b]` — `vocab` ni qayta quramiz
  (Dars 11). Bu faqat merges **tartib bilan** kelgani uchun ishlaydi: `a` va `b`
  doim `tid` dan oldin yaratilgan. JSON roʻyxati tartibni saqlaydi.

```python
tok.save("tokenizator.json")

with open("tokenizator.json", encoding="utf-8") as f:
    hajm = len(f.read().encode("utf-8"))
print("fayl:", hajm, "bayt")
```

**Natija:**

```
fayl: 304645 bayt
```

Bir necha yuz kilobayt — 16 384 tokenli tokenizator. 5 daqiqalik trening endi
bitta faylda.

### Isbot: aynan oʻshami?

Endi asosiy savol. Uchta tekshiruv — har biri avvalgisidan kuchliroq:

```python
tok2 = yukla("tokenizator.json")

# 1. merges bir xilmi?
print("merges:", tok2.merges == tok.merges)

# 2. butun toza test bir xil kodlanadimi?
test_matn = "\n".join(test_toza)
print("encode:", tok2.encode(test_matn) == tok.encode(test_matn))

# 3. qayta saqlansa — fayl harfma-harf bir xilmi?
tok2.save("tokenizator_2.json")
izlar_fayl = []
for fayl in ["tokenizator.json", "tokenizator_2.json"]:
    with open(fayl, encoding="utf-8") as f:
        izlar_fayl.append(hashlib.md5(f.read().encode("utf-8")).hexdigest())
print("fayl izi:", izlar_fayl[0] == izlar_fayl[1], izlar_fayl[0])
```

**Natija:**

```
merges: True
encode: True
fayl izi: True ec70ecd6094a456ec956989c64a3c4e6
```

- **1-tekshiruv** — lugʻatlar bir xil. Lekin `vocab` ham toʻgʻri qurildimi?
- **2-tekshiruv** — 14 ming jumla, 100 mingga yaqin soʻz — hammasi aynan bir xil
  tokenlarga aylandi. Bu `merges` ni ham, `vocab` ni ham, `encode` ni ham tekshiradi.
- **3-tekshiruv** — **saqla → yukla → yana saqla**: ikki fayl — harfma-harf bir xil
  (Dars 15 dagi barmoq izi). Yuklashda hech narsa yoʻqolmadi, hech narsa qoʻshilmadi.

<!-- animatsiya: p2 | Saqla → yukla → yana saqla -->

Bu izni Dars 17 dagi hisobotga yozsangiz — "men aynan shu tokenizator bilan
oʻlchadim" degan gapning dalili boʻladi.

---

## 6. Haqiqiy tokenizator: `uzbek-bpe-16k`

Endi mening tokenizatorim. U Hugging Face'da `IslombekT/uzbek-bpe-16k` nomi bilan
turibdi, va aynan oʻsha fayl GitHub'da ham bor. Biz GitHub'dan — versiya raqami
bilan (Dars 16) — yuklab olamiz: hisob ham, internet tezligi ham muammo boʻlmaydi.

```python
import os

GITHUB = ("https://raw.githubusercontent.com/TurdiyevIslombek/uzbek-tokenizer/"
          "f34493144a630162d6167aaf99c351bd6931e7ac/")

os.makedirs("uzbek-bpe-16k", exist_ok=True)
for fayl in ["tokenizer.json", "tokenizer_config.json"]:
    urllib.request.urlretrieve(GITHUB + fayl, "uzbek-bpe-16k/" + fayl)

print(sorted(os.listdir("uzbek-bpe-16k")))
```

**Natija:**

```
['tokenizer.json', 'tokenizer_config.json']
```

- `os` — Python'ning fayl va papkalar bilan ishlaydigan moduli.
- `os.makedirs(papka, exist_ok=True)` — papka yaratadi; `exist_ok=True` — "bor boʻlsa,
  xato berma".
- `os.listdir(papka)` — papkadagi fayllar roʻyxati. Uning tartibi kompyuterga qarab
  boshqacha boʻlishi mumkin — shuning uchun `sorted` (Dars 15).

`tokenizer.json` — bizning `tokenizator.json` ning "katta akasi": unda merges ham,
normalizator ham, regex ham — hammasi bor. Bu format **Hugging Face** kutubxonalari
uchun standart.

### `AutoTokenizer`

`transformers` — Hugging Face'ning kutubxonasi. Colab'da u oʻrnatilgan.

```python
from transformers import AutoTokenizer

hf = AutoTokenizer.from_pretrained("uzbek-bpe-16k")
print(len(hf))
```

**Natija:**

```
16384
```

- `AutoTokenizer.from_pretrained(papka)` — papkadagi `tokenizer.json` ni oʻqib,
  tayyor tokenizator qaytaradi. "Auto" — qaysi turdagi tokenizator ekanini faylning
  oʻzidan aniqlaydi.
- Papka oʻrniga `"IslombekT/uzbek-bpe-16k"` yozsangiz, Hugging Face'dan toʻgʻridan-
  toʻgʻri yuklaydi.

16 384 — xuddi biznikidek.

> Eski `transformers` versiyasida bu qator xato berishi mumkin. Unda:
> `from tokenizers import Tokenizer` va
> `Tokenizer.from_file("uzbek-bpe-16k/tokenizer.json")` — natija bir xil.

### Ichiga qaraymiz

```python
jumla = "Oʻzbekiston Respublikasi Prezidenti farmon imzoladi."

ids = hf.encode(jumla, add_special_tokens=False)
print(ids)
print(hf.convert_ids_to_tokens(ids))
print(hf.decode(ids))
```

**Natija:**

```
[1879, 806, 1719, 10031, 13811, 14]
['OÊ»zbekiston', 'ĠRespublikasi', 'ĠPrezidenti', 'Ġfarmon', 'Ġimzoladi', '.']
Oʻzbekiston Respublikasi Prezidenti farmon imzoladi.
```

- `add_special_tokens=False` — maxsus tokenlar (masalan, matn oxiri belgisi) qoʻshma.
  Bizga faqat matnning oʻzi kerak.
- `convert_ids_to_tokens` — har bir tokenning **ichki** yozuvi.

Ikkinchi qatorga qarang: `ĠRespublikasi`, `OÊ»zbekiston`. Tanish koʻrinyaptimi?

`OÊ»zbek` — **Dars 15 dagi mojibake!** `ʻ` ning ikki bayti (202, 187) bitta-bittadan
harf sifatida koʻrsatilgan. Bu yerda bu xato emas: Hugging Face baytli tokenlarni
**ichkarida** shunday yozadi — har bir baytni bitta koʻrinadigan belgi bilan. `Ġ` —
boʻshliq (32-bayt). `decode` esa baytlarni toʻgʻri yigʻadi — uchinchi qatorda matn
toza.

Bizning tokenizatorimiz bilan solishtiring — 4-boʻlimda ham aynan 6 ta token, aynan
shu boʻlaklar edi. Ikki tokenizator turli korpusda, turli dasturda oʻqitilgan — lekin
oʻzbek tilida bir xil soʻzlarni topgan.

### Mening tokenizatorimdagi ikkita xato

Dars 14 da aytgan edim: mening haqiqiy tokenizatorimda ikkita boʻshliq bor. Mana
ular — oʻz koʻzingiz bilan:

```python
for s in ["O\u2018zbekiston", "U 'dunyo' dedi"]:
    a = hf.encode(s, add_special_tokens=False)
    b = tok.encode(s)
    print(repr(s))
    print("   uzbek-bpe-16k:", len(a), hf.convert_ids_to_tokens(a), "->", repr(hf.decode(a)))
    print("   bizniki:      ", len(b), tok.qismlar(s), "->", repr(tok.decode(b)))
```

**Natija:**

```
'O‘zbekiston'
   uzbek-bpe-16k: 3 ['O', 'âĢĺ', 'zbekiston'] -> 'O‘zbekiston'
   bizniki:       1 ['Oʻzbekiston'] -> 'Oʻzbekiston'
"U 'dunyo' dedi"
   uzbek-bpe-16k: 6 ['U', "Ġ'", 'd', 'un', 'yoÊ»', 'Ġdedi'] -> "U 'dunyoʻ dedi"
   bizniki:       6 ['U', ' ', "'", 'dunyo', "'", ' dedi'] -> "U 'dunyo' dedi"
```

1. **`‘` tanilmaydi.** Mening normalizatorim `’`, `` ` `` va `'` ni biladi — lekin
   internetdagi **eng koʻp** uchraydigan `‘` ni emas (Dars 14 senzusi: 34%). Natija —
   Dars 14 dagi devor: `O` | `‘` | `zbekiston`, 3 token.
2. **`'dunyo'` buziladi.** Qoʻshtirnoq ichidagi `dunyo` — `dunyoʻ` boʻlib qoldi.
   Mening qoidam "`o` dan keyingi `'`" ni **har doim** `ʻ` qiladi — Dars 14 dagi
   "keyin harf" sharti yoʻq.

Sizning tokenizatoringizda ikkalasi ham **yoʻq**: Dars 14 da biz aynan shu
xatolarni tuzatgan edik. Talaba ustozidan oʻzdi — kichik joyda, lekin haqiqatan.

---

## 7. Halol solishtiruv

Endi asosiy savol: qaysi biri yaxshiroq?

Dars 17 qoidalari:

1. **Bir xil test** — ikkalasi uchun.
2. **Asl imlo** — har biri oʻz normalizatsiyasini oʻzi qilsin.
3. **Koʻrilmagan matn** — test ikkalasining treningida ham boʻlmasligi kerak.

Uchinchisida bitta halol eʼtiroz bor: bizniki Common Voice'ning **train** qismida
oʻqitilgan — test'ni koʻrmagan. Mening tokenizatorim esa FineWeb-2 da oʻqitilgan.
Common Voice'dagi yangilik sarlavhalari internetda ham bor — demak ulardan baʼzilari
mening treningimga tushgan boʻlishi **mumkin**. Buni tekshira olmaymiz: FineWeb-2
ning 4.45 GB ini bu yerda qidirib boʻlmaydi. Yozib qoʻyamiz va davom etamiz.

```python
def fertility_hf(matn, hf):
    ids = hf.encode(matn, add_special_tokens=False)
    return len(ids) / len(matn.split())


def fertility_tok(matn, tok):
    return len(tok.encode(matn)) / len(matn.split())


print(f"bizniki:        {fertility_tok(test_matn, tok):.3f}")
print(f"uzbek-bpe-16k:  {fertility_hf(test_matn, hf):.3f}")
```

**Natija:**

```
bizniki:        1.800
uzbek-bpe-16k:  2.119
```

**Bizniki yutdi** — va katta farq bilan. Kurs boshida yozgan birinchi qatoringizdan
18 dars oʻtib — mening maqoladagi tokenizatorimni yengdingiz.

Lekin xursand boʻlishdan oldin — Dars 17 savoli: **nima uchun?**

### Sabab №1: `‘`

Test'da `‘` qancha?

```python
print(test_matn.count("\u2018"))
```

**Natija:**

```
9289
```

Common Voice'da `‘` — apostroflarning 61% i (Dars 16 senzusi). Mening tokenizatorim
uni tanimaydi — demak test'ning katta qismida Dars 14 devorlari turibdi.

Buni oʻlchash mumkin. **Faqat tashxis uchun** (sarlavha raqami emas!) — mening
tokenizatorimga sizning normalizatoringizdan oʻtgan matnni beramiz:

```python
print(f"uzbek-bpe-16k, normallashtirilgan matnda: {fertility_hf(normallashtir(test_matn), hf):.3f}")
```

**Natija:**

```
uzbek-bpe-16k, normallashtirilgan matnda: 1.949
```

Farqning katta qismi — bitta belgi: `‘`. (Mashq 5 da buni mening tokenizatorimning
**oʻzida** tuzatasiz.)

### Sabab №2: kimning uyida?

Qolgan farq-chi? Bizniki **Common Voice** jumlalarida oʻqitilgan va Common Voice
jumlalarida oʻlchanmoqda. Bu — uy maydoni. Mening tokenizatorim esa internet
**hujjatlarida** oʻqitilgan: yangiliklar, maqolalar, Vikipediya.

Tekshirish uchun — teskari tajriba: ikkalasi ham **koʻrmagan**, lekin internet
yangiliklariga oʻxshash matn kerak. Bizda bunday matn bor: **Dars 15 dagi oʻquv
korpusi**. U kurs uchun yozilgan — demak hech qanday tokenizatorning treningida
**boʻlishi mumkin emas**.

> Agar `toza_korpus.jsonl` yoʻq boʻlsa — Dars 15 dagi Ilova A va Toʻliq kod
> kataklarini ishga tushiring.

```python
hujjatlar = []
with open("toza_korpus.jsonl", encoding="utf-8") as f:
    for qator in f:
        hujjatlar.append(json.loads(qator)["text"])
yangilik = "\n\n".join(hujjatlar)

print("soʻzlar:", len(yangilik.split()))
print(f"bizniki:        {fertility_tok(yangilik, tok):.3f}")
print(f"uzbek-bpe-16k:  {fertility_hf(yangilik, hf):.3f}")
```

**Natija:**

```
soʻzlar: 607
bizniki:        1.745
uzbek-bpe-16k:  1.643
```

**Natija teskari.** Yangiliklarga oʻxshash matnda mening tokenizatorim yutadi.

(Bu matn kichik — 607 soʻz. Bitta jumla ham natijani biroz siljitadi. Lekin yoʻnalishi
aniq.)

> **"Eng yaxshi tokenizator" degan narsa yoʻq. Faqat "shu matn uchun eng yaxshi"
> bor.** Har bir tokenizator oʻz korpusiga oʻxshash matnda kuchli.

<!-- animatsiya: p3 | Uy maydoni -->

Shuning uchun mening maqoladagi 1.749 ni bizning 1.8 bilan **solishtirmang**: ular
**boshqa matnda** oʻlchangan. Turli test'dagi raqamlar — turli imtihondagi baholar.

---

## 8. Kurs 1 — nima qurdik

18 dars oldin siz `print("Salom")` deb yozgan edingiz. Mana nima qurdingiz:

```
matn
  │  normallashtir        Dars 14  — oʻ besh xil yozilsa ham, bitta
  ▼
boʻlaklar               Dars 13  — regex: soʻz chegarasidan oʻtilmaydi
  │
  ▼
baytlar                 Dars 05–07 — har qanday belgi, hech qanday "notanish" yoʻq
  │  BPE (merges)        Dars 08–12 — eng koʻp juft → yangi token
  ▼
tokenlar  →  decode  →  matn         Dars 11
```

Va bu zanjir atrofida:

- **maʼlumot** — qayerdan, qaysi litsenziya bilan, qanday tozalanadi (Dars 15);
- **tezlik** — 17 soatlik trening 5 daqiqada (Dars 16);
- **halollik** — boʻlish, ifloslanish, imlo, hisobot (Dars 17);
- **bitta klass**, saqlash va isbot (Dars 18).

Kurs boshidagi savol: "nega oʻzbek tili AI uchun qimmat?" Endi javobni **raqamda**
bilasiz — va uni qanday kamaytirishni **qoʻlingiz bilan** qila olasiz.

---

## 9. Muammo

Tokenizator matnni raqamlarga aylantiradi. Lekin raqamlar hech narsani
**tushunmaydi**. `[537, 3252, 2798]` — bu "Oʻzbekiston Respublikasi Prezidenti"
ekanini biz bilamiz, kompyuter esa — yoʻq.

Keyingi tokenni **taxmin qiladigan** narsa kerak. Shu raqamlarni oʻqib, "keyin nima
keladi?" degan savolga javob beradigan narsa.

**Endi tokenlar bor. Ularni oʻqiydigan model qurish kerak.**

---

## 10. Toʻliq kod — `tokenizator.py`

Kurs 1 ning butun natijasi — bitta fayl. Uni `tokenizator.py` deb saqlang.

```python
import re
import json
import hashlib
import unicodedata

NAQSH = r" ?\w+| ?[^\s\w]+|\s+"
OKINA = "\u02bb"
TUTUQ = "\u02bc"
APOSTROFLAR = "'\u2018\u2019`\u02bb\u02bc"


def normallashtir(matn):
    matn = unicodedata.normalize("NFC", matn)
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


def eng_juft(stats):
    eng_son = max(stats.values())
    nomzodlar = []
    for juft in stats:
        if stats[juft] == eng_son:
            nomzodlar.append(juft)
    return min(nomzodlar)


class Tokenizator:
    def __init__(self):
        self.merges = {}
        self.vocab = {}
        for i in range(256):
            self.vocab[i] = bytes([i])
        self.kesh = {}

    def train(self, matn, vocab_size):
        hisob = {}
        for b in re.findall(NAQSH, normallashtir(matn)):
            hisob[b] = hisob.get(b, 0) + 1
        sozlar = []
        sonlar = []
        for b in hisob:
            sozlar.append(list(b.encode("utf-8")))
            sonlar.append(hisob[b])

        stats = {}
        qayerda = {}
        for i in range(len(sozlar)):
            soz = sozlar[i]
            for juft in zip(soz, soz[1:]):
                stats[juft] = stats.get(juft, 0) + sonlar[i]
                if juft not in qayerda:
                    qayerda[juft] = set()
                qayerda[juft].add(i)

        for yangi_id in range(256, vocab_size):
            if len(stats) == 0:
                break
            eng = eng_juft(stats)
            for i in qayerda[eng]:
                eski = sozlar[i]
                yangi = merge(eski, eng, yangi_id)
                if len(yangi) == len(eski):
                    continue
                for j in zip(eski, eski[1:]):
                    stats[j] -= sonlar[i]
                    if stats[j] == 0:
                        del stats[j]
                for j in zip(yangi, yangi[1:]):
                    stats[j] = stats.get(j, 0) + sonlar[i]
                    if j not in qayerda:
                        qayerda[j] = set()
                    qayerda[j].add(i)
                sozlar[i] = yangi
            del qayerda[eng]
            self.merges[eng] = yangi_id
            self.vocab[yangi_id] = self.vocab[eng[0]] + self.vocab[eng[1]]
        self.kesh = {}

    def _bolakni_kodla(self, bosh):
        tk = list(bosh.encode("utf-8"))
        while len(tk) >= 2:
            eng_j = None
            eng_r = float("inf")
            for j in zip(tk, tk[1:]):
                r = self.merges.get(j, float("inf"))
                if r < eng_r:
                    eng_r = r
                    eng_j = j
            if eng_j is None:
                break
            tk = merge(tk, eng_j, self.merges[eng_j])
        return tk

    def encode(self, matn):
        natija = []
        for bosh in re.findall(NAQSH, normallashtir(matn)):
            if bosh not in self.kesh:
                self.kesh[bosh] = self._bolakni_kodla(bosh)
            natija.extend(self.kesh[bosh])
        return natija

    def decode(self, ids):
        qismlar = []
        for tid in ids:
            qismlar.append(self.vocab[tid])
        return b"".join(qismlar).decode("utf-8", errors="replace")

    def qismlar(self, matn):
        natija = []
        for tid in self.encode(matn):
            natija.append(self.decode([tid]))
        return natija

    def save(self, fayl):
        royxat = []
        for juft in self.merges:
            royxat.append([juft[0], juft[1], self.merges[juft]])
        malumot = {"versiya": 1, "naqsh": NAQSH, "merges": royxat}
        with open(fayl, "w", encoding="utf-8") as f:
            f.write(json.dumps(malumot))


def yukla(fayl):
    with open(fayl, encoding="utf-8") as f:
        malumot = json.loads(f.read())
    if malumot["naqsh"] != NAQSH:
        print("DIQQAT: fayldagi naqsh boshqa!")
    yangi = Tokenizator()
    for a, b, tid in malumot["merges"]:
        yangi.merges[(a, b)] = tid
        yangi.vocab[tid] = yangi.vocab[a] + yangi.vocab[b]
    return yangi


# ---- Ishlatish ----
# Oʻqitish (bir marta, bir necha daqiqa):
#     tok = Tokenizator()
#     tok.train(open("train.txt", encoding="utf-8").read(), 16384)
#     tok.save("tokenizator.json")

tok = yukla("tokenizator.json")
jumla = "O‘zbekiston Respublikasi Prezidenti farmon imzoladi."
print(tok.qismlar(jumla))
print(tok.decode(tok.encode(jumla)))
```

**Kutilgan natija:**

```
['Oʻzbekiston', ' Respublikasi', ' Prezidenti', ' farmon', ' imzoladi', '.']
Oʻzbekiston Respublikasi Prezidenti farmon imzoladi.
```

Bir nechta oʻzgarish, 4-boʻlimdagi klassga nisbatan:

- `train` endi **oʻzi** hamma ishni qiladi (Dars 16 dagi `train_tez2` ning ichi) —
  fayl boshqa funksiyalarga bogʻliq emas.
- `_bolakni_kodla` — Dars 12 dagi `encode` ning bitta boʻlak uchun qismi. Nom oldidagi
  `_` — "bu ichki metod, tashqaridan chaqirmang" degan kelishuv. Python buni taqiqlamaydi,
  faqat ishora qiladi. U Dars 12 dagidan biroz qisqa: juftlarni sanash shart emas —
  bizga faqat **qaysi juftlar borligi** va ularning darajasi kerak.
- `save` — klassning ichida.

Tokenizator fayldan bir zumda yuklandi. 5 daqiqalik trening shart emas.

---

## 11. Oʻzingiz yozing

`save` va `yukla` ni toʻldiring:

```python
def save(self, fayl):
    royxat = []
    for juft in self.___:
        royxat.append([juft[___], juft[___], self.merges[___]])
    malumot = {"versiya": 1, "naqsh": ___, "merges": royxat}
    with open(fayl, "___", encoding="utf-8") as f:
        f.write(json.___(malumot))


def yukla(fayl):
    with open(fayl, encoding="utf-8") as f:
        malumot = json.___(f.read())
    yangi = ___()
    for a, b, tid in malumot["___"]:
        yangi.merges[(a, b)] = ___
        yangi.vocab[tid] = yangi.vocab[___] + yangi.vocab[___]
    return ___
```

<details>
<summary>Yechimni koʻrsatish</summary>

```python
def save(self, fayl):
    royxat = []
    for juft in self.merges:
        royxat.append([juft[0], juft[1], self.merges[juft]])
    malumot = {"versiya": 1, "naqsh": NAQSH, "merges": royxat}
    with open(fayl, "w", encoding="utf-8") as f:
        f.write(json.dumps(malumot))


def yukla(fayl):
    with open(fayl, encoding="utf-8") as f:
        malumot = json.loads(f.read())
    yangi = Tokenizator()
    for a, b, tid in malumot["merges"]:
        yangi.merges[(a, b)] = tid
        yangi.vocab[tid] = yangi.vocab[a] + yangi.vocab[b]
    return yangi


Tokenizator.save = save
tok_t = yukla("tokenizator.json")
print(tok_t.encode("Salom, dunyo!") == tok.encode("Salom, dunyo!"))
```

```
True
```

Eng koʻp qilinadigan xatolar:

1. `yangi.merges[a, b] = tid` oʻrniga `yangi.merges[[a, b]] = tid` — roʻyxat lugʻat
   kaliti boʻla olmaydi: `TypeError: unhashable type: 'list'`. JSON kortejni roʻyxat
   qilib qaytaradi — uni yana kortejga aylantirish kerak: `(a, b)`.
2. `vocab` ni qayta qurishni unutish — `encode` ishlaydi (u faqat `merges` dan
   foydalanadi), lekin `decode` `KeyError` beradi. Yarim ishlaydigan tokenizator —
   eng xavflisi: 5-boʻlimdagi 2-tekshiruv uni ushlaydi, 1-tekshiruv — yoʻq.
3. `"w"` oʻrniga `"a"` (qoʻshish rejimi) — fayl oxiriga ikkinchi JSON yoziladi va
   `json.loads` xato beradi.
</details>

---

## 12. Mashqlar

---

**Mashq 1.** Ishga tushirmasdan ayting: nima chop etiladi?

```
s = Sanagich()
t = s
t.qosh()
t.qosh()
print(s.son)
```

<details>
<summary>Javobni koʻrsatish</summary>

```python
s = Sanagich()
t = s
t.qosh()
t.qosh()
print(s.son)
```

```
2
```

**2**, nol emas. `t = s` — **yangi nusxa yasamaydi**. `t` va `s` — bitta sanagichning
ikki nomi. Yangi nusxa faqat `Sanagich()` — qavs bilan — yasaladi.

Dars 17 dagi `list(korpus)` ni eslang — aynan shu sabab: `aralash = korpus` deb
yozsangiz, `shuffle` `korpus` ning oʻzini aralashtirardi.
</details>

---

**Mashq 2.** `Tokenizator` ga `siqish(matn)` metodini qoʻshing: matnning **bayt**
soni / **token** soni (bitta token oʻrtacha necha baytni bosadi). Uni ikkala
tokenizator uchun test'da hisoblang.

<details>
<summary>Javobni koʻrsatish</summary>

```python
def siqish(self, matn):
    return len(normallashtir(matn).encode("utf-8")) / len(self.encode(matn))


Tokenizator.siqish = siqish

print(f"bizniki:       {tok.siqish(test_matn):.3f} bayt/token")
hf_ids = hf.encode(test_matn, add_special_tokens=False)
print(f"uzbek-bpe-16k: {len(test_matn.encode('utf-8')) / len(hf_ids):.3f} bayt/token")
```

```
bizniki:       4.539 bayt/token
uzbek-bpe-16k: 3.903 bayt/token
```

Bu — maqolalardagi ikkinchi koʻrsatkich (*bytes per token*). Fertility "soʻzga
nechta token" deydi, bu esa "tokenga necha bayt". Biri kattaroq — yaxshi, ikkinchisi
kichikroq — yaxshi.

Eʼtibor bering: bizniki baytni **normallashtirilgan** matndan sanaydi. `ʻ` 2 bayt,
`'` 1 bayt — demak normalizatsiya matnni biroz **uzaytiradi**. Bu kichik farq —
lekin halol solishtiruvda uni ham bilish kerak. Fertility esa soʻzlarni sanaydi va bu
muammodan holi — shuning uchun bu kursda asosiy oʻlchov — fertility.
</details>

---

**Mashq 3.** Saqlangan fayldagi **bitta** birlashtirishni oʻzgartiring (masalan,
1000-sining raqamlarini almashtiring) va yuklang. 5-boʻlimdagi uchta tekshiruvdan
qaysilari buni ushlaydi?

<details>
<summary>Javobni koʻrsatish</summary>

```python
with open("tokenizator.json", encoding="utf-8") as f:
    malumot = json.loads(f.read())

a, b, tid = malumot["merges"][1000]
malumot["merges"][1000] = [b, a, tid]

with open("buzuq.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(malumot))

tok3 = yukla("buzuq.json")
print("merges:", tok3.merges == tok.merges)
print("encode:", tok3.encode(test_matn) == tok.encode(test_matn))
print("decode:", tok3.decode(tok3.encode(test_matn)) == normallashtir(test_matn))
```

```
merges: False
encode: False
decode: True
```

16 128 tadan **bitta** birlashtirish oʻzgardi — va `merges` ham, `encode` ham buni
darhol koʻrsatdi.

Lekin oxirgi qatorga qarang: **round-trip** (Dars 11) baribir `True`! Buzuq
tokenizator matnni baribir toʻgʻri qaytaradi — chunki `vocab` ham "buzuq" tartibda
qurildi va har bir token oʻzining (notoʻgʻri) baytlariga toʻgʻri qaytadi. Round-trip
— tokenizator **ishlashini** tekshiradi, u **aynan oʻsha** ekanini emas.

> "Ishlaydi" va "aynan oʻsha" — ikki xil savol. Ikkinchisi uchun — barmoq izi va
> natijalarni solishtirish.
</details>

---

**Mashq 4.** Mening tokenizatorimda maxsus token bor: `<|endoftext|>`. Uni kodlab
koʻring — ikkala tokenizatorda. Farq nima, va nima uchun model uchun bunday token
kerak?

<details>
<summary>Javobni koʻrsatish</summary>

```python
belgi = "<|endoftext|>"

print("uzbek-bpe-16k:", hf.encode(belgi, add_special_tokens=False))
print("bizniki:      ", tok.encode(belgi))
print(tok.qismlar(belgi))
```

```
uzbek-bpe-16k: [0]
bizniki:       [60, 124, 325, 100, 611, 116, 2688, 116, 124, 62]
['<', '|', 'en', 'd', 'of', 't', 'ex', 't', '|', '>']
```

Mening tokenizatorimda u — **bitta** token, raqami 0. Biznikida — **10 ta** oddiy
boʻlak: `<`, `|`, `en`, `d`, `of`… — chunki biz bunday tokenni hech qachon
qoʻshmaganmiz, va bu belgilar oʻzbekcha jumlalarda deyarli uchramaydi.

Nima uchun kerak? Model oʻqiganda hujjatlar ketma-ket tizilgan boʻladi: maqola, keyin
boshqa maqola, keyin yana. Model **qayerda bitta matn tugab, boshqasi boshlanganini**
bilishi kerak — aks holda u metro haqidagi maqoladan keyin palov retsepti kelishini
"oʻrganib" oladi. `<|endoftext|>` — shu chegara.

Bu Kurs 2 ning birinchi qadamlaridan biri.
</details>

---

**Mashq 5 (eng muhimi).** 7-boʻlimda mening tokenizatorim `‘` tufayli yutqazdi.
Uni **qayta oʻqitmasdan** tuzating. `hf.backend_tokenizer.normalizer` — uning
normalizatori. Dars 14 dagi qoidalarni Hugging Face normalizatori qilib yozing va
oʻrniga qoʻying. Keyin fertility ni qayta oʻlchang va `'dunyo'` ni tekshiring.

<details>
<summary>Javobni koʻrsatish</summary>

Avval — hozirgi normalizator nima qiladi:

```python
misol = "O\u2018zbekiston o\u2019qish g`alaba U 'dunyo' dedi ma'no"
print(hf.backend_tokenizer.normalizer.normalize_str(misol))
```

```
O‘zbekiston oʻqish gʻalaba U 'dunyoʻ dedi maʼno
```

`‘` — oʻzgarmadi. `'dunyo'` — `'dunyoʻ` boʻldi. Endi Dars 14 qoidalari bilan yangi
normalizator:

```python
from tokenizers import normalizers, Regex

yangi_norm = normalizers.Sequence([
    normalizers.Replace("\u2018", "'"),
    normalizers.Replace("\u2019", "'"),
    normalizers.Replace("`", "'"),
    normalizers.Replace("g'", "g\u02bb"),
    normalizers.Replace("G'", "G\u02bb"),
    normalizers.Replace(Regex("o'(?=\\p{L})"), "o\u02bb"),
    normalizers.Replace(Regex("O'(?=\\p{L})"), "O\u02bb"),
    normalizers.Replace(Regex("(?<=\\p{L})'(?=\\p{L})"), "\u02bc"),
])

hf.backend_tokenizer.normalizer = yangi_norm
print(hf.backend_tokenizer.normalizer.normalize_str(misol))
print(f"uzbek-bpe-16k (tuzatilgan): {fertility_hf(test_matn, hf):.3f}")
```

```
Oʻzbekiston oʻqish gʻalaba U 'dunyo' dedi maʼno
uzbek-bpe-16k (tuzatilgan): 1.951
```

Qator-qator:

- `normalizers.Sequence([...])` — normalizatorlar zanjiri, tartib bilan (Dars 14:
  tartib muhim!).
- Birinchi uchta qator — hamma variantlarni bitta `'` ga yigʻadi. **`‘` — yangi.**
- `g'` → `gʻ` — **har doim** (Dars 14, 1-qoida).
- `Regex("o'(?=\\p{L})")` — `o'`, faqat **keyin harf** kelsa. `(?=...)` — "oldinda
  shu boʻlsin, lekin uni olma". Bu — Dars 14 dagi `keyingi.isalpha()` sharti.
  `'dunyo'` endi buzilmaydi.
- Oxirgisi — ikki harf orasidagi `'` → tutuq `ʼ` (3-qoida). `(?<=\\p{L})` —
  "orqada harf boʻlsin".

**Natija:** fertility 2.119 dan **1.951** ga tushdi va `'dunyo'` tuzaldi. Tokenizatorning **bitta
ham** birlashtirishi oʻzgarmadi — faqat uning oldidagi qoidalar.

Dars 14 dagi xulosa: **normalizatsiya — eng arzon richag.** Bu safar siz uni boshqa
odamning — kurs muallifining — tokenizatoriga qoʻlladingiz.

<!-- animatsiya: p4 | Qayta oʻqitmasdan -->

Ushbu tuzatish xotirada: `hf` ni qayta yuklasangiz, eski normalizator qaytadi.
Saqlash uchun — `hf.save_pretrained("uzbek-bpe-16k-tuzatilgan")`.
</details>

---

## 13. Xulosa

1. **Klass** — qolip. **Obyekt** — undan yasalgan nusxa. `self` — "men oʻzim".
   `__init__` — yaratilganda ishlaydi.
2. Har bir metodning birinchi parametri — `self`. Unutsangiz —
   `takes 0 positional arguments but 1 was given`.
3. `Tokenizator` — 7 ta tarqoq narsa bitta joyda. Normalizatsiyani endi unutib
   boʻlmaydi.
4. JSON kortej kalitni saqlay olmaydi — `[a, b, id]` roʻyxati. **Naqsh** va
   **versiya** ham faylga yoziladi.
5. Isbot: **saqla → yukla → yana saqla** — fayl izi bir xil; butun test bir xil
   kodlanadi. Round-trip — yetarli emas (Mashq 3).
6. `AutoTokenizer.from_pretrained` — Hugging Face formatidagi tokenizatorni yuklaydi.
   `Ġ` va `Ê»` — ichki baytli yozuv, xato emas.
7. `uzbek-bpe-16k` da ikki xato bor: `‘` tanilmaydi, `'dunyo'` buziladi. Ikkalasi
   ham normalizatorni almashtirish bilan, **qayta oʻqitmasdan** tuzaladi.
8. Common Voice test'da — bizniki yutadi; yangiliklarga oʻxshash matnda — meniki.
   **"Eng yaxshi tokenizator" yoʻq — faqat "shu matn uchun eng yaxshi" bor.**
9. Turli test'dagi raqamlarni solishtirmang.

---

## Keyingi qadam — Kurs 2

**Kurs 2 — Til modeli.** Tokenlarni oʻqib, keyingi tokenni taxmin qiladigan model:
eng oddiy hisoblagichdan boshlab, oʻz GPT ingizgacha — xuddi shu `tokenizator.py`
ustida.

Kurs 2 ning birinchi savoli: *agar faqat oldingi **bitta** tokenga qarab keyingisini
taxmin qilsak — bu qanchalik yomon ishlaydi?*
