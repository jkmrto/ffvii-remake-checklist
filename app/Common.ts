import * as Domain from './Domain';

interface CheckableItem {
  checked: boolean;
}

export function calculatePercentage(list: CheckableItem[]): number {
  let count = 0;
  list.forEach(element => {
    if (element.checked) {
      count = count + 1;
    }
  });

  return (100 * count) / list.length;
}

export function calculateStats(list: CheckableItem[]): Domain.Stats {
  let stats: Domain.Stats = {total: 0, checked: 0};
  list.forEach(item => {
    stats.total++;
    stats.checked = item.checked ? stats.checked + 1 : stats.checked;
  });

  return stats;
}
