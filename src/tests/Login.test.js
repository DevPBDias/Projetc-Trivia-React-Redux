import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

afterEach(() => jest.clearAllMocks());


describe('Cobertura de testes da tela de Login', () => {
    it('Teste se o botão de login está inicialmente desabilitado', () => {
        renderWithRouterAndRedux(<App />);

        const loginBtn = screen
          .getByRole('button', { name: /Entrar/i });
        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).toBeDisabled();
      });

    it('Teste se existe um campo para o email e o nome do jogador', () => {
        renderWithRouterAndRedux(<App />);

        const email = screen
          .getByPlaceholderText(/Digite seu email/i);
        const name = screen
          .getByPlaceholderText(/Digite seu nome/i);
          
        expect(email).toBeInTheDocument();
        expect(name).toBeInTheDocument();
      });

    it('Teste se o botão fica habilitado após digitar no campos', () => {
        renderWithRouterAndRedux(<App />);

        const email = screen
          .getByPlaceholderText(/Digite seu email/i);
        const name = screen
          .getByPlaceholderText(/Digite seu nome/i);
        const loginBtn = screen
          .getByRole('button', { name: /Entrar/i });

        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).toBeDisabled();
        userEvent.type(name, 'player1')
        userEvent.type(email, 'player1@player1.com')
        expect(loginBtn).not.toBeDisabled();
      });

      it('Teste se o botão de login redireciona para a página "Trivia"', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const email = screen
            .getByPlaceholderText(/Digite seu email/i);
        const name = screen
            .getByPlaceholderText(/Digite seu nome/i);
        const loginBtn = screen
            .getByRole('button', { name: /Entrar/i });

        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).toBeDisabled();
        userEvent.type(name, 'player1')
        userEvent.type(email, 'player1@player1.com')
        expect(loginBtn).not.toBeDisabled();
        userEvent.click(loginBtn);

        const { pathname } = history.location;
        expect(pathname).toBe('/trivia');
      });

      it('Teste se o botão de configurações existe e redireciona para as "Configurações"', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const configBtn = screen
          .getByRole('button', { name: /Configurações/i });

        expect(configBtn).toBeInTheDocument();
        userEvent.click(configBtn);

        const { pathname } = history.location;
        expect(pathname).toBe('/config');
      });

      it('Teste se é a feita requisição do token e se ele é salvo no localStorage', () => {
        const tokenAPI = {
            response_code: 0,
            response_message: "Token Generated Successfully!",
            token: "f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
        };

        global.fetch = jest.fn( async () => ({
            json: async () => (tokenAPI),
          }));

        renderWithRouterAndRedux(<App />);

        const email = screen
            .getByPlaceholderText(/Digite seu email/i);
        const name = screen
            .getByPlaceholderText(/Digite seu nome/i);
        const loginBtn = screen
            .getByRole('button', { name: /Entrar/i });

        expect(loginBtn).toBeInTheDocument();
        expect(loginBtn).toBeDisabled();
        userEvent.type(name, 'player1')
        userEvent.type(email, 'player1@player1.com')
        expect(loginBtn).not.toBeDisabled();
        userEvent.click(loginBtn);

        expect(global.fetch).toBeCalledTimes(1);
        expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
      });
});