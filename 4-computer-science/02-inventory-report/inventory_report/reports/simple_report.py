from datetime import date
import time


class SimpleReport:
    @classmethod
    def generate(cls, report) -> str:
        omd: str = cls.oldest_manufacture_date(report)
        ced: str = cls.closer_expiration_date(report)
        companies_stock: dict = cls.company_products(report)
        cwms: str = cls.company_with_more_products(companies_stock)
        return f"{omd}\n{ced}\n{cwms}\n"

    def companies_stock(self, report: list) -> dict:
        stock: dict = self.company_products(report)
        return stock

    @staticmethod
    def oldest_manufacture_date(date_list: list) -> str:
        dates_list: list[str] = list(
          map(lambda item: item["data_de_fabricacao"], date_list)
        )
        dates_list.sort()
        oldest_date: str = f'Data de fabricação mais antiga: {dates_list[0]}'
        return oldest_date

    @staticmethod
    def closer_expiration_date(expiration_list: list) -> str:
        todaystr: str = date.today().strftime("%Y-%m-%d")
        today: time.struct_time = time.strptime(todaystr, "%Y-%m-%d")

        expiration_date_list: list = list(
          map(
            lambda item: time.strptime(
              item["data_de_validade"], "%Y-%m-%d"), expiration_list
          )
        )

        dates_to_expire: list = list(filter(
          lambda date: date >= today, expiration_date_list
        ))
        dates_to_expire.sort()

        year: int = dates_to_expire[0][0]
        month: int = dates_to_expire[0][1]
        m: str = f"{month}" if month >= 10 else f"0{month}"
        day: int = dates_to_expire[0][2]
        d: str = f"{day}" if day >= 10 else f"0{day}"
        closest_date: str = f"Data de validade mais próxima: {year}-{m}-{d}"

        return closest_date

    @staticmethod
    def company_products(product_list: list) -> dict:
        companies_products_count: dict = {}
        for company in product_list:
            if company["nome_da_empresa"] not in companies_products_count:
                companies_products_count[company["nome_da_empresa"]] = 1
            else:
                companies_products_count[company["nome_da_empresa"]] += 1

        return companies_products_count

    @staticmethod
    def company_with_more_products(companies_stock: dict) -> str:
        values_list: list = list(companies_stock.values())
        values_list.sort(reverse=True)
        highestvalue: int = values_list[0]

        company_with_more_stock: str = list(
          companies_stock.keys())[
          list(companies_stock.values()).index(highestvalue)]

        string: str = "Empresa com maior quantidade de produtos estocados: "

        return f"{string}{company_with_more_stock}"
