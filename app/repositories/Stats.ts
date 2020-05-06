import * as SideQuestsRepo from './SideQuests';
import * as WeaponsRepo from './Weapons';
import * as Domain from './../Domain';
import * as Common from './../Common';

export async function load(): Promise<Domain.CollectionToStats> {
  let sideQuests = await SideQuestsRepo.LoadQuests();
  let weapons = await WeaponsRepo.load();

  return {
    [SideQuestsRepo.collection]: Common.calculateStats(sideQuests),
    [WeaponsRepo.collection]: Common.calculateStats(weapons),
  };
}
