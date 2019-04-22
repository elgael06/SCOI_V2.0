
create table dbPreguntas(
	folio_pregunta int primary key not null identity(1,1),
	pregunta varchar(350) not null,
	estatus bit default 1 not null 
)
select * from dbPreguntas
INSERT INTO dbPreguntas(pregunta) VALUES ('Como cuando y donde')

 UPDATE dbPreguntas SET pregunta='cambiamos la pregunta', estatus=1 where folio_pregunta=1
SELECT * FROM dbPreguntas WHERE folio_pregunta= 1

delete from dbPreguntas where folio_pregunta= 1
SELECT folio_pregunta FROM dbPreguntas

UPDATE dbPreguntas SET folio_pregunta=2
SELECT folio_pregunta FROM dbPreguntas 

drop table dbPreguntas
