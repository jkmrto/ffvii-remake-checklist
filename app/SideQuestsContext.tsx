import React, {Component} from 'react';

interface Items {
  test: number;
  list: Domain.SideQuest[];
}

export const SideQuestsContext = React.createContext({} as Items);
import * as Domain from './Domain';

export class Provider extends Component {
  state = {
    test: 125,
    list: [],
  };

  render() {
    return (
      <SideQuestsContext.Provider
        value={{
          test: this.state.test,
          list: this.state.list,
        }}>
        {this.props.children}
      </SideQuestsContext.Provider>
    );
  }
}

export const use = () => React.useContext(SideQuestsContext);
