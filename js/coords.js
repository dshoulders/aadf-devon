// http://www.carabus.co.uk/ngr_ll.html

export function NEtoLL(east, north) {
    // converts NGR easting and nothing to lat, lon.
    // input metres, output radians
    var nX = Number(north)
    var eX = Number(east)
    const a = 6377563.396       // OSGB semi-major
    const b = 6356256.91        // OSGB semi-minor
    const e0 = 400000           // OSGB easting of false origin
    const n0 = -100000          // OSGB northing of false origin
    const f0 = 0.9996012717     // OSGB scale factor on central meridian
    const e2 = 0.0066705397616  // OSGB eccentricity squared
    const lam0 = -0.034906585039886591  // OSGB false east
    const phi0 = 0.85521133347722145    // OSGB false north
    var af0 = a * f0
    var bf0 = b * f0
    var n = (af0 - bf0) / (af0 + bf0)
    var Et = east - e0
    var phid = InitialLat(north, n0, af0, phi0, n, bf0)
    var nu = af0 / (Math.sqrt(1 - (e2 * (Math.sin(phid) * Math.sin(phid)))))
    var rho = (nu * (1 - e2)) / (1 - (e2 * (Math.sin(phid)) * (Math.sin(phid))))
    var eta2 = (nu / rho) - 1
    var tlat2 = Math.tan(phid) * Math.tan(phid)
    var tlat4 = Math.pow(Math.tan(phid), 4)
    var tlat6 = Math.pow(Math.tan(phid), 6)
    var clatm1 = Math.pow(Math.cos(phid), -1)
    var VII = Math.tan(phid) / (2 * rho * nu)
    var VIII = (Math.tan(phid) / (24 * rho * (nu * nu * nu))) * (5 + (3 * tlat2) + eta2 - (9 * eta2 * tlat2))
    var IX = ((Math.tan(phid)) / (720 * rho * Math.pow(nu, 5))) * (61 + (90 * tlat2) + (45 * Math.pow(Math.tan(phid), 4)))
    var phip = (phid - ((Et * Et) * VII) + (Math.pow(Et, 4) * VIII) - (Math.pow(Et, 6) * IX))
    var X = Math.pow(Math.cos(phid), -1) / nu
    var XI = (clatm1 / (6 * (nu * nu * nu))) * ((nu / rho) + (2 * (tlat2)))
    var XII = (clatm1 / (120 * Math.pow(nu, 5))) * (5 + (28 * tlat2) + (24 * tlat4))
    var XIIA = clatm1 / (5040 * Math.pow(nu, 7)) * (61 + (662 * tlat2) + (1320 * tlat4) + (720 * tlat6))
    var lambdap = (lam0 + (Et * X) - ((Et * Et * Et) * XI) + (Math.pow(Et, 5) * XII) - (Math.pow(Et, 7) * XIIA))
    var geo = { latitude: phip, longitude: lambdap }
    return (geo)
}

export function radToDeg(radians) {
    var pi = Math.PI
    return radians * (180 / pi)
}

function Marc(bf0, n, phi0, phi) {
    var Marc = bf0 * (((1 + n + ((5 / 4) * (n * n)) + ((5 / 4) * (n * n * n))) * (phi - phi0))
        - (((3 * n) + (3 * (n * n)) + ((21 / 8) * (n * n * n))) * (Math.sin(phi - phi0)) * (Math.cos(phi + phi0)))
        + ((((15 / 8) * (n * n)) + ((15 / 8) * (n * n * n))) * (Math.sin(2 * (phi - phi0))) * (Math.cos(2 * (phi + phi0))))
        - (((35 / 24) * (n * n * n)) * (Math.sin(3 * (phi - phi0))) * (Math.cos(3 * (phi + phi0)))))
    return (Marc)
}

function InitialLat(north, n0, af0, phi0, n, bf0) {
    var phi1 = ((north - n0) / af0) + phi0
    var M = Marc(bf0, n, phi0, phi1)
    var phi2 = ((north - n0 - M) / af0) + phi1
    var ind = 0
    
    while ((Math.abs(north - n0 - M) > 0.00001) && (ind < 20))  // max 20 iterations in case of error
    {
        ind = ind + 1
        phi2 = ((north - n0 - M) / af0) + phi1
        M = Marc(bf0, n, phi0, phi2)
        phi1 = phi2
    }
    return (phi2)
}