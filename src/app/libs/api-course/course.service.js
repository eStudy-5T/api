import {Op} from 'sequelize';
import Course from '../../core/database/models/course';

const getCourses = (options, searchPhrase = null) => {
  const whereSearchPhrase = searchPhrase
    ? {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${searchPhrase}%`
            }
          },
          {
            description: {
              [Op.iLike]: `%${searchPhrase}%`
            }
          }
        ]
      }
    : {};

  return new Promise((resolve, reject) => {
    Course.findAll({
      ...options,
      ...whereSearchPhrase
    })
      .then((courses) => {
        resolve(courses);
      })
      .catch((err) => {
        console.error('Get courses:', err);
        reject('Getting courses fail');
      });
  });
};

const getSpecificCourse = (id) => {
  return new Promise((resolve, reject) => {
    Course.findByPk(id)
      .then((course) => {
        resolve(course);
      })
      .catch((err) => {
        console.error(err);
        reject('Getting course fail');
      });
  });
};

const createCourse = (data) => {
  return new Promise((resolve, reject) => {
    Course.create(data)
      .then((createdCourse) => {
        resolve(createdCourse);
      })
      .catch((err) => {
        console.error('Create course:', err);
        reject('Creating course fail');
      });
  });
};

const updateCourse = (id, data) => {
  return new Promise((resolve, reject) => {
    Course.update(data, {
      where: {
        id
      },
      returning: true
    })
      .then((result) => {
        resolve(result[1]);
      })
      .catch((err) => {
        console.error('Update course:', err);
        reject('Updating course fail');
      });
  });
};

const deleteCourse = (id) => {
  return new Promise((resolve, reject) => {
    Course.destroy({
      where: {
        id
      }
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.error('Delete course:', err);
        reject('Deleting course fail');
      });
  });
};

export default {
  getCourses,
  getSpecificCourse,
  createCourse,
  updateCourse,
  deleteCourse
};
