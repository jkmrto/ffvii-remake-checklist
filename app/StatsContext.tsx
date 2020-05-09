import React from 'react';
import * as Domain from './Domain';

import update from 'immutability-helper';
interface ContextType {
  percentage: number;
  initStats: (stats: Domain.CollectionToStats) => void;
  updateStats: (collection: string, stats: Domain.Stats) => void;
}

interface Props {}

type State = {
  percentage: number;
  statsMap: Domain.CollectionToStats;
};

export const StatsContext = React.createContext({} as ContextType);

export class Provider extends React.Component<Props, State> {
  initMapStats: Domain.CollectionToStats = {};
  state = {
    percentage: 0,
    statsMap: this.initMapStats,
  };

  initStats(statsCollection: Domain.CollectionToStats) {
    this.setState({
      percentage: calcPercentage(statsCollection),
      statsMap: statsCollection,
    });
  }

  updateStats(collection: string, stats: Domain.Stats) {
    let updatedStats = update(this.state.statsMap, {
      [collection]: {$set: stats},
    });

    this.setState({
      percentage: calcPercentage(updatedStats),
      statsMap: updatedStats,
    });
  }

  render() {
    return (
      <StatsContext.Provider
        value={{
          percentage: this.state.percentage,
          updateStats: this.updateStats.bind(this),
          initStats: this.initStats.bind(this),
        }}>
        {this.props.children}
      </StatsContext.Provider>
    );
  }
}

function calcPercentage(statsCollection: Domain.CollectionToStats): number {
  let sumedStats = sumStats(statsCollection);
  return sumedStats.checked / sumedStats.total;
}

function sumStats(statsMap: Domain.CollectionToStats): Domain.Stats {
  let acc: Domain.Stats = {checked: 0, total: 0};
  for (var collection in statsMap) {
    acc = {
      checked: acc.checked + statsMap[collection].checked,
      total: acc.total + statsMap[collection].total,
    };
  }

  return acc;
}

export const use = () => React.useContext(StatsContext);
