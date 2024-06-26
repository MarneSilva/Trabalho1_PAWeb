# Trabalho1_PAWeb
Um projeto que possui tanto partes de back-end como front-end para uma aplicação que monitora e atualizado produtos em um banco de dados.
Criado por:
* Marne Silva Matos de Amorim
* Caroline Andrade Silva

# Instruções de uso:

### Instalando as pendências do back end
Para instalar as pendências do projeto e garantir que os códigos funcionem da maneira que foram projetados, baixe os arquivos do repositório e bote em uma pasta vazia.
Encaminhe-se para essa pasta por meio do comando "cd" no terminal de sua IDE selecionada:

Ex: cd ./Trabalho1_PAWeb/dositio-class/

Em seguida, com o diretório já selecionado, execute o comando de instalação do Node Package Module (npm):

Ex: npm install ou npm i

### Deixando o servidor online na porta selecionado
Para subir o servidor na rede local, primeiro é preciso conferir se as configurações do arquivo ".env" estão corretas. As configurações dentro do arquivo ".env" deveria conter as seguintes variáveis:

* STAGE='dev'
* PORT='5000'
* HOST='127.0.0.1'
* JWT_SECRET='Abcd@1234'
* DB_URL='mongodb://127.0.0.1:27017/dositio'
* NCRYPT='thatsTheSecret'

Caso não esteja de acordo com essas informações, certifique-se de deixar ao padrão.
Feito isso, agora precisamos executar o comando do script "dev", instalado junto ao arquivo "package.json":

Ex: npm run dev

Este comando deve garantir que o servidor esteja na rede local. Caso tenha sucedido, mostrará um log de onde o servidor está hospedado, em letras azuis, no terminal.

###OBS:
É importante que você tenha o MongoDB instalado, assim como o MongoDBCompass, para observar as gravações e a configuração do banco de dados o qual o servidor se conecta.

### Instalando as dependências do front end

### Repita o processo de instalar as pendências do projeto do back end, agora para o front end.

Ex: cd ./Trabalho1_web/sample_spa/ em seguida npm i ou npm install

Parabéns, seu projeto está configurado!



