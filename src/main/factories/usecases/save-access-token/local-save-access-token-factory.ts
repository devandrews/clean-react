import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { SaveAccessToken } from '@/domain/usecases'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(new LocalStorageAdapter())
}
