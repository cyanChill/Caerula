import { Filter, Refresh } from "@/assets/svgs/shapes";
import { NationInfo, FactionInfo, TeamInfo } from "@/data/types/AKAffiliation";
import { BranchTable, ProfessionMap } from "@/data/types/AKClass";

import { cn } from "@/lib/style";
import { Button } from "@/components/form/Button";
import { Checkbox, CheckboxGroup } from "@/components/form/Checkbox";
import { DynamicFieldset } from "@/components/form/DynamicFieldset";
import { Fieldset, Legend } from "@/components/form/Fieldset";
import { Select } from "@/components/form/Select";
import Rarity from "@/features/characters/Rarity";
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

/** @description List of filters used to search through operators. */
function LookupForm() {
  return (
    <>
      <h2 className="mb-2 text-3xl font-semibold sm:text-4xl">Apply Filters</h2>
      <p className="mb-8 text-xs font-light text-neutral-70">
        Narrow down the operators {"you're"} interested in.
      </p>

      <Fieldset className="mb-4">
        <Legend>Rarity</Legend>
        <CheckboxGroup>
          {[1, 2, 3, 4, 5, 6].map((rarity) => (
            <Checkbox
              key={rarity}
              name="rarity[]"
              label={<Rarity size="size-[12.5cqw]" rarity={rarity} />}
              value={rarity}
              className="p-2 @container"
            />
          ))}
        </CheckboxGroup>
      </Fieldset>

      <DynamicFieldset
        id="class-filter"
        formId="op-lookup-form"
        fields={[
          {
            id: "profession",
            label: "Profession",
            formEl: (
              <CheckboxGroup>
                {Object.values(ProfessionMap)
                  .toSorted((a, b) => a.localeCompare(b))
                  .map((prof) => (
                    <Checkbox
                      key={prof}
                      name="profession[]"
                      label={prof}
                      value={prof}
                    />
                  ))}
              </CheckboxGroup>
            ),
          },
          {
            id: "branch",
            label: "Branch",
            formEl: (
              <CheckboxGroup>
                {Object.values(BranchTable).map(({ id, name }) => (
                  <Checkbox key={id} name="branch[]" label={name} value={id} />
                ))}
              </CheckboxGroup>
            ),
          },
        ]}
        className="mb-4"
      />

      <Fieldset className="mb-4">
        <Legend>Affiliation</Legend>
        <Select
          name="affiliation"
          allowEmpty
          options={[
            {
              groupLabel: "Nation",
              options: Object.values(NationInfo).map(({ id, name }) => {
                return { label: name, value: id };
              }),
            },
            {
              groupLabel: "Faction",
              options: Object.values(FactionInfo).map(({ id, name }) => {
                return { label: name, value: id };
              }),
            },
            {
              groupLabel: "Team",
              options: Object.values(TeamInfo).map(({ id, name }) => {
                return { label: name, value: id };
              }),
            },
          ]}
        />
      </Fieldset>

      <Fieldset className="mb-4">
        <Legend>Type</Legend>
        <CheckboxGroup>
          <Checkbox name="type[]" label="Non-Limited" value="regular" />
          <Checkbox name="type[]" label="Limited" value="limited" />
          <Checkbox name="type[]" label="Integrated Strategies" value="is" />
        </CheckboxGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Position</Legend>
        <CheckboxGroup>
          <Checkbox name="position[]" label="Melee" value="MELEE" />
          <Checkbox name="position[]" label="Ranged" value="RANGED" />
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
