# Dars 07 — Birinchi tokenizator va uning muammosi

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 06 — Baytlar
> **Vaqt:** ~45 daqiqa
> **Kerak:** Dars 01–06. `kodla`, `dekodla`, lug'at, funksiya

---

## Bu darsdan keyin siz...

- **qurasiz** to'liq ishlaydigan tokenizatorni — 256 tokenli lug'at bilan;
- **o'lchaysiz** uning sifatini raqam bilan — `fertility`;
- **ko'rasiz** model `bolalar` so'zini qanday ko'rishini (va u so'z emasligini);
- **hisoblaysiz** bu tokenizator modelning xotirasidan qanchasini yeyishini;
- **aytib bera olasiz** yechimning g'oyasini bitta jumlada.

---

## 1. Bitta savol

Dars 06 oxirida ko'rgan edik: `bolalar kitoblarni oʻqishdi.` — 29 ta token.

Endi savol boshqacha:

> **Model `bolalar` so'zini ko'rganda aslida nimani ko'radi?**

```python
soz = "bolalar"
print(kodla(soz))
print("tokenlar soni:", len(kodla(soz)))
```

**Natija:**

```
[98, 111, 108, 97, 108, 97, 114]
tokenlar soni: 7
```

**Yettita alohida raqam.**

Siz `bolalar` ni bitta so'z deb ko'rasiz. Model esa yettita bir-biriga bog'liq
bo'lmagan raqamni ko'radi. Ular orasida "bu bitta so'z" degan hech qanday belgi yo'q.

Bu darsda shu holatning narxini **raqamda** o'lchaymiz.

---

## 2. Tokenizatorni to'liq yig'amiz

Dars 06 dagi ikki funksiya allaqachon ishlaydi. Ularga **lug'at** qo'shamiz —
har bir token raqami nimani anglatishini ko'rsatadigan jadval.

```python
def kodla(matn):
    return list(matn.encode("utf-8"))


def dekodla(raqamlar):
    return bytes(raqamlar).decode("utf-8")


vocab = {}
for i in range(256):
    vocab[i] = bytes([i])

print("lugʻat hajmi:", len(vocab))
print("vocab[98]  =", vocab[98])
print("vocab[97]  =", vocab[97])
print("vocab[202] =", vocab[202])
```

**Natija:**

```
lugʻat hajmi: 256
vocab[98]  = b'b'
vocab[97]  = b'a'
vocab[202] = b'\xca'
```

**Satr izohi:**

- `vocab` — inglizcha *vocabulary*, "lug'at". Haqiqiy kodda shunday ataladi.
- `for i in range(256)` — 0 dan 255 gacha. Dars 06: baytda boshqa qiymat yo'q.
- `vocab[i] = bytes([i])` — har bir raqamga o'sha raqamdan iborat bitta baytni
  mos qo'yamiz.
- `vocab[202]` = `b'\xca'` — bu **yarim belgi**. Yodda tuting: 202 o'zi hech narsa
  emas, u faqat 187 bilan birga `ʻ` ni yasaydi (Dars 06).

**Mana, tokenizator tayyor.** Uchta narsa: `kodla`, `dekodla`, `vocab`. Ishlaydi,
hamma tilda ishlaydi, hech qachon buzilmaydi.

Endi uning qanchalik yomon ekanini ko'ramiz.

---

## 3. Model nimani ko'radi

Har bir tokenni alohida ochamiz:

```python
for t in kodla("bolalar"):
    print(t, "->", repr(dekodla([t])))
```

**Natija:**

```
98 -> 'b'
111 -> 'o'
108 -> 'l'
97 -> 'a'
108 -> 'l'
97 -> 'a'
114 -> 'r'
```

Model uchun `bolalar` — bu:

```
98  111  108  97  108  97  114
```

**Bu raqamlar orasida hech qanday aloqa yo'q.** Model uchun 98 va 111 birga
turishining sababi yo'q — xuddi shu ketma-ketlikda kelgan, xolos.

