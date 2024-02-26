import type { ProfessionTable } from "./typesFrom";
import type { AttackPosition } from "./shared";
import type { CharacterDamage } from "./AKCharacter";

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
  profession: Profession;
  position: AttackPosition;
  damageType: CharacterDamage;
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
    profession: "Vanguard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Has <span style="color:#00B0FF;">reduced</span> Redeployment Time, can use ranged attacks',
  },
  aoesniper: {
    id: "aoesniper",
    name: "Artilleryman",
    profession: "Sniper",
    position: "RANGED",
    damageType: "PHYSICAL",
    trait: 'Deals <span style="color:#00B0FF;">AOE Physical damage</span>',
  },
  artsfghter: {
    id: "artsfghter",
    name: "Arts Fighter",
    profession: "Guard",
    position: "MELEE",
    damageType: "MAGICAL",
    trait: 'Deals <span style="color:#00B0FF;">Arts damage</span>',
  },
  artsprotector: {
    id: "artsprotector",
    name: "Arts Protector",
    profession: "Defender",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait: "Normal attacks deal Arts damage while the skill is active",
  },
  bard: {
    id: "bard",
    name: "Bard",
    profession: "Supporter",
    position: "RANGED",
    damageType: "NONE",
    trait:
      'Does not attack but continuously restores the <span style="color:#00B0FF;">HP</span> of all allies within range (the HP restored per second is equal to 10% of self ATK). Self is unaffected by <a style="border-bottom:1px dotted currentcolor;cursor:help;" title="Increases base stats (only the strongest effect of this type applies for each stat)" href="/terminology#inspiration">Inspiration</a>',
  },
  bearer: {
    id: "bearer",
    name: "Standard Bearer",
    profession: "Vanguard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait: "Cannot block enemies during the skill duration",
  },
  blastcaster: {
    id: "blastcaster",
    name: "Blast Caster",
    profession: "Caster",
    position: "RANGED",
    damageType: "MAGICAL",
    trait:
      'Deals <span style="color:#00B0FF;">AOE Arts damage in a long line</span>',
  },
  blessing: {
    id: "blessing",
    name: "Abjurer",
    profession: "Supporter",
    position: "RANGED",
    damageType: "MAGICAL",
    trait:
      'Deals <span style="color:#00B0FF;">Arts damage</span>; When skill is active, attacks instead restore the HP of allies (heal amount is equal to 75% of ATK)',
  },
  bombarder: {
    id: "bombarder",
    name: "Flinger",
    profession: "Sniper",
    position: "RANGED",
    damageType: "PHYSICAL",
    trait:
      'Attacks deal <span style="color:#00B0FF;">two instances</span> of Physical damage to <span style="color:#00B0FF;">ground</span> enemies in a small area (The second instance is a shockwave that has half the normal ATK)',
  },
  centurion: {
    id: "centurion",
    name: "Centurion",
    profession: "Guard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Attacks <span style="color:#00B0FF;">multiple targets equal to block count</span>',
  },
  chain: {
    id: "chain",
    name: "Chain Caster",
    profession: "Caster",
    position: "RANGED",
    damageType: "MAGICAL",
    trait:
      'Attacks deal <span style="color:#00B0FF;">Arts</span> damage and jump between <span style="color:#00B0FF;">3/4 (Elite 2)</span> enemies. Each jump deals 15% less damage and inflicts a brief <a style="border-bottom:1px dotted currentcolor;cursor:help;" title="-80% Movement Speed" href="/terminology#slow">Slow</a>',
  },
  chainhealer: {
    id: "chainhealer",
    name: "Chain Medic",
    profession: "Medic",
    position: "RANGED",
    damageType: "HEAL",
    trait:
      'Restores HP of allies, bouncing between <span style="color:#00B0FF;">3</span> allies. Healing reduced by 25% per bounce.',
  },
  charger: {
    id: "charger",
    name: "Charger",
    profession: "Vanguard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      "Obtain 1 DP after this unit defeats an enemy; Refunds the original DP Cost when retreated",
  },
  closerange: {
    id: "closerange",
    name: "Heavyshooter",
    profession: "Sniper",
    position: "RANGED",
    damageType: "PHYSICAL",
    trait: "High accuracy point-blank shot",
  },
  corecaster: {
    id: "corecaster",
    name: "Core Caster",
    profession: "Caster",
    position: "RANGED",
    damageType: "MAGICAL",
    trait: 'Deals <span style="color:#00B0FF;">Arts damage</span>',
  },
  craftsman: {
    id: "craftsman",
    name: "Artificer",
    profession: "Supporter",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Blocks 2 enemies; Can use <span style="color:#00B0FF;">&lt;Support Devices&gt;</span> in battles',
  },
  crusher: {
    id: "crusher",
    name: "Crusher",
    profession: "Guard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Attacks <span style="color:#00B0FF;">multiple targets equal to block count</span>',
  },
  dollkeeper: {
    id: "dollkeeper",
    name: "Dollkeeper",
    profession: "Specialist",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Does not retreat upon receiving lethal damage, instead swaps to a <span style="color:#00B0FF;">&lt;Substitute&gt;</span> (Substitute has 0 Block). Swaps back to the original after 20 seconds',
  },
  duelist: {
    id: "duelist",
    name: "Duelist",
    profession: "Defender",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait: "Only restores SP when blocking enemies",
  },
  executor: {
    id: "executor",
    name: "Executor",
    profession: "Specialist",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Significantly <span style="color:#00B0FF;">reduced</span> Redeployment Time',
  },
  fastshot: {
    id: "fastshot",
    name: "Marksman",
    profession: "Sniper",
    position: "RANGED",
    damageType: "PHYSICAL",
    trait: "Attacks aerial enemies first",
  },
  fearless: {
    id: "fearless",
    name: "Dreadnought",
    profession: "Guard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait: "Blocks 1 enemy",
  },
  fighter: {
    id: "fighter",
    name: "Fighter",
    profession: "Guard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait: "Blocks 1 enemy",
  },
  fortress: {
    id: "fortress",
    name: "Fortress",
    profession: "Defender",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'When not blocking enemies, prioritizes dealing <span style="color:#00B0FF;">ranged AoE</span> Physical damage',
  },
  funnel: {
    id: "funnel",
    name: "Mech-accord Caster",
    profession: "Caster",
    position: "RANGED",
    damageType: "MAGICAL",
    trait:
      'Controls a <span style="color:#00B0FF;">Drone</span> to deal <span style="color:#00B0FF;">Arts</span> damage to an enemy; When the Drone continuously attacks the same enemy, its damage will increase (up to 110% of the operator\'s ATK)',
  },
  geek: {
    id: "geek",
    name: "Geek",
    profession: "Specialist",
    position: "RANGED",
    damageType: "PHYSICAL",
    trait: "Continually loses HP over time",
  },
  guardian: {
    id: "guardian",
    name: "Guardian",
    profession: "Defender",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait: "Can heal allies by using skill(s)",
  },
  healer: {
    id: "healer",
    name: "Therapist",
    profession: "Medic",
    position: "RANGED",
    damageType: "HEAL",
    trait:
      'Has a large healing range, but the healing amount on farther targets is reduced to <span style="color:#00B0FF;">80%</span>',
  },
  hookmaster: {
    id: "hookmaster",
    name: "Hookmaster",
    profession: "Specialist",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Can <span style="color:#00B0FF;">Shift</span> enemies by using skills\nCan be deployed on Ranged Tiles',
  },
  incantationmedic: {
    id: "incantationmedic",
    name: "Incantation Medic",
    profession: "Medic",
    position: "RANGED",
    damageType: "MAGICAL",
    trait:
      "Attacks deal Arts damage and heal the HP of an ally within Attack Range for 50% of the damage dealt",
  },
  instructor: {
    id: "instructor",
    name: "Instructor",
    profession: "Guard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Can attack enemies <span style="color:#00B0FF;">from range</span>; When attacking enemies not blocked by self, increase ATK to 120%',
  },
  librator: {
    id: "librator",
    name: "Liberator",
    profession: "Guard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Normally does not attack and has 0 Block; When skill is inactive, ATK gradually increases up to <span style="color:#00B0FF;">+200%</span> over <span style="color:#00B0FF;">40</span> seconds. ATK is reset when the skill ends',
  },
  longrange: {
    id: "longrange",
    name: "Deadeye",
    profession: "Sniper",
    position: "RANGED",
    damageType: "PHYSICAL",
    trait:
      'Prioritizes attacking the enemy with <span style="color:#00B0FF;">lowest DEF</span> within range first',
  },
  lord: {
    id: "lord",
    name: "Lord",
    profession: "Guard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Can launch <span style="color:#00B0FF;">Ranged Attacks</span> that deal 80% of normal ATK',
  },
  merchant: {
    id: "merchant",
    name: "Merchant",
    profession: "Specialist",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Has <span style="color:#00B0FF;">reduced</span> Redeployment Time, but <span style="color:#00B0FF;">DP Cost</span> is not refunded upon retreating; While deployed, <span style="color:#00B0FF;">3 DP</span> are consumed every 3 seconds (automatically retreats without sufficient DP)',
  },
  musha: {
    id: "musha",
    name: "Musha",
    profession: "Guard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Can\'t be healed by other units. Recovers <span style="color:#00B0FF;">30/50/70 (Elite 0/1/2)</span> self HP every time this operator attacks an enemy',
  },
  mystic: {
    id: "mystic",
    name: "Mystic Caster",
    profession: "Caster",
    position: "RANGED",
    damageType: "MAGICAL",
    trait:
      'Attacks deal <span style="color:#00B0FF;">Arts damage</span>; When unable to find a target, attacks can be <span style="color:#00B0FF;">stored up</span> and fired all at once (Up to 3 charges)',
  },
  phalanx: {
    id: "phalanx",
    name: "Phalanx Caster",
    profession: "Caster",
    position: "RANGED",
    damageType: "NONE",
    trait:
      'Normally <span style="color:#00B0FF;">does not attack</span>, but has <span style="color:#00B0FF;">greatly increased</span> DEF and RES; When skill is active, attacks deal <span style="color:#00B0FF;">AoE Arts damage</span>',
  },
  physician: {
    id: "physician",
    name: "Medic",
    profession: "Medic",
    position: "RANGED",
    damageType: "HEAL",
    trait: "Restores the HP of allies",
  },
  pioneer: {
    id: "pioneer",
    name: "Pioneer",
    profession: "Vanguard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait: "Blocks 2 enemies",
  },
  protector: {
    id: "protector",
    name: "Protector",
    profession: "Defender",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait: "Blocks 3 enemies",
  },
  pusher: {
    id: "pusher",
    name: "Push Stroker",
    profession: "Specialist",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Can attack <span style="color:#00B0FF;">multiple targets equal to block count</span>\nCan be deployed on Ranged Tiles',
  },
  reaper: {
    id: "reaper",
    name: "Reaper",
    profession: "Guard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Cannot be healed by allies; Attacks deal <span style="color:#00B0FF;">AOE Damage</span>; Recovers <span style="color:#00B0FF;">50</span> HP for every enemy hit during attacks, up to Block count',
  },
  reaperrange: {
    id: "reaperrange",
    name: "Spreadshooter",
    profession: "Sniper",
    position: "RANGED",
    damageType: "PHYSICAL",
    trait:
      'Attacks <span style="color:#00B0FF;">all enemies</span> within range, and deals 150% damage to enemies in the row directly in front of this unit.',
  },
  ringhealer: {
    id: "ringhealer",
    name: "Multi-target Medic",
    profession: "Medic",
    position: "RANGED",
    damageType: "HEAL",
    trait: "Restores the HP of 3 allies simultaneously",
  },
  shotprotector: {
    id: "shotprotector",
    name: "Sentinel Protector",
    profession: "Defender",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait: "Blocks 3 enemies and attacks from long range.",
  },
  siegesniper: {
    id: "siegesniper",
    name: "Besieger",
    profession: "Sniper",
    position: "RANGED",
    damageType: "PHYSICAL",
    trait: "Attacks the heaviest enemy first",
  },
  slower: {
    id: "slower",
    name: "Decel Binder",
    profession: "Supporter",
    position: "RANGED",
    damageType: "MAGICAL",
    trait:
      'Deals <span style="color:#00B0FF;">Arts damage</span> and <a style="border-bottom:1px dotted currentcolor;cursor:help;" title="-80% Movement Speed" href="/terminology#slow">Slows</a> the target for a short time',
  },
  splashcaster: {
    id: "splashcaster",
    name: "Splash Caster",
    profession: "Caster",
    position: "RANGED",
    damageType: "MAGICAL",
    trait: 'Deals <span style="color:#00B0FF;">AOE Arts damage</span>',
  },
  stalker: {
    id: "stalker",
    name: "Ambusher",
    profession: "Specialist",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Deals Damage to <span style="color:#00B0FF;">all targets</span> within range\n50% chance to dodge Physical and Arts attacks and is less likely to be <span style="color:#00B0FF;">targeted</span> by enemies',
  },
  summoner: {
    id: "summoner",
    name: "Summoner",
    profession: "Supporter",
    position: "RANGED",
    damageType: "MAGICAL",
    trait:
      'Deals <span style="color:#00B0FF;">Arts damage</span>\nCan use <span style="color:#00B0FF;">Summons</span> in battles',
  },
  sword: {
    id: "sword",
    name: "Swordmaster",
    profession: "Guard",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait:
      'Normal attacks deal damage <span style="color:#00B0FF;">twice</span>',
  },
  tactician: {
    id: "tactician",
    name: "Tactician",
    profession: "Vanguard",
    position: "RANGED",
    damageType: "PHYSICAL",
    trait:
      'This unit can designate one <span style="color:#00B0FF;">Tactical Point</span> within attack range to call Reinforcements; ATK is increased to 150% when attacking enemies blocked by Reinforcements',
  },
  traper: {
    id: "traper",
    name: "Trapmaster",
    profession: "Specialist",
    position: "RANGED",
    damageType: "PHYSICAL",
    trait:
      'Can use traps to assist in combat, but traps cannot be placed <span style="color:#00B0FF;">on tiles already occupied by an enemy</span>',
  },
  underminer: {
    id: "underminer",
    name: "Hexer",
    profession: "Supporter",
    position: "RANGED",
    damageType: "MAGICAL",
    trait: 'Deals <span style="color:#00B0FF;">Arts damage</span>',
  },
  unyield: {
    id: "unyield",
    name: "Juggernaut",
    profession: "Defender",
    position: "MELEE",
    damageType: "PHYSICAL",
    trait: '<span style="color:#00B0FF;">Cannot</span> be healed by allies',
  },
  wandermedic: {
    id: "wandermedic",
    name: "Wandering Medic",
    profession: "Medic",
    position: "RANGED",
    damageType: "HEAL",
    trait:
      "Restores the HP of allied units and recovers <span>Elemental Damage</span> by 50% of ATK (can recover <span>Elemental Damage</span> of unhurt allied units)",
  },
} as Record<BranchId, Branch>;
