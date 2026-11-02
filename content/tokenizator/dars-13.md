# Dars 13 — So'z chegarasi va regex

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 12 — `encode`
> **Vaqt:** ~55 daqiqa
> **Kerak:** Dars 01–12. To'liq ishlaydigan tokenizator

---

## Bu darsdan keyin siz...

- **ko'rasiz** tokenizatoringiz matnni yodlab olishining **haqiqiy sababini**;
- **o'rganasiz** regex asoslarini — matnni naqsh bo'yicha bo'lish;
- **tekshirasiz** naqshingiz o'zbek `ʻ` belgisini buzmasligini (ko'pchilik buni unutadi);
- **qurasiz** matnni oldindan bo'lib, keyin BPE qo'llaydigan tokenizatorni;
- **ko'rasiz** eng uzun token **228 baytdan 13 baytga** tushishini;
- **tushunasiz** nima uchun to'g'ri yechim ba'zan raqamni **yomonlashtirishini**.

Oxirgi punkt — bu darsning eng qiyin va eng foydali qismi.

---

## 1. Bitta savol

Dars 12 oxirida savol qoldirgan edim:

> `bolalar`, `bolalar,`, `bolalarni`, `bolalar.` — bular tokenizator uchun
> necha xil narsa, va nechta bo'lishi kerak?

Tekshiramiz:

```python
for s in ["bolalar", "bolalar,", "bolalarni", "bolalar."]:
    print(f"  {s!r:12s} -> {encode(s, merges)}")
```

**Natija:**

```
  'bolalar'    -> [270, 256, 257]
  'bolalar,'   -> [270, 256, 257, 44]
  'bolalarni'  -> [270, 256, 257, 110, 105]
  'bolalar.'   -> [270, 256, 257, 46]
```

Bu unchalik yomon ko'rinmaydi — hammasi `[270, 256, 257]` bilan boshlanadi.

Lekin Dars 12 dagi haqiqiy misolni eslang:

```python
print("bolalar keldi  :", len(encode("bolalar keldi", merges)), "token")
print("bolalar, keldi :", len(encode("bolalar, keldi", merges)), "token")
```

```
bolalar keldi  : 6 token
bolalar, keldi : 9 token
```

**Bitta vergul — uchta qo'shimcha token.**

Chunki bo'shliq bilan yozilganda 275-token (`b'lalar '`, oxirida bo'shliq bilan)
ishlaydi. Vergul qo'ysangiz — u **umuman ishlamaydi**, va so'z mayda bo'laklarga
tarqab ketadi.

Muammo bitta narsada: **tokenizator uchun bo'shliq — oddiy belgi.** U so'z
chegarasi degan narsani bilmaydi.

---

## 2. Muammoning haqiqiy hajmi

Dars 10 dagi eng yomon holatni eslang. `vocab_size = 406` bilan o'qitganimizda
355-token shunday chiqqan edi:

```
b'Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftar...'
```

O'lchaymiz:

```python
m_2, v_2, t_2 = train(matn, 406)
print("eng uzun token:", len(max(v_2.values(), key=len)), "bayt")
```

**Natija:**

```
eng uzun token: 228 bayt
```

**228 bayt.** Bitta "token" — deyarli butun xatboshi.

Va lug'atda bunday tokenlar ko'p: `di.`, `lar `, `a `, `i `, `ga `, `ishdi.`,
`rishdi.`, `ni ` — birinchi 20 ta tokendan **9 tasi** bo'shliq yoki tinish
belgisini o'z ichiga oladi.

**Bu lug'at joyining isrofi.** `lar` va `lar ` — deyarli bir xil narsa, lekin
ikkita alohida token. Sizning tokenizatoringizda 16 384 ta joy bor; har bir
takroriy variant foydali token uchun yo'qolgan joy.

---

## 3. Yechim: oldindan bo'lish

G'oya oddiy:

> **Matnni avval so'zlarga bo'lamiz. Keyin BPE ni har bir so'z ichida alohida
> ishlatamiz. Birlashtirish hech qachon so'z chegarasidan o'tmaydi.**

Ya'ni:

```
"bolalar, keldi"
     ↓  oldindan boʻlish
["bolalar", ",", " keldi"]
     ↓  har biriga alohida BPE
[b,o,lalar] [,] [ keldi...]
```

