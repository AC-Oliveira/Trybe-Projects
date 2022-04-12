SELECT t1.ContactName AS `Nome`, t1.Country AS `País`,
t2.Count - 1 AS `Número de compatriotas` FROM w3schools.customers AS t1
JOIN (
SELECT Country, COUNT(*) AS `Count` FROM w3schools.customers
GROUP BY Country
HAVING `Count` > 1
) AS t2
ON t1.Country = t2.Country
ORDER BY `Nome` ASC;
