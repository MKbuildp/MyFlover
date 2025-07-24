# Cursor Rules pro Projekt Mobilní Aplikace v React Native

*Poslední aktualizace: 17. prosince 2024*

## Persona a Styl Komunikace
- Komunikujeme VÝHRADNĚ česky. Rozumíš českým zadáním a odpovídáš vždy česky.
- Tvůj styl komunikace je nápomocný

## Základní Technologie a Platforma
- Tento projekt používá React Native s TypeScriptem.

## KLÍČOVÉ PRAVIDLO 1: Expo Managed Workflow
- **Vývojový Workflow:** Používám Expo Managed Workflow. Projekt spouštím pomocí `npm start` a testuji výhradně v aplikaci **Expo Go**.
- **Expo SDK 53:** Aktuální verze Expo SDK v projektu je 53. Tuto verzi **nesmíš měnit**.
- **Kompatibilita s Expo Go:** Toto je nejdůležitější bod. Veškerý vygenerovaný kód a všechny navržené knihovny musí být spustitelné přímo v aplikaci Expo Go. **Nepřidávej žádné knihovny ani kód, které vyžadují:**
    * Vlastní nativní moduly (custom native modules).
    * Nutnost sestavení vlastního development klienta (custom development build).
    * "Eject" z Expo Managed Workflow.
- **Knihovny:** Pokud potřebuješ přidat knihovny, preferuj ty přímo od Expo (`expo-...`) nebo takové, které jsou známé svou kompatibilitou s Expo Go a Managed Workflow (např. `react-navigation`). Ověř si jejich kompatibilitu s mou verzí Expo SDK.
- **Build:** Projekt musí zůstat kompatibilní s EAS Build pro pozdější generování `.aab`.
- Balíčky musí mít správné verze pro Expo SDK 53

## KLÍČOVÉ PRAVIDLO 2: Velikost souborů
- **Obecné soubory:** Optimální délka je 100-250 řádků. Nevytvářet soubory delší než 350 řádků kvůli snížené udržitelnosti.
- **React Native komponenty:** ideální délka je 50-200 řádků.
- Každá komponenta by měla mít jednu jasně definovanou funkci (Single Responsibility Principle).
- **Řešení pro velké soubory:** rozdělte je na menší, logické moduly.
- Vytvořte z částí kódu znovupoužitelné podkomponenty.
- Oddělte stavovou logiku nebo komplexní funkce do vlastních hooks.
- **Základní princip:** Čím kratší a cílenější soubor, tím snazší je jeho čtení, porozumění a údržba.

## KLÍČOVÉ PRAVIDLO 3: Česká Indexace
- Pro názvy komponent, funkcí, proměnných, tříd... POUŽÍVEJ čěštinu.
- Před definici každé nově vytvořené nebo významně upravené komponenty, funkce nebo třídy PŘIDEJ komentář (`/** ... */` nebo `//`) obsahující stručný popis pro vyhledávání.

## KLÍČOVÉ PRAVIDLO 4: Struktura a modularita obrazovek
### Základní principy
- Každá obrazovka musí být samostatným modulem s vlastní složkou
- Veškerá logika musí být oddělena od prezentační vrstvy
- Komponenty specifické pro obrazovku patří do její složky
- Maximální délka souborů je 200 řádků

### Struktura složky obrazovky
```
screens/
NázevObrazovky/ # Hlavní složka obrazovky
├── components/ # Komponenty specifické pro tuto obrazovku
│ ├── NázevKomponenty1.tsx # Jednotlivé komponenty
│ └── NázevKomponenty2.tsx
├── hooks/ # Hooky specifické pro tuto obrazovku
│ ├── useNázevHooku1.ts
│ └── useNázevHooku2.ts
├── utils/ # Pomocné funkce specifické pro obrazovku
│ └── helpers.ts
├── types/ # TypeScript typy pro tuto obrazovku
│ └── types.ts
├── NázevObrazovkyScreen.tsx # Shell komponenta
```

### Implementační postup pro přesun/vytvoření komponenty
#### 1. Přípravná fáze
- Identifikovat všechny importy a závislosti původní komponenty
- Zkopírovat celý původní kód komponenty
- Vytvořit novou adresářovou strukturu podle vzoru výše

