import './App.css';
import { AppSelector } from './AppSelector';
import IntentApp from './IntentApp';

import React from 'react';
import NspApp from './NspApp';

const App = () => {

  const [app, setApp] = React.useState<string>('intent');

  React.useEffect(() => {
    const cachedApp = localStorage.getItem('app') ?? 'intent';

    if (cachedApp !== app) {
      setApp(cachedApp);
    }
  }, []);

  const handleAppClick = (app: string) => {
    localStorage.setItem("app", app);
    setApp(app);
  };

  return (
    <div className='mx-auto text-center h-full overflow-scroll'>
      <AppSelector selected={app} onAppSelect={handleAppClick} />
      {(app === "intent") && <IntentApp />}
      {(app === "nsp") && <NspApp />}
    </div>
  );

};


export default App;
