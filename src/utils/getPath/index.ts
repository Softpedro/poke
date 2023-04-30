import type { ApiPath } from '~/configs/ApiPath'
import type { ImgPath } from '~/configs/ImgPath'
import type { ViewPath } from '~/configs/ViewPath'

type IsParameter<Part> = Part extends `{${infer ParamName}}` ? ParamName : never

type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? IsParameter<PartA> | FilteredParts<PartB>
  : IsParameter<Path>

type RemovePrefixDots<Key> = Key extends `...${infer Name}` ? Name : Key
type Params<Path> = {
  [Key in FilteredParts<Path> as RemovePrefixDots<Key>]: string;
}

interface GetPathConfig<PathParam> {
  params?: Params<PathParam>
  searchParams?: Record<string, string>
}

export function getPath<PathParam extends ViewPath | ApiPath | ImgPath>(
  path: PathParam,
  config?: GetPathConfig<PathParam>,
): string {
  let formattedPath = path as string

  if (config?.params) {
    Object.entries(config.params).forEach(([paramName, paramValue]) => {
      formattedPath = formattedPath.replace(`{${paramName}}`, paramValue as string)
    })
  }

  if (config?.searchParams) {
    const searchParams = new URLSearchParams(config.searchParams)
    formattedPath += `?${searchParams.toString()}`
  }

  return formattedPath
}
