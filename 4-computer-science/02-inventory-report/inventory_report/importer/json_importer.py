from inventory_report.importer.importer import Importer
import re
import json


class JsonImporter(Importer):
    @classmethod
    def import_data(cls, path):
        try:
            extension = re.findall("(\.[a-z]*)", path)[0]
            if (extension != '.json'):
                raise ValueError
        except ValueError:
            raise ValueError('Arquivo inválido')

        file = open(path)
        data = json.load(file)
        return data
