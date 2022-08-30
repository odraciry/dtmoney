import styled from "styled-components";

import { darken, transparentize } from "polished";//polished pacote para modificar cores

export const Container = styled.form`
    h2 {
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;

    }

    input {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius:0.25rem;

        border: 1px solid #d7d7d7;
        background: #e7e9ee;

        font-weight: 400;
        font-size: 1rem;

        //estilizar o placeholder
        &::placeholder {
            color: var(--text-body);
        }

        //todo input que antes tiver um input irá receber esse estilo
        & + input {
            margin-top: 1rem;
        }
    }

    //estilizar um button do type submit
    button[type="submit"] {
            width: 100%;
            padding: 0 1.5rem;
            height: 4rem;
            background: var(--green);
            color: #fff;
            border-radius: 0.25rem;
            border: 0;
            font-size: 1rem;
            margin-top: 1.5rem;
            font-weight: 600;

            transition: filter 0.3s;
            &:hover {
                //quando passar o mouse por cima do botao isso diminuira a luminosidade dele
                filter: brightness(0.7);
                
            }
        }
`;

//estilização dos buttons de entrada e saida
export const TransactionTypeContainer = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
`;

//propriedades do componente RadioBox que será utilizada para verificar qual button está selecionado
interface RadioBoxProps {
    isActive: boolean;
    //dessa forma essa propriedade só pode receber green ou red
    activeColor: 'green' | 'red';
}

const colors = {
    green: "#33cc95",
    red: "#e52e4d",
}

export const RadioBox = styled.button<RadioBoxProps>`
    height: 4rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
        
    /* 
        no styled components ao passar uma função (dessa forma com interpolação),
        as propriedades do componente são passadas como parametro para as funçoes 
    */
    background: ${(props) =>  props.isActive 
    //buscando no obj color uma prorpiedade que seja igual a activeColor
    ? transparentize(0.8 ,colors[props.activeColor]) //transparentize para deixar a cor mais transparente
    : 'transparent' };
        
    display: flex;
    align-items: center;
    justify-content: center;

    //adicionando transição ao border-color
    transition: border-color 0.2s;

        &:hover{
            //a função darken está escurecendo em 10% a cor da borda #d7d7d7
            border-color: ${darken(0.4, "#d7d7d7")};
        }

        img{
            width: 20px;
            height: 20px;
        }

        span {
            display: inline-block;//dessa forma é possivel adicionar margin no span
            margin-left: 1rem;
            font-size: 1rem;
            color: var(--text-title);
        }
`;