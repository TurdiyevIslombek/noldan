# Dars 01 — Nega o'zbek tili AI uchun qimmat?

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** yo'q — bu birinchi dars
> **Vaqt:** ~40 daqiqa
> **Kerak:** hech narsa. Kod yozmagan bo'lsangiz ham, bu dars siz uchun.

---

## Bu darsdan keyin siz...

- **bilasiz** nima uchun ChatGPT o'zbek tilida yomonroq va qimmatroq ishlashini;
- **yozasiz** o'zingizning birinchi dasturingizni;
- **ko'rasiz** birinchi xatoyingizni — va uni o'qishni o'rganasiz;
- **sanaysiz** matndagi belgilar va so'zlar sonini kod bilan;
- **isbotlaysiz** o'zbekcha jumla inglizchasidan uzunroq ekanini — o'z kodingiz bilan.

---

## 1. Bitta savol

ChatGPT'ga ikki xil savol beramiz. Ma'nosi bir xil.

Inglizcha: **I like reading**
O'zbekcha: **Men oʻqishni yaxshi koʻraman**

Ikkalasi ham bir xil narsani aytadi. Endi diqqat qiling — ChatGPT bu jumlalarni
o'qiyotganda ularni bo'laklarga bo'ladi. Va bo'laklar soni bir xil emas:

| Jumla | ChatGPT necha bo'lakka bo'ladi |
|---|---|
| I like reading | **3** |
| Men oʻqishni yaxshi koʻraman | **9** |

Uch barobar ko'p.

<!-- animatsiya: c1 | Bir xil jumla, ikki narx -->

Bu bo'laklarning nomi bor — ular **token** deb ataladi. Va bu raqam juda muhim,
chunki:

- **Siz pulni token uchun to'laysiz.** Uch barobar ko'p token — uch barobar qimmat.
- **Javob sekinroq keladi.** Model har bir tokenni alohida ishlaydi.
- **Model kamroq eslab qoladi.** Modelning "xotirasi" token bilan o'lchanadi.
  Bir xil xotiraga o'zbekcha matndan uch barobar kam sig'adi.

Ya'ni: **bir xil ish uchun o'zbek tilida gapiradigan odam ko'proq to'laydi, uzoqroq
kutadi va yomonroq javob oladi.**

Bu adolatsizlik, va bu tasodif emas. Buni tuzatish mumkin. Bu kursda biz uni tuzatadigan
narsani — **tokenizator**ni — noldan quramiz.

> Buni o'zingiz tekshirishingiz mumkin: **tiktokenizer.vercel.app** saytiga kiring va
> ikkala jumlani yozib ko'ring. Bo'laklar rangli ko'rinadi.

---

## 2. Tokenizator nima?

Kompyuter harfni tushunmaydi. U faqat **raqam** bilan ishlaydi. Demak, matn modelga
kirishidan oldin kimdir uni raqamga aylantirishi kerak.

> **Tokenizator** — bu matnni bo'laklarga bo'lib, har bir bo'lakka raqam beradigan
> dastur. Va orqaga: raqamlarni yana matnga aylantiradi.

```
"Men oʻqishni"  →  tokenizator  →  [1523, 88, 9041]  →  MODEL
                                                          ↓
"Men oʻqishni yaxshi"  ←  tokenizator  ←  [1523, 88, 9041, 412]
```

Tokenizator — modelning eshigi. Har bir so'z u orqali kiradi va u orqali chiqadi.

Va mana eng muhim gap: **ChatGPT ning tokenizatori ingliz tili uchun qurilgan.**
U o'zbek tilini ko'rmagan, shuning uchun o'zbekcha so'zlarni mayda bo'laklarga
maydalaydi. `koʻraman` — bitta so'z — uning uchun 3-4 ta bo'lak.

Biz o'zbek tili uchun qurilgan tokenizator yozamiz. Va u ChatGPT nikidan
**yaxshiroq** ishlaydi — o'zbek tilida.

