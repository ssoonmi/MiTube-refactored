export default function({ method, url, data, success, error }) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();

    request.onload = function () {
      const response = JSON.parse(request.response);
      
      if (this.status >= 200 && this.status < 300) {
        if (success) success(response);
        resolve(response);
      } else {
        if (error) error(response);
        reject({
          status: this.status,
          statusText: request.statusText
        });
      }
    }; // same as: request.addEventListener("load", receiveLCSData);

    request.open(method, url);

    var token = document.querySelector('meta[name="csrf-token"]').content;
    request.setRequestHeader('X-CSRF-Token', token);

    if (data instanceof FormData) {
      request.send(data);
    } else {
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(data));
    }
  });
}