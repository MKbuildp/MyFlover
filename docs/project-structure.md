# Struktura Projektu MyFlavor

*Poslední aktualizace: 24.7.2025*

## Popis Aplikace

MyFlavor je osobní digitální kuchařka, která funguje jako moderní verze tradičního sešitu s recepty. Aplikace klade důraz na soukromí a nezávislost - všechna data jsou uložena lokálně v zařízení uživatele.

### Klíčové Vlastnosti
- Plně offline funkcionalita
- Lokální ukládání dat
- Dvojjazyčné rozhraní (CZ/EN)
- Strukturované recepty
- Intuitivní vyhledávání a kategorizace

## Plán Implementace

### Fáze 1: Základní Setup a Navigace
1. **Jazyková Podpora**
   - Implementace LanguageContext
   - Překlad všech textů (CZ/EN)
   - Obrazovka výběru jazyka

2. **Základní Navigace**
   - Tab Navigator (Kategorie, Vyhledávání, Přidat Recept)
   - Stack Navigator pro detail receptu
   - Modální okna pro editaci

### Fáze 2: Datový Model a Lokální Úložiště
1. **TypeScript Typy**
   ```typescript
   interface Recept {
     id: string;
     nazev: string;
     popis?: string;
     fotografie?: string;
     dobaPrivavy: number;
     dobaVareni: number;
     pocetPorci: number;
     kategorie: string[];
     ingredience: Ingredience[];
     postup: KrokPostupu[];
     vytvoreno: Date;
     upraveno: Date;
   }

   interface Ingredience {
     mnozstvi: number;
     jednotka: string;
     nazev: string;
     odskrtnuto?: boolean;
   }

   interface KrokPostupu {
     cislo: number;
     text: string;
     odskrtnuto?: boolean;
     casovac?: number;
   }
   ```

2. **AsyncStorage Implementace**
   - Ukládání receptů
   - Správa kategorií
   - Cachování obrázků

### Fáze 3: Základní UI Komponenty
1. **Sdílené Komponenty**
   - ReceptKarta
   - KategorieKarta
   - FormularPole
   - IngrediencePolozka
   - PostupPolozka
   - Časovač

2. **Obrazovky**
   - VyberJazykaScreen
   - KategorieScreen
   - VyhledavaniScreen
   - PridatReceptScreen
   - DetailReceptuScreen

### Fáze 4: Hlavní Funkcionality
1. **Správa Receptů**
   - Vytvoření nového receptu
   - Editace existujícího receptu
   - Mazání receptu
   - Fotografie (galerie/kamera)

2. **Kategorizace a Vyhledávání**
   - Správa kategorií
   - Fulltextové vyhledávání
   - Filtrování podle kategorií

3. **Detail Receptu**
   - Interaktivní odškrtávání
   - Integrovaný časovač
   - Režim vaření (větší písmo, přehlednost)

### Fáze 5: Rozšířené Funkce
1. **Optimalizace**
   - Výkon při velkém množství receptů
   - Optimalizace obrázků
   - Cachování vyhledávání

2. **UX Vylepšení**
   - Animace a přechody
   - Haptická odezva
   - Gesta pro navigaci

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

## Adresářová Struktura

```
MyFlavor/
├── src/                      # Hlavní zdrojový kód aplikace
│   ├── components/          # Sdílené komponenty
│   ├── screens/            # Obrazovky aplikace
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Pomocné funkce a utility
│   ├── types/              # TypeScript definice typů
│   ├── assets/            # Obrázky, fonty a další statické soubory
│   └── constants/         # Konstanty a konfigurační hodnoty
│
├── docs/                    # Dokumentace projektu
│   └── project-structure.md # Tento soubor - struktura projektu
│
├── app.json                # Konfigurace Expo
├── App.tsx                 # Kořenový komponent aplikace
├── babel.config.js         # Konfigurace Babelu
├── package.json            # NPM závislosti a skripty
└── tsconfig.json          # Konfigurace TypeScriptu
```

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
- Globální stav: (bude doplněno podle potřeby)

## Navigace
- React Navigation
- Stack Navigator pro hlavní navigaci

## Styly
- React Native StyleSheet
- Sdílené styly v `src/constants/styles.ts`

## Assets
- Obrázky: PNG nebo SVG
- Fonty: (bude doplněno)
- Ikony: (bude doplněno)

## Poznámky k Vývoji
- Veškerý kód musí být v TypeScriptu
- Používáme funkcionální komponenty a hooks
- Dodržujeme pravidla pro velikost souborů (max 350 řádků)
- Veškeré názvy v češtině
- Dokumentace komponent pomocí JSDoc komentářů

---
*Tento dokument bude průběžně aktualizován s vývojem projektu.* 