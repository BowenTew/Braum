export interface CommitType {
  name: string
  value: string
  description: string
}

export interface CommitScope {
  name: string
  value: string
  description: string
}

export interface CZConfig {
  types: CommitType[]
  scopes?: CommitScope[]

  hasBody?: boolean
  hasFooter?: boolean
  dryRun?: boolean
}
