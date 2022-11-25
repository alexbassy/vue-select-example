export interface IOption<T = unknown> {
  title: string
  desc: string
  metadata?: Record<string, T>
}
