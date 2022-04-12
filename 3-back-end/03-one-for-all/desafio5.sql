CREATE VIEW top_2_hits_do_momento AS
SELECT  t2.musica_nome AS `cancao`, COUNT(t1.musica_id) AS `reproducoes` FROM Historico AS t1, Musicas AS t2
WHERE t1.musica_id = t2.musica_id
GROUP BY musica_nome
ORDER BY `reproducoes` DESC,`cancao` ASC
LIMIT 2; 
