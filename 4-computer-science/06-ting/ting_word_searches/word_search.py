def exists_word(word, instance):
    """Aqui irá sua implementação"""
    index = 0
    data = []
    while index < len(instance):
        result = []
        given = instance.search(index)
        file_line = 1
        for line in given["linhas_do_arquivo"]:
            if word in line or word.capitalize() in line:
                result.append({
                    "linha": file_line
                    })

            file_line += 1
        index += 1
        if len(result) > 0:
            data.append({
                "palavra": word,
                "arquivo": given["nome_do_arquivo"],
                "ocorrencias": result
            })

    return data


def search_by_word(word, instance):
    """Aqui irá sua implementação"""
    index = 0
    data = []
    while index < len(instance):
        result = []
        given = instance.search(index)
        file_line = 1
        for line in given["linhas_do_arquivo"]:
            if word in line or word.capitalize() in line:
                result.append({
                    "linha": file_line,
                    "conteudo": line
                    })

            file_line += 1
        index += 1
        if len(result) > 0:
            data.append({
                "palavra": word,
                "arquivo": given["nome_do_arquivo"],
                "ocorrencias": result
            })

    return data
