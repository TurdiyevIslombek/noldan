# Dars 05 — Kompyuter harfni qanday saqlaydi

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 04 — Lug'at, shart va funksiya
> **Vaqt:** ~45 daqiqa
> **Kerak:** Dars 01–04. Tsikl, lug'at, funksiya, `return`

---

## Bu darsdan keyin siz...

- **bilasiz** kompyuter harfni qanday saqlashini — va nima uchun aynan shunday;
- **aylantirasiz** istalgan belgini raqamga va raqamni belgiga;
- **tushunasiz** `U+02BB` degan yozuv nimani anglatishini;
- **oxirigacha tushuntirasiz** nima uchun `oʻ` ikkita belgi ekanini — raqamlar bilan;
- **yozasiz** birinchi haqiqiy `kodla` / `dekodla` juftligini.

**Bu — tokenizator qurishning birinchi darsi.** Python bo'limi tugadi.

---

## 1. Bitta savol

Dars 04 oxirida savol qoldirgan edim. Python'da shunday buyruq bor:

```python
print(ord("a"))
```

**Natija:**

```
97
```

`a` harfi — bu `97`.

Savol: **nima uchun aynan 97?**

Nima uchun 1 emas? Nima uchun 0 emas? `a` — alifboning birinchi harfi, mantiqan
1 bo'lishi kerakdek.

Javob 1963-yilga borib taqaladi, va u sizning `oʻ` muammoyingizning ildizini ochadi.

---

## 2. Kompyuterda faqat raqam bor

Dars 01 da aytilgan edi: model raqam bilan ishlaydi. Endi buni kengaytiramiz —
**kompyuterda umuman faqat raqam bor.**

Ekrandagi harf, rasm, musiqa, video — hammasi raqam. Boshqa hech narsa yo'q.

Demak har bir harf uchun **raqam tayinlanishi** kerak. Kim tayinlaydi? Odamlar,
kelishib.

> **Eng muhim fikr:** raqamning qiymati ahamiyatsiz. Muhimi — **hamma bir xil
> raqamdan foydalanishi.** Agar men `a` ni 97 deb yuborsam, siz esa 97 ni `b` deb
> o'qisangiz — xabar buziladi.

<!-- animatsiya: g1 | Kelishuv -->

Shuning uchun **kelishuv jadvali** kerak: qaysi belgi qaysi raqam. Bu jadval
butun dunyo uchun bitta bo'lishi kerak.

Bu jadvalning hozirgi nomi — **Unicode**.

---

## 3. `ord()` va `chr()`

Ikkita buyruq bilan jadvalga ikki tomondan qarash mumkin.

```python
print(ord("a"))
print(ord("b"))
print(ord("c"))
```

```
97
98
99
```

```python
print(chr(97))
print(chr(98))
print(chr(99))
```

```
a
b
c
```

- `ord(belgi)` — **belgidan raqamga**. ("ord" — inglizcha *ordinal*, "tartib raqami".)
- `chr(raqam)` — **raqamdan belgiga**. ("chr" — *character*, "belgi".)

Ikkalasi bir-birining teskarisi. `chr(ord("a"))` → `"a"`.

> ⚠️ `ord()` **bitta** belgi qabul qiladi. `ord("salom")` yozsangiz xato chiqadi.

Butun so'zni ko'ramiz:

```python
for harf in "salom":
    print(harf, "->", ord(harf))
```

**Natija:**

```
s -> 115
a -> 97
l -> 108
o -> 111
m -> 109
```

Mana `salom` so'zining haqiqiy ko'rinishi kompyuter ichida: `115 97 108 111 109`.

---

## 4. Raqamlar tartibli

Diqqat qiling: `a`=97, `b`=98, `c`=99. **Ketma-ket.**

```python
print(ord("a"), ord("z"))
print(ord("A"), ord("Z"))
print(ord("a") - ord("A"))
```

**Natija:**

```
97 122
65 90
32
```

- Kichik harflar: **97 dan 122 gacha** (26 ta harf)
- Katta harflar: **65 dan 90 gacha** (26 ta harf)
- Orasidagi farq: **aniq 32**

