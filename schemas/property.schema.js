const { z } = require("zod");

const roomSchema = z.object({
  roomSlug: z.string().min(4),
  value: z.number().min(1),
  size: z.number().positive().optional(),
});

const comoditySchema = z.object({
  comoditySlug: z.string(),
});

const characteristicSchema = z.object({
  characteristicSlug: z.string(),
});

const createPropertySchema = z.object({
  title: z.string().min(20),
  price: z.number().nonnegative().min(),
  priceFIAT: z.enum(["ARS", "USD", "EUR", "BRL"]),
  expenses: z.number().nonnegative().optional(),
  expensesFIAT: z.enum(["ARS", "USD", "BRL", "EUR"]).optional(),
  operation: z.enum(["sale", "rent", "short-term"]),
  financing: z.string().optional(),
  propertyTypeSlug: z.string().min(2),
  address: z.string().min(5),
  mapLocation: z.object({
    lat: z.string().min(2),
    long: z.string().min(2),
  }),
  description: z.string().min(10),
  multimedia: z.object({
    images: z.array(z.string().url()),
    video: z.string().url().optional(),
  }),
  place: z.object({
    countryInput: z.string().min(4),
    provinceInput: z.string().min(4),
    cityInput: z.string().min(4),
    neighborhoodInput: z.string().min(4),
  }),
  surface: z.object({
    covered: z.number().nonnegative(),
    total: z.number().nonnegative(),
  }),
  services: z.object({
    light: z.boolean(),
    water: z.boolean(),
    gas: z.boolean(),
  }),
  condition: z.enum(["new", "like-new", "good", "to-renovate"]),
  age: z.number().int().nonnegative(),
  availabilityType: z.enum(["inmediate", "date"]),
  availabilityDate: z.coerce.date().optional(),
  rooms: z.number().int().nonnegative().optional(),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  otherRooms: z.array(roomSchema).optional(),
  comodities: z.array(comoditySchema).optional(),
  characteristics: z.array(characteristicSchema).optional(),
});

module.exports = { createPropertySchema };
