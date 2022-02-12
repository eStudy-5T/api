import _ from 'lodash';

const handleErrorResponse = (res, err) => {
  if (_.isString(err)) {
    res.status(500).send(err);
  } else {
    console.error(err);
    res.status(500).end();
  }
};

export default {handleErrorResponse};
