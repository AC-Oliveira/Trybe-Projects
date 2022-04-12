SELECT t2.ProductName AS `Produto`, ROUND(AVG(t1.Quantity), 2) AS `Média`,
MIN(t1.Quantity) AS `Mínima`, MAX(t1.Quantity) AS `Máxima`
FROM w3schools.order_details AS t1
JOIN w3schools.products AS t2
ON t1.ProductID = t2.ProductID
GROUP BY t1.ProductID
HAVING `Média` > 20
ORDER BY `Média` ASC, `Produto` ASC;
