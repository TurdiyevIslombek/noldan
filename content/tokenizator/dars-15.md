# Dars 15 — Maʼlumot: qayerdan olish va qanday tozalash

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 14 — Oʻzbek apostrofi
> **Vaqt:** ~75 daqiqa
> **Kerak:** Dars 01–14. `normallashtir` (Dars 14), `train_regex`, `encode_regex`, `NAQSH` (Dars 13)

---

## Bu darsdan keyin siz...

- **bilasiz** oʻzbek matni internetda qayerda bor — va qancha (haqiqiy raqamlar bilan);
- **ajrata olasiz** uchta savolni: undan oʻqitsam boʻladimi, uni tarqatsam boʻladimi, nima shart;
- **koʻrasiz** "tozalangan" korpus ichida aslida nimalar yotganini;
- **oʻqiysiz va yozasiz** fayllarni — va notoʻgʻri kodlash harflarni qanday buzishini;
- **qurasiz** olti bosqichli tozalash quvurini, har bosqichda raqam bilan;
- **oʻlchaysiz** iflos korpus tokenizatorga nima qilishini.

---

## 1. Bitta savol

Dars 14 oxirida savol qoldirgan edim:

> Agar bitta yangilik maqolasi oʻnta saytda qayta chop etilgan boʻlsa — va hammasi
> korpusingizga tushsa — bu tokenizatorga qanday taʼsir qiladi?

Dars 08 ni eslang: BPE **eng koʻp uchragan** juftni birlashtiradi. U "bu juft
muhimmi?" deb soʻramaydi. Faqat sanaydi.

Demak bitta maqola oʻn marta uchrasa, uning soʻzlari tokenizator uchun **oʻn
barobar muhim** boʻlib qoladi. Lugʻatdagi joylar — cheklangan. Ular oʻsha bitta
maqolaga ketadi.

Bu — gipoteza. Darsning oxirida uni oʻlchaymiz. Lekin avval bizga haqiqiy matn
kerak. U qayerdan keladi?

---

## 2. Oʻzbek matni qayerda bor

Shu paytgacha biz oʻzimiz yozgan 7 qatorli matnda ishladik. Haqiqiy tokenizatorga
**millionlab** hujjat kerak. Hech kim ularni qoʻlda yozmaydi — ular internetdan
olinadi.

### Common Crawl

**Common Crawl** — notijorat tashkilot. U internetni muntazam aylanib chiqadi,
sahifalarni yuklab oladi va hammasini **bepul** tarqatadi. Har bir aylanish —
bitta **surat** (snapshot) deyiladi.

Lekin Common Crawl — xom material. Unda HTML kodi, menyular, reklama, yuzlab
tillar, spam — hammasi aralash. Undan foydalanish uchun kimdir tozalashi kerak.

### FineWeb-2

**FineWeb-2** — Hugging Face jamoasi Common Crawl'dan yasagan korpus. Ular:

1. **96 ta suratni** oldi — 2013-yil yozidan 2024-yil aprelgacha;
2. HTML'dan **faqat matnni** ajratdi (`trafilatura` dasturi bilan);
3. har bir hujjatning **tilini aniqladi** (`GlotLID` modeli bilan);
4. har bir til uchun **dublikatlarni** olib tashladi;
5. sifat **filtrlari**dan oʻtkazdi.

Natija — taxminan 20 terabayt, 1 868 ta til-yozuv juftligi. Oʻzbek tili ikki
boʻlimda:

| Boʻlim | Hujjatlar | Soʻzlar | Hajmi (UTF-8) |
|---|---|---|---|
| `uzn_Latn` — lotin | 1 233 463 | 687 002 994 | 4.45 GB |
| `uzn_Cyrl` — kirill | 1 357 811 | 544 866 919 | 6.12 GB |

Ikkita narsaga eʼtibor bering.

**Birinchi:** kirill yozuvidagi oʻzbekcha hujjatlar lotinchadan **koʻproq** — 124 348
taga. Internetning katta qismi hali kirillda. Bizning tokenizatorimiz lotin
uchun — demak bu hujjatlarni ishlatmaymiz (8-boʻlimda qaytamiz).

**Ikkinchi:** shu korpusda rus tilida **588 579 493 780** soʻz bor. Bu oʻzbek lotin
boʻlimidan **857 marta** koʻp. Dars 01 da "nega oʻzbek tili AI uchun qimmat?" deb
soʻragan edik. Mana javobning bir qismi — raqamda.

### Boshqa manbalar

| Manba | Oʻzbekcha hajmi | Nima | Qayerda |
|---|---|---|---|
| **FineWeb-2** | 1.23 mln hujjat (lotin) | Common Crawl 2013–2024, tozalangan | Hugging Face |
| **CC-100** | 91 mln token, 0.7 GiB | Common Crawl, faqat 2018-yil | Hugging Face, statmt |
| **OSCAR** | — | Common Crawl, bir necha versiya | Hugging Face, **soʻrov bilan** |
| **Vikipediya** | 354 569 maqola (2026-avgust) | ensiklopediya | dumps.wikimedia.org |
| **UzCrawl** | 1.3 mln yangilik + 368 ming Telegram post | yangilik saytlari, Telegram | Hugging Face |

Bir nechta izoh:

- **CC-100** — XLM-R modelini oʻqitish uchun yigʻilgan. Kichik va eski (2018).
- **OSCAR** — yuklab olish uchun avval ruxsat soʻrash kerak.
- **Vikipediya** — tili toza, lekin oʻzbekcha maqolalarning koʻpi **botlar** bilan
  yaratilgan (2013-yilda butun Oʻzbekiston milliy ensiklopediyasi import qilingan).
  Mavzular tor, uslub bir xil.
- **UzCrawl** — yangiliklar uchun eng katta manba. Uning litsenziyasi haqida 4-boʻlimda.

Bu darsda **FineWeb-2** bilan ishlaymiz: eng katta, eng yangi, va — muhimi — har bir
hujjat haqida koʻp maʼlumot saqlaydi.

---

## 3. Bitta haqiqiy yozuv

FineWeb-2 ning har bir hujjati — bitta **yozuv** (record). Oʻzbek lotin boʻlimining
eng birinchi yozuvi mana bunday:

| Maydon | Qiymati | Maʼnosi |
|---|---|---|
| `text` | `Qirg’izistonda joriy yil qator oliygohlarda…` | matnning oʻzi |
| `url` | `http://www.amerikaovozi.com/content/higher-education-kyrgyzstan/1476380.html` | qaysi sahifadan |
| `dump` | `CC-MAIN-2013-20` | qaysi Common Crawl suratidan |
| `date` | `2013-06-19T04:27:40Z` | qachon yuklangan |
| `language` | `uzn` | til (shimoliy oʻzbek) |
| `language_script` | `Latn` | yozuv |
| `language_score` | `1.000` | til aniqlovchi qanchalik ishonchli |
| `minhash_cluster_size` | **17** | ⬅ shunga diqqat |

Oxirgi maydon — eng qiziqarlisi. **17** — bu matn Common Crawl'da **17 nusxada**
topilganini bildiradi. FineWeb-2 ulardan **bittasini** qoldirdi, qolgan 16 tasini
tashladi — va qancha boʻlganini shu yerga yozib qoʻydi.

Nusxalar qayerdan keladi? Bir xil sahifa har yili qayta yuklanadi (96 ta surat!),
maqolalar boshqa saytlarga koʻchiriladi, bitta sahifa bir necha manzilda turadi.
Demak 1-boʻlimdagi savol xayoliy emas. Men koʻrgan birinchi 14 ta hujjat orasida
`79` va `91` ham bor edi — ikkalasi Vikipediya maqolalari.

### Yuklab olish

Colab'da FineWeb-2 dan hujjatlarni shunday oʻqish mumkin:

```python
# Colab'da, agar kerak boʻlsa, avval:  !pip install datasets
from datasets import load_dataset

ds = load_dataset("HuggingFaceFW/fineweb-2", name="uzn_Latn", split="train", streaming=True)

for hujjat in ds:
    print(hujjat["url"])
    print(hujjat["dump"], round(hujjat["language_score"], 3), hujjat["minhash_cluster_size"])
    print(hujjat["text"][:80])
    break
```

**Natija:**

```
http://www.amerikaovozi.com/content/higher-education-kyrgyzstan/1476380.html
CC-MAIN-2013-20 1.0 17
Qirg’izistonda joriy yil qator oliygohlarda byudjet o’rinlari bo’sh qolgan. Muta
```

Har bir parametr:

- `"HuggingFaceFW/fineweb-2"` — korpusning Hugging Face'dagi nomi.
- `name="uzn_Latn"` — qaysi boʻlim. Kirill uchun — `"uzn_Cyrl"`.
- `split="train"` — qaysi qism. FineWeb-2 da kichkina `test` qismi ham bor — va
  korpus mualliflari ochiq yozgan: **undan oʻqitmang**. Nima uchun — Dars 17 da.
- `streaming=True` — 1.9 GB ni birdaniga yuklamaydi. Hujjatlarni **birma-bir**
  oʻqiydi. `for` tsikli har aylanganda — bitta yangi hujjat.
- `break` — birinchi hujjatdan keyin toʻxtaymiz (Dars 10).

Bu darsning qolgan qismida biz katta korpus bilan emas, **kichkina oʻquv korpusi**
bilan ishlaymiz — 29 ta hujjat. Sababi oddiy: 1.2 million hujjatda har bir
bosqichni koʻz bilan tekshirib boʻlmaydi. 29 tada — boʻladi. Oʻquv korpusidagi
matnlar kurs uchun yozilgan, lekin ulardagi muammolar haqiqiy: bir qismini
FineWeb-2 ning oʻzida topdim (5-boʻlimda koʻrasiz), qolganlari — FineWeb-2 kabi
korpuslar xom internet matnidan olib tashlaydigan narsalar.

---

## 4. Litsenziya: uchta savol

"Internetda bor" degani "xohlagancha ishlatsa boʻladi" degani emas.

Har bir manba uchun **uchta** savol bering:

1. Undan **oʻqitsam** boʻladimi? (tokenizator yoki model)
2. Matnning oʻzini **qayta tarqatsam** boʻladimi? (masalan, tozalangan korpusni
   saytga qoʻyish)
3. Buning uchun nima **shart**?

| Manba | Litsenziya | Asosiy shart |
|---|---|---|
| FineWeb-2 | **ODC-By 1.0** | manbani koʻrsatish |
| Vikipediya | **CC BY-SA** | manbani koʻrsatish **va** oʻzgartirilgan matnni **xuddi shu litsenziya** bilan tarqatish |
| OSCAR | metamaʼlumot — CC0 | matnning oʻzi — Common Crawl'dan; kirish uchun soʻrov |
| CC-100 | Hugging Face sahifasida — "unknown" | aniq emas |
| UzCrawl | yorliqda — Apache-2.0 | pastga qarang |

### Eng muhim farq: toʻplam va matn

Bu jadvaldagi litsenziyalar — asosan **toʻplamni yigʻgan odamlarning ishi**
uchun: tanlash, tozalash, qadoqlash. Matnning oʻzini esa ular yozmagan. Uni
saytlar, jurnalistlar, oddiy odamlar yozgan.

OSCAR buni ochiq aytadi: CC0 faqat **metamaʼlumot** uchun, matn esa Common
Crawl'dan olingan. FineWeb-2 sayt egalari uchun **oʻchirish soʻrovi** shaklini
ochib qoʻygan. UzCrawl'ning yorligʻi Apache-2.0 — lekin ichidagi yangilik
maqolalari yangilik saytlariniki.

**Yorliqdagi litsenziya — bu toʻplamni yigʻganlarning ruxsati. Matn egasining
emas.**

### Shaxsiy maʼlumot

FineWeb-2 elektron pochta manzillarini `email@example.com` ga, IP manzillarni
soxta raqamlarga almashtirgan. **Telefon raqamlarini esa almashtirmagan** —
mualliflar yozishicha, ularni qidiradigan qoida juda koʻp xato qilgan. Demak
korpusingizda telefon raqamlari boʻlishi mumkin.

### Amaliy qoidalar

1. **Har bir manbani yozib qoʻying:** nomi, versiyasi, qachon yuklangani,
   litsenziyasi, havolasi. 15-boʻlimda buni kod bilan qilamiz.
2. **Model chiqarsangiz** — qaysi korpusda oʻqitilganini koʻrsating.
3. **Korpusni tarqatmoqchi boʻlsangiz** — eng qattiq litsenziyaga qarang.
   Vikipediya matni aralashgan boʻlsa — CC BY-SA sharti butun toʻplamga taʼsir
   qilishi mumkin.

> Men yurist emasman. Bu boʻlim — xarita, yuridik maslahat emas. Tijoriy loyiha
> boʻlsa, mutaxassisdan soʻrang.

Bu darsdagi oʻquv korpusi kurs uchun yozilgan — uni istalgancha ishlating.

---

## 5. "Tozalangan" korpus ichida nima bor

FineWeb-2 — "tozalangan" korpus. Men oʻzbek lotin boʻlimining **birinchi 14 ta
hujjatini** oʻqib chiqdim. Mana topganlarim:

