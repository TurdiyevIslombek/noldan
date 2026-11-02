# Dars 17 — Halol baholash: ifloslanish

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 16 — Haqiqiy matnda trening
> **Vaqt:** ~80 daqiqa (+ ~10 daqiqa ikki treningni kutish)
> **Kerak:** Dars 01–16. `train_tez2`, `encode_tez`, `boshlar_sana`, `eng_juft` (Dars 16), `normallashtir` (Dars 14), `ngrammalar`, `kalit` (Dars 15)

---

## Bu darsdan keyin siz...

- **tushunasiz** nima uchun oʻqitgan matningizda oʻlchangan raqam ishonchsiz;
- **boʻlasiz** korpusni `train` va `test` ga — toʻgʻri vaqtda va toʻgʻri usulda;
- **koʻrasiz** alifbo tartibidagi korpusni "oxirgi 10%" deb boʻlish nimaga olib kelishini;
- **tekshirasiz** test matnini trening ichidan qidirib — va bu tekshiruv qachon aldashini;
- **oʻlchaysiz** test matnining **imlosi** solishtiruvni qanday oʻzgartirishini;
- **yozasiz** boshqalar (va olti oydan keyin oʻzingiz) tekshira oladigan hisobot.

---

## 1. Bitta savol

Dars 16 oxirida savol qoldirgan edim:

> Agar tokenizatorni oʻqitgan matnimizda emas, boshqa matnda oʻlchasak, fertility
> yaxshilanadimi yoki yomonlashadimi — va qanchaga?

Bu darsda unga javob beramiz. Lekin avval — nima uchun bu savol men uchun shaxsiy.

---

## 2. Mening xatoyim

Men oʻzbek tili uchun tokenizator va kichkina til modeli qurdim, keyin ularni
boshqalari bilan solishtirdim: GPT-4o, mGPT, XLM-R va boshqalar. Raqamlarni oʻlchadim,
jadvallar tuzdim, maqola yozdim.

Keyin, butunlay boshqa narsani tuzatayotib, oʻzimga oddiy savol berdim: **mening
test matnim haqiqatan "koʻrilmagan"mi?**

Javob — yoʻq. Va bitta xato emas, uchta.

### 1-xato: test — trening matnining boshi

Test toʻplamini korpusning **birinchi 200 000 soʻzidan** olgan edim. Lekin korpus
trening va validatsiyaga **joylashuv boʻyicha** boʻlingan edi: birinchi 90% —
trening. Demak mening "testim" — trening matnining **boshi** edi.

Tekshirdim: testdan 32 tokenli 12 ta parcha olib, trening faylidan qidirdim. **12
tadan 11 tasi** u yerda bor edi — xuddi oʻsha joylarda. Model imtihon savollarini
oldindan koʻrgan edi.

<!-- animatsiya: p1 | 12 tadan 11 tasi -->

### 2-xato: internet oʻzini takrorlaydi

Testni validatsiya qismidan oldim. Endi toza boʻlishi kerak edi. Lekin 16 ta
parchadan **6 tasi** baribir trening ichida topildi — har xil joylarda. Sababi —
Dars 15 da koʻrganimiz: internetda bir xil sahifa koʻp marta uchraydi.

Shunda trening matnining **har bir 24 tokenli oynasiga** barmoq izi yasadim — 27.4
million iz. Validatsiya hujjatlarini birma-bir tekshirdim: bitta ham umumiy izi
boʻlsa — tashladim. **780 hujjatdan 306 tasi — 39.2% — tashlandi.** 474 tasi qoldi.

Va mustaqil tekshiruv: qolgan hujjatlardan 16 ta parcha — trening ichida **bittasi
ham** topilmadi.

### 3-xato: test matni mening imlomda edi

Dars 14 da "bu xatoni men oʻzim qilganman" degan edim. Mana u.

Validatsiya fayli matnni **mening normalizatorimdan oʻtgan** holda saqlagan edi. Demak
test hujjatlaridagi hamma apostroflar — mening tokenizatorim yaxshi koʻradigan
shaklda. Boshqa tokenizatorlar esa internetdagi imloda oʻrgangan.

Haqiqiy internet nusxasini FineWeb-2 dan tikladim. U 474 hujjatda `oʻ` va `gʻ`
dagi belgilar mana bunday yozilgan ekan:

| Belgi | Ulushi |
|---|---|
| `'` | 70% |
| `‘` | 19% |
| `’` | 6% |
| `ʻ` (toʻgʻri) | **5%** |

Mening testimda esa — 100% `ʻ`. Uy maydonida oʻynagan ekanman.

### Natija

Hammasini toza test matnida, asl internet imlosida qayta oʻlchadim. Mana
tokenizatorlar jadvali — 474 hujjat, 200 818 soʻz:

| Tokenizator | Lugʻat | Fertility ↓ |
|---|---|---|
| **uzbek-bpe-16k** (meniki) | 16 384 | **1.749** |
| XLM-RoBERTa | 250 002 | 2.218 |
| GPT-4o | 200 019 | 2.578 |
| mGPT | 100 000 | 3.159 |
| GPT-2 | 50 257 | 3.426 |

Tartib oʻzgarmadi. Lekin endi **bu raqamlarga ishonsa boʻladi**.

Eng katta zarba esa modelga tushdi. mGPT modelini oʻzbek matnida qoʻshimcha oʻqitish
(*fine-tuning*) eski, ifloslangan testda **katta foyda** bergandek koʻringan edi. Toza
testda — **deyarli hech qanday**: 0.041 dan 0.003 ga tushdi. Chunki uning oʻqitish
matni ham eski test bilan ustma-ust tushgan ekan. Bu raqamlar nimani anglatishini
Kurs 2 da koʻrasiz. Hozircha muhimi: **xulosam notoʻgʻri edi**, va buni hech kim
sezmasdi.

