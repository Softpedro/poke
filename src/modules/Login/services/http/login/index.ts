import type { ApiRes } from '~/clients/http'
import type { LoggedUser } from '~/composables/loggedUser'

interface DummyUser {
  id: string
  password: string
}

type DummyUsersDic = Record<string, DummyUser>

const dummyUsersDic: DummyUsersDic = {
  'mail@mail.com': { id: 'dummy-id-1', password: '123456' },
  '57blocks@57blocks.com': { id: 'dummy-id-2', password: '123456' },
  'test@test.com': { id: 'dummy-id-3', password: '123456' },
  'admin@admin.com': { id: 'dummy-id-4', password: '123456' },
}

interface LoginUserConfig {
  email: string
  password: string
}

export async function loginUser(config: LoginUserConfig): Promise<ApiRes<LoggedUser>> {
  return new Promise(resolve => setTimeout(() => {
    const dummyUser = getDummyUser(config)

    if (dummyUser) {
      const validResult: ApiRes<LoggedUser> = {
        isOk: true,
        result: {
          email: config.email,
          id: dummyUser.id,
        },
      }

      resolve(validResult)
    }

    resolve({ isOk: false })
  }, 500))
}

function getDummyUser(config: LoginUserConfig): DummyUser | null {
  const dummyUser = dummyUsersDic[config.email]

  if (!dummyUser)
    return null

  if (dummyUser.password !== config.password)
    return null

  return dummyUser
}
