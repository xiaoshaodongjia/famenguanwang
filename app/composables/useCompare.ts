const STORAGE_KEY = 'valve_compare_list'
const MAX_COUNT = 4

export function useCompare() {
  const compareList = ref<number[]>([])

  // 从 localStorage 恢复
  if (process.client) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) compareList.value = JSON.parse(saved)
    } catch {}
  }

  // 持久化
  const save = () => {
    if (process.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList.value))
    }
  }

  const toggle = (id: number) => {
    const idx = compareList.value.indexOf(id)
    if (idx > -1) {
      compareList.value.splice(idx, 1)
    } else {
      if (compareList.value.length >= MAX_COUNT) return false
      compareList.value.push(id)
    }
    save()
    return true
  }

  const remove = (id: number) => {
    const idx = compareList.value.indexOf(id)
    if (idx > -1) {
      compareList.value.splice(idx, 1)
      save()
    }
  }

  const clear = () => {
    compareList.value = []
    save()
  }

  const isInList = (id: number) => compareList.value.includes(id)

  const canAdd = computed(() => compareList.value.length < MAX_COUNT)

  return {
    compareList,
    toggle,
    remove,
    clear,
    isInList,
    canAdd,
    maxCount: MAX_COUNT,
  }
}
