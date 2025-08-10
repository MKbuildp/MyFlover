# Struktura Projektu MyFlavor

*Poslední aktualizace: 26.12.2024 - Kompletní přehled aktuálního stavu projektu*

## Popis Aplikace

MyFlavor je osobní digitální kuchařka, která funguje jako moderní verze tradičního sešitu s recepty. Aplikace klade důraz na soukromí a nezávislost - všechna data jsou uložena lokálně v zařízení uživatele.

### Klíčové Vlastnosti
- Plně offline funkcionalita
- Lokální ukládání dat
- Dvojjazyčné rozhraní (CZ/EN)
- Strukturované recepty
- Intuitivní vyhledávání a kategorizace
- **Editace existujících receptů**
- **Správa receptů (editace, mazání)**

## Plán Implementace

### Fáze 1: Základní Setup a Navigace ✅
1. **Jazyková Podpora** ✅
   - Implementace LanguageContext ✅
   - Překlad všech textů (CZ/EN) ✅
   - Obrazovka výběru jazyka ✅

2. **Základní Navigace** ✅
   - Tab Navigator (Kategorie, Vyhledávání, Přidat Recept) ✅
   - Stack Navigator pro detail receptu ✅
   - Modální okna pro editaci ✅

### Fáze 2: Datový Model a Lokální Úložiště ✅
1. **TypeScript Typy** ✅
   - Kompletní definice receptů, ingrediencí a postupů ✅
   - Typy pro nové recepty a editaci ✅

2. **AsyncStorage Implementace** ✅
   - Ukládání receptů ✅
   - Správa kategorií ✅
   - Cachování obrázků ✅

### Fáze 3: Základní UI Komponenty ✅
1. **Sdílené Komponenty** ✅
   - FloatingActionButton ✅
   - KategorieKarta ✅
   - FormularPole ✅
   - IngrediencePolozka ✅
   - PostupPolozka ✅

2. **Obrazovky** ✅
   - VyberJazykaScreen ✅
   - KategorieScreen ✅
   - VyhledavaniScreen ✅
   - PridatReceptScreen ✅
   - DetailReceptuScreen ✅
   - **EditovatReceptScreen** ✅

### Fáze 4: Hlavní Funkcionality ✅
1. **Správa Receptů** ✅
   - Vytvoření nového receptu ✅
   - **Editace existujícího receptu** ✅
   - **Mazání receptu** ✅
   - Fotografie (galerie/kamera) ✅

2. **Kategorizace a Vyhledávání** ✅
   - Správa kategorií ✅
   - Fulltextové vyhledávání ✅
   - Filtrování podle kategorií ✅

3. **Detail Receptu** ✅
   - Interaktivní odškrtávání ✅
   - Integrovaný časovač ✅
   - Režim vaření (větší písmo, přehlednost) ✅
   - **Hlavička s titulem "Detail receptu"** ✅
   - **Ikona nastavení s menu pro editaci a mazání** ✅

### Fáze 5: Rozšířené Funkce
1. **Optimalizace**
   - Výkon při velkém množství receptů
   - Optimalizace obrázků
   - Cachování vyhledávání

2. **UX Vylepšení**
   - Animace a přechody
   - Haptická odezva
   - Gesta pro navigaci

## Nově Implementované Funkce

### ✨ **Editace Receptů**
- **EditovatReceptScreen** - Nová obrazovka pro úpravu existujících receptů
- **Inicializace s existujícími daty** - Automatické načtení všech polí receptu
- **Validace formuláře** - Kontrola pouze povinných polí (název a kategorie) před uložením
- **Generování nových ID** - Pro ingredience a kroky při editaci
- **Konzistentní podmínky uložení** - Stejné jako na obrazovce "Nový recept"

### 🎯 **Vylepšená Hlavička Detailu Receptu**
- **Titulek "Detail receptu"** - Jasná identifikace obrazovky, vycentrovaný na střed
- **Ikona ozubeného kolečka (settings)** - Intuitivní ikona pro nastavení, posunutá více doprava
- **Menu s možnostmi**:
  - **Upravit** - Navigace na EditovatReceptScreen
  - **Smazat** - Potvrzovací dialog s mazáním receptu