Bu darsda uchala xatoni **oʻz kompyuteringizda** qaytarasiz — va har birini tuzatasiz.

---

## 3. Qoida

> **Tokenizatorni (yoki modelni) oʻqitgan matningizda baholasangiz, olgan
> raqamingiz yolgʻon boʻladi.**

Toʻgʻri tartib:

```
tozalash  →  boʻlish  →  oʻqitish (faqat train)  →  baholash (faqat test)
```

Test — **muhrlangan konvert**. Uni boʻlgandan keyin oʻqitishda ham, sozlashda ham
ishlatmaysiz. Faqat oxirida, bir marta — oʻlchash uchun.

Dars 16 da biz bu qoidani buzdik: tokenizatorni **butun** korpusda oʻqitdik va
fertility ni oʻsha korpusda oʻlchadik. Konvert ochilgan edi. Endi boshidan
boshlaymiz — toʻgʻri tartibda.

<!-- animatsiya: p2 | Muhrlangan konvert -->

---

## 4. Tayyorgarlik

Dars 16 dagi funksiyalar va tozalangan korpus kerak. Agar Colab sessiyangiz yangi
boʻlsa — quyidagi katakni ishga tushiring: u funksiyalarni yaratadi va korpusni
qaytadan yuklab, tozalaydi.

<details>
<summary>Dars 14–16 dagi kod (ochib, nusxa qiling)</summary>

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

Korpusni oʻqiymiz:

```python
with open("korpus.txt", encoding="utf-8") as f:
    korpus = f.read().split("\n")

print("jumlalar:", len(korpus))
```

**Natija:**

```
jumlalar: 148102
```

Bitta yangi funksiya kerak — fertility ni oʻlchaydigan:

```python
def fertility(jumlalar, merges):
    matn = normallashtir("\n".join(jumlalar))
    tokenlar = encode_tez(matn, merges, NAQSH)
    return len(tokenlar) / len(matn.split())
```

Dars 16 dagi hisob — faqat funksiyaga oʻralgan: jumlalarni birlashtirib,
normallashtirib, kodlaydi va **token / soʻz** ni qaytaradi.

---

## 5. Qanday boʻlish kerak?

### Birinchi urinish: joylashuv boʻyicha

Eng oddiy gʻoya — mening 1-xatoyimga olib kelgan gʻoya: birinchi 90% — train,
oxirgi 10% — test.

```python
chegara = int(len(korpus) * 0.9)

train_joy = korpus[:chegara]
test_joy = korpus[chegara:]

print("train:", len(train_joy), "| test:", len(test_joy))
print("test boshi:", repr(test_joy[0][:45]))
print("test oxiri:", repr(test_joy[-1][:45]))
```

**Natija:**

```
train: 133291 | test: 14811
test boshi: '— Asfalosofilinda turkiy tuzemetslar uchun ta'
test oxiri: '\uf0d8 yagona interaktiv davlat xizmatlari portali'
```

- `int(...)` — sonning **butun** qismi: `int(13329.8)` → `13329`. Roʻyxat indeksi
  kasr boʻla olmaydi.

Test `—` bilan boshlanadi. Nima uchun? Dars 16 ni eslang: korpus **alifbo
tartibida**. Oxirgi 10% — alifbodan keyin keladigan belgilar bilan boshlangan
jumlalar. Test qismidagi jumlalar qaysi belgi bilan boshlanadi — sanaymiz:

```python
boshlar = {}
for j in test_joy:
    boshlar[j[0]] = boshlar.get(j[0], 0) + 1

for b in sorted(boshlar, key=boshlar.get, reverse=True)[:5]:
    print(repr(b), boshlar[b])
```

**Natija:**

```
'•' 7908
'—' 5357
'“' 1491
'…' 37
'„' 5
```

Test qismi — deyarli butunlay **maqollar** (`•` bilan boshlangan roʻyxat) va
**dialoglar** (`—`). Train qismida esa maqollar umuman yoʻq — hammasi oxiriga
tushgan. Biz tokenizatorni yangiliklar va hikoyalarda oʻqitib, maqollarda
imtihon olgan boʻlardik.

Bu ifloslanish emas — buning teskarisi. Lekin xulosa bir xil: **raqam yolgʻon**.
Faqat bu safar u qaysi tomonga yolgʻon gapirishini bilmaymiz.

Mening holatimda yana yomonroq boʻlgan: test **boshidan** olingan, trening ham
**boshidan**. Ikkalasi ustma-ust tushgan.

> **Fayl tartibiga hech qachon ishonmang.** Alifbo, sana, sayt — har qanday tartib
> boʻlishi mumkin. Boʻlishdan oldin — aralashtiring.

### `random` — tasodifiy aralashtirish

Python'da tasodif bilan ishlaydigan modul — `random`:

```python
import random

random.seed(42)
sonlar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
random.shuffle(sonlar)
print(sonlar)
```

**Natija:**

```
[8, 4, 3, 9, 6, 7, 10, 5, 1, 2]
```

- `random.shuffle(roʻyxat)` — roʻyxatni **joyida** aralashtiradi (yangi roʻyxat
  qaytarmaydi).
- `random.seed(42)` — tasodifning **urugʻi**. Kompyuterning "tasodifi" aslida
  formula: bir xil urugʻdan — har doim bir xil ketma-ketlik.

Tekshiramiz — oʻsha urugʻ, oʻsha natija:

```python
random.seed(42)
sonlar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
random.shuffle(sonlar)
print(sonlar)
```

**Natija:**

```
[8, 4, 3, 9, 6, 7, 10, 5, 1, 2]
```

