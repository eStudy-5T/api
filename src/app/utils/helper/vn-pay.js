import config from '../../core/constants/app-config';
import querystring from 'qs';
import crypto from 'crypto';

const sortObject = (obj) => {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj[key]) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
};

const generateChecksum = (queries, shouldSort = false) => {
  const newQueries = shouldSort ? sortObject(queries) : queries;
  const signData = querystring.stringify(newQueries, {encode: false});
  const hmac = crypto.createHmac('sha512', config.vnpay.hashSecret);
  return hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
};

const generateCheckoutUrl = (data) => {
  const {
    price,
    createDate,
    ipAddress,
    locale,
    currency,
    studentName,
    courseName,
    courseId,
    studentId
  } = data;

  let orderInfo;
  const fixedLocale = locale === 'vi-VN' ? 'vn' : 'en';
  switch (fixedLocale) {
    case 'vn':
      orderInfo = `${studentName} nap ${price} ${
        currency || 'VND'
      } cho khoa hoc ${courseName}`;
      break;
    default:
      orderInfo = `${studentName} pay ${price} ${
        currency || 'VND'
      } for course ${courseName}`;
  }

  let queries = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: config.vnpay.tmnCode,
    vnp_Amount: price * 100,
    vnp_CreateDate: createDate,
    vnp_CurrCode: currency || 'VND',
    vnp_IpAddr: ipAddress,
    vnp_Locale: fixedLocale,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: '250000',
    vnp_ReturnUrl: `${config.vnpay.returnBaseURL}/${courseId}`,
    vnp_TxnRef: `${courseId}_${studentId}_${Date.now()}`
  };
  queries = sortObject(queries);
  const signed = generateChecksum(queries);
  queries['vnp_SecureHash'] = signed;

  const checkoutUrl = `${config.vnpay.url}?${querystring.stringify(queries, {
    encode: false
  })}`;

  return checkoutUrl;
};

export default {generateCheckoutUrl, generateChecksum};