#### 2. Rozdělení kódu (v tomto pořadí)
1. **Typy (`types/types.ts`)**
   - Vytvořit soubor pro typy
   - Přesunout všechna rozhraní a typy
   - Přidat typy pro hook (state a return typy)
   - Exportovat všechny typy

2. **Hook (`hooks/useNázevKomponenty.ts`)**
   - Vytvořit hook se stejnou funkcionalitou
   - Přesunout veškerou logiku z komponenty
   - Přesunout všechny useState a useEffect
   - Přesunout všechny handlery a pomocné funkce
   - Vrátit objekt s daty a handlery

3. **Komponenta (`components/NázevKomponenty.tsx`)**
   - Zachovat pouze prezentační vrstvu (JSX)
   - Použít hook pro veškerou logiku
   - Importovat typy z types.ts
   - Zachovat styly v komponentě

#### 3. Aktualizace importů
- Aktualizovat cesty ke všem importům v nových souborech
- Upravit importy v souborech, které používají komponentu
- Zkontrolovat relativní cesty (../../)

#### 4. Testování a ověření
- Vizuálně porovnat novou implementaci s původní
- Ověřit všechny funkcionality
- Zkontrolovat, že nedošlo k regresím

#### 5. Dokončení
- Odstranit původní soubor až po ověření funkčnosti
- Aktualizovat dokumentaci (pokud existuje)
- Commitnout změny s popisným komentářem

### Pravidla pro přesun
1. **Zachování funkčnosti**
   - Nová implementace musí být vizuálně identická
   - Veškerá funkcionalita musí zůstat zachována
   - Všechny props musí zůstat stejné

2. **Čistota kódu**
   - Každý soubor má jednu odpovědnost
   - Prezentační komponenta neobsahuje logiku
   - Hook obsahuje veškerou logiku
   - Typy jsou centralizované v types.ts

3. **Pojmenování a struktura**
   - Používat české názvy funkcí a proměnných
   - Dodržovat konzistentní formátování
   - Zachovat strukturu složek podle vzoru
   - Dokumentovat komponenty a funkce

## KLÍČOVÉ PRAVIDLO 5: Preferování funkcionálních komponent a Hooks
### Pravidlo: Používání funkcionálních komponent a Hooks
Při vytváření nových React Native komponent **striktně dodržuj následující:**
1. **Vždy preferuj** funkcionální komponenty (`function MyComponent() { ... }` nebo `const MyComponent = () => { ... }`) před třídními komponentami.
2. Pro správu stavu a vedlejších efektů ve funkcionálních komponentách **používej React Hooks** (`useState`, `useEffect`, `useContext`, `useCallback`, `useMemo`, atd.).
3. **Nepoužívej** starší lifecycle metody třídních komponent, pokud k tomu není specifický, oprávněný důvod.

### Proč:
- **Jednodušší kód:** Funkcionální komponenty s Hooks jsou často kratší a snáze čitelné.
- **Snadnější sdílení logiky:** Custom Hooks umožňují elegantně sdílet stavovou logiku mezi komponentami.
- **Lepší optimalizace:** Hooks jako `useMemo` a `useCallback` poskytují přímé nástroje pro optimalizaci výkonu.
- **Moderní standard:** Ekosystém Reactu (včetně React Native) se primárně zaměřuje na funkcionální komponenty a Hooks.

## KLÍČOVÉ PRAVIDLO 6: Optimalizace výkonu
### Pravidlo: Proaktivní optimalizace výkonu
Při vývoji komponent, zejména těch, které se často překreslují nebo zobrazují seznamy, **aktivně zvažuj a aplikuj následující optimalizace:**
1. **Obal komponenty pomocí `React.memo`**, pokud přijímají props a neměly by se zbytečně překreslovat.
2. **Používej `useCallback`** pro funkce, které předáváš jako props do optimalizovaných komponent.
3. Při použití `FlatList` nebo `SectionList`:
   - **Vždy poskytni `keyExtractor`**, který vrací unikátní stringový klíč pro každou položku.
   - Pokud je to možné a výška položek je konstantní, použij `getItemLayout`.
   - Optimalizuj renderování položek seznamu pomocí `React.memo`.
   - Zvaž použití `initialNumToRender`, `maxToRenderPerBatch`, `windowSize` pro optimalizaci renderování velkých seznamů.

