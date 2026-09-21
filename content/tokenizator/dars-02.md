# Dars 02 — Matn bilan ishlash

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 01 — Nega o'zbek tili AI uchun qimmat?
> **Vaqt:** ~45 daqiqa
> **Kerak:** Dars 01. `print`, o'zgaruvchi, `len`, `.split()`

---

## Bu darsdan keyin siz...

- **olasiz** matndan istalgan bitta belgini — nomeri bo'yicha;
- **kesasiz** matnning istalgan bo'lagini — boshidan, o'rtasidan, oxiridan;
- **tushunasiz** nima uchun Python noldan sanashini, va bu nima uchun aslida qulay;
- **almashtirasiz** matn ichidagi belgilarni — bu tokenizatoringizning haqiqiy qismi bo'ladi;
- **ko'rasiz** `oʻ` ning ichida yashiringan sirni, va u butun kursga ta'sir qiladi.

---

## 1. Bitta savol

O'tgan darsda savol qoldirgan edim:

> `"salom"` matnining **0-belgisi** qaysi harf?

Ko'pchilik `a` deb javob beradi. Mantiq shunday: birinchi harf `s`, demak 0-chisi undan
oldin, yoki keyingisi...

Tekshiramiz:

```python
soz = "salom"
print(soz[0])
```

**Natija:**

```
s
```

**0-belgi — bu birinchi harf.**

Python (va deyarli barcha dasturlash tillari) **noldan sanaydi**. Birinchi — 0,
ikkinchi — 1, uchinchi — 2.

Bu g'alati tuyuladi, lekin sababi bor va u darsning o'rtasida ochiladi.

Hozir esa ikkinchi savol, va bu ancha muhimroq:

> `"koʻraman"` matnining **1-belgisi** nima?

Siz `oʻ` deb o'ylayapsiz. Javob boshqacha. Va bu farq butun kursning eng muhim
texnik muammolaridan birini ochadi.

---

## 2. Matn — bu belgilar zanjiri

Kompyuter uchun matn — bu bir-biriga ulangan belgilar zanjiri. Har bir belgining
o'z **o'rni** bor, va o'rinlar raqamlangan:

```
 s   a   l   o   m
 0   1   2   3   4
```

Bu raqam **indeks** deb ataladi. Indeks — bu belgining manzili.

Matndan bitta belgini olish uchun kvadrat qavs ichida uning indeksini yozasiz:

```python
soz = "salom"
print(soz[0])
print(soz[1])
print(soz[4])
```

**Natija:**

```
s
a
m
```

- `soz[0]` — 0-manzildagi belgi, ya'ni `s`
- `soz[1]` — 1-manzildagi belgi, ya'ni `a`
- `soz[4]` — 4-manzildagi belgi, ya'ni `m` (oxirgisi)

> **Diqqat:** qavs turi muhim. `soz(0)` ❌ — dumaloq qavs buyruq chaqiradi.
> `soz[0]` ✓ — kvadrat qavs indeks oladi.

---

## 3. Ataylab xato: chegaradan chiqish

Nima bo'ladi, agar mavjud bo'lmagan manzilni so'rasak? `"salom"` da 5 ta belgi bor,
manzillar 0 dan 4 gacha. `soz[5]` ni so'raymiz:

```python
soz = "salom"
print(soz[5])
```

**Natija:**

```
IndexError: string index out of range
```

Xatoni o'qiymiz (Dars 01 dagidek — ikki bo'lakka ajratamiz):

- `IndexError` — xato **turi**. Indeks bilan bog'liq muammo.
- `string index out of range` — **izohi**: "satr indeksi chegaradan tashqarida".

Kompyuter 5-manzilga bordi, u yerda hech narsa yo'q edi, va shuni aytdi.

**Qoida:** `n` ta belgili matnda manzillar **0 dan n−1 gacha**. 5 ta belgi → 0, 1, 2, 3, 4.
Oxirgi manzil har doim `len(matn) - 1`.

