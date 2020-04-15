var spawn = require('child_process').exec;
hexo.on('new', function(data){
  spawn('start  "D:\Program Files (x86)\Typora.Typora.exe" ' + data.path);
});

