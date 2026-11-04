// Adds the bankroll tracker fields and content types.
// Run once, before deploying the code that queries these fields:
//   npx contentful-cli space migration --space-id hf234a786srd --environment-id master contentful/migrations/01-bankroll-tracker.js

module.exports = function (migration) {
  // PICK

  const pick = migration.editContentType('richPicksPick')

  pick
    .createField('units')
    .name('Units')
    .type('Integer')
    .required(false)
    .validations([{ in: [1, 2] }])
    .defaultValue({ 'en-US': 1 })

  pick.createField('price').name('Price').type('Integer').required(false)

  pick
    .createField('resultOverride')
    .name('Result Override')
    .type('Symbol')
    .required(false)
    .validations([{ in: ['void', 'push'] }])

  pick
    .createField('reasoning')
    .name('Reasoning')
    .type('Symbol')
    .required(false)
    .validations([{ size: { max: 140 } }])

  pick.changeFieldControl('units', 'builtin', 'dropdown', {
    helpText: 'Stake: 1 unit, or 2 at most. No more than 10 units a week.',
  })
  pick.changeFieldControl('price', 'builtin', 'numberEditor', {
    helpText:
      'American odds when Rich made the pick, e.g. -110 or +145. Leave blank to use the moneyline (moneyline bets) or -110 (spread and totals).',
  })
  pick.changeFieldControl('resultOverride', 'builtin', 'dropdown', {
    helpText:
      'Only for postponed or cancelled games. Void returns the stake. Leave blank otherwise.',
  })
  pick.changeFieldControl('reasoning', 'builtin', 'singleLine', {
    helpText: 'Why, in plain words. No guarantees.',
  })

  // POST

  const post = migration.editContentType('richPicksPost')

  post.createField('week').name('Week').type('Integer').required(false)

  // SPLIT RULE

  const split = migration
    .createContentType('richPicksSplitRule')
    .name('Rich Picks Split Rule')
    .displayField('name')

  split.createField('name').name('Name').type('Symbol').required(true)
  split
    .createField('bankrollPercent')
    .name('Bankroll Percent')
    .type('Integer')
    .required(true)
    .validations([{ range: { min: 0, max: 100 } }])
  split
    .createField('indexFundPercent')
    .name('Index Fund Percent')
    .type('Integer')
    .required(true)
    .validations([{ range: { min: 0, max: 100 } }])
  split
    .createField('savingsPercent')
    .name('Savings Percent')
    .type('Integer')
    .required(true)
    .validations([{ range: { min: 0, max: 100 } }])
  split
    .createField('appliesTo')
    .name('Applies To')
    .type('Symbol')
    .required(true)
    .validations([{ in: ['weekly profit', 'each winning pick'] }])
    .defaultValue({ 'en-US': 'weekly profit' })
  split
    .createField('indexFundAnnualRate')
    .name('Index Fund Annual Rate')
    .type('Number')
    .required(true)
    .defaultValue({ 'en-US': 7 })
  split
    .createField('savingsAnnualRate')
    .name('Savings Annual Rate')
    .type('Number')
    .required(true)
    .defaultValue({ 'en-US': 4 })
  split.createField('explanation').name('Explanation').type('Text')

  split.changeFieldControl('bankrollPercent', 'builtin', 'numberEditor', {
    helpText: 'The three percentages must add up to 100.',
  })

  // BANKROLL SETTINGS

  const bankroll = migration
    .createContentType('richPicksBankroll')
    .name('Rich Picks Bankroll')
    .displayField('title')

  bankroll.createField('title').name('Title').type('Symbol').required(true)
  bankroll
    .createField('season')
    .name('Season')
    .type('Link')
    .linkType('Entry')
    .required(true)
    .validations([{ linkContentType: ['richPicksSeason'] }])
  bankroll
    .createField('startingBankroll')
    .name('Starting Bankroll')
    .type('Number')
    .required(true)
    .defaultValue({ 'en-US': 1000 })
  bankroll
    .createField('startDate')
    .name('Start Date')
    .type('Date')
    .required(true)
  bankroll
    .createField('unitPercent')
    .name('Unit Percent')
    .type('Number')
    .required(true)
    .defaultValue({ 'en-US': 2 })
  bankroll
    .createField('maxUnitsPerWeek')
    .name('Max Units Per Week')
    .type('Integer')
    .required(true)
    .defaultValue({ 'en-US': 10 })
  bankroll
    .createField('defaultPrice')
    .name('Default Price')
    .type('Integer')
    .required(true)
    .defaultValue({ 'en-US': -110 })
  bankroll
    .createField('splitRule')
    .name('Split Rule')
    .type('Link')
    .linkType('Entry')
    .required(true)
    .validations([{ linkContentType: ['richPicksSplitRule'] }])

  bankroll.changeFieldControl('unitPercent', 'builtin', 'numberEditor', {
    helpText:
      '1 unit = this percent of the bankroll at the start of each week, rounded to the nearest dollar.',
  })
}
