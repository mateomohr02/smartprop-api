'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventMetric = sequelize.define('EventMetric', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    eventType: {
      type: DataTypes.ENUM(
        'visit',
        'detail_prop',
        'contact',
        'form_send',
        'blog_post_detail',
        'post_share',
        'prop_share',
        'visit_blog',
        'whatsapp',
        'instagram'
      ),
      allowNull: false
    },
    entityId: {
      type: DataTypes.UUID,
      allowNull: true 
    },
    tenantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tenant',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, { timestamps: true });

  return EventMetric;
};
