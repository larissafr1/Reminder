import { useState } from 'react';

const ReminderForm = ({ addReminder }) => {
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reseta mensagem de erro
        setError("");

        // Validação do campo "Nome"
        if (!value.trim()){
            setError('O campo "Nome do lembrete" é obrigatório.');
            return;
        }

        // Validação do campo "Data"
        if (!date.trim()){
            setError('O campo "Data" é obrigatório.');
            return;
        }

        // Validação da data no futuro
        const currentDate = new Date();
        const selectedDate = new Date(date);
        if (selectedDate <= currentDate) {
            setError('A data deve estar no futuro!');
            return;
        }

         // Adiciona lembrete se todas as validações passarem
         addReminder(value, date);
         setValue("");
         setDate("");
    };


  return (
    <div className='reminder-form'>
      <h2>Criar Lembrete</h2>
      <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder='Nome do lembrete' 
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        <input 
            type="date" 
            placeholder='Data do lembrete (no formato dd/mm/yyyy' 
            value={date}
            onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Adicionar Lembrete</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default ReminderForm;
