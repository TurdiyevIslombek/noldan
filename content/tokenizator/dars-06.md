# Dars 06 — Baytlar

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 05 — Kompyuter harfni qanday saqlaydi
> **Vaqt:** ~50 daqiqa
> **Kerak:** Dars 01–05. `ord`, `chr`, funksiya, tsikl

---

## Bu darsdan keyin siz...

- **bilasiz** bayt nima ekanini va nima uchun u faqat 0 dan 255 gacha raqamni saqlashini;
- **aylantirasiz** istalgan matnni baytlarga va baytlarni matnga qaytarasiz;
- **tushuntirasiz** nima uchun `koʻraman` da 8 belgi, lekin **9 bayt** borligini;
- **ko'rasiz** UTF-8 qoidasini ichidan — bitlar darajasida;
- **tushunasiz** nima uchun **256** — tokenizatorimizning boshlang'ich lug'at hajmi.

---

## 1. Bitta savol

Dars 05 oxirida savol qoldirgan edim. Tekshiramiz:

```python
matn = "koʻraman"
print("belgilar:", len(matn))
print("baytlar :", len(matn.encode("utf-8")))
```

**Natija:**

```
belgilar: 8
baytlar : 9
```

**8 ta belgi. 9 ta bayt.** Bittasi ortiqcha.

Dars 02 da bilib olgan edingiz: ko'z 7 harf ko'radi, kompyuter 8 belgi ko'radi.
Endi uchinchi raqam qo'shildi: **xotira 9 joy band qiladi.**

Uchta har xil raqam, bitta so'z uchun. Bu darsda uchalasi ham tushuntiriladi.

---

## 2. Bayt nima?

Kompyuter xotirasi bir xil o'lchamdagi kataklardan iborat. Har bir katakning nomi —
**bayt** (byte).

Bitta bayt **8 ta bit** dan iborat. Bit — bu eng kichik birlik, u faqat `0` yoki `1`
bo'ladi.

8 ta bit bilan nechta har xil kombinatsiya yasash mumkin?

```
2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 2⁸ = 256
```

Shuning uchun:

> **Bitta bayt 0 dan 255 gacha raqamni saqlaydi. Boshqa hech qanday raqamni.**

`256` emas. `−1` emas. `3.5` emas. Faqat 0–255, jami 256 ta variant.

Ko'rish uchun:

```python
print(format(97, "08b"))
```

```
01100001
```

`format(son, "08b")` — sonni **ikkilik** (binary) ko'rinishda, 8 ta xonada chiqaradi.
`97` = `01100001`. Sakkizta bit, bitta bayt.

### Va endi muammo

Dars 05 dan eslang:

| Belgi | Unicode raqami | Baytga sig'adimi? |
|---|---|---|
| `a` | 97 | ✓ ha |
| `z` | 122 | ✓ ha |
| `ʻ` | **699** | ✗ **yo'q** |
| `ў` | 1118 | ✗ yo'q |
| `😀` | 128512 | ✗ yo'q |

699 > 255. Sig'maydi.

<!-- animatsiya: h1 | 255 chegarasi -->

Demak kerak: **katta raqamni bir nechta baytga bo'lish qoidasi**. Va bu qoida
shunday bo'lishi kerakki, keyin uni **qayta yig'ib** olish mumkin bo'lsin.

Bu qoidaning nomi — **UTF-8**.

---

## 3. `.encode()` — matndan baytga

```python
matn = "koʻraman"
print(matn.encode("utf-8"))
```

**Natija:**

```
b'ko\xca\xbbraman'
```

G'alati ko'rinadi. Tushuntiraman:

- `b'...'` — boshidagi `b` harfi "bu matn emas, **baytlar**" degani.
- `ko`, `raman` — bu baytlar ASCII zonasida bo'lgani uchun Python ularni o'qiladigan
  harf sifatida ko'rsatadi (qulaylik uchun).
- `\xca\xbb` — bu **ikkita bayt**, o'n oltilikda yozilgan (Dars 05 dagi hex).
  `ca` = 202, `bb` = 187.

