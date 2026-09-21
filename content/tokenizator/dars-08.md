# Dars 08 — Juftlarni sanash

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 07 — Birinchi tokenizator va uning muammosi
> **Vaqt:** ~50 daqiqa
> **Kerak:** Dars 01–07. `kodla`, `dekodla`, lug'at, funksiya, tsikl

---

## Bu darsdan keyin siz...

- **yozasiz** `get_stats` ni rasmiy, yakuniy ko'rinishda — bu tokenizatoringizning
  birinchi qismi;
- **qisqartirasiz** tsiklni bitta qatorga — ro'yxat ichida tsikl (list comprehension);
- **topasiz** lug'atdagi eng katta qiymatni bitta buyruq bilan — `max(key=)`;
- **ko'rasiz** o'zbek tilining qo'shimchalari statistikadan o'zi chiqib kelishini;
- **tushunasiz** ustma-ust tushish (overlap) tuzog'ini — `merge` dagi eng nozik xato.

---

## 1. Bitta savol

Dars 07 oxirida savol qoldirgan edim:

> `[1, 2, 1, 2, 1]` ro'yxatida `(1, 2)` juftligi necha marta uchraydi?

Tekshiramiz:

```python
print(get_stats([1, 2, 1, 2, 1]))
```

**Natija:**

```
{(1, 2): 2, (2, 1): 2}
```

`(1, 2)` — ikki marta. Ko'pchilik shunday javob beradi, va bu **to'g'ri**.

Endi ikkinchi savol, va bu qiyinroq:

```python
print(get_stats([1, 1, 1]))
```

```
{(1, 1): 2}
```

`(1, 1)` — **ikki marta**. Ro'yxatda esa atigi uchta element bor.

Endi o'ylang: agar biz `(1, 1)` ni bitta yangi token bilan almashtirmoqchi bo'lsak,
buni **necha marta** qila olamiz?

Javob: **bir marta.** Chunki birinchi ikkita `1` ni birlashtirgandan keyin, uchinchi
`1` yolg'iz qoladi — u bilan juft yasash uchun hech kim qolmadi.

**Sanoq 2 ta dedi. Amalda 1 ta birlashtirish bo'ladi.**

Bu farq — keyingi darsdagi eng nozik xatoning ildizi. Uni shu darsda oxirigacha
tushunamiz.

---

## 2. `get_stats` — yakuniy ko'rinish

Dars 04 da bu funksiyani harflar uchun yozgan edik, Dars 07 da uni raqamlarda
sinab ko'rdik. Endi uni **rasmiy** qilamiz:

```python
def get_stats(tokenlar):
    hisob = {}
    for juftlik in zip(tokenlar, tokenlar[1:]):
        hisob[juftlik] = hisob.get(juftlik, 0) + 1
    return hisob
```

**Dars 04 dagidan bitta farq bor.** Avval shunday edi:

```python
for a, b in zip(tokenlar, tokenlar[1:]):
    juftlik = (a, b)
```

Endi shunday:

```python
for juftlik in zip(tokenlar, tokenlar[1:]):
```

Nima o'zgardi: avval `zip` bergan kortejni ikkita nomga **ochib**, keyin qaytadan
kortej qilib **yig'ayotgan** edik. Ortiqcha ish. `zip` allaqachon kortej beradi —
uni to'g'ridan-to'g'ri olsa bo'ladi.

Tekshiramiz:

```python
tokenlar = [1, 2, 1, 2, 1]
for juftlik in zip(tokenlar, tokenlar[1:]):
    print(juftlik)
```

```
(1, 2)
(2, 1)
(1, 2)
(2, 1)
```

Ha, `zip` ning o'zi kortej qaytaryapti. Qo'shimcha qadam kerak emas.

### Chekka holatlar

Yaxshi funksiya g'alati kirishlarda ham buzilmasligi kerak:

```python
print(get_stats([]))
print(get_stats([5]))
```

```
{}
{}
```

Bo'sh ro'yxat — bo'sh natija. Bitta element — ham bo'sh natija, chunki juftlik
uchun ikkita kerak.

