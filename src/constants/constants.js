const local = true;

const apiBaseUrl = local ? 'http://localhost:8081/api' : "https://clawtech-logistica-proyecto.ue.r.appspot.com/api";
const bucketName = 'clawtechpics';

export { apiBaseUrl, bucketName };
