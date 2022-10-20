import sys
from ting_file_management.file_management import txt_importer


def process(path_file, instance):
    """Aqui irá sua implementação"""
    content = txt_importer(path_file)
    content_lines = len(content)
    data = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": content_lines,
        "linhas_do_arquivo": content
    }
    if data not in instance.queue:
        instance.enqueue(data)

    sys.stdout.write(f'{data}')


def remove(instance):
    """Aqui irá sua implementação"""
    if not len(instance):
        sys.stdout.write("Não há elementos\n")
    else:
        given = instance.dequeue()
        print(given)
        message = f'Arquivo {given["nome_do_arquivo"]} removido com sucesso\n'
        sys.stdout.write(message)


def file_metadata(instance, position):
    """Aqui irá sua implementação"""
    if position >= len(instance) or position < 0:
        sys.stderr.write("Posição inválida")
    else:
        data = instance.search(position)
        sys.stdout.write(f'{data}')
