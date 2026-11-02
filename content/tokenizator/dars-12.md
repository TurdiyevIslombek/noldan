# Dars 12 — `encode`: matndan raqamga

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 11 — `decode`
> **Vaqt:** ~55 daqiqa
> **Kerak:** Dars 01–11. `merges`, `merge`, `get_stats`, `decode`

---

## Bu darsdan keyin siz...

- **yozasiz** `encode` — **yangi** matnni tokenlarga aylantiradigan funksiya;
- **isbotlaysiz** birlashtirish tartibi nima uchun buzilmasligi kerakligini;
- **bilasiz** `float("inf")` nima va u qanday qilib "hech qachon tanlanma" deyishini;
- **o'lchaysiz** ikki xil yozilgan bir xil funksiyaning **378 barobar** farqini;
- **ko'rasiz** tokenizatoringizning **haqiqiy** fertility raqamini — o'qimagan matnda.

Tokenizator shu darsdan keyin **to'liq ishlaydi**.

---

## 1. Bitta savol

Dars 11 oxirida savol qoldirgan edim:

> Matnda `(108, 97)` va `(256, 114)` juftliklari bor. Qaysi birini birinchi
> birlashtirasiz — va nima uchun bu muhim?

Sinab ko'ramiz. Bizda ikkita birlashtirish bor:

```python
kichik_merges = {(108, 97): 256, (256, 114): 257}
```

Ya'ni: `l + a → la` (256), keyin `la + r → lar` (257).

`"lar"` so'zini kodlaymiz:

```python
t = kodla("lar")
print("baytlar:", t)

# toʻgʻri tartib
a = merge(t, (108, 97), 256)
a = merge(a, (256, 114), 257)
print("toʻgʻri tartib :", a)

# teskari tartib
b = merge(t, (256, 114), 257)
b = merge(b, (108, 97), 256)
print("teskari tartib :", b)
```

**Natija:**

```
baytlar: [108, 97, 114]
toʻgʻri tartib : [257]
teskari tartib : [256, 114]
```

**Ikki xil natija.**

- To'g'ri tartib: **1 ta token** — `257` = `lar`
- Teskari tartib: **2 ta token** — `256` va `114`

Nima bo'ldi? Teskari tartibda biz avval `(256, 114)` ni qidirdik. Lekin o'sha
paytda `256` degan token hali **mavjud emas** edi — u keyin yasaladi. Shuning
uchun hech narsa topilmadi, va o'sha birlashtirish bekorga ketdi.

**Ikkita oqibat, ikkalasi ham yomon:**

1. **Siqilish yomonlashdi** — 1 o'rniga 2 token.
2. **Model tanimaydi.** Model `257` tokenini ko'rgan va o'rgangan. Siz unga
   `256, 114` bersangiz — bu u uchun butunlay boshqa narsa.

> **Qoida: kodlashda birlashtirishlar aynan o'qitilgan tartibda qo'llanilishi
> shart.** Bu — Dars 10 dagi minora va Dars 11 dagi `KeyError` bilan bir xil
> g'oya, uchinchi marta.

<!-- animatsiya: n1 | Tartib -->

---

## 2. Eng oddiy `encode`

Tartib muhim bo'lsa, eng sodda yechim — **hamma birlashtirishni tartib bilan
qo'llash**:

```python
def encode_oddiy(matn, merges):
    tokenlar = kodla(matn)
    for juftlik, tid in merges.items():
        tokenlar = merge(tokenlar, juftlik, tid)
    return tokenlar
```

Uch qator. Trening tsiklida nima qilgan bo'lsak — aynan shuni takrorlaymiz,
faqat endi sanash yo'q, chunki qaysi juftlikni birlashtirishni allaqachon
bilamiz.

`merges.items()` **qo'shilish tartibida** yuradi (Dars 11), demak 256, 257,
258... tartibida. Aynan kerakli tartib.

```python
print(encode_oddiy("bolalar", merges))
print(encode_oddiy("lar", kichik_merges))
```

```
[270, 256, 257]
[257]
```

