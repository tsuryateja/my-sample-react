import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import uuid from 'react-uuid';

const BudgetsContext = React.createContext();

export function useBudgets () {
    return useContext(BudgetsContext);
}

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);
    function addBudget ({name, max}) {
        setBudgets(prevBudgets => {
            return [...prevBudgets, {id: uuid(), name, max}];
        })
    }
    function addExpense ({ description, amount, budgetId}) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuid(), description, amount, budgetId}];
        })
    }
    function deleteBudget ({id}) {
        // setExpenses(prevExpenses => {
        //     return prevExpenses.fliter(expense => {
        //         if(expense.budgetId !== id) return expense
        //         return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
        //     });
        // })
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.budgetId !== id);
        })
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id);
        })
    }
    function deleteExpense ({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id);
        })
    }
    function getBudgetExpenses (budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense,
            getBudgetExpenses
        }}>{children}</BudgetsContext.Provider>
    );
}
