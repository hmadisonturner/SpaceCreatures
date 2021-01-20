const glob = require('glob')
const fs = require('fs');

const pngDir = './assets/'
const headerFile = './scripts/include/graphics_lib_header'
const footerFile = './scripts/include/graphics_lib_footer'
const footerBuff = fs.readFileSync(footerFile);
let outputBuff = fs.readFileSync(headerFile);

glob(pngDir + '*.png', function (err, files) {
 files.forEach(x => {
   const buff = fs.readFileSync(x);
   const base64data = buff.toString('base64');
   const prop = x.substring(x.lastIndexOf('/')+1,x.lastIndexOf('.')).toLowerCase().replace('-','_')
   outputBuff += 'this.' + prop + ' =  new Image()\n'
   outputBuff += 'this.' + prop + '.src = \'data:image/png;base64,' + base64data + '\'\n'
 }) 
 outputBuff += footerBuff
 process.stdout.write( outputBuff.toString() )
})