Raqamlarni toza ko'rish uchun ro'yxatga aylantiramiz:

```python
print(list(matn.encode("utf-8")))
```

```
[107, 111, 202, 187, 114, 97, 109, 97, 110]
```

**Mana o'sha 9 ta raqam.** Hammasi 0–255 oralig'ida. Hammasi baytga sig'adi.

Sanang: 9 ta. ✓

---

## 4. ASCII belgilar — hech narsa o'zgarmaydi

Diqqat qiling, bu juda muhim:

```python
soz = "salom"

ord_raqamlar = []
for harf in soz:
    ord_raqamlar.append(ord(harf))

print("ord bilan  :", ord_raqamlar)
print("bayt bilan :", list(soz.encode("utf-8")))
```

**Natija:**

```
ord bilan  : [115, 97, 108, 111, 109]
bayt bilan : [115, 97, 108, 111, 109]
```

**Aynan bir xil.**

Kod raqami 0–127 oralig'idagi har bir belgi uchun UTF-8 **hech narsa qilmaydi** —
bitta bayt, va bayt qiymati kod raqamining o'zi.

Bu tasodif emas, bu **ataylab** shunday qilingan. UTF-8 ASCII bilan orqaga mos
(backwards compatible): 1990-yillarda yozilgan eski ingliz matnlari hech qanday
o'zgarishsiz ishlashda davom etdi. Aynan shu sabab UTF-8 g'alaba qozondi va
bugun internetning 98% dan ortig'i shu kodlashda.

**Lekin narxi bor.** Ingliz tili bepul o'tadi. Qolgan hamma til to'laydi.

---

## 5. UTF-8 qoidasi

```python
for belgi in ["a", "ʻ", "ў", "漢", "😀"]:
    b = belgi.encode("utf-8")
    print(f"{belgi!r:6s} ord={ord(belgi):7d}  baytlar={len(b)}  {list(b)}")
```

**Natija:**

```
'a'    ord=     97  baytlar=1  [97]
'ʻ'    ord=    699  baytlar=2  [202, 187]
'ў'    ord=   1118  baytlar=2  [209, 158]
'漢'    ord=  28450  baytlar=3  [230, 188, 162]
'😀'    ord= 128512  baytlar=4  [240, 159, 152, 128]
```

Naqsh ko'rinib turibdi — **raqam qancha katta bo'lsa, shuncha ko'p bayt kerak**:

| Kod raqami | Baytlar soni | Qaysi belgilar |
|---|---|---|
| 0 – 127 | **1** | ingliz harflari, raqamlar, tinish belgilari |
| 128 – 2047 | **2** | `ʻ`, kirill, yunon, arab |
| 2048 – 65535 | **3** | xitoy, yapon, koreys, hind |
| 65536 – 1114111 | **4** | emoji, qadimgi yozuvlar |

<!-- animatsiya: h2 | UTF-8 narvoni -->

### Ichidan qarash — bitlar

`ʻ` nima uchun aynan `202` va `187` ekanini ko'ramiz. Bu bo'limni tushunmasangiz
ham dars davom etadi, lekin tushunsangiz — UTF-8 sizga sehr bo'lib qolmaydi.

699 ni ikkilik ko'rinishda yozamiz, 11 xonada:

```python
print(format(699, "011b"))
```

```
01010111011
```

UTF-8 ning ikki baytlik shakli quyidagicha tuzilgan:

```
1-bayt:  1 1 0 x x x x x
2-bayt:  1 0 x x x x x x
```

- `110` — **belgi boshlanadi va u 2 baytdan iborat** degan signal
- `10` — **bu davomiy bayt, o'zi boshlanish emas** degan signal
- `x` lar — haqiqiy ma'lumot uchun joy: 5 + 6 = **11 ta bit**

699 ning 11 ta bitini shu joylarga taqsimlaymiz:

```
01010111011
↓↓↓↓↓ ↓↓↓↓↓↓
01010  111011

1-bayt:  110 + 01010  =  11001010  =  202  ✓
2-bayt:   10 + 111011  =  10111011  =  187  ✓
```

