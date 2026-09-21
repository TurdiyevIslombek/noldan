# Dars 09 — Birlashtirish (`merge`)

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 08 — Juftlarni sanash
> **Vaqt:** ~55 daqiqa
> **Kerak:** Dars 01–08. `get_stats`, ro'yxat, `if`, funksiya

---

## Bu darsdan keyin siz...

- **bilasiz** nima uchun `for` tsikli bu ish uchun yaramasligini — o'z ko'zingiz bilan;
- **yozasiz** `while` tsiklini va uni to'g'ri to'xtatasiz;
- **qurasiz** `merge` funksiyasini — kursdagi eng qiyin sakkiz qator;
- **tushunasiz** `and` ning qisqa tutashuvini va u qanday qilib xatoni yashirishini;
- **ko'rasiz** algoritm `lar` qo'shimchasini ikki qadamda o'zi yasashini.

---

## 1. Bitta savol

Dars 08 oxirida savol qoldirgan edim:

> Ro'yxat bo'ylab yurayotib uning **uzunligini o'zgartirsangiz** nima bo'ladi?

Sinab ko'ramiz. Vazifa: `[98, 111, 108, 97, 108, 97, 114]` ro'yxatidagi
`(108, 97)` juftliklarini `256` ga almashtirish.

Eng tabiiy urinish — `for` tsikli bilan, joyida tahrirlash:

```python
tokenlar = [98, 111, 108, 97, 108, 97, 114]
yangi = list(tokenlar)

for i in range(len(yangi)):
    if yangi[i] == 108 and yangi[i + 1] == 97:
        yangi[i] = 256
        del yangi[i + 1]

print(yangi)
```

**Natija:**

```
IndexError: list index out of range
```

Nima bo'ldi:

- `range(len(yangi))` tsikl boshlanishida **bir marta** hisoblanadi — 7 ta element,
  demak `i` 0 dan 6 gacha boradi.
- Lekin `del` har safar ro'yxatni **qisqartiradi**. Ikkita `del` dan keyin ro'yxatda
  atigi 5 ta element qoladi.
- `i` esa baribir 6 gacha yuraveradi. 5-manzil yo'q, 6-manzil yo'q.

**`for` tsikli o'zgarmas uzunlik uchun mo'ljallangan.** U boshida "necha marta
aylanaman" deb hal qiladi va keyin fikrini o'zgartirmaydi.

<!-- animatsiya: k1 | for tsikli qulaydi -->

Bizga esa boshqa narsa kerak: **har qadamda o'zim qaror qiladigan** tsikl.
Ba'zan bir qadam, ba'zan ikki qadam oldinga.

---

## 2. `while` — o'zingiz boshqaradigan tsikl

```python
i = 0
while i < 5:
    print(i, end=" ")
    i += 1
```

**Natija:**

```
0 1 2 3 4
```

Tuzilishi:

```
while  shart:
    tana
```

Ma'nosi: **"shart rost ekan — tanani takrorla"**. Har aylanishdan oldin shart
qayta tekshiriladi.

`for` bilan solishtiring:

| | `for` | `while` |
|---|---|---|
| Ma'nosi | "har bir element uchun" | "shart rost ekan" |
| Hisoblagich | Python boshqaradi | **siz boshqarasiz** |
| Qachon ishlatiladi | nechta aylanish kerakligi ma'lum | oldindan ma'lum emas |

`end=" "` — `print` ning parametri: qator oxiriga yangi qator emas, bo'shliq
qo'yadi. Shuning uchun hammasi bir qatorda chiqdi.

### Qadamni o'zingiz tanlaysiz

```python
i = 0
while i < 10:
    print(i, end=" ")
    i += 2
```

```
0 2 4 6 8
```

`i += 2` — ikkitadan sakraydi. **Mana shu narsa bizga kerak bo'ladi:** juftlikni
birlashtirganda ikkita tokenni bir vaqtda "iste'mol qilamiz", demak ikki qadam
oldinga yurishimiz kerak.

### ⚠️ Cheksiz tsikl

`while` da bitta jiddiy xavf bor:

