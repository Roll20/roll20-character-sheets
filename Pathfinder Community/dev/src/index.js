'use strict';
import TAS from './TheAaronSheet.js';

TAS.config({
  logging: {
    info: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production',
  },
});
if (process.env.NODE_ENV !== 'production') {
  TAS.debugMode();
}

import {PFLog, PFConsole} from './PFLog';
import PFConst from './PFConst';
//importing PFSheet imports everything else
import * as PFSheet from './PFSheet';
import * as HLImport from './HLImport';
import * as PFNPCParser from './PFNPCParser';
import * as PFTemplate from './PFTemplate';

PFConsole.log('       ,## /##                    ');
PFConsole.log('      /#/ /  ##                   ');
PFConsole.log('     / / /    ##                  ');
PFConsole.log('      | ##___#/                   ');
PFConsole.log('      | ##       athfinder        ');
PFConsole.log('   #  | ##    sheet version       ');
PFConsole.log('    ### /           ' + ('0000' + PFConst.version.toFixed(2)).slice(-5) + '         ');
PFConsole.log('                                  ');
