class TrackOrders:
    # aqui deve expor a quantidade de estoque
    def __init__(self) -> None:
        self.orders = []

    def __len__(self):
        return len(self.orders)

    def add_new_order(self, customer, order, day):
        self.orders.append({'customer': customer, 'order': order, 'day': day})

    def get_most_ordered_dish_per_customer(self, customer):
        customer_dishes = {}
        for order in self.orders:
            if order['customer'] == customer:
                if not customer_dishes.get(order['order']):
                    customer_dishes.update({order['order']: 1})
                else:
                    customer_dishes['{}'.format(order['order'])] += 1
        return max(customer_dishes, key=customer_dishes.get)

    def get_never_ordered_per_customer(self, customer):
        all_customers_orders = []
        customer_orders = []
        for order in self.orders:
            if order['order'] not in all_customers_orders:
                all_customers_orders.append(order['order'])
            if order['customer'] == customer:
                customer_orders.append(order['order'])
        orders_never_ordered = set(filter(
            lambda day: day not in customer_orders, all_customers_orders))
        return orders_never_ordered

    def get_days_never_visited_per_customer(self, customer):
        all_customers_days = []
        customer_days = []
        for order in self.orders:
            if order['day'] not in all_customers_days:
                all_customers_days.append(order['day'])
            if order['customer'] == customer:
                customer_days.append(order['day'])
        days_never_ordered = set(filter(
            lambda day: day not in customer_days, all_customers_days))
        return days_never_ordered

    def get_busiest_day(self):
        pass

    def get_least_busy_day(self):
        pass


# teste = TrackOrders()
# print(len(teste))