**1. Buzilgan harflar.** `samdu.uz` dagi hujjatda shunday satrlar bor:

```
Ushbu ma‚Äôruza muallif tomonidan 2009 yilda Samarqand Davlat universitetida o‚Äôtkazilgan ‚ÄĚSinguilarity Theory
```

`ma‚Äôruza` — aslida `ma’ruza`. `o‚Äôtkazilgan` — aslida `o’tkazilgan`. Bitta
belgi uchta axlat belgiga aylangan. Va oʻsha hujjatning **boshqa joyida**
`o’qituvchilar` toʻgʻri yozilgan. Bitta hujjat — ham toʻgʻri, ham buzuq.

**2. Sayt qoldiqlari.** Oʻsha hujjat `DocumentsDate added` bilan boshlanadi — bu
saytning jadval sarlavhasi. TED saytidagi hujjat
`Click on any phrase to play the video at that point.Close` bilan boshlanadi va
inglizcha tarjimai hol bilan tugaydi: `…its rings and its moons. Full bio »`.
Uning `language_score` i — **1.000**.

**3. Shablon satrlar.** Uchta Vikipediya hujjati bir xil satr bilan tugaydi:

```
|Ushbu maqolani yozishda Oʻzbekiston milliy ensiklopediyasi (2000-2005) maʼlumotlaridan foydalanilgan.|
```

**4. Aralash apostroflar.** "Yusuf" maqolasida bitta hujjatning oʻzida `'` 253
marta, `ʻ` 27 marta, `ʼ` 11 marta uchraydi. Dars 14 dagi muammo — bitta hujjat
ichida.

> **"Tozalangan" korpus — toza korpus emas.** Bu — boshqa birov **oʻz maqsadi
> uchun** tozalagan korpus. Sizning maqsadingiz boshqa boʻlishi mumkin.

Bu toʻrt muammoning hammasi bizning oʻquv korpusimizda bor. Ularni topish va
tuzatish uchun avval fayllar bilan ishlashni oʻrganamiz.

---

## 6. Fayllar bilan ishlash

Shu paytgacha matnni toʻgʻridan-toʻgʻri kodga yozdik: `matn = "..."`. Haqiqiy
korpus esa **faylda** turadi.

### Faylga yozish

```python
with open("salom.txt", "w", encoding="utf-8") as f:
    f.write("Salom, dunyo!\n")
    f.write("O\u02bbzbek tili\n")

print("yozildi")
```

**Natija:**

```
yozildi
```

Har bir qism:

- `open(...)` — faylni ochadi.
- `"salom.txt"` — fayl nomi. Colab'da u chap tomondagi papka belgisida paydo
  boʻladi.
- `"w"` — **yozish** rejimi (*write*). ⚠️ Agar fayl bor boʻlsa, uning ichidagi
  hamma narsa **oʻchadi**.
- `encoding="utf-8"` — harflarni baytlarga **qanday** aylantirish (Dars 06).
- `with ... as f:` — faylni ochib, unga `f` deb nom beradi. Ichkariga surilgan
  qatorlar tugagach, faylni **oʻzi yopadi**. Yopilmagan fayl — yozilmay qolgan
  maʼlumot boʻlishi mumkin.
- `f.write(...)` — matnni yozadi. **Yangi qatorga oʻtkazmaydi** — `\n` ni oʻzimiz
  qoʻshdik.

### Fayldan oʻqish

```python
with open("salom.txt", encoding="utf-8") as f:
    matn = f.read()

print(repr(matn))
```

**Natija:**

```
'Salom, dunyo!\nOʻzbek tili\n'
```

- Rejim yozilmasa — **oʻqish** rejimi.
- `f.read()` — butun faylni bitta satr qilib qaytaradi.

Faylni **qatorma-qator** ham oʻqish mumkin — `for` bilan:

```python
with open("salom.txt", encoding="utf-8") as f:
    for qator in f:
        print(repr(qator), "->", repr(qator.strip()))
```

**Natija:**

```
'Salom, dunyo!\n' -> 'Salom, dunyo!'
'Oʻzbek tili\n' -> 'Oʻzbek tili'
```

Har bir qator oxirida `\n` bor. `.strip()` — satrning **ikki chetidagi** boʻshliq
va `\n` larni olib tashlaydi. Oʻrtasidagilarga tegmaydi:

```python
print(repr("   salom   ".strip()))
print(repr("\n\n matn \n".strip()))
print(repr(" bir  ikki ".strip()))
```

**Natija:**

```
'salom'
'matn'
'bir  ikki'
```

Va Dars 01 dagi `.split()` ga argument bersangiz — oʻsha belgi boʻyicha boʻladi:

```python
print(matn.split("\n"))
```

**Natija:**

```
['Salom, dunyo!', 'Oʻzbek tili', '']
```

Oxirgi `''` ga eʼtibor bering: oxirgi `\n` dan keyin **boʻsh satr** qoldi. Bu
bizga keyin kerak boʻladi.

### Notoʻgʻri kodlash

Endi oʻsha faylni **boshqa kodlash** bilan oʻqiymiz:

```python
with open("salom.txt", encoding="latin-1") as f:
    print(repr(f.read()))
```

**Natija:**

```
'Salom, dunyo!\nOÊ»zbek tili\n'
```

`Oʻzbek` → `OÊ»zbek`. Nima boʻldi? Dars 06 ni eslang:

```python
print(list("\u02bb".encode("utf-8")))
print(chr(202), chr(187))
```

**Natija:**

```
[202, 187]
Ê »
```

`ʻ` — UTF-8 da **ikki bayt**: 202 va 187. `latin-1` esa har bir baytni **alohida
harf** deb oʻqiydi: 202 → `Ê`, 187 → `»`. Baytlar toʻgʻri. **Oʻqish usuli**
notoʻgʻri.

Bu hodisaning nomi bor: **mojibake** (yaponcha — "buzilgan harflar").
5-boʻlimdagi `ma‚Äôruza` — aynan shu. Faqat u yerda boshqa kodlash ishlatilgan.

### Ataylab xato: `ascii`

`ascii` — eng eski kodlash. U faqat 0 dan 127 gacha baytlarni biladi:

```python
with open("salom.txt", encoding="ascii") as f:
    print(f.read())
```

**Natija:**

```
UnicodeDecodeError: 'ascii' codec can't decode byte 0xca in position 15: ordinal not in range(128)
```

Xatoni oʻqiymiz:

- `UnicodeDecodeError` — **baytdan matnga** aylantirishda xato.
- `'ascii' codec can't decode byte 0xca` — `ascii` `0xca` baytini oʻqiy olmadi.
  `0xca` — bu 202 ning oʻn oltilik yozuvi. `ʻ` ning birinchi bayti!
- `in position 15` — 15-baytda. `Salom, dunyo!\n` — 14 bayt, keyin `O` (14-bayt),
  keyin `ʻ` (15-bayt).
- `ordinal not in range(128)` — 202 soni 0–127 oraligʻida emas.

`latin-1` xato bermadi — **jim** buzdi. `ascii` esa baqirdi. Qaysi biri yaxshiroq?
**Baqirgani.** Jim buzilgan matn korpusga kirib ketadi va uni hech kim sezmaydi.

> **Qoida:** har doim `encoding="utf-8"` deb yozing — oʻqiganda ham, yozganda ham.

<!-- animatsiya: p2 | Buzilgan harflar -->

---

## 7. JSON va JSONL

Korpusda har bir hujjat uchun matndan tashqari **maʼlumot** ham saqlaymiz: qayerdan
olingani, raqami. Bunga Dars 04 dagi lugʻat (`dict`) mos keladi. Lekin lugʻatni
faylga qanday yozamiz?

**JSON** — lugʻatni matnga aylantirishning standart usuli:

```python
import json

hujjat = {"id": 1, "url": "https://misol.uz", "text": "Salom"}
satr = json.dumps(hujjat)

print(satr)
print(type(satr))
```

**Natija:**

```
{"id": 1, "url": "https://misol.uz", "text": "Salom"}
<class 'str'>
```

- `json.dumps(...)` — lugʻat → **matn** (*dump string*).

Teskarisi:

```python
qaytdi = json.loads(satr)

print(qaytdi["text"])
print(qaytdi == hujjat)
```

**Natija:**

```
Salom
True
```

- `json.loads(...)` — matn → **lugʻat** (*load string*). Toʻliq qaytdi.

### `ensure_ascii` tuzogʻi

```python
h = {"text": "o\u02bbzbek"}

print(json.dumps(h))
print(json.dumps(h, ensure_ascii=False))
```

**Natija:**

```
{"text": "o\u02bbzbek"}
{"text": "oʻzbek"}
```

Standart holatda `json.dumps` **ascii** dan tashqaridagi har bir belgini `\u02bb`
koʻrinishida yozadi — 6 ta belgi bitta harf oʻrniga. Maʼlumot yoʻqolmaydi (`json.loads`
uni qaytaradi), lekin faylni koʻz bilan oʻqib boʻlmaydi va u kattaroq boʻladi.
`ensure_ascii=False` — "harflarni oʻzicha yoz".

### JSONL — har qatorda bitta hujjat

Korpus fayllari odatda **JSONL** formatida: har bir qatorda — bitta JSON. Lekin
matnning oʻzida yangi qator boʻlsa-chi?

```python
h = {"text": "birinchi qator\nikkinchi qator"}
print(json.dumps(h, ensure_ascii=False))
```

**Natija:**

```
{"text": "birinchi qator\nikkinchi qator"}
```

JSON matn ichidagi yangi qatorni `\n` ikki belgisi bilan yozadi. Demak bitta
hujjat — **har doim bitta qator**. Fayldagi qatorlar soni = hujjatlar soni.

---

## 8. Oʻquv korpusimiz

Oʻquv korpusi — [xom_korpus.jsonl](/data/xom_korpus.jsonl) fayli. Uni yuklab oling va
Colab'ning chap tomonidagi papka belgisiga tashlang. Yoki darsning oxiridagi
**Ilova A** kodini birinchi katakda ishga tushiring — u aynan shu faylni yaratadi
(lekin kodni hozir oʻqimang, ichida javoblar bor).

### Bizga kerak boʻladigan eski kod

Dars 13 dagi `train_regex`, `encode_regex`, `decode`, `NAQSH` va Dars 14 dagi
normalizator:

```python
import re
import unicodedata

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


print(normallashtir("O'zbekiston, ma'no, bog'"))
```

**Natija:**

```
Oʻzbekiston, maʼno, bogʻ
```

### Korpusni oʻqiymiz

```python
def oqish(fayl):
    hujjatlar = []
    with open(fayl, encoding="utf-8") as f:
        for qator in f:
            hujjatlar.append(json.loads(qator))
    return hujjatlar


hujjatlar = oqish("xom_korpus.jsonl")

print("hujjatlar soni:", len(hujjatlar))
print("maydonlar:", list(hujjatlar[0].keys()))
```

**Natija:**

```
hujjatlar soni: 29
maydonlar: ['id', 'url', 'text']
```

Har bir qator — `json.loads` — lugʻat — roʻyxatga. Hammasini bir koʻrib chiqamiz:

```python
for h in hujjatlar:
    sozlar = len(h["text"].split())
    print(f"{h['id']:3d} | {sozlar:3d} soʻz | {h['text'][:38]!r}")
```

**Natija:**

```
  1 |  65 soʻz | 'Metroda yangi bekat yoʻlovchilarni kut'
  2 |  65 soʻz | "Metroda yangi bekat yo'lovchilarni kut"
  3 |  63 soʻz | 'Metroda yangi bekat yo‘lovchilarni kut'
  4 |  65 soʻz | 'Metroda yangi bekat yoʻlovchilarni kut'
  5 |  60 soʻz | 'Poytaxtda yangi metro bekati foydalani'
  6 |  69 soʻz | "Metroda yangi bekat yo'lovchilarni kut"
  7 |  39 soʻz | 'Ertaga ob-havo qanday boʻladi\nErtaga p'
  8 |  43 soʻz | 'Maktablarda yangi oʻquv dasturi\nYangi '
  9 |  54 soʻz | 'Toshkent palovi qanday tayyorlanadi\nPa'
 10 |  39 soʻz | "Navro'z bayrami\nNavro'z bahor va yangi"
 11 |  37 soʻz | 'Terma jamoa navbatdagi oʻyinga tayyorl'
 12 |  36 soʻz | 'Bug’doy hosili yig’ib olindi\nViloyatda'
 13 |  43 soʻz | 'Sunʼiy intellekt boʻyicha bepul kurs\nY'
 14 |  40 soʻz | 'Samarqandga sayohat\nSamarqand dunyodag'
 15 |  39 soʻz | 'Amudaryo\nAmudaryo Oʻrta Osiyodagi eng '
 16 |  31 soʻz | 'Paxta\nPaxta gʻoʻza oʻsimligining tolas'
 17 |  41 soʻz | 'Alisher Navoiy\nAlisher Navoiy buyuk sh'
 18 |  34 soʻz | 'Oʻzbek tili bayrami\nHar yili 21-oktabr'
 19 |  19 soʻz | 'Сегодня в Ташкенте открылась книжная я'
 20 |  17 soʻz | 'Бугун пойтахтда китоб кўргазмаси очилд'
 21 |  31 soʻz | 'Kutubxonada yangi o‚Äôquv zali ochildi'
 22 |  12 soʻz | '������ �� ������: �������, �������� ��'
 23 |   2 soʻz | 'Sahifa topilmadi.'
 24 |   8 soʻz | 'Bosh sahifa | Yangiliklar | Sport | Al'
 25 |   6 soʻz | 'Saytga xush kelibsiz!\nBarcha huquqlar '
 26 |  43 soʻz | 'Shaxmat turnirida yoshlar gʻalaba qozo'
 27 |  42 soʻz | 'Ertaga ob-havo qanday boʻladi\nErtaga p'
 28 |  33 soʻz | 'Quyosh tizimi\nQuyosh tizimida sakkizta'
 29 |  43 soʻz | 'Talabalar uchun yangi mobil ilova\nTala'
```

