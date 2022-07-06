import { Form, Modal, Button } from 'react-bootstrap';
import { useRef } from 'react';
import { useBudgets } from '../contexts/BudgetsContext';

export default function AddBudgetModal ({ show, handleCloseModal}) {
    const nameRef = useRef();
    const maxRef = useRef();
    const { addBudget } = useBudgets();
    function handleSubmit (e) {
        e.preventDefault();
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value)
        })
        handleCloseModal()
    }
    return (
        <Modal show={show} onHide={handleCloseModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control type="number" ref={maxRef} min={0} step={0.01} required/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}