**Hech qanday `if` tekshiruvi yozmadik.** `zip` bu holatlarni o'zi to'g'ri hal
qildi (Dars 03, Mashq 5). Yaxshi yozilgan kod shunday bo'ladi.

---

## 3. Yangi narsa: ro'yxat ichida tsikl

Bu dasturlashda juda ko'p ishlatiladigan qisqartma. Uni endi ko'rsataman, chunki
bundan keyin kodda uchraydi.

Oddiy misol. Ikki usul, bir xil natija:

```python
# 1-usul: odatdagi tsikl
kv1 = []
for x in range(5):
    kv1.append(x * x)

# 2-usul: roʻyxat ichida tsikl
kv2 = [x * x for x in range(5)]

print(kv1, kv2)
```

**Natija:**

```
[0, 1, 4, 9, 16] [0, 1, 4, 9, 16]
```

Ikkinchi usulni **o'ngdan chapga** o'qing:

```
[  x * x     for x in range(5)  ]
   ↑              ↑
   nima qilinsin  nima boʻylab yurilsin
```

Ya'ni: "`range(5)` dagi har bir `x` uchun `x * x` ni ol va ro'yxatga qo'y".

Bu **uch qatorni bir qatorga** yig'adi:

```
natija = []            }
for x in ...:          }  →  natija = [ ... for x in ... ]
    natija.append(...)  }
```

> ⚠️ **Boshida buni yozmang, faqat o'qing.** Qisqa kod — tushunarli kod degani emas.
> Kursda men uni faqat qisqartma foyda berganda ishlataman. O'zingiz yozayotganda
> oddiy tsikl bilan boshlang, keyin xohlasangiz qisqartiring.

Bizning juftliklarga qo'llasak:

```python
tokenlar = [1, 2, 1, 2, 1]
usul1 = []
for juftlik in zip(tokenlar, tokenlar[1:]):
    usul1.append(juftlik)

usul2 = [juftlik for juftlik in zip(tokenlar, tokenlar[1:])]

print("teng:", usul1 == usul2)
```

```
teng: True
```

---

## 4. Yangi narsa: `max(..., key=...)`

Dars 04 da eng ko'p uchragan juftlikni topish uchun olti qator yozgan edik:

```python
eng = None
eng_soni = 0
for juftlik, soni in hisob.items():
    if soni > eng_soni:
        eng = juftlik
        eng_soni = soni
```

Python'da buni **bitta qatorda** qilish mumkin. Lekin uni tushunish uchun yangi
g'oya kerak.

### Avval — `max` ning oddiy ishlashi

```python
hisob = {"la": 8, "ar": 6, "bo": 4}
print(max(hisob))
```

```
la
```

Ishladi... lekin tasodifan. `max` lug'atga berilganda uning **kalitlarini**
solishtiradi, qiymatlarini emas. Bu yerda `"la"` alifboda eng oxirgisi bo'lgani
uchun chiqdi — soni eng katta bo'lgani uchun emas.

Buni isbotlash oson: `{"zz": 1, "aa": 99}` da `max` `"zz"` ni qaytaradi.

### `key` parametri

Bizga kerak: **kalitlarni solishtir, lekin ularning qiymati bo'yicha.**

```python
print(max(hisob, key=hisob.get))
```

```
la
```

Endi bu to'g'ri sabab bilan chiqdi.

**`key=hisob.get` nima?**

Diqqat qiling: `hisob.get` — **qavssiz**. Bu uni **chaqirish** emas.

- `hisob.get("la")` — chaqiruv. Natija: `8`.
- `hisob.get` — **funksiyaning o'zi**. Hali chaqirilmagan.

Ya'ni funksiya ham qiymat bo'lishi mumkin — uni o'zgaruvchiga solish, boshqa
funksiyaga **uzatish** mumkin. `max` ni shunday tushuning:

> "Mana senga kalitlar. Va mana senga funksiya. Har bir kalitni shu funksiyadan
> o'tkaz, chiqqan raqamlarni solishtir, va eng kattasini bergan **kalitni** qaytar."

Ichida taxminan shu bo'ladi:

