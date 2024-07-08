import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { TodosContextProvider } from "../../../context/TodosContext";
import ToDoTable from ".";
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

    test('render table and button',()=>{
        const {getByText} = render(
            <TodosContextProvider>
                <ToDoTable></ToDoTable>
            </TodosContextProvider>
        );
        expect(screen.getByText('New To do')).toBeInTheDocument();
    })
});