Birlashtirish faqat bitta bo'lak ichida bo'ladi. `r` va `,` hech qachon
birlashmaydi, chunki ular boshqa bo'laklarda.

Buni qiladigan vosita — **regex**.

---

## 4. Regex asoslari

**Regex** (regular expression, "muntazam ifoda") — matnda **naqsh** qidirish
tili. Python'da u `re` moduli orqali ishlaydi.

```python
import re

print(re.findall(r"\w+", "Ular oʻqishdi, va!"))
```

**Natija:**

```
['Ular', 'oʻqishdi', 'va']
```

- `re.findall(naqsh, matn)` — naqshga mos keladigan **hamma** bo'lakni topadi
  va ro'yxat qaytaradi.
- `r"..."` — **xom satr** (raw string). `r` old qo'shimchasi Python'ga
  "`\` belgisini oddiy belgi deb qabul qil" deydi. Regex da `\` juda ko'p
  ishlatiladi, shuning uchun `r` deyarli har doim qo'yiladi.

### Kerakli uchta naqsh

```python
print(re.findall(r"\w+",      "Ular oʻqishdi, va!"))
print(re.findall(r"[^\s\w]+", "Ular oʻqishdi, va!"))
print(re.findall(r"\s+",      "Ular oʻqishdi, va!"))
```

```
['Ular', 'oʻqishdi', 'va']
[',', '!']
[' ', ' ']
```

| Naqsh | Ma'nosi |
|---|---|
| `\w` | **so'z belgisi** — harf, raqam yoki `_` |
| `\s` | **bo'shliq** — probel, tabulyatsiya, yangi qator |
| `+` | oldingisidan **bir yoki ko'p** |
| `[...]` | qavs ichidagilardan **bittasi** |
| `[^...]` | qavs ichidagilardan **bo'lmagan** bittasi |

Demak:
- `\w+` — ketma-ket kelgan bir yoki bir nechta so'z belgisi
- `[^\s\w]+` — bo'shliq ham, so'z belgisi ham **bo'lmagan** narsalar,
  ya'ni tinish belgilari
- `\s+` — bo'shliqlar

---

## 5. ⚠️ Eng muhim tekshiruv: `ʻ` buzilmaydimi?

**To'xtang.** Naqsh yozishdan oldin, uni o'zbek matnida sinash **shart**.

Ko'pchilik shunday yozadi:

```python
print(re.findall(r"[a-zA-Z]+", "oʻqish gʻalaba"))
```

**Natija:**

```
['o', 'qish', 'g', 'alaba']
```

**Falokat.** `oʻqish` uchga bo'lindi: `o`, `ʻ`, `qish` — va o'rtadagi `ʻ`
umuman yo'qoldi.

Sabab: `[a-zA-Z]` faqat ingliz harflarini biladi. `ʻ` (U+02BB) u uchun harf emas.

Endi to'g'ri variantni sinaymiz:

```python
print(re.findall(r"\w+", "oʻqish gʻalaba"))
```

```
['oʻqish', 'gʻalaba']
```

**Ishladi.** `\w` — bu ASCII emas, u **Unicode** bo'yicha ishlaydi.

Nima uchun ishladi? Tekshiramiz:

```python
import unicodedata
print(unicodedata.category("ʻ"), "ʻ".isalpha())
```

```
Lm True
```

`Lm` — *Letter, modifier* ("o'zgartiruvchi harf"). Python uni **harf** deb
biladi, shuning uchun `\w` uni qabul qiladi.

> **Bu tasodif.** Unicode tuzuvchilari `ʻ` ni `Lm` kategoriyasiga qo'ygan —
> va aynan shuning uchun bizning naqshimiz ishlaydi. Boshqa kategoriyada
> bo'lganida, o'zbek tili uchun maxsus naqsh yozishga to'g'ri kelardi.
>
> **Xulosa:** naqshni har doim **o'z tilingizda sinab ko'ring.** Ingliz
> matnida ishlagani hech narsani kafolatlamaydi.

<!-- animatsiya: o2 | [a-zA-Z] oʻzbekchani buzadi -->

---

## 6. To'liq naqsh

Endi uchala qismni birlashtiramiz:

```python
NAQSH = r" ?\w+| ?[^\s\w]+|\s+"
```

`|` — **"yoki"**. Python chapdan o'ngga sinab ko'radi va birinchi mos kelganini
oladi.

Uchta variant:

| Qism | Nimani tutadi |
|---|---|
| ` ?\w+` | ixtiyoriy bo'shliq + so'z. Masalan ` maktabga` |
| ` ?[^\s\w]+` | ixtiyoriy bo'shliq + tinish. Masalan ` —` yoki `,` |
| `\s+` | qolgan bo'shliqlar (yangi qator, ketma-ket probellar) |

`?` — **"nol yoki bitta"**. Ya'ni bo'shliq bo'lsa ham, bo'lmasa ham mos keladi.

Sinaymiz:

```python
namuna = "Bolalar maktabga borishdi. Ular oʻqishdi, va yozishdi!"
print(re.findall(NAQSH, namuna))
```

**Natija:**

```
['Bolalar', ' maktabga', ' borishdi', '.', ' Ular', ' oʻqishdi', ',', ' va', ' yozishdi', '!']
```

**Diqqat qiling: bo'shliq so'zning oldiga yopishdi**, orqasiga emas.

` maktabga` — bo'shliq va so'z birga. Nima uchun shunday?

Chunki matnda so'z **deyarli har doim** bo'shliqdan keyin keladi. Agar bo'shliq
so'zning bir qismi bo'lsa, tokenizator ` maktabga` ni bitta token qilib o'rganishi
mumkin — va u har joyda ishlaydi. Agar bo'shliq orqaga yopishsa (`maktabga `),
u faqat keyin bo'shliq kelganda ishlardi — vergul kelsa, buzilardi.

**Bu aynan 1-bo'limdagi muammoning yechimi.**

### Eng muhim tekshiruv: hech narsa yo'qolmadimi?

```python
boshlar = re.findall(NAQSH, matn)
print("parchalar soni:", len(boshlar))
print("round-trip:", "".join(boshlar) == matn)
```

**Natija:**

```
parchalar soni: 73
round-trip: True
```

Bo'laklarni qayta yopishtirsak, **aynan asl matn** chiqadi. Hech bir belgi
yo'qolmadi — bo'shliqlar ham, yangi qatorlar ham.

> **Bu tekshiruvni hech qachon o'tkazib yubormang.** Naqsh yozganda bir narsani
> unutish juda oson, va natijada matnning bir qismi jimgina yo'qoladi.
>
> Sinab ko'ring: `re.findall(r"\w+", matn)` bilan `"".join(...)` qilsangiz →
> `False`. Barcha bo'shliq va tinish belgilari yo'qolgan bo'ladi.

---

## 7. Treningni o'zgartiramiz

Endi `train` ni yangilaymiz. Ikkita o'zgarish:

**1. Matnni bo'laklarga ajratamiz.**
**2. Statistikani hamma bo'lakdan yig'amiz, lekin merge har bo'lakda alohida.**

Birinchi navbatda `get_stats` ning yig'adigan variantini yozamiz:

```python
def get_stats_qoshib(tokenlar, hisob):
    for juftlik in zip(tokenlar, tokenlar[1:]):
        hisob[juftlik] = hisob.get(juftlik, 0) + 1
    return hisob
