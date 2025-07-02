const slugify = require('slugify')

const slugFormatter = (string, locale = 'es') => {
    const slug = slugify(string, {
        lower:true,
        trim: true,
        strict: true, 
        locale,
        replacement:"-",
    });

    return slug
}

const nameFormatter = (string) => {
  if (!string || typeof string !== "string") return "";

  const exceptions = ["los", "las", "de", "del", "la", "el"];
  
  return string
    .toLowerCase()
    .split(" ")
    .map(word => {
      if (exceptions.includes(word) && word.length <= 3) {
        return word;
      }
      // Capitaliza primera letra
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};


module.exports = {
    slugFormatter,
    nameFormatter
};