Bu `-1` ni Dars 01 dagi savolga bog'lang: sanash noldan boshlangani uchun, oxirgi
raqam har doim **umumiy sondan bitta kam**.

<!-- animatsiya: d1 | Noldan sanash -->

---

## 4. Orqadan sanash

Oxirgi belgini olish uchun har safar `len(matn) - 1` hisoblash noqulay. Python
osonroq yo'l beradi — **manfiy indeks**:

```python
soz = "salom"
print(soz[-1])
print(soz[-2])
```

**Natija:**

```
m
o
```

```
 s   a   l   o   m
 0   1   2   3   4      ← oldidan
-5  -4  -3  -2  -1      ← orqadan
```

- `soz[-1]` — oxirgi belgi. **Har doim.** Matn uzunligini bilish shart emas.
- `soz[-2]` — oxiridan ikkinchisi.

E'tibor bering: orqadan sanash **birdan** boshlanadi, noldan emas. Chunki `-0` degan
narsa yo'q — `-0` bu `0`, ya'ni birinchi belgi.

`soz[-1]` ni yodlab qo'ying. Bu kursda juda ko'p ishlatiladi.

---

## 5. Yashirin belgi

Endi 1-bo'limdagi ikkinchi savolga qaytamiz.

```python
soz = "koʻraman"
print("belgilar soni:", len(soz))
print("0:", soz[0])
print("1:", soz[1])
print("2:", soz[2])
print("3:", soz[3])
```

**Natija:**

```
belgilar soni: 8
0: k
1: o
2: ʻ
3: r
```

**To'xtang va buni diqqat bilan o'qing.**

Siz `koʻraman` ni ko'rganingizda `koʻ` ni **bitta harf** deb o'ylaysiz. O'zbek tilida
bu bitta tovush, bitta harf.

Kompyuter uchun esa bu **ikkita alohida belgi**:

```
 k   o   ʻ   r   a   m   a   n
 0   1   2   3   4   5   6   7
```

- 1-manzilda — oddiy `o` harfi
- 2-manzilda — `ʻ` belgisi, **butunlay alohida**

Ya'ni `oʻ` — bu bitta harf emas, bu `o` va undan keyin turgan boshqa belgi.

<!-- animatsiya: d2 | Yashirin belgi -->

**Nega bu muhim?**

1. `koʻraman` sizning ko'zingizda 7 harf, kompyuter uchun **8 belgi**.
2. Tokenizator `oʻ` ni tasodifan ikkiga bo'lib yuborishi mumkin — va `o` + `ʻ`
   degan ma'nosiz bo'laklar hosil bo'ladi.
3. Va eng yomoni: `ʻ` ni odamlar **to'rt xil** yozadi — `oʻ`, `o'`, `o‘`, `o`.
   Kompyuter uchun bular to'rt xil so'z.

Bu — o'zbek tili uchun tokenizator qurishdagi asosiy texnik muammolardan biri.
Uni Dars 14 da to'liq hal qilamiz. Hozircha shuni biling: **ko'z ko'rgan narsa va
kompyuter ko'rgan narsa — har doim bir xil emas.**

---

## 6. Kesish — bo'lak olish

Bitta belgi emas, **bo'lak** olish kerak bo'lsa, ikki nuqta ishlatiladi:

```python
soz = "koʻraman"
print(soz[0:3])
print(soz[3:8])
```

**Natija:**

```
koʻ
raman
```

Yozilishi: `matn[boshi:oxiri]`

- `boshi` — qayerdan boshlab olish (shu manzil **kiradi**)
- `oxiri` — qayerda to'xtash (shu manzil **kirmaydi**)

`soz[0:3]` = 0, 1, 2-manzillar. **3-manzil kirmaydi.**

### Nima uchun oxirgisi kirmaydi?

Bu boshida g'alati tuyuladi, lekin sababi juda amaliy.

Indekslarni **belgilarda emas, belgilar orasidagi kesish joylarida** tasavvur qiling:

```
 |  k  |  o  |  ʻ  |  r  |  a  |  m  |  a  |  n  |
 0     1     2     3     4     5     6     7     8