**Mana shuning uchun 202 va 187.**

> **UTF-8 ning eng aqlli jihati:** davomiy bayt har doim `10` bilan boshlanadi.
> Demak matnning **istalgan joyiga** tushib qolsangiz ham, belgining boshini
> topa olasiz — orqaga yurib, `10` bilan boshlanmaydigan birinchi baytni topsangiz
> bas. Bu xususiyat UTF-8 ni buzilgan fayllarda ham ishlaydigan qiladi.

---

## 6. `.decode()` — baytdan matnga

Teskari yo'l:

```python
baytlar = "koʻraman".encode("utf-8")
print(baytlar.decode("utf-8"))
print("round-trip:", baytlar.decode("utf-8") == "koʻraman")
```

```
koʻraman
round-trip: True
```

Raqamlar ro'yxatidan boshlash uchun avval ularni bayt qilib yig'ish kerak:

```python
print(bytes([115, 97, 108, 111, 109]).decode("utf-8"))
```

```
salom
```

`bytes([...])` — raqamlar ro'yxatidan bayt obyektini yasaydi. Har bir raqam
**0–255 oralig'ida bo'lishi shart**, aks holda xato chiqadi.

### Ataylab xato: buzilgan baytlar

Har qanday raqamlar to'plami to'g'ri UTF-8 bo'lavermaydi:

```python
bytes([200, 100]).decode("utf-8")
```

```
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xc8 in position 0: invalid continuation byte
```

`200` = `11001000` — bu `110` bilan boshlanadi, ya'ni "men 2 baytlik belgining
boshiman" deb da'vo qilyapti. Lekin keyingi bayt `100` = `01100100`, u `10` bilan
boshlanmaydi. Qoida buzildi.

`invalid continuation byte` — "noto'g'ri davomiy bayt". Endi bu xabar sizga
tushunarli.

**Bu xato Dars 11 da yana qaytadi**, va o'sha yerda uni qanday hal qilishni
ko'ramiz — chunki tokenizator ba'zan haqiqatan to'liq bo'lmagan baytlarni
dekodlashga urinadi.

---

## 7. `koʻraman` — to'liq javob

Endi 1-bo'limdagi savolga to'liq javob bera olamiz:

```python
for h in "koʻraman":
    b = h.encode("utf-8")
    print(f"  {h!r:5s} ord={ord(h):5d}  {len(b)} bayt  {list(b)}")
```

**Natija:**

```
  'k'   ord=  107  1 bayt  [107]
  'o'   ord=  111  1 bayt  [111]
  'ʻ'   ord=  699  2 bayt  [202, 187]
  'r'   ord=  114  1 bayt  [114]
  'a'   ord=   97  1 bayt  [97]
  'm'   ord=  109  1 bayt  [109]
  'a'   ord=   97  1 bayt  [97]
  'n'   ord=  110  1 bayt  [110]
```

Sanang: 7 ta belgi 1 baytdan, 1 ta belgi 2 baytdan. **7 + 2 = 9.**

Uchta raqam, uchta sabab:

| Raqam | Nima | Sabab |
|---|---|---|
| **7** | ko'z ko'rgan harflar | `oʻ` — o'zbek tilida bitta harf |
| **8** | Unicode belgilari | Unicode'da yagona `oʻ` belgisi yo'q (Dars 05) |
| **9** | baytlar | `ʻ` (699) bitta baytga sig'maydi (shu dars) |

Endi bu so'zning har bir darajasini tushuntira olasiz.

<!-- animatsiya: h3 | Uch qatlam -->

---

## 8. Narxni o'lchaymiz

Dars 01 dagi ikki jumlaga qaytamiz:

```python
uzbekcha = "Men oʻqishni yaxshi koʻraman"
inglizcha = "I like reading"

for nom, s in [("oʻzbekcha", uzbekcha), ("inglizcha", inglizcha)]:
    print(f"{nom:10s} belgilar={len(s):3d}  baytlar={len(s.encode('utf-8')):3d}")
```

**Natija:**

