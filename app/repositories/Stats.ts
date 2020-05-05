import * as SideQuestsRepo from './SideQuests';
import * as Domain from './../Domain';
import * as Common from './../Common';

export async function load(): Promise<Domain.Stats[]> {
  // Load stats
  let collections = [SideQuestsRepo.collection];
  console.log(collections);

  let key = 'stats_' + collections;
  console.log(key);

  let sideQuests = await SideQuestsRepo.LoadQuests();
  console.log(sideQuests);

  return [Common.calculateStats(sideQuests)];
}