`bolalar` = `bo` + `la` + `lar` — **3 ta token** (bayt darajasida 7 ta edi).

---

## 3. Eng muhim tekshiruv

`encode` to'g'ri ishlayotganini qanday bilamiz?

Javob: **u `train` bilan bir xil natija berishi shart.** `train` o'z matnini
kodlagan edi; `encode` xuddi shu matnni bersak, xuddi shu tokenlarni berishi kerak.

```python
e = encode_oddiy(matn, merges)
print("encode:", len(e), "| train:", len(tokenlar), "| teng:", e == tokenlar)
```

**Natija:**

```
encode: 286 | train: 286 | teng: True
```

**Bu sinovni har doim qiling.** Agar bu `False` bo'lsa, `encode` da xato bor —
va u jimgina noto'g'ri tokenlar chiqaradi, hech qanday xatosiz.

Endi to'liq aylanma:

```python
yangi = "Talabalar universitetga kirishdi va imtihonlarni topshirishdi."

te = encode_oddiy(yangi, merges)
print("tokenlar:", len(te))
print("round-trip:", decode(te, vocab) == yangi)
```

```
tokenlar: 41
round-trip: True
```

**Tokenizator to'liq ishlaydi.** Matn → tokenlar → matn, hech narsa yo'qolmaydi.
Va bu **yangi** matn — tokenizator uni hech qachon ko'rmagan.

---

## 4. Qaysi tokenlar ishladi?

Qiziq: o'rgangan tokenlarimizdan qaysilari yangi matnda foydali bo'ldi?

```python
for tid in te[:14]:
    print(f"  {tid:4d} = {vocab[tid]!r}")
```

**Natija:**

```
    84 = b'T'
    97 = b'a'
   256 = b'la'
    98 = b'b'
    97 = b'a'
   261 = b'lar '
   117 = b'u'
   110 = b'n'
   105 = b'i'
   118 = b'v'
   101 = b'e'
   114 = b'r'
   115 = b's'
   105 = b'i'
```

`Talabalar ` so'zi shunday bo'lindi:

```
T  a  la  b  a  "lar "
84 97 256 98 97  261
```

**Olti token.** Ikkitasi o'rgangan tokenimiz (`la`, `lar `), qolgani oddiy
harflar.

`universitetga` so'ziga qarang — u deyarli butunlay **harflarga** bo'lindi.
Sabab oddiy: bizning o'quv matnimizda `universitet` degan so'z yo'q edi, shuning
uchun tokenizator u haqda hech narsa bilmaydi.

> **Xulosa:** tokenizator faqat **ko'rgan** narsasini yaxshi kodlaydi. Shuning
> uchun o'quv korpusi keng va xilma-xil bo'lishi kerak (Dars 15).

---

## 5. Haqiqiy raqam

Endi Dars 10 dagi muammoga qaytamiz. U yerda fertility ni **o'qigan matnda**
o'lchagan edik va u yolg'on chiqqan edi.

Endi ikkalasini ham o'lchaymiz:

```python
w1 = len(matn.split())
w2 = len(yangi.split())

print("oʻqigan matn:", round(len(e) / w1, 3))
print("yangi matn  :", round(len(te) / w2, 3))
```

**Natija:**

```
oʻqigan matn: 5.396
yangi matn  : 6.833
```

**Yangi matnda natija yomonroq.** 5.396 emas, **6.833**.

Bu normal va kutilgan. Tokenizator o'z matniga **moslashgan** — u `bolalar`,
`oʻqishdi`, `maktabga` ni yaxshi biladi, chunki ularni ko'rgan. `universitetga`
va `imtihonlarni` ni esa bilmaydi.

**Qaysi raqam haqiqiy?** — **6.833.**

Chunki tokenizatorni siz yangi matnlarda ishlatasiz, o'z o'quv matningizda emas.

> Bu qoidani hozir yozib qo'ying, chunki u butun ML sohasida bir xil ishlaydi:
>
> **Modelni (yoki tokenizatorni) o'qitgan ma'lumotingizda baholamang.
> Ko'rmagan ma'lumotda baholang.**
>
> Dars 17 shu qoidani to'liq ochadi — va u yerda buni qanday **to'g'ri**
> qilishni ko'rsataman, chunki uni buzish o'ylaganingizdan ancha oson.

