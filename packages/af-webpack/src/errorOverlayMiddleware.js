import launchEditor from 'react-dev-utils/launchEditor';
import launchEditorEndpoint from 'react-dev-utils/launchEditorEndpoint';
import send, { OPEN_FILE } from './send';

export default function createLaunchEditorMiddleware() {
  return function launchEditorMiddleware(req, res, next) {
    if (req.url.startsWith(launchEditorEndpoint)) {
      if (process.env.ALIPAY_EDITOR && process.send) {
        send({
          type: OPEN_FILE,
          payload: req.query,
        });
      } else {
        launchEditor(req.query.fileName, req.query.lineNumber);
      }
      res.end();
    } else {
      next();
    }
  };
}