```

Endi `soz[0:3]` — bu "0-kesikdan 3-kesikgacha bo'lgan bo'lak". Va hammasi joyiga tushadi:

- bo'lak uzunligi har doim `oxiri - boshi` = 3 − 0 = 3 ✓
- `soz[0:3]` va `soz[3:8]` — hech narsa yo'qolmaydi, hech narsa takrorlanmaydi
- ikkisini qo'shsangiz, butun so'z chiqadi

Bu tokenizator uchun hayotiy muhim: so'zni bo'laklarga bo'lganda **hamma belgi
aynan bir marta** ishlatilishi kerak.

<!-- animatsiya: d3 | Kesish -->

### Qisqartmalar

Agar boshi 0 bo'lsa yoki oxiri matn oxirigacha bo'lsa, ularni yozmasa ham bo'ladi:

```python
soz = "koʻraman"
print(soz[:3])
print(soz[3:])
print(soz[:])
```

**Natija:**

```
koʻ
raman
koʻraman
```

- `soz[:3]` — boshidan 3-gacha
- `soz[3:]` — 3-dan oxirigacha
- `soz[:]` — butunicha (nusxa)

Bitta mashq, o'zingiz taxmin qiling: `"salom"[1:4]` nima beradi?

```python
print("salom"[1:4])
```

```
alo
```

1, 2, 3-manzillar: `a`, `l`, `o`. 4-manzil (`m`) kirmadi.

---

## 7. Matnlarni qo'shish

```python
a = "salom"
b = "dunyo"
print(a + b)
print(a + " " + b)
print(a * 3)
```

**Natija:**

```
salomdunyo
salom dunyo
salomsalomsalom
```

- `+` — matnlarni **ulaydi**. Bo'shliq o'zi qo'shilmaydi, kerak bo'lsa qo'lda
  qo'shasiz: `a + " " + b`.
- `*` — matnni takrorlaydi.

Diqqat: `+` sonlar bilan qo'shadi, matnlar bilan ulaydi. `2 + 3` = `5`, lekin
`"2" + "3"` = `"23"`.

### Ataylab xato: turlarni aralashtirish

```python
print("salom" + 5)
```

```
TypeError: can only concatenate str (not "int") to str
```

- `TypeError` — **tur** bilan bog'liq xato.
- Izohi: "satrga faqat satrni ulash mumkin, `int` ni emas".
- `str` = string (satr, matn). `int` = integer (butun son).

Kompyuter matn bilan sonni qo'sha olmaydi — ular boshqa turdagi narsalar.

Tuzatish: sonni matnga aylantiramiz:

```python
print("salom" + str(5))
```

```
salom5
```

`str(...)` — istalgan narsani matnga aylantiradi.

---

## 8. Matnni o'zgartirish

### `.lower()` va `.upper()`

```python
katta = "Men OʻQISHNI Yaxshi Koʻraman"
print(katta.lower())
print(katta.upper())
```

**Natija:**

```
men oʻqishni yaxshi koʻraman
MEN OʻQISHNI YAXSHI KOʻRAMAN
```

Nima uchun bu kerak? Chunki kompyuter uchun `Men` va `men` — **ikki xil matn**.
Agar tokenizator ularni alohida o'rgansa, bilim ikkiga bo'linadi va ikkalasi ham
yomon o'rganiladi. Shuning uchun ko'pincha matn avval kichiklashtiriladi.

> E'tibor bering: `.upper()` da `ʻ` o'zgarmadi. Uning katta harfi yo'q — u harf emas,
> yordamchi belgi. Yana bir dalil: `ʻ` alohida yashaydi.

### `.replace()` — almashtirish

```python
xato = "o'zbek tili o'zbekcha"
togri = xato.replace("'", "ʻ")
print("oldin :", xato)
print("keyin :", togri)
```

**Natija:**

```
oldin : o'zbek tili o'zbekcha
keyin : oʻzbek tili oʻzbekcha
```

`matn.replace(nimani, nimaga)` — ikkita parametr oladi:
- **1-parametr** — nimani qidirish kerak
- **2-parametr** — o'rniga nimani qo'yish kerak

Va u **hamma** uchragan joyni almashtiradi, faqat birinchisini emas:

```python
print("aaa".replace("a", "b"))
```

```
bbb
```

**Shu ikki qator kod — sizning tokenizatoringizning haqiqiy qismi.** O'zbek matnida
odamlar `ʻ` o'rniga oddiy apostrof `'` yozadi. Tokenizator ishlashidan oldin ularni
bir xil ko'rinishga keltirish kerak. Bu **normalizatsiya** deb ataladi va Dars 14 da
to'liq yozamiz.

