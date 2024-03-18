import { EnemyEventTable } from "@/data/enemy/enemyEvent";
import { Debuffs } from "@/data/types/AKEnemy";
import { AttackPatterns, EnemyRaceTable } from "@/data/types/typesFrom";

import { Checkbox, CheckboxGroup } from "@/components/form/Checkbox";
import { Fieldset, Legend } from "@/components/form/Fieldset";
import { Select } from "@/components/form/Select";
import { INTERNAL_EnemyFilterMenu } from "./client";

/** @description Utilizes our reusable `<FilterMenu />`. */
export function EnemyFilterMenu() {
  return <INTERNAL_EnemyFilterMenu formControls={<LookupForm />} />;
}

/** @description List of filters used to search through enemies. */
function LookupForm() {
  return (
    <>
      <h2 className="mb-2 text-3xl font-semibold sm:text-4xl">Apply Filters</h2>
      <p className="mb-8 text-xs font-light text-neutral-70">
        Narrow down the enemies {"you're"} interested in.
      </p>

      <Fieldset className="mb-4">
        <Legend>Event</Legend>
        <Select
          name="event"
          allowEmpty
          options={Object.entries(EnemyEventTable).map(([id, { name }]) => {
            return { label: name, value: id };
          })}
        />
      </Fieldset>

      <Fieldset className="mb-4">
        <Legend>Type</Legend>
        <CheckboxGroup>
          <Checkbox name="type[]" label="Normal" value="NORMAL" />
          <Checkbox name="type[]" label="Elite" value="ELITE" />
          <Checkbox name="type[]" label="Boss" value="BOSS" />
        </CheckboxGroup>
      </Fieldset>

      <Fieldset className="mb-4">
        <Legend>Position</Legend>
        <CheckboxGroup>
          <Checkbox name="position[]" label="Ground" value="GROUND" />
          <Checkbox name="position[]" label="Flying" value="FLYING" />
        </CheckboxGroup>
      </Fieldset>

      <Fieldset className="mb-4">
        <Legend>Race</Legend>
        <CheckboxGroup>
          {["None", ...Object.values(EnemyRaceTable)].map((race) => (
            <Checkbox key={race} name="race[]" label={race} value={race} />
          ))}
        </CheckboxGroup>
      </Fieldset>

      <Fieldset className="mb-4">
        <Legend>Immunities</Legend>
        <CheckboxGroup>
          {Debuffs.map((eff) => (
            <Checkbox key={eff} name="immunities[]" label={eff} value={eff} />
          ))}
        </CheckboxGroup>
      </Fieldset>

      <Fieldset className="mb-4">
        <Legend>Attack Pattern</Legend>
        <CheckboxGroup>
          {AttackPatterns.map((atk) => (
            <Checkbox
              key={atk}
              name="attackPattern[]"
              label={atk}
              value={atk}
            />
          ))}
        </CheckboxGroup>
      </Fieldset>
    </>
  );
}
