# Dars 03 — Ro'yxat va tsikl

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 02 — Matn bilan ishlash
> **Vaqt:** ~50 daqiqa
> **Kerak:** Dars 01–02. Indeks, kesish, `len`, `+`, `==`, f-satr

---

## Bu darsdan keyin siz...

- **saqlaysiz** ko'p narsani bitta o'zgaruvchida — ro'yxat (list) yordamida;
- **yozasiz** tsikl — kompyuterga "har bir element uchun shuni qil" degan buyruq;
- **tushunasiz** Python'dagi bo'sh joy (otstup) nima uchun majburiy ekanini;
- **chiqarasiz** matndagi hamma qo'shni juftliklarni — qo'lda yozmasdan;
- **bilasiz** kortej (tuple) nima va nima uchun u ro'yxatdan farq qiladi.

Bu dars oxirida siz **BPE algoritmining birinchi qadamini** yozgan bo'lasiz.

---

## 1. Bitta savol

Dars 02 oxirida savol qoldirgan edim:

> `"salom"` so'zidagi hamma qo'shni juftliklarni — `sa`, `al`, `lo`, `om` — qanday
> chiqarasiz?

Hozirgi bilimingiz bilan buni yozish mumkin:

```python
soz = "salom"
print(soz[0] + soz[1])
print(soz[1] + soz[2])
print(soz[2] + soz[3])
print(soz[3] + soz[4])
```

```
sa
al
lo
om
```

Ishladi. Lekin endi o'ylang.

Dars 15 da biz tokenizatorni **haqiqiy o'zbek matnida** o'qitamiz. U matnda taxminan
**5 000 000 belgi** bor. Demak 4 999 999 ta juftlik.

Shuncha `print` yozasizmi?

