import React, { useEffect } from 'react'
import { fetchMyExpenses, IMyExpences } from '../../store/future/expenseSlice'
import { AppDispatch, useAppSelector } from '../../store'
import { useDispatch } from 'react-redux'
import {epochToDate} from '../../util/dateFormatter'

export default function MyExpenses() {
  const myExpensesList : IMyExpences[] = useAppSelector(state => state.expense.myExpenses)
  const dispatch : AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyExpenses())
  },[])

  return (
    <div className="container">
        <h1>Harcamalarım</h1>

        <div className='row p-3' >
            <table className="table table-striped table-hover table-bordered" >
            <thead>
              <tr>
                <th>Harcama Açıklaması</th>   
                <th>Harcama Miktarı</th>               
                <th>Harcama tarihi</th>
                <th>Onay Durumu</th>
              </tr>
            </thead>
            <tbody>
              {
                myExpensesList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.description}</td>
                      <td>{item.amount}</td>
                      <td>{epochToDate(item.expenseDate)}</td>
                      <td>{item.expenseStatus}</td>
                    </tr>
                  )
                })
              }
              
            </tbody>
            </table>
        </div>
    </div>
  )
}
