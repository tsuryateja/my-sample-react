import {Button, Stack} from 'react-bootstrap';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import BudgetCard from './components/BudgetCard.js';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard.js';
import TotalBudgetCard from './components/TotalBudgetCard.js';
import AddBudgetModal from './components/AddBudgetModal.js';
import AddExpenseModal from './components/AddExpenseModal.js';
import ViewExpenseModal from './components/ViewExpenseModal.js';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(false)
  const { budgets, expenses, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className='mb-4'>
          <h1 className='me-auto'>Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={() => openAddExpenseModal()}>Add Expense</Button>
        </Stack>
        <div style={{
          display: "grid",
          gap: "1rem",
          alignItems: "flex-start",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
        }}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + parseFloat(expense.amount), 0)
            return <BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max} gray onClickAddExpense={() => openAddExpenseModal(budget.id)} onClickViewExpense={() => setViewExpenseModalBudgetId(budget.id)}></BudgetCard>
          })}
          <UncategorizedBudgetCard onClickAddExpense={() => openAddExpenseModal()} onClickViewExpense={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleCloseModal={() => setShowAddBudgetModal(false)}/>
      <AddExpenseModal show={showAddExpenseModal} handleCloseExpenseModal={() => setShowAddExpenseModal(false)} defaultBudgetId={addExpenseModalBudgetId}/>
      <ViewExpenseModal budgetId={viewExpenseModalBudgetId} handleCloseViewExpenseModal={() => setViewExpenseModalBudgetId()}/>
    </>
  );
}


export default App;