Bu tasodif emas. Jadvalni tuzganlar alifboni ketma-ket joylashtirgan, va katta/kichik
harflarni aniq 32 raqam farq bilan qo'ygan. Shuning uchun `.lower()` va `.upper()`
juda tez ishlaydi — ular shunchaki 32 qo'shadi yoki ayiradi.

Boshqa belgilar ham bor:

```python
print(ord("0"), ord("9"))
print(ord(" "))
print(ord("!"))
```

```
48 57
32
33
```

**Bo'shliq ham belgi** — uning raqami 32. Dars 01 da `len` bo'shliqni sanagan edi,
endi nima uchun ekanini bilasiz: u haqiqiy belgi, huddi harflar kabi.

### Tuzoq: `"5"` va `5`

```python
print("5" == 5)
print(ord("5"))
```

```
False
53
```

**`"5"` va `5` — butunlay boshqa narsa.**

- `5` — bu son. U bilan hisoblash mumkin: `5 + 5 = 10`.
- `"5"` — bu **belgi**, uning jadvaldagi raqami 53. `"5" + "5"` = `"55"` (Dars 02).

Boshlovchilar buni juda ko'p chalkashtiradi. Qo'shtirnoq bor bo'lsa — bu matn, son emas.

---

## 5. Nima uchun 97? — 1963-yil

Endi 1-bo'limdagi savolga javob.

1963-yilda Amerikada birinchi keng tarqalgan kelishuv jadvali tuzildi. Uning nomi —
**ASCII**.

ASCII da atigi **128 ta** belgi bor edi:

| Raqamlar | Nima |
|---|---|
| 0–31 | boshqaruv belgilari (yangi qator, tabulyatsiya va h.k.) |
| 32–47 | bo'shliq va tinish belgilari |
| 48–57 | raqamlar `0`–`9` |
| 65–90 | katta harflar `A`–`Z` |
| 97–122 | kichik harflar `a`–`z` |

`a` ning 97 bo'lishi shundan: birinchi 96 ta joy boshqaruv belgilari, raqamlar va
katta harflarga ketgan.

Ishlaydi:

```python
print(chr(72) + chr(101) + chr(108) + chr(108) + chr(111))
```

```
Hello
```

**Lekin muammoni ko'rdingizmi?**

128 ta belgi. Ingliz alifbosi uchun yetarli. **Dunyodagi boshqa hech qaysi til uchun
yetarli emas.**

O'zbek lotin alifbosidagi `oʻ` uchun joy yo'q. Rus kirillitsasi uchun joy yo'q.
Xitoy ieroglifi uchun joy yo'q. Arab, hind, yunon — hech biri uchun joy yo'q.

Bu texnik cheklov emas edi — bu **tanlov** edi. Jadvalni tuzganlar ingliz tilida
yozgan va ingliz tili uchun tuzgan.

> Dars 01 dagi adolatsizlikni eslang: o'zbek tilida ChatGPT uch barobar qimmat.
> Uning ildizi shu yerdan boshlanadi — kompyuter dunyosi ingliz tilidan boshlangan,
> va qolgan hamma til keyin, qiyinchilik bilan qo'shilgan.

<!-- animatsiya: g2 | 128 ta joy -->

---

## 6. Unicode — dunyo uchun bitta jadval

1990-yillarda yangi jadval tuzildi: **Unicode**. Maqsad — **dunyodagi hamma yozuv
tizimi uchun bitta jadval**.

Birinchi 128 ta raqam ASCII bilan **aynan bir xil** qoldirildi (eski dasturlar
ishlashda davom etishi uchun). Keyin esa millionlab yangi joy qo'shildi.

```python
namunalar = ["a", "ʻ", "g", "ў", "я", "漢", "😀"]
for b in namunalar:
    print(f"{b!r:8s} -> {ord(b):8d}  U+{ord(b):04X}")
```

**Natija:**

```
'a'      ->       97  U+0061
'ʻ'      ->      699  U+02BB
'g'      ->      103  U+0067
'ў'      ->     1118  U+045E
'я'      ->     1103  U+044F
'漢'      ->    28450  U+6F22
'😀'      ->   128512  U+1F600
```

