import React from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext';
import BudgetCard from './BudgetCard';

export default function UncategorizedBudgetCard(props) {
    console.log(props)
    const { getBudgetExpenses } = useBudgets();
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)
    if(amount === 0) return null;
    return <BudgetCard name="UnCategorized" amount={amount} gray {...props}/>
}
