function ConvertHandler() {
  this.getNum = function (input) {
    const idx = input.match(/[^\d]+/i)["index"];
    if (idx === 0) return 1;
    return input.substr(0, idx);
  };

  this.getUnit = function (input) {
    const idx = input.match(/[^\d]+/i)["index"];
    return input.substr(idx);
  };

  this.getReturnUnit = function (initUnit) {
    return {
      gal: "l",
      lbs: "kg",
      mi: "km",
    }[initUnit];
  };

  this.spellOutUnit = function (unit) {
    return {
      gal: "gallon",
      lbs: "pounds",
      mi: "miles",
      l: "litre",
      kg: "kilogram",
      km: "kilometer",
    }[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "gal":
        return initNum * galToL;
      case "lbs":
        return initNum * lbsToKg;
      case "mi":
        return initNum * miToKm;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;