Hamma narsa bitta jadvalda: lotin harfi, o'zbek belgisi, kirill harfi, xitoy
ieroglifi, hatto emoji.

```python
import sys
print("eng katta Unicode raqami:", sys.maxunicode)
```

```
eng katta Unicode raqami: 1114111
```

**1 114 112 ta joy.** Hozircha ularning taxminan 150 000 tasi to'ldirilgan.

### `U+02BB` degan yozuv nima?

Yuqoridagi jadvalda ikkinchi ustunda `U+02BB` kabi yozuvlar bor. Bu **o'sha raqamning
o'zi**, faqat boshqa sanoq sistemasida yozilgan.

Biz o'nlik sanoqda yozamiz: 699. Kompyuter olamida esa **o'n oltilik** (hex) qulayroq.

```python
print(hex(699))
print(int("2BB", 16))
```

```
0x2bb
699
```

`2BB` — bu o'n oltilikda 699. `U+` old qo'shimchasi "bu Unicode raqami" degani.

Hozir o'n oltilikni chuqur tushunishingiz shart emas. Shuni bilish yetarli:

> **`U+02BB` va `699` — bir xil raqam, ikki xil yozuv.**

Bu yozuvni hujjatlarda, saytlarda, xato xabarlarida doim ko'rasiz — endi uni tanib
olasiz.

---

## 7. `oʻ` muammosi — nihoyat to'liq javob

Dars 02 da kashf qilgan edingiz: `koʻraman` da 8 ta belgi bor, garchi ko'z 7 ta
harf ko'rsa ham. Endi sababni **raqamlarda** ko'rasiz.

```python
for harf in "oʻ":
    print(repr(harf), "->", ord(harf))
```

**Natija:**

```
'o' -> 111
'ʻ' -> 699
```

Ikkita belgi, ikkita raqam: **111** va **699**.

**Nima uchun bitta raqam emas?** Chunki Unicode jadvalida `oʻ` degan **yagona belgi
yo'q**. Uni tuzganlar o'zbek lotin alifbosi uchun alohida joy ajratmagan. Shuning
uchun `oʻ` ikkita mavjud belgidan yig'iladi: oddiy `o` (111) va maxsus belgi
`ʻ` (699).

Bu kimningdir xatosi emas — Unicode 1990-yillarda tuzilgan, o'zbek lotin alifbosi
esa o'sha davrda endi joriy qilinayotgan edi.

### Va endi — to'rtta apostrof

Dars 02 dagi eng muhim mashqni eslang: uchta `oʻzbek` ko'zga bir xil ko'rinardi,
lekin teng emas edi. Mana nima uchun:

```python
belgilar = ["'", "\u2018", "\u2019", "\u02bb"]
for b in belgilar:
    print(repr(b), "->", ord(b), "-> U+" + format(ord(b), "04X"))
```

**Natija:**

```
"'" -> 39 -> U+0027
'‘' -> 8216 -> U+2018
'’' -> 8217 -> U+2019
'ʻ' -> 699 -> U+02BB
```

To'rtta belgi. Ko'zga deyarli bir xil. Kompyuter uchun — **to'rtta butunlay boshqa
raqam**:

| Belgi | Raqam | Nomi | Qayerdan keladi |
|---|---|---|---|
| `'` | 39 | oddiy apostrof | klaviaturadagi tugma |
| `‘` | 8216 | chap burchakli qo'shtirnoq | Word avtomatik almashtiradi |
| `’` | 8217 | o'ng burchakli qo'shtirnoq | Word avtomatik almashtiradi |
| `ʻ` | **699** | **to'g'ri belgi** | o'zbek lotin alifbosi standarti |

Faqat **699** to'g'ri. Qolgan uchtasi — xato, lekin internetdagi o'zbek matnining
katta qismida aynan ular turadi.

<!-- animatsiya: g3 | Toʻrtta apostrof -->

**Tokenizator uchun bu nimani anglatadi?** `oʻzbek` so'zi **to'rt xil so'z** bo'lib
ko'rinadi. Lug'atda to'rt marta joy egallaydi, va har biri uchun bilim to'rt marta
kam bo'ladi.

Yechim oddiy va sizda allaqachon bor — Dars 02 dagi `.replace()`:

