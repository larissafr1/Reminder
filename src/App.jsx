import { format } from 'date-fns';
import { useState } from 'react';
import Reminder from './components/Reminder';
import ReminderForm from './components/ReminderForm';
import './App.scss';

function App() {
  const [reminders, setReminders] = useState({});

  // Adiciona um lembrete formatando a data para dd/mm/yyyy
  const addReminder = (text, date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset());
    const formattedDate = format(localDate, 'dd/MM/yyyy');
    const newReminder = {
      id: Math.floor(Math.random() * 10000),
      text,
      date: formattedDate,
      isCompleted: false,
    };

     //Mantém os lembretes organizados por datas, permite adicionar múltiplos lembretes na mesma data ou iniciar uma nova lista para uma nova data
    setReminders(prevReminders => {
      const updatedReminders = { ...prevReminders };
      if (updatedReminders[formattedDate]) {
        updatedReminders[formattedDate].push(newReminder);
      } else {
        updatedReminders[formattedDate] = [newReminder];
      }
      return updatedReminders;
    });
  };

  // Exclui lembrete
  const removeReminder = (id) => {
    setReminders(prevReminders => {
      const updatedReminders = { ...prevReminders };
      Object.keys(updatedReminders).forEach(date => {
        updatedReminders[date] = updatedReminders[date].filter(reminder => reminder.id !== id);
        if (updatedReminders[date].length === 0) {
          delete updatedReminders[date];
        }
      });
      return updatedReminders;
    });
  };

  // Completa lembrete
  const completeReminder = (id) => {
    setReminders(prevReminders => {
      const updatedReminders = { ...prevReminders };
      Object.keys(updatedReminders).forEach(date => {
        updatedReminders[date] = updatedReminders[date].map(reminder => {
          if (reminder.id === id) {
            return { ...reminder, isCompleted: !reminder.isCompleted };
          }
          return reminder;
        });
      });
      return updatedReminders;
    });
  };

  return (
    <div className='app'>
      <h1>MemoMind</h1>
      <ReminderForm addReminder={addReminder} />
      <h2>Lista de lembretes</h2>
      <div className='reminder-list'>
        {Object.entries(reminders)
          .sort((a, b) => new Date(a[0].split('/').reverse().join('-')) - new Date(b[0].split('/').reverse().join('-')))
          .filter(([date, remindersForDate]) => remindersForDate.some(reminder => !reminder.isCompleted))
          .map(([date, remindersForDate]) => (
            <div key={date}>
              <h3>{date}</h3>
              {remindersForDate.filter(reminder => !reminder.isCompleted).map(reminder => (
                <Reminder
                  key={reminder.id}
                  reminder={reminder}
                  removeReminder={removeReminder}
                  completeReminder={completeReminder}
                />
              ))}
            </div>
        ))}
      </div>
      <h2>Concluídos</h2>
      <div className='completed-reminders'>
        {Object.entries(reminders)
          .map(([date, remindersForDate]) => (
            <div key={date}>
              {remindersForDate.filter(reminder => reminder.isCompleted).map(reminder => (
                <Reminder
                  key={reminder.id}
                  reminder={reminder}
                  removeReminder={removeReminder}
                  completeReminder={completeReminder}
                  isCompleted={true}
                />
              ))}
            </div>
        ))}
      </div>
      <div className="img-container">
        <img src='./src/img/end.png' alt="ilustração de uma garota riscando um X em seu calendário"/>
      </div>
    </div>
  );
}

export default App;