```
"la" → hisob.get("la") → 8
"ar" → hisob.get("ar") → 6
"bo" → hisob.get("bo") → 4
                          ↑ eng kattasi → "la" qaytariladi
```

**Qaytariladigan narsa kalit, qiymat emas.** `8` emas, `"la"`.

> Bu g'oya — funksiyani boshqa funksiyaga berish — Python'da hamma joyda uchraydi.
> Hozir uni to'liq o'zlashtirish shart emas; `max(hisob, key=hisob.get)` ni
> **ibora sifatida** eslab qoling. Ma'nosi: "eng katta qiymatli kalitni ber".

<!-- animatsiya: j3 | key= parametri -->

### Teng bo'lsa nima bo'ladi?

```python
h2 = {"aa": 3, "bb": 3, "cc": 1}
print(max(h2, key=h2.get))
```

```
aa
```

Ikkita kalit teng — `max` **birinchi uchraganini** qaytaradi. Xato emas, shunchaki
bilib qo'ying: BPE da tenglik holatlari bo'ladi va natija lug'atga qo'shilish
tartibiga bog'liq bo'ladi.

---

## 5. Haqiqiy matnda ishlatamiz

Endi kattaroq o'zbekcha matnda sinaymiz:

```python
matn = """Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi.
Oʻqituvchi darsni tushuntirdi. Oʻquvchilar savollarga javob berishdi.
Kechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.
Otalar ishdan kelishdi. Hamma birga dasturxonga oʻtirishdi."""

t = kodla(matn)
stats = get_stats(t)

print("belgilar:", len(matn), "| tokenlar:", len(t), "| soʻzlar:", len(matn.split()))
print("juftliklar:", len(t) - 1, "| turli juftliklar:", len(stats))
```

**Natija:**

```
belgilar: 267 | tokenlar: 271 | soʻzlar: 30
juftliklar: 270 | turli juftliklar: 123
```

270 ta juftlik bor, lekin ular orasida **123 tasi** turlicha. Demak ko'pchiligi
takrorlangan — aynan shu takror bizga kerak.

### Eng ko'p uchragan 10 tasi

```python
nusxa = dict(stats)

for _ in range(10):
    eng = max(nusxa, key=nusxa.get)
    print(f"{eng}  {nusxa[eng]:3d} marta   {dekodla(list(eng))!r}")
    del nusxa[eng]
```

**Satr izohi:**

- `dict(stats)` — lug'atning **nusxasini** yasaydi. Asl `stats` ga tegmaymiz.
- `del nusxa[eng]` — kalitni lug'atdan **o'chiradi**. Shunda keyingi aylanishda
  `max` navbatdagisini topadi.
- `dekodla(list(eng))` — kortejni ro'yxatga aylantirib, matnga qaytaramiz.
  Ya'ni `(108, 97)` → `'la'`.

**Natija:**

```
(108, 97)   12 marta   'la'
(97, 114)   11 marta   'ar'
(115, 104)   10 marta   'sh'
(104, 100)    9 marta   'hd'
(100, 105)    9 marta   'di'
(97, 32)    8 marta   'a '
(105, 115)    8 marta   'is'
(105, 46)    8 marta   'i.'
(114, 32)    6 marta   'r '
(103, 97)    6 marta   'ga'
```

---

## 6. To'xtang — bu ro'yxatga qarang

O'ng ustunni o'qing, boshqa hech narsaga qaramasdan:

```
la    ar    sh    hd    di    a     is    i.    r     ga
```

Endi bu bo'laklarni o'zbek so'zlarida qidiring:

| Bo'lak | Qayerda uchraydi | Bu nima |
|---|---|---|
| `la` + `ar` | bola**lar**, kitob**lar**, ona**lar** | **`-lar`** — ko'plik qo'shimchasi |
| `sh` + `hd` + `di` | bori**shdi**, oʻqi**shdi**, kelishdi | **`-shdi`** — o'tgan zamon, ko'plik |
| `di` | tushuntir**di**, qayt**di** | **`-di`** — o'tgan zamon |
| `ga` | maktab**ga**, uy**ga**, dasturxon**ga** | **`-ga`** — jo'nalish kelishigi |

