
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', '.git', true, true);
Module['FS_createPath']('/.git', 'hooks', true, true);
Module['FS_createPath']('/.git', 'info', true, true);
Module['FS_createPath']('/.git', 'logs', true, true);
Module['FS_createPath']('/.git/logs', 'refs', true, true);
Module['FS_createPath']('/.git/logs/refs', 'heads', true, true);
Module['FS_createPath']('/.git/logs/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/logs/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git', 'objects', true, true);
Module['FS_createPath']('/.git/objects', '00', true, true);
Module['FS_createPath']('/.git/objects', '01', true, true);
Module['FS_createPath']('/.git/objects', '02', true, true);
Module['FS_createPath']('/.git/objects', '05', true, true);
Module['FS_createPath']('/.git/objects', '06', true, true);
Module['FS_createPath']('/.git/objects', '07', true, true);
Module['FS_createPath']('/.git/objects', '08', true, true);
Module['FS_createPath']('/.git/objects', '0a', true, true);
Module['FS_createPath']('/.git/objects', '0b', true, true);
Module['FS_createPath']('/.git/objects', '0c', true, true);
Module['FS_createPath']('/.git/objects', '0d', true, true);
Module['FS_createPath']('/.git/objects', '0e', true, true);
Module['FS_createPath']('/.git/objects', '11', true, true);
Module['FS_createPath']('/.git/objects', '12', true, true);
Module['FS_createPath']('/.git/objects', '14', true, true);
Module['FS_createPath']('/.git/objects', '15', true, true);
Module['FS_createPath']('/.git/objects', '19', true, true);
Module['FS_createPath']('/.git/objects', '1b', true, true);
Module['FS_createPath']('/.git/objects', '20', true, true);
Module['FS_createPath']('/.git/objects', '22', true, true);
Module['FS_createPath']('/.git/objects', '26', true, true);
Module['FS_createPath']('/.git/objects', '27', true, true);
Module['FS_createPath']('/.git/objects', '2c', true, true);
Module['FS_createPath']('/.git/objects', '2d', true, true);
Module['FS_createPath']('/.git/objects', '2f', true, true);
Module['FS_createPath']('/.git/objects', '32', true, true);
Module['FS_createPath']('/.git/objects', '34', true, true);
Module['FS_createPath']('/.git/objects', '35', true, true);
Module['FS_createPath']('/.git/objects', '36', true, true);
Module['FS_createPath']('/.git/objects', '38', true, true);
Module['FS_createPath']('/.git/objects', '39', true, true);
Module['FS_createPath']('/.git/objects', '3a', true, true);
Module['FS_createPath']('/.git/objects', '3b', true, true);
Module['FS_createPath']('/.git/objects', '3d', true, true);
Module['FS_createPath']('/.git/objects', '3e', true, true);
Module['FS_createPath']('/.git/objects', '3f', true, true);
Module['FS_createPath']('/.git/objects', '40', true, true);
Module['FS_createPath']('/.git/objects', '41', true, true);
Module['FS_createPath']('/.git/objects', '42', true, true);
Module['FS_createPath']('/.git/objects', '43', true, true);
Module['FS_createPath']('/.git/objects', '44', true, true);
Module['FS_createPath']('/.git/objects', '45', true, true);
Module['FS_createPath']('/.git/objects', '47', true, true);
Module['FS_createPath']('/.git/objects', '4a', true, true);
Module['FS_createPath']('/.git/objects', '4b', true, true);
Module['FS_createPath']('/.git/objects', '4c', true, true);
Module['FS_createPath']('/.git/objects', '4f', true, true);
Module['FS_createPath']('/.git/objects', '59', true, true);
Module['FS_createPath']('/.git/objects', '5e', true, true);
Module['FS_createPath']('/.git/objects', '63', true, true);
Module['FS_createPath']('/.git/objects', '67', true, true);
Module['FS_createPath']('/.git/objects', '68', true, true);
Module['FS_createPath']('/.git/objects', '69', true, true);
Module['FS_createPath']('/.git/objects', '6b', true, true);
Module['FS_createPath']('/.git/objects', '6c', true, true);
Module['FS_createPath']('/.git/objects', '6e', true, true);
Module['FS_createPath']('/.git/objects', '6f', true, true);
Module['FS_createPath']('/.git/objects', '75', true, true);
Module['FS_createPath']('/.git/objects', '76', true, true);
Module['FS_createPath']('/.git/objects', '77', true, true);
Module['FS_createPath']('/.git/objects', '79', true, true);
Module['FS_createPath']('/.git/objects', '7b', true, true);
Module['FS_createPath']('/.git/objects', '7c', true, true);
Module['FS_createPath']('/.git/objects', '85', true, true);
Module['FS_createPath']('/.git/objects', '86', true, true);
Module['FS_createPath']('/.git/objects', '87', true, true);
Module['FS_createPath']('/.git/objects', '88', true, true);
Module['FS_createPath']('/.git/objects', '89', true, true);
Module['FS_createPath']('/.git/objects', '8e', true, true);
Module['FS_createPath']('/.git/objects', '92', true, true);
Module['FS_createPath']('/.git/objects', '94', true, true);
Module['FS_createPath']('/.git/objects', '95', true, true);
Module['FS_createPath']('/.git/objects', '99', true, true);
Module['FS_createPath']('/.git/objects', '9a', true, true);
Module['FS_createPath']('/.git/objects', '9b', true, true);
Module['FS_createPath']('/.git/objects', 'a0', true, true);
Module['FS_createPath']('/.git/objects', 'a3', true, true);
Module['FS_createPath']('/.git/objects', 'a8', true, true);
Module['FS_createPath']('/.git/objects', 'aa', true, true);
Module['FS_createPath']('/.git/objects', 'ac', true, true);
Module['FS_createPath']('/.git/objects', 'ae', true, true);
Module['FS_createPath']('/.git/objects', 'af', true, true);
Module['FS_createPath']('/.git/objects', 'b0', true, true);
Module['FS_createPath']('/.git/objects', 'b2', true, true);
Module['FS_createPath']('/.git/objects', 'b3', true, true);
Module['FS_createPath']('/.git/objects', 'b5', true, true);
Module['FS_createPath']('/.git/objects', 'b6', true, true);
Module['FS_createPath']('/.git/objects', 'b7', true, true);
Module['FS_createPath']('/.git/objects', 'b8', true, true);
Module['FS_createPath']('/.git/objects', 'ba', true, true);
Module['FS_createPath']('/.git/objects', 'bb', true, true);
Module['FS_createPath']('/.git/objects', 'be', true, true);
Module['FS_createPath']('/.git/objects', 'c0', true, true);
Module['FS_createPath']('/.git/objects', 'c2', true, true);
Module['FS_createPath']('/.git/objects', 'c3', true, true);
Module['FS_createPath']('/.git/objects', 'c5', true, true);
Module['FS_createPath']('/.git/objects', 'c7', true, true);
Module['FS_createPath']('/.git/objects', 'c9', true, true);
Module['FS_createPath']('/.git/objects', 'ca', true, true);
Module['FS_createPath']('/.git/objects', 'cc', true, true);
Module['FS_createPath']('/.git/objects', 'ce', true, true);
Module['FS_createPath']('/.git/objects', 'd0', true, true);
Module['FS_createPath']('/.git/objects', 'd3', true, true);
Module['FS_createPath']('/.git/objects', 'd4', true, true);
Module['FS_createPath']('/.git/objects', 'd6', true, true);
Module['FS_createPath']('/.git/objects', 'd7', true, true);
Module['FS_createPath']('/.git/objects', 'd8', true, true);
Module['FS_createPath']('/.git/objects', 'dc', true, true);
Module['FS_createPath']('/.git/objects', 'dd', true, true);
Module['FS_createPath']('/.git/objects', 'df', true, true);
Module['FS_createPath']('/.git/objects', 'e0', true, true);
Module['FS_createPath']('/.git/objects', 'e2', true, true);
Module['FS_createPath']('/.git/objects', 'e3', true, true);
Module['FS_createPath']('/.git/objects', 'e4', true, true);
Module['FS_createPath']('/.git/objects', 'e6', true, true);
Module['FS_createPath']('/.git/objects', 'e7', true, true);
Module['FS_createPath']('/.git/objects', 'e9', true, true);
Module['FS_createPath']('/.git/objects', 'ea', true, true);
Module['FS_createPath']('/.git/objects', 'eb', true, true);
Module['FS_createPath']('/.git/objects', 'ee', true, true);
Module['FS_createPath']('/.git/objects', 'f4', true, true);
Module['FS_createPath']('/.git/objects', 'f5', true, true);
Module['FS_createPath']('/.git/objects', 'f6', true, true);
Module['FS_createPath']('/.git/objects', 'fa', true, true);
Module['FS_createPath']('/.git/objects', 'ff', true, true);
Module['FS_createPath']('/.git', 'refs', true, true);
Module['FS_createPath']('/.git/refs', 'heads', true, true);
Module['FS_createPath']('/.git/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/refs', 'tags', true, true);
Module['FS_createPath']('/', '.idea', true, true);
Module['FS_createPath']('/.idea', 'inspectionProfiles', true, true);
Module['FS_createPath']('/', 'assets', true, true);
Module['FS_createPath']('/', 'screenshots', true, true);
Module['FS_createPath']('/', 'target', true, true);
Module['FS_createPath']('/target', 'lost-0.1-unix', true, true);
Module['FS_createPath']('/target', 'lost-0.1-win32', true, true);
Module['FS_createPath']('/target', 'test', true, true);
Module['FS_createPath']('/target/test', 'lost-0.1-unix', true, true);
Module['FS_createPath']('/target/test', 'lost-0.1-win32', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      },
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_game.data');

    };
    Module['addRunDependency']('datafile_game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 365, "filename": "/.gitignore"}, {"audio": 0, "start": 365, "crunched": 0, "end": 1421, "filename": "/candles.lua"}, {"audio": 0, "start": 1421, "crunched": 0, "end": 2153, "filename": "/coins.lua"}, {"audio": 0, "start": 2153, "crunched": 0, "end": 2280, "filename": "/conf.lua"}, {"audio": 0, "start": 2280, "crunched": 0, "end": 4180, "filename": "/ghosts.lua"}, {"audio": 0, "start": 4180, "crunched": 0, "end": 40001, "filename": "/LICENSE"}, {"audio": 0, "start": 40001, "crunched": 0, "end": 40473, "filename": "/lost.iml"}, {"audio": 0, "start": 40473, "crunched": 0, "end": 45904, "filename": "/main.lua"}, {"audio": 0, "start": 45904, "crunched": 0, "end": 50299, "filename": "/maze.lua"}, {"audio": 0, "start": 50299, "crunched": 0, "end": 51633, "filename": "/nodes.lua"}, {"audio": 0, "start": 51633, "crunched": 0, "end": 53445, "filename": "/player.lua"}, {"audio": 0, "start": 53445, "crunched": 0, "end": 53805, "filename": "/README.md"}, {"audio": 0, "start": 53805, "crunched": 0, "end": 54343, "filename": "/textures.lua"}, {"audio": 0, "start": 54343, "crunched": 0, "end": 54877, "filename": "/utils.lua"}, {"audio": 0, "start": 54877, "crunched": 0, "end": 54887, "filename": "/.git/COMMIT_EDITMSG"}, {"audio": 0, "start": 54887, "crunched": 0, "end": 55183, "filename": "/.git/config"}, {"audio": 0, "start": 55183, "crunched": 0, "end": 55256, "filename": "/.git/description"}, {"audio": 0, "start": 55256, "crunched": 0, "end": 55351, "filename": "/.git/FETCH_HEAD"}, {"audio": 0, "start": 55351, "crunched": 0, "end": 55374, "filename": "/.git/HEAD"}, {"audio": 0, "start": 55374, "crunched": 0, "end": 58429, "filename": "/.git/index"}, {"audio": 0, "start": 58429, "crunched": 0, "end": 58470, "filename": "/.git/ORIG_HEAD"}, {"audio": 0, "start": 58470, "crunched": 0, "end": 58577, "filename": "/.git/packed-refs"}, {"audio": 0, "start": 58577, "crunched": 0, "end": 59055, "filename": "/.git/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 59055, "crunched": 0, "end": 59951, "filename": "/.git/hooks/commit-msg.sample"}, {"audio": 0, "start": 59951, "crunched": 0, "end": 60140, "filename": "/.git/hooks/post-update.sample"}, {"audio": 0, "start": 60140, "crunched": 0, "end": 60564, "filename": "/.git/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 60564, "crunched": 0, "end": 62206, "filename": "/.git/hooks/pre-commit.sample"}, {"audio": 0, "start": 62206, "crunched": 0, "end": 63554, "filename": "/.git/hooks/pre-push.sample"}, {"audio": 0, "start": 63554, "crunched": 0, "end": 68505, "filename": "/.git/hooks/pre-rebase.sample"}, {"audio": 0, "start": 68505, "crunched": 0, "end": 69049, "filename": "/.git/hooks/pre-receive.sample"}, {"audio": 0, "start": 69049, "crunched": 0, "end": 70288, "filename": "/.git/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 70288, "crunched": 0, "end": 73898, "filename": "/.git/hooks/update.sample"}, {"audio": 0, "start": 73898, "crunched": 0, "end": 74138, "filename": "/.git/info/exclude"}, {"audio": 0, "start": 74138, "crunched": 0, "end": 78155, "filename": "/.git/logs/HEAD"}, {"audio": 0, "start": 78155, "crunched": 0, "end": 82172, "filename": "/.git/logs/refs/heads/master"}, {"audio": 0, "start": 82172, "crunched": 0, "end": 82347, "filename": "/.git/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 82347, "crunched": 0, "end": 85687, "filename": "/.git/logs/refs/remotes/origin/master"}, {"audio": 0, "start": 85687, "crunched": 0, "end": 85864, "filename": "/.git/objects/00/334254d1c5c31543f9a36fcc14783d462fc0d9"}, {"audio": 0, "start": 85864, "crunched": 0, "end": 95697, "filename": "/.git/objects/01/37c3a9edbddd32581ae1cc29814fdd65849a87"}, {"audio": 0, "start": 95697, "crunched": 0, "end": 95981, "filename": "/.git/objects/01/733f726ce90a55e4342d7be7fe1199f26cf8d5"}, {"audio": 0, "start": 95981, "crunched": 0, "end": 97111, "filename": "/.git/objects/02/c8c142bd573f8c756c438b3672d7a0a05f317c"}, {"audio": 0, "start": 97111, "crunched": 0, "end": 97887, "filename": "/.git/objects/05/2987fae441cb131025692a85b5db017bd28225"}, {"audio": 0, "start": 97887, "crunched": 0, "end": 103275, "filename": "/.git/objects/05/b1617d64f41de2deb5cf064f2de8f6e5ba76a3"}, {"audio": 0, "start": 103275, "crunched": 0, "end": 103825, "filename": "/.git/objects/06/49a472e09251b19aa518a4a0f626d6b969c944"}, {"audio": 0, "start": 103825, "crunched": 0, "end": 114205, "filename": "/.git/objects/06/ecb9741248d42c0971b88cd3d7b4c667850003"}, {"audio": 0, "start": 114205, "crunched": 0, "end": 114629, "filename": "/.git/objects/07/08fb792dda9914c4863aee08d91d4451cbd0af"}, {"audio": 0, "start": 114629, "crunched": 0, "end": 114804, "filename": "/.git/objects/08/80156740e436865807a1f751f48a15db045caf"}, {"audio": 0, "start": 114804, "crunched": 0, "end": 115064, "filename": "/.git/objects/0a/27fe5d7b89ff5d89c6c44772cc6375c607f1aa"}, {"audio": 0, "start": 115064, "crunched": 0, "end": 115626, "filename": "/.git/objects/0b/717a6068712be317042dbbf78a5b9c8ec9d38a"}, {"audio": 0, "start": 115626, "crunched": 0, "end": 116652, "filename": "/.git/objects/0c/22c6bdb0403aeee5e4b2d93e9426af99988634"}, {"audio": 0, "start": 116652, "crunched": 0, "end": 116858, "filename": "/.git/objects/0d/d74054136a1cc77c35584d6d5748c662c37f67"}, {"audio": 0, "start": 116858, "crunched": 0, "end": 117055, "filename": "/.git/objects/0e/6a0266491f4d76609e6b630b46ea3a566cf684"}, {"audio": 0, "start": 117055, "crunched": 0, "end": 117217, "filename": "/.git/objects/0e/8dcb902f93f26e69310fb56a7596d5632a95aa"}, {"audio": 0, "start": 117217, "crunched": 0, "end": 118352, "filename": "/.git/objects/11/7c4a9573f0faf70f8a7e9e326eca787d27170a"}, {"audio": 0, "start": 118352, "crunched": 0, "end": 118513, "filename": "/.git/objects/11/aaea4997b2c5da75f5d0446e54bbc12e760a69"}, {"audio": 0, "start": 118513, "crunched": 0, "end": 119030, "filename": "/.git/objects/12/d0e70884d36729ef6ba17b5c97743731dcd375"}, {"audio": 0, "start": 119030, "crunched": 0, "end": 119645, "filename": "/.git/objects/14/258c0df7618489a385fbe2ba70e453e2d146fe"}, {"audio": 0, "start": 119645, "crunched": 0, "end": 119799, "filename": "/.git/objects/14/9245a8ce2ee6721d0005d9bac38475a3067079"}, {"audio": 0, "start": 119799, "crunched": 0, "end": 119938, "filename": "/.git/objects/14/ffeba4b973b5320deabf80378af5cde32ba1fa"}, {"audio": 0, "start": 119938, "crunched": 0, "end": 120450, "filename": "/.git/objects/15/d58e40aa4afcbc555bca7ccbe048a9171a6242"}, {"audio": 0, "start": 120450, "crunched": 0, "end": 120874, "filename": "/.git/objects/19/f4c5191d47e20b137fa841d81a44aec1eca21f"}, {"audio": 0, "start": 120874, "crunched": 0, "end": 121077, "filename": "/.git/objects/1b/00219cacf33213066b78b302e3c18ce8d37e01"}, {"audio": 0, "start": 121077, "crunched": 0, "end": 121338, "filename": "/.git/objects/1b/337c53bac2f5f15ba75312595953d5547cddc0"}, {"audio": 0, "start": 121338, "crunched": 0, "end": 121572, "filename": "/.git/objects/1b/76fdcc3c3b23324642cd288cbcf16cbc5a1695"}, {"audio": 0, "start": 121572, "crunched": 0, "end": 121669, "filename": "/.git/objects/1b/a0cf5e1a7f75e76ea5f2580b7f32e41ed6feac"}, {"audio": 0, "start": 121669, "crunched": 0, "end": 122003, "filename": "/.git/objects/1b/d5be05f490727c7cebd06f3d63765d2f4319e3"}, {"audio": 0, "start": 122003, "crunched": 0, "end": 123244, "filename": "/.git/objects/20/1773ace2f5ecfbef8a931e89be53a826b784f8"}, {"audio": 0, "start": 123244, "crunched": 0, "end": 123307, "filename": "/.git/objects/20/95855ea6519b42715044c81fe0ef8cde30c8cf"}, {"audio": 0, "start": 123307, "crunched": 0, "end": 123470, "filename": "/.git/objects/22/3da5d8d718bf2d0a4e4ff0a531ac3e1e38290d"}, {"audio": 0, "start": 123470, "crunched": 0, "end": 124606, "filename": "/.git/objects/22/ad966620a5b8a7f0d546e0eef7eebe86026019"}, {"audio": 0, "start": 124606, "crunched": 0, "end": 139637, "filename": "/.git/objects/26/1feb79fd1979f71351c4adfe123a990eed3fff"}, {"audio": 0, "start": 139637, "crunched": 0, "end": 140060, "filename": "/.git/objects/26/60d9004b7eb349be20e10c042a557aed174e81"}, {"audio": 0, "start": 140060, "crunched": 0, "end": 140255, "filename": "/.git/objects/27/b3c9fb84581e26966870804a66a9797b523726"}, {"audio": 0, "start": 140255, "crunched": 0, "end": 140426, "filename": "/.git/objects/2c/2c8c9edcaf65489db52c54dce178f8a0a16fa5"}, {"audio": 0, "start": 140426, "crunched": 0, "end": 140711, "filename": "/.git/objects/2d/e1152ebfa3b9552b779a8dea006f8d494d4e40"}, {"audio": 0, "start": 140711, "crunched": 0, "end": 141712, "filename": "/.git/objects/2f/f9518bb652b343274ec156316b933a6161fc83"}, {"audio": 0, "start": 141712, "crunched": 0, "end": 142044, "filename": "/.git/objects/32/2ef476cc0cc95231c08b77b74cd81ae2e7b238"}, {"audio": 0, "start": 142044, "crunched": 0, "end": 143331, "filename": "/.git/objects/34/8804f555090127fd925a5c675564b804e0b5dd"}, {"audio": 0, "start": 143331, "crunched": 0, "end": 144486, "filename": "/.git/objects/35/00bb6192f583ae72ce6236687ed23e5d461cd1"}, {"audio": 0, "start": 144486, "crunched": 0, "end": 144969, "filename": "/.git/objects/35/e472e5400f3ec1166e8153371820bc9454c95b"}, {"audio": 0, "start": 144969, "crunched": 0, "end": 145109, "filename": "/.git/objects/35/eb1ddfbbc029bcab630581847471d7f238ec53"}, {"audio": 0, "start": 145109, "crunched": 0, "end": 145268, "filename": "/.git/objects/36/19ebb37f92c1fe427fb3f5df78cb2c9ed8e560"}, {"audio": 0, "start": 145268, "crunched": 0, "end": 145652, "filename": "/.git/objects/36/90a9d40bff1d8c629a6f05007f8dbadb2525db"}, {"audio": 0, "start": 145652, "crunched": 0, "end": 145933, "filename": "/.git/objects/38/7e7b29cc297287fa1fdc2a6db4acf1a4f79a07"}, {"audio": 0, "start": 145933, "crunched": 0, "end": 156961, "filename": "/.git/objects/39/779f185249ea6e0c435034f4205e7bda1cb0b2"}, {"audio": 0, "start": 156961, "crunched": 0, "end": 185384, "filename": "/.git/objects/3a/3a3a73270227dd9bf46d604674e32361b57c8e"}, {"audio": 0, "start": 185384, "crunched": 0, "end": 185501, "filename": "/.git/objects/3b/07641fb536bdcbb5900b0111ef0c8bc417d0e0"}, {"audio": 0, "start": 185501, "crunched": 0, "end": 185894, "filename": "/.git/objects/3d/7f9c3906aea8520caaa8709edb9d50dbf0ab9b"}, {"audio": 0, "start": 185894, "crunched": 0, "end": 186071, "filename": "/.git/objects/3d/a3a92b28e87f742148330e2c4467022fd8b4eb"}, {"audio": 0, "start": 186071, "crunched": 0, "end": 186236, "filename": "/.git/objects/3e/78c0482595b024530c397886979049396eb770"}, {"audio": 0, "start": 186236, "crunched": 0, "end": 186747, "filename": "/.git/objects/3f/dfda2a7c134f988a5bf3706ab3ec90911b3330"}, {"audio": 0, "start": 186747, "crunched": 0, "end": 186917, "filename": "/.git/objects/40/e5f198595f2eb193ed36072e7ffa8e6f87e59b"}, {"audio": 0, "start": 186917, "crunched": 0, "end": 187340, "filename": "/.git/objects/41/1f005c6914ba94837af0f96c35baf2261b757c"}, {"audio": 0, "start": 187340, "crunched": 0, "end": 187732, "filename": "/.git/objects/42/3de42a8e2841b92d752f39c4592acfad8171fc"}, {"audio": 0, "start": 187732, "crunched": 0, "end": 188156, "filename": "/.git/objects/42/db4b5dcb1714be41661d5a23d38c497f1bac3b"}, {"audio": 0, "start": 188156, "crunched": 0, "end": 188599, "filename": "/.git/objects/43/b17c7d0ebca7ef0bb4323458dfdcee3ab22c77"}, {"audio": 0, "start": 188599, "crunched": 0, "end": 189892, "filename": "/.git/objects/43/ec34a7f9d4bd1f03a4263c569eacb6bf75a17f"}, {"audio": 0, "start": 189892, "crunched": 0, "end": 190346, "filename": "/.git/objects/44/2c9a0ae96f5a0a7ac524245f8ae792e6cd44cc"}, {"audio": 0, "start": 190346, "crunched": 0, "end": 190676, "filename": "/.git/objects/45/7bb02a062f96570fe984d71570d2ec3a374114"}, {"audio": 0, "start": 190676, "crunched": 0, "end": 203191, "filename": "/.git/objects/47/9d2e883679d423bf0b40154f3d2a3480693276"}, {"audio": 0, "start": 203191, "crunched": 0, "end": 203703, "filename": "/.git/objects/4a/853adec535745ccc49491a6ec3633263fe8e7a"}, {"audio": 0, "start": 203703, "crunched": 0, "end": 204813, "filename": "/.git/objects/4a/95baef827d22eb20c4620770a512ddfedbada4"}, {"audio": 0, "start": 204813, "crunched": 0, "end": 204998, "filename": "/.git/objects/4b/0609ba5d916fb944f4406b1f471d173411d68d"}, {"audio": 0, "start": 204998, "crunched": 0, "end": 205297, "filename": "/.git/objects/4b/afb7f1b63941d1491520241aa3acd3e9c1970d"}, {"audio": 0, "start": 205297, "crunched": 0, "end": 205809, "filename": "/.git/objects/4b/b4722454d9ce7c275d3812ec09dce24fb55ca2"}, {"audio": 0, "start": 205809, "crunched": 0, "end": 206095, "filename": "/.git/objects/4c/2d323ee91faba51e2adfbb7f279918ee832a02"}, {"audio": 0, "start": 206095, "crunched": 0, "end": 207257, "filename": "/.git/objects/4f/1e6961c06a0efe7db91360720a2b4f50202b24"}, {"audio": 0, "start": 207257, "crunched": 0, "end": 207433, "filename": "/.git/objects/59/80ba52cfb187ddb6791a3b548612b44b44d1b0"}, {"audio": 0, "start": 207433, "crunched": 0, "end": 215239, "filename": "/.git/objects/5e/e44c33f50cc823f86b5a09fc2db0f07c3514c7"}, {"audio": 0, "start": 215239, "crunched": 0, "end": 215390, "filename": "/.git/objects/63/9900d13c6182e452e33a3bd638e70a0146c785"}, {"audio": 0, "start": 215390, "crunched": 0, "end": 215576, "filename": "/.git/objects/67/9b6325e32305dddeb8055a75456a94bab26ed6"}, {"audio": 0, "start": 215576, "crunched": 0, "end": 215939, "filename": "/.git/objects/68/5476460eac6c0b5e2c6def771cc52cc79133e0"}, {"audio": 0, "start": 215939, "crunched": 0, "end": 216107, "filename": "/.git/objects/69/c7c9eb56a68981fc7ec5ecb06d81ba749a4e52"}, {"audio": 0, "start": 216107, "crunched": 0, "end": 216283, "filename": "/.git/objects/6b/75f674b294c6154c8b635f7e1b19d63a94802d"}, {"audio": 0, "start": 216283, "crunched": 0, "end": 216793, "filename": "/.git/objects/6c/00b2b34b45510c7523b2940fa57a1137786f6d"}, {"audio": 0, "start": 216793, "crunched": 0, "end": 216962, "filename": "/.git/objects/6e/590c362c26edb794b49660b6ffd13d78093f13"}, {"audio": 0, "start": 216962, "crunched": 0, "end": 217194, "filename": "/.git/objects/6f/d0a376decfbf0a7be87fdc75d5109da72a7d17"}, {"audio": 0, "start": 217194, "crunched": 0, "end": 217660, "filename": "/.git/objects/75/2dcd54eb51a3786721b3dde35a63947a2a7b75"}, {"audio": 0, "start": 217660, "crunched": 0, "end": 217861, "filename": "/.git/objects/76/ae993092f6ce1b880bee7a3312fc33c5d53bb2"}, {"audio": 0, "start": 217861, "crunched": 0, "end": 244151, "filename": "/.git/objects/76/f461d9a589da69ddd9e5a23f9dc16a8661ca8e"}, {"audio": 0, "start": 244151, "crunched": 0, "end": 258351, "filename": "/.git/objects/77/e56ad0b71b9bc667b9bf50482ce66d35e6cd60"}, {"audio": 0, "start": 258351, "crunched": 0, "end": 258623, "filename": "/.git/objects/79/60b081639ace3c40e8207ab36122477aec6bd1"}, {"audio": 0, "start": 258623, "crunched": 0, "end": 258761, "filename": "/.git/objects/7b/155523ab3f466f2f1b600f820f6f707aaf31c6"}, {"audio": 0, "start": 258761, "crunched": 0, "end": 259400, "filename": "/.git/objects/7c/d0ca2a6ea277190e3a03f9fccdc91bd3dcae67"}, {"audio": 0, "start": 259400, "crunched": 0, "end": 259511, "filename": "/.git/objects/85/1ab94ea5a3b38be88ae3993b2b037f3ec1ffcb"}, {"audio": 0, "start": 259511, "crunched": 0, "end": 259753, "filename": "/.git/objects/85/e0bb9da8febb729c9c2cd526cd4c81e8d3138c"}, {"audio": 0, "start": 259753, "crunched": 0, "end": 260017, "filename": "/.git/objects/86/ceeb3273ad124097837ca739f1efd12b509051"}, {"audio": 0, "start": 260017, "crunched": 0, "end": 260440, "filename": "/.git/objects/87/1e3663fc60a79c3f7c216ebffefdaca5016295"}, {"audio": 0, "start": 260440, "crunched": 0, "end": 261303, "filename": "/.git/objects/87/54dfab0768bb04dbec24906dfb343910ad6c5b"}, {"audio": 0, "start": 261303, "crunched": 0, "end": 261625, "filename": "/.git/objects/88/0f7d49b80127da497e4f301725103764493c58"}, {"audio": 0, "start": 261625, "crunched": 0, "end": 262136, "filename": "/.git/objects/88/1e35285e8af144255e5a75a825572e0798e713"}, {"audio": 0, "start": 262136, "crunched": 0, "end": 262647, "filename": "/.git/objects/88/410b256fa502f8b4cfc8b0691ee17a8488bbd7"}, {"audio": 0, "start": 262647, "crunched": 0, "end": 262869, "filename": "/.git/objects/89/954429c0c0980640f99167c7d138875fedaaf8"}, {"audio": 0, "start": 262869, "crunched": 0, "end": 263350, "filename": "/.git/objects/8e/1447e50a2d93559bdc7048f416e93cccbab1b7"}, {"audio": 0, "start": 263350, "crunched": 0, "end": 263745, "filename": "/.git/objects/92/0ddeb13a39fb7f9559e5651957bff841687724"}, {"audio": 0, "start": 263745, "crunched": 0, "end": 264255, "filename": "/.git/objects/92/e03626b96017a78a9029e486f6338ced27c49e"}, {"audio": 0, "start": 264255, "crunched": 0, "end": 264677, "filename": "/.git/objects/94/3312b045ee105c6e020ce58c9bf6a223a616db"}, {"audio": 0, "start": 264677, "crunched": 0, "end": 278905, "filename": "/.git/objects/94/a9ed024d3859793618152ea559a168bbcbb5e2"}, {"audio": 0, "start": 278905, "crunched": 0, "end": 279388, "filename": "/.git/objects/94/bb51bc4f147afb5721bf71dd4ee4017a4c739a"}, {"audio": 0, "start": 279388, "crunched": 0, "end": 283906, "filename": "/.git/objects/95/526acffff3ef9495f6e5f12ea204ae01f9c92a"}, {"audio": 0, "start": 283906, "crunched": 0, "end": 284026, "filename": "/.git/objects/95/858ba5f1fd3c2d270e4a9eaec89122ef80c5a1"}, {"audio": 0, "start": 284026, "crunched": 0, "end": 284181, "filename": "/.git/objects/95/cc523d6ea8e9aaea33ddc2fdc971a988792116"}, {"audio": 0, "start": 284181, "crunched": 0, "end": 284605, "filename": "/.git/objects/95/cf8933d4501f4774af15d215b37d996ee02ef5"}, {"audio": 0, "start": 284605, "crunched": 0, "end": 285261, "filename": "/.git/objects/99/1802a5b44d372865586d1d04e0473e1255d1b1"}, {"audio": 0, "start": 285261, "crunched": 0, "end": 285875, "filename": "/.git/objects/9a/81740a98b49117c287c4fa8a59fdb38bb891ce"}, {"audio": 0, "start": 285875, "crunched": 0, "end": 470144, "filename": "/.git/objects/9b/1fbae535de702f0918fb5f1e8abaf337808146"}, {"audio": 0, "start": 470144, "crunched": 0, "end": 470205, "filename": "/.git/objects/a0/6bfb24dfe31e9225d2c11a3a8a7de7ec92aab3"}, {"audio": 0, "start": 470205, "crunched": 0, "end": 470685, "filename": "/.git/objects/a0/b9a6de0f685bee6705d286add04fa177cbf411"}, {"audio": 0, "start": 470685, "crunched": 0, "end": 470865, "filename": "/.git/objects/a0/f9080d23fb8312e0078e1e40424236d373e88e"}, {"audio": 0, "start": 470865, "crunched": 0, "end": 471033, "filename": "/.git/objects/a3/274928d7720a646d7ffee8274e2d50edf967d0"}, {"audio": 0, "start": 471033, "crunched": 0, "end": 471188, "filename": "/.git/objects/a3/3ff6114989561e06e9726c10639e9c19b2cf28"}, {"audio": 0, "start": 471188, "crunched": 0, "end": 471580, "filename": "/.git/objects/a8/72d3d1dd9be9e3634d958ec0f7d616dd9ebc35"}, {"audio": 0, "start": 471580, "crunched": 0, "end": 472729, "filename": "/.git/objects/a8/f878d532e22a08ef7a41ed665978418d844af1"}, {"audio": 0, "start": 472729, "crunched": 0, "end": 473092, "filename": "/.git/objects/aa/4d0e46c88862d49b15d9546120487b1086c856"}, {"audio": 0, "start": 473092, "crunched": 0, "end": 473228, "filename": "/.git/objects/ac/921aee5bf9c09d194c00cec5349f83ebc33619"}, {"audio": 0, "start": 473228, "crunched": 0, "end": 485894, "filename": "/.git/objects/ae/aa1bdde5cccc842982ac1ed09802ee578718b5"}, {"audio": 0, "start": 485894, "crunched": 0, "end": 486098, "filename": "/.git/objects/af/8014fbfeb91cee37dd4fdb65f8f8d17320a985"}, {"audio": 0, "start": 486098, "crunched": 0, "end": 486579, "filename": "/.git/objects/af/f49836d635b5543f38c5bfb0522d049ba870a5"}, {"audio": 0, "start": 486579, "crunched": 0, "end": 486777, "filename": "/.git/objects/b0/0b01563481c30516f25eb5d219fb78be8a21c2"}, {"audio": 0, "start": 486777, "crunched": 0, "end": 487170, "filename": "/.git/objects/b2/da6dc1b5dd5dd306b0a5f4ff7765ed15dff932"}, {"audio": 0, "start": 487170, "crunched": 0, "end": 487588, "filename": "/.git/objects/b3/9e7cfd8eac1871367841ce806953a9f8b4d666"}, {"audio": 0, "start": 487588, "crunched": 0, "end": 488133, "filename": "/.git/objects/b5/3859587eaebeb85a2bacd40e63804a93ed916e"}, {"audio": 0, "start": 488133, "crunched": 0, "end": 488683, "filename": "/.git/objects/b5/aa99e51842f593998aa49c2c2598b3a36413c2"}, {"audio": 0, "start": 488683, "crunched": 0, "end": 488843, "filename": "/.git/objects/b6/88a59f41adba7e74db287c2ff76c2db466c03b"}, {"audio": 0, "start": 488843, "crunched": 0, "end": 489207, "filename": "/.git/objects/b7/82d5c8f709c05aff77284fb194765ac67c7040"}, {"audio": 0, "start": 489207, "crunched": 0, "end": 489634, "filename": "/.git/objects/b7/8558a421987d81e264af431f7db98652a9302c"}, {"audio": 0, "start": 489634, "crunched": 0, "end": 489809, "filename": "/.git/objects/b8/5f754d2bf989bb097e88d593ae68e6ea3f5a9a"}, {"audio": 0, "start": 489809, "crunched": 0, "end": 489976, "filename": "/.git/objects/b8/87915a9bc3286849226ad90021452e4b8bc8ef"}, {"audio": 0, "start": 489976, "crunched": 0, "end": 490146, "filename": "/.git/objects/ba/264221262e5a1dfbc3b679b5c13e71173ba4ce"}, {"audio": 0, "start": 490146, "crunched": 0, "end": 490504, "filename": "/.git/objects/bb/1faf72767b8d3e8104be7cb704fd9b7814085b"}, {"audio": 0, "start": 490504, "crunched": 0, "end": 490957, "filename": "/.git/objects/bb/685bee7c464eff63096c7e30a799c3acd9e7d3"}, {"audio": 0, "start": 490957, "crunched": 0, "end": 492246, "filename": "/.git/objects/bb/8e87e91d7d2a80c9835b50bf5ef2e7738a59a8"}, {"audio": 0, "start": 492246, "crunched": 0, "end": 492465, "filename": "/.git/objects/be/cded41a8d74e814ea9720b0ff95335f3e26c8e"}, {"audio": 0, "start": 492465, "crunched": 0, "end": 492628, "filename": "/.git/objects/c0/446786f267a1dab45dd4603f47c8522da228ba"}, {"audio": 0, "start": 492628, "crunched": 0, "end": 493082, "filename": "/.git/objects/c2/931fac2de89fa17dad67986396e88a0bcb1dfb"}, {"audio": 0, "start": 493082, "crunched": 0, "end": 493236, "filename": "/.git/objects/c3/3e7470b6b483090b87e7aa9aa32c81dbc19aff"}, {"audio": 0, "start": 493236, "crunched": 0, "end": 507702, "filename": "/.git/objects/c3/69f321f3db1bc5f2144a834d28c065b8e0e304"}, {"audio": 0, "start": 507702, "crunched": 0, "end": 507874, "filename": "/.git/objects/c5/41508c313faec0b0a10ef2c2315527fc6c77ae"}, {"audio": 0, "start": 507874, "crunched": 0, "end": 508386, "filename": "/.git/objects/c7/012bcf09bd36b1e3d3783ad50d34eff4ca31cd"}, {"audio": 0, "start": 508386, "crunched": 0, "end": 508629, "filename": "/.git/objects/c9/9f5dad69b1a4b732b204593228c39d5b5cf1ab"}, {"audio": 0, "start": 508629, "crunched": 0, "end": 509422, "filename": "/.git/objects/c9/d67fd3c28a1bc2c9911e1c1fcc8b21cf641778"}, {"audio": 0, "start": 509422, "crunched": 0, "end": 509584, "filename": "/.git/objects/ca/662beb14a355d8982a80a5f3350089c5990a9d"}, {"audio": 0, "start": 509584, "crunched": 0, "end": 509792, "filename": "/.git/objects/cc/51a41ab229f7d8f4c7a20c12f274f957762cb4"}, {"audio": 0, "start": 509792, "crunched": 0, "end": 510332, "filename": "/.git/objects/ce/3691a3fdd0df4cbedd18486cff138c40891784"}, {"audio": 0, "start": 510332, "crunched": 0, "end": 510368, "filename": "/.git/objects/ce/6d91d143a85de764a904af7a7f88572c2e7d5d"}, {"audio": 0, "start": 510368, "crunched": 0, "end": 510524, "filename": "/.git/objects/d0/961b8669d9a790b32d93fb65094de0a7554735"}, {"audio": 0, "start": 510524, "crunched": 0, "end": 511035, "filename": "/.git/objects/d3/25fc5be788308bb0390140e9fd96ddfed41753"}, {"audio": 0, "start": 511035, "crunched": 0, "end": 511202, "filename": "/.git/objects/d3/ac0c5e9d8e753f5de07b9669a9f0e7bab118b4"}, {"audio": 0, "start": 511202, "crunched": 0, "end": 511566, "filename": "/.git/objects/d4/7470caa0a9499ec928dd6f82a3aa4b5a0007a4"}, {"audio": 0, "start": 511566, "crunched": 0, "end": 529509, "filename": "/.git/objects/d6/29ff8dbffa0443ddcf07281999d0051a8ccf24"}, {"audio": 0, "start": 529509, "crunched": 0, "end": 529654, "filename": "/.git/objects/d7/1380f98c758bd277ee7ece13bcb1cba8bfffea"}, {"audio": 0, "start": 529654, "crunched": 0, "end": 529791, "filename": "/.git/objects/d8/fe52a6505f60afc4b08415db0ddc251baf1b64"}, {"audio": 0, "start": 529791, "crunched": 0, "end": 530993, "filename": "/.git/objects/dc/6e8d759d6482f92c28930b823158827e0be763"}, {"audio": 0, "start": 530993, "crunched": 0, "end": 531320, "filename": "/.git/objects/dd/56dee618623fef6001fc99d03daeba761f815c"}, {"audio": 0, "start": 531320, "crunched": 0, "end": 531424, "filename": "/.git/objects/df/4ea5e1aa99aafce1cea6907fe003a0304e9877"}, {"audio": 0, "start": 531424, "crunched": 0, "end": 531847, "filename": "/.git/objects/e0/1e933aeb790288aa8f5f6c71d06eef8f627105"}, {"audio": 0, "start": 531847, "crunched": 0, "end": 545779, "filename": "/.git/objects/e2/07521430095e4930630bcf3aacec8c58d2ccbc"}, {"audio": 0, "start": 545779, "crunched": 0, "end": 546328, "filename": "/.git/objects/e3/6cbe623a2a4ff9f2fffa1d824f31191f14f117"}, {"audio": 0, "start": 546328, "crunched": 0, "end": 546661, "filename": "/.git/objects/e3/c440269d1aa6013476f0c610e7c7f5366366f7"}, {"audio": 0, "start": 546661, "crunched": 0, "end": 547171, "filename": "/.git/objects/e4/4b4e018ae42db61fc64c25c6d979a0ad4676d0"}, {"audio": 0, "start": 547171, "crunched": 0, "end": 547505, "filename": "/.git/objects/e6/7adb3158ca02d63345a28c925b1ada474d6f0d"}, {"audio": 0, "start": 547505, "crunched": 0, "end": 547520, "filename": "/.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391"}, {"audio": 0, "start": 547520, "crunched": 0, "end": 547609, "filename": "/.git/objects/e6/f004c20dea3f869180c91c25cfcae873e2253d"}, {"audio": 0, "start": 547609, "crunched": 0, "end": 548228, "filename": "/.git/objects/e7/2ebd77f603b5a9f2658c80f97c3597e384e06b"}, {"audio": 0, "start": 548228, "crunched": 0, "end": 548681, "filename": "/.git/objects/e9/e772950076351dcc2974b9ff6ecf64b0f7053d"}, {"audio": 0, "start": 548681, "crunched": 0, "end": 548962, "filename": "/.git/objects/ea/b3e8cf74ef11ea45e1924cf6ed5365b0216e20"}, {"audio": 0, "start": 548962, "crunched": 0, "end": 549136, "filename": "/.git/objects/ea/e006063729ddd9389174c34f6a45773c5c8e24"}, {"audio": 0, "start": 549136, "crunched": 0, "end": 549646, "filename": "/.git/objects/eb/cee4d2e0c432547c394e4514e20b36742f2f61"}, {"audio": 0, "start": 549646, "crunched": 0, "end": 550129, "filename": "/.git/objects/ee/7248cf8aa2ad73b9cca3e532828d97f009824a"}, {"audio": 0, "start": 550129, "crunched": 0, "end": 568678, "filename": "/.git/objects/ee/98b9819f73814b45fb88306cc153a2e878881e"}, {"audio": 0, "start": 568678, "crunched": 0, "end": 568859, "filename": "/.git/objects/f4/0a8c62628a6791d6505d673edb6c8ac48d2e1b"}, {"audio": 0, "start": 568859, "crunched": 0, "end": 569042, "filename": "/.git/objects/f5/ca68ca7550dbe4c51eae8bd046881208276d4f"}, {"audio": 0, "start": 569042, "crunched": 0, "end": 569465, "filename": "/.git/objects/f6/0d97eb2a23743c7f3655b7f1b7cbe3490f56e5"}, {"audio": 0, "start": 569465, "crunched": 0, "end": 569648, "filename": "/.git/objects/f6/7b003d2005edffc266cbee97346ca90f68fd34"}, {"audio": 0, "start": 569648, "crunched": 0, "end": 569873, "filename": "/.git/objects/fa/d65e9880051c7937b2f68839971a543fed735c"}, {"audio": 0, "start": 569873, "crunched": 0, "end": 570270, "filename": "/.git/objects/ff/d1f91fa09db1386003890cfe66fd3416d20a62"}, {"audio": 0, "start": 570270, "crunched": 0, "end": 570311, "filename": "/.git/refs/heads/master"}, {"audio": 0, "start": 570311, "crunched": 0, "end": 570343, "filename": "/.git/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 570343, "crunched": 0, "end": 570384, "filename": "/.git/refs/remotes/origin/master"}, {"audio": 0, "start": 570384, "crunched": 0, "end": 570425, "filename": "/.git/refs/tags/v0.1"}, {"audio": 0, "start": 570425, "crunched": 0, "end": 570597, "filename": "/.idea/misc.xml"}, {"audio": 0, "start": 570597, "crunched": 0, "end": 570845, "filename": "/.idea/modules.xml"}, {"audio": 0, "start": 570845, "crunched": 0, "end": 571012, "filename": "/.idea/vcs.xml"}, {"audio": 0, "start": 571012, "crunched": 0, "end": 608860, "filename": "/.idea/workspace.xml"}, {"audio": 0, "start": 608860, "crunched": 0, "end": 609129, "filename": "/.idea/inspectionProfiles/Project_Default.xml"}, {"audio": 0, "start": 609129, "crunched": 0, "end": 613626, "filename": "/assets/blindguyonly.png"}, {"audio": 0, "start": 613626, "crunched": 0, "end": 663060, "filename": "/assets/blindguyonly.tif"}, {"audio": 0, "start": 663060, "crunched": 0, "end": 668427, "filename": "/assets/blindguyv2.png"}, {"audio": 0, "start": 668427, "crunched": 0, "end": 679433, "filename": "/assets/blindwithandWheelchair.png"}, {"audio": 0, "start": 679433, "crunched": 0, "end": 707829, "filename": "/assets/block-unit.png"}, {"audio": 0, "start": 707829, "crunched": 0, "end": 720322, "filename": "/assets/block.png"}, {"audio": 0, "start": 720322, "crunched": 0, "end": 730680, "filename": "/assets/candle-unit.png"}, {"audio": 0, "start": 730680, "crunched": 0, "end": 748596, "filename": "/assets/candle2-unit.png"}, {"audio": 0, "start": 748596, "crunched": 0, "end": 774859, "filename": "/assets/candlewithblock-unit.png"}, {"audio": 0, "start": 774859, "crunched": 0, "end": 787503, "filename": "/assets/coin.png"}, {"audio": 0, "start": 787503, "crunched": 0, "end": 801681, "filename": "/assets/ghostgrey-unit.png"}, {"audio": 0, "start": 801681, "crunched": 0, "end": 820203, "filename": "/assets/ghostpink-unit.png"}, {"audio": 0, "start": 820203, "crunched": 0, "end": 827988, "filename": "/assets/key.png"}, {"audio": 0, "start": 827988, "crunched": 0, "end": 842997, "filename": "/assets/spike-unit.png"}, {"audio": 0, "start": 842997, "crunched": 0, "end": 852809, "filename": "/assets/wall-unit.png"}, {"audio": 0, "start": 852809, "crunched": 0, "end": 1039279, "filename": "/assets/wheelchairguyv3.png"}, {"audio": 0, "start": 1039279, "crunched": 0, "end": 1053723, "filename": "/assets/wheelchairguyv4.png"}, {"audio": 0, "start": 1053723, "crunched": 0, "end": 1069473, "filename": "/screenshots/blind.PNG"}, {"audio": 0, "start": 1069473, "crunched": 0, "end": 2310827, "filename": "/screenshots/fullScreen.PNG"}, {"audio": 0, "start": 2310827, "crunched": 0, "end": 3181797, "filename": "/screenshots/visible.PNG"}, {"audio": 0, "start": 3181797, "crunched": 0, "end": 3228350, "filename": "/screenshots/youDied.PNG"}, {"audio": 0, "start": 3228350, "crunched": 0, "end": 3275161, "filename": "/screenshots/youDiedPrime.PNG"}, {"audio": 0, "start": 3275161, "crunched": 0, "end": 4176215, "filename": "/target/lost-0.1-unix.zip"}, {"audio": 0, "start": 4176215, "crunched": 0, "end": 8722179, "filename": "/target/lost-0.1-win32.zip"}, {"audio": 0, "start": 8722179, "crunched": 0, "end": 9675036, "filename": "/target/lost.love"}, {"audio": 0, "start": 9675036, "crunched": 0, "end": 12419038, "filename": "/target/love-0.10.2-win32.zip"}, {"audio": 0, "start": 12419038, "crunched": 0, "end": 13371895, "filename": "/target/lost-0.1-unix/lost.love"}, {"audio": 0, "start": 13371895, "crunched": 0, "end": 13433065, "filename": "/target/lost-0.1-win32/changes.txt"}, {"audio": 0, "start": 13433065, "crunched": 0, "end": 13803135, "filename": "/target/lost-0.1-win32/game.ico"}, {"audio": 0, "start": 13803135, "crunched": 0, "end": 13852870, "filename": "/target/lost-0.1-win32/license.txt"}, {"audio": 0, "start": 13852870, "crunched": 0, "end": 15187167, "filename": "/target/lost-0.1-win32/lost.exe"}, {"audio": 0, "start": 15187167, "crunched": 0, "end": 16140024, "filename": "/target/lost-0.1-win32/lost.love"}, {"audio": 0, "start": 16140024, "crunched": 0, "end": 18531064, "filename": "/target/lost-0.1-win32/love.dll"}, {"audio": 0, "start": 18531064, "crunched": 0, "end": 18901134, "filename": "/target/lost-0.1-win32/love.ico"}, {"audio": 0, "start": 18901134, "crunched": 0, "end": 19282574, "filename": "/target/lost-0.1-win32/lovec.exe"}, {"audio": 0, "start": 19282574, "crunched": 0, "end": 19631758, "filename": "/target/lost-0.1-win32/lua51.dll"}, {"audio": 0, "start": 19631758, "crunched": 0, "end": 19773070, "filename": "/target/lost-0.1-win32/mpg123.dll"}, {"audio": 0, "start": 19773070, "crunched": 0, "end": 20228398, "filename": "/target/lost-0.1-win32/msvcp120.dll"}, {"audio": 0, "start": 20228398, "crunched": 0, "end": 21199310, "filename": "/target/lost-0.1-win32/msvcr120.dll"}, {"audio": 0, "start": 21199310, "crunched": 0, "end": 21590478, "filename": "/target/lost-0.1-win32/OpenAL32.dll"}, {"audio": 0, "start": 21590478, "crunched": 0, "end": 21594021, "filename": "/target/lost-0.1-win32/readme.txt"}, {"audio": 0, "start": 21594021, "crunched": 0, "end": 22416805, "filename": "/target/lost-0.1-win32/SDL2.dll"}, {"audio": 0, "start": 22416805, "crunched": 0, "end": 23317859, "filename": "/target/test/lost-0.1-unix.zip"}, {"audio": 0, "start": 23317859, "crunched": 0, "end": 27863823, "filename": "/target/test/lost-0.1-win32.zip"}, {"audio": 0, "start": 27863823, "crunched": 0, "end": 28816680, "filename": "/target/test/lost-0.1-unix/lost.love"}, {"audio": 0, "start": 28816680, "crunched": 0, "end": 28877850, "filename": "/target/test/lost-0.1-win32/changes.txt"}, {"audio": 0, "start": 28877850, "crunched": 0, "end": 29247920, "filename": "/target/test/lost-0.1-win32/game.ico"}, {"audio": 0, "start": 29247920, "crunched": 0, "end": 29297655, "filename": "/target/test/lost-0.1-win32/license.txt"}, {"audio": 0, "start": 29297655, "crunched": 0, "end": 30631952, "filename": "/target/test/lost-0.1-win32/lost.exe"}, {"audio": 0, "start": 30631952, "crunched": 0, "end": 31584809, "filename": "/target/test/lost-0.1-win32/lost.love"}, {"audio": 0, "start": 31584809, "crunched": 0, "end": 33975849, "filename": "/target/test/lost-0.1-win32/love.dll"}, {"audio": 0, "start": 33975849, "crunched": 0, "end": 34345919, "filename": "/target/test/lost-0.1-win32/love.ico"}, {"audio": 0, "start": 34345919, "crunched": 0, "end": 34727359, "filename": "/target/test/lost-0.1-win32/lovec.exe"}, {"audio": 0, "start": 34727359, "crunched": 0, "end": 35076543, "filename": "/target/test/lost-0.1-win32/lua51.dll"}, {"audio": 0, "start": 35076543, "crunched": 0, "end": 35217855, "filename": "/target/test/lost-0.1-win32/mpg123.dll"}, {"audio": 0, "start": 35217855, "crunched": 0, "end": 35673183, "filename": "/target/test/lost-0.1-win32/msvcp120.dll"}, {"audio": 0, "start": 35673183, "crunched": 0, "end": 36644095, "filename": "/target/test/lost-0.1-win32/msvcr120.dll"}, {"audio": 0, "start": 36644095, "crunched": 0, "end": 37035263, "filename": "/target/test/lost-0.1-win32/OpenAL32.dll"}, {"audio": 0, "start": 37035263, "crunched": 0, "end": 37038806, "filename": "/target/test/lost-0.1-win32/readme.txt"}, {"audio": 0, "start": 37038806, "crunched": 0, "end": 37861590, "filename": "/target/test/lost-0.1-win32/SDL2.dll"}], "remote_package_size": 37861590, "package_uuid": "2f4af021-9c02-45b0-b7ae-07524da96abf"});

})();