### Muhim tuzoq: matn o'zgarmaydi

```python
asl = "salom"
asl.replace("s", "S")
print(asl)
```

```
salom
```

**Hech narsa o'zgarmadi!** Nega?

Chunki `.replace()` asl matnni **o'zgartirmaydi** — u **yangi** matn qaytaradi.
Agar uni saqlab olmasangiz, natija yo'qoladi.

To'g'ri yo'l:

```python
asl = "salom"
yangi = asl.replace("s", "S")
print(yangi)
```

```
Salom
```

> Python'da matn **o'zgarmas** (immutable). Uni tahrirlab bo'lmaydi, faqat yangisini
> yasash mumkin. `.lower()`, `.upper()`, `.replace()` — hammasi shunday ishlaydi:
> natijani **o'zgaruvchiga yozib olish kerak.**
>
> Bu boshlovchilar eng ko'p qoqiladigan tuzoq. "Kodim ishlamayapti" deganlarning
> yarmi aynan shu.

---

## 9. `f`-satr — matn ichiga qiymat qo'yish

Dars 01 da `print` ichida vergul ishlatgan edik. Chiroyliroq yo'l bor:

```python
soz = "koʻraman"
print(f"{soz} soʻzida {len(soz)} ta belgi bor")
print(f"birinchi belgi: {soz[0]}, oxirgi belgi: {soz[-1]}")
```

**Natija:**

```
koʻraman soʻzida 8 ta belgi bor
birinchi belgi: k, oxirgi belgi: n
```

- Qo'shtirnoqdan **oldin** `f` harfi turadi — bu "formatlangan satr" degani.
- `{...}` ichidagi narsa **hisoblanadi** va natijasi matnga qo'yiladi.
- `{}` ichiga o'zgaruvchi ham, buyruq ham (`len(soz)`), indeks ham (`soz[0]`) yozish mumkin.

`f` ni unutsangiz, xato chiqmaydi — shunchaki qavslar matn bo'lib chiqadi:

```python
print("{soz} ta belgi")
```

```
{soz} ta belgi
```

Xato yo'q, lekin natija noto'g'ri. **Bunday xatolarni topish qiyinroq**, chunki
kompyuter shikoyat qilmaydi.

---

## 10. Buni tokenizatorga bog'laymiz

Endi biz **so'zni bo'laklarga bo'la olamiz**. Tokenizatorning butun ishi shu:

```python
soz = "koʻraman"

ozak = soz[:3]
qoshimcha = soz[3:]

print("oʻzak     :", ozak)
print("qoʻshimcha:", qoshimcha)
print("qayta yigʻish:", ozak + qoshimcha)
print("teng keldimi:", ozak + qoshimcha == soz)
```

**Natija:**

```
oʻzak     : koʻ
qoʻshimcha: raman
qayta yigʻish: koʻraman
teng keldimi: True
```

Oxirgi qatorda yangi belgi bor: `==`.

