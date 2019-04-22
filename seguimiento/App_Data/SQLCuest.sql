create table dbCuestionario(
	folio_Cuestion int primary key not null identity(1,1),
	Nom_Cuestionario varchar(350) not null,
	estatus bit default 1 not null 
)
create table menu_cuestionarios(
	folio int primary key not null identity(1,1),
	orden int not null,
	folio_Cuestiono int not null,
	folio_preguntas int not null,
	ponderacion int not null default 1,
)

select * from dbCuestionario WHERE Nom_Cuestionario= 'un cuestionario'
select * from menu_cuestionarios
select * from dbPreguntas

SELECT * FROM dbCuestionario WHERE Nom_Cuestionario= '@variable'



INSERT INTO dbCuestionario(Nom_Cuestionario,estatus) VALUES ('primer cuestionario prueba',1)


INSERT INTO cuestionarios(Num_Cuestionario,preguntas,ponderacion ) values(1,4,9)

create table check_list_menu(
	folio int primary key not null identity(1,1),
	folio_sucursal int not null,
	fecha datetime NOT NULL default getdate(),
	zona_inspeccion int not null,
	total_preguntas int not null,
	resultado varchar(10) not null,
	duracion time(2) not null
)
INSERT INTO menu_check_list(folio_sucursal,fecha,zona_inspeccion,total_preguntas,resultado,duracion) VALUES()
SELECT * FROM menu_check_list WHERE folio_sucursal=1 and  fecha=''  and zona_inspeccion=2 
DELETE FROM menu_check_list  WHERE folio_sucursal=1 and  fecha=''  and zona_inspeccion=2 



create table [check_list_mejora_continua](
	folio int primary key not null identity(1,1),
	folio_sucursal int not null,
	fecha datetime NOT NULL default getdate(),
	zona_inspeccion int not null,
	criterio_cuestion int not null,
	respuesta bit not null default 0,
	observaciones varchar(350) not null,
	usuario int not null
)


insert into check_list_establecimientos
(folio_sucursal,fecha,hora_inicio,hora_final,zona_inspeccion,criterio_cuestion,respuesta_si,respuesta_no,respuesta_na,observaciones,usuario) 
values()

SELECT * FROM check_list_establecimientos WHERE folio_sucursal=1 and  fecha=''  and criterio_cuestion=2 and zona_inspeccion=2

delete from check_list_establecimientos WHERE folio_sucursal=1 and  fecha=''  and criterio_cuestion=2 and zona_inspeccion=2

