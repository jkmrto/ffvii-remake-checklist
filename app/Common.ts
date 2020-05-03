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