### Proč:
- **Plynulost aplikace:** Zbytečné překreslování komponent je častou příčinou zasekávání a pomalé odezvy UI.
- **Efektivita seznamů:** `FlatList` je výkonný, ale neoptimalizované použití může vést k problémům s pamětí a výkonem.

## KLÍČOVÉ PRAVIDLO 7: Přehled projektu
### Struktura projektu
- Kompletní struktura projektu (kromě node_modules) musí být pravidelně aktualizována v souboru `/docs/project-structure.md`
- Aktualizace struktury se provádí:
  - Po přidání nové feature (složky, komponenty)
  - Po významné změně struktury
  - Minimálně jednou týdně při aktivním vývoji
- Struktura musí obsahovat:
  - Všechny složky a jejich hierarchii
  - Všechny soubory (kromě node_modules)
  - Krátký popis účelu hlavních složek
  - Datum poslední aktualizace

### Účel
- Udržení přehledu o projektu
- Snadnější orientace pro nové členy týmu
- Dokumentace růstu a změn projektu
- Prevence duplicit a nekonzistencí 

## KLÍČOVÉ PRAVIDLO 8: Správa verzí s Git
### Pravidlo: Kontrola Git operací
- **NIKDY** neprováděj Git operace (`git add`, `git commit`, `git push`) automaticky
- Git operace se provádějí **POUZE na explicitní žádost** uživatele
- Před každou Git operací **informuj uživatele** o tom, co se bude dělat
- Uživatel **VŽDY** rozhoduje o:
  - Kdy se změny commitnou
  - Jaký commit message se použije
  - Kdy se změny pushnou na remote repository

### Doporučené workflow:
1. Proveď změny v kódu
2. Informuj uživatele o provedených změnách
3. **Čekej na pokyn** k Git operacím
4. Proveď Git operace pouze po schválení uživatelem

### Výjimky:
- **Žádné výjimky** - vždy čekej na explicitní souhlas uživatele

## KLÍČOVÉ PRAVIDLO 9: Nastavení vývojového prostředí
### Pravidlo: Konfigurace externích služeb a nástrojů
Při tvorbě nové aplikace nebo nastavování vývojového prostředí je nutné nakonfigurovat následující služby a nástroje, které **nelze vygenerovat automaticky**:

### 🔧 Povinné manuální konfigurace:
1. **Git Repository**
   - Vytvoření GitHub/GitLab repository
   - Nastavení SSH klíčů nebo Personal Access Tokens
   - Konfigurace Git identity (`git config user.name` a `git config user.email`)

2. **Expo Account**
   - Registrace Expo účtu na https://expo.dev
   - Získání Expo Auth Token pro CLI
   - Nastavení Project ID v `app.json`

3. **Google Play Console**
   - Registrace Google Play Developer účtu ($25 jednorázový poplatek)
   - Vytvoření nové aplikace v konzoli
   - Získání licenčního klíče pro in-app purchases (pokud potřeba)

4. **Apple Developer Program** (pro iOS)
   - Registrace Apple Developer účtu ($99/rok)
   - Vytvoření App ID a provisioning profiles
   - Konfigurace certificates

5. **EAS Build**
   - Nastavení EAS CLI
   - Konfigurace `eas.json`
   - Nastavení credentials (keystore pro Android, certificates pro iOS)

6. **GitHub Actions** (pro CI/CD)
   - Nastavení GitHub Secrets:
     - `EXPO_TOKEN`
     - Další API klíče podle potřeby
   - Konfigurace workflow souborů

### 📋 Kontrolní seznam před zahájením vývoje:
- [ ] Git repository vytvořen a nakonfigurován
- [ ] Expo účet registrován a token nastaven
- [ ] Google Play Console účet (pro Android publikování)
- [ ] Apple Developer účet (pro iOS publikování)
- [ ] EAS Build nakonfigurován
- [ ] CI/CD pipeline nastaven (pokud potřeba)