```
oʻzbekcha  belgilar= 28  baytlar= 30
inglizcha  belgilar= 14  baytlar= 14
```

Inglizcha: 14 belgi → 14 bayt. **Har bir belgi aynan 1 bayt.**
O'zbekcha: 28 belgi → 30 bayt. **Ikkita qo'shimcha bayt** — `oʻ` va `koʻ` dagi
ikkita `ʻ` uchun.

Ya'ni o'zbekcha matn **jismonan kattaroq**. Xotirada ko'proq joy, tarmoqda
ko'proq trafik, faylda ko'proq hajm.

Bu farq bu yerda kichik (30 vs 14 — ikki barobar, lekin asosan matn uzunligi
sababli). Kirill yoki xitoy yozuvida esa farq keskin: har bir belgi 2–3 bayt.

> **Dars 01 dagi adolatsizlik uchta qatlamdan iborat ekan:**
> 1. Unicode'da o'zbek harfi uchun alohida joy yo'q (Dars 05)
> 2. UTF-8 da u ortiqcha bayt turadi (shu dars)
> 3. Tokenizator uni bo'laklarga maydalaydi (Dars 01, va biz buni tuzatamiz)
>
> Biz uchinchi qatlamni tuzata olamiz. Birinchi ikkitasi — tarix, ular bilan
> yashashga to'g'ri keladi.

---

## 9. Yangi `kodla` / `dekodla`

Dars 05 dagi funksiyalarimizni yangilaymiz. Endi ular `ord`/`chr` emas,
baytlar bilan ishlaydi:

```python
def kodla(matn):
    return list(matn.encode("utf-8"))


def dekodla(raqamlar):
    return bytes(raqamlar).decode("utf-8")


m = "oʻzbek tili"
print(kodla(m))
print(dekodla(kodla(m)))
print("round-trip:", dekodla(kodla(m)) == m)
```

**Natija:**

```
[111, 202, 187, 122, 98, 101, 107, 32, 116, 105, 108, 105]
oʻzbek tili
round-trip: True
```

Ikki qator funksiya. Ikkalasi ham bitta qatordan iborat, chunki og'ir ishni
Python o'zi qiladi.

E'tibor bering: ro'yxatda `32` bor — bu bo'shliq (Dars 05: `ord(" ")` = 32).
Bo'shliq ham bayt, u ham hisobga olinadi.

---

## 10. Nima uchun aynan 256 — va nima uchun bu ajoyib

Endi asosiy xulosa. Baytlar bilan ishlaganimizda:

> **Har qanday matn — 0 dan 255 gacha bo'lgan raqamlar ro'yxati. Har qanday til.
> Har qanday belgi. Istisnosiz.**

Buning oqibatlarini o'ylang:

**1. Lug'at hajmi aniq 256.** Unicode'dagi 1 114 112 emas. Faqat 256 ta boshlang'ich
token — chunki bundan ko'p bayt qiymati **mavjud emas**.

**2. Notanish belgi bo'lishi mumkin emas.** Tokenizatorimiz hech qachon "bu belgini
bilmayman" demaydi. Emoji, xitoy ieroglifi, hech kim ko'rmagan belgi — hammasi
baytlarga bo'linadi, va bayt har doim tanish.

