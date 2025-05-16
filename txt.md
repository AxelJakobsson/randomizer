# Vad jag har gjort
En hemsida där man kan rulla en randomizad champion från league of legends. Den använder sig av Data Dragon vilket är en statisk API från Riot Games. 

På startsidan finns det en knapp för att rulla sin randomizad champion men det finns också selections i headern där man kan välja att bara få champions från vissa roller (top, jungle, mid, bottom, adc). \
Dessa går att välja mellan och ifall man väljer två eller fler så kan man bara rulla champions från de rollerna. 
Detta är dock manuellt inmatad information så det kan variera lite från vilka lanes som någon annan tycker att en champion kan vara på från vad jag tycker, det är bara inmatade i arrays beroende på vilka lanes som jag tycker att den championen kan spela.

Förutom det så finns det en filter sida där man kan filtrera vilka champions som man vill att randomizern kan utgå från. Detta kan vara bra ifall det är någon champion man verkligen inte gillar eller ifall man inte äger alla champions. Sidan använder localstorage för att spara information om champions som är filtrerade. 

Det finns också en toggle för light mode och dark mode på sidan, när man först går in på sidan så väljs det automatiskt åt en beroende på vad sitt system eller browser default value är. Ifall man har dark mode som default på sin browser kommer man att få det på sidan. Efter att man har varit in på sidan en gång så sparas också detta värde i localstorage så att sidan kommer ihåg ens val. Detta är bra ifall man vill ha dark mode på sidan men inte sin browser så man byter när man väl är inne på sidan och då kommer sidan alltid vara på dark mode när man går in på den. 

För att byta färger från dark- och light mode så använder jag mig av variabler för färgerna i css. Light mode variablerna är i rooten och dark mode variablerna är i en klass som jag sedan lägger till på bodyn ifall dark mode är på. 

# Problemlösning

# Dokumentation

# Analys och reflektion


