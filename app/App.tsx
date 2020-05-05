import React from 'react';
import {createAppContainer} from 'react-navigation';
import * as GlobalContext from './GlobalContext';
import Drawer from './Drawer';

const AppContainer = createAppContainer(Drawer);
const App = () => {
  return (
    <GlobalContext.GlobalContextProvider>
      <AppContainer />
    </GlobalContext.GlobalContextProvider>
  );
};

export default App;
