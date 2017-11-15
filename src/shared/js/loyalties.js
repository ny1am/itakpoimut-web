(function() {

  const loyaltiesList = [
    {
      name: 'disloyal',
      text: 'Порушники',
      single_text: 'Порушник',
      rule: {
        'loyalty' : 'disloyal'
      }
    },
    {
      name: 'probation',
      text: 'На випробувальному терміні',
      single_text: 'Випробувальний',
      rule: {
        'loyalty' : 'probation'
      }
    },
    {
      name: 'loyal',
      text: 'Лояльні',
      single_text: 'Лояльна',
      rule: {
        'loyalty' : 'loyal'
      }
    }
  ];

  exports.list = function() {
    return loyaltiesList;
  };

  exports.getByName = function(name) {
    for (let index = 0; index < loyaltiesList.length; index++) {
      if (name === loyaltiesList[index].name) {
        return loyaltiesList[index];
      }
    }
  };

  exports.getByNames = function(names) {
    let result = [];
    if (names) {
      for (let index = 0; index < names.length; index++) {
        result.push(exports.getByName(names[index]));
      }
    }
    return result;
  };

  exports.selectedRule = function(name) {
    const loyalty = exports.getByName(name);
    return loyalty?loyalty.rule:'';
  };

  exports.text = function(name) {
    const result = exports.getByName(name);
    if (result) {
      return result.text;
    }
  };

  exports.singleText = function(name) {
    const result = exports.getByName(name);
    if (result) {
      return result.single_text;
    }
  };

}());