**Toʻxtang va bu roʻyxatni oʻqing.** Tozalashdan oldin har doim xom maʼlumotga
**koʻz bilan** qarang. Nimalarni koʻryapsiz?

- 1–6: metro haqidagi bitta yangilik — har xil apostrof bilan, har xil saytda.
- 19, 20: kirill yozuvi.
- 21: `o‚Äôquv` — 5-boʻlimdagi buzilish.
- 22: deyarli butunlay `�`.
- 23–25: juda qisqa sahifalar.
- 7 va 27: bir xil boshlanadi.

Endi hammasini kod bilan topamiz. Har bir bosqichdan keyin nechta hujjat
qolganini yozib boramiz:

```python
voronka = []
voronka.append(("0. oʻqildi", len(hujjatlar)))
```

`voronka` — **(nom, son)** juftliklari roʻyxati (Dars 03 dagi kortejlar).

---

## 9. 1-bosqich: kodlash

### `�` belgisi

Dars 11 ni eslang: `errors="replace"` oʻqib boʻlmagan baytlar oʻrniga `�` qoʻyadi.
Agar biror hujjat butunlay `�` boʻlsa — kimdir uni notoʻgʻri kodlash bilan oʻqigan,
va asl baytlar **yoʻqolgan**. Uni tuzatib boʻlmaydi.

`�` ning raqami — `\ufffd`. Har bir hujjatda uning ulushini sanaymiz:

```python
def buzuq_ulushi(matn):
    if len(matn) == 0:
        return 0
    return matn.count("\ufffd") / len(matn)


for h in hujjatlar:
    u = buzuq_ulushi(h["text"])
    if u > 0:
        print(h["id"], round(u, 3), repr(h["text"][:30]))
```

**Natija:**

```
22 0.835 '������ �� ������: �������, ���'
```

- `.count(x)` — satrda `x` necha marta uchrashini sanaydi.

22-hujjatning **83.5%** i — `�`. Asl matn nima boʻlganini endi hech kim
bilmaydi — baytlar yoʻqolgan.

### Mojibake: buzilgan, lekin tuzatsa boʻladi

21-hujjat boshqacha. Unda `�` yoʻq — baytlar **saqlangan**, faqat notoʻgʻri
oʻqilgan. Qanday notoʻgʻri? Tekshiramiz:

```python
belgi = "\u2019"
baytlar = belgi.encode("utf-8")

print(list(baytlar))
print(baytlar.decode("mac_latin2"))
```

**Natija:**

```
[226, 128, 153]
‚Äô
```

`’` — UTF-8 da uch bayt: 226, 128, 153. **`mac_latin2`** — eski Macintosh
kompyuterlarining Markaziy Yevropa kodlashi — ularni uchta alohida harf deb
oʻqiydi: `‚`, `Ä`, `ô`.

Qaysi kodlash ekanini qanday bildim? `’` ni boshqa eski Mac kodlashi —
`mac_roman` — ham xuddi shunday buzadi. Farq **yopuvchi qoʻshtirnoqda** chiqadi:

```python
belgi = "\u201d"

print(belgi.encode("utf-8").decode("mac_roman"))
print(belgi.encode("utf-8").decode("mac_latin2"))
```

**Natija:**

```
‚Äù
‚ÄĚ
```

5-boʻlimdagi haqiqiy hujjatda `‚ÄĚ` bor — demak `mac_latin2`. Buzilgan matn
qanday buzilganini oʻzi aytib turadi — faqat diqqat bilan qarash kerak.

Baytlar saqlangan ekan — demak **teskari yoʻl** bilan tuzatsa boʻladi:

```python
buzuq = "o‚Äôquv"
print(buzuq.encode("mac_latin2").decode("utf-8"))
```

**Natija:**

```
o’quv
```

Buzilgan matnni → `mac_latin2` bilan **baytga qaytaramiz** → baytlarni
**toʻgʻri** (`utf-8`) oʻqiymiz.

Lekin bu har doim ham ishlamaydi. Agar matnda `mac_latin2` bilmaydigan harf
boʻlsa, `.encode` **xato** beradi. Xato butun dasturni toʻxtatadi. Bizga esa
"ishlamasa — tegma" degan qaror kerak.

### `try` / `except` — "urinib koʻr, boʻlmasa..."

Avval boʻsh joyda. Lugʻatda yoʻq kalitni soʻrasak:

```python
narxlar = {"non": 5000, "choy": 3000}

print(narxlar["sut"])
```

**Natija:**

```
KeyError: 'sut'
```

Endi xuddi shuni `try` ichida:

```python
try:
    print(narxlar["sut"])
except KeyError:
    print("bunday mahsulot yoʻq")
```

**Natija:**

```
bunday mahsulot yoʻq
```

- `try:` — ichkaridagi kodni **urinib koʻradi**.
- `except KeyError:` — agar aynan `KeyError` chiqsa, dastur toʻxtamaydi — buning
  oʻrniga shu qism bajariladi.

Xato boʻlmasa — `except` qismi umuman ishlamaydi:

```python
try:
    print(narxlar["non"])
except KeyError:
    print("bunday mahsulot yoʻq")
```

**Natija:**

```
5000
```

Va bizning holat — kodlash xatosi:

```python
try:
    print(bytes([202, 187]).decode("ascii"))
except UnicodeDecodeError:
    print("ascii bu baytlarni oʻqiy olmadi")
```

**Natija:**

```
ascii bu baytlarni oʻqiy olmadi
```

### Tuzatuvchi funksiya

```python
def kodlashni_tuzat(matn):
    if "‚Ä" in matn:
        try:
            return matn.encode("mac_latin2").decode("utf-8")
        except (UnicodeEncodeError, UnicodeDecodeError):
            return matn
    return matn


print(hujjatlar[20]["text"].split("\n")[0])
print(kodlashni_tuzat(hujjatlar[20]["text"]).split("\n")[0])
print(kodlashni_tuzat("o‚Äôquv va o\u02bbqish"))
```

**Natija:**

```
Kutubxonada yangi o‚Äôquv zali ochildi
Kutubxonada yangi o’quv zali ochildi
o‚Äôquv va oʻqish
```

Qator-qator:

- `if "‚Ä" in matn:` — nima uchun aynan `‚Ä`? `‘ ’ “ ”` va tire belgilarining
  hammasi UTF-8 da 226, 128 bilan boshlanadi. `mac_latin2` bu ikki baytni har doim
  `‚Ä` deb oʻqiydi. Bu belgi boʻlmasa — tuzatadigan narsa yoʻq, matnga tegmaymiz.
- `except (UnicodeEncodeError, UnicodeDecodeError):` — qavs ichida **ikki** xato
  turi: baytga aylantirishdagi va matnga aylantirishdagi. Ikkalasida ham —
  `return matn`, yaʼni tegmaymiz.
- Uchinchi qatorga qarang: matnda `ʻ` bor, `mac_latin2` uni bilmaydi → xato →
  matn **oʻzgarmadi**. Dastur ham toʻxtamadi.

### Bosqichni qoʻllaymiz

```python
qoldi = []
for h in hujjatlar:
    h["text"] = kodlashni_tuzat(h["text"])
    if buzuq_ulushi(h["text"]) <= 0.01:
        qoldi.append(h)
    else:
        print("olib tashlandi:", h["id"], h["url"])

hujjatlar = qoldi
voronka.append(("1. kodlash", len(hujjatlar)))
print("qoldi:", len(hujjatlar))
```

**Natija:**

```
olib tashlandi: 22 https://sayt18.misol/pogoda
qoldi: 28
```

Nima uchun chegara `0.01` (1%), nolga emas? Haqiqiy matnlarda baʼzan bitta-ikkita
buzilgan emoji yoki belgi uchraydi. Shu sababli butun hujjatni tashlash —
isrof. 83.5% — esa boshqa gap.

---

## 10. 2-bosqich: til

Oʻzbek korpuslarida rus tili koʻp aralashgan. Va oʻzbekcha kirill yozuvidagi
matnlar ham bor. Bizning tokenizatorimiz — lotin uchun.

Eng oddiy usul: harflarning necha foizi **kirill**? Dars 05 ni eslang — har bir
harfning raqami bor:

```python
for harf in ["a", "z", "Б", "я", "ў", "қ"]:
    print(harf, ord(harf))
```

**Natija:**

```
a 97
z 122
Б 1041
я 1103
ў 1118
қ 1179
```

Kirill harflarining hammasi **1024 dan 1279 gacha** oraliqda turadi. (Unicode ularni
bitta blokka yigʻgan. Oʻzbekcha `ў` va `қ` ham shu yerda.)

```python
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


print(kirill_ulushi("Salom dunyo"))
print(kirill_ulushi("Салом дунё"))
print(round(kirill_ulushi("U «Спасибо» dedi"), 3))
```

**Natija:**

```
0.0
1.0
0.583
```

- Faqat **harflarni** sanaymiz (`.isalpha()`, Dars 14) — boʻshliq va tinish
  belgilari hisobga kirmaydi.
- `if harflar == 0: return 0` — harfsiz matnda nolga boʻlish boʻlmasin.

Chegarani **0.3** qilamiz: harflarning 30% dan koʻpi kirill boʻlsa — tashlaymiz.

```python
qoldi = []
for h in hujjatlar:
    u = kirill_ulushi(h["text"])
    if u <= 0.3:
        qoldi.append(h)
    else:
        print("olib tashlandi:", h["id"], round(u, 3), repr(h["text"][:25]))
    if 0 < u <= 0.3:
        print("qoldi, lekin kirill bor:", h["id"], round(u, 3))

hujjatlar = qoldi
voronka.append(("2. til", len(hujjatlar)))
print("qoldi:", len(hujjatlar))
```

**Natija:**

```
olib tashlandi: 19 1.0 'Сегодня в Ташкенте открыл'
olib tashlandi: 20 1.0 'Бугун пойтахтда китоб кўр'
qoldi, lekin kirill bor: 26 0.037
qoldi: 26
```

- `0 < u <= 0.3` — "u noldan katta **va** 0.3 dan oshmaydi". Python ikki
  taqqoslashni shunday zanjir qilib yozishga ruxsat beradi.

26-hujjat — shaxmat haqidagi oʻzbekcha maqola, unda gʻolib `«Спасибо всем!»` deydi.
3.7% kirill. **Qoldi — va toʻgʻri qoldi.** Shuning uchun chegara nolga emas.

20-hujjat esa — **oʻzbekcha**, faqat kirillda. Biz uni yomon boʻlgani uchun emas,
tokenizatorimiz lotin uchun boʻlgani uchun tashladik. FineWeb-2 dagi 1.36 million
kirill hujjatni lotinga **oʻgirib** (transliteratsiya) ishlatish mumkin — lekin bu
alohida katta ish.

### Tartib muhim — beshinchi marta

Nima uchun kodlash bosqichi **birinchi** keldi? 22-hujjatni olib, til filtridan
oʻtkazib koʻramiz:

```python
xom = oqish("xom_korpus.jsonl")
h22 = xom[21]

print("kirill ulushi:", kirill_ulushi(h22["text"]))
print("soʻzlar:", len(h22["text"].split()))
```

**Natija:**

```
kirill ulushi: 0
soʻzlar: 12
```

22-hujjatda **bitta ham harf yoʻq** — hammasi `�`. Demak kirill ulushi — 0, va u
til filtridan **oʻtib ketadi**. 12 ta "soʻz" — keyingi uzunlik filtridan ham.

Agar kodlash bosqichi boʻlmaganida, bu axlat korpusga kirardi va uni hech bir
boshqa filtr ushlamasdi.

---

## 11. 3-bosqich: shablon satrlar

`Barcha huquqlar himoyalangan.` — bu jumla minglab saytning pastida turadi. Uni
hech kim yozmagan — sayt dasturi qoʻshadi. Tokenizator uchun u **shovqin**: har
bir saytda takrorlanib, lugʻatdan joy egallaydi.

Qanday topamiz? Gʻoya: **koʻp hujjatda aynan bir xil turgan satr** — shablon.

Buning uchun yangi tur kerak.

### `set` — toʻplam

