import Class from '../../core/database/models/class';

const classService = {
  getSpecificClass: (options) => {
    return new Promise((resolve, reject) => {
      Class.findOne(options)
        .then((clazz) => {
          resolve(clazz);
        })
        .catch((err) => {
          console.error(err);
          reject('Getting class fail');
        });
    });
  },

  updateClass: (id, data) => {
    return new Promise((resolve, reject) => {
      Class.update(data, {
        where: {
          id
        },
        returning: true
      })
        .then((result) => {
          resolve(result[1]);
        })
        .catch((err) => {
          console.error('Update class:', err);
          reject('Updating class fail');
        });
    });
  },

  deleteClass: (id) => {
    return new Promise((resolve, reject) => {
      Class.destroy({
        where: {
          id
        }
      })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.error('Delete class:', err);
          reject('Deleting class fail');
        });
    });
  }
};

export default classService;
