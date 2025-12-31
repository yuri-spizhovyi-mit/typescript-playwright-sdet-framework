import Ajv, { type ErrorObject } from "ajv";

export class SchemaValidationError extends Error {
  constructor(
    message: string,
    public readonly errors: ErrorObject[] | null | undefined,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = "SchemaValidationError";
  }
}

/**
 * Single Ajv instance for the whole framework.
 * - allErrors: show all violations (not just first)
 * - strict: false keeps it practical for JSON schema files you copy/receive
 */
const ajv = new Ajv({
  allErrors: true,
  strict: false,
  allowUnionTypes: true,
});

// Cache compiled validators per schema object reference
const compiled = new WeakMap<object, ReturnType<typeof ajv.compile>>();

export function validateSchema<T>(
  schema: object,
  data: unknown,
  label = "schema"
): T {
  const validate = getOrCompile(schema);

  const ok = validate(data);
  if (!ok) {
    const details = formatAjvErrors(validate.errors);
    throw new SchemaValidationError(
      `Schema validation failed (${label}). ${details}`,
      validate.errors,
      data
    );
  }

  return data as T;
}

function getOrCompile(schema: object) {
  const cached = compiled.get(schema);
  if (cached) return cached;

  const validator = ajv.compile(schema);
  compiled.set(schema, validator);
  return validator;
}

function formatAjvErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors || errors.length === 0) return "No error details.";
  return errors
    .slice(0, 10)
    .map((e) => {
      const path = e.instancePath || "/";
      const msg = e.message ?? "invalid";
      return `${path} ${msg}`;
    })
    .join("; ");
}
