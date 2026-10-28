# Gyogyszereszeti Kar - Oktatoi Kartyaracs (umfst-p06-oktatok)

Ez a projekt a Gyogyszereszeti Kar "Ismerd meg oktatoinkat" oldala szamara keszult reszponziv, akadalymentes es animalt 3D kartyaracs megvalositasa.

## Az animacio felepitese

1. **3D Flip Animacio**:
   - A kartyak `perspective: 1000px` es `transform-style: preserve-3d` tulajdonsagokat hasznalnak a terhatas eleresehez.
   - A kartyak elo- es hatoldala `backface-visibility: hidden` beallitassal rendelkezik, megelozve az atfedesi hibakat.
   - Forgatas billentyuzettel: A kartya belseje megfordul, ha az elem `:hover` vagy `:focus-within` allapotba kerul.

2. **Lepcsozetes (Staggered) Belepes**:
   - A kartyak sorban jelennek meg az oldal betoltesekor.
   - A kesleltetest CSS custom variable (`--card-index`) segitsegevel szamolja a stiluslap: `animation-delay: calc(var(--card-index) * 0.1s)`.

3. **Interaktiv Glare Effect**:
   - Egermozgas soran JavaScript frissiti a `--mouse-x` es `--mouse-y` valtozokat, ami dinamikus csillanast hoz letre a kartyakon.

## Reduced-Motion Strategia

A megvalositas kiemelt figyelmet fordit az akadalymentessegre:
- `@media (prefers-reduced-motion: reduce)` media query figyelese.
- Amennyiben a felhasznalo csokkentett mozgast kert az operacios rendszerben, a 3D forgatas kikapcsolasra kerul (`transform: none`).
- A forgatas helyett finom, zokkenomentes attunes (cross-fade) lep eletbe (`opacity` csere az elolap es hatoldal kozott).

## Akadalymentesseg es Kepernyoolvaso Tamogatas

- A hatoldal tartalma soha nincs `display: none`-nal elrejtve, igy a kepernyoolvasok es a billentyuzettel navigalo felhasznalok (Tab billentyu) konnyen elerik.
- Erintoeszkozokon (`@media (hover: none)`) dedikalt gombok teszik lehetove a forditast, amelyek frissitik az `aria-pressed="true/false"` allapotot.

## Bongeszotamogatas es Teljesitmeny

- **Bongeszotamogatas**: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari.
- **View Transitions API**: A tanszeki szuro gombok tamogatas eseten zokkenomentes elrendezes-valtast biztositanak.
- **Teljesitmeny**: Az animaciok kizarolag `transform` es `opacity` CSS tulajdonsagokat modositjak. Ennek koszonhetoen a DevTools Performance felvetelen nincs Layout vagy Paint peak, egyedul a Composite fazis fut, biztositva a stabil 60 fps sebesseget.

## Szallitando Eszkozek es Dokumentacio

- `index.html` - Struktura es akadalymentes elemek
- `style.css` - 3D transform, Grid elrendezes, CSS valtozok
- `app.js` - Touch kezeles, Glare kovetes, View Transitions
- `docs/flip.gif` - Animacios demo GIF a hover-rol, fokuszrol es reduced-motion modrol
- `docs/performance.png` - DevTools Performance felvetel kepernyokepe
