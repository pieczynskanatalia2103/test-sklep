# Sklep ze świecami — lokalny frontend

Prosty demonstracyjny sklep sprzedający świece. To jest statyczna aplikacja frontendowa — nie wymaga backendu.

Jak uruchomić:

1. Otwórz plik [index.html](index.html) w przeglądarce.

Lub uruchom prosty serwer (zalecane, aby uniknąć ograniczeń CORS przy obrazkach):

```bash
# z katalogu projektu
python -m http.server 8000
# potem otwórz http://localhost:8000
```

Funkcje:
- Strona główna: galeria produktów z przyciskami "Dodaj do koszyka".
- Mój koszyk: pokazuje zawartość koszyka (przechowywaną w localStorage).
- Możliwość usuwania pozycji i wyczyszczenia koszyka.
