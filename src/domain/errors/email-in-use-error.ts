export class EmailInUseError extends Error {
  constructor () {
    super('Email já está sendo utilizado')
    this.name = 'EmailInUseError'
  }
}
