import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { TodosContextProvider } from "../../context/TodosContext";
import MetricsCard from "../Metrics";

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

    test('render metrics',()=>{
        const {getByText} = render(
            <TodosContextProvider>
                <MetricsCard></MetricsCard>
            </TodosContextProvider>
        );
        expect(screen.getByText('Average time to finish a task')).toBeInTheDocument();
    })
});