Bu juda muhim. Boshqa yondashuvlarda (so'z bo'yicha yoki belgi bo'yicha) `<UNK>` —
"notanish" degan maxsus token bo'ladi, va model uni ko'rganda hech narsa qila
olmaydi. **Bayt darajasida `<UNK>` umuman kerak emas.**

**3. Bitta kod hamma til uchun ishlaydi.** Siz o'zbek tili uchun tokenizator
yozyapsiz, lekin kodingizda hech qayerda "o'zbek" degan so'z bo'lmaydi. U tojik,
qozoq yoki xitoy matnida ham xuddi shunday ishlaydi.

**Shuning uchun zamonaviy tokenizatorlar — GPT-4 ham, sizniki ham — baytlar
ustida ishlaydi.** Bu "byte-level BPE" deb ataladi va Dars 08 dan boshlab
aynan shuni quramiz.

---

## 11. Muammo

Bizda ishlaydigan tokenizator bor: matn → baytlar → matn, round-trip to'g'ri,
lug'at 256 ta token, notanish belgi yo'q.

**Lekin u dahshatli yomon.** Nima uchun — buni raqamda ko'ring:

```python
matn = "bolalar kitoblarni oʻqishdi."
print("belgilar:", len(matn), "| baytlar:", len(kodla(matn)))
```

```
belgilar: 28 | baytlar: 29
```

**29 ta token** — bitta qisqa jumla uchun.

Dars 01 dagi jadvalni eslang: yaxshi tokenizatorda `fertility` **1.839** edi,
ya'ni har bir so'z uchun ~2 token. Bu jumlada 3 ta so'z bor, demak yaxshi
tokenizator ~6 token ishlatishi kerak.

Bizniki 29 ta ishlatyapti. **Besh barobar ko'p.**

Nima uchun bu yomon:
- model har bir tokenni alohida ishlashi kerak — besh barobar sekin
- modelning xotirasi token bilan o'lchanadi — besh barobar kam matn sig'adi
- `bolalar` so'zi 7 ta alohida tokenga bo'linadi, model uni **so'z** sifatida
  umuman ko'rmaydi

Keyingi darsda bu muammoni o'z ko'zingiz bilan, to'liq ko'rasiz. Keyin esa uni
hal qiladigan algoritmni quramiz.

---

## 12. To'liq kod

```python
# ---- 1. Belgilar va baytlar ----
matn = "koʻraman"
print("belgilar:", len(matn))
print("baytlar :", len(matn.encode("utf-8")))
print(list(matn.encode("utf-8")))

# ---- 2. ASCII hech narsa oʻzgartirmaydi ----
soz = "salom"
ord_raqamlar = []
for harf in soz:
    ord_raqamlar.append(ord(harf))
print(ord_raqamlar)
print(list(soz.encode("utf-8")))

# ---- 3. UTF-8 qoidasi ----
for belgi in ["a", "ʻ", "ў", "漢", "😀"]:
    b = belgi.encode("utf-8")
    print(f"{belgi!r:6s} ord={ord(belgi):7d}  baytlar={len(b)}  {list(b)}")

# ---- 4. Bitlar ----
print(format(699, "011b"))
print(format(202, "08b"), format(187, "08b"))

# ---- 5. koʻraman jadvali ----
for h in "koʻraman":
    b = h.encode("utf-8")
    print(f"{h!r:5s} ord={ord(h):5d}  {len(b)} bayt  {list(b)}")

# ---- 6. kodla / dekodla ----
def kodla(matn):
    return list(matn.encode("utf-8"))


def dekodla(raqamlar):
    return bytes(raqamlar).decode("utf-8")


m = "oʻzbek tili"
print(kodla(m))
print(dekodla(kodla(m)))
print("round-trip:", dekodla(kodla(m)) == m)
```

**Kutilgan natija:**

```
belgilar: 8
baytlar : 9
[107, 111, 202, 187, 114, 97, 109, 97, 110]
[115, 97, 108, 111, 109]
[115, 97, 108, 111, 109]
'a'    ord=     97  baytlar=1  [97]
'ʻ'    ord=    699  baytlar=2  [202, 187]
'ў'    ord=   1118  baytlar=2  [209, 158]
'漢'    ord=  28450  baytlar=3  [230, 188, 162]
'😀'    ord= 128512  baytlar=4  [240, 159, 152, 128]
01010111011
11001010 10111011
'k'   ord=  107  1 bayt  [107]
'o'   ord=  111  1 bayt  [111]
'ʻ'   ord=  699  2 bayt  [202, 187]
'r'   ord=  114  1 bayt  [114]
'a'   ord=   97  1 bayt  [97]
'm'   ord=  109  1 bayt  [109]
'a'   ord=   97  1 bayt  [97]
'n'   ord=  110  1 bayt  [110]
[111, 202, 187, 122, 98, 101, 107, 32, 116, 105, 108, 105]
oʻzbek tili
round-trip: True
```

---

## 13. O'zingiz yozing

```python
# 1. Oʻz ismingiz necha belgi va necha bayt?
ism = "___"
print("belgilar:", len(___))
print("baytlar :", len(ism.___("utf-8")))

# 2. "gʻalaba" soʻzining baytlarini chiqaring. Nechta boʻlishini oldin ayting
soz = "gʻalaba"
print(___(soz.encode("utf-8")))

# 3. Bu baytlar qaysi soʻz?
baytlar = [111, 202, 187, 122, 98, 101, 107]
print(___(baytlar).decode("utf-8"))

# 4. Har bir belgi necha bayt ekanini chiqaring
for harf in "bogʻ":
    print(harf, "->", len(harf.encode("utf-8")))
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
# 1.
ism = "Islombek"
print("belgilar:", len(ism))      # 8
print("baytlar :", len(ism.encode("utf-8")))   # 8

# 2.
soz = "gʻalaba"
print(list(soz.encode("utf-8")))
# [103, 202, 187, 97, 108, 97, 98, 97]

# 3.
baytlar = [111, 202, 187, 122, 98, 101, 107]
print(bytes(baytlar).decode("utf-8"))
# oʻzbek

# 4.
for harf in "bogʻ":
    print(harf, "->", len(harf.encode("utf-8")))
# b -> 1
# o -> 1
# g -> 1
# ʻ -> 2
```

1-topshiriqda `Islombek` uchun belgilar va baytlar **teng** — chunki hamma harf
ASCII zonasida.

2-topshiriqda: `gʻalaba` 7 belgi, lekin **8 bayt** — `ʻ` ikkita bayt olgani uchun.
Va `202, 187` juftligini ko'rganingizda darhol bilishingiz kerak: bu `ʻ`.
</details>

---

## 14. Mashqlar

---

**Mashq 1.** Quyidagi so'zlarning har biri necha belgi va necha bayt? Avval
qo'lda hisoblang.

```
"maktab"      "bogʻ"      "oʻquvchi"
```

<details>
<summary>Javobni ko'rsatish</summary>

| So'z | Belgilar | Baytlar | Sabab |
|---|---|---|---|
| `maktab` | 6 | 6 | hammasi ASCII |
| `bogʻ` | 4 | 5 | bitta `ʻ` |
| `oʻquvchi` | 8 | 9 | bitta `ʻ` |

```python
for s in ["maktab", "bogʻ", "oʻquvchi"]:
    print(s, len(s), len(s.encode("utf-8")))
```

**Qoida:** baytlar soni = belgilar soni + `ʻ` va `gʻ` dagi `ʻ` lar soni.
O'zbek lotin matnida bu farq odatda 5–8% atrofida bo'ladi.
</details>

---

**Mashq 2.** Bu ikki raqam nima uchun bir xil?

```python
print(ord("A"))
print(list("A".encode("utf-8")))
```

<details>
<summary>Javobni ko'rsatish</summary>

```
65
[65]
```

Chunki `A` ning kod raqami 65, va u 0–127 oralig'ida. UTF-8 bunday belgilar
uchun **hech narsa qilmaydi** — bitta bayt, qiymat kod raqamining o'zi.

`ord()` va `.encode()` faqat ASCII zonasida bir xil natija beradi. 127 dan
yuqorida ular butunlay farq qiladi:

```python
print(ord("ʻ"))                      # 699
print(list("ʻ".encode("utf-8")))     # [202, 187]
```

Bitta raqam 699 emas — **ikkita raqam**, 202 va 187. Ikkalasi ham 699 emas.
</details>

---

**Mashq 3.** Nima uchun bu xato beradi?

```python
print(bytes([699]))
```

<details>
<summary>Javobni ko'rsatish</summary>

```
ValueError: bytes must be in range(0, 256)
```

`bytes()` faqat 0–255 oralig'idagi raqamlarni qabul qiladi, chunki **bayt
shundan boshqasini saqlay olmaydi**.

699 ni saqlash uchun uni avval UTF-8 qoidasi bo'yicha ikkita baytga bo'lish
kerak:

```python
print(bytes([202, 187]).decode("utf-8"))    # ʻ
```

Bu mashq butun darsning mag'zi: **bayt — qattiq chegara.** 0 dan 255 gacha,
va bu chegarani hech kim kengaytira olmaydi.
</details>

---

**Mashq 4.** `"😀"` bitta belgi. `kodla("😀")` nechta raqam qaytaradi?
Va `len("😀")` nima?

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(len("😀"))                 # 1
print(kodla("😀"))               # [240, 159, 152, 128]
print(len(kodla("😀")))          # 4
```

**1 belgi, 4 bayt.**

Emoji kod raqami 128512 — juda katta, shuning uchun UTF-8 unga to'rtta bayt
ajratadi.

Buning amaliy oqibati bor: agar tokenizator baytlar ustida ishlasa, bitta
emoji **4 ta token** turadi. Shuning uchun emoji ko'p bo'lgan matn qimmat.
</details>

---

**Mashq 5 (eng muhimi).** Bu uch matnni `kodla` dan o'tkazing:

```python
a = "oʻzbek"
b = "o'zbek"
c = "ozbek"
```

Har birida nechta bayt bor? Va nima uchun tokenizator uchun bu muhim?

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(kodla("oʻzbek"), len(kodla("oʻzbek")))
print(kodla("o'zbek"), len(kodla("o'zbek")))
print(kodla("ozbek"),  len(kodla("ozbek")))
```

```
[111, 202, 187, 122, 98, 101, 107] 7
[111, 39, 122, 98, 101, 107] 6
[111, 122, 98, 101, 107] 5
```

**7, 6, 5 bayt.** Bir xil so'z, uch xil uzunlik.

To'g'ri yozilgani (`ʻ` = 202 187) **eng uzun**. Ya'ni to'g'ri yozish
qimmatroq turadi.

**Tokenizator uchun nima uchun muhim:**

Uchala variant **butunlay boshqa bayt ketma-ketligi**. Ular orasida hech
qanday umumiylik yo'q — `[202, 187]`, `[39]` va hech narsa. BPE algoritmi
ularni uch xil so'z deb o'rganadi, va uchalasi uchun alohida token yasaydi.

Lug'at hajmi cheklangan (16 384). Har bir isrof qilingan token — foydali
token uchun yo'qolgan joy.

Dars 14 da normalizatsiya yozganingizda, siz aslida **lug'at joyini tejayapsiz**.
Ikki qator kod, lekin ta'siri butun tokenizatorga tarqaladi.
</details>

---

## 15. Xulosa

1. **Bayt** = 8 bit = 0 dan 255 gacha raqam. Qattiq chegara, kengaytirib bo'lmaydi.
2. `.encode("utf-8")` — matndan baytga. `.decode("utf-8")` — baytdan matnga.
3. **UTF-8** katta kod raqamini bir nechta baytga bo'ladi: 1, 2, 3 yoki 4.
4. ASCII belgilar (0–127) uchun UTF-8 hech narsa qilmaydi — bayt = kod raqami.
   Shuning uchun ingliz tili bepul, qolganlari to'laydi.
5. `koʻraman` = 7 harf (ko'z) = 8 belgi (Unicode) = **9 bayt** (xotira).
6. Har qanday matn — 0–255 raqamlar ro'yxati. Demak lug'at hajmi **aniq 256**,
   va **notanish belgi bo'lishi mumkin emas**.
7. Shuning uchun zamonaviy tokenizatorlar bayt darajasida ishlaydi.

---

## Keyingi dars

Bizda tokenizator bor: 256 ta token, hamma til uchun ishlaydi, hech qachon
buzilmaydi.

**Dars 07 — Birinchi tokenizator va uning muammosi.** Uni haqiqiy o'zbek matnida
sinab ko'ramiz va nima uchun bunday holda qoldirib bo'lmasligini aniq ko'ramiz.

Keyingi darsning savoli: *`bolalar` so'zi modelga nechta alohida bo'lak bo'lib
ko'rinadi — va u bu so'zni umuman "so'z" deb bila oladimi?*
