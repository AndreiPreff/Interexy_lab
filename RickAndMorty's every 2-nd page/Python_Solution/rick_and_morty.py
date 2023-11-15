import requests

def get_rick_and_morty_data(page):
    url = f'https://rickandmortyapi.com/api/character/?page={page}'
    response = requests.get(url)
    data = response.json()
    return data

def display_every_second_page():
    # Изначально получим данные для первой страницы, чтобы узнать общее количество страниц
    first_page_data = get_rick_and_morty_data(1)
    total_pages = first_page_data['info']['pages']

    for page in range(2, total_pages + 1, 2):
        data = get_rick_and_morty_data(page)
        characters = data.get('results', [])
        
        print(f'\nPage {page}:')
        for character in characters:
            print(f"Name: {character['name']}, Status: {character['status']}")

def main():
    display_every_second_page()

if __name__ == "__main__":
    main()

