# Dars 04 — Lug'at, shart va funksiya

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 03 — Ro'yxat va tsikl
> **Vaqt:** ~55 daqiqa
> **Kerak:** Dars 01–03. Ro'yxat, tsikl, `zip`, kortej, `==`

---

## Bu darsdan keyin siz...

- **saqlaysiz** "nimadan → nimaga" bog'lanishini — lug'at (dict) yordamida;
- **sanaysiz** biror narsa necha marta uchraganini — dasturlashdagi eng ko'p ishlatiladigan naqsh;
- **yozasiz** shart: "agar shunday bo'lsa — buni qil, aks holda — buni";
- **yasaysiz** o'z funksiyangizni — bir marta yozib, cheksiz ishlatiladigan kod;
- **qurasiz** `get_stats` — **BPE algoritmining birinchi haqiqiy funksiyasi.**

Bu — Python bo'limining oxirgi darsi. Keyingi darsdan boshlab tokenizatorning o'zini
quramiz.

---

## 1. Bitta savol

Dars 03 da juftliklarni chiqarishni o'rgandik:

```
['ko', 'oʻ', 'ʻr', 'ra', 'am', 'ma', 'an']
```

BPE algoritmi endi shuni so'raydi:

> **Qaysi juftlik eng ko'p marta uchradi?**

Buni bilish uchun har bir juftlikning **sonini** saqlash kerak:

```
('l', 'a')  →  8
('a', 'r')  →  6
('b', 'o')  →  4
```

Ro'yxat buni uddalay olmaydi. Ro'yxatga murojaat qilish uchun **raqamli manzil** kerak:
`royxat[0]`, `royxat[1]`. Lekin bizga `royxat[('l', 'a')]` kerak — manzil sifatida
juftlikning o'zi.

Bunday idish bor va u **lug'at** deb ataladi.

<!-- animatsiya: f1 | Javon va shkaf -->

---

## 2. Lug'at — yorliqli tortmalar

Ro'yxat — raqamlangan javon. **Lug'at — yorliqli tortmalar shkafi.** Tortmani
raqami bilan emas, **yorlig'i** bilan ochasiz.

```python
yoshlar = {"Ali": 17, "Vali": 19, "Hasan": 16}
print(yoshlar)
print(yoshlar["Ali"])
print(len(yoshlar))
```

**Natija:**

```
{'Ali': 17, 'Vali': 19, 'Hasan': 16}
17
3
```

- `{` va `}` — **figurali qavslar** lug'at yasaydi. (Ro'yxatda `[ ]` edi.)
- Har bir element ikki qismdan iborat: `"Ali": 17`
  - `"Ali"` — **kalit** (key), ya'ni yorliq
  - `17` — **qiymat** (value), ya'ni tortmaning ichidagi narsa
- Ikki nuqta ularni ajratadi, vergul elementlarni ajratadi.
- `yoshlar["Ali"]` — kalit bo'yicha qiymatni oladi. **Kvadrat qavs**, lug'at yasashda
  figurali qavs ishlatilgan bo'lsa ham.
- `len()` — nechta juftlik borligini qaytaradi.

### Ataylab xato: yo'q kalit

```python
print(yoshlar["Karim"])
```

```
KeyError: 'Karim'
```

Yangi xato turi. `KeyError` — **kalit topilmadi**. Bunday yorliqli tortma yo'q.

Dars 02 va 03 dagi `IndexError` bilan solishtiring: u "manzil chegaradan tashqarida"
degan edi. Bu esa "bunday yorliq umuman yo'q" deydi. Ikkalasi ham "so'raganingiz
yo'q" ma'nosini beradi, lekin idish har xil bo'lgani uchun xato ham har xil.

### Yangi kalit qo'shish

Ro'yxatda yangi element qo'shish uchun `.append()` kerak edi. Lug'atda esa —
shunchaki yozasiz:

```python
yoshlar["Karim"] = 18
print(yoshlar)
```

```
{'Ali': 17, 'Vali': 19, 'Hasan': 16, 'Karim': 18}
```

Va mavjud kalitni o'zgartirish ham xuddi shunday ko'rinadi:

```python
yoshlar["Ali"] = 18
print(yoshlar)
```

```
{'Ali': 18, 'Vali': 19, 'Hasan': 16, 'Karim': 18}
```

> ⚠️ **Diqqat:** bir xil kod ikki xil ish qildi — birinchisi yangi tortma yasadi,
> ikkinchisi mavjudini o'zgartirdi. Python farqni o'zi hal qiladi: kalit bor bo'lsa —
> ustiga yozadi, yo'q bo'lsa — yangisini yasaydi. **Eski qiymat ogohlantirishsiz
> yo'qoladi.**

---

## 3. Tekshirish: `in` va `.get()`

Kalit bor-yo'qligini oldindan bilish uchun `in` ishlatiladi:

```python
print("Ali" in yoshlar)
print("Sardor" in yoshlar)
```

```
True
False
```

`True` / `False` — bu **mantiqiy qiymatlar**. Dars 02 da `==` dan keyin ko'rgan edingiz.

Ikkinchi yo'l — `.get()`. U `KeyError` bermaydi:

```python
yoshlar = {"Ali": 17, "Vali": 19, "Hasan": 16}
print(yoshlar.get("Ali"))
print(yoshlar.get("Sardor"))
print(yoshlar.get("Sardor", 0))
```

**Natija:**

```
17
None
0
```

- `.get(kalit)` — kalit bor bo'lsa qiymatni, yo'q bo'lsa **`None`** ni qaytaradi.
- `None` — "hech narsa" degan maxsus qiymat. Xato emas, shunchaki bo'shlik.
- `.get(kalit, 0)` — **ikkinchi parametr**: kalit yo'q bo'lsa nima qaytarilsin.
  Bu yerda `0`.

**`.get(kalit, 0)` ni yaxshi eslab qoling.** Bu kursda eng ko'p ishlatiladigan
buyruqlardan biri bo'ladi, va sababi darhol ko'rinadi.

---

## 4. Shart — `if` va `else`

Sanashga o'tishdan oldin bitta yangi narsa kerak: kompyuterga **qaror qildirish**.

Avval solishtirishni ko'ramiz:

```python
son = 5
print(son > 3)
print(son > 10)
print(son == 5)
print(son != 5)
```

```
True
False
True
False
```

- `>` katta, `<` kichik
- `==` teng (Dars 02)
- `!=` teng emas

Endi shu javobga qarab ish qilamiz:

```python
son = 5
if son > 3:
    print("kattaroq")
else:
    print("kichikroq")
```

```
kattaroq
```

- `if shart:` — "agar shart rost bo'lsa".
- `else:` — "aks holda". Ixtiyoriy, yozmasa ham bo'ladi.
- **Ikki nuqta va otstup** — `for` dagidek (Dars 03). Xuddi shu qoidalar.

Ikkitasidan faqat **bittasi** ishlaydi, hech qachon ikkalasi ham emas.

### Qisqartma: `+=`

Yana bitta kichik narsa, sanash uchun kerak:

```python
hisob = 0
hisob = hisob + 1
print(hisob)
hisob += 1
print(hisob)
hisob += 10
print(hisob)
```

```
1
2
12
```

`hisob += 1` — bu `hisob = hisob + 1` ning qisqartmasi. Ma'nosi bir xil, yozilishi
qisqaroq. Sanashda juda ko'p ishlatiladi.

---

## 5. Sanash naqshi

Endi darsning yuragi. Matndagi har bir harf necha marta uchraganini sanaymiz.

```python
matn = "bolalar"
hisob = {}

for harf in matn:
    if harf in hisob:
        hisob[harf] += 1
    else:
        hisob[harf] = 1

print(hisob)
```

**Natija:**

```
{'b': 1, 'o': 1, 'l': 2, 'a': 2, 'r': 1}
```

Qatorma-qator:

1. `hisob = {}` — **bo'sh lug'at**. (Dars 03 dagi `[]` naqshiga o'xshash.)
2. `for harf in matn:` — har bir harf uchun.
3. `if harf in hisob:` — bu harfni ilgari ko'rganmizmi?
   - **ko'rgan bo'lsak** → `hisob[harf] += 1`, sonini bittaga oshiramiz
   - **ko'rmagan bo'lsak** → `hisob[harf] = 1`, birinchi marta, soni 1

`bolalar` da `l` ikki marta, `a` ikki marta, qolganlari bir martadan. ✓

### Qisqaroq yo'l

Xuddi shu narsani `if` siz ham yozish mumkin:

```python
matn = "bolalar"
hisob = {}

for harf in matn:
    hisob[harf] = hisob.get(harf, 0) + 1

print(hisob)
```

```
{'b': 1, 'o': 1, 'l': 2, 'a': 2, 'r': 1}
```

**Aynan bir xil natija.** Bitta qator.

Nima bo'lyapti: `hisob.get(harf, 0)` — "bu harfning hozirgi soni; agar hali yo'q
bo'lsa, 0". Keyin `+ 1` va natijani qaytarib yozamiz.

Ya'ni `.get(..., 0)` "birinchi marta" holatini **o'zi** hal qiladi — shuning uchun
`if` kerak emas.

Ikkala variant ham to'g'ri. Birinchisi — oshkora, o'qish oson. Ikkinchisi — qisqa
va haqiqiy kodda shunday yoziladi. **Ikkalasini ham tushuning, ikkinchisini
ishlating.**

---

## 6. Lug'at bo'ylab tsikl — `.items()`

Lug'atdagi hamma juftlikni ko'rib chiqish uchun:

```python
yoshlar = {"Ali": 17, "Vali": 19}

for ism, yosh in yoshlar.items():
    print(ism, "->", yosh)
```

**Natija:**

```
Ali -> 17
Vali -> 19
```

`.items()` har bir tortmani **kortej** qilib beradi: `("Ali", 17)`. Va Dars 03 dagi
ochish (unpacking) ishlaydi — `for ism, yosh in ...`.

Dars 03 da `zip` bilan aynan shunday yozgan edingiz: `for a, b in zip(...)`.
Bir xil naqsh, boshqa manba.

### Eng kattasini topish

Endi 1-bo'limdagi savolga javob bera olamiz:

```python
hisob = {"la": 8, "ar": 6, "bo": 4}

eng_kop = None
eng_kop_soni = 0

for juftlik, soni in hisob.items():
    if soni > eng_kop_soni:
        eng_kop = juftlik
        eng_kop_soni = soni

print(eng_kop, eng_kop_soni)
```

```
la 8
```

Bu naqsh ham klassik. G'oya: **hozirgacha ko'rilgan eng yaxshisini eslab yurish.**

1. Boshida hech narsa ko'rmaganmiz: `eng_kop = None`, `eng_kop_soni = 0`.
2. Har bir elementni ko'rib chiqamiz.
3. Agar hozirgisi eslab turganimizdan kattaroq bo'lsa — yangisini eslaymiz.
4. Tsikl tugagach, `eng_kop` da eng kattasi qoladi.

`eng_kop_soni = 0` dan boshlash muhim: har qanday haqiqiy son 0 dan katta, shuning
uchun birinchi element albatta eslanadi.

---

## 7. Funksiya — bir marta yoz, ko'p marta ishlat

Bizda endi sanash kodi bor. Lekin u bitta matn uchun yozilgan. Boshqa matnni
sanash uchun **hammasini qayta nusxalash** kerak bo'ladi.

Funksiya aynan shu muammoni hal qiladi.

<!-- animatsiya: f3 | Funksiya -->

```python
def salomlash(ism):
    return "Salom, " + ism + "!"

print(salomlash("Islombek"))
print(salomlash("Ali"))
```

**Natija:**

```
Salom, Islombek!
Salom, Ali!
```

Har bir bo'lakni ko'ramiz:

- `def` — "define", ya'ni "aniqlayman". Yangi funksiya yasashni bildiradi.
- `salomlash` — **nom**. O'zingiz tanlaysiz, xuddi o'zgaruvchi nomi kabi.
- `(ism)` — **parametr**. Bu funksiya ichidagi o'zgaruvchi, va u chaqirilganda
  to'ldiriladi.
- `:` va otstup — `for` va `if` dagidek.
- `return` — **natijani qaytaradi**. Funksiya shu yerda tugaydi.

Ishlatish: `salomlash("Islombek")`. Qavs ichidagi qiymat `ism` ga joylanadi.

> **`print` va `return` bir xil emas.** `print` — ekranga chiqaradi, odam ko'rishi
> uchun. `return` — qiymatni **kodga qaytaradi**, keyin u bilan ishlash mumkin.

Bir nechta parametr ham bo'ladi:

```python
def qosh(a, b):
    return a + b

print(qosh(2, 3))
print(qosh("sa", "lom"))
```

```
5
salom
```

Bitta funksiya, ikki xil ish — chunki `+` sonlarni qo'shadi, matnlarni ulaydi
(Dars 02).

### Ataylab xato: `return` unutilgan

```python
def hech_nima(x):
    print("ishladim:", x)

natija = hech_nima(5)
print("natija:", natija)
```

```
ishladim: 5
natija: None
```

Funksiya ishladi, ekranga chiqardi — lekin `natija` da `None` turibdi.

Chunki `return` yozilmagan. **`return` siz funksiya har doim `None` qaytaradi.**

Bu xato ogohlantirish bermaydi va uni topish qiyin. Funksiya "ishlagandek"
ko'rinadi, lekin natijasi yo'qoladi. Yozganingizda o'zingizga savol bering:
*bu funksiya nimadir qaytarishi kerakmi?*

---

## 8. `get_stats` — birinchi haqiqiy funksiya

Endi hammasini birlashtiramiz. Dars 03 dagi juftliklar + bu darsdagi sanash + funksiya:

```python
def get_stats(matn):
    hisob = {}
    for a, b in zip(matn, matn[1:]):
        juftlik = (a, b)
        hisob[juftlik] = hisob.get(juftlik, 0) + 1
    return hisob


print(get_stats("salom"))
```

**Natija:**

```
{('s', 'a'): 1, ('a', 'l'): 1, ('l', 'o'): 1, ('o', 'm'): 1}
```

Har bir qator tanish bo'lishi kerak:

| Qator | Qayerdan |
|---|---|
| `def get_stats(matn):` | shu dars, 7-bo'lim |
| `hisob = {}` | shu dars, 5-bo'lim |
| `for a, b in zip(matn, matn[1:])` | Dars 03, 9-bo'lim |
| `juftlik = (a, b)` | Dars 03, 10-bo'lim (kortej) |
| `hisob.get(juftlik, 0) + 1` | shu dars, 5-bo'lim |
| `return hisob` | shu dars, 7-bo'lim |

**Yangi hech narsa yo'q.** To'rt darsda o'rgangan narsalaringiz bitta funksiyaga
yig'ildi.

> Nomi nima uchun inglizcha? Chunki bu funksiya haqiqiy BPE kodida aynan shunday
> ataladi. Kurs tugagach siz boshqalarning kodini o'qiysiz — o'sha yerda ham
> `get_stats` turadi. Atamalarni tarjima qilmayapmiz, ular sizning kalitingiz.

### Haqiqiy o'zbek matnida

```python
matn = "bolalar kitoblarni oʻqishdi. bolalar darslarni yozishdi. bolalar maktabga borishdi."

stats = get_stats(matn)
print("belgilar soni :", len(matn))
print("juftliklar    :", len(matn) - 1)
print("turli juftlik :", len(stats))
```

**Natija:**

```
belgilar soni : 83
juftliklar    : 82
turli juftlik : 45
```

83 belgi → 82 juftlik (Dars 03 dagi `n − 1` qoidasi ✓). Lekin **turli** juftlik
faqat 45 ta — demak ba'zilari takrorlangan. Qaysilari?

```python
eng_kop = None
eng_kop_soni = 0

for juftlik, soni in stats.items():
    if soni > eng_kop_soni:
        eng_kop = juftlik
        eng_kop_soni = soni

print("eng koʻp juftlik:", eng_kop, "->", eng_kop_soni, "marta")
print("yopishtirilgan  :", eng_kop[0] + eng_kop[1])
```

**Natija:**

```
eng koʻp juftlik: ('l', 'a') -> 8 marta
yopishtirilgan  : la
```

---

## 9. To'xtang — nima bo'lganini ko'ring

Eng ko'p uchragan juftlik — **`la`**.

Endi matnga qarang: `bolalar`, `kitoblarni`, `darslarni`. Uchalasida ham **`-lar`**
bor — o'zbek tilining **ko'plik qo'shimchasi**.

**Algoritm o'zbek grammatikasini o'rganmadi.** U faqat sanadi. Lekin eng ko'p
uchragan juftlik aynan grammatik qo'shimchaning boshlanishi bo'lib chiqdi.

<!-- animatsiya: f2 | Sanoq -->

Bu tasodif emas. Til — takrorlanadigan naqshlardan iborat, va eng ko'p takrorlanadigan
naqshlar aynan qo'shimchalar, o'zaklar va ko'p ishlatiladigan so'zlar. **Statistika
grammatikani o'zi topadi.**

Dars 15 da siz tokenizatorni haqiqiy katta o'zbek matnida o'qitasiz. U birinchi
o'rganadigan tokenlar taxminan shular bo'ladi:

```
lar   da   ni   ga   di
```

Ya'ni o'zbek tilining kelishik va ko'plik qo'shimchalari. Hech kim ularni aytmaydi —
algoritm ularni o'zi topadi, faqat sanash orqali.

**Mana shu — butun BPE algoritmining g'oyasi.** Qolgan darslar shu g'oyani oxirigacha
olib boradi.

---

## 10. Muammo

`get_stats` ishlaydi. Lekin u **harflar** bilan ishlaydi.

Ikkita muammo bor:

**Birinchi.** Dars 01 da aytilgan edi: model harfni tushunmaydi, u faqat raqam bilan
ishlaydi. Bizning juftliklarimiz esa `('l', 'a')` — harflar. Ularni modelga bera
olmaymiz.

**Ikkinchi.** Harf nima o'zi? `a` bitta narsami? `ʻ` chi? `😀` chi? Turli tillarda
turli belgi bor, va kompyuter ularning hammasini bir xil usulda saqlashi kerak.

Demak, keyingi savol: **kompyuter harfni qanday saqlaydi?**

Javob sizni hayratda qoldirmaydi — raqam bilan. Lekin **qaysi** raqam, va nima uchun
aynan o'sha — bu keyingi ikki darsning mavzusi. Va o'sha yerda nihoyat `oʻ` ning
nima uchun ikkita belgi ekanini oxirigacha tushunasiz.

---

## 11. To'liq kod

```python
# ---- 1. Lugʻat ----
yoshlar = {"Ali": 17, "Vali": 19, "Hasan": 16}
print(yoshlar["Ali"])
yoshlar["Karim"] = 18
print(yoshlar)
print("Sardor" in yoshlar)
print(yoshlar.get("Sardor", 0))

# ---- 2. Shart ----
son = 5
if son > 3:
    print("kattaroq")
else:
    print("kichikroq")

# ---- 3. Sanash naqshi ----
matn = "bolalar"
hisob = {}
for harf in matn:
    hisob[harf] = hisob.get(harf, 0) + 1
print(hisob)

# ---- 4. Lugʻat boʻylab tsikl ----
for harf, soni in hisob.items():
    print(harf, "->", soni)

# ---- 5. Funksiya ----
def get_stats(matn):
    hisob = {}
    for a, b in zip(matn, matn[1:]):
        juftlik = (a, b)
        hisob[juftlik] = hisob.get(juftlik, 0) + 1
    return hisob

# ---- 6. Eng koʻp uchraganini topish ----
def eng_kop_juftlik(hisob):
    eng = None
    eng_soni = 0
    for juftlik, soni in hisob.items():
        if soni > eng_soni:
            eng = juftlik
            eng_soni = soni
    return eng

# ---- 7. Sinov ----
matn = "bolalar kitoblarni oʻqishdi. bolalar darslarni yozishdi. bolalar maktabga borishdi."
stats = get_stats(matn)

print("turli juftlik :", len(stats))
eng = eng_kop_juftlik(stats)
print("eng koʻp      :", eng, "->", stats[eng], "marta")
print("yopishtirilgan:", eng[0] + eng[1])
```

**Kutilgan natija:**

```
17
{'Ali': 17, 'Vali': 19, 'Hasan': 16, 'Karim': 18}
False
0
kattaroq
{'b': 1, 'o': 1, 'l': 2, 'a': 2, 'r': 1}
b -> 1
o -> 1
l -> 2
a -> 2
r -> 1
turli juftlik : 45
eng koʻp      : ('l', 'a') -> 8 marta
yopishtirilgan: la
```

---

## 12. O'zingiz yozing

```python
# Soʻzlar roʻyxatidagi har bir soʻz necha marta uchraganini sanang

sozlar = ["olma", "anor", "olma", "uzum", "olma", "anor"]

hisob = ___                      # boʻsh lugʻat

for soz in ___:
    hisob[soz] = hisob.___(soz, ___) + 1

print(hisob)

# Eng koʻp uchragan soʻzni toping
eng = ___
eng_soni = ___
for soz, soni in hisob.___():
    if soni ___ eng_soni:
        eng = ___
        eng_soni = ___

print("eng koʻp:", eng, eng_soni)
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
sozlar = ["olma", "anor", "olma", "uzum", "olma", "anor"]

hisob = {}

for soz in sozlar:
    hisob[soz] = hisob.get(soz, 0) + 1

print(hisob)

eng = None
eng_soni = 0
for soz, soni in hisob.items():
    if soni > eng_soni:
        eng = soz
        eng_soni = soni

print("eng koʻp:", eng, eng_soni)
```

```
{'olma': 3, 'anor': 2, 'uzum': 1}
eng koʻp: olma 3
```

E'tibor bering: sanash naqshi **bir xil** — harflar uchun ham, so'zlar uchun ham,
juftliklar uchun ham. Faqat nima sanayotganingiz o'zgaradi. Shuning uchun uni bir
marta tushunsangiz yetadi.
</details>

---

## 13. Mashqlar

---

**Mashq 1.** Bu kod nima chiqaradi? Ishga tushirmasdan ayting.

```python
d = {"a": 1}
d["b"] = 2
d["a"] = 5
print(d)
print(len(d))
```

<details>
<summary>Javobni ko'rsatish</summary>

```
{'a': 5, 'b': 2}
2
```

`d["b"] = 2` — yangi kalit qo'shdi.
`d["a"] = 5` — mavjud kalitni **ustiga yozdi**. Eski qiymat (1) yo'qoldi.

Uzunlik 2 — chunki `a` ikki marta emas, bir marta. **Lug'atda kalit takrorlanmaydi.**
</details>

---

**Mashq 2.** Bu ikkisining farqi nima?

```python
d = {"Ali": 17}
print(d["Vali"])
print(d.get("Vali"))
```

<details>
<summary>Javobni ko'rsatish</summary>

Birinchisi:
```
KeyError: 'Vali'
```
Dastur **to'xtaydi**. Keyingi qatorlar umuman ishlamaydi.

Ikkinchisi:
```
None
```
Dastur **davom etadi**.

Qachon qaysi biri kerak?

- `d[kalit]` — kalit **albatta bo'lishi kerak** bo'lsa. Yo'q bo'lsa — bu xato,
  va siz buni darhol bilishingiz kerak.
- `.get(kalit, 0)` — kalit **bo'lmasligi normal** bo'lsa. Sanashda aynan shunday:
  har bir yangi juftlik birinchi marta yo'q bo'ladi.
</details>

---

**Mashq 3.** `get_stats("aaaa")` nima qaytaradi? Avval qo'lda hisoblang.

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(get_stats("aaaa"))
```

```
{('a', 'a'): 3}
```

4 ta belgi → 3 ta juftlik (`n − 1` qoidasi). Va uchalasi ham bir xil: `('a','a')`.

Shuning uchun lug'atda faqat **bitta** kalit bor, qiymati 3.

Bu muhim chekka holat: BPE algoritmi takrorlanuvchi belgilar bilan ishlaganda
ehtiyot bo'lish kerak. Dars 09 da `merge` ni yozganingizda `aaaa` ni sinab
ko'rasiz — va o'sha yerda qiziq muammo chiqadi.
</details>

---

**Mashq 4.** Bu funksiya nima uchun `None` qaytaradi? Tuzating.

```python
def kopaytir(a, b):
    natija = a * b
    print(natija)

x = kopaytir(3, 4)
print("x =", x)
```

<details>
<summary>Javobni ko'rsatish</summary>

```
12
x = None
```

Funksiya `12` ni **chiqardi**, lekin **qaytarmadi**. `print` va `return` — ikki
xil narsa.

```python
def kopaytir(a, b):
    natija = a * b
    return natija

x = kopaytir(3, 4)
print("x =", x)      # x = 12
```

Yoki qisqaroq: `return a * b`.

Qoida: funksiya natijasi bilan **keyin ishlashingiz** kerak bo'lsa — `return`.
Faqat ko'rsatish kerak bo'lsa — `print`. Ko'pincha `return` to'g'ri javob, chunki
chaqirgan tomon xohlasa o'zi chop etadi.
</details>

---

**Mashq 5 (eng muhimi).** Quyidagi ikki matn uchun `get_stats` ni ishga tushiring
va eng ko'p uchragan juftlikni toping:

```python
matn1 = "kitoblar daftarlar qalamlar"
matn2 = "maktabda bogʻda uyda"
```

Natijalar o'zbek tili haqida nimani aytadi?

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(eng_kop_juftlik(get_stats(matn1)))   # ('l', 'a')
print(eng_kop_juftlik(get_stats(matn2)))   # ('d', 'a')
```

Birinchisida — `la`, ya'ni **`-lar`** (ko'plik qo'shimchasi).
Ikkinchisida — `da`, ya'ni **`-da`** (o'rin-payt kelishigi).

