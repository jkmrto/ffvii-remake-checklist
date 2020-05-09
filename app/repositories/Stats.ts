import * as SideQuestsRepo from './SideQuests';
import * as DiscoveryQuestsRepo from './DiscoveryQuests';
import * as WeaponsRepo from './Weapons';
import * as Domain from './../Domain';
import * as Common from './../Common';

export async function load(): Promise<Domain.CollectionToStats> {
  let sideQuests = await SideQuestsRepo.load();
  let discoveryQuests = await DiscoveryQuestsRepo.load();
  let weapons = await WeaponsRepo.load();

  return {
    [SideQuestsRepo.collection]: Common.calculateStats(sideQuests),
    [DiscoveryQuestsRepo.collection]: Common.calculateStats(discoveryQuests),
    [WeaponsRepo.collection]: Common.calculateStats(weapons),
  };
}
