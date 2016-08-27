import * as express from 'express';
import * as openResource from 'open';
import * as serverStatic from 'serve-static';
import { resolve } from 'path';
import * as codeChangeTool from './code_change_tools';
import { APP_BASE, DOCS_DEST, DOCS_PORT, COVERAGE_PORT } from '../config';

export function serveSPA() {
  codeChangeTool.listen();
}
export function notifyLiveReload(e) {
  let fileName = e.path;
  codeChangeTool.changed(fileName);
}