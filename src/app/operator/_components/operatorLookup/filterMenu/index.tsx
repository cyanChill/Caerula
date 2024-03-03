import { Filter } from "@/assets/svgs/shapes";
import { NationInfo, FactionInfo, TeamInfo } from "@/data/types/AKAffiliation";
import { BranchTable, ProfessionMap } from "@/data/types/AKClass";

import { Button } from "@/components/form/Button";
import { Checkbox, CheckboxGroup } from "@/components/form/Checkbox";
import { DynamicFieldset } from "@/components/form/DynamicFieldset";
import { Fieldset, Legend } from "@/components/form/Fieldset";
import { Select } from "@/components/form/Select";
import Rarity from "@/features/characters/Rarity";
import { INTERNAL_Menu } from "./client";

/** @description Button that opens the filter menu. */
export function FilterMenu() {
  return (
    <>
      <INTERNAL_Menu
        menuBtnChild={
          <>
            <Filter className="size-[1lh]" />
            <span>Filters</span>
          </>
        }
        formContent={<LookupForm />}
        formSubmitBtn={<LookupSubmitBtn />}
      />
    </>
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
        <CheckboxGroup name="rarity[]">
          {[1, 2, 3, 4, 5, 6].map((rarity) => (
            <Checkbox
              key={rarity}
              label={<Rarity size="size-[12.5cqw]" rarity={rarity} />}
              value={rarity}
              className="p-2 @container"
            />
          ))}
        </CheckboxGroup>
      </Fieldset>

      <DynamicFieldset
        id="class-filter"
        fields={[
          {
            id: "profession",
            label: "Profession",
            formEl: (
              <CheckboxGroup name="profession[]">
                {Object.values(ProfessionMap)
                  .toSorted((a, b) => a.localeCompare(b))
                  .map((prof) => (
                    <Checkbox key={prof} label={prof} value={prof} />
                  ))}
              </CheckboxGroup>
            ),
          },
          {
            id: "branch",
            label: "Branch",
            formEl: (
              <CheckboxGroup name="branch[]">
                {Object.values(BranchTable).map(({ id, name }) => (
                  <Checkbox key={id} label={name} value={id} />
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
        <CheckboxGroup name="type[]">
          <Checkbox label="Non-Limited" value="regular" />
          <Checkbox label="Limited" value="limited" />
          <Checkbox label="Integrated Strategies" value="is" />
        </CheckboxGroup>
      </Fieldset>

      <Fieldset>
        <Legend>Position</Legend>
        <CheckboxGroup name="position[]">
          <Checkbox label="Melee" value="MELEE" />
          <Checkbox label="Ranged" value="RANGED" />
        </CheckboxGroup>
      </Fieldset>
    </>
  );
}

/** @description Submit button for lookup form. */
function LookupSubmitBtn() {
  return (
    <div className="p-2 !pt-0 sm:p-4">
      <hr className="mb-4 border-white/50" />
      <Button
        type="submit"
        form="op-filter-form"
        color="tertiary"
        radius="large"
        className="w-full py-0.5 font-geist-mono font-medium sm:py-1 sm:text-lg"
      >
        View Changes
      </Button>
    </div>
  );
}
