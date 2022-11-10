# Implementation av varukorgen

Lösningen hämtar en lista av produkter från det mockade api:et och visar dem i en kortvy.
Genom att klicka på en Köp-knapp läggs produkten till i varukorgen.
Varukorgen kan öppnas och stängas genom att klicka på ikonen uppe till höger.
I varukorgen ser man de varor man lagt till, möjligheten finns också att ta bort samt öka antal.

Funktionen för att minska funkar just nu inte då jag inte fått PUT-endpointen att fungera.

Har tagit in material ui-biblioteket för användning av bl a ikoner.

Längst ned på sidan finns en knapp för att tömma varukorgen, den ligger där mest för att underlätta testning.

## Responsiv design

För produktvisningen har jag använt css grid för att skapa responsivitet.
För varukorgen används media queries.

## CSS

Använder främst styled components som bibliotek för css, det är det bibliotek jag är van vid att jobba med. Har dock även inkluderat en css-fil som t ex innehåller en variabel för sidans primärfärg.

## Testning

Har skrivit några enklare test med hjälp av react-testing-library och jest.

## DRY

Har försökt följa DRY-principen genom att se till att saker som används på flera olika ställen ligger så att de kan importeras och återanvändas.

## Tillgänglighet

Har tagit hänsyn till WCAG genom att använda aria-labels och roles, samt göra det möjligt att navigera med bara tangentbordet.

## Förbättringsområden

### Komponenter

Man skulle kunna bryta ut fler delar av koden till egna komponenter för att t ex underlätta testning.

### Funktioner

Även funktioner skulle kunna brytas ut och läggas separat.

### Felhantering

Har inte fokuserat på felhantering. Just nu är det bara en alert som skickas upp. Felen borde presenteras på ett annat sätt och kanske även loggas.

### Router

En router skulle kunna läggas till för bättre hantering av ev ytterligare sidor, t ex en produktsida.

### Testning

Kan så klart utökas att testa massa olika saker, t ex att rätt saker händer och visas när man interagerar via knappar.

### Ytterligare funktioner

En produktsida.
Paginering av produkterna för bättre prestanda.
