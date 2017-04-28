var jsonfile = require('jsonfile')

var p = jsonfile.readFileSync('../../package.json')
p.scripts['render'] = 'cd ./node_modules/aws-quickdeploy && grunt render';
jsonfile.writeFileSync('../../package.json', p, {spaces: 2})
