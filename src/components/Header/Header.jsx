import { useState, useEffect } from 'react';
import { formatarData, formatarHora } from '../../utils/formatters';
import './Header.css';

export const Header = ({ titulo = 'Gestão de Clientes' }) => {
  const [dataHora, setDataHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDataHora(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header id="mainHeader" name="mainHeader" className="app-header">
      <div id="headerClock" name="headerClock" className="header-badge clock-badge">
        <span className="badge-label">HORA:</span>
        <span id="relogioHora" name="relogioHora" className="badge-value clock-value">
          {formatarHora(dataHora)}
        </span>
      </div>

      <h1 id="headerTitle" name="headerTitle" className="header-title">
        {titulo}
      </h1>

      <div id="headerDate" name="headerDate" className="header-badge date-badge">
        <span className="badge-label">DATA:</span>
        <span id="relogioData" name="relogioData" className="badge-value date-value">
          {formatarData(dataHora)}
        </span>
      </div>
    </header>
  );
};

