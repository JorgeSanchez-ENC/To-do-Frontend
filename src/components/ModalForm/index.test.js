import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import { TodosContextProvider } from "../../context/TodosContext";
import ToDoTable from "../ToDoBody/ToDoTable";
import ModalForm from ".";

describe("ToDoTable",()=>{

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        });
      });

    test('render modal',()=>{
        const {getByText} = render(
            <TodosContextProvider>
                <ToDoTable/>
                <ModalForm></ModalForm>
            </TodosContextProvider>
        );
        fireEvent.click(getByText('New To do'));
        expect(screen.getByText('To do text')).toBeInTheDocument();
    })
});