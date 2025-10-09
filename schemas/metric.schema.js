const z = require("zod");

const metricSchema = z.object({
  name: z.enum([
    //Save Filters
    //listo
    "filter",

    //Navigation Stats
    //listo
    "visit_site",
    //listo
    "visit_blog",
    //listo
    "visit_contact",
    //listo
    "interaction_prop",
    //listo
    "visualization_prop",
    
    "post_detail_blog",

    //Buttons Stats

    "whatsapp",

    "instagram",

    "form_send",

    "share_prop",

    "post_share_blog",
  ]),
  propertyId: z.array(z.string().uuid()).optional().nullable(),
  postId: z.array(z.string().uuid()).optional().nullable(),
  metadata: z.record(z.string(), z.any()).optional().nullable(),
});

module.exports = { metricSchema };