---

## 6. Tezlik muammosi

`encode_oddiy` to'g'ri ishlaydi. Lekin unda jiddiy kamchilik bor.

O'ylab ko'ring: qisqa jumla kodlash uchun u **hamma** birlashtirishni qo'llaydi.
Sizning tokenizatoringizda 16 128 ta birlashtirish bor. Demak ikki so'zlik
jumla uchun ham **16 128 marta** matn bo'ylab yuriladi.

Ularning deyarli hammasi hech narsa topmaydi — bekor ish.

O'lchaymiz. `"Bolalar keldi."` jumlasini 1000 marta kodlaymiz, turli hajmdagi
`merges` bilan:

```
merges | encode_oddiy | tez usul | farq
    20 |      0.014 s |  0.023 s |    1x
   500 |      0.277 s |  0.026 s |   11x
  4000 |      2.232 s |  0.024 s |   94x
 16128 |      8.851 s |  0.023 s |  378x
```

Uchta narsaga e'tibor bering:

**1. `encode_oddiy` ning vaqti `merges` hajmiga qarab chiziqli o'sadi.**
20 → 16 128 (800 barobar) bo'lganda vaqt ham taxminan 600 barobar oshdi.

**2. Tez usulning vaqti umuman o'zgarmadi.** 0.023–0.026 soniya, doim.
Chunki u faqat **matnda haqiqatan bor** juftliklarga qaraydi, va matn qisqa.

**3. 20 ta birlashtirishda oddiy usul tezroq!** Bu halol detal: tez usulda
qo'shimcha hisob bor (`get_stats` har qadamda), va kichik jadvalda u o'zini
oqlamaydi.

> Bu — dasturlashdagi muhim saboq: **"tezroq algoritm" har doim tezroq emas.**
> U ma'lum hajmdan keyin tezroq bo'ladi. Qaysi hajmdan — o'lchab bilish kerak.

Bizning holatda hajm 16 384 bo'ladi, shuning uchun tez usul kerak.

<!-- animatsiya: n3 | Ikki yoʻl -->

---

## 7. `float("inf")` — cheksizlik

Tez usulni yozishdan oldin bitta yangi narsa kerak.

```python
print(float("inf"))
print(5 < float("inf"))
print(999999999 < float("inf"))
print(float("inf") < float("inf"))
```

**Natija:**

```
inf
True
True
False
```

`float("inf")` — **cheksizlik**. Python'dagi har qanday sondan katta.

Nima uchun kerak? **Eng kichigini topish** uchun.

Dars 04 dagi eng kattasini topish naqshini eslang:

```
eng = None
eng_soni = 0                       # eng kichik boshlangʻich qiymat
for ...:
    if soni > eng_soni:            # kattaroqmi?
```

`0` dan boshlagan edik, chunki har qanday haqiqiy sanoq undan katta.

Endi bizga **teskarisi** kerak: eng kichik raqamli birlashtirishni topish.

```
eng = None
eng_raqam = float("inf")           # eng katta boshlangʻich qiymat
for ...:
    if raqam < eng_raqam:          # kichikroqmi?
```

**Bir xil naqsh, teskari yo'nalish.** Va boshlang'ich qiymat ham teskari:
maksimum uchun `0`, minimum uchun `cheksizlik`.

Agar `eng_raqam = 999999` deb boshlaganimizda, 999999 dan katta token raqami
bo'lsa xato chiqardi. `inf` esa **kafolatlangan**.

### Va ikkinchi vazifa

`float("inf")` bizga yana bir ish qiladi. Agar juftlik `merges` da **yo'q**
bo'lsa:

```python
raqam = merges.get(juftlik, float("inf"))
```

`.get(kalit, standart)` (Dars 04) — juftlik topilmasa, `inf` qaytadi. Va `inf`
hech qachon "eng kichik" bo'la olmaydi.

