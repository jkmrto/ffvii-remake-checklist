import React from 'react';

interface ContextType {
  isOnline: number;
  onPress: () => void;
}

export const GlobalContext = React.createContext({} as ContextType);

export class GlobalContextProvider extends React.Component {
  state = {
    isOnline: 55,
  };

  onPress() {
    this.setState({
      isOnline: this.state.isOnline + 1,
    });
  }

  render() {
    return (
      <GlobalContext.Provider
        value={{
          isOnline: this.state.isOnline,
          onPress: this.onPress.bind(this),
        }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export const useTheme = () => React.useContext(GlobalContext);
