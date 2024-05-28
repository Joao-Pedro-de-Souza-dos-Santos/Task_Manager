import styled from "styled-components";

export type ButtonStyle = "primary" | "secundary";

type ButtonContainer = {
    variant: "primary" | "secundary";
}

const COLORS = {
    primary: "PRIMARY700",
    secundary: "PRIMARY500",
} as const;

export const Container = styled.button<ButtonContainer>`
    width: 100%;
    margin: 0 auto;
    padding: 1.2rem;
    border-radius: 8px;
    background: ${({theme, variant}) => theme.colors[COLORS[variant]]};
    box-shadow: 1px 1px 1px #0004;
    font-size: 1.4rem;
    font-weight: 700;

    &:hover{
        filter: brightness(0.9);
    }

    &:disabled{
        cursor: default;
        filter: brightness(0.8);
    }

    @media(min-width: 768px){
        font-size: 1.6rem;
    }
`