**Eng ko'p uchraydigan o'nta bayt juftligi — bu deyarli to'liq o'zbek
qo'shimchalari ro'yxati.**

Hech kim algoritmga o'zbek grammatikasini o'rgatmadi. Kodda "ko'plik" degan so'z
yo'q. `get_stats` ning ichida atigi to'rt qator bor, va ularning hech biri
til haqida emas.

<!-- animatsiya: j2 | Qoʻshimchalar oʻzi chiqadi -->

**Nima uchun shunday chiqadi?** Chunki o'zbek tili **agglyutinativ**: har bir
so'zga bir xil qo'shimchalar ulanadi. `-lar`, `-di`, `-ga`, `-ni`, `-da` —
ular minglab so'zda qayta-qayta takrorlanadi. Statistika esa aynan takrorni
ko'radi.

> Bu kursning markaziy g'oyasi: **til tuzilishi statistikada yashiringan.**
> Uni topish uchun tilshunos bo'lish shart emas — sanash yetarli.
>
> Dars 16 da siz buni **haqiqiy katta korpusda** ko'rasiz, va u yerda ro'yxat
> yanada tozaroq chiqadi: `lar`, `da`, `ni`, `ga`, `di` — bir-biriga qo'shilgan
> holda.

Va yana bitta narsa: `a ` va `r ` — bo'shliq bilan tugaydigan juftliklar.
Bu **so'z chegarasi**. Algoritm so'zlarning qayerda tugashini ham sezyapti.
Bu keyinroq muammo tug'diradi (Dars 13), lekin hozircha u foydali.

---

## 7. Ustma-ust tushish tuzog'i

Endi 1-bo'limdagi savolga qaytamiz va uni oxirigacha yechamiz.

```python
print(get_stats([1, 1, 1]))
print(get_stats([1, 1, 1, 1]))
```

```
{(1, 1): 2}
{(1, 1): 3}
```

`[1, 1, 1, 1]` da `(1, 1)` **uch marta** sanaldi:

```
[1, 1, 1, 1]
 └──┘            1-juftlik
    └──┘         2-juftlik
       └──┘      3-juftlik
```

Uchala juftlik ham bir-biriga **ustma-ust tushgan**. O'rtadagi `1` lar ikkita
juftlikda bir vaqtda qatnashyapti.

Endi birlashtirishga urinib ko'ring. Qo'lda, qog'ozda:

```
[1, 1, 1, 1]
 └──┘              birinchi juftlikni X ga almashtiramiz
[X, 1, 1]
    └──┘           qolganini ham almashtiramiz
[X, X]
```

**Ikki marta** birlashtirish bo'ldi. Sanoq esa **uch** degan edi.

`[1, 1, 1]` uchun esa:

```
[1, 1, 1]
 └──┘              birlashtiramiz
[X, 1]             uchinchi 1 yolgʻiz qoldi
```

**Bir marta.** Sanoq **ikki** degan edi.

### Qoida

> **Juftlikning ikkala elementi bir xil bo'lsa, sanoq haqiqiy birlashtirishlar
> sonidan katta bo'ladi.**

Elementlar har xil bo'lsa — muammo yo'q:

```python
print(get_stats([1, 2, 1, 2, 1]))
```

```
{(1, 2): 2, (2, 1): 2}
```

`(1, 2)` ni birlashtirsak: `[X, X, 1]` — ikki marta. Sanoq ham ikki. **Mos keldi.**

Chunki `1` va `2` har xil, shuning uchun juftliklar ustma-ust tusha olmaydi.

### Bu muhimmi?

Amalda — deyarli yo'q. BPE da bu farq algoritmni buzmaydi: eng ko'p uchraydigan
juftlik biroz ortiqcha sanalsa ham, u baribir eng ko'p uchraydigani bo'lib qoladi,
va birlashtirish baribir foyda beradi.

**Lekin `merge` funksiyasini yozayotganda bu sizni tuzoqqa tushiradi.** Agar
ro'yxat bo'ylab noto'g'ri yursangiz, `[1, 1, 1]` da birinchi `1` ni ikkita
juftlikda bir vaqtda ishlatib yuborasiz — va natija buziladi.

