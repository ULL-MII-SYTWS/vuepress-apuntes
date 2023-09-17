#!/usr/bin/env node
const { readdirSync, writeFileSync } = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'labs');
let data = {};

let files = readdirSync(dirname)
console.log(files)
files
  .filter(fn => /.+[.]json$/.test(fn))
  .map(fn => 
    { 
      console.log(fn)
      data[fn.replace(/\.json$/i,'')] = require(path.join(dirname, fn)) 
    });
//console.log(JSON.stringify(data))

writeFileSync(path.join(__dirname, 'commits-per-lab.json'), JSON.stringify(data, null, 2));

//module.exports = data
