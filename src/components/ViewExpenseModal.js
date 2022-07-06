import { Modal, Button, Stack } from 'react-bootstrap';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext';
import { currencyFormater } from '../Utils';

export default function ViewExpenseModal ({ budgetId, handleCloseViewExpenseModal}) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? {name: 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID} : budgets.find(b => b.id === budgetId)
    const expenses = getBudgetExpenses(budgetId)
    return (
        <Modal show={budgetId !== null && budgetId !== undefined} onHide={handleCloseViewExpenseModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (<Button variant='outline-danger' onClick={() => {
                            deleteBudget(budget)
                            handleCloseViewExpenseModal()
                        }}>Delete</Button>)}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className='me-auto fs-4'>{expense.description}</div>
                            <div className='fs-5'>{currencyFormater.format(expense.amount)}</div>
                            <Button variant='outline-danger' size="sm" onClick={() => deleteExpense(expense)}>&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}