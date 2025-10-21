const { PropertyRoom, Room} = require("../../db/models");
const AppError = require("../../utils/appError");
const { nameFormatter, slugFormatter } = require("../../utils/stringFormatter");

const addPropertyOtherRooms = async (otherRooms = [], propertyId, tenantId) => {
  try {
    if (!otherRooms.length) return [];

    // Estandarizamos los slugs
    const formattedRooms = otherRooms.map((r) => ({
      ...r,
      roomSlug: slugFormatter(r.roomSlug),
    }));

    const slugs = formattedRooms.map((r) => r.roomSlug);

    // Buscar los rooms existentes del tenant
    const existingTenantRooms = await Room.findAll({
      where: {
        slug: slugs,
        tenantId,
      },
    });

    const existingSlugToId = existingTenantRooms.reduce((acc, room) => {
      acc[room.slug] = room.id;
      return acc;
    }, {});

    // Detectar las que faltan crear
    const missingSlugs = slugs.filter((slug) => !existingSlugToId[slug]);

    const createdRooms = await Promise.all(
      missingSlugs.map((slug) =>
        Room.create({
          name: nameFormatter(slug),
          slug,
          tenantId,
        })
      )
    );

    const createdSlugToId = createdRooms.reduce((acc, room) => {
      acc[room.slug] = room.id;
      return acc;
    }, {});

    const allSlugToId = { ...existingSlugToId, ...createdSlugToId };

    // Crear registros en PropertyRoom
    const propertyRoomRecords = await Promise.all(
      formattedRooms.map(({ roomSlug, value, size }) =>
        PropertyRoom.create({
          propertyId,
          roomId: allSlugToId[roomSlug],
          value: value || 1,
          size: size || null,
          tenantId,
        })
      )
    );

    return propertyRoomRecords;
  } catch (error) {
    console.error("Error en addPropertyOtherRooms:", error);
    throw new AppError("Error al asociar otros ambientes a la propiedad.", 500);
  }
};

module.exports = {
  addPropertyOtherRooms,
};