- `=` (bitta) — **joyla**: o'ngdagini chapdagi qutiga sol.
- `==` (ikkita) — **tengmi?**: ikki tomonni solishtir va `True` yoki `False` qaytar.

Bu ikkisini aralashtirmang. `==` hech narsani o'zgartirmaydi, faqat tekshiradi.

`True` — bu "rost". Ya'ni bo'laklarni qayta yig'ganimizda aynan asl so'z chiqdi.
Hech narsa yo'qolmadi.

**Bu tekshiruvning nomi bor: round-trip (borib-kelish).** Tokenizator uchun bu
eng muhim sinov:

```
matn → bo'laklar → raqamlar → bo'laklar → matn
```

Agar oxirida asl matn chiqmasa, tokenizator buzuq. Kurs davomida bu tekshiruvni
ko'p marta yozasiz.

---

## 11. Muammo

Bo'laklarga bo'lishni o'rgandik. Lekin bitta savol javobsiz qoldi:

**Qayerdan bo'lish kerakligini kim aytadi?**

Men `soz[:3]` deb yozdim — ya'ni bo'lish joyini **o'zim** tanladim. `koʻ` + `raman`.
Nega 3? Chunki men o'zbek tilini bilaman.

Lekin tokenizator million so'zni bo'lishi kerak. Ularning har biri uchun qo'lda
raqam yozib chiqib bo'lmaydi.

Va ikkinchi muammo: hozircha men faqat **bitta** so'z bilan ishladim. Million so'zni
qanday ishlayman? Har biri uchun alohida `print` yozamanmi?

Ikkala muammoning ham javobi bitta narsada: **ko'p narsani bir joyda saqlash va ular
bo'ylab avtomatik yurish**. Bu keyingi darsning mavzusi.

---

## 12. To'liq kod

```python
# ---- 1. Indeks ----
soz = "salom"
print(soz[0])       # s
print(soz[4])       # m
print(soz[-1])      # m  (oxirgisi)

# ---- 2. Yashirin belgi ----
soz2 = "koʻraman"
print("belgilar soni:", len(soz2))
print("0:", soz2[0], "| 1:", soz2[1], "| 2:", soz2[2], "| 3:", soz2[3])

# ---- 3. Kesish ----
print(soz2[0:3])    # koʻ
print(soz2[3:])     # raman
print(soz2[:])      # koʻraman

# ---- 4. Qoʻshish ----
a = "salom"
b = "dunyo"
print(a + " " + b)
print(a * 3)

# ---- 5. Oʻzgartirish ----
katta = "Men Koʻraman"
print(katta.lower())

xato = "o'zbek tili"
togri = xato.replace("'", "ʻ")
print(togri)

# ---- 6. f-satr ----
print(f"{soz2} soʻzida {len(soz2)} ta belgi bor")

# ---- 7. Round-trip tekshiruvi ----
ozak = soz2[:3]
qoshimcha = soz2[3:]
print("teng keldimi:", ozak + qoshimcha == soz2)
```

**Kutilgan natija:**

```
s
m
m
belgilar soni: 8
0: k | 1: o | 2: ʻ | 3: r
koʻ
raman
koʻraman
salom dunyo
salomsalomsalom
men koʻraman
oʻzbek tili
koʻraman soʻzida 8 ta belgi bor
teng keldimi: True
```

---

## 13. O'zingiz yozing

```python
soz = "oʻqishni"

# 1. Nechta belgi bor?
print("belgilar:", ___)

# 2. Birinchi va oxirgi belgini chiqaring
print("birinchi:", soz[___])
print("oxirgi  :", soz[___])

# 3. Soʻzni ikkiga boʻling: "oʻqish" va "ni"
birinchi_bolak = soz[___:___]
ikkinchi_bolak = soz[___:]
print(birinchi_bolak, "+", ikkinchi_bolak)

# 4. Round-trip tekshiruvi
print("teng keldimi:", birinchi_bolak + ikkinchi_bolak == ___)
```