Keyingi darsda `merge` ni yozganingizda `aaaa` bilan albatta sinab ko'rasiz.
Endi nima uchun ekanini bilasiz.

<!-- animatsiya: j1 | Ustma-ust tushish -->

---

## 8. Muammo

Bizda endi:

- ✓ eng ko'p uchraydigan juftlikni **topa olamiz**
- ✗ uni **almashtira olmaymiz**

Kerak bo'lgan narsa: `[98, 111, 108, 97, 108, 97, 114]` ro'yxatida `(108, 97)`
ni topib, uni `256` ga almashtirish, natijada `[98, 111, 256, 256, 114]` olish.

Bu ko'rinishdan oson, lekin ichida ikkita tuzoq bor:

1. **Ro'yxat uzunligi o'zgaradi.** Ikkita element bittaga aylanadi, demak
   qolgan hamma element chapga suriladi. Oddiy `for i in range(len(...))`
   tsikli buzilib ketadi.
2. **Ustma-ust tushish.** Yuqorida ko'rgan muammo — `[1, 1, 1]`.

Keyingi darsda `merge` ni yozamiz va ikkala tuzoqni ham hal qilamiz.

---

## 9. To'liq kod

```python
def kodla(matn):
    return list(matn.encode("utf-8"))


def dekodla(raqamlar):
    return bytes(raqamlar).decode("utf-8")


def get_stats(tokenlar):
    hisob = {}
    for juftlik in zip(tokenlar, tokenlar[1:]):
        hisob[juftlik] = hisob.get(juftlik, 0) + 1
    return hisob


# ---- Sinov ----
matn = """Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi.
Oʻqituvchi darsni tushuntirdi. Oʻquvchilar savollarga javob berishdi.
Kechqurun bolalar uyga qaytishdi. Onalar ovqat tayyorlashdi.
Otalar ishdan kelishdi. Hamma birga dasturxonga oʻtirishdi."""

t = kodla(matn)
stats = get_stats(t)

print("tokenlar:", len(t), "| turli juftliklar:", len(stats))

eng = max(stats, key=stats.get)
print("eng koʻp:", eng, "->", stats[eng], "marta =", repr(dekodla(list(eng))))

print("\nTop 10:")
nusxa = dict(stats)
for _ in range(10):
    e = max(nusxa, key=nusxa.get)
    print(f"  {e}  {nusxa[e]:3d}   {dekodla(list(e))!r}")
    del nusxa[e]

# ---- Chekka holatlar ----
print("\nChekka holatlar:")
print(get_stats([]))
print(get_stats([5]))
print(get_stats([1, 1, 1]))
print(get_stats([1, 1, 1, 1]))
```

**Kutilgan natija:**

```
tokenlar: 271 | turli juftliklar: 123
eng koʻp: (108, 97) -> 12 marta = 'la'

Top 10:
  (108, 97)   12   'la'
  (97, 114)   11   'ar'
  (115, 104)   10   'sh'
  (104, 100)    9   'hd'
  (100, 105)    9   'di'
  (97, 32)    8   'a '
  (105, 115)    8   'is'
  (105, 46)    8   'i.'
  (114, 32)    6   'r '
  (103, 97)    6   'ga'

Chekka holatlar:
{}
{}
{(1, 1): 2}
{(1, 1): 3}
```

---

## 10. O'zingiz yozing

```python
# 1. Oʻz matningizni yozing (kamida 5 jumla, oʻzbekcha)
matn = """___"""

# 2. Tokenlarga aylantiring va juftliklarni sanang
t = ___(matn)
stats = ___(t)

# 3. Eng koʻp uchraganini toping
eng = max(stats, key=___)
print(eng, stats[eng], bytes(eng))

# 4. Top 5 ni chiqaring
nusxa = ___(stats)
for _ in range(___):
    e = max(nusxa, key=nusxa.get)
    print(bytes(e), nusxa[e])
    ___ nusxa[e]
```

