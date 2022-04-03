import _ from 'lodash';

const handleErrorResponse = (res, err) => {
  if (_.isString(err)) {
    return res.status(500).send(err);
  }

  if (err.status) {
    if (!err.message) {
      return res.sendStatus(err.status);
    }

    return res.status(err.status).send(err.message);
  }

  console.error(err);
  res.status(500).end();
};

const handleValidationErrorResponse = (res, err) => {
  const errorMessage = err.message?.split('.')[0];
  console.error(errorMessage);
  if (errorMessage === 'Internal Server Error') {
    res.sendStatus(500);
  } else {
    res.status(400).send(errorMessage);
  }
};

export default {handleErrorResponse, handleValidationErrorResponse};