Aynan bir xil. Nima uchun bu muhim? Chunki boʻlinishni **yozib qoʻyishimiz** kerak.
"Tasodifiy boʻldim" — tekshirib boʻlmaydigan gap. "`random.seed(0)` bilan
aralashtirib, 90/10 boʻldim" — har kim qaytara oladigan gap.

Uchinchi funksiya — `random.sample`: roʻyxatdan tasodifiy bir nechtasini oladi
(roʻyxatning oʻziga tegmaydi):

```python
random.seed(7)
print(random.sample(["olma", "nok", "uzum", "anor", "behi"], 2))
```

**Natija:**

```
['uzum', 'nok']
```

### Toʻgʻri boʻlish

```python
aralash = list(korpus)
random.seed(0)
random.shuffle(aralash)

train = aralash[:chegara]
test = aralash[chegara:]

print("train:", len(train), "| test:", len(test))
print("test boshi:", repr(test[0][:45]))

boshlar = {}
for j in test:
    boshlar[j[0]] = boshlar.get(j[0], 0) + 1
for b in sorted(boshlar, key=boshlar.get, reverse=True)[:5]:
    print(repr(b), boshlar[b])
```

**Natija:**

```
train: 133291 | test: 14811
test boshi: 'Jahonga sochilgan durdonalar'
'B' 1530
'S' 1138
'O' 1027
'A' 797
'M' 790
```

- `list(korpus)` — roʻyxatning **nusxasi**. `random.shuffle` roʻyxatni joyida
  oʻzgartiradi; nusxa olmasak, `korpus` ning oʻzi aralashib ketardi.

Endi test qismi — korpusning kichik nusxasi: `B`, `S`, `O` bilan boshlangan oddiy
jumlalar koʻp, maqollar va dialoglar esa oʻz ulushida.

Ikkala qismni faylga yozamiz:

```python
with open("train.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(train))
with open("test.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(test))

print("saqlandi")
```

**Natija:**

```
saqlandi
```

**`test.txt` — muhrlangan konvert.** Uni 8-boʻlimgacha ochmaymiz.

---

## 6. Oʻqitamiz — faqat train'da

> Bu katak Dars 16 dagidek bir necha daqiqa ishlaydi.

```python
t0 = time.perf_counter()
merges, vocab, tarix = train_tez2(normallashtir("\n".join(train)), 16384, NAQSH)
print(f"vaqt: {(time.perf_counter() - t0) / 60:.1f} daqiqa")
```

**Natija:**

```
vaqt: 4.7 daqiqa
```

Tokenizator `test` dagi **bitta ham** jumlani koʻrmadi.

---

## 7. Jonli namoyish: koʻrgan va koʻrmagan matn

Endi Dars 16 dagi savolga javob. Bitta tokenizator — ikki xil matnda:

```python
f_train = fertility(train, merges)
f_test = fertility(test, merges)

print(f"oʻqitgan matnida (train): {f_train:.3f}")
print(f"koʻrmagan matnida (test): {f_test:.3f}")
print(f"farq: {(f_test - f_train) / f_train:.1%}")
```

**Natija:**

```
oʻqitgan matnida (train): 1.781
koʻrmagan matnida (test): 1.798
farq: 1.0%
```

**Koʻrmagan matnda — yomonroq.** Dars 16 dagi savolning javobi: yomonlashadi.

Va halol aytaman: farq **kichik** — 1% atrofida. Nega bunchalik kichik? Chunki bir
million soʻzlik korpusda tokenizator asosan **umumiy** boʻlaklarni oʻrganadi —
`lar`, `ning`, ` bilan` — ular har qanday matnda bor. Yodlangan narsalar
(`Oʻzsanoatqurilishbank`) — lugʻatning kichik qismi.

### Farq qachon katta boʻladi?

Dars 10 ni eslang: **kichik matn + katta lugʻat = yodlash**. Sinab koʻramiz —
faqat 5 000 ta jumlada, 4 096 hajmli lugʻat bilan:

```python
kichik = train[:5000]
m_kichik, _, _ = train_tez2(normallashtir("\n".join(kichik)), 4096, NAQSH)

f1 = fertility(kichik, m_kichik)
f2 = fertility(test, m_kichik)
print(f"oʻqitgan matnida: {f1:.3f}")
print(f"koʻrmagan matnida: {f2:.3f}")
print(f"farq: {(f2 - f1) / f1:.1%}")
```

**Natija:**

```
oʻqitgan matnida: 2.230
koʻrmagan matnida: 2.342
farq: 5.0%
```

Farq **besh barobar** kattalashdi. Kichik korpusda tokenizator matnning oʻziga xos
soʻzlarini yodlaydi — va ular test'da yoʻq.

Uchta xulosa:

1. **Yoʻnalish doim bir xil.** Oʻqitgan matningizdagi raqam — har doim sizning
   foydangizga yolgʻon.
2. **Hajmi — oldindan nomaʼlum.** Bizning katta korpusda 1%, kichigida 5%. Uni
   bilishning yagona yoʻli — **oʻlchash**.
3. **Modellar uchun yolgʻon ancha katta.** Tokenizator faqat boʻlaklarni yodlaydi.
   Model esa **butun jumlalarni** yodlay oladi. 2-boʻlimdagi 0.041 → 0.003 — aynan
   shuning natijasi.

---

## 8. Yashirin ifloslanish: dublikatlar

Esingizdami, Dars 15 da dublikatlarni nega bunchalik sinchiklab olib tashlaganimizni
"Dars 17 da bilasiz" degan edim? Mana sababi.

Agar bitta jumla korpusda **ikki marta** boʻlsa, tasodifiy boʻlishda ulardan biri
train'ga, ikkinchisi test'ga tushishi mumkin. Shunda test'dagi jumla — aslida
trening matni. Konvert muhrlangan, lekin ichidagi xat — nusxa.