> ⚠️ Bu yerda `dekodla` emas, `bytes(...)` ishlatilgani bejiz emas: eng koʻp
> uchraydigan juftliklar orasida **yarim belgi** ham boʻladi (Dars 07:
> `vocab[202] = b'\xca'`), va uni matnga aylantirib boʻlmaydi — `dekodla` xato
> beradi. `bytes(...)` esa har doim ishlaydi.

<details>
<summary>Yechimni ko'rsatish</summary>

```python
matn = """Men har kuni kitob oʻqiyman. Singlim ham kitob oʻqiydi.
Otam gazeta oʻqiydi. Onam jurnal oʻqiydi. Biz kitoblarni yaxshi koʻramiz."""

t = kodla(matn)
stats = get_stats(t)

eng = max(stats, key=stats.get)
print(eng, stats[eng], bytes(eng))

nusxa = dict(stats)
for _ in range(5):
    e = max(nusxa, key=nusxa.get)
    print(bytes(e), nusxa[e])
    del nusxa[e]
```

Natija sizning matningizga bog'liq. Lekin deyarli har qanday o'zbekcha matnda
top 5 ichida `di`, `la`, `ar`, `ni`, `im` kabi qo'shimcha bo'laklari bo'ladi.

**Buni albatta o'z matningizda sinab ko'ring.** Natija har safar boshqacha
bo'ladi, lekin naqsh bir xil qoladi — va shu naqshni o'z ko'zingiz bilan
ko'rish, men aytganimdan ko'ra ishonarliroq.
</details>

---

## 11. Mashqlar

---

**Mashq 1.** `get_stats([7])` va `get_stats([7, 7])` nima qaytaradi?

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(get_stats([7]))       # {}
print(get_stats([7, 7]))    # {(7, 7): 1}
```

Bitta element — juftlik yasab bo'lmaydi, bo'sh lug'at.
Ikkita element — aynan bitta juftlik.

`n` ta elementdan `n − 1` ta juftlik (Dars 03).
</details>

---

**Mashq 2.** Bu ikkisi bir xil natija beradimi?

```python
a = max(hisob)
b = max(hisob, key=hisob.get)
```

<details>
<summary>Javobni ko'rsatish</summary>

**Umuman yo'q.**

- `max(hisob)` — **kalitlarni** solishtiradi. Kalitlar kortej bo'lsa, ularni
  raqam bo'yicha solishtiradi: `(200, 5)` > `(108, 97)`, chunki 200 > 108.
- `max(hisob, key=hisob.get)` — **qiymatlarni** solishtiradi va eng katta
  qiymatli kalitni qaytaradi.

Sinab ko'ring:

```python
h = {(200, 5): 1, (108, 97): 99}
print(max(h))                    # (200, 5)   — notoʻgʻri!
print(max(h, key=h.get))         # (108, 97)  — toʻgʻri
```

`key=` ni unutish — jimgina ishlaydigan, lekin butunlay noto'g'ri natija
beradigan xato. Eng xavfli turdagi xato.
</details>

---

**Mashq 3.** `dekodla(list((108, 97)))` nima uchun `list(...)` talab qiladi?
`dekodla((108, 97))` ishlaydimi?

<details>
<summary>Javobni ko'rsatish</summary>

Aslida **ishlaydi**:

```python
print(dekodla((108, 97)))   # la
```

`bytes()` kortejni ham qabul qiladi. Demak `list(...)` bu yerda shart emas.

Lekin men uni yozdim, va sababi bor: **kodni o'qiyotgan odam uchun aniqroq.**
`dekodla` funksiyasi **ro'yxat** kutadi degan kelishuvimiz bor edi (Dars 06).
Unga kortej berish ishlaydi, lekin kelishuvni buzadi.

Katta kodda bunday "ishlaydi-ku" joylar to'planib, keyin tushunish qiyin
bo'lib qoladi. **Ishlashi va to'g'ri bo'lishi — bir xil narsa emas.**
</details>

---

**Mashq 4.** Quyidagi ro'yxatda `(5, 5)` juftligi necha marta sanaladi,
va uni necha marta birlashtirish mumkin?

```
[5, 5, 5, 5, 5]
```

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(get_stats([5, 5, 5, 5, 5]))   # {(5, 5): 4}
```