```python
mevalar = ["olma", "nok", "olma", "uzum", "nok"]
toplam = set(mevalar)

print(len(mevalar), len(toplam))
print("olma" in toplam, "anor" in toplam)
```

**Natija:**

```
5 3
True False
```

- `set(...)` — **toʻplam**. Unda har bir element **faqat bir marta** boʻladi.
  Beshta mevadan uchtasi qoldi.
- `in` — roʻyxatdagidek ishlaydi (Dars 04, 14).

```python
toplam.add("anor")
toplam.add("olma")

print(len(toplam))
```

**Natija:**

```
4
```

- `.add(x)` — qoʻshadi. `olma` allaqachon bor edi — ikkinchi marta qoʻshilmadi.

Toʻplam bilan roʻyxatning yana ikki farqi:

1. **Tartibi yoʻq.** `toplam[0]` deb boʻlmaydi. Uni chop etsangiz, elementlar
   har safar boshqa tartibda chiqishi mumkin.
2. **`in` juda tez.** Roʻyxatda `in` har bir elementni birma-bir tekshiradi.
   Toʻplamda — darhol topadi. Bir million element boʻlsa — bu farq soniyalar va
   soatlar orasidagi farq.

Va bitta tuzoq:

```python
print(type(set()), type({}))
```

**Natija:**

```
<class 'set'> <class 'dict'>
```

Boʻsh toʻplam — `set()`. `{}` esa — boʻsh **lugʻat**.

### Satrlarni sanaymiz

Har bir satr **nechta hujjatda** uchrashini sanaymiz. Bitta hujjat ichida ikki
marta uchrasa — bir deb hisoblaymiz:

```python
def qatorlarni_sana(hujjatlar):
    hisob = {}
    for h in hujjatlar:
        korilgan = set()
        for qator in h["text"].split("\n"):
            qator = qator.strip()
            if qator != "" and qator not in korilgan:
                korilgan.add(qator)
                hisob[qator] = hisob.get(qator, 0) + 1
    return hisob


hisob = qatorlarni_sana(hujjatlar)

shablonlar = set()
for qator, son in hisob.items():
    if son >= 3:
        shablonlar.add(qator)
        print(son, repr(qator))
```

**Natija:**

```
8 'Ulashish: Telegram | Facebook | X'
8 'Barcha huquqlar himoyalangan.'
4 'We use cookies to improve your experience.'
3 'Ushbu maqolani yozishda Oʻzbekiston milliy ensiklopediyasi (2000-2005) maʼlumotlaridan foydalanilgan.'
```

Qator-qator:

- `korilgan = set()` — **har bir hujjat uchun yangi** toʻplam. Bu hujjatda koʻrilgan
  satrlar.
- `qator.strip()` — chetdagi boʻshliqlarsiz. `"Barcha huquqlar himoyalangan. "` va
  `"Barcha huquqlar himoyalangan."` bir xil hisoblansin.
- `qator != ""` — 6-boʻlimdagi boʻsh satrni sanamaymiz.
- `qator not in korilgan` — bu hujjatda birinchi marta koʻrilsa.
- `hisob.get(qator, 0) + 1` — Dars 04 dagi sanash usuli.
- `son >= 3` — kamida **uchta** hujjatda uchragan satr — shablon.

Toʻrtta shablon topildi, hammasi — saytning "dumi". Metro maqolasining satrlari
roʻyxatda **yoʻq**: ular koʻpi bilan ikki hujjatda aynan bir xil (qolganlarida
apostrof boshqacha).

### Olib tashlaymiz

```python
def shablonni_olib_tashla(matn, shablonlar):
    qolgan = []
    for qator in matn.split("\n"):
        if qator.strip() not in shablonlar:
            qolgan.append(qator)
    return "\n".join(qolgan)


olib_tashlangan = 0
for h in hujjatlar:
    oldin = len(h["text"].split("\n"))
    h["text"] = shablonni_olib_tashla(h["text"], shablonlar)
    olib_tashlangan += oldin - len(h["text"].split("\n"))

voronka.append(("3. shablon", len(hujjatlar)))
print("olib tashlangan satrlar:", olib_tashlangan)
print("hujjatlar:", len(hujjatlar))
```

**Natija:**

```
olib tashlangan satrlar: 23
hujjatlar: 26
```

Hujjatlar soni oʻzgarmadi — biz hujjatni emas, uning **ichidagi satrlarni** olib
tashladik.

> ⚠️ "3 ta hujjat" chegarasi — bizning 29 talik korpus uchun. Haqiqiy korpusda u
> ancha katta boʻladi. Va bu qoidaning bitta xavfli tomoni bor — uni Mashq 3 da
> topasiz.

---

## 12. 4-bosqich: uzunlik

```python
qoldi = []
for h in hujjatlar:
    sozlar = len(h["text"].split())
    if sozlar >= 12:
        qoldi.append(h)
    else:
        print("olib tashlandi:", h["id"], sozlar, "soʻz:", repr(h["text"]))

hujjatlar = qoldi
voronka.append(("4. uzunlik", len(hujjatlar)))
print("qoldi:", len(hujjatlar))
```

**Natija:**

```
olib tashlandi: 23 2 soʻz: 'Sahifa topilmadi.'
olib tashlandi: 24 8 soʻz: 'Bosh sahifa | Yangiliklar | Sport | Aloqa'
olib tashlandi: 25 3 soʻz: 'Saytga xush kelibsiz!'
qoldi: 23
```

`Sahifa topilmadi.`, menyu satri, salomlashuv. Bular — matn emas, sayt qoldiqlari.

25-hujjatga qarang: `Saytga xush kelibsiz!` — **3 soʻz**. Lekin xom korpusda unda 6
ta soʻz bor edi — `Barcha huquqlar himoyalangan.` bilan. Shablon bosqichi boʻlmaganida
ham u 12 dan kam boʻlardi — bu safar omad kuldi. Lekin chegara 5 boʻlganida edi —
shablon bosqichisiz u **oʻtib ketardi**.

Haqiqiy quvurlarda **juda uzun** hujjatlar ham tekshiriladi: masalan, bitta satrda
minglab belgi boʻlsa — bu odatda matn emas, kod yoki jadval qoldigʻi. Bizning
korpusda bunday hujjat yoʻq.

---

## 13. 5-bosqich: aniq dublikat

Endi darsning asosiy savoliga yaqinlashdik. Metro maqolasi bir necha nusxada.
Ularni qanday topamiz?

Har bir hujjatni boshqa har biri bilan harfma-harf solishtirish mumkin. Lekin
buning yoʻli bor — **barmoq izi**.

### `hashlib` — matnning barmoq izi

```python
import hashlib

print(hashlib.md5("salom".encode("utf-8")).hexdigest())
print(hashlib.md5("salom".encode("utf-8")).hexdigest())
print(hashlib.md5("Salom".encode("utf-8")).hexdigest())
```

**Natija:**

```
7650d3efe9d32071f601e9d148767d26
7650d3efe9d32071f601e9d148767d26
4be1041e508b1bcadd666d5170a4bfce
```

- `import hashlib` — Python bilan birga keladigan kutubxona.
- `hashlib.md5(...)` — **MD5** algoritmi. U **baytlarni** oladi (shuning uchun
  `.encode`) va ulardan "barmoq izi" yasaydi.
- `.hexdigest()` — barmoq izini oʻn oltilik raqamlar matni qilib beradi.

Uchta xususiyatga qarang:

1. **Bir xil matn → bir xil iz.** Har safar, har qanday kompyuterda.
2. **Bitta harf farq → butunlay boshqa iz.** `s` → `S` — va hamma 32 belgi oʻzgardi.
3. **Uzunligi doim bir xil:**

```python
uzun = "Bu juda uzun matn. " * 1000

print(len(uzun))
print(len(hashlib.md5(uzun.encode("utf-8")).hexdigest()))
```

**Natija:**

```
19000
32
```

(`"..." * 1000` — matnni 1000 marta takrorlaydi.)

19 000 belgili matn ham — 32 belgi. Shuning uchun matnlarning oʻzini emas,
**izlarini** toʻplamda saqlaymiz. FineWeb-2 ning oʻzbek boʻlimi uchun bu
1 233 463 × 32 = taxminan **39 MB** — 4.45 GB oʻrniga.

### Birinchi urinish

```python
korilgan = set()
for h in hujjatlar:
    iz = hashlib.md5(h["text"].encode("utf-8")).hexdigest()
    if iz in korilgan:
        print("dublikat:", h["id"], h["url"])
    korilgan.add(iz)
```

**Natija:**

```
dublikat: 4 https://sayt01.misol/yangiliklar/metro?sahifa=2
dublikat: 27 https://sayt02.misol/ob-havo
```

Ikkita topildi:

- **4** — 1-hujjatning aynan nusxasi, faqat manzilda `?sahifa=2`.
- **27** — 7-hujjat bilan bir xil ob-havo xabari, boshqa saytda. Ularning dumi har
  xil edi (`Barcha huquqlar…` va `Ulashish…`). **Shablon bosqichi dumlarni olib
  tashlagani uchun** endi ular aynan bir xil. Tartib muhim — oltinchi marta.

Lekin 2 va 3 topilmadi. Nima uchun?

```python
for i in [0, 1, 2]:
    print(hujjatlar[i]["id"], repr(hujjatlar[i]["text"][:28]))
```

**Natija:**

```
1 'Metroda yangi bekat yoʻlovch'
2 "Metroda yangi bekat yo'lovch"
3 'Metroda yangi bekat yo‘lovch'
```

Bir xil matn — har xil apostrof. Bitta belgi farq — butunlay boshqa iz.

### Kalit: avval normallashtir, keyin iz ol

```python
def kalit(matn):
    matn = normallashtir(matn)
    matn = matn.lower()
    matn = " ".join(matn.split())
    return hashlib.md5(matn.encode("utf-8")).hexdigest()


for i in [0, 1, 2]:
    print(hujjatlar[i]["id"], kalit(hujjatlar[i]["text"]))
```

**Natija:**

```
1 9280fc033b4c03c2dbf08c6dbf3f3588
2 9280fc033b4c03c2dbf08c6dbf3f3588
3 9280fc033b4c03c2dbf08c6dbf3f3588
```

Uchalasi — **bir xil** iz. Qator-qator:

- `normallashtir` — Dars 14 dagi ish. `'`, `‘`, `ʻ` — hammasi bitta.
- `.lower()` — `Metro` va `metro` farq qilmasin.
- `" ".join(matn.split())` — har qanday boʻshliqlar (ikkita boʻshliq, `\n`,
  tabulyatsiya) → bitta boʻshliq.

> **Muhim:** biz matnni **faqat kalit uchun** normallashtiramiz. Hujjatning
> oʻzida **asl** yozuv qoladi. Nima uchun — 15-boʻlimda.

### Bosqichni qoʻllaymiz

```python
korilgan = set()
qoldi = []
for h in hujjatlar:
    k = kalit(h["text"])
    if k in korilgan:
        print("dublikat:", h["id"], h["url"])
    else:
        korilgan.add(k)
        qoldi.append(h)

hujjatlar = qoldi
voronka.append(("5. aniq dublikat", len(hujjatlar)))
print("qoldi:", len(hujjatlar))
```

**Natija:**

```
dublikat: 2 https://sayt02.misol/news/12345
dublikat: 3 https://sayt03.misol/2024/metro-bekat
dublikat: 4 https://sayt01.misol/yangiliklar/metro?sahifa=2
dublikat: 27 https://sayt02.misol/ob-havo
qoldi: 19
```

Toʻrtta dublikat — va har biri **birinchi** uchragan nusxaga qarab topildi. Qaysi
nusxa qoladi? Birinchisi. FineWeb-2 ham shunday qiladi: har bir guruhdan bittasini
qoldiradi va guruh hajmini `minhash_cluster_size` ga yozadi.

Nima uchun dublikatlarni bunchalik sinchiklab olib tashlayapmiz? Bitta sababini
16-boʻlimda koʻrasiz. **Ikkinchisi — muhimrogʻi** — Dars 17 da. Hozircha shunchaki
qiling.

---

## 14. 6-bosqich: qisman dublikat

5-hujjatga qaraymiz:

```python
h1 = hujjatlar[0]
h5 = hujjatlar[1]

for h in [h1, h5]:
    qatorlar = h["text"].split("\n")
    print(h["id"], "|", qatorlar[0])
    print("  |", qatorlar[1][:60], "...")
    print("  |", "...", qatorlar[1][-60:])
```

**Natija:**

```
1 | Metroda yangi bekat yoʻlovchilarni kutmoqda
  | Toshkent metropolitenining halqa yoʻnalishida yangi bekat yo ...
  | ... ovchilarga xaritani oldindan koʻrib chiqish tavsiya etiladi.
5 | Poytaxtda yangi metro bekati foydalanishga topshirildi
  | Shahrimizda yana bir metro bekati ochilib, yo’lovchilarni qa ...
  | ... ovchilarga xaritani oldindan ko’rib chiqish tavsiya etiladi.
```

