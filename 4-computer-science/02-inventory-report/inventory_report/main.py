import sys
import re
from inventory_report.inventory.inventory_refactor import InventoryRefactor
from inventory_report.importer.csv_importer import CsvImporter
from inventory_report.importer.json_importer import JsonImporter
from inventory_report.importer.xml_importer import XmlImporter


def main_aux(extension, path, mode):
    report = ''
    extension_dict = {
        '.csv': CsvImporter,
        '.json': JsonImporter,
        '.xml': XmlImporter
    }

    instance = InventoryRefactor(extension_dict[extension])
    report = instance.import_data(path, mode)

    return report


def main():
    try:
        path = sys.argv[1]
        mode = sys.argv[2]

        if mode not in ['simples', 'completo']:
            raise Exception

        match = re.findall("(\.[a-z]*)", path)[0]
        report = main_aux(match, path, mode)

        print(report, end='')

    except Exception:
        sys.stderr.write('Verifique os argumentos')
        print(file=sys.stderr)
