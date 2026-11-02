# Dars 16 — Haqiqiy matnda trening: takror ishni bir marta qiling

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 15 — Maʼlumot: qayerdan olish va qanday tozalash
> **Vaqt:** ~80 daqiqa (+ 5–10 daqiqa katta treningni kutish)
> **Kerak:** Dars 01–15. `kodla`, `merge`, `decode`, `train_regex`, `encode_regex`, `NAQSH` (Dars 06–13), `normallashtir` (Dars 14), `kirill_ulushi`, `kalit` (Dars 15)

---

## Bu darsdan keyin siz...

- **yuklab olasiz** haqiqiy oʻzbekcha korpusni — 148 ming jumla, hech qanday hisobsiz;
- **oʻlchaysiz** `train_regex` qanchalik sekin ekanini — va nima uchun;
- **topasiz** ikki xil behuda ishni va ularni yoʻqotasiz;
- **isbotlaysiz** tez versiya aynan bir xil natija berishini — sinov bilan;
- **oʻqitasiz** birinchi haqiqiy tokenizatoringizni: **16 384** token;
- **oʻlchaysiz** uning fertility sini — va bu raqamga savol berasiz.

---

## 1. Bitta savol

Dars 15 oxirida savol qoldirgan edim:

> `train_regex` ning har bir qadamida qaysi ish **behuda** takrorlanadi?

Va undan ham oldin, Dars 10 da vaʼda bergan edim: "Dars 16 da haqiqiy korpusda
oʻqitganingizda bu muammoga duch kelasiz." Bugun — oʻsha kun.

Avval muammoni **oʻz koʻzimiz bilan** koʻramiz: haqiqiy matnni yuklab olamiz,
`train_regex` ni ishga tushiramiz va soatga qaraymiz. Keyin sababini topamiz.

---

## 2. Haqiqiy korpus: Common Voice

Dars 15 da FineWeb-2 bilan tanishdik: oʻzbek lotin boʻlimi — 4.45 GB. Birinchi
haqiqiy trening uchun bizga kichikroq, lekin **haqiqiy** korpus kerak.

**Common Voice** — Mozilla jamoasining loyihasi. Odamlar ekrandagi jumlalarni
ovoz chiqarib oʻqiydi va shu yozuvlardan nutqni taniydigan modellar oʻqitiladi.
Buning uchun har bir tilda koʻp **jumlalar** kerak — va ular ochiq saqlanadi.

Oʻzbek tili uchun ular 148 mingdan ortiq. Dars 15 dagi uchta savolga javob:

1. Undan oʻqitsam boʻladimi? — **Ha.**
2. Uni tarqatsam boʻladimi? — **Ha.**
3. Nima shart? — **Hech narsa.** Jumlalar **CC0** litsenziyasi bilan chiqarilgan —
   yaʼni jamoat mulki. Common Voice jumla qoʻshayotgan har bir odamdan matnda
   mualliflik huquqi yoʻqligini tasdiqlashni talab qiladi.

### Yuklab olamiz

```python
import urllib.request

MANZIL = ("https://raw.githubusercontent.com/common-voice/common-voice/"
          "57f42edbf6f6d3b128e0bcd3f916360af0d328b6/server/data/uz/sentence-collector.txt")

urllib.request.urlretrieve(MANZIL, "uz_jumlalar.txt")
print("yuklandi")
```

**Natija:**

```
yuklandi
```

- `urllib.request` — Python bilan birga keladigan, internetdan fayl oladigan modul.
  Hech narsa oʻrnatish shart emas.
- `urlretrieve(manzil, fayl)` — manzildagi faylni yuklab, kompyuterga shu nom
  bilan saqlaydi.
- Manzil ikki qatorga boʻlingan: qavs ichidagi ikki satr Python'da **bitta** satrga
  qoʻshiladi. Uzun qatorni oʻqishga qulay qilish uchun.