Ya'ni **"bu juftlik o'rganilmagan, uni hech qachon tanlama"** degan ma'no.
Bitta qiymat, ikkita vazifa.

<!-- animatsiya: n2 | Cheksizlik -->

---

## 8. Tez `encode`

```python
def encode(matn, merges):
    tokenlar = kodla(matn)

    while len(tokenlar) >= 2:
        stats = get_stats(tokenlar)

        eng_juftlik = None
        eng_raqam = float("inf")
        for juftlik in stats:
            raqam = merges.get(juftlik, float("inf"))
            if raqam < eng_raqam:
                eng_raqam = raqam
                eng_juftlik = juftlik

        if eng_juftlik is None:
            break

        tokenlar = merge(tokenlar, eng_juftlik, merges[eng_juftlik])

    return tokenlar
```

**Qatorma-qator:**

- `while len(tokenlar) >= 2` — juftlik uchun kamida ikkita token kerak.
  Bitta token qolsa, ish tugadi.
- `stats = get_stats(tokenlar)` — matnda **hozir** qanday juftliklar bor.
  Diqqat: bizga sanoq kerak emas, faqat **qaysi juftliklar borligi**. Shuning
  uchun `for juftlik in stats` — qiymatlarsiz, faqat kalitlar bo'ylab.