Sarlavha va birinchi jumla qayta yozilgan. Qolgani — aynan metro maqolasi, faqat
apostroflari boshqa. Bu
juda koʻp uchraydi: sayt maqolani oladi, boshini oʻzgartiradi, qolganini
qoldiradi. Barmoq izi bu yerda ojiz — bitta harf farq qilsa ham iz boshqa.

Bizga "**qanchalik** oʻxshash?" degan savolga javob beradigan oʻlchov kerak.

### Soʻz boʻlaklari (n-gramma)

Matnni ketma-ket turgan **5 soʻzli boʻlaklarga** ajratamiz:

```python
sozlar = "bekat har kuni ertalab soat beshdan ishlaydi".split()

for i in range(len(sozlar) - 5 + 1):
    print(" ".join(sozlar[i:i + 5]))
```

**Natija:**

```
bekat har kuni ertalab soat
har kuni ertalab soat beshdan
kuni ertalab soat beshdan ishlaydi
```

7 ta soʻz → 3 ta boʻlak. Har bir boʻlak bitta soʻzga surilgan. Bunday boʻlaklar
**n-gramma** deyiladi (bizda n = 5).

Ikki matn qancha umumiy boʻlakka ega boʻlsa — shuncha oʻxshash. Bitta jumla
oʻzgarsa — faqat oʻsha joydagi boʻlaklar oʻzgaradi, qolganlari bir xil qoladi.

```python
def ngrammalar(matn, n=5):
    sozlar = normallashtir(matn).lower().split()
    natija = set()
    for i in range(len(sozlar) - n + 1):
        natija.add(" ".join(sozlar[i:i + n]))
    return natija


print(len(ngrammalar(h1["text"])), len(ngrammalar(h5["text"])))
```

**Natija:**

```
52 53
```

- `n=5` — parametrning **standart qiymati**. `ngrammalar(matn)` desangiz n = 5,
  `ngrammalar(matn, 3)` desangiz n = 3.
- Natija — **toʻplam**: bir xil boʻlak ikki marta uchrasa ham, bir marta sanaladi.

### Toʻplam amallari: `&` va `|`

Avval sonlarda:

```python
a = {1, 2, 3, 4}
b = {3, 4, 5}

print(a & b)
print(a | b)
print(len(a & b) / len(a | b))
```

**Natija:**

```
{3, 4}
{1, 2, 3, 4, 5}
0.4
```

- `{1, 2, 3, 4}` — toʻplamni toʻgʻridan-toʻgʻri yozish (lugʻatga oʻxshaydi, lekin
  `:` yoʻq).
- `a & b` — **kesishma**: ikkalasida ham bor elementlar.
- `a | b` — **birlashma**: kamida bittasida bor elementlar.
- Umumiylar soni / hammasining soni = **0.4**.

Bu oxirgi son — **Jaccard oʻxshashligi**. 1 — toʻplamlar bir xil. 0 — umumiy
element yoʻq.

```python
def jaccard(a, b):
    birlashma = a | b
    if len(birlashma) == 0:
        return 0
    return len(a & b) / len(birlashma)


n1 = ngrammalar(hujjatlar[0]["text"])
for h in hujjatlar[1:4]:
    print(hujjatlar[0]["id"], "va", h["id"], round(jaccard(n1, ngrammalar(h["text"])), 3))
```

**Natija:**

```
1 va 5 0.641
1 va 6 0.881
1 va 7 0.0
```

- 1 va 5 — **0.641**: boshi qayta yozilgan, qolgani bir xil.
- 1 va 6 — **0.881**: 6-hujjat — metro maqolasi + bitta qoʻshimcha jumla.
- 1 va 7 — **0**: metro va ob-havo. Umumiy 5 soʻzli boʻlak yoʻq.

Chegarani **0.5** qilamiz: boʻlaklarning yarmidan koʻpi umumiy boʻlsa — dublikat.

### Bosqichni qoʻllaymiz

```python
qoldi = []
solishtirish = 0
for h in hujjatlar:
    a = ngrammalar(h["text"])
    oxshash = False
    for q in qoldi:
        solishtirish += 1
        if jaccard(a, ngrammalar(q["text"])) >= 0.5:
            print("oʻxshash:", h["id"], "~", q["id"])
            oxshash = True
            break
    if not oxshash:
        qoldi.append(h)

hujjatlar = qoldi
voronka.append(("6. qisman dublikat", len(hujjatlar)))
print("solishtirishlar:", solishtirish)
print("qoldi:", len(hujjatlar))
```

**Natija:**

```
oʻxshash: 5 ~ 1
oʻxshash: 6 ~ 1
solishtirishlar: 138
qoldi: 17
```

- `oxshash = False` — "hali oʻxshashi topilmadi". `True` / `False` — Dars 14 dagi
  `.isalpha()` qaytaradigan qiymatlar.
- `break` — oʻxshashi topildimi, qolganlarini tekshirish shart emas (Dars 10).
- `if not oxshash:` — `not` — **teskarisi**. "Agar oʻxshash **boʻlmasa**".

### Muammo: juftlar soni

Har bir hujjat oʻzidan oldin qolganlarning **har biri** bilan solishtirildi. 19 ta
hujjatda bu oz. FineWeb-2 ning oʻzbek boʻlimida-chi? Har bir juft:

```python
n = 1233463
print(n * (n - 1) // 2)
```

**Natija:**

```
760714869453
```

(`//` — **butun** boʻlish: `7 // 2` → `3`.)

**760 milliard juft.** Kompyuter soniyasiga million juft solishtirsa ham — 8.8 kun.
Va har bir juft — ikki toʻplamning kesishmasi.

Shuning uchun katta korpuslarda boshqa usul ishlatiladi — **MinHash**. U har bir
hujjatni hamma bilan emas, faqat oʻxshash **boʻlishi mumkin** boʻlganlar bilan
solishtiradi. FineWeb-2 dagi `minhash_cluster_size` — aynan shu usulning natijasi.
Bu kursda uni yozmaymiz. Muhimi — gʻoya bir xil: n-grammalar va Jaccard.

<!-- animatsiya: p4 | Barmoq izi -->

---

## 15. Natija: voronka va saqlash

```python
for nom, son in voronka:
    print(f"{nom:22s} {son:3d}")
```

**Natija:**

```
0. oʻqildi              29
1. kodlash              28
2. til                  26
3. shablon              26
4. uzunlik              23
5. aniq dublikat        19
6. qisman dublikat      17
```

**29 → 17.** Hujjatlarning 41% i ketdi. Va bu — "tozalangan" internet matniga
oʻxshatib yasalgan korpus.

<!-- animatsiya: p3 | Voronka -->

### Asl yozuv saqlandi

```python
for h in hujjatlar:
    if h["id"] == 10:
        print(h["text"][:40])
```

**Natija:**

```
Navro'z bayrami
Navro'z bahor va yangila
```

`Navro'z` — oddiy `'` bilan, internetdagidek. Biz uni **normallashtirmadik**.
Uchta sabab:

1. **Tokenizator buni oʻzi qiladi.** Dars 14 dagi zanjir: `matn → normallashtir →
   regex → BPE`. Korpusni oldindan normallashtirish — ikki marta ish.
2. **Sinov matni asl holida boʻlishi kerak.** Dars 14 dagi qoidani eslang: boshqa
   tokenizatorlar bilan solishtirganda hammaga asl internet matnini berish kerak.
   Sinov matni shu korpusdan olinadi.
3. **Normalizator yaxshilanadi.** Ertaga qoidangizda xato topsangiz (Dars 14 da
   men topdim), asl matndan qaytadan boshlaysiz. Normallashtirilgan matndan — yoʻq.

### Faylga yozamiz

```python
with open("toza_korpus.jsonl", "w", encoding="utf-8") as f:
    for h in hujjatlar:
        f.write(json.dumps(h, ensure_ascii=False) + "\n")

print("saqlandi:", len(oqish("toza_korpus.jsonl")), "ta hujjat")
```

**Natija:**

```
saqlandi: 17 ta hujjat
```

### Hisobot

4-boʻlimdagi qoidani eslang: **har bir manbani yozib qoʻying.** Tozalash ham —
qanday qilinganini yozib qoʻyish kerak boʻlgan narsa:

```python
hisobot = {
    "manba": "xom_korpus.jsonl (Noldan, Dars 15)",
    "sana": "2026-10-22",
    "bosqichlar": voronka,
    "chegaralar": {"buzuq": 0.01, "kirill": 0.3, "shablon": 3, "soz": 12, "jaccard": 0.5},
}

with open("hisobot.json", "w", encoding="utf-8") as f:
    f.write(json.dumps(hisobot, ensure_ascii=False, indent=2))

print(json.dumps(hisobot["chegaralar"]))
```

**Natija:**

```
{"buzuq": 0.01, "kirill": 0.3, "shablon": 3, "soz": 12, "jaccard": 0.5}
```

- `"sana"` — oʻzingiz ishlagan kunni yozing.
- `indent=2` — JSON ni chiroyli, qatorma-qator yozadi (har bir daraja 2 boʻshliq
  bilan surilgan). Faylni ochib koʻring.

Olti oy oʻtib "bu korpus qanday tozalangan edi?" deb soʻrasangiz — javob shu faylda.
Dars 17 da bu fayl nima uchun **hayotiy** ekanini koʻrasiz.

---

## 16. Javob: iflos korpus tokenizatorga nima qiladi

Endi 1-boʻlimdagi savolga qaytamiz. Ikkita tokenizator oʻqitamiz: biri **xom**
korpusda, biri **toza** korpusda. Hammasi bir xil — normalizatsiya, regex, lugʻat
hajmi 356 (yaʼni 100 ta birlashtirish).

```python
xom_hujjatlar = oqish("xom_korpus.jsonl")

xom_matn = "\n\n".join([h["text"] for h in xom_hujjatlar])
toza_matn = "\n\n".join([h["text"] for h in hujjatlar])

print("xom:", len(xom_matn.encode("utf-8")), "bayt")
print("toza:", len(toza_matn.encode("utf-8")), "bayt")

m_xom, v_xom, _ = train_regex(normallashtir(xom_matn), 356, NAQSH)
m_toza, v_toza, _ = train_regex(normallashtir(toza_matn), 356, NAQSH)
```

**Natija:**

```
xom: 9577 bayt
toza: 5000 bayt
```

Xom korpusda deyarli **ikki barobar** koʻp matn. Odatda koʻp matn — yaxshi.
Koʻramiz.

### Tokenizator nimani oʻrgandi?

Dars 10 ni eslang: **eng uzun** tokenlar tokenizator nimani "yodlaganini"
koʻrsatadi. Ularni topish uchun bitta yangi funksiya — `sorted`:

```python
print(sorted([3, 1, 2]))
print(sorted(["ccc", "a", "bb"], key=len, reverse=True))
```

**Natija:**

```
[1, 2, 3]
['ccc', 'bb', 'a']
```

- `sorted(...)` — tartiblangan **yangi** roʻyxat qaytaradi.
- `key=len` — nimaga qarab tartiblash (Dars 08 dagi `max(..., key=...)` kabi).
- `reverse=True` — kattadan kichikka.

```python
def tokenlar(vocab):
    natija = []
    for tid in range(256, len(vocab)):
        natija.append(vocab[tid].decode("utf-8", errors="replace"))
    return natija


print("xom: ", sorted(tokenlar(v_xom), key=len, reverse=True)[:10])
print("toza:", sorted(tokenlar(v_toza), key=len, reverse=True)[:10])
```

**Natija:**

```
xom:  [' yoʻlovchilar', 'vchilar', ' bekat', 'chilar', ' yangi', ' yoʻlo', 'ladi', 'ekat', ' koʻ', '����']
toza: ['lanadi', ' uchun', 'chilar', ' yangi', 'moqda', 'ladi', 'nadi', ' boʻ', ' uch', 'ayyo']
```

**Toʻxtang va ikkala qatorni solishtiring.**

Xom tokenizatorning eng uzun tokeni — ` yoʻlovchilar`. Roʻyxatda yana ` bekat`,
` yoʻlo`, `ekat` bor. Bu — **metro maqolasi**. U korpusda olti nusxada edi, va
tokenizator uni "oʻzbek tilining eng muhim qismi" deb oʻrgandi.

Toza tokenizatorda esa — `lanadi`, ` uchun`, `moqda`, `nadi`. Bular — **oʻzbek
tilining qoʻshimchalari**, har qanday matnda ishlaydigan boʻlaklar.

Endi axlatni qidiramiz — `�`, kirill harflari va `|`:

```python
def iflos(vocab):
    natija = []
    for t in tokenlar(vocab):
        if "\ufffd" in t or kirill_ulushi(t) > 0 or "|" in t:
            natija.append(t)
    return natija


print("xom: ", iflos(v_xom))
print("toza:", iflos(v_toza))
```

**Natija:**

```
xom:  ['�', '�', '��', ' �', 'а', '����', 'и', ' |', 'т', 'р']
toza: []
```

100 ta birlashtirishdan **10 tasi** — sof axlatga ketgan: 22-hujjatning `�`
baytlari, rus harflari va ularning yarimlari (19, 20-hujjatlar), ` |` (menyu va
"Ulashish" satri). Toza tokenizatorda — **nol**.

### Yangi matnda oʻlchaymiz

