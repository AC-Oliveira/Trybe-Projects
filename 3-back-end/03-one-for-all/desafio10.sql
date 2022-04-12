DELIMITER $$ 

CREATE FUNCTION quantidade_musicas_no_historico(id_usuario INT) 
RETURNS INT READS SQL DATA
BEGIN
DECLARE quantidade INT;
SELECT COUNT(musica_id) AS `qtd` FROM Historico
GROUP BY usuario_id HAVING usuario_id = id_usuario  INTO quantidade;
RETURN quantidade;
END $$
DELIMITER ;