```

Farqi: u **tayyor lug'atni** qabul qiladi va unga qo'shadi. Shunda bir nechta
bo'lakdan bitta umumiy statistika yig'ish mumkin:

```python
h = {}
get_stats_qoshib([1, 2, 3], h)
get_stats_qoshib([2, 3, 4], h)
print(h)
```

```
{(1, 2): 1, (2, 3): 2, (3, 4): 1}
```

`(2, 3)` ikkala ro'yxatda ham bor — sanoq **2** bo'ldi. ✓

Endi trening:

```python
def train_regex(matn, vocab_size, naqsh):
    boshlar = re.findall(naqsh, matn)

    parchalar = []
    for b in boshlar:
        parchalar.append(kodla(b))

    merges = {}
    vocab = {}
    for i in range(256):
        vocab[i] = bytes([i])

    for yangi_id in range(256, vocab_size):
        stats = {}
        for p in parchalar:
            get_stats_qoshib(p, stats)

        if len(stats) == 0:
            break

        eng = max(stats, key=stats.get)

        yangi_parchalar = []
        for p in parchalar:
            yangi_parchalar.append(merge(p, eng, yangi_id))
        parchalar = yangi_parchalar

        merges[eng] = yangi_id
        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]

    return merges, vocab, parchalar
```

**Dars 10 dagidan farqi:**

| Dars 10 | Dars 13 |
|---|---|
| `tokenlar` — bitta uzun ro'yxat | `parchalar` — ro'yxatlar ro'yxati |
| `get_stats(tokenlar)` | har bir parchadan **yig'iladi** |
| `merge(tokenlar, ...)` | **har bir parchaga alohida** |

Mana shu "har bir parchaga alohida" — butun yechim shu yerda. Juftlik ikki
parcha orasida bo'la olmaydi, chunki ular alohida ro'yxatlar.

---

## 8. Natijani ko'ramiz

```python
NAQSH = r" ?\w+| ?[^\s\w]+|\s+"
m_r, v_r, p_r = train_regex(matn, 276, NAQSH)
```

Ikkala lug'atni yonma-yon qo'yamiz:

```
       regexsiz          regexli
  256: b'la'             b'la'
  257: b'lar'            b'lar'
  258: b'sh'             b'sh'
  259: b'di'             b'di'
  260: b'di.'            b'ish'
  261: b'lar '           b'ishdi'
  262: b'ish'            b'ga'
  263: b'a '             b' b'
  264: b'ishdi.'         b'\xca\xbb'
  265: b'i '             b'ta'
  266: b'ga '            b'rishdi'
  267: b'\xca\xbb'       b'da'
  268: b'ta'             b'hi'
  269: b'rishdi.'        b' bo'
  270: b'bo'             b'ni'
  271: b'ni '            b'\xca\xbbq'
  272: b'\xca\xbbq'      b' y'
  273: b'da'             b'lalar'
  274: b'ch'             b'it'
  275: b'lalar '         b'ob'
