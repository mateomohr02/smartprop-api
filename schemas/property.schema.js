const { z } = require("zod");

const roomSchema = z.object({
  roomSlug: z.string().min(4),
  value: z.number().min(1),
  size: z.array(z.number().positive()).optional(),
});

const comoditySchema = z.object({
  slug: z.string(),
});

const characteristicSchema = z.object({
  slug: z.string(),
});

const createPropertySchema = z.object({
  title: z.string().min(15),
  propertyTypeSlug: z.string().min(2),
  description: z.string().min(30),
  operation: z.enum(["sale", "rent", "short-term"]),
  price: z.number().nonnegative().min(),
  priceFIAT: z.enum(["ARS", "USD", "EUR", "BRL"]),
  expenses: z.number().nonnegative().nullable().optional(),
  expensesFIAT: z.enum(["ARS", "USD", "BRL", "EUR"]).nullable().optional(),
  financing: z.string().optional(),
  multimedia: z.object({
    images: z.array(z.string().url()),
    video: z.array(z.string().url().optional()).optional()
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
  address: z.string().min(5),
  mapLocation: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  place: z.object({
    countryInput: z.string().min(4),
    provinceInput: z.string().min(4),
    cityInput: z.string().min(4),
    neighborhoodInput: z.string().min(4),
  }),
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