### 🔧 **Optimalizovaná Obrazovka Editace Receptu**
- **Hlavička vycentrovaná** - Titulek "Upravit recept" na středu obrazovky
- **Stejné pořadí komponent** - Název, Popis, časy a porce, kategorie, ingredience, kroky, fotografie (stejně jako na obrazovce "Přidat recept")
- **Konzistentní šířka komponent** - Všechny komponenty mají stejnou šířku jako komponenta "Přidat fotografii"
- **Fotografie na konci** - Sekce s fotografiemi je umístěna na konci formuláře

### 🔄 **Navigační Vylepšení**
- **Nová obrazovka EditovatRecept** v RootNavigator
- **Automatická navigace zpět** po úspěšné editaci
- **Potvrzovací dialogy** pro kritické operace

## App Store Identifikátory

### iOS Identifikátory
- **Bundle ID**: com.mk4buildp.myflavor
- **Team ID**: SJSQ65A7N8
- **Platformy**: iOS, iPadOS, macOS, tvOS, watchOS, visionOS
- **Popis**: MyFlavor

## Přehled Projektu
MyFlavor je mobilní aplikace vytvořená pomocí React Native (Expo) s TypeScriptem.

## Technologie
- React Native s Expo SDK 53
- TypeScript
- React Navigation
- Expo Managed Workflow

## Aktuální Adresářová Struktura

```
MyFlavor/
├── src/                      # Hlavní zdrojový kód aplikace
│   ├── components/          # Sdílené komponenty
│   │   └── FloatingActionButton.tsx (1.3KB, 59 řádků)
│   ├── screens/            # Obrazovky aplikace
│   │   ├── DetailReceptu/  # Detail receptu s editací
│   │   │   ├── components/
│   │   │   │   ├── DetailReceptuHeaderRight.tsx (2.8KB, 107 řádků)
│   │   │   │   ├── ReceptHeader.tsx (2.2KB, 85 řádků)
│   │   │   │   ├── SeznamIngrediencie.tsx (1.5KB, 64 řádků)
│   │   │   │   └── SeznamKroku.tsx (2.2KB, 97 řádků)
│   │   │   └── DetailReceptuScreen.tsx (5.3KB, 180 řádků)
│   │   ├── EditovatRecept/ # Nová obrazovka pro editaci
│   │   │   ├── EditovatReceptScreen.tsx (8.9KB, 298 řádků)
│   │   │   └── index.ts (64B, 2 řádky)
│   │   ├── Kategorie/
│   │   │   ├── components/
│   │   │   │   ├── KategorieModal.tsx (3.2KB, 146 řádků)
│   │   │   │   └── KategoriePolozka.tsx (2.2KB, 87 řádků)
│   │   │   └── KategorieScreen.tsx (2.6KB, 86 řádků)
│   │   ├── PridatRecept/
│   │   │   ├── components/
│   │   │   │   ├── FotografieSekce.tsx (4.1KB, 176 řádků)
│   │   │   │   ├── SeznamIngredience.tsx (9.3KB, 377 řádků)
│   │   │   │   ├── SeznamKroku.tsx (6.3KB, 244 řádků)
│   │   │   │   └── ZakladniInformace.tsx (6.1KB, 239 řádků)
│   │   │   └── PridatReceptScreen.tsx (7.0KB, 253 řádků)
│   │   ├── SeznamReceptu/
│   │   │   └── SeznamReceptuScreen.tsx (5.7KB, 195 řádků)
│   │   ├── Vyhledavani/
│   │   │   └── VyhledavaniScreen.tsx (548B, 25 řádků)
│   │   └── VyberJazyka/
│   │       └── VyberJazykaScreen.tsx (1.9KB, 76 řádků)
│   ├── context/            # React Context pro správu stavu
│   │   ├── ReceptContext.tsx (8.1KB, 259 řádků)
│   │   └── LanguageContext.tsx (2.0KB, 69 řádků)
│   ├── navigation/         # Navigační komponenty
│   │   ├── RootNavigator.tsx (2.3KB, 60 řádků)
│   │   └── TabNavigator.tsx (2.6KB, 85 řádků)
│   ├── types/              # TypeScript definice typů
│   │   ├── navigation.ts (701B, 31 řádků)
│   │   └── recept.ts (1.4KB, 74 řádků)
│   ├── utils/              # Pomocné funkce a utility
│   │   ├── storage.ts (3.6KB, 120 řádků)
│   │   └── helpers.ts (179B, 6 řádků)
│   └── translations/       # Jazykové překlady
│       ├── cs.ts (2.1KB, 82 řádků)
│       ├── en.ts (2.0KB, 82 řádků)
│       └── index.ts (295B, 14 řádků)
│
├── docs/                    # Dokumentace projektu
│   ├── cursor-rules.md      # Pravidla pro vývoj
│   └── project-structure.md # Tento soubor - struktura projektu
│
├── app.json                # Konfigurace Expo
├── App.tsx                 # Kořenový komponent aplikace
├── package.json            # NPM závislosti a skripty
├── package-lock.json       # Zamykané verze závislostí
├── tsconfig.json          # Konfigurace TypeScriptu
├── eas.json               # Konfigurace EAS Build
└── index.ts               # Vstupní bod aplikace
```

