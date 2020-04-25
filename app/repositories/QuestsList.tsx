let ch3 = [
  "Chadley's Report",
  'Lost Friends',
  'Rat Problem',
  'On the Prowl',
  'Nuisance in the Factory',
  'Just Flew In From The Graveyard',
];

let ch14 = [
  'Missing Children',
  'Chocobo Search',
  'Secret Medicine',
  "Corneo's Secret Stash",
  'Tomboy Bandit',
  'The Power of Music',
  'Wavering Heart',
  'Malicious Goons',
  'Subterranean Menace',
];

let ch8 = [
  ' Kids On Patrol',
  ' Weapons On A Rampage',
  ' Verified Hero',
  ' The Angel of the Slums',
  ' Paying Respects',
];

let ch9 = [
  'Burning Thighs',
  'The Party Never Stops (Chocobo Sam Route)',
  'A Dynamite Body (Chocobo Sam Route)',
  'The Price of Thievery (Madam M Route)',
  "Shears' Counterattack (Madam M Route)",
];

function mapToMissions(chapter: number, titleList: string[]) {
  return titleList.map(title => {
    return {chapter: chapter, title: title, checked: false};
  });
}

let questsList = [
  ...mapToMissions(3, ch3),
  ...mapToMissions(8, ch8),
  ...mapToMissions(9, ch9),
  ...mapToMissions(14, ch14),
].map((item, index) => {
  return {
    index: index,
    chapter: item.chapter,
    title: item.title,
    checked: false,
  };
});

export default questsList;