```

**Chap ustunda** bo'shliq va nuqta bilan ifloslangan tokenlar: `di.`, `lar `,
`a `, `i `, `ga `, `ishdi.`, `rishdi.`, `ni `, `lalar ` — **to'qqiztasi**.

**O'ng ustunda** esa toza morfemalar: `la`, `lar`, `sh`, `di`, `ish`, `ishdi`,
`ga`, `ta`, `rishdi`, `da`, `ni`, `lalar` — **hech birida nuqta yo'q**.

`b' b'`, `b' bo'`, `b' y'` — bularda bo'shliq **oldinda**, va bu to'g'ri:
ular so'z **boshlanishini** bildiradi.

---

## 9. Hal qiluvchi dalil

```python
m_r2, v_r2, _ = train_regex(matn, 406, NAQSH)
m_2, v_2, _ = train(matn, 406)

print("regexsiz eng uzun token:", len(max(v_2.values(), key=len)), "bayt")
print("regexli  eng uzun token:", len(max(v_r2.values(), key=len)), "bayt")
```

**Natija:**

```
regexsiz eng uzun token: 228 bayt
regexli  eng uzun token: 13 bayt
```

**228 → 13.**

Sababi oddiy va kafolatlangan: **token hech qachon bitta bo'lakdan uzun
bo'la olmaydi.** Eng uzun bo'lak — eng uzun so'z. Demak eng uzun token —
eng uzun so'z.

Yodlab olish endi **imkonsiz**. Tokenizator qancha ko'p birlashtirish qilmasin,
u butun jumlani bitta token qila olmaydi.

Dars 10 dagi 355-tokenni solishtiring:

```
regexsiz 355 = b'Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftar...'
regexli  355 = b'Kechqur'
```

<!-- animatsiya: o1 | Chegara -->

---

## 10. `encode` ni ham o'zgartiramiz

Agar trening bo'laklar bilan bo'lsa, kodlash ham shunday bo'lishi shart. Natijani
o'lchashdan oldin shu funksiya kerak bo'ladi:

```python
def encode_regex(matn, merges, naqsh):
    natija = []

    for bosh in re.findall(naqsh, matn):
        tk = kodla(bosh)

        while len(tk) >= 2:
            stats = {}
            get_stats_qoshib(tk, stats)
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
```

Ichkarisi — Dars 12 dagi `encode` ning o'zi. Farqi: u **har bir bo'lak uchun
alohida** ishlaydi, natijalar oxirida birlashtiriladi.

```python
yangi = "Talabalar universitetga kirishdi va imtihonlarni topshirishdi."

