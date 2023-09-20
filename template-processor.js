function TemplateProcessor(template) {
    this.template = template;
  }
  
  TemplateProcessor.prototype.fillIn = function (dictionary) {
    // Use a regular expression to find all instances of {{property}}
    return this.template.replace(/{{(.*?)}}/g, (match, property) => {
      // Check if the property exists in the dictionary
      return dictionary[property] || '';
    });
  };
