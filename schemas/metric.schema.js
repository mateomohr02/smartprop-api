const z = require("zod");

const metricSchema = z.object({
  name: z.enum([
    //Save Filters

    "filter",

    //Navigation Stats

    "visit_site",

    "visit_blog",

    "visit_contact",

    "interaction_prop",

    "visualization_prop",

    "post_detail_blog",

    //Buttons Stats

    "whatsapp",

    "instagram",

    "form_send",

    "share_prop",

    "post_share_blog",
  ]),
  propertyId: z.array(z.string().uuid()).nonempty().optional().nullable(),
  postId: z.array(z.string().uuid()).nonempty().optional().nullable(),
  metadata: z.record(z.string(), z.any()).optional().nullable(),
});

module.exports = { metricSchema };