te = encode_regex(yangi, m_r, NAQSH)
print("tokenlar:", len(te), "| round-trip:", decode(te, v_r) == yangi)
```

```
tokenlar: 42 | round-trip: True
```

> ⚠️ **`encode` va `train` bir xil naqshni ishlatishi shart.** Agar boshqa
> naqsh ishlatsangiz — boshqa bo'laklar, boshqa tokenlar, va model hech narsani
> tanimaydi. Dars 18 da naqshni tokenizator bilan birga saqlaysiz.

---

## 11. Halol gap: raqam yomonlashdi

Endi eng qiyin qismi. Fertility ni o'lchaymiz:

```python
w = len(yangi.split())

print("regexsiz, yangi matn:", round(len(encode(yangi, merges)) / w, 3))
print("regexli,  yangi matn:", round(len(encode_regex(yangi, m_r, NAQSH)) / w, 3))
```

**Natija:**

```
regexsiz, yangi matn: 6.833
regexli,  yangi matn: 7.0
```

**Regex fertility ni yomonlashtirdi.** 6.833 dan 7.0 ga.

Va Dars 12 dagi misolda ham:

```
bolalar keldi   regexsiz: 6 token | regexli: 8 token
bolalar, keldi  regexsiz: 9 token | regexli: 9 token
```

Birinchi holatda regexli variant **yomonroq** (8 vs 6).

**Demak biz vaziyatni buzdikmi?**

### Yo'q. Va nima uchun ekanini tushunish muhim.

**Sabab 1 — barqarorlik.** Yuqoridagi ikki qatorga qayting:

| | bo'shliq bilan | vergul bilan | farq |
|---|---|---|---|
| regexsiz | 6 token | 9 token | **+50%** |
| regexli | 8 token | 9 token | **+12%** |

Regexsiz variantda bitta vergul narxni **yarmiga oshiradi**. Regexli variantda
esa deyarli o'zgarmaydi.

**So'z bir xil narxda bo'lishi kerak**, undan keyin nima kelishidan qat'i nazar.
Model uchun bu juda muhim: u `bolalar` so'zini bitta naqsh sifatida o'rganishi
kerak, to'rtta emas.

**Sabab 2 — yodlash to'xtadi.** Katta lug'at bilan o'lchaymiz:

```
                oʻqigan matn   yangi matn   farq
regexsiz 406        1.472         6.167      4.19x
regexli  406        1.906         6.000      3.15x
```

Diqqat qiling:

- **O'qigan matnda** regexli variant **yomonroq** (1.906 vs 1.472) — chunki
  u yodlay olmaydi.
- **Yangi matnda** regexli variant **yaxshiroq** (6.000 vs 6.167).
- **Farq kamaydi:** 4.19× dan 3.15× ga.

Ikki raqam orasidagi farq — bu yodlashning o'lchovi (Dars 12). Regex uni
kamaytirdi.

**Sabab 3 — bizning korpusimiz juda kichik.** 53 ta so'z. Haqiqiy korpusda
(millionlab so'z) regexli variant fertility bo'yicha ham **aniq yutadi**,
chunki u lug'at joyini isrof qilmaydi.

> **Eng muhim saboq:**
>
> **Raqam yaxshilanishi to'g'ri qaror degani emas. Raqam yomonlashishi
> noto'g'ri qaror degani ham emas.**
>
> Siz **qaysi** raqamga qarayotganingizni va u **nimani** o'lchayotganini
> bilishingiz kerak.
>
> Bu yerda: fertility bitta kichik matnda biroz yomonlashdi, lekin yodlash
> to'xtadi va barqarorlik oshdi. Bu — yaxshi savdo.
>
> Dars 17 da bu mavzuga qaytamiz.

<!-- animatsiya: o3 | Raqam yomonlashdi -->

---

## 12. To'liq kod

```python
import re

NAQSH = r" ?\w+| ?[^\s\w]+|\s+"