Dars 16 da normallashtirilgan dublikatlarni (283 ta) olib tashladik. Ammo **qisman**
dublikatlarni — Dars 15 dagi 6-bosqichni — 11 milliard juft tufayli qila olmadik.
Endi tekshiramiz: test'ga trening nusxalari tushdimi?

### Tekshiruv №1: test jumlalarini train ichidan qidirish

Rejadagi oddiy usul: test'dan tasodifiy **20 ta** jumla olib, train matni ichidan
qidiramiz.

Avval tekshiruvning oʻzini tekshiramiz — **mening 1-xatoyimni** qaytaramiz. Test
deb korpusning **boshini** olamiz, train esa — birinchi 90%:

```python
buzuq_test = korpus[:10000]
train_joy_matn = "\n".join(train_joy)

random.seed(1)
namuna = random.sample(buzuq_test, 20)

topildi = 0
for j in namuna:
    if j in train_joy_matn:
        topildi += 1
print("buzuq boʻlinish:", topildi, "/ 20 topildi")
```

**Natija:**

```
buzuq boʻlinish: 20 / 20 topildi
```

**20 tadan 20 tasi.** Tekshiruv ishlaydi: bunday xatoni darhol topadi. Mening
holatimda — 12 tadan 11 tasi edi.

- `j in matn` — Dars 04 dagi `in`, lekin satr uchun: "`j` matnning **ichida**
  bormi?"

Endi bizning toʻgʻri boʻlinishimiz:

```python
train_matn = "\n".join(train)

random.seed(1)
namuna = random.sample(test, 20)

for j in namuna:
    if j in train_matn:
        print("topildi:", repr(j))
```

**Natija:**

```
topildi: 'Shayx xafa bo‘lmaydi.'
```

Bitta topildi! Boʻlinish buzilganmi? Qaraymiz — u train'da **qayerda**?

```python
for j in train:
    if "Shayx xafa bo\u2018lmaydi." in j:
        print(repr(j))
```

**Natija:**

```
'Shayx xafa bo‘lmaydi. Umuman, xafa bo‘lishni bilmaydi. Iljayadi.'
```

**Yolgʻon signal.** Test jumlasi — qisqa: `Shayx xafa bo‘lmaydi.` U train'dagi
**boshqa, uzunroq** jumlaning ichida turibdi. Bu — dublikat emas, shunchaki bir xil
soʻzlar.

> **Tekshiruv ham xato qilishi mumkin.** Satr ichidan qidirish qisqa jumlalarda
> yolgʻon signal beradi. Butun jumlani butun jumla bilan solishtirish kerak.

Toʻgʻrisi — toʻplam bilan (Dars 15):

```python
train_toplam = set(train)

topildi = 0
for j in namuna:
    if j in train_toplam:
        topildi += 1
print("butun jumla sifatida topildi:", topildi, "/ 20")
```

**Natija:**

```
butun jumla sifatida topildi: 0 / 20
```

Toza.

### Tekshiruv №2: barmoq izlari

20 ta jumla — oz. Agar test'ning 2% i ifloslangan boʻlsa, 20 talik namunada uni
topmasligimiz ehtimoli katta (Mashq 2 da hisoblaysiz). Mening 39.2% li holatimda
20 ta yetardi. Kichik ifloslanish uchun esa — **hammasini** tekshirish kerak.

Mening usulim: trening matnining har bir **oynasiga** barmoq izi. Men 24 tokenli
oyna ishlatganman. Bizning jumlalar qisqa — **8 soʻzli** oyna olamiz. Dars 15 dagi
`ngrammalar` aynan shu ishni qiladi, faqat `n=8` bilan:

```python
izlar = {}
for i in range(len(train)):
    for oyna in ngrammalar(train[i], 8):
        if oyna not in izlar:
            izlar[oyna] = i

print("train'dagi 8 soʻzli oynalar:", len(izlar))
```

**Natija:**

```
train'dagi 8 soʻzli oynalar: 123038
```

- `izlar` — lugʻat: oyna → u birinchi uchragan train jumlasining raqami. Toʻplam
  ham yetardi, lekin raqam bilan **qaysi** jumlaga oʻxshashini koʻrsata olamiz.

Endi test'ning **har bir** jumlasini tekshiramiz:

```python
ifloslangan = []
tekshirildi = 0
for j in test:
    oynalar = ngrammalar(j, 8)
    if len(oynalar) == 0:
        continue
    tekshirildi += 1
    for oyna in sorted(oynalar):
        if oyna in izlar:
            ifloslangan.append((j, train[izlar[oyna]]))
            break

print("tekshirildi (8+ soʻzli):", tekshirildi)
print(f"ifloslangan: {len(ifloslangan)} ({len(ifloslangan) / tekshirildi:.1%})")
print()
for t, tr in ifloslangan[:3]:
    print("test: ", t)
    print("train:", tr)
    print()
```

**Natija:**

```
tekshirildi (8+ soʻzli): 5230
ifloslangan: 98 (1.9%)

test:  Tokio Olimpiadasi sovrindori Bekzod Abdurahmonov va O‘zbekiston bayroqdori Nigora Tursunqulova turmush qurdi
train: Tokio Olimpiadasi sovrindori Bekzod Abdurahmonov va O‘zbekiston bayroqdori Nigora Tursunqulova turmush quradi

test:  Sergelida kuchli ta’sir qiluvchi dori vositalarini noqonuniy sotayotgan dorixona aniqlandi
train: Chilonzorda kuchli ta’sir qiluvchi dori vositalarini noqonuniy sotayotgan dorixona aniqlandi

test:  Ayniqsa, mahalliy millatlarning orasiga rahna solinishi, din va qadriyatlarning tahqirlanishi hamda kelajakda
train: Ayniqsa, mahalliy millatlarning orasiga rahna solinishi, din va qadriyatlarning tahqirlanishi
```

