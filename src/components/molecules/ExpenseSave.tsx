import React, { useState } from 'react'
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { fetchSaveExpense } from '../../store/future/expenseSlice';
import { dateToEpoch } from '../../util/dateFormatter';

export default function ExpenseSave() {
    const [amount, setAmount] = useState(0);
    const [expenseDate, setExpenseDate] = useState('');
    const [description, setDescription] = useState('');
    const dispatch : AppDispatch = useDispatch();

    const createExpense = () => {
        const token = localStorage.getItem('token') || '';
        const epochExpenseDate = dateToEpoch(expenseDate);
        dispatch(fetchSaveExpense({token, amount, description, expenseDate: epochExpenseDate}));
    }
  return (
    <div>
      <div className='container'>
            <h1>Harcama Oluştur</h1>
           <div className="row p-5">
           
            
            
            <div className='m-4'>
                
                <input
                    className='form-control'
                    type="number"
                    id="amount"
                    placeholder='Harcama miktarı'
                    min={0}                   
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>
            <div className='m-4'>            
                <input
                    className='form-input'
                    type="text"
                    id="amount"
                    placeholder='Harcama Açıklaması'                   
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='m-4'>
                <label htmlFor="expenseDate">Harcama Tarihi</label>
                <input
                    className='form-select'
                    type="date"
                    id="expenseDate"
                    placeholder='Harcama Tarihi'
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                />
            </div>           
            <div className='m-4 text-center'>
            <button className='btn btn-success' onClick={createExpense}>Harcama Oluştur</button>
            </div>
            
           </div>
        </div>
    </div>
  )
}