- `57f42ed…` — bu faylning **versiya raqami** (GitHub'da *commit* deyiladi).
  U faylning 2026-yil 21-oktabrdagi holatini koʻrsatadi. Common Voice keyin yangi
  jumlalar qoʻshsa ham, bu manzil **aynan shu** faylni beradi. Demak sizning
  ekraningizdagi raqamlar meniki bilan bir xil chiqadi.

### Ichiga qaraymiz

```python
with open("uz_jumlalar.txt", encoding="utf-8") as f:
    jumlalar = f.read().split("\n")

print("jumlalar:", len(jumlalar))
for j in jumlalar[:4]:
    print(repr(j))
print("...")
for j in jumlalar[50000:50003]:
    print(repr(j))
```

**Natija:**

```
jumlalar: 148391
'! Shu pulga qancha sigareta keladi?'
'" Cobalt" va "Nexia" qo‘shni davlatlarda qimmatroq sotilmoqda'
'"Abdulla Oripov" hujjatli filmining premyerasi bo‘lib o‘tdi'
'"Abdulloh qaerda?"'
...
'Koʻzi koʻr edi.'
'Koʻzi och ekanmi buning dedi.'
'Koʻzi oʻyib olingan'
```

Ikkita narsa koʻzga tashlanadi:

1. **Mavzular aralash:** yangilik sarlavhalari ("Afgʻoniston", "prezident") va
   badiiy adabiyotdan jumlalar ("Koʻzi koʻr edi.").
2. **Alifbo tartibida:** fayl `!` va `"` bilan boshlanadi, 50 000-qatorda `Koʻ…`
   ga yetgan. Bu hozir muhim emas. Dars 17 da — juda muhim boʻladi.

### Dars 14 dagi senzus — yana bir bor

```python
matn_xom = "\n".join(jumlalar)

for b in ["\u2018", "\u2019", "\u02bb", "`", "'", "\u02bc"]:
    print(repr(b), matn_xom.count(b))
```

**Natija:**

```
'‘' 93940
'’' 20792
'ʻ' 16547
'`' 10723
"'" 8480
'ʼ' 3581
```

Dars 14 da 3 000 ta veb-hujjatda `‘` birinchi oʻrinda edi. Bu yerda ham —
va yana ham koʻproq. Toʻgʻri belgi `ʻ` — uchinchi oʻrinda. Normalizatsiyasiz bu
korpusda oʻqitish — Dars 14 dagi devorlarni minglab marta qurish boʻlardi.

---

## 3. Tozalash: Dars 15 quvuri — jumlalar uchun

Avval Dars 14–15 dagi uchta funksiya kerak:

```python
import re
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


print(normallashtir("O'zbekiston"), kirill_ulushi("Салом"), kalit("Salom")[:8])
```

**Natija:**

```
Oʻzbekiston 1.0 7650d3ef
```

Dars 15 dagi olti bosqichdan qaysilari jumlalarga kerak?

| Bosqich | Kerakmi? | Nima uchun |
|---|---|---|
| 1. kodlash | tekshiramiz | pastda |
| 2. til | **ha** | |
| 3. shablon | yoʻq | jumlalarda sayt "dumi" yoʻq |
| 4. uzunlik | yoʻq | jumla qisqa boʻlishi — normal |
| 5. aniq dublikat | **ha** | |
| 6. qisman dublikat | **qila olmaymiz** | pastda |

### Kodlash

```python
print("U+FFFD:", matn_xom.count("\ufffd"))
print("‚Ä:", matn_xom.count("‚Ä"))
```

**Natija:**

```
U+FFFD: 0
‚Ä: 0
```

Toza. Lekin boshqa narsa topildi.

### Koʻrinmas belgilar

Korpusda shunday jumla bor: `Adib frontdan qaytgan zahoti bu roman ustida ish
boshlab yubordi`. Ekranda hech qanday muammo koʻrinmaydi. Lekin `qaytgan` soʻzining
ichida **koʻrinmas** belgi bor:

```python
soz = "qayt\u00adgan"

print(soz)
print(len(soz), len("qaytgan"))
print(re.findall(NAQSH, soz))
print(unicodedata.name("\u00ad"), unicodedata.category("\u00ad"))
```

**Natija:**

```
qayt­gan
8 7
['qayt', '\xad', 'gan']
SOFT HYPHEN Cf
```

- `\u00ad` — **yumshoq defis** (*soft hyphen*). Matn muharrirlari uni "agar soʻz
  qator oxiriga sigʻmasa, shu yerdan boʻl" degan belgi sifatida qoʻyadi. Ekranda
  koʻrinmaydi.
- Lekin uning kategoriyasi — `Cf`, harf emas. Dars 14 ni eslang: `\w` faqat
  harflarni oladi. Demak regex `qaytgan` ni **uch boʻlakka** boʻldi.

Bu — Dars 14 dagi koʻrinmas devor. Faqat bu safar u **haqiqatan** koʻrinmas.

Yana bittasi — `\u200b`, **nol kenglikdagi boʻshliq**. Sanaymiz:

```python
print("yumshoq defis:", matn_xom.count("\u00ad"))
print("nol kenglikdagi boʻshliq:", matn_xom.count("\u200b"))
```

**Natija:**

```
yumshoq defis: 349
nol kenglikdagi boʻshliq: 69
```

Ikkalasi ham hech qanday maʼno tashimaydi. Ularni shunchaki **oʻchiramiz**.

### Til va dublikatlar

```python
toza = []
korilgan = {}
misollar = []
olib_tashlandi = {"kirill": 0, "dublikat": 0}

for j in jumlalar:
    j = j.replace("\u00ad", "").replace("\u200b", "").strip()
    if j == "":
        continue
    if kirill_ulushi(j) > 0.3:
        olib_tashlandi["kirill"] += 1
        continue
    k = kalit(j)
    if k in korilgan:
        olib_tashlandi["dublikat"] += 1
        if len(misollar) < 3:
            misollar.append((korilgan[k], j))
        continue
    korilgan[k] = j
    toza.append(j)

print("qoldi:", len(toza))
print(olib_tashlandi)
for a, b in misollar:
    print(repr(a), "=", repr(b))
```

**Natija:**

```
qoldi: 148102
{'kirill': 6, 'dublikat': 283}
'Afg‘on deb atalgan olis tuproqda' = 'Afg’on deb atalgan olis tuproqda'
'Agar eshitmasa, masofani oʻttiz qadamga qisqartirasiz.' = 'Agar eshitmasa, masofani o‘ttiz qadamga qisqartirasiz.'
'Agar ular sevgining qo‘lidan mahkam tutishganida bu to‘siqdan o‘tishlari mushkul emasdi.' = 'Agar ular sevgining qo’lidan mahkam tutishganida bu to’siqdan o’tishlari mushkul emasdi.'
```

Bitta yangi soʻz — **`continue`**. Dars 10 dagi `break` tsiklni butunlay
toʻxtatadi. `continue` esa faqat **shu aylanishni** toʻxtatadi va keyingi jumlaga
oʻtadi. "Bu jumla bilan ish tugadi — keyingisi."

Va bitta oʻzgarish: `korilgan` — endi toʻplam emas, **lugʻat**. Kalit → oʻsha
kalit bilan birinchi koʻrilgan jumla. Shunda dublikat topilganda "kimning nusxasi"
ekanini ham koʻrsata olamiz.

Common Voice aynan bir xil jumlalarni allaqachon olib tashlagan — faylda hamma qatorlar
har xil. Lekin koʻrinmas belgilar va normalizatsiyadan keyin yana **283 ta** dublikat
chiqdi. Misollarga
qarang: `ʻ` va `‘`, `’` va `‘`, katta va kichik harf. Dars 15 dagi `kalit` aynan shu
uchun.

### Qisman dublikat-chi?

148 102 ta jumla. Har bir juftni solishtirish — Dars 15 dagi formula:

```python
n = len(toza)
print(n * (n - 1) // 2)
```

**Natija:**

```
10967027151
```

**11 milliard juft.** Dars 15 da aytganimizdek — bunday hajmda MinHash kerak, va
biz uni yozmaymiz. Bu korpusda qisman dublikatlar qoladi. Buni yodda tuting.

### Saqlaymiz

```python
with open("korpus.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(toza))

matn = normallashtir("\n".join(toza))
print("bayt:", len(matn.encode("utf-8")))
print("soʻz:", len(matn.split()))
```

**Natija:**

```
bayt: 8007356
soʻz: 981206
```

Faylga **asl** yozuvni saqladik (Dars 15 qoidasi). `matn` esa — tokenizator
koʻradigan, normallashtirilgan nusxa. **8 MB, deyarli bir million soʻz.** Dars 13
dagi 7 qatorli matndan 16 000 barobar katta.

---

## 4. Birinchi urinish: `train_regex`

Dars 10 da `time.perf_counter()` bilan vaqt oʻlchagan edik. Korpusning boshidagi
2 000, 4 000 va 8 000 jumlada **50 ta** birlashtirish qilamiz:

```python
import time

for n in [2000, 4000, 8000]:
    qism = normallashtir("\n".join(toza[:n]))
    t0 = time.perf_counter()
    train_regex(qism, 306, NAQSH)
    print(f"{n:5d} jumla | {len(qism.encode('utf-8')):7d} bayt | {time.perf_counter() - t0:.2f} soniya")
```

**Natija** (sizda raqamlar boshqacha boʻladi — kompyuter tezligiga qarab):

```
 2000 jumla |  113530 bayt | 1.67 soniya
 4000 jumla |  234078 bayt | 3.26 soniya
 8000 jumla |  453597 bayt | 6.88 soniya
```

Matn ikki barobar — vaqt ham taxminan ikki barobar. Bu ajablanarli emas: har bir
birlashtirishda `train_regex` **butun** matnni aylanib chiqadi.

Endi butun korpusda — atigi **3 ta** birlashtirish:

```python
t0 = time.perf_counter()
train_regex(matn, 259, NAQSH)
bitta = (time.perf_counter() - t0) / 3

print(f"bitta birlashtirish: {bitta:.1f} soniya")
print(f"16 128 ta birlashtirish: {bitta * 16128 / 3600:.1f} soat")
```

**Natija:**

```
bitta birlashtirish: 4.0 soniya
16 128 ta birlashtirish: 17.8 soat
```

**17 soatdan ortiq.** (Keyingi qadamlarda matn qisqaradi va ular biroz tezlashadi —
lekin baribir soatlar.) Colab'ning bepul sessiyasi esa koʻpi bilan 12 soat ishlaydi.

Bu tokenizator **hech qachon** oʻqimaydi. Nima behuda ketyapti?

<!-- animatsiya: p1 | 17 soat -->

---

## 5. Behuda ish №1: bir xil boʻlaklar

Regex matnni boʻlaklarga boʻladi (Dars 13). Ularni sanaymiz:

```python
def boshlar_sana(matn, naqsh):
    hisob = {}
    for b in re.findall(naqsh, matn):
        hisob[b] = hisob.get(b, 0) + 1
    return hisob


hisob = boshlar_sana(matn, NAQSH)

print("boʻlaklar:", len(re.findall(NAQSH, matn)))
print("noyob boʻlaklar:", len(hisob))
print()
for b in sorted(hisob, key=hisob.get, reverse=True)[:10]:
    print(f"{b!r:10s} {hisob[b]:7d}")
```

**Natija:**

```
boʻlaklar: 1331204
noyob boʻlaklar: 153567

'\n'        148101
'.'          72530
','          52206
'-'          17618
' ham'        9772
' bilan'      9023
' va'         8728
'?'           8308
'•'           7908
' bir'        6832
```

**1.33 million boʻlakdan atigi 153 ming tasi noyob.** Qolgani — takror. ` va`
8 ming martadan koʻp uchraydi, ` bilan` — 9 ming.

Endi `train_regex` nima qiladi? Har bir qadamda ` bilan` ning juftlarini **9 ming
marta** sanaydi: `( b)`, `(bi)`, `(il)`, `(la)`, `(an)` — har safar bir xil natija.
Keyin ` bilan` ga **9 ming marta** `merge` qiladi — har safar bir xil natija.

**Yechim:** har bir noyob boʻlakni **bir marta** saqlaymiz, yoniga — nechta
uchraganini. Juftlarni sanaganda 1 emas, **shu sonni** qoʻshamiz.

Oddiy misolda:

```
boʻlaklar:  " olma", " olma", " nok", " olma"
noyoblar:   " olma" × 3,  " nok" × 1

("l", "m") juftining soni:
  eski usul:  1 + 1 + 1        = 3   (uch marta sanaymiz)
  yangi usul: 3                = 3   (bir marta sanab, 3 ni qoʻshamiz)
```

Natija bir xil. Ish — kam.

<!-- animatsiya: p2 | Bir xil boʻlaklar -->

### `train_tez1`

```python
def eng_juft(stats):
    return max(stats, key=stats.get)


def train_tez1(matn, vocab_size, naqsh):
    hisob = boshlar_sana(matn, naqsh)
    sozlar = []
    sonlar = []
    for b in hisob:
        sozlar.append(kodla(b))
        sonlar.append(hisob[b])

    merges = {}
    vocab = {}
    for i in range(256):
        vocab[i] = bytes([i])
    tarix = []

    for yangi_id in range(256, vocab_size):
        stats = {}
        for i in range(len(sozlar)):
            soz = sozlar[i]
            for juft in zip(soz, soz[1:]):
                stats[juft] = stats.get(juft, 0) + sonlar[i]
        if len(stats) == 0:
            break
        eng = eng_juft(stats)
        tarix.append(stats[eng])
        for i in range(len(sozlar)):
            sozlar[i] = merge(sozlar[i], eng, yangi_id)
        merges[eng] = yangi_id
        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]

    return merges, vocab, tarix
```

`train_regex` dan farqi — uch joyda:

1. **Boshida:** `parchalar` roʻyxati oʻrniga ikkita roʻyxat: `sozlar` (har bir noyob
   boʻlakning tokenlari) va `sonlar` (u necha marta uchragani). `sozlar[i]` va
   `sonlar[i]` — bir juftlik.
2. **Sanashda:** `+ 1` emas, `+ sonlar[i]`. Bu — **tsikl ichida tsikl**: tashqi
   tsikl soʻzlar boʻylab, ichki tsikl — har bir soʻzning juftlari boʻylab.
3. **Tanlashda:** `max(...)` ni alohida `eng_juft` funksiyasiga chiqardik. Nima
   uchun — 6-boʻlimda bilasiz.

Va bitta qoʻshimcha: `tarix` — har qadamda tanlangan juft necha marta uchragani.
Keyin kerak boʻladi.

### Eng muhim sinov

Tez funksiya yozish oson. **Toʻgʻri** tez funksiya yozish — qiyin. Tez versiya
**aynan bir xil** natija berishi kerak. Tekshiramiz:

```python
qism = normallashtir("\n".join(toza[:2000]))

m_sekin, _, _ = train_regex(qism, 306, NAQSH)
m_tez1, _, _ = train_tez1(qism, 306, NAQSH)

print(list(m_sekin.items()) == list(m_tez1.items()))
```

**Natija:**

```
True
```

50 ta birlashtirishning **hammasi** — bir xil, bir xil tartibda.

- `list(m.items())` — lugʻatni `(juft, raqam)` juftliklari roʻyxatiga aylantiradi.
  Ikki roʻyxat teng boʻlishi uchun **tartib** ham bir xil boʻlishi kerak.

### Qancha tezlashdi?

```python
t0 = time.perf_counter()
train_tez1(matn, 259, NAQSH)
bitta = (time.perf_counter() - t0) / 3

print(f"bitta birlashtirish: {bitta:.2f} soniya")
print(f"16 128 ta birlashtirish: {bitta * 16128 / 3600:.1f} soat")
```

**Natija:**

```
bitta birlashtirish: 0.66 soniya
16 128 ta birlashtirish: 3.0 soat
```

17 soatdan — 3 soatga. Yaxshi. Lekin hali ham soatlar.

---

## 6. Behuda ish №2: hammasini qaytadan sanash

`train_tez1` ning ichiga yana qarang. Har bir qadamda:

1. **153 ming** soʻzning hamma juftlarini sanaydi;
2. bitta juftni birlashtiradi;
3. **153 ming** soʻzning hammasiga `merge` qiladi.

Lekin oʻylab koʻring: agar `("l", "a")` ni birlashtirsak, qaysi soʻzlar oʻzgaradi?
**Faqat ichida `la` bor soʻzlar.** ` nok` ga hech narsa boʻlmaydi — uning juftlari
ham, soni ham oʻsha-oʻsha. Biz uni har qadamda qaytadan sanab, **ayni** natijani
olamiz.

### Gʻoya: qaysi juft qayerda?

Har bir juft uchun — u **qaysi soʻzlarda** borligini yozib qoʻyamiz. Bunga Dars 15
dagi toʻplam juda mos:

```python
sozlar = [list("olma"), list("nok"), list("bolalar")]
sonlar = [3, 1, 2]

stats = {}
qayerda = {}
for i in range(len(sozlar)):
    soz = sozlar[i]
    for juft in zip(soz, soz[1:]):
        stats[juft] = stats.get(juft, 0) + sonlar[i]
        if juft not in qayerda:
            qayerda[juft] = set()
        qayerda[juft].add(i)

print("('l', 'a'):", stats[("l", "a")], "marta, soʻzlarda:", qayerda[("l", "a")])
print("('o', 'k'):", stats[("o", "k")], "marta, soʻzlarda:", qayerda[("o", "k")])
```

**Natija:**

```
('l', 'a'): 4 marta, soʻzlarda: {2}
('o', 'k'): 1 marta, soʻzlarda: {1}
```

`("l", "a")` — faqat **2-soʻzda**, `bolalar` da. U yerda ikki marta (`bo-la-lar`),
soʻzning oʻzi esa 2 marta uchragan: 2 × 2 = 4. `("o", "k")` — faqat 1-soʻzda, `nok`
da.

Endi `("l", "a")` ni birlashtirsak — faqat **2-soʻzga** tegamiz:

```python
juft = ("l", "a")
for i in qayerda[juft]:
    eski = sozlar[i]
    yangi = merge(eski, juft, "la")

    # 1. eski juftlarni ayiramiz
    for j in zip(eski, eski[1:]):
        stats[j] -= sonlar[i]
        if stats[j] == 0:
            del stats[j]

    # 2. yangi juftlarni qoʻshamiz
    for j in zip(yangi, yangi[1:]):
        stats[j] = stats.get(j, 0) + sonlar[i]
        if j not in qayerda:
            qayerda[j] = set()
        qayerda[j].add(i)

    sozlar[i] = yangi
    print(eski, "->", yangi)

print(stats)
```

**Natija:**

```
['b', 'o', 'l', 'a', 'l', 'a', 'r'] -> ['b', 'o', 'la', 'la', 'r']
{('o', 'l'): 3, ('l', 'm'): 3, ('m', 'a'): 3, ('n', 'o'): 1, ('o', 'k'): 1, ('b', 'o'): 2, ('o', 'la'): 2, ('la', 'la'): 2, ('la', 'r'): 2}
```

Qator-qator:

- `for i in qayerda[juft]:` — faqat shu juft bor soʻzlar. `olma` va `nok` ga
  umuman qaramadik.
- `stats[j] -= sonlar[i]` — eski soʻzning **har bir** jufti uchun uning sonini
  ayiramiz. Soʻz endi bunday koʻrinishda yoʻq.
- `if stats[j] == 0: del stats[j]` — `del` — lugʻatdan kalitni **oʻchiradi**.
  Soni nolga tushgan juft — endi hech qayerda yoʻq.
- Keyin yangi soʻzning juftlarini **qoʻshamiz** — va ularni `qayerda` ga ham
  yozamiz.

Natijaga qarang: `('l', 'a')` yoʻqoldi, `('o', 'la')`, `('la', 'la')`, `('la', 'r')`
paydo boʻldi. `('o', 'l')` — 3 (olma × 3 dan) qoldi, chunki `olma` ga tegmadik.
`stats` aynan qaytadan sanagandek — lekin biz faqat **bitta** soʻzni qayta ishladik.

### `train_tez2`

```python
def train_tez2(matn, vocab_size, naqsh):
    hisob = boshlar_sana(matn, naqsh)
    sozlar = []
    sonlar = []
    for b in hisob:
        sozlar.append(kodla(b))
        sonlar.append(hisob[b])

    # boshlangʻich hisob — faqat bir marta
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
```

Oddiy misoldagi ish — endi tsikl ichida. Ikki yangi qator:

- `if len(yangi) == len(eski): continue` — `qayerda` baʼzan **eskirgan** boʻladi:
  soʻz bir vaqtlar bu juftga ega edi, lekin oldingi birlashtirish uni oʻzgartirib
  yubordi. Bunday soʻzda `merge` hech narsani oʻzgartirmaydi — uzunligi bir xil
  qoladi. Unda — keyingi soʻzga.
- `del qayerda[eng]` — bu juft endi hech qayerda yoʻq. Uning roʻyxati ham kerak emas.

<!-- animatsiya: p3 | Faqat tegilganlar -->

### Sinov — va kutilmagan natija

`train_tez1` bilan solishtiramiz:

```python
m_tez1, v_tez1, tarix1 = train_tez1(qism, 306, NAQSH)
m_tez2, v_tez2, tarix2 = train_tez2(qism, 306, NAQSH)

print(list(m_tez1.items()) == list(m_tez2.items()))
```

**Natija:**

```
False
```

**Mos kelmadi.** Biror joyda xato qildikmi? Birinchi farqni qidiramiz:

```python
r1 = list(m_tez1)
r2 = list(m_tez2)

for k in range(len(r1)):
    if r1[k] != r2[k]:
        print(f"birinchi farq: {k + 1}-birlashtirishda")
        print("tez1 tanladi:", r1[k], repr(decode([m_tez1[r1[k]]], v_tez1)), "| soni:", tarix1[k])
        print("tez2 tanladi:", r2[k], repr(decode([m_tez2[r2[k]]], v_tez2)), "| soni:", tarix2[k])
        break
```

**Natija:**

```
birinchi farq: 38-birlashtirishda
tez1 tanladi: (115, 116) 'st' | soni: 358
tez2 tanladi: (97, 114) 'ar' | soni: 358
```

37 ta birlashtirish bir xil. 38-sida `tez1` — `st` ni, `tez2` — `ar` ni tanladi.
Va ikkalasining soni — **bir xil**: 358.

Bu — **durang**. Ikki juft teng. `max(stats, key=stats.get)` bunday holatda qaysi
birini qaytaradi? **Lugʻatda birinchi turganini.** Lugʻatdagi tartib esa — kalitlar
qoʻshilgan tartib.

- `tez1` har qadamda `stats` ni **noldan** quradi — juftlar matndagi tartibda
  qoʻshiladi.
- `tez2` esa `stats` ni **oʻzgartirib boradi**: juftlar oʻchiriladi, yangilari
  oxiriga qoʻshiladi. Tartib — boshqa.

Ikkalasi ham "eng koʻp uchragan juftni" tanladi. Ikkalasi ham toʻgʻri. Lekin
**har xil**. Va 38-birlashtirishdan keyin ular butunlay boshqa yoʻldan ketadi.

> **Saboq:** agar natija **tasodifiy narsaga** (bu yerda — lugʻatdagi tartibga)
> bogʻliq boʻlsa, bu qoidani aniq yozish kerak.

### Durang qoidasi

Yangi qoida: **eng koʻp uchragan juft; durang boʻlsa — raqami kichigi.**

```python
def eng_juft(stats):
    eng_son = max(stats.values())
    nomzodlar = []
    for juft in stats:
        if stats[juft] == eng_son:
            nomzodlar.append(juft)
    return min(nomzodlar)


print(eng_juft({(5, 9): 7, (3, 4): 7, (1, 2): 2}))
```

**Natija:**

```
(3, 4)
```

- `stats.values()` — lugʻatning faqat **qiymatlari** (sonlar).
- `max(stats.values())` — eng katta son.
- `nomzodlar` — shu songa ega hamma juftlar.
- `min(nomzodlar)` — juftlar orasidagi eng kichigi. Juftlar ham solishtiriladi:
  avval birinchi raqam, teng boʻlsa — ikkinchisi. `(3, 4) < (5, 9)`.

Endi qoida **lugʻatdagi tartibga bogʻliq emas**.

<!-- animatsiya: p4 | Durang -->

Va bu yerda bitta chiroyli narsa: biz `train_tez1` va `train_tez2` ni **qayta
yozmaymiz**. Ular ikkalasi ham `eng_juft` ni chaqiradi. Python funksiyani
**chaqirilgan paytda** qidiradi — demak endi ikkalasi ham yangi `eng_juft` ni
ishlatadi:

```python
m_tez1, v_tez1, tarix1 = train_tez1(qism, 306, NAQSH)
m_tez2, v_tez2, tarix2 = train_tez2(qism, 306, NAQSH)

print(list(m_tez1.items()) == list(m_tez2.items()))
```

**Natija:**

```
True
```

**Mos keldi.** (`train_regex` esa endi biroz farq qiladi — u eski `max` ni ishlatadi.
Bu normal: u — boshqa durang qoidasi bilan ishlaydigan, xuddi shunday toʻgʻri
tokenizator.)

### Qancha tezlashdi?

```python
qism = normallashtir("\n".join(toza[:8000]))

for nom, funksiya in [("train_regex", train_regex), ("train_tez1", train_tez1), ("train_tez2", train_tez2)]:
    t0 = time.perf_counter()
    funksiya(qism, 306, NAQSH)
    print(f"{nom:12s} {time.perf_counter() - t0:.2f} soniya")
```

**Natija:**

```
train_regex  7.87 soniya
train_tez1   2.70 soniya
train_tez2   0.66 soniya
```

- `for nom, funksiya in [...]` — funksiyalarni ham roʻyxatga qoʻyish mumkin. Ular
  ham oddiy qiymat: `funksiya(...)` — roʻyxatdan olinganini chaqiradi.

Bu — kichkina boʻlakda, 50 ta birlashtirish. Butun korpusda farq **yanada**
katta boʻladi: `train_tez2` ning boshidagi hisob bir marta qilinadi, keyingi har
bir qadam esa faqat **tegilgan** soʻzlarni qayta ishlaydi. Oxirgi birlashtirishlar
— juda kam uchraydigan juftlar — atigi bir nechta soʻzga tegadi.

---

## 7. Haqiqiy trening: 16 384 token

Hammasi tayyor. Butun korpus, **16 384** hajmli lugʻat — yaʼni 16 128 ta
birlashtirish.

> Bu katak bir necha daqiqa ishlaydi. Mening kompyuterimda — 5 daqiqaga yaqin,
> Colab'da 5–10 daqiqa. Choy damlab keling.

```python
t0 = time.perf_counter()
merges, vocab, tarix = train_tez2(matn, 16384, NAQSH)

print(f"vaqt: {(time.perf_counter() - t0) / 60:.1f} daqiqa")
print("birlashtirishlar:", len(merges))
print("lugʻat:", len(vocab))
```

**Natija:**

```
vaqt: 5.0 daqiqa
birlashtirishlar: 16128
lugʻat: 16384
```

**17 soat → bir necha daqiqa.** Algoritm — oʻsha BPE. Natija — oʻsha (durang
qoidasigacha). Faqat behuda ish yoʻq.

### `tarix` nima deydi?

```python
for k in [0, 9, 99, 999, 9999, 16127]:
    print(f"{k + 1:6d}-birlashtirish: juft {tarix[k]:6d} marta uchragan")
```

**Natija:**

```
     1-birlashtirish: juft 154125 marta uchragan
    10-birlashtirish: juft  73164 marta uchragan
   100-birlashtirish: juft   9847 marta uchragan
  1000-birlashtirish: juft    587 marta uchragan
 10000-birlashtirish: juft     31 marta uchragan
 16128-birlashtirish: juft     16 marta uchragan
```

Birinchi birlashtirish — 154 ming marta uchragan juft. Oxirgisi — atigi **16**
marta. Bir million soʻzlik korpusda bu — juda kam. Oxirgi minglab tokenlar
**kamyob** soʻzlar uchun. Buni yodda tuting — 8-boʻlimda koʻrasiz.

### Saqlab qoʻyamiz

Colab sessiyasi tugasa, `merges` yoʻqoladi. Yana 5 daqiqa kutmaslik uchun — faylga
yozamiz. Dars 15 dagi `json` bilan:

```python
import json

royxat = []
for juft in merges:
    royxat.append([juft[0], juft[1], merges[juft]])

with open("merges_16k.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(royxat))

print(royxat[:3])
```

**Natija:**

```
[[108, 97, 256], [202, 187, 257], [97, 110, 258]]
```

JSON kortejni (`(a, b)`) lugʻat kaliti sifatida saqlay olmaydi. Shuning uchun har
bir birlashtirishni `[a, b, yangi_id]` roʻyxati qilib yozdik. Toʻgʻri saqlash va
qayta yuklash — Dars 18 da.

---

## 8. Tokenizator nimani oʻrgandi?

Birinchi oʻnta birlashtirish:

```python
for juft in list(merges)[:10]:
    print(repr(decode([merges[juft]], vocab)))
```

**Natija:**

```
'la'
'ʻ'
'an'
'sh'
'di'
'oʻ'
'in'
' b'
'da'
'li'
```

Birinchisi — `la` (`bolalar`, `kitoblar`… — koʻplik qoʻshimchasi). Ikkinchisi — `ʻ`:
uning ikki bayti (202, 187) bitta tokenga aylandi. Dars 14 ni eslang: normalizatsiyasiz
kichik tokenizatorda `ʻ` ikki boʻlakda qolib ketgan edi. Normalizatsiya tufayli bu
korpusda `ʻ` juda koʻp — va u ikkinchi oʻrinda birlashdi. Oltinchisi — `oʻ`.

Eng uzun tokenlar (Dars 15 dagi `sorted`):

```python
tokenlar = []
for tid in range(256, len(vocab)):
    tokenlar.append(decode([tid], vocab))

print(sorted(tokenlar, key=len, reverse=True)[:10])
```

**Natija:**

```
['Oʻzsanoatqurilishbank', ' takomillashtiriladi', ' rejalashtirilmoqda', ' rivojlantirishning', ' takomillashtirish', ' xususiylashtirish', ' oʻzbekistonliklar', 'Qoraqalpogʻistonda', ' Respublikasining', ' rivojlantirishga']
```

`takomillashtiriladi`, `rejalashtirilmoqda`, `rivojlantirishning` — oʻzbek tilining
uzun soʻzlari bitta token boʻldi. Bu — rasmiy yangiliklar tili: korpusdagi sarlavhalar
shunday soʻzlarga boy.

Va birinchi oʻrinda — **`Oʻzsanoatqurilishbank`**. Bank nomi! Necha marta uchraydi?

```python
print(matn.count("O\u02bbzsanoatqurilishbank"))
```

**Natija:**

```
26
```

Bir million soʻzlik korpusda — **26 marta**. Shu yetarli boʻldi: bu nom
16 384 ta joydan bittasini oldi. Dars 15 dagi metro maqolasini eslang — tokenizator
**oʻz korpusining koʻzgusi**.

Uchta jumlada sinab koʻramiz:

```python
for s in ["Oʻzbekiston Respublikasi Prezidenti farmon imzoladi.",
          "Bolalar maktabga borishdi.",
          "Toshkent metropolitenining halqa yoʻnalishida yangi bekat ochildi."]:
    t = encode_regex(normallashtir(s), merges, NAQSH)
    qismlar = []
    for x in t:
        qismlar.append(decode([x], vocab))
    print(len(t), "token:", qismlar)
```

**Natija:**

```
6 token: ['Oʻzbekiston', ' Respublikasi', ' Prezidenti', ' farmon', ' imzoladi', '.']
5 token: ['Bolalar', ' maktabga', ' bor', 'ishdi', '.']
13 token: ['Toshkent', ' met', 'rop', 'oli', 'ten', 'ining', ' hal', 'qa', ' yoʻnalishida', ' yangi', ' bekat', ' ochildi', '.']
```

- Birinchi jumla — **har bir soʻz bitta token**. Rasmiy til — korpusning yuragi.
- Ikkinchida ` bor` + `ishdi` — feʼl oʻzagi va qoʻshimchasi. Tokenizator morfologiyani
  hech kim oʻrgatmasdan topdi.
- Uchinchida `metropolitenining` **besh** boʻlakka boʻlindi. Korpusda metro haqida
  deyarli hech narsa yoʻq.

---

## 9. Kodlash ham sekin

Endi fertility oʻlchamoqchimiz: butun korpusni kodlab, tokenlarni sanash kerak.
Dars 13 dagi `encode_regex` bilan — korpusning kichik qismlarida:

```python
for n in [500, 1000, 2000]:
    qism = normallashtir("\n".join(toza[:n]))
    t0 = time.perf_counter()
    encode_regex(qism, merges, NAQSH)
    print(f"{n:5d} jumla | {time.perf_counter() - t0:.2f} soniya")
```

**Natija:**

```
  500 jumla | 0.18 soniya
 1000 jumla | 0.47 soniya
 2000 jumla | 2.06 soniya
```

Jumlalar **ikki** barobar — vaqt **ikki barobardan koʻp**. Matn kattalashgan sari
yomonlashadi. Nima uchun?

`encode_regex` ning ichida shu qator bor:

```
natija = natija + tk
```

`natija + tk` — **yangi** roʻyxat yasaydi: `natija` ning hamma elementlarini
nusxalab, oxiriga `tk` ni qoʻshadi. `natija` da 100 000 token boʻlsa — 100 000 ta
nusxa. Har bir boʻlak uchun. Roʻyxat oʻsgan sari har bir qadam qimmatlashadi.

Va **behuda ish №1** bu yerda ham bor: ` bilan` ni 9 ming marta qaytadan kodlaymiz —
har safar bir xil natija.

### `encode_tez`

```python
def encode_tez(matn, merges, naqsh):
    kesh = {}
    natija = []
    for bosh in re.findall(naqsh, matn):
        if bosh not in kesh:
            kesh[bosh] = encode_regex(bosh, merges, naqsh)
        natija.extend(kesh[bosh])
    return natija
```

Ikki yechim:

- **`kesh`** (*cache*) — lugʻat: boʻlak → uning tokenlari. Boʻlak birinchi marta
  kelganda — kodlaymiz va yozib qoʻyamiz. Keyingi safar — tayyorini olamiz.
  `encode_regex(bosh, ...)` — bitta boʻlakni ham shu funksiya kodlay oladi.
- **`.extend(...)`** — roʻyxatning **oxiriga** boshqa roʻyxatning elementlarini
  qoʻshadi. Yangi roʻyxat yasamaydi, nusxa olmaydi.

```python
royxat = [1, 2]
royxat.extend([3, 4])
print(royxat)
```

**Natija:**

```
[1, 2, 3, 4]
```

Sinov — bir xil natija berishi shart:

```python
qism = normallashtir("\n".join(toza[:2000]))

t0 = time.perf_counter()
a = encode_regex(qism, merges, NAQSH)
t1 = time.perf_counter()
b = encode_tez(qism, merges, NAQSH)
t2 = time.perf_counter()

print("bir xilmi:", a == b)
print(f"encode_regex: {t1 - t0:.2f} soniya")
print(f"encode_tez:   {t2 - t1:.2f} soniya")
```

**Natija:**

```
bir xilmi: True
encode_regex: 2.12 soniya
encode_tez:   0.23 soniya
```

Endi butun korpus:

```python
t0 = time.perf_counter()
tokenlar_hammasi = encode_tez(matn, merges, NAQSH)

print(f"vaqt: {time.perf_counter() - t0:.1f} soniya")
print("tokenlar:", len(tokenlar_hammasi))
print("round-trip:", decode(tokenlar_hammasi, vocab) == matn)
```

**Natija:**

```
vaqt: 6.1 soniya
tokenlar: 1748128
round-trip: True
```

Bir million soʻz — bir necha soniyada. Va round-trip (Dars 14) — toʻgʻri.

---

## 10. Fertility

Dars 01 dagi oʻlchovimiz: **bitta soʻzga nechta token**.

```python
sozlar_soni = len(matn.split())
baytlar = len(matn.encode("utf-8"))

print("soʻzlar:", sozlar_soni)
print("baytlar / soʻz:", round(baytlar / sozlar_soni, 3))
print("tokenlar / soʻz:", round(len(tokenlar_hammasi) / sozlar_soni, 3))
```

**Natija:**

```
soʻzlar: 981206
baytlar / soʻz: 8.161
tokenlar / soʻz: 1.782
```

Birlashtirishsiz (Dars 07 dagi "har bir bayt — token") bitta soʻzga 8 tadan ortiq
token ketardi. 16 384 hajmli lugʻat bilan — **2 tadan kam**. Taxminan 4.6 barobar
siqish.

(Bu yerda "soʻz" — boʻshliq bilan ajratilgan boʻlak. Har bir jumla oxiridagi nuqta
va yangi qator ham token boʻladi, shuning uchun qisqa jumlalarda fertility biroz
yuqoriroq chiqadi.)

### Lugʻat hajmi qancha boʻlishi kerak?

Birlashtirishlar tartib bilan oʻrganilgan. Demak birinchi 1 000 tasini olsak —
bu 1 256 hajmli tokenizator. Turli hajmlarni solishtiramiz:

```python
for hajm in [1024, 2048, 4096, 8192, 16384]:
    qisqa = {}
    for juft in merges:
        if merges[juft] < hajm:
            qisqa[juft] = merges[juft]
    t = encode_tez(matn, qisqa, NAQSH)
    print(f"{hajm:6d} | fertility: {len(t) / sozlar_soni:.3f}")
```

**Natija:**

```
  1024 | fertility: 3.141
  2048 | fertility: 2.652
  4096 | fertility: 2.282
  8192 | fertility: 1.998
 16384 | fertility: 1.782
```

Har safar lugʻat **ikki barobar** — lekin har safar yutuq **kamayib** boradi.
15.6% → 14.0% → 12.4% → 10.8% (Mashq 4 da hisoblaysiz). 16 384 dan keyin
yana ikki barobar oshirsak, yutuq yanada kichik boʻladi — lekin model uchun har bir
token qimmat (Kurs 2 da koʻrasiz). Mening haqiqiy tokenizatorim ham 16 384 hajmli.

---

## 11. Muammo

Bizda birinchi haqiqiy tokenizator bor: 16 384 token, bir million soʻzda oʻqitilgan,
fertility — 2 dan kam.

Lekin bitta savol. Bu raqamni **qayerda** oʻlchadik?

`matn` da. Tokenizatorni **oʻqitgan** matnimizda.

Bu — imtihon savollarini oldindan berib, keyin oʻsha savollardan imtihon olishga
oʻxshaydi. 8-boʻlimdagi `Oʻzsanoatqurilishbank` ni eslang: tokenizator uni bitta
token qilib **yodlab oldi** — chunki u shu matnda bor edi. Bizning fertility
raqamimiz bunday "yodlangan" soʻzlarni ham oʻz ichiga oladi.

Tokenizator **koʻrmagan** matnda qanday ishlaydi? Farq kattami yoki kichikmi —
buni taxmin qilmaymiz. **Oʻlchaymiz.**

Va eng qiziqi: buni tekshirish uchun matnni ikkiga boʻlish kifoyami? Esingizdami —
korpus **alifbo tartibida**. Va Dars 15 da biz dublikatlarni olib tashlashning
**ikkinchi** sababini keyinga qoldirgan edik.

Keyingi dars — aynan shu haqida. Va u mening oʻz xatoyim bilan boshlanadi.

---

## 12. Toʻliq kod

```python
import re
import json
import time
import hashlib
import unicodedata
import urllib.request

NAQSH = r" ?\w+| ?[^\s\w]+|\s+"
OKINA = "\u02bb"
TUTUQ = "\u02bc"
APOSTROFLAR = "'\u2018\u2019`\u02bb\u02bc"
MANZIL = ("https://raw.githubusercontent.com/common-voice/common-voice/"
          "57f42edbf6f6d3b128e0bcd3f916360af0d328b6/server/data/uz/sentence-collector.txt")


# ---- Dars 06–13 ----
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


# ---- Dars 14–15 ----
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


# ---- Dars 16 ----
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


# ---- 1. Yuklab olish va tozalash ----
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
print("jumlalar:", len(toza))

# ---- 2. Trening ----
matn = normallashtir("\n".join(toza))
t0 = time.perf_counter()
merges, vocab, tarix = train_tez2(matn, 16384, NAQSH)
print(f"trening: {(time.perf_counter() - t0) / 60:.1f} daqiqa")

royxat = []
for juft in merges:
    royxat.append([juft[0], juft[1], merges[juft]])
with open("merges_16k.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(royxat))

# ---- 3. Oʻlchash ----
tokenlar_hammasi = encode_tez(matn, merges, NAQSH)
print("round-trip:", decode(tokenlar_hammasi, vocab) == matn)
print("fertility:", round(len(tokenlar_hammasi) / len(matn.split()), 3))
```

**Kutilgan natija** (vaqt sizda boshqacha boʻladi):

```
jumlalar: 148102
trening: 5.3 daqiqa
round-trip: True
fertility: 1.782
```

---

## 13. Oʻzingiz yozing

`train_tez2` ning yuragi — tanlangan juftni birlashtirib, faqat tegilgan soʻzlarni
yangilaydigan qism. Uni toʻldiring:

```python
for i in qayerda[eng]:
    eski = sozlar[i]
    yangi = ___(eski, eng, yangi_id)
    if len(yangi) == len(eski):
        ___
    for j in zip(eski, eski[1:]):
        stats[j] ___ sonlar[i]
        if stats[j] == 0:
            ___ stats[j]
    for j in zip(yangi, yangi[1:]):
        stats[j] = stats.___(j, 0) + sonlar[i]
        if j not in qayerda:
            qayerda[j] = ___()
        qayerda[j].___(i)
    sozlar[i] = ___
```

<details>
<summary>Yechimni koʻrsatish</summary>

```py
# train_tez2 ichidagi qism
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
```

Tekshirish uchun — 6-boʻlimdagi sinov: `train_tez1` va `train_tez2` ning
natijalari bir xil boʻlishi kerak.

Eng koʻp qilinadigan xatolar:

1. `-=` oʻrniga `-= 1` — soʻz necha marta uchragan boʻlsa, shuncha ayirish kerak.
   Natija: `stats` asta-sekin notoʻgʻri boʻlib boradi, va sinov bir necha oʻn
   qadamdan keyin buziladi.
2. `qayerda[j] = set()` ni har safar yozish (`if` siz) — oldingi soʻzlar roʻyxati
   oʻchib ketadi. Keyingi birlashtirishlar baʼzi soʻzlarga **tegmay** qoladi.
3. `sozlar[i] = yangi` ni unutish — soʻz oʻzgarmaydi, keyingi qadamda yana eski
   juftlar ayiriladi va `stats` manfiy sonlarga tushadi.
</details>

---

## 14. Mashqlar

---

**Mashq 1.** Ishga tushirmasdan ayting: `boshlar_sana(" va va bilan va", NAQSH)`
nima qaytaradi?

<details>
<summary>Javobni koʻrsatish</summary>

```python
print(boshlar_sana(" va va bilan va", NAQSH))
```

```
{' va': 3, ' bilan': 1}
```

Regex `" ?\w+"` — boʻshliq **soʻz bilan birga** olinadi (Dars 13). Shuning uchun
boʻlaklar: ` va`, ` va`, ` bilan`, ` va`. Noyoblari — ikkita. ` va` — 3 marta.
</details>

---

**Mashq 2.** `encode_tez` ning kesh i qanchalik foydali? Butun korpusda
`encode_regex` necha marta chaqiriladi, va kesh necha marta ishga tushadi?

<details>
<summary>Javobni koʻrsatish</summary>

```python
jami = len(re.findall(NAQSH, matn))
noyob = len(boshlar_sana(matn, NAQSH))

print("boʻlaklar:", jami)
print("encode_regex chaqiriladi:", noyob)
print(f"keshdan olinadi: {jami - noyob} ({(jami - noyob) / jami:.1%})")
```

```
boʻlaklar: 1331204
encode_regex chaqiriladi: 153567
keshdan olinadi: 1177637 (88.5%)
```

- `:.1%` — f-satrda sonni **foiz** qilib, bir xona aniqlikda chiqaradi.

Har 10 ta boʻlakdan 9 tasi — keshdan. Bu tasodif emas. Tilda bir necha yuz soʻz
(` va`, ` bilan`, ` bu`, `.`) matnning katta qismini tashkil qiladi — 5-boʻlimdagi
roʻyxatni eslang. Har qanday tilda shunday. Kesh aynan shu notekislikdan foyda oladi.
</details>

---

**Mashq 3.** `tarix` roʻyxatidan foydalanib toping: nechanchi birlashtirishdan
boshlab tanlangan juft **100 martadan kam** uchraydi? Bu nimani anglatadi?

<details>
<summary>Javobni koʻrsatish</summary>

```python
for k in range(len(tarix)):
    if tarix[k] < 100:
        print(f"{k + 1}-birlashtirish: {tarix[k]} marta")
        break

kam = 0
for son in tarix:
    if son < 100:
        kam += 1
print("100 dan kam:", kam, "ta birlashtirish")
```

```
4199-birlashtirish: 99 marta
100 dan kam: 11930 ta birlashtirish
```

4 199-birlashtirishdan boshlab — hammasi 100 martadan kam. 16 128 tadan **11 930
tasi** — 74%. Lugʻatning katta qismi — korpusda 100 martadan kam uchragan juftlar.
Bir million soʻzda 100 marta — bu har 10 000 soʻzda bir marta.

Bunday tokenlar xavfli tomonga ogʻishi mumkin: ular **shu korpusdagi** kamyob
soʻzlarni yodlaydi (`Oʻzsanoatqurilishbank`). Boshqa matnda ular deyarli
ishlatilmaydi. Bu Dars 17 ning savoliga bogʻlanadi.
</details>

---

**Mashq 4.** 10-boʻlimdagi jadvaldan: lugʻat har ikki barobar oshganda fertility
necha foizga kamaydi? Qaysi qadamda yutuq eng kichik?

<details>
<summary>Javobni koʻrsatish</summary>

```python
oldingi = None
for hajm in [1024, 2048, 4096, 8192, 16384]:
    qisqa = {}
    for juft in merges:
        if merges[juft] < hajm:
            qisqa[juft] = merges[juft]
    f = len(encode_tez(matn, qisqa, NAQSH)) / sozlar_soni
    if oldingi is None:
        print(f"{hajm:6d} | {f:.3f}")
    else:
        print(f"{hajm:6d} | {f:.3f} | {(oldingi - f) / oldingi:.1%} kamaydi")
    oldingi = f
```

```
  1024 | 3.141
  2048 | 2.652 | 15.6% kamaydi
  4096 | 2.282 | 14.0% kamaydi
  8192 | 1.998 | 12.4% kamaydi
 16384 | 1.782 | 10.8% kamaydi
```

- `oldingi is None` — "hali oldingi qiymat yoʻqmi?" (`None` — Dars 12 dagi
  `eng_j = None` kabi).

Har ikki barobarda yutuq kichrayib boradi. Bu — **kamayuvchi qaytim**: lugʻatga
qoʻshilgan har bir yangi token avvalgisidan kamroq uchraydigan narsani ifodalaydi
(Mashq 3).
</details>

---

**Mashq 5 (eng muhimi).** 3-boʻlimda 0 dan katta, lekin 0.3 dan kichik kirill
ulushiga ega jumlalarni qoldirdik. Ulardan biri:

```
Eshikdan chiqayotib, Аzizaning yalt etgan hurkak nigohini sezdi.
```

Bu jumlada nima gʻalati? Koʻz bilan topib boʻlmaydi — kod bilan toping. Keyin
bunday jumlalar korpusda nechta ekanini sanang va tokenizatorimiz `Аzizaning` ni
qanday kodlashini koʻring.

<details>
<summary>Javobni koʻrsatish</summary>

```python
jumla = "Eshikdan chiqayotib, \u0410zizaning yalt etgan hurkak nigohini sezdi."

for belgi in jumla:
    if ord(belgi) >= 1024 and ord(belgi) <= 1279:
        print(repr(belgi), ord(belgi), unicodedata.name(belgi))
```

```
'А' 1040 CYRILLIC CAPITAL LETTER A
```

`Аzizaning` dagi birinchi harf — lotincha `A` (65) emas, **kirillcha** `А` (1040).
Koʻzga — aynan bir xil. Bunday harflar **gomoglif** deyiladi: shakli bir xil,
raqami boshqa. Odamlar ikki tilli klaviaturada yozganda tez-tez uchraydi.

Korpusda nechta?

```python
lotin_ichida = 0
for j in toza:
    for i in range(1, len(j) - 1):
        oldingi = j[i - 1]
        keyingi = j[i + 1]
        if (ord(j[i]) >= 1024 and ord(j[i]) <= 1279
                and oldingi.isascii() and oldingi.isalpha()
                and keyingi.isascii() and keyingi.isalpha()):
            lotin_ichida += 1
            break
print("lotin soʻz ichida kirill harfi bor jumlalar:", lotin_ichida)

for s in ["\u0410zizaning", "Azizaning"]:
    t = encode_tez(normallashtir(" " + s), merges, NAQSH)
    qismlar = []
    for x in t:
        qismlar.append(decode([x], vocab))
    print(repr(s), len(t), "token:", qismlar)

kirill_tokenlar = []
for tid in range(256, len(vocab)):
    t = decode([tid], vocab)
    if kirill_ulushi(t) > 0:
        kirill_tokenlar.append(t)
print("lugʻatdagi kirill tokenlar:", kirill_tokenlar)
```

```
lotin soʻz ichida kirill harfi bor jumlalar: 34
'Аzizaning' 3 token: [' А', 'ziz', 'aning']
'Azizaning' 3 token: [' A', 'ziz', 'aning']
lugʻatdagi kirill tokenlar: ['А', ' А', ' Аmir']
```

- `.isascii()` — belgi oddiy lotin klaviaturasidagi (0–127) belgimi?
- Uzun shart qavs ichida bir necha qatorga boʻlingan — Python qavs ichida qator
  koʻchishiga ruxsat beradi.
- Bizning sanoq faqat soʻz **ichidagi** gomogliflarni topadi (ikki tomonida lotin
  harfi). `Аzizaning` dagi kabi soʻz **boshidagilari** ham bor — ularni sanash
  uchun shartni kengaytirish kerak. Sinab koʻring.

Token soni bir xil — lekin tokenlar **boshqa**: ` А` va ` A`. Model uchun `Аziza`
va `Aziza` — ikki xil ism, va u ularni bir-biriga bogʻlay olmaydi.

Oxirgi qatorga qarang: lugʻatda **uchta** kirill token bor — `А`, ` А` va
**` Аmir`**. Amir Temur haqidagi jumlalarda kimdir `А` ni kirillcha yozgan — va bu
xato shunchalik koʻp takrorlanganki, 16 384 ta joydan biri unga ketdi.

**Tuzatish** — Dars 14 dagi kabi normalizatsiya: lotin harflari orasidagi kirillcha
`А`, `о`, `е`, `с`, `р` … ni lotinchasiga almashtirish. Lekin ehtiyot boʻling:
rus tilidagi iqtibos ichidagi harflarga tegmaslik kerak (Dars 15 dagi `«Спасибо
всем!»`). Shuning uchun qoida harfning **atrofiga** qarashi kerak — xuddi apostrof
qoidasidek.

Bu mashqning saboqi: tozalash hech qachon tugamaydi. Har safar korpusga yangi
koʻz bilan qarasangiz — yangi narsa topasiz.
</details>

---

## 15. Xulosa

1. **Common Voice** — 148 391 ta oʻzbekcha jumla, **CC0**. Versiya raqami bilan
   yuklab olsangiz — hammada bir xil fayl, bir xil raqamlar.
2. Bu korpusda ham `‘` — eng koʻp apostrof. Normalizatsiyadan keyin yana **283**
   dublikat chiqdi.
3. **Koʻrinmas belgilar** (`\u00ad`, `\u200b`) — haqiqatan koʻrinmas devor.
   Oʻchiriladi.
4. `train_regex` butun korpusda — **17 soatdan ortiq**.
5. **Behuda ish №1:** bir xil boʻlaklarni qayta-qayta sanash. Yechim — noyob boʻlak
   + soni. 1.33 mln → 153 ming.
6. **Behuda ish №2:** har qadamda hamma soʻzni qayta sanash. Yechim — `qayerda`
   indeksi va faqat **tegilgan** soʻzlarni yangilash.
7. Tez versiya **aynan bir xil** natija berishi kerak — buni sinov bilan isbotlang.
8. **Durang** — tasodifiy tartibga bogʻliq. Qoidani aniq yozing: eng koʻp; teng
   boʻlsa — raqami kichigi.
9. Kodlash ham: `natija + tk` → `.extend`, va **kesh**.
10. 16 384 token, fertility — 2 dan kam. Lekin bu raqam **oʻqitilgan matnda**
    oʻlchangan.

---

## Keyingi dars

**Dars 17 — Halol baholash: ifloslanish.** Tokenizatorni koʻrmagan matnda qanday
oʻlchash kerak? Matnni ikkiga qanday boʻlish kerak — va nima uchun alifbo tartibidagi
korpusni "boshidan 90%" deb boʻlish xato? Va men oʻz modelimni solishtirganda
qilgan xato — test matnim trening matni ichida boʻlib chiqqani.

Keyingi darsning savoli: *agar tokenizatorni oʻqitgan matnimizda emas, boshqa
matnda oʻlchasak, fertility yaxshilanadimi yoki yomonlashadimi — va qanchaga?*
