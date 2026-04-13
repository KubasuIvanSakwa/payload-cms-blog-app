
export function realtionIsObject<T>( relation: number | T ): relation is T {
    return typeof relation !== 'number'
}