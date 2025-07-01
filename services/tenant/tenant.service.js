const { Tenant } = require("../../db/models")
const AppError = require("../../utils/appError");
const { validateEmail } = require("../auth/auth.helpers");

const addTenant = async ({name, email, domain}) => {
    if(!name || !email || !domain) {
        throw new AppError("Missing parameters to create a Tenant", 400);
    }

    if (!validateEmail(email)) {
        throw new AppError("Invalid email format.", 400);
    }

    const tenantExists = await Tenant.findOne({where: {email}});

    if (tenantExists) {
        throw new AppError(`There is a Tenant with te same email: ${tenantExists}`, 409);
    }

    const newTenant = await Tenant.create({name, email, domain});

    return newTenant
}

module.exports = {
  addTenant
}