```python
matn = matn.replace("'", "ʻ")
```

Dars 14 da buni to'liq, hamma variant bilan yozamiz. Endi **nima uchun** kerakligini
raqamlar darajasida bilasiz.

---

## 8. Birinchi `kodla` / `dekodla`

Endi bizda matnni raqamga aylantiradigan hamma narsa bor. Yozamiz:

```python
def kodla(matn):
    raqamlar = []
    for harf in matn:
        raqamlar.append(ord(harf))
    return raqamlar


def dekodla(raqamlar):
    matn = ""
    for raqam in raqamlar:
        matn += chr(raqam)
    return matn
```

**Satr izohi:**

- `kodla` — Dars 03 dagi naqsh: bo'sh ro'yxat → tsikl → `.append()` → `return`.
- `dekodla` — o'xshash, lekin `matn = ""` bo'sh **matndan** boshlanadi, va `+=`
  bilan harf qo'shiladi. `+=` matnlar bilan ham ishlaydi (Dars 02: `+` matnlarni ulaydi).

Sinaymiz:

```python
matn = "koʻraman"
raqamlar = kodla(matn)
print(raqamlar)
print(dekodla(raqamlar))
print("round-trip:", dekodla(kodla(matn)) == matn)
```

**Natija:**

```
[107, 111, 699, 114, 97, 109, 97, 110]
koʻraman
round-trip: True
```

**Bu ro'yxatga diqqat bilan qarang:**

```
 k    o    ʻ    r    a    m    a    n
107  111  699  114   97  109   97  110
           ↑
 boshqalardan ancha katta
```

`699` boshqa hamma raqamdan keskin ajralib turibdi. Qolganlari 97–115 oralig'ida
(ASCII zonasi), `ʻ` esa undan ancha uzoqda. Bu — o'zbek belgisining Unicode jadvaliga
keyin, alohida joyga qo'shilganining izi.

`round-trip: True` — Dars 02 dagi tekshiruv. Matn → raqamlar → matn, va asl matn
qaytdi. Hech narsa yo'qolmadi.

> **Bu allaqachon tokenizator.** Juda sodda: har bir belgi = bitta token. U ishlaydi,
> round-trip to'g'ri. Faqat u **yomon** tokenizator, va nima uchun yomonligini
> Dars 07 da ko'rasiz.

---

## 9. Muammo

Ikkita muammo bor, va ikkalasi ham keyingi darsning mavzusi.

**Birinchi — lug'at juda katta.**

Har bir Unicode belgisi alohida token bo'lsa, lug'atimizda **1 114 112** ta token
bo'ladi. Dars 01 dagi jadvalni eslang: GPT-4o da 200 019, bizning tokenizatorimizda
16 384. Million — bu juda ko'p.

**Ikkinchi — va bu jiddiyroq — raqamni qanday saqlash kerak?**

Kompyuter xotirasi **bayt**lardan iborat. Bitta bayt faqat **0 dan 255 gacha**
raqamni saqlay oladi. Boshqa hech qanday raqamni.

Endi qarang:

- `ord("a")` = 97 → baytga sig'adi ✓
- `ord("ʻ")` = 699 → **sig'maydi** ✗
- `ord("😀")` = 128512 → **umuman sig'maydi** ✗

Demak 699 ni bitta baytga yozib bo'lmaydi. Uni qandaydir yo'l bilan **bir nechta
baytga bo'lish** kerak.

Va aynan shu yerda `oʻ` ning ikkinchi siri yotadi. Dars 01 da aytgan edim:
`koʻraman` da 8 ta belgi bor, lekin kompyuter xotirasida **9 ta joy** band bo'ladi.
Nima uchun bittasi ortiqcha — javob keyingi darsda.

---

## 10. To'liq kod

