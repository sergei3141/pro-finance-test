import { useState } from 'react';

import { DataType } from './interfaces/interfaces';

import Leftbar from './components/Leftbar';
import Header from './components/Header';
import Table from './components/Table';

function App() {

  const [tableData, setTableData] = useState<DataType[]>([]);

  const handleFormTable = (result: DataType[]) => {
    setTableData(result);
  };

  // Сборка JSON для загрузки
  const handleExport = () => {
    debugger
      const json = JSON.stringify(tableData);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');   
  
      link.href = url;
      link.setAttribute('download', 'data.json');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <div className="app">
        <Leftbar />
        <main className='main'>
            <Header onFormTable={handleFormTable} onFormExport={handleExport}/>
            <Table data={tableData} onFormTable={handleFormTable}/>
        </main>
    </div>
  );
}

export default App;
