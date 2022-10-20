import csv
import os

info = {'maria': {}, 'arnaldo': 0, 'joao': {'days': [], 'meal': []}}


def maria_food_calc(client):
    if client['name'] == 'maria':
        if not info['maria'].get(client['food']):
            info['maria'].update({client['food']: 1})
        else:
            info['maria']["{}".format(client['food'])] += 1


def analyze_aux(client):
    if client['name'] == 'arnaldo' and client['food'] == 'hamburguer':
        info['arnaldo'] += 1
    if client['name'] == 'joao':
        info['joao']['days'].append(client['day'])
        info['joao']['meal'].append(client['food'])


def write_logs(days, foods):
    jday = set(info['joao']['days'])
    jmeal = set(info['joao']['meal'])
    days_not_ordered = set(filter(lambda day: day not in jday, days))
    foods_not_ordered = set(filter(lambda meal: meal not in jmeal, foods))
    mmost_ordered = max(info['maria'], key=info['maria'].get)
    fstring = f"{mmost_ordered}\n{info['arnaldo']}\n"
    canpaing_result = f"{fstring}{foods_not_ordered}\n{days_not_ordered}"

    file_rpath = '../data/mkt_campaign.txt'
    file_path = os.path.join(os.path.dirname(__file__), file_rpath)
    file = open(file_path, 'w+')
    file.write(canpaing_result)


def handleError(path_to_file):
    extension = path_to_file.split('.')[-1]
    if extension != 'csv':
        raise FileNotFoundError(f'Extensão inválida.{path_to_file}')
    raise FileNotFoundError(f'Arquivo inexistente.{path_to_file}')


def handle_client_info(clients_info):
    foods = []
    days = []

    for client in clients_info:
        if client['food'] not in foods:
            foods.append(client['food'])
        if client['day'] not in days:
            days.append(client['day'])
        maria_food_calc(client)
        analyze_aux(client)
    return [days, foods]


def analyze_log(path_to_file):
    try:
        with open(path_to_file, 'r') as csv_file:
            csv_reader = csv.reader(csv_file)
            dict_keys = ['name', 'food', 'day']
            clients_info = [dict(
                zip(dict_keys, clients)) for clients in csv_reader]

    except FileNotFoundError:
        handleError(path_to_file)

    [days, foods] = handle_client_info(clients_info)
    write_logs(days, foods)
