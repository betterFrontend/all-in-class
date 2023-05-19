import { isAbsolute, normalize } from 'path'

export function normalizeAbsolutePath(path: string) {
	if (isAbsolute(path)) {
		return normalize(path)
	}

	return path
}