### 🚨 Důležité upozornění:
- **Vždy informuj uživatele** o potřebě těchto manuálních konfigurací
- **Poskytni konkrétní kroky** pro každou konfiguraci
- **Ověř dostupnost** všech potřebných účtů před pokračováním
- **Dokumentuj** všechny konfigurace pro budoucí reference

### 💡 Tipy pro efektivní setup:
- Vytvořte checklist pro nové projekty
- Udržujte aktuální dokumentaci všech potřebných konfigurací
- Zálohujte důležité konfigurace (keystore, certificates)
- Používejte environment variables pro citlivé údaje

## KLÍČOVÉ PRAVIDLO 10: Checklist pro První Android Build (Expo & EAS)

Tento postup shrnuje všechny kroky potřebné k prvnímu úspěšnému sestavení a nahrání Android aplikace do Google Play Console. Důsledné dodržení pořadí je klíčové.

### Fáze 1: Příprava projektu a účtů

1.  **Unikátní Název Balíčku (`app.json`):**
    *   V souboru `app.json` nastavte **globálně unikátní** `package` pro Android.
    *   **Doporučený formát:** `com.jmenovasi_firmy_nebo_vyvojare.nazevaplikace` (např. `com.mkbuildp.fittracker`).
    *   Tento název je **trvalý** a po prvním nahrání do Google Play ho nelze změnit. Pečlivě ho zkontrolujte.
    *   Nastavte počáteční `versionCode` na `1`.