- Min-topish naqshi — 7-bo'limdagi.
- `if eng_juftlik is None: break` — hech bir juftlik `merges` da yo'q. Hammasi
  `inf` bo'ldi, va `inf < inf` yolg'on (7-bo'limga qarang), shuning uchun
  `eng_juftlik` `None` bo'lib qoldi. To'xtaymiz.
- `merge(...)` — eng erta o'rganilgan juftlikni birlashtiramiz.

**G'oya:** har qadamda "mavjud juftliklar ichidan **eng erta o'rganilganini**
birlashtir". Bu tartibni avtomatik to'g'ri saqlaydi.

### Tekshiramiz

```python
print(encode("bolalar", merges))
print("oddiy bilan teng:", encode(matn, merges) == encode_oddiy(matn, merges))
print("train bilan teng:", encode(matn, merges) == tokenlar)
print("yangi matn teng :", encode(yangi, merges) == encode_oddiy(yangi, merges))
```

**Natija:**

```
[270, 256, 257]
oddiy bilan teng: True
train bilan teng: True
yangi matn teng : True
```

**Uchala sinov ham o'tdi.** Ikki xil yozilgan funksiya, bir xil natija, 378
barobar tezlik farqi.

---

## 9. Chekka holatlar va boshqa tillar

```python
print(encode("", merges))
print(encode("a", merges))
```

```
[]
[97]
```

Bo'sh matn — bo'sh ro'yxat. Bitta harf — bitta token, `while` sharti darhol
yolg'on bo'ladi.

Boshqa tillarda:

```python
for s in ["hello world", "привет мир", "你好"]:
    tk = encode(s, merges)
    print(f"  {s!r:15s} -> {len(tk):3d} token | round-trip: {decode(tk, vocab) == s}")
```

```
  'hello world'   ->  11 token | round-trip: True
  'привет мир'    ->  19 token | round-trip: True
  '你好'            ->   6 token | round-trip: True
```

**Hammasi ishlaydi.** Tokenizator o'zbek matnida o'qitilgan, lekin xitoy
matnini ham buzilmasdan kodlaydi — chunki u **bayt darajasida** ishlaydi
(Dars 06).

Yaxshi kodlaydimi? Yo'q — `你好` ikkita belgi uchun 6 token. Lekin **qulamaydi**,
va round-trip to'g'ri. Dars 06 dagi va'da bajarildi: `<UNK>` degan narsa yo'q.

---

## 10. Muammo

Tokenizator ishlaydi. Endi uning **sifatiga** qaraymiz.

4-bo'limdagi jadvalga qayting. 261-token — `b'lar '`, oxirida **bo'shliq bilan**.

Bu nimani anglatadi:

```python
print("bolalar keldi  :", encode("bolalar keldi", merges))
print("bolalar, keldi :", encode("bolalar, keldi", merges))
```

```
bolalar keldi  : [270, 275, 107, 101, 108, 259]
bolalar, keldi : [270, 256, 257, 44, 32, 107, 101, 108, 259]
```

**6 token va 9 token.** Bitta vergul uchta qoʻshimcha token turdi.

Faqat `bolalar` qismini ajratamiz:

| Matn | Tokenlar | Soni |
|---|---|---|
| `bolalar ` | `bo` + `lalar ` | **2** |
| `bolalar,` | `bo` + `la` + `lar` + `,` + `␣` | **5** |

Birinchisida 275-token (`lalar `) ishladi — u boʻshliq bilan tugaydi.
Ikkinchisida boʻshliq oʻrniga vergul turibdi, shuning uchun u **umuman
ishlamaydi**, va soʻz mayda boʻlaklarga tarqab ketadi.

**Bitta so'z, ikki xil kodlash.** Va lug'atda ikkala variant uchun alohida
token kerak bo'ladi.

Dars 10 dagi 300-tokenni ham eslang: `b'maktabga borishdi. U'` — uchta so'z,
nuqta va keyingi so'zning boshi, bitta tokenda.

**Muammoning ildizi:** BPE ga hech kim "so'z chegarasidan o'tma" demagan. U
bo'shliqni ham oddiy bayt deb biladi (Dars 05: `ord(" ")` = 32).

Bu lug'at joyini isrof qiladi:

```
"bolalar "   "bolalar,"   "bolalarni"   "bolalar."
```

To'rtta alohida token — bitta so'z uchun.

Keyingi dars shu muammoni hal qiladi.

---

## 11. To'liq kod

```python
def encode(matn, merges):
    tokenlar = kodla(matn)

    while len(tokenlar) >= 2:
        stats = get_stats(tokenlar)

        eng_juftlik = None
        eng_raqam = float("inf")
        for juftlik in stats:
            raqam = merges.get(juftlik, float("inf"))
            if raqam < eng_raqam:
                eng_raqam = raqam
                eng_juftlik = juftlik

        if eng_juftlik is None:
            break

        tokenlar = merge(tokenlar, eng_juftlik, merges[eng_juftlik])

    return tokenlar


# ---- Sinovlar ----
merges, vocab, tokenlar = train(matn, 276)

# 1. train bilan mos keladimi
print("train bilan teng:", encode(matn, merges) == tokenlar)

# 2. Yangi matnda round-trip
yangi = "Talabalar universitetga kirishdi va imtihonlarni topshirishdi."
te = encode(yangi, merges)
print("tokenlar:", len(te), "| round-trip:", decode(te, vocab) == yangi)

# 3. Haqiqiy fertility
print("oʻqigan matn:", round(len(tokenlar) / len(matn.split()), 3))
print("yangi matn  :", round(len(te) / len(yangi.split()), 3))

# 4. Chekka holatlar
print(encode("", merges), encode("a", merges))

# 5. Boshqa tillar
for s in ["hello world", "привет мир", "你好"]:
    tk = encode(s, merges)
    print(f"  {s!r:15s} -> {len(tk):3d} token | round-trip: {decode(tk, vocab) == s}")
```

**Kutilgan natija:**

```
train bilan teng: True
tokenlar: 41 | round-trip: True
oʻqigan matn: 5.396
yangi matn  : 6.833
[] [97]
  'hello world'   ->  11 token | round-trip: True
  'привет мир'    ->  19 token | round-trip: True
  '你好'            ->   6 token | round-trip: True
```

---

## 12. O'zingiz yozing

```python
def encode(matn, merges):
    tokenlar = ___(matn)

    while len(tokenlar) >= ___:
        stats = ___(tokenlar)

        eng_juftlik = ___
        eng_raqam = float(___)
        for juftlik in stats:
            raqam = merges.___(juftlik, float("inf"))
            if raqam ___ eng_raqam:
                eng_raqam = ___
                eng_juftlik = ___

        if eng_juftlik ___ None:
            break

        tokenlar = ___(tokenlar, eng_juftlik, merges[___])

    return tokenlar
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
def encode(matn, merges):
    tokenlar = kodla(matn)

    while len(tokenlar) >= 2:
        stats = get_stats(tokenlar)

        eng_juftlik = None
        eng_raqam = float("inf")
        for juftlik in stats:
            raqam = merges.get(juftlik, float("inf"))
            if raqam < eng_raqam:
                eng_raqam = raqam
                eng_juftlik = juftlik

        if eng_juftlik is None:
            break

        tokenlar = merge(tokenlar, eng_juftlik, merges[eng_juftlik])

    return tokenlar
```

Uchta eng ko'p xato:

1. `if raqam > eng_raqam` — **eng kattasini** izlash. Natija: teskari tartib,
   1-bo'limdagi muammo.
2. `eng_raqam = 0` — `inf` o'rniga nol. Unda hech qachon hech narsa
   tanlanmaydi (`raqam < 0` hech qachon rost bo'lmaydi), va funksiya
   baytlarni o'zgarishsiz qaytaradi. **Xato bermaydi** — shunchaki hech narsa
   qilmaydi.
3. `while len(tokenlar) >= 1` — bitta token qolganda `get_stats` bo'sh
   qaytaradi, `eng_juftlik` `None` bo'ladi, `break` ishlaydi. Ya'ni bu xato
   **ishlaydi**, lekin bitta ortiqcha aylanish qiladi.
</details>

---

## 13. Mashqlar

---

**Mashq 1.** `encode("la", merges)` va `encode("lar", merges)` nima qaytaradi?

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(encode("la", merges))    # [256]
print(encode("lar", merges))   # [257]
```

`la` → 256 (bitta token), `lar` → 257 (bitta token).

Diqqat: `lar` **ikkita** birlashtirish natijasi (`l+a`, keyin `la+r`), lekin
oxirida bitta token.

Uch harf → bitta token. Bu aynan biz xohlagan narsa.
</details>

---

**Mashq 2.** Nima uchun bu ikkisi har xil?

```python
print(len(encode("bolalar", merges)))
print(len(encode("Bolalar", merges)))
```

<details>
<summary>Javobni ko'rsatish</summary>

```
3
4
```

- `bolalar` → `[270, 256, 257]` = `bo` + `la` + `lar`
- `Bolalar` → `[66, 111, 256, 257]` = `B` + `o` + `la` + `lar`

Katta `B` (66) va kichik `b` (98) — **boshqa baytlar** (Dars 05). Tokenizator
`bo` juftligini o'rgangan, `Bo` ni esa o'rganmagan (matnda u kamroq uchragan).

Shuning uchun katta harfli so'z bitta token ko'proq turadi.

**Amaliy xulosa:** agar matnni oldindan kichik harfga o'tkazsangiz
(`.lower()`), lug'at joyi tejaladi. Lekin unda model katta harflarni umuman
yo'qotadi. Bu — haqiqiy tanlov, va ikkala yo'lning ham narxi bor.
</details>

---

**Mashq 3.** `merges` ni bo'sh lug'at qilib `encode` ga bering. Nima bo'ladi?

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(encode("bolalar", {}))
```

```
[98, 111, 108, 97, 108, 97, 114]
```

Sof baytlar — Dars 07 dagi tokenizator.

Nima bo'ldi: `merges.get(juftlik, float("inf"))` hamma juftlik uchun `inf`
qaytardi. `inf < inf` yolg'on, shuning uchun `eng_juftlik` `None` bo'lib qoldi
va birinchi aylanishdayoq `break` ishladi.

**Bu — to'g'ri xulq.** Birlashtirish yo'q bo'lsa, natija bayt darajasida
bo'lishi kerak. Va hech qanday maxsus tekshiruv yozmadik — `inf` o'zi hal qildi.
</details>

---

**Mashq 4.** `encode` ni ikki marta ketma-ket qo'llasangiz nima bo'ladi?

```python
a = encode("bolalar", merges)
b = encode(decode(a, vocab), merges)
print(a == b)
```

<details>
<summary>Javobni ko'rsatish</summary>

```
True
```

`encode` → `decode` → `encode` bir xil natija beradi.

Bu **barqarorlik** (idempotence) deb ataladi va u muhim xususiyat: matnni
kodlab, dekodlab, qayta kodlasangiz — hech narsa o'zgarmaydi.

Agar bu `False` bo'lsa, tokenizatoringizda jiddiy xato bor: har bir
kodlash-dekodlash aylanishi matnni asta-sekin buzadi.

**Bu sinovni Dars 18 da klassga qo'shing.** U round-trip sinoviga qaraganda
kuchliroq.
</details>

---

**Mashq 5 (eng muhimi).** Tokenizatorni **o'z matningizda** o'qiting
(`vocab_size = 406`), keyin fertility ni ikki joyda o'lchang: o'quv matnida
va yangi jumlada. Farq qancha?

<details>
<summary>Javobni ko'rsatish</summary>

```python
m2, v2, t2 = train(matn, 406)

yangi = "Talabalar universitetga kirishdi va imtihonlarni topshirishdi."
te2 = encode(yangi, m2)

print("oʻqigan matn:", round(len(t2) / len(matn.split()), 3))
print("yangi matn  :", round(len(te2) / len(yangi.split()), 3))
```

```
oʻqigan matn: 1.472
yangi matn  : 6.167
```

Oʻqigan matnda **1.472** (Dars 10 dagi chiroyli raqam).
Yangi matnda **6.167** — toʻrt barobardan koʻproq yomon.

**Farq nima uchun bunchalik katta?** Chunki 150 ta birlashtirishning
ko'pchiligi **matnga xos** edi — `maktabga borishdi. U` kabi. Ular yangi
matnda umuman uchramaydi.

Ya'ni lug'atning katta qismi **o'lik og'irlik**: joy egallaydi, foyda bermaydi.

Ikkita raqam orasidagi farq — bu **yodlab olishning o'lchovi**. Farq qancha
katta bo'lsa, tokenizator shuncha ko'p yodlagan va shuncha kam o'rgangan.

Haqiqiy tokenizatorda (16 384 token, millionlab so'zli korpus) bu farq
juda kichik bo'ladi — chunki u yodlashga ulgurmaydi.

**Dars 17 da bu farqni to'g'ri o'lchashni o'rganamiz.**
</details>

---

## 14. Xulosa

1. Birlashtirishlar **o'qitilgan tartibda** qo'llanilishi shart. Aks holda
   boshqa tokenlar chiqadi va model ularni tanimaydi.
2. `encode_oddiy` — hamma birlashtirishni tartib bilan qo'llash. To'g'ri,
   lekin `merges` hajmiga qarab sekinlashadi.
3. Tez `encode` — har qadamda **eng erta o'rganilgan mavjud** juftlikni
   birlashtirish. Vaqti `merges` hajmiga bog'liq emas.
4. 16 128 ta birlashtirishda farq — **378 barobar**. Lekin 20 tada oddiy usul
   tezroq: "tezroq algoritm" har doim tezroq emas.
5. `float("inf")` ikki ish qiladi: minimum uchun boshlang'ich qiymat, va
   "o'rganilmagan juftlikni hech qachon tanlama" belgisi.
6. **Asosiy sinov:** `encode(matn) == train dagi tokenlar`.
7. Fertility o'qigan matnda 5.396, yangi matnda 6.833. **Haqiqiysi —
   ikkinchisi.**

---

## Keyingi dars

Tokenizator to'liq ishlaydi. Endi uni **yaxshilaymiz**.

**Dars 13 — So'z chegarasi muammosi.** `b'lar '`, `b'maktabga borishdi. U'` —
bo'shliq va tinish belgilari token ichiga kirib ketyapti. Buni regex bilan
to'xtatamiz.

Keyingi darsning savoli: *`bolalar`, `bolalar,`, `bolalarni`, `bolalar.` —
bular tokenizator uchun necha xil narsa, va nechta bo'lishi kerak?*