<details>
<summary>Yechimni ko'rsatish</summary>

Avval belgilarni sanash kerak. `oʻqishni` — `o`, `ʻ`, `q`, `i`, `s`, `h`, `n`, `i` = **8 ta**.
(`oʻ` ikkita belgi ekanini unutmang!)

```python
soz = "oʻqishni"

print("belgilar:", len(soz))            # 8

print("birinchi:", soz[0])              # o
print("oxirgi  :", soz[-1])             # i

birinchi_bolak = soz[0:6]               # oʻqish
ikkinchi_bolak = soz[6:]                # ni
print(birinchi_bolak, "+", ikkinchi_bolak)

print("teng keldimi:", birinchi_bolak + ikkinchi_bolak == soz)   # True
```

```
belgilar: 8
birinchi: o
oxirgi  : i
oʻqish + ni
teng keldimi: True
```

Nega 6? Chunki `oʻqish` — `o`, `ʻ`, `q`, `i`, `s`, `h` = 6 ta belgi, ya'ni 0 dan
5 gacha. Kesish 6-da to'xtaydi va 6 kirmaydi.
</details>

---

## 14. Mashqlar

---

**Mashq 1.** `"Toshkent"` matnida:
- 0-belgi nima?
- 3-belgi nima?
- `[-1]` nima?
- `[0:4]` nima beradi?

Avval qo'lda yozing, keyin tekshiring.

<details>
<summary>Javobni ko'rsatish</summary>

```
 T   o   s   h   k   e   n   t
 0   1   2   3   4   5   6   7
```

```python
shahar = "Toshkent"
print(shahar[0])     # T
print(shahar[3])     # h
print(shahar[-1])    # t
print(shahar[0:4])   # Tosh
```

`[0:4]` = 0, 1, 2, 3-manzillar = `Tosh`. 4-manzil (`k`) kirmadi.
</details>

---

**Mashq 2.** Bu kod nima uchun xato beradi va uni qanday tuzatasiz?

```python
yosh = 17
print("Mening yoshim: " + yosh)
```

<details>
<summary>Javobni ko'rsatish</summary>

```
TypeError: can only concatenate str (not "int") to str
```

`yosh` — bu son (`int`), `"Mening yoshim: "` — bu matn (`str`). `+` bilan ularni
ulab bo'lmaydi.

Uch xil tuzatish, uchalasi ham to'g'ri:

```python
print("Mening yoshim: " + str(yosh))     # sonni matnga aylantirish
print("Mening yoshim:", yosh)            # vergul (Dars 01)
print(f"Mening yoshim: {yosh}")          # f-satr — eng qulayi
```

Uchalasi ham `Mening yoshim: 17` beradi.
</details>

---

**Mashq 3.** Bu kod nima chiqaradi? **Ishga tushirmasdan** ayting.

```python
matn = "salom"
matn.upper()
print(matn)
```

<details>
<summary>Javobni ko'rsatish</summary>

```
salom
```

Katta harf bilan emas!

`matn.upper()` yangi matn qaytardi, lekin uni **hech kim saqlamadi**. Natija paydo
bo'ldi va darhol yo'qoldi. `matn` esa o'zgarmadi — chunki Python'da matn o'zgarmas.

To'g'ri yo'l:

```python
matn = matn.upper()
print(matn)      # SALOM
```

Bu tuzoqni yaxshi eslab qoling. Kursda `.replace()` ni ko'p ishlatasiz va bu
xatoni albatta bir marta qilasiz.
</details>

---

**Mashq 4.** `"gʻalaba"` so'zida nechta belgi bor? Avval qo'lda sanang, keyin
tekshiring. Va `[1]` qaysi belgi?

<details>
<summary>Javobni ko'rsatish</summary>

```python
soz = "gʻalaba"
print(len(soz))     # 7
print(soz[0])       # g
print(soz[1])       # ʻ
print(soz[2])       # a
```