- `if len(oynalar) == 0: continue` — 8 soʻzdan qisqa jumlada 8 soʻzli oyna yoʻq.
  Ularni bu usul tekshira olmaydi.
- `sorted(oynalar)` — toʻplamning tartibi har ishga tushirishda boshqacha boʻlishi
  mumkin (Dars 15). Tartiblasak, hammada bir xil misollar chiqadi.

Misollarga qarang. Birinchisi — bir xil yangilikning **ikki xil sarlavhasi** (`qurdi`
va `quradi`). Uchinchisi — bitta jumlaning qisqartirilgan nusxasi. Ikkinchisi esa
qiziq: **boshqa** tumandagi **boshqa** voqea, lekin aynan bir xil qolipda yozilgan.
Dublikatmi? Matn jihatidan — deyarli. Test uchun xavfsizroq yoʻl — uni ham chiqarish.
Dars 15 dagi metro maqolasi — faqat haqiqiy.

Bizda — 1.9%. Mening internet korpusimda — 39.2%. Farq tushunarli: men butun
**hujjatlarni** tekshirganman (uzun matnda bitta umumiy oyna topilish ehtimoli
katta), va internet sahifalari jumlalardan koʻra koʻproq koʻchiriladi.

### Tozalaymiz

Men qilgandek — ifloslangan test jumlalarini **test'dan** olib tashlaymiz. Train'ga
tegmaymiz: tokenizator allaqachon oʻqitilgan.

```python
iflos_toplam = set()
for t, tr in ifloslangan:
    iflos_toplam.add(t)

test_toza = []
for j in test:
    if j not in iflos_toplam:
        test_toza.append(j)

print("toza test:", len(test_toza))
print(f"fertility: {fertility(test_toza, merges):.3f}")
```

**Natija:**

```
toza test: 14713
fertility: 1.800
```

Fertility deyarli oʻzgarmadi — bu ifloslanish tokenizator raqamiga sezilarli taʼsir
qilmagan. Lekin buni **bilish uchun tekshirish kerak edi**. Endi "test toza" deb
aytsak — buning dalili bor: 8 soʻzli oyna boʻyicha nol umumiy iz.

<!-- animatsiya: p3 | Barmoq izlari -->

---

## 9. Imlo: kimning uyida oʻynaymiz?

Mening 3-xatoyim — test matni mening normalizatorimdan oʻtgan edi. Buni ham
qaytaramiz.

Bizga **raqib** kerak — normalizatsiya qilmaydigan tokenizator. GPT-4o kabi: u
matnni qanday yozilgan boʻlsa, shunday oladi. Uni oʻsha train matnida, oʻsha hajmda
oʻqitamiz — faqat `normallashtir` siz:

> Yana bir necha daqiqa.

```python
t0 = time.perf_counter()
m_raqib, v_raqib, _ = train_tez2("\n".join(train), 16384, NAQSH)
print(f"vaqt: {(time.perf_counter() - t0) / 60:.1f} daqiqa")
```

**Natija:**

```
vaqt: 4.5 daqiqa
```

Endi ikkala tokenizatorni test'ning **ikki xil yozuvida** oʻlchaymiz:

