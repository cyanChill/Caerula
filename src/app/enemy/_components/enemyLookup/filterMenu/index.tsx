import { Filter, Refresh } from "@/assets/svgs/shapes";
import { EnemyEventTable } from "@/data/enemy/enemyEvent";
import { Debuffs } from "@/data/types/AKEnemy";
import { AttackPatterns, EnemyRaceTable } from "@/data/types/typesFrom";

import { cn } from "@/lib/style";
import { Button } from "@/components/form/Button";
import { Checkbox, CheckboxGroup } from "@/components/form/Checkbox";
import { Fieldset, Legend } from "@/components/form/Fieldset";
import { Select } from "@/components/form/Select";
import { LookupControls } from "./client";

/** @description Button that opens the filter menu. */
export function FilterMenu() {
  return (
    <LookupControls
      menuBtnContent={
        <>
          <Filter className="size-[1lh]" />
          <span>Filters</span>
        </>
      }
      formContent={<LookupForm />}
      formAction={<LookupActions />}
    />
  );
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

/** @description Submit & reset buttons for lookup form. */
function LookupActions() {
  return (
    <div className="p-2 !pt-0 sm:p-4">
      <hr className="mb-4 border-white/50" />
      <div
        className={cn(
          "grid grid-cols-[auto_minmax(0,1fr)] gap-1 sm:gap-2",
          "font-geist-mono font-medium sm:text-lg",
        )}
      >
        <Button
          title="Reset Filters"
          type="reset"
          form="op-lookup-form"
          variant="bordered"
          color="neutral"
          radius="large"
          className="p-2"
        >
          <Refresh className="size-[1lh]" />
        </Button>
        <Button
          type="submit"
          form="op-lookup-form"
          color="tertiary"
          radius="large"
          className="p-2"
        >
          View Changes
        </Button>
      </div>
    </div>
  );
}
