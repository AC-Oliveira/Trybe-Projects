DELIMITER $$ 

CREATE PROCEDURE albuns_do_artista(IN nome_artista VARCHAR(200)) 
BEGIN
SELECT t1.artista_nome AS `artista`, t2.album_nome AS `album` FROM Artistas AS t1, Albuns AS t2
WHERE t1.artista_id = t2.artista_id AND t1.artista_nome = nome_artista;
END $$
DELIMITER ;
