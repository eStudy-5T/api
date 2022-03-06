import Class from '../../core/database/models/class';

const classService = {
  getClasses: (id) => {
    return new Promise((resolve, reject) => {
      Class.findAll({
        where: {
          courseId: id
        }
      })
        .then((classes) => {
          resolve(classes);
        })
        .catch((err) => {
          console.error('Get classes of a course:', err);
          reject('Getting classes of a course fail');
        });
    });
  },

  createClass: (id, data) => {
    return new Promise((resolve, reject) => {
      Class.create({
        courseId: id,
        ...data
      })
        .then((createdClass) => {
          resolve(createdClass);
        })
        .catch((err) => {
          console.error('Create class:', err);
          reject('Creating class fail');
        });
    });
  },

  createMultipleClasses: (classesData) => {
    return new Promise((resolve, reject) => {
      Class.bulkCreate(classesData)
        .then((createClasses) => {
          resolve(createClasses);
        })
        .catch((err) => {
          console.error('Create multiple classes:', err);
          reject('Creating multiple classes fail');
        });
    });
  },

  getSpecificClass: (options) => {
    return new Promise((resolve, reject) => {
      Class.findOne(options)
        .then((createdClass) => {
          resolve(createdClass);
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
