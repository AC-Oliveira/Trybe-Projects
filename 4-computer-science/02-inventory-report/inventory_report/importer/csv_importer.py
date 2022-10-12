import csv
import re
from inventory_report.importer.importer import Importer


class CsvImporter(Importer):
    @classmethod
    def import_data(cls, path):
        try:
            extension = re.findall("(\.[a-z]*)", path)[0]
            if (extension != '.csv'):
                raise ValueError
        except ValueError:
            raise ValueError('Arquivo inválido')
        with open(path) as file:
            data = list(csv.DictReader(file))
        return data
