const { PropertyRoom, Room} = require("../../db/models");
const AppError = require("../../utils/appError");
const { nameFormatter, slugFormatter } = require("../../utils/stringFormatter");

const addPropertyOtherRooms = async (otherRooms = [], propertyId, tenantId) => {
  if (!otherRooms.length) return [];

  const slugs = otherRooms.map((room) => room.roomSlug);

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

  const missingSlugs = slugs.filter((slug) => !existingSlugToId[slug]);

  const createdRooms = await Promise.all(
    missingSlugs.map((slug) =>
      Room.create({
        name: nameFormatter(slug),
        slug: slugFormatter(slug),
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
    otherRooms.map(({ roomSlug, value, size }) =>
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
};

module.exports = {
  addPropertyOtherRooms,
};