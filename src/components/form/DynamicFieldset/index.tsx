import { type WithCSS, cn } from "@/lib/style";
import { HydrateAtoms } from "@/lib/jotai";
import { ScopeProvider } from "@/lib/jotai/scope";
import * as Client from "./client";

type DynamicFieldsetProps = WithCSS<{
  id: string;
  fields: { id: string; label: string; formEl: React.ReactNode }[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
}>;

/** @description Renders form field based on selected option. */
export function DynamicFieldset({
  id,
  fields,
  onChange,
  disabled,
  className,
  style,
}: DynamicFieldsetProps) {
  const options = Object.values(fields).map(({ id, label }) => {
    return { value: id, label };
  });

  return (
    <ScopeProvider atoms={[Client.fieldsetId, Client.selectedFieldId]}>
      <HydrateAtoms
        atomValues={[
          [Client.fieldsetId, id],
          [Client.selectedFieldId, fields[0].id],
        ]}
      >
        <fieldset
          aria-labelledby={id}
          {...{ disabled }}
          style={style}
          className={cn("space-y-2", className)}
        >
          <Client.INTERNAL_FieldSelector {...{ options, onChange }} />
          {Object.values(fields).map(({ id, formEl }) => (
            <Client.INTERNAL_SelectedField key={id} id={id}>
              {formEl}
            </Client.INTERNAL_SelectedField>
          ))}
        </fieldset>
      </HydrateAtoms>
    </ScopeProvider>
  );
}
