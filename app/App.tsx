import React from 'react';
import {createAppContainer} from 'react-navigation';
import * as StatsContext from './StatsContext';
import Drawer from './Drawer';

const AppContainer = createAppContainer(Drawer);
const App = () => {
  return (
    <StatsContext.Provider>
      <AppContainer />
    </StatsContext.Provider>
  );
};

export default App;