Bu kod ishlaydi, lekin u **bir marta ishlatiladigan** kod. Bizga esa **takrorlanadigan**
kod kerak — matn qanday uzun bo'lsa ham ishlaydigani. Buning uchun ikkita yangi narsa
kerak: **ro'yxat** (ko'p narsani saqlash) va **tsikl** (ular bo'ylab avtomatik yurish).

---

## 2. Ro'yxat — raqamlangan javon

Dars 02 da matn belgilar zanjiri ekanini ko'rdik, va har bir belgining manzili bor edi.

**Ro'yxat ham xuddi shunday, faqat unda harf emas — istalgan narsa turadi.**

```python
mevalar = ["olma", "anor", "uzum"]
print(mevalar)
print(len(mevalar))
```

**Natija:**

```
['olma', 'anor', 'uzum']
3
```

- `[` va `]` — kvadrat qavslar ro'yxat yasaydi.
- Elementlar **vergul** bilan ajratiladi.
- `len()` — bu yerda ham ishlaydi, lekin endi **belgilar** emas, **elementlar** sonini
  qaytaradi. `mevalar` da 3 ta element bor.

> Dars 01 da `.split()` natijasi kvadrat qavs ichida chiqqan edi — `['Men', 'oʻqishni', ...]`.
> Endi bilasiz: `.split()` **ro'yxat** qaytaradi.

### Manzil olish — xuddi matndagidek

```python
mevalar = ["olma", "anor", "uzum"]
print(mevalar[0])
print(mevalar[2])
print(mevalar[-1])
```

**Natija:**

```
olma
uzum
uzum
```

**Hech qanday yangi qoida yo'q.** Noldan sanash, manfiy indeks, kesish — hammasi
matndagi bilan **bir xil** ishlaydi. Dars 02 da o'rgangan narsangiz shu yerda bepul
qayta ishlatiladi.

Chegaradan chiqsangiz ham xato bir xil:

```python
print(mevalar[3])
```

```
IndexError: list index out of range
```

Faqat bitta so'z o'zgardi: `string index` emas, `list index`.

### Ro'yxatda har xil narsa turishi mumkin

```python
aralash = ["salom", 5, "koʻraman"]
print(aralash)
```

```
['salom', 5, 'koʻraman']
```

Matn ham, son ham bir ro'yxatda. Amalda buni kamdan-kam qilasiz — lekin mumkin.

---

## 3. Ro'yxat o'zgaradi — matn esa yo'q

Bu Dars 02 dagi eng muhim tuzoqning davomi. Solishtiring:

```python
mevalar = ["olma", "anor", "uzum"]
mevalar[1] = "shaftoli"
print(mevalar)
```

```
['olma', 'shaftoli', 'uzum']
```

Ishladi. Endi xuddi shuni matnda qilamiz:

```python
matn = "salom"
matn[0] = "S"
```

```
TypeError: 'str' object does not support item assignment
```

**Ro'yxatni tahrirlash mumkin. Matnni — yo'q.**

- Matn **o'zgarmas** (immutable). `.replace()` yangi matn yasaydi.
- Ro'yxat **o'zgaruvchan** (mutable). Uning elementini joyida almashtirish mumkin.

Bu farqni hozir yaxshi tushunib oling. Dars 09 da `merge` funksiyasini yozganingizda,
siz aynan ro'yxatning shu xususiyatiga tayanasiz.

### `.append()` — oxiriga qo'shish

Eng ko'p ishlatiladigan buyruq. Bo'sh ro'yxat yasab, unga to'ldirib boramiz:

```python
royxat = []
print(royxat, len(royxat))

royxat.append("birinchi")
royxat.append("ikkinchi")
print(royxat, len(royxat))
```

**Natija:**

```
[] 0
['birinchi', 'ikkinchi'] 2
```

- `[]` — bo'sh ro'yxat. Hech narsa yo'q, uzunligi 0.
- `.append(narsa)` — ro'yxat **oxiriga** bitta element qo'shadi.
- Nuqta bilan yoziladi (`royxat.append(...)`), chunki bu ro'yxatga tegishli buyruq —
  xuddi `matn.replace(...)` kabi.

> ⚠️ **Muhim farq:** `.replace()` yangi matn **qaytaradi**, `.append()` esa hech narsa
> qaytarmaydi — u ro'yxatning **o'zini** o'zgartiradi. Shuning uchun
> `royxat = royxat.append("x")` deb **yozmang** — bu ro'yxatni yo'q qiladi.
> To'g'risi: `royxat.append("x")`, xolos.

**Naqsh (pattern) — buni yodlab oling:**

```python
natija = []              # 1. boʻsh roʻyxat yasa
# ... bu yerda toʻldirasan ...
natija.append(nimadir)   # 2. har safar bittadan qoʻsh
```

Bu kursda siz bu naqshni **o'nlab marta** yozasiz.

---

## 4. Tsikl — "har bir element uchun"

Endi asosiy narsa.

```python
sozlar = ["olma", "anor", "uzum"]
for meva in sozlar:
    print(meva)
```

**Natija:**

```
olma
anor
uzum
```

Buni **ovoz chiqarib o'qing**: "`sozlar` ichidagi **har bir** `meva` uchun — `meva` ni
chiqar".

Har bir bo'lakni tushunamiz:

- `for` — tsikl boshlanishini bildiruvchi so'z.
- `meva` — **siz o'ylab topgan nom**. Har aylanishda ro'yxatning navbatdagi elementi
  shu nomga joylanadi. `for x in sozlar` deb ham yozsa bo'lardi — lekin ma'noli nom
  qo'ying, kodni o'zingiz o'qiysiz.
- `in` — "ichidagi".
- `sozlar` — nimaning bo'ylab yurish kerak.
- `:` — **ikki nuqta majburiy**. U "shu yerdan tsiklning tanasi boshlanadi" deydi.
- Keyingi qator **ichkariga surilgan** (otstup).

Kompyuter nima qildi:

```
1-aylanish:  meva = "olma"   →  print(meva)  →  olma
2-aylanish:  meva = "anor"   →  print(meva)  →  anor
3-aylanish:  meva = "uzum"   →  print(meva)  →  uzum
```

<!-- animatsiya: e1 | Tsikl -->

Tsikl ichida istalgan narsa qilish mumkin:

```python
for meva in sozlar:
    print(meva, "-", len(meva))
```

```
olma - 4
anor - 4
uzum - 4
```

---

## 5. Otstup — Python'ning eng qattiq qoidasi

Bu boshlovchilarni eng ko'p to'xtatadigan narsa, shuning uchun alohida to'xtaymiz.

Ko'p dasturlash tillarida tsikl tanasi qavs bilan belgilanadi. **Python'da esa
bo'sh joy bilan.** Ichkariga surilgan qatorlar — tsiklning ichida. Surilmaganlari —
tashqarisida.

```python
for meva in sozlar:
    print(meva)        # ← tsikl ICHIDA (har aylanishda ishlaydi)
print("tugadi")        # ← tsikl TASHQARISIDA (bir marta ishlaydi)
```

```
olma
anor
uzum
tugadi
```

`tugadi` bir marta chiqdi, chunki u surilmagan.

<!-- animatsiya: e2 | Otstup -->

### Ataylab xato 1 — ikki nuqta unutilgan

```python
for harf in "salom"
    print(harf)
```

```
SyntaxError: expected ':'
```

`SyntaxError` — **yozilish** xatosi. Kompyuter kodni umuman tushunmadi.
Izohi to'g'ridan-to'g'ri aytyapti: ikki nuqta kutilgan edi.

### Ataylab xato 2 — otstup yo'q

```python
for harf in "salom":
print(harf)
```

```
IndentationError: expected an indented block after 'for' statement on line 1
```

"1-qatordagi `for` dan keyin ichkariga surilgan blok kutilgan edi."

### Ataylab xato 3 — otstup notekis

```python
for harf in "salom":
    print(harf)
     print(harf)
```

```
IndentationError: unexpected indent
```

Ikkinchi `print` bitta bo'shliqqa ko'proq surilgan. Python uchun bu — xato.

**Qoida:** bitta blok ichidagi hamma qator **aynan bir xil** miqdorda surilishi kerak.
Standart — **4 ta bo'shliq**. Colab'da `Tab` tugmasi buni o'zi qiladi.

> Bu qattiq qoida zerikarli tuyuladi, lekin foydasi bor: Python kodi **har doim**
> bir xil ko'rinadi. Boshqa odamning kodini ochganingizda, tuzilishi darhol ko'rinadi.

---

## 6. Matn bo'ylab tsikl

Tsikl faqat ro'yxat bilan emas, **matn bilan ham** ishlaydi. Unda har bir element —
bitta belgi:

```python
soz = "salom"
for harf in soz:
    print(harf)
```

**Natija:**

```
s
a
l
o
m
```

Mana bu — **muhim lahza**. Endi siz istalgan uzunlikdagi matnning har bir belgisini
ko'rib chiqa olasiz. 5 ta belgimi, 5 million tami — kod **bir xil**.

Sinab ko'ring:

```python
for harf in "koʻraman":
    print(harf)
```

Natijada 8 ta qator chiqadi — va ulardan biri yolg'iz `ʻ` bo'ladi. Dars 02 dagi
kashfiyot endi ko'z oldingizda qatorma-qator turadi.

---

## 7. `range()` — raqamlar bo'ylab tsikl

Ba'zan bizga elementning **o'zi** emas, uning **manzili** kerak. Buning uchun
`range()` ishlatiladi:

```python
for son in range(5):
    print(son)
```

**Natija:**

```
0
1
2
3
4
```

`range(5)` — 0 dan boshlab **5 tagacha**, lekin **5 ning o'zisiz**. Ya'ni 0, 1, 2, 3, 4.

**Tanish qoida!** Dars 02 dagi kesish bilan bir xil: oxirgisi kirmaydi.
Python'da bu qoida hamma joyda bir xil.

Ko'rish uchun ro'yxatga aylantiramiz:

```python
print(list(range(5)))
print(list(range(2, 6)))
```

```
[0, 1, 2, 3, 4]
[2, 3, 4, 5]
```

- `range(5)` — 0 dan 5 gacha
- `range(2, 6)` — 2 dan 6 gacha
- `list(...)` — natijani ro'yxat qilib ko'rsatadi (`range` o'zi ro'yxat emas, lekin
  hozircha shunday deb o'ylash yetarli)

### Manzil va belgi — birga

```python
soz = "salom"
for i in range(len(soz)):
    print(i, soz[i])
```

**Natija:**

```
0 s
1 a
2 l
3 o
4 m
```

Bu naqshni tushuning, chunki keyingi qadam aynan shunga quriladi:

- `len(soz)` = 5
- `range(5)` → i = 0, 1, 2, 3, 4
- `soz[i]` → har bir manzildagi belgi

`i` — bu "index" so'zining qisqartmasi. Dasturchilar orasida odat bo'lgan nom.

---

## 8. Juftliklar — darsning maqsadi

Endi 1-bo'limdagi savolga javob beramiz.

Bizga kerak: har bir belgi va **undan keyingisi**. Ya'ni `soz[i]` va `soz[i+1]`.

```python
soz = "salom"
juftliklar = []

for i in range(len(soz) - 1):
    juftlik = soz[i] + soz[i + 1]
    juftliklar.append(juftlik)

print(juftliklar)
```

**Natija:**

```
['sa', 'al', 'lo', 'om']
```

Qatorma-qator:

1. `juftliklar = []` — bo'sh ro'yxat (3-bo'limdagi naqsh).
2. `range(len(soz) - 1)` — **`-1` ga diqqat qiling**. Buni hozir tushuntiraman.
3. `soz[i] + soz[i + 1]` — hozirgi belgi va keyingisi ulanadi.
4. `.append(juftlik)` — ro'yxatga qo'shiladi.

### Nega `-1`?

Bu darsdagi eng muhim `-1`. Uni tushuntirish uchun uni **olib tashlab ko'ramiz**:

```python
soz = "salom"
for i in range(len(soz)):
    print(soz[i] + soz[i + 1])
```

```
sa
al
lo
om
IndexError: string index out of range
```

**Diqqat qiling:** to'rtta to'g'ri juftlik chiqdi, **keyin** xato.

Nima bo'ldi? Oxirgi aylanishda `i = 4`, ya'ni `soz[4]` (`m`) va `soz[5]` — lekin
5-manzil yo'q. `salom` da manzillar 0 dan 4 gacha (Dars 02).

**Qoida:** `i + 1` ga murojaat qiladigan har qanday tsikl **bittaga erta** to'xtashi kerak.

Shuning uchun juftliklar soni har doim **belgilar sonidan bitta kam**:
5 belgi → 4 juftlik.

> Bu xatoning nomi bor: **off-by-one** (bittaga adashish). Bu dasturlashdagi eng
> ko'p uchraydigan xato, va tajribali dasturchilar ham uni qiladi. Xavfli tomoni
> shundaki — kod ko'pincha **deyarli** to'g'ri ishlaydi, faqat chekkasida buziladi.

<!-- animatsiya: e3 | Juftliklar va bittaga adashish -->

---

## 9. `zip()` — chiroyliroq yo'l

Xuddi shu natijaga boshqa yo'l bilan ham yetish mumkin. Avval fikrni ko'ring:

```python
soz = "salom"
print(soz)
print(soz[1:])
```

```
salom
alom
```

Ikkisini bir-birining ustiga qo'ying:

```
s  a  l  o  m
a  l  o  m
```

Ustma-ust turgan harflar — aynan bizga kerak bo'lgan juftliklar! `sa`, `al`, `lo`, `om`.

`zip()` aynan shuni qiladi: ikki narsani **yonma-yon** bog'laydi.

```python
soz = "salom"
for a, b in zip(soz, soz[1:]):
    print(a + b)
```

**Natija:**

```
sa
al
lo
om
```

- `zip(x, y)` — ikkisidan **juft-juft** qilib oladi.
- `for a, b in ...` — har juftlikdan ikkita qiymat chiqadi, ularni ikkita nomga
  taqsimlaymiz. Bu **ochish** (unpacking) deb ataladi.
- **`-1` kerak emas!** `zip` kaltaroq tomon tugagan joyda o'zi to'xtaydi. `soz` da
  5 ta, `soz[1:]` da 4 ta belgi — `zip` 4 tada to'xtaydi.

Ikki usul ham to'g'ri. Birinchisi (`range`) — aniq va oshkora. Ikkinchisi (`zip`) —
qisqa va xatosiz. Dars 08 da `zip` ni ishlatamiz.

---

## 10. Kortej (tuple) — o'zgarmas juftlik

`zip` aslida nima qaytaradi? Ko'ramiz:

```python
juft = ("s", "a")
print(juft)
print(juft[0], juft[1])
```

```
('s', 'a')
s a
```

Bu **kortej** (tuple). Ro'yxatga juda o'xshaydi, ikkita farq bilan:

| | Ro'yxat | Kortej |
|---|---|---|
| Qavs | `[ ]` | `( )` |
| O'zgartirish | mumkin | **mumkin emas** |

```python
juft[0] = "x"
```

```
TypeError: 'tuple' object does not support item assignment
```

Ro'yxat — javon, undan narsa olib-qo'yish mumkin. Kortej — **muhrlangan quti**.

### Nega bizga kortej kerak?

Savol o'rinli: juftlikni `"sa"` deb saqlash mumkin-ku, nega `("s", "a")` kerak?

Chunki **hozir harflar bilan ishlayapmiz, keyin raqamlar bilan ishlaymiz**.

Harflarni ulasa bo'ladi: `"s" + "a"` = `"sa"` — ikkala harf ham ko'rinib turibdi.

Raqamlarni-chi? Tokenlar raqam bo'ladi (Dars 06 dan boshlab). Aytaylik, 1-token va
2-token juftligi:

```python
print(1 + 2)
print((1, 2))
```

```
3
(1, 2)
```

**`1 + 2` bu `3`.** Ikkala token ham yo'qoldi! `3` dan `1` va `2` ni tiklab bo'lmaydi.
`(1, 5)` va `(2, 4)` ham `+` dan keyin `6` bo'ladi — ular bir-biridan farq qilmay qoladi.

Kortej esa hech narsani qo'shmaydi, u faqat **yonma-yon ushlab turadi**. Ikkala
qiymat ham saqlanadi.

**Shuning uchun BPE algoritmi juftliklarni kortej sifatida saqlaydi.**

Juftliklarni kortej qilib yig'amiz:

```python
soz = "salom"
juftliklar = []
for a, b in zip(soz, soz[1:]):
    juftliklar.append((a, b))
print(juftliklar)
```

```
[('s', 'a'), ('a', 'l'), ('l', 'o'), ('o', 'm')]
```

E'tibor bering: `.append((a, b))` da **ikkita qavs** bor. Tashqi qavs — `append`
ning qavsi, ichki qavs — kortej qavsi. Bittasini unutsangiz, xato chiqadi.

---

## 11. O'zbekcha so'zda sinaymiz

```python
soz = "koʻraman"
juftliklar = []
for a, b in zip(soz, soz[1:]):
    juftliklar.append(a + b)

print(juftliklar)
print("juftliklar soni:", len(juftliklar), "| belgilar soni:", len(soz))
```

**Natija:**

```
['ko', 'oʻ', 'ʻr', 'ra', 'am', 'ma', 'an']
juftliklar soni: 7 | belgilar soni: 8
```

8 belgi → 7 juftlik. ✓

Endi natijaga **diqqat bilan qarang**. Ikkinchi va uchinchi juftlik:

```
'oʻ'   ← o va ʻ birga
'ʻr'   ← ʻ va r birga
```

`oʻ` — bu o'zbek tilining bitta harfi. Lekin algoritm buni bilmaydi. U uchun `ʻ`
oddiy belgi, va u `ʻr` degan ma'nosiz juftlikni ham xuddi shunday sanaydi.

**Bu bezovta qiladigan narsa, va shunday bo'lishi kerak.** Bu muammoni Dars 14 da
hal qilamiz. Hozircha shuni ko'rib qo'ying — keyin yechimni ko'rganingizda,
nima uchun kerakligini allaqachon bilasiz.

---

## 12. Muammo

Bizda endi juftliklar ro'yxati bor. BPE algoritmi esa shuni so'raydi:

> **Qaysi juftlik eng ko'p marta uchradi?**

Buning uchun sanash kerak: `('o', 'ʻ')` necha marta, `('r', 'a')` necha marta,
va hokazo. Ya'ni bizga shunday narsa kerak:

```
('k', 'o')  →  1
('o', 'ʻ')  →  1
('ʻ', 'r')  →  1
('r', 'a')  →  1
...
```

Chapda — juftlik, o'ngda — soni. **Bog'langan juftliklar.**

Ro'yxat buni uddalay olmaydi. Ro'yxatda faqat qiymatlar bor, ularning "yorlig'i" yo'q.
Siz `royxat[('o', 'ʻ')]` deb yoza olmaysiz — ro'yxat faqat raqamli manzilni tushunadi.

Bizga **nimadan → nimaga** saqlaydigan boshqa idish kerak. Uning nomi — **lug'at**,
va u keyingi darsning mavzusi.

---

## 13. To'liq kod

```python
# ---- 1. Roʻyxat ----
mevalar = ["olma", "anor", "uzum"]
print(mevalar, "| uzunlik:", len(mevalar))
print("birinchi:", mevalar[0], "| oxirgi:", mevalar[-1])

# ---- 2. Oʻzgartirish ----
mevalar[1] = "shaftoli"
print(mevalar)

# ---- 3. Boʻsh roʻyxat + append ----
royxat = []
royxat.append("birinchi")
royxat.append("ikkinchi")
print(royxat)

# ---- 4. Tsikl: roʻyxat boʻylab ----
for meva in mevalar:
    print(meva, "-", len(meva))

# ---- 5. Tsikl: matn boʻylab ----
for harf in "salom":
    print(harf)

# ---- 6. range ----
soz = "salom"
for i in range(len(soz)):
    print(i, soz[i])

# ---- 7. Juftliklar (range usuli) ----
soz = "salom"
juftliklar = []
for i in range(len(soz) - 1):
    juftliklar.append(soz[i] + soz[i + 1])
print(juftliklar)

# ---- 8. Juftliklar (zip usuli) ----
juftliklar2 = []
for a, b in zip(soz, soz[1:]):
    juftliklar2.append(a + b)
print(juftliklar2)
print("ikki usul teng keldimi:", juftliklar == juftliklar2)

# ---- 9. Kortej sifatida ----
juftliklar3 = []
for a, b in zip(soz, soz[1:]):
    juftliklar3.append((a, b))
print(juftliklar3)
```

**Kutilgan natija:**

```
['olma', 'anor', 'uzum'] | uzunlik: 3
birinchi: olma | oxirgi: uzum
['olma', 'shaftoli', 'uzum']
['birinchi', 'ikkinchi']
olma - 4
shaftoli - 8
uzum - 4
s
a
l
o
m
0 s
1 a
2 l
3 o
4 m
['sa', 'al', 'lo', 'om']
['sa', 'al', 'lo', 'om']
ikki usul teng keldimi: True
[('s', 'a'), ('a', 'l'), ('l', 'o'), ('o', 'm')]
```

---

## 14. O'zingiz yozing

```python
soz = "oʻzbek"

# 1. Har bir belgini alohida qatorda chiqaring
for ___ in ___:
    print(___)

# 2. Hamma qoʻshni juftliklarni roʻyxatga yigʻing
juftliklar = ___
for i in range(len(soz) ___ ___):
    juftliklar.append(soz[i] ___ soz[i + 1])
print(juftliklar)

# 3. Nechta juftlik chiqdi? Nechta belgi bor?
print("juftliklar:", ___)
print("belgilar  :", ___)
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
soz = "oʻzbek"

# 1.
for harf in soz:
    print(harf)

# 2.
juftliklar = []
for i in range(len(soz) - 1):
    juftliklar.append(soz[i] + soz[i + 1])
print(juftliklar)

# 3.
print("juftliklar:", len(juftliklar))
print("belgilar  :", len(soz))
```

```
o
ʻ
z
b
e
k
['oʻ', 'ʻz', 'zb', 'be', 'ek']
juftliklar: 5
belgilar  : 6
```

`oʻzbek` — 6 belgi (`oʻ` ikkita!), demak 5 juftlik. Va birinchi ikkita juftlik
yana o'sha muammoni ko'rsatadi: `oʻ` va `ʻz`.
</details>

---

## 15. Mashqlar

---

**Mashq 1.** Bu kod nima chiqaradi? Ishga tushirmasdan ayting.

```python
sonlar = [10, 20, 30]
for son in sonlar:
    print(son * 2)
print(sonlar)
```

<details>
<summary>Javobni ko'rsatish</summary>

```
20
40
60
[10, 20, 30]
```

Oxirgi qator muhim: **ro'yxat o'zgarmadi.** `son * 2` yangi qiymat hisobladi va
chiqardi, lekin uni hech qayerga saqlamadi. `son` — bu nusxa, ro'yxatning o'zi emas.

Ro'yxatni haqiqatan o'zgartirish uchun yangi ro'yxat yig'ish kerak:

```python
yangi = []
for son in sonlar:
    yangi.append(son * 2)
print(yangi)      # [20, 40, 60]
```
</details>

---

**Mashq 2.** Bu ikki kod nima uchun har xil natija beradi?

```python
# A
for harf in "salom":
    print(harf)
print("tugadi")

# B
for harf in "salom":
    print(harf)
    print("tugadi")
```

<details>
<summary>Javobni ko'rsatish</summary>

**A** — `tugadi` bir marta chiqadi (6 qator):
```
s
a
l
o
m
tugadi
```

**B** — `tugadi` **besh marta** chiqadi (10 qator):
```
s
tugadi
a
tugadi
...
```

Yagona farq — otstup. **A** da `print("tugadi")` tsikl tashqarisida, **B** da ichida.

Bo'sh joy Python'da bezak emas — u **ma'no**. To'rtta bo'shliq kodning nima
qilishini butunlay o'zgartiradi.
</details>

---

**Mashq 3.** `"Toshkent"` so'zidan hamma qo'shni juftliklarni chiqaring. Nechta
juftlik bo'lishini **oldindan** ayting.

<details>
<summary>Javobni ko'rsatish</summary>

`Toshkent` — 8 belgi, demak **7 juftlik**.

```python
soz = "Toshkent"
juftliklar = []
for a, b in zip(soz, soz[1:]):
    juftliklar.append(a + b)
print(juftliklar)
print(len(juftliklar))
```

```
['To', 'os', 'sh', 'hk', 'ke', 'en', 'nt']
7
```

E'tibor bering: `sh` juftligi chiqdi. O'zbek tilida `sh` ham bitta tovush —
xuddi `oʻ` kabi. Lekin `sh` ikkita oddiy harfdan iborat, shuning uchun u muammo
tug'dirmaydi. BPE algoritmi `sh` ni ko'p uchraganini o'zi sezadi va uni bitta
token qilib birlashtiradi. Dars 10 da buni o'z ko'zingiz bilan ko'rasiz.
</details>

---

**Mashq 4.** Quyidagi kodda xato bor. Xatoni toping, nima chiqishini ayting,
va tuzating.

```python
sozlar = ["olma", "anor"]
for soz in sozlar
    print(soz)
```

<details>
<summary>Javobni ko'rsatish</summary>

```
SyntaxError: expected ':'
```

`for` qatorining oxirida **ikki nuqta yo'q**.

```python
sozlar = ["olma", "anor"]
for soz in sozlar:
    print(soz)
```

`SyntaxError` — bu xatoning eng "yaxshi" turi, chunki kompyuter kodni umuman
ishga tushirmaydi. Ya'ni siz xatoni **darhol** bilasiz. Eng yomon xatolar —
kod ishlaydigan, lekin noto'g'ri natija beradiganlari.
</details>

---

**Mashq 5 (eng muhimi).** Bu ikki kod bir xil natija beradimi? Nima uchun?

```python
# A
soz = "salom"
for i in range(len(soz) - 1):
    print(soz[i] + soz[i + 1])

# B
soz = "salom"
for a, b in zip(soz, soz[1:]):
    print(a + b)
```

Va `soz = "a"` (bitta belgi) bo'lsa, ikkalasi nima qiladi?

<details>
<summary>Javobni ko'rsatish</summary>

`"salom"` uchun ikkalasi ham bir xil: `sa`, `al`, `lo`, `om`.

`"a"` uchun — **ikkalasi ham hech narsa chiqarmaydi**, va bu to'g'ri javob:

- **A:** `len("a") - 1` = 0. `range(0)` bo'sh, tsikl umuman aylanmaydi.
- **B:** `"a"[1:]` = `""` (bo'sh matn). `zip("a", "")` bo'sh, tsikl aylanmaydi.

Bitta belgidan juftlik yasab bo'lmaydi — juftlik uchun ikkita kerak. Ikkala kod
ham buni to'g'ri uddaladi, **hech qanday maxsus tekshiruvsiz**.

**Bu muhim:** yaxshi yozilgan tsikl chekka holatlarni (bo'sh matn, bitta belgi)
o'zi to'g'ri ishlaydi. Agar sizning kodingiz `if len(soz) < 2:` kabi qo'shimcha
tekshiruvni talab qilsa — ehtimol tsiklni noto'g'ri yozgansiz.
</details>

---

## 16. Xulosa

1. **Ro'yxat** `[...]` — ko'p narsani bitta joyda saqlaydi. Indeks, kesish, `len` —
   hammasi matndagidek ishlaydi.
2. Ro'yxat **o'zgaradi**, matn — **yo'q**. `.append()` ro'yxatning o'zini o'zgartiradi
   va hech narsa qaytarmaydi.
3. `for x in narsa:` — har bir element uchun takrorlaydi. **Ikki nuqta va otstup
   majburiy.**
4. `range(n)` — 0 dan n gacha, n kirmaydi. Kesishdagi qoida bilan bir xil.
5. `i + 1` ishlatadigan tsikl `len(...) - 1` da to'xtashi kerak. Aks holda
   **off-by-one** xatosi.
6. `zip(x, y)` — yonma-yon bog'laydi va o'zi to'xtaydi. `-1` kerak emas.
7. **Kortej** `(a, b)` — o'zgarmas juftlik. Qiymatlarni qo'shmaydi, yonma-yon saqlaydi.
   Shuning uchun BPE undan foydalanadi.
8. `n` belgidan har doim `n − 1` juftlik chiqadi.

---

## Keyingi dars

Juftliklar bor. Endi ularni **sanash** kerak.

**Dars 04 — Lug'at va funksiya.** "Nimadan → nimaga" saqlaydigan idish, va kodni
bir marta yozib ko'p marta ishlatish usuli.

Keyingi darsning savoli: *`koʻraman` so'zida eng ko'p uchraydigan juftlik qaysi?*
U so'zda har bir juftlik bir martadan uchraydi — demak savol jiddiyroq matnda
ma'no kasb etadi. Va javobni topadigan kod — bu `get_stats`, BPE algoritmining
birinchi haqiqiy funksiyasi.
