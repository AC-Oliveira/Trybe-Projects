import sys


def txt_importer(path_file):
    file_extension = path_file.split('.')[-1]
    if file_extension != 'txt':
        sys.stderr.write("Formato inválido\n")

    try:
        with open(path_file, 'r') as file:
            content = file.readlines()
            formated_content = []
            for line in content:
                formated_content.append(line.replace('\n', ''))
            return formated_content
    except FileNotFoundError:
        message = f'Arquivo {path_file} não encontrado\n'
        sys.stderr.write(message)
