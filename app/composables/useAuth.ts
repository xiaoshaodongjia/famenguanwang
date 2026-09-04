export const useAuth = () => {
  const user = ref<{ username: string } | null>(null)
  const loading = ref(true)

  const fetchUser = async () => {
    try {
      const { authenticated, username } = await $fetch('/api/auth/me')
      if (authenticated) {
        user.value = { username: username as string }
      }
    } catch {
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const login = async (username: string, password: string) => {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { username, password },
    })
    user.value = { username }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    navigateTo('/admin/login')
  }

  return { user, loading, fetchUser, login, logout }
}