Solishtiring:

```python
print("bolalar  :", kodla("bolalar"))
print("bolalarni:", kodla("bolalarni"))
```

```
bolalar  : [98, 111, 108, 97, 108, 97, 114]
bolalarni: [98, 111, 108, 97, 108, 97, 114, 110, 105]
```

Model `bolalarni` ning `bolalar` bilan bog'liqligini bilishi uchun, u
**yettita raqamning aynan shu tartibda kelishini** o'rganishi kerak. Har safar,
har bir so'z uchun, noldan.

Odam esa `bolalar` ni bir marta o'rganadi va `bolalarni`, `bolalarga`,
`bolalardan` ni darhol tanib oladi.

<!-- animatsiya: i1 | Model nima koʻradi -->

---

## 4. Sifatni o'lchaymiz — `fertility`

"Yomon" degan so'z yetarli emas. Raqam kerak.

Dars 01 dagi o'lchovni eslang: **fertility** — har bir so'zga to'g'ri keladigan
o'rtacha token soni. **Kam bo'lgani yaxshi.**

```python
matn = "bolalar kitoblarni oʻqishdi."
tokenlar = kodla(matn)

print("belgilar :", len(matn))
print("soʻzlar  :", len(matn.split()))
print("tokenlar :", len(tokenlar))
print("fertility:", round(len(tokenlar) / len(matn.split()), 3))
```

**Natija:**

```
belgilar : 28
soʻzlar  : 3
tokenlar : 29
fertility: 9.667
```

- `round(son, 3)` — sonni 3 xonagacha yaxlitlaydi.
- `len(tokenlar) / len(matn.split())` — tokenlar soni bo'lingan so'zlar soniga.

**9.667.** Har bir so'z uchun deyarli **o'n** token.

Bitta jumla kam — kattaroq matnda o'lchaymiz:

```python
paragraf = "Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi. Oʻqituvchi darsni tushuntirdi. Kechqurun bolalar uyga qaytishdi."

t = kodla(paragraf)
w = len(paragraf.split())

print("belgilar :", len(paragraf))
print("soʻzlar  :", w)
print("tokenlar :", len(t))
print("fertility:", round(len(t) / w, 3))
```

**Natija:**

```
belgilar : 141
soʻzlar  : 16
tokenlar : 143
fertility: 8.938
```

**8.938.** Endi buni Dars 01 dagi jadvalga qo'shamiz:

| Tokenizator | Lug'at | Fertility (o'zbekcha) |
|---|---|---|
| **bizning bayt tokenizatorimiz** | **256** | **8.938** |
| GPT-2 | 50 257 | 3.584 |
| GPT-4o | 200 019 | 2.724 |
| uzbek-bpe-16k | 16 384 | **1.839** |

Bizniki eng yomoni. GPT-4o dan **uch barobar**, maqsaddan **besh barobar** yomon.

---

## 5. Uchta aniq zarar

### Zarar 1 — modelning xotirasi yeyiladi

Modelning "xotirasi" — **kontekst oynasi** — token bilan o'lchanadi. Sizning
`uzbek-gpt-103m` modelingizda u **1024 token**.

Shu 1024 tokenga nechta o'zbek so'zi sig'adi?

```python
print("bayt tokenizator :", round(1024 / 8.938), "ta soʻz")
print("GPT-4o           :", round(1024 / 2.724), "ta soʻz")
print("uzbek-bpe-16k    :", round(1024 / 1.839), "ta soʻz")
```

**Natija:**

```
bayt tokenizator : 115 ta soʻz
GPT-4o           : 376 ta soʻz
uzbek-bpe-16k    : 557 ta soʻz
```

**115 ta so'z.** Bu taxminan yarim sahifa. Model bundan ortig'ini bir vaqtda
ko'ra olmaydi.

Bir xil model, bir xil xotira — lekin yaxshi tokenizator bilan **beshdan bir
ko'proq matn** sig'adi. Hech qanday qo'shimcha hisob, hech qanday qo'shimcha
parametr. Faqat tokenizator.