def get_stats_qoshib(tokenlar, hisob):
    for juftlik in zip(tokenlar, tokenlar[1:]):
        hisob[juftlik] = hisob.get(juftlik, 0) + 1
    return hisob


def train_regex(matn, vocab_size, naqsh):
    boshlar = re.findall(naqsh, matn)
    parchalar = []
    for b in boshlar:
        parchalar.append(kodla(b))

    merges = {}
    vocab = {}
    for i in range(256):
        vocab[i] = bytes([i])

    for yangi_id in range(256, vocab_size):
        stats = {}
        for p in parchalar:
            get_stats_qoshib(p, stats)
        if len(stats) == 0:
            break

        eng = max(stats, key=stats.get)

        yangi_parchalar = []
        for p in parchalar:
            yangi_parchalar.append(merge(p, eng, yangi_id))
        parchalar = yangi_parchalar

        merges[eng] = yangi_id
        vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]

    return merges, vocab, parchalar


def encode_regex(matn, merges, naqsh):
    natija = []
    for bosh in re.findall(naqsh, matn):
        tk = kodla(bosh)
        while len(tk) >= 2:
            stats = {}
            get_stats_qoshib(tk, stats)
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


# ---- Sinovlar ----
# 1. Naqsh hech narsani yoʻqotmaydi
boshlar = re.findall(NAQSH, matn)
print("parchalar:", len(boshlar), "| round-trip:", "".join(boshlar) == matn)

# 2. oʻ buzilmaydi
print(re.findall(r"\w+", "oʻqish gʻalaba"))

# 3. Trening
m_r, v_r, p_r = train_regex(matn, 276, NAQSH)
for tid in range(256, 266):
    print(f"  {tid} = {v_r[tid]!r}")

# 4. Eng uzun token
m_r2, v_r2, _ = train_regex(matn, 406, NAQSH)
m_2, v_2, _ = train(matn, 406)
print("regexsiz eng uzun:", len(max(v_2.values(), key=len)), "bayt")
print("regexli  eng uzun:", len(max(v_r2.values(), key=len)), "bayt")

# 5. Round-trip
yangi = "Talabalar universitetga kirishdi va imtihonlarni topshirishdi."
te = encode_regex(yangi, m_r, NAQSH)
print("tokenlar:", len(te), "| round-trip:", decode(te, v_r) == yangi)
```

**Kutilgan natija:**

```
parchalar: 73 | round-trip: True
['oʻqish', 'gʻalaba']
  256 = b'la'
  257 = b'lar'
  258 = b'sh'
  259 = b'di'
  260 = b'ish'
  261 = b'ishdi'
  262 = b'ga'
  263 = b' b'
  264 = b'\xca\xbb'
  265 = b'ta'
regexsiz eng uzun: 228 bayt
regexli  eng uzun: 13 bayt
tokenlar: 42 | round-trip: True
```

---

## 13. O'zingiz yozing

```python
import re

# 1. Oʻz naqshingizni sinang — hech narsa yoʻqolmasligi kerak
namuna = "Bolalar oʻqishdi, va gʻalaba qozonishdi!"
NAQSH = r" ?\w+| ?[^\s\w]+|\s+"

boshlar = re.___(NAQSH, namuna)
print(boshlar)
print("round-trip:", "".___(boshlar) == namuna)

# 2. oʻ va gʻ buzilmadimi? Parchalarda ularni qidiring
for b in boshlar:
    if "ʻ" in b:
        print("ʻ bor:", repr(b))

# 3. Notoʻgʻri naqsh bilan solishtiring
print(re.findall(r"[a-zA-Z]+", namuna))
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
namuna = "Bolalar oʻqishdi, va gʻalaba qozonishdi!"
NAQSH = r" ?\w+| ?[^\s\w]+|\s+"

boshlar = re.findall(NAQSH, namuna)
print(boshlar)
print("round-trip:", "".join(boshlar) == namuna)

for b in boshlar:
    if "ʻ" in b:
        print("ʻ bor:", repr(b))

