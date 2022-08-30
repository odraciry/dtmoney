import { createGlobalStyle } from  'styled-components' 

//estilização com styled-components
export const GlobalStyle = createGlobalStyle`  
    //variaveis css
    :root{
        --background: #f0f2f5;
        --red: #e52e4d;
        --blue: #5429cc;
        --green: #33cc95;

        --blue-light: #6933ff;

        --text-title: #363f5f;
        --text-body: #969cb3;

        --shape: #ffffff;
    }
    
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html{
        //para ajustar o tamanho da fonte de acordo com o tamanho da tela 
        @media(max-width: 1080px){
            font-size: 93.75%;
        }   

        @media(max-width: 720px){
            font-size: 87.5%;
        }
    }

    body{
        background: var(--background);
        //para ter fontes mais detalhadas
        -webkit-font-smoothing: antialiased;
    }

    body, textarea, button, input{
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong{
        font-weight: 600;
    }

    button{
        cursor: pointer;
    }

    //para coisas que estiverem desabilitadas
    [disabled]{
        opacity: 0.6;
        cursor: not-allowed;
    }

    //estilo do container modal
    .react-modal-overlay{
        background: rgba(0, 0, 0, 0.5);

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    //estilo do conteudo do modal
    .react-modal-content{
        width: 100%;
        max-width: 576px;
        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem;
    }

    //estilo do button para fechar o modal
    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;

        transition: filter 0.3s;
        //diminuir sua luminosidade ao passar o mouse
        &:hover {
            filter: brightness(0.7);
        }
    }
`