```python
# ---- 1. Belgi <-> raqam ----
print(ord("a"), ord("A"), ord("0"), ord(" "))
print(chr(115), chr(97), chr(108))

# ---- 2. Butun soʻz ----
for harf in "salom":
    print(harf, "->", ord(harf))

# ---- 3. Oʻzbekcha va boshqa belgilar ----
namunalar = ["a", "ʻ", "ў", "😀"]
for b in namunalar:
    print(f"{b!r:6s} -> {ord(b):8d}  U+{ord(b):04X}")

# ---- 4. Toʻrtta apostrof ----
belgilar = ["'", "\u2018", "\u2019", "\u02bb"]
for b in belgilar:
    print(repr(b), "->", ord(b))

# ---- 5. kodla / dekodla ----
def kodla(matn):
    raqamlar = []
    for harf in matn:
        raqamlar.append(ord(harf))
    return raqamlar


def dekodla(raqamlar):
    matn = ""
    for raqam in raqamlar:
        matn += chr(raqam)
    return matn


# ---- 6. Sinov ----
matn = "koʻraman"
print(kodla(matn))
print(dekodla(kodla(matn)))
print("round-trip:", dekodla(kodla(matn)) == matn)
```

**Kutilgan natija:**

```
97 65 48 32
s a l
s -> 115
a -> 97
l -> 108
o -> 111
m -> 109
'a'    ->       97  U+0061
'ʻ'    ->      699  U+02BB
'ў'    ->     1118  U+045E
'😀'    ->   128512  U+1F600
"'" -> 39
'‘' -> 8216
'’' -> 8217
'ʻ' -> 699
[107, 111, 699, 114, 97, 109, 97, 110]
koʻraman
round-trip: True
```

---

## 11. O'zingiz yozing

```python
# 1. Oʻz ismingizni raqamlarga aylantiring
ism = "___"
print(kodla(___))

# 2. Bu raqamlar qaysi soʻz? Qoʻlda taxmin qiling, keyin tekshiring
raqamlar = [111, 699, 122, 98, 101, 107]
print(dekodla(___))

# 3. "gʻ" ikkita belgi ekanini raqamlar bilan isbotlang
for harf in "gʻ":
    print(harf, "->", ___(harf))

# 4. chr() bilan "AI" soʻzini yasang (ord ishlatmasdan)
print(chr(___) + chr(___))
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
# 1.
ism = "Islombek"
print(kodla(ism))
# [73, 115, 108, 111, 109, 98, 101, 107]

# 2.
raqamlar = [111, 699, 122, 98, 101, 107]
print(dekodla(raqamlar))
# oʻzbek

# 3.
for harf in "gʻ":
    print(harf, "->", ord(harf))
# g -> 103
# ʻ -> 699

# 4.
print(chr(65) + chr(73))
# AI
```

2-topshiriqda `699` ni ko'rganingizda darhol bilishingiz kerak edi: bu `ʻ`, demak
so'zda `oʻ` yoki `gʻ` bor. Birinchi raqam 111 (`o`) — demak `oʻ`.

4-topshiriqda: `A` = 65 (katta harflar 65 dan boshlanadi), `I` = 65 + 8 = 73,
chunki `I` alifboda 9-harf.
</details>

---

## 12. Mashqlar

---

**Mashq 1.** `ord("A")` = 65. `ord("C")` nima bo'ladi? Ishga tushirmasdan ayting.

<details>
<summary>Javobni ko'rsatish</summary>

**67.**

Harflar ketma-ket: `A`=65, `B`=66, `C`=67.

Umumiy qoida: `ord("A") + n` — alifboning `n+1`-harfi. `ord("A") + 25` = 90 = `Z`.
</details>

---

**Mashq 2.** Bu kod nima chiqaradi?

```python
print(chr(ord("a") + 1))
print(chr(ord("z") - 25))
```

<details>
<summary>Javobni ko'rsatish</summary>

```
b
a
```

- `ord("a")` = 97, `+1` = 98, `chr(98)` = `b`
- `ord("z")` = 122, `−25` = 97, `chr(97)` = `a`

Raqam bilan ishlab, keyin belgiga qaytish — bu **shifrlash** algoritmlarining
asosi. Sezar shifri aynan shunday ishlaydi: har bir harfga bir xil son qo'shiladi.
</details>

---

**Mashq 3.** Nima uchun bu `False` qaytaradi?

```python
print("olma" == "Olma")
```

