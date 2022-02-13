import _ from 'lodash';

const handleErrorResponse = (res, err) => {
  if (_.isString(err)) {
    res.status(500).send(err);
  } else {
    console.error(err);
    res.status(500).end();
  }
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
