MCG.Math = (function() {

  function coincident(a, b) {
    return a.h === b.h && a.v === b.v;
  }

  function area(a, b, c) {
    var ash = a.sh(), asv = a.sv();
    var bsh = b.sh(), bsv = b.sv();
    var csh = c.sh(), csv = c.sv();

    var cross = (bsh-ash) * (csv-asv) - (bsv-asv) * (csh-ash);
    return cross / 2;
  }

  function iarea(a, b, c) {
    var cross = (b.h-a.h) * (c.v-a.v) - (b.v-a.v) * (c.h-a.h);
    return cross / 2;
  }

  function collinear(a, b, c) {
    return iarea(a, b, c) === 0;
  }

  function left(a, b, c) {
    return iarea(a, b, c) > 0;
  }

  function leftOn(a, b, c) {
    return iarea(a, b, c) >= 0;
  }

  // returns 0 if c collinear with a-b, 1 if c left of a-b, else -1
  function leftCompare(a, b, c) {
    return Math.sign(iarea(a, b, c));
  }

  // intersection predicate: return true if a0-a1 segment intersects b0-b1
  // segment; can return true if an endpoint of one segment is on the other, so
  // check for that separately
  function intersect(a0, a1, b0, b1) {
    return !!(leftOn(a0, a1, b0) ^ leftOn(a0, a1, b1)) &&
           !!(leftOn(b0, b1, a0) ^ leftOn(b0, b1, a1));
  }

  // calculate intersection point of a0-a1 segment and b0-b1 segment
  function intersection(a0, a1, b0, b1) {
    // denominator
    var d = a0.h * (b1.v - b0.v) + a1.h * (b0.v - b1.v) +
            b1.h * (a1.v - a0.v) + b0.h * (a0.v - a1.v);
    // if denominator is 0, segments are parallel
    if (d === 0) return null;

    // numerator
    var n;
    // calculate pa
    n = a0.h * (b1.v - b0.v) + b0.h * (a0.v - b1.v) + b1.h * (b0.v - a0.v);
    var pa = n / d;
    // calculate pb
    //n = a0.h * (a1.v - b0.v) + a1.h * (b0.v - a0.v) + b0.h * (a0.v - a1.v);
    //pb = n / d;

    return a0.clone().addScaledVector(a0.vectorTo(a1), pa);
  }

  function parallel(a, ae, b, be) {
    var da = a.vectorTo(ae);
    var db = b.vectorTo(be);

    return da.h * db.v === db.h * da.v;
  }

  return {
    coincident: coincident,
    area: area,
    iarea: iarea,
    collinear: collinear,
    left: left,
    leftOn: leftOn,
    leftCompare: leftCompare,
    intersect: intersect,
    intersection: intersection,
    parallel: parallel
  }

})();