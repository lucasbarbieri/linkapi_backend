# Teste para backend LINKAPI

A aplicação tem como objetivo migrar as informações contidas no PipeDrive como "Negócios Ganhos"e incrementa-las na plataforma Bling como um pedido.

## Instalação dos pacotes

```node
yarn;
```

## Inicialização

```node
yarn dev
```

## Utilização | Comando de importação

Para executar o comando de migração as informações, utilize a linha de comando, usando a seguinte instrução:

```node
node src/commands/pipeToBling
```

Após realizado o comando, ele dará o retorno do status da migração, sendo:

Success: Total de itens migrados com sucesso

Database: Total de itens que foram migrados e salvos no database para consulta posterior

Errors: Total de itens que não foram migrados

\*\*\* Não foi feito o tratamento de erro, pois não havia conexão com nenhuma plataforma de logs ou notificações. Mantive apenas o log no console, para realização do teste.

## Endpoint

http://localhost:3001/opportunity

\*\*\* Foi criado apenas o método de retorno de todas as informações, conforme solicitado no teste. Por esse motivo não implementei PUT, POST, DELETE.

## License

[MIT](https://choosealicense.com/licenses/mit/)
