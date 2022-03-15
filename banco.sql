--Table
create table alunos (
	id serial not null primary key, 
	nome varchar(50) not null,
	matricula varchar(30) not null,
	cpf varchar(14) not null,
	periodo integer not null,
	curso varchar(200) not null
);

--Registros
insert into alunos (nome, matricula, cpf, periodo, curso) 
			  values ('Christofer Luiz Sega', '20181pf.cc0094', '828.340.950-60', 7, 'Ciência da Computação'),
			         ('Cleisson Gotardo', '20181pf.cc0086', '288.323.390-05', 6, 'Ciência da Computação');