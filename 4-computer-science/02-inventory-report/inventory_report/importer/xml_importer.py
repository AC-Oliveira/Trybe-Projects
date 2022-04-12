import xml.etree.ElementTree as ET
import re
from inventory_report.importer.importer import Importer


class XmlImporter(Importer):
    @classmethod
    def import_data(cls, path):
        try:
            extension = re.findall("(\.[a-z]*)", path)[0]
            if (extension != '.xml'):
                raise ValueError
        except ValueError:
            raise ValueError('Arquivo inválido')

        tree = ET.parse(path)
        root = tree.getroot()

        data = []
        for record in root:
            data.append({child.tag: child.text for child in record})

        return data