Va asosiy savol — ikkala tokenizator **koʻrmagan** matnda qanday ishlaydi?

```python
sinovlar = [
    "Yangi oʻquv yilida maktablarda koʻplab oʻzgarishlar boʻladi. Oʻqituvchilar va oʻquvchilar bunga tayyorlanmoqda.",
    "Viloyatda yangi kasalxona qurildi. Unda zamonaviy uskunalar bor va shifokorlar bepul maslahat beradi.",
    "Ertaga shaharda katta konsert boʻlib oʻtadi. Chiptalarni internet orqali sotib olish mumkin.",
    "Talabalar universitetda ingliz tili va matematika fanlarini oʻrganishmoqda.",
]

sozlar = 0
t_xom = 0
t_toza = 0
for s in sinovlar:
    sozlar += len(s.split())
    t_xom += len(encode_regex(normallashtir(s), m_xom, NAQSH))
    t_toza += len(encode_regex(normallashtir(s), m_toza, NAQSH))

print("soʻzlar:", sozlar)
print("xom: ", t_xom, "token | fertility:", round(t_xom / sozlar, 3))
print("toza:", t_toza, "token | fertility:", round(t_toza / sozlar, 3))
```

**Natija:**

```
soʻzlar: 45
xom:  219 token | fertility: 4.867
toza: 204 token | fertility: 4.533
```

**Toza tokenizator — 7% kamroq token.** Ikki barobar **kam** matnda oʻqitilgan
boʻlsa ham.

> **Koʻproq matn har doim yaxshi emas. Koʻproq *iflos* matn — yomonroq
> tokenizator.**

<!-- animatsiya: p1 | Olti nusxa -->

### Halol izoh

Dars 14 dagidek: bu — **kichkina** korpusdagi raqam. 29 ta hujjatda bitta maqolaning
besh nusxasi — matnning katta qismi. Haqiqiy korpusda effekt kichikroq boʻladi.

Lekin yoʻnalishi oʻsha. 3-boʻlimdagi raqamlarni eslang: Common Crawl'da bitta
Vikipediya maqolasi **91 nusxada** uchragan. Dublikatlar olib tashlanmasa, uning
har bir soʻzi 91 barobar "muhim" boʻlib qoladi.

---

## 17. Muammo

Endi qoʻlingizda:

- ✓ tokenizator (Dars 06–14)
- ✓ toza korpus va uni qanday olganingiz haqida hisobot (Dars 15)

Lekin toza korpusimiz — 17 ta hujjat, 5 000 bayt. Haqiqiy oʻzbek boʻlimi — 4.45 GB.
Bu taxminan **900 ming barobar** koʻp.

Bizning `train_regex` Dars 10 da yozilgan va har bir birlashtirishda **butun**
matnni qaytadan sanaydi. 900 ming barobar koʻp matnda, 16 384 hajmli lugʻat uchun —
u qancha ishlaydi? Bir soatmi? Bir yilmi?

Va bitta savol ochiq qoldi: dublikatlarni olib tashlashning **ikkinchi** sababi.
Uni men qimmat yoʻl bilan oʻrgandim. Dars 17 da aytib beraman.

---

## 18. Toʻliq kod

```python
import json
import hashlib
import unicodedata

# ---- Dars 14: normalizator ----
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


# ---- fayllar ----
def oqish(fayl):
    hujjatlar = []
    with open(fayl, encoding="utf-8") as f:
        for qator in f:
            hujjatlar.append(json.loads(qator))
    return hujjatlar


def saqlash(hujjatlar, fayl):
    with open(fayl, "w", encoding="utf-8") as f:
        for h in hujjatlar:
            f.write(json.dumps(h, ensure_ascii=False) + "\n")


# ---- tekshiruvlar ----
def buzuq_ulushi(matn):
    if len(matn) == 0:
        return 0
    return matn.count("\ufffd") / len(matn)


def kodlashni_tuzat(matn):
    if "‚Ä" in matn:
        try:
            return matn.encode("mac_latin2").decode("utf-8")
        except (UnicodeEncodeError, UnicodeDecodeError):
            return matn
    return matn


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


def qatorlarni_sana(hujjatlar):
    hisob = {}
    for h in hujjatlar:
        korilgan = set()
        for qator in h["text"].split("\n"):
            qator = qator.strip()
            if qator != "" and qator not in korilgan:
                korilgan.add(qator)
                hisob[qator] = hisob.get(qator, 0) + 1
    return hisob


def shablonni_olib_tashla(matn, shablonlar):
    qolgan = []
    for qator in matn.split("\n"):
        if qator.strip() not in shablonlar:
            qolgan.append(qator)
    return "\n".join(qolgan)


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


def jaccard(a, b):
    birlashma = a | b
    if len(birlashma) == 0:
        return 0
    return len(a & b) / len(birlashma)


# ---- quvur ----
def tozalash(hujjatlar):
    voronka = [("0. oʻqildi", len(hujjatlar))]

    # 1. kodlash
    qoldi = []
    for h in hujjatlar:
        h["text"] = kodlashni_tuzat(h["text"])
        if buzuq_ulushi(h["text"]) <= 0.01:
            qoldi.append(h)
    hujjatlar = qoldi
    voronka.append(("1. kodlash", len(hujjatlar)))

    # 2. til
    qoldi = []
    for h in hujjatlar:
        if kirill_ulushi(h["text"]) <= 0.3:
            qoldi.append(h)
    hujjatlar = qoldi
    voronka.append(("2. til", len(hujjatlar)))

    # 3. shablon satrlar
    hisob = qatorlarni_sana(hujjatlar)
    shablonlar = set()
    for qator, son in hisob.items():
        if son >= 3:
            shablonlar.add(qator)
    for h in hujjatlar:
        h["text"] = shablonni_olib_tashla(h["text"], shablonlar)
    voronka.append(("3. shablon", len(hujjatlar)))

    # 4. uzunlik
    qoldi = []
    for h in hujjatlar:
        if len(h["text"].split()) >= 12:
            qoldi.append(h)
    hujjatlar = qoldi
    voronka.append(("4. uzunlik", len(hujjatlar)))

    # 5. aniq dublikat
    korilgan = set()
    qoldi = []
    for h in hujjatlar:
        k = kalit(h["text"])
        if k not in korilgan:
            korilgan.add(k)
            qoldi.append(h)
    hujjatlar = qoldi
    voronka.append(("5. aniq dublikat", len(hujjatlar)))

    # 6. qisman dublikat
    qoldi = []
    for h in hujjatlar:
        a = ngrammalar(h["text"])
        oxshash = False
        for q in qoldi:
            if jaccard(a, ngrammalar(q["text"])) >= 0.5:
                oxshash = True
                break
        if not oxshash:
            qoldi.append(h)
    hujjatlar = qoldi
    voronka.append(("6. qisman dublikat", len(hujjatlar)))

    return hujjatlar, voronka


hujjatlar, voronka = tozalash(oqish("xom_korpus.jsonl"))
saqlash(hujjatlar, "toza_korpus.jsonl")

for nom, son in voronka:
    print(f"{nom:22s} {son:3d}")
```

**Kutilgan natija:**

```
0. oʻqildi              29
1. kodlash              28
2. til                  26
3. shablon              26
4. uzunlik              23
5. aniq dublikat        19
6. qisman dublikat      17
```

---

## 19. Oʻzingiz yozing

Dublikatlarni topadigan ikki funksiyani va aniq dublikat bosqichini toʻldiring:

```python
def kalit(matn):
    matn = ___(matn)
    matn = matn.___()
    matn = " ".join(matn.___())
    return hashlib.___(matn.___("utf-8")).___()


def jaccard(a, b):
    birlashma = a ___ b
    if len(birlashma) == 0:
        return 0
    return len(a ___ b) / len(___)


korilgan = ___()
qoldi = []
for h in hujjatlar:
    k = kalit(h["text"])
    if k ___ korilgan:
        korilgan.___(k)
        qoldi.append(h)

# Tekshiruv:
print(kalit("O'zbekiston") == kalit("o\u2018zbekiston"))      # True
print(jaccard({1, 2, 3}, {2, 3, 4}))                         # 0.5
```

<details>
<summary>Yechimni koʻrsatish</summary>

```python
def kalit(matn):
    matn = normallashtir(matn)
    matn = matn.lower()
    matn = " ".join(matn.split())
    return hashlib.md5(matn.encode("utf-8")).hexdigest()


def jaccard(a, b):
    birlashma = a | b
    if len(birlashma) == 0:
        return 0
    return len(a & b) / len(birlashma)


korilgan = set()
qoldi = []
for h in hujjatlar:
    k = kalit(h["text"])
    if k not in korilgan:
        korilgan.add(k)
        qoldi.append(h)

print(kalit("O'zbekiston") == kalit("o\u2018zbekiston"))
print(jaccard({1, 2, 3}, {2, 3, 4}))
```

```
True
0.5
```

Eng koʻp qilinadigan xatolar:

1. `korilgan = {}` — bu boʻsh **lugʻat**, toʻplam emas. `.add` ishlamaydi:
   `AttributeError: 'dict' object has no attribute 'add'`.
2. `.encode("utf-8")` ni unutish — `md5` matnni emas, **baytni** oladi:
   `TypeError: Strings must be encoded before hashing`.
3. `&` va `|` ni almashtirish — natija 1 dan katta chiqadi. Jaccard **hech qachon**
   1 dan oshmaydi — buni tekshiruv sifatida ishlating.
</details>

---

## 20. Mashqlar

---

**Mashq 1.** Ishga tushirmasdan ayting: bu uchta matndan qaysilarining `kalit` i
bir xil?

```
"Oʻzbekiston  poytaxti"      "o'zbekiston poytaxti"      "Ozbekiston poytaxti"
```

<details>
<summary>Javobni koʻrsatish</summary>

```python
for t in ["O\u02bbzbekiston  poytaxti", "o'zbekiston poytaxti", "Ozbekiston poytaxti"]:
    print(f"{t!r:25s} {kalit(t)}")
```

```
'Oʻzbekiston  poytaxti'   f9e927a7c2dec78732b00a2bef80d7c7
"o'zbekiston poytaxti"    f9e927a7c2dec78732b00a2bef80d7c7
'Ozbekiston poytaxti'     09d16f404022255d41a9431f18083583
```

**Birinchi ikkitasi** bir xil: katta harf → `.lower()`, ikkita boʻshliq →
`" ".join(...split())`, `'` → `normallashtir`.

Uchinchisi — boshqa. Unda apostrof umuman **yoʻq**. Normalizator notoʻgʻri belgini
toʻgʻrisiga almashtira oladi, lekin yoʻq belgini **qoʻsha olmaydi** — `Ozbekiston`
dagi `O` dan keyin `ʻ` boʻlishi kerakligini bilish uchun soʻzni bilish kerak.

Agar sizning korpusingizda bitta maqola `Oʻzbekiston` bilan ham, `Ozbekiston` bilan
ham uchrasa — aniq dublikat bosqichi uni oʻtkazib yuboradi. Uni 6-bosqich
(Jaccard) ushlaydi — chunki qolgan soʻzlar bir xil.
</details>

---

**Mashq 2.** Bizning til filtrimiz faqat **kirillni** sanaydi. TED hujjatidagi
inglizcha matn undan oʻtadimi? Tekshiring. Keyin uni ushlaydigan oddiy usul
oʻylab toping.

<details>
<summary>Javobni koʻrsatish</summary>

```python
inglizcha = ("Click on any phrase to play the video at that point. As the leader of the Imaging Team "
             "on the Cassini mission to Saturn, Carolyn Porco interprets and shares the pictures.")

print(kirill_ulushi(inglizcha), len(inglizcha.split()))
```

```
0.0 31
```

Kirill — 0, soʻzlar — 12 dan koʻp. **Ikkala filtrdan ham oʻtadi.**

Oddiy usul: oʻzbek tilida **juda koʻp uchraydigan** qisqa soʻzlarni sanash. Har
qanday oʻzbekcha matnda `va`, `bu`, `bilan`, `uchun` boʻladi. Inglizchada — yoʻq:

```python
YORDAMCHI = {"va", "bu", "bilan", "uchun", "ham", "bir", "har", "deb", "esa", "eng"}


def ozbekcha_ulushi(matn):
    sozlar = re.findall(r"\w+", normallashtir(matn).lower())
    if len(sozlar) == 0:
        return 0
    topildi = 0
    for s in sozlar:
        if s in YORDAMCHI:
            topildi += 1
    return topildi / len(sozlar)


print("inglizcha:", ozbekcha_ulushi(inglizcha))
for h in hujjatlar:
    u = ozbekcha_ulushi(h["text"])
    if u == 0:
        print("diqqat:", h["id"], repr(h["text"][:40]))
```

```
inglizcha: 0.0
diqqat: 7 'Ertaga ob-havo qanday boʻladi\nErtaga poy'
diqqat: 11 'Terma jamoa navbatdagi oʻyinga tayyorlan'
```

- `re.findall(r"\w+", ...)` — Dars 13 dagi regex: faqat soʻzlar, tinish belgilarisiz.
  `kerak.` emas, `kerak`.