## Analýza Velikosti Souborů

### ✅ Soubory v Optimálním Rozsahu (50-200 řádků)
- **DetailReceptuScreen.tsx** (180 řádků) - ✅
- **SeznamReceptuScreen.tsx** (195 řádků) - ✅
- **PridatReceptScreen.tsx** (253 řádků) - ✅
- **ReceptContext.tsx** (259 řádků) - ✅

### ⚠️ Soubory Přesahující Doporučenou Velikost (>200 řádků)
- **EditovatReceptScreen.tsx** (298 řádků) - ⚠️ Přesahuje doporučených 200 řádků
- **SeznamIngredience.tsx** (377 řádků) - ❌ Výrazně přesahuje doporučených 200 řádků

### 🔧 Doporučení pro Optimalizaci
1. **EditovatReceptScreen.tsx** - Rozdělit na menší komponenty podle pravidel
2. **SeznamIngredience.tsx** - Urgentně rozdělit na menší moduly

## Konvence Pojmenování

### Složky a Soubory
- Složky: camelCase pro obecné složky, PascalCase pro komponenty
- Komponenty: PascalCase (např. `MujKomponent.tsx`)
- Hooks: camelCase začínající s "use" (např. `useMujHook.ts`)
- Utility: camelCase (např. `pomocneFunkce.ts`)

### Komponenty
- Každá komponenta má vlastní složku s indexem
- Struktura komponenty:
  ```
  components/
  └── MujKomponent/
      ├── index.tsx           # Hlavní komponenta
      ├── styles.ts          # Styly
      └── types.ts           # TypeScript typy
  ```

### Obrazovky
- Každá obrazovka má vlastní složku
- Struktura obrazovky:
  ```
  screens/
  └── MojeObrazovka/
      ├── components/        # Komponenty specifické pro obrazovku
      ├── hooks/            # Hooky specifické pro obrazovku
      ├── utils/            # Pomocné funkce pro obrazovku
      ├── types/           # TypeScript typy
      └── index.tsx         # Hlavní komponenta obrazovky
  ```

## Správa Stavu
- Lokální stav: React useState
- Globální stav: ReceptContext s useReducer

## Navigace
- React Navigation 7
- Stack Navigator pro hlavní navigaci
- Tab Navigator pro hlavní sekce

## Styly
- React Native StyleSheet
- Sdílené styly v `src/constants/styles.ts`

## Assets
- Obrázky: PNG nebo SVG
- Fonty: (bude doplněno)
- Ikony: Ionicons z Expo

## Poznámky k Vývoji
- Veškerý kód musí být v TypeScriptu
- Používáme funkcionální komponenty a hooks
- Dodržujeme pravidla pro velikost souborů (max 350 řádků)
- Veškeré názvy v češtině
- Dokumentace komponent pomocí JSDoc komentářů
- **Nově implementované funkce editace a mazání receptů**
- **Potřeba optimalizace velkých souborů podle pravidel**

---

*Tento dokument bude průběžně aktualizován s vývojem projektu.* 