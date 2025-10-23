const QPPath = (req, enabled = false) => {
  const inital = { search: {}, path: '', hash: '' };
  if (!req) return '';
  const { pathname, hash, href, origin } = req;

  if (href.includes('?')) {
    for (const a of href.substring(href.indexOf('?') + 1).split("&")) {
      const [k, v] = a.split("=");
      if (v) inital.search[k] = v;
    }
  }

  if (enabled) {
    inital.hash = hash.includes('#', 1) ? hash.substring(hash.indexOf('#', 1)) : '';
    inital.path = hash.includes('#', 1)
      ? hash.substring(1, hash.indexOf('#', 1) - 1)
      : hash.replace('#', '');
  } else {
    inital.hash = hash.includes('#', 0) ? hash : '';
    const lastSlash = pathname.lastIndexOf('/');
    inital.path = pathname.length - 1 === lastSlash
      ? (hash === '' ? pathname.substring(0, lastSlash) : '/' + hash.substring(0, hash.indexOf('?')))
      : pathname;
  }

  if (inital.path.includes('?')) {
    inital.path = inital.path.substring(0, inital.path.indexOf('?'));
  }

  Object.assign(inital, { url: origin + inital.path, href });
  return inital;
};
function getAtt(el, attr) {
  return el.getAttribute(attr)
}
const _$_ = new function () {
  this._doc = document;
  this._body = this._doc.body;
  this._main = this._doc.getElementById("_main");
  this._header = this._doc.getElementById("_header");
  this._footer = this._doc.getElementById("_footer");
  this.createElement=function(arg){return this._doc(arg)}
  this.getAtt=getAtt
  this.queryAll=function (param,ok=false) {
    if(!ok)return document.querySelectorAll(param)
    return document.querySelector(param)  
  }
  this._enabled = false;

  this.voidMain = () => {
    this._main.innerHTML = "";
  };

  this.classInBody = ({ header, main, footer }) => {
    if (header) this._header.className = header;
    if (main) this._main.className = main;
    if (footer) this._footer.className = footer;
  };

  Object.defineProperties(this, {
    hash: { get: () => QPPath(location, this._enabled).hash },
    search: { get: () => QPPath(location, this._enabled).search },
    path: { get: () => QPPath(location, this._enabled).path },
    QPPath: { get: () => QPPath },
    HashEnabled: {
      get: () => {
        this._enabled = !this._enabled;
        if (location.hash === '') location.hash = '#/';
      }
    }
  });
};
