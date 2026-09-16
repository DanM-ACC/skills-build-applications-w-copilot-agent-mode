const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getCollectionItems(payload) {
  if (Array.isArray(payload)) return payload
  if (payload?.data) return getCollectionItems(payload.data)
  if (payload?.results) return getCollectionItems(payload.results)
  if (payload?.items) return getCollectionItems(payload.items)
  if (payload?.docs) return getCollectionItems(payload.docs)
  return []
}

export async function fetchCollection(component) {
  const response = await fetch(`${API_BASE_URL}/api/${component}/`)
  if (!response.ok) throw new Error(`Unable to load ${component} (${response.status})`)
  return getCollectionItems(await response.json())
}