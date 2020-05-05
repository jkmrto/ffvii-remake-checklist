import React from 'react';
import * as Domain from './Domain';

interface ContextType {
  percentage: number;
  setStats: (stats: Domain.Stats[]) => void;
}

export const GlobalContext = React.createContext({} as ContextType);

export class GlobalContextProvider extends React.Component {
  state = {
    percentage: 55,
  };

  setStats(stats: Domain.Stats[]) {
    this.setState({
      percentage: stats[0].checked / stats[0].total,
    });
  }

  onPress(stats: Domain.Stats[]) {
    this.setState({
      percentage: stats[0].checked / stats[0].total,
    });
  }

  render() {
    return (
      <GlobalContext.Provider
        value={{
          percentage: this.state.percentage,
          setStats: this.onPress.bind(this),
        }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export const useTheme = () => React.useContext(GlobalContext);