2.  **Vytvoření Aplikace v Google Play Console:**
    *   Přihlaste se do [Google Play Console](https://play.google.com/console/).
    *   Klikněte na "Vytvořit aplikaci".
    *   Vyplňte pouze **jméno aplikace pro uživatele** a další základní údaje. **Název balíčku zde nezadáváte!** Vytvoříte pouze prázdnou "schránku".

3.  **Konfigurace EAS Build (`eas.json`):**
    *   Ujistěte se, že v `eas.json` máte v profilu `production` nastaven build na `app-bundle`:
      ```json
      "production": {
        "android": {
          "buildType": "app-bundle"
        }
      }
      ```

### Fáze 2: Generování klíčů a první build

4.  **Vygenerování Nahrávacího Klíče (NEJDŮLEŽITĚJŠÍ KROK):**
    *   Ve svém lokálním terminálu v kořeni projektu spusťte příkaz: `eas credentials`.
    *   Zvolte platformu `Android`.
    *   EAS detekuje váš nový, unikátní název balíčku z `app.json`.
    *   Zvolte možnost **`Set up a new keystore`** a nechte Expo, aby proces automaticky dokončilo.
    *   Tím se na vašem Expo účtu bezpečně vytvoří a uloží **nahrávací klíč (upload key)** pro vaši aplikaci.

5.  **Spuštění Prvního Buildu:**
    *   Proveďte `git push` na `main` větev, čímž se spustí automatický build přes GitHub Actions (nebo ho spusťte manuálně).
    *   Počkejte na dokončení buildu a stáhněte si výsledný `.aab` soubor.

### Fáze 3: Nahrání do Google Play a finální konfigurace

6.  **První Nahrání do Google Play:**
    *   V Google Play Console přejděte do vaší nové, prázdné aplikace.
    *   Vytvořte nové vydání (např. pro "Interní testování").
    *   Dostanete se na obrazovku "Integrita aplikace". Zde vás Google vyzve k nastavení podepisování.
    *   **Zásadní volba:** Klikněte na "Vybrat podpisový klíč" a zvolte možnost **"Použít klíč vygenerovaný Googlem"** (Use a Google-generated key).
    *   Tím aktivujete "Podepisování aplikací ve službě Play" (Play App Signing).

7.  **Nahrání `.aab` Souboru:**
    *   Po potvrzení předchozí volby se odemkne možnost nahrát soubor.
    *   Nahrajte váš stažený `.aab` soubor.
    *   Google si z něj přečte název balíčku a otisk vašeho nahrávacího klíče a **natrvalo je spáruje s touto aplikací**.

8.  **Dokončení Vydání:**
    *   Vyplňte poznámky k vydání.
    *   Klikněte na "Další" a následně na "Uložit a publikovat" (nebo "Zahájit zavádění...").

### Další aktualizace:
Pro každou další verzi aplikace stačí v `app.json` zvýšit `versionCode` (např. na `2`), provést `git push` a nahrát nový `.aab` soubor do nového vydání v Google Play Console. Všechny klíče už jsou správně nastavené.

## KLÍČOVÉ PRAVIDLO 11: Uložení a Build na Gitu
### Pravidlo: Standardizovaný postup pro Git operace a automatický build
Tento postup **VŽDY** používej pro uložení změn a spuštění buildu. Dodržuj **přesné pořadí** kroků a **nikdy** je neprováděj automaticky bez výslovného souhlasu uživatele.

### Sekce 1: Uložení (Commit)
#### Krok 1: Příprava změn
```bash
git add .
```
- Přidá všechny změněné soubory do staging area
- Zobrazí případná upozornění (např. CRLF konverze)

#### Krok 2: Commit se strukturovanou zprávou
```bash
git commit -m "Popisný název změny

- Konkrétní změna 1 (např. Update version from 1.2.2 to 1.2.3)
- Konkrétní změna 2 (např. Fix Android icon configuration)
- Konkrétní změna 3 (např. Change 'Cíle' to 'Cíl' in translations)
- Další změny podle potřeby
- Update documentation (pokud se měnila)"
```

#### Struktura commit message:
1. **První řádek:** Krátký, výstižný popis (max 50 znaků)
2. **Prázdný řádek**
3. **Detailní seznam změn:** Každá změna na novém řádku s pomlčkou
4. **Technické detaily:** Verze, konfigurační změny, opravy

### Sekce 2: Spuštění buildu (Push)
#### Krok 3: Push na GitHub
```bash
git push origin main
```
- Pushne změny na GitHub main větev
- **Automaticky spustí GitHub Actions build**
- Zobrazí informace o pushnutých commitech (např. `54cf527..25dd504`)

#### Krok 4: Ověření buildu
- GitHub Actions se spustí automaticky po push
- Build vytvoří nový APK/AAB s aktualizovanou verzí
- Sleduj progress na GitHub v sekci "Actions"

### Povinné kontroly před Git operacemi:
1. **Ověř změny:** Zkontroluj, že všechny změny jsou správné
2. **Verze:** PŘED KAŽDÝM COMMITEM se MUSÍŠ zeptat uživatele, zda není potřeba zvýšit verzi v `app.json`. Pokud ano:
   - Zvýšit `version` (např. z "1.2.2" na "1.2.3")
   - Zvýšit `android.versionCode` (např. z 7 na 8)
   - Přidat informaci o změně verze do commit message
3. **Testy:** Ujisti se, že aplikace funguje správně
4. **Commit message:** Použij strukturovanou zprávu podle vzoru výše

### Kdy používat tento postup:
- **Po každé významné změně** v kódu
- **Před vydáním nové verze** aplikace
- **Po opravě chyb** nebo přidání funkcí
- **Na výslovnou žádost uživatele** s formulací typu "ulož změny na Git a spusť build"

### Příklad kompletního postupu:
```bash
# 1. Příprava
git add .

# 2. Commit s popisem
git commit -m "Bump version to 1.2.3 and fix UI issues

- Update version from 1.2.2 to 1.2.3 (versionCode 7 → 8)
- Fix Android adaptive icon configuration
- Change 'Cíle' to 'Cíl' in statistics display
- Update project documentation"

# 3. Push a spuštění buildu
git push origin main
```

### Důležité upozornění:
- **NIKDY** neprováděj tyto operace automaticky
- **VŽDY** čekej na explicitní pokyn uživatele
- **INFORMUJ** uživatele o výsledku každého kroku
- **OVĚŘ** úspěšnost GitHub Actions buildu

# KLÍČOVÉ PRAVIDLO 12: Workflow pro Nový Projekt (Git, EAS, Google Play)

Tento dokument slouží jako standardizovaný "checklist" pro nastavení nového React Native (Expo) projektu, jeho propojení s Gitem a GitHub Actions, a následnou přípravu na publikaci v obchodě Google Play. Je založen na ověřeném workflow z projektu FitTracker.

---

### Fáze 0: Založení Projektu a Lokální Git

**Cíl:** Mít čistý projekt pod verzovací kontrolou.

1.  **Vytvoření Expo Aplikace:** `npx create-expo-app NazevNoveAplikace`
2.  **Inicializace Gitu:**
    *   `git init`
    *   Vytvořit nebo zkopírovat `.gitignore`.
    *   `git add .`
    *   `git commit -m "Initial commit"`
3.  **Nastavení `app.json`:**
    *   **Okamžitě nastavit klíčové údaje:**
        *   `name`: "Název Aplikace"
        *   `slug`: "nazev-aplikace"
        *   `android.package`: "com.vasenazev.nazevaplikace" ( **NEMĚNIT po publikaci!** )
        *   `version`: "1.0.0"
        *   `android.versionCode`: `1`

---

### Fáze 1: Propojení s GitHubem a Automatizace (GitHub Actions)

**Cíl:** Nastavit vzdálený repozitář a automatické buildy.

1.  **Vytvoření GitHub Repozitáře:** Na GitHub.com vytvořit nový **prázdný** repozitář.
2.  **Propojení a Push:**
    *   `git remote add origin VASE_URL_Z_GITHUBU.git`
    *   `git branch -M main`
    *   `git push -u origin main`
3.  **Nastavení GitHub Actions pro EAS Build:**
    *   Vytvořit soubor `.github/workflows/eas-build.yml`.
    *   Zkopírovat osvědčený obsah workflow (např. z projektu FitTracker).
    *   **Nastavit `EXPO_TOKEN` v GitHub Secrets:**
        1.  Vytvořit token na [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens).
        2.  Vložit ho jako secret s názvem `EXPO_TOKEN` v nastavení GitHub repozitáře (`Settings > Secrets and variables > Actions`).

---

### Fáze 2: Správa Podepisovacího Klíče (Android Keystore)

**Cíl:** Správně a bezbolestně nastavit podepisovací klíče pro Android.

1.  **Použít EAS pro správu klíčů:** V `eas.json` se ujistit, že **není** nastaveno `credentialsSource: "local"`. Výchozí hodnota `remote` je správná.
2.  **První Produkční Build:**
    *   Spustit: `npx eas build --platform android --profile production`
    *   Na dotaz **"Generate a new Android Keystore?"** odpovědět **ANO (`Y`)**.
    *   Tímto je klíč bezpečně vygenerován a uložen na Expo serverech pro všechny budoucí buildy.
3.  **Získání Otisků Klíče (SHA-1) pro Google:**
    *   Spustit: `npx eas credentials`
    *   Vybrat projekt a platformu (Android).
    *   Zkopírovat zobrazený **SHA-1 fingerprint**. Bude potřeba pro nastavení v Google Play Console.

---

### Fáze 3: Příprava Podkladů pro Google Play

**Cíl:** Připravit všechny potřebné materiály.

1.  **Zásady Ochrany Soukromí:**
    *   Připravit text zásad (např. zkopírováním z FitTracker a úpravou).
    *   Zajistit **veřejnou URL** pro tyto zásady (např. přes GitHub Pages).
2.  **Grafické Materiály:**
    *   Ikona aplikace: 512x512 px PNG.
    *   Hlavní obrázek (Feature Graphic): 1024x500 px.
    *   Snímky obrazovky (Screenshots).
3.  **Texty pro Obchod:**
    *   Krátký a dlouhý popis aplikace.

---

### Fáze 4: Publikace v Google Play Console

**Cíl:** Nahrát aplikaci a odeslat ji ke schválení.

1.  **Stažení Buildu:** Získat výsledný soubor `.aab` z dokončeného EAS buildu.
2.  **Vytvoření Aplikace v Console:**
    *   Založit novou aplikaci v [Google Play Console](https://play.google.com/console/).
3.  **Vyplnění Informací:**
    *   **Počáteční nastavení:** Vyplnit všechny dotazníky (Zásady ochrany soukromí s URL, Hodnocení obsahu, Bezpečnost dat atd.).
    *   **Hlavní záznam v obchodu:** Vyplnit texty a nahrát grafiku.
4.  **Nahrání Verze:**
    *   Přejít do sekce **"Interní testování"** nebo **"Produkce"**.
    *   Vytvořit novou verzi a nahrát `.aab` soubor.
    *   Uložit, zkontrolovat a odeslat ke schválení. 

# KLÍČOVÉ PRAVIDLO 13: ZÁKAZ MANIPULACE S PRODUKČNÍM KLÍČEM (FitTracker)

**Princip: Produkční podepisovací klíč pro Android je po schválení Googlem absolutně neměnný. Jakákoliv manipulace s ním je zakázána a vede k selhání uploadu do Google Play.**

**1. Identita Správného Klíče:**
*   Jediný platný klíč pro podepisování produkčních buildů (`.aab`) je ten, který je na EAS serveru pojmenován **"Hlavni product klic"** (nebo "FitTracker Production Keystore").
*   Jeho otisk certifikátu **SHA-1** je: `A5:45:27:3E:C5:EF:DD:8A:84:83:A9:78:FB:61:CA:9C:B5:BF:9B:47`
*   Tento otisk **MUSÍ** odpovídat otisku v **Google Play Console** -> **Integrita aplikace** -> **Certifikát klíče pro nahrávání**.

**2. Zakázané Operace:**
*   Je **STRIKTNĚ ZAKÁZÁNO** v nástroji `eas credentials` pro platformu Android volit následující možnosti:
    *   `Delete your keystore`
    *   `Set up a new keystore`
    *   `Change default keystore`
*   Je **ZAKÁZÁNO** měnit jakékoliv hodnoty týkající se `credentials` v souboru `eas.json` pro produkční profil.

**3. Povolené Operace (Kontrola):**
*   Jediná povolená operace v `eas credentials` je **ověření**. Slouží ke kontrole, že na serverech Expo je stále nahraný klíč se správným SHA-1 otiskem.
*   Při jakémkoliv problému s podepisováním je **PRVNÍM KROKEM VŽDY KONTROLA, NIKOLIV ZMĚNA.** Spusťte `eas credentials`, vyberte Android a porovnejte SHA1 Fingerprint s hodnotou uvedenou v tomto pravidle.

**4. Postup při katastrofě (Disaster Recovery):**
*   Pokud by byl klíč prokazatelně ztracen nebo smazán, je nutné požádat podporu Google o resetování klíče pro nahrávání pomocí nově vygenerovaného `.pem` certifikátu. Toto je krajní řešení.

---

# KLÍČOVÉ PRAVIDLO 14: Ověřený postup pro iOS Build a Nahrání

Tento postup shrnuje ověřené kroky pro sestavení a nahrání iOS aplikace do App Store Connect pomocí terminálu.

**Předpoklady:**
*   V `app.json` je správně nastaven `ios.bundleIdentifier`.
*   Aplikace je již založena v App Store Connect.
*   Distribuční certifikáty a profily jsou spravovány přes EAS (viz první spuštění).

**Krok 1: Sestavení aplikace (`.ipa`)**
*   Build se spouští přes GitHub Actions výběrem platformy `ios`.
*   Alternativně lze spustit lokálně v terminálu:
    ```bash
    eas build --platform ios --profile production
    ```
*   Tento příkaz vytvoří podepsaný `.ipa` soubor na serverech Expo.

**Krok 2: Nahrání buildu do App Store Connect (manuálně z terminálu)**
*   Po dokončení buildu je nutné spustit nahrávání ručně.

1.  **Příkaz pro nahrání:**
    *   V terminálu spusťte:
        ```bash
        eas submit --platform ios --latest
        ```
    *   `--latest` automaticky najde poslední úspěšný build a nahraje ho.
    *   Při prvním spuštění si EAS vyžádá přihlašovací údaje k Apple účtu.

2.  **Ověření úspěšnosti:**
    *   Terminál vypíše potvrzení `✔ Submitted your app to Apple App Store Connect!`.
    *   Nový build se objeví v **App Store Connect** v sekci **TestFlight** se statusem "Processing". 