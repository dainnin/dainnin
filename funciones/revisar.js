function generateFlexiblePath(element) {
    if (!element) return null;
  
    let path = [];
    
    while (element.parentNode) {
      let tagName = element.tagName.toLowerCase();
      let selector = tagName;
  
      // Comprobar varios atributos dinámicamente
      let attributes = ['key', 'data-id', 'class'];
      attributes.forEach(attr => {
        if (element.hasAttribute(attr)) {
          selector += `[${attr}="${element.getAttribute(attr)}"]`;
        }
      });
  
      path.unshift(selector);
      element = element.parentNode;
    }
  
    return path.join(' > ');
  }
  
   const FPathArr = (data, key, value, newKeyValue) => {
    for (const item of data) {
      for (const tag in item) {
        const obj = item[tag];
  
        // Si encontramos la combinación llave-valor, modificamos el objeto
        if (obj[key] === value) {
          Object.assign(obj, newKeyValue); // Agrega o modifica los valores especificados
          return true;
        }
  
        // Si hay hijos, buscamos recursivamente
        if (obj.children) {
          const found = FPathArr(obj.children, key, value, newKeyValue);
          if (found) {
            return true;
          }
        }
      }
    }
  
    return false;
  }
  function acceder(objeto, concatenaciones) {
    return concatenaciones.reduce((acumulador, actual) => {
      if (typeof actual === 'function') {
        // Si el elemento es una función, se invoca con el acumulador actual
        return actual(acumulador);
      } else if (typeof acumulador[actual] === 'function') {
        // Si el elemento es un método, se llama al método
        return acumulador[actual].bind(acumulador); // Retorna la función enlazada
      } else {
        // Si es una propiedad, simplemente accede a ella
        return acumulador[actual];
      }
    }, objeto);
  }
   const BuscData = (estructura, prop, val) => {
    if (Array.isArray(estructura)) {
      for (const item of estructura) {
        const result = BuscData(item, prop, val);
        if (result) return result;
      }
    } else if (typeof estructura === 'object') {
      if (estructura[prop] === val) {
        return estructura;
      }
      for (const key in estructura) {
        if (estructura.hasOwnProperty(key)) {
          const result = BuscData(estructura[key], prop, val);
          if (result) return result;
        }
      }
    }
    return null;
  };