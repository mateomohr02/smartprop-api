const z = require("zod");

const metricSchema = z.object({
  name: z.enum([
    "visit",
    "visit_blog",
    "whatsapp",
    "instagram",
    "detail_prop",
    "contact",
    "form_send",
    "blog_post_detail",
    "post_share",
    "prop_share",
  ]),
  entity: z.string().uuid().optional().nullable(),
});

module.exports = { metricSchema };