print(re.findall(r"[a-zA-Z]+", namuna))
```

```
['Bolalar', ' oʻqishdi', ',', ' va', ' gʻalaba', ' qozonishdi', '!']
round-trip: True
ʻ bor: ' oʻqishdi'
ʻ bor: ' gʻalaba'
['Bolalar', 'o', 'qishdi', 'va', 'g', 'alaba', 'qozonishdi']
```

Oxirgi qatorga qarang: `[a-zA-Z]+` bilan `oʻqishdi` → `o` va `qishdi`,
`gʻalaba` → `g` va `alaba`. **Har ikkala o'zbek harfi ham buzildi.**

Va e'tibor bering: `ʻ` belgilari butunlay **yo'qoldi** — ular natijada
umuman yo'q. Round-trip ham `False` bo'lardi.
</details>

---

## 14. Mashqlar

---

**Mashq 1.** `re.findall(r"\w+", "salom, dunyo!")` va
`re.findall(r"\S+", "salom, dunyo!")` — farqi nima?

<details>
<summary>Javobni ko'rsatish</summary>

```
['salom', 'dunyo']
['salom,', 'dunyo!']
```

- `\w+` — faqat so'z belgilari. Tinish belgilari **tashlab yuboriladi**.
- `\S+` — bo'shliq bo'lmagan hamma narsa. Tinish belgisi **so'zga yopishadi**.

Ikkalasi ham bizga to'g'ri kelmaydi:
- `\w+` — ma'lumot yo'qotadi (round-trip buziladi)
- `\S+` — `dunyo!` va `dunyo` ikki xil bo'lak bo'ladi, ya'ni 1-bo'limdagi
  muammo qaytadi

Shuning uchun uchta variantli naqsh kerak bo'ldi.
</details>

---

**Mashq 2.** Nima uchun bo'shliq so'zning **oldiga** yopishtiriladi, orqasiga emas?

<details>
<summary>Javobni ko'rsatish</summary>

Chunki matnda so'zdan **keyin** har xil narsa kelishi mumkin: bo'shliq, vergul,
nuqta, qator oxiri. Lekin so'zdan **oldin** deyarli har doim bo'shliq turadi.

```
" bolalar"   ← bu naqsh har joyda ishlaydi
"bolalar "   ← bu faqat keyin boʻshliq kelganda ishlaydi
```

Agar bo'shliq orqaga yopishsa, `bolalar ` va `bolalar,` ikki xil bo'lak
bo'lardi — va bu aynan biz tuzatmoqchi bo'lgan muammo.

GPT-2, GPT-4 va sizning tokenizatoringiz — hammasi bo'shliqni **oldinga**
yopishtiradi.
</details>

---

**Mashq 3.** `train_regex` da `merge` har bir parchaga alohida qo'llanadi.
Agar hammasini bitta ro'yxatga qo'shib yuborib, keyin merge qilsak nima
o'zgaradi?

<details>
<summary>Javobni ko'rsatish</summary>

**Regex butunlay ma'nosiz bo'lib qoladi.**

Agar parchalarni birlashtirsak, ularning chegarasi yo'qoladi va `merge`
yana chegaradan o'tib ketadi. `bolalar` ning oxirgi `r` i va `,` yonma-yon
bo'lib qoladi — va ular birlashishi mumkin.

**Butun g'oya shundaki, parchalar alohida qoladi.** `merge(p, ...)` har bir
`p` uchun alohida chaqiriladi, shuning uchun birinchi parchaning oxiri va
ikkinchisining boshi hech qachon uchrashmaydi.

Statistika esa **umumiy** — chunki biz `la` juftligi butun matnda necha marta
uchraganini bilishimiz kerak, har bir so'zda alohida emas.

**Statistika umumiy, birlashtirish alohida.** Shu ikki so'z butun funksiyani
tushuntiradi.
</details>

---

**Mashq 4.** Yangi naqsh yozing: raqamlarni alohida bo'lak qilsin.
`"2024yilda 15ta kitob"` qanday bo'linadi?

<details>
<summary>Javobni ko'rsatish</summary>

Hozirgi naqsh bilan:

```python
print(re.findall(NAQSH, "2024yilda 15ta kitob"))
# ['2024yilda', ' 15ta', ' kitob']
```

`\w` raqamni ham qamrab oladi, shuning uchun `2024yilda` bitta bo'lak bo'lib qoldi.

Raqamlarni harflardan ajratish uchun:

```python
NAQSH2 = r" ?\d+| ?[^\s\d\W]+| ?[^\s\w]+|\s+"
print(re.findall(NAQSH2, "2024yilda 15ta kitob"))
# ['2024', 'yilda', ' 15', 'ta', ' kitob']
```

`\d` — raqam, `\W` — so'z belgisi bo'lmagan.

**Nima uchun raqamlarni ajratish kerak?** Chunki `2024` va `2025` — turli
sonlar, lekin tokenizator ularni alohida token qilib yodlab olishi mumkin.
Raqamlarni mayda bo'lib qoldirish modelga arifmetikani o'rganishga yordam
beradi. GPT-4 ning naqshida raqamlar uch xonadan ko'p bo'lmaydi.

Bu — ixtiyoriy yaxshilash. Dars 18 da naqshingizni tanlaganingizda o'ylab
ko'ring.
</details>

---

**Mashq 5 (eng muhimi).** Naqshdan `\s+` qismini olib tashlang va round-trip ni
tekshiring. Nima yo'qoladi?

<details>
<summary>Javobni ko'rsatish</summary>

```python
NAQSH_BUZUQ = r" ?\w+| ?[^\s\w]+"
boshlar = re.findall(NAQSH_BUZUQ, matn)
print("round-trip:", "".join(boshlar) == matn)
```

```
round-trip: False
```

**Yangi qatorlar yo'qoldi.** Bizning matnimizda `\n` belgilari bor, va ular
` ?\w+` ga ham, ` ?[^\s\w]+` ga ham mos kelmaydi (chunki ikkalasi ham faqat
**bitta** ixtiyoriy bo'shliqni qabul qiladi, `\n` esa alohida bo'shliq
belgisi).

`\s+` — bu **tutqich** (catch-all): qolgan hamma bo'shliqni ushlaydi.

**Nima uchun bu xavfli:** kod xato bermaydi. Tokenizator ishlaydi. Faqat
dekodlaganingizda matnning tuzilishi yo'qolgan bo'ladi — hamma narsa bitta
qatorga yopishib qoladi.

Va siz buni faqat **round-trip tekshiruvi** orqali bilib olasiz.

**Shuning uchun har bir naqsh o'zgarishidan keyin round-trip ni tekshiring.**
Bir qator kod, ammo u jimgina ma'lumot yo'qotishning oldini oladi.
</details>

---

## 15. Xulosa

1. Tokenizator uchun bo'shliq — oddiy belgi. Shuning uchun u so'z chegarasidan
   o'tib ketadi va `lar `, `ishdi.`, hatto 228 baytlik tokenlar yasaydi.
2. Yechim: matnni **oldindan bo'lish**, va BPE ni har bir bo'lak **ichida**
   alohida ishlatish.
3. `re.findall(naqsh, matn)` — regex. `\w` so'z belgisi, `\s` bo'shliq,
   `+` bir yoki ko'p, `|` yoki, `?` nol yoki bitta.
4. **`[a-zA-Z]` ishlatmang** — u `oʻ` va `gʻ` ni buzadi. `\w` to'g'ri ishlaydi,
   chunki u Unicode bo'yicha ishlaydi.
5. Bo'shliq so'zning **oldiga** yopishadi: ` bolalar`, `bolalar ` emas.
6. **Round-trip tekshiruvi majburiy:** `"".join(re.findall(naqsh, matn)) == matn`.
7. Natija: eng uzun token **228 baytdan 13 baytga**. Yodlash imkonsiz bo'ldi.
8. Fertility kichik matnda biroz **yomonlashdi** — bu normal. Muhimi:
   barqarorlik oshdi va yodlash farqi 4.19× dan 3.15× ga tushdi.

---

## Keyingi dars

Bitta muammo qoldi, va u eng o'zbekchasi.

**Dars 14 — O'zbek apostrofi.** Dars 05 da ko'rgan edingiz: `ʻ` to'rt xil
yoziladi — `ʻ` (699), `'` (39), `‘` (8216), `’` (8217). Tokenizator uchun
bular to'rt xil so'z.

Keyingi darsning savoli: *agar korpusingizda `oʻzbek` har xil yozilgan
bo'lsa, lug'atingizning qancha qismi bekorga ketadi?*
