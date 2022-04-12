SELECT DISTINCT CONCAT_WS(' ', t1.FirstName, t1.LastName) AS `Nome completo`,
COUNT(*) AS `Total de pedidos`
FROM w3schools.orders AS t2
JOIN w3schools.employees AS t1
ON t2.EmployeeID = t1.EmployeeID
GROUP BY t1.EmployeeID
ORDER BY `Total de pedidos` ASC;
