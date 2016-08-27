import * as slash from 'slash';
import { join } from 'path';
const FIRST_PATH_SEGMENT = /^\/?[^\/]*/;

export function transformPath(plugins, env) {
  return function(filePath) {
    filePath = env === 'publish' ? filePath.replace(FIRST_PATH_SEGMENT, '/lib') : filePath;
    // filePath = env === 'prod' ? filePath.replace(FIRST_PATH_SEGMENT, '/lib') : filePath;
    arguments[0] = join('.', filePath);
    return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
  };
}