- **asl** — internetda odamlar yozgandek (`‘`, `’`, `` ` ``, `'` aralash);
- **normallashtirilgan** — mening xatoyimdagidek, hammasi `ʻ` va `ʼ`.

```python
def fertility_raqib(jumlalar, merges):
    matn = "\n".join(jumlalar)
    tokenlar = encode_tez(matn, merges, NAQSH)
    return len(tokenlar) / len(matn.split())


test_norm = []
for j in test_toza:
    test_norm.append(normallashtir(j))

for nom, jumlalar_ in [("asl imlo", test_toza), ("normallashtirilgan", test_norm)]:
    biz = fertility(jumlalar_, merges)
    raqib = fertility_raqib(jumlalar_, m_raqib)
    print(f"{nom:20s} biz: {biz:.3f} | raqib: {raqib:.3f} | raqib {(raqib - biz) / biz:.1%} koʻproq token")
```

**Natija:**

```
asl imlo             biz: 1.800 | raqib: 2.042 | raqib 13.4% koʻproq token
normallashtirilgan   biz: 1.800 | raqib: 1.858 | raqib 3.2% koʻproq token
```

- `fertility_raqib` — `fertility` ning aynan oʻzi, faqat `normallashtir` siz. Raqib
  matnni oʻzgartirmaydi.
- Bizning tokenizator ikkala holatda ham bir xil natija beradi — u baribir hammasini
  normallashtiradi.

**Toʻxtang va oxirgi ustunga qarang.**

Ikkala tokenizator — **bir xil**. Test jumlalari — **bir xil**. Faqat apostroflar
boshqacha yozilgan. Va "bizning ustunligimiz" bir necha barobar oʻzgardi.

Nima boʻldi? Normallashtirilgan test'da biz raqibga **oʻz normalizatorimizni tekin
berdik**. Uning ishining eng qiyin qismi — `o‘zbek`, `o'zbek`, `o’zbek` ni tanish —
oldindan bajarib qoʻyilgan. Dars 14 dagi devorlar unga xalaqit bermadi.

Qaysi raqam haqiqat? **Foydalanuvchi yozadigan matndagisi** — asl imlo. Internetda
odamlar aynan shunday yozadi (Dars 14: toʻgʻri `ʻ` — ozchilik).

> **Test matnining imlosi — natijaning bir qismi.** U solishtiruvni ham bizning
> foydamizga, ham zararimizga burishi mumkin. Bu yerda u bizning ustunligimizni
> **yashirdi**. Mening maqolamda esa (u yerda raqiblar boshqa tokenizatorlar va
> modellar edi) — **oshirib koʻrsatdi**. Ikkala holatda ham yechim bitta: test
> matnini **asl** holida saqlang, va qaysi imloda oʻlchaganingizni yozing.

<!-- animatsiya: p4 | Kimning uyida? -->

---

## 10. Yozib qoʻyish

Rejadagi oxirgi qadam — eng zerikarli koʻrinadigan, lekin eng muhimi. Mening uchala
xatoyim ham **yozilmagan qaror** tufayli boʻlgan: "test qayerdan olingan?", "fayl
qanday tartibda?", "matn qaysi imloda saqlangan?"

```python
with open("test.txt", encoding="utf-8") as f:
    test_iz = hashlib.md5(f.read().encode("utf-8")).hexdigest()

hisobot = {
    "manba": MANZIL,
    "tozalash": "Dars 16: koʻrinmas belgilar, kirill > 0.3, kalit boʻyicha dublikatlar",
    "jumlalar": len(korpus),
    "boʻlish": {"usul": "random.shuffle", "seed": 0, "train": len(train), "test": len(test)},
    "test_md5": test_iz,
    "tekshiruv": {
        "aniq_jumla_20_ta": "0 / 20",
        "oyna": "8 soʻz",
        "ifloslangan_olib_tashlandi": len(ifloslangan),
        "toza_test": len(test_toza),
    },
    "test_imlosi": "asl (normallashtirilmagan)",
    "lugʻat": len(vocab),
    "fertility_test": round(fertility(test_toza, merges), 3),
}

with open("hisobot.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(hisobot, ensure_ascii=False, indent=2))

print(json.dumps(hisobot["boʻlish"]))
print(hisobot["test_md5"])
```

**Natija:**

```
{"usul": "random.shuffle", "seed": 0, "train": 133291, "test": 14811}
a1d49c3a0c6b6b4c8fc2d6070b33b6ff
```

Har bir maydon — bitta savolga javob:

- **`manba`** — versiya raqami bilan. Bir yildan keyin ham aynan shu faylni olish
  mumkin.
- **`boʻlish`** + **`seed`** — boʻlinishni har kim qaytara oladi.
- **`test_md5`** — test faylining barmoq izi (Dars 15). Kimdir "men ham sizning
  test'ingizda oʻlchadim" desa — izni solishtirasiz. Bitta harf farq qilsa ham iz
  boshqacha.
- **`tekshiruv`** — "test toza" degan gapning **dalili**.
- **`test_imlosi`** — 9-boʻlimdagi saboq.

Bularsiz natijangizni hech kim tekshira olmaydi. **Olti oydan keyin — siz ham.**

---

## 11. Muammo

Endi qoʻlimizda halol oʻlchangan tokenizator bor. Lekin u **tarqoq**: `merges`
lugʻati, `vocab` lugʻati, `normallashtir`, `NAQSH`, `encode_tez`, `decode` — hammasi
alohida. Colab sessiyasi tugasa — hammasi yoʻqoladi. Boshqa odamga bersangiz —
qaysi funksiyani qaysi tartibda chaqirishni tushuntirishingiz kerak.

Va eng qiziq savol hali ochiq: bizning tokenizator **mening haqiqiy tokenizatorim**
— `uzbek-bpe-16k` — bilan solishtirganda qanday?

Keyingi — Kurs 1 ning oxirgi darsi.

---

## 12. Toʻliq kod

4-boʻlimdagi funksiyalardan keyin:

```python
def fertility(jumlalar, merges):
    matn = normallashtir("\n".join(jumlalar))
    tokenlar = encode_tez(matn, merges, NAQSH)
    return len(tokenlar) / len(matn.split())


# ---- 1. Boʻlish: avval aralashtir, keyin boʻl ----
with open("korpus.txt", encoding="utf-8") as f:
    korpus = f.read().split("\n")

aralash = list(korpus)
random.seed(0)
random.shuffle(aralash)
chegara = int(len(aralash) * 0.9)
train = aralash[:chegara]
test = aralash[chegara:]

# ---- 2. Oʻqitish: faqat train ----
merges, vocab, tarix = train_tez2(normallashtir("\n".join(train)), 16384, NAQSH)

# ---- 3. Ifloslanish tekshiruvi: 8 soʻzli oynalar ----
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

# ---- 4. Baholash: faqat test, asl imloda ----
print("train:", len(train), "| test:", len(test), "| toza test:", len(test_toza))
print(f"fertility (train): {fertility(train, merges):.3f}")
print(f"fertility (toza test): {fertility(test_toza, merges):.3f}")
```

**Kutilgan natija:**

```
train: 133291 | test: 14811 | toza test: 14713
fertility (train): 1.781
fertility (toza test): 1.800
```

---

## 13. Oʻzingiz yozing

Boʻlish va ifloslanish tekshiruvini toʻldiring:

```python
aralash = ___(korpus)
random.___(0)
random.___(aralash)
chegara = ___(len(aralash) * 0.9)
train = aralash[___:chegara]
test = aralash[chegara___]

izlar = ___()
for j in train:
    for oyna in ngrammalar(j, ___):
        izlar.___(oyna)

test_toza = []
for j in test:
    iflos = False
    for oyna in ngrammalar(j, 8):
        if oyna ___ izlar:
            iflos = True
            ___
    if ___ iflos:
        test_toza.append(j)

print(len(test_toza))     # 12-boʻlimdagi bilan bir xil boʻlishi kerak
```

<details>
<summary>Yechimni koʻrsatish</summary>

```python
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

print(len(test_toza))
```

```
14713
```

Eng koʻp qilinadigan xatolar:

1. `aralash = korpus` (`list` siz) — nusxa emas, **oʻsha** roʻyxat. `shuffle`
   `korpus` ning oʻzini aralashtirib yuboradi, va keyingi hamma kod boshqa tartibni
   koʻradi.
2. `random.seed` ni `shuffle` dan **keyin** yozish — urugʻ hech narsaga taʼsir
   qilmaydi, har safar boshqa boʻlinish chiqadi.
3. `train = aralash[:chegara + 1]` — bitta jumla ikkala qismga ham tushadi. Kichik
   xato — lekin aynan "ifloslanish" deb ataladigan narsa.
</details>

---

## 14. Mashqlar

---

**Mashq 1.** 5-boʻlimda joylashuv boʻyicha boʻlinishda test'ning qanchasi maqol
(`•`) va dialog (`—`) edi? Tasodifiy boʻlinishda-chi? Butun korpusda-chi?

<details>
<summary>Javobni koʻrsatish</summary>

```python
def ulush(jumlalar):
    son = 0
    for j in jumlalar:
        if j[0] == "\u2022" or j[0] == "\u2014":   # "•" va "—"
            son += 1
    return son / len(jumlalar)


print(f"joylashuv test: {ulush(test_joy):.1%}")
print(f"tasodifiy test: {ulush(test):.1%}")
print(f"butun korpus:   {ulush(korpus):.1%}")
```

```
joylashuv test: 89.6%
tasodifiy test: 9.1%
butun korpus:   9.5%
```

Tasodifiy test — korpusning **kichik nusxasi**: ulush deyarli bir xil. Joylashuv
boʻyicha test esa — butunlay boshqa matn. Bu test boʻlinishining eng oddiy
tekshiruvi: **test train'ga oʻxshaydimi?** Har qanday oddiy belgini (jumla uzunligi,
birinchi harf, mavzu) solishtiring.
</details>

