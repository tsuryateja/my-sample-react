import { Form, Modal, Button } from 'react-bootstrap';
import { useRef } from 'react';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext';

export default function AddExpenseModal ({ show, handleCloseExpenseModal, defaultBudgetId}) {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetRef = useRef();
    const { addExpense, budgets } = useBudgets();
    function handleSubmit (e) {
        e.preventDefault();
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetRef.current.value
        })
        handleCloseExpenseModal()
    }
    return (
        <Modal show={show} onHide={handleCloseExpenseModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" ref={descriptionRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" ref={amountRef} min={0} step={0.01} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Budget</Form.Label>
                        <Form.Select ref={budgetRef} defaultValue={defaultBudgetId}>
                            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}