Ikkala holatda ham algoritm **grammatik qo'shimchani** topdi. U grammatikani
bilmaydi, u faqat takrorni ko'radi — lekin o'zbek tilida eng ko'p takrorlanadigan
narsa aynan qo'shimchalar, chunki til **agglyutinativ**: har bir so'zga bir xil
qo'shimchalar ulanadi.

**Shuning uchun BPE o'zbek tilida yaxshi ishlaydi.** Va shuning uchun ingliz tili
uchun qurilgan tokenizator o'zbekchada yomon ishlaydi — u `-lar` va `-da` ni hech
qachon ko'rmagan, shuning uchun ularni har safar bo'laklab yuboradi.

Dars 01 dagi `1.839` va `2.724` raqamlari — aynan shu farqning o'lchovi.
</details>

---

## 14. Xulosa

1. **Lug'at** `{kalit: qiymat}` — raqamli manzil emas, **yorliq** bo'yicha saqlaydi.
   Yo'q kalit → `KeyError`.
2. `.get(kalit, 0)` — kalit yo'q bo'lsa xato bermaydi, `0` qaytaradi. Sanashning kaliti.
3. **Sanash naqshi:** `hisob[x] = hisob.get(x, 0) + 1`. Butun kursda ishlatasiz.
4. `if` / `else` — shart. Ikki nuqta va otstup, `for` dagidek.
5. **Eng kattasini topish naqshi:** hozirgacha ko'rilgan eng yaxshisini eslab yurish.
6. **Funksiya** `def ... return` — bir marta yoz, ko'p marta ishlat. `return` siz
   funksiya `None` qaytaradi.
7. `get_stats` tayyor — va u o'zbek tilining ko'plik qo'shimchasini o'zi topdi.

---

## Keyingi dars

Python bo'limi tugadi. **Endi tokenizatorni quramiz.**

**Dars 05 — Kompyuter harfni qanday saqlaydi.** Har bir belgining o'z raqami bor,
va bu raqamlar tizimi butun dunyo uchun bitta.

Keyingi darsning savoli: *`ord("a")` nima qaytaradi — va nima uchun aynan o'sha
raqam?* Javob 1960-yillarga borib taqaladi, va u `oʻ` muammosining ildizini ochadi.