Inglizcha — 0. Lekin qarang: **7 va 11-hujjatlar ham 0**. Bular — oʻzbekcha
ob-havo xabari va futbol yangiligi: "Ertaga poytaxtda havo bulutli boʻladi…",
"Bosh murabbiy yigʻinga yigirma uch nafar futbolchini chaqirdi…". Ularda
roʻyxatdagi soʻzlarning birortasi ham yoʻq. Agar chegarani `> 0` qilsak — ikkita
toza oʻzbekcha hujjatni tashlaymiz.

Mana shuning uchun haqiqiy quvurlar oʻqitilgan **til aniqlovchi modellar**dan
foydalanadi (FineWeb-2 — `GlotLID`). Lekin ular ham mukammal emas: 5-boʻlimdagi TED
hujjati `language_score = 1.000` olgan — chunki baho **butun hujjat** uchun
beriladi, oxiridagi inglizcha qism esa kichkina.

Dars 14 dagi xulosa bu yerda ham ishlaydi: **har bir filtr qayerdadir xato qiladi.
Muhimi — qayerda ekanini bilish.**
</details>

---

**Mashq 3.** Shablon qoidasi: "kamida 3 ta hujjatda uchragan satr". Faraz qiling,
bitta maqola **uchta** saytda aynan bir xil chop etilgan. Shablon va uzunlik
bosqichlaridan keyin nima qoladi? Tekshiring va qoidani tuzating.

<details>
<summary>Javobni koʻrsatish</summary>

```python
maqola = ("Yangi kutubxona ochildi\n"
          "Shahar markazida uch qavatli yangi kutubxona ochildi, unda oʻn ming kitob va katta oʻquv zali bor.")

sinov = []
for i in range(3):
    sinov.append({"id": 100 + i, "text": maqola})

hisob = qatorlarni_sana(sinov)
sh = set()
for qator, son in hisob.items():
    if son >= 3:
        sh.add(qator)

for h in sinov:
    h["text"] = shablonni_olib_tashla(h["text"], sh)
    print(h["id"], repr(h["text"]), len(h["text"].split()), "soʻz")
```

```
100 '' 0 soʻz
101 '' 0 soʻz
102 '' 0 soʻz
```

**Maqola butunlay yoʻqoldi.** Uning har bir satri uch hujjatda uchragani uchun
"shablon" deb topildi va oʻchirildi. Keyin boʻsh hujjatlarni uzunlik bosqichi
tashlaydi. Dublikat bosqichi bittasini qoldirishi kerak edi — lekin unga hech narsa
yetib kelmadi.

**Tuzatish:** shablon satrlar odatda **qisqa** boʻladi. Maqola jumlalari — uzun.
Ikkinchi shart qoʻshamiz:

```python
def shablonlarni_top(hujjatlar):
    hisob = qatorlarni_sana(hujjatlar)
    natija = set()
    for qator, son in hisob.items():
        if son >= 3 and len(qator.split()) <= 10:
            natija.add(qator)
    return natija


sinov = []
for i in range(3):
    sinov.append({"id": 100 + i, "text": maqola})

sh = shablonlarni_top(sinov)
for h in sinov:
    h["text"] = shablonni_olib_tashla(h["text"], sh)
    print(h["id"], len(h["text"].split()), "soʻz")
```

```
100 16 soʻz
101 16 soʻz
102 16 soʻz
```

Endi asosiy jumla qoldi — va dublikat bosqichi bittasini saqlab qoladi.

Lekin diqqat: **sarlavha** (`Yangi kutubxona ochildi`, 3 soʻz) baribir oʻchdi — u
qisqa va uch marta uchragan. Qoida uni shablondan ajrata olmaydi.

Bizning toʻrtta haqiqiy shablonimiz-chi? Ular 3, 6, 7 va 9 soʻzli — chegara 10
boʻlgani uchun hammasi topiladi. Tekshiramiz:

```python
print(len(shablonlarni_top(oqish("xom_korpus.jsonl"))))
```

```
4
```

Agar chegarani 8 qilganimizda, ensiklopediya satri (9 soʻz) topilmay qolardi.
Chegarani tanlashdan oldin — haqiqiy shablonlaringizning uzunligiga qarang.

Bu ham — **tartib** muammosi. Shablon bosqichi dublikat bosqichidan oldin turibdi,
shuning uchun dublikatlar shablon boʻlib koʻrinadi. Agar tartibni almashtirsak —
13-boʻlimdagi 27-hujjat aniq dublikat bosqichida ushlanmaydi (dumlari har xil);
uni faqat qimmatroq 6-bosqich ushlaydi. Mukammal tartib yoʻq —
har bir tartibning oʻz narxi bor.
</details>

---

**Mashq 4.** Toza korpusni `ensure_ascii` siz saqlang (`json.dumps(h)`). Fayl hajmi
qanday oʻzgaradi? Oʻqib olingan hujjatlar bir xilmi?

<details>
<summary>Javobni koʻrsatish</summary>

```python
with open("ascii_korpus.jsonl", "w", encoding="utf-8") as f:
    for h in hujjatlar:
        f.write(json.dumps(h) + "\n")

with open("toza_korpus.jsonl", encoding="utf-8") as f:
    a = f.read()
with open("ascii_korpus.jsonl", encoding="utf-8") as f:
    b = f.read()

print("ensure_ascii=False:", len(a.encode("utf-8")), "bayt")
print("standart:          ", len(b.encode("utf-8")), "bayt")
print("hujjatlar bir xilmi:", oqish("ascii_korpus.jsonl") == oqish("toza_korpus.jsonl"))
print(b[60:120])
```

```
ensure_ascii=False: 6122 bayt
standart:           6540 bayt
hujjatlar bir xilmi: True
text": "Metroda yangi bekat yo\u02bblovchilarni kutmoqda\nTo
```

Fayl **7% kattaroq**: har bir `ʻ` (2 bayt) endi `\u02bb` (6 bayt). Bizning
korpusda ascii boʻlmagan belgilar kam. Kirill yoki arab yozuvidagi matnda esa har
bir harf shunday boʻladi — fayl bir necha barobar oʻsadi.

Hujjatlar esa **aynan bir xil** qaytadi — `json.loads` `\u02bb` ni yana `ʻ` ga
aylantiradi. Demak bu xato emas — lekin faylni koʻz bilan oʻqib boʻlmaydi
(oxirgi qatorga qarang). 8-boʻlimda biz korpusni **koʻz bilan** tekshirdik. Bunday
faylda buni qila olmaysiz.
</details>

---

**Mashq 5 (eng muhimi).** Bizning `kodlashni_tuzat` oʻquv korpusidagi 21-hujjatni
tuzatdi. Endi uni 5-boʻlimdagi **haqiqiy** FineWeb-2 hujjatining parchasida sinang:

```python
haqiqiy = ("maqsadi ko’zlangan. Ushbu ma‚Äôruza muallif tomonidan 2009 yilda Samarqand "
           "Davlat universitetida o‚Äôtkazilgan ‚ÄĚSinguilarity Theory")
```

Ishladimi? Nima uchun? Tuzating.

<details>
<summary>Javobni koʻrsatish</summary>

```python
haqiqiy = ("maqsadi ko’zlangan. Ushbu ma‚Äôruza muallif tomonidan 2009 yilda Samarqand "
           "Davlat universitetida o‚Äôtkazilgan ‚ÄĚSinguilarity Theory")

print(kodlashni_tuzat(haqiqiy) == haqiqiy)

try:
    haqiqiy.encode("mac_latin2").decode("utf-8")
except UnicodeDecodeError as xato:
    print(xato)
```

```
True
'utf-8' codec can't decode byte 0xd5 in position 10: invalid continuation byte
```

**Ishlamadi** — matn oʻzgarmadi.

- `except UnicodeDecodeError as xato:` — `as xato` xatoning oʻzini oʻzgaruvchiga
  saqlaydi. Uni chop etib, xabarini oʻqish mumkin.

Xabarni oʻqiymiz: `0xd5` baytini oʻqiy olmadi, **10-oʻrinda**. 10-oʻrinda —
`ko’zlangan` dagi `’`. Bu belgi **buzilmagan**! Bu hujjatning bir qismi toʻgʻri,
bir qismi buzuq. Butun matnni `mac_latin2` orqali qaytarganimizda toʻgʻri `’` ham
"qaytarildi" — va `0xd5` baytiga aylandi, u esa UTF-8 da maʼnosiz. `try` bizni
qutqardi — dastur toʻxtamadi — lekin hech narsa tuzatilmadi.

**Tuzatish:** butun matnni emas, faqat **buzilgan boʻlaklarni** almashtiramiz. Har
bir tirnoq belgisining buzilgan shaklini oʻzimiz yasaymiz:

```python
def kodlashni_tuzat2(matn):
    for belgi in ["\u2018", "\u2019", "\u201c", "\u201d", "\u2013", "\u2014"]:
        buzuq = belgi.encode("utf-8").decode("mac_latin2")
        matn = matn.replace(buzuq, belgi)
    return matn


tuzatildi = kodlashni_tuzat2(haqiqiy)
print(tuzatildi)
print(normallashtir(tuzatildi))
```

```
maqsadi ko’zlangan. Ushbu ma’ruza muallif tomonidan 2009 yilda Samarqand Davlat universitetida o’tkazilgan ”Singuilarity Theory
maqsadi koʻzlangan. Ushbu maʼruza muallif tomonidan 2009 yilda Samarqand Davlat universitetida oʻtkazilgan ”Singuilarity Theory
```

- Roʻyxatda oltita belgi: `‘ ’ “ ”` va ikki xil tire (`–`, `—`).
- `belgi.encode("utf-8").decode("mac_latin2")` — 9-boʻlimdagi buzilishni **ataylab**
  takrorlaymiz: `’` → `‚Äô`. Endi nimani qidirishni aniq bilamiz.
- `.replace(buzuq, belgi)` — Dars 02. Faqat buzilgan joylar oʻzgaradi. Toʻgʻri
  `’` ga tegilmaydi.

Ikkinchi qatorda Dars 14 normalizatori ishini tugatdi: `maʼruza`, `oʻtkazilgan`,
`koʻzlangan`.

**Bu mashqning asosiy saboqi:** oʻquv korpusimiz haqiqatdan **osonroq** edi. Unda
21-hujjat butunlay buzilgan edi. Haqiqiy internetda esa bitta hujjat ichida toʻgʻri
va buzuq aralash keladi. Toʻliq koddagi `kodlashni_tuzat` ni shu funksiya bilan
almashtiring — u ikkala holatda ham ishlaydi.

Va har doim: **filtringizni oʻzingiz yasagan misolda emas, haqiqiy maʼlumotda
sinang.**
</details>

---

## 21. Xulosa

1. Oʻzbek matni asosan **Common Crawl** dan keladi. FineWeb-2: lotinda 1.23 mln
   hujjat, 687 mln soʻz. Kirillda — **koʻproq** hujjat. Rus tilida — 857 marta
   koʻp soʻz.
2. Har bir manba uchun uchta savol: **oʻqitish**, **tarqatish**, **shart**.
   Toʻplamning litsenziyasi — matn egasining ruxsati emas.
3. "Tozalangan" korpus — toza korpus emas. Avval **koʻz bilan** qarang.
4. Fayllar: `with open(..., encoding="utf-8")`. Notoʻgʻri kodlash — **mojibake**:
   baytlar toʻgʻri, oʻqish usuli notoʻgʻri.
5. **JSONL** — har qatorda bitta hujjat. `ensure_ascii=False`.
6. `try` / `except` — "urinib koʻr, boʻlmasa tegma".
7. **Olti bosqich:** kodlash → til → shablon → uzunlik → aniq dublikat → qisman
   dublikat. Bizda: **29 → 17**.
8. Tartib muhim: kodlashsiz `�` hujjat til filtridan oʻtadi; shablonsiz 27-hujjat
   dublikat sifatida ushlanmaydi.
9. `set` — takrorsiz, tez `in`. `hashlib.md5` — barmoq izi. `&`, `|` — Jaccard.
   Juftlarni solishtirish katta korpusda imkonsiz — **MinHash**.
10. Korpusni **asl yozuvda** saqlang, normallashtirish — faqat kalit uchun. Va
    **hisobot** yozing.
11. Iflos korpus: metro maqolasi va axlat lugʻatni egalladi; toza korpusda —
    7% kamroq token, ikki barobar kam matn bilan.

---

## Keyingi dars

**Dars 16 — Haqiqiy matnda trening.** 5 000 bayt emas — millionlab. Bizning
`train_regex` bunga chidaydimi? Uni qanday tezlashtirish mumkin? Va birinchi marta
**16 384** hajmli lugʻat bilan tokenizator oʻqitib, `fertility` ni oʻlchaymiz.

Keyingi darsning savoli: *`train_regex` ning har bir qadamida qaysi ish **behuda**
takrorlanadi?*

---

## Ilova A — oʻquv korpusini yaratadigan kod