Buni allaqachon isbotlangan raqam bilan aytaman. Har bir so'z uchun o'rtacha nechta
token kerakligi **fertility** deb ataladi (kam bo'lgani yaxshi):

| Tokenizator | Lug'at hajmi | Fertility |
|---|---|---|
| **uzbek-bpe-16k** (biz quradigan turi) | 16 384 | **1.839** |
| GPT-4o | 200 019 | 2.724 |
| GPT-2 | 50 257 | 3.584 |

O'zbek tili uchun qurilgan kichkina tokenizator, lug'ati **12 barobar kichik** bo'lsa
ham, GPT-4o nikidan yaxshiroq. Chunki u to'g'ri til uchun qurilgan.

Kurs oxirida sizda ham shunday tokenizator bo'ladi.

---

## 3. Birinchi dastur

Endi kod yozamiz. Agar siz hech qachon kod yozmagan bo'lsangiz — hech qanday muammo yo'q.
Bu dars aynan siz uchun yozilgan.

### 3.1. Qayerda yozamiz

**Google Colab** ni ishlatamiz. Bu bepul va kompyuteringizga hech narsa o'rnatish
shart emas.

1. Brauzerda **colab.research.google.com** ni oching
2. Google hisobingiz bilan kiring
3. **"New notebook"** (yangi daftar) ni bosing

Oldingizda bo'sh qutcha paydo bo'ladi. Uning nomi — **katak** (cell). Kodni shu yerga
yozasiz.

Kodni **ishga tushirish** uchun katakning chap tomonidagi ▶ tugmasini bosing, yoki
klaviaturada **Shift + Enter** bosing.

> Ishga tushirish — bu kompyuterga "yozganimni bajarib ber" deyish. Kompyuter kodni
> **yuqoridan pastga**, qator-ma-qator o'qiydi va bajaradi. Tartib muhim.

<!-- animatsiya: c2 | Dastur yuqoridan pastga oʻqiladi -->

### 3.2. `print` — kompyuterga gapirishni buyurish

Birinchi katakka shuni yozing va ishga tushiring:

```python
print("Salom, dunyo!")
```

**Natija:**

```
Salom, dunyo!
```

Tabriklayman — siz dastur yozdingiz.

Endi har bir bo'lakni tushunamiz:

- `print` — bu **buyruq**. Ma'nosi: "ekranga chiqar". Kompyuter bu so'zni biladi.
- `(` va `)` — qavslar. Buyruqqa **nimani** bajarish kerakligini shu qavslar ichida
  beramiz. Buyruqdan keyin qavs har doim kerak.
- `"Salom, dunyo!"` — bu **matn**. Dasturlashda matn **satr** (string) deb ataladi.
- `"` qo'shtirnoqlar — ular kompyuterga "bu yerdan bu yergacha bo'lgani matn" deydi.
  Ularsiz kompyuter matnni buyruq deb o'ylaydi.

Boshqa matn bilan sinab ko'ring:

```python
print("Men tokenizator quraman")
```

```
Men tokenizator quraman
```

### 3.3. Birinchi xato — va nega u yaxshi

Endi **ataylab** xato qilamiz. Qo'shtirnoqlarni olib tashlang:

```python
print(Salom)
```

**Natija:**

```
NameError: name 'Salom' is not defined
```

Kompyuter bajarmadi. U xato qaytardi.

**Shu yerda to'xtang.** Ko'p odam birinchi xatoni ko'rib qo'rqadi va "men buni
uddalay olmayman" deb o'ylaydi. Bu noto'g'ri fikr, va mana nega:

> **Xato — bu kompyuterning gapirishi. U sizni tanbeh qilmayapti, u sizga
> nima bo'lganini aytyapti.**

<!-- animatsiya: c3 | Xato — bu gap -->

Xatoni o'qishni o'rganamiz. Uni ikki bo'lakka ajrating:

- `NameError` — xatoning **turi**. "Name" = nom. Ya'ni nom bilan bog'liq muammo.
- `name 'Salom' is not defined` — xatoning **izohi**. "'Salom' nomi aniqlanmagan".

Kompyuter nima o'yladi? Qo'shtirnoqsiz `Salom` — bu matn emas, bu **nom**. Kompyuter
bunday nomni qidirdi, topolmadi va shuni aytdi.

Tuzatish — qo'shtirnoqni qaytarish:

```python
print("Salom")
```

**Buni odat qiling:** xato chiqsa, birinchi navbatda **oxirgi qatorini o'qing**.
Xato matnining eng muhim qismi har doim oxirida turadi. Kurs davomida siz yuzlab
xato ko'rasiz — bu normal. Tajribali dasturchi ham kuniga o'nlab xato oladi. Farq
shundaki, u ularni **o'qiydi**.

### 3.4. O'zgaruvchi — matnni saqlab qo'yish

Har safar matnni qayta yozish noqulay. Uni **saqlab qo'yish** mumkin:

```python
matn = "Men oʻqishni yaxshi koʻraman"
print(matn)
```

**Natija:**

```
Men oʻqishni yaxshi koʻraman
```

Bu qatorda nima bo'ldi:

- `matn` — bu **o'zgaruvchi**. Nomni o'zingiz tanlaysiz. Bu — qutining ustidagi yorliq.
- `=` — bu "teng" emas! Bu **"joyla"** degani. O'ngdagini olib, chapdagi qutiga solib
  qo'y. O'ng tomondan chap tomonga.
- Keyin `print(matn)` yozganda qo'shtirnoq **yo'q**, chunki endi `matn` — bu nom,
  matn emas. Kompyuter nomni qidiradi, quti ichiga qaraydi va u yerdagi matnni chiqaradi.

Farqni ko'ring:

```python
print("matn")
print(matn)
```

```
matn
Men oʻqishni yaxshi koʻraman
```

Birinchisi — qo'shtirnoqli, ya'ni matnning o'zi. Ikkinchisi — qutining ichidagi narsa.

> ⚠️ **O'zgaruvchi nomi qoidalari:** bo'shliq bo'lmaydi (`men matn` ❌, `men_matn` ✓),
> raqam bilan boshlanmaydi (`1matn` ❌, `matn1` ✓), o'zbekcha `ʻ` ishlatmang
> (`soʻz` ❌, `soz` ✓ — ba'zi tahrirlagichlar uni buzadi).

### 3.5. Izoh — o'zingizga yozgan eslatma

`#` belgisidan keyingi hamma narsani kompyuter **o'qimaydi**:

```python
# Bu izoh. Kompyuter buni koʻrmaydi.
matn = "Salom"   # bu ham izoh
print(matn)
```

```
Salom
```

Izoh — bu kelajakdagi o'zingizga yozilgan xat. Ikki haftadan keyin o'z kodingizga
qaraganingizda, "bu nima qilyapti?" deb o'ylamaslik uchun.

### 3.6. `len` — sanash

Endi birinchi haqiqiy foydali narsa. `len` buyrug'i matndagi **belgilar sonini**
qaytaradi:

```python
matn = "Men oʻqishni yaxshi koʻraman"
print(len(matn))
```

**Natija:**

```
28
```

- `len` — inglizcha *length* (uzunlik) so'zining qisqartmasi.
- U **sanaydi**: matnda nechta belgi bor. Bo'shliqlar ham hisobga olinadi.
- E'tibor bering: `len(matn)` **ichkarida** turibdi, `print(...)` esa tashqarida.
  Kompyuter avval ichkaridagini bajaradi (sanaydi), keyin natijani tashqaridagiga
  beradi (chiqaradi). Ichkaridan tashqariga.

Endi ikkala jumlani taqqoslaymiz:

```python
uzbekcha = "Men oʻqishni yaxshi koʻraman"
inglizcha = "I like reading"

print("oʻzbekcha:", len(uzbekcha))
print("inglizcha:", len(inglizcha))
```

**Natija:**

```
oʻzbekcha: 28
inglizcha: 14
```

- `print` ichida vergul bilan bir nechta narsa berish mumkin. Ular orasiga
  kompyuter o'zi bo'shliq qo'yadi.
- Birinchisi — qo'shtirnoqli matn (yorliq), ikkinchisi — hisoblangan son.

**28 va 14.** Bir xil ma'noli jumla, lekin o'zbekchasi **ikki barobar uzun**.

### 3.7. `.split` — so'zlarga bo'lish

Belgi emas, **so'z** sanashni xohlasak?

```python
uzbekcha = "Men oʻqishni yaxshi koʻraman"
print(uzbekcha.split())
```

**Natija:**

```
['Men', 'oʻqishni', 'yaxshi', 'koʻraman']
```

Nima bo'ldi:

- `.split()` — bu ham buyruq, lekin u **matnga tegishli**. Shuning uchun matndan keyin
  nuqta qo'yib yoziladi: `uzbekcha.split()`. Nuqta "shu narsaning ichidagi buyruq"
  degani.
- U matnni **bo'shliqlar bo'yicha** bo'ladi.
- Natija kvadrat qavs ichida chiqdi: `[...]`. Bu — **ro'yxat**. Unda 4 ta alohida
  matn bor. Ro'yxat bilan batafsil Dars 03 da shug'ullanamiz; hozir shuni bilish yetarli:
  bu bir nechta narsa bir joyda turibdi.
- `split` dan keyin ham qavs bor: `()`. Bo'sh bo'lsa ham, qavs **majburiy** — u
  kompyuterga "bu buyruqni hozir bajar" deydi.

Endi sanaymiz:

```python
uzbekcha = "Men oʻqishni yaxshi koʻraman"
inglizcha = "I like reading"

print("oʻzbekcha soʻzlar:", len(uzbekcha.split()))
print("inglizcha soʻzlar:", len(inglizcha.split()))
```

**Natija:**

```
oʻzbekcha soʻzlar: 4
inglizcha soʻzlar: 3
```

`len(uzbekcha.split())` — uch qavat. Ichkaridan tashqariga o'qing:
1. `uzbekcha` — matnni ol
2. `.split()` — so'zlarga bo'l
3. `len(...)` — nechtaligini sana

---

## 4. Muammo

Bizda endi ikkita o'lchov bor. Ikkalasi ham — **noto'g'ri** o'lchov.

**Belgi bo'ladimi?** Bitta belgi = bitta token qilsak, `koʻraman` 8 ta token bo'ladi:

```python
soz = "koʻraman"
print("belgilar:", len(soz))
```

```
belgilar: 8
```

Bitta so'z uchun 8 ta token — bu juda isrof. Model har bir belgini alohida
ishlashi kerak bo'ladi va hech narsa ulgurmaydi.

**So'z bo'ladimi?** Unda `koʻraman` bitta token bo'ladi — yaxshi. Lekin o'zbek tili
**agglyutinativ**: bitta o'zakka ko'p qo'shimcha ulanadi.

```
koʻr      koʻraman      koʻrmadim      koʻrolmaganlaridan
```

Bularning har biri alohida so'z. Agar har bir so'z alohida token bo'lsa, lug'atda
millionlab token kerak bo'ladi — va yangi so'z chiqsa, model uni umuman bilmaydi.

**Demak, to'g'ri javob o'rtada.** Belgidan katta, so'zdan kichik. `koʻraman` ni
`koʻr` + `aman` qilib bo'lish kerak — chunki `aman` boshqa so'zlarda ham qaytariladi.

Lekin qayerdan bo'lish kerakligini kim aytadi? Qo'lda yozib chiqamizmi? Yo'q —
**algoritm o'zi topadi**. Shu algoritmning nomi **BPE**, va uni Dars 08 dan
qura boshlaymiz.

Undan oldin yana bitta narsa: **kompyuter harfni qanday saqlaydi?** Chunki hozirgacha
biz belgi sanadik, lekin kompyuter uchun `koʻraman` da 8 ta emas, **9 ta** joy band.
Nega bittasi ortiqcha — bu 6-darsda ochiladi.

---

## 5. To'liq kod

Colab'da yangi katak ochib, hammasini yozing va ishga tushiring:

```python
# ---- 1. Birinchi dastur ----
print("Salom, dunyo!")

# ---- 2. Oʻzgaruvchi ----
uzbekcha = "Men oʻqishni yaxshi koʻraman"
inglizcha = "I like reading"
print(uzbekcha)
print(inglizcha)

# ---- 3. Belgilarni sanash ----
print("oʻzbekcha belgilar:", len(uzbekcha))
print("inglizcha belgilar:", len(inglizcha))

# ---- 4. Soʻzlarga boʻlish ----
print(uzbekcha.split())
print(inglizcha.split())

# ---- 5. Soʻzlarni sanash ----
print("oʻzbekcha soʻzlar:", len(uzbekcha.split()))
print("inglizcha soʻzlar:", len(inglizcha.split()))

# ---- 6. Bitta soʻz ----
soz = "koʻraman"
print("koʻraman — belgilar soni:", len(soz))
```

**Kutilgan natija:**

```
Salom, dunyo!
Men oʻqishni yaxshi koʻraman
I like reading
oʻzbekcha belgilar: 28
inglizcha belgilar: 14
['Men', 'oʻqishni', 'yaxshi', 'koʻraman']
['I', 'like', 'reading']
oʻzbekcha soʻzlar: 4
inglizcha soʻzlar: 3
koʻraman — belgilar soni: 8
```

Agar sizda boshqacha chiqsa — kodni qatorma-qator solishtiring. Bir belgi farq qilsa
ham natija o'zgaradi.

---

## 6. O'zingiz yozing

Quyidagi kodda bo'sh joylar bor. To'ldiring va ishga tushiring.

```python
ism = "___"              # bu yerga oʻz ismingizni yozing

print("Mening ismim:", ___)
print("Ismimda ___ ta belgi bor:", len(___))
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
ism = "Islombek"

print("Mening ismim:", ism)
print("Ismimda nechta belgi bor:", len(ism))
```

```
Mening ismim: Islombek
Ismimda nechta belgi bor: 8
```

Diqqat: `print("Mening ismim:", ism)` da birinchisi qo'shtirnoqli (matnning o'zi),
ikkinchisi qo'shtirnoqsiz (qutining nomi).
</details>

---

## 7. Mashqlar

Javobni ochishdan **oldin** o'zingiz yozib ko'ring va ishga tushiring.

---

**Mashq 1.** `print` ni `Print` deb yozib ko'ring. Qanday xato chiqadi?

<details>
<summary>Javobni ko'rsatish</summary>

```
NameError: name 'Print' is not defined
```

Python **katta va kichik harfni farqlaydi**. `print` va `Print` — ikki xil nom.
Kompyuter `Print` degan buyruqni bilmaydi.

Bu kurs davomida ko'p uchraydigan xato. Xato turi `NameError` bo'lsa, birinchi
tekshiradigan narsangiz — imlo va katta harf.
</details>

---

**Mashq 2.** Bu ikkitasining natijasi nima uchun har xil?

```python
son = "8"
print(len(son))
print(len("son"))
```

<details>
<summary>Javobni ko'rsatish</summary>

```
1
3
```

- `len(son)` — qo'shtirnoqsiz, ya'ni quti ichiga qaraydi. Ichida `"8"` bor, unda
  1 ta belgi.
- `len("son")` — qo'shtirnoqli, ya'ni matnning o'zi. `s`, `o`, `n` — 3 ta belgi.

**Qo'shtirnoq bor yoki yo'qligi butun ma'noni o'zgartiradi.** Boshlovchilar uchun
bu eng ko'p chalkashtiradigan narsa, shuning uchun uni hozir mustahkamlang.
</details>

---

**Mashq 3.** Quyidagi jumla nechta belgi va nechta so'zdan iborat? Avval **qo'lda
hisoblang**, keyin kod bilan tekshiring.

```
Oʻzbekiston Respublikasi poytaxti Toshkent
```

<details>
<summary>Javobni ko'rsatish</summary>

```python
jumla = "Oʻzbekiston Respublikasi poytaxti Toshkent"
print(len(jumla))
print(len(jumla.split()))
```

```
42
4
```

Qo'lda sanaganda bo'shliqlarni unutmaslik kerak — ular ham belgi. 4 ta so'z orasida
3 ta bo'shliq bor.
</details>

---

**Mashq 4.** `.split()` bo'shliq bo'yicha bo'ladi. Unda bu nima qaytaradi?

```python
print("salom".split())
```

<details>
<summary>Javobni ko'rsatish</summary>

```
['salom']
```

Bitta elementli ro'yxat. Bo'shliq yo'q, shuning uchun bo'linmadi — lekin natija baribir
**ro'yxat** bo'lib chiqdi, oddiy matn emas.

Bu muhim: `.split()` har doim ro'yxat qaytaradi, hatto bo'lish kerak bo'lmasa ham.
`len("salom")` = 5 (belgilar), `len("salom".split())` = 1 (so'zlar). Ikki xil savol,
ikki xil javob.
</details>

---

**Mashq 5 (eng muhimi).** Kursning boshida aytilgan edi: ChatGPT o'zbekcha jumlani
9 ta tokenga, inglizchasini 3 ta tokenga bo'ladi. Lekin biz kod bilan o'lchaganimizda
so'zlar soni 4 va 3 chiqdi — ya'ni deyarli teng.

Nima uchun token soni va so'z soni bunchalik farq qiladi?

<details>
<summary>Javobni ko'rsatish</summary>

Chunki **token so'z emas**.

Inglizcha jumlada har bir so'z ChatGPT ning lug'atida **butunicha** bor: `I`, `like`,
`reading` → 3 so'z, 3 token. Deyarli mos.

O'zbekcha jumlada esa so'zlar lug'atda yo'q. ChatGPT ularni bo'laklarga maydalaydi:
`koʻraman` bitta so'z, lekin uning uchun 3-4 ta token ketadi. Natijada 4 so'z → 9 token.

**Mana shu farq — butun kursning sababi.** Fertility (so'zga to'g'ri keladigan token
soni) GPT-4o uchun o'zbek tilida 2.724. Ya'ni har bir so'z o'rtacha 2.7 ta tokenga
bo'linadi.

Biz quradigan tokenizatorda bu raqam **1.839** bo'ladi — chunki uning lug'ati o'zbek
so'zlaridan qurilgan.

Dars 15 da siz bu raqamni **o'z tokenizatoringizda o'zingiz o'lchaysiz**.
</details>

---

## 8. Xulosa

1. Model matnni tushunmaydi — u faqat raqam bilan ishlaydi. Matnni raqamga
   aylantiradigan narsa — **tokenizator**.
2. ChatGPT ning tokenizatori ingliz tili uchun qurilgan, shuning uchun o'zbekcha matn
   3 barobar ko'p tokenga bo'linadi — qimmatroq, sekinroq, yomonroq.
3. `print()` — ekranga chiqaradi. Qavs ichidagi qo'shtirnoqli narsa — matn.
4. `nom = qiymat` — qiymatni qutiga joylaydi. `=` "teng" emas, "joyla" degani.
5. `len()` — nechtaligini sanaydi. `.split()` — bo'shliq bo'yicha bo'ladi.
6. **Xato — bu ma'lumot, jazo emas.** Oxirgi qatorini o'qing.

---

## Keyingi dars

Bugun matnni butunicha ishlatdik. Lekin tokenizator matnni **bo'laklarga** bo'lishi kerak —
demak matn ichidan alohida harfni, alohida bo'lakni olishni bilish kerak.

**Dars 02 — Matn bilan ishlash.** Satrdan bitta harfni olish, o'rtasidan bo'lak kesish,
matnlarni qo'shish va almashtirish.

Keyingi darsning savoli: *`"salom"` matnining 0-belgisi qaysi harf — `s` mi yoki `a` mi?*
Javob ko'pchilikni hayron qoldiradi.