**7 ta belgi**, chunki `gʻ` — ikkita alohida belgi, xuddi `oʻ` kabi:

```
 g   ʻ   a   l   a   b   a
 0   1   2   3   4   5   6
```

Ko'zingiz `gʻalaba` da 6 harf ko'radi. Kompyuter 7 ta belgi ko'radi.

O'zbek lotin yozuvida shunday ikki juftlik bor: `oʻ` va `gʻ`. Ikkalasi ham
tokenizator uchun alohida e'tibor talab qiladi.
</details>

---

**Mashq 5 (eng muhimi).** Quyidagi uchta matn ko'zga bir xil ko'rinadi. Lekin
Python uchun ular bir xilmi?

```python
a = "oʻzbek"      # toʻgʻri belgi (U+02BB)
b = "o'zbek"      # oddiy apostrof
c = "o‘zbek"      # burchakli qoʻshtirnoq

print(len(a), len(b), len(c))
print(a == b)
print(a == c)
```

<details>
<summary>Javobni ko'rsatish</summary>

```
6 6 6
False
False
```

Uchalasining ham uzunligi bir xil — 6 belgi. Lekin ular **teng emas**.

Har uchtasi ham `o` + biror belgi, lekin o'sha "biror belgi" har safar boshqa:
`ʻ` (U+02BB), `'` (oddiy apostrof), `‘` (burchakli qo'shtirnoq).

**Nima uchun bu falokat:** internetdagi o'zbek matnida uchchalasi ham uchraydi,
chunki odamlar turli klaviaturada yozadi. Agar tokenizator ularni tuzatmasa, u
`oʻzbek` so'zini **uch xil so'z** deb o'rganadi. Lug'atda uch marta joy egallaydi,
va har biri uchun bilim uch marta kam bo'ladi.

Yechim — hammasini bittasiga keltirish:

```python
b = b.replace("'", "ʻ")
c = c.replace("‘", "ʻ")
print(a == b, a == c)    # True True
```

**Mana shu — Dars 14 ning butun mazmuni.** Va bu haqiqiy tokenizatorda
haqiqatan bor: `uzbek-bpe-16k` ishlashidan oldin aynan shunday normalizatsiya
qiladi. Siz hozir uni allaqachon yoza olasiz.
</details>

---

## 15. Xulosa

1. Matn — belgilar zanjiri. Har bir belgining manzili (indeks) bor, va sanash
   **noldan** boshlanadi.
2. `matn[i]` — bitta belgi. `matn[-1]` — oxirgisi.
3. `matn[a:b]` — bo'lak. **`b` kirmaydi.** Indekslarni belgilar orasidagi
   kesish joylari deb tasavvur qiling — shunda hammasi joyiga tushadi.
4. `oʻ` va `gʻ` — **ikkitadan belgi**. Ko'z ko'rgan narsa kompyuter ko'rgan narsa emas.
5. `.lower()`, `.replace()` — yangi matn qaytaradi, **eskisini o'zgartirmaydi**.
   Natijani saqlab oling.
6. `=` joylaydi, `==` tekshiradi.
7. Round-trip: bo'laklarni qayta yig'ganda asl matn chiqishi **shart**.

---

## Keyingi dars

Bugun bitta so'z bilan ishladik. Tokenizator esa millionlab so'z bilan ishlaydi.

**Dars 03 — Ro'yxat va tsikl.** Ko'p narsani bitta joyda saqlash va ular bo'ylab
avtomatik yurish. Shundan keyin "har bir belgini ko'rib chiq" degan buyruqni bitta
qatorda yoza olasiz.

Keyingi darsning savoli: *`"salom"` so'zidagi hamma qo'shni juftliklarni
(`sa`, `al`, `lo`, `om`) qanday chiqarasiz — qo'lda yozmasdan?* Bu juftliklar
BPE algoritmining birinchi qadami bo'ladi.
