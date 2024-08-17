# My-mangas 🥭

Este é o projeto de front-end com python que obtém e exibe mangás em uma interface simples e sem anúncios, utilizando as linguagens **TypeScript** e **Python**.

## 📂 Estrutura do Projeto

Este repositório contém o código-fonte do front-end da aplicação. Para visualizar o projeto completo, incluindo automação e API, veja as outras partes do sistema:

- [**Automação/Web-Scraper**](https://github.com/GustavoSilverio/my-mangas-scraper): Um script em Python que coleta dados de mangás de uma plataforma online. Utiliza bibliotecas nativas de Python e multi-threading para maximizar a eficiência.
- [**API**](https://github.com/GustavoSilverio/my-mangas-api): Uma API que serve os dados coletados pela automação/web-scraper. Os dados são armazenados em um banco de dados MongoDB e servidos ao front-end.

## ⚖️ Aviso Legal

Este projeto é apenas um exemplo técnico e **não deve ser usado para distribuir conteúdo protegido por direitos autorais** sem a devida autorização dos proprietários dos direitos. Nenhum conteúdo de mangás é incluído neste repositório.

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE). Sinta-se à vontade para utilizar o código como base para seus próprios projetos, respeitando os termos da licença.

## 🛠️ Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/GustavoSilverio/my-mangas-front.git
    ```
2. Instale as dependências:
    ```bash
    npm i
    ```
    
3. Crie um arquivo .env na raiz do projeto e adicione a seguinte env var:
    ```env
    NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:8000
    ```
    
4. Inicie o projeto
    ```bash
    npm run dev
    ```
5. Acesse o projeto no seu navegador em `http://localhost:3000`
