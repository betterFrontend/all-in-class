import { dirname, resolve, join, isAbsolute, normalize } from 'path'

export function normalizeAbsolutePath(path) {
	if (isAbsolute(path)) {
		return normalize(path)
	}

	return path
}


