import type { ProfessionTable } from "./typesFrom";
import type { AttackPosition } from "./shared";
import type { RangeId } from "./AKRange";

/** @description Conversion of ProfessionId to its display value. */
export const ProfessionMap = {
  CASTER: "Caster",
  MEDIC: "Medic",
  PIONEER: "Vanguard",
  TANK: "Defender",
  SNIPER: "Sniper",
  SPECIAL: "Specialist",
  SUPPORT: "Supporter",
  WARRIOR: "Guard",
} as const;

export type ProfessionId = keyof typeof ProfessionMap;
export type Profession = (typeof ProfessionMap)[ProfessionId];

export type BranchId = (typeof ProfessionTable)[ProfessionId][number];

/** @description Object going in-depth about a specific subclass. */
export type Branch = {
  id: BranchId;
  name: string;
  position: AttackPosition;
  range: RangeId[];
  trait: string;
};

/**
 * @description Table containing more information about a specified BranchId.
 * @see Note: Robots contain some exceptions to the branch.
 */
export const BranchTable = {
  agent: {
    id: "agent",
    name: "Agent",
    position: "MELEE",
    range: ["2-2", "2-2", "2-2"],
    trait:
      'Has <span style="color:#00B0FF;">reduced</span> Redeployment Time, can use ranged attacks',
  },
  aoesniper: {
    id: "aoesniper",
    name: "Artilleryman",
    position: "RANGED",
    range: ["3-3", "3-8", "3-10"],
    trait: 'Deals <span style="color:#00B0FF;">AOE Physical damage</span>',
  },
  artsfghter: {
    id: "artsfghter",
    name: "Arts Fighter",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait: 'Deals <span style="color:#00B0FF;">Arts damage</span>',
  },
  artsprotector: {
    id: "artsprotector",
    name: "Arts Protector",
    position: "MELEE",
    range: ["0-1", "0-1", "0-1"],
    trait: "Normal attacks deal Arts damage while the skill is active",
  },
  bard: {
    id: "bard",
    name: "Bard",
    position: "RANGED",
    range: ["x-4", "x-1", "x-1"],
    trait:
      'Does not attack but continuously restores the <span style="color:#00B0FF;">HP</span> of all allies within range (the HP restored per second is equal to 10% of self ATK). Self is unaffected by <a style="border-bottom:1px dotted currentcolor;cursor:help;" title="Increases base stats (only the strongest effect of this type applies for each stat)" href="/terminology#inspiration">Inspiration</a>',
  },
  bearer: {
    id: "bearer",
    name: "Standard Bearer",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait: "Cannot block enemies during the skill duration",
  },
  blastcaster: {
    id: "blastcaster",
    name: "Blast Caster",
    position: "RANGED",
    range: ["4-1", "5-1", "5-1"],
    trait:
      'Deals <span style="color:#00B0FF;">AOE Arts damage in a long line</span>',
  },
  blessing: {
    id: "blessing",
    name: "Abjurer",
    position: "RANGED",
    range: ["y-2", "y-6", "y-6"],
    trait:
      'Deals <span style="color:#00B0FF;">Arts damage</span>; When skill is active, attacks instead restore the HP of allies (heal amount is equal to 75% of ATK)',
  },
  bombarder: {
    id: "bombarder",
    name: "Flinger",
    position: "RANGED",
    range: ["3-3", "3-9", "3-9"],
    trait:
      'Attacks deal <span style="color:#00B0FF;">two instances</span> of Physical damage to <span style="color:#00B0FF;">ground</span> enemies in a small area (The second instance is a shockwave that has half the normal ATK)',
  },
  centurion: {
    id: "centurion",
    name: "Centurion",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait:
      'Attacks <span style="color:#00B0FF;">multiple targets equal to block count</span>',
  },
  chain: {
    id: "chain",
    name: "Chain Caster",
    position: "RANGED",
    range: ["3-6", "3-1", "3-1"],
    trait:
      'Attacks deal <span style="color:#00B0FF;">Arts</span> damage and jump between <span style="color:#00B0FF;">3/4 (Elite 2)</span> enemies. Each jump deals 15% less damage and inflicts a brief <a style="border-bottom:1px dotted currentcolor;cursor:help;" title="-80% Movement Speed" href="/terminology#slow">Slow</a>',
  },
  chainhealer: {
    id: "chainhealer",
    name: "Chain Healer",
    position: "RANGED",
    range: ["y-1", "y-2", "y-2"],
    trait:
      'Restores HP of allies, bouncing between <span style="color:#00B0FF;">3</span> allies. Healing reduced by 25% per bounce.',
  },
  charger: {
    id: "charger",
    name: "Charger",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait:
      "Obtain 1 DP after this unit defeats an enemy; Refunds the original DP Cost when retreated",
  },
  closerange: {
    id: "closerange",
    name: "Heavyshooter",
    position: "RANGED",
    range: ["2-3", "3-6", "3-6"],
    trait: "High accuracy point-blank shot",
  },
  corecaster: {
    id: "corecaster",
    name: "Core Caster",
    position: "RANGED",
    range: ["3-6", "3-1", "3-1"],
    trait: 'Deals <span style="color:#00B0FF;">Arts damage</span>',
  },
  craftsman: {
    id: "craftsman",
    name: "Artificer",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait:
      'Blocks 2 enemies; Can use <span style="color:#00B0FF;">&lt;Support Devices&gt;</span> in battles',
  },
  crusher: {
    id: "crusher",
    name: "Crusher",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait:
      'Attacks <span style="color:#00B0FF;">multiple targets equal to block count</span>',
  },
  dollkeeper: {
    id: "dollkeeper",
    name: "Dollkeeper",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait:
      'Does not retreat upon receiving lethal damage, instead swaps to a <span style="color:#00B0FF;">&lt;Substitute&gt;</span> (Substitute has 0 Block). Swaps back to the original after 20 seconds',
  },
  duelist: {
    id: "duelist",
    name: "Duelist",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait: "Only restores SP when blocking enemies",
  },
  executor: {
    id: "executor",
    name: "Executor",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait:
      'Significantly <span style="color:#00B0FF;">reduced</span> Redeployment Time',
  },
  fastshot: {
    id: "fastshot",
    name: "Marksman",
    position: "RANGED",
    range: ["3-1", "3-3", "3-3"],
    trait: "Attacks aerial enemies first",
  },
  fearless: {
    id: "fearless",
    name: "Dreadnought",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait: "Blocks 1 enemy",
  },
  fighter: {
    id: "fighter",
    name: "Fighter",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait: "Blocks 1 enemy",
  },
  fortress: {
    id: "fortress",
    name: "Fortress",
    position: "MELEE",
    range: ["4-5", "4-5", "4-6"],
    trait:
      'When not blocking enemies, prioritizes dealing <span style="color:#00B0FF;">ranged AoE</span> Physical damage',
  },
  funnel: {
    id: "funnel",
    name: "Mech-Accord",
    position: "RANGED",
    range: ["3-6", "3-1", "3-1"],
    trait:
      'Controls a <span style="color:#00B0FF;">Drone</span> to deal <span style="color:#00B0FF;">Arts</span> damage to an enemy; When the Drone continuously attacks the same enemy, its damage will increase (up to 110% of the operator\'s ATK)',
  },
  geek: {
    id: "geek",
    name: "Geek",
    position: "RANGED",
    range: ["3-1", "3-3", "3-3"],
    trait: "Continually loses HP over time",
  },
  guardian: {
    id: "guardian",
    name: "Guardian",
    position: "MELEE",
    range: ["0-1", "0-1", "0-1"],
    trait: "Can heal allies by using skill(s)",
  },
  healer: {
    id: "healer",
    name: "Therapist",
    position: "RANGED",
    range: ["3-3", "3-4", "3-4"],
    trait:
      'Has a large healing range, but the healing amount on farther targets is reduced to <span style="color:#00B0FF;">80%</span>',
  },
  hookmaster: {
    id: "hookmaster",
    name: "Hookmaster",
    position: "MELEE",
    range: ["2-2", "3-2", "3-2"],
    trait:
      'Can <span style="color:#00B0FF;">Shift</span> enemies by using skills\nCan be deployed on Ranged Tiles',
  },
  incantationmedic: {
    id: "incantationmedic",
    name: "Incantation",
    position: "RANGED",
    range: ["3-1", "3-3", "3-3"],
    trait:
      "Attacks deal Arts damage and heal the HP of an ally within Attack Range for 50% of the damage dealt",
  },
  instructor: {
    id: "instructor",
    name: "Instructor",
    position: "MELEE",
    range: ["2-2", "2-2", "2-2"],
    trait:
      'Can attack enemies <span style="color:#00B0FF;">from range</span>; When attacking enemies not blocked by self, increase ATK to 120%',
  },
  librator: {
    id: "librator",
    name: "Liberator Guard",
    position: "MELEE",
    range: ["1-2", "1-2", "1-2"],
    trait:
      'Normally does not attack and has 0 Block; When skill is inactive, ATK gradually increases up to <span style="color:#00B0FF;">+200%</span> over <span style="color:#00B0FF;">40</span> seconds. ATK is reset when the skill ends',
  },
  longrange: {
    id: "longrange",
    name: "Deadeye",
    position: "RANGED",
    range: ["3-3", "3-9", "3-9"],
    trait:
      'Prioritizes attacking the enemy with <span style="color:#00B0FF;">lowest DEF</span> within range first',
  },
  lord: {
    id: "lord",
    name: "Lord",
    position: "MELEE",
    range: ["2-3", "3-12", "3-12"],
    trait:
      'Can launch <span style="color:#00B0FF;">Ranged Attacks</span> that deal 80% of normal ATK',
  },
  merchant: {
    id: "merchant",
    name: "Merchant",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait:
      'Has <span style="color:#00B0FF;">reduced</span> Redeployment Time, but <span style="color:#00B0FF;">DP Cost</span> is not refunded upon retreating; While deployed, <span style="color:#00B0FF;">3 DP</span> are consumed every 3 seconds (automatically retreats without sufficient DP)',
  },
  musha: {
    id: "musha",
    name: "Musha",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait:
      'Can\'t be healed by other units. Recovers <span style="color:#00B0FF;">30/50/70 (Elite 0/1/2)</span> self HP every time this operator attacks an enemy',
  },
  mystic: {
    id: "mystic",
    name: "Mystic Caster",
    position: "RANGED",
    range: ["3-13", "3-14", "3-14"],
    trait:
      'Attacks deal <span style="color:#00B0FF;">Arts damage</span>; When unable to find a target, attacks can be <span style="color:#00B0FF;">stored up</span> and fired all at once (Up to 3 charges)',
  },
  phalanx: {
    id: "phalanx",
    name: "Phalanx Caster",
    position: "RANGED",
    range: ["x-4", "x-1", "x-1"],
    trait:
      'Normally <span style="color:#00B0FF;">does not attack</span>, but has <span style="color:#00B0FF;">greatly increased</span> DEF and RES; When skill is active, attacks deal <span style="color:#00B0FF;">AoE Arts damage</span>',
  },
  physician: {
    id: "physician",
    name: "Medic",
    position: "RANGED",
    range: ["3-1", "3-3", "3-3"],
    trait: "Restores the HP of allies",
  },
  pioneer: {
    id: "pioneer",
    name: "Pioneer",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait: "Blocks 2 enemies",
  },
  protector: {
    id: "protector",
    name: "Protector",
    position: "MELEE",
    // NOTE: 6-Stars have `range: ["1-1", "1-1", "1-1"]`
    range: ["0-1", "0-1", "0-1"],
    trait: "Blocks 3 enemies",
  },
  pusher: {
    id: "pusher",
    name: "Push Stroker",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait:
      'Can attack <span style="color:#00B0FF;">multiple targets equal to block count</span>\nCan be deployed on Ranged Tiles',
  },
  reaper: {
    id: "reaper",
    name: "Reaper Guard",
    position: "MELEE",
    range: ["1-3", "1-3", "1-3"],
    trait:
      'Cannot be healed by allies; Attacks deal <span style="color:#00B0FF;">AoE damage</span>; Recovers <span style="color:#00B0FF;">50</span> HP for every enemy hit during attacks, up to Block count',
  },
  reaperrange: {
    id: "reaperrange",
    name: "Spreadshooter",
    position: "RANGED",
    range: ["2-4", "2-5", "2-5"],
    trait:
      'Attacks <span style="color:#00B0FF;">all enemies</span> within range, and deals 150% damage to enemies in the row directly in front of this unit.',
  },
  ringhealer: {
    id: "ringhealer",
    name: "Multi-target Medic",
    position: "RANGED",
    range: ["y-1", "y-2", "y-2"],
    trait: "Restores the HP of 3 allies simultaneously",
  },
  shotprotector: {
    id: "shotprotector",
    name: "Sentinel Protector",
    position: "MELEE",
    range: ["2-2", "2-2", "2-2"],
    trait: "Blocks 3 enemies and attacks from long range.",
  },
  siegesniper: {
    id: "siegesniper",
    name: "Besieger",
    position: "RANGED",
    range: ["4-4", "4-3", "4-3"],
    trait: "Attacks the heaviest enemy first",
  },
  slower: {
    id: "slower",
    name: "Decel Binder",
    position: "RANGED",
    range: ["y-2", "y-2", "y-2"],
    trait:
      'Deals <span style="color:#00B0FF;">Arts damage</span> and <a style="border-bottom:1px dotted currentcolor;cursor:help;" title="-80% Movement Speed" href="/terminology#slow">Slows</a> the target for a short time',
  },
  splashcaster: {
    id: "splashcaster",
    name: "Splash Caster",
    position: "RANGED",
    range: ["2-3", "3-6", "3-6"],
    trait: 'Deals <span style="color:#00B0FF;">AOE Arts damage</span>',
  },
  stalker: {
    id: "stalker",
    name: "Ambusher",
    position: "MELEE",
    range: ["y-1", "y-1", "y-1"],
    trait:
      'Deals Damage to <span style="color:#00B0FF;">all targets</span> within range\n50% chance to dodge Physical and Arts attacks and is less likely to be <span style="color:#00B0FF;">targeted</span> by enemies',
  },
  summoner: {
    id: "summoner",
    name: "Summoner",
    position: "RANGED",
    range: ["3-6", "3-1", "3-1"],
    trait:
      'Deals <span style="color:#00B0FF;">Arts damage</span>\nCan use <span style="color:#00B0FF;">Summons</span> in battles',
  },
  sword: {
    id: "sword",
    name: "Swordmaster",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait:
      'Normal attacks deal damage <span style="color:#00B0FF;">twice</span>',
  },
  tactician: {
    id: "tactician",
    name: "Tactician",
    position: "RANGED",
    range: ["3-1", "3-3", "3-3"],
    trait:
      'This unit can designate one <span style="color:#00B0FF;">Tactical Point</span> within attack range to call Reinforcements; ATK is increased to 150% when attacking enemies blocked by Reinforcements',
  },
  traper: {
    id: "traper",
    name: "Trapmaster",
    position: "RANGED",
    range: ["3-1", "3-3", "3-3"],
    trait:
      'Can use traps to assist in combat, but traps cannot be placed <span style="color:#00B0FF;">on tiles already occupied by an enemy</span>',
  },
  underminer: {
    id: "underminer",
    name: "Hexer",
    position: "RANGED",
    range: ["y-2", "y-6", "y-6"],
    trait: 'Deals <span style="color:#00B0FF;">Arts damage</span>',
  },
  unyield: {
    id: "unyield",
    name: "Juggernaut",
    position: "MELEE",
    range: ["1-1", "1-1", "1-1"],
    trait: '<span style="color:#00B0FF;">Cannot</span> be healed by allies',
  },
  wandermedic: {
    id: "wandermedic",
    name: "Wandering Medic",
    position: "RANGED",
    range: ["3-3", "3-17", "3-17"],
    trait:
      "Restores the HP of allied units and recovers Elemental Damage by 50% of ATK (can recover Elemental Damage of unhurt allied units)",
  },
} as Record<BranchId, Branch>;