```python
i = 0
while i < 5:
    print(i)
    # i += 1  ni unutdik!
```

Bu **hech qachon tugamaydi**. `i` o'zgarmaydi, shart har doim rost qoladi,
tsikl abadiy aylanaveradi.

Colab'da bu bo'lsa: chap tomondagi **⏹ (to'xtatish)** tugmasini bosing.

**Qoida:** `while` yozganingizda darhol o'zingizga savol bering — *shart qachon
yolg'on bo'ladi?* Javob topolmasangiz, tsikl noto'g'ri.

Bizning holatda: `i < len(tokenlar)`, va `i` har aylanishda kamida bittaga
oshadi. Demak u albatta `len(tokenlar)` ga yetadi. ✓

---

## 3. `merge` — qadam-baqadam

Endi funksiyani quramiz. G'oyasi:

> Ro'yxat bo'ylab yuramiz. Har qadamda qaraymiz: **shu yerdan juftlik
> boshlanadimi?**
> - Ha bo'lsa → natijaga **yangi token** qo'shamiz va **ikki** qadam sakraymiz
> - Yo'q bo'lsa → natijaga **hozirgi tokenni** qo'shamiz va **bir** qadam yuramiz

Diqqat: biz eski ro'yxatni **tahrirlamayapmiz**. Yangisini yig'yapmiz. Shuning
uchun uzunlik o'zgarishi bizga xalaqit bermaydi.

```python
def merge(tokenlar, juftlik, yangi_id):
    yangi = []
    i = 0
    while i < len(tokenlar):
        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:
            yangi.append(yangi_id)
            i += 2
        else:
            yangi.append(tokenlar[i])
            i += 1
    return yangi
```

**Sakkiz qator. Kursdagi eng qiyin funksiya.** Har birini alohida ko'ramiz.

### Parametrlar

- `tokenlar` — kirish ro'yxati, masalan `[98, 111, 108, 97, 108, 97, 114]`
- `juftlik` — nimani qidiramiz, masalan `(108, 97)`
- `yangi_id` — nima bilan almashtiramiz, masalan `256`

### `yangi = []` va `i = 0`

Bo'sh natija ro'yxati (Dars 03 naqshi) va ko'rsatkich. `i` — bu bizning
"barmog'imiz", ro'yxat bo'ylab suriladi.

### `while i < len(tokenlar):`

Barmoq ro'yxat ichida turgan ekan — davom etamiz.

> ⚠️ `len(tokenlar)` har aylanishda qayta hisoblanadi, lekin `tokenlar`
> o'zgarmaydi — biz uni tahrirlamayapmiz. Shuning uchun bu xavfsiz.

### Shart — uchta qism

```python
if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:
```

Uchta shart `and` bilan bog'langan. **Hammasi rost bo'lishi kerak:**

1. `i < len(tokenlar) - 1` — oldinda yana kamida bitta token bormi?
2. `tokenlar[i] == juftlik[0]` — hozirgi token juftlikning birinchi yarmimi?
3. `tokenlar[i + 1] == juftlik[1]` — keyingisi ikkinchi yarmimi?

### Ha bo'lsa

```python
yangi.append(yangi_id)
i += 2
```

Yangi tokenni qo'yamiz va **ikkita** tokendan sakrab o'tamiz — ikkalasi ham
iste'mol qilindi.

### Yo'q bo'lsa

```python
yangi.append(tokenlar[i])
i += 1
```

Tokenni o'zgartirmasdan ko'chiramiz va **bitta** qadam yuramiz.

<!-- animatsiya: k2 | merge ichidan -->

---

## 4. Sinaymiz

```python
print(merge([1, 2, 1, 2, 1], (1, 2), 256))
print(merge([1, 1, 1],       (1, 1), 256))
print(merge([1, 1, 1, 1],    (1, 1), 256))
print(merge([1, 2, 3],       (9, 9), 256))
```

**Natija:**

```
[256, 256, 1]
[256, 1]
[256, 256]
[1, 2, 3]
```

Har birini tekshiring:

- `[1, 2, 1, 2, 1]` → ikkita juftlik topildi, oxirgi `1` yolg'iz qoldi ✓
- `[1, 1, 1]` → **bitta** birlashtirish, uchinchi `1` qoldi ✓
- `[1, 1, 1, 1]` → ikkita birlashtirish ✓
- `[1, 2, 3]` da `(9, 9)` yo'q → ro'yxat **o'zgarmasdan** qaytdi ✓

**Ikkinchi va uchinchi natijaga alohida qarang.** Dars 08 da aynan shuni
bashorat qilgan edik:

| Ro'yxat | `get_stats` sanadi | `merge` bajardi |
|---|---|---|
| `[1, 1, 1]` | 2 | **1** |
| `[1, 1, 1, 1]` | 3 | **2** |

Sanoq va birlashtirish farq qildi — va `merge` **to'g'ri** ishladi. Sababi:
`i += 2`. Birinchi juftlikni olganimizda ikkala `1` ni ham iste'mol qildik,
shuning uchun ikkinchi (ustma-ust tushgan) juftlik umuman ko'rilmadi.

**Ustma-ust tushish muammosi `i += 2` bilan hal bo'ldi.** Bitta qator.

### `bolalar` da

```python
t = kodla("bolalar")
print("oldin :", t, len(t))

t2 = merge(t, (108, 97), 256)
print("keyin :", t2, len(t2))
```

```
oldin : [98, 111, 108, 97, 108, 97, 114] 7
keyin : [98, 111, 256, 256, 114] 5
```

**7 token → 5 token.** Ikkita `la` bitta tokenga aylandi.

---

## 5. Chegara tekshiruvi va `and` ning qisqa tutashuvi

Endi shartning **birinchi** qismiga qaytamiz:

```python
i < len(tokenlar) - 1
```

Nima uchun kerak? Uni **olib tashlab** ko'ramiz:

```python
def merge_xato(tokenlar, juftlik, yangi_id):
    yangi = []
    i = 0
    while i < len(tokenlar):
        if tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:
            yangi.append(yangi_id)
            i += 2
        else:
            yangi.append(tokenlar[i])
            i += 1
    return yangi
```

To'rtta kirishda sinaymiz:

```python
print(merge_xato([98, 111, 108, 97], (108, 97), 256))
print(merge_xato([1, 2, 3],          (9, 9),    256))
print(merge_xato([1, 2, 108],        (108, 97), 256))
```

**Natija:**

```
[98, 111, 256]
[1, 2, 3]
IndexError: list index out of range
```

**To'xtang va buni diqqat bilan qarang.**

Birinchi ikkitasi **ishladi**. Uchinchisi **qulab tushdi**. Nima uchun?

### `and` qisqa tutashuvi

Python `A and B` ni tekshirganda: agar `A` **yolg'on** bo'lsa, `B` ni
**umuman hisoblamaydi**. Natija baribir yolg'on bo'ladi, demak tekshirishning
ma'nosi yo'q.

Bu **qisqa tutashuv** (short-circuit) deb ataladi.

Endi uchala holatni ko'ring, oxirgi element ustida:

| Ro'yxat | Oxirgi element | `tokenlar[i] == 108` | `tokenlar[i+1]` hisoblanadimi? |
|---|---|---|---|
| `[98, 111, 108, 97]` | `97` | `97 == 108` → **yolg'on** | yo'q — qutuldik |
| `[1, 2, 3]` | `3` | `3 == 108` → **yolg'on** | yo'q — qutuldik |
| `[1, 2, 108]` | `108` | `108 == 108` → **rost** | **ha → IndexError** |

**Xato faqat oxirgi element juftlikning birinchi yarmiga teng bo'lganda chiqadi.**

Bu — dasturlashdagi eng yomon turdagi xato. U:
- **ko'p hollarda chiqmaydi** — siz kodni sinab ko'rasiz, ishlaydi, ishonasiz
- **tasodifiy ma'lumotda chiqadi** — million tokenli korpusda albatta chiqadi
- **sizni chalg'itadi** — "kecha ishlagan edi-ku"

`i < len(tokenlar) - 1` shartini **birinchi** qo'yish uni butunlay oldini oladi:
agar oldinda token qolmagan bo'lsa, qolgan ikkita shart umuman tekshirilmaydi.

> **Qoida:** `and` bilan bog'langan shartlarda **himoya shartini birinchi qo'ying.**
> Tartib muhim. `A and B` va `B and A` bir xil natija beradi, lekin bittasi
> qulab tushishi mumkin.

---

## 6. Ikkita birlashtirish ketma-ket

Endi eng qiziq qismi. Bitta birlashtirish qilib, keyin **qaytadan sanaymiz** va
yana birlashtiramiz.

```python
matn = "bolalar kitoblarni oʻqishdi va daftarlarga yozishdi"
t = kodla(matn)
print("boshlangʻich:", len(t), "token")

# --- 1-birlashtirish ---
stats = get_stats(t)
eng = max(stats, key=stats.get)
print("1-juftlik:", eng, repr(dekodla(list(eng))), stats[eng], "marta")
t = merge(t, eng, 256)
print("256 dan keyin:", len(t), "token")

# --- 2-birlashtirish ---
stats = get_stats(t)
eng2 = max(stats, key=stats.get)
print("2-juftlik:", eng2, stats[eng2], "marta")
t = merge(t, eng2, 257)
print("257 dan keyin:", len(t), "token")
```

**Natija:**

```
boshlangʻich: 52 token
1-juftlik: (108, 97) 'la' 4 marta
256 dan keyin: 48 token
2-juftlik: (256, 114) 3 marta
257 dan keyin: 45 token
```

52 → 48 → 45. Har birlashtirish matnni qisqartiryapti.

**Endi ikkinchi juftlikka qarang: `(256, 114)`.**

`256` — bu bizning **yangi** tokenimiz, `la`. `114` — bu `r`.

Ya'ni algoritm `la` va `r` ni birlashtirmoqchi. Natija nima bo'ladi?

```python
vocab = {}
for x in range(256):
    vocab[x] = bytes([x])

vocab[256] = vocab[108] + vocab[97]
vocab[257] = vocab[eng2[0]] + vocab[eng2[1]]

print("256 =", vocab[256])
print("257 =", vocab[257])
```

**Natija:**

```
256 = b'la'
257 = b'lar'
```

---

## 7. To'xtang — nima bo'lganini ko'ring

Algoritm ikki qadamda **`lar`** qo'shimchasini yasadi:

```
1-qadam:  l + a    →  la     (256)
2-qadam:  la + r   →  lar    (257)
```

Va e'tibor bering: ikkinchi qadam **birinchisining ustiga qurildi**. `lar` ni
yasash uchun algoritm `la` ni qayta yasashi kerak bo'lmadi — u allaqachon bitta
token edi.

**Mana shu — BPE ning kuchi.** Har bir yangi token oldingilarining ustiga
quriladi:

```
l, a, r  →  la  →  lar  →  lari  →  larida  ...
```

Uchta harfdan boshlab, algoritm butun qo'shimchani, keyin qo'shimchalar
zanjirini yasay oladi. Va buning uchun unga hech kim o'zbek grammatikasini
o'rgatmadi — Dars 08 dagi kabi, u faqat sanaydi.

**16 128 marta takrorlansa**, sizning lug'atingizda `lar`, `lari`, `larida`,
`bolalar`, `kitoblar` kabi tokenlar paydo bo'ladi. Aynan shuning uchun
`fertility` 8.938 dan 1.839 gacha tushadi.

<!-- animatsiya: k3 | lar yasaldi -->

---

## 8. `aaaa` sinovi

Dars 08 da va'da qilgan edim. Sinaymiz:

```python
print(kodla("aaaa"))
print(merge(kodla("aaaa"), (97, 97), 256))
print(merge([97, 97, 97, 97, 97],     (97, 97), 256))
print(merge([97, 97, 97, 97, 97, 97], (97, 97), 256))
```

**Natija:**

```
[97, 97, 97, 97]
[256, 256]
[256, 256, 97]
[256, 256, 256]
```

- 4 ta `a` → 2 ta yangi token, hech narsa qolmadi
- 5 ta `a` → 2 ta yangi token + 1 ta yolg'iz `a`
- 6 ta `a` → 3 ta yangi token

Dars 08 dagi formula: `n` ta bir xil element → `n // 2` ta birlashtirish.
4//2 = 2 ✓, 5//2 = 2 ✓, 6//2 = 3 ✓.

**`merge` ustma-ust tushishni to'g'ri hal qildi**, va buning uchun hech qanday
maxsus kod yozilmadi. `i += 2` ning o'zi yetdi.

---

## 9. Chekka holatlar

```python
print(merge([],  (1, 2), 256))
print(merge([5], (1, 2), 256))
```

```
[]
[5]
```

Bo'sh ro'yxat → bo'sh natija. Bitta element → o'zgarmasdan qaytadi (`while`
bir marta aylanadi, shart yolg'on bo'ladi, `else` ishlaydi).

Yana bir marta: **hech qanday `if len(...) == 0` tekshiruvi yozmadik.** Yaxshi
yozilgan tsikl chekka holatlarni o'zi to'g'ri hal qiladi.

---

## 10. Muammo

Bizda endi ikkita funksiya bor:

- `get_stats` — eng ko'p uchraydigan juftlikni topadi
- `merge` — uni almashtiradi

Va biz ularni **qo'lda** ikki marta ishlatdik: 256, keyin 257.

Lug'atni 16 384 gacha yetkazish uchun buni **16 128 marta** takrorlash kerak.
Qo'lda yozib chiqib bo'lmaydi.

Kerak bo'lgan narsa: tsikl ichida `get_stats` va `merge` ni navbatma-navbat
chaqirish, va har safar yangi token raqamini bittaga oshirish. Shu bilan birga
qaysi juftlik qaysi raqamga aylanganini **eslab qolish** kerak — aks holda
keyin dekodlab bo'lmaydi.

Bu keyingi darsning mavzusi.

---

## 11. To'liq kod

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


def merge(tokenlar, juftlik, yangi_id):
    yangi = []
    i = 0
    while i < len(tokenlar):
        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:
            yangi.append(yangi_id)
            i += 2
        else:
            yangi.append(tokenlar[i])
            i += 1
    return yangi


# ---- Sinov ----
print(merge([1, 2, 1, 2, 1], (1, 2), 256))
print(merge([1, 1, 1],       (1, 1), 256))
print(merge([1, 1, 1, 1],    (1, 1), 256))
print(merge([1, 2, 3],       (9, 9), 256))

# ---- Ikkita birlashtirish ----
matn = "bolalar kitoblarni oʻqishdi va daftarlarga yozishdi"
t = kodla(matn)
vocab = {}
for x in range(256):
    vocab[x] = bytes([x])

print("boshlangʻich:", len(t), "token")

stats = get_stats(t)
eng = max(stats, key=stats.get)
t = merge(t, eng, 256)
vocab[256] = vocab[eng[0]] + vocab[eng[1]]
print("256 =", vocab[256], "|", len(t), "token")

stats = get_stats(t)
eng2 = max(stats, key=stats.get)
t = merge(t, eng2, 257)
vocab[257] = vocab[eng2[0]] + vocab[eng2[1]]
print("257 =", vocab[257], "|", len(t), "token")
```

**Kutilgan natija:**

```
[256, 256, 1]
[256, 1]
[256, 256]
[1, 2, 3]
boshlangʻich: 52 token
256 = b'la' | 48 token
257 = b'lar' | 45 token
```

---

## 12. O'zingiz yozing

```python
# merge funksiyasini toʻldiring

def merge(tokenlar, juftlik, yangi_id):
    yangi = ___                      # boʻsh roʻyxat
    i = ___                          # boshlangʻich koʻrsatkich
    while i ___ len(tokenlar):
        if i < len(tokenlar) ___ 1 and tokenlar[i] == juftlik[___] and tokenlar[i + 1] == juftlik[___]:
            yangi.append(___)        # yangi tokenni qoʻy
            i += ___                 # ikkita tokendan sakra
        else:
            yangi.append(tokenlar[___])
            i += ___
    return ___

# Sinov — bu natijalarni olishingiz kerak:
print(merge([1, 1, 1], (1, 1), 256))      # [256, 1]
print(merge([5, 6, 5, 6], (5, 6), 99))    # [99, 99]
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
def merge(tokenlar, juftlik, yangi_id):
    yangi = []
    i = 0
    while i < len(tokenlar):
        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:
            yangi.append(yangi_id)
            i += 2
        else:
            yangi.append(tokenlar[i])
            i += 1
    return yangi
```

Eng ko'p xato qilinadigan uchta joy:

1. `i += 2` o'rniga `i += 1` — natijada ustma-ust tushish xatosi chiqadi va
   `[1, 1, 1]` → `[256, 256]` bo'ladi (noto'g'ri, chunki uchta `1` dan ikkita
   juftlik yasab bo'lmaydi).
2. `juftlik[0]` va `juftlik[1]` ni almashtirib yuborish — juftlik teskari
   qidiriladi.
3. `- 1` ni unutish — 5-bo'limdagi yashirin `IndexError`.
</details>

---

## 13. Mashqlar

---

**Mashq 1.** `merge([7, 8, 9], (7, 8), 100)` nima qaytaradi?

<details>
<summary>Javobni ko'rsatish</summary>

```
[100, 9]
```

`i = 0`: `7` va `8` mos keldi → `100` qo'yiladi, `i` 2 ga aylanadi.
`i = 2`: `2 < 2` yolg'on → `else` → `9` ko'chiriladi.

3 ta token → 2 ta token.
</details>

---

**Mashq 2.** Bu ikkisi nima uchun har xil natija beradi?

```python
print(merge([1, 2, 1, 2], (1, 2), 9))
print(merge([1, 2, 1, 2], (2, 1), 9))
```

<details>
<summary>Javobni ko'rsatish</summary>

```
[9, 9]
[1, 9, 2]
```

Birinchisi `(1, 2)` ni qidiradi — u ikki marta uchraydi, ikkalasi ham
birlashtiriladi.

Ikkinchisi `(2, 1)` ni qidiradi — u faqat **o'rtada** bir marta uchraydi
(2-manzil va 3-manzil orasida... aniqrog'i 1-manzildagi `2` va 2-manzildagi `1`).
Natijada chetdagi `1` va `2` yolg'iz qoladi.

**Juftlikdagi tartib muhim.** `(1, 2)` va `(2, 1)` — ikki xil juftlik.
Shuning uchun Dars 03 da kortej kerak edi: u tartibni saqlaydi.
</details>

---

**Mashq 3.** `merge` ni shunday o'zgartiringki, u `i += 2` o'rniga `i += 1`
qilsin. `[1, 1, 1]` da nima chiqadi va nima uchun bu noto'g'ri?

<details>
<summary>Javobni ko'rsatish</summary>

```python
def merge_buzuq(tokenlar, juftlik, yangi_id):
    yangi = []
    i = 0
    while i < len(tokenlar):
        if i < len(tokenlar) - 1 and tokenlar[i] == juftlik[0] and tokenlar[i + 1] == juftlik[1]:
            yangi.append(yangi_id)
            i += 1                      # ← xato: 2 oʻrniga 1
        else:
            yangi.append(tokenlar[i])
            i += 1
    return yangi


print(merge_buzuq([1, 1, 1], (1, 1), 256))   # [256, 256, 1]
```

**Noto'g'ri.** Uchta `1` dan ikkita juftlik yasab bo'lmaydi — o'rtadagi `1`
ikki marta ishlatildi.

Buni tekshirish oson: birlashtirilgan tokenlarni qaytadan ochsak,
`[256, 256, 1]` → `1,1` + `1,1` + `1` = **beshta** `1`. Boshida esa uchta edi.

**Ma'lumot yaratildi.** Bu round-trip ni buzadi: `dekodla(kodla(x))` endi
`x` ga teng bo'lmaydi.

`i += 2` shuning uchun kerak: birlashtirilgan ikkita token **iste'mol qilinadi**,
ular keyingi juftlikda qatnasha olmaydi.
</details>

---

**Mashq 4.** `merge` chaqirilgandan keyin **asl** ro'yxat o'zgaradimi?

```python
t = [1, 2, 3]
natija = merge(t, (1, 2), 9)
print(t)
print(natija)
```

<details>
<summary>Javobni ko'rsatish</summary>

```
[1, 2, 3]
[9, 3]
```

**Asl ro'yxat o'zgarmaydi.** `merge` yangi ro'yxat yasaydi va uni qaytaradi.

Bu ataylab shunday: agar u asl ro'yxatni tahrirlaganida, 1-bo'limdagi
muammo qaytardi.

Shuning uchun uni ishlatganda natijani **saqlab olish kerak**:

```python
t = merge(t, juftlik, 256)     # ✓ toʻgʻri
merge(t, juftlik, 256)         # ✗ natija yoʻqoladi
```

Dars 02 dagi `.replace()` tuzog'i bilan bir xil naqsh.
</details>

---

**Mashq 5 (eng muhimi).** Uchta birlashtirishni ketma-ket bajaring va har
safar `vocab` ga yangi tokenni qo'shing. Uchinchi token nima bo'ladi?

```python
matn = "bolalar kitoblarni oʻqishdi va daftarlarga yozishdi"
```

<details>
<summary>Javobni ko'rsatish</summary>

```python
t = kodla(matn)
vocab = {}
for x in range(256):
    vocab[x] = bytes([x])

for yangi_id in [256, 257, 258]:
    stats = get_stats(t)
    eng = max(stats, key=stats.get)
    t = merge(t, eng, yangi_id)
    vocab[yangi_id] = vocab[eng[0]] + vocab[eng[1]]
    print(yangi_id, "=", vocab[yangi_id], "|", len(t), "token")
```

```
256 = b'la' | 48 token
257 = b'lar' | 45 token
258 = b'i ' | 43 token
```

Uchinchisi — **`i ` (harf va boʻshliq)**. Bu soʻz oxiri: `kitoblarni`,
`oʻqishdi`, `yozishdi` — hammasi `i` bilan tugaydi va keyin boʻshliq keladi.

Bu qiziq va biroz xavotirli. Algoritm **soʻz chegarasini** token ichiga
kiritdi — `i` va boʻshliq endi bitta narsa. Dars 13 da bu muammoga
aylanadi va biz uni hal qilamiz.

**Va e'tibor bering: bu kod endi tsikl ichida.** Uchta birlashtirishni
qo'lda yozmadik — `for yangi_id in [256, 257, 258]` bilan avtomatlashtirdik.

Keyingi darsda aynan shu tsiklni 16 128 gacha kengaytiramiz.
</details>

---

## 14. Xulosa

1. `for` tsikli uzunligi o'zgaradigan ro'yxat uchun **yaramaydi** — u aylanishlar
   sonini boshida hal qiladi.
2. `while shart:` — siz boshqaradigan tsikl. Har doim o'zingizdan so'rang:
   *shart qachon yolg'on bo'ladi?*
3. `merge` eski ro'yxatni tahrirlamaydi — **yangisini yig'adi**.
4. `i += 2` — birlashtirilgan ikkita token iste'mol qilinadi. Ustma-ust tushish
   muammosi shu bitta qator bilan hal bo'ladi.
5. `i < len(tokenlar) - 1` — chegara himoyasi. `and` qisqa tutashuvi tufayli
   u **birinchi** turishi shart.
6. Har bir yangi token oldingilarining ustiga quriladi: `l + a → la`,
   keyin `la + r → lar`.

---

## Keyingi dars

Ikkita funksiya tayyor. Endi ularni tsiklga solamiz.

**Dars 10 — Trening tsikli.** `get_stats` va `merge` ni yuzlab marta
navbatma-navbat chaqiramiz, `merges` jadvalini yig'amiz va lug'atning
o'sishini kuzatamiz.

Keyingi darsning savoli: *birlashtirishlar tartibini eslab qolish nima uchun
shart?* Javob Dars 12 da (`encode`) ochiladi, lekin jadvalni **hozir** to'g'ri
yig'ish kerak — aks holda keyin hamma narsa buziladi.
