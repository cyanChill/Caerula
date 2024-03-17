import { NationInfo, FactionInfo, TeamInfo } from "@/data/types/AKAffiliation";
import { BranchTable, ProfessionMap } from "@/data/types/AKClass";

import { Checkbox, CheckboxGroup } from "@/components/form/Checkbox";
import { DynamicFieldset } from "@/components/form/DynamicFieldset";
import { Fieldset, Legend } from "@/components/form/Fieldset";
import { Select } from "@/components/form/Select";
import { FilterMenu } from "@/components/form/FilterMenu";
import Rarity from "@/features/characters/Rarity";
import { INTERNAL_ONSUBMIT_PROVIDER } from "./client";

/** @description Utilizes our reusable `<FilterMenu />`. */
export function OperatorFilterMenu() {
  return (
    <INTERNAL_ONSUBMIT_PROVIDER>
      <FilterMenu formControls={<LookupForm />} />
    </INTERNAL_ONSUBMIT_PROVIDER>
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
                {Object.values(BranchTable)
                  .toSorted((a, b) => a.name.localeCompare(b.name))
                  .map(({ id, name }) => (
                    <Checkbox
                      key={id}
                      name="branch[]"
                      label={name}
                      value={id}
                    />
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
              options: Object.entries(NationInfo).map(([id, name]) => {
                return { label: name, value: id };
              }),
            },
            {
              groupLabel: "Faction",
              options: Object.entries(FactionInfo).map(([id, { name }]) => {
                return { label: name, value: id };
              }),
            },
            {
              groupLabel: "Team",
              options: Object.entries(TeamInfo).map(([id, { name }]) => {
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
