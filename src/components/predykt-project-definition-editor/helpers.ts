

export function splitPath(path: string): string[] {
    return (path || '').trim().split('~').filter(x => x !== '')
}