import React from 'react';

//Componente funcional que recebe propriedades e exibe os detalhes do lembrete, além de fornecer 
//interatividade para marcar um lembrete como completo ou removê-lo

const Reminder = ({ reminder, removeReminder, completeReminder }) => {
  return (
    <div className="reminder" style={{ textDecoration: reminder.isCompleted ? "line-through" : "" }}>
     <div className="content">
        <p>{reminder.text}</p>
        <p className='date'>{reminder.date}</p>
    </div>
    <div>
      <button className='complete'onClick={() => completeReminder(reminder.id)}>✔</button>
      <button className='remove' onClick={() => removeReminder(reminder.id)}>X</button>
    </div>
  </div>
  );
};

export default Reminder;