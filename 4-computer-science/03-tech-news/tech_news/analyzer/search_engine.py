import re
from tech_news.database import search_news
from datetime import datetime


# ref:
# https://stackoverflow.com/questions/8246019/case-insensitive-search-in-mongo

# Requisito 6
def search_by_title(title):
    """Seu código deve vir aqui"""
    found_titles = search_news({'title': re.compile(title, re.IGNORECASE)})
    tuple_data = [(data['title'], data['url']) for data in found_titles]
    return tuple_data


# Requisito 7
def search_by_date(date):
    """Seu código deve vir aqui"""
    try:
        datetime.strptime(date, '%Y-%m-%d')
    except ValueError:
        raise ValueError('Data inválida')

    found_dates = search_news({'timestamp': {'$regex': f'{date}'}})
    tuple_data = [(data['title'], data['url']) for data in found_dates]
    return tuple_data


# Requisito 8
def search_by_source(source):
    """Seu código deve vir aqui"""
    found_titles = search_news({'sources': re.compile(source, re.IGNORECASE)})
    tuple_data = [(data['title'], data['url']) for data in found_titles]
    return tuple_data


# Requisito 9
def search_by_category(category):
    """Seu código deve vir aqui"""
    found_titles = search_news(
      {'categories': re.compile(category, re.IGNORECASE)})
    tuple_data = [(data['title'], data['url']) for data in found_titles]
    return tuple_data