<!-- animatsiya: i2 | Kontekst oynasi -->

### Zarar 2 — hamma narsa sekinroq va qimmatroq

Model har bir tokenni **alohida** ishlaydi. 29 ta token = 29 ta qadam.
6 ta token = 6 ta qadam.

Trening ham, javob berish ham shunga proporsional. Dars 01 dagi "uch barobar
qimmat" — bu yerda **besh barobar** bo'ladi.

### Zarar 3 — model so'zni ko'rmaydi

Bu eng nozik va eng jiddiy zarar.

Modelga `-lar` ko'plik qo'shimchasi ekanini o'rganish kerak. Bayt darajasida
bu `[108, 97, 114]` degan uchta raqam ketma-ketligini o'rganish demak — va uni
`bolalar`, `kitoblar`, `daftarlar`, `qalamlar` da alohida-alohida tanib olish.

Agar `lar` **bitta token** bo'lsa, model uni bir marta o'rganadi va hamma joyda
tanib oladi.

**Tokenizator modelga qanday qurilish bloklari berishini hal qiladi.** Bloklar
juda mayda bo'lsa, model ularni yig'ishga kuch sarflaydi — o'rganishga emas.

---

## 6. O'zbek tili bu yerda ham ko'proq to'laydi

Bir xil ma'nodagi inglizcha matnni o'lchaymiz:

```python
ing = "The children went to school. They read the books and wrote in their notebooks. The teacher explained the lesson. In the evening the children returned home."

ti = kodla(ing)
wi = len(ing.split())
print("inglizcha soʻzlar:", wi, "| tokenlar:", len(ti), "| fertility:", round(len(ti)/wi, 3))
```

**Natija:**

```
inglizcha soʻzlar: 26 | tokenlar: 155 | fertility: 5.962
```

**Inglizcha 5.962, o'zbekcha 8.938.** Bayt darajasida ham o'zbek tili 50% ko'proq
to'laydi.

