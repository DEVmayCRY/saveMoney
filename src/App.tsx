import { Item } from './types/Item'
import { categories } from './data/categories'
import { items } from './data/items'
import React, { useEffect, useState } from 'react';
import * as S from './App.styles';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/InfoArea';
import { InputArea } from './components/InputArea';

export default function App() {
  const [ list, setList ] = useState(items);
  const [ filteredList, setFilteredList ] = useState<Item[]>([]);
  const [ currentMonth, setCurrentMonth ] = useState(getCurrentMonth());
  const [ income, setIncome ] = useState(0);
  const [ expense, setExpense ] = useState(0);

  useEffect(()=>{
    setFilteredList( filterListByMonth(list, currentMonth) );
  }, [list, currentMonth]);

  useEffect(()=>{
    let incomeCount = 0;
    let expenseCount = 0;

    for(let i in filteredList) {
      if(categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);

  }, [filteredList])

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  }

  const handleAddItem = (item: Item) => {
    let newList = [...list];    //cria lista a partir da lista antiga
    newList.push(item);         //dá um push no item pra newlist
    setList(newList);           //sobe a nova lista pro use state setList
  }

  return (
        <S.Container>
          <S.Header>
            <S.HeaderText>
              Sistema Financeiro
            </S.HeaderText>
          </S.Header>
          <S.Body>
            
            {/* Área de informações */}
            <InfoArea 
              currentMonth={currentMonth}
              onMonthChange={handleMonthChange}
              income={income}
              expense={expense}
            />

            {/* Área de inserção */}
            <InputArea onAdd={handleAddItem} />

            {/* Área de itens */}
            <TableArea list={filteredList}/>

          </S.Body>
        </S.Container>
  );
}
