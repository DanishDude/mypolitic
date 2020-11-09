exports.emailFormat = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

exports.escapeRegex = text => {
  if (!text) return null;
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

exports.removeEmptyArrayValues = object => {
  if (object['_doc']) {
    for (const [key, value] of Object.entries(object['_doc'])) {
      if (Array.isArray(value) && value.length === 0) delete object['_doc'][key];
    };
  }
  return object;
};
