var request = window.indexedDB.open('swDb',1);

request.onerror = function (event) {
    console.log('数据库打开报错');
  };

  var db;

request.onsuccess = function (event) {
  db = request.result;
  console.log('数据库打开成功');
};


request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore;
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { keyPath: 'id' });
  }
}