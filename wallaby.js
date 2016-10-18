var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack({
  entryPatterns: ['config/wallaby-shim.js', 'src/**/*.spec.js']
});

module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'src/**/*.ts', load: false},
      {pattern: 'config/wallaby-shim.ts', load: false},
      {pattern: 'src/**/*.spec.ts', ignore: true}
    ],

    tests: [
      {pattern: 'src/**/*.spec.ts', load: false}
    ],

    preprocessors: {
      '**/*.js': file => require('angular2-inline-template-style')(
        file.content,
        {
          base: require('path').parse(require('path').join(wallaby.localProjectDir, file.path)).dir
        })
    },

    postprocessor: wallabyPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};