**Sanoq: 4.** (5 ta element → 4 ta juftlik, hammasi bir xil.)

**Birlashtirish: 2 marta.**

```
[5, 5, 5, 5, 5]
 └──┘
[X, 5, 5, 5]
    └──┘
[X, X, 5]          uchinchi 5 yolgʻiz qoldi
```

Umumiy qoida: `n` ta bir xil element bo'lsa, sanoq `n − 1`, birlashtirish esa
`n // 2` marta bo'ladi (`//` — butun bo'lish).

5 ta element: sanoq 4, birlashtirish 2. ✓
</details>

---

**Mashq 5 (eng muhimi).** `get_stats` ni **ikki xil matnda** ishlating va
natijalarni solishtiring:

```python
uzbekcha = "bolalar kitoblarni oʻqishdi va daftarlarga yozishdi"
inglizcha = "the children read the books and wrote in the notebooks"
```

Har birida eng ko'p uchragan 3 juftlikni chiqaring. Farqi nimada?

<details>
<summary>Javobni ko'rsatish</summary>

O'zbekchada top juftliklar **qo'shimcha bo'laklari** bo'ladi: `la`, `ar`, `sh`,
`di`, `ni`.

Inglizchada esa **alohida qisqa so'zlar va ularning atrofidagi bo'shliqlar**
bo'ladi: `th`, `he`, `e `, ` t`.

**Nima uchun bu farq muhim:**

Ingliz tilida ma'no ko'pincha **alohida so'zlarda** turadi: "in the notebooks" —
uchta so'z. Tokenizator ularni butunicha token qilib olsa yetadi.

O'zbek tilida esa xuddi shu ma'no **bitta so'z ichida** turadi:
`daftarlarimizda` — o'zak + ko'plik + egalik + kelishik. Tokenizator so'zning
**ichini** to'g'ri bo'lishi kerak.

Shuning uchun ingliz tili uchun qurilgan tokenizator o'zbekchada yomon ishlaydi:
u so'zlarni butunicha yodlashga o'rgangan, o'zbek tilida esa so'zlar deyarli
hech qachon takrorlanmaydi — takrorlanadigan narsa **qo'shimchalar**.

Dars 01 dagi `1.839` va `2.724` farqining haqiqiy sababi shu.
</details>

---

## 12. Xulosa

1. `get_stats` yakuniy ko'rinishda — to'rt qator, `zip` ning kortejini
   to'g'ridan-to'g'ri oladi.
2. Bo'sh va bir elementli ro'yxatlarda `if` siz to'g'ri ishlaydi.
3. `[x for x in ...]` — tsiklning qisqartmasi. O'qishni biling, yozishga
   shoshilmang.
4. `max(hisob, key=hisob.get)` — eng katta qiymatli **kalitni** qaytaradi.
   `key=` ni unutsangiz, jimgina noto'g'ri natija olasiz.
5. O'zbek matnidagi eng ko'p uchraydigan bayt juftliklari — `la`, `ar`, `sh`,
   `di`, `ga` — **o'zbek qo'shimchalari**. Statistika grammatikani o'zi topadi.
6. **Ustma-ust tushish:** juftlikning ikkala elementi bir xil bo'lsa, sanoq
   birlashtirishlar sonidan katta chiqadi.

---

## Keyingi dars

Juftlikni topdik. Endi uni almashtirish kerak.

**Dars 09 — Birlashtirish (`merge`).** Ro'yxat ichida juftlikni topib, uni
bitta yangi token bilan almashtiradigan funksiya. Bu kursdagi eng qiyin
funksiya — lekin u atigi sakkiz qator.

Keyingi darsning savoli: *ro'yxat bo'ylab yurayotib uning uzunligini
o'zgartirsangiz nima bo'ladi?* Javob: `for` tsikli bu ish uchun yaramaydi.
Shuning uchun keyingi darsda yangi tsikl turini ko'ramiz — `while`.