Ikkita sabab:
1. O'zbek so'zlari uzunroq (agglyutinativ til — qo'shimchalar ulanadi)
2. Har bir `ʻ` **ikkita** token turadi (Dars 06)

```python
print(kodla("oʻ"), "vs", kodla("ol"))
```

```
[111, 202, 187] vs [111, 108]
```

`oʻ` — 3 token. `ol` — 2 token. Bir xil ko'rinadigan ikki bo'g'in, har xil narx.

---

## 7. Yechimning g'oyasi

Endi eng muhim qismi. Muammoni ko'rdik — yechim nima?

Paragrafdagi juftliklarni sanaymiz. **Dars 04 dagi `get_stats` ni ishlatamiz —
faqat endi harflar emas, raqamlar ustida:**

```python
hisob = {}
for x, y in zip(t, t[1:]):
    hisob[(x, y)] = hisob.get((x, y), 0) + 1

eng = None
eng_soni = 0
for juftlik, soni in hisob.items():
    if soni > eng_soni:
        eng = juftlik
        eng_soni = soni

print("juftliklar        :", len(t) - 1)
print("turli juftliklar  :", len(hisob))
print("eng koʻp juftlik  :", eng, "->", eng_soni, "marta")
print("u nimani anglatadi:", repr(dekodla(list(eng))))
```

**Natija:**

```
juftliklar        : 142
turli juftliklar  : 85
eng koʻp juftlik  : (108, 97) -> 7 marta
u nimani anglatadi: 'la'
```

**To'xtang va buni ko'ring.**

Dars 04 da xuddi shu funksiyani **harflar** ustida ishlatgan edik va javob `la`
chiqqan edi. Endi uni **baytlar** ustida ishlatdik — va javob yana `la`.

Kod bir xil. Faqat ichidagi narsa harf emas, raqam. Dars 03 dagi kortej shuning
uchun kerak edi: `(108, 97)` — ikkita raqam yonma-yon, qo'shilmagan.

### Va endi g'oya

`(108, 97)` juftligi paragrafda **7 marta** uchraydi. Har safar u **ikkita**
token yeydi. Jami 14 ta token.

Nima bo'lardi, agar biz **yangi token** yasasak?

```
256-token  =  (108, 97)  =  "la"
```

Endi har bir `la` **bitta** token. 14 o'rniga 7. **Yettita token tejaldi**,
faqat bitta yangi token qo'shish evaziga.

Va buni to'xtatish shart emas. Yana sanaymiz, yana eng ko'p uchraganini
birlashtiramiz. Yana. Yana. Har safar lug'at bittaga o'sadi va matn qisqaradi.

> **BPE algoritmi bitta jumlada:**
> **Eng ko'p uchraydigan juftlikni topib, uni bitta yangi token bilan almashtir.
> Keyin buni qayta-qayta takrorla.**
>
> Boshida 256 ta token bor. 16 128 marta takrorlasangiz — 16 384 ta token bo'ladi.
> Aynan sizning tokenizatoringiz.

<!-- animatsiya: i3 | BPE gʻoyasi -->

Nomi shundan: **BPE — Byte Pair Encoding**, ya'ni "bayt juftligini kodlash".

---

## 8. Muammo

G'oya aniq. Lekin uni bajarish uchun ikkita narsa yetishmayapti.

**Birinchi.** Biz eng ko'p uchraydigan juftlikni **topdik**, lekin uni hali
**almashtirganimiz yo'q**. `[98, 111, 108, 97, 108, 97, 114]` ro'yxatida
`108, 97` ni topib, ularni `256` ga almashtirish kerak. Bu ko'rinadigandan
qiyinroq — chunki ro'yxat bo'ylab yurayotganda uning uzunligi o'zgaradi.

**Ikkinchi.** Buni **bir marta emas, minglab marta** takrorlash kerak. Va har
safar oldingi natija ustida ishlash kerak.

Keyingi ikki dars aynan shu ikki muammo haqida.

---

## 9. To'liq kod

```python
# ---- Tokenizator ----
def kodla(matn):
    return list(matn.encode("utf-8"))


def dekodla(raqamlar):
    return bytes(raqamlar).decode("utf-8")


vocab = {}
for i in range(256):
    vocab[i] = bytes([i])


def get_stats(tokenlar):
    hisob = {}
    for x, y in zip(tokenlar, tokenlar[1:]):
        juftlik = (x, y)
        hisob[juftlik] = hisob.get(juftlik, 0) + 1
    return hisob


def eng_kop_juftlik(hisob):
    eng = None
    eng_soni = 0
    for juftlik, soni in hisob.items():
        if soni > eng_soni:
            eng = juftlik
            eng_soni = soni
    return eng


# ---- Sinov ----
paragraf = "Bolalar maktabga borishdi. Ular kitoblarni oʻqishdi va daftarlarga yozishdi. Oʻqituvchi darsni tushuntirdi. Kechqurun bolalar uyga qaytishdi."

t = kodla(paragraf)
w = len(paragraf.split())

print("lugʻat hajmi :", len(vocab))
print("soʻzlar      :", w)
print("tokenlar     :", len(t))
print("fertility    :", round(len(t) / w, 3))
print("round-trip   :", dekodla(t) == paragraf)

stats = get_stats(t)
eng = eng_kop_juftlik(stats)
print("eng koʻp juftlik:", eng, "->", stats[eng], "marta =", repr(dekodla(list(eng))))

# ---- Kontekst hisobi ----
f = len(t) / w
print("1024 tokenga sigʻadi:", round(1024 / f), "ta soʻz")
```

**Kutilgan natija:**

```
lugʻat hajmi : 256
soʻzlar      : 16
tokenlar     : 143
fertility    : 8.938
round-trip   : True
eng koʻp juftlik: (108, 97) -> 7 marta = 'la'
1024 tokenga sigʻadi: 115 ta soʻz
```

---

## 10. O'zingiz yozing

```python
# 1. Oʻz ismingiz nechta token?
ism = "___"
print(len(kodla(___)))

# 2. Bu ikki soʻzning fertility sini solishtiring
for soz in ["maktab", "maktablarimizdagi"]:
    tokenlar = ___(soz)
    print(soz, "->", len(tokenlar), "token")

# 3. Oʻz jumlangizni yozing va fertility sini hisoblang
jumla = "___"
print("fertility:", round(len(kodla(jumla)) / len(jumla.___()), 3))
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
# 1.
ism = "Islombek"
print(len(kodla(ism)))          # 8

# 2.
for soz in ["maktab", "maktablarimizdagi"]:
    tokenlar = kodla(soz)
    print(soz, "->", len(tokenlar), "token")
# maktab -> 6 token
# maktablarimizdagi -> 17 token

# 3.
jumla = "Men oʻzbek tilida gaplashaman"
print("fertility:", round(len(kodla(jumla)) / len(jumla.split()), 3))
# fertility: 7.5
```

2-topshiriq o'zbek tilining muammosini ko'rsatadi: `maktablarimizdagi` — bitta
so'z, lekin **17 ta token**. Qo'shimchalar ulangan sari narx o'sadi.

Ingliz tilida bunday so'z yo'q — u "in our schools" deb **uch so'zga** bo'linadi,
va har biri qisqa. O'zbek tili esa hammasini bitta so'zga yig'adi, va bayt
tokenizator uni butunlay maydalaydi.
</details>

---

## 11. Mashqlar

---

**Mashq 1.** `kodla("aaa")` nechta token qaytaradi? `get_stats` undan nima topadi?

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(kodla("aaa"))              # [97, 97, 97]
print(get_stats(kodla("aaa")))   # {(97, 97): 2}
```

3 ta token, 2 ta juftlik, ikkalasi ham `(97, 97)`.

Dars 04 dagi `get_stats("aaa")` bilan bir xil naqsh — faqat harf o'rniga raqam.
</details>

---

**Mashq 2.** Nima uchun `oʻzbek` va `ozbek` har xil sondagi token beradi?

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(kodla("oʻzbek"), len(kodla("oʻzbek")))   # 7
print(kodla("ozbek"),  len(kodla("ozbek")))    # 5
```

`ʻ` ikkita bayt (Dars 06), shuning uchun **ikkita token**. `ozbek` da u umuman yo'q.

7 va 5 — ikki token farq, bitta belgi uchun.

Bu amaliy oqibat: to'g'ri yozilgan o'zbekcha matn tokenizator uchun qimmatroq.
Dars 14 dagi normalizatsiya buni to'g'rilamaydi — u faqat **turli variantlarni
bittaga keltiradi**, narxni kamaytirmaydi. Narxni kamaytiradigan narsa — BPE:
u `[202, 187]` juftligini juda ko'p ko'radi va tez orada uni bitta tokenga
birlashtiradi.
</details>

---

**Mashq 3.** Bizning tokenizatorimiz **hech qachon** xato bermaydi — hatto
hech kim ko'rmagan belgida ham. Buni isbotlang.

<details>
<summary>Javobni ko'rsatish</summary>

```python
for matn in ["salom", "привет", "你好", "😀🎉", "مرحبا"]:
    t = kodla(matn)
    print(f"{matn:8s} -> {len(t):2d} token -> {dekodla(t)}")
```

Hammasi ishlaydi, hammasi round-trip qiladi.

Sabab (Dars 06): har qanday matn — 0–255 raqamlar ro'yxati. Notanish bayt
degan narsa yo'q, chunki 256 tadan ortiq bayt qiymati mavjud emas.

Bu **haqiqiy ustunlik**, va uni BPE ham saqlab qoladi: yangi tokenlar
qo'shilganda ham eski 256 tasi joyida qoladi. Shuning uchun BPE tokenizator
hech qachon `<UNK>` chiqarmaydi.
</details>

---

**Mashq 4.** Fertility 8.938 edi. Agar biz `la` ni bitta token qilsak, u
qanchaga tushadi? Qo'lda hisoblang.

<details>
<summary>Javobni ko'rsatish</summary>

`la` 7 marta uchraydi. Har safar 2 token o'rniga 1 token → **7 ta token tejaladi**.

```
eski: 143 token / 16 soʻz = 8.938
yangi: 136 token / 16 soʻz = 8.500
```

```python
print(round((143 - 7) / 16, 3))   # 8.5
```

Bitta birlashtirish uchun 0.438 yaxshilanish. Kichik.

**Lekin buni 16 128 marta takrorlaysiz.** Va har bir keyingi birlashtirish
oldingilarining ustiga quriladi: `la` bitta token bo'lgach, `lar` ni yasash
uchun endi faqat bitta qo'shimcha birlashtirish kerak (`la` + `r`), uchta emas.

Shuning uchun natija 8.938 dan 1.839 gacha tushadi — chizig'iy emas,
to'planib boradi.
</details>

---

**Mashq 5 (eng muhimi).** `uzbek-gpt-103m` modelining konteksti 1024 token.
Bayt tokenizator bilan unga 115 ta so'z sig'adi.

Model bir sahifa matnni (taxminan 300 so'z) o'qiy oladimi? Va bu nimani anglatadi?

<details>
<summary>Javobni ko'rsatish</summary>

**Yo'q, o'qiy olmaydi.**

300 so'z × 8.938 = **2681 token**. Kontekst 1024 ta. Sig'maydi — sahifaning
atigi 38% i.

Nimani anglatadi:

- Model bir sahifalik matnning boshi va oxirini **bir vaqtda ko'ra olmaydi**
- Uzun savolga javob bera olmaydi
- Hikoyaning boshini eslay olmaydi

`uzbek-bpe-16k` bilan esa 300 so'z = 552 token — **sig'adi**, hatto yarmidan
ko'p joy qoladi.

**Bu kursning butun ma'nosi shu yerda.** Tokenizator "kichik texnik detal" emas.
U modelning nimani ko'ra olishini va nimani ko'ra olmasligini hal qiladi.

Modelni kattalashtirish qimmat — ko'proq GPU, ko'proq vaqt, ko'proq pul.
Tokenizatorni yaxshilash **bepul** — u bir marta o'qitiladi va abadiy ishlaydi.

Shuning uchun ishni undan boshlash kerak.
</details>

---

## 12. Xulosa

1. Bizda **to'liq ishlaydigan tokenizator** bor: 256 token, `kodla`, `dekodla`,
   round-trip to'g'ri, hamma tilda ishlaydi.
2. **Fertility** — sifat o'lchovi. Bizniki **8.938**, GPT-4o 2.724,
   maqsad **1.839**.
3. Uchta zarar: kontekst 5 barobar kam (115 so'z), hisob 5 barobar qimmat,
   model so'zni umuman ko'rmaydi.
4. O'zbek tili bayt darajasida ham 50% ko'proq to'laydi (8.938 vs 5.962).
5. `get_stats` **raqamlar ustida ham** ishlaydi va yana `la` ni topdi.
6. **BPE g'oyasi:** eng ko'p uchraydigan juftlikni bitta yangi token bilan
   almashtir, va buni qayta-qayta takrorla.

---

## Keyingi dars

G'oya aniq. Endi uni kodga aylantiramiz.

**Dars 08 — Juftlarni sanash.** `get_stats` ni rasmiy funksiya sifatida
yozamiz, uni tezlashtiramiz va haqiqiy matnda sinaymiz.

Keyingi darsning savoli: *`[1, 2, 1, 2, 1]` ro'yxatida `(1, 2)` juftligi
necha marta uchraydi — ikki martami yoki uch marta?* Javob oddiy ko'rinadi,
lekin u `merge` funksiyasidagi eng nozik xatoning ildizi.