---

**Mashq 2.** Test'ning `p` qismi ifloslangan boʻlsa, 20 talik tasodifiy namunada
**bittasi ham** topilmaslik ehtimoli — `(1 - p) ** 20`. Uni p = 39.2% (mening
holatim), 10% va 1.9% (bizning holat) uchun hisoblang. Xulosa?

<details>
<summary>Javobni koʻrsatish</summary>

```python
for p in [0.392, 0.10, 0.019]:
    print(f"p = {p:.1%} | hech narsa topmaslik ehtimoli: {(1 - p) ** 20:.1%}")
```

```
p = 39.2% | hech narsa topmaslik ehtimoli: 0.0%
p = 10.0% | hech narsa topmaslik ehtimoli: 12.2%
p = 1.9% | hech narsa topmaslik ehtimoli: 68.1%
```

- `**` — darajaga koʻtarish: `2 ** 3` → `8`.

39.2% da — 20 ta parcha **deyarli doim** ifloslanishni topadi. Shuning uchun men
oddiy namuna bilan topdim.

1.9% da esa — **koʻpincha topmaydi**. 20 talik tekshiruv "toza" deydi, lekin test
ifloslangan. Shuning uchun 8-boʻlimda **hamma** jumlalarni barmoq izi bilan
tekshirdik.

Namuna — tez tekshiruv. Toʻliq tekshiruv — dalil.
</details>

---

**Mashq 3.** 8 soʻzli oyna oʻrniga 4, 6 va 12 soʻzli oyna olsak, nechta test jumlasi
"ifloslangan" deb topiladi? 4 soʻzli oyna topgan misollarga qarang — ular haqiqatan
dublikatmi?

<details>
<summary>Javobni koʻrsatish</summary>

```python
for n in [4, 6, 8, 12]:
    izlar_n = set()
    for j in train:
        for oyna in ngrammalar(j, n):
            izlar_n.add(oyna)
    topildi = 0
    misol = None
    for j in test:
        for oyna in sorted(ngrammalar(j, n)):
            if oyna in izlar_n:
                topildi += 1
                if misol is None:
                    misol = (j, oyna)
                break
    print(f"{n:2d} soʻz: {topildi:5d} ta | misol: {misol[1]!r}")
```

```
 4 soʻz:  1037 ta | misol: 'bor va soʻz bor.'
 6 soʻz:   297 ta | misol: 'bor, siz bor va soʻz bor.'
 8 soʻz:    98 ta | misol: 'bekzod abdurahmonov va oʻzbekiston bayroqdori nigora tursunqulova turmush'
12 soʻz:     4 ta | misol: 'falak gardishi bilan vujudning bir aʼzosi kasallansa, albatta, boshqa aʼzolar ham ziyon'
```

Qisqa oyna — **koʻp** topadi, lekin topganlarining katta qismi dublikat emas:
oddiy iboralar (*"bor va soʻz bor."*), maqollardagi umumiy boshlanishlar. Bu —
**yolgʻon signal**.

Uzun oyna — **kam** topadi, lekin topgani deyarli aniq nusxa. Biroq u qisqa
jumlalarni umuman tekshira olmaydi (12 soʻzdan qisqa jumlada 12 soʻzli oyna yoʻq).

Har bir oyna uzunligi — savdo. Men 24 tokenli oynani tanlaganman: hujjatlarim uzun
edi, va 24 token — oddiy ibora uchun juda uzun, nusxa uchun esa yetarli.
</details>

---

**Mashq 4.** Nima uchun 7-boʻlimdagi farq atigi 1%? Test matnidagi regex
boʻlaklarining qanchasi train'da **umuman uchramagan**? Ular uchun nechtadan token
ketadi?

<details>
<summary>Javobni koʻrsatish</summary>

