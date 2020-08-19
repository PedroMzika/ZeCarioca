const { duration } = require('moment')

module.exports = (time) => {
  const formattedTime = duration(time).format('H [horas e] m [minutos e] s [segundos]')

  return formattedTime
}
