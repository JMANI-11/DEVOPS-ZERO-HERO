exports.up = (pgm) => {
  pgm.createTable('todos', {
    id: 'id',
    title: { type: 'varchar(255)', notNull: true },
    completed: { type: 'boolean', notNull: true, default: false },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('todos');
};
