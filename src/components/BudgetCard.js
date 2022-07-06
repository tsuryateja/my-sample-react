import React from 'react'
import {Button, Card, Stack, ProgressBar} from 'react-bootstrap'
import {currencyFormater} from '../Utils';

export default function BudgetCard({name, amount, max, gray, onClickAddExpense, onClickViewExpense}) {
    const classNames = [];
    if(amount > max) {
        classNames.push('bg-danger', 'bg-opacity-10');
    } else if (gray) {
        classNames.push('bg-light');
    }
  return (
    <Card className={classNames.join(" ")}>
        <Card.Body>
            <Card.Title className="d-flex justfiy-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-auto">{name}</div>
                    <div className="d-flex align-items-baseline">{currencyFormater.format(amount)} 
                    {max && (<span className='text-muted fs-6 ms-1'>/ {currencyFormater.format(max)}</span>)}</div>
            </Card.Title>
            {max && (<ProgressBar now={amount} min={0} max={max} className="rounded-pill" variant={getProgressBarVariant(amount, max)}/>)}
            {name !== 'Total' && (<Stack direction="horizontal" gap="2" className='mt-4'>
                <Button variant="outline-primary" className='ms-auto' onClick={onClickAddExpense}>Add Expense</Button>
                <Button variant="outline-secondary" onClick={onClickViewExpense}>View Expenses</Button>
            </Stack>)}
        </Card.Body>
    </Card>
  )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if(ratio < .5) return 'primary';
    if(ratio < .75) return 'warning';
    return 'danger';
}