Raqamlar bilan tushuntiring.

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(ord("o"), ord("O"))
# 111 79
```

`o` = 111, `O` = 79. **Ikki xil raqam, demak ikki xil belgi.**

Kompyuter uchun `"olma"` = `[111, 108, 109, 97]`, `"Olma"` = `[79, 108, 109, 97]`.
Birinchi raqamlar har xil, shuning uchun matnlar teng emas.

Shuning uchun Dars 02 da `.lower()` ishlatgan edik: tokenizator `Men` va `men` ni
bitta so'z deb bilishi uchun.
</details>

---

**Mashq 4.** Bu ikkisi nima uchun har xil?

```python
print(5 + 5)
print(chr(53) + chr(53))
```

<details>
<summary>Javobni ko'rsatish</summary>

```
10
55
```

- `5 + 5` — **sonlar** qo'shildi → 10
- `chr(53)` = `"5"` — bu **belgi**. `"5" + "5"` = `"55"` (matnlar ulandi)

53 — bu `"5"` belgisining Unicode raqami, `5` sonining o'zi emas.

Bu farq keyinchalik juda muhim bo'ladi: tokenlar **raqam** bo'ladi, lekin ular
son sifatida emas, **nomer** sifatida ishlatiladi. 1523-token va 88-tokenni qo'shish
ma'nosiz — xuddi uy raqamlarini qo'shgandek.
</details>

---

**Mashq 5 (eng muhimi).** Bu uch matnning uzunligi ham, ko'rinishi ham bir xil.
Har birini `kodla` dan o'tkazing va farqni toping.

```python
a = "oʻqish"
b = "o'qish"
c = "o‘qish"
```

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(kodla(a))
print(kodla(b))
print(kodla(c))
```

```
[111, 699, 113, 105, 115, 104]
[111, 39, 113, 105, 115, 104]
[111, 8216, 113, 105, 115, 104]
```

Uchalasida ham **faqat ikkinchi raqam** farq qiladi: **699**, **39**, **8216**.

Qolgan hamma narsa bir xil. Bitta raqam — va tokenizator uchun bu uch xil so'z.

**Nima uchun bu falokat:** tasavvur qiling, internetdagi o'zbek matnining 40%
ida `'` (39), 30% ida `‘` (8216), 30% ida `ʻ` (699) ishlatilgan. Tokenizator
bu uchtasini uch xil so'z deb o'rganadi, va har birini uchdan bir ma'lumot bilan
o'rganadi.

Normalizatsiyadan keyin esa uchalasi **bitta** so'z bo'ladi va butun ma'lumot
bir joyga yig'iladi. Shuning uchun Dars 14 dagi ikki qator kod tokenizator
sifatini sezilarli oshiradi — u modelga uch barobar ko'p ma'lumot beradi,
hech narsa qo'shmasdan.
</details>

---

## 13. Xulosa

1. Kompyuterda **faqat raqam** bor. Har bir belgi — kelishilgan raqam.
2. `ord(belgi)` → raqam. `chr(raqam)` → belgi. Bir-birining teskarisi.
3. **ASCII** (1963) — 128 ta belgi, faqat ingliz tili uchun. `a` = 97 shundan.
4. **Unicode** — dunyo uchun bitta jadval, 1 114 112 ta joy. Birinchi 128 tasi
   ASCII bilan bir xil.
5. `U+02BB` va `699` — bir xil raqam, ikki xil yozuv (o'n oltilik va o'nlik).
6. `oʻ` = `o` (111) + `ʻ` (699). Unicode'da yagona `oʻ` belgisi **yo'q**.
7. To'rtta apostrof: 39, 8216, 8217, **699**. Faqat oxirgisi to'g'ri.
8. `"5"` (53) va `5` — butunlay boshqa narsa.

---

## Keyingi dars

Bizda raqamlar bor. Lekin raqamlar xotiraga qanday yoziladi?

**Dars 06 — Baytlar.** Bitta bayt 0 dan 255 gacha raqamni saqlaydi. `699` esa
sig'maydi. Nima qilish kerak?

Keyingi darsning savoli: *`koʻraman` da 8 ta belgi bor. Nima uchun kompyuter
xotirasida **9 ta** joy band bo'ladi?* Javob — tokenizatorning butun poydevori.
