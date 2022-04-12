SELECT t2.ContactName AS `Nome de contato`, t1.OrderDate AS `Data do pedido`,
IF (ShipperID = 1, 'Speedy Express', 'United Package') AS `Empresa que fez o envio`
FROM w3schools.orders AS t1
INNER JOIN customers AS t2 
ON t1.CustomerID = t2.CustomerID
WHERE (ShipperID = 1 OR ShipperID = 2)
ORDER BY `Nome de contato` ASC, `Empresa que fez o envio` ASC, `Data do pedido`;
