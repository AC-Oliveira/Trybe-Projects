DELIMITER $$

CREATE TRIGGER trigger_usuario_delete
BEFORE DELETE ON Usuarios
FOR EACH ROW
BEGIN
DELETE FROM Historico WHERE Historico.usuario_id = OLD.usuario_id;
DELETE FROM Seguidos WHERE Seguidos.usuario_id = OLD.usuario_id;
END $$
DELIMITER ;
