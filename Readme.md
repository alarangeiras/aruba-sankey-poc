# aruba-sankey-poc

# Execução do projeto

> npm install
> cp -v .env.example .env # Configurar o arquivo de variáveis de ambiente
> npm run dev


# Geração dos stubs do protobuf

> protoc --js_out=import_style=commonjs,binary:. streaming.proto  
> protoc --js_out=import_style=commonjs,binary:. presence.proto

# Considerações

No admin do Aruba -> Streaming, o Tópico precisa estar ativo (Checkbox)