```python
train_boshlar = boshlar_sana(normallashtir("\n".join(train)), NAQSH)
test_boshlar = boshlar_sana(normallashtir("\n".join(test_toza)), NAQSH)

korilgan_son = 0
korilgan_token = 0
yangi_son = 0
yangi_token = 0
for b in test_boshlar:
    t = len(encode_regex(b, merges, NAQSH)) * test_boshlar[b]
    if b in train_boshlar:
        korilgan_son += test_boshlar[b]
        korilgan_token += t
    else:
        yangi_son += test_boshlar[b]
        yangi_token += t

jami = korilgan_son + yangi_son
print(f"train'da koʻrilgan boʻlaklar: {korilgan_son / jami:.1%} | {korilgan_token / korilgan_son:.2f} token")
print(f"train'da koʻrilmagan:         {yangi_son / jami:.1%} | {yangi_token / yangi_son:.2f} token")
```

```
train'da koʻrilgan boʻlaklar: 92.8% | 1.22 token
train'da koʻrilmagan:         7.2% | 2.67 token
```

Test boʻlaklarining **93%** i train'da allaqachon uchragan — ular uchun tokenizator
tayyor: 1.22 token. Koʻrilmagan boʻlaklar esa **ikki barobardan koʻp** qimmat —
2.67 token. Lekin ular atigi 7%.

Mana nima uchun farq kichik: katta korpusda "yangi soʻz" — kamyob hodisa. Kichik
korpusda (7-boʻlimdagi 5 000 jumla) koʻrilmagan boʻlaklar ancha koʻp — va farq
besh barobar katta.

Bu oʻzbek tili uchun alohida muhim: qoʻshimchalar tufayli bitta soʻzning yuzlab
shakli bor. Korpus qanchalik kichik boʻlsa — test'da shunchalik koʻp "yangi" shakl.
</details>

---

**Mashq 5 (eng muhimi).** Hisobotingiz haqiqatan ishlaydimi? Faraz qiling: siz
faqat `hisobot.json` va `korpus.txt` ni oldingiz. Boʻlinishni **qaytadan yasang**
va test faylining barmoq izi hisobotdagiga mos kelishini tekshiring. Keyin — `seed`
ni 1 qilib xuddi shuni qiling.

<details>
<summary>Javobni koʻrsatish</summary>

```python
with open("hisobot.json", encoding="utf-8") as f:
    h = json.loads(f.read())

with open("korpus.txt", encoding="utf-8") as f:
    k = f.read().split("\n")

for seed in [h["boʻlish"]["seed"], 1]:
    a = list(k)
    random.seed(seed)
    random.shuffle(a)
    c = int(len(a) * 0.9)
    qayta_test = "\n".join(a[c:])
    iz = hashlib.md5(qayta_test.encode("utf-8")).hexdigest()
    print(f"seed {seed}: {iz} | hisobotga mos: {iz == h['test_md5']}")
```

```
seed 0: a1d49c3a0c6b6b4c8fc2d6070b33b6ff | hisobotga mos: True
seed 1: 03c933221cc6bdfe39e951c2db53b86e | hisobotga mos: False
```

`seed 0` — **aynan** oʻsha test. Bitta fayl, bitta urugʻ, bitta qoida — va boshqa
odam sizning boʻlinishingizni harfma-harf qaytardi. Natijangizni tekshirish mumkin.

`seed 1` — butunlay boshqa test. Agar hisobotda urugʻ yozilmaganida, hech kim (siz
ham) qaysi boʻlinishda oʻlchaganingizni bilmasdi.

Mening maqolamdagi tuzatishlarni tekshirib boʻlgani ham shu sababli: men eski test
toʻplamini tuzatilgan baholash kodi bilan qayta oʻlchadim — va u avval eʼlon qilgan
raqamlarimni **toʻrtta xona aniqligida** qaytardi. Shundan keyingina "yangi raqamlar
— tuzatishning natijasi, tasodif emas" deb ayta oldim.
</details>

---

## 15. Xulosa

1. Oʻqitgan matningizda oʻlchangan raqam — **har doim** sizning foydangizga yolgʻon.
   Hajmi — oldindan nomaʼlum. Uni oʻlchash kerak.
2. Tartib: **tozalash → boʻlish → oʻqitish (train) → baholash (test)**. Test —
   muhrlangan konvert.
3. **Fayl tartibiga ishonmang.** Alifbo tartibidagi korpusda "oxirgi 10%" — maqollar
   va dialoglar. Avval aralashtiring.
4. `random.seed` + `random.shuffle` — tasodifiy, lekin **qaytariladigan** boʻlinish.
5. Bizning tokenizatorda koʻrgan va koʻrmagan matn farqi — **1%**. Kichik korpusda —
   **5%**. Modelda — ancha katta.
6. **Dublikatlar — yashirin ifloslanish.** Shuning uchun Dars 15 dagi ish kerak edi.
7. 20 talik namuna katta ifloslanishni topadi, kichigini — yoʻq. Toʻliq tekshiruv —
   **barmoq izlari** (oyna boʻyicha).
8. Tekshiruv ham xato qiladi: satr ichidan qidirish — yolgʻon signal; qisqa oyna —
   yolgʻon signal.
9. **Test imlosi** — natijaning bir qismi. Asl imloda saqlang va buni yozing.
10. **Hisobot**: manba (versiya bilan), boʻlish (seed bilan), test izi, tekshiruv
    natijasi, imlo. Bularsiz natijani hech kim tekshira olmaydi.

---

## Keyingi dars

**Dars 18 — Bitta klass + haqiqiy tokenizator.** Hamma tarqoq funksiyalarni bitta
**klassga** yigʻamiz: `train`, `encode`, `decode`, `save`, `load`. Keyin mening
`uzbek-bpe-16k` tokenizatorimni yuklab olib, uni oʻz tokenizatoringiz bilan
**halol** solishtirasiz — bugungi qoidalar bilan.

Keyingi darsning savoli: *Colab sessiyasi tugaganda ham tokenizator yoʻqolmasligi
uchun uni qanday saqlash kerak — va saqlangan fayldan aynan oʻsha tokenizatorni
qaytarib olganingizni qanday isbotlaysiz?*
