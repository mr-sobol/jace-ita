'use strict';

const jestOpenAPI = require('jest-openapi').default
const request = require('supertest')
const config  = require('../config')
const { zip } = require( 'zip-a-folder' )
const path = require("path")
var fs = require('fs')

const DecompressZip = require('../src/javascript/util/unzip');

const filename = `${config.service.tempDir}/TEST.zip` 
const distPath =  `${config.service.tempDir}/unzip`

// створення директорії для розархувавання даних із архіва

fs.mkdir(distPath, function() {});

  describe('Архівування даних (ZIP)', () => {

        it('Архівування даних з тестової директорії', async () => {
          try{
             await zip(path.resolve('./zip'), filename);
             return true;
          }catch(e){
             throw e
          }
        });
  });

  describe('Розархівування даних (UNZIP)', () => {  
    it("Розархівування даних з тестової директорії", async () => { 
      try{
        await DecompressZip(filename, distPath);
        return true;
        }catch(e){
          throw e
        }
    });
    it("Видалення даних з тестового архіву", async () => { 
      fs.rmSync(filename, {
        force: true,
      });
      let files = [];
      if( fs.existsSync(distPath) ) {
          files = fs.readdirSync(distPath);
          files.forEach(function(file,index){
              let curPath = distPath + "/" + file;
              if(fs.statSync(curPath).isDirectory()) {
                  deleteFolder(curPath);
              } else {
                  fs.unlinkSync(curPath);
              }
          });
          fs.rmdirSync(distPath);
      }
    });
});