Buni Colab daftarining **birinchi katagida** ishga tushiring. U `xom_korpus.jsonl`
faylini yaratadi. Matnlar kurs uchun yozilgan; ulardagi muammolar — internet
matnidagi (va FineWeb-2 ning oʻzidagi) haqiqiy muammolarning nusxasi. Kod alohida
fayl sifatida ham bor: [korpus_yasash.py](/data/korpus_yasash.py).

<details>
<summary>Korpusni yaratadigan kod (ochib, nusxa qiling)</summary>

```python
# Dars 15 uchun oʻquv korpusi.
# Bu matnlar oʻquv uchun toʻqilgan. Ulardagi muammolar esa haqiqiy:
# internet matnida (va FineWeb-2 ning oʻzida) uchraydigan narsalar.
import json

ULASHISH = "Ulashish: Telegram | Facebook | X"
HUQUQ = "Barcha huquqlar himoyalangan."
COOKIE = "We use cookies to improve your experience."
ENSIKLOPEDIYA = "Ushbu maqolani yozishda Oʻzbekiston milliy ensiklopediyasi (2000-2005) maʼlumotlaridan foydalanilgan."

# --- bitta yangilik, bir necha saytda ---
METRO_SARLAVHA = "Metroda yangi bekat yoʻlovchilarni kutmoqda"
METRO = ("Toshkent metropolitenining halqa yoʻnalishida yangi bekat yoʻlovchilarni qabul qila boshladi. "
         "Bekat zamonaviy uslubda qurilgan, unda lift va eskalatorlar bor. "
         "Metropoliten maʼlumotiga koʻra, bekat har kuni ertalab soat beshdan tungi yarim birgacha ishlaydi. "
         "Yoʻl haqi oʻzgarmadi. "
         "Yangi bekat yonidagi avtobus bekatlari ham koʻchiriladi, shuning uchun yoʻlovchilarga xaritani oldindan koʻrib chiqish tavsiya etiladi.")

def belgi_bilan(matn, okina, tutuq):
    return matn.replace("ʻ", okina).replace("ʼ", tutuq)

ob_havo = ("Ertaga ob-havo qanday boʻladi\n"
           "Ertaga poytaxtda havo bulutli boʻladi, kunduzi yengil yomgʻir yogʻishi kutilmoqda. "
           "Havo harorati kunduzi 18-20 daraja, kechasi 9-11 daraja iliq boʻladi. "
           "Shamol shimoli-gʻarbdan sekundiga 5-8 metr tezlikda esadi. "
           "Mutaxassislar haydovchilarni ehtiyot boʻlishga chaqirmoqda.")

kutubxona = ("Kutubxonada yangi o’quv zali ochildi\n"
             "Zalda o’n beshta kompyuter va tez internet bor. "
             "O’quvchilar u yerda bepul dars tayyorlashlari mumkin. "
             "Kutubxona har kuni soat to’qqizdan oltigacha ishlaydi, dam olish kuni yakshanba.")

hujjatlar = [
    ("sayt01.misol/yangiliklar/metro", METRO_SARLAVHA + "\n" + METRO + "\n" + ULASHISH + "\n" + HUQUQ),
    ("sayt02.misol/news/12345", belgi_bilan(METRO_SARLAVHA + "\n" + METRO, "'", "'") + "\n" + ULASHISH + "\n" + HUQUQ),
    ("sayt03.misol/2024/metro-bekat", belgi_bilan(METRO_SARLAVHA + "\n" + METRO, "‘", "’") + "\n" + COOKIE),
    ("sayt01.misol/yangiliklar/metro?sahifa=2", METRO_SARLAVHA + "\n" + METRO + "\n" + ULASHISH + "\n" + HUQUQ),
    ("sayt05.misol/shahar/metro",
     belgi_bilan("Poytaxtda yangi metro bekati foydalanishga topshirildi\n"
                 "Shahrimizda yana bir metro bekati ochilib, yoʻlovchilarni qabul qila boshladi. "
                 + METRO.split(". ", 1)[1], "’", "’") + "\n" + HUQUQ),
    ("sayt06.misol/uz/metro",
     belgi_bilan(METRO_SARLAVHA + "\n" + METRO
                 + " Bekat ochilishida shahar hokimligi vakillari ishtirok etdi.", "'", "'") + "\n" + ULASHISH),

    ("sayt01.misol/ob-havo", ob_havo + "\n" + HUQUQ),
    ("sayt07.misol/maktab",
     "Maktablarda yangi oʻquv dasturi\n"
     "Yangi oʻquv yilidan boshlab boshlangʻich sinflarda dasturlash asoslari oʻqitiladi. "
     "Darslar haftada bir marta oʻtadi va oʻyin shaklida tashkil etiladi. "
     "Oʻqituvchilar yozgi taʼtil davomida maxsus kurslarda malaka oshirdi. "
     "Ota-onalar bu yangilikni ijobiy kutib olishmoqda.\n" + ULASHISH),
    ("sayt08.misol/taomlar/palov",
     "Toshkent palovi qanday tayyorlanadi\n"
     "Palov uchun guruch, goʻsht, sabzi, piyoz va oʻsimlik yogʻi kerak boʻladi. "
     "Avval qozonda yogʻ yaxshilab qizdiriladi, keyin piyoz va goʻsht qovuriladi. "
     "Sabzi somoncha shaklida toʻgʻraladi va goʻshtga qoʻshiladi. "
     "Zirvak tayyor boʻlgach, yuvilgan guruch tekis solinadi va ustidan suv quyiladi. "
     "Palov past olovda damlanadi.\n" + COOKIE),
    ("sayt09.misol/bayram/navruz",
     "Navro'z bayrami\n"
     "Navro'z bahor va yangilanish bayrami. U har yili 21-mart kuni keng nishonlanadi. "
     "Bayram kunlari sumalak pishiriladi, mahallalarda sayillar o'tkaziladi. "
     "Odamlar bir-birini tabriklab, qarindoshlarnikiga boradi. "
     "Navro'z O'zbekistonda eng sevimli bayramlardan biri hisoblanadi.\n" + ULASHISH),
    ("sayt10.misol/sport/futbol",
     "Terma jamoa navbatdagi oʻyinga tayyorlanmoqda\n"
     "Milliy terma jamoa saralash bosqichining navbatdagi uchrashuviga tayyorgarlik koʻrmoqda. "
     "Bosh murabbiy yigʻinga yigirma uch nafar futbolchini chaqirdi. "
     "Jamoa mashgʻulotlarni poytaxtdagi markaziy stadionda oʻtkazmoqda. "
     "Uchrashuv shanba kuni kechqurun boʻlib oʻtadi.\n" + HUQUQ),
    ("sayt11.misol/qishloq/bugdoy",
     "Bug’doy hosili yig’ib olindi\n"
     "Viloyatda bug’doy o’rimi yakunlandi. "
     "Fermerlar bu yil har gektardan o’rtacha oltmish sentnerdan hosil olishdi. "
     "Hosilni tez yig’ib olish uchun qo’shimcha kombaynlar jalb qilindi. "
     "Mutaxassislarning fikricha, yaxshi hosilga o’z vaqtida sug’orish sabab bo’lgan."),
    ("sayt12.misol/talim/ai-kurs",
     "Sunʼiy intellekt boʻyicha bepul kurs\n"
     "Yoshlar uchun sunʼiy intellekt asoslari boʻyicha bepul onlayn kurs boshlandi. "
     "Kursda Python tili, maʼlumotlar bilan ishlash va oddiy modellar qurish oʻrgatiladi. "
     "Darslar oʻzbek tilida olib boriladi. "
     "Kursni muvaffaqiyatli tugatganlar sertifikat oladi.\n" + COOKIE),
    ("sayt13.misol/sayohat/samarqand",
     "Samarqandga sayohat\n"
     "Samarqand dunyodagi eng qadimiy shaharlardan biri. "
     "Registon maydoni, Go`ri Amir maqbarasi va Shohi Zinda majmuasi sayyohlarni o`ziga tortadi. "
     "Bahor va kuz oylari sayohat uchun eng qulay vaqt hisoblanadi. "
     "Shaharga Toshkentdan tezyurar poyezdda taxminan ikki soatda yetib borish mumkin."),
    ("ensiklopediya.misol/amudaryo",
     "Amudaryo\n"
     "Amudaryo Oʻrta Osiyodagi eng yirik daryolardan biri. "
     "U Pomir togʻlaridan boshlanadi va Orol dengizi tomon oqadi. "
     "Daryo suvi qadimdan dehqonchilikda sugʻorish uchun ishlatiladi. "
     "Amudaryo boʻyida koʻplab qadimiy shaharlar joylashgan.\n" + ENSIKLOPEDIYA),
    ("ensiklopediya.misol/paxta",
     "Paxta\n"
     "Paxta gʻoʻza oʻsimligining tolasi. "
     "Undan ip, gazlama va kiyim tayyorlanadi. "
     "Paxta chigitidan esa yogʻ olinadi. "
     "Oʻzbekistonda paxta yetishtirish uzoq tarixga ega.\n" + ENSIKLOPEDIYA),
    ("ensiklopediya.misol/navoiy",
     "Alisher Navoiy\n"
     "Alisher Navoiy buyuk shoir va mutafakkir. "
     "U 1441-yilda Hirotda tugʻilgan. "
     "Navoiy turkiy tilda yozilgan koʻplab asarlar muallifi, uning eng mashhur asari «Xamsa» hisoblanadi. "
     "Uning tavallud kuni har yili 9-fevralda nishonlanadi.\n" + ENSIKLOPEDIYA),
    ("sayt14.misol/til-bayrami",
     "Oʻzbek tili bayrami\n"
     "Har yili 21-oktabr Oʻzbek tili bayrami kuni sifatida nishonlanadi. "
     "Bu kunda maktab va universitetlarda turli tadbirlar oʻtkaziladi. "
     "Yoshlar oʻzbek tilida yozilgan sheʼrlarni yoddan aytishadi. "
     "Tilni asrash va rivojlantirish har birimizning burchimizdir."),
    ("sayt15.misol/ru/kniga",
     "Сегодня в Ташкенте открылась "
     "книжная ярмарка. "
     "В ней участвуют более ста "
     "издательств. "
     "Посетители могут прийти "
     "бесплатно до конца недели."),
    ("sayt16.misol/kitob",
     "Бугун пойтахтда китоб "
     "кўргазмаси очилди. "
     "Кўргазмада юздан ортиқ "
     "нашриёт иштирок этмоқда. "
     "Ташриф буюрувчилар "
     "кўргазмани бепул кўришлари "
     "мумкин."),
    ("sayt17.misol/kutubxona", kutubxona.encode("utf-8").decode("mac_latin2")),
    ("sayt18.misol/pogoda",
     "Погода на завтра: "
     "облачно, возможен "
     "небольшой дождь, "
     "температура днём "
     "до двадцати градусов."
     .encode("cp1251").decode("utf-8", errors="replace")),
    ("sayt19.misol/404", "Sahifa topilmadi."),
    ("sayt20.misol/", "Bosh sahifa | Yangiliklar | Sport | Aloqa"),
    ("sayt21.misol/", "Saytga xush kelibsiz!\n" + HUQUQ),
    ("sayt22.misol/sport/shaxmat",
     "Shaxmat turnirida yoshlar gʻalaba qozondi\n"
     "Toshkentda boʻlib oʻtgan shaxmat turnirida yosh oʻyinchilar yaxshi natija koʻrsatdi. "
     "Gʻolib turnirdan soʻng jurnalistlarga «Спасибо всем!» "
     "deb rus tilida ham minnatdorlik bildirdi. "
     "Keyingi turnir yoz oylarida oʻtkaziladi. "
     "Musobaqada oʻttizdan ortiq ishtirokchi qatnashdi.\n" + ULASHISH),
    ("sayt02.misol/ob-havo", ob_havo + "\n" + ULASHISH),
    ("sayt23.misol/fan/quyosh",
     "Quyosh tizimi\n"
     "Quyosh tizimida sakkizta sayyora bor. "
     "Ulardan eng kattasi Yupiter, eng kichigi esa Merkuriy. "
     "Yer Quyoshdan uchinchi sayyora hisoblanadi. "
     "Sayyoralar Quyosh atrofida turli tezlikda aylanadi.\n" + COOKIE),
    ("sayt24.misol/texno/ilova",
     "Talabalar uchun yangi mobil ilova\n"
     "Talabalar uchun dars jadvalini koʻrsatadigan yangi mobil ilova ishga tushirildi. "
     "Ilovada imtihon sanalari va kutubxona ish vaqti ham koʻrsatiladi. "
     "U bepul va internet boʻlmaganda ham ishlaydi. "
     "Ishlab chiquvchilar ilovani yanada qulay qilish uchun takliflar kutmoqda.\n" + HUQUQ),
]

with open("xom_korpus.jsonl", "w", encoding="utf-8") as f:
    for i in range(len(hujjatlar)):
        url, matn = hujjatlar[i]
        hujjat = {"id": i + 1, "url": "https://" + url, "text": matn}
        f.write(json.dumps(hujjat, ensure_ascii=False) + "\n")

print("yozildi:", len(hujjatlar), "ta hujjat")
```

**Natija:**

```
yozildi: 29 ta hujjat
```

</details>
