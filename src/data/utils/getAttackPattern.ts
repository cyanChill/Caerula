/*
  Constants we're storing locally as we're pretty sure they won't change
  — if change occurs, this function will throws an error.
*/
const localAtkPos = ["MELEE", "RANGED", "ALL", "NONE"];
const localDmgTypes = ["PHYSIC", "MAGIC", "NO_DAMAGE", "HEAL"];

/** @description Get the attack pattern from an attack position & damage types. */
export default function getAttackPattern(atkPos: string, dmgTypes: string[]) {
  if (!localAtkPos.includes(atkPos))
    throw new Error(`Invalid position: ${atkPos}.`);
  dmgTypes.forEach((dmg) => {
    if (!localDmgTypes.includes(dmg))
      throw new Error(`Invalid damage type: ${dmg}.`);
  });

  const dmgTypeSet = new Set(dmgTypes);
  const resStart = atkPos === "ALL" ? "Melee Ranged" : capitalize(atkPos);
  const resEnd: string[] = [];

  if (dmgTypeSet.has("PHYSIC")) resEnd.push("Physical");
  if (dmgTypeSet.has("MAGIC")) resEnd.push("Arts");
  if (dmgTypeSet.has("HEAL")) resEnd.push("Healing");

  return resEnd.length === 0 ? resStart : `${resStart} ${resEnd.join(" ")}`;
}

/** @description Capitalize word, lower-casing all other characters. */
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
