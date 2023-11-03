CREATE DOMAIN tipo_cpf AS CHAR(11)
    CHECK (VALUE ~ '^[0-9]{11}$');

CREATE DOMAIN tipo_turno AS CHAR(5)
    CHECK (VALUE IN ('Manhã', 'Tarde', 'Noite'));

CREATE DOMAIN tipo_log AS VARCHAR(2)
    CHECK (VALUE IN ('I', 'U', 'D', 'II', 'UI', 'DI'));

CREATE TABLE IF NOT EXISTS Pessoa(
    id SERIAL,
    cpf tipo_cpf NOT NULL UNIQUE,
    primeiroNome VARCHAR(50) NOT NULL,
    sobreNome VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Telefone(
    id SERIAL,
    codigoPais VARCHAR(3) NOT NULL DEFAULT '55',
    codigoArea CHAR(2) NOT NULL,
    numero VARCHAR(9) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Endereco(
    id SERIAL,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Turma(
    id SERIAL,
    codTurma VARCHAR(50) NOT NULL,
    turno tipo_turno NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Ingrediente(
    id SERIAL,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Refeicao(
    id SERIAL,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS RefeicaoIngrediente(
    id SERIAL,
    idRefeicao INTEGER NOT NULL,
    idIngrediente INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(idRefeicao) REFERENCES Refeicao(id),
    FOREIGN KEY(idIngrediente) REFERENCES Ingrediente(id)
);

CREATE TABLE IF NOT EXISTS FichaAlimentar(
    id SERIAL,
    observacao VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS FichaRestricaoIngrediente(
    id SERIAL,
    idFichaAlimentar INTEGER NOT NULL,
    idIngrediente INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(idFichaAlimentar) REFERENCES FichaAlimentar(id),
    FOREIGN KEY(idIngrediente) REFERENCES Ingrediente(id)
);

CREATE TABLE IF NOT EXISTS FichaAlimentarLog(
    id SERIAL,
    idFichaAlimentar INTEGER NOT NULL,
    dataHora TIMESTAMP NOT NULL,
    tipoLog tipo_log NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(idFichaAlimentar) REFERENCES FichaAlimentar(id)
);

CREATE TABLE IF NOT EXISTS Responsavel(
    id SERIAL,
    idPessoa INTEGER NOT NULL UNIQUE,
    idTelefonePrincipal INTEGER NOT NULL UNIQUE, --garante pelo menos um telefone
    idEnderecoPrincipal INTEGER NOT NULL UNIQUE, --garante pelo menos um endereço
    PRIMARY KEY(id),
    FOREIGN KEY(idPessoa) REFERENCES Pessoa(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(idTelefonePrincipal) REFERENCES Telefone(id),
    FOREIGN KEY(idEnderecoPrincipal) REFERENCES Endereco(id)
);

CREATE TABLE IF NOT EXISTS ReponsavelTelefone(
    idResponsavel INTEGER NOT NULL,
    idTelefone INTEGER NOT NULL,
    PRIMARY KEY(idResponsavel, idTelefone),
    FOREIGN KEY(idResponsavel) REFERENCES Responsavel(id),
    FOREIGN KEY(idTelefone) REFERENCES Telefone(id)
);

CREATE TABLE IF NOT EXISTS ReponsavelEndereco(
    idResponsavel INTEGER NOT NULL,
    idEndereco INTEGER NOT NULL,
    PRIMARY KEY(idResponsavel, idEndereco),
    FOREIGN KEY(idResponsavel) REFERENCES Responsavel(id),
    FOREIGN KEY(idEndereco) REFERENCES Endereco(id)
);

CREATE TABLE IF NOT EXISTS Aluno(
    id SERIAL,
    idPessoa INTEGER NOT NULL UNIQUE,
    matricula VARCHAR(50) NOT NULL UNIQUE,
    idResponsavel INTEGER NOT NULL UNIQUE,
    parentescoResponsavel VARCHAR(50) NOT NULL,
    idFichaAlimentar INTEGER NOT NULL UNIQUE,
    PRIMARY KEY(id),
    FOREIGN KEY(idPessoa) REFERENCES Pessoa(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(idResponsavel) REFERENCES Responsavel(id) ON UPDATE CASCADE,
    FOREIGN KEY(idFichaAlimentar) REFERENCES FichaAlimentar(id)
);

CREATE TABLE IF NOT EXISTS Enturmacao(
    id SERIAL,
    idAluno INTEGER NOT NULL,
    idTurma INTEGER NOT NULL,
    ano INTEGER NOT NULL,
    atual BOOLEAN NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(idAluno) REFERENCES Aluno(id),
    FOREIGN KEY(idTurma) REFERENCES Turma(id)
);

CREATE TABLE IF NOT EXISTS AlunoRefeicao(
    idAluno INTEGER NOT NULL,
    idRefeicao INTEGER NOT NULL,
    dataHora TIMESTAMP NOT NULL,
    PRIMARY KEY(idAluno, idRefeicao, dataHora),
    FOREIGN KEY(idAluno) REFERENCES Aluno(id),
    FOREIGN KEY(idRefeicao) REFERENCES Refeicao(id)
);

CREATE OR REPLACE FUNCTION AddLogFichaAlimentar() RETURNS TRIGGER AS $$
    DECLARE
        tipoLog VARCHAR(2);
    BEGIN
        IF (TG_OP = 'INSERT') THEN
            IF (TG_TABLE_NAME = 'FichaRestricaoIngrediente') THEN
                tipoLog := 'II'; -- inserção de ingrediente
            ELSE
                tipoLog := 'I'; -- inserção de ficha alimentar
            END IF;
        ELSIF(TG_OP = 'UPDATE') THEN
            IF (TG_TABLE_NAME = 'FichaRestricaoIngrediente') THEN
                tipoLog := 'UI'; -- update de ingrediente
            ELSE
                tipoLog := 'U'; -- update de ficha alimentar
            END IF;
        ELSIF(TG_OP = 'DELETE') THEN
            IF (TG_TABLE_NAME = 'FichaRestricaoIngrediente') THEN
                tipoLog := 'DI'; -- delete de ingrediente
            ELSE
                tipoLog := 'D'; -- delete de ficha alimentar
            END IF;
        END IF;
        
        INSERT INTO FichaAlimentarLog(idFichaAlimentar, dataHora, tipoLog)
        VALUES(OLD.id, NOW(), tipoLog);
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER AddLogFichaAlimentarTrigger_Ficha
    AFTER INSERT OR UPDATE OR DELETE ON FichaAlimentar
    FOR EACH ROW EXECUTE FUNCTION AddLogFichaAlimentar();

CREATE OR REPLACE TRIGGER AddLogFichaAlimentarTrigger_Ingrediente
    AFTER INSERT OR UPDATE OR DELETE ON FichaRestricaoIngrediente
    FOR EACH ROW EXECUTE FUNCTION AddLogFichaAlimentar();