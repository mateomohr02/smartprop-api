const AppError = require("../../../utils/appError");
const { EventMetric } = require("../../../db/models");

const fetchDashboardMetrics = (tenantId) => {

    const metrics = {
        visit_site: [],
        visit_blog: [],
        visit_contact: [],
        filter: [],
        interaction_prop: [],
        visualization_prop: [],
        post_detail_blog: [],
        whatsapp: [],
        instagram: [],
        form_send: [],
        share_prop: [],
        post_share_blog: []
    }

    const events = EventMetric.findAll({
        where: {
            tenantId,
        }
    })

}

module.exports = {
    fetchDashboardMetrics
}