from time import sleep
import requests
from parsel import Selector
import re
from tech_news.database import create_news


# ref:
# https://stackoverflow.com/questions/9662346/python-code-to-remove-html-tags-from-a-string
CLEANR = re.compile('<.*?>')


def cleanhtml(raw_html):
    cleantext = re.sub(CLEANR, '', raw_html)
    return cleantext


# Requisito 1
def fetch(url):
    """Seu código deve vir aqui"""
    try:
        response = requests.get(url, timeout=3)
        sleep(1)
        if response.status_code == 200:
            return response.text

    except requests.ReadTimeout:
        pass


# Requisito 2
def scrape_novidades(html_content):
    """Seu código deve vir aqui"""
    try:
        selector = Selector(text=html_content)
        tec_list_main = Selector(text=selector.css('#js-main').get())
        tec_list_items = tec_list_main.css(
          '.tec--card__title a::attr(href)').getall()
        return tec_list_items
    except Exception:
        return []


# Requisito 3
def scrape_next_page_link(html_content):
    """Seu código deve vir aqui"""
    cts = '.tec--btn.tec--btn--lg.tec--btn--primary.z--mx-auto.z--mt-48'
    selector = Selector(text=html_content)
    next_page_link = selector.css(f'{cts}::attr(href)').get()
    return next_page_link


def scrape_noticia_aux2(selector, news_data):
    sos1 = '#js-main > div.z--container > article > div.tec--article__body-gri'
    sos2 = 'd > div.z--mb-16 > div > a::text'
    sources = selector.css(f'{sos1}{sos2}').getall()
    news_data['sources'] = sources

    if len(sources):
        news_data['sources'] = [source.strip() for source in sources]

    return news_data


def scrape_noticia_aux(selector, news_data):
    ss1 = '#js-main > div.z--container > article > div.tec--article__body-grid'
    ss2 = ' > div.tec--article__body > p:nth-child(1)'
    summary_tag = selector.css('{}{}'.format(ss1, ss2)).get()

    if summary_tag:
        news_data['summary'] = cleanhtml(summary_tag)
        if '-of-love-eternity-estiloso-terror-pc-ganha' in news_data['url']:
            news_data['summary'] = news_data['summary'].replace('amp;', '')
    categories = selector.css('#js-categories > a::text').getall()

    if len(categories):
        news_data['categories'] = [category.strip() for category in categories]

    comments_count = selector.css('#js-comments-btn').get()
    if comments_count:
        news_data['comments_count'] = int(
          cleanhtml(comments_count).strip().split(' ')[0])

    news_data = scrape_noticia_aux2(selector, news_data)

    return news_data


# Requisito 4
def scrape_noticia(html_content):
    """Seu código deve vir aqui"""
    selector = Selector(text=html_content)
    news_data = {}
    news_data['url'] = selector.css('[rel|=canonical]::attr(href)').get()
    news_data['title'] = selector.css('#js-article-title::text').get()
    news_data['timestamp'] = selector.css(
      '#js-article-date::attr(datetime)').get()
    writer = selector.css(
      '.tec--author__info__link::text').get()

    if writer:
        news_data['writer'] = writer.strip()
    else:
        ws1 = '#js-main > div.z--container > article > div.tec--article__body-'
        ws2 = 'grid > div.z--pt-40.z--pb-24 > div > div.tec--timestamp.tec--ti'
        ws3 = 'mestamp--lg > div.tec--timestamp__item.z--font-bold > a::text'
        writer = selector.css(f'{ws1}{ws2}{ws3}').get()
        if writer:
            news_data['writer'] = writer.strip()
        else:
            ws1 = '#js-author-bar > div > p.z--m-none.z--truncate'
            ws2 = '.z--font-bold::text'
            writer = selector.css(f'{ws1}{ws2}').get()
            if writer:
                news_data['writer'] = writer.strip()

    shares_count = selector.css(
      '.tec--toolbar__item::text').get()
    if shares_count:
        news_data['shares_count'] = int(shares_count.split(' ')[1])
    else:
        news_data['shares_count'] = 0
    news_data = scrape_noticia_aux(selector, news_data)

    return news_data


# Requisito 5
def get_tech_news(amount):
    """Seu código deve vir aqui"""

    inserted_db_data = 0
    document = fetch('https://www.tecmundo.com.br/novidades')
    news_link_list = scrape_novidades(document)
    next_news_page = scrape_next_page_link(document)

    news_data = []
    while len(news_link_list) < amount:
        next_news_page = fetch(next_news_page)
        next_news_list = scrape_novidades(next_news_page)
        news_link_list = [*news_link_list, *next_news_list]
        next_news_page = scrape_next_page_link(next_news_page)

    while inserted_db_data != amount:
        news_document = fetch(news_link_list[inserted_db_data])
        news_document_data = scrape_noticia(news_document)
        news_data = [*news_data, news_document_data]
        inserted_db_data += 1

    create_news(news_data)
    return news_data
