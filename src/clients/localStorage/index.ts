interface SuccessLocalStorageRes<result> {
  isOk: true
  result: result
}

interface ErrorLocalStorageRes {
  isOk: false
}

export type LocalStorageRes<Result> = SuccessLocalStorageRes<Result> | ErrorLocalStorageRes

export function getFromLocalStorage<Result>(key: string): LocalStorageRes<Result> {
  const strResult = localStorage.getItem(key)

  if (!strResult)
    return { isOk: false }

  const result = JSON.parse(strResult)

  return {
    result,
    isOk: true,
  }
}

export function addInLocalStorage(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key)
}
